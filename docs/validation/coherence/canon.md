# Canon — one canonical home for every fact of the whole set (base + twelve volumes)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/canon; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/canon`, 2026-09-29)
- P1 inputs read (12 inventories, wiring, INDEX, f whole, g, delegated decisions, _integrate, seam r6, the consistency canon): done
- P2 facts and homes (canon.json `facts`, `by_inventory_id`): done
- P3 glossary: done
- P4 conflicts ruled: done
- P5 f and g routing: done
- P6 id hygiene: done
- P7 wiring gaps routed: done
- P8 elegance rulings: done
- P9 agreement matrix (agreement.json/.md): done
- P10 edge catalogue (edges.json/.md): done
- P11 open findings routed: done
- P12 per-unit instructions: done

## How to use this canon

* **Machine twin.** `canon.json` (query with python; keys `facts`, `by_inventory_id`, `glossary`, `conflicts`, `f_routing`, `g_routing`, `id_hygiene`, `wiring_gaps`, `elegance`, `open_findings`, `owner_questions`, `canon_decisions`, `cohesion`, `units`, `home_rules`, `counts`). Agreement: `agreement.json`/`agreement.md`. Edges: `edges.json`/`edges.md`. Everything is rebuilt by the scripts in `work/canon/` (norm → link → ids → glossary → agree → handoffs → edges → combos → assemble → render); the rulings are in `rulings_conflicts.py`, `rulings_other.py` and `manual.py`.
* **A fact** is one normative item of the set. Its id is the inventory id of the statement at its canonical home (stable). `by_inventory_id` maps every one of the 11 408 inventory ids to its role: `home` (state it once, with its value), `reference` (replace by 'see §x.y' / 'see Vnn §x.y'; the home unit and section given, with the home fact where the link script found it — `fact` exact, `near_fact` a likely match to confirm), `bcr-pointer` (a volume's base change request: after file f is applied it becomes a one-line pointer to the applied item), `index-row` (scope's Judgment-calls index rows), `glossary`, `history-out` (narration), `handoff`, `answer-J121-J122`.
* **Each editor** reads its unit's section at the end of this file: STATE (every inventory id of the unit whose role is `home`; the list is in `canon.json → units.<unit>.state`), REFERENCE (listed here), the BCR pointers, the terms to replace, the conflicts it resolves, the f and g items it applies, the wiring gaps it closes, the elegance and id rulings it applies, its cohesion checks, the owner questions it marks answered, its open findings, the hand-offs it closes, its disagreements (agreement.md) and its UNDEFINED/UNTESTED edges (edges.md).
* **Verifiers** check each inventory id against its role here, each ruling as written, each elegance ruling's equivalence list against the archive, and the catalogues.

## Numbers

| measure | count |
|---|---|
| inventory items | 11408 |
| facts | 9816 |
| facts multi stated | 407 |
| facts multi stated across units | 374 |
| references | 705 |
| references linked to a fact | 142 |
| references near fact | 297 |
| bcr pointers | 292 |
| history out | 20 |
| terms defined | 884 |
| terms retired | 35 |
| conflicts | 168 |
| conflicts by verdict | FIX 164, FIX-BY-F 4 |
| f items routed | 386 |
| g items routed | 12 |
| id rulings | 12 |
| id collisions | 2 |
| wiring gaps routed | 91 |
| elegance unify | 34 |
| elegance keep apart | 5 |
| open findings routed | 1048 |
| handoffs | 203 |
| handoffs not stated closed | 132 |
| owner questions answered | 29 |
| agreement pairs | 153 |
| shared subjects | 8087 |
| disagreements | 59 |
| mechanisms | 632 |
| edge cases | 2706 |
| edges undefined | 832 |
| edges untested | 549 |
| combinations | 1147 |
| combinations undefined | 438 |
| words before total | 1491685 |
| words before base | 372998 |
| words before volumes | 1118687 |

Words before the pass (the shrink goal's baseline; principle (9)): base 372 998, volumes 1 118 687, total 1 491 685. Goal: about a third fewer (a band of 25 to 40 per cent: 895 011 – 1 118 764 words after), from four sources only — restatement, narration, duplicated mechanisms (the UNIFY rulings below), verbose prose. Each unit's band is in its section.

## Precedence and home rules

**Precedence for a conflict (principle (3)):** owner rules (OWNER-INSTRUCTIONS, the OWNER RULE items, DEFINITION.md; the owner's rulings J121 and delegation J122) > an f item or a J-VI decision that deliberately changes the base > the base's canonical home > a volume's restatement.

**Which base part a base section belongs to:** §0–§1, §13–§17, the summary, D-rows, the Judgment-calls index, Staged list, Appendix A → scope; §2 → model; §3 → kernel; §4, §10, PART II (II.1–II.7), PART III → pipeline; §5–§7 → determinism; §8, §9, §11, §12 → rendering.

The earlier canon's home rules R1–R13 (docs/validation/consistency/canon.md) hold inside the base. The set adds:

* **S1 base or volume.** The base owns every mechanism shared by more than one stage and everything the base builds (its milestones M-1 to M4b and M5's base rows); a volume owns what only its stage builds. A base change a volume requested (file f) or an owner item (file g) puts the fact in the base section the item names; the volume then cites it and its §10 request becomes a one-line pointer to the applied item.
* **S2 values.** Volume 11 owns every content-table value (file f rule R-c): where another unit restates a V11 cell, it cites the cell (table, row, column) and states no number; the base's own settings values that the base calls table values are V11 registry rows too (W-SET-01).
* **S3 records.** A record type lives in §2 (R1 of the earlier canon) when the base declares or reads it; a staged record the base carries as a hook is declared in §2.7 by its f item and built by its volume. A type a base record uses is declared in the base (MC-11).
* **S4 tests.** Base tests T⟨item⟩-⟨n⟩ live in §13 (R9); a volume's tests T-Vn-m live in its §7; a volume test re-running a base hook bar names the bar and says which clause it takes over (W-05, CO-06).
* **S5 decisions.** Base J-rows: one index row in the base, the entry in the rationale file's Part A (R10); volume J-Vn.m rows in the volume's §9; J-VI rows stay in docs/volumes/_integrate.md and are cited, never restated; the canon's decisions J-C1–J-C4 enter the base index. A superseded or amended decision carries one mark (E-24).
* **S6 owner rules.** The owner's words (docs/OWNER-INSTRUCTIONS-2026-09-25.md, the OWNER RULE items of the amendments files, docs/DEFINITION.md) are cited by item number; the program's interpretation of an owner item lives at the item's home section named by its HOMES line.
* **S7 citation form.** Base: bare '§x.y'. A volume: 'Vnn §x.y' everywhere, self-references included (G-cite). Volume-local row ids (W, X, H, FL, IN) are never cited bare outside their volume (ID-WX).
* **S8 hosting and AI inputs.** J121: every design statement about hosting and origin, accounts, plans and save limits, backups, the preview host, the public name, the licence for users' maps, interface languages, the AI key or relay, the assistant and its model tier reads SettlementForge's decision as an input; the design keeps the mechanism (configuration fields, the locale files, the key card) and decides none of them.
* **S9 narration.** Round, lane and review narration, stacked banner lines, PROGRESS ledgers, reconciliation records, 'CONFIRMED versus PLAUSIBLE' round histories and integration notes leave the normative text (the validation records keep them); the base keeps one banner line under its title and each volume one marker line (principle (8)); an integration note's content is folded into the body at its home.

## The canon's own decisions (J122 delegation; vetoable)

* **J-C1** — The default ink map keeps its gentle cast shadows in its own ink; only the MFCG parity preset draws none (J-A68.81 as designed). *Basis:* J122 delegation; no behaviour change.
* **J-C2** — The `ink` plate chroma stays 20–30 (J-A69.82 as designed); `parchment`, a shipping ink-family variant at M3b, aims at the corpus median 43 (RIC-01). *Basis:* J122 delegation; keeps both statements.
* **J-C3** — The item-72 surplus-pressure reading stands as designed. *Basis:* J122 delegation; no behaviour change.
* **J-C4** — A raised-way span whose under-deck strip lies wholly on hinterland land-use faces stays open (reason `country`) at every rung (V07-XCONF-2). *Basis:* realism tiebreaker; one rule at the span rule's base home.

## Owner questions — every one answered (J121, J122, J-C)

| unit | question | subject | answer |
|---|---|---|---|
| V01 | Q-V1-1 | the default map changes at M5 to show its neighbourhoods | J122: yes (the parity presets unchanged) |
| V02 | Q-V2-1 | SettlementForge prescribing a building's shape | J122: not now (one-way truth; SettlementForge has no shape data) |
| V03 | Q1 | floor plans on the base's buildings right after M4 | J122: yes (P0, P1, P3 after M4; P2 with V04's access records) |
| V04 | Q1 | the underground as M6-U right after M5 (beside it with a second pair) | J122: yes |
| V04 | Q2 | the underground's cost 28.25–39.25 pw | J122: accepted |
| V05 | Q1 | the underground before the sky | J122: yes |
| V06 | Q1 | when the evolution engine is built | J122: (a) right after M4 |
| V07 | Q1 | when the village is built | J122: (a) right after M4, parallel with M5; the tracker spike V-M0 right after M0 |
| V08 | Q1 | the module's web origin | follows SettlementForge (J121) |
| V08 | Q2 | plans, save limits, backups | follows SettlementForge (J121) |
| V08 | Q3 | scene files inside SettlementForge's export bundle | J122: yes, from M-SF (opaque bytes, V08-XCONF-5); until then maps export on their own |
| V08 | Q4 | M-SF after M-CAL | J122: yes |
| V08 | Q5 | a live party map | J122: pictures and player views now; a live shared map after M-SF |
| V09 | Q1 | a private preview host | follows SettlementForge's staging (J121) |
| V09 | Q2 | first-five-minutes participants and any thank-you | J122: five SettlementForge users per round from its community; thanks by credit and early access, no payments |
| V09 | Q3 | the product's public name | follows SettlementForge (J121) |
| V10 | Q1 | the user's own API key or a relay | follows SettlementForge's AI setup (J121) |
| V10 | Q2 | SettlementForge's assistant or ours | J122/J121: SettlementForge's, driving our tool API |
| V10 | Q3 | the model tier | follows SettlementForge (J121); a cheaper tier is evaluated before any switch |
| V10 | Q4 | the built-in clerk as M3c beside M3b | J122: yes |
| V10 | Q5 | the clerk's live-evaluation spend | J122: a budget cap of about US$790–1 190 through M3c, spent in stages (smallest tier first, the full suite at M3c's exit), each spend shown to the owner first |
| V11 | Q-V11-1 | the sensitive catalogue kinds | J122: keep, concealed by default in player views, shown as SettlementForge's own settings show them |
| V12 | Q-V12-1 | one month of FTG's premium tier | J122: no |
| V12 | Q-V12-2 | the owner's sittings | J122: only at M1 (look check), M2b, M4 and M5, batched, about an hour each (V12-XCONF-1) |
| V12 | Q-V12-3 | historical layers as defaults | J122: only where the owner's sitting passes them |
| scope | J-A68.81 | shadows on the default ink map | J-C1 (J122 delegation, this canon): kept as designed |
| scope | J-A69.82 | the ink plate chroma 20–30 or the middle 43 | J-C2: 20–30 kept for `ink`; 43 is `parchment`'s (RIC-01) |
| scope | item 72 reading | the surplus-pressure reading | J-C3: kept as designed |
| scope | J122 other points | languages; two people editing; the licence for users' maps; name word lists and symbol artwork | languages and the licence follow SettlementForge (J121); simultaneous editing not offered (J122, SCOPE-C08); word lists and symbol artwork written during the build under V11's authoring plan, clean-room (J122) — V11 states it |

Each unit marks its questions answered with the decision and its id (J121 / J122 / J-C) and reads the decision in its body; no text keeps "until the owner answers".

## Glossary

### Retired synonyms (one term per concept) — replaced everywhere

Occurrence counts are the script's candidate hits per unit (a verifier greps each to zero; a hit inside a quotation of a reference, or a legitimate different sense, is kept and noted by the editor).

| id | concept | the one term | retired | occurrences (unit: hits) | basis |
|---|---|---|---|---|---|
| G-lot | the parcel a building stands on | plot (field BuildingInput.plot) | lot, lot-driven, lot-derived, BuildingInput.lot | scope 51, pipeline 24, model 14, V12 9, determinism 5, V01 5, V02 3, rendering 2, V08 2, V11 2, kernel 1, V06 1 | §2.5's own rule; MC-01 |
| G-refview | the 1 440 × 900 CSS px, DPR 2, P = 35 view the budgets are stated for | reference viewport | reference view | rendering 7, V01 2, V05 1 | RTD-01 |
| G-firstmap | the time and view of the first drawn map | first map | first paint | V04 13, V07 9, rendering 4, scope 3, pipeline 3, V01 2, V08 2, V09 2, V02 1, V03 1 | RTD-02 |
| G-shadows | the light ladder's rung-3 shadow mechanism | projected shadows (`shadowPass`) | projected-shadow pass, projected pass, projected-shadow union, the shadow pass | rendering 7, scope 1, model 1, pipeline 1 | RTD-03 |
| G-vectorrung | the light ladder's rung 3 | the vector rung | the vector pass | determinism 1, scope 1, V05 1 | RTD-03 |
| G-slab | the occluder record set of the light pass | the slab list (a record: a slab) | occluder slabs, slab casters | 0 | RTD-04 |
| G-cite | a pointer to a volume's section | Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y | V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 … | V01 1501, V09 1197, V06 1027, V05 931, V02 798, V04 722, V10 288, V11 256, V08 233, V03 147, V07 144, V12 101, INDEX 4 | principle (1); V01/V02/V04/V05/V06/V07/V09/V10/V11-TERM |
| G-stairway | a way whose slopeP95 exceeds V11's ways.crossing rampMaxGrade | stair-stepped way (the template row keeps `stepped`) | stepped (for the way state) | V01 1 | V01-TERM-2 |
| G-standalone | a document whose Recipe.product is 'hood' | standalone neighbourhood document | standalone hood(s), lone neighbourhood document, standalone neighbourhood | V01 26, V06 6, V04 1 | V01-TERM-3 |
| G-unitinput | the derived view V01's unit runner reads for an island | SkyUnitInput (the island's unit inputs); `handover` keeps only the reservation passing (IslandInstitution.handover) | SkyHandover, hand-over (the unit-run view) | V05 46, V01 19, INDEX 2, V06 1, V11 1 | V05-TERM-2 |
| G-hollow | a way retireWay or effaceWay left abandoned or decayed | hollow way (the ops keep their names) | retired way | V06 19 | V06-TERM-2 |
| G-strike | the per-district decline draw | strike pool (defined once in V06 §3.5.2) | decline pool, decline lottery, the lottery | V06 16, pipeline 6, V11 4, determinism 2, scope 2 | V06-TERM-2 |
| G-dwell | V07's dwelling count | N (N_b, N_v = N − N_o); D(x) is item 102's daylight share everywhere | D, D_b, D_v, D_o for dwellings | V07 30, V06 1 | V07-TERM-2; g item 102's symbol |
| G-DR | the derivation rows the volumes added | DR26–DR35 (ID-DR) | DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8 | V08 119, V11 19, V06 16, V05 15, V12 14, V04 8, V09 8, V01 5, V07 2, V10 2 | J-VI.13; file f item 383 |
| G-M6U | the underground layer's milestone | M6-U ("M6" is volume 2's stage 3) | M6 (for the underground) | INDEX 3, V12 3, V09 1 | J-VI.22 (R-d) |
| G-panelgroup | the six item-110 items inside the M4 sitting | the M4 panel's M4-110 group | panel M4-110 | V11 2 | V12-TERM-1 |
| G-newrandom | the scoped regenerate with new randomness (§7.1) | New random (§7.1); 'Try again' is only its catalogue label; 'reroll' only for rerollLayer | scoped re-roll, Try again (in prose), Rebuild … as generated | V10 4, V09 3, determinism 2, scope 2, pipeline 1, V05 1, V06 1 | V09-TERM-4 |
| G-suppress | a removal of generated content that holds through regeneration | suppression (file f item 260) | kept removed, the removal holds, Removals that hold (in design prose) | V09 6, V10 1 | V09-TERM-4; J-VI.14 |
| G-rederive | the whole-town re-derivation from a stage | Re-derive (§7.1) | Rebuild from {stage} | V09 3 | V09-TERM-4 |
| G-reason | the raised way's reason word | drop · link · water (J-VI.2) | waterNeed | 0 | J-VI.2 |
| G-bend | an infeasible declaration turned to the nearest lawful one | bend (bend.* keys); refuse.* only for a dossier fact or a lock | refuse.raised.*, refuse.aqueduct.*, refuse.retaining.*, refuse.stack.* | V09 6 | J-VI.4 |
| G-unexcavated | the per-viewer switch for unexcavated voids | the view key `showUnexcavated` | LayerSpec.showUnexcavated | V04 1, V09 1 | J-VI.19 |
| G-fallbackclass | a custom kind's class | item 104 (a)'s resolution (V11 §3.13) | fallbackClass | V08 8, V11 3, pipeline 1 | J-VI.20 |
| G-digest | the dossier's deposits and terrain fields | site.deposits; site.terrain | nearbyResources[], site.terrainType | V07 1, V11 1 | J-VI.25 |
| G-clerkhandle | the handle createClerk(mount) returns | ClerkHandle | ClerkHarness | V10 14, V09 2 | E-33 |
| G-offline | the clerk being unreachable | refuse.clerk.offline | error.clerkOffline | V09 1 | E-32 |
| G-postop | a whole-tile post operation after the light | wash (tint), edgeFade (vignette); the role `lights` → `glow` | tint(colour, strength) as a post op, the role lights | rendering 2 | E-16 |
| G-portpath | the village product's registration | ProductDecl in StrategyRegistry.products (file f item 202) | PortRungPath, registerRungPath, its own port path | V08 5, scope 1, V07 1 | file f item 202 |
| G-JT | the Jonckheere–Terpstra trend test | JT | J-T | V12 6, pipeline 4, scope 4 | ID-JT |
| G-forkat | the history's forward path | Open a copy from here (a forkAt) | Change from here | V06 3 | J-VI.12 |
| G-floorvault | a church on wet ground without an always crypt | no crypt; ledger slabs in the chancel floor (V03 §3.7.4) | floor vaults (wet ground) | V03 3, V07 2, V09 1 | V10-XAGREE-4 |
| G-geojson | item 110's GeoJSON kinds | raisedSupport (per support), retaining (per run) | raisedSupports MultiPolygon, retainingWall kind | V01 1 | J-VI.18 |
| G-reservedparch | `parchment` | a shipping ink-family variant (RIC-01) | the reserved parchment | rendering 1 | RIC-01 |
| G-binaryangle | the 16-bit binary angle | (removed; centidegrees are the one angle unit) | 16-bit binary angle | 0 | E-15 |
| G-rosterassign | the roster line's claim on a plot | rosterAssignment (defined; MC-08) | — | 0 | MC-08 |

### Defined terms (their homes)

Every term the twelve inventories record as defined, with its home; a term defined in two units is defined at its home and cited elsewhere (`canon.json → glossary.terms` holds the definitions).

| term | unit | home | other names or hazards |
|---|---|---|---|
| "case (4)" in the lifecycle table | determinism | §7.4 |  |
| "ITEM n" (naming hazard) | determinism | §7.7 |  |
| "§7.7 layer n" (the three input layers | determinism | §7.7 |  |
| 'The nearest way' (here and V5 §3.12) | V05 | 3.10 |  |
| @plat/bridge-client (host client) | V08 | V08 |  |
| accelerator | kernel | terms | ['accelerator', 'WebAssembly accelerator'] |
| access |  | V5 §2.2 | "way up"; kinds also written "rope line", "floating stair", "bridge of light" in prose |
| AccessPoint | V04 | II.7.3–II.7.6 | ['access point', 'AccessPoint', 'access', 'air shaft', 'grating', 'cellar_stair', 'mouth'… |
| action form [[do | V10 | glossary |  |
| action form [[do:…]] — V10 §3.13 step 4 |  |  |  |
| AdapterManifest, AdapterRegistry | V08 | V08 |  |
| Address id (kind | model |  | ['address id', 'address', 'id', 'Id', '(distinct) lineage', 'lineage key', 'LineageHash',… |
| admissible ground |  | V5 §3.7 (2) | — |
| admission table | rendering | §9.2 | ['admission table', '`knowledge.admit`', 'the table (knowledge)'] |
| anchor |  | V5 §2.1 | — |
| anisotropy ratio a | pipeline | §4.2 S3 (1); §4.4 | ['a', 'anisotropy ratio', 'tip factor τ(a)'] |
| antenna | kernel | terms | ['antenna', 'antennae', 'antenna end', 'dangling chain'] |
| apply-then-undo | V10 | glossary |  |
| apply-then-undo — V10 §4.4 (§13.4's pre-decided fallback) |  |  |  |
| approach strip | V02 | 1b |  |
| arch vault / span / terminal cistern | V04 | 3.5.4 |  |
| arena | kernel | terms | ['arena', 'plat', 'PlatKey', 'ArenaKey', 'part (underground)', 'transient arena', 'Transi… |
| arena part | V04 / model §2.2 | II.7 | ['part', 'part 0', 'arena part', 'nextUndergroundPart', 'under<n>/'] |
| arrangement engine | kernel | terms | ['arrangement', 'the kernel own arrangement', 'arrangement engine', 'plat-arrangement@<ve… |
| attach vertex |  | V5 §2.3, §3.10 | — |
| attraction | kernel | terms | ['attraction', 'attracted', 'vertex attraction', 'segment and stretch attraction', 'candi… |
| attraction distance | kernel | terms | ['attractCm'] |
| AudienceWord | V08 | V08 |  |
| auto feature | pipeline | §4.2 S0; S1 (10); II.7.1 | ['auto features', 'feature table', 'autoResolved'] |
| B-CITY, B-EDIT, B-FUZZ, B-REF, B-ZOOM | scope | §1.7, §13 | B-CITY-lite; B-EDIT-lite; B-PLAN; B-DOSSIER-lite; 'five test benches' |
| B-MASS and the free-frame harness | V02 | 7 |  |
| band | pipeline — OVERLOADED: "band" also = area band (plaza/castle/district), block-depth band, wall band/half-band, margin band, depth band (underground), tree band, riverBandM, dwell band, class band (river width) | §4.5; §4.7; §4.11 | ['band', 'band set', 'BandSet', 'prosperity.bands', 'FieldBands', 'cuts', 'cut points', '… |
| band (LodBand) | rendering | §8.1 | ['band', 'LodBand', 'city band', 'district band', 'neighbourhood band', 'building band', … |
| band range | pipeline — near-collision with "geometry floor"'s "floor" | §4.5 (5); §4.7; §10.2 | ['band range', 'bandRange', 'BandRangeRow'] |
| band-less read | V09 | glossary |  |
| band-less read — a query the application makes for a view, sent with … |  |  |  |
| bar.<barId> | V12 | §2.1, §3.4.2 |  |
| base layer | rendering | §8.8 | ['base', 'base layer', 'base picture', '`under`', '`over`', '`shadow` layer', 'composed b… |
| base wing (BaseWing) and composed wing (Wing.base) | V02 | 2.1 |  |
| BaselinesFile / ReferencePin | V12 | §2.3 |  |
| BATCH-LOCAL / STAGE-END / SAVE / LOAD / CI-ONLY | determinism | §5.3 |  |
| BenchBarDef | V12 | §2.1 |  |
| bend | V02 | 1b |  |
| bend |  | J-VI.4 | "refused" in older wording |
| bend / bend line | V09 | glossary |  |
| bend / bend line — the nearest lawful result and its one-line reason … |  |  |  |
| BINDING KEY / KEY LAW / DOSSIER BINDING / CARRIED FACTS | determinism | §7.7 |  |
| birth level | kernel | terms | ['level', 'birth level', 'current birth level', 'L0-L4'] |
| block cache | rendering | §8.8 | ['block cache'] |
| block-depth range | pipeline | §4.6 step 1; §4.5 S7b (3); II.2 | ['block-depth range', 'e_lo', 'e_hi', "the band's plot depth d̄", "the band's upper block… |
| blueprint | model §2.9 / pipeline | §4.2 S0 | ['Blueprint', 'the request', 'recipe'] |
| border band | rendering | §8.10 | ['border band', 'the band (stamp)', 'seam-compatible'] |
| boundary run | model |  | ['boundary run', 'pairing', 'tiled', 'overlapping'] |
| bounded (way) | rendering | §8.5 | ['bounded', 'access-critical', 'access-critical lanes'] |
| Build it again / rebuildEvents | V09 | glossary |  |
| Build it again / rebuildEvents — the one function re-declaring a remo… |  |  |  |
| Building ladder rungs | model |  | ['building ladder', 'rung', 'lazy rung', 'plan rung', 'rooms rung', 'wings rung', 'outlin… |
| building shade mask |  | V6 §2.6, §3.4 | — |
| built stretch | V12 | §2.2 |  |
| burial face | V11 | §3.6.1 |  |
| burial face / primary / stagnant / close | V04 | 3.5.1 |  |
| cadence / span |  | V6 §3.3 | — |
| calamity table |  | V6 §2.4 | DR-V6.1 = DR28 |
| calibrate-later | V11 | §3.5.1 and passim |  |
| calibration minimum / possibility floor | V12 | §2.5, §3.7.2 (5), §3.10.4 |  |
| CalibrationEntry | V12 | §2.6 |  |
| CalibrationRun | V12 | §2.5 |  |
| callback form | kernel | terms | ['callback form', 'callback', 'tx(tx, fn)', 'callback-form stage'] |
| candidate annulus | rendering | §8.10 | ['candidate annulus', 'annulus', 'poisson.annulus'] |
| candidate lattice | pipeline | §4.2 S3 (3); §4.3 | ['candidate lattice', 'lattice', "S3's lattice", "(3)'s lattice"] |
| canonical order | kernel | terms | ['canonical order', 'canonical op order', 'canonical key', 'canonical item key', 'stable … |
| CANONICAL PRIOR | determinism | §7.3 |  |
| canonical prior | model |  | ['canonical prior', 'canonical chain', 'as-built plan', 're-cut'] |
| canonical prior | determinism §6.2 | §4.1 l.3839 | ['canonical prior'] |
| CANONICAL TEXT SERIALISATION | determinism | §6.2 |  |
| canvas budget | rendering | §8.8 | ['canvas budget', 'the need', 'P', 'Q', 'Q_f', "B (blocks' bound)"] |
| canvas script | V09 | glossary |  |
| canvas script — the gesture list the harness plays through the real t… |  |  |  |
| capacity check | pipeline | §4.4 S5d; §4.7 S10 | ['capacity check', 'top-up', 'exact check', 'exact capacity check'] |
| capped bays | V03 | 3.7.4 |  |
| carried supply S_carried |  | V5 §3.3 | h_carried its interpolated value |
| carve | pipeline | §4.11; §4.1; §4.4 | ['carve', 'carve path', 'conversion path', 'footprint R', 'clear region', 'fates', 'kept … |
| cassette, version pinning, evaluation groups A-I | V10 | glossary |  |
| cassette, version pinning, evaluation groups A-I — V10 §7.2, §7.3 |  |  |  |
| cast shadow | rendering | §8.4 | ['cast shadow', 'shadow', 'cast shadows'] |
| caster | rendering | §8.1 | ['caster', 'shadow caster', 'caster mark', 'undrawn caster marks', 'slab caster'] |
| caster ceiling / caster allowance |  | V5 §3.9 (3) | — |
| catch-all rule | V12 | §3.11 |  |
| cell operation | rendering | §8.4 | ['cell operation'] |
| CellRef | V12 | §2.5 |  |
| cells row | V12 | §2.6 |  |
| centre / nucleus | pipeline | §4.2 S3 (1); §4.2 S2 markets | ['centre', 'nucleus', 'growth nucleus', 'nuclei'] |
| chain class | kernel | terms | ['mandatory', 'optional', 'cls', 'chain class'] |
| chamber | kernel | terms | ['chamber', 'chamber_wall'] |
| CHANGE ENVELOPE | determinism | §7.7 |  |
| change marker | rendering | §8.5 | ['change marker', 'marker glyph', '`live.stale`'] |
| CHANGED REACH / FOOTPRINT / KEPT WAY / SUCCESSOR SITE / DETOUR BOUND | determinism | §7.3 |  |
| Character | model |  | ['character', 'CharacterVector', '(distinct) DistrictIntent', '(distinct) ContextVector'] |
| CHECKPOINT | determinism | §7.4 |  |
| chronicle / why rows |  | V6 §2.10 | — |
| circuit / pathway / fate |  | V6 §3.7 | — |
| city cut | rendering | §9.1 | ['city cut', 'cityCut', 'the cut'] |
| city LOD / first paint | pipeline | §4.1 l.3756 | ['one-click first paint', 'complete city LOD', 'city-band detail', 'the eager city LOD'] |
| class | scope | §1.4, §13, §15.2 | C conformance, P parity, O outcome (§1.4 'criterion class'; §15.2 '[C] [P] [O]'; §13 intr… |
| class floors | kernel | terms | ['class floors', 'face-size floors', 'class floor', 'minPlotWidth', 'minInteriorAnglePlot… |
| class mix | pipeline | §4.7; §10.2 | ['class mix', 'classMix', 'ClassMixRow', 'prestige', 'wealthShift'] |
| clear region | kernel | terms | ['clear region', 'clearRegion', 'region (§3.2 (9) frame growth)', 'footprint (of an edit)… |
| clearance check |  | V5 §3.9 (5) | repeated as sky.clearance at an epoch |
| clerk | rendering | §11.2 | ['clerk', 'assistant', 'AI clerk'] |
| clerk | scope | summary, §1.4, §14, Staged list | AI clerk; built-in clerk; the host's clerk; describe-to-map clerk; (J121/J122 say 'assist… |
| clerk (internal) / assistant ('Assistant (AI)', user-facing) | V10 | glossary |  |
| clerk (internal) / assistant ('Assistant (AI)', user-facing) — J-V10.… |  |  |  |
| clerk.ops (device only) and clerk.content (document-overridable) | V10 | glossary |  |
| clerk.ops (device only) and clerk.content (document-overridable) — V1… |  |  |  |
| Clientele | V11 | §2.3 |  |
| ClimateRow | V11 | §2.8, §3.17.1 |  |
| close-up | V01 | PART II | ['close-up', 'refine', 'replace', 'neighbourhood LOD', 'closeup event', 'instance-overrid… |
| close-up (CloseupParams, CloseupRecord) | V01 | 2.5 |  |
| closed-outline routine | pipeline | §4.2 S1 (2); II.1 (5); II.6; PART III | ['closed-outline routine', "§4.2's routine", 'the coast routine', 'outline template'] |
| CLOSURE / PREREQUISITES / CLOSURE GENERA | determinism | §7.3 |  |
| cluster / excavation reading / accessible / unexcavated | V04 | 3.5.7 |  |
| collision domain | V12 | §2.4 |  |
| ColumnSpec | V11 | §2.1 |  |
| commit record | kernel | terms | ['commit record', 'CommitRecord', 'dirty set'] |
| commonness | V11 | §3.5.1 |  |
| composition | V02 | 2.2 |  |
| concealed mark | rendering | §8.1 | ['concealed mark', 'concealed part', 'concealed parts'] |
| concealment | pipeline | §4.7; §10.2; II.7 | ['concealment', 'concealed use', 'front', 'cover', 'cover table', 'clandestine institutio… |
| condition run |  | file f item 575 | "stretch" in prose |
| configurations A (own key), B (host prox | V10 | glossary |  |
| configurations A (own key), B (host proxy), C (host's own clerk); hos… |  |  |  |
| confirm token | rendering | §11.2 | ['token', 'confirm token'] |
| confirmation stage | V12 | §3.6b |  |
| CONFIRMED / PLAUSIBLE | scope | title, §0.3, Appendix A | [STATED] / [SHOWN] / [INFERRED] (findings tags); 'an inference' (reader-only) |
| contact name | kernel | terms | ['contact name', 'anchor contact name', 'anchor row', 'anchor key'] |
| CONTENT DIGEST | determinism | §5.1 |  |
| Context vector | model |  | ['context vector', 'ContextVector', 'ctx', 'Plot.ctx'] |
| context vector | model §2.5 — principle (4) names "the one context vector of the plot model, prosperity field, granularity and greenery" | §4.7 S10 (10); S10b; §4.11 decline; II.7.3 | ['context vector', 'ContextVector', "the plot's context"] |
| ContextVector | scope | §14 strategies, §15.2 hooks row 4 | context vector (hooks row 4); DistrictContext / BlockContext (strategy inputs); 'ctx' |
| contour series | V01 | 3.17.1 |  |
| contrast matrix | rendering | §8.2 | ['contrast matrix', 'the matrix', 'matrix pair'] |
| conversion | pipeline | §4.11; II.7.5; II.7.6 | ['conversion', 'ConversionOp', 'convert event', 'LadderOp', 'DeclineOp', 'UseConversionOp… |
| convex near-rectangle test | kernel | terms | ['convex near-rectangle test', 'exact path'] |
| CorpusMapMeta / SampleFrame / FramesFile | V12 | §2.9 |  |
| CorpusRunId | V12 | §2.9 |  |
| corridor parts | kernel | terms | ['half-corridor strip', 'junction wedge', 'built block', 'corridor_split', 'band', 'corri… |
| cost law | rendering | §12.3 | ['cost law', 'law', 'model law', 'L(B)'] |
| count badge | rendering | §9.5 | ['count badge'] |
| count badge | V09 | glossary |  |
| count badge — the pill of plots, households, buildings, fates and eff… |  |  |  |
| coverage unit | V11 | §2.3 |  |
| coverage units |  | V5 §3.5 (3) | — |
| CoverageSpec | V11 | §2.3 |  |
| CPU reference | rendering | §8.4 | ['CPU reference', 'reference (light)'] |
| CREATION PREFIX | determinism | §6.2 |  |
| creation prefix | determinism §7.7 | §4.1 l.3847; §7.7 | ['creation prefix', 'the prefix', 'declarations', 'bones'] |
| critique engine and rows K1-K18 | V10 | glossary |  |
| critique engine and rows K1-K18 — V10 §3.10 |  |  |  |
| crossing site | pipeline (Bridge record §2.7) | §4.2 S1 (5); §4.3; §4.4; §4.8; §4.11 | ['crossing site', 'site', 'bridge_site', 'ford', 'pinned deck', 'deck', 'deck_end vertice… |
| CrossingRecord | V12 | §2.3 |  |
| crown library | rendering | §8.10 | ['crown library', 'crown set', 'crown sprites', 'crown bake'] |
| crypt-only basement | V03 | 3.7.4 |  |
| cryptSeedWings(b) (seed wings) and the raised/half-sunk crypt | V02 | 3.14.5 |  |
| CultureSpecialisationRow | V11 | §2.8c, §3.24.3 |  |
| cursor sun | rendering | §8.4 | ['cursor sun', '`cursor` sun', 'radial sun'] |
| custom content (CustomLibraryEntry, CustomChainDigest) | V08 | V08 |  |
| CustomChainRecord, CustomServiceRecord | V08 | V08 |  |
| cut ladder | pipeline (family §5.2) | §4.6 step 8 | ['ladder', 'rung', 'F-CUT', 'W_CUT_SLID'] |
| D-n (delegated decisions) | scope | Delegated decisions | D-1 … D-35 |
| deck condition |  | V6 §3.19.5 | — |
| DeckContext and deck plot | V02 | 3.16 |  |
| DeckRow / DeckLandmarkRow / DeckKind / deckOk | V11 | §2.8c, §3.24.4, §3.2.1 step 5a |  |
| DECLARATION / SUGAR EVENT / POINTS FORM / HANDLE / GHOST / CLERK | determinism | §7.1 |  |
| declared form | kernel | terms | ['declared form', 'declared', 'KernelTx.ops', 'op set'] |
| DECLARED SHIFT / SHIFT RECORD / CASCADE RECORD / CASCADE SHIFT | determinism | §6.4 |  |
| declared trade | rendering | §12.9 | ['declared trade', 'declared miss', "for the owner's veto"] |
| decline ladder | pipeline hook / V06 | §4.11; II.6 | ['decline', 'ladders', 'DeclineOp', 'decline table', 'strike lottery', 'exposure field E(… |
| deep void | V12 | §3.4.2 |  |
| deep-interior rule / treatment | pipeline | §4.6; §4.7 | ['deep-interior rule', 'interior', 'treatment', 'court', 'back_lane', 'through_alley', 'r… |
| default line | V12 | §3.11 |  |
| DELIVERY TIER | determinism | §5.1 |  |
| density raster (village.density, bands empty/scattered/close/dense) | V07 | V07 |  |
| departure matching |  | V6 §3.5.1 | — |
| derivation pool | pipeline | §4.1 l.3793 | ['derivation pool', 'the pool', 'pool worker'] |
| DERIVATION TABLE (rows DR1-DR25) | determinism | §7.7 |  |
| DERIVATION UNIT | determinism | §6.3 |  |
| derived light | rendering | §8.4 | ['derived light', 'lit window', 'room light', 'light shaft', 'shaft'] |
| DERIVED-COMPLETE DIGEST | determinism | §6.5 |  |
| deserted village (desertion) | V07 | V07 |  |
| designation template / mutator | pipeline | §4.7 S11; §10.2; §4.11 | ['designation template', 'template', 'template row', 'DesignationTemplateRow', 'designati… |
| dials | pipeline | §4.5 (6); §4.11 | ['dial', 'three dials', 'institution dial', 'quarter dial', 'economy dial', 'amplificatio… |
| diff table | V08 | V08 |  |
| digest steps | V08 | V08 |  |
| Digests | model |  | ['model digest', 'model root', 'records digest', 'records root', 'provenance digest', 'do… |
| display cells | V11 | §3.1, W77 |  |
| display list | rendering | §8.1 | ['display list', 'DisplayList', 'the list', "the tile worker's list", "the city band's li… |
| display text | rendering | §9.1 | ['display text', '`displayText`'] |
| DISRUPTION | determinism | §7.7 |  |
| distribution | pipeline | §4.5 (3); §4.7; §10.2 | ['distribution', 'district-defining', 'dispersed', 'singular', 'defining instance'] |
| district / quarter / neighbourhood | pipeline — OVERLOADED: "neighbourhood" names four concepts | §4.5; §4.10; PART II; II.7.3; II.7.5 | ['district', 'ward', 'quarter', 'QuarterNode', 'neighbourhood', 'underground neighbourhoo… |
| DISTRICT INTENT (input, DistrictIntent)  | determinism | §7.7 |  |
| district kind / identity / character | pipeline | §4.5; §4.10; §10.4; II.1 | ['kind', 'District.kind', 'identity', 'District.identity', 'character', 'character vector… |
| DistrictContext | V01 | 2.3 |  |
| disuse / runs dry |  | V6 §3.19.2 | — |
| document formats | rendering | §11.1 | ['document formats', 'document format'] |
| document-only table | V11 | §2, §4.2 |  |
| door side / door point / span | V03 | 3.7.1 |  |
| doors | rendering | §11.4 | ['door (1)-(4)', 'doors', 'door 1 (closed, other way)'] |
| DOSSIER FACT vs MAP FACT (and declared map fact) | determinism | §7.7 |  |
| DOSSIER-BACKED ELEMENT | determinism | §5.3 |  |
| DOSSIER-OWNED value | determinism | §5.2 |  |
| dossier.keywords | V11 | §3.13.2 |  |
| dossier.kinds | V11 | §3.11 |  |
| dossier.ladders | V11 | §3.12 |  |
| double-run check | rendering | §11.4 | ['double-run check'] |
| draft | V09 | glossary |  |
| draft — the live gesture's state before commit (Draft); draft mirror … |  |  |  |
| draft, draft item (D<n>), CreatedRef pla | V10 | glossary |  |
| draft, draft item (D<n>), CreatedRef placeholder, scratch document, o… |  |  |  |
| draw sequence | rendering | §8.9 | ['draw sequence'] |
| drawer, clerk slot, card-only drawer | V09 | glossary |  |
| drawer, clerk slot, card-only drawer — V10's view model's screen, its… |  |  |  |
| drawn week | rendering | §8.1 | ['drawn week', 'the week drawn', '`week`'] |
| dry run | scope | §14, T101-2 | preview (API call); ghost (live.ghost); fates list; fate report; count badge |
| due mark | pipeline | §4.5; §4.11 | ['due', 'DUE', 'due mark', 'Block.due', 'due block'] |
| dwelling closure | V09 | glossary |  |
| dwelling closure — a dwelling declaration in a sealed void expanded w… |  |  |  |
| dynamic grid | kernel | terms | ['dynamic uniform grid', 'dynamic grid', 'grid', 'uniform grid per level'] |
| eager / lazy | pipeline | §4.1 | ['eager', 'lazy', 'lazily'] |
| EAGER MODEL | determinism | §6.2 |  |
| EDIT FATE | determinism | §7.1 |  |
| effective instances | V12 | §2.7b, §3.6b |  |
| effective key and key order (admitsAll) | V10 | glossary |  |
| effective key and key order (admitsAll) — V10 §2.3 |  |  |  |
| EFFECTIVE SCOPE | determinism | §7.3 |  |
| effective week |  | V6 §2.11 | — |
| effects list | V09 | glossary |  |
| effects list — the typed consequences to unheld things (BCR-V9-27; V9… |  |  |  |
| elaboration cache | model §2.9 | §4.1 l.3835; §2.9 | ['elaboration cache'] |
| ELABORATION CACHE / ELABORATION RECORD / | determinism | §6.2 |  |
| empty state | V09 | glossary |  |
| empty state — the untouched one-click town before the first declarati… |  |  |  |
| empty-table rule | V11 | §2.1, §2.10 |  |
| enclosure | V12 | §2.2, BCR-V12-15 |  |
| entity-store line | rendering | §12.8 | ['entity-store line'] |
| entrance reserve | V01 | 3.8.2 |  |
| entry status | V12 | §2.6 |  |
| epoch | pipeline hook / V06 | §4.11; §4.5 | ['epoch', 'epoch event', 'grow', 'grow-by-stage', 'EpochInputs', 'EpochRecord', 'delta de… |
| epoch | scope | §1.5, §13.2 T76-1, Staged list | week; weekly clock; cadence; years; EpochInputs |
| epoch |  | V6 §3.1 | "period" in V05's plain words |
| EpochPlacement (place, remove) | V07 | V07 |  |
| EpochScope |  | V6 §2.1 | — |
| EraRow | V11 | §2.8, §3.19.1 |  |
| EvidenceClass | V12 | §2.9 |  |
| exchange class | V03 | 3.5 |  |
| Existence state (one per entity) vs lifecycle flags (orthogonal | model |  | ['existence', 'existence state', 'Existence', 'flags', 'LifecycleFlags', 'tombstone', 'ar… |
| explain, asPlaced / asNow, placed set, PlacementOrder, exact, drifted | V10 | glossary |  |
| explain, asPlaced / asNow, placed set, PlacementOrder, exact, drifted… |  |  |  |
| export-time peak | rendering | §12.8 | ['export-time peak', 'peak'] |
| exposure field E(x) |  | base §4.11 | — |
| extra bridge | pipeline / determinism §5.2 | §4.1 table; §4.2 S1 (5); §4.3; §4.4 S5b | ['extra-bridge rung', 'extra bridge', 'a deck where no site stands', "over: 'added'"] |
| F-LABEL ladder | rendering | §9.4 | ['F-LABEL ladder', 'the ladder', 'rung (1)-(7)'] |
| F-V-* failure ladders (F-V-PAL, F-V-ANCHOR, F-V-GATE, F-V-FAIR, ...) | V07 | V07 |  |
| fabric (District.fabric, fabricParams) | V01 | 2.1 |  |
| fabric hint |  | V5 §3.12 | — |
| fabricSignature(outline) | V01 | 1b |  |
| facadeBays(wing, side, bayM) | V02 | 3.7 |  |
| fact tier | rendering | §9.2 | ['fact tier', 'tier', '`factTier`', '`plat:tier`'] |
| Fact tier (dossier ¦ declared ¦ map | model |  | ['fact tier', 'FactTier', 'factTier', 'tier', 'dossier ref', 'DossierRef', 'dossier paths… |
| FAILURE LADDER / RUNG / TIER | determinism | §5 |  |
| failure rows B1-B20 | V08 | V08 |  |
| family | rendering | §8.2 | ['family', 'style family', 'ink family', '`lit` family'] |
| fantasyShapes | V02 | 4.4 |  |
| farm mode / extent | pipeline — COLLISION: "fill" is both a farm mode and an extent value (also "generation fill" of households, and the "fill" hand edit §4.11) | §4.9 | ['farm mode', 'FarmModeRow', 'extent', 'fill'] |
| fates sheet | V09 | glossary |  |
| fates sheet — the non-modal list of fates, renames and effects confir… |  |  |  |
| feature class | V11 | §1b W38 |  |
| feature snap | rendering | §9.5 | ['feature snap', 'snap', 'snap query'] |
| field drivers (FieldDrivers) | V10 | glossary |  |
| field drivers (FieldDrivers) — V10 §3.9 |  |  |  |
| figure-ground contract | rendering | §8.5 | ['figure-ground contract', 'figure-ground'] |
| fill |  | V5 §3.5 | — |
| first map | rendering | §8.5 | ['first map', 'first paint', 'one-click first paint', 'time to first map', 'unlit first m… |
| first ring | rendering | §8.8 | ['first ring', 'ring', 'first-ring position'] |
| first-five-minutes test, pipeline sessio | V09 | glossary |  |
| first-five-minutes test, pipeline session, owner's UX sitting (F5Reco… |  |  |  |
| first-frame law | rendering | §12.5 | ['first-frame law', 'F(B)', 'first frame'] |
| flanking square | pipeline | §4.2 S3 (12); §4.3 | ['flanking square', 'flanking principal market', 'a widened main street'] |
| FOOTPRINT (of an edit, the clear region) | kernel | 3.3 |  |
| fork / re-run |  | V6 §4.4 | "what-if copy" |
| FORM / FORMS CATALOGUE | determinism | §7.7 |  |
| frame | kernel | terms | ['frame', 'Frame', 'frame rectangle', 'border chain', 'margin chain', 'arena outer ring'] |
| frame.<table>.<column> | V12 | §2.1, §3.4.2 |  |
| framing | rendering | §9.5 | ['framing', 'framing rule', 'framing percentile'] |
| front-line jitter | pipeline | §4.7 S11; §10.2 | ['front-line jitter', 'recession', 'h', 'SitePlan.frontJitterCm', 'jitter.maxM/minM'] |
| frozen base | kernel | terms | ['frozen base', 'freeze', 'the copy', 'read-only copy'] |
| frozen view, upgrade offer, open its recipe | V09 | glossary |  |
| frozen view, upgrade offer, open its recipe — the three load outcomes… |  |  |  |
| furniture | rendering | §9.5 | ['furniture', 'map furniture', 'screen-space furniture'] |
| generation worker | pipeline | §4.1 l.3791 | ['generation worker', 'generation Web Worker'] |
| generation worker | rendering | §8.9 | ['generation worker'] |
| generic class | V11 | §3.5.14, §3.13.3 |  |
| geo anchor | rendering | §11.1 | ['geo anchor', '`exportAnchor`', '`+platGeoAnchor`', 'anchor'] |
| Geometry floor | model |  | ['geometry floor', 'geometryFloor'] |
| geometry floor / builtBand | pipeline | §4.11; §4.5; II.1; II.3 | ['geometry floor', 'geometryFloor', 'builtBand', 'builtProsperity', 'floor', 'manifested … |
| ghost | V09 | glossary |  |
| ghost — §8.2's live.ghost drawing of a preview; pending ghost — one a… |  |  |  |
| global light | rendering | §8.4 | ['global light', 'the sun', 'the moon'] |
| golden suite | scope | §13.3, D-24 | seed goldens; stage-isolated goldens; end-to-end goldens; the golden store |
| GoodWordRow | V11 | §2.8, §3.13.5 |  |
| GovernmentRow.villageSeat / ArchetypeVillageCell | V11 | §2.8, §3.21.1 |  |
| GPU pass | rendering | §8.4 | ['GPU pass'] |
| grade face | V03 | 3.12 |  |
| granularity law | pipeline | §4.7 S10 (2); §4.6 | ['granularity table', 'granularity law', 'GranularityLaw', 'granularity rows'] |
| ground reference groundRefCm |  | V5 §3.9 (3) | — |
| ground(b) | V03 | 3.3 |  |
| grounding check (links, unlinked names,  | V10 | glossary |  |
| grounding check (links, unlinked names, claims, actions, repair), unv… |  |  |  |
| grower | pipeline | §4.5 | ['grower', 'seeds', 'round', 'turn', 'edge test', 'patch test', 'leftover rule'] |
| GuardSet / TOWN guard | V12 | §2.5 |  |
| H128 / H32 / RH32 | scope | §13.6 (2), §14, §17.1 (8) | MurmurHash3 x86 128-bit; 'the first 32-bit output word' |
| halo | rendering | §9.4 | ['halo', 'halo role'] |
| hand lantern | rendering | §8.4 | ['hand lantern', '`handLantern`', 'lantern'] |
| hand-off band (handoff.band, 5 %) | V07 | V07 |  |
| handover |  | V5 §3.5 | "hand-over" (prose) vs handover (field) |
| HARBOUR WORK | determinism | §5.3 |  |
| hardware tier | rendering | §8.8 | ['hardware tier', 'tier', 'low tier', 'mid tier', 'high tier'] |
| harness (ClerkHarness | V10 | glossary |  |
| harness (ClerkHarness = ClerkHandle), createClerk(mount) — V10 §2.6 |  |  |  |
| hatched | V01 | 5.1 |  |
| head (of a way down) | V03 | 3.7.2 |  |
| held | V12 | §3.11 (J-V12.77) |  |
| held reason | V08 | V08 |  |
| hinterland | pipeline | §4.1; §4.2 S2; §4.9 | ['hinterland', 'countryside', 'outside classes', 'outside plots', 'farm modes', 'field-sy… |
| hinterland unit | pipeline | §4.1 l.3801; §4.9 | ['hinterland unit', 'the hinterland pseudo-district', 'its unit'] |
| historical pack | V12 | §3.10.3 R1 |  |
| history index / store / frame / image / keyframe |  | V6 §2.11, §3.15.2 | — |
| hit stack | V09 | glossary |  |
| hit stack — every mark under a point, top first; click-again cycling;… |  |  |  |
| hollow way (retired way) |  | V6 §3.5.2 | two names |
| home column | kernel | terms | ['home column', 'home entry', 'Plat.indexHome', 'indexHome'] |
| HOMONYM "anchor" | model |  | ['anchor (role)', 'anchor rule (§6.3)', 'plan anchors', 'Enceinte.anchors', 'CharacterVec… |
| HOMONYM "band" | model |  | ['band (field band class)', 'band (wall band)', 'band (tunnel band)', 'building band', 'd… |
| HOMONYM "identity" | model |  | ['Identity', 'District.identity', 'quarter identity', "shell's identity", 'identity subtr… |
| HOMONYM "ladder" | model |  | ['building ladder', 'interior ladder', 'wealth ladder', 'decline ladder', 'tunnel ladder'… |
| HOMONYM "passage" | model |  | ['Passage', 'passage face', 'Tunnel.kind passage', 'passage room', 'Opening.kind passage'… |
| HOMONYM "pin" | model |  | ['Pin', 'pinned (lifecycle flag)', 'pinned (kernel vertex flag)', 'pinVertices', 'view pi… |
| HOMONYM "rung" | model |  | ['rung (building ladder)', 'rung (settlement size, Rung)', 'rung (wealth ladder item 31)'… |
| HOMONYM "stage" | model |  | ['stage (pipeline S-number)', 'stage rank', 'StageId', 'growth stage', 'growthStage', 'st… |
| HOMONYM "tier" | model |  | ['fact tier', 'knowledge tier', 'F-PLAN tier', 'tier word'] |
| HOMONYM "trace" | model |  | ['trace (wall chain)', 'footprint trace', 'trace (superseded ring)', 'trace (reclaimed la… |
| hood line | V04 | 3.1 |  |
| hood pin (HoodPin, HoodPinRow) | V01 | 3.8 |  |
| hood.constants | V01 | 3.14 |  |
| HoodPlace | V01 | 2.2 |  |
| horizontal spine | rendering | §9.3 | ['horizontal spine'] |
| host bridge | rendering | §11.3 | ['host bridge', 'bridge', 'BridgeTransport'] |
| host lines, 'The party', dossier groups | V09 | glossary |  |
| host lines, 'The party', dossier groups — the host's own history line… |  |  |  |
| host mode | V08 | V08 |  |
| hot pixel | kernel | terms | ['hot pixel', '0.71 cm', 'hot-pixel band'] |
| household ledger / displaced pool / transit |  | V6 §2.1, §3.8.1 | "pool" overloaded |
| identity composition | V02 | 3.13 |  |
| INDEPENDENCE | determinism | §7.4 |  |
| Indicator / Quantity / Step / Level | V12 | §2.7b |  |
| inert export | rendering | §11.1 | ['inert exports', 'inert'] |
| informal cluster | pipeline — OVERLOADED: "cluster" also = trade-group cluster tag (S7b (2), BuildingClassRow.cluster, clustered relation row), clustering term (outside plots), connected cluster of chambers (undercity capacity) | §4.7; §4.11; §10.2; §10.4 | ['informal cluster', 'cluster arrangement', 'cluster row', 'cluster plot', 'shacks, tents… |
| interactive guard | rendering | §9.2 | ['interactive guard'] |
| island gradient P_I |  | V5 §3.11 | "the island's field" |
| island rule | V05 | II.6; §4.5 S7b (5); §4.9 | ['island rule', 'IslandRule', 'S_town', 'S_carried', 'h(v)', 'supply law', 'count slots',… |
| island-free value |  | V5 §3.19 (7) | — |
| J-… rows | scope | Judgment calls; §13.7 | J-1–J-18, J-K, J-DET, J-P, J-R, J-S, J-I, J-A⟨item⟩.⟨n⟩, J-F⟨lane⟩-⟨n⟩; program rows J33,… |
| journal and compaction | V09 | glossary |  |
| journal and compaction — the two-phase call journal and its folding i… |  |  |  |
| kept content | kernel | terms | ['kept content', 'kept', 'kept face', 'kept geometry'] |
| kerb | kernel | terms | ['kerb', 'kerb(F)', 'kerb edge', 'kerb function'] |
| kerb | kernel §3.7 | §4.6; §4.7 S9; II.7.2 | ['kerb', 'kerb(F)', 'kerb polygon', 'external wall', 'chamber_wall'] |
| kernel pinned flag vs held vs opts.pinned | kernel | terms | ['pinned (kernel flag)', 'pinVertices', 'pinned entity (§7.2)', 'held', 'held set', 'held… |
| Kernel vocabulary of refinement | model |  | ['Steiner vertex', 'promotion', 'demotion', 'dissolution', 'split restoration', 'prepared… |
| knee | rendering | §12.5 | ['knee'] |
| knot / profile | kernel | terms | ['knot', 'knot profile', 'ChainProfile', 'cut knot', 'profile'] |
| knowledge filter | rendering | §9.2 | ['knowledge filter', 'label policy', 'the filter'] |
| knowledge guard | V10 | glossary |  |
| knowledge guard — V10 §3.12; withheld (address and registry kind only… |  |  |  |
| knowledge key | rendering | §9.2 | ['knowledge key', '`knowledge`', 'the key', 'tier'] |
| known-city fixtures 1 and 2 and the dedi | V09 | glossary |  |
| known-city fixtures 1 and 2 and the dedicated-user bar (V9 §7.2) |  |  |  |
| known-defects.json | scope | §13.2–§13.7, §14 | plat/docs/known-defects.json; 'the known defects' |
| KnownCityFixture / StructureCheck / StructureResult | V12 | §2.12 |  |
| knownTo | model §2.5 | §4.6; §4.7; II.7 | ['knownTo', 'knowledge', 'secret'] |
| L* and the detour guard | pipeline | §4.2 S3 (4), (7), (11) | ['L*', 'detour guard', 'harbour gate', 'harbour pick', 'serving gate'] |
| label floor | rendering | §8.2 | ['label floor', 'the floor (contrast)'] |
| LabelEntity | rendering | §9.1 | ['LabelEntity', 'label entity', 'label'] |
| LabelStyle.leaders | rendering | §9.3 |  |
| LADDER (naming hazard) | determinism | §5.1 |  |
| LadderStepRow | V11 | §2.6 |  |
| land face |  | V5 §3.8 | — |
| landfall |  | V5 §3.16 | — |
| landfall candidate |  | V6 §3.5.2 | — |
| landing door, terrace exit, terrace door, seating exit, stack root | V03 | 3.3 |  |
| landing yard |  | V5 §3.10 | "landing", "landing claim", "landing reservation", "yard" used interchangeably |
| LAPSING STRETCH | kernel | 3.2 |  |
| lattice point | kernel | terms | ['lattice', 'lattice point', 'LatticePoint', 'world lattice', 'the grid'] |
| law's altitude E |  | V5 §3.3 | — |
| layer | model |  | ['layer', 'model layer', '(distinct concept) display-list group selected by semantic'] |
| layer-order table | rendering | §8.2 | ['layer-order table', 'layer order', 'order table', 'slot table'] |
| layout class | V09 | glossary |  |
| layout class — wide / medium / narrow by viewport (V9 §2.2, §4.12) |  |  |  |
| laziness contract | pipeline | §4.1 l.3738 | ['laziness contract', 'the contract'] |
| lease | V08 | V08 |  |
| ledger |  | V6 §2.13 | "household ledger" is a different ledger |
| legibility floors | rendering | §9.4 | ['legibility floors', 'floor', 'the floor'] |
| level reading | V03 | 3.3 |  |
| Level-n route of an edge | model |  | ['level-n route', 'route'] |
| light map | rendering | §8.4 | ['light map', 'light-map bake', 'bake'] |
| light pass | rendering | §8.4 | ['light pass', 'the pass', 'CPU reference light pass', 'GPU pass'] |
| light source | pipeline / rendering §8.4 | §4.7; §10.3; II.6; II.7 | ['light source', 'LightSource', 'light rows', 'light table', 'LightRule', 'window lights'] |
| light step | rendering | §8.4 | ['light step', 'drawn light step', 'light-step pass'] |
| light-map key | rendering | §8.4 | ['light-map key'] |
| lighting model | rendering | §8.4 | ['lighting model', 'the model (light)', 'field model', 'LightingSpec'] |
| link cache, Link card, Supply links view | V09 | glossary |  |
| link cache, Link card, Supply links view — bound supply links and the… |  |  |  |
| live layer | rendering | §8.2 | ['live layer', 'live-layer provider', 'LiveLayerProvider', 'live.<id>', 'overlay provider… |
| lived | V04 | 3.9 |  |
| Load vocabulary | model |  | ['working state', 'verification replay', 'h0', 'root of record', 'frozen view', 'corrupt … |
| LOCALITY CLASS (local / re-derive from S | determinism | §7.8 |  |
| locus reader and wording a locus | V09 | glossary |  |
| locus reader and wording a locus — the typed-words parser and its inv… |  |  |  |
| logHead | rendering | §11.3 |  |
| low-end device | rendering | §12.1 | ['low-end device', 'low end'] |
| M-1, M0, M1, M2a, M2b, M3a, M3b, M4, M4b, M5 | scope | §16, D-35 | the combined order's V-M0…V-M4, M3c, M6, M6-E, M6-U, M6-sky, M-CAL, M-SF, P0–P1 (J122) — … |
| M4-110 | V12 | §3.9.1 |  |
| main slot / half / claimed storey / vacant programme / unit floor | V03 | 3.2 |  |
| maintenance mode | V04 | 3.1 |  |
| map brief (MapBrief) and map block; vocabulary block; lexicon | V10 | glossary |  |
| map brief (MapBrief) and map block; vocabulary block; lexicon — V10 §… |  |  |  |
| Map tab | V08 | V08 |  |
| MapHost, MapSession | V08 | V08 |  |
| MapRecord | V08 | V08 |  |
| MapStore, MapHostConfig | V08 | V08 |  |
| margin band | pipeline | §4.1; §4.5; §4.7 S10 (0); II.1 | ['margin band', 'shared-edge bands', 'step (0)', 'headland', 'backland strip'] |
| mark | rendering | §8.1 | ['mark', 'mark row', 'caster mark', 'span mark', 'text mark', 'light mark', '`instances` … |
| mass | rendering | §8.5 | ['mass', 'masses', 'footprint masses', 'building masses'] |
| massing | V02 | 2.1 |  |
| massing family (MassingFamilyId) | V02 | 3.3 |  |
| MassingRef | V02 | 2.1 |  |
| mastered / at parity / the stage-2 gate | scope | §13.6, §16, D-5 | 'the base at parity' (M2b), 'mastered' (M4), the stage-2 gate (M5) |
| max clause | rendering | §12.3 | ['max clause', 'confirmed outlier'] |
| max-height pyramid | rendering | §8.4 | ['max-height pyramid', 'pyramid'] |
| maximum-clearance spanning tree | rendering | §9.3 | ['maximum-clearance spanning tree', 'spine', 'longest path'] |
| MeasureInput / MeasureFeature | V12 | §2.2 |  |
| measurement render | rendering | §8.2 | ['measurement render'] |
| member |  | V5 §3.16 (5); BCR-V5-9 | — |
| message catalogue | V09 | glossary |  |
| message catalogue — messages/<locale>.json rows (MsgRow) keyed MsgKey… |  |  |  |
| meter, caps (monthly, turn), warnShare | V10 | glossary |  |
| meter, caps (monthly, turn), warnShare — V10 §3.18 |  |  |  |
| MetricDef / METRICS | V12 | §2.1 |  |
| MetricId | V12 | §2.1 |  |
| MetricInput | V12 | §2.1 |  |
| minimum edge | kernel | terms | ['minEdge', 'minEdgeCm (§2.2 LatticeSpec)'] |
| minimum face angle | kernel | terms | ['minFaceAngle', 'minFaceAngleCdeg (§2.2 LatticeSpec)', 'minimum angle 5 deg (§3.8 skelet… |
| MODEL DIGEST vs RECORDS DIGEST | determinism | §6.2 |  |
| model formats | rendering | §11.1 | ['model formats', 'picture exports', 'raster formats', 'interchange exports'] |
| MODEL PACKAGES | determinism | §6.5 |  |
| model sampler |  | BCR-V5-15 (base §4.5) | "model sun samples", "the sampler" |
| model time law | V07 | V07 |  |
| model vs view (labels) | rendering | §9.1 | ['model data', 'view data', 'S13a', 'S13b'] |
| MutationPlan |  | V6 §2.5, §3.10 | — |
| NAMED ACTIONS | determinism | §7.1 |  |
| Named draw shapes | V07 | 3.1 |  |
| named draw shapes u, B3, F4, S | V07 | V07 |  |
| NAMING CLAIM / NAMED-FEATURE CLAIM | determinism | §7.7 |  |
| neck (river-bend fencing) | V07 | V07 |  |
| Need / NeedSpec | V11 | §2.3 |  |
| network stage | V04 — COLLISION: "network" also = NetworkStrategy (street network) | II.6; II.7 | ['network stage', 'SewerStrategy', 'sewer network', 'follow-streets/drainage-lines/mixed'… |
| never carried / carried by share / split |  | V5 §3.5 (3) | "works" (split) collides with V06's Works record |
| NG preset | V01 | 3.15 |  |
| node term |  | V5 §3.3 | "magical node" |
| NoOpPin | V12 | §2.13 |  |
| not achieved | scope | §13.7, §15.2 | a letter whose fallback moved its threshold |
| notApplicable | V12 | §3.4.2, §3.6 |  |
| Nuisance / Lvl | V11 | §2.3 |  |
| NullModelSpec / NullPass | V12 | §2.7 |  |
| Occupants' band | model |  | ["occupants' band", 'field band', 'fieldBand', '(distinct) manifested band', '(distinct) … |
| One point shape with three names | model |  | ['PointCm', 'Point', 'VecCm', 'LatticePoint'] |
| one reach law |  | V6 §3.4 (4); BCR-V5-15 (i) | — |
| op form | pipeline (forms: kernel §3.3) | §4.1 l.3719; §4.12 | ['op form', 'StageDecl.txForm', 'transaction form'] |
| oracle | kernel | terms | ['oracle', 'CI oracle', 'B-FUZZ'] |
| oracle | rendering | §11.2 | ['oracle', '`why`', 'why answer'] |
| oracle, WhyAnswer, WhyProvider, section  | V10 | glossary |  |
| oracle, WhyAnswer, WhyProvider, section provider, generic provider, o… |  |  |  |
| ordinal | rendering | §8.10 | ['ordinal', 'instance ordinal'] |
| ORPHAN | determinism | §7.3 |  |
| outline / door part / admissible point (stackAccessDoor) | V03 | 3.7.2 |  |
| outline close-up | V01 | 3.8.9 |  |
| outlying farmsteads | V07 | V07 |  |
| outsideCm / exposure | V03 | 3.6 |  |
| overflow ladder |  | V6 §3.6 (2) | — |
| overlap / mine breach / proximity link / | V04 | 3.5.7 |  |
| overlay | kernel | terms | ['overlay', 'scratch overlay (batch execution)', 'district overlay (pool)', 'open overlay… |
| override chain | V11 | §3.2.4 (loader) |  |
| OVERRIDE LAYER / OverrideLayer | determinism | §7.6 |  |
| override resolution | rendering | §8.10 | ['override resolution', 'applies by ordinal', 're-matches by position', 'orphaned', 'byOr… |
| owner rule | scope | §0.2, §1.4, §13.3 | OWNER RULE items; the owner's rules; owner non-negotiable 10; the owner's DESIGN TIEBREAK… |
| ownerRule | V12 | §2.10, §3.10.3 R6 |  |
| ownerRule stamp / calibration minimum | V11 | IN-V11-1 (only there) |  |
| pack set | model |  | ['pack set', 'packs', 'skeleton file', 'skeleton'] |
| paint program | rendering | §8.2 | ['paint program', 'program', 'PaintProgram'] |
| PairedMeasure | V12 | §2.7b |  |
| palette targets | rendering | §8.2 | ['palette targets', 'the targets', 'corpus bands'] |
| palisade, palisade section, light stretch | V07 | V07 |  |
| panel rule | V12 | §3.11 |  |
| PanelSpec / PanelGroup / PanelRender / AnswersFile | V12 | §2.8 |  |
| parish partition | V11 | §2.3 |  |
| PARITY PRESET / EXTENSION CELL | determinism | §7.6 |  |
| parity presets | rendering | §8.4 | ['parity presets', 'the `MFCG` preset', 'the `FTG` preset'] |
| PartyKnowledge | V08 | V08 |  |
| PartyPictureSet (party pictures) | V08 | V08 |  |
| pass (MarkTable.pass) | rendering | §8.1 | ['pass', 'MarkTable pass'] |
| per-row rule | rendering | §8.8 | ['per-row rule'] |
| phase / step / participant |  | V6 §2.1 | — |
| pin pass | rendering | §9.2 | ['pin pass', 'fixed pin'] |
| pinned placement | rendering | §9.1 | ['pinned placement', 'PinnedPlacement', 'Placement', 'pin', 'pinned label'] |
| placed light | rendering | §8.4 | ['placed light', 'LightSource', 'point light'] |
| placement rule | kernel | terms | ['placement rule', 'placement point', 'placement bound'] |
| placement solver | pipeline | §4.7 S10b; §10.2 | ['placement solver', 'the solver', 'PlacementSolver', "S10b's solver", 'relation template… |
| placement unit | rendering | §9.2 | ['unit', 'placement unit'] |
| Plan-rung geometry vocabulary | model |  | ['extent', 'span ring', 'seed ring', 'seed piece', 'fixed ring', 'clip order', 'container… |
| plantRimWalk | V01 | 3.10 |  |
| PLAT | scope | title, §1, §14 | the program; the module; the map; @plat/* |
| PLAT is the codename (a plat | scope | title block |  |
| plate model | rendering | §8.2 | ['plate model'] |
| PLaw (the anchor law) | V07 | V07 |  |
| players' view (party group, player tab) | V08 | V08 |  |
| plot | model |  | ['plot', 'lot (retired except in quotations)', 'parcel'] |
| plot | scope | summary, §1.4, §13.5 | parcel (summary l.43; §1.4 buildings row); lot (the references' word; 'lots drawn as buil… |
| plots-only view | rendering | §8.5 | ['plots-only view', '`plotsOnly`', 'cadastral view'] |
| port leader | V08 | V08 |  |
| PortRows | pipeline hook / V08 | §4.5; §4.6; §4.9; §10.2; II.7 | ['PortRows', 'portRows', 'staged rows', "the port's staged rows", 'crime term', 'import s… |
| pre-assigned plot | pipeline | §4.1 l.3842 | ['pre-assigned plots', 'assigned at the city level', 'just not generated'] |
| PRECEDENCE ORDER | determinism | §7.7 |  |
| prepared contact | kernel | terms | ['prepared contacts', 'prepared vertices', 'KernelTx.prepared', 'candidate (c)'] |
| PresenceWhen (presence column) | V07 | V07 |  |
| preset | rendering | §8.2 | ['preset', 'style preset', '`stylePreset`', 'parity preset', 'the `MFCG` preset', 'the `F… |
| PresetArm | V12 | §2.1 |  |
| PresetEntry | V11 | §2.2 |  |
| PresetId | V11 | §2.2 |  |
| pressure | pipeline | §4.5 (8) | ['pressure', 'District.pressure', 'excess'] |
| primary configuration / single-worker fallback | pipeline | §4.1 l.3792, l.3807-3812 | ['primary configuration', 'single-worker fallback', 'pool size 0', 'pool-size-0 path'] |
| principal crypt | V03 | 3.7.4 |  |
| product / fold / hand-off band |  | V6 §3.1 (3) | — |
| profile family | V11 | §3.4 |  |
| progressive rank | rendering | §8.10 | ['progressive rank', 'rank', 'normalised rank'] |
| projected shadow (rung 3) | rendering | §8.4 | ['projected shadows', 'projected-shadow pass', 'projected pass', 'the shadow pass', 'proj… |
| promotion / demotion | kernel | terms | ['promotion', 'promoted', 'demotion', 'demoted', 're-levelled'] |
| proposal, variation (rules asDeclared/re | V10 | glossary |  |
| proposal, variation (rules asDeclared/rerolls/sites/sizeBand/seeds/sh… |  |  |  |
| prosperity field | pipeline — note "density field", "greenery propensity field" same construction | §4.5 | ['prosperity field', 'P(x)', 'the field', 'pass 1', 'pass 2', 'prosperity value', 'driver… |
| prosperity island / institution island |  | V5 §3.4 | "rich neighbourhood island" in prose |
| PROTECTION CLASSES | determinism | §7.2 |  |
| provenance | scope | §17.1 (6), §13.7 | own; ref:⟨reference⟩ ⟨behaviour⟩; owner; owner-eye ⟨milestone⟩; architecture ⟨date⟩; corp… |
| ProvenanceSpec | V11 | §2.2 |  |
| provisional - not rated | V12 | §2.6 |  |
| provisional — not rated | scope | §13.6 (7), §16, D-5 | 'provisional-not-rated' (D5Status enum spelling) |
| pseudo-class | V11 | §3.11 (W35) |  |
| Pseudo-district | model |  | ['pseudo-district', 'hinterland pseudo-district', 'sky pseudo-district', 'underground pse… |
| pseudo-district | pipeline | §4.1; §4.5 S7b; II.6; II.7.3; II.7.5 | ['pseudo-district', 'hinterland pseudo-district', 'sky pseudo-district', 'underground pse… |
| pseudo-district | V01 | 2.7 |  |
| Public ground (stated once) | V04 | 1.2 |  |
| quarantined (binding state) | V08 | base §7.7 item 12 (DossierBinding; BCR-V8-8) |  |
| quarter | scope | summary, §14, §0.2 item 72 | city-zoom merged district label node (quarter merge tree); T5 quarter declaration (paints… |
| QuarterNode | rendering | §9.1 | ['QuarterNode', 'quarter node', 'quarter', 'node'] |
| queue class | rendering | §8.9 | ['queue class', 'class 1-4', 'the queue'] |
| R1-R6 / E1-E5 / A1-A5 | V12 | §3.10.3, §3.10.4, §3.10.6 |  |
| raised section and raisedOutcome | V10 | glossary |  |
| raised section and raisedOutcome — V10 §3.9 |  |  |  |
| raised under-copy | rendering | §8.4 | ['raised under-copy', '`raised`', 'Raised', 'under-copy'] |
| raised way / reason key |  | V6 §2.13, §3.19 | — |
| Raised-way piers | V05 | 1 |  |
| RaisedRead | V07 | V07 |  |
| RaisedWayRow / RaisedWaySettings / RaisedWayStructure / RaisedKind | V11 | §2.8c, §3.24.2 |  |
| random style | rendering | §8.2 | ['random style', 'random draw', 'bounded repair'] |
| range invariant | kernel | terms | ['range invariant', 'range bound', 'the range 2^23 cm', 'rangeCm (§2.2)'] |
| raster job | rendering | §8.9 | ['raster job', 'RasterJob', 'resumable raster', 'job'] |
| reach / exposure | pipeline — OVERLOADED: "exposure" also = decline exposure field E(x) (§4.11), wind exposure (S1, S3), exposure row (RelationRule) | §4.6; §4.7; §4.11; II.6 | ['reach', 'Block.reach', 'passage', 'gated', 'exposure', 'Plot.exposure', 'hidden plot', … |
| reached (village.reached face) | V07 | V07 |  |
| reader check | V11 | §3.2.1 step 6 |  |
| REBASE / FROZEN VIEW / RETENTION WINDOW | determinism | §6.4 |  |
| rebaseStack(b, ground) | V02 | 2.6 |  |
| RECEIPT TABLE (rows F1-F22) | determinism | §7.7 |  |
| Recently deleted | V09 | glossary |  |
| Recently deleted — the 30-day bin of local towns (V9 §2.11, §5.12) |  |  |  |
| ReconciliationRecord | V12 | §2.9 |  |
| record-owned counts |  | V6 §3.9.1 | — |
| recorded-read suite | V11 | §7.1 T-V11-1 (b) |  |
| reference cell ({ref: {table, row, cell}}) | V07 | V07 |  |
| reference machine | rendering | §12.1 | ['reference machine', 'reference hardware', 'reference device'] |
| reference spacing r0 | rendering | §8.10 | ['reference spacing', 'r0'] |
| reference viewport | rendering | §12.5 | ['reference viewport', 'reference view'] |
| refresh queue | V08 | V08 |  |
| refusal category (RefusalCategory) vs bend | V10 | glossary |  |
| refusal category (RefusalCategory) vs bend — V10 §2.9, §3.16 |  |  |  |
| regime |  | V6 §3.6 (3) | — |
| REGION (of a frame growth) | kernel | 3.2 |  |
| region group | rendering | §9.1 | ['region group', 'RegionGroup', 'region', 'region label'] |
| register --check / --defaults / --hold | V12 | §3.11, T-V12-20 |  |
| REGISTRY | V11 | §3.1 |  |
| regrowth tiers (0)-(6), (5′), (5″) |  | V6 §3.8.2 | — |
| REJECTION / LAPSE / POSITIVE PLACEMENT | determinism | §7.7 |  |
| RelationFamilyRow | V11 | §2.4 |  |
| relief class | pipeline | §4.2 S0, S1 (1); §4.9 | ['relief class', 'relief', 'relief-character amplitude'] |
| removal update | rendering | §8.10 | ['removal update'] |
| removed slot / removed ordinal |  | V5 §3.2 (6), §3.10 (1) | V06 "suppression" is the same mechanism (IN-V05-2) |
| Render key | rendering | §8.1 |  |
| Render-tag table | rendering | §8.1 |  |
| replay law | rendering | §12.6 | ['replay law', 'V', 'reference verification mix'] |
| residual / backlog / quantum |  | V6 §3.6 | — |
| resolution chain | V02 | 3.2 |  |
| resolution floor | rendering | §8.4 | ['resolution floor', 'floor cell', 'the floor'] |
| ResourceRow (goods) | V11 | §2.5, §3.7 |  |
| restore point | V09 | glossary |  |
| restore point — a named or auto bookmark on a log position (restore/<… |  |  |  |
| RetainingProfileRow / RetainingSettings | V11 | §2.8c, §3.24.1 |  |
| RH32 | rendering | §8.1 | ['RH32', 'render hash', 'render-time hash'] |
| rim |  | V5 §3.8 | "cliff", "edge" in prose |
| rim slab |  | V5 §3.9 (2) | — |
| rim strip |  | V5 §3.10 (5) | "strip" collides with shade strip (V05) and under-deck strip (V06) |
| rim walk |  | V5 §3.12; V01 V1-3.10.3 | — |
| ring block | rendering | §8.4 | ['ring block', 'block', 'blocks'] |
| role | model |  | ['role', 'role row', 'RoleRow', 'role registry', 'structural role', 'partition role', 'in… |
| role | rendering | §8.2 | ['role', 'palette role', 'Role'] |
| Roles (23) | rendering | §8.2 |  |
| roof terrace T(x), walkable terrace, roof level | V03 | 3.4a |  |
| roofscape | V02 | 5.2 |  |
| route distance skyRoute |  | V5 §3.20 | "the route" |
| route edge | kernel | terms | ['route edge', 'route', 'run', 'route-edge item', 'level-n route'] |
| row sets (tables/dossier/) | V08 | V08 |  |
| ruin / culture row / significance / pers | V04 | 3.5.0a |  |
| run |  | V5 §2.2 | maxRunM limits the horizontal distance — two senses of "run" |
| rung | scope | §1.1, D-33 | size; tier ('size tier'); TOWN / CITY / METROPOLIS; the ladder; size ladder |
| RungProfile | scope | §1.1, §14, §13.9 | ladder.json row; 'the rung profile'; the ladder's village rows |
| runs | pipeline (kernel sideRuns) | §4.6 | ['runs', 'sideRuns', 'side', 'start run', 'far run'] |
| scope (district) | kernel | terms | ['scope', 'district scope', 'face set'] |
| SCOPE (naming hazard) | determinism | §5.3 |  |
| scoped re-roll (Try again) and re-roll brush | V09 | glossary |  |
| scoped re-roll (Try again) and re-roll brush — V9 §3.7 |  |  |  |
| Seam | pipeline / V01 | II.1; §4.6; §4.12 | ['Seam', 'Seam record', 'SeamEdge', 'seam type', 'hard/soft seam', 'SeamContract', 'SeamR… |
| SEAM EXCEPTION | determinism | §7.3 |  |
| seam exception | determinism §7.3 | §4.6 step 7; §4.11 carve; II.1 (3); II.4; §7.3 it… | ['seam exception', 'effective scope', 'neighbour step', 'identity exception'] |
| seam portal | pipeline | §4.6 step 7; II.1 | ['portal', 'baseLane portal', 'tJunction', 'SeamAmendment', 'portal gap', 'seam portal'] |
| seamClose | rendering | §8.8 |  |
| SeamContract | scope | §1.6, §13.2, §15.2 S1, Staged list | Seam record; seam exception; portals (baseLane); soft / hard seams |
| SeamReport | V01 | 2.4 |  |
| SEED KEY / ENTITY KEY / STREAM KEY / TOWN ROOT / RENDER KEY | determinism | §6.1 |  |
| seed primitive | V01 | 3.4 |  |
| SeedFamily / seedOf | V12 | §2.4 |  |
| service region R, run, trunk, drop, field outfall, culvert | V04 | 3.2 |  |
| SESSION (authoring) | determinism | §7.4 |  |
| settings form | V11 | §2.1 (ColumnSpec.row) |  |
| settle | rendering | §12.5 | ['settle', 'settle bound', 'settle raster'] |
| settlement dot | rendering | §8.5 | ['settlement dot', 'dot'] |
| settlement perimeter | pipeline | §4.5; §4.9 | ['settlement perimeter', 'perimeter'] |
| settlement radius R_s | V07 | V07 |  |
| SF0-SF7 and VH (build stages) | V08 | V08 |  |
| shade basis |  | V5 §2.1 | — |
| shade evaluation |  | V5 §3.19 (6) | stated in ~10 places |
| shade strip |  | V5 §2.3a, §3.19 | "strip" overloaded |
| shade view / veil | V09 | glossary |  |
| shade view / veil — the six-step daylight-share rendering (V9 §5.4) |  |  |  |
| shadeSky |  | V5 §3.11 | — |
| shell | V09 | glossary |  |
| shell — the one program (ShellConfig, ShellMode, HostSlots) both the … |  |  |  |
| SignaturePairRow | V11 | §2.4 |  |
| significance σ | pipeline | §4.5 (1); §10.2 | ['significance', 'σ', 'σ-weighted'] |
| SitingProfile | V11 | §2.3 |  |
| sitting | V12 | §0, §3.9 |  |
| skeleton (format) | rendering | §11.1 | ['skeleton', 'declared subset', 'transcript'] |
| skeleton uses and downgrades | kernel | terms | ['roof', 'spine', 'regions', 'plain roof', 'sampled medial axis', 'reflex pre-cut partiti… |
| SKY / SKY-F |  | V5 §3.1 | — |
| sky island |  | V5 §2.1 | "island"; plain words "floating island" |
| sky part |  | V5 §2.1 | "part" also names ground parts ≥ 1 of raised ways (item 110) — overloaded |
| SkyHandover |  | V5 §2.3 | "hand-over" |
| slab list | rendering | §8.4 | ['slab list', 'occluder slabs', 'slab', 'slab caster'] |
| SLICE / NAMING SLICE | determinism | §7.6 |  |
| SliceKind | V11 | §2.1 |  |
| slide / re-seat | kernel | terms | ['slide', 'sliding vertex', 're-seat', 're-seated'] |
| sliver / residue | kernel | terms | ['sliver', 'residue', 'absorbSliver'] |
| slot | rendering | §8.1 | ['slot', 'layer-order slot', 'slot s'] |
| slot |  | V5 §2.1, §3.2 | distinct from "part" (identity) |
| slot race | V07 | V07 |  |
| slot resolution | rendering | §8.2 | ['slot resolution', 'resolution (slot)'] |
| slotBand | V02 | 3.15 |  |
| snapshot block and chunks | kernel | terms | ['block', 'snapshot block', 'chunk', 'level-<=1 routes chunk', 'partition chunk', 'Steine… |
| SnapshotBlock | V08 | V08 |  |
| solid wing (BaseWing.solid) and sealed stack | V02 | 2.6 |  |
| solidMonument | V03 | 3.3 |  |
| SOLO / AB / DW | V12 | §2.8 |  |
| source manifest | V11 | §3.2.1 step 1 |  |
| SourceFile / SourceRow / SourceCell | V11 | §2.2 |  |
| span mark | rendering | §8.5 | ['span mark', 'span ring'] |
| spine | kernel §3 / pipeline | §4.3; §4.6 | ['spine', 'arterial spine', 'chain'] |
| split flag | kernel | terms | ['split flag', 'split'] |
| split flag | model |  | ['split flag', 'split'] |
| split pair |  | V6 §3.9.10 (3) | V05 "split shop" |
| stack helpers deckLevel, storeyRange, stairChain, landingSide | V02 | 2.6 |  |
| stack, tier, stack order | V02 | 2.6 |  |
| stage 2 | scope | §1.1, §1.6, §13.6, §14, §16 M5 | neighbourhood composition; NG-class close-up; close-up; neighbourhood LOD; hood (@plat/ho… |
| stage 3 | scope | §1.1, §1.2, Staged list | manor-style building compositions; compose(); the plan rung (fourth rung); floor plans by… |
| stage boundary / trace / enceinte | pipeline | §4.2 S3 (6)-(9); §4.4 S5a; §4.8 | ['boundary', 'stage-1 boundary', 'trace', 'wall trace', 'enceinte', 'wall', 'circuit'] |
| stage glyph | rendering | §8.5 | ['stage glyph'] |
| stage graph | pipeline | §4.1 | ['stage graph', 'the pipeline'] |
| stage regime | pipeline | §4.2 S2; §4.4 | ['regime', 'stage regime', 'StageRegime rows', 'walled regimes', 'extramural regimes'] |
| stage-2 feature S1…S6 | V01 — distinguished from pipeline stages S0–S15 by the prefix | PART II | ['stage-2 feature S1', '(stage-2 feature S2: context features)', 'stage-2 features S5, S6… |
| staged by the owner's roadmap | scope | §1.1, Staged list, §16 | staged; 'later'; 'much later'; 'after the city is mastered'; 'hooks only' |
| staged entry | V12 | §2.6, §3.11 |  |
| stageIds / stageReaders | V11 | §3.2.1 steps 6-7 |  |
| stair-entered (crypt) | V03 | 3.7.4 |  |
| stale rung | model §2.8 | §4.1 l.3834-3842 | ['stale', 'stale until clicked'] |
| standalone neighbourhood document (Recipe.product | V01 | 3.10.1 |  |
| standing notes | V08 | V08 |  |
| StatBarSpec / Rule | V12 | §2.7b |  |
| states table | rendering | §8.2 | ['states table', '`states` rows', '`states` table', 'StateRow', 'states row'] |
| static partition | kernel | terms | ['static packed indexes', 'static partitions', 'static index partitions', 'partition'] |
| StatSpec / ClassSelector | V12 | §2.7 |  |
| Steiner vertex | kernel | terms | ['Steiner vertex', 'finer vertex on a coarser edge', 'Steiner split', 'split vertex'] |
| stoop | V03 | 3.6 |  |
| strain |  | V6 §3.9.2 | — |
| street-edge recoverability | rendering | §8.5 | ['street-edge recoverability', 'recoverability'] |
| stretch | kernel | terms | ['stretch', 'StretchRef', 'lapsing stretch', 'shared stretch'] |
| Stretch (StretchRef | model |  | ['stretch', 'StretchRef', 'knot profile', 'ChainProfile', 'profile', 'knot role', 'cut kn… |
| strike pool |  | V6 §3.5.2 | "lottery", "pool", "decline pool" — "pool" also the displaced pool and the worker pool |
| structural faces | V03 | 2.4 |  |
| style sheet | rendering | §8.2 | ['style sheet', 'sheet', 'StyleSheet', 'style'] |
| StyleSheet.family includes 'graphic', a  | rendering | §8.2 |  |
| supported area A |  | V5 §3.3 | — |
| suppression / served / released |  | V6 §3.19.3, §3.19.1 | V05 "removed" for islands |
| surface layer | rendering | §8.4 | ['surface layer', 'surface', '`surface` layer'] |
| surface top |  | V5 §3.9 (4) | ShadeBasis.surfaceTopCm; DisplayList.surfaceTopCm (base) is a different quantity |
| SURVIVE / SUCCEED (successor) / TOMBSTON | determinism | §6.3 |  |
| switch table | V11 | §3.24.0 |  |
| switch-on bump | V12 | §3.7.6 |  |
| symbolisation | rendering | §8.2 | ['symbolisation', 'symbolisation table', 'Symbolisation', 'drawn width'] |
| system chip | V09 | glossary |  |
| system chip — the Below-layer chooser of an underground system and Ne… |  |  |  |
| TableId | V11 | §2.1 |  |
| TableSchema | V11 | §2.1 |  |
| template face | V01 | 3.4.1 |  |
| TemplateFamilyRow / template family | V11 | §2.8, §3.6 |  |
| templateLandM2(D, row) | V01 | 3.3.7 |  |
| TemplateRow (table hood.templates) | V01 | 2.2 |  |
| tenure | pipeline | §4.7; §4.11; §10.2 | ['tenure', 'Plot.tenure', 'TenureRow'] |
| TerraceRow | V11 | §2.8c, §3.24.1 |  |
| terraceState(D) | V01 | 2.3 |  |
| the base | scope | title, §1.1 | PART I; stage 1; the town/city generator; STAGE 1 — the BASE |
| The document's subject | scope | title block |  |
| the dossier | scope | summary, §14, §17.1 (3) | SettlementForge's dossier; a host's settlement record; SettlementForge's file; the host's… |
| the dossier port | scope | §14, §16, Staged list | @plat/port; DossierPort; 'the one door for dossier facts'; door 1 (creation) / door 2 (ab… |
| the fallback ladder (F-LIGHT) | rendering | §8.4 | ['fallback ladder', 'rung 1', 'rung 2', 'rung 3', 'rungs 1-2', 'the vector rung', 'the la… |
| the greedy | rendering | §9.2 | ['greedy', 'global greedy', 'evaluated locally', 'local evaluation'] |
| The ground | V04 | 1.2 |  |
| the host | scope | §14, §11.3 pointers | SettlementForge; the embedding page; host glue; the host bridge |
| the named actions | scope | §13.2, §14 R5, §16 M2a | Regenerate (keep settings); New random; Same kind new seed; Adjust; Re-derive; reroll; re… |
| the one-page summary | scope | title, §0.2 rows | 'The whole design in one page (plain words)'; 'the summary' |
| The plat | model |  | ['plat', 'arena', 'arena part', 'part', 'PlatKey'] |
| the realism tiebreaker | scope | §1.4 | DESIGN TIEBREAKER; TB (in §1.4's table) |
| the twelve tools | scope | summary, §1.4, §14, §13.2 T101 | authoring toolkit; T1 intend … T12 dress; declarations; sugar events; points forms; three… |
| the week / the clock | pipeline — COLLISION: module "calendar" and "clock" (hours, time view key) §10.3/§10.1 vs "no second calendar exists" §4.11 | §4.11; §10.3 | ['week', 'the clock', 'weekly clock', 'calendar.elapsedWeeks', 'HostContext.week', 'dossi… |
| thematic layer | rendering | §8.2 | ['thematic layer', 'thematic row', 'theme', 'character theme', 'ThematicRow'] |
| then-and-now |  | V6 §3.15.3 | — |
| THORP, HAMLET, VILLAGE (village rungs, bands [1, 80), [80, 400), [400… | V07 | V07 §2.1 (base PART III (5) restates them; f item… |  |
| tile DPR | rendering | §8.8 | ['tile DPR', 'DPR', 'd'] |
| tile worker | rendering | §8.9 | ['tile worker'] |
| timing phase | rendering | §12.1 | ['timing phase'] |
| toft, croft, frontage run, back close | V07 | V07 |  |
| TOMBSTONE | kernel | 3.3 |  |
| tool rail, the five layers (L0-L4), home tool | V09 | glossary |  |
| tool rail, the five layers (L0-L4), home tool — the rail's grouping; … |  |  |  |
| TOOLKIT LAYERS L0-L4 | determinism | §7.1 |  |
| top / foot |  | V5 §2.2 | — |
| TotalityRule | V11 | §2.1 |  |
| TOUCHED SET | determinism | §7.4 |  |
| town supply S_town |  | V5 §3.3 | h_town its interpolated value |
| township / territory frame | V07 | V07 |  |
| tracker (tracker-steered network; road, track, approach) | V07 | V07 |  |
| trade weight | pipeline | §4.2 S3 (4); §4.3; §4.5 (2) | ['trade weight', "bearing's trade weight", 'TradeFlow.gates/ways', 'trade position'] |
| trajectory / advance |  | V6 §2.3 | "time card" |
| transaction | kernel | terms | ['transaction', 'batch', 'KernelTx', 'tx', 'move batch', 'clear-region batch', 'coarse ba… |
| transcript (ClerkTranscript v3) and its  | V10 | glossary |  |
| transcript (ClerkTranscript v3) and its skeleton projection; defect s… |  |  |  |
| transient arena parts | kernel | terms | ['seed ring', 'fixed ring', 'fixed edge', 'input side', 'joint', 'seed clip', 'tileRings'] |
| transient list | rendering | §8.1 | ['transient list', "export's transient list", 'transient display list'] |
| travel-cost field T | pipeline — NOTE "field" also names the prosperity/density/greenery fields | §4.2 S3 (6); §4.4 S5a | ['T', 'T(x)', 'the field T', 'network travel cost', 'the one travel-cost field', 'level s… |
| traversal | rendering | §8.4 | ['traversal', 'the law'] |
| TREE SCOPING | determinism | §7.3 |  |
| trigger policy | pipeline (key: model §2.9) | §4.1 l.3824 | ['trigger policy', 'elaborate key', 'elaboration by click'] |
| TRUNCATION | determinism | §7.4 |  |
| tunnel condition | V04 — note "condition" also = Building.condition (kept → worn → neglected) | II.6 | ['condition', 'condition table', 'in use/neglected/partly caved in/collapsed/sealed/flood… |
| turn, entry, route (converse, explain, critique, help), segment | V10 | glossary |  |
| turn, entry, route (converse, explain, critique, help), segment — V10… |  |  |  |
| Two kinds of tier (J-V5.66) | V05 | 1 |  |
| under-deck strip | V01 | 3.17.3 |  |
| undercity | V04 | II.7.5 | ['undercity', 'undercity neighbourhood', 'void', 'void source', 'lifelines', 'outskirts',… |
| undercity core / plaza / walkway / carve | V04 | 3.6 |  |
| underground system | V04 | II.7.6 | ['system', 'UndergroundSystem', 'gallery', 'chamber', 'link', 'UndergroundLink', 'connect… |
| underlay | rendering | §9.5 | ['underlay', '`underlay`'] |
| underside profile |  | V5 §2.1, §3.9 | — |
| underside tier |  | V5 §1, §3.9 | vs "massing tier" (J-V5.66) |
| Unit (metric) | V12 | §2.1 |  |
| unit run | V01 | 3.10 |  |
| unserved / ruined |  | V5 §2.2 | — |
| Use | model §2.7 / pipeline | §4.11; §4.7; §10.3 | ['use', 'Use', 'formerUses', 'use step', 'openUse/closeUse/relocateUse', 'catchment'] |
| v. namespace (25 village classes) | V07 | V07 |  |
| v.<id> namespace | V11 | §2.9, §3.22 |  |
| variations tray, Show three more | V09 | glossary |  |
| variations tray, Show three more — three derived versions of a fill, … |  |  |  |
| vault (of a crypt) | V03 | 3.7.1 |  |
| VERSION AXES | determinism | §6.4 |  |
| VG parity preset | V07 | V07 |  |
| View as and effective key | V09 | glossary |  |
| View as and effective key — a display filter (ViewOpts.viewAs) and th… |  |  |  |
| village product | V07 | V07 |  |
| village rung | V07 | PART III; §4.6; §4.9; II.6; II.7 | ['village rungs', 'the village product', 'village ladder', 'LadderRouter'] |
| village rungs | scope | §1.1, §15.1, PART III | THORP → HAMLET → VILLAGE; the village product; VILLAGE-LATER (tag) |
| village.pins | V07 | V07 |  |
| village.records | V07 | V07 |  |
| VillageEnd (ends, declareEnd) | V07 | V07 |  |
| VillageField (great field, furlong, meadow, commons) | V07 | V07 |  |
| villageForm | V11 | §3.22 |  |
| VillagePlan | V07 | V07 |  |
| VillageRequest | V07 | V07 |  |
| VillageRuleCells | V07 | V07 |  |
| VillageRungRow | V07 | V07 |  |
| visibility V_s | rendering | §8.4 | ['visibility', 'V_s'] |
| void face |  | V5 §3.8; BCR-V5-24 | — |
| VS1-VS8 village stages | V07 | V07 |  |
| W_STEEP_RAMP | V11 | §3.24.5 |  |
| walk-out (wall, fall) and tomb door | V03 | 3.7.1 |  |
| Wall vocabulary | model |  | ['trace', 'wall strip', 'strip', 'band', 'half-band', 'setback', 'glacis', 'berm', 'inter… |
| WallBarrierRow / arcKind | V11 | §2.7 |  |
| wane / settle / fall / refloat / raise |  | V5 §3.15 | — |
| WaterfrontThreatRow | V11 | §2.7 |  |
| WaterNeedRow | V11 | §2.8c, §3.24.6 |  |
| WaterSetting | scope | §13.2, §13.3, §13.6 | none / coast / river / coast+river; 'water setting'; 'water configuration' |
| WayCrossingRow | V11 | §2.8c, §3.24.5 |  |
| wealth ladder | pipeline — OVERLOADED: "rung" also = size-ladder rung (TOWN/CITY/METROPOLIS/THORP…), elaboration rung (outline/wings/rooms/plan), failure-ladder rung, cut-ladder rung; "ladder" also = size ladder, interior ladder, decline ladder, F-* ladders, requested-mode ladder, F-UNDER ladder | §4.11; §4.5; §4.6; §4.9 | ['wealth ladder', "survivors' ladder", 'the ladder', 'rung 1/2/3', 'LadderOp', 'ladder ta… |
| web off form | V11 | §3.7.4 |  |
| weld vertices / outer arc | pipeline | §4.2 S3 (8)-(10); §4.4; §4.8 | ['weld vertices', 'welds', 'outer arc', 'shared stretch', 'town-side arc', 'Castle.cityWe… |
| whole-step validation | kernel | terms | ['whole-step validation', 'whole step', 'halving'] |
| why id | V11 | §2.4 |  |
| WhyCardModel and why card | V09 | glossary |  |
| WhyCardModel and why card — the app-side projection of V10's WhyAnswe… |  |  |  |
| window R | rendering | §8.4 | ['window', 'R', "the global light's window"] |
| wing key | V02 | 2.1 |  |
| wing role (WingRole) | V02 | 2.1 |  |
| wingsInputs | V02 | 3.11 |  |
| within reach / foundation obstacle / pillar | V04 | 3.5.0 |  |
| WORK LIMIT | determinism | §5.1 |  |
| work limit | kernel | terms | ['work limit', 'workLimit', 'operation counts', 'work count'] |
| working / surface quarry / worked out | V04 | 3.5.3 |  |
| working layer | V09 | glossary |  |
| working layer — Ground / Sky / Below, the model layer the tools act o… |  |  |  |
| Works | pipeline — OVERLOADED: "stage" = pipeline stage, growth stage k, Works stage, product stage (stage 2, stage 3), "stage-2 feature S1…S6" | §4.11; §4.10; §10.4 | ['Works', 'Works record', 'stage', 'stageAt', 'heightsAt', 'WorksTable', 'WorksRow', 'ret… |
| Works |  | base §4.11 | collides with a split class's "works" and the works step |
| world position | rendering | §8.10 | ['world position'] |
| world-aligned tile | rendering | §8.8 | ['world-aligned tile', 'tile', 'tile position', 'TileAddress'] |
| zoom stop (ZoomStop) | rendering | §8.8 | ['zoom stop', 'stop', 'ZoomStop', 'stop k'] |
| χ̃ (provisional character) | V01 | 3.2 |  |
| — | scope | §1, §13, §14, §15 | size tier; CI tier (PR / nightly / milestone); delivery tier 1–6 (report); knowledge tier… |

## Conflicts — every one ruled

Each: the statements, where, the ruling, its basis in the precedence, and the units that change. FIX = change at the units; FIX-BY-F = an f item applied as written resolves it.

### DIC-01 (determinism; minor) — FIX

* claim: §5.3 defines five invariant scopes (batch-local, stage-end, save, load, CI-only) and assigns load to four rows (the stored binding equals the fold; the neighbourhood character recomputation; the decoded snapshot's roots and chunk hashes; the replayed roots), but GenerationReport.stages[].invariants[].scope is 'batch'¦'stage'¦'save'¦'ci' — a load-scope failure has no scope value to be reported under.
* *Where:* ['§5.3 preamble and rows', '§5.4 GenerationReport']
* **Ruling:** GenerationReport.stages[].invariants[].scope gains 'load' (the load-verification replay rebuilds the report).
* *Basis:* §5.3 is the home of invariant scopes (R4); §5.4 follows it. *Units:* determinism.

### DIC-02 (determinism; minor) — FIX

* claim: "Attempt cap" has two readings: the tier table says "<= 3 attempts per reroll", F-CUT runs attempts 0-2 (k x 36 deg, 2 turns) and style.random draws "attempt 0-2" — the cap as a count of attempts; yet many concerns declare "attempt cap 0" (use.relocate, plan.program/roles/furnish, reserve.market, cut.interior, cut.stop, works, pin.light, render.stampTiles), which under the count reading means no draw at all, so there the cap must be the highest attempt index — under which "cap 3" is four tries.
* *Where:* ['§5.1 tier table', '§5.2 F-CUT', '§6.1 attempt component and registry']
* **Ruling:** The attempt cap is defined once in §6.1 as the HIGHEST ATTEMPT INDEX (attempts run 0…cap; cap 0 = one attempt). Every place that states a number of tries keeps its number of tries, restated as an index: the tier table's '≤ 3 attempts per reroll' reads 'attempt cap 2', F-CUT's attempts 0–2 and style.random's 0–2 read cap 2; every concern that states 'attempt cap n' without a count keeps n as its index. No concern's number of draws changes.
* *Basis:* §6.1 home of streams and attempts (R5); nothing lost or changed (3). *Units:* determinism.

### DIC-03 (determinism; minor) — FIX

* claim: F-WORK says "report work_cut with the count" and F-BUDGET-TIME "telemetry records time_over", but the report's fields are kernel.workLimitHits and stages[].work, and Telemetry.timeOver is a StageId list; ladderUses.cause is a free string and no registry lists the cause codes the ladders write (work_cut, time_over, W_CUT_SLID, "not built", "no crossing", "no alternative within the ladder", unserved, ...).
* *Where:* ['§5.2 F-WORK, F-BUDGET-TIME and every ladder column', '§5.4 GenerationReport, Telemetry']
* **Ruling:** One cause-code enumeration in §5.4 (code, failure class, report field): work_cut, time_over, W_CUT_SLID, not built, no crossing, no alternative within the ladder, unserved and every other code a §5.2 ladder writes; the F-rows use those names; ladderUses.cause is typed by it.
* *Basis:* §5.4 home of the report (R4). *Units:* determinism.

### DIC-04 (determinism; minor) — FIX

* claim: Item 10 says the derivation table is an INDEX whose rule is "stated there, never here", yet DR21's chance cell restates §6.1's works keying (start offset in the epoch's span first, duration second; keyed by the target's lineage with the epoch's week and epoch component; a dated change's duration alone).
* *Where:* ['§7.7 item 10', '§7.7 DR21']
* **Ruling:** DR21's chance cell reads 'works (§6.1)'; the keying stays stated once in §6.1.
* *Basis:* §7.7 item 10: the derivation table is an index (R6); §6.1 home of keying (R5). *Units:* determinism.

### DIC-05 (determinism; minor) — FIX

* claim: The "§7.7 item n" convention names the dossier contract's items, but inside §7.7 bare "item 12", "item 13", "item 14" and "item 16" mean contract items (Assignment.state "through item 14's rows", DR25 "item 14", "item 16 below") while the owner's amendment items 12 (underground neighbourhoods), 13, 14 (existence by tier), 15 and 16 (relation templates) exist and are cited bare elsewhere in the unit (§7.1 RosterLine "item 16's relation templates"; §7.8 "items 13, 14, 15").
* *Where:* ['§7.7 preamble and items 1-16', '§7.1 RosterLine', '§7.8 layer controls']
* **Ruling:** Inside §7.7 the dossier contract's own items are cited '§7.7 item n' everywhere; bare 'item n' means an owner or amendment item only (set-wide rule ID-ITEM).
* *Basis:* principle (2)/(4); canon ID-ITEM. *Units:* determinism.

### DIC-06 (determinism; minor) — FIX

* claim: The tool ids T1-T12 share the T-prefix namespace with test ids (T8-1 ... T8-3, T12-1, T19-4, T65 fixtures, T73-8): "T8" and "T12" read as either a tool or an item's test group (§16 also cites "item 101's T2-T8" for tools). Principle (4) requires ids unique across the set.
* *Where:* ['§7.1 twelve tools', '§7.8 T1 intend', '§13.2 test ids']
* **Ruling:** Resolved by canon ID-TOOL: bare T1–T12 are item 101's tools, always written with the tool word at first use in a paragraph (T8 `fill`); an item's bars are always written with their number (T8-1, 'the T8-n bars'), never a bare T8.
* *Basis:* owner item 101 names the tools (owner rule > base); canon ID-TOOL. *Units:* determinism, scope, V07, V09, V10.

### DIC-07 (determinism; minor) — FIX

* claim: The toolkit's commitment layers are labelled L0-L4 (intent ... finish), the same labels as the arena refinement levels L0-L4 used in the same sections (a warp's fromLevel 0¦1, "one L1 batch", "one L0 batch").
* *Where:* ['§7.1 twelve tools (layers L0-L4)', '§7.3 (b) L0/L1 batches; §2.2 levels']
* **Ruling:** Keep both label sets: the toolkit's commitment layers keep item 101's names and are always written with their word (L0 INTENT, L1 FORM … or 'the INTENT layer'); a bare L0–L4 means a plat refinement level (§2.2).
* *Basis:* owner item 101 names the layers (owner rule); D-13 names the levels; ID convention, no renaming of either. *Units:* determinism, V09, V10.

### DIC-08 (determinism; minor) — FIX

* claim: The migrate cell reads "same" with no referent (the previous row's "replays; a footprint whose host plot is unmapped re-creates a plot around it" does not fit merges, splits or conversions).
* *Where:* ['§7.4 delete/merge/split/join/convert row']
* **Ruling:** The delete/merge/split/join/convert row's migrate cell reads: 'replays at its log position; a target the migration cannot map is orphaned and reported (§7.5)'.
* *Basis:* §7.4 home of lifecycle rows (R6); an undefined cell is an edge (11). *Units:* determinism.

### DIC-09 (determinism; minor) — FIX

* claim: moveStairCore.bay is typed Polygon; every other event geometry is PolygonCm (the unit-carrying type of §2.1).
* *Where:* ['§7.1 EditEvent moveStairCore']
* **Ruling:** moveStairCore.bay is typed PolygonCm.
* *Basis:* §2.1 unit-carrying types (R1). *Units:* determinism.

### DIC-10 (determinism; minor) — FIX

* claim: Text defects: "what moved, wasjoined or vacated" (§5.4); "a proxy is  bit-identical" (§7.8, double space).
* *Where:* ['§5.4 prose', '§7.8 proxy thumbnails']
* **Ruling:** Correct the two text defects ('moved, was joined or vacated'; one space).
* *Basis:* wording. *Units:* determinism.

### DIC-11 (determinism; minor) — FIX

* claim: "(should-have; the schema is the must-have hook)" leaves whether the thirteen listed forms ship open — priority wording that reads as a deferral under principle (6); every form row is otherwise stated.
* *Where:* ['§7.7 Forms catalogue']
* **Ruling:** The forms catalogue is stated as built: its schema and its thirteen form rows ship at the milestone §16 names for §7.7's forms (the authoring toolkit's intent layer reads them); 'should-have … must-have hook' is removed.
* *Basis:* principle (6) no deferral wording. *Units:* determinism, scope.

### DIC-12 (determinism; minor) — FIX

* claim: Narration of how the text evolved (principle (5)): "Appended by the amendments of 2026-09-25 (items ...)", "Appended with them", "Appended by the amendments of 2026-09-27 ...", "Retired by the same amendments", "Readers the amendments of 2026-09-27 and 2026-09-28 add" (§6.1); "(J-DET-2, amended so)" (§6.3); "the static base behaves exactly as it did before item 31" (§7.2); "(Fable review 2026-09-27; J-Fdet-1)" in a heading (§7.4); "The schema transforms the amendments of 2026-09-25 add" and "... of 2026-09-27 and 2026-09-28 add" (§7.5); "the rows the amendments of ... add" (§7.6); "the ten rows the survey's verification corrected" (§7.7 item 13).
* *Where:* ['§6.1 registry', '§6.3 JOIN and SPLIT', '§7.2 field brushes', '§7.4 Independence', '§7.5 schema transforms', '§7.6 tables', '§7.7 item 13']
* **Ruling:** Remove the listed narration; keep every id.
* *Basis:* principle (5). *Units:* determinism.

### DXC-01 (determinism; minor) — FIX

* claim: §5.2 F-NUM lists E_OUT_OF_RANGE among the detections of an optional chain's precision failure (re-propose, then reject the chain), while §3.1 classes E_OUT_OF_RANGE as a caller bug reported with its stream key and never stored; the two units classify one code two ways.
* other: §3.1 KernelError (kernel unit; = KXC-01)
* **Ruling:** §3.1 states the code's two uses: E_OUT_OF_RANGE on a mandatory chain is a caller bug (reported with its stream key, never stored); on an optional chain it enters F-NUM's ladder (§5.2: re-propose, then reject the chain). §5.2's F-NUM row keeps the code and cites §3.1.
* *Basis:* §3.1 home of kernel codes (R2), §5.2 home of the ladder (R4); keeps every behaviour and gives the optional case a defined outcome (11). *Units:* kernel, determinism.

### DXC-02 (determinism; minor) — FIX

* claim: F-SKELETON's detection restates §3.8's validator as three checks (non-planar, non-monotone faces, inconsistent heights) and omits the fourth (connected, exactly h independent cycles for h holes).
* other: §3.8 skeleton validator (kernel unit; = KXC-04)
* **Ruling:** F-SKELETON's detection cell cites '§3.8's four post-conditions' (planar, monotone faces, consistent heights, connected with exactly h independent cycles for h holes) instead of restating three; §3.8 names F-SKELETON beside W_DOWNGRADE.
* *Basis:* §3.8 home of the validator (R2); §5.2 home of the row (R4). *Units:* determinism, kernel.

### DXC-03 (determinism; minor) — FIX

* claim: §5.4 kernel.warnings enumerates 8 of the 12 Warning codes (W_PLACED, W_PROMOTED, W_STEINER, W_DOWNGRADE absent; W_DOWNGRADE presumably counted as kernel.downgrades).
* other: §3.1 Warning type (kernel unit; = KXC-05)
* **Ruling:** §5.4's kernel.warnings reads 'a count per Warning code of §3.1' (one reference, all twelve); kernel.downgrades is stated to count W_DOWNGRADE.
* *Basis:* §3.1 home of codes (R2). *Units:* determinism.

### DXC-04 (determinism; major) — FIX

* claim: Principle (7) requires every edit kind to have its tool. §7.1's twelve-tools table maps 40 of the 70 EditEvent kinds (31 by name, the eight plan events and adjust by description); 30 have no row: unlock, unpin, moveVertex (named only as a handle drag), drawBoundary (named only in the points-form prose), swapUse, setAttrMany, instance, delete, merge, rejectSite, unassign, drawPassage, drawTunnel, drawChamber, addLink, addUndergroundAccess, placeAccess, convert (every ConversionOp), startWorks, cancelWorks, placeLight, rerollLayer, editTable, editPreset, closeup, epoch, rebase, upgrade, undo and redo (script count over the union and the table). V09 §4.3 maps every kind to a home tool, …
* other: V09 §4.3 "The tool binding table — every edit kind and where a user reaches it" (T-V9-12); V10 §3.5 tool encoders; f items 368 (BCR-V10-20: delete joins T10), 570, 353, 272 and the other §7.1 f items (582, 348-368, 571)
* **Ruling:** The event → tool binding has ONE home: §7.1 gains the complete table — every EditEvent kind (the base's 70 and the volumes' added kinds) with its home tool among T1–T12, using V09 §4.3's assignments as the content (delete → T10; startWorks/cancelWorks → T9; placeLight and style rerollLayer → T12; naming rerollLayer → T11; drawTunnel/addLink → T4; drawChamber/placeAccess/addUndergroundAccess/relet/use conversions → T6; sealing/ladder/decline conversions → T9; …) and the history-only kinds (undo, redo, rebase, upgrade, epoch, closeup) marked with their producer. §7.4's create cells cite tools by id. V09 §4.3 keeps its screen, gesture and panel columns and cites §7.1 for the binding; V10 §3.5's encoders cite §7.1.
* *Basis:* principle (7) every edit kind has its tool; R6 (§7 owns edit events); the binding is shared by V09 and V10 so the base owns it (1); closes W-EDIT-01. *Units:* determinism, V09, V10.

### DXC-05 (determinism; minor) — FIX

* claim: Two registries of the editable tables: §7.6's prose enumeration and V11 §2.1's table registry (one row per table). Neither lists reroll.maxAdvance ("a table value, default 3", §5.1 (6)) or crossing.searchBandM ("default 120 m", §4.2 S1 (5), restated in §6.3's anchor table), which the text calls table values.
* other: V11 §2.1 "The table registry"; §14 @plat/tables list; §4.2 S1 (5) (crossing.searchBandM, pipeline unit)
* **Ruling:** The table registry's single home is V11 §3.1 (file f item 379, BCR-V11-6 — §7.6's enumeration moves there); §7.6 cites it. reroll.maxAdvance (3) and crossing.searchBandM (120 m), which the base calls table values, become cells of one registered base settings row (canon W-SET-01, which also carries the dynamic grid's cell sizes of KWG-06); §5.1 (6), §4.2 S1 (5) and §6.3's anchor table cite the cells.
* *Basis:* f item 379 (a ruled change) > base restatement; principle (7) closes DWG-03. *Units:* determinism, pipeline, V11.

### DXC-06 (determinism; major) — FIX

* claim: §5.2 F-PLOT states the minimum plot wedge angle 12 deg and F-CORRIDOR/§5.3's class-floor row check "the class minimum width and area" and "min width / area / angle per class"; the floors' named constants (minPlotWidth 2.5 m, minInteriorAnglePlot 12 deg, minCorridor per class) exist only in §3.2 (2), which says they come from the stage tables, and no table carries them (minCorridor has no value anywhere).
* other: §3.2 (2) class floors; §4.7 plot tables (= KXC-02, major on the kernel side)
* **Ruling:** The class floors get one home: a §4.7 class-floor row (pipeline) holding minPlotWidth 2.5 m and minInteriorAnglePlot 12° and defining minCorridor for a way class as the smallest corridor width S9's width row gives that class (a derivation, no new number); §3.2 (2) keeps only the rule that floors are widths, areas and angles and never minEdge; §3.10's and §5.3's class-floor checks and F-PLOT and F-CORRIDOR cite the row without values.
* *Basis:* R3 (§4 owns stage parameters); an undefined constant is a defect (11); derived, not invented. *Units:* pipeline, kernel, determinism.

### KIC-01 (kernel; minor) — FIX

* claim: §3.3 rule 2 says no two vertices carry one anchor key, citing '§3.10's one-vertex-per-ordinal check'; no §3.10 row has that name, and the nearest row (stored references resolve: exactly one vertex per ordinal) runs at 'stage end, save' - after the coarse batch has stripped the anchor contact names (§3.3 rule 3; §3.9: anchors never reach a snapshot) - so no §3.10 check ever sees an anchor row; the prepared-contacts row checks stripping, not uniqueness. Uniqueness rests on the allocation rule and §13.1's permuted-ops test.
* *Where:* ['§3.3 clear regions rule 2', '§3.10 stored-references row']
* **Ruling:** §3.3 rule 2 cites the allocation rule and §13.1's permuted-ops test for anchor-key uniqueness instead of a §3.10 row that does not exist (no new runtime check).
* *Basis:* R2/R9; nothing changed. *Units:* kernel.

### KIC-02 (kernel; minor) — FIX

* claim: §3.4 says resolve, pointLocate and faceNeighbours take an ArenaKey (a PlatKey or a TransientKey); the transient-arena paragraph lists as its services only booleans, offsetFace, insetRing, obb, lir, sideRuns, skeleton, faceNeighbours and area2, and a transient arena has no role rows or entities, so a role-based FaceRef/ChainRef/EdgeSetRef/VertexRef cannot resolve on it; §14's Kernel says a transient arena is read through readBack and view. Whether resolve and pointLocate are offered on a transient arena is ambiguous.
* *Where:* ['§3.4 Arenas, keys and services', '§3.4 Transient arenas']
* **Ruling:** §3.4 states the transient arena's services once: booleans, offsetFace, insetRing, obb, lir, sideRuns, skeleton, faceNeighbours, pointLocate, area2, readBack and view; resolve is PlatKey-only (role references exist only on plat arenas); the ArenaKey sentence names pointLocate and faceNeighbours only.
* *Basis:* R2; agrees with §14's Kernel (readBack, view). *Units:* kernel, scope.

### KIC-03 (kernel; minor) — FIX

* claim: A warp batch has two level sources: KernelTx.level ('a warp batch moves vertices of every level >= its own') and warp's fromLevel argument ('every vertex of level >= fromLevel'); nothing states they must be equal or which governs.
* *Where:* ['§3.3 One level per transaction', '§3.4 warp signature', '§3.6 Moves']
* **Ruling:** A warp batch's KernelTx.level equals its fromLevel; the batch's level governs and fromLevel is that value.
* *Basis:* R2. *Units:* kernel.

### KIC-04 (kernel; minor) — FIX

* claim: pinVertices: 'smoothing, simplification and cutting keep the vertex, warp does not'; §3.6: smoothing of committed geometry IS a warp 'under the same rules', and kernel-pinned vertices 'move with everything else unless held'. The mechanism by which a smoothing warp keeps kernel-pinned vertices (the smoother's field being zero there) is not stated.
* *Where:* ['§3.4 pinVertices', '§3.6 Moves, Held vertices']
* **Ruling:** A smoothing warp's displacement field is zero at every kernel-pinned vertex (kernel-pinned vertices join a smoothing warp's held set); a user warp moves them unless held.
* *Basis:* R2. *Units:* kernel.

### KIC-05 (kernel; minor) — FIX

* claim: §3.4's corridorUnion comment says 'kept faces inside them are holes (§3.3)', while §3.3 re-parents each kept face into the new face containing it (nesting holds) and §3.7 says a kept face 'must lie wholly inside one resulting L2 face'; a nested child face is not a hole of its L2 parent.
* *Where:* ['§3.4 corridorUnion comment', '§3.3 kept content', '§3.7 kerb']
* **Ruling:** corridorUnion's comment reads 'kept faces inside them are kept content nested in the L2 face that contains them (§3.3)'.
* *Basis:* R2; §3.3 home. *Units:* kernel.

### KIC-06 (kernel; minor) — FIX

* claim: §3.2 (6) justifies area2's exact double return by 'every face ring is simple, §3.10', but §3.10's row is 'faces simple except declared antennae' - a face with an antenna has a non-simple (retracing) ring. The bound still holds (retraced edges add zero area) but the stated reason is false for antenna faces.
* *Where:* ['§3.2 (6)', '§3.10 simplicity row']
* **Ruling:** §3.2 (6) reads 'every face ring is simple or retraces only declared antennae, which add no area'.
* *Basis:* R2. *Units:* kernel.

### KIC-07 (kernel; minor) — FIX

* claim: §3.2 (1) says intermediate rational points - 'crossings, offsets, circumcentres, skeleton nodes' - are 'immediately placed on the lattice'; §3.8 keeps skeleton output off every arena (derived, cached, validated with nodes rounded to the millimetre) and only arcs a stage inserts pass snap; RegularFit.targets are likewise 'values, never arena coordinates'.
* *Where:* ['§3.2 (1)', '§3.8', '§3.4 RegularFit.targets']
* **Ruling:** §3.2 (1) is restricted to points that become arena geometry: they are placed on the lattice when they enter an arena (insertChain, snap); derived values (skeleton nodes, fit targets) stay doubles until then.
* *Basis:* R2. *Units:* kernel.

### KIC-08 (kernel; minor) — FIX

* claim: 'Each static-index partition (§3.3) is one chunk holding ... its edges of level >= 2 ... and its face rows of level >= 2' - but the L0 and L1 static partitions (one per arena, §3.3) hold only level <= 1 items, which the separate level-<=1 routes chunk already holds; whether the L0/L1 partitions are chunks of their own is ambiguous.
* *Where:* ['§3.9 Chunks']
* **Ruling:** §3.9 reads 'each L2–L4 static-index partition is one chunk'.
* *Basis:* R2. *Units:* kernel.

### KXC-01 (kernel; minor) — FIX

* claim: §3.1: E_OUT_OF_RANGE is 'a caller bug, reported with its stream key, never stored'; §3.6: a mandatory chain can be rejected only by non-precision codes. §5.2's F-NUM row lists E_OUT_OF_RANGE among the detections of an optional chain's 'precision failure' with a re-propose ladder ('mandatory chains never reach it'). The two classify one code differently (caller bug vs precision failure).
* other: §5.2 F-NUM row (determinism unit)
* **Ruling:** §3.1 states the code's two uses: E_OUT_OF_RANGE on a mandatory chain is a caller bug (reported with its stream key, never stored); on an optional chain it enters F-NUM's ladder (§5.2: re-propose, then reject the chain). §5.2's F-NUM row keeps the code and cites §3.1.
* *Basis:* §3.1 home of kernel codes (R2), §5.2 home of the ladder (R4); keeps every behaviour and gives the optional case a defined outcome (11). *Units:* kernel, determinism.

### KXC-02 (kernel; major) — FIX

* claim: §3.2 (2) states 'The class floors come from the stage tables: minPlotWidth = 2.5 m, minInteriorAnglePlot = 12 deg ... minCorridor per class', but no stage table, base section or volume carries these names or the 2.5 m value (grep: they occur only in §3.2 (2)); §4.7 says 'the minimum plot width' and 'meets the class's floors in width and area (§3.10)', §3.10 says 'Class floors are the stages' invariants, stated as §3.2 (2) says', §5.2 F-PLOT says 'wedge angle < 12 deg'. The home is circular and minCorridor has no value anywhere (an undefined constant).
* other: §4.7 plot tables (pipeline unit); §5.2 F-PLOT; §3.10
* **Ruling:** The class floors get one home: a §4.7 class-floor row (pipeline) holding minPlotWidth 2.5 m and minInteriorAnglePlot 12° and defining minCorridor for a way class as the smallest corridor width S9's width row gives that class (a derivation, no new number); §3.2 (2) keeps only the rule that floors are widths, areas and angles and never minEdge; §3.10's and §5.3's class-floor checks and F-PLOT and F-CORRIDOR cite the row without values.
* *Basis:* R3 (§4 owns stage parameters); an undefined constant is a defect (11); derived, not invented. *Units:* pipeline, kernel, determinism.

### KXC-03 (kernel; minor) — FIX

* claim: §3.3: 'only locked or pinned content is a conflict (§2.2 rule 6)'; §2.2 rule 6 says 'what survives the clear - locked or pinned entities, returned as conflicts ... is §3.3's'. Each cites the other as the home; the rule on locked/pinned entities is §7.2's, cited by neither.
* other: §2.2 rule 6 (model unit); §7.2 (determinism unit)
* **Ruling:** §3.3 states the clear rule (a kernel operation) and cites §7.2 for locks and pins; §2.2 rule 6 references §3.3.
* *Basis:* R2 (kernel ops), R6 (§7.2 locks and pins). *Units:* kernel, model.

### KXC-04 (kernel; minor) — FIX

* claim: F-SKELETON's detection restates §3.8's validator as three checks (non-planar, non-monotone faces, inconsistent heights) and omits check (4) (connected, exactly h independent cycles for h holes); §3.8 never names its failure class F-SKELETON (the hook is one-ended in naming).
* other: §5.2 F-SKELETON row (determinism unit)
* **Ruling:** F-SKELETON's detection cell cites '§3.8's four post-conditions' (planar, monotone faces, consistent heights, connected with exactly h independent cycles for h holes) instead of restating three; §3.8 names F-SKELETON beside W_DOWNGRADE.
* *Basis:* §3.8 home of the validator (R2); §5.2 home of the row (R4). *Units:* determinism, kernel.

### KXC-05 (kernel; minor) — FIX

* claim: §5.4's kernel.warnings comment enumerates 8 of the 12 Warning codes (W_ATTRACTED, W_STRETCH_SHARED, W_WEDGE_ROUTED, W_SNAP_PASSES, W_ACUTE_CORNER, W_SLIVER_RETYPED, W_HEIGHT_CLAMPED, W_CUT_SLID); W_PLACED, W_PROMOTED, W_STEINER and W_DOWNGRADE are absent (W_DOWNGRADE presumably counted as kernel.downgrades).
* other: §5.4 generation report (determinism unit)
* **Ruling:** §5.4's kernel.warnings reads 'a count per Warning code of §3.1' (one reference, all twelve); kernel.downgrades is stated to count W_DOWNGRADE.
* *Basis:* §3.1 home of codes (R2). *Units:* determinism.

### MC-01 (model; ) — FIX

* statement: §2.5 rules "this document says plot except when quoting" (lot retired), yet §2 uses lot outside quotations: "the lot mix" (CharacterVector.mix), "the lot cut" / "bent lot cuts" (BaseWing.kind, row footprints), BuildingInput.lot, "lot-driven", "lot-derived", "the lot polygon" (stage-3 hook), "a lot-driven composer" (PathShapeRow).
* *Where:* ['§2.5 (plot vs lot rule)', '§2.5 CharacterVector.mix', '§2.6 BaseWing.kind quad', '§2.6 row footprints', '§2.6 BuildingInput.lot', '§2.6 stage-3 hook', '§2.6 PathShapeRow']
* **Ruling:** 'lot' is retired outside quotations (glossary G-lot): prose 'lot' → 'plot'; the field BuildingInput.lot is renamed BuildingInput.plot (type unchanged) and every reader (V02, V03) follows.
* *Basis:* §2.5's own rule (R1); principle (2). *Units:* model, V02, V03.

### MC-02 (model; ) — FIX

* statement: §2.4 says every record of §2.4-§2.7 and PART II embeds the Identity and Lifecycle of §2.8, the id and lifecycle fields shown being those; yet these entity records show an id and no lifecycle: Terrain, Junction, SubDistrict, Block, Frontage, PlotBound, SubLocation, Gate, Tower, Castle, Bridge, LandUse, Institution, Household, Person, Faction, Religion, FamilyUnit, Membership, SkyIsland. The text elsewhere gives some of them lifecycle behaviour: slow-change conversions are lifecycle events on the land-use face (§2.3), a Household move is a relocate lifecycle event (§2.6, §2.8), gates follow the decline ladder (§2.8). Either the fields are implicit (then the sentence "the id and lif…
* *Where:* ['§2.4 (every record embeds Identity and Lifecycle; "the id and lifecycle fields below are those")', '§2.4-§2.7 interfaces']
* **Ruling:** §2.4's sentence stands: every entity record of §2.4–§2.7 and PART II embeds Identity and Lifecycle (§2.8). Each listed interface that shows id without lifecycle (Terrain, Junction, SubDistrict, Block, Frontage, PlotBound, SubLocation, Gate, Tower, Castle, Bridge, LandUse, Institution, Household, Person, Faction, Religion, FamilyUnit, Membership, SkyIsland) shows `lifecycle: Lifecycle`.
* *Basis:* R1; the text gives them lifecycle behaviour (§2.3, §2.6, §2.8). *Units:* model.

### MC-03 (model; ) — FIX

* statement: Basement.floors is "storeys below ground, >= 1" and in the same comment "0 for a crawl space"; the requested crawl space sets floors: 0. The range statement contradicts itself (>= 1 versus 0 for crawl).
* *Where:* ['§2.6 interface Basement (floors comment)', '§2.6 requested basement (3)']
* **Ruling:** Basement.floors is 'storeys below ground, ≥ 0; 0 = a crawl space'.
* *Basis:* R1; the requested crawl space sets 0. *Units:* model.

### MC-04 (model; ) — FIX

* statement: §2.3 gives each slow-change conversion "cause convert:<kind> (§2.8)", but §2.8 types LifecycleEvent.cause as EditRef ¦ RuleRef ¦ 'generation' with no convert:<kind> form (convert is not a cause value there; it may be a RuleRef or an EditRef's kind, which the text does not say).
* *Where:* ['§2.3 slow change (cause convert:<kind>)', '§2.8 LifecycleEvent.cause']
* **Ruling:** LifecycleEvent.cause gains the template form `convert:<ConversionOp kind>` beside EditRef | RuleRef | 'generation' (file f item 209 writes cause `convert:retypeLand`).
* *Basis:* f item 209 (ruled change) > base. *Units:* model.

### MC-05 (model; ) — FIX-BY-F

* statement: ContextVector.arena is 'ground'¦'underground' only, yet plots exist on sky islands (sky pseudo-districts receive allocations, II.6; the island is handed to the unit run, II.1) — the arena value a sky plot's context vector takes, and so which arena-specific granularity and designation rows it reads, is undefined.
* *Where:* ['§2.5 ContextVector.arena', '§2.5 Allocation.target (sky pseudo-district)', '§2.7 SkyIsland.districts']
* **Ruling:** File f item 213 (BCR-V5-6) widens ContextVector.arena to 'ground'|'underground'|'sky' ('sky' read as V05 §3.11 states); before M6-sky no sky plot exists.
* *Basis:* f item 213. *Units:* model, V05.

### MC-06 (model; ) — FIX

* statement: "Building.basement is derived by the same function, never rolled alone" follows the Entrances paragraph (deriveEntrances) and echoes deriveBase; which function derives the basement is not named.
* *Where:* ['§2.6 Basements ("derived by the same function")']
* **Ruling:** §2.6's basement sentence names its function: `Building.basement` is derived by `deriveEntrances` (S11's entrance and basement derivation), never rolled alone.
* *Basis:* R1; the sentence's antecedent. *Units:* model.

### MC-07 (model; ) — FIX-BY-F

* statement: SkyIsland.outline stores a polygon of world points; rule 5 lists the only records that may hold vertex positions (building wing rings, stored compositions and plans, tower centres) and allows non-vertex points as attributes. Whether the outline is the island arena's own outer ring (then a stored vertex position outside the allowed list) or a non-vertex attribute (then how it stays in step with the island's arena ring under edits) is not stated.
* *Where:* ['§2.2 rule 5 (no entity record stores a vertex position, with listed exceptions)', '§2.7 SkyIsland.outline: Polygon']
* **Ruling:** File f item 251 (BCR-V5-1) replaces SkyIsland.outline by `rim: ChainRef` and `land: FaceRef` (the island arena's own ring, no stored position).
* *Basis:* f item 251. *Units:* model, V05.

### MC-08 (model; ) — FIX

* statement: Assignment references take three shapes (AssignmentRef, Id, Assignment) across Plot, Building, Use and BuildingInput, and ContextVector carries both rosterAssignment? and assignment? with no statement of how they differ.
* *Where:* ['§2.5 Plot.assignment?: AssignmentRef', '§2.5 ContextVector.rosterAssignment? / assignment?', '§2.6 Building.assignment?: Id', '§2.6 BuildingInput.assignment?: Assignment', '§2.7 Use.assignment?: Id']
* **Ruling:** One reference type: every record field that points at an assignment (Plot, Building, Use, ContextVector) is `AssignmentRef`; BuildingInput carries the resolved `Assignment` value (an input bundle, not a reference). ContextVector keeps both fields, defined: `rosterAssignment?` — the roster line's claim, written by S10b when a roster assignment claims the plot and read by S11's designation template and the class-mix step (W-FLD-04); `assignment?` — the dossier assignment (§7.7).
* *Basis:* R1; closes W-FLD-04 by naming producer and readers. *Units:* model.

### MC-09 (model; ) — FIX

* statement: A residential building is clamped into [1, capacity] and "every residential building houses ... at least one household", while capacity is 0 for a building S11 builds for a slot without houses (BuildingSlot.unhoused reads as such) and floor(Σ A(s)·(den−num)/(2·den·minRoomCm2)) can be 0 for a very small residential shell; the clamp interval [1, 0] and the at-least-one guarantee then conflict, and the outcome is not defined.
* *Where:* ['§2.6 Building.households (clamped into [1, capacity] for a residential building)', '§2.6 capacity (a slot without houses has capacity 0; floor(...) may be 0)', '§2.5 BuildingSlot.unhoused', '§2.6 interior ladder (every residential building houses at least one household)']
* **Ruling:** Defined edge: a residential building's capacity is max(1, floor(…)) — a tiny residential shell houses one household; a slot without houses (BuildingSlot.unhoused) makes a non-residential building (households 0), so the clamp [1, capacity] never meets capacity 0.
* *Basis:* §2.6's 'every residential building houses at least one household' (R1); principle (11). *Units:* model.

### MC-10 (model; ) — FIX

* statement: The canonical-form bullet lists view, derived and undo as never canonical but omits Document.elaborations (never canonical per its own comment); the list is incomplete.
* *Where:* ['§2.9 Canonical form and digests', '§2.9 Document.elaborations comment']
* **Ruling:** §2.9's canonical-form bullet lists Document.elaborations beside view, derived and undo as never canonical.
* *Basis:* R1; its own comment. *Units:* model.

### MC-11 (model; ) — FIX

* statement: §2 uses seven types that are declared only in a volume, never in the base: Rung (V07), TableId (V11), Outfall (V04), Segment (V10), TypedBoundary and FabricStrategyId (V01), DriftBounds (V02). A base record depending on a volume-declared type inverts principle (1) (the base owns what the base builds; Rung alone is used 24 times in the base).
* *Where:* ['§2.2 PlatKey/Recipe.rung (Rung)', '§2.8 SliceRef.table / Recipe.tablePins (TableId)', '§2.3 Terrain.outfalls, §2.7 Tunnel.outfall (Outfall)', '§2.6 BuildingInput.access (Segment)', '§2.5 District.boundary (TypedBoundary), District.fabric (FabricStrategyId)', '§2.6 BuildingInput.drift, Building.dr…
* **Ruling:** Every type a base record uses is declared in the base: Rung (§1.1 with RungProfile), TableId (§7.6), Outfall (§2.3), Segment (§2.1), TypedBoundary and FabricStrategyId (§2.5, with f item 505's @plat/model additions), DriftBounds (§2.6, f item 385 BCR-V2-08 types it). The volumes that declared them cite the base declaration; their fields and meanings unchanged.
* *Basis:* principle (1): the base owns what the base builds; f items 385, 505. *Units:* model, V07, V11, V04, V10, V01, V02.

### MC-12 (model; ) — FIX

* statement: Part 0 (the sewer network) puts its structural margin role on the underground pseudo-district's record, while every further part puts it on its UndergroundSystem record; yet an UndergroundSystem of kind sewer with part 0 also exists. Which record carries part 0's margin role — and why part 0 differs — is not reconciled in §2.
* *Where:* ["§2.2 rule 1 underground levels (part 0 margin role on the underground pseudo-district's record)", '§2.2 rule 1 further parts (margin role on the UndergroundSystem record)', '§2.7 UndergroundSystem.kind includes sewer, part 0']
* **Ruling:** §2.2 rule 1 states once why part 0 differs: part 0's margin role sits on the underground pseudo-district record (the sewer network is the underground part every district reaches, II.7.1); the UndergroundSystem record of kind sewer for part 0 carries no margin role; every further part's margin role sits on its UndergroundSystem record. No behaviour changes.
* *Basis:* R1; ambiguity closed by stating the existing rule. *Units:* model.

### CF-PIPE-01 (pipeline; major) — FIX

* what: Duration of an informal cluster's shack Works. §4.11 'Informal clusters over epochs' makes each added structure 'a build Works of days (a shack)'; §4.11 Works (2) says weeks are integers and a stage shorter than a week is never drawn, and Works (3)'s duration rows give a hovel or shed 1–2 weeks.
* *Where:* ['§4.11 l.6747-6748', '§4.11 Works (2) l.6661-6663', '§4.11 Works (3) l.6668']
* **Ruling:** An informal cluster's added shack is a build Works of the WorksTable's hovel-or-shed row (1–2 working weeks); 'of days' is dropped; only a tent keeps the zero-week case finished in its own week.
* *Basis:* §4.11 Works (3) is the home of durations (R3). *Units:* pipeline.

### CF-PIPE-02 (pipeline; major) — FIX

* what: Whether an undercity always exists at CITY and METROPOLIS. II.7.5's first sentence says 'an undercity exists in cities and metropolises, and in a large town only where a void source exists'; the same paragraph's rung row gives CITY and METROPOLIS existence 'law', under which it exists only when conditions (ii)–(iv) hold (a void source, H ≥ minHouseholds, conditions 2–4).
* *Where:* ['II.7.5 l.15934-15935', 'II.7.5 l.15936-15940']
* **Ruling:** II.7.5's lead reads: 'an undercity may exist in cities and metropolises under the law of (i)–(iv), in a large town only where a void source exists, never below TOWN'.
* *Basis:* the rung row and law are the home (R3). *Units:* pipeline.

### CF-PIPE-03 (pipeline; major) — FIX

* what: Whether the optional module feeds the prosperity field. §10.3 Factions says the module's influence field over districts is 'used by the prosperity drivers and the grammar'; §10.1 says @plat/sim is never in the one-click path, and §10.3 Standings says the base's own dials read the standings 'which need no module'; §4.5's driver list has no module term.
* *Where:* ['§10.3 Factions l.11779-11780', '§10.1 l.11452-11456', '§10.3 Standings l.11815-11817', '§4.5 Fields l.4613-4618']
* **Ruling:** The module's influence field is read by the module's own queries and the naming grammar only; the prosperity field's power terms are §4.5 (6)'s dials over CircumstanceSlice.powers, which need no module; §10.3 Factions says so.
* *Basis:* §4.5 home of the field's drivers (R3); §10.1 one-click path. *Units:* pipeline.

### CF-PIPE-04 (pipeline; minor) — FIX

* what: 'No second calendar exists'. §4.11 clock (3) says CalendarRow is the one calendar and 'no second calendar exists'; §10.1 and §10.3 give the module 'the calendar and clock with external time sync' and 'a configurable calendar (hours / day, days / week, rest days, weekday names)'. §10.3's last bullet separates them (hours vs weeks) but the two sentences contradict as written.
* *Where:* ['§4.11 clock (3) l.6389', '§10.1 l.11454', '§10.3 l.11776-11779', '§10.3 l.11819-11820']
* **Ruling:** §4.11's sentence reads 'no second calendar of weeks and seasons exists'; the module's day schedule (hours per day, days per week, rest days, weekday names) is named 'the day-schedule table' in §10.3.
* *Basis:* R3; both statements kept. *Units:* pipeline.

### CF-PIPE-05 (pipeline; minor) — FIX

* what: Islands after a rung change. II.6 (2) and §4.11 say a settlement 'that leaves the CITY band' can no longer sustain islands / wanes (AM-13), but METROPOLIS also admits islands (RungProfile.layers.islands possible at CITY and METROPOLIS). Read literally, a CITY growing into a METROPOLIS loses its islands.
* *Where:* ['II.6 (2) l.15470', '§4.11 l.6564']
* **Ruling:** II.6 (2) and §4.11 read 'falls below the CITY band (to TOWN or a village rung)'.
* *Basis:* RungProfile.layers.islands admits CITY and METROPOLIS (§1.1). *Units:* pipeline.

### CF-PIPE-06 (pipeline; major) — FIX

* what: Identity of an undercity neighbourhood. II.7.5 (4) says it has 'no government, walls, gates, rung or identity of its own'; S12c (§4.1, §4.5 (2), (4)) writes every district's character vector and identity, and an undercity neighbourhood is a District (kind 'undercity'). Whether S12c runs on pseudo-districts (hinterland, sky, underground, undercity) is not stated anywhere.
* *Where:* ['II.7.5 (4) l.15982-15983', '§4.1 l.3750-3753', '§4.5 (4) l.4801-4806']
* **Ruling:** §4.5 states S12c's coverage: the ground districts and the districts on a sky island's arena (V05's SKY-F runs before S12c) take character and identity; an undercity neighbourhood reads its parent's identity (§10.4 names it as its underside; II.7.5 (4)); the hinterland and underground pseudo-districts take none.
* *Basis:* §4.5 is item 72's one statement (R3); V05 §3.1's SKY-F order. *Units:* pipeline, V05.

### CF-PIPE-07 (pipeline; minor) — FIX

* what: Where an underground-mode clandestine institution is allocated when both an underground (sewer-front) and an undercity allocation exist. II.7.3 (b) lists them in S7b (6)'s allocation 'where an undercity exists they go to it first'; II.7.5's allocation lists them in S7b (7) and says they 'prefer the undercity over a sewer dwelling'; S7b runs (6) before (7). Neither step says (6) excludes them when (7) will exist, so the text admits double allocation.
* *Where:* ['II.7.3 (b) l.15721-15726', 'II.7.5 l.15963-15965', '§4.5 S7b (6)-(7) l.4724-4732']
* **Ruling:** S7b (6) reads 'the clandestine institutions whose mode is underground, except where S7b predicts an undercity, which takes them at (7)'.
* *Basis:* II.7.5 allocation home; no double allocation (11). *Units:* pipeline.

### CF-PIPE-08 (pipeline; minor) — FIX

* what: Works kinds. The stages table has a 'fire' kind (CHARRED) and 'conversion with no geometry step' (REFIT); WorksRow.kind is build¦extend¦demolish¦repair¦convert¦decay¦clear — no 'fire', and 'clear' has a duration (1–4 weeks) but no stages row; the prose kind names (extension, demolition, conversion) differ from the enum (extend, demolish, convert).
* *Where:* ['§4.11 Works (4) table l.6677-6685', '§4.11 WorksRow l.6731', '§4.11 Works (3) l.6671']
* **Ruling:** A fire is an event (§4.11's hazard events), not a Works kind: the stages table's CHARRED row is keyed by the state the fire leaves; 'clear' gains its stages row; the table uses the enum names (build, extend, demolish, repair, convert, decay, clear).
* *Basis:* §4.11 WorksRow home (R3). *Units:* pipeline.

### CF-PIPE-09 (pipeline; minor) — FIX

* what: The singular classes. §4.5 (3) names 'a cathedral, the palace, the university, the great market'; §10.2's default rows name 'the cathedral, a great temple, the palace, the castle, the university and the principal market's hall'. 'The great market' (a Reservation) vs 'the principal market's hall' (a class); castle and great temple absent from §4.5.
* *Where:* ['§4.5 (3) l.4795-4796', '§10.2 l.11706-11707']
* **Ruling:** §4.5 (3) cites §10.2's distribution rows ('e.g. the cathedral, the palace, the principal market's hall') instead of its own list.
* *Basis:* §10.2 home of the rows (R3). *Units:* pipeline.

### CF-PIPE-10 (pipeline; minor) — FIX

* what: Sector weights of walls, toll houses and the customs house. §10.2 gives 'gates, toll houses, bridges, roads, walls and the customs house → taxes and tolls (0.7) with trade (0.3) on gates, bridges and roads', so walls, toll houses and the customs house carry 0.7 in total, while the classes' sectors column is declared 'weights summing to 1 per column'.
* *Where:* ['§10.2 l.11728-11729', '§10.2 BuildingClassRow comment l.11489']
* **Ruling:** Walls, toll houses and the customs house carry taxes and tolls 1.0; gates, bridges and roads 0.7 with trade 0.3 — each class's sector weights sum to 1.
* *Basis:* §10.2's own sum rule. *Units:* pipeline, V11.

### CF-PIPE-11 (pipeline; minor) — FIX

* what: S7b's step numbers do not follow its execution order: (4) is drawn 'before (3) cuts the claims', and (5), (6), (7) run 'before (1)'. The numbered list reads as an order it is not.
* *Where:* ['§4.5 S7b (1)-(7) l.4677-4732']
* **Ruling:** S7b keeps its step numbers (other units cite S7b (6), (7)); a sentence at the head of the list states the execution order (5), (6), (7), then (1), (2), (4), (3) as the text's own clauses give it.
* *Basis:* R3; citations stay valid (ids stable). *Units:* pipeline.

### CF-PIPE-12 (pipeline; minor) — FIX

* what: Stage words. §4.10 and §4.11 Works (8) list 'being built', 'being demolished', 'ruined since …'; §10.4 lists 'being built', 'being extended', 'being demolished', 'under repair', 'ruined since'. Same fact, three lists.
* *Where:* ['§4.10 l.5997-5998', '§4.11 Works (8) l.6713', '§10.4 l.11882-11884']
* **Ruling:** §10.4's stage-word list is the home; §4.10 and §4.11 Works (8) cite it.
* *Basis:* R3. *Units:* pipeline.

### CF-PIPE-13 (pipeline; minor) — FIX

* what: Unit in the quarry area law: 'the area = volume ÷ headroomCm (250)' divides m³ by centimetres.
* *Where:* ['II.7.6 quarries l.16101-16102']
* **Ruling:** II.7.6 reads 'the area (m²) = volume (m³) ÷ (headroomCm ÷ 100)'.
* *Basis:* units (§2.1). *Units:* pipeline.

### RIC-01 (rendering; major) — FIX

* claim: `parchment` has two statuses and two chroma rules: the palette-target binding calls it 'the reserved `parchment`' and has it aim at the median plate chroma 43 with `lit`, `hatched` and `painterly`, while the presets table lists it as a shipping ink-family variant (with `bw-print` and `night`) that §8.2's role-continuity sentence and §16's M3b row ship at M3b, and the ink family's rule (J-A69.82) holds plate chroma to 20-30. V11 (L983) names it a shipped preset. A builder cannot tell which band its measurement render must land in.
* *Where:* ['§8.2 Where they bind (L9801)', '§8.2 presets table (L10075)', '§8.2 role continuity (L10068)']
* **Ruling:** `parchment` has one status — a shipping ink-family variant at M3b (presets table, §16, V11) — and one chroma rule of its own: its plate aims at the corpus median chroma 43 (the binding sentence), an exception to J-A69.82's 20–30, which governs `ink`; 'reserved' is dropped.
* *Basis:* R7; both facts kept: status from the presets table, chroma from the binding sentence. *Units:* rendering, V11.

### RIC-02 (rendering; minor) — FIX

* claim: 'Every shipped family is lit by the field model with the cursor sun by default' - but `hatched`'s LightingSpec.model is 'vector' (rung 3 by the sheet's own choice) and §8.4 (g) has `hatched` draw rung 3 at every rung; the same sentence then carves `hatched` out ('by its own vector prism pass at every rung').
* *Where:* ['§8.2 Light by family (L10081)', '§8.4 LightingSpec.model (L10239)', '§8.4 (g) (L10419)']
* **Ruling:** §8.2's light sentence reads: '`ink` and `lit` are lit by the field model with the cursor sun by default; `hatched` by its own vector prism pass (LightingSpec.model 'vector', §8.4 (g))'.
* *Basis:* R7. *Units:* rendering.

### RIC-03 (rendering; minor) — FIX

* claim: The height byte's square-root scale h = (v / 255)^2 x T at T = 160 m has a step T(2v + 1) / 255^2: 0.224 m at 5 m (v = 45.1) and 0.668 m at 45 m (v = 135.2) - matching '≈ 0.2 m at 5 m' and §8.4 (g)'s '≈ 0.67 m at 45 m' - but 0.995 m at 100 m (v = 201.6), not the stated '≈ 1.2 m at 100 m'.
* *Where:* ['§8.8 surface layer (L10660-10661)', '§8.4 (g) (L10415-10416)']
* **Ruling:** '≈ 1.0 m at 100 m' (the arithmetic of the height byte's scale).
* *Basis:* R7. *Units:* rendering.

### RIC-04 (rendering; minor) — FIX

* claim: The skeleton row says the skeleton is 'a document format under *Knowledge*' and the Authorship paragraph lists it among the formats that carry the log, but the Knowledge paragraph's enumeration of the document formats admitted whole only to tier `secret` (with E_KNOWLEDGE_TIER otherwise) names only `.plat`, the compact twin, the JSON schema and a permalink, and 'Where exports run' lists the model formats without it - so whether a skeleton export is refused to a `public` key, and where its writer runs, is stated only by the row.
* *Where:* ['§11.1 Knowledge (L11926-11930)', '§11.1 Where exports run (L11970-11972)', '§11.1 skeleton row (L11913)', '§11.1 Authorship (L11936-11937)']
* **Ruling:** §11.1 states one enumeration of the document formats (.plat, the compact twin, the JSON schema, a permalink and the skeleton), referenced by the skeleton row, the Knowledge paragraph and E_KNOWLEDGE_TIER; 'Where exports run' names the skeleton among the model formats written in the generation worker.
* *Basis:* R7. *Units:* rendering.

### RIC-05 (rendering; minor) — FIX

* claim: 'No rung depends on WebGL2 (§8.9)' means the size rungs (TOWN / CITY / METROPOLIS), but the same unit's light ladder has rungs 1-2 that are the GPU pass on WebGL2 / WebGPU; read against §8.4 (g) the sentence contradicts it.
* *Where:* ['§12.5 Neighbourhood band (L12600)', '§8.4 (g) (L10403-10404)', '§8.9 (L10788-10792)']
* **Ruling:** §12.5 reads 'no size rung depends on WebGL2 for its marks; the light ladder's rungs 1–2 need a GPU context and rung 3 does not (§8.4 (g))'.
* *Basis:* R7/R8. *Units:* rendering.

### RXC-01 (rendering; minor) — FIX

* claim: §8.5 and §9.2 make the plan draw's room labels protected obstacles S13b reads at the building band, but §14's ObstacleSource.protectedExtents returns kinds 'gate'¦'castle'¦'plaza'¦'bridge'¦'wall' only and S13b reads obstacles only through it - the room-label boxes have no declared route into S13b (room labels have no LabelTable row, §8.1 item 2).
* other: §14 @plat/labels ObstacleSource (scope unit, L14422)
* **Ruling:** §14's ObstacleSource.protectedExtents gains kind 'room' (the building band's room-label boxes), implemented by @plat/render from the plan draw's room-label marks; §9.2 cites it.
* *Basis:* R12 (§14 declares ObstacleSource); principle (7) both ends. *Units:* scope, rendering.

### RXC-02 (rendering; minor) — FIX

* claim: F-LIGHT's detection column lists 'no GPU context, a lost context, the pass over its frame budget', while §8.4 (g) and §8.8 lower the rung on 'three consecutive frames over the pass's budget', choose the vector rung at start-up when 4.25P + 7 MB + Q does not fit at tile DPR 1, and send a tier missing §13.4's tolerance to full precision and then rung 3 - the row restates the triggers and drops three of them.
* other: §5.2 F-LIGHT row (determinism unit, L6912)
* **Ruling:** F-LIGHT's detection cell cites '§8.4 (g)'s and §8.8's triggers' instead of restating three of them.
* *Basis:* R4 with R7 the trigger home. *Units:* determinism.

### SCOPE-C01 (scope; CONFIRMED (three wordings of one rule)) — FIX-BY-F

* statement_a: A dossier below 1 500 people is refused by the port (E_RUNG_UNAVAILABLE naming the village product), unqualified: §1.1 l.340-343 ('§1.1's clamp serves only requests without a dossier'), T73-9 l.13611, D-33 l.16471, J-A81.71 l.17014 (owner Q3, J80).
* statement_b: The refusal holds only 'while no village product is registered': §14 PortResult comment l.14374 and port (3) l.14474; the Staged village row l.17254 says 'until that product registers its own port path (item 81)'.
* *Where:* §1.1; §13.2 T73-9; §14; D-33; J-A81.71; Staged list
* **Ruling:** File f item 202 governs (a ruled base change consistent with the owner's J80, which refused small dossiers until the village product): the refusal of a dossier below 1 500 holds only while no village product is registered; with one registered an absorb at population 0 routes to THORP (V07's desertion) and a creation below 1 stays refused; 'its own port path' is withdrawn. §1.1, T73-9, D-33, J-A81.71's index row, §14 and the Staged list carry the one wording.
* *Basis:* f item 202 > base restatement; J80 intact. *Units:* scope, determinism, pipeline.

### SCOPE-C02 (scope; CONFIRMED) — FIX

* statement_a: Judgment-calls index row J-P16 (l.16625) still states 'NG's perpendicular-ray far side with a fallback chain' as a current choice.
* statement_b: §0.2 item 37 (l.210): 'J-A37.41, which supersedes J-P16'; cut.farSideAlt retired; J-A37.41 (l.17050): J-P16's far side and fallback chain superseded; §16 M0 (b): 'the far-side fallback no longer exists'.
* *Where:* Judgment calls J-P16 vs §0.2 row 37, J-A37.41, §16 M0
* **Ruling:** The Judgment-calls index marks supersession: J-P16's row reads 'superseded by J-A37.41'; the partial cases carry 'amended by' marks (J-A29.01 by J-A50.01, J-A50.21; J-A30.71 and J-A30.72 by J-A20.77; J-A30.22 by J-A30.24; J-A8.21 by J-A8.22; J-A12.45 by J-A65.31). One mark form for every superseded or amended decision row (canon E-SUPERSEDE).
* *Basis:* R10; elegance: one pattern. *Units:* scope.

### SCOPE-C03 (scope; CONFIRMED (stale figure in a decision row)) — FIX

* statement_a: J-A16.01 (l.16921) records amendments b's pricing with 'the total 166–220'.
* statement_b: §16 effort table total (l.14917) and D-20 (l.16390): 185.5–248.5 pw (after amendments c–e); INDEX.md (volumes/_finalize): base with stage 2 221.5–300.5 pw after the f items, whole program 392.25–539.25 pw.
* *Where:* Judgment calls J-A16.01 vs §16, D-20
* **Ruling:** J-A16.01's index row and Part A entry drop the historical total 166–220; §16's totals are item 568's computation.
* *Basis:* f item 568; R10. *Units:* scope.

### SCOPE-C04 (scope; CONFIRMED) — FIX

* statement_a: The base places the volume subjects as 'staged by the owner' with hooks only, unpriced, after the base: §1.1 stage table ('hooks only'), Staged list ('the evolution engine (much later)'; underground and islands 'after the city is mastered'; calibration 'after the standalone generators'; SF inputs 'after the generators are mastered'), §16 ('the staged engines themselves … are not priced, by the roadmap'), D-35 (build order ends at M5), §13.9 heading ('staged by the owner'), §1.5 and D-25 (evolution engine staged).
* statement_b: docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md (J122): combined order — V-M0 right after M0; M3c beside M3b; after M4 four streams side by side (M5, V-M village, M6-E evolution, the plan rung's P0–P1); M6 and M6-U after M5; then M6-sky; then M-CAL; then M-SF. INDEX.md designs and prices them (staged 170.75–238.75 pw; whole program 392.25–539.25 pw). The brief: write the combined build order into §16 and INDEX.md's plan.
* *Where:* §1.1, §1.5, §13.9, §16, D-25, D-35, Staged list, summary vs J122 decisions and INDEX.md
* **Ruling:** Per J122 (owner delegation > base text): §1.1's stage table, §1.5, §13.9's heading, D-25, D-35, the Staged list and the one-page summary describe the staged subjects as designed at build depth in the volumes (INDEX.md the map) and ordered by J122's combined order; §16 carries that order and item 568's two computed totals (the base with stage 2; the whole program). 'Hooks only', 'much later', 'not priced, by the roadmap' are removed.
* *Basis:* J122; f item 568; cohesion (4). *Units:* scope.

### SCOPE-C05 (scope; PLAUSIBLE ("in use" may mean with a live host)) — FIX

* statement_a: Staged SF row (l.17258): 'The staged part: … the audience table and the display names in use (item 85)'.
* statement_b: §16 M3a (l.14892) builds 'the SettlementForge iframe configuration, per-export display names and the audience table (item 85 (b), (d)–(f))'; §14 port (5)–(6) state them as the port's host glue.
* *Where:* Staged list vs §16 M3a, §14
* **Ruling:** The Staged SettlementForge row says: the audience table and per-export display names are built at M3a (item 85 (b), (d)–(f)); their use with a live SettlementForge host lands with M-SF (J122 V08 Q4).
* *Basis:* J122; §16 M3a. *Units:* scope.

### SCOPE-C06 (scope; CONFIRMED (open questions after delegation)) — FIX

* statement_a: Normative text still puts base questions to the owner: summary l.113-117 (shadows on the default ink map; 'say if the default should take the middle'), l.119-123 (surplus-pressure reading 'put to the owner to confirm'); §0.2 rows 68 and 69 ('Put to the owner'); D-19 ('put to the owner'); J-A68.05.
* statement_b: J122 (owner, 2026-09-29): 'I leave all decisions to you' — every remaining owner question is decided; docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md records no decision for these three base questions; principle (6) forbids open-choice wording.
* *Where:* summary, §0.2, D-19, J-A68.05 vs J122
* **Ruling:** Decided under J122 by this canon (vetoable, recorded as J-C1–J-C3): (J-C1) the default ink map keeps its gentle cast shadows in its own ink and only the MFCG parity preset draws none (J-A68.81 as designed); (J-C2) the `ink` plate chroma stays 20–30 (J-A69.82 as designed), the corpus middle 43 being `parchment`'s (RIC-01); (J-C3) the item-72 surplus-pressure reading stands as designed. The summary, §0.2 rows 68 and 69, D-19 and J-A68.05 drop 'put to the owner' and cite the decision.
* *Basis:* J122 delegation ('I leave all decisions to you'); no behaviour changes. *Units:* scope, rendering, pipeline.

### SCOPE-C07 (scope; CONFIRMED) — FIX

* statement_a: §14 (l.14513-14529): a clerk is the host's own or 'the built-in one, which is staged'; the built-in clerk opt-in and labelled as AI; Staged list: 'the built-in clerk comes after the API'; J-A101.02.
* statement_b: J121: the assistant and its model tier follow SettlementForge; J122 decisions V10 Q2 ('SettlementForge's [assistant], driving our tool API') and V10 Q4 ('the built-in clerk as M3c beside M3b').
* *Where:* §14, Staged list, J-A101.02 vs J121/J122
* **Ruling:** Per J121/J122: in the SettlementForge module SettlementForge's assistant drives the map's tool API through the host seam (configuration C, V10 Q2); the built-in clerk ships at M3c beside M3b and runs only where the deployment's configuration enables it; the provider, model tier and key path are configuration inputs read from SettlementForge's AI setup (J121), never decided by the design. §14's clerk paragraph, the Staged list and J-A101.02's index row say so.
* *Basis:* J121, J122. *Units:* scope, V10, V09, V08.

### SCOPE-C08 (scope; PLAUSIBLE (the mechanism may stay while the product feature waits)) — FIX

* statement_a: Summary l.59-60 'undo works for several people sharing a town'; §16 M3a's bridge convergence test (a host and three headless clients editing, owner undo through a chain).
* statement_b: J122 'this morning's other open points': 'two people editing one map at once — not now; revisit with the live party map after M-SF'.
* *Where:* summary, §16 vs J122
* **Ruling:** The bridge's multi-client convergence stays a base mechanism (the host, its assistant and the editor may all write one document; each author's undo is their own; §16 M3a's convergence test unchanged); the product offers no simultaneous editing of one map by two people (J122). The summary's line is reworded to the mechanism.
* *Basis:* J122; nothing lost (the mechanism and its test stay). *Units:* scope.

### SCOPE-C09 (scope; CONFIRMED (cohesion)) — FIX

* statement_a: §17.1 (1), D-29 and J-S8: implementer seats read only docs/ARCHITECTURE.md, the implementer digest, plat/, published papers and library docs.
* statement_b: The design is now a set: docs/volumes/V01–V12 (build depth for the staged subjects), docs/volumes/INDEX.md and docs/AMENDMENTS-2026-09-28f.md (applied by this pass); implementers of volume subjects need them.
* *Where:* §17.1 (1), D-29, J-S8 vs the architecture set
* **Ruling:** §17.1 (1), D-29 and J-S8 read: implementers read the architecture SET — the base, INDEX.md and the volume(s) their milestone builds — and the checked implementer digest; §17.1 (2) check (v) resolves pointers across the set; the volumes carry the same clean-room checks (§17.1's scans run over them, as the integration ran them).
* *Basis:* cohesion (4); the clean-room guarantee is unchanged (the volumes are our own checked design). *Units:* scope.

### SCOPE-C10 (scope; CONFIRMED (one concept, two enumerations)) — FIX

* statement_a: RungProfile.matched.ftgSize?: 'BIG_TOWN'¦'BIG_CITY'¦'METROPOLIS' (§1.1 l.306).
* statement_b: Baseline.matched.ftgSize?: 'BIG_TOWN'¦'BIG_CITY'¦'CITY'¦'METROPOLIS' (§13.5 l.13837).
* *Where:* §1.1 vs §13.5
* **Ruling:** One type `FtgSize = 'BIG_TOWN'|'BIG_CITY'|'CITY'|'METROPOLIS'` declared once in §13.5; RungProfile.matched.ftgSize is typed by it (its rows use three values).
* *Basis:* principle (10) one enumeration. *Units:* scope.

### SCOPE-C11 (scope; CONFIRMED (id collision inside the unit)) — FIX

* statement_a: §14's tools are named T1 intend … T12 dress; §16 M2a 'item 101's T9 shape and T10 hold'; M3a 'item 101's T2–T8'; M3b 'T11 … T12'.
* statement_b: The owner-item bar family is T⟨item⟩-⟨n⟩ and its groups are cited bare: §13.8 'The hook tests of §13.2 (T8, T10, T11, T13, T14, T15, T25, T31)' — T8/T10/T11 there mean items 8, 10, 11, not tools.
* *Where:* §14, §16 vs §13.2, §13.8
* **Ruling:** Canon ID-TOOL (see DIC-06).
* *Basis:* owner item 101 names the tools. *Units:* scope, determinism.

### SCOPE-C12 (scope; CONFIRMED (id collision)) — FIX

* statement_a: §14's interaction contract numbers its rules R1–R19 (R17 folded).
* statement_b: The base cites IMPROVEMENTS requirement ids with the same form: §1.2 'walls on at every rung (R6)', '(R8)'; §1.4 '(R3, P)'; §13.2 '(R9)'; §13.4 '(R13)'; J-A28.02 '(R11)' (a repair round).
* *Where:* §14 vs §1.2, §1.4, §13.2, §13.4, J-A28.02
* **Ruling:** Canon ID-R: bare R1–R19 are §14's interaction rules; a requirement of docs/IMPROVEMENTS.md is cited 'IMPROVEMENTS R3'; 'R11' as a repair round (J-A28.02) is narration and is removed.
* *Basis:* principle (4). *Units:* scope.

### SCOPE-C13 (scope; CONFIRMED (decided subject worded as open; J121 part missing)) — FIX

* statement_a: §17.3 'Until the owner chooses, the plat/ repository is proprietary … flagged for the owner's veto'; D-22 '(owner veto) … until the owner chooses'.
* statement_b: §0.2 item 21 and J-A21.01: the owner ruled 2026-09-27 (licence stays private; GPL-3 intent withdrawn); J121: the licence for users' maps follows SettlementForge's terms (not stated in §17.3).
* *Where:* §17.3, D-22 vs §0.2 row 21, J-A21.01, J121
* **Ruling:** §17.3 and D-22 state the owner's 2026-09-27 ruling as decided (the licence stays private; GPL-3 intent withdrawn; J-A21.01) and add that the licence for users' maps follows SettlementForge's terms (J121).
* *Basis:* owner ruling; J121. *Units:* scope.

### SCOPE-C14 (scope; CONFIRMED (decided subject worded as open)) — FIX

* statement_a: D-31: 'a one-month premium FTG subscription for one measured capture is the owner's option'.
* statement_b: J122 V12 Q-V12-1: 'one month of FTG's premium tier — no'.
* *Where:* D-31 vs J122
* **Ruling:** D-31 records 'no premium FTG capture (J122, V12 Q-V12-1)'; METROPOLIS stays compared with MFCG size 130.
* *Basis:* J122. *Units:* scope, V12.

### SCOPE-C15 (scope; CONFIRMED (placeholder vs decided rule)) — FIX

* statement_a: Title block and D-19: the codename PLAT is a placeholder (D-19), a default that costs nothing to change.
* statement_b: J122 V09 Q3: the product's public name follows SettlementForge (J121).
* *Where:* title, D-19, J-17 vs J121/J122
* **Ruling:** PLAT stays the codename and the package prefix @plat/*; the product's public name follows SettlementForge (J121). Title block and D-19 say so.
* *Basis:* J121. *Units:* scope, V09.

### SCOPE-C16 (scope; CONFIRMED (cohesion, principle 4)) — FIX-BY-F

* statement_a: §14 lists 17 packages (@plat/kernel … @plat/testkit) and the dependency chain over them.
* statement_b: The volumes declare further packages: @plat/buildings (V01–V03), @plat/under (V04, V06), @plat/sky (V05, V06), @plat/evolve (V06), @plat/village (V06, V07, V11), @plat/bridge-client (V08), @plat/clerk (V09–V11), @plat/cli (V10) — none placed in §14 or its dependency rules.
* *Where:* §14 vs V01–V12
* **Ruling:** §14 places every volume package with its dependency rules by file f items 505 (@plat/hood, @plat/buildings with the plan rung, @plat/under, @plat/village), 317 (BCR-V6-1 (b) @plat/evolve), 476 (BCR-V5-14 @plat/sky), 507 (BCR-V8-3 @plat/bridge-client), 518 (BCR-V10-8 @plat/clerk), 521 (BCR-V12-10 the calibration package) and canon W-PKG-01 (@plat/cli, V10's command-line clerk); the dependency chain lists them.
* *Basis:* f items; principle (7) packages declared. *Units:* scope, V10.

### V01-ICONF-1 (vol-V01-V02; minor) — FIX

* claim: §3.4.3 writes n = 3 + floor(5u) (3-7 segments, literal 5), while §3.14 homes it as tpl.segMin 3 and tpl.segSpan 4; the formula's multiplier (5) is not the span column (4), and the text never states n in terms of the two keys (nor δ's 0.3 in terms of tpl.courseDelta 0.15), so the cells' reading is ambiguous.
* *Where:* §3.4.3 spine course vs §3.14 tpl.segMin/tpl.segSpan
* **Ruling:** §3.4.3 writes n = tpl.segMin + floor((tpl.segSpan + 1) · u) (3–7 at 3 and 4) and δ = 2 × tpl.courseDelta; no literal repeats a cell.
* *Basis:* V01 §3.14 is the cells' home. *Units:* V01.

### V01-ICONF-2 (vol-V01-V02; minor) — FIX

* claim: skyDistrictCount is written three ways: §3.10.3 step 2 'ceil(allocated plot land / (sky.plotShare x context.districtHa))' and §3.14 'ceil(land / (sky.plotShare x districtHa))' mix m² and ha with no conversion, while §3.16 has the x 10 000 (plotLandM2 in m², districtHa in ha). Only §3.16 is dimensionally right, and §3.16 says the formula must never be copied.
* *Where:* §3.10.3 step 2 vs §3.16 skyDistrictCount; §3.14 row
* **Ruling:** skyDistrictCount's formula is stated only in V01 §3.16 (dimensionally right: plot land in m², districtHa × 10 000); §3.10.3 step 2 and §3.14 cite it.
* *Basis:* single source (1). *Units:* V01.

### V01-ICONF-3 (vol-V01-V02; minor) — FIX

* claim: J-V1.41 still reads 'add an NG preset column to every stage-2 table' (patched only by 'the first sentence's column reads entries'), which contradicts J-V1.98 and V1-3.15 ('entries on hood.constants alone; never on another hood.* table'). J-V1.36's list (catacomb 'from its own cemetery ground'; 'caverns and ruins by relief') is superseded by J-V1.77.
* *Where:* §9 J-V1.41 vs J-V1.98 and V1-3.15
* **Ruling:** J-V1.41 reads 'superseded by J-V1.98' and J-V1.36 'superseded in part by J-V1.77' (canon E-SUPERSEDE); the reasons stay at the governing rows.
* *Basis:* ids stable; one pattern. *Units:* V01.

### V01-ICONF-4 (vol-V01-V02; minor) — FIX

* claim: V1-3.17.3 (3) states the soffit bound as the crossed class's clearanceCm from V11 raisedWays.structure, while IN-V01-9 rules it is f item 244's clearance rule (the held clearanceCm, else V11's per class): the held per-way value is missing from V1-3.17.3's text.
* *Where:* V1-3.17.3 (3) vs IN-V01-9
* **Ruling:** The soffit bound over a crossed way is file f item 244's clearance rule (the way's held clearanceCm first, else V11's raisedWays.structure.clearanceCm for the crossed class); V1-3.17.3 (3) and V02 §3.17 (b) cite it identically.
* *Basis:* f item 244 (the base home); J-VI.27. *Units:* V01, V02.

### V01-ICONF-5 (vol-V01-V02; minor) — FIX

* claim: 'that the footprint side nearest ground.at is the face volume 3's head takes (J-V1.96; T-V1-26's stack-door clause measures it from M6-P)' contradicts the current J-V1.96 (reserve at V03's stackAccessDoor(b,a)) and T-V1-26 (stack-door clause from M5 on eager records); also §13's 'V04's access kinds and catacomb entrance, BCR-36 and BCR-37, are satisfied by whichever lands first' contradicts f items 554 and 560 (merged texts govern).
* *Where:* §12 round-2 continuation PLAUSIBLE clause
* **Ruling:** The stale clauses leave with the §12/§13 narration: J-V1.96 and T-V1-26 govern the stack door; f items 554 and 560 govern the access kinds and catacomb entrance.
* *Basis:* f items 554, 560; principle (5). *Units:* V01.

### V02-ICONF-1 (vol-V01-V02; minor) — FIX

* claim: V02 hosts the composition.classFamily table in composition.json and states 'volume 7 keeps this table as the one source of the village classes' composition keys (J-V7.82)': the table's canonical home is stated as another volume's while its rows are written here (single source ambiguous).
* *Where:* §3.10.5 classFamily ownership
* **Ruling:** composition.classFamily's home is V02 §3.10.5 (composition.json); its v.-keyed rows are the one source of the village classes' composition keys; V07 cites the table and names no second source.
* *Basis:* single source (1). *Units:* V02, V07.

### V02-ICONF-2 (vol-V01-V02; minor) — FIX

* claim: The volume's effort is stated as a running history of totals (17.25-24.75; +3.25-4.75 fold; +1.75-2.5 second revision -> 22.25-32; +0.25-0.5 round 1 -> 22.5-32.5; 'M6 18-27 pw (18.25-27.5 with it)'; 'M3a's part 2-2.75 pw'; 'BCR-V2-37 restated'), several superseded numbers side by side; the one current total a reader and §16 need is ambiguous without arithmetic (and the per-milestone rows of §8.3 and §8.5 must be summed to reach it).
* *Where:* §8.3 effort paragraphs and §8.5 effort
* **Ruling:** V02 §8 states the current effort once (the volume 22.5–32.5 pw; M6 18.25–27.5; the M3a part 2–2.75; spikes 2.25) with the per-milestone table as its breakdown; the history leaves (validation records); §16 counts it by item 568.
* *Basis:* f item 568; principle (5). *Units:* V02.

### V02-ICONF-3 (vol-V01-V02; minor) — FIX

* claim: R5's fallback ends with 'a failure halves the step at most once more before the step is refused (reported)': a warp step refused on a building's validation contradicts the no-refusal rule (item 101 R2; J-V2.79: refusals only for a lock or a dossier fact) and §5's ladder (no rung may be a plain refusal without a defined bend); the edge outcome (what the warp does to that building) is undefined.
* *Where:* §8.4 R5 fallback 'before the step is refused (reported)'
* **Ruling:** R5's last rung is a bend: the warp's step for that building is held at the last lawful fraction and named in the dry run (item 101 R2), never a refusal.
* *Basis:* owner item 101 R2 (J-VI.4). *Units:* V02.

### V02-ICONF-4 (vol-V01-V02; minor) — FIX

* claim: Round 1's 0.25–0.5 pw is said to fall 'inside M6a–M6c and M3a-V2', yet the milestone arithmetic puts all of it in M6 (18.25–27.5) and keeps M3a's part at 2–2.75 pw, and BCR-V2-37 says '+ 0.25–0.5 pw inside M6'; the hole sentence moved to M3a (J-V2.104) likewise stays 'inside M3a-V2's 2–2.75 pw'.
* *Where:* §8.3 line 3464 vs §8.3 line 3467 and BCR-V2-37
* **Ruling:** Round 1's 0.25–0.5 pw falls inside M6 (18.25–27.5), as BCR-V2-37 states; the hole sentence's cost inside M3a-V2's 2–2.75.
* *Basis:* one placement. *Units:* V02.

### V01-XCONF-1 (vol-V01-V02; minor) — FIX

* claim: Note (31) states V11's table registry has no row for way.surface or squares.quota and f item 301's milestone should read M2b; both are now closed (V11 registry rows 90-91 carry them; f item 301 reads 'BASE (M2b) for (a)'s S7b half'), so the note is stale and contradicts its destinations.
* *Where:* §10 cross-volume note (31)
* **Ruling:** The closed cross-volume notes (21), (28), (30), (31), (32), (35), (36), (37) leave V01 §10; only open wiring stays, cited.
* *Basis:* hand-offs closed at destination (10). *Units:* V01.

### V01-XCONF-2 (vol-V01-V02; major) — FIX

* claim: V01 admits a retaining wall to the .dd2vtt line_of_sight only when its derived step is >= vtt.retainingMinCm (150 cm), broken over stair/ramp intervals; V09 BCR-V9-31 (c) says 'in the ground scene retaining walls and the raised supports' footprints join line_of_sight as cliffs do' with no threshold. V01's reconciliation round 1 logged it ('keeps BCR-40's threshold until that lane rules'); no ruling is recorded. One export behaviour, two rules.
* *Where:* V1-5.3 VTT row and BCR-40 (f 448) vs V09 BCR-V9-31 (c) (f 447 lane)
* **Ruling:** One VTT rule at §11.1 (files f items 447 and 448 applied together): a retaining wall joins .dd2vtt line_of_sight where its derived step is ≥ vtt.retainingMinCm (150 cm), broken over stair and ramp intervals (V01 BCR-40, the more specific rule); raised supports' footprints join as cliffs do (BCR-V9-31 (c)). V01 V1-5.3 and V09 cite §11.1.
* *Basis:* f items 447, 448; the specific rule qualifies the general. *Units:* rendering, V01, V09.

### V02-XCONF-1 (vol-V01-V02; minor) — FIX

* claim: V02 says 'the least soffit over a crossed way is volume 11's raisedWays.structure.clearanceCm, which volume 1 reads'; V01's IN-V01-9 (J-VI.27) rules the soffit bound is f item 244's clearance rule (the held clearanceCm, else V11's per class). The two volumes state the source of the one soffit bound differently (the held per-way value is absent in V02 and in V1-3.17.3).
* *Where:* V02 §3.17 (b) vs V01 IN-V01-9 and V1-3.17.3 (3)
* **Ruling:** The soffit bound over a crossed way is file f item 244's clearance rule (the way's held clearanceCm first, else V11's raisedWays.structure.clearanceCm for the crossed class); V1-3.17.3 (3) and V02 §3.17 (b) cite it identically.
* *Basis:* f item 244 (the base home); J-VI.27. *Units:* V01, V02.

### V04-ICONF-1 (vol-V03-V04; minor) — FIX

* claim: §2.6's table gives AccessPoint.state (BCR-21) its own lifecycle row (create II.7.3 rule row, N11, U-LINK, setAttr, access closures; ...; absent open), while the closing sentence lists AccessPoint.state among the base's fields that 'keep their base rows (§7.4, §2.8)'. Either V04 owns a row for it (BCR-21 extends the base) or the base row governs.
* *Where:* §2.6 AccessPoint.state row vs the closing sentence of §2.6
* **Ruling:** AccessPoint.state's lifecycle is the base's §7.4 row as V04 BCR-21 (file f item 555) amends it; V04 §2.6 cites it and drops its own row.
* *Basis:* f item 555; R6. *Units:* V04, determinism.

### V04-ICONF-2 (vol-V03-V04; minor) — FIX

* claim: Three decisions state superseded totals as current decisions: J-V4.71 'chose an estimate of 25.75-35.75 pw', J-V4.94 'chose an estimate of 27.25-38 pw', J-V4.104 prices U5 at '2.75-4 pw'; §8's table and J-V4.114 give the total 28.25-39.25 pw and U5 3-4.25 pw. A reader cannot tell which total is the decision.
* *Where:* §9 J-V4.71, J-V4.94, J-V4.104 vs §8 total and J-V4.114
* **Ruling:** One pricing decision: J-V4.114 with §8's total 28.25–39.25 pw and U5 3–4.25 pw; J-V4.71, J-V4.94 and J-V4.104 carry 'superseded by J-V4.114' (canon E-SUPERSEDE) and lose their stale figures.
* *Basis:* single source; J122 accepted the cost. *Units:* V04.

### V04-ICONF-3 (vol-V03-V04; major) — FIX

* claim: §5.5 states VTT portals only at openings in a wall line (a door access, a door or breach link, an underground building's entrances, each tunnel grille), every vertical access (stair, shaft, ladder, hatch, well, grating, mouth, sinkhole) being a shaft light plus a plat extension object (C4-41); T-V4-28 requires 'a portal at every access, link and underground entrance the key admits', and BCR-16's base text says 'portals at every access point (closed when locked or bricked), every link (closed when gated or secret) and every underground entrance'. The export rule and its bar and the base request contradict each other; a build satisfies one and fails the other.
* *Where:* §5.5 VTT row vs T-V4-28 and BCR-16
* **Ruling:** V04 §5.5's rule governs (the later critique fix C4-41; a vertical access has no wall opening to portal through): VTT portals only at openings in a wall line (a door access, a door or breach link, an underground building's entrances, each tunnel grille); every vertical access is a shaft light plus a plat extension object. T-V4-28 and BCR-16's text are reworded to it; file f item 452 applies the corrected BCR-16.
* *Basis:* the export's home (V04 §5.5); f item 452 carries the requester's text. *Units:* V04, rendering.

### V04-ICONF-4 (vol-V03-V04; minor) — FIX

* claim: BCR-18's naming bullet says 'a void system from its kind's slice (catacomb, ...), a catacomb reading its source church's name' and in the same bullet 'a catacomb complex its cemetery's name (a churchyard's its church's; a quarry ossuary its quarter's)'; after J111 no catacomb is church-sourced (V04 §3.5.1 (1)), so 'its source church's name' is a stale clause contradicting §5.4.
* *Where:* BCR-18 text
* **Ruling:** BCR-18's clause 'a catacomb reading its source church's name' is dropped; §5.4's complex-naming clause governs.
* *Basis:* J111 (no church-sourced catacomb). *Units:* V04.

### V04-ICONF-5 (vol-V03-V04; minor) — FIX

* claim: IN-V04-2 says the monument is laid with 'TierCells.heights of the stepped-monument row' and that a returned TierFailure 'truncates the monument to the tiers laid (recorded in Chamber.monument.standing, W_RUIN_MONUMENT_SKIPPED when none)'; the body says heights are V11's stepped-shrine row (not the great temple's), an ST0-infeasible region is retried once with clearM halved and then skipped with W_RUIN_MONUMENT_SKIPPED, truncations (V02's and the ceiling cut) are counted in lay.truncated, and standing is the decay's reading. The note and the body give two meanings to standing and two failure paths.
* *Where:* IN-V04-2 vs §3.5.0a (5a), (6) and J-V4.84
* **Ruling:** V04 §3.5.0a states once: heights from V11's stepped-shrine row; an ST0-infeasible region retried once with clearM halved, then skipped with W_RUIN_MONUMENT_SKIPPED; a returned TierFailure truncates to the tiers laid, counted in lay.truncated; `standing` is the decay's reading only. IN-V04-2 is dropped.
* *Basis:* single source. *Units:* V04.

### V04-XCONF-1 (vol-V03-V04; minor) — FIX

* claim: §1b.1 says showUnexcavated is a per-viewer view key set by V09's control, 'not setLayer'; §1b.3 lists showUnexcavated among setLayer's targets (T12 dress, §7.4's layer row, undo inverse). One says it is not an edit, the other makes it one.
* *Where:* §1b.3 row 'setLayer (underground visibility, underView, showUnexcavated ...)' vs §1b.1 row 'the view key showUnexcavated (BCR-V9-20; J-VI.19) ... volume 9's per-viewer control (not setLayer)'
* **Ruling:** showUnexcavated is a per-viewer view key (J-VI.19): V04 §1b.3 drops it from setLayer's targets (view keys are never undone, §2.9).
* *Basis:* J-VI.19; f item 413. *Units:* V04.

### V04-XCONF-2 (vol-V03-V04; minor) — FIX

* claim: Both volumes bind PageUp/PageDown in §14's keymap: V04 to step the depth band while the underground layer is active, V03 to step the plan's storey. An underground building's plan draws at the underground band's depth in the underground view (V03 §3.12 (8), §5.1), so with the underground layer active and a plan's switcher shown the key has two bindings and no stated precedence (an undefined edge, principle (11)).
* *Where:* V04 §5.1 band ladder keys (PageUp/PageDown step the band while the underground layer is active; BCR-10 keymap) vs V03 §4.5 storey switcher (keymap rows plan.storeyUp PageUp, plan.storeyDown PageDown)
* **Ruling:** §14's keymap states the precedence once: with a building's plan open (the storey switcher shown) PageUp/PageDown step the storey; otherwise, with the underground layer active, they step the depth band. V03 §4.5 and V04 §5.1 cite it.
* *Basis:* §14 keymap home (R12); an undefined edge defined (11). *Units:* scope, V03, V04.

### V04-XCONF-3 (vol-V03-V04; minor) — FIX

* claim: V03 hands V04 a model-level bar matching T-V3-23 (g): with no building elaborated, the set of V04's crypt joins equals the set after elaborating every church. V04's T-V4-50 checks that crypt joins exist with cause crypt and heads in the crypt, but no V04 bar asserts elaboration-independence of the join set; the hand-off is not closed at its destination (principle (10)).
* *Where:* V03 §13 hand-off to V04 ('with V04's own model-level bar matching T-V3-23 (g)') vs V04 §7
* **Ruling:** T-V4-50 gains the clause: with no building elaborated, the set of crypt joins equals the set after elaborating every church (elaboration-independence); V03 §13's hand-off is closed there.
* *Basis:* hand-off closed at destination (10). *Units:* V04, V03.

### V05-ICONF-1 (vol-V05-V06; minor) — FIX

* claim: ShadeBasis.by and IslandShadeStrip.evaluated.by enumerate 'generation', 'rederive', 'epoch', but V5 §4.2's Update shade now is a fourth writer of a shadeBasis (and of strips); the value it writes into `by` (and `epoch`) is undefined.
* *Where:* V5 §2.1 ShadeBasis.by and V5 §2.3a IslandShadeStrip.evaluated.by vs V5 §4.2 Update shade now
* **Ruling:** ShadeBasis.by and IslandShadeStrip.evaluated.by gain 'update'; Update shade now writes 'update' and the document's current epoch.
* *Basis:* defined value (11). *Units:* V05.

### V06-ICONF-1 (vol-V05-V06; minor) — FIX

* claim: Item 101 R2 / J-VI.4 make every refusal except a dossier fact or a lock a bend. V06's no-stretch repairWall on a ring with nothing to lift is 'refused ("this wall is in use")' — neither a dossier fact nor a lock (advance's refusal on a dossier-bound document is the dossier-clock case and fits). The repairWall case should be stated as a bend or a no-op with its line, or cite the exception it falls under.
* *Where:* V6 §2.8 repairWall (no stretch) 'refused (this wall is in use)'; V6 §2.3 advance 'refused'
* **Ruling:** A no-stretch repairWall on a ring with nothing to lift is a no-op with its line ('this wall is in use'; nothing changes) — not a refusal.
* *Basis:* owner item 101 R2 (J-VI.4). *Units:* V06.

### V06-ICONF-2 (vol-V05-V06; major) — FIX

* claim: J-V6.92 records the choice as 'the water-system record a chance factor at CITY and METROPOLIS', while the body rules the opposite: 'the dossier's water-system record makes the need count as met and never scales the chance (V11's round 1, SS-13)' (§3.19 (3)), 'never a factor on the chance' (§3.19.6) and 'the chance untouched (no dossier factor … J-V8.67)' (§1b). A decision row contradicting the rule it records.
* *Where:* V6 §9 J-V6.92 vs V6 §3.19 (3), §3.19.6 and §1b's dossier trace (water-system row)
* **Ruling:** J-V6.92 is reworded to the ruled form: the water-system record makes the need count as met, raises the aqueduct cap and total by capPerSizeMember per SIZE member, binds the terminal, and never scales the chance.
* *Basis:* V11 SS-13; J-V8.67; the body governs its record. *Units:* V06.

### V06-ICONF-3 (vol-V05-V06; minor) — FIX

* claim: BCR-V6-9's EpochInputs.advance field list is {group, index, of, trajectory?}, while V6 §2.3's provenance and §2.12's lifecycle row carry stoppedAt? (on a stopped group's last epoch, the count actually folded) and T-V6-23 tests 'Stop keeps the folded epochs and writes stoppedAt'; the base change request omits a field the volume defines and tests.
* *Where:* V6 BCR-V6-9 vs V6 §2.3 and §2.12
* **Ruling:** BCR-V6-9's advance field reads {group, index, of, trajectory?, stoppedAt?}; file f item 343 applies it so.
* *Basis:* V06 §2.3, §2.12, T-V6-23. *Units:* V06.

### V06-ICONF-4 (vol-V05-V06; minor) — FIX

* claim: IN-V06-6 (J-VI.12) rules that the disabled-tool offer uses V09's label 'Open a copy from here', 'superseding any sentence that reads otherwise', but V6 §5.1 still reads 'every disabled tool offers the way forward: "Change from here: make a copy at year N"' — the body keeps the superseded wording.
* *Where:* V6 §5.1 timeline bar vs IN-V06-6
* **Ruling:** V6 §5.1's disabled-tool offer reads V09's label 'Open a copy from here'; IN-V06-6 is dropped.
* *Basis:* J-VI.12. *Units:* V06.

### V05-XCONF-1 (vol-V05-V06; minor) — FIX

* claim: V5 §4.4 ('The row's number … the integrator gives it the next free number'), J-V5.40, §1b's DR-SKY row, BCR-V5-12 and §13 item 9 still leave DR-SKY unnumbered, while the volume's own Integration note IN-V05-3 (J-VI.13) and docs/AMENDMENTS-2026-09-28f.md items 383 and 387 number it DR27; the body text is stale against the ruling and the id is not uniform across the set.
* *Where:* V5 §4.4 'The row's number'
* **Ruling:** DR27 everywhere in V05 (§1b, §4.4, J-V5.40, BCR-V5-12, §13 item 9); the alias and 'number left to the integrator' are removed (glossary G-DR).
* *Basis:* J-VI.13; f items 383, 387. *Units:* V05.

### V06-XCONF-1 (vol-V05-V06; major) — FIX

* claim: V06 rules pre-creation history out of scope ('At creation no epoch runs; the dossier's past reaches the map through HistoryHint … J-V6.4'), while the owner's g item 113 (a) orders history-first generation: 'the evolution engine runs the recorded history as coarse epochs … from the founding or the peak to the present' at generation, with destruction and refounding (b), burial after a threshold (c), sewers reopening in the replay (d), lost access (e), the effective peak (f) and bars (g), naming V06's part 'the replay engine at generation, coarse epochs, the event-to-epoch mapping'. By precedence (owner rule > volume decision) J-V6.4 is superseded.
* *Where:* V6 §1.3 last bullet and J-V6.4 vs g item 113 (OWNER RULE, 2026-09-29 ~14:05)
* **Ruling:** Owner rule g item 113 (a) governs: J-V6.4 and V6 §1.3's bullet are retired; V06 writes item 113's part at build depth (the history replay at generation — coarse epochs, the event-to-epoch mapping, destruction and refounding, burial, reopening sewers in the replay, lost access, the effective peak) as the g-113 routing gives it.
* *Basis:* owner rule > volume decision (3). *Units:* V06.

### V06-XCONF-2 (vol-V05-V06; minor) — FIX

* claim: The dossier trace names the derivation rows by working aliases and leaves numbers open: 'DR-V6.1 (BCR-V6-12; the coherence pass numbers it)' and 'DR-V8.1 (V08)'; file f item 383 (J-VI.13) fixes DR28 = V06's DR-V6.1 = V08's DR-V8.6 (one row) and DR29 = DR-V8.1. The volume's ids are stale against the ruling and 'the coherence pass numbers it' is open wording. Inside V06 the ids are mixed: BCR-V6-27 already writes 'DR-V6.1, numbered DR28' while BCR-V6-12 still names the row 'DR-V6.1 until the coherence pass numbers the rows (DR26 is proposed by volumes 1, 5 and 8 as well)'.
* *Where:* V6 §1b dossier trace (calamities row, realm-latitude row) and V6 §2.4, BCR-V6-12
* **Ruling:** DR28 (one row with V08's DR-V8.6) and DR29 wherever V06 names them; 'the coherence pass numbers it' is removed (glossary G-DR).
* *Basis:* J-VI.13; f item 383. *Units:* V06.

### V06-AGREE-1 (vol-V05-V06; minor) — FIX

* claim: V06 states the delete dry-run lines as 'The city will not rebuild this aqueduct; undo brings it back', 'The town will not rebuild this terrace wall', 'No house will be built on this spot of the bridge'; V09's one message key info.remove.holds reads 'The town won't {rebuild / raise} this {kind}; undo brings it back.' (and V05 quotes V09's form); the same event's user-facing line differs between the volumes (principle (10): same message).
* *Where:* V6 §3.19.3 (6), §4.2 (remove rows) vs V09 §4.20.3 info.remove.holds
* **Ruling:** V06 cites V09's info.remove.holds key with its {kind} slot for every delete dry-run line; a deck-plot wording is a V09 variant row ('No house will be built on this spot of the bridge').
* *Basis:* V09 owns the catalogue (application labels, J-VI.12). *Units:* V06, V09.

### V07-ICONF-1 (vol-V07-V08; major) — FIX

* claim: The law 1 + round(log2(P / 40)) clamped 1-4 gives 4 from P ≈ 227 (log2(P/40) >= 2.5), not 'from 320' as the table row says (320 is where log2 reaches exactly 3); the value at 228-319 people differs between the two statements (4 by the law, 3 by the row's gloss).
* *Where:* §2.2 neighbourTracks row (line 683) vs its law (lines 626, 661)
* **Ruling:** The neighbourTracks gloss reads '4 from about 227 people' (the law 1 + round(log2(P ÷ 40)), clamped 1–4, governs).
* *Basis:* the law is the rule; its gloss follows. *Units:* V07.

### V07-ICONF-2 (vol-V07-V08; minor) — FIX

* claim: §3.6 (5) glosses the centrepiece pond as 'a small decoration pond inside the green, the village pond', while §2.4 and §3.2 (8)(d) define 'the village pond' as the L0 pond VS1 carves at the lowest hollow within 150 m of the heart (pins.pond 0.4) and the centrepiece pond as a separate uncarved 'pond' part sited after the L0 batch; one name for two different ponds with different siting, carving and draws.
* *Where:* §3.6 (5) vs §2.4 Decorations and §3.2 (8)(d)
* **Ruling:** §3.6 (5)'s centrepiece pond drops 'the village pond' (the uncarved part of §2.4); 'the village pond' names only VS1's carved L0 pond.
* *Basis:* one term per concept (2). *Units:* V07.

### V07-ICONF-3 (vol-V07-V08; minor) — FIX

* claim: The cap 1 + floor(households / 25) reaches 6 at 125 households, i.e. about 563 people at the 4.5 mean household (§3.2 (3) H = round(P / 4.5)), not 'from 625' (139 households); the worked gloss disagrees with its own law for 563-624 people.
* *Where:* §3.10 VS8 ends ('1 at 40 people, 2 at 200, 6 from 625') vs the cap law
* **Ruling:** VS8's gloss reads '6 from about 563 people' (the cap 1 + floor(households ÷ 25) at H = round(P ÷ 4.5) governs).
* *Basis:* the law governs. *Units:* V07.

### V07-ICONF-4 (vol-V07-V08; minor) — FIX

* claim: (9v) sites an epoch's new nucleus 'at least 0.8·R_s from the existing ones', while the polyfocal rule whose cells §2.2a says (9v) reads ('polyfocal ... // §3.2 (4), §3.12 (9v)') spaces nuclei at max(polyfocal.spacingMinM = 250 m, spacingShareRs x R_s); the 250 m floor is dropped at epochs, so a small village's new nucleus may sit closer than at creation (a thorp's R_s about 100 m gives 80 m).
* *Where:* §3.12 (9v) vs §3.2 (4) and §2.2a polyfocal row
* **Ruling:** (9v) reads 'spaced by the polyfocal rule (§3.2 (4)): max(polyfocal.spacingMinM, spacingShareRs × R_s)' — the 250 m floor holds at epochs as at creation.
* *Basis:* one rule, no unstated exception. *Units:* V07.

### V07-ICONF-5 (vol-V07-V08; minor) — FIX

* claim: §13's note says V08's SR5-01 and V11's SR5-03 companions 'are §1's dependency (13), each pending with its fallback', and §12 says 'each with its fallback there', while §1 (13) (as fixed by the finalization, SR6-04 (a)) says both 'landed ... no fallback'; the volume states both that a companion is pending and that it has landed.
* *Where:* §13 closing note and §12 round-6 readings vs §1 dependency (13)
* **Ruling:** The stale 'pending' sentences leave with the §12/§13 narration; §1 (13) states the current facts (both companions landed).
* *Basis:* principle (5). *Units:* V07.

### V07-XCONF-1 (vol-V07-V08; major) — FIX

* claim: J122 decides V07 Q1 as '(a) yes, and its tracker spike (V-M0) right after M0'; V07 §11 still lists Q1 as an open owner question with only a recommendation, §8 still says 'the order is the owner's (Q1)', and §8 lets V-M0 and V-M1 start only 'once M2b has landed and M3a's tools exist' — for V-M0 this contradicts J122's 'right after M0' (owner delegation outranks the volume, principle (3)).
* *Where:* V07 §11 Q1; §8 'Where it slots into §16' vs docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md (J122)
* **Ruling:** J122 governs: V07 §11 Q1 is marked 'decided (a), J122'; V07 §8 reads: V-M0 (the tracker spike) right after M0, on M0's kernel, M0 (b)'s tables and the spike's own fixtures (no M2b input); V-M1 onward after M4, parallel with M5; V-M3's epoch clauses with M6-E. INDEX §4 and §16 carry the same slot.
* *Basis:* owner delegation J122 > volume. *Units:* V07, scope.

### V07-XCONF-2 (vol-V07-V08; major) — FIX

* claim: V07 requires 'a span over a hinterland face — field, meadow, common, pasture or wood — stays open at every rung' and registers V04's arch-vault source at every village rung; V04's span rule makes a span open only where its strip meets a part-0 way, water or flood cell, or fails the height or slope tests, and otherwise vaults it by chance (raised.vaultShare x era and culture multipliers, vaultCap 10 at each village rung) — no hinterland condition; IN-V07-2 closes FL-3 on the ground that 'V04's span rule leaves country spans open where no vault stage registers', but V07 registers the source at village rungs, and §3.16 (1) still carries the fallback 'until V04 states the hinterland cond…
* *Where:* V07 §1 dependency (5), §3.5a (7), §3.16 (1) vs V04's span rule (V04 BCR-45 'The span rule') and IN-V07-2
* **Ruling:** The span rule (file f item 244 / V04 BCR-45, the base home) gains in step (2): a span whose under-deck strip lies wholly on hinterland land-use faces (field, meadow, common, pasture, wood) is `open` (new reason `country`) at every rung — country arcades stand open (realism tiebreaker). T-V4-62 gains the clause; V07 §1 (5) and §3.16 (1) cite the rule and drop the fallback; IN-V07-2's reason is corrected.
* *Basis:* realism tiebreaker; one rule at its base home (f item 244). *Units:* V04, V07, model.

### V08-XCONF-1 (vol-V07-V08; minor) — FIX

* claim: The clerk configuration is written as a recommendation, while J121/J122 decide it: V10 Q2 'SettlementForge's, driving our tool API (J121)'. The design text still presents a settled owner decision as a recommendation.
* *Where:* V08 §3.1 step 2 ('none under C (SettlementForge's own assistant, the default recommended here)'); §4.4 (6) ('C (this section's own assistant, the default recommended) needs no built-in clerk')
* **Ruling:** V08 §3.1 step 2 and §4.4 (6) read 'none under C (SettlementForge's own assistant; follows SettlementForge, J121/J122)'.
* *Basis:* J121, J122. *Units:* V08.

### V08-XCONF-2 (vol-V07-V08; major) — FIX

* claim: Owner ruling J121 (recorded in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: V08 Q1 'the module's web origin — follows SettlementForge (J121)'; V08 Q2 'plans, save limits, backups — follows SettlementForge (J121)') requires the design to read SettlementForge's decision as an input and never re-decide it; V08 fixes the backup count at two snapshots in the storage contract (MapRecord.backups, replaceSnapshot 'drops backups[2]'), sizes a per-map quota, and makes the draft mirror's persistence depend on 'Q1's recommendation', i.e. re-decides hosting, origin and backups (principle (3): owner rule > volume).
* *Where:* V08 §0 ('two older copies kept as backups'; 'on its own web address'), §2.1 MapRecord.backups ('the two previous snapshots'), §2.2 MapHostConfig.moduleOrigin ('owner question V08 §11 Q1'), §3.7 Backups and the draft mirror ('Q1's recommendation (a subdomain...)'), sizes as 'the host's quota' vs J12…
* **Ruling:** Recast as inputs (J121): MapHostConfig carries SettlementForge's module origin, backup depth and storage quota from its existing product decisions; MapRecord.backups is 'backups[0..n)', n read from that input (replaceSnapshot drops the oldest beyond n); the draft mirror follows SF's origin; §6's storage row, §8.4 risk 5 and J-V8.5 cite the input; Q1 and Q2 are marked 'follows SettlementForge (J121)'.
* *Basis:* owner ruling J121 > volume. *Units:* V08.

### V08-XCONF-3 (vol-V07-V08; minor) — FIX

* claim: J122's combined build order places the village product (V-M, after M4) before the live SettlementForge connection (M-SF, after M-CAL), so by the time a live SF drives a map the village product is registered; the plain-words promise that small settlements 'wait' describes a state the ruled order never reaches in the live product (the held-below-1 500 path remains only for a build without the village package). The B7 catalogue row's user text 'which is coming later' is deferral wording shipped as product copy.
* *Where:* V08 §0 ('A settlement under 1 500 people waits for the village product...'); §3.9 B7 ('Villages are drawn by the village map, which is coming later.'); §3.10
* **Ruling:** V08 §0, §3.9 B7 and §3.10: small settlements are drawn by the village product (V07), which J122's order registers before M-SF; the held-below-1 500 state applies only to a build without the village package; B7's copy loses 'coming later'.
* *Basis:* J122; principle (6). *Units:* V08.

### V08-XCONF-4 (vol-V07-V08; minor) — FIX

* claim: J122 decides V08 Q5: 'pictures and player views now; a live shared map as a later item after M-SF'; the volume still cites Q5 as an open owner question instead of the decision (principle (7)'s J122 clause: mark each answered with its decision and J122).
* *Where:* V08 §1 Out of scope ('A live, explorable map for players ... is not built: owner question Q5') and §3.14 (6) ('the "party copy" capability of owner question Q5, not built') vs J122
* **Ruling:** V08 §1, §3.14 (6) and §11 cite 'decided under J122: pictures and player views now; a live shared map after M-SF'.
* *Basis:* J122. *Units:* V08.

### V08-XCONF-5 (vol-V07-V08; major) — FIX

* claim: J122 decides V08 Q3: 'scene files inside SettlementForge's export bundle — yes, from M-SF; until then maps export on their own'. V08 still treats Q3 as open and forbids it, and §5.4's structural rule ('no STRUCTURED format reaches SettlementForge's code ... the host client has no call that returns one') would have to admit a scene-file route for SF's bundle from M-SF; the owner delegation outranks the volume (principle (3)), and door 1 (J86: no geometry for SF's simulator) must be shown to stay closed by the new route.
* *Where:* V08 §5.4 (2) ('Whether SettlementForge's own export bundle may carry the map's scene files is the owner's (V08 §11 Q3); until the owner says so, it may not.') and §5.4 (1)-(2)'s structural closure vs J122
* **Ruling:** J122 (V08 Q3) is written at build depth in V08 §5.4: from M-SF the host client gains one call returning the user's chosen scene exports (§11.1's scene formats, rendered at the export's knowledge tier and admitted by the calling key) as OPAQUE byte blobs for SettlementForge's export bundle; SettlementForge packages the bytes unread; before M-SF maps export on their own. Door 1 stays closed (J86): no structured format reaches SettlementForge's code as data — §5.4's structural rule is narrowed to 'no call returns a structured format; the bundle call returns opaque blobs only'. A test (V08 §7) asserts the blob route carries no parsed structure and honours the key.
* *Basis:* owner delegation J122 > volume; J86 intact. *Units:* V08, rendering.

### V08-XCONF-6 (vol-V07-V08; minor) — FIX

* claim: J121 (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: 'other interface languages — follows SettlementForge (J121)') requires the module's interface language to follow SettlementForge's decision as an input; V08 fixes English as the default of the module's own locale table instead of reading SF's language setting.
* *Where:* V08 §5.5 ('the module's own strings are its locale table (§14's app), with English the default')
* **Ruling:** The frame's interface language is the host's (an input on doc.load / MapHostConfig from SettlementForge's language decision, J121); English is the catalogue's source language, not a product default.
* *Basis:* J121. *Units:* V08, V09.

### V08-XCONF-7 (vol-V07-V08; minor) — FIX

* claim: J122 decides V08 Q4: 'the live SettlementForge connection after M-CAL — yes' (the port's creation half at M1 on frozen dossiers); §8.1 and §11 still present Q4 as open.
* *Where:* V08 §8.1 ('putting M-SF earlier (before M-CAL, calibrating afterwards) is the owner's product-order choice (V08 §11 Q4)')
* **Ruling:** V08 §8.1 and §11 mark Q4 'decided under J122: M-SF after M-CAL'.
* *Basis:* J122. *Units:* V08.

### V08-XCONF-8 (vol-V07-V08; major) — FIX

* claim: Every V08 owner question is answered in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: Q1 and Q2 'follow SettlementForge (J121)', Q3 'yes, from M-SF; until then maps export on their own' (J122), Q4 'after M-CAL: yes' (J122), Q5 'pictures and player views now; a live shared map as a later item after M-SF' (J122). The table still presents them as open with defaults, and three answers differ from the defaults (Q2's backup rule and plan rule are SF's, not V08's; Q3 changes 'until ruled: no' to yes from M-SF). Principle (7)'s J121/J122 clause: mark each answered with its decision, have the design read SF's decisions as inputs.
* *Where:* V08 §11 Owner questions table (Q1-Q5) and its preface ('Until the owner answers, the design runs on the recommendation marked default')
* **Ruling:** V08 §11 becomes a table of the five decisions (Q1, Q2 follow SettlementForge, J121; Q3 yes from M-SF, J122; Q4 after M-CAL, J122; Q5 pictures and player views now, J122), each carried into its section (§3.7, §5.4, §8.1, §3.14 (6)).
* *Basis:* J121, J122. *Units:* V08.

### V08-XCONF-9 (vol-V07-V08; minor) — FIX

* claim: One derivation is written in two homes with different inputs: V11 §3.19.2 says 'V08 derives era from site.culture and the tier' (every culture c14, region western), while V08 §2.6's era row, which owns the reading, maps only the culture ('every culture of the cultures row -> c14 ... the culture is the discriminator'); the tier is read by neither rule's body.
* *Where:* V08 §2.6 'era' row (line 955) vs V11 §3.19.2 'Era default from the dossier'
* **Ruling:** The era derivation's home is V08 §2.6's era row (culture → era); V11 §3.19.2 cites it without naming the tier.
* *Basis:* single source (1). *Units:* V08, V11.

### V09-ICONF-1 (vol-V09-V10; minor) — FIX

* claim: The heading reads 'The four classes of state' while the table lists five classes (canonical, document view state, machine preferences, local store, session-transient).
* *Where:* V09 §2.1 heading and table (lines 416-424)
* **Ruling:** V09 §2.1's heading reads 'The five classes of state' (the five differ in store and writer; kept apart).
* *Basis:* wording. *Units:* V09.

### V09-ICONF-2 (vol-V09-V10; minor) — FIX

* claim: The rule says every EditEvent kind is 'reached from exactly one home tool', but the table homes the same kind at several tools: split and merge at T5 (districts, line 1470) and T9 (ways line 1466, plots line 1484); delete at T10 (line 1500) and T9 (access points line 1476, catacomb galleries line 1477); instance at T6 (hood pin, 1478), T8 (trees, 1482) and T9 (furniture, 1486); setAttr and convert at most tools. T-V9-12's completeness check cannot test 'exactly one' as worded.
* *Where:* V09 §1.1 (4) and §4.3 opening sentence vs the §4.3 table
* **Ruling:** The unit of the binding is one home tool per (event kind, target class or path); §7.1's binding table (DXC-04) and T-V9-12 are keyed on that pair.
* *Basis:* precision; agrees with DXC-04. *Units:* V09, determinism.

### V09-ICONF-3 (vol-V09-V10; major) — FIX

* claim: §4.20.5 (4) opens 'Withdrawn by J-VI.4 … these are bends, not refusals' and then says the stack keys 'with bend.raised.island, bend.aqueduct.island, bend.raised.onIsland, bend.aqueduct.uphill and bend.retaining.rim … form V9 §4.9's added refusal class — a rule of a building's structure or of nature … T-V9-13's list gains them', while §4.9 states that class 'is withdrawn by J-VI.4, its cases now bends'. The same keys are called bends and members of a refusal class; T-V9-13's list is left ambiguous. It also keeps 'the former text, kept for the record' (narration).
* *Where:* V09 §4.20.5 (4) (lines 2768-2775) vs §4.9's opening paragraph
* **Ruling:** §4.20.5 (4)'s leftover sentence and 'kept for the record' text are deleted; §4.9 states once that the ten keys are bends; T-V9-13 lists them as bends.
* *Basis:* J-VI.4. *Units:* V09.

### V09-ICONF-4 (vol-V09-V10; minor) — FIX

* claim: §4.15 says the link view 'draws each goods family with its own dash pattern (five patterns) besides its colour', while §5.4 draws links 'coloured by the good's family … dashed where the satisfaction is below 1' and impaired chains 'with a gap every 20 px'. Dashing carries three different meanings (goods family, low satisfaction, impaired chain), so a dashed link is ambiguous and the second cue for colour is undefined.
* *Where:* V09 §4.15 'Never colour alone' vs §5.4 'Supply links'
* **Ruling:** One channel per cue, stated once in V09 §5.4 and cited from §4.15: goods family = colour and dash pattern (five patterns); satisfaction below 1 = a hollow arrowhead; an impaired chain = half line width. Dashing never carries a second meaning (this is also g item 112 (a)'s second cue).
* *Basis:* one meaning per cue; g item 112. *Units:* V09.

### V09-ICONF-5 (vol-V09-V10; minor) — FIX

* claim: J-V9.40 still reads 'chose to expand a dwelling declaration on a sealed void into a closure that digs a way down …, else opens the nearest public opening, and to refuse only when neither exists', while §4.17.4 step (4) and J-V9.102 replace that refusal by the bend onto ground part 0 (bend.under.noAccess; item 101 R2) and add the collapsed_shaft step. J-V9.40 is not marked amended, so the decision table states a refusal the design no longer has.
* *Where:* V09 §9 J-V9.40 vs §4.17.4 (4) and J-V9.102
* **Ruling:** J-V9.40 carries 'amended by J-V9.102' and states the four-step ladder (no refusal).
* *Basis:* canon E-SUPERSEDE; item 101 R2. *Units:* V09.

### V09-XAGREE-1 (vol-V09-V10; major) — FIX

* claim: V09 and V11 disagree on the shape of the two document-only tables: (1) V09 writes a kind key 'cls:<class>' (a roster class no dossier record binds); V11 lists three key forms only (uid:, cat:, use:); (2) V09 writes split:false and V11's quarter, place and pin cells under the KIND key ('Keep works and shop together for every {kind}', 'Put them in {quarter}', 'Put them here', 'Keep them where they are'), while V11 gives uid: {profile, familyWeights, quarter} and cat: {profile, familyWeights} and puts place, pin and split on use: rows only; (3) V09 says a use: key 'admits the split cell only', V11's use: row carries place, pin, split and specialisation; (4) V09's link view writes siting…
* *Where:* V09 §2.6 (screen → row table), §4.7, §10.2 XV-V9-1/XV-V9-2 vs V11 §4.2 (V11 lines 4012-4030)
* **Ruling:** V11 §4.2 (the tables' owner) states the union of both volumes' needs: siting.declared key forms uid:, cat:, cls: (a roster class no dossier record binds) and use:; the kind keys (uid:, cat:, cls:) admit profile, familyWeights, quarter, place and split; use: admits place, pin, split and specialisation; siting.linkEdits cells {bindTo?, avoid?, cut?} with the three meanings (bindTo keeps a supplier; avoid cuts one, the next nearest serving; cut stops the good at that use). V09 §2.6 maps each screen to a declared cell and cites V11 §4.2; V10 §4.1's encoders write only declared cells; XV-V9-1 and XV-V9-2 are closed.
* *Basis:* the tables' owner rules; union of existing statements, nothing lost. *Units:* V11, V09, V10.

### V09-XAGREE-2 (vol-V09-V10; major) — FIX

* claim: V09's crypt bend clamps another church's crypt enlarged past the cathedral's 'just short of it' ('this one stops just short of it', bend.crypt.largest) and says 'V03 computes (e) (XV-V9-5)'; V03 caps every non-principal crypt at crypt.rankShare (V11's row, default 0.8) × the principal's area and recomputes the rank each run, and V03 holds no crypt-edit bends (no bend.crypt.* dry run, no mention of XV-V9-5). The value (just short vs 80 %) and the owner of the dry run disagree; the hand-off is open.
* *Where:* V09 §4.17.5 (e) and XV-V9-5 vs V03 §3.7.4 rank rule (V03 lines 1837-1845)
* **Ruling:** V03 §3.7.4 (the crypt's owner) states the crypt-edit dry runs: an enlarging edit bends to the rank cap crypt.rankShare × the principal's area ('stops at {share} of the cathedral's'); a plan event that would remove the cathedral's crypt keeps it at its smallest lawful size; the crypt join's closing is listed as a fate. V09 §4.17.5 (e) and bend.crypt.largest word and cite it; XV-V9-5 closed.
* *Basis:* V03 owns the crypt (J111); rankShare is V11's cell. *Units:* V03, V09.

### V09-XCONF-1 (vol-V09-V10; major) — FIX

* claim: BCR-V9-3's new §2.9 text defines workingLayer as 'the layer the tools act on — ground, a sky island's PlatKey, or an underground depth band', while V9 §2.4 types WorkingLayer as {layer 'ground'} / {layer 'sky'; key} / {layer 'underground'} and says 'the band is the view key depthBand alone (§2.9), never copied here'. Applying item 277 as written would put a band into workingLayer, contradicting the volume's type and V04's depthBand key.
* *Where:* V09 §10.1 BCR-V9-3 (applied as written by file f item 277) vs V09 §2.4 WorkingLayer
* **Ruling:** BCR-V9-3's text reads 'ground, a sky island's PlatKey, or the underground (its band the view key depthBand)'; file f item 277 applies the corrected text.
* *Basis:* V09 §2.4's type; J-VI.19's view-key rule. *Units:* V09.

### V09-XAGREE-3 (vol-V09-V10; major) — FIX

* claim: V02 names its stacked-massing and deck bends bend.tiers.stepped, .none, .axial, .internal, .count, .step, bend.stack.groundWing, .roof, .base, bend.deck.single, bend.deck.basement, bend.building.remove, bend.wing.grow, bend.family.nearest, bend.room.passage, bend.row.plotLine, and states 'volume 9's (X21) … under the ids of V2 §1b'. V09's catalogue holds bend.tiers.count and bend.tiers.step (shared) but otherwise bend.tiers.flights, bend.tier.height, bend.stack.internalSolid, .removeStair, .addWing, .deck, .notStepped and bend.deck.floors — none of which V02 emits — and has no row for fourteen of V02's ids. IN-V09-4 ('every bend of V2 §1b … has a catalogue row') was never applied to …
* *Where:* V09 §4.9 catalogue (tier/stack/deck bend rows) and §4.20.5 vs V02 §1b bend ids (V02 line 303, 2695)
* **Ruling:** V02 §1b's bend ids are the one set (V02 owns the massing dry run): V09 §4.9 holds one row per V02 id with its words and buttons; V09's keys with no producer are retired, unless V02 finds the case among V2 §4.6's bends, names it in §1b and V09 keeps the row; T-V9-59 and §4.20.5 re-point. V10 words each bend through V09's rows.
* *Basis:* producer owns the id; T-V9-15 (no key without a row). *Units:* V02, V09, V10.

### V10-XAGREE-1 (vol-V09-V10; major) — FIX

* claim: V10's link op 'avoid' is written as conditional on V11 carrying the cell, and V11 §4.2 does not carry it (cells {bindTo?, cut?}; see the V09/V11 table-shape finding). The clerk's encoder and the canvas's 'Cut this link' (V09 §4.7) therefore write a cell whose home does not declare it; the condition is left open in normative text.
* *Where:* V10 §2.12 ShapeInput.link ('avoid' only where V11's siting.linkEdits carries the cell (V09 XV-V9-2)) and V10 §4.1's link encoder
* **Ruling:** With V11 §4.2's linkEdits carrying `avoid` (V09-XAGREE-1), V10 §2.12 drops the condition and cites V11 §4.2.
* *Basis:* V09-XAGREE-1. *Units:* V10.

### V10-XAGREE-2 (vol-V09-V10; major) — FIX

* claim: WhyPull.family is typed WhyFamily (V11's eight plus nine score terms), but V01's providers emit WhyPulls of families SUNLIGHT, EMITS, SENSITIVE; V10 keeps a translation note ('they read as sun, nuisance and nuisance') and asks V01 to change (CVR-V10-6), which V01 has not done. A value outside the declared enum crosses the seam, and the mapping lives at the consumer instead of the producer.
* *Where:* V10 §2.13 WhyFamily and the family-mapping note vs V01 line 2693 ('the siting pushes as WhyPulls of families SUNLIGHT, EMITS, SENSITIVE')
* **Ruling:** V01's why providers name their pushes by V11's family ids (SUNLIGHT → sun; EMITS and SENSITIVE → nuisance); V10 §2.13 drops the translation note; CVR-V10-6 is met.
* *Basis:* the producer speaks the declared enum (10). *Units:* V01, V10.

### V10-XAGREE-3 (vol-V09-V10; minor) — FIX

* claim: The same size words map to different populations on the two surfaces: the clerk's lexicon fixes 'small town' 2 500, 'town' 5 000, 'large town' 8 000, 'small city' 12 000, 'city' 20 000, 'large city' 28 000, 'metropolis' 50 000, while V09's seven size chips with the same words read population quantiles of the rungs' bands from the rung table (TOWN band's 25th, 50th, 85th percentiles; CITY's; METROPOLIS's median). 'A town' asked in words and picked as a chip can give different recipes; one concept has two mappings (principle (2) and (10)).
* *Where:* V10 §3.3 default lexicon (population rows) vs V09 §4.5 T1 size chips (J-V9.56)
* **Ruling:** One rule for the size words: V09 §4.5's T1 quantile rule (J-V9.56, read from the rung table) is the home; V10 §3.3's lexicon rows name the quantile, not a population number.
* *Basis:* single source with the rung table (1). *Units:* V10, V09.

### V10-XAGREE-4 (vol-V09-V10; major) — FIX

* claim: Three texts disagree on a church on wet ground: V10's crypt section words it 'no crypt: ledger slabs in the chancel floor'; V09 §4.17.5 says 'V03's wet-ground fold reads "floor vaults (wet ground)"' as a crypt form on the church's Below line; V03 has no floor-vault crypt (J-V3.44: 'flush ledger slabs … in a church without a crypt over a floor-vault "crypt"') and lifts an always-crypt on wet ground to a raised-choir crypt (line 140). The panel and the clerk would say different things for one row, and V09's wording names a form V03 rejected.
* *Where:* V10 §3.9a crypt row 'no crypt' vs V09 §4.17.5 crypt line vs V03 (lines 140, J-V3.44)
* **Ruling:** V03 §3.7.4 states the wet-ground rule: an always-crypt class takes the raised-choir crypt; any other church takes no crypt, with ledger slabs in the chancel floor (J-V3.44). V10 §3.9a words both; V09 §4.17.5 cites V03 and drops 'floor vaults'.
* *Basis:* V03 owns the crypt. *Units:* V03, V10, V09.

### V09-J121-1 (vol-V09-V10; major) — FIX

* claim: The plain-words text says the assistant 'asks for your own key to the AI service before anything leaves your computer' and 'stops at the monthly limit you set'; OWNER RULING J121 and the delegated decisions (V10 Q1: the user's own API key or a relay — follows SettlementForge's AI setup; V10 Q2: SettlementForge's assistant, driving our tool API; V10 Q3: model tier follows SettlementForge) make the key/relay and the assistant a SettlementForge input, not a V09 decision.
* *Where:* V09 §0 'The assistant' paragraph (line 160-165)
* **Ruling:** V09 §0's assistant paragraph reads SettlementForge's AI setup as an input (J121): in the SettlementForge module SettlementForge's assistant drives the map; the own-key path is the one a deployment's configuration enables, never the default product path.
* *Basis:* J121, J122; SCOPE-C07. *Units:* V09.

### V09-J121-2 (vol-V09-V10; minor) — FIX

* claim: J121 makes hosting, web origin and accounts follow SettlementForge's product decisions, and J122 decided 'two people editing one map at once: not now; revisit with the live party map after M-SF'; the out-of-scope line states 'none' as the volume's own decision without citing either ruling.
* *Where:* V09 §1.3 'A hosted service, accounts and live multi-user editing — none (§11.5)'
* **Ruling:** V09 §1.3 reads: hosting and accounts follow SettlementForge (J121); simultaneous editing of one map by two people is not offered (J122).
* *Basis:* J121, J122. *Units:* V09.

### V09-J121-3 (vol-V09-V10; minor) — FIX

* claim: Interface languages were ruled 'follows SettlementForge (J121)' in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md ('other interface languages'); the volume states the locale policy (English ships; locale files) as its own without reading SettlementForge's decision as an input.
* *Where:* V09 §2.9 'Locales' / 'English ships' and §4.9 'A shipped locale carries every key', §5.12 General (language)
* **Ruling:** Which locales ship follows SettlementForge (J121); the locale-file mechanism stays; English is the catalogue's source language.
* *Basis:* J121. *Units:* V09.

### V09-J121-4 (vol-V09-V10; major) — FIX

* claim: J121/J122 decided V10 Q1 ('the user's own API key or a relay: follows SettlementForge's AI setup') and V10 Q2 ('SettlementForge's assistant, driving our tool API'); the volume's shell does not say which clerkMode and configuration the SettlementForge host uses, and the key card and 'The assistant needs your own key for the AI service' read as the default product path.
* *Where:* V09 §4.11 first-opening cards (key card, configuration A/B), §2.10 ClerkHandle.setKey, §4.9 clerk.key.missing
* **Ruling:** V09 §4.11, §2.10 and §4.9 state: in the SettlementForge module the clerkMode and configuration come from SettlementForge's configuration (SettlementForge's assistant proposes through the host proposal path); the own-key card appears only where the configuration enables the built-in clerk with a user key.
* *Basis:* J121, J122. *Units:* V09.

### V09-J122-1 (vol-V09-V10; minor) — FIX

* claim: J122 decided V09 Q2 in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: 'five SettlementForge users per round, recruited from its existing community; thanks by credit and early access, no payments'. The protocol still routes recruitment to the owner and keeps 'five to eight' participants without the decided source and thanks.
* *Where:* V09 §7.3 (2) Participants ('Recruitment and any thank-you are the owner's (V9 §11 Q2)')
* **Ruling:** V09 §7.3 (2) reads: five SettlementForge users per round, recruited from its existing community (within §13.4's five to eight), thanked by credit and early access, no payments (J122); §11 Q2 marked answered.
* *Basis:* J122. *Units:* V09, scope.

### V09-J121-5 (vol-V09-V10; major) — FIX

* claim: J121/J122 answered all three: Q1 (preview host) — 'follows SettlementForge's staging (J121)'; Q2 (participants and thanks) — 'five SettlementForge users per round, recruited from its existing community; thanks by credit and early access, no payments' (J122); Q3 (public name) — 'follows SettlementForge (J121)'. V09 §11 still lists them as open with the old defaults (a free static host from AP2; unpaid invitations with a US$20-25 fallback; keep 'PLAT'), and the opening sentence 'until the owner answers, the design runs on the recommendation'; the brief requires each marked answered and the design to read SettlementForge's decision as an input.
* *Where:* V09 §11 Owner questions (lines 4254-4268)
* **Ruling:** V09 §11: Q1 and Q3 'follows SettlementForge (J121)' (the preview host is SettlementForge's staging; the public name SettlementForge's); Q2 'decided (J122): …'; the stale defaults and 'until the owner answers' are removed; §7.3 and AP2 read SettlementForge's staging host and community as inputs.
* *Basis:* J121, J122. *Units:* V09.

### V10-J121-1 (vol-V09-V10; major) — FIX

* claim: The plain words fix the provider and key path ('runs on Claude, Anthropic's model … you paste your own Anthropic API key … or the program that embeds the map … provides the connection, or uses its own assistant instead'); J121/J122 decided V10 Q1 (key or relay: follows SettlementForge's AI setup), Q2 (SettlementForge's assistant, driving our tool API) and Q3 (model tier follows SettlementForge; evaluate a cheaper tier before any switch). The SettlementForge module's case is SettlementForge's assistant through the host seam, not the built-in clerk with the user's key.
* *Where:* V10 §0 'Turning it on, and what it costs' (lines 177-183) and §1.3 ("Other providers or a local model — declined by the brief: the built-in clerk runs on Claude"); §2.10 default row ops.model.id (claude-opus-5; "Claude Opus 5.5 is the owner's option (section 11 Q3)"); §3.16 key row ("Your Anthropic…
* **Ruling:** V10 §0, §1.3, §2.10's ops.model.id row and §3.16's key row read the provider, model tier and key path from the deployment's AI configuration (SettlementForge's setup, J121); in the SettlementForge module SettlementForge's assistant drives the tool API through the host seam (J122).
* *Basis:* J121, J122. *Units:* V10.

### V10-J121-2 (vol-V09-V10; major) — FIX

* claim: J121 answered the relay question (V10 Q1: follows SettlementForge's AI setup) and J122 chose SettlementForge's assistant driving our tool API (V10 Q2) for the SettlementForge module, i.e. configuration C there; the volume still leaves the relay 'the owner's (section 11 Q1)', lists A/B/C as a per-deployment choice without naming SettlementForge's decided configuration, and the data notice names the provider as a design constant.
* *Where:* V10 §3.17 configurations table and 'The relay question stays the owner's (section 11 Q1)'; §3.20 data notice ('to Anthropic (or to the service your host chose)'); §8 risk (1) and J-V10.24 ("a relay stays the owner's (section 11 Q1)"); J-V10.4 ("Claude Opus 5.5 … is the owner's option in Q3")
* **Ruling:** V10 §3.17 names SettlementForge's configuration as C (J121/J122) and keeps A and B as the configurations a deployment's setup may enable elsewhere; the data notice names the provider read from the deployment's setup; §8 risk (1), J-V10.24 and J-V10.4 cite J121; Q1 marked answered.
* *Basis:* J121, J122. *Units:* V10.

### V10-J121-3 (vol-V09-V10; major) — FIX

* claim: J121/J122 answered all five (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md): Q1 key or relay — follows SettlementForge's AI setup (J121); Q2 — SettlementForge's assistant, driving our tool API (J121); Q3 model tier — follows SettlementForge (J121), evaluate a cheaper tier before any switch; Q4 — the built-in clerk as M3c beside M3b (yes); Q5 — the live-evaluation spend approved as a budget cap (about US$790-1 190 through M3c) spent in stages, the smallest tier first, the full suite only at M3c's exit, each spend shown to the owner before it runs. V10 §11 still states them as open with recommendations, and its Q5 figures (US$800-1 200, a weekly schedule) differ from the decided cap and…
* *Where:* V10 §11 Owner questions Q1-Q5 (lines 3367-3409)
* **Ruling:** V10 §11: each question marked answered with its ruling (Q1–Q3 J121; Q4 J122 M3c beside M3b; Q5 J122: a budget cap of about US$790–1 190 through M3c, spent in stages — the smallest evaluation tier first, the full suite only at M3c's exit, each spend shown to the owner before it runs); §7.3's schedule carries the staging.
* *Basis:* J121, J122. *Units:* V10.

### V11-ICONF-1 (vol-V11-V12; minor) — FIX

* claim: Readers lists contain conditional clauses left open: row 62 'should T-V11-1 (b) record those reads under S8, the row lists S8 in that change'; row 80 'should T-V11-1 (b)'s recorded reads tag an epoch stage's S5b as EVO_GROWTH, this row lists EVO_GROWTH in that change, J-V11.92'; row 81 'the same pre-decided move'. The normative readers set is not determined by the text (a readers entry is the invalidation map of §7.6), which is ambiguous normative text bordering on deferral wording.
* *Where:* §3.1 rows 62 and 80 (and 81 by reference)
* **Ruling:** Reads are recorded under the registered StageId of the stage function that reads (S8, S5b), never under the calling epoch phase; an epoch re-derives through the epoch fold (V06). Rows 62, 80 and 81 list S8 and S5b and drop the conditional clauses.
* *Basis:* determinate readers (the invalidation map, §7.6); no deferral wording (6). *Units:* V11.

### V11-ICONF-2 (vol-V11-V12; minor) — FIX

* claim: 'lumber camp logs 0.9, bark 0.1' and later 'lumber camp logs' (no shares) are both in the produces list: a duplicated entry that reads as two different produces sets for one class.
* *Where:* §3.7.2 produces list
* **Ruling:** The second 'lumber camp logs' entry is deleted.
* *Basis:* duplicate. *Units:* V11.

### V11-ICONF-3 (vol-V11-V12; minor) — FIX

* claim: §3.13.3 says the compiler emits generic-<f> 'for every profile family f', while §3.2.1 step 5 and §3.5.14 say one per NON-ALIAS family (aliases civic, defence resolve to their target's generic class; 45 generic classes).
* *Where:* §3.13.3 first sentence vs §3.2.1 step 5 and §3.5.14
* **Ruling:** §3.13.3 reads 'for every non-alias profile family'.
* *Basis:* §3.2.1 step 5 governs. *Units:* V11.

### V11-ICONF-4 (vol-V11-V12; minor) — FIX

* claim: 'resolveSiting (~230 classes ...)' while §3.5.14 counts 181 authored + 45 generic + 2 sky = 228 plus V07's village classes, which step 6 compiles and T-V11-3/-4/-5 run over; the budget's class count omits the v. rows the derivation also iterates (PLAUSIBLE: depends on whether resolveSiting derives v. rows).
* *Where:* §6 resolveSiting row
* **Ruling:** §6's resolveSiting row states its count as read from REGISTRY (the authored, generic, sky and V07 v. classes it derives).
* *Basis:* one count source. *Units:* V11.

### V11-ICONF-5 (vol-V11-V12; minor) — FIX

* claim: J-V11.8 says '≈ 179 authored town and city classes', while §3.5.14 counts 181 (fort and lighthouse added) and BCR-V11-11 says '≈ 180'; J-V11.94 says 'a town roster holds ≈ 180 classes'.
* *Where:* §9 J-V11.8 vs §3.5.14
* **Ruling:** J-V11.8 reads 181 and cites §3.5.14's count; J-V11.94 cites it.
* *Basis:* one value. *Units:* V11.

### V11-ICONF-6 (vol-V11-V12; minor) — FIX

* claim: §12 states '86 registry catalogue rows (1-85 and 58a)', 'the class count (179 authored)' and wiring 'W1 - W66' as CONFIRMED by script, while the live text has 92 rows, 181 classes and W1-W78.
* *Where:* §12 revision paragraph (line 4841-4843) vs §3.1, §3.5.14, §1b
* **Ruling:** §12's stale counts leave with the narration.
* *Basis:* principle (5). *Units:* V11.

### V11-ICONF-7 (vol-V11-V12; minor) — FIX

* claim: 'the tower's record binds the guild's hall' is ambiguous (tower becomes the hall, or a new hall takes the tower's key); V08 §3.5.1 (c)'s first case and V06's convert read it as re-designation in place. Open on the INDEX fix list.
* *Where:* §3.12 mages_guild row (INDEX §7 fix list: SR6-09 (d))
* **Ruling:** The mages_guild cell reads 'the wizard's tower becomes the guild's hall (re-designated in place; V08 §3.5.1 (c)'s first case)'. Closes SR6-09 (d).
* *Basis:* V08 §3.5.1 (c). *Units:* V11.

### V12-ICONF-1 (vol-V11-V12; minor) — FIX

* claim: The raised-way bump's records name 'the B-DOSSIER-lite towns carrying the water-system record (its factor on the aqueduct's chance, DR-V8.7)', but V11 withdrew the dossier factor (SS-13; V11 §3.24.7 (3) (b): 'the chance takes no factor from the record') and V12's own §1b dossier table says 'never a declaration' / 'V11's round 1 withdrew the chance factor'. The record's effect is the met need, cap step and bound terminal.
* *Where:* V12 §3.7.6 feature switch-on item 1
* **Ruling:** §3.7.6's raised-way bump reads 'carrying the water-system record (its met need, cap step and cistern terminal, V11 §3.24.7 (3))'.
* *Basis:* V11 SS-13. *Units:* V12.

### V12-ICONF-2 (vol-V11-V12; minor) — FIX

* claim: States that V06's design has the dossier's water-system record as 'a factor on the aqueduct's chance' - withdrawn by V11 (SS-13; V11 §3.24.7 (3)(b)), and contradicted by V12's own §1b dossier table and J-V12.55 ('the chance factor withdrawn').
* *Where:* V12 §13 fix list first paragraph
* **Ruling:** The §13 sentence leaves with the narration (the met-need reading governs).
* *Basis:* principle (5). *Units:* V12.

### V11-XCONF-1 (vol-V11-V12; minor) — FIX

* claim: V11 §3.24.1 says stateSnapCm's register entry is 'V12's retaining line until V12 gives it the line X-V11-17 (f) proposes', but V12 §3.11 excludes stateSnapCm from the retaining line ('every other calibratable column but settings.stateSnapCm') and gives it the default line's entry at M3a, restated in place at V6-E2 by V06 §8's line on bar.T-V6-62, due V6-E7 (J-V12.82). V11's statement is stale and conditional ('until').
* *Where:* §3.24.1 retaining.settings paragraph
* **Ruling:** V11 §3.24.1 cites V12 §3.11 for stateSnapCm's register entry (default line at M3a, V06 §8's line from V6-E2); 'until' is dropped.
* *Basis:* V12 §3.11 is the register's home. *Units:* V11.

### V11-XCONF-2 (vol-V11-V12; minor) — FIX

* claim: Row 87 types every messages/<locale>.json as MsgRow, while V09 §2.9 Locales (J-V9.121) types non-English files as {key; text} only (buttons, tone, codes read from en.json); open on the INDEX fix list (V09 XV-V9-31).
* *Where:* §3.1 registry row 87 (INDEX §7 fix list: SR6-08 of seam-surfaces-r6)
* **Ruling:** Registry row 87's row type: MsgRow for en.json; {key; text} for every other locale file; the loader refuses a locale file carrying buttons, tone or codes; T-V11-1 follows. Closes SR6-08 (surfaces) and XV-V9-31.
* *Basis:* V09 §2.9 (J-V9.121). *Units:* V11.

### V12-XCONF-1 (vol-V11-V12; major) — FIX

* claim: J122 (OWNER-DECISIONS-DELEGATED, V12 Q-V12-2) decided the owner's sittings happen 'only at the gating milestones (M1 look check, M2b, M4, M5), batched, about an hour each; a missed sitting leaves the milestone provisional - not rated'. V12 §0 lists sittings at M1, M2b, M4, M5, M6 (buildings), the village milestone, after the historical reconciliation, plus shorter ones for floor plans, underground, islands and town histories, 35-45 minutes each, splittable. Owner delegation outranks the volume (principle (3)).
* *Where:* V12 §0 'How it feels to the owner', §3.9.1 registered panels, §6 sitting rows, §8.3 risk 6, BCR-V12-6 (b), §11 Q-V12-2
* **Ruling:** J122 governs V12's sittings: owner sittings only at M1 (the look check), M2b, M4 and M5, batched, about an hour each; a staged milestone's panel joins the next gating sitting (M4 or M5) when its build has landed by then, else its panel bars stay 'provisional — not rated' (§13.6 (7)); §0, §3.9.1, §6, §8.3 risk 6 and BCR-V12-6 (b) follow; Q-V12-2 marked answered (J122).
* *Basis:* owner delegation J122 > volume. *Units:* V12, scope.

### V12-XCONF-2 (vol-V11-V12; major) — FIX

* claim: V12 §2.10 says 'the table content hash that pins an output version (§6.4) excludes provenance.evidence, so rewording or adding evidence never moves an output version'; V11 §2.2 puts evidence inside every compiled cell's provenance and computes the table's content hash (H128) over the canonical JSON bytes, with the recipe pinning version AND hash (§2.9) - so adding evidence moves the hash. The two volumes define the pinning hash differently (and neither says whether provenance date/note are in it; V11 calls a note change a 'patch = no output change').
* *Where:* V12 §2.10 vs V11 §2.2 (compiled row) and §3.2.1 step 7
* **Ruling:** The pinning hash is defined once at §7.6 (the base home of table versioning): it covers each cell's value, unit, calibratable, extension and presets and excludes the whole provenance block (date, note, evidence); V11 §3.2.1 step 7 computes it so and V12 §2.10 cites it.
* *Basis:* base home (1); V11's 'a note change is a patch, no output change' kept. *Units:* determinism, V11, V12.

### V12-XCONF-3 (vol-V11-V12; minor) — FIX

* claim: V12's default metric `stages` name 'S5' and ranges 'S3 - S5', 'S12 - S12a' where base §4.1 registers the growth stage as four StageIds S5a-S5d (V11 expands a registry 'S5' as a group) and has no 'S12' (only S12a, S12b, S12c); V12 §3.7.2 (4)'s run scope compares a metric's stages with the tables' stageReaders (StageIds only), so an unexpanded 'S5' or a non-existent 'S12' would match nothing (PLAUSIBLE: depends on V12 expanding groups the same way).
* *Where:* §3.4.2 default rule 'stages' vs V11 §2.1/§3.1 (StageId registration) and base §4.1
* **Ruling:** V12 §3.4.2's metric stages are registered StageIds (S5a–S5d, S12a–S12c), or 'S5' by V11's group-expansion rule cited; 'S12' is dropped.
* *Basis:* §4.1 registration. *Units:* V12.

### V12-XCONF-4 (vol-V11-V12; minor) — FIX

* claim: V12 says it takes each unit 'as V11 §2.3 defines it at a plot' but defines district as 'the town's districts of >= 30 households (a smaller district is no unit)'; V11 §2.3's district unit is 'the plot's district' with no household threshold (the >= 30 threshold is only T-V11-18's 105 (k) dispersal reading). The bar and the mechanism count different units for a class whose coverage unit is district (watch, healing, infrastructure, sanitation, bathhouse, apothecary...).
* *Where:* V12 §3.6 servedShare 'district' unit vs V11 §2.3 CoverageSpec unit district
* **Ruling:** V12 §3.6 measures servedShare over every district as V11 §2.3 defines the unit (the plot's district, no threshold); the ≥ 30-households filter applies only to T-V11-18's 105 (k) dispersal reading.
* *Basis:* the mechanism's unit governs its bar. *Units:* V12.

### V12-XCONF-5 (vol-V11-V12; minor) — FIX

* claim: BCR-V12-4's base text reads 'whose decision rule is the owner's (volume 12 Q-V12-3)', still framing Q-V12-3 as open, while J122 decided it ('only where the owner's sitting passes them - as recommended'). The base text would carry a pointer to an answered question.
* *Where:* §10 BCR-V12-4 (c) item 10, §3.10.6, §4.3
* **Ruling:** BCR-V12-4's base text cites J122's decision (V12 §3.10.6's per-frame sitting rule) instead of 'Q-V12-3'.
* *Basis:* J122. *Units:* V12.

### V11-XCONF-3 (vol-V11-V12; minor) — FIX

* claim: V11 dates the three bend cells' calibration 'at M3a' while V12's register line (the single home of calibration method and due) calibrates retainingReachM, flatDepthM, coverShare by the M4-110 panel at M4; read literally the two volumes name different milestones.
* *Where:* V11 §3.24.1 last paragraph ('own, calibrate-later at M3a') vs V12 §3.11 register line 21 (panel M4-110 at M4, then corpus E1 at M-CAL)
* **Ruling:** V11 §3.24.1 reads 'written at M3a; calibrated by V12 §3.11's terrace line'.
* *Basis:* V12 §3.11 home of dues. *Units:* V11.

### V11-XCONF-4 (vol-V11-V12; minor) — FIX

* claim: V11 has the register lint in CI from C0 (M0), before V12's W2 builds the command and before V12's tier starts.
* *Where:* V11 §8 C0 row exit cell ('plat calibrate register --check runs in CI from here', C0 lands at M0 (b)) vs V12 T-V12-20 ('tier PR from M1') and V12 §3.11 ('T-V12-20 runs at PR tier from M1'); V12 §8 W2 builds the command at M1
* **Ruling:** V11 §8's C0 exit cites V12: 'register --check joins CI at M1 (T-V12-20)'.
* *Basis:* V12 owns the command and tier. *Units:* V11.

### CANON-C01 (canon; major) — FIX

* INDEX §3/§4 and V07 §8: the village V-M0–V-M1 start after M2b and M3a's tools.
* J122 (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md): the village right after M4, parallel with M5; the tracker spike V-M0 right after M0.
* **Ruling:** J122 governs: V-M0 right after M0 (on M0's kernel, tables and its own fixtures); V-M1…V-M4 after M4, parallel with M5; INDEX §3/§4, §16 and V07 §8 carry it (V07-XCONF-1).
* *Basis:* owner delegation J122 > INDEX and volume. *Units:* scope, V07.

### CANON-C02 (canon; major) — FIX

* V06 §13: epochs on a lone neighbourhood document 'deliberately deferred … the gate lifting when a later amendment gives a hood document an S4–S5 route'.
* Principle (6) and the owner's no-defer rule.
* **Ruling:** Stated as a decided rule: a standalone neighbourhood document has no clock; advancing time on it bends to 'a neighbourhood alone has no history yet — open it in its town to advance time' (V09 message row and V10 bend row, V06-WGAP-1a/1b); T-V6-23 tests the bend. No deferral wording.
* *Basis:* principle (6); item 101 R2. *Units:* V06, V09, V10.

### CANON-C03 (canon; major) — FIX

* INDEX §6: 'Until the owner answers, each volume runs on its recommendation' and twenty-five open questions.
* J121/J122 answered every one.
* **Ruling:** INDEX §6 becomes the table of decisions (OWNER_Q); every volume's §11 likewise.
* *Basis:* J121, J122. *Units:* scope, V01, V02, V03, V04, V05, V06, V07, V08, V09, V10, V11, V12.

### CANON-C04 (canon; major) — FIX

* INDEX §7: 'The fix list — deliberately left for the next amendment'.
* The owner's no-defer rule; THE BAR IS ZERO.
* **Ruling:** Every INDEX §7 item is routed to its unit (SEAM_OPEN) and fixed in this pass; INDEX §7 keeps the reconciliation history as a pointer to the validation records and holds no open item.
* *Basis:* owner no-defer rule. *Units:* scope, V01, V04, V07, V08, V09, V10, V11, V12.

## File f — every item routed to the base part that applies it

Every f item was read whole (docs/AMENDMENTS-2026-09-28f.md, items 200–585 with the notes of reconciliation rounds 1–6 and the finalization). None contradicts an owner rule: rule R-a (item 101 R2 over every 'refused', J-VI.4) and J-VI.30 are already applied inside the items; the conflicts between f items and volume text are ruled above; J122's order changes no item's content and places the staged rows (item 568).

**f items ruled against a volume's text or another item:**

* items 413: J-VI.19 (applied in the item): showUnexcavated is a view key; V04 BCR-10's LayerSpec field dropped. (*J-VI.19*)
* items 425: J-VI.20 (applied): no fallbackClass. (*J-VI.20*)
* items 447, 448: V01-XCONF-2: applied together — BCR-V9-31 (c)'s retaining clause takes V01 BCR-40's threshold (150 cm, broken over stairs and ramps); supports join as cliffs. (*the specific rule qualifies the general*)
* items 452: V04-ICONF-3: applied with BCR-16's text corrected to V04 §5.5 (portals only in wall lines). (*the export home*)
* items 277: V09-XCONF-1: applied with BCR-V9-3's text corrected (the underground's band is the view key depthBand). (*V09 §2.4's type; J-VI.19*)
* items 343: V06-ICONF-3: BCR-V6-9's advance field gains stoppedAt?. (*V06 §2.3, §2.12*)
* items 244: V07-XCONF-2 / J-C4: the span rule's step (2) gains the hinterland-face condition (reason `country`); SCC-114: the support step's cell names are V11's (raisedWays.structure.slideMaxFactor; retaining.settings.stateSnapCm in item 245). (*realism tiebreaker; V11 owns values (R-c)*)
* items 202, 317, 322: SCOPE-C01: item 202 governs the small-dossier refusal (only while no village product is registered), consistent with the owner's J80; items 322 and 317 apply in the order the notes give. (*f item > base restatement; J80 intact*)
* items 474, 524, 532, 568: No request's total is applied; §16's two totals are computed once by item 568 (J-RF1.6), placing the staged rows in J122's order (SCOPE-C04). (*J122; item 568*)
* items 582: Owner item 101 R2 (via J-VI.30): the three base refusals become bends; F-EDIT keeps only a dossier fact's conflict. Consistent with the owner rule. (*owner item 101 R2*)

**The request census:** every request heading in the twelve ## 10 sections (407) is carried by an f item (400) or is one of the seven not-items below (script: work/canon/assemble.py census). The not-items: BCR-V9-4 (V09) — withdrawn by V09 (J-V9.36): the block is removed from V09 §10; BCR-V9-6 (V09) — withdrawn by V09 (J-V9.33): the block is removed from V09 §10; BCR-V5-23 (V05) — a request to V06 (EpochOps.demandTaken), carried by V06 (X10): V05 cites V06 §2.1 and drops the block; BCR-V5-28 (V05) — a request to V06 (the participant table), carried by V06's participants table: V05 cites it and drops the block; BCR-V11-9 (V11) — a request to V08 (kinds pseudo-classes, goodWords), carried by V08 (X-V11-1): V11 cites V08 §2.6 and drops the block; V04 BCR-34 (V04) — carried in BCR-V4-14's DR17 cell: the block becomes a pointer to file f item 386; V04 BCR-44 (V04) — carried in BCR-V4-3's Tunnel line: the block becomes a pointer to file f item 247.

Application order: file g first, then file f in its own order (base-section order; the notes' "applied before/after" orders govern). Each base editor applies the items of its sections as written; a part in another part's section ("also touches") is applied by that part's editor. A volume cites each applied item as base text; its `## 10` request becomes a one-line pointer "BCR-V… → file f item N, applied at §x.y".

| item | base section | applies | also applies a part | scope | requests | needed by |
|---|---|---|---|---|---|---|
| 200 | 1.1 What is built, in what order; the two size ladders | scope |  | STAGED (M5, stage 2). | V01 BCR-27 | V01 |
| 201 | 1.1 What is built, in what order; the two size ladders | scope |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-1 | V07 |
| 202 | 1.1 What is built, in what order; the two size ladders | scope | pipeline, model, determinism, kernel, rendering | STAGED (the village product, V-M0 to V-M4; the port's consultation with the Set… | BCR-V7-11, BCR-V7-17, BCR-V7-18, BCR-V8-9 | V06, V07, V08 |
| 203 | 2.2 The plat — one arena per layer, five refinement levels … | model | determinism | STAGED (M6-sky). | BCR-V5-2 | V05 |
| 204 | 2.2 The plat — one arena per layer, five refinement levels … | model |  | STAGED (M6-sky). | BCR-V5-24 | V05 |
| 205 | 2.3 Terrain and water | model | pipeline | STAGED (M6-U, the underground layer). | V04 BCR-1 | V04 |
| 206 | 2.3 Terrain and water | model |  | STAGED (M6-E, the evolution engine). | BCR-V6-6 | V06 |
| 207 | 2.4 Ways (the skeleton) and typed edges | model |  | BASE (M1) for (b), `HoodPlace` declared with its registry row; BASE (M2b) for (… | V01 BCR-6 | V01, V04 |
| 208 | 2.4 Ways (the skeleton) and typed edges | model |  | STAGED (M6-U, the underground layer). | V04 BCR-2 | V04 |
| 209 | 2.4 Ways (the skeleton) and typed edges | model |  | STAGED (M6-E, the evolution engine; the land retype also with the village produ… | BCR-V6-5, BCR-V7-22 | V06, V07 |
| 210 | 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, re… | model |  | BASE (M1) for (a)'s `content` and `overrides?`, (b) and (d)'s first row; STAGED… | V01 BCR-5 | V01 |
| 211 | 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, re… | model |  | BASE (M3a, item 110 (V01 §8.1)). | V01 BCR-41 | V01 |
| 212 | 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, re… | model |  | STAGED (M6-U, the underground layer). | V04 BCR-4 | V04 |
| 213 | 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, re… | model | pipeline | STAGED (M6-sky). | BCR-V5-6 | V01, V05, V11 |
| 214 | 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, re… | model |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-4 | V07 |
| 215 | 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, re… | model |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-5 | V07 |
| 216 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M1, fields carried so stage 3 needs no migration). | BCR-V2-01 | V01 |
| 217 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M1, fields carried so stage 3 needs no migration). | BCR-V2-02 | V02 |
| 218 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6, stage 3). | BCR-V2-03 | V02, V03 |
| 219 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6, stage 3). | BCR-V2-04 | V02, V03 |
| 220 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6, stage 3). | BCR-V2-05 | V02 |
| 221 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6, stage 3). | BCR-V2-06 | V02 |
| 222 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6, stage 3). | BCR-V2-07 | V02 |
| 223 | 2.6 Buildings, heights and ground datum, wings, materials, … | model | rendering | STAGED (M6, stage 3). | BCR-V2-22 | V02 |
| 224 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, with items 228 and 230: the hint clause applies wherever `Building.m… | BCR-V2-23 | V02 |
| 225 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6, stage 3). | BCR-V2-27 | V02, V03 |
| 226 | 2.6 Buildings, heights and ground datum, wings, materials, … | model | determinism | BASE (M2b, with §2.6's basement gate) for the half cellar's raise — its round-1… | BCR-V2-28 | V02, V03, V06, V11 |
| 227 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-31 | V01 |
| 228 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-38 | V02, V03 |
| 229 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-39 | V02, V03, V04, V11, V12 |
| 230 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-41 | V02, V03 |
| 231 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-42 | V02, V03 |
| 232 | 2.6 Buildings, heights and ground datum, wings, materials, … | model | rendering | STAGED (M6-P, the plan rung). | BCR-V3-2 | V03 |
| 233 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  |  | BCR-V3-12 | V03 |
| 234 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, the base outline builder's templates carry their part names; S23-20). | BCR-V3-13 | V02, V03 |
| 235 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6-P, the plan rung). | BCR-V3-15 | V03 |
| 236 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6-P, the plan rung). | BCR-V3-17 | V03 |
| 237 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6-P, the plan rung). | BCR-V3-19 | V03 |
| 238 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE design, built at M6-U (item 109 (k)'s crypt rule, with the underground lay… | BCR-V3-20 | V01, V02, V03, V04, V10, V11 |
| 239 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6-P, the plan rung). | BCR-V3-21 | V03, V04 |
| 240 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6-P, the plan rung). | BCR-V3-25 | V03 |
| 241 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, with item 110 (a), (c) and item 230 (BCR-V2-41) — S11's entrance der… | BCR-V3-26 | V01 |
| 242 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, with item 110 (a)'s retaining walls — S11's basement decision; S23R3… | BCR-V3-27 | V01, V02, V03 |
| 243 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6-U, the underground layer). | V04 BCR-43 | V04 |
| 244 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | BASE (M3a (the record, the support step and the span rule); the arch-vault cham… | BCR-V8-28, BCR-V9-33, V04 BCR-45 | V01, V04, V05, V06, V07, V08, V09, V11 |
| 245 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model | kernel, determinism, rendering | BASE (M3a; the island form M6-sky; the state profile's writers with their ops —… | BCR-V5-27, V01 BCR-43 | V01, V04, V05, V06, V07, V09 |
| 246 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | BASE (M3a). | BCR-V9-30 | V01, V02, V05, V06, V09, V10, V11 |
| 247 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-U, the underground layer). | V04 BCR-3 | V04 |
| 248 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-U, the underground layer). | V04 BCR-32 | V04 |
| 249 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-U, the underground layer). | V04 BCR-33 | V04 |
| 250 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-U, the underground layer). | V04 BCR-46 | V04 |
| 251 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-sky). | BCR-V5-1 | V01, V05 |
| 252 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-sky). | BCR-V5-9 | V04, V05, V06 |
| 253 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-sky). | BCR-V5-26 | V05 |
| 254 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-E, the evolution engine). | BCR-V6-3 | V06 |
| 255 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-6 | V07 |
| 256 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model | determinism | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-14 | V08 |
| 257 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-26 | V08 |
| 258 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | BASE (M2b, V11 C4's wall rows with item 106's base). | BCR-V11-5 | V11 |
| 259 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model | pipeline | BASE (M3a, V11 C3b). | BCR-V11-27 | V11 |
| 260 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | BASE (M3a (raised way, harbour chain, quay wall, retaining wall, deck plot); is… | BCR-V6-24, BCR-V8-31 | V01, V02, V05, V06, V08, V09, V10 |
| 261 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | STAGED (M6, stage 3). | BCR-V2-13 | V02 |
| 262 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | STAGED (M6-P, the plan rung). | BCR-V3-22 | V03 |
| 263 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | STAGED (M6-P, the plan rung). | BCR-V3-28 | V03, V06 |
| 264 | 2.8 Identity, lifecycle, provenance, the entity registry | model | determinism | STAGED (M6-E, the evolution engine). | BCR-V6-7 | V06 |
| 265 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | BASE (M3a, item 110 (b)'s generation and removal holds). | BCR-V6-20 | V06 |
| 266 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | STAGED (M6-E, the evolution engine). | BCR-V6-21 | V06 |
| 267 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-3 | V07 |
| 268 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-32 | V06, V07 |
| 269 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-19 | V09 |
| 270 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-3 | V01, V02, V03, V06, V09, V10 |
| 271 | 2.8 Identity, lifecycle, provenance, the entity registry | model | pipeline | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-15 | V10 |
| 272 | 2.9 The document and serialisation | model | determinism | BASE (M1) for (a)'s `Recipe.product`; STAGED (M5, stage 2) for the rest. | V01 BCR-12 | V01 |
| 273 | 2.9 The document and serialisation | model |  | STAGED (M6-P, the plan rung). | BCR-V3-8 | V03 |
| 274 | 2.9 The document and serialisation | model |  | STAGED (M6-sky). | BCR-V5-21 | V05, V06 |
| 275 | 2.9 The document and serialisation | model |  | STAGED (M6-E, the evolution engine). | BCR-V6-13 | V06 |
| 276 | 2.9 The document and serialisation | model |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-12 | V07 |
| 277 | 2.9 The document and serialisation | model |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-3 | V09 |
| 278 | 2.9 The document and serialisation | model | rendering | STAGED (M6-U, with the underground layer (AP6)). | BCR-V9-20 | V04, V09 |
| 279 | 3.2 Numeric policy | kernel |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-30 | V07 |
| 280 | 4.1 Stage graph, evaluation model, laziness contract, trans… | pipeline |  | BASE (M2b) for (a)'s way-surface clause; STAGED (M5, stage 2) for the rest. | V01 BCR-3 | V01 |
| 281 | 4.1 Stage graph, evaluation model, laziness contract, trans… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-25 | V04 |
| 282 | 4.1 Stage graph, evaluation model, laziness contract, trans… | pipeline |  | STAGED (M6-sky). | BCR-V5-3 | V01, V05 |
| 283 | 4.1 Stage graph, evaluation model, laziness contract, trans… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-29 | V07 |
| 284 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, rese… | pipeline |  | STAGED (M5, stage 2). | V01 BCR-8 | V01 |
| 285 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, rese… | pipeline |  | STAGED (M5, stage 2). | V01 BCR-13 | V01 |
| 286 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, rese… | pipeline | model | STAGED (M6-sky). | BCR-V5-19 | V05 |
| 287 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, rese… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-2 | V07 |
| 288 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, rese… | pipeline |  | BASE (M2b, V11 C2). | BCR-V11-18 | V11 |
| 289 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, rese… | pipeline |  | BASE (M3a, V11 C3b). | BCR-V11-28 | V11 |
| 290 | 4.3 S4 Backbone — arterials routed between named destinatio… | pipeline |  | BASE (M3a; (5)'s sky clauses with M6-sky). | BCR-V10-21, BCR-V5-29, BCR-V6-25, BCR-V7-33, BCR-V7-35, V01 BCR-39 | V01, V05, V06, V07, V10 |
| 291 | 4.3 S4 Backbone — arterials routed between named destinatio… | pipeline |  | STAGED (M6-E, the evolution engine). | BCR-V6-26 | V04, V06, V11, V12, V11 |
| 292 | 4.3 S4 Backbone — arterials routed between named destinatio… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-25 | V07 |
| 293 | 4.4 S5 Growth stages — boundary and wall first, main roads,… | pipeline |  | STAGED (M6-E, the evolution engine). | BCR-V6-19 | V06 |
| 294 | 4.5 S6 Districts, quarters and fields · S7b Allocation and … | pipeline |  | STAGED (M5, stage 2). | V01 BCR-4 | V01 |
| 295 | 4.5 S6 Districts, quarters and fields · S7b Allocation and … | pipeline |  | STAGED (M6-sky). | BCR-V5-5 | V05 |
| 296 | 4.5 S6 Districts, quarters and fields · S7b Allocation and … | pipeline | rendering | STAGED (M6-sky). | BCR-V5-15 | V05 |
| 297 | 4.5 S6 Districts, quarters and fields · S7b Allocation and … | pipeline |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-4 | V10, V11 |
| 298 | 4.6 S8 Infill — the measured bent cut as a kernel transacti… | pipeline |  | STAGED (M5, stage 2). | V01 BCR-7 | V01 |
| 299 | 4.6 S8 Infill — the measured bent cut as a kernel transacti… | pipeline |  | STAGED (M6-sky). | BCR-V5-20 | V05 |
| 300 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | BASE (M2b) for the way-surface clause; STAGED (M5, stage 2) for the rest. | V01 BCR-9 | V01 |
| 301 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | BASE (M2b) for (a)'s S7b half, (b) and (d) — `squares.quota` and S7b (3)'s clai… | V01 BCR-32 | V01, V11 |
| 302 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | BASE (M3a, item 110 (V01 §8.1)). | V01 BCR-42 | V01 |
| 303 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline | model | BASE (M3a, with item 229's base outline builder) for its hole sentence — S11's … | BCR-V2-24 | V01 |
| 304 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | STAGED (M6, stage 3). | BCR-V2-29 | V02 |
| 305 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-34 | V01 |
| 306 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-39 | V04 |
| 307 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | STAGED (M6-sky). | BCR-V5-8 | V05 |
| 308 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | STAGED (M6-sky). | BCR-V5-16 | V01, V05 |
| 309 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | BASE (M3a, with item 110 (a)'s levelling) for the platform-datum rule and `leve… | BCR-V5-30 | V01, V02, V03, V04, V05 |
| 310 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-24 | V07 |
| 311 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-2 | V10, V11 |
| 312 | 4.8 S7 Fortification furniture (per enceinte) · the castle … | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-20 | V07 |
| 313 | 4.9 S12a Hinterland siting and the hinterland unit · S12b G… | pipeline | model | STAGED (M5, stage 2; the rim-walk row and the optional `way` built by volume 1'… | V01 BCR-10 | V01, V05 |
| 314 | 4.9 S12a Hinterland siting and the hinterland unit · S12b G… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-7 | V07 |
| 315 | 4.9 S12a Hinterland siting and the hinterland unit · S12b G… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-8 | V07 |
| 316 | 4.9 S12a Hinterland siting and the hinterland unit · S12b G… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-28 | V07 |
| 317 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (M6-E). | BCR-V6-1, BCR-V7-18 | V06, V07 |
| 318 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (M6, stage 3). | BCR-V2-40 | V02, V06 |
| 319 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-6 | V04, V06 |
| 320 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (M6-sky). | BCR-V5-7 | V05 |
| 321 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (M6-E, the evolution engine). | BCR-V6-2 | V06 |
| 322 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-26 | V06, V07, V08 |
| 323 | 4.12 The strategy interface, stage registration by declared… | pipeline |  | BASE (M2b) — the hook points declared, empty until M5 (volume 1 §8.1). | V01 BCR-26 | V01 |
| 324 | 4.12 The strategy interface, stage registration by declared… | pipeline |  | STAGED (M6-P, the plan rung). | BCR-V3-23 | V03 |
| 325 | 4.12 The strategy interface, stage registration by declared… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-5 | V04 |
| 326 | 4.12 The strategy interface, stage registration by declared… | pipeline |  | STAGED (with item 202). | BCR-V7-11 | V07 |
| 327 | 5.2 Failure classes: detection, ladder, test | determinism |  | STAGED (M5, stage 2). | V01 BCR-18 | V01 |
| 328 | 5.2 Failure classes: detection, ladder, test | determinism |  | STAGED (M6, stage 3). | BCR-V2-16 | V02 |
| 329 | 5.2 Failure classes: detection, ladder, test | determinism |  | STAGED (M6-P, the plan rung). | BCR-V3-10 | V03 |
| 330 | 5.2 Failure classes: detection, ladder, test | determinism |  | STAGED (M6-U, the underground layer). | V04 BCR-7 | V04 |
| 331 | 5.2 Failure classes: detection, ladder, test | determinism |  | STAGED (M6-sky). | BCR-V5-11 | V05 |
| 332 | 5.3 The invariant suite, by scope (SCL-1) | determinism |  | STAGED (M6, stage 3). | BCR-V2-17 | V02 |
| 333 | 5.3 The invariant suite, by scope (SCL-1) | determinism | model | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-35 | V02 |
| 334 | 5.3 The invariant suite, by scope (SCL-1) | determinism |  | STAGED (M6-P, the plan rung). | BCR-V3-11 | V03 |
| 335 | 5.3 The invariant suite, by scope (SCL-1) | determinism |  | STAGED (M6-E, the evolution engine). | BCR-V6-17 | V06 |
| 336 | 5.3 The invariant suite, by scope (SCL-1) | determinism |  | STAGED (M6-E, the evolution engine). | BCR-V6-18 | V06 |
| 337 | 5.4 The generation report | determinism |  | STAGED (SettlementForge stage). |  |  |
| 338 | 5.4 The generation report | determinism |  | STAGED (M6-U, the underground layer). | V04 BCR-41 | V04 |
| 339 | 5.4 The generation report | determinism |  | STAGED (M6-E, the evolution engine). | BCR-V6-14 | V06, V10 |
| 340 | 6.1 RNG and stream design | determinism |  | BASE (M1) for (a), the three ids reserved; STAGED (M5, stage 2) for (b) and (c). | V01 BCR-11 | V01 |
| 341 | 6.1 RNG and stream design | determinism |  | STAGED (M6, stage 3). | BCR-V2-10 | V02 |
| 342 | 6.1 RNG and stream design | determinism |  | STAGED (M6-E, the evolution engine). | BCR-V6-8 | V06 |
| 343 | 6.1 RNG and stream design | determinism |  | STAGED (M6-E, the evolution engine). | BCR-V6-9 | V06 |
| 344 | 6.1 RNG and stream design | determinism |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-15 | V07 |
| 345 | 6.3 Identity: address ids, lineage keys, carry-over (and th… | determinism |  | BASE (M1) — the `S8.seed` id reserved, with the lineage-key sentence (no user b… | V01 BCR-31 | V01 |
| 346 | 6.3 Identity: address ids, lineage keys, carry-over (and th… | determinism |  | STAGED (M6, stage 3). | BCR-V2-11, BCR-V3-29 | V02 |
| 347 | 6.3 Identity: address ids, lineage keys, carry-over (and th… | determinism |  | STAGED (M6-P, the plan rung). | BCR-V3-29 | V03, V06 |
| 348 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M3a). | BCR-V10-12, BCR-V9-16 | V09, V10 |
| 349 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (M5, stage 2). | V01 BCR-35 | V01 |
| 350 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M3a, item 110 (V01 §8.1)). | V01 BCR-44 | V01 |
| 351 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (M6, stage 3). | BCR-V2-12 | V02, V03 |
| 352 | 7.1 Edits are ordered events on addresses; the named action… | determinism | scope | STAGED (M6-P, the plan rung). | BCR-V3-3 | V03 |
| 353 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (M6-P, the plan rung). | BCR-V3-16 | V03 |
| 354 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (M6-P, the plan rung). | BCR-V3-24 | V03 |
| 355 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (M6-U, the underground layer). | V04 BCR-8 | V04 |
| 356 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (M6-sky). | BCR-V5-10 | V05 |
| 357 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-19 | V07 |
| 358 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-6 | V08 |
| 359 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-19 | V08 |
| 360 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-13 | V09 |
| 361 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (M6-U, with the underground layer (AP6)). | BCR-V9-21 | V09 |
| 362 | 7.1 Edits are ordered events on addresses; the named action… | determinism | model | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-26 | V09, V10 |
| 363 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-29 | V09 |
| 364 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-33 | V09 |
| 365 | 7.1 Edits are ordered events on addresses; the named action… | determinism | rendering | STAGED (M3c, the built-in clerk). | BCR-V10-16 | V10 |
| 366 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-17 | V09, V10 |
| 367 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-18 | V10 |
| 368 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-20 | V09, V10 |
| 369 | 7.3 Locality — effective scope, local operators, edit fates… | determinism | pipeline | BASE (M2a for the naming record; M2b for the `surface` attribute); STAGED (M5, … | V01 BCR-33 | V01 |
| 370 | 7.3 Locality — effective scope, local operators, edit fates… | determinism |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-32 | V02, V03, V06 |
| 371 | 7.3 Locality — effective scope, local operators, edit fates… | determinism | model | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-33 | V01 |
| 372 | 7.3 Locality — effective scope, local operators, edit fates… | determinism | rendering | STAGED (M6-U, with the underground layer (AP6)). | BCR-V9-22 | V04 |
| 373 | 7.4 Lifecycle of every edit kind (create · read · persist ·… | determinism |  | STAGED (M5, stage 2). | V01 BCR-25 | V01 |
| 374 | 7.4 Lifecycle of every edit kind (create · read · persist ·… | determinism |  | STAGED (M6-P, the plan rung). | BCR-V3-4 | V03 |
| 375 | 7.4 Lifecycle of every edit kind (create · read · persist ·… | determinism |  | STAGED (M6-sky). | BCR-V5-25 | V05 |
| 376 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | STAGED (M6, stage 3). | BCR-V2-14 | V02, V11, V12 |
| 377 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | STAGED (the village product, V-M0 to V-M4). | BCR-V2-14, BCR-V7-13 | V07, V11, V12, V11 |
| 378 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-14 | V07 |
| 379 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | BASE (M0 (b), V11 C0). | BCR-V11-6 | V11 |
| 380 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | BASE (M3a, V11 C3). | BCR-V11-10 | V09, V11 |
| 381 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | BASE (M-1–M4, the calibration rig). | BCR-V12-5 | V11, V12 |
| 382 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | STAGED (M-CAL, the corpus reconciliation). | BCR-V12-22 | V12 |
| 383 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | BASE (numbers). |  |  |
| 384 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (M5, stage 2). | V01 BCR-29 | V01 |
| 385 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (M6, stage 3). | BCR-V2-08 | V02 |
| 386 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (M6-U, the underground layer). | V04 BCR-14 | V04 |
| 387 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (M6-sky). | BCR-V5-12 | V05 |
| 388 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (M6-E, the evolution engine). | BCR-V6-12 | V06, V08 |
| 389 | 7.7 Intent, character, constraints, assignments, the forms … | determinism | pipeline | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-7 | V08 |
| 390 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-8 | V08, V09 |
| 391 | 7.7 Intent, character, constraints, assignments, the forms … | determinism | scope, rendering | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-11 | V08 |
| 392 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-12 | V08 |
| 393 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-20 | V08 |
| 394 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-21 | V08 |
| 395 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-22 | V08 |
| 396 | 7.7 Intent, character, constraints, assignments, the forms … | determinism | scope | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-24 | V08 |
| 397 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-25 | V08 |
| 398 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-30 | V08 |
| 399 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-32 | V08, V09 |
| 400 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | BASE (M1, V11 C1). | BCR-V11-7 | V11 |
| 401 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | BASE (M3a, V11 C3b). | BCR-V11-29 | V11 |
| 402 | 7.8 Controls: monotone, continuous, documented; the control… | determinism |  | STAGED (M6, stage 3). | BCR-V2-30 | V02, V09 |
| 403 | 7.8 Controls: monotone, continuous, documented; the control… | determinism |  | STAGED (M6-U, the underground layer). | V04 BCR-9 | V04 |
| 404 | 7.8 Controls: monotone, continuous, documented; the control… | determinism |  | STAGED (M6-U, the underground layer). | V04 BCR-35 | V04 |
| 405 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | STAGED (M5, stage 2). | V01 BCR-14 | V01 |
| 406 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | STAGED (M6, stage 3). | BCR-V2-15 | V01 |
| 407 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | STAGED (M6-U, the underground layer). | V04 BCR-40 | V04 |
| 408 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | STAGED (M6-sky). | BCR-V5-18 | V05 |
| 409 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | STAGED (M6-E, the evolution engine). | BCR-V6-15 | V06 |
| 410 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-15 | V08, V09 |
| 411 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-7 | V09 |
| 412 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | BASE (M3a, V11 C3b). | BCR-V11-30 | V11 |
| 413 | 8.4 Layers, shadows, heights | rendering |  | BASE (showCircuit, M3a) / STAGED (underView, M6-U). | BCR-V9-25, V04 BCR-10 | V04, V07, V09 |
| 414 | 8.4 Layers, shadows, heights | rendering |  | STAGED (M6-U, the underground layer). | V04 BCR-38 | V04 |
| 415 | 8.4 Layers, shadows, heights | rendering |  | STAGED (M6-sky). | BCR-V5-13 | V05 |
| 416 | 8.4 Layers, shadows, heights | rendering |  | STAGED (M6-sky). | BCR-V5-22 | V05 |
| 417 | 8.5 Level of detail, the city-band figure-ground contract, … | rendering |  | STAGED (M5, stage 2). | V01 BCR-15 | V01 |
| 418 | 8.5 Level of detail, the city-band figure-ground contract, … | rendering |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-9 | V07 |
| 419 | 8.6 Stage-2 render tier and stage-3 LOD | rendering |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-36 | V01, V02 |
| 420 | 8.8 Tiles, zoom stops, print and the canvas budget | rendering |  | STAGED (M6-P, the plan rung). | BCR-V3-6 | V03 |
| 421 | 8.10 Decoration instances (trees, scatter, crowns, roof det… | rendering |  | STAGED (M5, stage 2). | V01 BCR-34 | V01 |
| 422 | 9.1 What is model and what is view | rendering |  | STAGED (M5, stage 2). | V01 BCR-17 | V01 |
| 423 | 9.1 What is model and what is view | rendering |  | STAGED (M6-U, the underground layer). | V04 BCR-17 | V04 |
| 424 | 9.5 Furniture, framing and tools | rendering |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-31 | V07 |
| 425 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M1, the row type without the cell, with the dossier port's creation half;… | BCR-V11-26, BCR-V8-29 | V08, V11 |
| 426 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M3a, with items 229 and 259 — V11 C3b writes the template's `composition`… | BCR-V2-09 | V02, V11 |
| 427 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (with item 435: M0 (b), V11 C0). | BCR-V2-26 | V02, V11 |
| 428 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline | scope | STAGED (M6-P, the plan rung). | BCR-V3-1 | V03 |
| 429 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | STAGED (M6-E, the evolution engine). | BCR-V6-4 | V06 |
| 430 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-21 | V07, V11 |
| 431 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | STAGED (with item 209). | BCR-V7-22 | V07 |
| 432 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M0 (b)–M1 for the row's shape, V11 C0–C1; the profile columns M2b, C2; `d… | BCR-V11-1 | V02, V03, V11 |
| 433 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M2b, V11 C2). | BCR-V11-2 | V11 |
| 434 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M2b, V11 C2). | BCR-V11-3 | V11 |
| 435 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M0 (b), V11 C0; item 110's row types M3a, C3b). | BCR-V11-8 | V02, V11 |
| 436 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE design, built at M6-U (item 109 (k)'s crypt rule, with the underground lay… | BCR-V11-13 | V02, V03, V07, V11 |
| 437 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M2b, V11 C2). | BCR-V11-16 | V11 |
| 438 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M2b, V11 C2). | BCR-V11-17 | V11 |
| 439 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M2b, V11 C2's identities; the ladder's identity with C4, STAGED at the Se… | BCR-V11-19 | V11 |
| 440 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M2b, V11 C2). | BCR-V11-20 | V11 |
| 441 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M1, V11 C1; the QUARTER clause with C4, STAGED at the SettlementForge sta… | BCR-V11-24 | V11 |
| 442 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M2b, V11 C2). | BCR-V11-25 | V11 |
| 443 | 10.3 People, households, relations, sub-locations, schedules | pipeline |  | STAGED (M6-E, the evolution engine). | BCR-V6-10 | V06 |
| 444 | 10.4 Names, descriptions and setting packs | pipeline |  | BASE (M1) for the way-naming context; STAGED (M5, stage 2) for the names of loc… | V01 BCR-16 | V01 |
| 445 | 10.4 Names, descriptions and setting packs | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-18 | V04 |
| 446 | 10.4 Names, descriptions and setting packs | pipeline |  | BASE (M2b–M3b, V11 C5). | BCR-V11-12 | V11 |
| 447 | 11.1 Formats | rendering |  | BASE (M3a (item 110) and M2b (item 106)). | BCR-V12-15, BCR-V12-17, BCR-V9-31 | V09, V12 |
| 448 | 11.1 Formats | rendering |  | BASE (M3a, item 110 (V01 §8.1)). | V01 BCR-40 | V01 |
| 449 | 11.1 Formats | rendering |  | STAGED (M6, stage 3). | BCR-V2-21 | V02 |
| 450 | 11.1 Formats | rendering |  | STAGED (M6-P, the plan rung). | BCR-V3-7 | V03 |
| 451 | 11.1 Formats | rendering |  | STAGED (M6-P, the plan rung). | BCR-V3-18 | V03 |
| 452 | 11.1 Formats | rendering |  | STAGED (M6-U, the underground layer). | V04 BCR-16 | V04 |
| 453 | 11.1 Formats | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-14 | V08, V09, V08 |
| 454 | 11.1 Formats | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-15 | V09 |
| 455 | 11.1 Formats | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-32 | V09 |
| 456 | 11.1 Formats | rendering |  | BASE (M3a, V11 C3). | BCR-V11-23 | V11, V12 |
| 457 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | STAGED (M6-P, the plan rung). | BCR-V3-5 | V03 |
| 458 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | STAGED (M6-E, the evolution engine). | BCR-V6-11, BCR-V9-2 | V06, V09 |
| 459 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering | model | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-2 | V08 |
| 460 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-5 | V09, V10 |
| 461 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-10 | V09, V10 |
| 462 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-11 | V09 |
| 463 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-12 | V09, V10 |
| 464 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-23 | V08, V09, V10, V08 |
| 465 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-27 | V09, V10 |
| 466 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-28 | V09, V10 |
| 467 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-34 | V09 |
| 468 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-1 | V09, V10 |
| 469 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | STAGED (M3c, the built-in clerk). | BCR-V10-5 | V09, V10 |
| 470 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering | determinism | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-6 | V09, V10 |
| 471 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-13 | V10 |
| 472 | 11.3 The host bridge — the host is the store (FTG-12) | rendering |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-1 | V08, V09 |
| 473 | 11.3 The host bridge — the host is the store (FTG-12) | rendering |  | STAGED (M3c, the built-in clerk). | BCR-V10-7 | V08, V09, V10 |
| 474 | 12.4 CITY per-stage split (SCL-3) | rendering |  | STAGED (M5, stage 2). | V01 BCR-19 | V01 |
| 475 | 12.4 CITY per-stage split (SCL-3) | rendering |  | STAGED (M6-U, the underground layer). | V04 BCR-11 | V04 |
| 476 | 12.4 CITY per-stage split (SCL-3) | rendering | scope | STAGED (M6-sky). | BCR-V5-14 | V05 |
| 477 | 12.4 CITY per-stage split (SCL-3) | rendering |  | BASE (M2b, V11 C2). | BCR-V11-22 | V11 |
| 478 | 12.6 Edits, regeneration, replay and warp, as functions of … | rendering |  | STAGED (M6-E, the evolution engine). | BCR-V6-22 | V06 |
| 479 | 12.6 Edits, regeneration, replay and warp, as functions of … | rendering |  | STAGED (M6-E, the evolution engine). | BCR-V6-23 | V06 |
| 480 | 12.6 Edits, regeneration, replay and warp, as functions of … | rendering |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-16 | V08 |
| 481 | 12.8 Memory (what is counted, per rung) | rendering |  | STAGED (M3c, the built-in clerk). | BCR-V10-19 | V10 |
| 482 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope | rendering | STAGED (M6-P, the plan rung). | BCR-V3-9 | V03 |
| 483 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope |  | STAGED (M6-P, the plan rung). | BCR-V3-14 | V02, V03 |
| 484 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope |  | STAGED (M6-U, the underground layer). | V04 BCR-15 | V04 |
| 485 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope |  | STAGED (M6-U, the underground layer). | V04 BCR-22 | V04 |
| 486 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-17 | V08 |
| 487 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope |  | STAGED (M3c, the built-in clerk). | BCR-V10-11 | V10 |
| 488 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-13 | V12 |
| 489 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-16 | V12 |
| 490 | 13.3 Seed goldens with the declared-shift protocol (G-P11, … | scope |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-24 | V09 |
| 491 | 13.3 Seed goldens with the declared-shift protocol (G-P11, … | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-7 | V12 |
| 492 | 13.3 Seed goldens with the declared-shift protocol (G-P11, … | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-19 | V12 |
| 493 | 13.3 Seed goldens with the declared-shift protocol (G-P11, … | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-20 | V12 |
| 494 | 13.4 Visual regression, B-ZOOM and the app harness | scope |  | BASE (§16 bookkeeping). | BCR-V9-17 | V09 |
| 495 | 13.5 Reference-parity metrics (B-REF), read from one number… | scope |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-23 | V07, V12 |
| 496 | 13.5 Reference-parity metrics (B-REF), read from one number… | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-1 | V12 |
| 497 | 13.5 Reference-parity metrics (B-REF), read from one number… | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-2 | V12 |
| 498 | 13.6 The owner's side-by-side protocol (D-5) | scope |  | STAGED (M5, stage 2). | V01 BCR-21 | V01, V12 |
| 499 | 13.6 The owner's side-by-side protocol (D-5) | scope |  | STAGED (M6, stage 3). | BCR-V2-25 | V02, V12 |
| 500 | 13.6 The owner's side-by-side protocol (D-5) | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-6 | V12 |
| 501 | 13.7 Thresholds without a reference source (IMP-6, DEF-1; D… | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-12 | V11, V12 |
| 502 | 13.8 CI tiers and compute budgets (SCL-18; D-34) | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-14 | V12 |
| 503 | 13.9 The corpus-calibration interface (staged by the owner;… | scope |  | STAGED (M-CAL, the corpus reconciliation). | BCR-V12-3 | V12 |
| 504 | 13.9 The corpus-calibration interface (staged by the owner;… | scope |  | STAGED (M-CAL, the corpus reconciliation). | BCR-V12-4 | V12 |
| 505 | §14 Package and module layout, key interfaces, dependency r… | scope |  | BASE (M1, M2b, M3a) for V01 BCR-1's early parts as the note lists them; STAGED … | BCR-V2-18, BCR-V3-31, BCR-V7-10, V01 BCR-1, V04 BCR-12 | V01, V02, V03, V04, V07 |
| 506 | §14 Package and module layout, key interfaces, dependency r… | scope |  | BASE (M3a, item 110 (b)'s rung gate and data key). | BCR-V7-34 | V01, V07 |
| 507 | §14 Package and module layout, key interfaces, dependency r… | scope |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-3 | V08, V09 |
| 508 | §14 Package and module layout, key interfaces, dependency r… | scope |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-4 | V08 |
| 509 | §14 Package and module layout, key interfaces, dependency r… | scope |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-5 | V08 |
| 510 | §14 Package and module layout, key interfaces, dependency r… | scope | model, determinism, kernel | STAGED (SettlementForge stage, SF0 to SF7; V11 C4). | BCR-V11-4, BCR-V8-10 | V08, V11 |
| 511 | §14 Package and module layout, key interfaces, dependency r… | scope | determinism | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-13 | V08 |
| 512 | §14 Package and module layout, key interfaces, dependency r… | scope |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-23 | V08 |
| 513 | §14 Package and module layout, key interfaces, dependency r… | scope |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-27 | V08 |
| 514 | §14 Package and module layout, key interfaces, dependency r… | scope |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-1 | V09 |
| 515 | §14 Package and module layout, key interfaces, dependency r… | scope | determinism | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-2 | V09 |
| 516 | §14 Package and module layout, key interfaces, dependency r… | scope |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-8 | V07, V08, V09, V10, V11 |
| 517 | §14 Package and module layout, key interfaces, dependency r… | scope |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-9 | V09 |
| 518 | §14 Package and module layout, key interfaces, dependency r… | scope | rendering | STAGED (M3c, the built-in clerk). | BCR-V10-8 | V10 |
| 519 | §14 Package and module layout, key interfaces, dependency r… | scope |  | STAGED (M3c, the built-in clerk). | BCR-V10-14 | V10 |
| 520 | §14 Package and module layout, key interfaces, dependency r… | scope |  | STAGED (with item 510; V11 C4). | BCR-V11-4 | V11 |
| 521 | §14 Package and module layout, key interfaces, dependency r… | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-10 | V12 |
| 522 | 15.1 Parity matrix — every capability row of `docs/confiden… | scope |  | BASE (M2b) for BCR-V2-19's §13.2 bullet — its T-V2-52 clause from M2b, its T-V2… | BCR-V2-19 | V02, V12 |
| 523 | 15.2 Improvement matrix — every must-have / should-have / h… | scope |  | STAGED (M5, stage 2). | V01 BCR-24 | V01 |
| 524 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | STAGED (M6, stage 3). | BCR-V2-20 | V02, V03 |
| 525 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-37 | V02 |
| 526 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | STAGED (M6-U, the underground layer). | V04 BCR-13 | V04 |
| 527 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-16 | V07 |
| 528 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | STAGED (with item 202). | BCR-V7-17 | V07 |
| 529 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-18 | V08, V12 |
| 530 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | BASE (§16 bookkeeping). | BCR-V9-18 | V09 |
| 531 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-10 | V10 |
| 532 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | BASE (§16 bookkeeping, V11 §8). | BCR-V11-11 | V11 |
| 533 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-9 | V12 |
| 534 | 17.1 The clean-room chain (IMP-1; D-29) | scope |  | BASE (M0 (b), V11 C0). | BCR-V11-21 | V11 |
| 535 | 17.1 The clean-room chain (IMP-1; D-29) | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-8 | V12 |
| 536 | 17.1 The clean-room chain (IMP-1; D-29) | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-18 | V12 |
| 537 | 17.1 The clean-room chain (IMP-1; D-29) | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-21 | V12 |
| 538 | 17.4 Dependencies (IMP-14) | scope |  | STAGED (M3c, the built-in clerk). | BCR-V10-9 | V10 |
| 539 | II.1 The district → neighbourhood interface | pipeline |  | STAGED (M5, stage 2). | V01 BCR-2 | V01 |
| 540 | II.1 The district → neighbourhood interface | pipeline |  | BASE (M1). | V01 BCR-28 | V01 |
| 541 | II.1 The district → neighbourhood interface | pipeline |  | STAGED (M5, stage 2). | V01 BCR-30 | V01 |
| 542 | II.2 Templates as fabric strategies (NG B2, B7, B8) | pipeline |  | STAGED (M5, stage 2). | V01 BCR-20 | V01 |
| 543 | II.2 Templates as fabric strategies (NG B2, B7, B8) | pipeline |  | STAGED (M5, stage 2). | V01 BCR-38 | V01 |
| 544 | II.3 Block content dispatch, pins, local identities (stage-… | pipeline |  | STAGED (M5, stage 2). | V01 BCR-22 | V01 |
| 545 | II.4 The render tier, the workflow and the close-up's persi… | pipeline |  | STAGED (M5, stage 2). | V01 BCR-23 | V01 |
| 546 | II.6 The staged layers — floating islands and sewers: the h… | pipeline |  | STAGED (M6-sky). | BCR-V5-4 | V05 |
| 547 | II.6 The staged layers — floating islands and sewers: the h… | pipeline |  | STAGED (M6-sky). | BCR-V5-17 | V05 |
| 548 | II.7.1 Existence by tier (item 14): the rung row, the S0 dr… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-28 | V04 |
| 549 | II.7.1 Existence by tier (item 14): the rung row, the S0 dr… | pipeline | determinism | STAGED (M6-U, the underground layer). | V04 BCR-37 | V04 |
| 550 | II.7.1 Existence by tier (item 14): the rung row, the S0 dr… | pipeline |  | STAGED (M6-E, the evolution engine). | BCR-V6-16 | V06 |
| 551 | II.7.3 The underground neighbourhoods (item 12): the owner'… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-19 | V04 |
| 552 | II.7.3 The underground neighbourhoods (item 12): the owner'… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-27 | V04 |
| 553 | II.7.3 The underground neighbourhoods (item 12): the owner'… | pipeline |  | STAGED (M6-U, the underground layer). | BCR-V11-15 | V11 |
| 554 | II.7.4 The hook interfaces and the base's part | pipeline |  | STAGED (M6-U, the underground layer). | V01 BCR-37, V04 BCR-29 | V01, V04 |
| 555 | II.7.4 The hook interfaces and the base's part | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-21 | V04 |
| 556 | II.7.4 The hook interfaces and the base's part | pipeline | determinism | STAGED (M6-U, the underground layer). | V04 BCR-23 | V04 |
| 557 | II.7.4 The hook interfaces and the base's part | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-30 | V04 |
| 558 | II.7.5 The undercity (item 65): what it requires, existence… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-42 | V04 |
| 559 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline |  | STAGED (M6-U). | V04 BCR-20, V04 BCR-45 | V04 |
| 560 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline | kernel | STAGED (M6-U, the underground layer; volume 1's place for it with M5). | V01 BCR-36, V04 BCR-36 | V01, V04, V11 |
| 561 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline | determinism | STAGED (M6-U, the underground layer). | V04 BCR-24 | V04 |
| 562 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-26 | V04 |
| 563 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-31 | V04 |
| 564 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline |  | STAGED (with item 560, M6-U). | V04 BCR-36 | V04, V11 |
| 565 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-27 | V04, V07 |
| 566 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline |  | STAGED (M6-U, the underground layer). | BCR-V11-14 | V11 |
| 567 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | STAGED (M6-P) — §16 bookkeeping. | BCR-V3-30 | V02, V03 |
| 568 | §16 Build plan — calibration and spikes first, then a viewa… | scope | rendering | BASE (§16 bookkeeping). | BCR-V11-11, BCR-V2-20, BCR-V2-37, V01 BCR-19 | V01, V02, V03, V04, V05, V06, V07, V08, V09, V10, V11, V12 |
| 569 | Staged by the owner's roadmap (this document defers nothing) | scope |  | STAGED (M-CAL, the corpus reconciliation). | BCR-V12-11 | V12 |
| 570 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-35 | V09, V10 |
| 571 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-23 | V09, V10 |
| 572 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-22 | V08, V09, V10, V08 |
| 573 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (M6-E, the evolution engine). | BCR-V6-27 | V04, V06, V08 |
| 574 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (M6-U, the underground layer; with item 319). | BCR-V6-28 | V04, V06 |
| 575 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model | pipeline, rendering, kernel | BASE (M4, with §4.11's decline table and `DeclineOp`). |  | V05, V06, V12, V12 |
| 576 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline | model | STAGED (the village product, V-M0 to V-M4). | BCR-V7-36 | V07, V11 |
| 577 | PART III — What a later village product needs from the base… | pipeline |  | STAGED (with item 202). | BCR-V7-37 | V07 |
| 578 | 2.6 Buildings, heights and ground datum, wings, materials, … | model | scope | STAGED (M6-P, the plan rung) for the step-3 and T28-3 texts; `basementDoor(b)` … | BCR-V3-32 | V01, V02, V03 |
| 579 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-38 | V07 |
| 580 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, rese… | pipeline |  | STAGED (M5, stage 2 — built by volume 1's W8 on a fixture island; in use on rea… | V01 BCR-45 | V01, V05 |
| 581 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | STAGED (the village product, V-M0 to V-M4, with item 377). | BCR-V11-31 | V06 |
| 582 | 7.1 Edits are ordered events on addresses; the named action… | determinism | pipeline | BASE (M3a, the authoring toolkit). |  | V09, V10 |
| 583 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | STAGED (SettlementForge stage, SF0 to SF7), with volume 9's AP5b (T-V9-69). | BCR-V9-36 | V08, V09, V10, V08 |
| 584 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | STAGED (M5, stage 2) — the milestone of the first `NG` entry, a stage-2 column … | V01 BCR-46 | V01, V11, V12 |
| 585 | 13.7 Thresholds without a reference source (IMP-6, DEF-1; D… | scope |  | STAGED (M6-P, the plan rung), whose intake runs the band. | BCR-V3-33 | V03 |

## File g — items 102–113

Items 102–110 are applied to the base like f items (the volumes carry their parts, integrated by the volumes pass); items 111–113 reached the program after that, so EVERY unit named writes its part at build depth as new design (a verifier raises F-MISSING where a part is absent). Parts marked WIRING CONSEQUENCE are not named by the item but are needed so the pieces it adds are wired both ways (principle (7)).

### g item 102 — as an f item (the volumes carry their parts, integrated)

* **pipeline:** §4.5 (the driver and its order), §4.7 S10b (the sunlit-side preference), II.6 (the island shade strip hook), §4.11 (drift over epochs, STAGED with evolution)
* **determinism:** §7.6 (the weight w_sun as a table value)
* **rendering:** §8.4 (the path sun reused as a model-side sampler, never the view's light)
* **scope:** §13 (the bars)

### g item 103 — as an f item (the volumes carry their parts, integrated)

* **pipeline:** §10.2 (the siting profile columns on BuildingClassRow, the relation families as derived RelationRules, the signature-pair table, the coverage row of (f)), §4.7 S10b (the solver reads them; unchanged in shape)
* **determinism:** §7.6 (the tables and their provenance)
* **scope:** §13.2 (the statistics suite; the coverage bar)

### g item 104 — as an f item (the volumes carry their parts, integrated)

* **determinism:** §7.7 (the port reads the custom record and the optional definition fields)
* **pipeline:** §10.2 (the resolution order, the 17 archetype rows, the category and tag delta tables, the keyword table, the fallback), §4.7 S10b (unchanged solver)

### g item 105 — as an f item (the volumes carry their parts, integrated)

* **pipeline:** §10.2 (the goods table, the orientation column, split rows), §4.7 S10a and S10b (order, two-way term, relaxation, split placement), §4.5 S7b (1) (the district supply term)
* **model:** §2.6 and §2.7 (Use.branchOf)
* **determinism:** §7.7 (activeChains as a port input; a DR row — DR33)
* **scope:** §13.2

### g item 106 — as an f item (the volumes carry their parts, integrated)

* **model:** §2.7 (the closure kind, the stretch profile, the harbour-mouth gate)
* **pipeline:** §4.2 S3 (9) and §4.4 S5a (classification, reach, anchors), §4.8 (graded furniture, anchor towers, the chain), S12b (intramural gardens)
* **determinism:** §7.7 DR2, §5.2 F-WALL
* **scope:** §13.2

### g item 107 — as an f item (the volumes carry their parts, integrated)

* **pipeline:** §10.2 (the balance profile, comfortM, the spacing row), §4.7 S10a and S10b, §4.5 S7b (1)
* **scope:** §13.2

### g item 108 — as an f item (the volumes carry their parts, integrated)

* **determinism:** §7.7 (T9 and DR9 extended; the ladder table as a port input pinned to the baseline)
* **pipeline:** §10.2 (the step-type table), §4.2 S2 (member counts), §4.5 item 72 (quarter records owning members)
* **scope:** §13.2

### g item 109 — as an f item (the volumes carry their parts, integrated)

* **model:** §2.7 (UndergroundSystem.kind gains ruin; link kinds breach and reuse)
* **pipeline:** §4.2 S1 (the relief rows, the mining boost, the fissure variant), II.7.6 (caverns and the ruin system, its order and depth band), II.7.5 (a ruin as a void source and its rank), II.7.3 (basement access over ruins)
* **determinism:** §7.7 (DR rows for ancient_ruins, magical_node, the mining deposits and the history events)
* **rendering:** §8.2 (the ruin style)
* **scope:** §13.2

### g item 110 — as an f item (the volumes carry their parts, integrated)

* **model:** §2.7 (RetainingWall, the raised ways' parts, deck plots — file f items 244–246)
* **kernel:** §3.4 (ground parts from 1)
* **pipeline:** §4.3 and §4.6 (raised ways, stairs and ramps), §4.7 S10 and S11 (terrace levelling, deck plots)
* **determinism:** §5.3 (the revised deck invariant), §7.1 (T3's retaining kind, T4's raised flag)
* **rendering:** §8 (drawing and shadows)
* **scope:** §13 and §16 (the second known-city fixture at M3a)

### g item 111 — new design at build depth in every named unit; F-MISSING if absent

* **pipeline:** §4.2 S0 and S1: the oasis and spring features and the arid chances (an arid site keeps river, lake and coast at the arid row's chances and gains the oasis; likelier with no other water); §4.2 S3 and §4.4: the water pull on the growth field (travel-cost boundary and nucleus); §4.5: the prosperity water term and item 102's sunlight cell per climate row (zero or toward shade in hot arid rows); §4.7 S10b: wells and fountains weighted to high-yield ground, walking coverage tightened in arid rows; an oasis is water for every rule that reads water
* **model:** WIRING CONSEQUENCE (not named by the item): §2.3 declares the spring and the oasis's records or fields S1 writes (a spring flag on a WaterBody or a Spring feature, the grove and irrigated gardens as LandUse and Greenery rows) with their lifecycle rows
* **determinism:** §7.1: T2 `ground`'s lake point-and-level form with a spring flag (the oasis added or removed by hand), its §7.4 lifecycle row and undo; §7.7: a dossier's `oasis_water` makes an oasis exist (item 20) — its DR row cites DR1
* **rendering:** WIRING CONSEQUENCE: the oasis's spring, grove and gardens draw with existing style rows or named new ones (§8.2), its label kind (§9.1) and its export (§11.1)
* **scope:** §13.2: the bars of item 111 (d) — arid seeds' share of households within walking distance of water above the non-arid baseline; oases only on arid sites unless drawn or supplied; arid sites still draw rivers, lakes and coasts at the arid row's chances; the richest band's mean distance to water below the middle band's; with the oasis chance, the water pull and the climate cell neutral, byte-identical (a NoOpPin, E-20); §0.2's landing row
* **V07:** the village crowding map's water pull and oasis villages
* **V08:** the dossier's desert with or without `oasis_water`, and deserts with rivers, lakes or coasts (the port's mapping; E-31's failure condition reads it)
* **V11:** the oasis chance, grove and garden rows, the water-pull weights and the sunlight cell per climate row
* **V06:** failing springs and oases over epochs (the pull weakens, the quarters around may decline)
* **V05:** an island's own water, unchanged: one sentence stating that item 111's oasis, water pull and climate cell do not apply on a sky island (its water stays V05's)
* **V09:** the tool: T2 `ground`'s spring flag and the oasis in the ground tools, its message rows and binding row
* **V10:** the explanations: why rows for the water pull and the oasis ('why is this quarter here / rich')
* **V12:** the bars: register lines and the NoOpPin registration for item 111's cells

### g item 112 — new design at build depth in every named unit; F-MISSING if absent

* **rendering:** §8: every style family and thematic view that encodes meaning in colour (district tints, prosperity, ownership, knowledge, the underground's systems, water and ground classes) carries a second cue (pattern, line style, label or shape); each such style has checked variants for the three common colour deficiencies, selectable in the view settings; default styles keep their look, the second cues drawn at legend-bearing zoom stops and thematic views; §9: legends show the second cue
* **scope:** §13: the style check (simulated-deficiency contrast between every pair of categories a legend distinguishes, against a table threshold) with its test id; the game-master trial (ten to twenty SettlementForge game masters, at least two sessions of play on their own settlements) as a release gate before the public release; its report must exist before release; participants thanked by credit and early access, no payments; §16's release gate row
* **V09:** the view settings (the checked-variant selector) and the trial's running (recruitment through SettlementForge's community, the sessions, the report)
* **V12:** the trial's record (its findings enter the calibration record and the fix list) and the style check's register line

### g item 113 — new design at build depth in every named unit; F-MISSING if absent

* **pipeline:** §4.2 S0: the history option (a standalone blueprint history such as 'once a city, now a village'); §4.11: history-first generation — the peak, the replay as coarse epochs (decades by default, a table value) from the founding or peak to the present meeting the dossier's present facts exactly, destruction and refounding (the old geometry as ruins, the new settlement reusing roads, gate gaps, bridges and foundations, the salvage ledger), burial past a threshold (a century by default, shortened by floods, silt and rebuilding, lengthened on bare rock), the effective peak (a symbolic peak from evidence, sized at the tier range's lower quartile, marked symbolic); II.7.6: the buried former settlement generalised to the replay (its streets, walls and major buildings at their old ground level), distinct from item 109's ancient ruins
* **determinism:** §7.7: the derivation rows for history (DR36 onward, ID-DR): the peak (peakTier, high-water population, the symbolic peak's evidence order), the replay's events (event → epoch mapping), destruction and refounding, the burial threshold; the replay's record for the clerk (W-DOS-09); §6.1: the replay's streams (deterministic per seed and history)
* **scope:** §13.2: item 113 (g)'s bars (the city-to-village fixture, byte-stable replay, refounded fixture reusing roads, buried ruins past the threshold matching the former geometry, a void LOST on its last link's closing and restored on reopening, a symbolic peak only with evidence, with replay off byte-identical — a NoOpPin); §16: the replay's milestone; §0.2's landing row
* **model:** WIRING CONSEQUENCE: §2.7/§2.8 carry the replay's records the base reads (the history record, the LOST state on an underground link's access path — V04's records — and the `symbolic` provenance flag on a derived fact)
* **V06:** the replay engine at generation: coarse epochs, the event-to-epoch mapping, the generation budget, lazy detail, the replay record; J-V6.4 and §1.3's bullet retired (V06-XCONF-1)
* **V08:** reading SettlementForge's history: AGE_BY_TIER, the founding, the 29 event types with years ago and severity, tierHistory, populationHistory, calamityHistory, the lifecycle (terminal death, resettlement), opt-in ancient ruins, peakTier and its documented gap; the effective peak's evidence order
* **V04:** buried former-town ruins (derived from the former geometry, at their old ground level) and lost access: access counts only through OPEN links; a void whose every open path closes becomes LOST (remembered as once known, drawn faded like an unexcavated void) until refound; dwellings in a lost void empty by the vacancy rules and may return
* **V07:** a village over a former city (the remnants at village rungs) and refounding at village rungs
* **V11:** event-to-epoch rows and burial thresholds (the table values of item 113)
* **V09:** the history option in the editor (the blueprint history) and the LOST void's panel line (V09-WGAP-1)
* **V10:** the story told ('the walls were built when this was a city of twelve thousand'; 'its exact size is not recorded' for a symbolic peak)
* **V12:** the bars and the replay's budget (register lines, the NoOpPin)

## Id hygiene

The census (`work/canon/ids.py`) found 3302 defined ids and 693 apparent duplicates, read: the true collisions are ID-BCR (V01/V04 bare BCR-n), volume-local W/X/H rows (ID-WX); every other duplicate is an index row and its Part A entry, a registration row and its bar, an amendment note to the same request or a continued range.

* **ID-BCR** — V01 and V04 number their base change requests bare 'BCR-n' (both 1–46): the same id names two requests (V03 cites 'BCR-29, BCR-30' for V04 and 'its BCR-43' for V01). **Ruling:** Rename into the set's one request family: V01's BCR-n → BCR-V1-n, V04's BCR-n → BCR-V4-n (the number kept). File f's citations 'V01 BCR-n' / 'V04 BCR-n' resolve by this rule and need no edit; every other citation in the set is rewritten. *Units:* V01, V04, V03, V05, V06, V07, V08, V09, V10, V11, V12. *Renumbering:* V01 BCR-n (bare BCR-n in V01) → BCR-V1-n; V04 BCR-n (bare BCR-n in V04) → BCR-V4-n.
* **ID-TOOL** — Tool ids T1–T12 (item 101) and the base's bar family T⟨item⟩-⟨n⟩ share the T prefix; bare 'T8', 'T10', 'T11' in §13.8 mean items' bar groups. **Ruling:** Keep both families (the tools are the owner's item 101 names; the 203 bar ids are cited everywhere). A bar group is always written with its number form ('the T8-n bars', 'T8-1 – T8-3'), never bare; a bare T1–T12 means the tool, written with its word at first use in a paragraph (T8 `fill`). §13.8's list is rewritten so. Volume bars keep T-Vn-m. research/sf/mapping.md's tables T1–T16 are cited by their row-set names (V08 §2.6), never bare (V07-TERM-4). *Units:* scope, determinism, V07, V09, V10.
* **ID-R** — R1–R19 (§14's interaction contract) vs IMPROVEMENTS requirement ids R3, R6, R8, R9, R13 and 'R11' (a repair round). **Ruling:** Bare R1–R19 mean §14's interaction rules; an IMPROVEMENTS requirement is cited 'IMPROVEMENTS R3'; 'R11' (a repair round, J-A28.02) is narration and is removed. The f file's rule labels (R-a … R-d) and the canon's home rules (R1–R13 of the earlier canon) live only in validation records. *Units:* scope.
* **ID-TRACE** — §17.1 (6)'s provenance trace keys P⟨n⟩ and D⟨n⟩ share letters with the parity class P and the decisions D-n; §15.1's capability ids repeat per reference table. **Ruling:** Trace keys keep P1…/D1… inside §17.1 (6)'s table only (no hyphen); decisions are always D-n (hyphen); §15.1's capability ids are always cited with their reference ('FTG C9', 'MFCG D1'). *Units:* scope.
* **ID-JT** — 'J-T' (§13.7, BCR-V12-12) names the Jonckheere–Terpstra trend test inside the J- decision namespace. **Ruling:** Renamed 'JT (the Jonckheere–Terpstra trend test)'; the J- namespace holds decisions only. *Units:* scope, V12. *Renumbering:* J-T → JT.
* **ID-APPX** — Appendix A holds only 'A.3' (A.1 and A.2 moved to the rationale file). **Ruling:** Appendix A's one section is unnumbered; citations of 'A.3' read 'Appendix A'. *Units:* scope. *Renumbering:* A.3 → Appendix A.
* **ID-ITEM** — 'item N' means an owner or amendment item and also a numbered paragraph of a section ('§7.7 item 15'). **Ruling:** Bare 'item N' means an owner or amendment item only (owner items 1–101, file g 102–113, file f 200–585 — disjoint by design). A section's own numbered paragraph is always cited with its section ('§7.7 item 15', '§7.7 clause…' not used). Inside §7.7 the contract's items are written '§7.7 item n' (DIC-05). *Units:* determinism, scope, pipeline.
* **ID-LAYER** — The toolkit's layers L0 INTENT … and the plat refinement levels L0–L4. **Ruling:** A toolkit layer is always written with its word (L0 INTENT, 'the INTENT layer'); bare L0–L4 means a refinement level (DIC-07). *Units:* determinism, V09, V10.
* **ID-WX** — Volume-local row ids W1…, X1…, H1…, FL-n, IN-Vnn-n, S-Vn-x are reused across volumes (V01 W15 and V04 W15; X1 in V02, V06, V08). **Ruling:** They stay volume-local and are never cited bare outside their volume: another unit writes 'V06 W75', 'V02 X20', '_integrate H12'. Inside its own volume a bare id means that volume's row. V08 numbers its §1b wiring rows W1… (V08-TERM-1) and drops the history dividers. The IN-Vnn-n integration notes are folded into the body by the rewrite (their content at its home), their ids kept only in the validation records. *Units:* V01, V02, V04, V06, V07, V08, V09, V10, V11, V12.
* **ID-DR** — Derivation rows proposed under working names (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1–DR-V8.8) and numbered by J-VI.13 / file f item 383. **Ruling:** The numbers DR26–DR35 are the only ids everywhere in the set (DR26 = DR-V1.1; DR27 = DR-SKY; DR28 = DR-V6.1 = DR-V8.6, one row; DR29–DR33 = DR-V8.1–DR-V8.5; DR34 = DR-V8.7; DR35 = DR-V8.8); the aliases are retired (glossary G-DR). g item 113's history rows take DR36 onward, numbered by the determinism editor in §7.7's order and cited by V04, V06, V08. *Units:* determinism, V01, V04, V05, V06, V07, V08, V11. *Renumbering:* DR-V1.1 → DR26; DR-SKY → DR27; DR-V6.1 / DR-V8.6 → DR28; DR-V8.1 → DR29; DR-V8.2 → DR30; DR-V8.3 → DR31; DR-V8.4 → DR32; DR-V8.5 → DR33; DR-V8.7 → DR34; DR-V8.8 → DR35.
* **ID-JC** — The canon's own decisions under J122 need ids that collide with nothing. **Ruling:** The canon's decisions are J-C1 … J-C4 (J-C1–J-C3: SCOPE-C06's three base questions; J-C4: the span rule's `country` reason, V07-XCONF-2); the determinism editor or scope editor enters each as a Judgment-calls index row with a Part A entry. *Units:* scope.
* **ID-DUPDEF** — The id census (work/canon/ids.py over the base, rationale, INDEX, f, g, _integrate and the twelve volumes) found no test or decision id defined twice with two meanings: every apparent duplicate is an index row and its Part A entry (J-A…, D-n), a bench-registration row and its bar's body (T-V2-22 …), an amendment note to the same request (BCR-V11-1 …), or a continuation line of a range. The rewrite keeps one definition per id: a volume's amendment notes to its own request fold into the request's one entry. **Ruling:** No renumbering beyond the rulings above. *Units:* V11, V02, V03, V09, V10, V04, V07, V08.

## Wiring gaps (wiring.md) — every one routed

| id | class | sev | units | the piece | the link to write (or the ruling) |
|---|---|---|---|---|---|
| W-DOS-01a | dossier-unreached | major | determinism, V08 | §7.7 item 1, the never-read list (item 86) | §7.7 item 1 names every stored SettlementForge key the port does not read, each with its reason: `_config` (raw inputs; the resolved `config` is read), `relationships`, `prominentRelationship` and `conflicts` (the NPC layer beside its social groups), `resourceAnalysis` (the deposits come from `config.nearbyResources*`), `defenseProfile` (copies of institution records and generation scores; walls come from the `@wall… |
| W-DOS-01b | dossier-unreached | major | V08, determinism | the adapter's SettlementForge-path table | V08 §2.4 gains THE ADAPTER'S FIELD TABLE for fp-integration-2026-09-23: every SettlementForge path (the 41 required keys, the 7 optional keys read, the campaign inputs of the realm block and the week) → the DossierDigest field it fills (naming the paths V08 leaves implicit: `config.cultureProfileKey` → `site.culture`, `config.nearbyResources*` → `site.deposits`, `neighborRelationship` / `neighbourNetwork` → `economy… |
| W-DOS-02 | dossier-change-path | major | V08, V06, determinism | the prosperity word over time (receipt F9) | V08 §3.5's diff table gains the row `wealth`: `label` → `attr` with response `epoch` — `EpochInputs.wealthLevel` through `tables/dossier/wealth` (DR6; receipt F9), the producer V06 W27 and BCR-V6-9 read; today the settlement row compares only population, tier word and name, so a campaign's prosperity change never reaches DR6 |
| W-DOS-03 | dossier-unreached | minor | pipeline | PortRows.hinterland.foodChain (← PortValues.foodChain ← economy.foodChains ← foodSecurity.chains); PortRows.customKinds | §4.9 (S12a's farm table) names the reader of `foodChain` — a chain the dossier marks absent sets its land uses' share to 0 (no `Pastoral & livestock` → no pasture), and §10.2's closing bullet adds §4.9 and S2's roster (for `customKinds`' numbers, V08 §3.11) to the port rows' readers; or §14 drops `foodChains` and §7.7 item 1 lists `foodSecurity.chains` (WG-PIPE-01) |
| W-DOS-04 | dossier-unreached | minor | pipeline | the dossier's deity; Religion.deities, practiceShare, clergyPerThousand | §10.2's religion rows name the producer of `Religion.deities` (the dossier's `religion.deityKey` / `deityName` when present, else the religion row's pantheon) and of `practiceShare` / `clergyPerThousand` (copied from V11's `ReligionRow`), and §10.4 names the reader: the principal temple's dedication in S13a's name; §7.7's DR14 lists `religion.deityName` among its inputs, so receipt F16's 'a temple's dedication at th… |
| W-DOS-05 | dossier-unreached | minor | scope | DossierDigest.government.previous | §14 names the reader of `government.previous` (V06's chronicle and V10's history answer: the former governments with their causes and weeks) or drops the field and §7.7 item 1 lists `powerStructure.previousGovernments` |
| W-DOS-06 | orphan | minor | scope | RealmBlock.mPerRealmUnit | §14's RealmBlock drops `mPerRealmUnit` (V08's host-side `realmBlockFrom` already turns the realm scale into each partner's `distanceM`, V08 §3.11), or names its module reader |
| W-DOS-07 | orphan | minor | V08 | DossierDigest.notables[].importance | V08 names the reader of a notable's `importance` (V10's people answer and V09's person card order them by it) or drops it from the digest and lists `npcs[].importance` as not read; V08 §3.5 itself says no rule reads it |
| W-DOS-08 | dossier-change-path | minor | V08 | a later change of the site facts or the history | V08 rules both creation-only (§2.7: 'the site is creation's'; §3.11: 'History. At creation only') but §3.5's diff table has no row for them, so a DM's later change of terrain, access, threat, magic, culture, isolation or the history is skipped without a word: the table gains rows `site` and `history` that cite that rule and write one note (`frozen_fact_changed`, class report, with its `host.note.*` row) so the chang… |
| W-DOS-09 | dossier-no-derivation-row | major | determinism, V06, V08 | the history as a derivation input | CLOSED by g item 113's §7.7 part (the history derivation rows DR36 onward, ID-DR). |
| W-DOS-10a | dossier-no-derivation-row | minor | V01 | V01 §1b dossier trace rows for openings and catacomb entrances | V01 §1b's rows cite DR30 (DR-V8.2) and DR32 (DR-V8.4) by number (file f item 383) instead of "V08's rows for item 109 (b)" and "(k) (3)" |
| W-DOS-10b | dossier-no-derivation-row | minor | V02 | V02 §1b dossier table (12 rows) | V02 §1b's dossier table names each row's derivation row: the kind → DR24; `materialFamily` → DR15; a split class → DR10; a crypt record → DR17; households and bands → DR6, DR7; a stepped culture → DR15 — beside the V08 and V11 rows that carry them |
| W-DOS-10c | dossier-no-derivation-row | minor | V04 | V04 §1b.5 rows the water system; age and scars | V04 §1b.5 cites DR34 (DR-V8.7) for the water system and the history row of W-DOS-09 for the age, scars and magical history |
| W-DOS-10d | dossier-no-derivation-row | minor | V06 | V06 §1b dossier trace rows chains, water system, landmarks | V06 §1b's trace cites DR33 (DR-V8.5), DR34 (DR-V8.7) and DR35 (DR-V8.8) by number instead of "the coherence pass's row for item 105 (i) / 110 (b)" |
| W-IF-01 | interface-no-implementer | major | V04, V10 | V04's WhyProvider and the `underground` WhySectionProvider (BCR-V10-3) | V04 §1b.2 adds the provider rows (implementer `@plat/under`; callers V10's why query and V09's why card) and V04 §4.5 states their rows with `info.under.*` keys — the `ruin.node` line, `AccessPoint.cause`, `reusedBy`, an arch vault's span reason, `Chamber.monument` tiers, `FoundationsResult` footings, `CatacombComplex.blockedBy`, the terminal cistern — and `catacombOutcome`; a T-V4 bar covers them; IN-V04-7/8 fold i… |
| W-IF-02 | interface-no-implementer | major | V07, V10 | V07's WhyProvider for VillagePlan, VillageField, VillageEnd | V07 §4.5 registers its WhyProvider through BCR-V10-3's interface for the kinds V10 §3.9's owed table assigns it, its answers (listed in prose today) as rows with `info.village.*` keys, a V07 §1b row and a T-V7 bar — BCR-V10-3's completeness test checks exactly this provider |
| W-IF-03 | hook-one-ended | minor | V10, V01 | V01's three why providers (terrace, ward-edge wall, under-deck strip) | V10 §3.9's owed table lists V01 §4.5's three providers for their kinds, and V10's own RetainingWall and deck-plot rows cite them as V01's — one provider per kind |
| W-IF-04 | hook-one-ended | minor | V09, V12 | the calibration register → the tables editor's cell inspector | V09 §4.14's tables editor shows per cell its calibration register entry (V12 §2.6 CalibrationEntry: status, reference, due milestone, history) from `register.json` / `dist/evidence.json` — folding IN-V09-7 into the body (V01 §1b and V12 §1b name the inspector as a consumer) |
| W-IF-05 | hook-one-ended | minor | V10, V12 | the calibration register → the clerk's provenance answer | V10 §2.13's RuleAnswer gains the cell's register entry (status, reference, due milestone; V12 §2.6) and V10 §1b.1 lists `register.json` as an input; or V01 §1b and V12 §1b drop the claim |
| W-IF-06 | hook-one-ended | minor | V02 | terrace.wallBandCm | V02 §1b's row names its real consumer (the wing datum's wall-side sample, V02 §3.10.9); V03's walk-out reads its own 2 × cellar.insetCm band (V03 §3.7.1) — or V03 §3.7.1 reads terrace.wallBandCm |
| W-IF-07 | interface-no-caller | minor | pipeline | ContentProvider (door 4, §11.4, §14) | §4.2 S2, §4.7 S10b and §10.3 name where a registered provider replaces the roster, the siting and the people derivation (its call points); no implementer exists in the set, so either the base keeps door 4 as a third-party extension point with those call points and a fixture provider in §13.2's tests, or door 4 and ContentProvider are removed (J121: SettlementForge enters through the port) |
| W-HOOK-01 | hook-one-ended | minor | scope | Staged by the owner's roadmap: the hooks table | the roadmap table gains the column 'built by': stage 2 → V01; stage 3 → V02 and V03 (the plan rung); the village → V07; the underground → V04, the islands → V05; the evolution engine → V06; calibration → V12; SettlementForge → V08; the authoring toolkit → V09, V10 (with V11's tables and V12's bars) — so each base hook names its other end (INDEX.md §2 holds it today) |
| W-HOOK-02 | hook-one-ended | minor | model, V02, V03, V04, V05, V08 | §2's staged records and the stage-3 and plan hooks | §2.6 and §2.7 name each staged record's building volume: SkyIsland → V05; Tunnel, UndergroundSystem, Gallery, Chamber, UndergroundLink → V04; ConditionOverlay, DepositSite, PowerRelation, HistoryHint, the dossier-backed Person → V08; BuildingGenerator.compose → V02; BuildingGenerator.plan and the plan records → V03 (MW-01, MW-02) |
| W-PKG-01 | package-undeclared | minor | V10, scope | @plat/cli | V10 §1b.2 and §2 name the base's headless CLI in `@plat/api` (§14) as the host of `plat clerk`, or §14's package list gains `@plat/cli` with its dependency rule; no f item places `@plat/cli` today |
| W-TEST-01 | untested-failure | major | V01 | F-TEMPLATE, F-DISPATCH, F-UNIT (V1-3.13, BCR-18) | V1-3.13's failure table gains §5.2's 'how it is tested' column and BCR-18 carries it: F-TEMPLATE → the T-V1 bars that already exercise its rungs; F-DISPATCH → a T-V1-11 / T-V1-12 clause forcing an unmet quota to roll and a household-less manor block to revert; F-UNIT → a T-V1-20 clause on an outline below 4 × eLo² scaled up with its bend line |
| W-EDIT-01 | edit-no-tool | major | determinism, V09, V10 | §7.1's twelve-tools table vs the 70 EditEvent kinds | CLOSED by DXC-04 / E-04 (one binding table at §7.1). |
| W-FLD-01 | dangling | major | kernel | KernelTx.expect, KernelTx.onFail | §3.3 defines who sets `expect` (StageDecl.invariants, the caller's class floors), which op checks it at commit (returning E_BELOW_MIN_AREA / _WIDTH / _ANGLE) and what each `onFail` value does (reject: return the code; repair: §5 local repair on the overlay; downgrade: the stage's ladder rung), each consumer named in §5.1-§5.2 (KWG-03) |
| W-FLD-02 | orphan | minor | kernel | CommitRecord.edgesAdded, edgesRemoved, steinerAdded, steinerDissolved, work, owners | §3.3 names each reader (§5.4's kernel counts; §13.2's cost-model test for `work`; §7.3's locality closure or §8.1's dirty set for `owners`) or drops the fields (KWG-05) |
| W-FLD-03 | orphan | minor | pipeline | Reservation.compactnessMin | §4.2 S3 states that a claim's compactness floor is its reservation's `compactnessMin` (the castle's 0.75, which S3 (10) and F-CASTLE state as a constant today; none for the other kinds), or §2.5 drops the field |
| W-FLD-04 | orphan | minor | model | ContextVector.rosterAssignment | CLOSED by MC-08 (rosterAssignment's producer S10b and readers named). |
| W-FLD-05 | orphan | minor | model | Enceinte.walkCm | §2.7 names the reader of the wall walk's width (§11.1's VTT and glTF wall tops, or §8.3's close-up wall symbol) and S7 as its writer, or drops it (thicknessCm and heightCm are read) |
| W-FLD-06 | orphan | minor | model | Recipe.presetId | §2.9 names the reader of this provenance field (the recipe panel's or the report's 'made from preset …' line) or drops it |
| W-FLD-07 | orphan | minor | pipeline | Intent.wealthGradientCdeg | §4.5's prosperity field lists the gradient's bearing as a directional driver (its weight and default in the driver table), or §7.7 drops the field |
| W-FLD-08 | orphan | minor | V07 | VillagePlan.formSource, roadsSource | V07 §2.3 names their reader (V10's why for the village form and road topology; the re-derivation that keeps an 'edit' or 'dossier' source through an epoch) or drops them |
| W-FLD-09 | dangling | minor | pipeline | District.venueMix | §4.5 names its producer (the district's use mix computed at S12c and at each epoch's character step); its readers — §4.10's description, the context vector, II.1's DistrictContext — are named (MW-04) |
| W-FLD-10 | orphan | minor | scope | CorpusMap.populationEstimate | §13.9 (or V12's corpus stage) names its reader (the rung a corpus map is compared at) or drops it |
| W-FLD-11 | orphan | minor | V09 | LocalDocRecord.appVersion | V09 §2.11 names its reader (as DraftMirror.appVersion is read at open: a record from a newer app opened read-only) or drops it |
| W-FLD-12 | orphan | minor | V10 | Segment.promptTokens | V10 names its reader (the context-budget rule that opens a new segment or compacts as the last prompt nears the window) or drops it |
| W-FLD-13 | orphan | minor | model | Block.depthClass | §2.5 names its producer (S10's depth band of the block, §4.7) and reader (the granularity rows, S11), or drops it (MW-03, MW-04) |
| DWG-01 | dangling | major | determinism | the bug abort's outcome and its stream key field (§5.1, §5.4) | §5.4 gains a bug/abort list (class, entity, stream key, stage) and §5.1 states the outcome of a bug abort (e.g. the batch rolls back and its entity takes the class's last rung, reported), with a test in §13.1. |
| DWG-02 | dangling | minor | determinism | type Diff undefined (§5.4, §14 migrate) | Define Diff once (its fields: requested value, built value, reason) at §5.4, and name §7.5's diff shape (entities changed, orphans, changed confirmations, statistics deltas) as the same or a separate type. |
| DWG-03 | dangling | minor | determinism, V11 | reroll.maxAdvance, crossing.searchBandM called table values, no table row | CLOSED by W-SET-01 (the base settings row). |
| DWG-04 | orphan | minor | determinism | GenerationReport.stages[].attempts: no producer rule, no reader | State what it counts and who reads it (the report panel, §13.2's cost tests), or drop it (ladderUses already records every retry). |
| DWG-05 | dangling | minor | determinism | §6.3 anchor rows missing for re-derivable kinds (yard parts, Frontage, Corridor, Castle, decorations, institutions) | Add their anchor rows (or state that they are re-derived without succession, their references carried by a named rule). |
| KWG-01 | orphan | minor | kernel | W_STEINER: no producer, no reader | Name its producer (e.g. booleans/buffers placing Steiner points on existing edges, beside CommitRecord.steinerAdded) and its reader (§5.4 report), or remove the code. |
| KWG-02 | dangling | minor | kernel | W_ATTRACTED read, never emitted | §3.6 step 2: 'each attracted vertex is reported W_ATTRACTED'. |
| KWG-04 | orphan | minor | kernel | E_HOLE_CONTACT, E_BELOW_MIN_*, E_NON_CONVEX: no §5.2 consumer | §5.2 detection columns name the codes (F-CUT: E_NOT_TWO_CROSSINGS, E_HOLE_CONTACT, E_BELOW_MIN_*; an inset caller's row: E_NON_CONVEX -> offsetFace). |
| KWG-06 | dangling | minor | kernel, V11 | dynamic grid cell sizes called table values, no table row | CLOSED by W-SET-01. |
| KWG-07 | interface-no-caller | minor | kernel | kernel services whose callers name them only by description (offsetFace, hexLattice, sampleProfile …) | Consumers name the op at their home (§4.3 hexLattice, §4.7 S11 offsetFace); internal-only services are marked internal in §3.4. |
| KWG-08 | untested-failure | minor | scope | the frame-growth re-grid trigger's measurement not scheduled (§16 M4 or §12.8) | §16 M4 exit (or §12.8) lists the extreme-growth memory measurement that selects the path. |
| KWG-09 | orphan | minor | kernel, model | the 16-bit binary angle quantum: no consumer | REMOVE with ruling E-15 (the 16-bit binary angle has no consumer; centidegrees is the one angle unit). |
| MW-05 | dossier-unreached | minor | model | §2's dossier paths do not cite §7.7 item 1's ignore-list | Dossier consumption in §2: Identity.dossier, Document.dossier (binding, carried), the dossier paths table (§2.8), District.identity (source dossier), Plot/Building/Institution.knownTo (dossier fact), Institution.concealment/powers, Use.concealment/concealmentSource, Way.to (TradePartner key, item 77), Recipe.seed (item 85), Recipe.history (HistoryHint, item 88), the staged records (item 88), the dossier-backed Perso… |
| WG-PIPE-02 | interface-no-caller | minor | pipeline | S1 (9) drainage: readers not named | Name the readers at S1 (9) by reference. |
| WG-PIPE-03 | orphan | minor | pipeline | SupplyEdge.substitutes: no reader | State that need propagation reads substitutes (a substitute resource satisfies the edge) or remove the field. |
| WG-PIPE-04 | edit-no-tool | minor | pipeline | the folk-contraction event: no declaration, lifecycle row, tool or undo | Declare it (a naming event kind with its §7.4 row and its tool) or remove the clause. |
| WG-PIPE-05 | interface-no-implementer | minor | pipeline | named strategies without signatures (TerrainStrategy … VillageStrategy) | Give each a signature at its home (§4.12 or §14), or state that §14 declares them. |
| WG-PIPE-06 | orphan | minor | pipeline | FarmTable.householdsPerFarmstead: reader not named | State that S2 demands householdsPerFarmstead × farmsteads farm households (and that perimeter and rivers house them in town). |
| WG-PIPE-07 | dangling | minor | pipeline | SewerStrategy's declared inputs lack Features.sewers (II.6 vs II.7.2) | Add Features.sewers to II.6's declared inputs (one list, cited by II.7.2). |
| WG-PIPE-08 | edit-no-tool | minor | pipeline | the 're-derive people' action: no edit kind, tool or lifecycle row | Name its §7.1 edit kind and §7.4 row (or cite §7.5's pattern as its home). |
| WG-PIPE-09 | dangling | minor | pipeline | births and deaths named as epoch events with no kind (declare, or cite V06's kinds) | Declare the kinds (or state they are V06's own kinds, WIRED-BY V06). |
| WG-PIPE-11 | dangling | minor | pipeline | class-mix and significance rows for lean_to_shelter and cottage missing | Add the missing default cells. |
| WG-PIPE-12 | dangling | minor | pipeline | types used by interfaces and declared nowhere (DistrictContext … EditRef) | Declare each at its home (§14's type list, or the unit that owns it), or state that it is one of §14's opaque handles. |
| RWG-01 | dangling | major | rendering | PinnedPlacement.dirCdeg and lines never reach LabelTable (pinDirCdeg, pinLines) | Add `pinDirCdeg` (Int32, 4 B) and `pinLines` (Uint8, 1 B) to LabelTable, written by S14 from LabelEntity.pinned and read by the pin pass (the row stays within its 97 B bound: 89 + 5 = 94 B). |
| RWG-02 | dangling | major | rendering | seven roles and every @night / @autumn variant have no shipped value | Give each family's values (or a stated derivation rule, e.g. @night = f(day value)) at the role-value table's home, and add the pairs the matrix must check (e.g. snow / road, grid / paper). |
| RWG-03 | dangling | major | rendering | no threshold stop per band and no anchor for m_k | State m_k (e.g. m_0 at 1:50 000 at 96 CSS px per inch, m_k = m_0 · 2^(-k/4)) and each band's entry stop in §8.8 (the canonical home of the stops), read by §8.5's hysteresis and §9.2. |
| RWG-04 | dangling | minor | rendering | StyleSheet field types never declared (DetailBudget, LabelStyle, ThematicRow, PostOp) | Declare each type at §8.2 with its reader (DetailBudget: what it caps, read by S14 or the raster, tested by a census row) or remove `budgets`. |
| RWG-05 | orphan | minor | rendering | family graphic, tintKey, castsShadowOnto, FieldRaster meaning custom, outlineMix: never consumed | Name each one's producer and consumer (e.g. `tintKey` written by S14 from the district colouring, read by the `tint` program) or remove it with a ruling. |
| RWG-06 | hook-one-ended | minor | rendering | LayerSpec.exportSeparately read by no §11.1 row | §11.1 states which exports read exportSeparately (and what they do when it is false), or II.7.1 drops the clause. |
| RWG-07 | hook-one-ended | minor | pipeline, rendering | live.people registered by the simulation module: §10.3 never registers it | §10.3 names the provider live.people, its registration through §14's LiveLayerProvider registry and the occupancy it reads. |
| RWG-08 | dangling | minor | rendering | the render-tag table never enumerated; seamClose has no carrying record | One render-tag table at §8.1 item 5 listing every tag and its reader; name the seamClose field (registry row or StyleSheet.symbols) and its writer. |
| RWG-09 | untested-failure | minor | rendering | gate and pier symbolisation rows have no census row | Add the gate gap / block size and the pier width to §8.3's MFCG-width row (MFCG's gate blocks ≈ 12 px, pier 3.9 px at size 40). |
| V01-WGAP-1 | hook-one-ended | minor | V01 | the skeleton export row lacks a quarter's terrace | Add terrace (and setAttr(D.terrace)) to the skeleton export row. |
| V02-WGAP-1 | dangling | minor | V02 | literal style values with no style-sheet cell | Name each as a §8.2 style-sheet cell (or a §8.10 row cell) with its value there. |
| V03-WGAP-1 | hook-one-ended | minor | V03 | the crypt section provider lives only in IN-V03-1 | Add the crypt section provider to §1b's Interfaces table and §4.6 (with its keys) and extend T-V3-12 (or add a clause) to cover it; fold IN-V03-1 into the body. |
| V04-WGAP-2 | untested-failure | major | V04 | closure combinations (fade seal of a last access; bricked then undone; unexcavated reload) untested | Add bars: fade-seal of a last access vacates in the batch and a reopen (reopen op or new dig) lets dwellings return at the next placement; bricked-then-undo restores dwellings byte-identically; a saved document with unexcavated clusters reloads with the same excavation reading. |
| V04-WGAP-3 | dangling | minor | V04 | W_RUIN_SOURCE_REMOVED absent from BCR-41's list | Add W_RUIN_SOURCE_REMOVED to BCR-41's list (f item 558). |
| V04-WGAP-4 | dangling | major | V04 | Chamber.gradeFaces read by V03, produced nowhere | Home the field: add Chamber.gradeFaces (or a derived gradeFaces(chamberId) reader, as ruinColumns is) to V04 §2.2 / BCR-46 with its producer (the reconcile's two open faces), lifecycle row and test; V03 §3.12 (9) then cites it and drops 'until volume 4 records its marks'. |
| V05-WGAP-1 | hook-one-ended | major | V09 | the offset-occlusion un-displacement of sky hit tests has no V09 end | V09's hit-testing section states the un-displacement (world point less elevation × offsetPerMetre) for sky hits and tool points, citing V05 §4.2; or the base §8.4/§9 owns it. |
| V05-WGAP-2a | hook-one-ended | major | V09, V05 | the island bend lines (keeps room; the rim stops here) have no bend.* message rows | Add both lines to V09's bend.* message rows and V10's bend category (J-VI.4), citing V05 §4.2. — the V09 part |
| V05-WGAP-2b | hook-one-ended | major | V10, V05 | the island bend lines have no clerk bend rows | Add both lines to V09's bend.* message rows and V10's bend category (J-VI.4), citing V05 §4.2. — the V10 part |
| V05-WGAP-3 | orphan | minor | V05 | IslandInstitution.near richest, IslandShadeStrip.cells/.evaluated, SkyIsland.removed.generated: no reader | Name each reader (or drop 'richest' from the enumeration and cells/evaluated if unread), per principle (7). |
| V06-WGAP-1a | hook-one-ended | major | V09, V06 | the lone-neighbourhood bend line has no V09 message row | Add the line to V09's bend.* rows and V10's bend category, citing V6 §4.1; mark X30 met. — the V09 part |
| V06-WGAP-1b | hook-one-ended | major | V10, V06 | the lone-neighbourhood bend line has no clerk bend row | Add the line to V09's bend.* rows and V10's bend category, citing V6 §4.1; mark X30 met. — the V10 part |
| V06-WGAP-2 | hook-one-ended | minor | V06 | hand-off rows X1-X49 without a closure mark (X30 open) | The seam checkers verify each X row at its destination; the Assemble seat deletes closed rows and keeps none open. |
| V07-WGAP-1 | dangling | major | V07 | rule constants in prose with no village.json cell (T-V7-44 fails on the volume) | Add the cells (palisade.denseDialFrom, formRules.organicDialFrom, formRules.districtDensity, palisade.pullM, palisade section widths, perimeter closeM) or cite existing ones; (9v) reads the polyfocal rule. |
| V07-WGAP-2 | orphan | minor | V07 | density.bandWeight, network.slack, network.emptyDensity: read by no step | Either write each cell into the step that reads it (q weighted by bandWeight; the reader of slack and emptyDensity named in §3.5) or delete the three cells from the interface, the defaults row and the VG column. |
| V09-WGAP-1 | hook-one-ended | minor | V09 | item 113 (e)'s LOST void has no V09 consumer | Name V09's consumer of the LOST state (legend line, panel line 'Once known; its way in closed in {year}', tier rule) when V04 writes item 113 (e); canon routes the part. |
| V09-WGAP-2 | hook-one-ended | major | V09 | integration notes IN-V09-4/5/6/7/11 absent from the body | Fold each note into its body home at build depth (toolkit rows, HandleSet kinds, binding rows, panel lines, BCR-V9-31 (a)) and resolve the two contradictions by the note (J-VI.17 is the integrator's ruling); then drop the notes. |
| V10-WGAP-1 | dangling | minor | V10 | islet size, the fill ring and the green's 24-gon outside clerk.content | Add islet sizeM2 and the scope ring's sides to clerk.content.encoders (with provenance), and have the green read encoders.ringSides. |
| V11-WGAP-1 | hook-one-ended | minor | V11 | registry row 50 (era) omits V07's reading stage | Add V07's reading stage (VS8) to row 50's readers; derive W19's consumer list from row 50 instead of restating it. |
| W-SET-01 | dangling | minor | V11, determinism, pipeline, kernel | values the base calls table values with no table row: reroll.maxAdvance (3, §5.1 (6)), crossing.searchBandM (120 m, §4.2 S1 (5), §6.3), the… | canon (DXC-05) |

## Elegance — UNIFY with the equivalence list, or KEEP APART with the nuance that separates

An editor applies a UNIFY ruling exactly as written and ticks every equivalence item at its new home; a verifier checks each item against the archive (a blur is a blocker). No other unification is made.

### E-01 — UNIFY: Stretch-state profiles on chains: RetainingWall.state (file f item 245) and Enceinte.condition (file f item 575) — the same knot-profile mechanism written twice ('exactly as item 245's').

* **Unified form:** One 'stretch-state profile' rule stated once at §2.2 rule 5 (the knot-profile rule): a ChainProfile<S> of a state enum on a chain, its canonical form, writers over a StretchRef, carry through re-derivation, cut and join, undo and migration; each record states only its value set, knot role, absent default, writers and readers.
* **Home:** §2.2 rule 5 (model). **Units that change:** model, V06, V05, V07.
* **Equivalence list:**
  * canonical form: an open chain keeps a knot on its first vertex; a closed chain needs none; drop a knot equal to the one before it (never an open chain's first-vertex knot); all-equal profile stored as the scalar; scalar default (`standing`) stored as absent
  * write: near knot carries the new state, far knot the state held before; an end that is no vertex placed first by splitThrough (§3.4); a writer naming no stretch writes the whole chain
  * read: sampleProfile by arc length (§3.4), cyclic on a closed chain
  * regenerate: a knot stays on its vertex while the vertex survives (carry-over by lattice point, §3.10, §6.3); a knot whose vertex is gone is re-placed by splitThrough at the new chain's nearest point within retaining.settings.stateSnapCm (V11, 100 cm; both records read this one cell, as item 575 states 'exactly as'), else dropped and its run merged into the run before it; an open chain's first-vertex knot always re-placed on the new first vertex
  * cut or join: carried by J-K23's rekey pairing
  * undo: the writing op's undo record restores the former profile, knot rows included
  * migrate: absent reads the default; a pre-round-2 scalar reads as the constant profile
  * RetainingWall keeps: values standing|decayed|ruined; knot role retaining_state_knot; writers BCR-V6-26's retaining member (breach → decayed, dismantle → ruined), repairRetaining, V05's landfall (decayed), V07's house-platform walls through V06's pool; restoration writes standing over the re-levelled length; readers V06 §3.19.4, V04 footings, the renderer, item 447's export, the clerk
  * Enceinte keeps: values standing|breached|dismantled; knot role wall_state_knot; writers DeclineOp breach/dismantle, V05's landfall (breached), V06's repairWall; the record's lifecycle rules (abandoned on neglect; decayed while any run is not standing; lifted by the no-stretch repairWall per V6 §2.8); §8.2's decayed row draws gap glyphs on breached runs and dismantled towers as trace discs; §11.1's wall LineStrings split per run with id and run

### E-02 — KEEP APART: Removals that hold: LifecycleEvent.detail.suppress (raised ways, harbour chains, quay walls, retaining walls, deck plots) vs V05's live SkyIsland record in state removed with removedAccesses (V06-ELEG-1).

* **Home:** file f item 260 (§2.8) states the one lift rule for both. **Units that change:** V05, V06, model.
* **Kept apart because:** An island's removal holds a count-law slot counted as filled and keeps an archived arena part and its households for undo (J-V5.62): a live record with state is needed; a suppression key on a delete event cannot hold an arena. The lift rule (undo, or the user's own re-add serving the same key; a cap increase opens only new keys) is already one (f item 260) and is stated once there.

### E-03 — UNIFY: The fixed-key existence draw of the underground (V04-ELEG-1): the catacomb source, the overlap shaft, the crypt join, the dig and the public opening each restate 'one uniform on the sewer stream keyed by the thing's own lineages with no epoch component, fixed by its key, never re-drawn, re-compared…

* **Unified form:** One 'fixed-key draw' pattern stated once in §6.1 (streams): a draw keyed by (stream, the subject's lineage key parts, concern) with no epoch component, fixed for the subject's life, compared at each named moment against a chance that may rise; the subject exists from the first moment the chance exceeds the draw. Each site cites it and states only its stream, key parts, chance source, comparison moments and persistence.
* **Home:** §6.1 (determinism); V04 §3.12 keeps its exception list. **Units that change:** determinism, V04.
* **Equivalence list:**
  * catacomb source: re-compared against CITY's chance when the rung rises
  * overlap shaft: its own key and chance row
  * crypt join: the own/other chance split kept
  * dig: a made access persists; 'appears when the chance later rises' kept
  * public opening: its candidate order (V04 §3.5.7 (e)) kept
  * §3.12's exception list kept verbatim as the pattern's exceptions

### E-04 — UNIFY: The event → tool binding: §7.1's partial twelve-tools table, §7.4's create-column tool names and V09 §4.3's table (DEL-06, DXC-04).

* **Unified form:** One binding table at §7.1 keyed by (event kind, target class or path) → home tool; §7.4 cites tools by id; V09 §4.3 keeps screen and gesture columns only.
* **Home:** §7.1 (determinism). **Units that change:** determinism, V09, V10.
* **Equivalence list:**
  * every EditEvent kind (70 base + the volumes' added kinds) has a row
  * history kinds (undo, redo, rebase, upgrade, epoch, closeup) marked with their producer
  * V09's per-target homes kept (split/merge at T5 for districts, T9 for ways and plots; delete at T10 and T9 for access points and galleries; instance at T6, T8, T9)
  * T-V9-12 checks completeness over the pairs

### E-05 — UNIFY: The table registry: §7.6's prose enumeration (about 60 tables) vs V11 §3.1's registry rows (DEL-09, DXC-05; file f item 379).

* **Unified form:** V11 §3.1 is the registry (one row per table: readers, slice kind, extension and presets); §7.6 cites it.
* **Home:** V11 §3.1. **Units that change:** determinism, V11.
* **Equivalence list:**
  * every table §7.6 names has a registry row (T-V11-1 fails the build otherwise)
  * readers per table as V11 §3.1 states them, unioned with §7.6's and V11 §1b's (V11-ELEG-1)
  * base table values the base calls table values get a row (W-SET-01)

### E-06 — UNIFY: The concern registry of §6.1: about 70 concerns across six prose paragraphs (DEL-01).

* **Unified form:** One table: id, kind (geometry or not), rerollable, attempt cap (as an index, DIC-02), keyed by (the keying sentence as its cell), readers, retired (ids reserved).
* **Home:** §6.1 (determinism). **Units that change:** determinism.
* **Equivalence list:**
  * each concern's keying sentence kept as its cell
  * retired ids reserved and listed
  * every attempt cap restated as an index without changing the number of draws (DIC-02)
  * the amendment narration removed (DIC-12)

### E-07 — UNIFY: Refusal and bend causes of the dry run: F-EDIT's detection and action columns restate about 25 causes from §7.1, §7.3, §7.4, §7.5, §7.7 (DEL-02), while item 101 R2 / J-VI.4 / J-VI.30 made most of them bends.

* **Unified form:** One dry-run outcome table at §7.1: cause, detection, outcome (refused — only a dossier fact or a lock; else bent), the bend's target or the refusal's offered action, the message key (V09 §4.9), home. §5.2's F-EDIT row cites it.
* **Home:** §7.1 (determinism). **Units that change:** determinism, V09, V10.
* **Equivalence list:**
  * each case's offered alternative stays its own row
  * the dossier-owned refusal (§7.7 item 11) and lock refusals are the only refusals
  * file f item 582's three bends (no site, over budget, occupied join or split) as rows
  * V09's bend.* and refuse.* keys map one to one

### E-08 — UNIFY: Rename {id, from, to} (§7.1) and ReportEntry's rename variant {id, from, to} (§5.4) (DEL-03, first half).

* **Unified form:** One type `Rename` declared in §7.1, used by §5.4's ReportEntry.
* **Home:** §7.1 (determinism). **Units that change:** determinism.
* **Equivalence list:**
  * same fields and meaning

### E-09 — KEEP APART: DisruptionReport.moved {use, from, to ¦ null} vs ReportEntry relocate {use, from?, to?} (DEL-03, second half).

* **Home:** §7.3 and §5.4 as they stand. **Units that change:** determinism.
* **Kept apart because:** Optionality differs: a disruption report always knows the origin and marks a vacate by to = null; a report entry may lack either end. One type would blur absent and null.

### E-10 — UNIFY: Tables in disguise inside §7.4 and §7.5: the world-point records under a warp (seven kinds in one sentence) and the schema transforms (two paragraphs) (DEL-07, DEL-08).

* **Unified form:** Two tables: (record, host face, clearance, re-seat, orphan rule) in §7.4; (record or field, older-document default, first-load derivation, source item) in §7.5.
* **Home:** §7.4, §7.5 (determinism). **Units that change:** determinism.
* **Equivalence list:**
  * the door light's ring-edge fraction rule a row
  * Works' rings never re-seated a row
  * 'none is invented' cases stay rows

### E-11 — UNIFY: Restated rules inside the determinism part: the dossier-owned refusal (six places, DEL-04), 'no undo target' for creation events, dossier events and epochs (seven places, DEL-05), §5.3 rows restating their rules' homes (DEL-10).

* **Unified form:** One home each (§7.7 item 11; §7.4 Replay semantics; each §5.3 row states only its check and scope and cites the rule's home).
* **Home:** §7.7, §7.4, §5.3. **Units that change:** determinism.
* **Equivalence list:**
  * §5.3's scope and check columns stay §5.3's

### E-12 — KEEP APART: Three shapes for 'the op met locked or pinned content': E_LOCKED, clearFiner's Conflict[], the warp's held set (KEL-01).

* **Home:** §3.1, §3.4, §3.6 as they stand. **Units that change:** kernel.
* **Kept apart because:** Outcomes differ: E_LOCKED fails the op; clearFiner reports and clears the rest; a warp holds the vertex (field zero) and succeeds. One record would blur fail, report and hold.

### E-13 — UNIFY: E_DEGENERATE's detail vocabulary scattered over §3.1's comment, the OBB row and §3.7 (KEL-02); the degenerate contracts of OBB/hull and regularFit stated two or three times (KEL-03).

* **Unified form:** One detail table under KernelError (§3.1): detail value (stretch, seed, fixed, overlap, fit, collinear, empty, collapsed) → op → meaning; each contract stated once at its op.
* **Home:** §3.1 (kernel). **Units that change:** kernel.
* **Equivalence list:**
  * every detail value with its op kept
  * each op's contract text kept once

### E-14 — UNIFY: Restated kernel rules (KEL-04, KEL-05): the rebuild threshold max(256, ¼ of static size), the placement bound, 'moves keep nothing'; §3.5's failure table restating mechanisms.

* **Unified form:** One home each in §3.3/§3.6/§3.10; §3.5 becomes a traceability table of pointers.
* **Home:** §3 (kernel). **Units that change:** kernel.
* **Equivalence list:**
  * every value kept once

### E-15 — UNIFY: Two angle quanta: centidegrees and a 16-bit binary angle with no consumer (KEL-06, KWG-09).

* **Unified form:** The 16-bit binary angle is removed (no producer's output is read, no consumer anywhere in the set: an orphan, principle (7)); centidegrees (Cdeg, §2.1) is the one angle unit.
* **Home:** §2.1 / §3.2. **Units that change:** kernel, model.
* **Equivalence list:**
  * every angle that is read is in Cdeg already

### E-16 — UNIFY: `tint` and `vignette` each name a paint program and a post operation (REL-01); the role `lights` vs `light` (REL-05).

* **Unified form:** One name per mechanism: paint programs keep `tint` and `vignette`; the post operations are renamed `wash` (a whole-tile tint after the light, including the condition overlay's settlement-wide tint) and `edgeFade` (the view's vignette); the role `lights` is renamed `glow` (the program it feeds).
* **Home:** §8.2 (rendering). **Units that change:** rendering, V04, V05, V09.
* **Equivalence list:**
  * a program runs per mark in its slot; a post operation once per tile base after the light
  * the painterly family's spotlight vignette is the `vignette` program
  * the two roles' distinct uses kept (glyph tone vs glow sprite)

### E-17 — UNIFY: The knowledge admission re-stated at each reader: labels §9.2, legend §9.5, thematic rows §8.2, exports §11.1, the API §11.2 (REL-02).

* **Unified form:** One admission function at §9.2 with its readers listed; each reader cites it.
* **Home:** §9.2 (rendering). **Units that change:** rendering, V08, V09, V10.
* **Equivalence list:**
  * the band each reader admits at kept: its view's band, the export's band, or the city band when band-less
  * V09's admitAs (J-V9.86) and V10's filtered dry runs cite it

### E-18 — UNIFY: §12's ≈ 25 measurement-and-fallback clauses share one shape (REL-03).

* **Unified form:** One budget table: budget, measuring milestone and suite, pass bar, pre-decided fallback, report, owner veto.
* **Home:** §12 (rendering). **Units that change:** rendering.
* **Equivalence list:**
  * every bar, milestone and fallback value
  * D-18's owner-veto declarations
  * the per-rung laws

### E-19 — UNIFY: Restated rendering facts (REL-04, REL-06): §11.3's per-viewer key list re-enumerating §2.9; surfaceTopCm, every caster, rungs 1–2 albedo, never-lit overlays, light host, band-less admission, fixed sun, canvas formulae, the 24-B index, sizes, copies, port refusal, one-way rule, transient list each s…

* **Unified form:** One home each; §11.3 reads 'every view key of §2.9 travels as view.set / view.changed except the pointer and `underlay`'.
* **Home:** §8–§12. **Units that change:** rendering.
* **Equivalence list:**
  * `time`'s sim.advance and the host's `week` exceptions kept

### E-20 — UNIFY: Three copies of the owner-item bar convention in §13.2 (EL-01) and every 'no-op pin' bar of the owner items (102 (g), 103 (f), 105, 106, 110 (f), 111 (d), 113 (g)).

* **Unified form:** One convention paragraph in §13.2 ('hard unless banded; tier from §13.8; from the milestone §16 names; a staged engine's bars on hook fixtures until the engine lands; every no-op pin a NoOpPin registration on V12 §3.7.8's engine reading V11 §3.24.0's off form') cited by every group.
* **Home:** §13.2 (scope). **Units that change:** scope, V11, V12.
* **Equivalence list:**
  * the owner-rules copy's registry path-test list for amendments c
  * the declared-shift clause for goldens
  * each item's off-form cell values (V11 §3.24.0) and its bar id

### E-21 — UNIFY: §13.8's two tier-schedule paragraphs and §16's per-milestone T-lists (EL-02).

* **Unified form:** One schedule table (test id or range → CI tier → first milestone) in §13.8, cited by §16's exits.
* **Home:** §13.8 (scope). **Units that change:** scope.
* **Equivalence list:**
  * every range's tier and first milestone exactly (T28-12's wings clause from M3a, its plan clause from stage 3's intake)

### E-22 — UNIFY: §0.2's three landing tables (items 1–7; 8–31; 32–72 and 101) (EL-03), which must also land files g and f (CO-05).

* **Unified form:** One landing table (item, home, clause map), with rows for g items 102–113 and a pointer row for file f's items 200–585 by section.
* **Home:** §0.2 (scope). **Units that change:** scope.
* **Equivalence list:**
  * every clause-map cell kept

### E-23 — UNIFY: §13.9's re-signing lists (4), (5), (7) split by amendment round (EL-04).

* **Unified form:** One list of calibratable table families.
* **Home:** §13.9 (scope). **Units that change:** scope.
* **Equivalence list:**
  * 'dossier row sets are not re-signed' kept

### E-24 — UNIFY: Superseded or amended decisions marked inline in many forms across the set (EL-07, SCOPE-C02, V01-ICONF-3, V04-ICONF-2, V09-ICONF-5).

* **Unified form:** One mark on the decision row: 'superseded by X' or 'amended by X', in the Judgment-calls index and in every volume's §9.
* **Home:** the index (scope) and each volume's §9. **Units that change:** scope, V01, V02, V03, V04, V05, V06, V07, V08, V09, V10, V11, V12.
* **Equivalence list:**
  * no row dropped
  * the governing row keeps the reason

### E-25 — UNIFY: FtgSize enumerations (EL-08, SCOPE-C10).

* **Unified form:** One type FtgSize in §13.5.
* **Home:** §13.5 (scope). **Units that change:** scope.
* **Equivalence list:**
  * 'CITY' (FTG's timed CITY preset) stays expressible

### E-26 — KEEP APART: D5Pair's FTG arm vs FtgCapture (EL-09).

* **Home:** §13.6, §13.5. **Units that change:** scope.
* **Kept apart because:** D5Pair carries platSeed and suburbFrame, which FtgCapture lacks; a reference would lose them.

### E-27 — UNIFY: The valley's plan reach defined twice: facadeBays' integer e and roofscape's float e (V02-ELEG-1).

* **Unified form:** One definition valleyReach(X, Y) with two arithmetic modes: integer (bays; byte-identical on every host, T-V2-13) and float64 (drawing; view data).
* **Home:** V02 §3.7. **Units that change:** V02.
* **Equivalence list:**
  * the integer form's byte-identity
  * the float form's view-only status

### E-28 — UNIFY: PlanReport.warnings.code mixes W_ codes with lowerCamel names shrineOneRoom, solidMonument, stackCarried (V03-ELEG-1).

* **Unified form:** Split notes from warnings: PlanReport.notes carries the three camelCase ids (the same ids V10's why causes read, CVR-V10-9); warnings.code holds W_ codes only.
* **Home:** V03 §2.3. **Units that change:** V03, V10.
* **Equivalence list:**
  * same producer and readers
  * the three conditions reported as notes, not lost

### E-29 — UNIFY: basementDoor(b) and stackAccessDoor(b, a) share a geometric core (V03-ELEG-2).

* **Unified form:** One helper stated once in V03 §3.7.1: candidate door runs at least two moduleCm long, a two-module span, the nearest-point slide, ties toward the first vertex; both functions call it and keep their own rules.
* **Home:** V03 §3.7.1. **Units that change:** V03, V01.
* **Equivalence list:**
  * basementDoor's three ordered rules (wall walk-out, tomb door, fall walk-out), its crypt-vault clause from M6-U, null unless access is external
  * stackAccessDoor's approach-strip clearance, the non-stair wing preference and its reported fallback
  * both pure, draw-free, of eager records, in @plat/plots at M3a, read by V01's entrance reserve

### E-30 — UNIFY: Cross-table reference cells {ref: {table, row, cell}} defined for village.json only (V07-ELEG-1).

* **Unified form:** Lifted into §7.6 as one reference-cell form for every table, with its compile check (V11's compiler resolves it) and editTable inverse and undo row; V07 §2.2a cites it.
* **Home:** §7.6 (determinism); V11 compiler. **Units that change:** determinism, V11, V07.
* **Equivalence list:**
  * the compile check (a reference to a missing row fails the build)
  * editTable's inverse and undo row
  * V07's existing references to V11 §3.6.1, §3.24.1, §3.24.4 expressed in the one form

### E-31 — UNIFY: The toll-bridge watercourse rule written twice with different shapes (V08-ELEG-1): V08 §2.6b (3) at base rungs and V07 §3.1 (1), §3.11 DR1 at village rungs.

* **Unified form:** One rule at V08 §2.6b (3) (the DR row's home) with a rung column; V07 cites it.
* **Home:** V08 §2.6b (3). **Units that change:** V08, V07.
* **Equivalence list:**
  * geometry by rung: base — the brook crosses the through route of the longest approach inside the frame; village — the course between the two frame arcs the through road's entries divide, the topology raised to through
  * coastal dry site by rung: base — a brook; village — an estuary
  * failure → toll_bridge_dry at every rung on any of: a desert with no oasis_water and no river the arid row draws (g item 111); relief that cannot carry the brook; a fixed isolated or none access word — the union of both volumes' failure conditions, each now defined at both rung ranges (principle (11))

### E-32 — UNIFY: Two catalogue sentences for the clerk being unreachable (V10-ELEG-1).

* **Unified form:** One row, refuse.clerk.offline; error.clerkOffline is retired (V9 §3.14 routes an unreachable clerk to refuse.clerk.offline; no producer emits the other).
* **Home:** V10 §3.16 / V09 §4.9. **Units that change:** V09, V10.
* **Equivalence list:**
  * same condition, same user outcome

### E-33 — UNIFY: ClerkHarness, a type alias of ClerkHandle with no member of its own (V10-ELEG-2).

* **Unified form:** ClerkHandle everywhere; the alias is dropped.
* **Home:** V10 §2.6. **Units that change:** V10, V09.
* **Equivalence list:**
  * createClerk(mount) returns ClerkHandle

### E-34 — UNIFY: Each table's readers stated three times in V11 (W rows, §2.10's read cells, §3.1's registry) and item 110's lifecycle rows repeating one pattern (V11-ELEG-1).

* **Unified form:** §3.1's readers are the single source; §1b and §2.10 cite the row number; item 110's tables share one lifecycle pattern row with per-table exceptions.
* **Home:** V11 §3.1, §2.10. **Units that change:** V11.
* **Equivalence list:**
  * the union of every reader listed today (W19's V07 pump date added to row 50, V11-WGAP-1)
  * each table's exceptions to the pattern

### E-35 — UNIFY: V12's producers and consumers of each record stated in §1b and §2.11 (V12-ELEG-1).

* **Unified form:** §2.11's lifecycle table with a consumers column is the one table; §1b cites it.
* **Home:** V12 §2.11. **Units that change:** V12.
* **Equivalence list:**
  * every producer and consumer listed today

### E-36 — UNIFY: Soft terms of the owner items (102 sunlight, 103 families and coverage, 105 supply links, 107 balance, 111 water pull) each restate the same contract clauses.

* **Unified form:** One 'soft terms' contract at §4.5 (cited by §4.7 S10b): a soft term declares its weight cell (a §7.6 table value), its kernel, its no-op pin (weight 0 → byte-identical), its bar, and yields to dossier facts, assignments, pins and locks; the field's controlled chance applies. Each item states only its own kernel, weight and specific limits.
* **Home:** §4.5 (pipeline). **Units that change:** pipeline.
* **Equivalence list:**
  * item 102: at full all-day shade about a tenth of a band; never alone moves a plot across two bands; order (terrain and wall shade in pass 1, island shade in pass 2)
  * item 103 (c): true physical needs (a watermill on water, a quay on the shore) stay hard
  * item 103 (f): coverage decides where, never how many; the dossier's count is the truth
  * item 105: every link pulls both ends
  * item 107: spread and pull in balance with the distribution column
  * item 111 (b): the water pull's weight rises with aridity; (c) the sunlight cell per climate row

### E-37 — UNIFY: Unit vocabularies: the base §2.1 units, V11's ColumnSpec.unit and V12's metric Unit (V12-TERM-2, V11-RESTATE-1).

* **Unified form:** One unit vocabulary in §2.1, the union of all three (m, m2, ha, cm, cdeg, deg, share, weight, people, count, yr, wk, m3, lvl, perHa, perKm, ratio, bits, ms, s, luma, rb, chroma, z, none); V11 and V12 type their fields by named subsets.
* **Home:** §2.1 (model). **Units that change:** model, V11, V12.
* **Equivalence list:**
  * deg (measured metric angles) and cdeg (model angles) both kept
  * count and people both kept
  * each volume's subset exactly its current list

### E-38 — UNIFY: territory.haPerHead (2.3) stored beside the FarmTable village rows whose sum it restates (2.275) (V07-ELEG-2) — ruled as a conflict of two homes with two values.

* **Unified form:** haPerHead is derived as the sum of the FarmTable village rows (2.275 ha per head); the stored 2.3 is retired; an editTable of a farm row moves A_T with it. A declared change of value (−1.1 % territory area), recorded here: a conflict resolution (principle (3) (b)), not an elegance-only change.
* **Home:** V07 §3.9 (1). **Units that change:** V07, V11, V12.
* **Equivalence list:**
  * the farm rows' values unchanged
  * A_T = households × the per-head sum
  * V12's register: the farm rows are the calibratable cells; haPerHead leaves the register

### E-39 — KEEP APART: Closure and decline states across the set (access states, way decline ladder, wall stretch condition, building lifecycle).

* **Home:** their homes as they stand; g item 113 (e)'s LOST state joins the access-state set (V04). **Units that change:** V04, V06, model.
* **Kept apart because:** They share an 'existence ladder' idea but differ in scope (per link, per way, per stretch, per record), values and transitions and writers; only the stretch-state profiles are one mechanism (E-01).

## Cohesion checks

**scope (the summary, §1, §14, §15, §16 against INDEX.md and the volumes' build plans):**

* The one-page summary and §1 describe the whole set: the base plus the twelve volumes at build depth (INDEX.md the map), no 'hooks only' framing (SCOPE-C04, CO-01).
* §1.1's stage table names each staged subject's volume and milestone (INDEX §1's columns).
* §14 places every package of the set with its dependency rules: @plat/hood, @plat/buildings (with the plan rung), @plat/under, @plat/village (item 505), @plat/evolve (317), @plat/sky (476), @plat/bridge-client (507), @plat/clerk (518), the calibration package (521), @plat/cli (W-PKG-01) (SCOPE-C16, CO-02).
* §15.1/§15.2: the VG rows and NG rows are delivered at build depth by V07 and V01 (not VILLAGE-LATER / STAGE-2 through an interface) (CO-04); every row maps to its home in the set.
* §16 carries J122's combined build order: V-M0 right after M0; M3c beside M3b; after M4 four streams side by side — M5 (V01), the village V-M1…V-M4 (V07), M6-E (V06), the plan rung's P0, P1, P3 on base buildings (V03); then M6 (V02) and M6-U (V04) after M5 (M6-U beside M5 with a second pair); then M6-P's rest and M6-sky; then M-CAL (V12); then M-SF (V08; VH with the village); each staged milestone's row with its volume's price; the two totals computed once by file f item 568 (the base with stage 2; the whole program) (SCOPE-C04, CO-03).
* INDEX.md §3 and §4 carry the same order (the V-M0 slot per J122; V-M1 after M4) and cite §16's totals; INDEX §6's questions table marks each question answered (J121/J122); INDEX §7's fix list is emptied (every item routed here).
* D-20, D-25, D-35 and the summary cite §16's computed totals and order; the Staged list becomes a pointer list to the volumes and milestones.
* §13 names the volume test families and which volume tests take over each base hook bar (CO-06; W-05).
* §17.1 binds implementers to the set (SCOPE-C09); §17.1 (8)'s algorithm list and §17.4's dependency table cover the volumes' methods and libraries (CO-07); Appendix A states the volumes' evidence grades (CO-08).
* §0.2 lands g items 102–113 and file f (E-22, CO-05).
* The one context vector (ContextVector, §2.5) is the object V01's DistrictContext/BlockContext, SitePlanStrategy.plan, GranularityLaw.bands and RungProfile's granularity and greenery scales read; the volumes' readers name it (CO-11).

**INDEX.md** is rewritten with the scope part: the scope editor writes INDEX §3, §4 (J122's order, §16's totals), §6 (the decisions table) and §7 (no open item) as a cross-part note, and the assembler writes the file.

**every volume:**

* The volume's §8 build plan agrees with INDEX §3/§4 and §16: milestone id (M6 = V02's stage 3; M6-U, M6-sky, M6-E, M6-P, V-M, M-CAL, M-SF, M3c), start-after, runs-beside, price (its own estimate), and J122's slot.
* The volume's §11 marks every owner question answered (OWNER_Q) and its body reads each decision (J121 inputs; J122 decisions).
* The volume's §1b wiring table names each piece's producer and consumer in the set (principle (7)); every hand-off it lists is closed at its destination or routed here.
* One marker line; no stacked banners, PROGRESS ledgers, reconciliation or finalization records (S9).

## Open findings — where they come from

Every finding of the twelve inventories (940), the round-6 seam findings the finalization left open with INDEX §7's fix list (18 rows, SEAM_OPEN, each with its ruling where one was needed), every volume's integration note (folded into its body) and every volume's own Fix list and hand-off rows are routed to the unit that closes them (listed per unit below; the full text is in canon.json → open_findings). No `fix-list.md` exists under docs/validation/ (find: 0 files), so none is routed. THE BAR IS ZERO: each is FIXED in the text or ruled INVALID by the adjudicator; none is parked.

## Per unit — what each editor states, references, replaces, resolves, applies and closes

### model

* **Size:** 42526 words; the goal band after: 25516–31894 words; 77 restatements to references; 0 BCR blocks to pointers.
* **STATE:** 496 facts (canon.json → units.model.state).
* **REFERENCE (77):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | MODEL-0005 | kernel §3.2 | KERNEL-0075 (near) |
  | MODEL-0014 | determinism §6.3 | — (section) |
  | MODEL-0017 | V04 II.7 | V04-0050 (near) |
  | MODEL-0019 | V04 (the editor finds the section) | — (section) |
  | MODEL-0025 | kernel §3 | KERNEL-0117 (fact) |
  | MODEL-0027 | kernel §3.2 | — (section) |
  | MODEL-0028 | kernel §3.2 | KERNEL-0080 (near) |
  | MODEL-0030 | kernel §3.4 | KERNEL-0168 (near) |
  | MODEL-0036 | kernel §3 | — (section) |
  | MODEL-0038 | kernel §3.3 | KERNEL-0134 (near) |
  | MODEL-0047 | pipeline §4.1 | PIPELINE-0712 (near) |
  | MODEL-0049 | pipeline §4.1 | — (section) |
  | MODEL-0057 | V04 II.7.3 | V04-0094 (near) |
  | MODEL-0059 | V04 II.7.6 | V04-0084 (near) |
  | MODEL-0062 | kernel §3 | — (section) |
  | MODEL-0067 | kernel §3.6 | KERNEL-0271 (near) |
  | MODEL-0072 | kernel §3.6 | — (section) |
  | MODEL-0073 | kernel §3.3 | KERNEL-0105 (near) |
  | MODEL-0075 | kernel §3.4 | — (section) |
  | MODEL-0084 | kernel (the editor finds the section) | — (section) |
  | MODEL-0086 | kernel §3.3 | KERNEL-0138 (near) |
  | MODEL-0087 | kernel §3.4 | KERNEL-0066 (near) |
  | MODEL-0088 | kernel §3.6 | KERNEL-0245 (near) |
  | MODEL-0100 | kernel (the editor finds the section) | — (section) |
  | MODEL-0104 | kernel §3.4 | — (section) |
  | MODEL-0119 | kernel §3.3 | KERNEL-0096 (near) |
  | MODEL-0121 | kernel §3.3 | KERNEL-0125 (near) |
  | MODEL-0123 | kernel §12 | KERNEL-0125 (near) |
  | MODEL-0136 | rendering §12.4 | RENDERING-0523 (near) |
  | MODEL-0138 | pipeline §4.2 | — (section) |
  | MODEL-0153 | V02 §2.6 | — (section) |
  | MODEL-0158 | pipeline §4.4 | PIPELINE-0172 (near) |
  | MODEL-0166 | V01 II.1 | V01-0423 (near) |
  | MODEL-0172 | V04 V04 §9 | V04-0237 (near) |
  | MODEL-0185 | pipeline §4.6 | PIPELINE-0311 (near) |
  | MODEL-0219 | rendering §8 | — (section) |
  | MODEL-0220 | pipeline §4.7 | — (section) |
  | MODEL-0261 | V11 §7.6 | V11-0146 (near) |
  | MODEL-0287 | rendering §8.2 | — (section) |
  | MODEL-0302 | rendering §12.4 | RENDERING-0540 (fact) |
  | MODEL-0311 | scope §13.2 | — (section) |
  | MODEL-0317 | rendering §8.4 | RENDERING-0238 (near) |
  | MODEL-0323 | scope §13.2 | SCOPE-0266 (fact) |
  | MODEL-0325 | V02 V02 §1a | V02-0005 (near) |
  | MODEL-0326 | V02 V02 §3.3 | V02-0139 (near) |
  | MODEL-0327 | V02 (the editor finds the section) | — (section) |
  | MODEL-0328 | V02 V02 §3.3 | V02-0139 (near) |
  | MODEL-0339 | V02 §12.7 | V02-0005 (near) |
  | MODEL-0401 | scope §13.2 | SCOPE-1674 (fact) |
  | MODEL-0421 | rendering §9.1 | RENDERING-0368 (fact) |
  | MODEL-0432 | V05 II.6 | V05-0088 (fact) |
  | MODEL-0433 | V04 II.7 | V04-0090 (near) |
  | MODEL-0434 | V04 II.7.6 | V04-0050 (near) |
  | MODEL-0435 | V04 II.7.5 | — (section) |
  | MODEL-0436 | V04 V04 §9 | V04-0273 (near) |
  | MODEL-0437 | V04 V04 §2.6 | V04-0077 (near) |
  | MODEL-0438 | V04 II.7.4 | V04-0095 (near) |
  | MODEL-0443 | V08 §7.7 | V08-0104 (near) |
  | MODEL-0444 | V08 §7.7 | V08-0046 (near) |
  | MODEL-0445 | V08 §7.7 | V08-0105 (near) |
  | MODEL-0450 | pipeline §4.4 | PIPELINE-0406 (near) |
  | MODEL-0452 | pipeline §4.7 | PIPELINE-0379 (near) |
  | MODEL-0456 | V05 II.6 | V05-0088 (near) |
  | MODEL-0457 | V04 II.7 | V04-0095 (near) |
  | MODEL-0458 | V04 II.7.5 | V04-0050 (fact) |
  | MODEL-0459 | V08 §7.7 | V08-0013 (fact) |
  | MODEL-0460 | V08 V08 §3.11 | V08-0105 (near) |
  | MODEL-0467 | determinism §7.7 | DETERMINISM-0577 (fact) |
  | MODEL-0505 | determinism §7.7 | — (section) |
  | MODEL-0515 | determinism §7.7 | DETERMINISM-0538 (fact) |
  | MODEL-0516 | rendering §8 | RENDERING-0489 (near) |
  | MODEL-0518 | V09 (the editor finds the section) | — (section) |
  | MODEL-0535 | determinism §7.7 | DETERMINISM-0546 (fact) |
  | MODEL-0537 | determinism §7.7 | DETERMINISM-0538 (fact) |
  | MODEL-0560 | scope §13.2 | — (section) |
  | MODEL-0565 | scope (the editor finds the section) | — (section) |
  | MODEL-0575 | rendering §11.1 | RENDERING-0436 (near) |

* **Terms to replace:** G-lot (lot, lot-driven, lot-derived, BuildingInput.lot → plot (field BuildingInput.plot); 14 hits, first lines [593, 982, 1047, 1119, 1193, 1240]); G-shadows (projected-shadow pass, projected pass, projected-shadow union, the shadow pass → projected shadows (`shadowPass`); 1 hits, first lines [1393]).
* **Conflicts it resolves (14):** KXC-03, MC-01, MC-02, MC-03, MC-04, MC-05, MC-06, MC-07, MC-08, MC-09, MC-10, MC-11, MC-12, V07-XCONF-2.
* **File f items it applies:** applies its part (also touches): 202, 286, 303, 313, 333, 362, 371, 459, 510, 576. applies (its section): 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 575, 578.
* **File g parts it writes or applies:**
  * item 105: §2.6 and §2.7 (Use.branchOf)
  * item 106: §2.7 (the closure kind, the stretch profile, the harbour-mouth gate)
  * item 109: §2.7 (UndergroundSystem.kind gains ruin; link kinds breach and reuse)
  * item 110: §2.7 (RetainingWall, the raised ways' parts, deck plots — file f items 244–246)
  * item 111: WIRING CONSEQUENCE (not named by the item): §2.3 declares the spring and the oasis's records or fields S1 writes (a spring flag on a WaterBody or a Spring feature, the grove and irrigated gardens as LandUse and Greenery rows) with their lifecycle rows
  * item 113: WIRING CONSEQUENCE: §2.7/§2.8 carry the replay's records the base reads (the history record, the LOST state on an underground link's access path — V04's records — and the `symbolic` provenance flag on a derived fact)
* **Wiring gaps it closes:** W-HOOK-02, W-FLD-04, W-FLD-05, W-FLD-06, W-FLD-13, KWG-09, MW-05.
* **Elegance rulings it applies:** E-01, E-02, E-15, E-37, E-39.
* **Disagreements (agreement.md):** `FabricStrategyId` with V01 (MC-11); `TypedBoundary` with V01 (MC-11); `DriftBounds` with V02 (MC-11); `BaseWing` with V02 (MC-01); `BuildingInput` with V02 (MC-01); `PathShapeRow` with V02 (MC-01); `BaseWing` with V03 (MC-01); `BuildingInput` with V03 (MC-01); `SkyIsland` with V05 (MC-07); `ContextVector` with V05 (MC-05); `TableId` with V07 (MC-11); `TableId` with V11 (MC-11).
* **Edges (edges.md):** 3 UNDEFINED, 1 UNTESTED; 3 UNDEFINED combinations it owns.
* **Open findings routed here (44):**
  * MODEL-RESTATEMENTCLUSTERS-001 [restatement_clusters; -] the underground part number: allocated once, never reused (nextUndergroundPart) → **state it once at its first statement; every other place cites it (places: §2.1, PlatKey comment §2.2, UndergroundSystem.part §2.7, Document.nextUndergroundPart §2.9, entity registry §2.8 — five statements of one rule)**
  * MODEL-RESTATEMENTCLUSTERS-002 [restatement_clusters; -] schema-complete and empty in the base (staged records) → **state it once at its first statement; every other place cites it (places: §2.1, §2.7 code comments and prose (twice))**
  * MODEL-RESTATEMENTCLUSTERS-003 [restatement_clusters; -] passage span written/cleared with Passage.frontBuilding → **state it once at its first statement; every other place cites it (places: Passage.frontBuilding, Passage.headroomCm, BaseWing.spans (twice), Wing.spans)**
  * MODEL-RESTATEMENTCLUSTERS-004 [restatement_clusters; -] one main entrance, street-facing (item 29) → **state it once at its first statement; every other place cites it (places: BuildingSlot.entranceOn, Building.entrances, Entrance comment, Entrances rule 1, §5.3 row — the facing rule stated in four places)**
  * MODEL-RESTATEMENTCLUSTERS-005 [restatement_clusters; -] entrance ordinal stable, never re-used → **state it once at its first statement; every other place cites it (places: Building.nextEntrance, Entrance.vertex comment, Entrances rule 4)**
  * MODEL-RESTATEMENTCLUSTERS-006 [restatement_clusters; -] households clamped into [1, capacity] → **state it once at its first statement; every other place cites it (places: Building.households, InteriorLadderRow.households, interior ladder defaults, capacity paragraph)**
  * MODEL-RESTATEMENTCLUSTERS-007 [restatement_clusters; -] occupants' band = Plot.fieldBand → **state it once at its first statement; every other place cites it (places: Plot.fieldBand comment, ContextVector comment, plan step 1, interior ladder, three band memories)**
  * MODEL-RESTATEMENTCLUSTERS-008 [restatement_clusters; -] builtBand / geometryFloor → **state it once at its first statement; every other place cites it (places: Plot.builtBand comment, built band bullet, interior ladder, three band memories)**
  * MODEL-RESTATEMENTCLUSTERS-009 [restatement_clusters; -] fact tiers / factTier → **state it once at its first statement; every other place cites it (places: FactTier comment, factTier comment, Identity.dossier comment, fact tiers bullet, dossier paths)**
  * MODEL-RESTATEMENTCLUSTERS-010 [restatement_clusters; -] Basement.access derivation → **state it once at its first statement; every other place cites it (places: Basement interface comment, Basements paragraph, plan step 3)**
  * MODEL-RESTATEMENTCLUSTERS-011 [restatement_clusters; -] elaboration record and rung states → **state it once at its first statement; every other place cites it (places: §2.6 elaboration by click and §2.8 elaboration record (states stated twice))**
  * MODEL-RESTATEMENTCLUSTERS-012 [restatement_clusters; -] pack retention while named → **state it once at its first statement; every other place cites it (places: Document.packs comment, UndoRecord.redo comment, pack set bullet)**
  * MODEL-RESTATEMENTCLUSTERS-013 [restatement_clusters; -] tunnel/gallery condition through II.6 table → **state it once at its first statement; every other place cites it (places: Tunnel.lifecycle comment, Gallery.closure comment, decline hooks bullet)**
  * MODEL-RESTATEMENTCLUSTERS-014 [restatement_clusters; -] plain-words summary of §2 (by design) → **state it once at its first statement; every other place cites it (places: §2 In plain words restates §2.2 and §2.8)**
  * MC-01 [conflicts; -] §2.5 rules "this document says plot except when quoting" (lot retired), yet §2 uses lot outside quotations: "the lot mix" (CharacterVector.mix), "the lot cut" / "bent lot cuts" (BaseWing.kind, row footprints), BuildingInput.lot, … — *closed by:* conflict ruling MC-01
  * MC-02 [conflicts; -] §2.4 says every record of §2.4-§2.7 and PART II embeds the Identity and Lifecycle of §2.8, the id and lifecycle fields shown being those; yet these entity records show an id and no lifecycle: Terrain, Junction, SubDistrict, Block… — *closed by:* conflict ruling MC-02
  * MC-03 [conflicts; -] Basement.floors is "storeys below ground, >= 1" and in the same comment "0 for a crawl space"; the requested crawl space sets floors: 0. The range statement contradicts itself (>= 1 versus 0 for crawl). — *closed by:* conflict ruling MC-03
  * MC-04 [conflicts; -] §2.3 gives each slow-change conversion "cause convert:<kind> (§2.8)", but §2.8 types LifecycleEvent.cause as EditRef ¦ RuleRef ¦ 'generation' with no convert:<kind> form (convert is not a cause value there; it may be a RuleRef or… — *closed by:* conflict ruling MC-04
  * MC-05 [conflicts; -] ContextVector.arena is 'ground'¦'underground' only, yet plots exist on sky islands (sky pseudo-districts receive allocations, II.6; the island is handed to the unit run, II.1) — the arena value a sky plot's context vector takes, … — *closed by:* conflict ruling MC-05
  * MC-06 [conflicts; -] "Building.basement is derived by the same function, never rolled alone" follows the Entrances paragraph (deriveEntrances) and echoes deriveBase; which function derives the basement is not named. — *closed by:* conflict ruling MC-06
  * MC-07 [conflicts; -] SkyIsland.outline stores a polygon of world points; rule 5 lists the only records that may hold vertex positions (building wing rings, stored compositions and plans, tower centres) and allows non-vertex points as attributes. Whet… — *closed by:* conflict ruling MC-07
  * MC-08 [conflicts; -] Assignment references take three shapes (AssignmentRef, Id, Assignment) across Plot, Building, Use and BuildingInput, and ContextVector carries both rosterAssignment? and assignment? with no statement of how they differ. — *closed by:* conflict ruling MC-08
  * MC-09 [conflicts; -] A residential building is clamped into [1, capacity] and "every residential building houses ... at least one household", while capacity is 0 for a building S11 builds for a slot without houses (BuildingSlot.unhoused reads as such… — *closed by:* conflict ruling MC-09
  * MC-10 [conflicts; -] The canonical-form bullet lists view, derived and undo as never canonical but omits Document.elaborations (never canonical per its own comment); the list is incomplete. — *closed by:* conflict ruling MC-10
  * MC-11 [conflicts; -] §2 uses seven types that are declared only in a volume, never in the base: Rung (V07), TableId (V11), Outfall (V04), Segment (V10), TypedBoundary and FabricStrategyId (V01), DriftBounds (V02). A base record depending on a volume-… — *closed by:* conflict ruling MC-11
  * MC-12 [conflicts; -] Part 0 (the sewer network) puts its structural margin role on the underground pseudo-district's record, while every further part puts it on its UndergroundSystem record; yet an UndergroundSystem of kind sewer with part 0 also exi… — *closed by:* conflict ruling MC-12
  * MW-01 [wiring_observations; -] The staged records SkyIsland, Tunnel, UndergroundSystem, Gallery, Chamber, UndergroundLink (§2.7) and the dossier staged records ConditionOverlay, DepositSite, PowerRelation, HistoryHint (§2.7) name their base rules (II.6, II.7, … — *closed by:* wiring routing (accounted in wiring.md)
  * MW-02 [wiring_observations; -] The stage-3 hook (BuildingGenerator.compose, PathShapeRow) and the plan rung (BuildingGenerator.plan, the plan-rung records) are carried in §2.6 without naming their building volumes (V02 buildings, V03 interiors), which extend t… — *closed by:* wiring routing (accounted in wiring.md)
  * MW-03 [wiring_observations; -] Fields whose consumer §2 does not name (to be traced elsewhere by the wiring lane): Way.slopeP95, Way.epoch; Terrain.wind, Terrain.features, Terrain.seaLevelCm; WaterBody.flowFrom/flowTo; Reservation.areaBandM2, compactnessMin; B… — *closed by:* wiring routing (accounted in wiring.md)
  * MW-04 [wiring_observations; -] Fields whose producer §2 does not name: ContextVector.dist.* (centre, plaza, market, gate, wall, water, shore, harbour), upwind, aspect, slope, baseCm, rosterAssignment; District.venueMix; Frontage.lengthCm; Block.depthClass; Way… — *closed by:* wiring routing (accounted in wiring.md)
  * MW-05 [wiring_observations; -] Dossier consumption in §2: Identity.dossier, Document.dossier (binding, carried), the dossier paths table (§2.8), District.identity (source dossier), Plot/Building/Institution.knownTo (dossier fact), Institution.concealment/power… — *closed by:* wiring routing (MW-05)
  * MB-01 [broken_references; -] "declared with its mechanism in II.7.4 (R12)": II.7.4 declares AccessPoint but carries no label R12; R12 is a review-round finding id (narration) that resolves nowhere in the set. → **correct the pointer II.7.4 (R12) at §2.7 code comment on AccessPoint: **
  * MB-02 [broken_references; -] Type AssignmentRef is used by Plot.assignment but declared nowhere in the set (no interface or type in the base or any volume, and no inline definition). → **correct the pointer type AssignmentRef at §2 code: Plot.assignment: **
  * MB-03 [broken_references; -] Type OrphanRecord is used by Document.derived.orphans but declared nowhere in the set (no interface or type in the base or any volume, and no inline definition). → **correct the pointer type OrphanRecord at §2 code: Document.derived.orphans: **
  * MB-04 [broken_references; -] Type PackedIndex is used by LevelIndex.static but declared nowhere in the set (no interface or type in the base or any volume, and no inline definition). → **correct the pointer type PackedIndex at §2 code: LevelIndex.static: **
  * MB-05 [broken_references; -] Type UniformGrid is used by LevelIndex.dynamic but declared nowhere in the set (no interface or type in the base or any volume, and no inline definition). → **correct the pointer type UniformGrid at §2 code: LevelIndex.dynamic: **
  * MB-06 [broken_references; -] Type PersonFields is used by Person.pinned but declared nowhere in the set (no interface or type in the base or any volume, and no inline definition). → **correct the pointer type PersonFields at §2 code: Person.pinned: **
  * MB-07 [broken_references; -] Type PlotUse is used by Plot.use but declared nowhere in the set (no interface or type in the base or any volume, and no inline definition). → **correct the pointer type PlotUse at §2 code: Plot.use: **
  * MB-08 [broken_references; -] Type RosterRef is used by Institution.roster but declared nowhere in the set (no interface or type in the base or any volume, and no inline definition). → **correct the pointer type RosterRef at §2 code: Institution.roster: **
  * MB-09 [broken_references; -] Type StatisticsRecord is used by Document.derived.stats but declared nowhere in the set (no interface or type in the base or any volume, and no inline definition). → **correct the pointer type StatisticsRecord at §2 code: Document.derived.stats: **
  * MB-10 [broken_references; -] Type TextRef is used by District.description, Building.description but declared nowhere in the set (no interface or type in the base or any volume, and no inline definition). → **correct the pointer type TextRef at §2 code: District.description, Building.description: **
  * MB-11 [broken_references; -] Type NameRef is used by Way.name, District.name, nameHistory, Institution.name, Religion.name but declared nowhere in the set (no interface or type in the base or any volume, and no inline definition). → **correct the pointer type NameRef at §2 code: Way.name, District.name, nameHistory, Institution.name, Religion.name: **
  * MB-12 [broken_references; -] Type EditRef is used by LifecycleEvent.cause but declared nowhere in the set (no interface or type in the base or any volume, and no inline definition). → **correct the pointer type EditRef at §2 code: LifecycleEvent.cause: **
  * MB-13 [broken_references; -] Type RuleRef is used by LifecycleEvent.cause but declared nowhere in the set (no interface or type in the base or any volume, and no inline definition). → **correct the pointer type RuleRef at §2 code: LifecycleEvent.cause: **

### kernel

* **Size:** 23820 words; the goal band after: 14292–17865 words; 16 restatements to references; 0 BCR blocks to pointers.
* **STATE:** 332 facts (canon.json → units.kernel.state).
* **REFERENCE (16):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | KERNEL-0013 | pipeline §4.9 | — (section) |
  | KERNEL-0020 | determinism §6.5 | DETERMINISM-0222 (near) |
  | KERNEL-0021 | determinism §6.1 | — (section) |
  | KERNEL-0061 | model §2.2 | — (section) |
  | KERNEL-0062 | model §2.2 | — (section) |
  | KERNEL-0063 | model §2.2 | — (section) |
  | KERNEL-0064 | pipeline §4.7 | — (section) |
  | KERNEL-0070 | determinism §6.5 | — (section) |
  | KERNEL-0078 | scope §14 | — (section) |
  | KERNEL-0081 | model §2.2 | — (section) |
  | KERNEL-0112 | scope §13 | — (section) |
  | KERNEL-0132 | rendering §12.4 | — (section) |
  | KERNEL-0148 | scope §13.2 | — (section) |
  | KERNEL-0265 | rendering §11 | — (section) |
  | KERNEL-0278 | determinism §7.1 | — (section) |
  | KERNEL-0351 | model §2.5 | MODEL-0206 (near) |

* **Terms to replace:** G-lot (lot, lot-driven, lot-derived, BuildingInput.lot → plot (field BuildingInput.plot); 1 hits, first lines [3564]).
* **Conflicts it resolves (15):** DXC-01, DXC-02, DXC-06, KIC-01, KIC-02, KIC-03, KIC-04, KIC-05, KIC-06, KIC-07, KIC-08, KXC-01, KXC-02, KXC-03, KXC-04.
* **File f items it applies:** applies its part (also touches): 202, 245, 510, 560, 575. applies (its section): 279.
* **File g parts it writes or applies:**
  * item 110: §3.4 (ground parts from 1)
* **Wiring gaps it closes:** W-FLD-01, W-FLD-02, KWG-01, KWG-02, KWG-04, KWG-06, KWG-07, KWG-09, W-SET-01.
* **Elegance rulings it applies:** E-12, E-13, E-14, E-15.
* **Disagreements (agreement.md):** `E_OUT_OF_RANGE` with determinism (DXC-01, KXC-01); `F-NUM` with determinism (DXC-01, KXC-01); `W_ACUTE_CORNER` with determinism (KXC-05); `W_SNAP_PASSES` with determinism (KXC-05); `W_CUT_SLID` with determinism (KXC-05); `F-PLOT` with determinism (DXC-06, KXC-02); `W_ATTRACTED` with determinism (KXC-05); `W_HEIGHT_CLAMPED` with determinism (KXC-05); `W_SLIVER_RETYPED` with determinism (KXC-05); `W_STRETCH_SHARED` with determinism (KXC-05); `W_WEDGE_ROUTED` with determinism (KXC-05); `F-PLOT` with pipeline (DXC-06, KXC-02); `PlatKey` with scope (KIC-02); `FaceRef` with scope (KIC-02); `ArenaKey` with scope (KIC-02); `TransientKey` with scope (KIC-02).
* **Edges (edges.md):** 23 UNDEFINED, 15 UNTESTED; 0 UNDEFINED combinations it owns.
* **Open findings routed here (77):**
  * KERNEL-RESTATEMENTS-001 [restatements; -] wood-edge thinning rule → **state it once at §4.9; every other place cites it**
  * KERNEL-RESTATEMENTS-002 [restatements; -] population cap 120 000 and 153.6 km² cap area → **state it once at §12.2 / §1.1; every other place cites it**
  * KERNEL-RESTATEMENTS-003 [restatements; -] rung frame areas TOWN 4 / CITY 25 / METROPOLIS 64 km² → **state it once at §1.1 ladder table; every other place cites it**
  * KERNEL-RESTATEMENTS-004 [restatements; -] margin and border chains → **state it once at §2.2 rule 1; every other place cites it**
  * KERNEL-RESTATEMENTS-005 [restatements; -] minEdge 25 cm value (LatticeSpec.minEdgeCm) → **state it once at §2.2 LatticeSpec; every other place cites it**
  * KERNEL-RESTATEMENTS-006 [restatements; -] attractCm 26 cm value → **state it once at §2.2 LatticeSpec; every other place cites it**
  * KERNEL-RESTATEMENTS-007 [restatements; -] minFaceAngle 500 cdeg value → **state it once at §2.2 LatticeSpec; every other place cites it**
  * KERNEL-RESTATEMENTS-008 [restatements; -] raster extension by whole cells keeping cellCm (stated in both) → **state it once at §2.3 (terrain resolution paragraph); every other place cites it**
  * KERNEL-RESTATEMENTS-009 [restatements; -] raster cell sizes (TOWN 5 m; METROPOLIS 10 m) → **state it once at §2.3; every other place cites it**
  * KERNEL-RESTATEMENTS-010 [restatements; -] step (0) rebuild about 2.3 ms for about 9 000 items → **state it once at §12.4 S10 (0) row; every other place cites it**
  * KERNEL-RESTATEMENTS-011 [restatements; -] copy <= about 15 MB, about 1.5 ms each → **state it once at §12.4 merge row / §12.8; every other place cites it**
  * KERNEL-RESTATEMENTS-012 [restatements; -] 8 ms merge of about 200 000 records → **state it once at §12.4 merge row; every other place cites it**
  * KERNEL-RESTATEMENTS-013 [restatements; -] avenue and street-tree rows are Greenery.along records in half-corridor strips → **state it once at §2.7 / §4.9; every other place cites it**
  * KERNEL-RESTATEMENTS-014 [restatements; -] GeoJSON area ring omits antennae → **state it once at §11; every other place cites it**
  * KERNEL-RESTATEMENTS-015 [restatements; -] roof cache key (entity, content revision, roof construction) → **state it once at §8.1 (5); every other place cites it**
  * KERNEL-RESTATEMENTS-016 [restatements; -] ridgeAxis definition for rect and quad → **state it once at §2.6 BaseWing.ridgeAxis; every other place cites it**
  * KERNEL-RESTATEMENTS-017 [restatements; -] the list of fixed rings (stair bay, chimney stack, passage room, composer rooms) → **state it once at §2.6 stage-3 contract; every other place cites it**
  * KERNEL-RESTATEMENTS-018 [restatements; -] the rings a re-cut fixes → **state it once at §2.6 re-cut rule; every other place cites it**
  * KERNEL-RESTATEMENTS-019 [restatements; -] storey extents the seed rings tile → **state it once at §2.6 plan rung steps 4 and 6; every other place cites it**
  * KERNEL-RESTATEMENTS-020 [restatements; -] passage face construction → **state it once at §2.5 Passage / §4.7 S10 (9); every other place cites it**
  * KERNEL-RESTATEMENTS-021 [restatements; -] sealed passage bit → **state it once at §2.5 Passage.sealed / §4.6; every other place cites it**
  * KERNEL-RESTATEMENTS-022 [restatements; -] every finer face under a locked or pinned entity is a fixed input → **state it once at §7.2; every other place cites it**
  * KERNEL-RESTATEMENTS-023 [restatements; -] partial list of records recordCheck covers (§7.4 adds composition rings, plan points, tower centres, basement ring) → **state it once at §7.4 / §2.6; every other place cites it**
  * KERNEL-RESTATEMENTS-024 [restatements; -] held point records and the building check restated in the whole-step validation → **state it once at §7.4 / §2.6 rule 4; every other place cites it**
  * KERNEL-RESTATEMENTS-025 [restatements; -] bent-cut recursion bound and ladder restated in the §3.5 table → **state it once at §4.6 / §5.2 F-CUT; every other place cites it**
  * KERNEL-RESTATEMENTS-026 [restatements; -] bent-cut declared ladder restated in the §3.5 table → **state it once at §4.6 step 8; every other place cites it**
  * KERNEL-RESTATEMENTS-027 [restatements; -] the stages that read booleans, buffers, insets or bands (S1, S3, S8, S9, S10 (0), S11, S12b) listed in the fallback → **state it once at §4 stage list; every other place cites it**
  * KERNEL-INTERNALDUPLICATIONS-001 [internal_duplications; -] regularFit degenerate contract: §3.1 row, E_DEGENERATE comment, §3.4 → **state it once at its first statement; every other place cites it**
  * KERNEL-INTERNALDUPLICATIONS-002 [internal_duplications; -] OBB/hull GEO-7 contract: §3.1 row and E_DEGENERATE comment → **state it once at its first statement; every other place cites it**
  * KERNEL-INTERNALDUPLICATIONS-003 [internal_duplications; -] absorbSliver semantics: §3.4 comment and §3.6 → **state it once at its first statement; every other place cites it**
  * KERNEL-INTERNALDUPLICATIONS-004 [internal_duplications; -] E_KEPT/kept content: §3.3, §3.6 attraction obstacles, §3.7 kerb → **state it once at its first statement; every other place cites it**
  * KERNEL-INTERNALDUPLICATIONS-005 [internal_duplications; -] moves keep nothing: §3.3 KernelTx comment, §3.3 kept content, §3.6 → **state it once at its first statement; every other place cites it**
  * KERNEL-INTERNALDUPLICATIONS-006 [internal_duplications; -] placement bound: §3.3 route box, §3.6, §3.10 row → **state it once at its first statement; every other place cites it**
  * KERNEL-INTERNALDUPLICATIONS-007 [internal_duplications; -] max(256, 1/4 static size): §3.3 pool step 1 and rebuild moment (2) → **state it once at its first statement; every other place cites it**
  * KERNEL-INTERNALDUPLICATIONS-008 [internal_duplications; -] the doors (insertChain only door): §3.4 and §2.2 rule 4 → **state it once at its first statement; every other place cites it**
  * KERNEL-INTERNALDUPLICATIONS-009 [internal_duplications; -] §3.5 table restating §3.1-§3.10 → **state it once at its first statement; every other place cites it**
  * KERNEL-INTERNALDUPLICATIONS-010 [internal_duplications; -] transient-arena batch fields: §3.3 and §3.4 → **state it once at its first statement; every other place cites it**
  * KIC-01 [internal_conflicts; minor] §3.3 rule 2 says no two vertices carry one anchor key, citing '§3.10's one-vertex-per-ordinal check'; no §3.10 row has that name, and the nearest row (stored references resolve: exactly one vertex per ordinal) runs at 'stage end,… → **Either name the check that covers anchor uniqueness batch-locally (e.g. extend the prepared-contacts row: 'no two vertices carry one anchor key') or cite the §13.1 test and the allocation rule instead of §3.10.** — *closed by:* conflict ruling KIC-01
  * KIC-02 [internal_conflicts; minor] §3.4 says resolve, pointLocate and faceNeighbours take an ArenaKey (a PlatKey or a TransientKey); the transient-arena paragraph lists as its services only booleans, offsetFace, insetRing, obb, lir, sideRuns, skeleton, faceNeighbo… → **State the transient arena's full service list once (including or excluding resolve, pointLocate, view) and make the ArenaKey sentence agree.** — *closed by:* conflict ruling KIC-02
  * KIC-03 [internal_conflicts; minor] A warp batch has two level sources: KernelTx.level ('a warp batch moves vertices of every level >= its own') and warp's fromLevel argument ('every vertex of level >= fromLevel'); nothing states they must be equal or which governs. → **State that a warp batch's KernelTx.level equals its fromLevel (or which one governs).** — *closed by:* conflict ruling KIC-03
  * KIC-04 [internal_conflicts; minor] pinVertices: 'smoothing, simplification and cutting keep the vertex, warp does not'; §3.6: smoothing of committed geometry IS a warp 'under the same rules', and kernel-pinned vertices 'move with everything else unless held'. The … → **State that the smoother's displacement field is zero at every kernel-pinned vertex (or that pinned vertices join the held set for a smoothing warp).** — *closed by:* conflict ruling KIC-04
  * KIC-05 [internal_conflicts; minor] §3.4's corridorUnion comment says 'kept faces inside them are holes (§3.3)', while §3.3 re-parents each kept face into the new face containing it (nesting holds) and §3.7 says a kept face 'must lie wholly inside one resulting L2 … → **Replace 'are holes' by 'are kept content nested in the L2 face that contains them (§3.3)' or define the sense of 'hole'.** — *closed by:* conflict ruling KIC-05
  * KIC-06 [internal_conflicts; minor] §3.2 (6) justifies area2's exact double return by 'every face ring is simple, §3.10', but §3.10's row is 'faces simple except declared antennae' - a face with an antenna has a non-simple (retracing) ring. The bound still holds (r… → **Reword to 'every face ring is simple or retraces only declared antennae, which add no area'.** — *closed by:* conflict ruling KIC-06
  * KIC-07 [internal_conflicts; minor] §3.2 (1) says intermediate rational points - 'crossings, offsets, circumcentres, skeleton nodes' - are 'immediately placed on the lattice'; §3.8 keeps skeleton output off every arena (derived, cached, validated with nodes rounded… → **Restrict (1) to points that become arena geometry: they are placed on the lattice when they enter an arena (by insertChain/snap); derived values (skeleton nodes, fit targets) stay doubles until then.** — *closed by:* conflict ruling KIC-07
  * KIC-08 [internal_conflicts; minor] 'Each static-index partition (§3.3) is one chunk holding ... its edges of level >= 2 ... and its face rows of level >= 2' - but the L0 and L1 static partitions (one per arena, §3.3) hold only level <= 1 items, which the separate … → **Say 'each L2-L4 static-index partition is one chunk'.** — *closed by:* conflict ruling KIC-08
  * KXC-01 [cross_part_conflicts; minor] §3.1: E_OUT_OF_RANGE is 'a caller bug, reported with its stream key, never stored'; §3.6: a mandatory chain can be rejected only by non-precision codes. §5.2's F-NUM row lists E_OUT_OF_RANGE among the detections of an optional ch… → **Base canonical home of the code is §3.1: §5.2 F-NUM should drop E_OUT_OF_RANGE (or §3.1 should say an optional chain's out-of-range point is handled by F-NUM).** — *closed by:* conflict ruling KXC-01
  * KXC-02 [cross_part_conflicts; major] §3.2 (2) states 'The class floors come from the stage tables: minPlotWidth = 2.5 m, minInteriorAnglePlot = 12 deg ... minCorridor per class', but no stage table, base section or volume carries these names or the 2.5 m value (grep… → **Give the floors one home: a table row in §4.7 (pipeline) with minPlotWidth 2.5 m, minInteriorAnglePlot 12 deg, minCorridor per class with values, read by §3.10's class-floor check; §3.2 (2) keeps only the rule that floors are widths/areas/angles and never minEdge.** — *closed by:* conflict ruling KXC-02
  * KXC-03 [cross_part_conflicts; minor] §3.3: 'only locked or pinned content is a conflict (§2.2 rule 6)'; §2.2 rule 6 says 'what survives the clear - locked or pinned entities, returned as conflicts ... is §3.3's'. Each cites the other as the home; the rule on locked/… → **Cite §7.2 for locks and pins in both places; one of §2.2 rule 6 / §3.3 states the clear rule, the other references it.** — *closed by:* conflict ruling KXC-03
  * KXC-04 [cross_part_conflicts; minor] F-SKELETON's detection restates §3.8's validator as three checks (non-planar, non-monotone faces, inconsistent heights) and omits check (4) (connected, exactly h independent cycles for h holes); §3.8 never names its failure class… → **F-SKELETON cites '§3.8's four post-conditions' instead of restating; §3.8 names F-SKELETON beside W_DOWNGRADE.** — *closed by:* conflict ruling KXC-04
  * KXC-05 [cross_part_conflicts; minor] §5.4's kernel.warnings comment enumerates 8 of the 12 Warning codes (W_ATTRACTED, W_STRETCH_SHARED, W_WEDGE_ROUTED, W_SNAP_PASSES, W_ACUTE_CORNER, W_SLIVER_RETYPED, W_HEIGHT_CLAMPED, W_CUT_SLID); W_PLACED, W_PROMOTED, W_STEINER a… → **§5.4 reads 'every Warning code of §3.1' (one reference) and says kernel.downgrades counts W_DOWNGRADE.** — *closed by:* conflict ruling KXC-05
  * KEL-01 [elegance_candidates; -] Three shapes for 'the op met locked or pinned content': E_LOCKED (cut/move/delete, §3.1), clearFiner's Conflict[] result (§3.4), and the warp held set (field zero, §3.6). Candidate for one conflict record shape; nuance to keep: w… — *closed by:* elegance ruling (E-list)
  * KEL-02 [elegance_candidates; -] E_DEGENERATE detail vocabulary scattered over §3.1's comment (stretch, seed, fixed, overlap, fit), the OBB row (collinear) and §3.7 (empty, collapsed): one detail table under KernelError. — *closed by:* elegance ruling (E-list)
  * KEL-03 [elegance_candidates; -] The degenerate contracts of OBB/hull and regularFit are each stated two or three times inside §3 (table row, KernelError comment, §3.4): state once, reference elsewhere. — *closed by:* elegance ruling (E-list)
  * KEL-04 [elegance_candidates; -] Rebuild threshold max(256, 1/4 of static size) stated twice in §3.3 (pool step 1 and rebuild moment (2)); the placement bound stated in §3.3 (route box), §3.6 and §3.10; 'moves keep nothing' in §3.3 (KernelTx comment, kept conten… — *closed by:* elegance ruling (E-list)
  * KEL-05 [elegance_candidates; -] §3.5's failure-class table restates mechanisms whose homes are §3.1-§3.10, §4.6 and §4.7; as a traceability table it can carry pointers only. — *closed by:* elegance ruling (E-list)
  * KEL-06 [elegance_candidates; -] Two angle quanta (centidegrees; a 16-bit binary angle) - one unit if KWG-09 finds no user of the binary angle. — *closed by:* elegance ruling (E-list)
  * KERNEL-EDGESOBSERVED-001 [edges_observed; -] buffer() accepts joins 'miter' and ends 'flat', but §3.7 describes only round joins (2 cm sagitta) and square ends - miter limit and flat-end behaviour undefined. — *closed by:* edge catalogue (EI-KERNEL-EDGESOBSERVED-001)
  * KERNEL-EDGESOBSERVED-002 [edges_observed; -] §3.8 pre-clean 'minimum angle 5 deg': how a sub-5-degree corner (legal on a mandatory chain with W_ACUTE_CORNER) is cleaned, and whether the cleaned ring can change the roof, is not stated. — *closed by:* edge catalogue (EI-KERNEL-EDGESOBSERVED-002)
  * KERNEL-EDGESOBSERVED-003 [edges_observed; -] hexLattice on an empty region, zero spacing or jitter >= spacing/2: outcome not stated. — *closed by:* edge catalogue (EI-KERNEL-EDGESOBSERVED-003)
  * KERNEL-EDGESOBSERVED-004 [edges_observed; -] kerb(F) for an L1 face with no bounding spine (a face bounded only by shore or border): outcome by the formula (F itself) - implicit, no test named. — *closed by:* edge catalogue (EI-KERNEL-EDGESOBSERVED-004)
  * KERNEL-EDGESOBSERVED-005 [edges_observed; -] transientArena with an empty seed list, or tileRings with no rings: outcome not stated. — *closed by:* edge catalogue (EI-KERNEL-EDGESOBSERVED-005)
  * KERNEL-EDGESOBSERVED-006 [edges_observed; -] sampleProfile at a zero-length chain or a single-knot ring: outcome not stated (the §3.10 row requires at least one knot per ring). — *closed by:* edge catalogue (EI-KERNEL-EDGESOBSERVED-006)
  * KERNEL-EDGESOBSERVED-007 [edges_observed; -] Frame growth when the new frame equals the old (population target at the cap already): no-op implied, not stated. — *closed by:* edge catalogue (EI-KERNEL-EDGESOBSERVED-007)
  * KERNEL-EDGESOBSERVED-008 [edges_observed; -] skeleton() with h holes where a hole touches the outer ring at a vertex (allowed for faces): validator check (4) cycle count for touching holes not stated. — *closed by:* edge catalogue (EI-KERNEL-EDGESOBSERVED-008)
  * KWG-01 [wiring_gaps; minor] W_STEINER is declared in the Warning type and is emitted by no stated rule and read by no consumer anywhere in the base or the volumes. → **Name its producer (e.g. booleans/buffers placing Steiner points on existing edges, beside CommitRecord.steinerAdded) and its reader (§5.4 report), or remove the code.** — *closed by:* wiring routing (KWG-01)
  * KWG-02 [wiring_gaps; minor] W_ATTRACTED is read by §3.7's B-FUZZ split and §5.4's report, but no §3.6 rule states that attraction emits it (step 2 vertex attraction reports nothing). → **§3.6 step 2: 'each attracted vertex is reported W_ATTRACTED'.** — *closed by:* wiring routing (KWG-02)
  * KWG-03 [wiring_gaps; major] KernelTx.expect: Invariant[] and KernelTx.onFail: 'reject'¦'repair'¦'downgrade' are declared but nothing in the base or volumes says who sets them (StageDecl.invariants, §4.1, is the likely producer), which op checks expect, or w… → **§3.3: define expect (filled from StageDecl.invariants / the caller class floors; checked at commit on the touched faces, returning E_BELOW_MIN_AREA/WIDTH/ANGLE) and the three onFail values (reject: return the code; repair: run §5 local repair on the overlay; downgrade: the stage ladder rung), each …** — *closed by:* wiring routing (accounted in wiring.md)
  * KWG-04 [wiring_gaps; minor] E_HOLE_CONTACT, E_BELOW_MIN_AREA, E_BELOW_MIN_WIDTH and E_NON_CONVEX are named by no §5.2 ladder row or other consumer (F-CUT and F-CORRIDOR describe the same failures in words: min area, min width). → **§5.2 detection columns name the codes (F-CUT: E_NOT_TWO_CROSSINGS, E_HOLE_CONTACT, E_BELOW_MIN_*; an inset caller's row: E_NON_CONVEX -> offsetFace).** — *closed by:* wiring routing (KWG-04)
  * KWG-05 [wiring_gaps; minor] CommitRecord.edgesAdded, edgesRemoved, steinerAdded, steinerDissolved, work and owners have no named reader anywhere in the base or volumes (faces, moved, promoted, demoted, unflagged, roles and version do). → **Name each reader (e.g. §5.4 report counts, §13.2 cost-model test for work, §7.3 locality closure or §8 dirty set for owners) or drop the field.** — *closed by:* wiring routing (accounted in wiring.md)
  * KWG-06 [wiring_gaps; minor] Dynamic grid cell sizes '25 m at L0-L1, 10 m at L2, 5 m at L3-L4; table values' - no table or row is named and no @plat/tables row carries them. → **Name the table row (or declare them kernel constants, not table values).** — *closed by:* wiring routing (KWG-06)
  * KWG-07 [wiring_gaps; minor] Kernel services whose callers exist only by description: offsetFace (S11 per-edge setbacks per §3.7's M0 text; §4.7 S11 does not name it), hexLattice (§4.3 describes the routing lattice without the name), sampleProfile (kerb/band… → **Consumers name the op at their home (§4.3 hexLattice, §4.7 S11 offsetFace); internal-only services are marked internal in §3.4.** — *closed by:* wiring routing (KWG-07)
  * KWG-08 [wiring_gaps; minor] The frame-growth re-grid fallback is triggered by 'M4's memory measurement of the extreme growth' (a TOWN grown to the cap in one epoch vs §12.8's METROPOLIS line); T81-1 (§13) tests both outcomes, but neither §16's M4 row nor §1… → **§16 M4 exit (or §12.8) lists the extreme-growth memory measurement that selects the path.** — *closed by:* wiring routing (KWG-08)
  * KWG-09 [wiring_gaps; minor] §3.2 (3) says a float deciding topology is quantised to integer cm 'or to a 16-bit binary angle'; no mechanism in the base names a 16-bit binary angle (stored headings and op angles are centidegrees: raysCdeg, turnTolCdeg, minAng… → **Name the operations that quantise to the 16-bit binary angle, or state centidegrees as the one angle quantum.** — *closed by:* elegance ruling (E-list)
  * KBR-01 [broken_references; -] no row by that name; nearest row cannot see anchors (KIC-01) → **correct the pointer §3.10's one-vertex-per-ordinal check at §3.3 clear regions rule 2: no row by that name; nearest row cannot see anchors (KIC-01)**
  * KBR-02 [broken_references; -] resolves to a rule that defers back to §3.3 (circular; KXC-03) → **correct the pointer §2.2 rule 6 at §3.3 kept content: resolves to a rule that defers back to §3.3 (circular; KXC-03)**
  * KBR-03 [broken_references; -] no rule by that name in §2.6; the content is §2.6's 'The re-cut, both ways' bullet (J-A28.26) - resolves by content only → **correct the pointer §2.6's kept-room rule at §3.4 A re-cut is the same call: no rule by that name in §2.6; the content is §2.6's 'The re-cut, both ways' bullet (J-A28.26) - resolves by content only**
  * KBR-04 [broken_references; -] §8.1 item 2 is 'Kinds' (defines the instances mark); per-instance placement is §8.10's - imprecise → **correct the pointer §8.1 (2) (per-instance placement) at §3.1 Poisson row: §8.1 item 2 is 'Kinds' (defines the instances mark); per-instance placement is §8.10's - imprecise**

### pipeline

* **Size:** 85919 words; the goal band after: 51551–64439 words; 60 restatements to references; 0 BCR blocks to pointers.
* **STATE:** 746 facts (canon.json → units.pipeline.state).
* **REFERENCE (60):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | PIPELINE-0019 | rendering §12.5 | RENDERING-0526 (near) |
  | PIPELINE-0021 | model §2.6 | MODEL-0293 (fact) |
  | PIPELINE-0023 | kernel §3.3 | KERNEL-0146 (near) |
  | PIPELINE-0026 | determinism §6.3 | — (section) |
  | PIPELINE-0028 | model §2.9 | MODEL-0553 (near) |
  | PIPELINE-0029 | rendering §12.3 | RENDERING-0512 (near) |
  | PIPELINE-0030 | determinism §7.6 | DETERMINISM-0530 (near) |
  | PIPELINE-0034 | model §2.8 | MODEL-0381 (fact) |
  | PIPELINE-0038 | determinism §7.4 | DETERMINISM-0158 (near) |
  | PIPELINE-0039 | model §2.9 | — (section) |
  | PIPELINE-0043 | rendering §8.4 | — (section) |
  | PIPELINE-0044 | determinism §7.7 | — (section) |
  | PIPELINE-0046 | scope §1 | — (section) |
  | PIPELINE-0072 | determinism §5.2 | DETERMINISM-0032 (near) |
  | PIPELINE-0174 | scope §13.2 | — (section) |
  | PIPELINE-0183 | determinism §7.3 | DETERMINISM-0377 (near) |
  | PIPELINE-0189 | model §2.5 | MODEL-0053 (near) |
  | PIPELINE-0200 | scope §13.5 | SCOPE-0513 (near) |
  | PIPELINE-0264 | scope §16 | — (section) |
  | PIPELINE-0270 | determinism §7.3 | DETERMINISM-0367 (near) |
  | PIPELINE-0278 | scope §13.5 | SCOPE-0487 (near) |
  | PIPELINE-0284 | rendering §8.5 | RENDERING-0198 (near) |
  | PIPELINE-0342 | model §2.6 | MODEL-0292 (fact) |
  | PIPELINE-0345 | model §2.6 | MODEL-0320 (near) |
  | PIPELINE-0376 | rendering §9.2 | RENDERING-0388 (fact) |
  | PIPELINE-0378 | determinism §5.3 | — (section) |
  | PIPELINE-0415 | determinism §6.3 | — (section) |
  | PIPELINE-0417 | determinism §5.3 | — (section) |
  | PIPELINE-0421 | determinism §7.3 | DETERMINISM-0381 (near) |
  | PIPELINE-0448 | rendering §8.1 | RENDERING-0019 (near) |
  | PIPELINE-0471 | determinism §6.3 | DETERMINISM-0199 (fact) |
  | PIPELINE-0473 | determinism §7.4 | DETERMINISM-0432 (near) |
  | PIPELINE-0474 | determinism §7.1 | DETERMINISM-0444 (near) |
  | PIPELINE-0493 | determinism §6.3 | DETERMINISM-0200 (fact) |
  | PIPELINE-0495 | determinism §6.3 | DETERMINISM-0134 (near) |
  | PIPELINE-0502 | V08 V08 §3.6 | V08-0093 (near) |
  | PIPELINE-0504 | V08 V08 §3.6 | V08-0093 (near) |
  | PIPELINE-0509 | V08 §1.1 | — (section) |
  | PIPELINE-0524 | scope §13.2 | SCOPE-0241 (near) |
  | PIPELINE-0527 | determinism §6.3 | — (section) |
  | PIPELINE-0588 | model §2.6 | MODEL-0272 (fact) |
  | PIPELINE-0638 | V01 (the editor finds the section) | — (section) |
  | PIPELINE-0670 | rendering §8.2 | — (section) |
  | PIPELINE-0678 | rendering §12.6 | — (section) |
  | PIPELINE-0683 | rendering §8.4 | RENDERING-0237 (near) |
  | PIPELINE-0737 | determinism §5.3 | — (section) |
  | PIPELINE-0793 | V07 (the editor finds the section) | — (section) |
  | PIPELINE-0794 | V07 V07 §3.2 (2) | V07-0180 (near) |
  | PIPELINE-0795 | V07 V07 §3.0 | V07-0174 (fact) |
  | PIPELINE-0796 | V07 V07 §3.4 | V07-0191 (near) |
  | PIPELINE-0797 | V07 V07 §1b W15 | V07-0033 (near) |
  | PIPELINE-0798 | V07 (the editor finds the section) | — (section) |
  | PIPELINE-0799 | scope §1.1 | SCOPE-0150 (fact) |
  | PIPELINE-0800 | V07 §15 | — (section) |
  | PIPELINE-0801 | V07 (the editor finds the section) | — (section) |
  | PIPELINE-0802 | V07 (the editor finds the section) | — (section) |
  | PIPELINE-0803 | V07 V07 §1b W2 | V07-0020 (near) |
  | PIPELINE-0804 | V07 (the editor finds the section) | — (section) |
  | PIPELINE-0805 | V07 V07 §2.1 | V07-0097 (near) |
  | PIPELINE-0806 | V08 §1.1 | V08-0101 (fact) |

* **Terms to replace:** G-lot (lot, lot-driven, lot-derived, BuildingInput.lot → plot (field BuildingInput.plot); 24 hits, first lines [3707, 3801, 4040, 4041, 4044, 4427]); G-firstmap (first paint → first map; 3 hits, first lines [3756, 3844, 5990]); G-shadows (projected-shadow pass, projected pass, projected-shadow union, the shadow pass → projected shadows (`shadowPass`); 1 hits, first lines [5802]); G-strike (decline pool, decline lottery, the lottery → strike pool (defined once in V06 §3.5.2); 6 hits, first lines [6112, 6118, 6176, 6465, 6538, 6690]); G-newrandom (scoped re-roll, Try again (in prose), Rebuild … as generated → New random (§7.1); 'Try again' is only its catalogue label; 'reroll' only for rerollLayer; 1 hits, first lines [3860]); G-fallbackclass (fallbackClass → item 104 (a)'s resolution (V11 §3.13); 1 hits, first lines [11687]); G-JT (J-T → JT; 4 hits, first lines [5070, 5172, 5921, 15604]).
* **Conflicts it resolves (18):** DXC-05, DXC-06, KXC-02, CF-PIPE-01, CF-PIPE-02, CF-PIPE-03, CF-PIPE-04, CF-PIPE-05, CF-PIPE-06, CF-PIPE-07, CF-PIPE-08, CF-PIPE-09, CF-PIPE-10, CF-PIPE-11, CF-PIPE-12, CF-PIPE-13, SCOPE-C01, SCOPE-C06.
* **File f items it applies:** applies its part (also touches): 202, 205, 213, 259, 271, 369, 389, 575, 582. applies (its section): 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 573, 574, 576, 577, 579, 580.
* **File g parts it writes or applies:**
  * item 102: §4.5 (the driver and its order), §4.7 S10b (the sunlit-side preference), II.6 (the island shade strip hook), §4.11 (drift over epochs, STAGED with evolution)
  * item 103: §10.2 (the siting profile columns on BuildingClassRow, the relation families as derived RelationRules, the signature-pair table, the coverage row of (f)), §4.7 S10b (the solver reads them; unchanged in shape)
  * item 104: §10.2 (the resolution order, the 17 archetype rows, the category and tag delta tables, the keyword table, the fallback), §4.7 S10b (unchanged solver)
  * item 105: §10.2 (the goods table, the orientation column, split rows), §4.7 S10a and S10b (order, two-way term, relaxation, split placement), §4.5 S7b (1) (the district supply term)
  * item 106: §4.2 S3 (9) and §4.4 S5a (classification, reach, anchors), §4.8 (graded furniture, anchor towers, the chain), S12b (intramural gardens)
  * item 107: §10.2 (the balance profile, comfortM, the spacing row), §4.7 S10a and S10b, §4.5 S7b (1)
  * item 108: §10.2 (the step-type table), §4.2 S2 (member counts), §4.5 item 72 (quarter records owning members)
  * item 109: §4.2 S1 (the relief rows, the mining boost, the fissure variant), II.7.6 (caverns and the ruin system, its order and depth band), II.7.5 (a ruin as a void source and its rank), II.7.3 (basement access over ruins)
  * item 110: §4.3 and §4.6 (raised ways, stairs and ramps), §4.7 S10 and S11 (terrace levelling, deck plots)
  * item 111: §4.2 S0 and S1: the oasis and spring features and the arid chances (an arid site keeps river, lake and coast at the arid row's chances and gains the oasis; likelier with no other water); §4.2 S3 and §4.4: the water pull on the growth field (travel-cost boundary and nucleus); §4.5: the prosperity water term and item 102's sunlight cell per climate row (zero or toward shade in hot arid rows); §4.7 S10b: wells and fountains weighted to high-yield ground, walking coverage tightened in arid rows; an oasis is water for every rule that reads water
  * item 113: §4.2 S0: the history option (a standalone blueprint history such as 'once a city, now a village'); §4.11: history-first generation — the peak, the replay as coarse epochs (decades by default, a table value) from the founding or peak to the present meeting the dossier's present facts exactly, destruction and refounding (the old geometry as ruins, the new settlement reusing roads, gate gaps, bridges and foundations, the salvage ledger), burial past a threshold (a century by default, shortened by floods, silt and rebuilding, lengthened on bare rock), the effective peak (a symbolic peak from evidence, sized at the tier range's lower quartile, marked symbolic); II.7.6: the buried former settlement generalised to the replay (its streets, walls and major buildings at their old ground level), distinct from item 109's ancient ruins
* **Wiring gaps it closes:** W-DOS-03, W-DOS-04, W-IF-07, W-FLD-03, W-FLD-07, W-FLD-09, WG-PIPE-02, WG-PIPE-03, WG-PIPE-04, WG-PIPE-05, WG-PIPE-06, WG-PIPE-07, WG-PIPE-08, WG-PIPE-09, WG-PIPE-11, WG-PIPE-12, RWG-07, W-SET-01.
* **Elegance rulings it applies:** E-36.
* **Id rulings it applies:** ID-ITEM.
* **Disagreements (agreement.md):** `F-PLOT` with determinism (DXC-06, KXC-02); `E_RUNG_UNAVAILABLE` with determinism (SCOPE-C01); `F-PLOT` with kernel (DXC-06, KXC-02); `E_RUNG_UNAVAILABLE` with scope (SCOPE-C01).
* **Edges (edges.md):** 43 UNDEFINED, 30 UNTESTED; 41 UNDEFINED combinations it owns.
* **Open findings routed here (46):**
  * CF-PIPE-01 [internal_conflicts; major] Duration of an informal cluster's shack Works. §4.11 'Informal clusters over epochs' makes each added structure 'a build Works of days (a shack)'; §4.11 Works (2) says weeks are integers and a stage shorter than a week is never d… → **State the shack's Works duration by its WorksTable row (the hovel-or-shed row, 1–2 working weeks, or a shack row of its own) and keep only the tent's zero-week, finished-in-its-week case; drop 'of days'.** — *closed by:* conflict ruling CF-PIPE-01
  * CF-PIPE-02 [internal_conflicts; major] Whether an undercity always exists at CITY and METROPOLIS. II.7.5's first sentence says 'an undercity exists in cities and metropolises, and in a large town only where a void source exists'; the same paragraph's rung row gives CI… → **Reword the lead sentence: 'an undercity may exist in cities and metropolises under the law, rarely in a large town, never below TOWN'.** — *closed by:* conflict ruling CF-PIPE-02
  * CF-PIPE-03 [internal_conflicts; major] Whether the optional module feeds the prosperity field. §10.3 Factions says the module's influence field over districts is 'used by the prosperity drivers and the grammar'; §10.1 says @plat/sim is never in the one-click path, and… → **State that the module's influence field is read by the module's own queries and the naming grammar only; the prosperity field's power terms are §4.5 (6)'s dials over CircumstanceSlice.powers, which need no module.** — *closed by:* conflict ruling CF-PIPE-03
  * CF-PIPE-04 [internal_conflicts; minor] 'No second calendar exists'. §4.11 clock (3) says CalendarRow is the one calendar and 'no second calendar exists'; §10.1 and §10.3 give the module 'the calendar and clock with external time sync' and 'a configurable calendar (hou… → **Rename the module's pieces (for example 'the day-schedule table' and 'the hour view key') or qualify §4.11's sentence to 'no second calendar of weeks and seasons'.** — *closed by:* conflict ruling CF-PIPE-04
  * CF-PIPE-05 [internal_conflicts; minor] Islands after a rung change. II.6 (2) and §4.11 say a settlement 'that leaves the CITY band' can no longer sustain islands / wanes (AM-13), but METROPOLIS also admits islands (RungProfile.layers.islands possible at CITY and METRO… → **Say 'falls below the CITY band (to TOWN or a village rung)' in both places.** — *closed by:* conflict ruling CF-PIPE-05
  * CF-PIPE-06 [internal_conflicts; major] Identity of an undercity neighbourhood. II.7.5 (4) says it has 'no government, walls, gates, rung or identity of its own'; S12c (§4.1, §4.5 (2), (4)) writes every district's character vector and identity, and an undercity neighbo… → **State in §4.5 which districts S12c covers: the ground districts; an undercity neighbourhood reads its parent's identity (named as its underside by §10.4); the hinterland, sky and underground pseudo-districts take no identity (or state what they take).** — *closed by:* conflict ruling CF-PIPE-06
  * CF-PIPE-07 [internal_conflicts; minor] Where an underground-mode clandestine institution is allocated when both an underground (sewer-front) and an undercity allocation exist. II.7.3 (b) lists them in S7b (6)'s allocation 'where an undercity exists they go to it first… → **In S7b (6): 'the clandestine institutions whose mode is underground, except where S7b predicts an undercity, which takes them at (7)'.** — *closed by:* conflict ruling CF-PIPE-07
  * CF-PIPE-08 [internal_conflicts; minor] Works kinds. The stages table has a 'fire' kind (CHARRED) and 'conversion with no geometry step' (REFIT); WorksRow.kind is build¦extend¦demolish¦repair¦convert¦decay¦clear — no 'fire', and 'clear' has a duration (1–4 weeks) but n… → **Add 'fire' to WorksRow.kind (or state that fire is an event with a CHARRED state, not a Works kind), give 'clear' its stages row, and use the enum names in the table.** — *closed by:* conflict ruling CF-PIPE-08
  * CF-PIPE-09 [internal_conflicts; minor] The singular classes. §4.5 (3) names 'a cathedral, the palace, the university, the great market'; §10.2's default rows name 'the cathedral, a great temple, the palace, the castle, the university and the principal market's hall'. … → **§4.5 (3) cites §10.2's rows ('e.g. the cathedral, the palace, the principal market's hall') rather than its own list.** — *closed by:* conflict ruling CF-PIPE-09
  * CF-PIPE-10 [internal_conflicts; minor] Sector weights of walls, toll houses and the customs house. §10.2 gives 'gates, toll houses, bridges, roads, walls and the customs house → taxes and tolls (0.7) with trade (0.3) on gates, bridges and roads', so walls, toll houses… → **Give walls, toll houses and the customs house taxes and tolls 1.0, or state that a link row's weights are renormalised to one.** — *closed by:* conflict ruling CF-PIPE-10
  * CF-PIPE-11 [internal_conflicts; minor] S7b's step numbers do not follow its execution order: (4) is drawn 'before (3) cuts the claims', and (5), (6), (7) run 'before (1)'. The numbered list reads as an order it is not. → **Renumber S7b's steps in execution order (sky, underground, undercity, town → districts, sub-districts, edge greens, claims) or state the order explicitly at the head of the list.** — *closed by:* conflict ruling CF-PIPE-11
  * CF-PIPE-12 [internal_conflicts; minor] Stage words. §4.10 and §4.11 Works (8) list 'being built', 'being demolished', 'ruined since …'; §10.4 lists 'being built', 'being extended', 'being demolished', 'under repair', 'ruined since'. Same fact, three lists. → **Keep §10.4's list; §4.10 and §4.11 cite it.** — *closed by:* conflict ruling CF-PIPE-12
  * CF-PIPE-13 [internal_conflicts; minor] Unit in the quarry area law: 'the area = volume ÷ headroomCm (250)' divides m³ by centimetres. → **'the area (m²) = volume (m³) ÷ (headroomCm ÷ 100)'.** — *closed by:* conflict ruling CF-PIPE-13
  * EDGE-PIPE-01 [edge_gaps; -] Basement access age term with one growth stage (K = 1): 'age ∈ [0,1] the plot's growth-stage rank (1 for the first stage, 0 for the last)' is undefined when first = last. — *closed by:* edge catalogue (EI-EDGE-PIPE-01)
  * EDGE-PIPE-02 [edge_gaps; -] Dug connector: target beyond digReachM but reachable by a route ≤ 2 × digReachM — step (2) limits targets to digReachM, step (3) refuses routes longer than 2 × digReachM; the case where no target is within digReachM goes to step … — *closed by:* edge catalogue (EI-EDGE-PIPE-02)
  * EDGE-PIPE-03 [edge_gaps; -] S12c on pseudo-districts (hinterland, sky, underground, undercity) — see CF-PIPE-06. — *closed by:* edge catalogue (EI-EDGE-PIPE-03)
  * EDGE-PIPE-04 [edge_gaps; -] Catacomb source age with a staged HistoryHint: 'replaced by the staged HistoryHint.ageYears' — whether every source takes the settlement's age or its stage-scaled age is not stated. — *closed by:* edge catalogue (EI-EDGE-PIPE-04)
  * EDGE-PIPE-05 [edge_gaps; -] Sewer and undercity light 'fuel by the settlement's circumstances' — which circumstance row selects which fuel rows is not stated. — *closed by:* edge catalogue (EI-EDGE-PIPE-05)
  * EDGE-PIPE-06 [edge_gaps; -] Island 'count' as a setAttr/lock target — the record that holds the count (the slots) is not named. — *closed by:* edge catalogue (EI-EDGE-PIPE-06)
  * EDGE-PIPE-07 [edge_gaps; -] Ring spacing factor 1 + f is stated as '[1, 2)' but the folded bell reaches 1 when every uniform is 0, so 2 is reachable. — *closed by:* edge catalogue (EI-EDGE-PIPE-07)
  * EDGE-PIPE-08 [edge_gaps; -] Underground institution depth 8–15 m is stated as a value while the granularity 'institution / assigned' row gives depth 'by requirement' — the depthScale rule cannot produce it. — *closed by:* edge catalogue (EI-EDGE-PIPE-08)
  * WG-PIPE-01 [wiring_gaps; -] dangling reader: §10.2's closing bullet lists the port rows' readers (§4.6, §4.9, II.7.3, II.7.5, §4.5 (6)); none reads customKinds or foodChain. — *closed by:* wiring routing (accounted in wiring.md)
  * WG-PIPE-02 [wiring_gaps; -] consumer not named in §4.2; the readers are II.6/II.7.2's network stage (Terrain.hydro, outfalls), II.7.6's cavern rule (flowAccum) and §10.2's BasementGateRow.drainageAccumCells. — *closed by:* wiring routing (WG-PIPE-02)
  * WG-PIPE-03 [wiring_gaps; -] field with no stated reader; S2's need propagation uses 'the roster's existing substitution' (no farmland → shops), not this field. — *closed by:* wiring routing (WG-PIPE-03)
  * WG-PIPE-04 [wiring_gaps; -] an event named with no declaration, lifecycle row, tool or undo. — *closed by:* wiring routing (WG-PIPE-04)
  * WG-PIPE-05 [wiring_gaps; -] registered by name in §4.12 and PART III, no signature in this unit (NetworkStrategy, EnceinteStrategy, PlacementSolver, DesignationMutator, EvolutionStrategy, SewerStrategy, SkyStrategy and the underground strategies have one). — *closed by:* wiring routing (WG-PIPE-05)
  * WG-PIPE-06 [wiring_gaps; -] declared; its reader (the farm households per farmstead under fill) is not named — S2's farmsteads formula reads fieldHaPerFarmstead only. — *closed by:* wiring routing (WG-PIPE-06)
  * WG-PIPE-07 [wiring_gaps; -] II.6's SewerStrategy input list omits Features.sewers, II.7.2's includes it; the declaration is II.6's, so the declared I/O the DAG sorts on lacks the gate input. — *closed by:* wiring routing (WG-PIPE-07)
  * WG-PIPE-08 [wiring_gaps; -] a diffed user action named by §10.3 with no edit kind, tool or lifecycle row named. — *closed by:* wiring routing (WG-PIPE-08)
  * WG-PIPE-09 [wiring_gaps; -] named as 'epoch events of the owner-staged evolution engine' with no event kind in the base (ConversionOp has none). — *closed by:* wiring routing (WG-PIPE-09)
  * WG-PIPE-10 [wiring_gaps; -] one-ended in the base (empty until @plat/sim). Intentional: WIRED-BY the module (§10.3, M4b). — *closed by:* wiring routing (accounted in wiring.md)
  * WG-PIPE-12 [wiring_gaps; -] a type used by an interface with no declaration (principle (7): every interface has a declaration its implementer and caller share). — *closed by:* wiring routing (WG-PIPE-12)
  * WG-PIPE-11 [wiring_gaps; -] wealthShift lists manor, town house, house, row house, hovel (no cottage); significance lists shack and tent (no lean_to_shelter). — *closed by:* wiring routing (WG-PIPE-11)
  * PIPELINE-NARRATION-001 [narration; -] '(J-Fpipe-2, from Fable's review of 27 September 2026)' in the carve far-part heading → **remove the narration (the validation records keep it) — §4.11 l.6322**
  * PIPELINE-NARRATION-002 [narration; -] 'an inference that Fable's evidence gate released as such (item 58 (f))' → **remove the narration (the validation records keep it) — II.2 l.15312**
  * PIPELINE-NARRATION-003 [narration; -] 'the program's proposed response, adopted as conversion kinds and vetoable' → **remove the narration (the validation records keep it) — II.6 (6) l.15500-15501**
  * PIPELINE-NARRATION-004 [narration; -] 'items 12 and 14 of the owner's amendments of 2026-09-25, evening' → **remove the narration (the validation records keep it) — II.7 l.15587**
  * PIPELINE-NARRATION-005 [narration; -] 'this replaces the rule that an epoch placed delta demand only on new or transformed plots (J-A8.44)' → **remove the narration (the validation records keep it) — §4.11 l.6555-6556**
  * PIPELINE-NARRATION-006 [narration; -] 'The alternatives rejected for this construction are recorded with J-P4 and J-3' (pointer, keep short) → **remove the narration (the validation records keep it) — §4.4 l.4518**
  * PIPELINE-NARRATION-007 [narration; -] owner-dated rulings '(owner, 2026-09-26 …)' — provenance, keep as owner-rule citations → **remove the narration (the validation records keep it) — §4.1 l.3824; §4.11 l.6018; II.7 l.15575; §4.9 l.5818**
  * PIPELINE-NARRATION-008 [narration; -] '(the former "10 % of a district's plots per decade" is the fabric row)' → **remove the narration (the validation records keep it) — §4.11 l.6116-6117**
  * PIPELINE-NARRATION-009 [narration; -] 'the former free-end term is withdrawn — it was a drawing artefact' → **remove the narration (the validation records keep it) — §4.6 step 9 l.5019**
  * PIPELINE-NARRATION-010 [narration; -] '(J-A37.41, which supersedes J-P16's perpendicular-ray far side and its fallback chain)' → **remove the narration (the validation records keep it) — §4.6 step 4 l.4936-4937**
  * BR-PIPE-01 [broken_references; -] The clock is stated above (l.6369), not below. → **correct the pointer (*The clock*, below; J-A76.45) at §4.11 terrain-and-water trigger rows l.6614: **
  * BR-PIPE-02 [broken_references; -] NeighbourhoodRequest has no reason field; the reason is SkyIsland.reason (§2.7). The call cannot carry what the interface lacks. → **correct the pointer the sky-island call … 'and a `reason` (II.6)' at II.1 rule (5) l.15279-15280: **
  * BR-PIPE-03 [broken_references; -] No event or conversion kind for folk-contraction is declared (not in ConversionOp, not in §7.1's event list); the named event has no declaration, lifecycle row or tool. → **correct the pointer folk-contraction as an EVO event at §10.4 l.11826: **

### determinism

* **Size:** 63117 words; the goal band after: 37870–47338 words; 45 restatements to references; 0 BCR blocks to pointers.
* **STATE:** 525 facts (canon.json → units.determinism.state).
* **REFERENCE (45):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | DETERMINISM-0005 | pipeline §4.2 | — (section) |
  | DETERMINISM-0012 | kernel §3.1 | KERNEL-0307 (near) |
  | DETERMINISM-0020 | V02 (the editor finds the section) | — (section) |
  | DETERMINISM-0029 | pipeline §4.6 | — (section) |
  | DETERMINISM-0040 | pipeline §4.7 | PIPELINE-0303 (near) |
  | DETERMINISM-0043 | V03 §5.2 | V03-0255 (fact) |
  | DETERMINISM-0044 | V04 V04 §3.4 | V04-0099 (near) |
  | DETERMINISM-0045 | V04 V04 §3.6 | V04-0144 (fact) |
  | DETERMINISM-0047 | rendering §9.4 | RENDERING-0410 (near) |
  | DETERMINISM-0048 | rendering §8.4 | RENDERING-0264 (fact) |
  | DETERMINISM-0057 | kernel §3.10 | KERNEL-0333 (near) |
  | DETERMINISM-0060 | V02 §2.6 | V02-0224 (near) |
  | DETERMINISM-0064 | V03 §2.6 | — (section) |
  | DETERMINISM-0065 | V03 §2.6 | V03-0255 (near) |
  | DETERMINISM-0066 | model §2.6 | MODEL-0392 (near) |
  | DETERMINISM-0067 | model §2.6 | MODEL-0243 (near) |
  | DETERMINISM-0070 | V06 §4.11 | V06-0011 (near) |
  | DETERMINISM-0071 | V06 §4.11 | — (section) |
  | DETERMINISM-0072 | V04 II.6 | V04-0095 (near) |
  | DETERMINISM-0073 | V04 II.7.3 | V04-0074 (near) |
  | DETERMINISM-0074 | V04 II.7.5 | V04-0077 (near) |
  | DETERMINISM-0076 | model §2.6 | MODEL-0208 (fact) |
  | DETERMINISM-0077 | pipeline §4.7 | PIPELINE-0369 (near) |
  | DETERMINISM-0078 | pipeline §4.7 | PIPELINE-0239 (near) |
  | DETERMINISM-0085 | model §2.6 | MODEL-0310 (near) |
  | DETERMINISM-0089 | model §2.7 | MODEL-0061 (near) |
  | DETERMINISM-0092 | model §2.1 | MODEL-0007 (fact) |
  | DETERMINISM-0093 | kernel §3.10 | KERNEL-0341 (near) |
  | DETERMINISM-0094 | pipeline §4.2 | PIPELINE-0403 (near) |
  | DETERMINISM-0095 | pipeline §4.2 | PIPELINE-0154 (near) |
  | DETERMINISM-0096 | pipeline §4.6 | PIPELINE-0014 (near) |
  | DETERMINISM-0098 | pipeline §4.4 | — (section) |
  | DETERMINISM-0101 | rendering §9.6 | — (section) |
  | DETERMINISM-0102 | pipeline §4.5 | PIPELINE-0223 (near) |
  | DETERMINISM-0106 | model §2.9 | MODEL-0555 (near) |
  | DETERMINISM-0108 | rendering §9.4 | RENDERING-0195 (near) |
  | DETERMINISM-0112 | kernel §3.1 | KERNEL-0043 (fact) |
  | DETERMINISM-0144 | rendering §9.2 | — (section) |
  | DETERMINISM-0148 | rendering §8.10 | RENDERING-0350 (near) |
  | DETERMINISM-0155 | rendering §8.10 | RENDERING-0035 (near) |
  | DETERMINISM-0157 | scope §1 | — (section) |
  | DETERMINISM-0166 | kernel §3.3 | KERNEL-0268 (fact) |
  | DETERMINISM-0221 | kernel §3.2 | — (section) |
  | DETERMINISM-0378 | pipeline §4.7 | — (section) |
  | DETERMINISM-0486 | model §2.9 | — (section) |

* **Terms to replace:** G-lot (lot, lot-driven, lot-derived, BuildingInput.lot → plot (field BuildingInput.plot); 5 hits, first lines [6904, 6977, 9257, 9297, 9298]); G-vectorrung (the vector pass → the vector rung; 1 hits, first lines [6912]); G-strike (decline pool, decline lottery, the lottery → strike pool (defined once in V06 §3.5.2); 2 hits, first lines [7134, 8581]); G-newrandom (scoped re-roll, Try again (in prose), Rebuild … as generated → New random (§7.1); 'Try again' is only its catalogue label; 'reroll' only for rerollLayer; 2 hits, first lines [6945, 8155]).
* **Conflicts it resolves (28):** DIC-01, DIC-02, DIC-03, DIC-04, DIC-05, DIC-06, DIC-07, DIC-08, DIC-09, DIC-10, DIC-11, DIC-12, DXC-01, DXC-02, DXC-03, DXC-04, DXC-05, DXC-06, KXC-01, KXC-02, KXC-04, KXC-05, RXC-02, SCOPE-C01, SCOPE-C11, V04-ICONF-1, V09-ICONF-2, V12-XCONF-2.
* **File f items it applies:** applies its part (also touches): 202, 203, 226, 245, 256, 264, 272, 470, 510, 511, 515, 549, 556, 561. applies (its section): 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 570, 571, 581, 582, 584.
* **File g parts it writes or applies:**
  * item 102: §7.6 (the weight w_sun as a table value)
  * item 103: §7.6 (the tables and their provenance)
  * item 104: §7.7 (the port reads the custom record and the optional definition fields)
  * item 105: §7.7 (activeChains as a port input; a DR row — DR33)
  * item 106: §7.7 DR2, §5.2 F-WALL
  * item 108: §7.7 (T9 and DR9 extended; the ladder table as a port input pinned to the baseline)
  * item 109: §7.7 (DR rows for ancient_ruins, magical_node, the mining deposits and the history events)
  * item 110: §5.3 (the revised deck invariant), §7.1 (T3's retaining kind, T4's raised flag)
  * item 111: §7.1: T2 `ground`'s lake point-and-level form with a spring flag (the oasis added or removed by hand), its §7.4 lifecycle row and undo; §7.7: a dossier's `oasis_water` makes an oasis exist (item 20) — its DR row cites DR1
  * item 113: §7.7: the derivation rows for history (DR36 onward, ID-DR): the peak (peakTier, high-water population, the symbolic peak's evidence order), the replay's events (event → epoch mapping), destruction and refounding, the burial threshold; the replay's record for the clerk (W-DOS-09); §6.1: the replay's streams (deterministic per seed and history)
* **Wiring gaps it closes:** W-DOS-01a, W-DOS-01b, W-DOS-02, W-DOS-09, W-EDIT-01, DWG-01, DWG-02, DWG-03, DWG-04, DWG-05, W-SET-01.
* **Elegance rulings it applies:** E-03, E-04, E-05, E-06, E-07, E-08, E-09, E-10, E-11, E-30.
* **Id rulings it applies:** ID-TOOL, ID-ITEM, ID-LAYER, ID-DR.
* **Disagreements (agreement.md):** `AccessPoint` with V04 (V04-ICONF-1); `EditEvent` with V09 (DXC-04, V09-ICONF-2); `EditEvent` with V10 (DXC-04); `E_OUT_OF_RANGE` with kernel (DXC-01, KXC-01); `F-NUM` with kernel (DXC-01, KXC-01); `W_ACUTE_CORNER` with kernel (KXC-05); `W_SNAP_PASSES` with kernel (KXC-05); `W_CUT_SLID` with kernel (KXC-05); `F-PLOT` with kernel (DXC-06, KXC-02); `W_ATTRACTED` with kernel (KXC-05); `W_HEIGHT_CLAMPED` with kernel (KXC-05); `W_SLIVER_RETYPED` with kernel (KXC-05); `W_STRETCH_SHARED` with kernel (KXC-05); `W_WEDGE_ROUTED` with kernel (KXC-05); `F-PLOT` with pipeline (DXC-06, KXC-02); `E_RUNG_UNAVAILABLE` with pipeline (SCOPE-C01); `F-LIGHT` with rendering (RXC-02); `E_RUNG_UNAVAILABLE` with scope (SCOPE-C01).
* **Edges (edges.md):** 33 UNDEFINED, 4 UNTESTED; 39 UNDEFINED combinations it owns.
* **Open findings routed here (87):**
  * DETERMINISM-RESTATEMENTS-001 [restatements; -] tier-0 feasibility: river descent, stage budgets from demand, precincts reserved → **state it once at §4.2 S1-S3; every other place cites it**
  * DETERMINISM-RESTATEMENTS-002 [restatements; -] F-CUT constants: frame turns of 36 deg x 2, substitution only <= 2 x the band's upper block area, <= 6 kernel calls, residue soft band <= 5 % → **state it once at §4.6 step 8 (a); every other place cites it**
  * DETERMINISM-RESTATEMENTS-003 [restatements; -] castle repair constants: compactness 0.75, 5 % bloat steps, <= 20 passes of 20 %, stop below 0.001 gain → **state it once at §4.8; every other place cites it**
  * DETERMINISM-RESTATEMENTS-004 [restatements; -] minimum plot wedge angle 12 deg (DXC-06) → **state it once at §4.7 / §3.2 (2); every other place cites it**
  * DETERMINISM-RESTATEMENTS-005 [restatements; -] the skeleton validator's checks (DXC-02) → **state it once at §3.8; every other place cites it**
  * DETERMINISM-RESTATEMENTS-006 [restatements; -] the Warning code list (DXC-03) → **state it once at §3.1; every other place cites it**
  * DETERMINISM-RESTATEMENTS-007 [restatements; -] topology on integer centimetres with exact predicates (§6.5 (1)) → **state it once at §3.2; every other place cites it**
  * DETERMINISM-RESTATEMENTS-008 [restatements; -] margin band width 2 m → **state it once at §4.7 S10 step (0); every other place cites it**
  * DETERMINISM-RESTATEMENTS-009 [restatements; -] the 2 MB cap on pack data and host content → **state it once at §2.9; every other place cites it**
  * DETERMINISM-RESTATEMENTS-010 [restatements; -] per-preset values: cut.flattenM 8 m (MFCG), jitter 4.8 m / 2 m (MFCG), FTG 0 → **state it once at §4.6 step 5; §4.7 S11; every other place cites it**
  * DETERMINISM-RESTATEMENTS-011 [restatements; -] crossing.searchBandM default 120 m (bridge anchor radius) → **state it once at §4.2 S1 (5); every other place cites it**
  * DETERMINISM-RESTATEMENTS-012 [restatements; -] the 1 500-person TOWN floor and 120 000 metropolis cap (also stated in §7.7 item 15) → **state it once at §1.1 / §12.2; every other place cites it**
  * DETERMINISM-RESTATEMENTS-013 [restatements; -] the same floor and cap in §7.7 item 15 → **state it once at §1.1 / §12.2; every other place cites it**
  * DETERMINISM-RESTATEMENTS-014 [restatements; -] F-WALL: N = 0 adds no main gate; a sealed circuit's harbour gate → **state it once at §4.2 S3 (7); every other place cites it**
  * DETERMINISM-RESTATEMENTS-015 [restatements; -] F-SITING: a household no district's range admits is housed at the nearest range → **state it once at §4.5 (5); J-A72.50; every other place cites it**
  * DETERMINISM-RESTATEMENTS-016 [restatements; -] undercity bound per rung: TOWN rarely 1, CITY 1-2, METROPOLIS <= 3 → **state it once at II.7.5; every other place cites it**
  * DETERMINISM-RESTATEMENTS-017 [restatements; -] the tiered wing test cost, about 0.06-2.7 us a building → **state it once at §2.6 rule 4; every other place cites it**
  * DETERMINISM-RESTATEMENTS-018 [restatements; -] whole-grid drainage re-run about 16-17 ms at CITY → **state it once at §2.3 / §12.4; every other place cites it**
  * DETERMINISM-RESTATEMENTS-019 [restatements; -] the extra readers of existing concerns (their keying stated here as well as at the readers' homes) → **state it once at §4.11; §4.5; II.2; II.3; II.7; every other place cites it**
  * DETERMINISM-RESTATEMENTS-020 [restatements; -] DR21's works keying (DIC-04) → **state it once at §6.1; every other place cites it**
  * DETERMINISM-RESTATEMENTS-021 [restatements; -] the parity rows' resolution order is stated here and relied on by §13.5 (T23-1) — home here, listed for the matrix → **state it once at §7.6 own / §13.5; every other place cites it**
  * DETERMINISM-RESTATEMENTS-022 [restatements; -] the harbour-work definition (a pier, mole or breakwater arm rooted on one shore) used by the deck invariant → **state it once at §4.8 harbour furniture; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-001 [internal_duplications; -] dossier population floor 1 500 and cap 120 000 with E_RUNG_UNAVAILABLE → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-002 [internal_duplications; -] the dossier-owned refusal and its list of dossier-owned values → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-003 [internal_duplications; -] creation events, dossier events and epochs carrying one are no undo, redo or revert targets → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-004 [internal_duplications; -] the creation prefix and its read-ahead by S2 and the declaring stages → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-005 [internal_duplications; -] continuity over path independence (histories, not states) → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-006 [internal_duplications; -] rung reroll counters stored absolutely in regenerate events; the elaboration cache outside both digests → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-007 [internal_duplications; -] workers merge in lineage order → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-008 [internal_duplications; -] host tables arrive as logged events with provenance host → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-009 [internal_duplications; -] Surprise me draws the intent on intent.surprise of a fresh seed → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-010 [internal_duplications; -] every re-roll is scoped; an unscoped new town only in the empty state → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-011 [internal_duplications; -] dossier existence below the lock; closest option, never omitted → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-012 [internal_duplications; -] an upgrade's undo record is its from version → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-013 [internal_duplications; -] sugar events expand by their recorded sugar.json version → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-014 [internal_duplications; -] dossier-backed existence is held on every map → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-015 [internal_duplications; -] declared means held → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-016 [internal_duplications; -] a dossier event's disruption computed at dry run and stored in the event → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-017 [internal_duplications; -] slug normalisation and class read apart from identity → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-018 [internal_duplications; -] case (4) renames listed, confirmed and stored in the event → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-019 [internal_duplications; -] the terrain operator re-bases what stands on changed ground → **state it once at its first statement; every other place cites it**
  * DETERMINISM-INTERNALDUPLICATIONS-020 [internal_duplications; -] the reroll.maxAdvance advance rule → **state it once at its first statement; every other place cites it**
  * DIC-01 [internal_conflicts; minor] §5.3 defines five invariant scopes (batch-local, stage-end, save, load, CI-only) and assigns load to four rows (the stored binding equals the fold; the neighbourhood character recomputation; the decoded snapshot's roots and chunk… → **Add 'load' to the report's scope enumeration (the verification replay on load rebuilds the report, §5.4).** — *closed by:* conflict ruling DIC-01
  * DIC-02 [internal_conflicts; minor] "Attempt cap" has two readings: the tier table says "<= 3 attempts per reroll", F-CUT runs attempts 0-2 (k x 36 deg, 2 turns) and style.random draws "attempt 0-2" — the cap as a count of attempts; yet many concerns declare "attem… → **Define the cap once (e.g. "the highest attempt index; attempts run 0 ... cap") and restate the geometric ladders' value in that sense (2 for three attempts, or 3 for four).** — *closed by:* conflict ruling DIC-02
  * DIC-03 [internal_conflicts; minor] F-WORK says "report work_cut with the count" and F-BUDGET-TIME "telemetry records time_over", but the report's fields are kernel.workLimitHits and stages[].work, and Telemetry.timeOver is a StageId list; ladderUses.cause is a fre… → **One cause-code enumeration (§5.4) naming each code, its class and its field; the F-rows use those names.** — *closed by:* conflict ruling DIC-03
  * DIC-04 [internal_conflicts; minor] Item 10 says the derivation table is an INDEX whose rule is "stated there, never here", yet DR21's chance cell restates §6.1's works keying (start offset in the epoch's span first, duration second; keyed by the target's lineage w… → **DR21's chance cell reads "works (§6.1)".** — *closed by:* conflict ruling DIC-04
  * DIC-05 [internal_conflicts; minor] The "§7.7 item n" convention names the dossier contract's items, but inside §7.7 bare "item 12", "item 13", "item 14" and "item 16" mean contract items (Assignment.state "through item 14's rows", DR25 "item 14", "item 16 below") … → **Inside §7.7 cite the contract's own items as "§7.7 item n" (or rename them, e.g. "clause n"), keeping bare "item n" for the owner's items.** — *closed by:* conflict ruling DIC-05
  * DIC-06 [internal_conflicts; minor] The tool ids T1-T12 share the T-prefix namespace with test ids (T8-1 ... T8-3, T12-1, T19-4, T65 fixtures, T73-8): "T8" and "T12" read as either a tool or an item's test group (§16 also cites "item 101's T2-T8" for tools). Princi… → **Always cite tools with their names (T8 `fill`) or give tools a distinct prefix.** — *closed by:* conflict ruling DIC-06
  * DIC-07 [internal_conflicts; minor] The toolkit's commitment layers are labelled L0-L4 (intent ... finish), the same labels as the arena refinement levels L0-L4 used in the same sections (a warp's fromLevel 0¦1, "one L1 batch", "one L0 batch"). → **Rename the toolkit layers (e.g. A0-A4, or by word only).** — *closed by:* conflict ruling DIC-07
  * DIC-08 [internal_conflicts; minor] The migrate cell reads "same" with no referent (the previous row's "replays; a footprint whose host plot is unmapped re-creates a plot around it" does not fit merges, splits or conversions). → **State the row's migrate behaviour (e.g. "replays at its log position; an unmapped target is orphaned and reported").** — *closed by:* conflict ruling DIC-08
  * DIC-09 [internal_conflicts; minor] moveStairCore.bay is typed Polygon; every other event geometry is PolygonCm (the unit-carrying type of §2.1). → **Type it PolygonCm.** — *closed by:* conflict ruling DIC-09
  * DIC-10 [internal_conflicts; minor] Text defects: "what moved, wasjoined or vacated" (§5.4); "a proxy is  bit-identical" (§7.8, double space). → **Fix the words.** — *closed by:* conflict ruling DIC-10
  * DIC-11 [internal_conflicts; minor] "(should-have; the schema is the must-have hook)" leaves whether the thirteen listed forms ship open — priority wording that reads as a deferral under principle (6); every form row is otherwise stated. → **State the catalogue as built (its milestone) or cite the ruling that stages it.** — *closed by:* conflict ruling DIC-11
  * DIC-12 [internal_conflicts; minor] Narration of how the text evolved (principle (5)): "Appended by the amendments of 2026-09-25 (items ...)", "Appended with them", "Appended by the amendments of 2026-09-27 ...", "Retired by the same amendments", "Readers the amend… → **Remove the narration (the validation records keep it); keep the ids.** — *closed by:* conflict ruling DIC-12
  * DXC-01 [cross_part_conflicts; minor] §5.2 F-NUM lists E_OUT_OF_RANGE among the detections of an optional chain's precision failure (re-propose, then reject the chain), while §3.1 classes E_OUT_OF_RANGE as a caller bug reported with its stream key and never stored; t… → **§3.1 is the code's home: F-NUM drops E_OUT_OF_RANGE from its detection column, or §3.1 states that an optional chain's out-of-range point is handled by F-NUM.** — *closed by:* conflict ruling DXC-01
  * DXC-02 [cross_part_conflicts; minor] F-SKELETON's detection restates §3.8's validator as three checks (non-planar, non-monotone faces, inconsistent heights) and omits the fourth (connected, exactly h independent cycles for h holes). → **F-SKELETON cites "§3.8's post-conditions" instead of restating them.** — *closed by:* conflict ruling DXC-02
  * DXC-03 [cross_part_conflicts; minor] §5.4 kernel.warnings enumerates 8 of the 12 Warning codes (W_PLACED, W_PROMOTED, W_STEINER, W_DOWNGRADE absent; W_DOWNGRADE presumably counted as kernel.downgrades). → **kernel.warnings reads "every Warning code of §3.1"; kernel.downgrades is stated to count W_DOWNGRADE.** — *closed by:* conflict ruling DXC-03
  * DXC-04 [cross_part_conflicts; major] Principle (7) requires every edit kind to have its tool. §7.1's twelve-tools table maps 40 of the 70 EditEvent kinds (31 by name, the eight plan events and adjust by description); 30 have no row: unlock, unpin, moveVertex (named … → **One canonical home for the event -> tool binding (the base, since "the tool API and these events are the base's", or V09 §4.3 with §7.1 pointing to it); the table covers every EditEvent kind (history kinds marked with their producer); §7.4's create cells cite that home by tool id.** — *closed by:* conflict ruling DXC-04
  * DXC-05 [cross_part_conflicts; minor] Two registries of the editable tables: §7.6's prose enumeration and V11 §2.1's table registry (one row per table). Neither lists reroll.maxAdvance ("a table value, default 3", §5.1 (6)) or crossing.searchBandM ("default 120 m", §… → **One home for the registry (principle (1)); the other points to it; both table values get a named table and row, or are declared constants.** — *closed by:* conflict ruling DXC-05
  * DXC-06 [cross_part_conflicts; major] §5.2 F-PLOT states the minimum plot wedge angle 12 deg and F-CORRIDOR/§5.3's class-floor row check "the class minimum width and area" and "min width / area / angle per class"; the floors' named constants (minPlotWidth 2.5 m, minI… → **One home for the class floors (a §4.7 table row with every value), read by §3.10's and §5.3's class-floor checks and cited by F-PLOT and F-CORRIDOR without values.** — *closed by:* conflict ruling DXC-06
  * DEL-01 [elegance_candidates; -] The concern registry (§6.1) is a table in disguise: about 70 concerns across six prose paragraphs with per-concern attributes (geometry or not, rerollable, attempt cap, readers, keying, extra readers, retired). One table (id, kin… — *closed by:* elegance ruling (E-list)
  * DEL-02 [elegance_candidates; -] F-EDIT's detection and action columns (§5.2) are a catalogue of about 25 refusal causes restated from §7.1, §7.3, §7.4, §7.5 and §7.7; a refusal-reason table (reason, detection, offered action, home) would be the one home the dry… — *closed by:* elegance ruling (E-list)
  * DEL-03 [elegance_candidates; -] Rename { id, from, to } (§7.1) and ReportEntry's rename variant { id, from, to } (§5.4) are one shape; DisruptionReport.moved { use, from, to ¦ null } and ReportEntry's relocate { use, from?, to? } are one family. Nuance: nullabi… — *closed by:* elegance ruling (E-list)
  * DEL-04 [elegance_candidates; -] The dossier-owned refusal is stated six times (DUPS) — one home (§7.7 item 11) with the others citing it. — *closed by:* elegance ruling (E-list)
  * DEL-05 [elegance_candidates; -] The "no undo target" rule for creation events, dossier events and epochs carrying one is stated in seven places — one home (§7.4 Replay semantics). — *closed by:* elegance ruling (E-list)
  * DEL-06 [elegance_candidates; -] One event -> tool binding table (DXC-04) instead of §7.1's partial table, §7.4's create-column tool names and V09 §4.3's table. — *closed by:* elegance ruling (E-list)
  * DEL-07 [elegance_candidates; -] The world-point records under a warp (§7.4, seven kinds in one long sentence with per-kind host rules, clearance and re-seat/orphan behaviour) as one table (record, host face, clearance, re-seat, orphan rule). Nuance: the door li… — *closed by:* elegance ruling (E-list)
  * DEL-08 [elegance_candidates; -] The schema transforms of §7.5 (two long paragraphs) as one table (record or field, older-document default, first-load derivation, source item). Nuance: "none is invented" cases stay rows. — *closed by:* elegance ruling (E-list)
  * DEL-09 [elegance_candidates; -] The §7.6 table enumeration (prose, about 60 tables) as a pointer to one registry (DXC-05) with readers, slice kinds and extension/presets columns. — *closed by:* elegance ruling (E-list)
  * DEL-10 [elegance_candidates; -] §5.3 rows that restate their rules' homes (epoch rows, Works, underground U1-U3, basement accesses, concealed institutions, clusters) could state only the check and scope and cite the rule's home. Nuance: the scope and the check … — *closed by:* elegance ruling (E-list)
  * DETERMINISM-EDGESOBSERVED-001 [edges_observed; -] A bug abort (F-NUM mandatory chain, F-PLAN ring refusal, F-PLAN count): outcome after the abort undefined (DWG-01). — *closed by:* edge catalogue (EI-DETERMINISM-EDGESOBSERVED-001)
  * DETERMINISM-EDGESOBSERVED-002 [edges_observed; -] reroll.maxAdvance exhausted while building the three variations of §7.3 item 10: how many variations are shown (fewer than three? duplicates?) is not stated. — *closed by:* edge catalogue (EI-DETERMINISM-EDGESOBSERVED-002)
  * DETERMINISM-EDGESOBSERVED-003 [edges_observed; -] New random on a scope entity (or a rung counter) already at the user cap 32 767: the next reroll is not stated (rerolls from 32 768 are reserved for faithfulness references). — *closed by:* edge catalogue (EI-DETERMINISM-EDGESOBSERVED-003)
  * DETERMINISM-EDGESOBSERVED-004 [edges_observed; -] A warp session applied with no strokes (Apply on an empty session): whether an empty warp event is committed is not stated. — *closed by:* edge catalogue (EI-DETERMINISM-EDGESOBSERVED-004)
  * DETERMINISM-EDGESOBSERVED-005 [edges_observed; -] drawBoundary whose polygon covers no L1 cell by at least 50 %: outcome (refused, bent to the nearest cell, empty district) not stated. — *closed by:* edge catalogue (EI-DETERMINISM-EDGESOBSERVED-005)
  * DETERMINISM-EDGESOBSERVED-006 [edges_observed; -] setAttrMany whose query resolves to zero ids; roster with zero lines; group with zero quarters; fill or regenerate on an EditScope ring covering no face: outcomes not stated. — *closed by:* edge catalogue (EI-DETERMINISM-EDGESOBSERVED-006)
  * DETERMINISM-EDGESOBSERVED-007 [edges_observed; -] A request kind with no DisruptionBudgetRow, or a budget of 0: outcome not stated. — *closed by:* edge catalogue (EI-DETERMINISM-EDGESOBSERVED-007)
  * DETERMINISM-EDGESOBSERVED-008 [edges_observed; -] A dossier event that changes a value a user edit had already overridden as a map fact (e.g. a later dossier knownTo on a place whose knownTo the user set while it was a map fact): whether the user's value is superseded and listed… — *closed by:* edge catalogue (EI-DETERMINISM-EDGESOBSERVED-008)
  * DETERMINISM-EDGESOBSERVED-009 [edges_observed; -] An undo section record larger than the 20 MB cap by itself: whether it is kept, dropped with a rebuild-by-replay, or withdrawn is not stated (the cap is stated for the section). — *closed by:* edge catalogue (EI-DETERMINISM-EDGESOBSERVED-009)
  * DWG-01 [wiring_gaps; major] Three ladders end in "a bug that aborts the batch (or rung) with its stream key": F-NUM on a mandatory chain's E_OUT_OF_RANGE, F-PLAN's refusal of a seed, passage or composer ring, and F-PLAN's tier 6 when the capacity-bounded ho… → **§5.4 gains a bug/abort list (class, entity, stream key, stage) and §5.1 states the outcome of a bug abort (e.g. the batch rolls back and its entity takes the class's last rung, reported), with a test in §13.1.** — *closed by:* wiring routing (DWG-01)
  * DWG-02 [wiring_gaps; minor] Type Diff (GenerationReport.requestedVsBuilt: Diff[]; §14's migrate returns { doc, diff: Diff }) is defined nowhere in the base or the twelve volumes (grep). → **Define Diff once (its fields: requested value, built value, reason) at §5.4, and name §7.5's diff shape (entities changed, orphans, changed confirmations, statistics deltas) as the same or a separate type.** — *closed by:* wiring routing (DWG-02)
  * DWG-03 [wiring_gaps; minor] reroll.maxAdvance ("a table value, default 3"; read by §5.1 (6), §6.3 case (3) and §7.3 item 10) and crossing.searchBandM ("default 120 m"; §4.2 S1 (5), §6.3's bridge anchor radius) are called table values, but no table in §7.6's… → **Name each value's table and row (and its range for the tables editor), or declare it a constant.** — *closed by:* wiring routing (DWG-03)
  * DWG-04 [wiring_gaps; minor] GenerationReport.stages[].attempts: number has no producer rule and no reader; nothing says what it counts (tier-3 retries, all ladder uses, kernel attempts). → **State what it counts and who reads it (the report panel, §13.2's cost tests), or drop it (ladderUses already records every retry).** — *closed by:* wiring routing (DWG-04)
  * DWG-05 [wiring_gaps; minor] §2.8's entity registry declares an anchor encoding, hysteresis radius and class family per type "(§6.3)", and §6.3 says every re-derived entity is matched by its anchor; §6.3's anchor table has no row for several re-derivable kin… → **Add their anchor rows (or state that they are re-derived without succession, their references carried by a named rule).** — *closed by:* wiring routing (DWG-05)
  * DWG-06 [wiring_gaps; minor] g items reaching the program after the volumes pass name this unit as a home and have no text in it yet: item 111 (§7.1: T2's spring flag) and item 113 (§7.7: the history replay at generation and the derivation rows for history).… → **The Assemble seat applies f items 327-404, 570, 571, 581, 582, 584 and g items 111 and 113 at these homes.** — *closed by:* wiring routing (accounted in wiring.md)
  * DBR-01 [broken_references; -] §4.5 holds two numbered lists with the same numbers (S7b's 1-7: sky pseudo-districts (5), underground pseudo-district (6), district claims (3); and item 72's character list: band range (5), three dials (6), three distributions (3… → **correct the pointer §4.5 (5), §4.5 (6), §4.5 (3) at §5.2 F-SITING (band-range re-homing); §7.7 items 13-14 (impaired dial term); DR9 (distributions): §4.5 holds two numbered lists with the same numbers (S7b's 1-7: sky pseudo-districts (5), underground pseudo-district (6), district claims (3); and i…**
  * DBR-02 [broken_references; -] no such named tools in §7.1 (its toolkit has twelve tools, none of these names); they resolve to V09 §4.3's rows (T9, T12, T6, T4) — see DXC-04. → **correct the pointer "the Works tools (§7.1)", "the light tool (§7.1)", "building tools (§7.1)", "the underground tools", "a building's context action (§7.1)" at §7.4 create column: no such named tools in §7.1 (its toolkit has twelve tools, none of these names); they resolve to V09 §4.3's rows (T9, …**

### rendering

* **Size:** 59158 words; the goal band after: 35495–44368 words; 9 restatements to references; 0 BCR blocks to pointers.
* **STATE:** 551 facts (canon.json → units.rendering.state).
* **REFERENCE (9):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | RENDERING-0159 | scope §17.2 | — (section) |
  | RENDERING-0235 | pipeline II.7.1 | PIPELINE-0687 (fact) |
  | RENDERING-0274 | model §2.6 | MODEL-0257 (near) |
  | RENDERING-0429 | pipeline §10.4 | PIPELINE-0627 (near) |
  | RENDERING-0486 | model §2.9 | MODEL-0578 (near) |
  | RENDERING-0495 | determinism §7.7 | DETERMINISM-0121 (fact) |
  | RENDERING-0496 | determinism §7.7 | DETERMINISM-0241 (near) |
  | RENDERING-0510 | kernel §3.2 | KERNEL-0080 (near) |
  | RENDERING-0521 | determinism §6.1 | — (section) |

* **Terms to replace:** G-lot (lot, lot-driven, lot-derived, BuildingInput.lot → plot (field BuildingInput.plot); 2 hits, first lines [9959, 12506]); G-refview (reference view → reference viewport; 7 hits, first lines [10688, 10743, 10747, 12856, 12861, 12863]); G-firstmap (first paint → first map; 4 hits, first lines [10480, 10581, 10758, 12595]); G-shadows (projected-shadow pass, projected pass, projected-shadow union, the shadow pass → projected shadows (`shadowPass`); 7 hits, first lines [9611, 9693, 9922, 10405, 10457, 10846]); G-postop (tint(colour, strength) as a post op, the role lights → wash (tint), edgeFade (vignette); the role `lights` → `glow`; 2 hits, first lines [9862, 9925]); G-reservedparch (the reserved parchment → a shipping ink-family variant (RIC-01); 1 hits, first lines [9801]).
* **Conflicts it resolves (10):** RIC-01, RIC-02, RIC-03, RIC-04, RIC-05, RXC-01, SCOPE-C06, V01-XCONF-2, V04-ICONF-3, V08-XCONF-5.
* **File f items it applies:** applies its part (also touches): 202, 223, 232, 245, 278, 296, 365, 372, 391, 482, 518, 568, 575. applies (its section): 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 572, 583.
* **File g parts it writes or applies:**
  * item 102: §8.4 (the path sun reused as a model-side sampler, never the view's light)
  * item 109: §8.2 (the ruin style)
  * item 110: §8 (drawing and shadows)
  * item 111: WIRING CONSEQUENCE: the oasis's spring, grove and gardens draw with existing style rows or named new ones (§8.2), its label kind (§9.1) and its export (§11.1)
  * item 112: §8: every style family and thematic view that encodes meaning in colour (district tints, prosperity, ownership, knowledge, the underground's systems, water and ground classes) carries a second cue (pattern, line style, label or shape); each such style has checked variants for the three common colour deficiencies, selectable in the view settings; default styles keep their look, the second cues drawn at legend-bearing zoom stops and thematic views; §9: legends show the second cue
* **Wiring gaps it closes:** RWG-01, RWG-02, RWG-03, RWG-04, RWG-05, RWG-06, RWG-07, RWG-08, RWG-09.
* **Elegance rulings it applies:** E-16, E-17, E-18, E-19.
* **Disagreements (agreement.md):** `SettlementForge` with V08 (V08-XCONF-5); `F-LIGHT` with determinism (RXC-02); `ObstacleSource` with scope (RXC-01); `LabelTable` with scope (RXC-01).
* **Edges (edges.md):** 37 UNDEFINED, 11 UNTESTED; 38 UNDEFINED combinations it owns.
* **Open findings routed here (76):**
  * RENDERING-RESTATEMENTS-001 [restatements; -] default label face IM FELL Great Primer in every family → **state it once at §17.2 / D-1; every other place cites it**
  * RENDERING-RESTATEMENTS-002 [restatements; -] heights of every building, wing, tower and roof (stage heights by §4.11) → **state it once at §2.6; every other place cites it**
  * RENDERING-RESTATEMENTS-003 [restatements; -] the sewer and island toggles are LayerSpec.visible; existence is the model's → **state it once at II.7.1 (J-A14.42) / II.6; every other place cites it**
  * RENDERING-RESTATEMENTS-004 [restatements; -] fact tiers dossier / declared / map with their meanings (also restated at #authorshiptiers, #apitiers, #t_facttier) → **state it once at §2.8 factTier; every other place cites it**
  * RENDERING-RESTATEMENTS-005 [restatements; -] the port refuses a dossier below 1 500 or above 120 000 people with E_RUNG_UNAVAILABLE (also at #capframe) → **state it once at §7.7 item 15 / §1.1; every other place cites it**
  * RENDERING-RESTATEMENTS-006 [restatements; -] EditBase.dossier.element binding key and EditBase.dossierChange envelope → **state it once at §7.7 items 12-13; every other place cites it**
  * RENDERING-RESTATEMENTS-007 [restatements; -] cap frame 12.4 km square (19.8 km with margins), 17.5 x 8.8 km at aspect 2, ¦x¦ <= 1.40e6 cm, 6x headroom under 2^23 cm → **state it once at §3.2 (9) / §1.1; every other place cites it**
  * RENDERING-RESTATEMENTS-008 [restatements; -] stream-key derivation <= 0.1 us; digest maintenance <= 5 % per batch, finalisation <= 5 ms, full recompute <= 150 ms at CITY → **state it once at §6.1 / §6.2; every other place cites it**
  * RENDERING-RESTATEMENTS-009 [restatements; -] S11 geometry share <= 3 us per plot (also at #stage3budget) → **state it once at §3.7 (M0 bar); every other place cites it**
  * RENDERING-RESTATEMENTS-010 [restatements; -] names from the original grammar; drawn only in §6.3's four cases; a successor keeps its predecessor's name → **state it once at §10.4 / §6.3; every other place cites it**
  * RENDERING-RESTATEMENTS-011 [restatements; -] the per-viewer view keys (knowledge, elaborate, storey, depthBand, plotsOnly, light, sunMode, sunHeight, handLantern, week) → **state it once at §2.9 view section; every other place cites it**
  * RENDERING-RESTATEMENTS-012 [restatements; -] the elaboration cache: one entry per (building, rung, input digest), held by the generation worker, persisted as non-canonical chunks → **state it once at §2.9; every other place cites it**
  * RENDERING-RESTATEMENTS-013 [restatements; -] S6 builds the district merge tree once per model; the city cut is min(N_q, L) → **state it once at §4.5; every other place cites it**
  * RENDERING-RESTATEMENTS-014 [restatements; -] the drawn week = the document's current week or the per-viewer key week → **state it once at §4.11 Which week is drawn / §2.9 week; every other place cites it**
  * RENDERING-RESTATEMENTS-015 [restatements; -] the elaborate trigger policy (click / view) → **state it once at §4.1; every other place cites it**
  * RENDERING-RESTATEMENTS-016 [restatements; -] a dossier-claimed quarter name is protected, re-matched only past the identity hysteresis → **state it once at §7.7 item 16; every other place cites it**
  * RENDERING-RESTATEMENTS-017 [restatements; -] load verification, the kept-snapshot rebase and its install mechanics → **state it once at §2.9 steps 2-4; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-001 [internal_duplications; -] surfaceTopCm is the city band's, never a transient list's: §8.1 DisplayList comment (L9575), §8.1 item 6 (L9639-9640), §8.8 lit export (L10774), §11.1 lit export list (L11993-11995) → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-002 [internal_duplications; -] the city band carries every caster: §8.1 item 2 (L9601-9604), DisplayList comment (L9575), §8.8 pyramid and ring blocks (L10668, L10683-10684), §8.3 mountainous row (L10176) → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-003 [internal_duplications; -] on rungs 1-2 faceLight, the two-tone roof, hillshade and lit crowns emit albedo and normals and the light pass lights them once: §8.2 paint programs (L9876-9879), §8.2 lit on the reference backend (L10090-10091), §8.4 Sun (L10452… → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-004 [internal_duplications; -] labels, live overlays and furniture are composed after the light and never lit: §8.2 layer order (L10048-10049), §8.4 (f) (L10368-10372), §9.4 halo at night (L11334-11336) → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-005 [internal_duplications; -] a light draws only where its host draws: §8.1 item 7 (home, L9654-9661), §8.4 (b) (L10275-10277), §11.1 GeoJSON, glTF and .dd2vtt rows (L11905, L11909, L12034-12036, L12044), §11.1 Knowledge (L11922-11923) → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-006 [internal_duplications; -] a band-less reader admits as at the city band: §9.2 (L11168), §11.1 Knowledge (L11925-11926), §11.2 Knowledge (L12108-12110), §11.2 oracle (L12111) → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-007 [internal_duplications; -] the fixed sun 315 deg / 45 deg: SunSpec comment (L10249), §8.4 (d) (L10352), §8.4 Sun (L10446) → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-008 [internal_duplications; -] the canvas-need formulae and worked values: §8.8 (home, L10731-10751) restated in §12.8 Canvases (L12854-12871) and Lighting (L12885-12886) → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-009 [internal_duplications; -] the generation worker's 24-B index: §8.1 item 6 (L9638-9639), §8.9 threads (1) (L10805-10806), §8.9 crossings (L10825), §11.1 SVG (L11976), §12.8 (L12800-12801) → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-010 [internal_duplications; -] display list ≈ 10 MB and index ≈ 1.4 MB at CITY: §8.1 item 6 (L9636-9639), §12.8 (L12800-12801, L12808, L12831) → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-011 [internal_duplications; -] frozen arena copies ≈ 15 / 20 / 37 MB: §12.4 merge row and METROPOLIS note (L12507, L12522), §12.8 (L12805-12806, L12808-12809, L12831) → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-012 [internal_duplications; -] the port refuses dossiers below 1 500 or above 120 000 people: §11.4 (L12298-12300), §12.2 (L12393-12394) → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-013 [internal_duplications; -] the map never writes to the host: §11.3 One way (L12209-12213), §11.4 door (2) (L12279-12280), §11.4 No door opens the other way (L12308-12312) → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-014 [internal_duplications; -] the export's transient list and its lifecycle: §8.1 item 6 (L9640-9642), §8.9 crossings (L10833), §11.1 Where exports run (L11975-11996), §12.8 Export-time peak (L12838-12844) → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-015 [internal_duplications; -] the scoped-regeneration law ≤ 3 ms + 60 us x buildings in scope: §12.6 Scoped regeneration (L12624) and replay c(e) (L12657) → **state it once at its first statement; every other place cites it**
  * RENDERING-INTERNALDUPLICATIONS-016 [internal_duplications; -] the hand lantern's 6 m radius: §8.4 (b) (home, L10274-10275), §8.3 hand-lantern row (L10177), §12.5 (L12616) → **state it once at its first statement; every other place cites it**
  * RIC-01 [internal_conflicts; major] `parchment` has two statuses and two chroma rules: the palette-target binding calls it 'the reserved `parchment`' and has it aim at the median plate chroma 43 with `lit`, `hatched` and `painterly`, while the presets table lists i… → **One status (a shipping ink-family variant at M3b, as the presets table, §16 and V11 have it) and one chroma rule for it (the ink family's 20-30 by J-A69.82, or a stated band of its own); drop 'reserved' for it in the binding sentence.** — *closed by:* conflict ruling RIC-01
  * RIC-02 [internal_conflicts; minor] 'Every shipped family is lit by the field model with the cursor sun by default' - but `hatched`'s LightingSpec.model is 'vector' (rung 3 by the sheet's own choice) and §8.4 (g) has `hatched` draw rung 3 at every rung; the same se… → **'`ink` and `lit` are lit by the field model ...; `hatched` by its own vector prism pass (LightingSpec.model 'vector', §8.4 (g))'.** — *closed by:* conflict ruling RIC-02
  * RIC-03 [internal_conflicts; minor] The height byte's square-root scale h = (v / 255)^2 x T at T = 160 m has a step T(2v + 1) / 255^2: 0.224 m at 5 m (v = 45.1) and 0.668 m at 45 m (v = 135.2) - matching '≈ 0.2 m at 5 m' and §8.4 (g)'s '≈ 0.67 m at 45 m' - but 0.99… → **'≈ 1.0 m at 100 m'.** — *closed by:* conflict ruling RIC-03
  * RIC-04 [internal_conflicts; minor] The skeleton row says the skeleton is 'a document format under *Knowledge*' and the Authorship paragraph lists it among the formats that carry the log, but the Knowledge paragraph's enumeration of the document formats admitted wh… → **One enumeration of the document formats (the skeleton included), stated once and referenced by the row, the Knowledge paragraph and E_KNOWLEDGE_TIER; the skeleton named among the model formats written in the generation worker.** — *closed by:* conflict ruling RIC-04
  * RIC-05 [internal_conflicts; minor] 'No rung depends on WebGL2 (§8.9)' means the size rungs (TOWN / CITY / METROPOLIS), but the same unit's light ladder has rungs 1-2 that are the GPU pass on WebGL2 / WebGPU; read against §8.4 (g) the sentence contradicts it. → **'No size rung depends on WebGL2 for its marks; the light ladder's rungs 1-2 need a GPU context and rung 3 does not (§8.4 (g))'.** — *closed by:* conflict ruling RIC-05
  * RXC-01 [cross_part_conflicts; minor] §8.5 and §9.2 make the plan draw's room labels protected obstacles S13b reads at the building band, but §14's ObstacleSource.protectedExtents returns kinds 'gate'¦'castle'¦'plaza'¦'bridge'¦'wall' only and S13b reads obstacles onl… → **Add kind 'room' (or a room-label method) to ObstacleSource, implemented by @plat/render from the building band's room-label text marks; §9.2 cites it.** — *closed by:* conflict ruling RXC-01
  * RXC-02 [cross_part_conflicts; minor] F-LIGHT's detection column lists 'no GPU context, a lost context, the pass over its frame budget', while §8.4 (g) and §8.8 lower the rung on 'three consecutive frames over the pass's budget', choose the vector rung at start-up wh… → **F-LIGHT's detection cites '§8.4 (g)'s and §8.8's triggers' instead of restating them.** — *closed by:* conflict ruling RXC-02
  * REL-01 [elegance_candidates; -] `tint` names a paint program (district tints, K12), a post operation (tint(colour, strength), K07) and the condition overlay's settlement-wide post-operation tint; `vignette` names a paint program, a post operation 'on the view' … — *closed by:* elegance ruling (E-list)
  * REL-02 [elegance_candidates; -] The knowledge admission is re-stated at each reader (labels §9.2, legend §9.5, thematic rows §8.2, exports §11.1, API §11.2): one admission function at §9.2 with its readers listed, each reader citing it; nuance to keep: the band… — *closed by:* elegance ruling (E-list)
  * REL-03 [elegance_candidates; -] §12's measurement-and-fallback clauses (≈ 25: first map, settle, lit settle, GPU frame, model laws, max clause, pool choice, CITY split, M0 spike, replay, warp, previews, labels, trees, crowns, light bake, lit export, SVG, PNG, e… — *closed by:* elegance ruling (E-list)
  * REL-04 [elegance_candidates; -] The per-viewer key list in §11.3 View state re-enumerates §2.9; 'every view key of §2.9 travels as view.set / view.changed except the pointer and `underlay`' says the same; nuance to keep: `time`'s sim.advance and the host's `wee… — *closed by:* elegance ruling (E-list)
  * REL-05 [elegance_candidates; -] 'light' is a MarkKind, two roles (`light`, `lights`), a StyleSheet field (LightingSpec), a view key and a table (LightTable), and `lit` is a family and a preset; renaming the role `lights` to `glow` (the program it feeds) would r… — *closed by:* elegance ruling (E-list)
  * REL-06 [elegance_candidates; -] The internal duplications listed (surfaceTopCm, every caster, rungs 1-2 albedo, never-lit overlays, light host, band-less admission, fixed sun, canvas formulae, 24-B index, sizes, copies, port refusal, one-way rule, transient lis… — *closed by:* elegance ruling (E-list)
  * REDGE-01 [edges_observed; major] A region group may name 'any set of nodes whose districts are disjoint' - not necessarily contiguous - and its spine is 'from the union of the members' faces by §9.3's area rule', which is defined for one face (simplify, hole-awa… — *closed by:* edge catalogue (EI-REDGE-01)
  * REDGE-02 [edges_observed; minor] The knowledge filter's list of always-`public` rows (ways, districts, quarters, water bodies, woods, gates, the title, annotations) omits the kinds `region`, `landmark`, `place` and `address`; landmark, place and address take the… — *closed by:* edge catalogue (EI-REDGE-02)
  * REDGE-03 [edges_observed; minor] The greedy's default priority order (region > quarter / district > water > landmark > place > gate > way > address) omits the LabelEntity kinds `wood` and `annotation`, so their default priority - and hence their place in the str… — *closed by:* edge catalogue (EI-REDGE-03)
  * REDGE-04 [edges_observed; minor] The island rows draw `waning` / `settled` at 'alpha x 0.8 / alpha x 0.6 with the ghost share raised (§8.4)'; §8.4 defines only ghostAlpha (default 0.35) - whether 'raised' is the effect of the alpha factor or a separate raise, an… — *closed by:* edge catalogue (EI-REDGE-04)
  * RWG-01 [wiring_gaps; major] PinnedPlacement carries `dirCdeg` (a point label's direction) and `lines` (1 ¦ 2) (§9.1), but LabelTable - the only pinned-placement input S13b reads (§8.1 item 2, §9.2's LabelRows) - has columns pinStop, pinSizePx, pinAnchor, pi… → **Add `pinDirCdeg` (Int32, 4 B) and `pinLines` (Uint8, 1 B) to LabelTable, written by S14 from LabelEntity.pinned and read by the pin pass (the row stays within its 97 B bound: 89 + 5 = 94 B).** — *closed by:* wiring routing (RWG-01)
  * RWG-02 [wiring_gaps; major] Seven of the 23 roles - `ambience`, `light`, `lights`, `sand`, `plank`, `grid`, `snow` - and every `@night` and `@autumn` variant have no shipped value in any family (the role-value table covers the other roles; grep finds no val… → **Give each family's values (or a stated derivation rule, e.g. @night = f(day value)) at the role-value table's home, and add the pairs the matrix must check (e.g. snow / road, grid / paper).** — *closed by:* wiring routing (RWG-02)
  * RWG-03 [wiring_gaps; major] The band a zoom stop draws is 'entered at its threshold stop, left one stop past it' (§8.5), and stop k has 'm_k metres per CSS pixel' (§8.8), but no threshold stop for the city, district, neighbourhood or building band and no an… → **State m_k (e.g. m_0 at 1:50 000 at 96 CSS px per inch, m_k = m_0 · 2^(-k/4)) and each band's entry stop in §8.8 (the canonical home of the stops), read by §8.5's hysteresis and §9.2.** — *closed by:* wiring routing (RWG-03)
  * RWG-04 [wiring_gaps; minor] Four StyleSheet field types are named but never declared: DetailBudget (StyleSheet.budgets - no content, reader or test anywhere; §8.5's 'per-band detail budgets by hardware tier' is the only prose), LabelStyle (only `leaders` is… → **Declare each type at §8.2 with its reader (DetailBudget: what it caps, read by S14 or the raster, tested by a census row) or remove `budgets`.** — *closed by:* wiring routing (RWG-04)
  * RWG-05 [wiring_gaps; minor] Produced or declared, never consumed: StyleSheet.family 'graphic' (one occurrence in the set; no preset or family row); the MarkTable attribute column `tintKey` (one occurrence; tints are per-district colouring indices); LayerSpe… → **Name each one's producer and consumer (e.g. `tintKey` written by S14 from the district colouring, read by the `tint` program) or remove it with a ruling.** — *closed by:* wiring routing (RWG-05)
  * RWG-06 [wiring_gaps; minor] II.7.1 (L15625-15626) says '§11's exporters write the underground layer when its `exportSeparately` says so', but no §11.1 row reads LayerSpec.exportSeparately (the VTT row writes one scene set per model layer unconditionally; pe… → **§11.1 states which exports read exportSeparately (and what they do when it is false), or II.7.1 drops the clause.** — *closed by:* wiring routing (RWG-06)
  * RWG-07 [wiring_gaps; minor] `live.people` is 'registered by the simulation module' (§8.2), but §10.3 never names or registers it (one occurrence in the set); the provider's registration end is missing. → **§10.3 names the provider live.people, its registration through §14's LiveLayerProvider registry and the occupancy it reads.** — *closed by:* wiring routing (RWG-07)
  * RWG-08 [wiring_gaps; minor] The render-tag table RH32 indexes is 'fixed' but never enumerated (tags appear piecemeal: role names, 'weathering', 'stamp.variant', 'grid.jitter.x', 'grid.jitter.y'); and `seamClose` - 'semantics declared seamClose' (§8.8) - has… → **One render-tag table at §8.1 item 5 listing every tag and its reader; name the seamClose field (registry row or StyleSheet.symbols) and its writer.** — *closed by:* wiring routing (RWG-08)
  * RWG-09 [wiring_gaps; minor] The symbolisation rows for gates (gap = max(model opening, 1.2 x drawn wall), two flanking square blocks of side 2 x drawn wall) and for piers and bridge decks (k = 1, minPx 1) have no census row; §8.3 checks only wall, tower and… → **Add the gate gap / block size and the pier width to §8.3's MFCG-width row (MFCG's gate blocks ≈ 12 px, pier 3.9 px at size 40).** — *closed by:* wiring routing (RWG-09)
  * RTD-01 [term_defects; minor] 'reference view' (§8.8 worked cases and the 326 / 437 bound; §12.8 canvases) and 'reference viewport' (§12.5) name one thing: 1 440 x 900 CSS px at DPR 2, P = 35. → **one name (reference viewport), defined once at §12.5 or §8.8** — *closed by:* glossary (retired synonyms) / ID rulings
  * RTD-02 [term_defects; minor] 'first paint' (§8.5's heading and paragraph, §8.8 gestures, §12.5 uploads) and 'first map' / 'time to first map' (§8.5, §12.5) name one concept. → **one name (first map)** — *closed by:* glossary (retired synonyms) / ID rulings
  * RTD-03 [term_defects; minor] The rung-3 shadow mechanism has six names (projected shadows, projected-shadow pass, projected pass, the shadow pass, projected-shadow union, shadowPass), and rung 3 itself three (rung 3, the vector rung, the vector pass). → **one name each (e.g. projected shadows via `shadowPass`; the vector rung)** — *closed by:* glossary (retired synonyms) / ID rulings
  * RTD-04 [term_defects; minor] 'occluder slabs', 'the slab list' and 'slab casters' name one record set. → **one name (the slab list; a record of it: a slab)** — *closed by:* glossary (retired synonyms) / ID rulings
  * RENDERING-NARRATION-001 [narration; -] §8.2 role values: 're-tuned on 2026-09-28 onto the palette targets below' (L9754) → **remove the narration (the validation records keep it)**
  * RENDERING-NARRATION-002 [narration; -] §8.2 ink restraint: 'J-A69.82 re-rules J-R3's 18' and '(J-R28, J-R29 kept)' (L9782) → **remove the narration (the validation records keep it)**
  * RENDERING-NARRATION-003 [narration; -] §8.2 lit on the reference backend: 'J-R4 restated by J-A68.82' (L10089) → **remove the narration (the validation records keep it)**
  * RENDERING-NARRATION-004 [narration; -] §8.10 annulus: '(J-R11, J-R48, J-R50, J-R55 stand; J-A53.81)' (L10972) → **remove the narration (the validation records keep it)**
  * RENDERING-NARRATION-005 [narration; -] §12.4: 'so the critical path is re-summed (≈ 255 → ≈ 262 ms p50)' (L12525) → **remove the narration (the validation records keep it)**
  * RENDERING-NARRATION-006 [narration; -] §12.4 S5 row: '(the first M0 measurement)' (L12497) → **remove the narration (the validation records keep it)**
  * RENDERING-NARRATION-007 [narration; -] §12.2: 'The 15 392-building size-80 city of the earlier exports ...' (L12396-12399) → **remove the narration (the validation records keep it)**
  * RENDERING-NARRATION-008 [narration; -] §12.7 stage-3 hook: 'SCL-13's basis were cold first-build samples (item 59)' (L12775) → **remove the narration (the validation records keep it)**
  * RENDERING-NARRATION-009 [narration; -] §12.9 FTG: 'The timed capture so far is ...' and the Critic-2 addendum citation (L12903-12906) → **remove the narration (the validation records keep it)**
  * RENDERING-NARRATION-010 [narration; -] §11.4: 'now or by default later (the plan's "door 1", closed)' (L12310) → **remove the narration (the validation records keep it)**
  * RBR-01 [broken_references; minor] §11.3 never names season or weather; both keys are declared in §2.9's view section (L2444), which §11.3 only carries over the bridge → **correct the pointer The view state (§11.3) carries `season` … and `weather` … at §8.2 Materials, season, weather (L9918): §11.3 never names season or weather; both keys are declared in §2.9's view section (L2444), which §11.3 only carries over the bridge**
  * RBR-02 [broken_references; minor] §11.3 never names exportAnchor; §2.9 declares it (L2444) and cites §11.1 back → **correct the pointer remembered per document in the view key `exportAnchor` (§11.3) at §11.1 The two GeoJSON variants (L11954): §11.3 never names exportAnchor; §2.9 declares it (L2444) and cites §11.1 back**
  * RBR-03 [broken_references; minor] circular: each section points at the other for ZoomStop and neither declares its fields (the stop index and m_k); §14 lists the name only → **correct the pointer Zoom stops (`ZoomStop`, §8.1) … / ZoomStop (§8.8) at §8.8 Pyramid (L10637) and §8.1 code comment (L9530): circular: each section points at the other for ZoomStop and neither declares its fields (the stop index and m_k); §14 lists the name only**

### scope

* **Size:** 98458 words; the goal band after: 59075–73844 words; 110 restatements to references; 0 BCR blocks to pointers.
* **STATE:** 747 facts (canon.json → units.scope.state); 819 index rows.
* **HISTORY OUT:** SCOPE-0002, SCOPE-0057, SCOPE-0233, SCOPE-1681, SCOPE-1683, SCOPE-1684.
* **REFERENCE (110):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | SCOPE-0007 | scope summary | SCOPE-0363 (near) |
  | SCOPE-0008 | scope summary | — (section) |
  | SCOPE-0009 | V01 PART II | V01-0501 (near) |
  | SCOPE-0010 | scope summary | SCOPE-0141 (fact) |
  | SCOPE-0011 | model §2.3 | — (section) |
  | SCOPE-0012 | pipeline §4.2 | — (section) |
  | SCOPE-0013 | pipeline §4.2 | — (section) |
  | SCOPE-0014 | pipeline §4.6 | — (section) |
  | SCOPE-0015 | pipeline §4.5 | — (section) |
  | SCOPE-0016 | pipeline §4.7 | — (section) |
  | SCOPE-0017 | pipeline §4.7 | — (section) |
  | SCOPE-0018 | pipeline §4.8 | — (section) |
  | SCOPE-0019 | rendering §8.1 | — (section) |
  | SCOPE-0020 | rendering §12 | RENDERING-0525 (near) |
  | SCOPE-0021 | rendering §12 | RENDERING-0516 (near) |
  | SCOPE-0022 | determinism §7 | — (section) |
  | SCOPE-0023 | determinism §7 | — (section) |
  | SCOPE-0024 | model §2.9 | — (section) |
  | SCOPE-0025 | determinism §6.1 | — (section) |
  | SCOPE-0026 | determinism §5 | DETERMINISM-0001 (near) |
  | SCOPE-0027 | scope summary | — (section) |
  | SCOPE-0028 | scope summary | SCOPE-0652 (near) |
  | SCOPE-0029 | scope summary | SCOPE-0519 (near) |
  | SCOPE-0030 | scope summary | — (section) |
  | SCOPE-0031 | scope summary | SCOPE-0828 (near) |
  | SCOPE-0032 | scope summary | SCOPE-0861 (near) |
  | SCOPE-0033 | scope summary | — (section) |
  | SCOPE-0034 | pipeline §4.2 | PIPELINE-0076 (near) |
  | SCOPE-0035 | determinism §7.6 | DETERMINISM-0502 (near) |
  | SCOPE-0036 | model §2.6 | — (section) |
  | SCOPE-0037 | pipeline §4.6 | — (section) |
  | SCOPE-0038 | pipeline §4.7 | — (section) |
  | SCOPE-0039 | pipeline §4.11 | PIPELINE-0466 (near) |
  | SCOPE-0040 | pipeline §4.11 | — (section) |
  | SCOPE-0041 | determinism §7.7 | DETERMINISM-0547 (near) |
  | SCOPE-0042 | scope summary | SCOPE-0080 (fact) |
  | SCOPE-0043 | scope summary | — (section) |
  | SCOPE-0044 | pipeline §4.6 | — (section) |
  | SCOPE-0045 | pipeline §4.7 | — (section) |
  | SCOPE-0046 | V04 II.7 | — (section) |
  | SCOPE-0047 | pipeline §4.11 | — (section) |
  | SCOPE-0048 | rendering §8.4 | — (section) |
  | SCOPE-0049 | rendering §8.4 | — (section) |
  | SCOPE-0050 | rendering §8.2 | — (section) |
  | SCOPE-0051 | pipeline §4.7 | — (section) |
  | SCOPE-0052 | pipeline §4.5 | — (section) |
  | SCOPE-0053 | determinism §7.7 | — (section) |
  | SCOPE-0054 | V08 §14 | V08-0001 (near) |
  | SCOPE-0055 | determinism §7.1 | — (section) |
  | SCOPE-0056 | scope summary | SCOPE-0828 (near) |
  | SCOPE-0148 | rendering §12 | RENDERING-0516 (near) |
  | SCOPE-0151 | determinism §7.7 | DETERMINISM-0582 (fact) |
  | SCOPE-0153 | determinism §7.7 | DETERMINISM-0121 (fact) |
  | SCOPE-0156 | rendering §1.2 | RENDERING-0294 (fact) |
  | SCOPE-0161 | kernel §2.2 | — (section) |
  | SCOPE-0180 | determinism §7.6 | — (section) |
  | SCOPE-0183 | pipeline §4.11 | PIPELINE-0499 (near) |
  | SCOPE-0184 | pipeline PART II | PIPELINE-0650 (near) |
  | SCOPE-0185 | pipeline PART III | — (section) |
  | SCOPE-0219 | rendering §12 | RENDERING-0505 (near) |
  | SCOPE-0576 | kernel §3 | — (section) |
  | SCOPE-0577 | model §2 | MODEL-0503 (fact) |
  | SCOPE-0579 | pipeline §4.2 | — (section) |
  | SCOPE-0580 | pipeline §4.2 | PIPELINE-0560 (fact) |
  | SCOPE-0581 | pipeline §4 | PIPELINE-0750 (near) |
  | SCOPE-0582 | pipeline §4.7 | PIPELINE-0725 (near) |
  | SCOPE-0583 | V01 §14 | — (section) |
  | SCOPE-0584 | rendering §9 | RENDERING-0454 (fact) |
  | SCOPE-0585 | rendering §8 | RENDERING-0336 (near) |
  | SCOPE-0586 | determinism §7 | — (section) |
  | SCOPE-0587 | rendering §11 | RENDERING-0069 (near) |
  | SCOPE-0589 | pipeline §10 | PIPELINE-0560 (near) |
  | SCOPE-0590 | rendering §11 | RENDERING-0445 (near) |
  | SCOPE-0594 | pipeline §4.12 | PIPELINE-0552 (fact) |
  | SCOPE-0597 | pipeline §14 | PIPELINE-0552 (fact) |
  | SCOPE-0598 | determinism §6.1 | DETERMINISM-0135 (near) |
  | SCOPE-0599 | determinism §6.1 | DETERMINISM-0140 (near) |
  | SCOPE-0600 | pipeline §14 | PIPELINE-0215 (near) |
  | SCOPE-0602 | pipeline §14 | PIPELINE-0551 (fact) |
  | SCOPE-0603 | kernel §3.3 | KERNEL-0206 (fact) |
  | SCOPE-0604 | determinism §6.1 | DETERMINISM-0130 (near) |
  | SCOPE-0605 | pipeline §10 | PIPELINE-0223 (near) |
  | SCOPE-0613 | model §2.6 | MODEL-0279 (near) |
  | SCOPE-0614 | rendering §14 | RENDERING-0454 (fact) |
  | SCOPE-0615 | rendering §8 | RENDERING-0393 (fact) |
  | SCOPE-0616 | determinism §14 | DETERMINISM-0305 (fact) |
  | SCOPE-0617 | determinism §7.1 | — (section) |
  | SCOPE-0618 | rendering §11 | RENDERING-0463 (fact) |
  | SCOPE-0619 | rendering §11 | RENDERING-0453 (near) |
  | SCOPE-0629 | determinism §7.1 | DETERMINISM-0354 (near) |
  | SCOPE-0630 | V10 §14 | V10-0382 (near) |
  | SCOPE-0632 | determinism §7.1 | — (section) |
  | SCOPE-0633 | V09 §7.1 | — (section) |
  | SCOPE-0634 | V09 §7.1 | V09-0225 (near) |
  | SCOPE-0635 | V09 §7.1 | V09-0284 (near) |
  | SCOPE-0636 | V09 §7.1 | V09-0233 (near) |
  | SCOPE-0637 | V09 §7.1 | V09-0286 (near) |
  | SCOPE-0638 | V09 §7.1 | V09-0252 (near) |
  | SCOPE-0639 | V09 §7.1 | — (section) |
  | SCOPE-0640 | V09 §7.1 | — (section) |
  | SCOPE-0641 | V09 §7.1 | — (section) |
  | SCOPE-0642 | V09 §7.1 | V09-0200 (near) |
  | SCOPE-0643 | V09 §7.1 | V09-0264 (near) |
  | SCOPE-0644 | V09 §7.1 | — (section) |
  | SCOPE-0645 | V09 §7.1 | — (section) |
  | SCOPE-0646 | V09 §14 | — (section) |
  | SCOPE-0647 | V09 §14 | V09-0561 (near) |
  | SCOPE-0648 | V09 §14 | V09-0565 (near) |
  | SCOPE-0650 | V09 §10.3 | V09-0593 (near) |
  | SCOPE-0790 | V07 §15.1 | — (section) |

* **Terms to replace:** G-lot (lot, lot-driven, lot-derived, BuildingInput.lot → plot (field BuildingInput.plot); 51 hits, first lines [215, 221, 222, 243, 270, 378]); G-firstmap (first paint → first map; 3 hits, first lines [356, 14842, 16618]); G-shadows (projected-shadow pass, projected pass, projected-shadow union, the shadow pass → projected shadows (`shadowPass`); 1 hits, first lines [153]); G-vectorrung (the vector pass → the vector rung; 1 hits, first lines [17140]); G-strike (decline pool, decline lottery, the lottery → strike pool (defined once in V06 §3.5.2); 2 hits, first lines [16890, 17087]); G-newrandom (scoped re-roll, Try again (in prose), Rebuild … as generated → New random (§7.1); 'Try again' is only its catalogue label; 'reroll' only for rerollLayer; 2 hits, first lines [13666, 13810]); G-portpath (PortRungPath, registerRungPath, its own port path → ProductDecl in StrategyRegistry.products (file f item 202); 1 hits, first lines [17254]); G-JT (J-T → JT; 4 hits, first lines [14079, 14083, 14116, 14124]).
* **Conflicts it resolves (27):** DIC-06, DIC-11, KIC-02, RXC-01, SCOPE-C01, SCOPE-C02, SCOPE-C03, SCOPE-C04, SCOPE-C05, SCOPE-C06, SCOPE-C07, SCOPE-C08, SCOPE-C09, SCOPE-C10, SCOPE-C11, SCOPE-C12, SCOPE-C13, SCOPE-C14, SCOPE-C15, SCOPE-C16, V04-XCONF-2, V07-XCONF-1, V09-J122-1, V12-XCONF-1, CANON-C01, CANON-C03, CANON-C04.
* **File f items it applies:** applies (its section): 200, 201, 202, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 567, 568, 569, 585. applies its part (also touches): 352, 391, 396, 428, 476, 578.
* **File g parts it writes or applies:**
  * item 102: §13 (the bars)
  * item 103: §13.2 (the statistics suite; the coverage bar)
  * item 105: §13.2
  * item 106: §13.2
  * item 107: §13.2
  * item 108: §13.2
  * item 109: §13.2
  * item 110: §13 and §16 (the second known-city fixture at M3a)
  * item 111: §13.2: the bars of item 111 (d) — arid seeds' share of households within walking distance of water above the non-arid baseline; oases only on arid sites unless drawn or supplied; arid sites still draw rivers, lakes and coasts at the arid row's chances; the richest band's mean distance to water below the middle band's; with the oasis chance, the water pull and the climate cell neutral, byte-identical (a NoOpPin, E-20); §0.2's landing row
  * item 112: §13: the style check (simulated-deficiency contrast between every pair of categories a legend distinguishes, against a table threshold) with its test id; the game-master trial (ten to twenty SettlementForge game masters, at least two sessions of play on their own settlements) as a release gate before the public release; its report must exist before release; participants thanked by credit and early access, no payments; §16's release gate row
  * item 113: §13.2: item 113 (g)'s bars (the city-to-village fixture, byte-stable replay, refounded fixture reusing roads, buried ruins past the threshold matching the former geometry, a void LOST on its last link's closing and restored on reopening, a symbolic peak only with evidence, with replay off byte-identical — a NoOpPin); §16: the replay's milestone; §0.2's landing row
* **Wiring gaps it closes:** W-DOS-05, W-DOS-06, W-HOOK-01, W-PKG-01, W-FLD-10, KWG-08.
* **Elegance rulings it applies:** E-20, E-21, E-22, E-23, E-24, E-25, E-26.
* **Id rulings it applies:** ID-TOOL, ID-R, ID-TRACE, ID-JT, ID-APPX, ID-ITEM, ID-JC.
* **Owner questions to mark answered:** J-A68.81 — J-C1 (J122 delegation, this canon): kept as designed; J-A69.82 — J-C2: 20–30 kept for `ink`; 43 is `parchment`'s (RIC-01); item 72 reading — J-C3: kept as designed; J122 other points — languages and the licence follow SettlementForge (J121); simultaneous editing not offered (J122, SCOPE-C08); word lists and symbol artwork written during the build under V11's authoring plan, clean-room (J122) — V11 states it.
* **Cohesion checks:** see *Cohesion checks* (scope).
* **Disagreements (agreement.md):** `SettlementForge` with V08 (SCOPE-C07); `SettlementForge` with V09 (SCOPE-C07, SCOPE-C15, V09-J122-1); `SettlementForge` with V10 (SCOPE-C07); `E_RUNG_UNAVAILABLE` with determinism (SCOPE-C01); `PlatKey` with kernel (KIC-02); `FaceRef` with kernel (KIC-02); `ArenaKey` with kernel (KIC-02); `TransientKey` with kernel (KIC-02); `E_RUNG_UNAVAILABLE` with pipeline (SCOPE-C01); `ObstacleSource` with rendering (RXC-01); `LabelTable` with rendering (RXC-01).
* **Hand-offs to close here (18):** V02:X16, V02:X23, V02:X28, V06:X13, V06:X29, V06:X33, V06:X34, V06:X38, V06:X41, V06:X42, V06:X1, V07:FL-4, V11:X-V12-1, V11:X-V11-16, V11:X-V11-17, V12:X-V12-12, V12:X-V12-15, V12:X-V12-19 (agreement.md lists each).
* **Edges (edges.md):** 8 UNDEFINED, 0 UNTESTED; 0 UNDEFINED combinations it owns.
* **Open findings routed here (73):**
  * RC-01 [restatement_clusters; -] Model and first-map budget laws (first map < 1 s up to ≈ 48 000 people, ≈ 2.3 s at 120 000; model bars 100 / 300 / 1 000 ms in 19 of 20 up to ≈ 4 500 / 17 700 / 58 800; §1.2's TOWN ≤ 150 ms, CITY 0.33–0.42 s, METROPOLIS 0.86–1.05… → **state it once at §12.3 / §12.5 (rendering part); every other place cites it**
  * RC-02 [restatement_clusters; -] The unrated-panel rule (provisional — not rated; claim never made; panel offered again) → **state it once at §13.6 (7); every other place cites it**
  * RC-03 [restatement_clusters; -] The house pick (three M3b candidates; candidate 1 ships if no pick by M4; offered again) → **state it once at §13.6 (8); every other place cites it**
  * RC-04 [restatement_clusters; -] The staged-subject list → **state it once at Staged by the owner's roadmap; every other place cites it**
  * RC-05 [restatement_clusters; -] Matched sizes (MFCG 40 / 80 / 130; FTG BIG_TOWN ≈ 5 600, BIG_CITY 24 500; METROPOLIS per D-31) → **state it once at §13.5 (earlier canon) — or §12.2; every other place cites it**
  * RC-06 [restatement_clusters; -] Evidence discipline (CONFIRMED / PLAUSIBLE) → **state it once at §0.3; every other place cites it**
  * RC-07 [restatement_clusters; -] The repository path rule (plat/ outside research/, captures/, reference/) → **state it once at §17.1 (3); every other place cites it**
  * RC-08 [restatement_clusters; -] Effort (185.5–248.5 pw; base 171.5–230.5; stage 2 14–18; cuts to 168.5–220.5) → **state it once at §16; every other place cites it**
  * RC-09 [restatement_clusters; -] The dossier refusals (< 1 500 naming the village product; > 120 000 naming the cap) → **state it once at §7.7 item 15; every other place cites it**
  * RC-10 [restatement_clusters; -] Twelve tools, five layers, three surfaces; the clerk's four roles → **state it once at §7.1 (tools) / §14 (surfaces, UI, clerk); every other place cites it**
  * RC-11 [restatement_clusters; -] The code-reading directive (read to understand, never copy; (code) provenance) → **state it once at §17.1 (1); every other place cites it**
  * RC-12 [restatement_clusters; -] Emulation-first defaults (defaults emulate; extensions ride as table values; parity presets switch them off) → **state it once at §7.6; every other place cites it**
  * RC-13 [restatement_clusters; -] The default day view (cursor sun; fixed sun upper left 45°; MFCG preset casts no shadow) → **state it once at §8.4; every other place cites it**
  * RC-14 [restatement_clusters; -] The palette targets (ink plate chroma 20–30; band middle 43; owner-opened corpus bands) → **state it once at §8.2; every other place cites it**
  * RC-15 [restatement_clusters; -] §14's interface block copies (Kernel façade, StreamOpts, ConcernId, Rng, StageContext, Stage/StageDecl, EditEngine, event-kind lists) → **state it once at §3.3–§3.4, §6.1, §4.1/§4.12, §7.1, §11.2; every other place cites it**
  * RC-16 [restatement_clusters; -] §1.4's fusion rows restate each stage's mechanism → **state it once at §4.x homes; every other place cites it**
  * RC-17 [restatement_clusters; -] Bar tier schedules (which T-bars run in which CI tier from which milestone) → **state it once at §13.8; every other place cites it**
  * RC-18 [restatement_clusters; -] The layers column of RungProfile (islands gate; sewers by tier; undercity ≤ 1/2/3 with TOWN > 6 000 at 0.2) → **state it once at §1.1 (data) / II.6 (2), II.7.1, II.7.5 (rules); every other place cites it**
  * SCOPE-C01 [conflicts; -] {"id": "SCOPE-C01", "items": ["SCOPE-0142", "SCOPE-0151", "SCOPE-0427", "SCOPE-0607", "SCOPE-0624", "SCOPE-0931", "SCOPE-1448", "SCOPE-1675"], "statement_a": "A dossier below 1 500 people is refused by the port (E_RUNG_UNAVAILABL… — *closed by:* conflict ruling SCOPE-C01
  * SCOPE-C02 [conflicts; -] {"id": "SCOPE-C02", "items": ["SCOPE-0096", "SCOPE-0831", "SCOPE-1059", "SCOPE-1232", "SCOPE-1254", "SCOPE-1258", "SCOPE-1365", "SCOPE-1373", "SCOPE-1484"], "statement_a": "Judgment-calls index row J-P16 (l.16625) still states 'N… — *closed by:* conflict ruling SCOPE-C02
  * SCOPE-C03 [conflicts; -] {"id": "SCOPE-C03", "items": ["SCOPE-0828", "SCOPE-0855", "SCOPE-0918", "SCOPE-1355"], "statement_a": "J-A16.01 (l.16921) records amendments b's pricing with 'the total 166–220'.", "statement_b": "§16 effort table total (l.14917)… — *closed by:* conflict ruling SCOPE-C03
  * SCOPE-C04 [conflicts; -] {"id": "SCOPE-C04", "items": ["SCOPE-0010", "SCOPE-0140", "SCOPE-0141", "SCOPE-0183", "SCOPE-0569", "SCOPE-0827", "SCOPE-0857", "SCOPE-0923", "SCOPE-0933", "SCOPE-1672", "SCOPE-1676", "SCOPE-1677", "SCOPE-1678", "SCOPE-1679"], "s… — *closed by:* conflict ruling SCOPE-C04
  * SCOPE-C05 [conflicts; -] {"id": "SCOPE-C05", "items": ["SCOPE-0622", "SCOPE-0627", "SCOPE-0835", "SCOPE-1679"], "statement_a": "Staged SF row (l.17258): 'The staged part: … the audience table and the display names in use (item 85)'.", "statement_b": "§16… — *closed by:* conflict ruling SCOPE-C05
  * SCOPE-C06 [conflicts; -] {"id": "SCOPE-C06", "items": ["SCOPE-0049", "SCOPE-0050", "SCOPE-0052", "SCOPE-0127", "SCOPE-0128", "SCOPE-0917", "SCOPE-1570", "SCOPE-1580", "SCOPE-1610"], "statement_a": "Normative text still puts base questions to the owner: s… — *closed by:* conflict ruling SCOPE-C06
  * SCOPE-C07 [conflicts; -] {"id": "SCOPE-C07", "items": ["SCOPE-0630", "SCOPE-0646", "SCOPE-1635", "SCOPE-1680"], "statement_a": "§14 (l.14513-14529): a clerk is the host's own or 'the built-in one, which is staged'; the built-in clerk opt-in and labelled … — *closed by:* conflict ruling SCOPE-C07
  * SCOPE-C08 [conflicts; -] {"id": "SCOPE-C08", "items": ["SCOPE-0631", "SCOPE-0646", "SCOPE-0835"], "statement_a": "Summary l.59-60 'undo works for several people sharing a town'; §16 M3a's bridge convergence test (a host and three headless clients editing… — *closed by:* conflict ruling SCOPE-C08
  * SCOPE-C09 [conflicts; -] {"id": "SCOPE-C09", "items": ["SCOPE-0862", "SCOPE-0864", "SCOPE-0927", "SCOPE-1157"], "statement_a": "§17.1 (1), D-29 and J-S8: implementer seats read only docs/ARCHITECTURE.md, the implementer digest, plat/, published papers an… — *closed by:* conflict ruling SCOPE-C09
  * SCOPE-C10 [conflicts; -] {"id": "SCOPE-C10", "items": ["SCOPE-0145", "SCOPE-0475"], "statement_a": "RungProfile.matched.ftgSize?: 'BIG_TOWN'¦'BIG_CITY'¦'METROPOLIS' (§1.1 l.306).", "statement_b": "Baseline.matched.ftgSize?: 'BIG_TOWN'¦'BIG_CITY'¦'CITY'¦'… — *closed by:* conflict ruling SCOPE-C10
  * SCOPE-C11 [conflicts; -] {"id": "SCOPE-C11", "items": ["SCOPE-0238", "SCOPE-0633", "SCOPE-0640", "SCOPE-0641", "SCOPE-0642", "SCOPE-0644", "SCOPE-0833"], "statement_a": "§14's tools are named T1 intend … T12 dress; §16 M2a 'item 101's T9 shape and T10 ho… — *closed by:* conflict ruling SCOPE-C11
  * SCOPE-C12 [conflicts; -] {"id": "SCOPE-C12", "items": ["SCOPE-0157", "SCOPE-0159", "SCOPE-0646"], "statement_a": "§14's interaction contract numbers its rules R1–R19 (R17 folded).", "statement_b": "The base cites IMPROVEMENTS requirement ids with the sam… — *closed by:* conflict ruling SCOPE-C12
  * SCOPE-C13 [conflicts; -] {"id": "SCOPE-C13", "items": ["SCOPE-0080", "SCOPE-0875", "SCOPE-0920", "SCOPE-1358"], "statement_a": "§17.3 'Until the owner chooses, the plat/ repository is proprietary … flagged for the owner's veto'; D-22 '(owner veto) … unti… — *closed by:* conflict ruling SCOPE-C13
  * SCOPE-C14 [conflicts; -] {"id": "SCOPE-C14", "items": ["SCOPE-0929"], "statement_a": "D-31: 'a one-month premium FTG subscription for one measured capture is the owner's option'.", "statement_b": "J122 V12 Q-V12-1: 'one month of FTG's premium tier — no'.… — *closed by:* conflict ruling SCOPE-C14
  * SCOPE-C15 [conflicts; -] {"id": "SCOPE-C15", "items": ["SCOPE-0003", "SCOPE-0917", "SCOPE-0952"], "statement_a": "Title block and D-19: the codename PLAT is a placeholder (D-19), a default that costs nothing to change.", "statement_b": "J122 V09 Q3: the … — *closed by:* conflict ruling SCOPE-C15
  * SCOPE-C16 [conflicts; -] {"id": "SCOPE-C16", "items": ["SCOPE-0593", "SCOPE-0595", "SCOPE-0651"], "statement_a": "§14 lists 17 packages (@plat/kernel … @plat/testkit) and the dependency chain over them.", "statement_b": "The volumes declare further packa… — *closed by:* conflict ruling SCOPE-C16
  * EL-01 [elegance_candidates; -] Three copies of the owner-item bar convention (§13.2 l.13229 amendments b, l.13415 amendments c, l.13460 owner rules; J-A63.01): one convention paragraph ('hard unless banded; tier from §13.8; from the milestone §16 names; a stag… → **UNIFY candidate — equivalence: the three state the same four clauses; the owner-rules copy adds the registry path-test list for amendments c and the declared-shift clause for goldens (keep both as lines of the one convention)** — *closed by:* elegance ruling (E-list)
  * EL-02 [elegance_candidates; -] Two tier-schedule paragraphs in §13.8 plus per-milestone T-lists in §16's exits: one schedule table (test id or range → CI tier → first milestone), cited by §16's exits. → **UNIFY candidate — every T-range's tier and milestone must carry over exactly (e.g. T28-12's wings clause from M3a, the plan clause from stage 3's intake)** — *closed by:* elegance ruling (E-list)
  * EL-03 [elegance_candidates; -] §0.2's three landing tables (items 1–7; 8–31; 32–72 and 101) share one discipline and one column set: one table. → **UNIFY candidate — the clause-map column exists in all three** — *closed by:* elegance ruling (E-list)
  * EL-04 [elegance_candidates; -] §13.9's re-signing lists (4), (5), (7) split by amendment round: one list of calibratable table families. → **UNIFY candidate — the exclusion 'dossier row sets are not re-signed' stays** — *closed by:* elegance ruling (E-list)
  * EL-05 [elegance_candidates; -] §16's effort basis cells carry per-round '+x pw' narration (amendments b; c–e): one itemised basis per line (the numbers kept). → **shrink (narration) — the line totals and milestone carries unchanged** — *closed by:* elegance ruling (E-list)
  * EL-06 [elegance_candidates; -] The summary's two appended 'amendments' paragraphs: folded into the plain-words body by subject. → **shrink (narration) — every fact they carry kept once** — *closed by:* elegance ruling (E-list)
  * EL-07 [elegance_candidates; -] Judgment-calls index: a supersession marker column (J-P16 → J-A37.41; J-A29.01 → J-A50.01/J-A50.21; J-A30.71/72 → J-A20.77; J-A30.22 → J-A30.24; J-A8.21 → J-A8.22) instead of inline '(amended by …)' notes. → **form change — no row dropped** — *closed by:* elegance ruling (E-list)
  * EL-08 [elegance_candidates; -] FTG size enumerations (RungProfile.matched.ftgSize vs Baseline.matched.ftgSize): one enumeration type. → **UNIFY candidate (SCOPE-C10) — 'CITY' (FTG's timed CITY preset, §13.5 generation-time row) must stay expressible** — *closed by:* elegance ruling (E-list)
  * EL-09 [elegance_candidates; -] D-5 pair and FtgCapture types repeat (population, populationSource, water): D5Pair's FTG arm could reference FtgCapture. → **KEEP APART candidate — D5Pair carries platSeed and suburbFrame; a reference must keep both** — *closed by:* elegance ruling (E-list)
  * W-01 [wiring_findings; -] ContentProvider (§14 interface; extension point 'host rosters, after the double-run check'): a caller (@plat/content through §11.4's double-run check) and no implementer anywhere in the set (0 mentions in V01–V12). — *closed by:* wiring routing (accounted in wiring.md)
  * W-02 [wiring_findings; -] CorpusAdapter / CalibrationRun (§13.9): the base declares the interface 'written in the owner's staged phase'; the implementer must be V12's (4 mentions) — confirm V12 implements maps() and emits CalibrationRun with ShiftRecord c… — *closed by:* wiring routing (accounted in wiring.md)
  * W-03 [wiring_findings; -] DossierDigest fields whose only base mention is the §14 declaration (no base consumer found by name): stressors, governingPower, incomeSources, foodChains, custom.definitions, mPerRealmUnit, kindLabel, renamedFrom, religion.deity… — *closed by:* wiring routing (accounted in wiring.md)
  * W-04 [wiring_findings; -] Extension points (§14): each needs its implementer — village NetworkStrategy/EnceinteStrategy/density StageDecl/'houses along ways' FabricStrategy (V07), SkyStrategy (V05), SewerStrategy and the underground strategies (V04), Evol… — *closed by:* wiring routing (accounted in wiring.md)
  * W-05 [wiring_findings; -] The owner-item hook bars run on hook fixtures 'until the engine lands, when the same bars bind it' (§13.2 ×3, J-A63.01): the base end is here; the volume end (which T-V… test re-runs or supersedes each T-bar) is not named. — *closed by:* wiring routing (accounted in wiring.md)
  * W-06 [wiring_findings; -] H32 (defined §13.6 (2), packaged in @plat/model, J-S29 'where §6.1, §13.6') is consumed by the port's one-way seed (§14 port (2), T85-2) and by D-5 seeds; both ends present; the home is the canon's call. — *closed by:* wiring routing (accounted in wiring.md)
  * W-07 [wiring_findings; -] known-defects.json: written by §13.5's ⟨M-1⟩ rule, §13.7's not-achieved fallbacks, §13.2's campaign second failure, §13.4's light and palette fallbacks, §13.6 (6); read by @plat/docs release notes, MilestoneRecord.knownDefects an… — *closed by:* wiring routing (accounted in wiring.md)
  * W-08 [wiring_findings; -] ParityReport: written by the parity CLI; read by MilestoneRecord.parity, CalibrationRun.before/after and release notes — both ends present; Baseline rows with reference corpus:… are produced only by V12's corpus phase. — *closed by:* wiring routing (accounted in wiring.md)
  * W-09 [wiring_findings; -] The first-five-minutes test is an exit criterion of MilestoneRecord at M2a and M3a (§13.4) and appears in §16's M2a and M3a exits — both ends present. — *closed by:* wiring routing (accounted in wiring.md)
  * W-10 [wiring_findings; -] DossierFixtureRow.neverPublish (host seed and config) is read by T85-2's no-occurrence check — both ends present. — *closed by:* wiring routing (accounted in wiring.md)
  * ID-01 [id_hygiene; -] Tool ids T1–T12 (§14, §16 M2a/M3a/M3b) collide with the owner-item bar family T⟨item⟩-⟨n⟩ cited bare as T8, T10, T11 in §13.8 (SCOPE-C11). — *closed by:* ID rulings
  * ID-02 [id_hygiene; -] R1–R19 (§14 interaction contract) collide with IMPROVEMENTS requirement ids R3, R6, R8, R9, R13 cited in §1.2, §1.4, §13.2, §13.4 and with 'R11' (a repair round) in J-A28.02 and J-A32.02 (SCOPE-C12). — *closed by:* ID rulings
  * ID-03 [id_hygiene; -] Provenance trace keys P⟨n⟩ and D⟨n⟩ (§17.1 (6)) share letters with the P parity class and the D-n decisions; §15.1's MFCG row 'D1' and FTG row 'D1' are table-local ids beside D-1. — *closed by:* ID rulings
  * ID-04 [id_hygiene; -] 'J-T' names a rule (§13.7) inside the J- namespace without an index row or Part A entry. — *closed by:* ID rulings
  * ID-05 [id_hygiene; -] 'A.3' in Appendix A has no A.1 / A.2 (they moved to the rationale file). — *closed by:* ID rulings
  * ID-06 [id_hygiene; -] 'item N' means an owner/amendment item and also a numbered paragraph of a section ('§7.7 item 15' vs owner item 15); every use in the unit carries its section prefix (49 sub-item pointers checked, all resolve), but a bare 'item 1… — *closed by:* ID rulings
  * ID-07 [id_hygiene; -] CONFIRMED by script: the Judgment-calls index has 736 rows with 736 distinct ids, each with exactly one Part A entry in docs/ARCHITECTURE-RATIONALE.md and no Part A entry outside the index; D-1–D-35 each defined once; 203 base te… — *closed by:* ID rulings
  * ID-08 [id_hygiene; -] §15.1's capability ids repeat per reference table (A1, B1 … in MFCG, FTG and NG); cross-set citations must carry the reference ('FTG C9'). — *closed by:* ID rulings
  * CO-01 [cohesion_observations; -] The unit never points at the design volumes: 0 pointers to docs/volumes/V01–V12 or INDEX.md across its 98 458 words (script count). The title, the reading contract, the one-page summary, §1.1's stage table, §14, §15, §16, §17.1 a… → **see Cohesion checks (scope)**
  * CO-02 [cohesion_observations; -] §14 places none of the volumes' packages (@plat/buildings, @plat/under, @plat/sky, @plat/evolve, @plat/village, @plat/bridge-client, @plat/clerk, @plat/cli) and its dependency chain omits them (SCOPE-C16). → **see Cohesion checks (scope)**
  * CO-03 [cohesion_observations; -] §16's milestone table and D-35 stop at M5; the combined order J122 records (V-M0 after M0; M3c beside M3b; after M4: M5 ∥ V-M ∥ M6-E ∥ the plan rung's P0–P1; M6 and M6-U after M5; M6-sky; M-CAL; M-SF) is absent, and the staged en… → **see Cohesion checks (scope)**
  * CO-04 [cohesion_observations; -] §15.1 tags the VG rows VILLAGE-LATER ('checked as not precluded') and the NG rows STAGE-2 'through an interface'; V07 and V01 now deliver them at build depth. → **see Cohesion checks (scope)**
  * CO-05 [cohesion_observations; -] §0.2's landing tables end at item 101; file g's items 102–113 and file f's items 200–585 have no landing rows (the rewrite adds them as the pass applies them). → **see Cohesion checks (scope)** — *closed by:* elegance ruling (E-list)
  * CO-06 [cohesion_observations; -] §13 names no volume test family (T-V…) and says a staged engine's bars 'bind it when the engine lands' without naming which volume tests take which hook bars over (agreement matrix, principle (10)). → **see Cohesion checks (scope)**
  * CO-07 [cohesion_observations; -] §17.1 (1)–(2), D-29 and J-S8 bind implementers to docs/ARCHITECTURE.md alone; the set now includes the volumes (SCOPE-C09); §17.1 (2) check (v) resolves pointers inside one document only; §17.1 (8)'s algorithm list and §17.4's de… → **see Cohesion checks (scope)**
  * CO-08 [cohesion_observations; -] Appendix A's evidence sentence (A.3) and reading record cover the base only; the volumes' evidence grades are not stated here. → **see Cohesion checks (scope)**
  * CO-09 [cohesion_observations; -] g items that name this unit and are verified as F-MISSING if absent: g111 (§13.2 bars), g112 (§13: the colour-blind style check with its checked variants and the game-master trial's place in the release gate), g113 (§13.2 bars); … → **see Cohesion checks (scope)**
  * CO-10 [cohesion_observations; -] J121 subjects stated in this unit: hosting and sharing (§1.7 persistence 'no hosted service — the host is the store'); save limits and backups (D-21 retention); the public name (title, D-19; SCOPE-C15); the licence for users' map… → **see Cohesion checks (scope)**
  * CO-11 [cohesion_observations; -] Principle (4)'s one context vector: this unit exposes it as ContextVector in SitePlanStrategy.plan and GranularityLaw.bands, as DistrictContext / BlockContext in FabricStrategy / PlotStrategy, and as RungProfile.granularity / gre… → **see Cohesion checks (scope)**
  * CO-12 [cohesion_observations; -] Owner questions still open in the text after J122 (SCOPE-C06): the default ink map's cast shadows (J-A68.81), the ink plate chroma 20–30 vs the band middle 43 (J-A69.82), the item-72 surplus-pressure reading; OWNER-DECISIONS-DELE… → **see Cohesion checks (scope)**

### V01

* **Size:** 93140 words; the goal band after: 55884–69855 words; narration ranges alone 12883 words; 57 restatements to references; 46 BCR blocks to pointers.
* **STATE:** 482 facts (canon.json → units.V01.state); 32 index rows.
* **HISTORY OUT:** V01-0622, V01-0623.
* **REFERENCE (57):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | V01-0131 | model §2.1 | MODEL-0462 (near) |
  | V01-0133 | pipeline §4.2 | PIPELINE-0053 (near) |
  | V01-0145 | base? (the editor finds the section) | — (section) |
  | V01-0152 | model §2.5 | — (section) |
  | V01-0153 | model §2.5 | MODEL-0160 (near) |
  | V01-0154 | model §2.7 | MODEL-0503 (near) |
  | V01-0155 | model §2.5 | — (section) |
  | V01-0164 | V12 (the editor finds the section) | — (section) |
  | V01-0171 | V02 V02 §3.16 | V02-0244 (near) |
  | V01-0172 | pipeline II.1 | PIPELINE-0642 (fact) |
  | V01-0174 | pipeline II.1 | PIPELINE-0643 (fact) |
  | V01-0175 | pipeline II.1 | PIPELINE-0644 (near) |
  | V01-0179 | model §2.9 | — (section) |
  | V01-0191 | determinism §7.3 | — (section) |
  | V01-0201 | pipeline §4.12 | PIPELINE-0750 (near) |
  | V01-0223 | pipeline §4.5 | PIPELINE-0209 (near) |
  | V01-0239 | pipeline II.2 | PIPELINE-0660 (near) |
  | V01-0267 | pipeline §4.9 | PIPELINE-0602 (near) |
  | V01-0269 | pipeline §4.2 | — (section) |
  | V01-0274 | V06 (the editor finds the section) | — (section) |
  | V01-0281 | pipeline II.1 | — (section) |
  | V01-0292 | pipeline §4.1 | PIPELINE-0674 (near) |
  | V01-0295 | pipeline II.3 | PIPELINE-0667 (near) |
  | V01-0303 | rendering §8.10 | RENDERING-0363 (fact) |
  | V01-0304 | pipeline II.4 | PIPELINE-0671 (near) |
  | V01-0305 | rendering §9.5 | RENDERING-0428 (near) |
  | V01-0315 | pipeline II.1 | PIPELINE-0642 (fact) |
  | V01-0328 | pipeline §4.2 | PIPELINE-0061 (near) |
  | V01-0339 | pipeline II.1 | PIPELINE-0657 (near) |
  | V01-0340 | pipeline II.1 | — (section) |
  | V01-0341 | pipeline II.1 | PIPELINE-0644 (fact) |
  | V01-0344 | determinism §6.1 | — (section) |
  | V01-0347 | determinism §5.2 | — (section) |
  | V01-0348 | determinism §5.2 | DETERMINISM-0041 (near) |
  | V01-0349 | determinism §5 | — (section) |
  | V01-0352 | V11 (the editor finds the section) | — (section) |
  | V01-0359 | determinism §7.6 | DETERMINISM-0506 (near) |
  | V01-0368 | base? (the editor finds the section) | — (section) |
  | V01-0370 | base? (the editor finds the section) | — (section) |
  | V01-0379 | determinism §7.1 | — (section) |
  | V01-0387 | determinism §7.1 | — (section) |
  | V01-0388 | determinism §7.3 | — (section) |
  | V01-0389 | determinism §7.4 | — (section) |
  | V01-0390 | determinism §7.4 | — (section) |
  | V01-0391 | V10 §2.13 | V10-0008 (fact) |
  | V01-0393 | rendering §11.3 | — (section) |
  | V01-0394 | rendering §8.2 | RENDERING-0266 (near) |
  | V01-0400 | V02 V02 §2.6 | V02-0128 (fact) |
  | V01-0408 | rendering §8.4 | RENDERING-0053 (near) |
  | V01-0410 | rendering §8.2 | — (section) |
  | V01-0411 | rendering §8.2 | RENDERING-0158 (near) |
  | V01-0412 | rendering §9.5 | RENDERING-0433 (near) |
  | V01-0413 | rendering §9 | RENDERING-0012 (near) |
  | V01-0414 | rendering §9.3 | RENDERING-0405 (near) |
  | V01-0415 | rendering §11.1 | — (section) |
  | V01-0416 | rendering §11.1 | RENDERING-0142 (near) |
  | V01-0422 | scope §13 | SCOPE-0565 (near) |

* **Its §10 requests → one-line pointers to the applied f items (47):** BCR-V1-1 (was V01 BCR-1) → item 505; BCR-V1-2 (was V01 BCR-2) → item 539; BCR-V1-3 (was V01 BCR-3) → item 280; BCR-V1-4 (was V01 BCR-4) → item 294; BCR-V1-5 (was V01 BCR-5) → item 210; BCR-V1-6 (was V01 BCR-6) → item 207; BCR-V1-7 (was V01 BCR-7) → item 298; BCR-V1-8 (was V01 BCR-8) → item 284; BCR-V1-9 (was V01 BCR-9) → item 300; BCR-V1-10 (was V01 BCR-10) → item 313; BCR-V1-11 (was V01 BCR-11) → item 340; BCR-V1-12 (was V01 BCR-12) → item 272; BCR-V1-13 (was V01 BCR-13) → item 285; BCR-V1-14 (was V01 BCR-14) → item 405; BCR-V1-15 (was V01 BCR-15) → item 417; BCR-V1-16 (was V01 BCR-16) → item 444; BCR-V1-17 (was V01 BCR-17) → item 422; BCR-V1-18 (was V01 BCR-18) → item 327; BCR-V1-19 (was V01 BCR-19) → item 474; BCR-V1-19 (was V01 BCR-19) → item 568; BCR-V1-20 (was V01 BCR-20) → item 542; BCR-V1-21 (was V01 BCR-21) → item 498; BCR-V1-22 (was V01 BCR-22) → item 544; BCR-V1-23 (was V01 BCR-23) → item 545; BCR-V1-24 (was V01 BCR-24) → item 523; BCR-V1-25 (was V01 BCR-25) → item 373; BCR-V1-26 (was V01 BCR-26) → item 323; BCR-V1-27 (was V01 BCR-27) → item 200; BCR-V1-28 (was V01 BCR-28) → item 540; BCR-V1-29 (was V01 BCR-29) → item 384; BCR-V1-30 (was V01 BCR-30) → item 541; BCR-V1-31 (was V01 BCR-31) → item 345; BCR-V1-32 (was V01 BCR-32) → item 301; BCR-V1-33 (was V01 BCR-33) → item 369; BCR-V1-34 (was V01 BCR-34) → item 421; BCR-V1-35 (was V01 BCR-35) → item 349; BCR-V1-36 (was V01 BCR-36) → item 560; BCR-V1-37 (was V01 BCR-37) → item 554; BCR-V1-38 (was V01 BCR-38) → item 543; BCR-V1-39 (was V01 BCR-39) → item 290; BCR-V1-40 (was V01 BCR-40) → item 448; BCR-V1-41 (was V01 BCR-41) → item 211; BCR-V1-42 (was V01 BCR-42) → item 302; BCR-V1-43 (was V01 BCR-43) → item 245; BCR-V1-44 (was V01 BCR-44) → item 350; BCR-V1-45 (was V01 BCR-45) → item 580; BCR-V1-46 (was V01 BCR-46) → item 584.
* **BCR blocks → pointers (46):** BCR-1 → item 505; BCR-2 → item 539; BCR-3 → item 280; BCR-4 → item 294; BCR-5 → item 210; BCR-6 → item 207; BCR-7 → item 298; BCR-8 → item 284; BCR-9 → item 300; BCR-10 → item 313; BCR-11 → item 340; BCR-12 → item 272; BCR-13 → item 285; BCR-14 → item 405; BCR-15 → item 417; BCR-16 → item 444; BCR-17 → item 422; BCR-18 → item 327; BCR-19 → item 568; BCR-20 → item 542; BCR-21 → item 498; BCR-22 → item 544; BCR-23 → item 545; BCR-24 → item 523; BCR-25 → item 373; BCR-26 → item 323; BCR-27 → item 200; BCR-28 → item 540; BCR-29 → item 384; BCR-30 → item 541; BCR-31 → item 345; BCR-32 → item 301; BCR-33 → item 369; BCR-34 → item 421; BCR-35 → item 349; BCR-36 → item 560; BCR-37 → item 554; BCR-38 → item 543; BCR-39 → item 290; BCR-40 → item 448; BCR-41 → item 211; BCR-42 → item 302; BCR-43 → item 245; BCR-44 → item 350; BCR-45 → item 580; BCR-46 → item 584.
* **Terms to replace:** G-lot (lot, lot-driven, lot-derived, BuildingInput.lot → plot (field BuildingInput.plot); 5 hits, first lines [459, 862, 871, 889, 3006]); G-refview (reference view → reference viewport; 2 hits, first lines [2768, 3030]); G-firstmap (first paint → first map; 2 hits, first lines [2979, 3479]); G-cite (V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 … → Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y; 1501 hits, first lines [73, 113, 121, 150, 151, 160]); G-stairway (stepped (for the way state) → stair-stepped way (the template row keeps `stepped`); 1 hits, first lines [2813]); G-standalone (standalone hood(s), lone neighbourhood document, standalone neighbourhood → standalone neighbourhood document; 26 hits, first lines [271, 488, 743, 809, 810, 837]); G-unitinput (SkyHandover, hand-over (the unit-run view) → SkyUnitInput (the island's unit inputs); `handover` keeps only the reservation passing (IslandInstitution.handover); 19 hits, first lines [339, 415, 418, 420, 838, 1865]); G-DR (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8 → DR26–DR35 (ID-DR); 5 hits, first lines [465, 472, 3598, 3603, 4177]); G-geojson (raisedSupports MultiPolygon, retainingWall kind → raisedSupport (per support), retaining (per run); 1 hits, first lines [3037]).
* **Conflicts it resolves (12):** MC-11, V01-ICONF-1, V01-ICONF-2, V01-ICONF-3, V01-ICONF-4, V01-ICONF-5, V01-XCONF-1, V01-XCONF-2, V02-XCONF-1, V10-XAGREE-2, CANON-C03, CANON-C04.
* **File f items that concern it (cite as base text):** 200, 207, 210, 211, 213, 216, 227, 238, 241, 242, 244, 245, 246, 251, 260, 270, 272, 280, 282, 284, 285, 290, 294, 298, 300, 301, 302, 303, 305, 308, 309, 313, 323, 327, 340, 345, 349, 350, 369, 371, 373, 384, 405, 406, 417, 419, 421, 422, 444, 448, 474, 498, 505, 506, 523, 539, 540, 541, 542, 543, 544, 545, 554, 560, 568, 578, 580, 584.
* **Wiring gaps it closes:** W-DOS-10a, W-IF-03, W-TEST-01, V01-WGAP-1.
* **Elegance rulings it applies:** E-24, E-29.
* **Id rulings it applies:** ID-BCR, ID-WX, ID-DR.
* **Owner questions to mark answered:** Q-V1-1 — J122: yes (the parity presets unchanged).
* **Cohesion checks:** see *Cohesion checks* (every volume).
* **Disagreements (agreement.md):** `BCR-V9-31` with V09 (V01-XCONF-2); `WhyPull` with V10 (V10-XAGREE-2); `FabricStrategyId` with model (MC-11); `TypedBoundary` with model (MC-11).
* **Its own Fix list (§13) and hand-off rows — every item fixed in the text (or marked for the adjudicator with its reason); §13 keeps no open item:** V01-0614, V01-0615, V01-0616, V01-0617, V01-0618, V01-0619, V01-0620, V01-0623.
* **Hand-offs to close here (15):** V02:X14, V02:X24, V02:X31, V06:X11, V06:X16, V06:X28, V06:X40, V06:X45, V10:CVR-V10-6, V10:CVR-V10-13, V11:X-V11-8, V11:X-V11-15, V11:X-V11-16, V12:X-V12-16, V12:X-V12-17 (agreement.md lists each).
* **Edges (edges.md):** 133 UNDEFINED, 99 UNTESTED; 15 UNDEFINED combinations it owns.
* **Open findings routed here (52):**
  * VOL-V01-V02-RESTATEMENTS-001 [restatements; -] glosses of stackAccessDoor, basementDoor, the church class and PorchKindRow columns and ship milestone in the §1.2 hooks table → **state it once at V03 3.7.1, 3.7.2; V02 §2.3; every other place cites it**
  * VOL-V01-V02-RESTATEMENTS-002 [restatements; -] character.anchorSigma value 5 in the landmarkSigma row → **state it once at base §4.5 (S6 character anchors); every other place cites it**
  * VOL-V01-V02-RESTATEMENTS-003 [restatements; -] lane, alley and cul-de-sac 12 %, path 15 % → **state it once at V11 ways.crossing (rampMaxGrade); every other place cites it**
  * VOL-V01-V02-RESTATEMENTS-004 [restatements; -] terrace.slopeMin 0.15, terrace.stepMinCm 60 cm, rampMaxGrade 12 % / 15 % in the §3.14 constants rows that say "read, never restated" → **state it once at V11 terrace row; V11 ways.crossing; every other place cites it**
  * VOL-V01-V02-RESTATEMENTS-005 [restatements; -] clearanceCm cart classes 450 cm, foot classes 250 cm → **state it once at V11 raisedWays.structure; every other place cites it**
  * VOL-V01-V02-RESTATEMENTS-006 [restatements; -] barrier-closure seam typing (shore to water, cliff and gorge to cliff, marsh to marsh, enceinte to wall, sheer never), also stated in V1-3.11 (4) → **state it once at II.1 (BCR-30 (b)); every other place cites it**
  * V01-RESTATE-1 [restatement_findings; minor] The hooks table glosses other volumes' definitions (stackAccessDoor: '@plat/plots, built at M3a: the point, a pure function of eager records'; basementDoor 'the outside door of an external basement'; church-class 'a class whose c… → **Cite V03 3.7.1/3.7.2 and V02 §2.3 only.**
  * V01-RESTATE-2 [restatement_findings; minor] Restates V11's ways.crossing rampMaxGrade values ('lane, alley and cul-de-sac 12 %, path 15 %') while claiming 'one threshold, stated once' — the values' home is V11 (item 110 (a) way-class rule). → **Cite V11's row without the values.**
  * V01-RESTATE-3 [restatement_findings; minor] Row says V11's terrace row is 'read, never restated' but gives its values (terrace.slopeMin 0.15, terrace.stepMinCm 60 cm) and V11's rampMaxGrade values (12 %, 15 %); also narration 'stepped.minSlope leaves hood.constants'. → **Cite V11's keys without values; drop the narration.**
  * V01-RESTATE-4 [restatement_findings; minor] The landmarkSigma row gives its default as 'character.anchorSigma, 5, by default': the key is the base's (§4.5 S6 character anchors, 'σ ≥ character.anchorSigma, 5'), so the value 5 restates a base constant beside its citation. → **Cite character.anchorSigma (base §4.5) without the value.**
  * V01-RESTATE-5 [restatement_findings; minor] Restates V11 raisedWays.structure clearanceCm values ('cart classes 450 cm, foot classes 250 cm') while citing V11 as their home. → **Cite V11 without values.**
  * V01-DUP-1 [internal_duplications; minor] 'the underground rows are volume 4's, which ships none (V04 §1.3, J-V4.97), so an underground close-up draws no hood pins' stated in §1.3, §2.2 hood.pins comment and likely V1-3.8.2 (internal duplication). → **State once (V1-3.8.2) and cite.**
  * V01-DUP-2 [internal_duplications; minor] street_strip restates the spine course law (n = 3 + floor(5u), (n-1)/n, 4 - floor(n/2) passes) already stated in V1-3.4.3 while also citing it ('V1-3.4.3's course'). → **Cite V1-3.4.3; keep only the strip-specific parameters.**
  * V01-DUP-3 [internal_duplications; minor] The barrier-closure seam typing (shore to water, cliff/gorge to cliff, marsh to marsh, enceinte to wall, sheer never) is stated in full twice inside V01 (and its home is II.1 via BCR-30 (b)). → **State once at the BCR-30 home (II.1) and cite from both.**
  * V01-DUP-4 [internal_duplications; minor] fabric.select key rule (lineage key with reroll forced to 0; merge/split inherits anchor key; edit-minted by event seq) stated in full twice (and again in §2.8). → **Keep in §3.12 (concerns) and cite.**
  * V01-DUP-5 [internal_duplications; minor] terraceState's definition (declared / relief row / S1 site primitive under siteShare; walls threshold; eager at S6's end, never from District.fabric) is stated in full in V1-2.3 and again in V1-3.17.1 (1); the stepped weight fact… → **Keep the definition in V1-2.3; 3.17.1 cites it.**
  * V01-ICONF-1 [internal_conflicts; minor] §3.4.3 writes n = 3 + floor(5u) (3-7 segments, literal 5), while §3.14 homes it as tpl.segMin 3 and tpl.segSpan 4; the formula's multiplier (5) is not the span column (4), and the text never states n in terms of the two keys (nor… → **Write n = segMin + floor((segSpan+1) u) (or state span as count) and δ with tpl.courseDelta, in §3.4.3.** — *closed by:* conflict ruling V01-ICONF-1
  * V01-ICONF-2 [internal_conflicts; minor] skyDistrictCount is written three ways: §3.10.3 step 2 'ceil(allocated plot land / (sky.plotShare x context.districtHa))' and §3.14 'ceil(land / (sky.plotShare x districtHa))' mix m² and ha with no conversion, while §3.16 has the… → **State the formula only in §3.16; §3.10.3 and §3.14 cite skyDistrictCount.** — *closed by:* conflict ruling V01-ICONF-2
  * V01-ICONF-3 [internal_conflicts; minor] J-V1.41 still reads 'add an NG preset column to every stage-2 table' (patched only by 'the first sentence's column reads entries'), which contradicts J-V1.98 and V1-3.15 ('entries on hood.constants alone; never on another hood.* … → **Elegance: merge J-V1.41 into J-V1.98 and J-V1.36 into J-V1.77 (one decision each), keeping the reasons.** — *closed by:* conflict ruling V01-ICONF-3
  * V01-ICONF-4 [internal_conflicts; minor] V1-3.17.3 (3) states the soffit bound as the crossed class's clearanceCm from V11 raisedWays.structure, while IN-V01-9 rules it is f item 244's clearance rule (the held clearanceCm, else V11's per class): the held per-way value i… → **Write V1-3.17.3 (3) to cite f item 244's clearance rule (held value first).** — *closed by:* conflict ruling V01-ICONF-4
  * V01-ICONF-5 [internal_conflicts; minor] 'that the footprint side nearest ground.at is the face volume 3's head takes (J-V1.96; T-V1-26's stack-door clause measures it from M6-P)' contradicts the current J-V1.96 (reserve at V03's stackAccessDoor(b,a)) and T-V1-26 (stack… → **Remove the stale clauses with the narration.** — *closed by:* conflict ruling V01-ICONF-5
  * V01-XCONF-1 [cross_part_conflicts; minor] Note (31) states V11's table registry has no row for way.surface or squares.quota and f item 301's milestone should read M2b; both are now closed (V11 registry rows 90-91 carry them; f item 301 reads 'BASE (M2b) for (a)'s S7b hal… → **Remove the closed hand-off text (also notes (21), (28), (30), (32), (35) '...should carry', (36), (37)): keep only open wiring, cited.** — *closed by:* conflict ruling V01-XCONF-1
  * V01-XCONF-2 [cross_part_conflicts; major] V01 admits a retaining wall to the .dd2vtt line_of_sight only when its derived step is >= vtt.retainingMinCm (150 cm), broken over stair/ramp intervals; V09 BCR-V9-31 (c) says 'in the ground scene retaining walls and the raised s… → **Canon rules one rule at §11.1 (V01's threshold is the more specific; V09 cites it) and closes the hand-off.** — *closed by:* conflict ruling V01-XCONF-2
  * V01-WGAP-1 [wiring_gaps; minor] The skeleton-file export row lists 'a quarter's fabric (BCR-35)' but not a quarter's terrace (BCR-44) nor setAttr(D.terrace), although §4.2 says 'a skeleton's quarter carries fabric (BCR-35) and terrace (BCR-44)' and §4.4 has the… → **Add terrace (and setAttr(D.terrace)) to the skeleton export row.** — *closed by:* wiring routing (V01-WGAP-1)
  * V01-MISSING-1 [missing_parts; major] Q-V1-1 is still posed as an open owner question with a recommendation; docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md decides it ('yes', J122). The volume must mark it answered with its J122 decision (principle (7) J122), and §8.4 … → **Rewrite §11 as 'Q-V1-1 answered: yes (J122)'.**
  * V01-TERM-1 [terminology; minor] Volume-internal section citation form is 'V1-n' (e.g. V1-3.8.7) while principle (1) prescribes 'V04 §3.2' form for volume references; other volumes cite this one as 'V01 §x' or 'V1-x' inconsistently (see census). → **Canon: one citation form for volume sections across the set.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V01-TERM-2 [terminology; minor] 'stepped' names two different things: the Terraces template row (eligible at slope.meanPct >= 8, weight x min(2, slope.meanPct / 8), §3.6 (8)'s [8 %, 100 x terrace.slopeMin) band) and a way state (slopeP95 above V11's ways.crossi… → **Name the way state and the row distinctly (e.g. 'stair-stepped way' vs 'stepped row'), and give the 8 % row threshold one home (the TemplateRow cell) cited by §3.6 (8).** — *closed by:* glossary (retired synonyms) / ID rulings
  * V01-TERM-3 [terminology; minor] One concept, the document whose Recipe.product is 'hood', is called 'standalone neighbourhood' (13), 'standalone neighbourhood document' (7), 'standalone hood(s)' (5) and 'lone neighbourhood document' (J-V1.36), plus 'hood docume… → **Name it once ('standalone neighbourhood document') and use it throughout.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V01-DEFER-1 [deferral_wording; minor] 'Sample (declared by RV-pc-6's pending block, or by BCR-28)' and BCR-28's 'If RV-pc-6's block lands first, this request is satisfied by it' leave the declaration of type Sample with two alternative homes; f item 540 carries BCR-2… → **Rule one home (f item 540's §2.5/II.1 declaration beside Seam, M1) and cite it from §1.2 and BCR-28 without the condition.**
  * V01-DEFER-2 [deferral_wording; minor] 'Recommended to the integrator (vetoable; V1-10's note): the terminal is a conduit_house where the roster or dossier holds one, else a fountain Pin' leaves the terminal-form choice as a recommendation, not a decision; 'or the bas… → **State the adopted rule in V1-3.17.8 as decided (cite J-VI.9); drop the recommendation wording and note (15).**
  * V01-DEFER-3 [deferral_wording; minor] 'Q-V1-1 asks the owner to confirm' leaves an owner question open; under J122 every remaining owner question is decided in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md. → **Mark Q-V1-1 answered with its J122 decision and cite it here.**
  * V01-DEFER-4 [deferral_wording; minor] Note (39) leaves an open alternative to V04 ('V04 may widen the row to any change ... or leave the inside case to the ground-edit row; either reading agrees'): an agreement seam between V01 J-V1.101 (every change of fabric.extens… → **Canon rules one reading at V04 §4.3 (the switch row covers any change; inside (0,1] the ground-edit row applies) and V01 cites it.**
  * V01-NARR-1 [narration; minor] Eight stacked 'PENDING FABLE REVIEW' banner lines (one per lane: V1-neighbourhoods, revise-V1, reconcile-V01-r1..r6); principle (8) allows one marker line per volume, the close's. → **Replace by the close's single marker line.**
  * V01-NARR-2 [narration; minor] Revision notes ('REVISED 2026-09-28 ... against critique V01.md', 'REVISED AGAIN 2026-09-29') and nine PROGRESS / REVISION / RECONCILIATION ledgers (about 130 lines) narrate how the text evolved (principle (5)); the validation re… → **Remove; keep only the citations paragraph (line 33-36) reworded without the pass history.**
  * V01-NARR-3 [narration; minor] Decision rows carry revision narration ('revised: ...', 'revised from ...', 'revised by J-V1.77', '*Amended at reconciliation round 4's continuation*', '*Reconciliation round 2's continuation (seam ...)*', '*Revised at ... the fi… → **Rewrite each as its current decision; move history to the validation records.**
  * V01-NARR-4 [narration; minor] BCRs carry process narration ('File f carries it as a new item in the base-change lane (cross-volume note (28))'; 'File f carries it as item 584 ...'; 'the coherence pass assigns the final number'; 'found in passing, file f's rou… → **Once f is applied, §10 is history: replace V01 §10 by a pointer to the applied base sections (the requests become restatement after application) or at least drop the process clauses.**
  * V01-NARR-5 [narration; minor] Thirty-nine cross-volume notes (about 110 lines) are hand-off and process narration ('applied, V05 §3.1 now reads so', 'Landed by volume 5's round-5 lane while this lane ran (its 12:38 log note)', 'the first round's 10 corrected … → **After the canon verifies each destination (agreement matrix), drop the block; open ones become citations at their homes.**
  * V01-NARR-6 [narration; major] About 500 lines record per-lane evidence reading lists, seam-issue disposition tables, counterpart-edit logs and fix-list tallies: narration of how the text evolved (principle (5)); the validation records (critique/*.md, seam-*.m… → **Fold IN-V01-4 (reason word derivation) into V1-2.3's raised comment, IN-V01-5 into V1-3.17.8, IN-V01-6 into §1b/BCR-29 (DR26), IN-V01-9 into V1-3.17.3; keep one CONFIRMED/PLAUSIBLE paragraph; drop the rest.**
  * V01-BREF-1 [broken_references; minor] Cites 'V1-4.6' for what the clerk reads and proposes; V1-4.6 is 'Hosts and shared documents' — the clerk content is V1-4.5. → **Change to V1-4.5.**
  * V01-HANDOFF-1 [handoffs_to_canon; minor] 'DR-V1.1 (new, BCR-29; the coherence pass numbers it)': a derivation row left for this pass to number; the canon must assign its id in the base's derivation table (§7.7) and V01 cite it. IN-V01-6 (J-VI.13) and f item 383 number i… → **Replace DR-V1.1 by DR26 throughout V01 (and the base §7.7 row when f item 384 is applied).**
  * V01-HANDOFF-2 [handoffs_to_canon; minor] '§16's total rises by 13.25-18.25 pw, computed once with every volume's lines by the coherence pass (file f item 568)' and 'Other volumes re-price their own lines; the coherence pass sums them' hand the §16 sum to this pass. → **Canon: sum every volume's re-priced lines into §16 and INDEX.md's plan once (item 568); V01 cites the result.**
  * S23R6-07 [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-stage2-3-r6.md S23R6-07 → **V01 §0's plain words name the annex temple's way into its crypt (V03 §3.7.4 is the mechanism).**
  * SLR6-04 [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-layers-r6.md SLR6-04 → **V01's cross-volume notes (36) and (39) leave (answered; V01-XCONF-1).**
  * V01:IN-V01-1 [integration-note; minor] * **IN-V01-1 (J-VI.1, clean-room).** §2's block-content type is renamed `BlockKind` (two lines); its former name coincided with a reference class of the same role and is not repeated here (reworded by the continuation, J-VI.23). … → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V01:IN-V01-2 [integration-note; minor] * **IN-V01-2 (J-VI.17 H33).** §3's crypt sentence now reads "a crypt is `Basement.crypt`, a basement fact (V03 §3.7.4, BCR-V3-20)" (edited in place). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V01:IN-V01-3 [integration-note; minor] * **IN-V01-3 (J-VI.17 H8; V02 X14).** This volume's NG draw-style bars (the `hatched` family's parity rows) are re-measured on volume 2's `roofscape` construction at M6b (V2 §5.3); until M6b the NG parity sheet keeps `fakeGablePe… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V01:IN-V01-4 [integration-note; minor] * **IN-V01-4 (J-VI.2).** `DistrictContext.raised[].reason` is the reason **word** derived from the raised-way record's `RaisedReasonKey` (volume 6 §2.13): viaduct → `'drop'`, elevated road → `'link'`, aqueduct → `'water'`; `'decl… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V01:IN-V01-5 [integration-note; minor] * **IN-V01-5 (J-VI.9).** V1-3.17.8's recommendation is adopted by the integrator: the aqueduct's terminal outlet is a `conduit_house` where the roster or the dossier holds one, else a fountain `Pin`. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V01:IN-V01-6 [integration-note; minor] * **IN-V01-6 (J-VI.13).** DR-V1.1 is numbered **DR26** by the coherence pass (file f). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V01:IN-V01-7 [integration-note; minor] * **IN-V01-7 (J-VI.4).** Wherever this volume's close-up tools meet an infeasible declaration that contradicts no dossier fact and no lock, the dry run bends it (item 101 R2); this volume already states so (§4, "No wrong answers"… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V01:IN-V01-8 [integration-note; minor] * **IN-V01-8 (J-VI.23, clean-room).** IN-V01-1 no longer names the retired type (its former name coincided with a reference class), and J-V1.31's alternative is worded "a block-kind-setting event" for the same reason. No meaning … → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V01:IN-V01-9 [integration-note; minor] * **IN-V01-9 (J-VI.27).** The raised-way piers this volume's crossings and under-deck strip read (V1-3.17.3) are laid by file f item 244's support step; the soffit bound over a crossed way is that item's clearance rule (the held … → **fold the note into the body at its home, then drop the note (S9, ID-WX)**

### V02

* **Size:** 103630 words; the goal band after: 62178–77722 words; narration ranges alone 12697 words; 45 restatements to references; 44 BCR blocks to pointers.
* **STATE:** 380 facts (canon.json → units.V02.state); 10 index rows.
* **HISTORY OUT:** V02-0474, V02-0475, V02-0476, V02-0477, V02-0478, V02-0479.
* **REFERENCE (45):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | V02-0090 | model §2.1 | MODEL-0502 (near) |
  | V02-0091 | model §2.6 | — (section) |
  | V02-0092 | model §2.6 | — (section) |
  | V02-0093 | model §2.6 | MODEL-0204 (near) |
  | V02-0094 | model §2.6 | — (section) |
  | V02-0095 | model §2.6 | MODEL-0278 (near) |
  | V02-0096 | V03 V03 §2.5 | V03-0154 (fact) |
  | V02-0097 | model §2.6 | MODEL-0237 (near) |
  | V02-0099 | model §2.6 | MODEL-0268 (fact) |
  | V02-0100 | model §2.6 | MODEL-0264 (near) |
  | V02-0101 | model §2.6 | — (section) |
  | V02-0102 | model §2.6 | MODEL-0304 (fact) |
  | V02-0106 | model §2.6 | — (section) |
  | V02-0120 | model §2.6 | MODEL-0204 (near) |
  | V02-0121 | model §2.6 | — (section) |
  | V02-0125 | model §2.6 | MODEL-0278 (near) |
  | V02-0169 | determinism §5.2 | DETERMINISM-0391 (near) |
  | V02-0171 | model §2.6 | — (section) |
  | V02-0197 | V07 V07 §2.4 | V07-0127 (near) |
  | V02-0199 | V11 V11 §2.8 | V11-0148 (fact) |
  | V02-0201 | determinism §7.6 | — (section) |
  | V02-0207 | V12 §3.11 | V12-0067 (fact) |
  | V02-0211 | model §2.8 | MODEL-0487 (near) |
  | V02-0213 | determinism §6.1 | DETERMINISM-0150 (near) |
  | V02-0215 | determinism §6.5 | — (section) |
  | V02-0216 | determinism §5.2 | — (section) |
  | V02-0237 | model §2.6 | — (section) |
  | V02-0243 | V04 V04 §IN | V04-0348 (fact) |
  | V02-0250 | V12 V12 §3.14.1 | V12-0238 (fact) |
  | V02-0251 | determinism §7.1 | DETERMINISM-0244 (near) |
  | V02-0258 | determinism §7.4 | DETERMINISM-0441 (near) |
  | V02-0259 | determinism §7.3 | DETERMINISM-0366 (near) |
  | V02-0260 | V09 §11.1 | V09-0799 (near) |
  | V02-0261 | V10 §3.9 | V10-0307 (near) |
  | V02-0262 | determinism §7.1 | — (section) |
  | V02-0269 | V09 V09 §4.20.6 | V09-0654 (near) |
  | V02-0270 | rendering §8.5 | RENDERING-0301 (near) |
  | V02-0271 | rendering §8.6 | — (section) |
  | V02-0275 | rendering §8.2 | RENDERING-0046 (near) |
  | V02-0276 | rendering §8.10 | — (section) |
  | V02-0278 | rendering §11.1 | RENDERING-0443 (near) |
  | V02-0280 | rendering §11.1 | RENDERING-0443 (fact) |
  | V02-0281 | scope §1.1 | — (section) |
  | V02-0287 | scope §13 | — (section) |
  | V02-0302 | scope §13.6 | SCOPE-0529 (near) |

* **Its §10 requests → one-line pointers to the applied f items (45):** BCR-V2-01 → item 216; BCR-V2-02 → item 217; BCR-V2-03 → item 218; BCR-V2-04 → item 219; BCR-V2-05 → item 220; BCR-V2-06 → item 221; BCR-V2-07 → item 222; BCR-V2-08 → item 385; BCR-V2-09 → item 426; BCR-V2-10 → item 341; BCR-V2-11 → item 346; BCR-V2-12 → item 351; BCR-V2-13 → item 261; BCR-V2-14 → item 376; BCR-V2-14 → item 377; BCR-V2-15 → item 406; BCR-V2-16 → item 328; BCR-V2-17 → item 332; BCR-V2-18 → item 505; BCR-V2-19 → item 522; BCR-V2-20 → item 524; BCR-V2-20 → item 568; BCR-V2-21 → item 449; BCR-V2-22 → item 223; BCR-V2-23 → item 224; BCR-V2-24 → item 303; BCR-V2-25 → item 499; BCR-V2-26 → item 427; BCR-V2-27 → item 225; BCR-V2-28 → item 226; BCR-V2-29 → item 304; BCR-V2-30 → item 402; BCR-V2-31 → item 227; BCR-V2-32 → item 370; BCR-V2-33 → item 371; BCR-V2-34 → item 305; BCR-V2-35 → item 333; BCR-V2-36 → item 419; BCR-V2-37 → item 525; BCR-V2-37 → item 568; BCR-V2-38 → item 228; BCR-V2-39 → item 229; BCR-V2-40 → item 318; BCR-V2-41 → item 230; BCR-V2-42 → item 231.
* **BCR blocks → pointers (44):** BCR-V2-01 → item 216; BCR-V2-02 → item 217; BCR-V2-03 → item 218; BCR-V2-04 → item 219; BCR-V2-05 → item 220; BCR-V2-06 → item 221; BCR-V2-07 → item 222; BCR-V2-08 → item 385; BCR-V2-09 → item 426; BCR-V2-10 → item 341; BCR-V2-11 → item 346; BCR-V2-12 → item 351; BCR-V2-13 → item 261; BCR-V2-14 → item 377; BCR-V2-15 → item 406; BCR-V2-16 → item 328; BCR-V2-17 → item 332; BCR-V2-18 → item 505; BCR-V2-19 → item 522; BCR-V2-20 → item 568; BCR-V2-21 → item 449; BCR-V2-22 → item 223; BCR-V2-23 → item 224; BCR-V2-24 → item 303; BCR-V2-25 → item 499; BCR-V11-8 → item 435; BCR-V2-27 → item 225; BCR-V2-28 → item 226; BCR-V2-28 → item 226; BCR-V2-29 → item 304; BCR-V2-30 → item 402; BCR-V2-01 → item 216; BCR-V2-32 → item 370; BCR-V2-33 → item 371; BCR-V2-33 → item 371; BCR-V2-24 → item 303; BCR-V2-35 → item 333; BCR-V2-15 → item 406; BCR-V2-20 → item 568; BCR-V2-23 → item 224; BCR-V11-27 → item 259; BCR-V2-40 → item 318; BCR-V2-41 → item 230; BCR-V2-32 → item 370.
* **Terms to replace:** G-lot (lot, lot-driven, lot-derived, BuildingInput.lot → plot (field BuildingInput.plot); 3 hits, first lines [3859, 4043]); G-firstmap (first paint → first map; 1 hits, first lines [2031]); G-cite (V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 … → Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y; 798 hits, first lines [20, 21, 108, 109, 218, 222]).
* **Conflicts it resolves (10):** MC-01, MC-11, V01-ICONF-4, V02-ICONF-1, V02-ICONF-2, V02-ICONF-3, V02-ICONF-4, V02-XCONF-1, V09-XAGREE-3, CANON-C03.
* **File f items that concern it (cite as base text):** 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 228, 229, 230, 231, 234, 238, 242, 246, 260, 261, 270, 304, 309, 318, 328, 332, 333, 341, 346, 351, 370, 376, 385, 402, 419, 426, 427, 432, 435, 436, 449, 483, 499, 505, 522, 524, 525, 567, 568, 578.
* **Wiring gaps it closes:** W-DOS-10b, W-IF-06, W-HOOK-02, V02-WGAP-1.
* **Elegance rulings it applies:** E-24, E-27.
* **Id rulings it applies:** ID-WX, ID-DUPDEF.
* **Owner questions to mark answered:** Q-V2-1 — J122: not now (one-way truth; SettlementForge has no shape data).
* **Cohesion checks:** see *Cohesion checks* (every volume).
* **Disagreements (agreement.md):** `BaseWing` with V03 (MC-01); `BuildingInput` with V03 (MC-01); `J-V7.82` with V07 (V02-ICONF-1); `DriftBounds` with model (MC-11); `BaseWing` with model (MC-01); `BuildingInput` with model (MC-01); `PathShapeRow` with model (MC-01).
* **Its own Fix list (§13) and hand-off rows — every item fixed in the text (or marked for the adjudicator with its reason); §13 keeps no open item:** V02-0480, V02-0481, V02-0482, V02-0483, V02-0484, V02-0485, V02-0486, V02-0487, V02-0488, V02-0489, V02-0490, V02-0491, V02-0492, V02-0493, V02-0494, V02-0495, V02-0496, V02-0497, V02-0498, V02-0499, V02-0500, V02-0501, V02-0502, V02-0503, V02-0504, V02-0505, V02-0506, V02-0507, V02-0508, V02-0509, V02-0510, V02-0511, V02-0512, V02-0513.
* **Hand-offs to close here (14):** V06:X3, V06:X24, V08:X6, V09:XV-V9-6, V09:XV-V9-8, V10:CVR-V10-8, V11:X-V11-5, V11:X-V11-7, V11:X-V11-9, V12:X-V12-2, V12:X-V12-11, V12:X-V12-12, V12:X-V12-15, V12:X-V12-18 (agreement.md lists each).
* **Edges (edges.md):** 47 UNDEFINED, 21 UNTESTED; 28 UNDEFINED combinations it owns.
* **Open findings routed here (40):**
  * VOL-V01-V02-RESTATEMENTS-007 [restatements; -] minEdge 25 cm, attractCm 26 cm in the §1c hooks row → **state it once at base §2.2 LatticeSpec / §3.2; every other place cites it**
  * VOL-V01-V02-RESTATEMENTS-008 [restatements; -] minEdge (25 cm) in M13 → **state it once at base §2.2 LatticeSpec; every other place cites it**
  * VOL-V01-V02-RESTATEMENTS-009 [restatements; -] buildings per rung (TOWN 1 200-1 500, CITY 4 500-6 000, METROPOLIS 12 000-15 000, 30 000-36 000 at the 120 000 cap), rung populations, first-map times → **state it once at base §1.1; §12.5; every other place cites it**
  * VOL-V01-V02-RESTATEMENTS-010 [restatements; -] towerStoreys 5-8 at towerStoreyCm 600; a church west tower 3-5 x 450 in T-V2-7 → **state it once at V11 §3.6.4 HeightsRow; every other place cites it**
  * VOL-V01-V02-RESTATEMENTS-011 [restatements; -] the NG parity-sheet sentence (fakeGablePerWing from M6a, roofscape at M6b when the bars pass), stated again in V2 §5.3 and X14 → **state it once at V01 §7 (NG parity sheet sentence; IN-V01-3); every other place cites it**
  * V02-RESTATE-1 [restatement_findings; minor] Restates the kernel constants' values ('minEdge 25 cm, attractCm 26 cm'), whose home is §2.2 LatticeSpec (kernel inventory KERNEL restatements). → **Cite §2.2 / §3.2 without values.**
  * V02-RESTATE-2 [restatement_findings; minor] Restates minEdge's value ('minEdge (25 cm)') whose home is §2.2 LatticeSpec / §3.2. → **Cite minEdge without the value.**
  * V02-RESTATE-3 [restatement_findings; minor] The NG parity sheet sentence ('from M6a keeps fakeGablePerWing; at M6b re-measured on roofscape, switched when bars pass, else kept, reported') is stated in full in V02 §5.3, V02 X14 and V01 §7 and IN-V01-3 ('the one sentence vol… → **State once (V01 §7, the NG bars' owner) and cite from V02.**
  * V02-RESTATE-4 [restatement_findings; minor] Restates §1.1's building counts per rung (TOWN 1 200-1 500, CITY 4 500-6 000, METROPOLIS 12 000-15 000, 30 000-36 000 at the 120 000 cap) and rung target populations (5 000, 20 000, 50 000), and §12.5's first-map times (124-145 m… → **Cite §1.1 and §12.5 for the counts and times; keep only V02's added costs.**
  * V02-RESTATE-5 [restatement_findings; minor] The bar restates V11 HeightsRow values ('towerStoreys 5-8 storeys at towerStoreyCm 600'; 'a church's single west tower 3-5 x 450'), whose home is V11 §3.6.4 (V02 §3.10.6 says it reads them unchanged). → **Phrase the bar as 'the church and cathedral HeightsRow's towerStoreys and towerStoreyCm (V11 §3.6.4)'.**
  * V02-ICONF-1 [internal_conflicts; minor] V02 hosts the composition.classFamily table in composition.json and states 'volume 7 keeps this table as the one source of the village classes' composition keys (J-V7.82)': the table's canonical home is stated as another volume's… → **Canon: one home (V02 §3.10.5 as the table, V07 citing it, or V07 as the rows' authority with V02 citing) and one statement of ownership.** — *closed by:* conflict ruling V02-ICONF-1
  * V02-ICONF-2 [internal_conflicts; minor] The volume's effort is stated as a running history of totals (17.25-24.75; +3.25-4.75 fold; +1.75-2.5 second revision -> 22.25-32; +0.25-0.5 round 1 -> 22.5-32.5; 'M6 18-27 pw (18.25-27.5 with it)'; 'M3a's part 2-2.75 pw'; 'BCR-V… → **State the current totals once (volume 22.5-32.5 pw; M6 18.25-27.5; M3a-V2 2-2.75; spikes 2.25) with the per-milestone table as the breakdown; move the history to the validation records; hand the line to §16 via BCR-V2-37.** — *closed by:* conflict ruling V02-ICONF-2
  * V02-ICONF-3 [internal_conflicts; minor] R5's fallback ends with 'a failure halves the step at most once more before the step is refused (reported)': a warp step refused on a building's validation contradicts the no-refusal rule (item 101 R2; J-V2.79: refusals only for … → **Define the outcome as a bend (e.g. the warp's step held at the last lawful fraction for that building, named) or cite §7.4's warp ladder rung that governs it.** — *closed by:* conflict ruling V02-ICONF-3
  * V02-ICONF-4 [internal_conflicts; minor] Round 1's 0.25–0.5 pw is said to fall 'inside M6a–M6c and M3a-V2', yet the milestone arithmetic puts all of it in M6 (18.25–27.5) and keeps M3a's part at 2–2.75 pw, and BCR-V2-37 says '+ 0.25–0.5 pw inside M6'; the hole sentence … → **State one placement of round 1's increment.** — *closed by:* conflict ruling V02-ICONF-4
  * V02-XCONF-1 [cross_part_conflicts; minor] V02 says 'the least soffit over a crossed way is volume 11's raisedWays.structure.clearanceCm, which volume 1 reads'; V01's IN-V01-9 (J-VI.27) rules the soffit bound is f item 244's clearance rule (the held clearanceCm, else V11'… → **Canon: one home (f item 244's clearance rule in the base), cited identically by V01 and V02.** — *closed by:* conflict ruling V02-XCONF-1
  * V02-ELEG-1 [elegance_candidates; minor] One quantity, the plan reach of a valley where X's ridge meets Y's roof, is defined twice: facadeBays' integer e = floor((X.ridgeCm - Y.eaveCm) x Y.halfSpanCm / Y.riseCm) and roofscape's float e = (X.ridgeCm - Y.eaveCm) / Y.slope… → **Canon: state valleyReach once and cite it from both.** — *closed by:* elegance ruling (E-list)
  * V02-WGAP-1 [wiring_gaps; minor] Literal style values with no stated table home: the FM look's 'fixed paper pitch (0.9 px at 1x, our value)', stepStones 'stones 0.5-0.8 m at 1 m pitch', stairFlight lines 'stopping short of each side by a tenth of the flight's wi… → **Name each as a §8.2 style-sheet cell (or a §8.10 row cell) with its value there.** — *closed by:* wiring routing (V02-WGAP-1)
  * V02-MISSING-1 [missing_parts; major] Q-V2-1 is posed as open with a recommendation; docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md decides it ('not now', J122) — and it concerns SettlementForge's boundary (J121 applies: the map reads SettlementForge's own product deci… → **Mark Q-V2-1 answered 'not now' (J122; J121: follows SettlementForge's decisions); drop the conditional future plan or state it as the port's rule (the port reads no shape field).**
  * V02-TERM-1 [terminology; minor] V02 cites itself as 'V2 §n' and siblings as 'volume k', while V01 cites itself as 'V1-n' and others as 'V05 §x' / 'V2 §x' / 'V02 §x' (mixed): one volume-citation form is needed across the set (principle (4) cross-references). → **Canon: one citation form (e.g. 'V02 §3.5').** — *closed by:* glossary (retired synonyms) / ID rulings
  * V02-TERM-2 [terminology; minor] Decision ids run J-V2.1-76, then J-V2.79-87, then J-V2.77-78, then J-V2.88-108 (J-V2.77 and J-V2.78 sit after J-V2.87), so the table is not in id order; ids are unique. → **Reorder the table by id.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V02-TERM-3 [terminology; minor] After the finalization keyed the raised lift on 'the ground wings over the basement's ring', T-V2-36's first clause still reads 'their seed wings' ground storey lifted by crypt.clearCm' and 'its seed wings raised by cellar.depthC… → **Word T-V2-36's clause as 'the ground wings over the crypt's ring'.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V02-DEFER-1 [deferral_wording; minor] V02's build order is written conditionally on an owner question ('unless the owner answers volume 3's Q1 yes, in which case ...'; also M6b's 'at M6b or, under volume 3's Q1, first'); docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md d… → **Write the decided order (facadeBays first, before V03's P0-P3 after M4; cite J122) in §8.1, §8.3 M6b and §16/INDEX.**
  * V02-DEFER-2 [deferral_wording; minor] J-V2.71 keeps open-ended future wording ('a later owner rule may add raised decks, and DeckContext.kind would take one more value'); J-V2.32 keeps the conditional '— unless the owner answers volume 3's Q1 yes' although J122 decid… → **Drop the 'later owner rule' clause; rewrite J-V2.32 with the decided order (J122).**
  * V02-DEFER-3 [deferral_wording; minor] Conditional/deferral wording in hand-offs: X27's fallback 'until SCC-11 lands V11's arena plot row' (while X32 and round 1 say V11's arena row is read); X28 'a bridge's mid-span slot where V9C-58 (7) is adopted' (adoption undecid… → **Resolve SCC-11/V9C-58 (7) status and state the rule without 'until'/'where adopted'/'waits'.**
  * V02-NARR-1 [narration; minor] Nine stacked 'PENDING FABLE REVIEW' banner lines (V2-buildings, revise-V2, reconcile r1-r5, the item-110 fold, second revision); principle (8) allows one marker line per volume. → **Replace by the close's single marker line.**
  * V02-NARR-2 [narration; minor] Revision and reconciliation ledgers (revision of 2026-09-28, ITEM 110 FOLD ledger with doc_checks counts, second revision, reconciliation rounds 1-5 with backups and receipts, about 95 lines) narrate how the text evolved (princip… → **Remove the ledgers and the in-body revision markers; the validation records keep them.**
  * V02-NARR-3 [narration; minor] Decision rows carry revision narration and superseded choices ('*Amended by the revision*', '*Reconciliation round n*', '*Second revision (V2C-..)*', J-V2.35's 'so the fallback is history', J-V2.56's three-round history); J-V2.73… → **Rewrite each decision as its current choice; drop the struck J-V2.73 and J-V2.76 (their content lives in J-V2.79) and the process-only J-V2.58, moving history to the validation records.**
  * V02-NARR-4 [narration; minor] BCRs carry 'Extended by reconciliation round n', 'Restated by the second revision', 'Absorbed (reconciliation round 2)', 'Build note' histories, and §11 four per-round 'raised no owner question' paragraphs: narration; once f is a… → **After f is applied replace V02 §10 by a pointer to the applied base sections; keep §11 as one answered question.**
  * V02-NARR-5 [narration; minor] §12 is a per-revision evidence log: its census claims are stale against the live text (the latest reads 'J-V2.1 – J-V2.87, T-V2-1 – T-V2-51, X1 – X29' while the file defines J-V2.108, T-V2-53 and X33) and its first PLAUSIBLE line… → **Replace §12 by one current CONFIRMED/PLAUSIBLE list with one census line over the live file.**
  * V02-NARR-6 [narration; minor] §13 is almost entirely round-by-round narration ('fixed all 21 seam issues', 'told the split', 'Outside this file ... logged'); its round-1 sentence 'item 226 should split its label so BCR-V2-28's half raise ... lands with the ba… → **Keep only the X table as the volume's hand-off list; delete the per-round paragraphs.**
  * V02-NARR-7 [narration; minor] Nine X rows record items that have landed or been applied ('Landed:', 'landed; none needed', 'applied by volume 3's reconciliation round 2'): these are history in a hand-off table, and X31/X32 carry no hand-off at all ('stand as … → **Drop landed rows or fold their surviving rule into the owning section.**
  * V02-NARR-8 [narration; minor] 'PENDING FABLE REVIEW — written by opus standing in for the Fable seat' markers and 'Each note supersedes any sentence of this volume that reads otherwise' leave the reader to apply the supersession; IN-V02-2 (a)/(b), IN-V02-1 ar… → **Apply every IN note in place and remove the notes; retire the review markers when the retrovalidation closes.**
  * V02-NARR-9 [narration; major] The volume ends with some 330 lines of per-round edit logs (issue tables, backups and md5s, doc_checks deltas 'C3 626 → 642 unreviewed', 'the markers re-verified', 'PENDING FABLE REVIEW' lines, 'formerly PLAUSIBLE'): pure narrati… → **Delete the reconciliation and finalization sections (the seam files and lane-events.log hold the history); largest single shrink in V02.**
  * V02-BREF-1 [broken_references; minor] V02 cites 26 receipt and backup paths under 'scratchpad/volumes/…' (header lines 42–107, §3.10.3 lines 1696–1735, §12 and the reconciliation sections) as evidence; none exists under the project root. All 26 exist only in one sess… → **Move the receipts that back live CONFIRMED claims (medians.py, medians_new.py, stepped_receipt.py/.out, quote-check.txt) into the project (e.g. research/ or docs/validation/) and cite those paths; drop backup and doc_checks-delta citations with the narration.**
  * V02-AMBIG-1 [ambiguous_text; minor] The sentence of rung (4) is garbled: an inserted clause ('a porch meeting one of the building's own other wings (V2C-69) takes (2)'s ladder, narrowed first to the free part of its side,') splits 'returns the identity composition'… → **Rewrite as two sentences: the porch-meets-own-wing case under (2); (4) with its identity-composition definition intact.**
  * V02:IN-V02-1 [integration-note; minor] * **IN-V02-1 (J-VI.7).** §13's X20 now reads "its crypt is the rim-slab crypt vault under the building's lowest massing tier, inside underside tier 0 (the rim slab)" (edited in place; C5-55). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V02:IN-V02-2 [integration-note; minor] * **IN-V02-2 (J-VI.17 H10; volume 3's second-round hand-offs).** (a) BCR-V2-33's external-access condition — `external` where no ground wing is storeyed (every wing standing on no other wing is solid), the door at volume 3's `bas… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V02:IN-V02-3 [integration-note; minor] * **IN-V02-3 (J-VI.17 H11; CVR-V10-8).** The entity registry carries the path `deck/landmarks/<head¦mid>` on a deck's host (a mole, pier, quay platform or bridge), naming its landmark plots (`DeckContext.landmark`), and `massing/… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V02:IN-V02-4 [integration-note; minor] * **IN-V02-4 (J-VI.4, J-VI.5).** This volume's second-revision rule — no structural refusal, a bend for every case (V2 §1b's bend ids; V2C-47) — is the rule every volume now follows (item 101 R2), and its tier contract (`drawTier… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V02:IN-V02-5 [integration-note; minor] * **IN-V02-5 (file f).** X28's deck-plot fields (`landmark: boolean`; no deck plot on a `ford`, a `draw` bridge or a bridge without `deckCm`; a quay platform on the bank flagged ground) are carried by file f with item 110 (d)'s r… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**

### V03

* **Size:** 82788 words; the goal band after: 49673–62091 words; narration ranges alone 12761 words; 31 restatements to references; 33 BCR blocks to pointers.
* **STATE:** 375 facts (canon.json → units.V03.state); 47 index rows.
* **REFERENCE (31):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | V03-0007 | model §2.6 | MODEL-0268 (near) |
  | V03-0063 | pipeline §4.12 | — (section) |
  | V03-0072 | V04 V04 §1b.1 | V04-0039 (fact) |
  | V03-0075 | model §2.6 | — (section) |
  | V03-0078 | model §2.6 | MODEL-0286 (near) |
  | V03-0085 | V04 (the editor finds the section) | — (section) |
  | V03-0086 | V02 V02 §1b | V02-0068 (near) |
  | V03-0092 | model §2.6 | MODEL-0279 (fact) |
  | V03-0093 | V02 V02 §9 | V02-0328 (near) |
  | V03-0099 | determinism §7.7 | DETERMINISM-0337 (near) |
  | V03-0100 | V11 V11 §3.13.4 | V11-0416 (near) |
  | V03-0101 | V08 (the editor finds the section) | — (section) |
  | V03-0102 | model §2.8 | MODEL-0468 (near) |
  | V03-0113 | model §2.6 | — (section) |
  | V03-0114 | model §2.6 | MODEL-0276 (near) |
  | V03-0146 | pipeline §4.12 | — (section) |
  | V03-0159 | model §2.6 | — (section) |
  | V03-0162 | model §2.6 | MODEL-0369 (near) |
  | V03-0223 | model §2.6 | MODEL-0367 (near) |
  | V03-0225 | V02 V02 §9 | V02-0351 (near) |
  | V03-0230 | model §2.6 | — (section) |
  | V03-0243 | model §2.6 | MODEL-0360 (near) |
  | V03-0262 | V04 V04 §3.5.0a | V04-0113 (near) |
  | V03-0273 | V02 V02 §3.17 | V02-0248 (near) |
  | V03-0288 | rendering §8.8 | RENDERING-0278 (near) |
  | V03-0294 | rendering §11.1 | RENDERING-0370 (near) |
  | V03-0295 | rendering §11.1 | RENDERING-0460 (near) |
  | V03-0296 | rendering §11.1 | RENDERING-0462 (near) |
  | V03-0297 | rendering §11.1 | RENDERING-0443 (fact) |
  | V03-0298 | rendering §11.1 | — (section) |
  | V03-0320 | scope §16 | — (section) |

* **Its §10 requests → one-line pointers to the applied f items (34):** BCR-V3-1 → item 428; BCR-V3-2 → item 232; BCR-V3-3 → item 352; BCR-V3-4 → item 374; BCR-V3-5 → item 457; BCR-V3-6 → item 420; BCR-V3-7 → item 450; BCR-V3-8 → item 273; BCR-V3-9 → item 482; BCR-V3-10 → item 329; BCR-V3-11 → item 334; BCR-V3-12 → item 233; BCR-V3-13 → item 234; BCR-V3-14 → item 483; BCR-V3-15 → item 235; BCR-V3-16 → item 353; BCR-V3-17 → item 236; BCR-V3-18 → item 451; BCR-V3-19 → item 237; BCR-V3-20 → item 238; BCR-V3-21 → item 239; BCR-V3-22 → item 262; BCR-V3-23 → item 324; BCR-V3-24 → item 354; BCR-V3-25 → item 240; BCR-V3-26 → item 241; BCR-V3-27 → item 242; BCR-V3-28 → item 263; BCR-V3-29 → item 346; BCR-V3-29 → item 347; BCR-V3-30 → item 567; BCR-V3-31 → item 505; BCR-V3-32 → item 578; BCR-V3-33 → item 585.
* **BCR blocks → pointers (33):** BCR-V3-1 → item 428; BCR-V3-2 → item 232; BCR-V3-3 → item 352; BCR-V3-4 → item 374; BCR-V3-5 → item 457; BCR-V3-6 → item 420; BCR-V3-7 → item 450; BCR-V3-8 → item 273; BCR-V3-14 → item 483; BCR-V3-10 → item 329; BCR-V3-11 → item 334; BCR-V3-12 → item 233; BCR-V3-13 → item 234; BCR-V2-41 → item 230; BCR-V2-13 → item 261; BCR-V3-16 → item 353; BCR-V3-17 → item 236; BCR-V3-18 → item 451; BCR-V3-19 → item 237; BCR-V11-13 → item 436; BCR-V3-21 → item 239; BCR-V10-3 → item 270; BCR-V3-23 → item 324; BCR-V3-24 → item 354; BCR-V2-33 → item 371; BCR-V2-41 → item 230; BCR-V2-33 → item 371; BCR-V3-28 → item 263; BCR-V3-29 → item 347; BCR-V2-20 → item 568; BCR-V2-18 → item 505; BCR-V2-33 → item 371; BCR-V3-33 → item 585.
* **Terms to replace:** G-firstmap (first paint → first map; 1 hits, first lines [2814]); G-cite (V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 … → Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y; 147 hits, first lines [246, 247, 248, 249, 250, 251]); G-floorvault (floor vaults (wet ground) → no crypt; ledger slabs in the chancel floor (V03 §3.7.4); 3 hits, first lines [1870, 2640, 3333]).
* **Conflicts it resolves (6):** MC-01, V04-XCONF-2, V04-XCONF-3, V09-XAGREE-2, V10-XAGREE-4, CANON-C03.
* **File f items that concern it (cite as base text):** 218, 219, 225, 226, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 242, 262, 263, 270, 273, 309, 324, 329, 334, 347, 351, 352, 353, 354, 370, 374, 420, 428, 432, 436, 450, 451, 457, 482, 483, 505, 524, 567, 568, 578, 585.
* **Wiring gaps it closes:** W-HOOK-02, V03-WGAP-1.
* **Elegance rulings it applies:** E-24, E-28, E-29.
* **Id rulings it applies:** ID-BCR, ID-DUPDEF.
* **Owner questions to mark answered:** Q1 — J122: yes (P0, P1, P3 after M4; P2 with V04's access records).
* **Cohesion checks:** see *Cohesion checks* (every volume).
* **Disagreements (agreement.md):** `BaseWing` with V02 (MC-01); `BuildingInput` with V02 (MC-01); `T-V3-23` with V04 (V04-XCONF-3); `PageDown` with V04 (V04-XCONF-2); `PageUp` with V04 (V04-XCONF-2); `BaseWing` with model (MC-01); `BuildingInput` with model (MC-01).
* **Its own Fix list (§13) and hand-off rows — every item fixed in the text (or marked for the adjudicator with its reason); §13 keeps no open item:** V03-0486, V03-0487, V03-0488, V03-0489, V03-0490, V03-0491.
* **Hand-offs to close here (13):** V02:X11, V06:X3, V06:X18, V09:XV-V9-5, V09:XV-V9-15, V10:CVR-V10-2, V10:CVR-V10-9, V11:X-V11-16, V12:X-V12-4, V12:X-V12-15, V12:X-V12-16, V12:X-V12-17, V12:X-V12-18 (agreement.md lists each).
* **Edges (edges.md):** 29 UNDEFINED, 26 UNTESTED; 6 UNDEFINED combinations it owns.
* **Open findings routed here (36):**
  * VOL-V03-V04-RESTATEMENTS-001 [restatements; -] room label cap-height range 5-9 px (restated in §1 hooks row and §5.1 Labels) → **state it once at base §9.4; every other place cites it**
  * VOL-V03-V04-RESTATEMENTS-002 [restatements; -] plan rung budget 5 ms median / 20 ms p95 and cache line 4 KB per storey (restated in §1 hooks row and §6) → **state it once at base §12.7 / §12.8; every other place cites it**
  * VOL-V03-V04-RESTATEMENTS-003 [restatements; -] the wing-local module 50 cm (base §12.7 fallback "50 -> 100 cm") → **state it once at V03 §2.4 PlanGeometryRow (roomProgram.json) is the home; base §12.7 restates it; every other place cites it**
  * VOL-V03-V04-RESTATEMENTS-004 [restatements; -] the trapdoor fallback of an external basement with no door side (restated in 3.7.1, 3.7.7, 3.9) → **state it once at base §2.6 step 3; every other place cites it**
  * V03-RESTATE-1 [restatement_findings; minor] moduleCm default 50 is annotated as 'the wing-local module (§2.6 step 4)'; if the base's §2.6 step 4 states the 50 cm module value, the value is restated in V03's table (two homes for one constant). → **Canon: one home for the module value (the table cell, cited by §2.6 step 4, or the base value cited by the cell).**
  * V03-DUP-1 [internal_duplications; minor] The derived-never-stored list is stated twice (§2.1 paragraph and §1b table) with overlapping members and different completeness (§2.1 adds lit, column ring, clearance square, concealment, treads, switcher names, room number, por… → **One home: keep the §1b table (add the §2.1-only members as rows) and have §2.1 cite it.**
  * V03-DUP-2 [internal_duplications; minor] The Basement.crypt reader list (A2 (9), 3.7.5, 3.7.6, V04 crypt join, V10 why, V01 T-V1-47 with its parenthetical about V1-3.7.1's opening pass) is written out in full twice (§1b and §2.5); likewise partName's writer and reader l… → **Keep the reader list in one table (§2.5's read column) and have §1b cite it, or merge §1b's Records table into §2.5.**
  * V03-DUP-3 [internal_duplications; minor] The storey-less building rule (no level at or above ground, basement storeys planned alone from basementDoor(b) directly or through O2's one crypt join, otherwise outside-door heads with storey null, else an empty plan) is restat… → **Keep it in §3.3 S6 (or 3.1 step 2) and cite it from the other three.**
  * V03-DUP-4 [internal_duplications; minor] The Entrance.storey derivation (level meeting outside ground within datum.maxSteps x riserCm, nearest of two, main entrance over an external basement at or above ground only, 0 with a stoop where none meets, null without ground(b… → **Keep the rule in §3.6 (or in BCR-V3-26 as applied to base §2.6 rule 4) and reduce the type comment to a reference.**
  * V03-DUP-5 [internal_duplications; minor] The vault / capped bays / stair-entered definitions (step-2 ring holding its capped bays or the author's ring; never moved by the rank; capped bays = step-2 ring less trimmed ring inside Basement.ring; derived never stored) are e… → **Define vault, capped bays and stair-entered once (3.7.4) and cite from 3.7.1, 2.1 and 1b.**
  * V03-DUP-6 [internal_duplications; minor] The tool, lifecycle row and undo of each plan edit are tabulated in §1b (edit, tool, lifecycle row, undo), again in §4.1 (tool -> edits), again in §4.3 Undo and §2.5's lifecycle rows; principle (1) and (9) (one table can carry to… → **Keep one edit table (tool, semantics ref, lifecycle row, undo) and cite it from §1b, §2.5 and §4.3.**
  * V03-DUP-7 [internal_duplications; minor] The same hand-off is restated per round with supersessions (e.g. volume 1's reserve: round 3 second brief 'nothing required', superseded by round 4 second brief; volume 2's round 6 hand-off 'superseded by the finalization ... Rou… → **One live hand-off table (destination, rule, status: closed at destination / open).**
  * V03-ELEG-1 [elegance_candidates; minor] The warning code enumeration mixes W_-prefixed upper-case codes (W_TIER_UNREACHED ...) with lowerCamel names (shrineOneRoom, solidMonument, stackCarried) in one field; principle (9) asks names made uniform. → **Rename the three lowerCamel codes into the W_ form (or split notes from warnings) with an equivalence list.** — *closed by:* elegance ruling (E-list)
  * V03-ELEG-2 [elegance_candidates; minor] Two pure outside-door placement functions of eager records share the same shape (door parts/sides at least two moduleCm long, a two-module span, a nearest-point slide, ties toward the first vertex, in @plat/plots at M3a, read by … → **Canon ruling with an equivalence list, or a ruling recording the separating nuance.** — *closed by:* elegance ruling (E-list)
  * V03-EDGE-1 [edges_observed; minor] Undefined inputs of the storey-height rule: E(w) = deckLevel(w) - heights.baseCm <= 0 or below one riser per storey (a degenerate or edited wing), and G + (n - 1) x U = 0 in the ratio; and for s < 0 'the baseCm of the ground wing… → **Define the outcome (e.g. clamp to one storey of E, the lowest ground wing's baseCm under the ring) with its failure rung and a T-V3 clause.** — *closed by:* edge catalogue (EI-V03-EDGE-1)
  * V03-WGAP-1 [wiring_gaps; minor] The crypt section provider over Basement.crypt with its info.crypt.* catalogue keys, which V10 §3.9a lists among the owed section providers (V10 §1b row 'WhySection rows underground and crypt'), is stated only in the integration … → **Add the crypt section provider to §1b's Interfaces table and §4.6 (with its keys) and extend T-V3-12 (or add a clause) to cover it; fold IN-V03-1 into the body.** — *closed by:* wiring routing (V03-WGAP-1)
  * V03-MISSING-1 [missing_parts; major] J122: every remaining owner question is DECIDED as recorded in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md and must be marked answered with its decision and J122; V03 §11 Q1 still reads as an open recommendation ('Recommendation… → **Mark Q1 'answered: yes (J122)' and rewrite §8's branches to the decided order (with the defer finding on §8).**
  * V03-DEFER-1 [deferral_wording; minor] Deferral wording: the rows' keying depends on a future act ('until volume 11 names the class ids ... they then move'), an unresolved choice (principle (6)); V11 §3.5 either names class ids for stepped_temple, terraced_palace, tie… → **Rule it now: key them by the V11 class ids if V11 has them, else state the specialisation keying as final.**
  * V03-DEFER-2 [deferral_wording; minor] Conditional wording that waits on another volume ('until volume 4 records its marks'): V04 is designed at build depth; either V04 records grade-face marks on archVault chambers (then V03 reads them and the fallback is the rule's … → **Rule it against V04's landed archVault design: cite V04's mark field, or make the arch-mouth rule the definition.**
  * V03-DEFER-3 [deferral_wording; major] The build plan still branches on an unanswered owner question (Q1); under J122 every remaining owner question is decided in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md and the combined build order is written into §16 and INDEX.m… → **Replace both branches with the decided Q1 answer (J122) and cite §16 / INDEX.md for the combined order.**
  * V03-DEFER-4 [deferral_wording; minor] J-V3.93 records 'specialisation rows under '*' until volume 11 names their class ids, over waiting' - the same conditional future move as §2.4's '*' rows paragraph (see defer V03-1). → **Close with the same ruling as the §2.4 finding.**
  * V03-NARR-1 [narration; minor] Eight stacked 'PENDING FABLE REVIEW' banner lines (V3-interiors, revise-V3, reconcile-V03-r1..r6); principle (8) allows one marker line per volume (the close's). → **Replace by the close's single marker line.**
  * V03-NARR-2 [narration; minor] PROGRESS ledger, revision and reconciliation-round ledgers (about 100 lines) narrate how the text evolved (principle (5)); the validation records keep it. → **Remove; the critique/seam files and lane-events.log keep the history.**
  * V03-NARR-3 [narration; minor] Normative wiring rows carry seam and critique provenance tags ('seam S23R2-15', 'seam S23R3-16', 'S23R1-24', 'ST-39', 'S23-34', 'file f item 233's note') that narrate which review found what; principle (5). → **Drop the provenance tags from normative rows; the seam files keep them.**
  * V03-NARR-4 [narration; minor] Lifecycle rows and derivation steps carry seam tags (seam S23R2-10, S23R4-01, S23R5-03, S23R3-05, S23R4-03, S23R5-01, S23-15, ST-39, S23R1-24, V3C-75, S23-34) narrating which review changed them (principle (5)). → **Drop the tags; the seam files keep them.**
  * V03-NARR-5 [narration; minor] 'V03 is unbuilt, so moving from one mean height per wing to these profiles moves no golden (J-V3.90)' narrates a design change between drafts (principle (5)). → **Drop the sentence; J-V3.90 keeps the reasoning.**
  * V03-NARR-6 [narration; minor] Test bars carry critique and seam provenance in their text (V3C-.., S23-.., S23R1-.. ... S23R6-.., SCC-..) and T-V3-34 says 'not a golden's shift (V03 is unbuilt)'; principle (5). → **Drop the tags and the unbuilt remark; the critique and seam files keep the provenance.**
  * V03-NARR-7 [narration; minor] '(The critique's ≈ 6.6 pw for the dropped rows recomputes from the matrix as 5.5 pw, 5.3 pw after B3's plan half.)' narrates a review exchange (principle (5)). → **Drop the sentence.**
  * V03-NARR-8 [narration; minor] J-V3.110 is a process record, not a design decision: it chooses which lane applies which seam half ('routed to the base-change lane ... over leaving them to the next round ... left to the lane that relabels file f items 226 and 2… → **Remove J-V3.110 from the decisions table (its design content is already J-V3.109 and 4.2's deck bend).**
  * V03-NARR-9 [narration; minor] Decisions J-V3.111 - J-V3.129 open with '*Reconciliation round n (seam ...)*' or '*Finalization*', carry '*Amended (round 5; SCC-91)*' / '*Noted (round 6)*' layers, 'Refinements of the seam's text, recorded' lists and 'No shipped… → **Rewrite each as its final decision (chose X over Y because Z), dropping round labels and amendment layers; the seam files keep the history.**
  * V03-NARR-10 [narration; minor] The BCR texts carry process narration: 'BCR-V3-1 – BCR-V3-10 are the first draft's, revised; ... from the second round', '*Reconciliation round 4, second brief (seam ...)*', 'Quotation checked present once in the base by a whites… → **Keep each BCR's heading, current and new text; drop round labels, receipts and label remarks (the validation records keep them).**
  * V03-NARR-11 [narration; minor] About 700 lines narrate the text's evolution (per-round CONFIRMED receipts with md5s, scratchpad edit scripts and doc_checks counts; per-round 'what changed, in place' lists; superseded hand-offs kept 'for the record'); principle… → **Fold IN-V03-1..3 into the body, keep one current hand-off list, and move the round records to the validation files.**
  * V03-BREF-1 [broken_references; minor] The cited receipts 'scratchpad receipt rcV3r4b/quote-receipt.txt' and 'rcV3r4/quote-receipt.txt' name session-scratchpad files outside /Users/cstokes/Desktop/Maps (standalone rule, principle (6)); they cannot resolve for a reader… → **Drop the receipt references (or cite the validation record that holds the quote check).**
  * V03:IN-V03-1 [integration-note; minor] * **IN-V03-1 (J-VI.17 H18; CVR-V10-2, CVR-V10-9).** This volume registers, for volume 10's clerk: (a) the `crypt` section provider over `Basement.crypt` — presence by the class's `crypt` value, area and form, the principal crypt,… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V03:IN-V03-2 [integration-note; minor] * **IN-V03-2 (J-VI.4).** A basement or cellar request on a deck building, and every other plan edit that contradicts no dossier fact and no lock, is bent by its dry run (item 101 R2; volume 2's `bend.deck.basement`, S23-17 — `ben… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V03:IN-V03-3 [integration-note; minor] * **IN-V03-3 (J-VI.5).** The tier facts this volume reads (`storeyRange`, `BaseWing.on` and `.solid`, `stairChain`, `landingSide`, `MassingRef.stack`) are volume 2's second revision as landed; its `W_TIER_UNREACHED` flags a store… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**

### V04

* **Size:** 83966 words; the goal band after: 50380–62974 words; narration ranges alone 11812 words; 40 restatements to references; 24 BCR blocks to pointers.
* **STATE:** 275 facts (canon.json → units.V04.state); 5 index rows.
* **REFERENCE (40):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | V04-0016 | model §2.3 | — (section) |
  | V04-0017 | model §2.4 | — (section) |
  | V04-0018 | model §2.7 | — (section) |
  | V04-0019 | model §2.5 | — (section) |
  | V04-0021 | pipeline §4.7 | — (section) |
  | V04-0022 | pipeline §4.5 | PIPELINE-0218 (near) |
  | V04-0023 | pipeline §4.1 | PIPELINE-0005 (near) |
  | V04-0024 | determinism §7.8 | DETERMINISM-0500 (near) |
  | V04-0025 | rendering §8.2 | RENDERING-0382 (near) |
  | V04-0026 | determinism §7.7 | — (section) |
  | V04-0027 | determinism §5.2 | — (section) |
  | V04-0028 | model §2.7 | — (section) |
  | V04-0029 | model §2.7 | — (section) |
  | V04-0030 | pipeline II.7.4 | PIPELINE-0792 (fact) |
  | V04-0032 | model §2.7 | MODEL-0512 (near) |
  | V04-0034 | determinism §7.8 | — (section) |
  | V04-0036 | pipeline §4.7 | — (section) |
  | V04-0037 | model §2.7 | — (section) |
  | V04-0044 | V01 V01 §3.7.1 | V01-0285 (fact) |
  | V04-0051 | determinism §7.7 | DETERMINISM-0571 (fact) |
  | V04-0052 | determinism §7.7 | DETERMINISM-0569 (fact) |
  | V04-0053 | pipeline II.7.4 | PIPELINE-0751 (fact) |
  | V04-0054 | model §2.3 | MODEL-0129 (near) |
  | V04-0055 | model §2.4 | MODEL-0128 (near) |
  | V04-0056 | model §2.7 | MODEL-0156 (fact) |
  | V04-0057 | model §2.7 | — (section) |
  | V04-0058 | model §2.7 | MODEL-0270 (near) |
  | V04-0059 | model §2.7 | MODEL-0171 (near) |
  | V04-0060 | pipeline II.7.4 | PIPELINE-0748 (near) |
  | V04-0061 | model §2.7 | MODEL-0466 (near) |
  | V04-0072 | determinism §7.7 | — (section) |
  | V04-0073 | determinism §7.7 | DETERMINISM-0518 (near) |
  | V04-0075 | determinism §6.3 | DETERMINISM-0165 (near) |
  | V04-0175 | rendering §8.4 | RENDERING-0382 (near) |
  | V04-0176 | rendering §8.1 | — (section) |
  | V04-0177 | rendering §8.2 | — (section) |
  | V04-0178 | rendering §8.4 | RENDERING-0258 (near) |
  | V04-0179 | rendering §9 | — (section) |
  | V04-0180 | rendering §11.1 | RENDERING-0437 (near) |
  | V04-0194 | scope §16 | — (section) |

* **Its §10 requests → one-line pointers to the applied f items (46):** BCR-V4-1 (was V04 BCR-1) → item 205; BCR-V4-2 (was V04 BCR-2) → item 208; BCR-V4-3 (was V04 BCR-3) → item 247; BCR-V4-4 (was V04 BCR-4) → item 212; BCR-V4-5 (was V04 BCR-5) → item 325; BCR-V4-6 (was V04 BCR-6) → item 319; BCR-V4-7 (was V04 BCR-7) → item 330; BCR-V4-8 (was V04 BCR-8) → item 355; BCR-V4-9 (was V04 BCR-9) → item 403; BCR-V4-10 (was V04 BCR-10) → item 413; BCR-V4-11 (was V04 BCR-11) → item 475; BCR-V4-12 (was V04 BCR-12) → item 505; BCR-V4-13 (was V04 BCR-13) → item 526; BCR-V4-14 (was V04 BCR-14) → item 386; BCR-V4-15 (was V04 BCR-15) → item 484; BCR-V4-16 (was V04 BCR-16) → item 452; BCR-V4-17 (was V04 BCR-17) → item 423; BCR-V4-18 (was V04 BCR-18) → item 445; BCR-V4-19 (was V04 BCR-19) → item 551; BCR-V4-20 (was V04 BCR-20) → item 559; BCR-V4-21 (was V04 BCR-21) → item 555; BCR-V4-22 (was V04 BCR-22) → item 485; BCR-V4-23 (was V04 BCR-23) → item 556; BCR-V4-24 (was V04 BCR-24) → item 561; BCR-V4-25 (was V04 BCR-25) → item 281; BCR-V4-26 (was V04 BCR-26) → item 562; BCR-V4-27 (was V04 BCR-27) → item 552; BCR-V4-28 (was V04 BCR-28) → item 548; BCR-V4-29 (was V04 BCR-29) → item 554; BCR-V4-30 (was V04 BCR-30) → item 557; BCR-V4-31 (was V04 BCR-31) → item 563; BCR-V4-32 (was V04 BCR-32) → item 248; BCR-V4-33 (was V04 BCR-33) → item 249; BCR-V4-35 (was V04 BCR-35) → item 404; BCR-V4-36 (was V04 BCR-36) → item 560; BCR-V4-36 (was V04 BCR-36) → item 564; BCR-V4-37 (was V04 BCR-37) → item 549; BCR-V4-38 (was V04 BCR-38) → item 414; BCR-V4-39 (was V04 BCR-39) → item 306; BCR-V4-40 (was V04 BCR-40) → item 407; BCR-V4-41 (was V04 BCR-41) → item 338; BCR-V4-42 (was V04 BCR-42) → item 558; BCR-V4-43 (was V04 BCR-43) → item 243; BCR-V4-45 (was V04 BCR-45) → item 244; BCR-V4-45 (was V04 BCR-45) → item 559; BCR-V4-46 (was V04 BCR-46) → item 250.
* **BCR blocks → pointers (24):** BCR-1 V04 → item 205; BCR-2 V04 → item 208; BCR-3 V04 → item 247; BCR-4 V04 → item 212; BCR-5 V04 → item 325; BCR-6 V04 → item 574; BCR-7 V04 → item 330; BCR-8 V04 → item 355; BCR-9 V04 → item 403; BCR-10 V04 → item 278; BCR-11 V04 → item 475; BCR-12 V04 → item 505; BCR-13 V04 → item 526; BCR-14 V04 → item 386; BCR-15 V04 → item 484; BCR-19 V04 → item 551; BCR-20 V04 → item 559; BCR-21 V04 → item 555; BCR-24 V04 → item 561; BCR-27 V04 → item 552; BCR-31 V04 → item 563; BCR-36 V04 → item 564; BCR-40 V04 → item 407; BCR-45 V04 → item 291.
* **Terms to replace:** G-firstmap (first paint → first map; 13 hits, first lines [378, 423, 995, 2036, 2611, 2630]); G-cite (V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 … → Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y; 722 hits, first lines [107, 127, 136, 217, 228, 232]); G-standalone (standalone hood(s), lone neighbourhood document, standalone neighbourhood → standalone neighbourhood document; 1 hits, first lines [1033]); G-DR (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8 → DR26–DR35 (ID-DR); 8 hits, first lines [386, 522, 531, 1521, 3502, 3791]); G-unexcavated (LayerSpec.showUnexcavated → the view key `showUnexcavated`; 1 hits, first lines [3806]).
* **Conflicts it resolves (12):** MC-11, V04-ICONF-1, V04-ICONF-2, V04-ICONF-3, V04-ICONF-4, V04-ICONF-5, V04-XCONF-1, V04-XCONF-2, V04-XCONF-3, V07-XCONF-2, CANON-C03, CANON-C04.
* **File f items that concern it (cite as base text):** 205, 207, 208, 212, 229, 238, 239, 243, 244, 245, 247, 248, 249, 250, 252, 278, 281, 291, 306, 309, 319, 325, 330, 338, 355, 372, 386, 403, 404, 407, 413, 414, 423, 445, 452, 475, 484, 485, 505, 526, 548, 549, 551, 552, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 568, 573, 574.
* **File g parts it writes or applies:**
  * item 113: buried former-town ruins (derived from the former geometry, at their old ground level) and lost access: access counts only through OPEN links; a void whose every open path closes becomes LOST (remembered as once known, drawn faded like an unexcavated void) until refound; dwellings in a lost void empty by the vacancy rules and may return
* **Wiring gaps it closes:** W-DOS-10c, W-IF-01, W-HOOK-02, V04-WGAP-2, V04-WGAP-3, V04-WGAP-4.
* **Elegance rulings it applies:** E-03, E-16, E-24, E-39.
* **Id rulings it applies:** ID-BCR, ID-WX, ID-DR, ID-DUPDEF.
* **Owner questions to mark answered:** Q1 — J122: yes; Q2 — J122: accepted.
* **Cohesion checks:** see *Cohesion checks* (every volume).
* **Disagreements (agreement.md):** `T-V3-23` with V03 (V04-XCONF-3); `PageDown` with V03 (V04-XCONF-2); `PageUp` with V03 (V04-XCONF-2); `AccessPoint` with determinism (V04-ICONF-1).
* **Its own Fix list (§13) and hand-off rows — every item fixed in the text (or marked for the adjudicator with its reason); §13 keeps no open item:** V04-0346.
* **Hand-offs to close here (31):** V02:X12, V06:X1, V06:X2, V06:X14, V06:X25, V06:X29, V06:X33, V07:FL-2, V07:FL-3, V08:X3, V08:X13, V09:XV-V9-3, V09:XV-V9-4, V09:XV-V9-8, V09:XV-V9-14, V09:XV-V9-27, V10:CVR-V10-1, V10:CVR-V10-10, V11:X-V11-4, V11:X-V11-10, V11:X-V11-14, V11:X-V11-15, V11:X-V11-17, V12:X-V12-4, V12:X-V12-11, V12:X-V12-13, V12:X-V12-16, V12:X-V12-15, V12:X-V12-17, V12:X-V12-18, V12:X-V12-19 (agreement.md lists each).
* **Edges (edges.md):** 52 UNDEFINED, 62 UNTESTED; 62 UNDEFINED combinations it owns.
* **Open findings routed here (59):**
  * VOL-V03-V04-RESTATEMENTS-005 [restatements; -] the dense core plot share 0.62 (restated with its citation in P2) → **state it once at base §4.2 S2; every other place cites it**
  * VOL-V03-V04-RESTATEMENTS-006 [restatements; -] the sewer-front capacity law 2 x sum lengthM x admissibleShare / meanFrontage and the minimum underground depth 4 m x the band row (restated in P4 and §2.4's NetworkForecast comment) → **state it once at base II.7.3; every other place cites it**
  * VOL-V03-V04-RESTATEMENTS-007 [restatements; -] rate(underground) 0.03 and "tunnels two bands slower than a building" (restated in 3.10) → **state it once at base §4.11 persistence table; every other place cites it**
  * VOL-V03-V04-RESTATEMENTS-008 [restatements; -] ambient.underground 0.02 (restated in 5.3) → **state it once at base §8.4; every other place cites it**
  * VOL-V03-V04-RESTATEMENTS-009 [restatements; -] accessReachM 5 m (restated in 3.5.7 (c)) and the basement floor = baseCm less Basement.floors x cellar.depthCm (restated in (d)) → **state it once at base II.7.6 / §2.6; every other place cites it**
  * VOL-V03-V04-RESTATEMENTS-010 [restatements; -] raised.supportFoundationCm 400 cm (restated in 3.5.0 (1)) and raised.vaultCap per rung (restated in §6: 240 at METROPOLIS) → **state it once at base §2.7 (BCR-45); every other place cites it**
  * VOL-V03-V04-RESTATEMENTS-011 [restatements; -] the ossuary need law A(f) (restated in full in 3.5.1 (2)) → **state it once at base II.7.6 (as BCR-36 amends it); every other place cites it**
  * VOL-V03-V04-RESTATEMENTS-012 [restatements; -] growthCapShare 0.01 per year compounded (finding restate V04-1) → **state it once at V11 §3.23.8; every other place cites it**
  * VOL-V03-V04-RESTATEMENTS-013 [restatements; -] the V11-owned rows of ruin, openings, dig and catacomb tables (finding restate V04-3) → **state it once at V11 §3.23; every other place cites it**
  * VOL-V03-V04-RESTATEMENTS-014 [restatements; -] the base total 185.5-248.5 pw (finding restate V04-2) → **state it once at base §16; every other place cites it**
  * V04-RESTATE-1 [restatement_findings; minor] The cell states the value '0.01 per year, compounded over the epoch's span' and in the same breath 'the value is V11's' (V11 §3.23.8, J-V11.32; J-VI.6): one fact with two homes; a V11 retune would leave V04's table stale. → **Cite V11 §3.23.8 for the value; V04's cell keeps only the schema and the compounding rule.**
  * V04-RESTATE-2 [restatement_findings; minor] The volume restates the base's total ('the base's 185.5-248.5 pw'); f item 568 makes §16's totals computed once by the coherence pass and V03 states 'this volume states no total of its own'; a restated base total goes stale with … → **Cite §16's total instead of restating it.**
  * V04-RESTATE-3 [restatement_findings; minor] IN-V04-1 rules that the rows V11 owns (ruin chances, cultures and monument cells, survival order, source weights, openings, dig rows, catacomb rows) are read from V11 §3.23 and V04's values 'are illustrations of those rows', yet … → **Cite V11 §3.23 for those rows' values; V04 §2.3 keeps the schema and names V11 as the owner.**
  * V04-DUP-1 [internal_duplications; minor] The list of commits that run V01's opening pass (T6 at generation and after a re-derivation, AccessPass.run with a scope, CatacombGrowth.grow founding a complex, delete, setAttr kind or role, placeAccess public opening, delete of… → **State the list once (§3.10) and cite it from §1b.2, §3.1, §3.11 and §4.3.**
  * V04-ICONF-1 [internal_conflicts; minor] §2.6's table gives AccessPoint.state (BCR-21) its own lifecycle row (create II.7.3 rule row, N11, U-LINK, setAttr, access closures; ...; absent open), while the closing sentence lists AccessPoint.state among the base's fields tha… → **State once: the base row (§7.4) as BCR-21 amends it, and drop the other.** — *closed by:* conflict ruling V04-ICONF-1
  * V04-ICONF-2 [internal_conflicts; minor] Three decisions state superseded totals as current decisions: J-V4.71 'chose an estimate of 25.75-35.75 pw', J-V4.94 'chose an estimate of 27.25-38 pw', J-V4.104 prices U5 at '2.75-4 pw'; §8's table and J-V4.114 give the total 28… → **Keep one pricing decision (the §8 total with its reasons) and drop or fold the superseded totals (their history is in the validation records).** — *closed by:* conflict ruling V04-ICONF-2
  * V04-ICONF-3 [internal_conflicts; major] §5.5 states VTT portals only at openings in a wall line (a door access, a door or breach link, an underground building's entrances, each tunnel grille), every vertical access (stair, shaft, ladder, hatch, well, grating, mouth, si… → **Rule at the export's home (V04 §5.5 / BCR-16): portals only in a wall line, vertical accesses as shaft lights with a plat object; reword T-V4-28 and BCR-16 to it.** — *closed by:* conflict ruling V04-ICONF-3
  * V04-ICONF-4 [internal_conflicts; minor] BCR-18's naming bullet says 'a void system from its kind's slice (catacomb, ...), a catacomb reading its source church's name' and in the same bullet 'a catacomb complex its cemetery's name (a churchyard's its church's; a quarry … → **Drop 'a catacomb reading its source church's name'; the complex naming clause (§5.4) governs.** — *closed by:* conflict ruling V04-ICONF-4
  * V04-ICONF-5 [internal_conflicts; minor] IN-V04-2 says the monument is laid with 'TierCells.heights of the stepped-monument row' and that a returned TierFailure 'truncates the monument to the tiers laid (recorded in Chamber.monument.standing, W_RUIN_MONUMENT_SKIPPED whe… → **State once in §3.5.0a: heights source, the failure path, and which field records a truncation (lay.truncated) versus decay (standing); drop the note.** — *closed by:* conflict ruling V04-ICONF-5
  * V04-XCONF-1 [cross_part_conflicts; minor] §1b.1 says showUnexcavated is a per-viewer view key set by V09's control, 'not setLayer'; §1b.3 lists showUnexcavated among setLayer's targets (T12 dress, §7.4's layer row, undo inverse). One says it is not an edit, the other mak… → **Rule: showUnexcavated is a view key (J-VI.19): drop it from §1b.3's setLayer row (view keys are not undone, §2.9).** — *closed by:* conflict ruling V04-XCONF-1
  * V04-XCONF-2 [cross_part_conflicts; minor] Both volumes bind PageUp/PageDown in §14's keymap: V04 to step the depth band while the underground layer is active, V03 to step the plan's storey. An underground building's plan draws at the underground band's depth in the under… → **State the precedence once in §14's keymap (e.g. the storey switcher when a plan is open, else the band ladder) or give one of them other keys; both volumes cite it.** — *closed by:* conflict ruling V04-XCONF-2
  * V04-XCONF-3 [cross_part_conflicts; minor] V03 hands V04 a model-level bar matching T-V3-23 (g): with no building elaborated, the set of V04's crypt joins equals the set after elaborating every church. V04's T-V4-50 checks that crypt joins exist with cause crypt and heads… → **Add the clause to T-V4-50 (or rule the hand-off closed by T-V3-23 (g) alone and remove it from V03 §13).** — *closed by:* conflict ruling V04-XCONF-3
  * V04-ELEG-1 [elegance_candidates; minor] Principle (9) 'one pattern for every existence chance': five draws follow one rule - one uniform on sewer keyed by the thing's own lineages with no epoch component, fixed by its key and never re-drawn, re-compared against a risin… → **Canon ruling with an equivalence list.** — *closed by:* elegance ruling (E-list)
  * V04-EDGE-1 [edges_observed; major] L5's dug pieces for a subterranean dossier institution are 'held while that institution is live' (delete refused dossier-owned); what becomes of them when the dossier removes or closes the institution (an epoch's dossier phase or… → **State the outcome at L5 (e.g. kept, cause dossier, source cleared as a ruin's is, sealed or fading by U-FADE) with its lifecycle row and a T-V4 clause.** — *closed by:* edge catalogue (EI-V04-EDGE-1)
  * V04-EDGE-2 [edges_observed; minor] The reading counts links of kind secret and accesses in state locked as joins to the surface for every viewer, so a cluster reached only through a secret link is 'accessible' (dwellings may settle) while its knownTo hides the way… → **Rule with item 113 (e)'s application.** — *closed by:* edge catalogue (EI-V04-EDGE-2)
  * V04-WGAP-1 [wiring_gaps; minor] The dossier trace's derivation-row column names 'S2's stage count (§4.2 S2)' and 'S2, HistoryHint (BCR-34)' instead of a §7.7 derivation row id; item 20 (h) asks every derived map fact to trace to its derivation row; history.ageY… → **Name the §7.7 row that maps history.* to HistoryHint (the one g item 113 adds) in both rows.** — *closed by:* wiring routing (accounted in wiring.md)
  * V04-WGAP-2 [wiring_gaps; major] Principle (11): the deliberately modelled closure combinations have no test clause of their own for their edges: a cluster whose last access is closed by a U-FADE seal at an epoch (the vacate in the same batch, V6 §3.18.1 (4)) is… → **Add bars: fade-seal of a last access vacates in the batch and a reopen (reopen op or new dig) lets dwellings return at the next placement; bricked-then-undo restores dwellings byte-identically; a saved document with unexcavated clusters reloads with the same excavation reading.** — *closed by:* wiring routing (V04-WGAP-2)
  * V04-WGAP-3 [wiring_gaps; minor] §1b.1 lists W_RUIN_SOURCE_REMOVED among BCR-41's stage warnings (produced by U-SYS or the dossier phase's mutation, read by the report and V10), and §2.6 / §3.11 report it, but BCR-41's base text lists seven codes without it and … → **Add W_RUIN_SOURCE_REMOVED to BCR-41's list (f item 558).** — *closed by:* wiring routing (V04-WGAP-3)
  * V04-WGAP-4 [wiring_gaps; major] The grade-face hook has one end only: V03 §3.12 (9) reads 'a side of the host chamber ... that volume 4 marks open to ground part 0', V03 §12 cites 'IN-V04-4's gradeFaces', and V04's integration note says an archVault chamber 're… → **Home the field: add Chamber.gradeFaces (or a derived gradeFaces(chamberId) reader, as ruinColumns is) to V04 §2.2 / BCR-46 with its producer (the reconcile's two open faces), lifecycle row and test; V03 §3.12 (9) then cites it and drops 'until volume 4 records its marks'.** — *closed by:* wiring routing (V04-WGAP-4)
  * V04-WGAP-5 [wiring_gaps; minor] The integration notes add interfaces the body never wires: catacombOutcome(doc, face) (read-only over the candidate pass's per-face record), the underground section provider for V10 §3.9a with its extra rows and catalogue keys, a… → **Add them to §1b.2 (implementer V04, callers V10 oracle and clerk, V09 panel), describe them in §4.5, and extend a bar (T-V4-21 or a new one) to cover them; fold the notes into the body.** — *closed by:* wiring routing (accounted in wiring.md)
  * V04-MISSING-1 [missing_parts; major] g item 113 (owner rule, 2026-09-29 ~14:05-14:10; routed to 'V04 (buried former-town ruins; lost access)' for application by every named unit at build depth) is absent from V04: (e) 'ACCESS LOST WHEN ITS LINK CLOSES' - a void whos… → **Write V04's item-113 parts at build depth as an addition: a lost reading (record or derivation, its lifecycle rows, draw and why), the replay-sourced buried former settlement (inputs from V06's replay, burial threshold cell from V11, layout from the former geometry), and the bars as T-V4 tests.**
  * V04-MISSING-2 [missing_parts; major] J122: V04 Q1 ('the underground as M6-U right after M5, beside it if a second pair is free: yes') and Q2 ('the underground's cost (28.25-39.25 pw): accept') are DECIDED in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md and must be m… → **Mark Q1 and Q2 'answered (J122)', rewrite §8's slot sentence and BCR-13's row to the decided order, and let §16's total (f item 568) carry M6-U as decided.**
  * V04-TERM-1 [terminology; minor] V04 numbers its base change requests 'BCR-n' (BCR-1 ... BCR-46) and cites itself 'V4 §n', where every other volume uses 'BCR-V<k>-n' (BCR-V2-31, BCR-V3-20, BCR-V5-30, BCR-V11-13) and the canon form 'V04 §3.2'; amendments f writes… → **Rename V04's requests BCR-V4-n (and V01's BCR-V1-n) and the self-reference form to 'V04 §n', with a rename list.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V04-DEFER-1 [deferral_wording; major] J122 decided V04 Q1 ('the underground as M6-U right after M5, beside it if a second pair is free: yes', docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md, with the combined order: M6 and M6-U after M5); V04 §8 still conditions the lan… → **Write the decided order (M6-U after M5, beside it when a second pair is free) and cite §16 / INDEX.md.**
  * V04-NARR-1 [narration; minor] Eleven 'PENDING FABLE REVIEW' banners plus 'REVISED'/'RECONCILED' paragraphs stack at the head; principle (8) allows one marker line per volume (the close's). → **Replace by the close's single marker line.**
  * V04-NARR-2 [narration; minor] PROGRESS, REVISION, RECONCILIATION (rounds 1-6), SECOND-ROUND ledgers (about 90 lines) narrate the text's evolution (principle (5)). → **Remove; the validation records keep them.**
  * V04-NARR-3 [narration; minor] A budget paragraph is headed by the review round that added it ('The second reconciliation's additions (2026-09-29)'); principle (5). → **Fold its rows into the edit and epoch budget paragraphs without the round label.**
  * V04-NARR-4 [narration; minor] Test bars carry critique and seam provenance tags (C4-.., SL-.., ST-.., SLR1-.. ... SLR5-01, TR-.., TT-..) in their family cells and text; principle (5). → **Drop the tags; the critique files keep them.**
  * V04-NARR-5 [narration; minor] Decisions carry evolution narration: J-V4.1 '(seven as landed, nine after the revision added U-ACCESS and U-RECONCILE)', J-V4.2 'amended by the revision', J-V4.46 'amended by the second reconciliation', J-V4.106 'amended by the t… → **State each decision in its final form without round labels.**
  * V04-NARR-6 [narration; minor] The BCR section narrates its amendment history in two closing paragraphs and inline parentheticals; the amended texts are already in place (principle (5)). → **Drop the amendment narration; keep each BCR's final text.**
  * V04-NARR-7 [narration; minor] About 700 lines narrate the text's evolution: per-round CONFIRMED receipts (md5s, scripts, doc_checks counts), per-round fix lists all reading 'the Fix list holds no item', superseded totals ('27.75-38.75 pw', '27.25-38', '2.75-4… → **Fold IN-V04-1..14 into the body, keep one live hand-off table and one CONFIRMED/PLAUSIBLE list, move round records to the validation files.**
  * V04-BREF-1 [broken_references; minor] V04's own rule ('Section references without a prefix (§4.7, II.7.3) are the base's; V4 §n is this volume's') is broken by bare self-references: §3.5.0, §3.5.1, §3.5.4, §3.5.5 and §3.5.7 used for V04's own sections resolve, by tha… → **Prefix every self-reference 'V04 §' (the canon form) or make the volume's local form unambiguous.**
  * SLR6-02 [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-layers-r6.md SLR6-02 → **V04 §6 prices the underground switch's edit (the ground-edit row V04 §4.3 reads) as a budget row.**
  * SLR6-03 [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-layers-r6.md SLR6-03 → **V04 §12's stale hedge leaves with the narration; J-V4.121's pointer names the undo row that exists (§7.4's) or is removed.**
  * SCC-113 [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-content-calibration-r6.md SCC-113 → **J-V4.118's rows confirm at V12's staged form (panel M4's M4-110 group at M4, T-V4-62 at V4-U3, the V4-U5 panel) and name the span constants by V11's cell names.**
  * V04:IN-V04-1 [integration-note; minor] * **IN-V04-1 (J-VI.6).** `growthCapShare` is volume 11's 0.01 **per year, compounded over the epoch's span** (V11 §3.23.8, J-V11.32): the defaults table, V4 §3.5.1, the epoch step and T-V4-52 now read `max(extent × ((1 + growthCa… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V04:IN-V04-2 [integration-note; minor] * **IN-V04-2 (J-VI.5; volume 2's X19, X29).** The ruin stage lays a stepped monument by calling volume 2's `drawTiers` (ST1, on the ruin's stream) and then `layTiers` alone, with `TierCells.heights` of the `stepped-monument` row,… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V04:IN-V04-3 [integration-note; minor] * **IN-V04-3 (J-VI.17 H2; volume 2's X12).** The dig draw's key (item 109 (j) (3) (i)) carries the wing key of a wing the mutator adds (V2 §3.9 W6); item 109 (k) (5)'s obstacle test reads volume 2's footprint and basement floor (… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V04:IN-V04-4 [integration-note; minor] * **IN-V04-4 (J-VI.17 H12; volume 3's hand-off).** An `archVault` chamber records its grade faces (`gradeFaces`: the ring's sides open to ground part 0); a building seated in one takes its frontage entrance on a grade face with `… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V04:IN-V04-5 [integration-note; minor] * **IN-V04-5 (J-VI.17 H13).** The arch vaults beneath a span that a landfall ruins (volume 5's `sky.islands`) follow the span's state by this volume's own decline rule (collapse with the span; C4-110-2). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V04:IN-V04-6 [integration-note; minor] * **IN-V04-6 (J-VI.17 H14; volume 8's X13).** The ruin-existence step (V4 §3.5.0a) reads `site.ruinEvidence`'s seven kinds in its own strongest-first order, DR30 (DR-V8.2), DR31's (DR-V8.3) relief and mining inputs and DR32's (DR… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V04:IN-V04-7 [integration-note; minor] * **IN-V04-7 (J-VI.17 H15; XV-V9-4).** The underground reader returns, on a cavern or ruin cluster, the fact `under/wayIn` (the connection graph's path from the nearest surface access, or none) and, on a burial face, the why path… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V04:IN-V04-8 [integration-note; minor] * **IN-V04-8 (J-VI.17 H16; CVR-V10-1, CVR-V10-10).** This volume exports `catacombOutcome(doc, face)`, read-only, over the candidate pass's derived per-face record (`holds`, `countReached`, `wet`, `age`, `island`, `belowTown`, `c… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V04:IN-V04-9 [integration-note; minor] * **IN-V04-9 (J-VI.9).** `terminal.kind` is `cistern` only under a `conduit_house` the roster or the dossier holds; otherwise `fountain` or `basin`. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V04:IN-V04-10 [integration-note; minor] * **IN-V04-10 (J-VI.2).** The span `reason` vocabulary (`way`, `water`, …) is the span rule's own; the raised way's recorded reason is volume 6's `RaisedReasonKey` with its derived word (J-VI.2) — two different fields. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V04:IN-V04-11 [integration-note; minor] * **IN-V04-11 (J-VI.19).** `showUnexcavated` is volume 9's per-viewer view key (BCR-V9-20), not a `LayerSpec` field: §1b's and §2's rows naming `LayerSpec.showUnexcavated` read "the view key `showUnexcavated`", set by volume 9's … → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V04:IN-V04-12 [integration-note; minor] * **IN-V04-12 (J-VI.22).** This volume's milestone is **M6-U** (renamed in place, 17 uses): "M6" is volume 2's stage 3. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V04:IN-V04-13 [integration-note; minor] * **IN-V04-13 (J-VI.28 applying J-VI.19 in the text).** §1b's reader row and §2's lifecycle row for the unexcavated style now name "the view key `showUnexcavated` (BCR-V9-20; J-VI.19)", set by volume 9's per-viewer control, not a… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V04:IN-V04-14 [integration-note; minor] * **IN-V04-14 (J-VI.27).** The `supports` list of BCR-45's record — the piers whose keys bound this volume's arch-vault spans and whose depth `raised.supportFoundationCm` the foundation rule reads — is produced by file f item 244… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**

### V05

* **Size:** 81161 words; the goal band after: 48697–60871 words; narration ranges alone 8970 words; 14 restatements to references; 30 BCR blocks to pointers.
* **STATE:** 483 facts (canon.json → units.V05.state); 8 index rows.
* **HISTORY OUT:** V05-0536.
* **REFERENCE (14):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | V05-0019 | scope §1.1 | SCOPE-0360 (fact) |
  | V05-0020 | V01 (the editor finds the section) | — (section) |
  | V05-0106 | V01 V01 §3.10.3 | V01-0326 (fact) |
  | V05-0113 | pipeline II.6 | PIPELINE-0694 (near) |
  | V05-0136 | V11 (the editor finds the section) | — (section) |
  | V05-0160 | V06 V06 §1b | V06-0028 (fact) |
  | V05-0161 | model §2.7 | — (section) |
  | V05-0173 | V01 (the editor finds the section) | — (section) |
  | V05-0176 | pipeline §4.1 | PIPELINE-0219 (near) |
  | V05-0242 | pipeline §4.5 | — (section) |
  | V05-0254 | V01 V01 §3.10.3 | V01-0331 (fact) |
  | V05-0287 | determinism §5.2 | DETERMINISM-0031 (near) |
  | V05-0364 | determinism §7.4 | — (section) |
  | V05-0423 | V12 V12 §9 | V12-0375 (fact) |

* **Its §10 requests → one-line pointers to the applied f items (28):** BCR-V5-1 → item 251; BCR-V5-2 → item 203; BCR-V5-3 → item 282; BCR-V5-4 → item 546; BCR-V5-5 → item 295; BCR-V5-6 → item 213; BCR-V5-7 → item 320; BCR-V5-8 → item 307; BCR-V5-9 → item 252; BCR-V5-10 → item 356; BCR-V5-11 → item 331; BCR-V5-12 → item 387; BCR-V5-13 → item 415; BCR-V5-14 → item 476; BCR-V5-15 → item 296; BCR-V5-16 → item 308; BCR-V5-17 → item 547; BCR-V5-18 → item 408; BCR-V5-19 → item 286; BCR-V5-20 → item 299; BCR-V5-21 → item 274; BCR-V5-22 → item 416; BCR-V5-24 → item 204; BCR-V5-25 → item 375; BCR-V5-26 → item 253; BCR-V5-27 → item 245; BCR-V5-29 → item 290; BCR-V5-30 → item 309.
* **BCR blocks → pointers (30):** BCR-V5-1 → item 251; BCR-V5-2 → item 203; BCR-V5-3 → item 282; BCR-V5-4 → item 546; BCR-V5-5 → item 295; BCR-V5-6 → item 213; BCR-V5-7 → item 320; BCR-V5-8 → item 307; BCR-V5-9 → item 252; BCR-V5-10 → item 356; BCR-V5-11 → item 331; BCR-V5-12 → item 387; BCR-V5-13 → item 415; BCR-V5-14 → item 476; BCR-V5-15 → item 296; BCR-V5-16 → item 308; BCR-V5-17 → item 547; BCR-V5-18 → item 408; BCR-V5-19 → item 286; BCR-V5-20 → item 299; BCR-V5-21 → item 274; BCR-V5-22 → item 416; BCR-V5-23 → item (by id in file f); BCR-V5-24 → item 204; BCR-V5-25 → item 375; BCR-V5-26 → item 253; BCR-V5-27 → item 245; BCR-V5-28 → item (by id in file f); BCR-V5-29 → item 290; BCR-V5-30 → item 309.
* **Terms to replace:** G-refview (reference view → reference viewport; 1 hits, first lines [2454]); G-vectorrung (the vector pass → the vector rung; 1 hits, first lines [2301]); G-cite (V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 … → Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y; 931 hits, first lines [37, 82, 87, 188, 191, 192]); G-unitinput (SkyHandover, hand-over (the unit-run view) → SkyUnitInput (the island's unit inputs); `handover` keeps only the reservation passing (IslandInstitution.handover); 46 hits, first lines [214, 238, 261, 360, 373, 374]); G-DR (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8 → DR26–DR35 (ID-DR); 15 hits, first lines [33, 278, 353, 410, 841, 2164]); G-newrandom (scoped re-roll, Try again (in prose), Rebuild … as generated → New random (§7.1); 'Try again' is only its catalogue label; 'reroll' only for rerollLayer; 1 hits, first lines [2642]).
* **Conflicts it resolves (6):** MC-05, MC-07, CF-PIPE-06, V05-ICONF-1, V05-XCONF-1, CANON-C03.
* **File f items that concern it (cite as base text):** 203, 204, 213, 244, 245, 246, 251, 252, 253, 260, 274, 282, 286, 290, 295, 296, 299, 307, 308, 309, 313, 320, 331, 356, 375, 387, 408, 415, 416, 476, 546, 547, 568, 575, 580.
* **File g parts it writes or applies:**
  * item 111: an island's own water, unchanged: one sentence stating that item 111's oasis, water pull and climate cell do not apply on a sky island (its water stays V05's)
* **Wiring gaps it closes:** W-HOOK-02, V05-WGAP-2a, V05-WGAP-2b, V05-WGAP-3.
* **Elegance rulings it applies:** E-01, E-02, E-16, E-24.
* **Id rulings it applies:** ID-BCR, ID-DR.
* **Owner questions to mark answered:** Q1 — J122: yes.
* **Cohesion checks:** see *Cohesion checks* (every volume).
* **Disagreements (agreement.md):** `SkyIsland` with model (MC-07); `ContextVector` with model (MC-05).
* **Its own Fix list (§13) and hand-off rows — every item fixed in the text (or marked for the adjudicator with its reason); §13 keeps no open item:** V05-0256, V05-0537, V05-0538, V05-0539.
* **Hand-offs to close here (17):** V06:X10, V06:X15, V06:X26, V06:X37, V06:X40, V06:X41, V06:X46, V08:X8, V09:XV-V9-8, V09:XV-V9-16, V09:XV-V9-25, V10:CVR-V10-14, V12:X-V12-4, V12:X-V12-11, V12:X-V12-16, V12:X-V12-15, V12:X-V12-17 (agreement.md lists each).
* **Edges (edges.md):** 60 UNDEFINED, 48 UNTESTED; 31 UNDEFINED combinations it owns.
* **Open findings routed here (69):**
  * VOL-V05-V06-RESTATEMENTS-001 [restatements; -] V05-RESTATE-1 → **state it once at base §1.1; every other place cites it**
  * VOL-V05-V06-RESTATEMENTS-002 [restatements; -] V05-RESTATE-5 → **state it once at base §1.1; every other place cites it**
  * VOL-V05-V06-RESTATEMENTS-003 [restatements; -] V05-RESTATE-2 → **state it once at V01 BCR-39 (item 110 (b)); every other place cites it**
  * VOL-V05-V06-RESTATEMENTS-004 [restatements; -] IslandRule.chance [0.6, 0.5, 0.35] and redrawPerYear 0.1 in the record comments → **state it once at base II.6 (4); every other place cites it**
  * VOL-V05-V06-RESTATEMENTS-005 [restatements; -] V05-RESTATE-5 → **state it once at base §4.1 (after BCR-V5-3); every other place cites it**
  * VOL-V05-V06-RESTATEMENTS-006 [restatements; -] V05-RESTATE-3 → **state it once at V05 §2.4 IslandRule.node.bonus; every other place cites it**
  * VOL-V05-V06-RESTATEMENTS-007 [restatements; -] V05-RESTATE-4 → **state it once at base §4.5 (after BCR-V5-15); every other place cites it**
  * VOL-V05-V06-RESTATEMENTS-008 [restatements; -] V05-RESTATE-4 → **state it once at base §4.5 (after BCR-V5-15); every other place cites it**
  * VOL-V05-V06-RESTATEMENTS-009 [restatements; -] V05-RESTATE-4 → **state it once at base §4.5 (after BCR-V5-15); every other place cites it**
  * VOL-V05-V06-RESTATEMENTS-010 [restatements; -] V05-RESTATE-7 → **state it once at V06 §2.8 and §2.12; every other place cites it**
  * VOL-V05-V06-RESTATEMENTS-011 [restatements; -] V05-RESTATE-7 → **state it once at file f item 575; base §2.7; V06 §2.12; every other place cites it**
  * VOL-V05-V06-RESTATEMENTS-012 [restatements; -] V05-RESTATE-6 → **state it once at base (on application of BCR-V5-1..30); every other place cites it**
  * V05-RESTATE-1 [restatement_findings; minor] The hook table's 'what it gives' column restates base values (e.g. RungProfile.layers.islands none at TOWN/villages, possible at CITY/METROPOLIS) in a table headed 'cited, never restated'. → **Keep the table as an index of citations (base section + name) and drop value-bearing restatements; the gate values live in §1.1.**
  * V05-RESTATE-2 [restatement_findings; minor] The row restates V01 BCR-39's recommended slot for item 110 (b) (viaducts inside S4, elevated roads and aqueducts at S6's end) in V05; the slot's home is V01's BCR (or the base once applied). → **Cite V01 BCR-39 (or the base section it lands in) without restating the slot.**
  * V05-RESTATE-3 [restatement_findings; minor] The magical-node bonus value 0.25 is stated in V05's IslandRule defaults (its home) and again as a literal in the text BCR-V5-17 writes into base II.6 rule (3) ('by the rule's node.bonus (0.25, clamped to 1)'); two homes for one … → **BCR-V5-17's base sentence names node.bonus without its value (value lives in islands.json, V05 §2.4).**
  * V05-RESTATE-4 [restatement_findings; minor] The model daylight sampler (nine equinox suns at hour angles −80..80°, one point per 32 m cell, 8 × reach cap for every source, point-major layout, digest) is written into base §4.5 by BCR-V5-15 and also stated in V5 §3.19 (1), J… → **V5 §3.19 (1) cites §4.5's sampler; keep only the strip's use of it.**
  * V05-RESTATE-5 [restatement_findings; minor] §3.1 restates the ground L1 writer order (S3…S7b, SKY, S8) and §3.2 (1) the rung values of RungProfile.layers.islands, both base facts after BCR-V5-3 / §1.1; one home each. → **Cite §4.1 and §1.1.**
  * V05-RESTATE-6 [restatement_findings; minor] The volume is 'written as if each were applied' and file f items (203, 204, 213, 252, 309, 383, 387 …) point to these BCR texts as the rows to apply; once the coherence pass applies them to the base, §10 restates base text wholes… → **After application replace §10 by a pointer list (BCR id → f item → base section).**
  * V05-RESTATE-7 [restatement_findings; minor] V05's lifecycle table carries full create/read/persist/regenerate/undo/migrate rows for Way.formerClass (V06's field, whose own row is V6 §2.12) and Enceinte.condition (file f item 575's field, whose row is V6 §2.12 and the base'… → **V5 §2.6 keeps only V05's writer cell for each field and cites V6 §2.12 (and item 575) for the rest.**
  * V05-DUP-1 [internal_duplications; minor] When a shadeBasis is written and when strips are computed (SKY's last step; S10a's start at a re-derivation starting after SKY and at or before S10a; each epoch's S6; Update shade now; never by an edit, SKY-F or clearance) is res… → **State the shade-evaluation schedule once (V5 §3.19 (6)) and cite it elsewhere.**
  * V05-DUP-2 [internal_duplications; minor] The landfall's covered kinds and their outcomes (walls breached with towers and any Gate kind, bridges ruined, ways to track with formerClass, raised spans and piers ruined, retaining walls decayed, deck plots tombstoned, quarry … → **One table in V5 §3.16 (kind → outcome → state row → undo), cited elsewhere.**
  * V05-DUP-3 [internal_duplications; minor] The wiring table (§1b) and the lifecycle table (§2.6) each give every new field's producer and readers; the two differ in detail (e.g. §1b's shadeBasis writers vs §2.6's), so a field's wiring has two homes inside the volume. → **Elegance candidate: one table per record field (producer, readers, persist, regenerate, undo, migrate, base hook); §1b keeps only the non-field pieces.**
  * V05-ICONF-1 [internal_conflicts; minor] ShadeBasis.by and IslandShadeStrip.evaluated.by enumerate 'generation', 'rederive', 'epoch', but V5 §4.2's Update shade now is a fourth writer of a shadeBasis (and of strips); the value it writes into `by` (and `epoch`) is undefi… → **Add a fourth value (e.g. 'update') to both enumerations, or state which of the three Update shade now writes and the epoch it records.** — *closed by:* conflict ruling V05-ICONF-1
  * V05-XCONF-1 [cross_part_conflicts; minor] V5 §4.4 ('The row's number … the integrator gives it the next free number'), J-V5.40, §1b's DR-SKY row, BCR-V5-12 and §13 item 9 still leave DR-SKY unnumbered, while the volume's own Integration note IN-V05-3 (J-VI.13) and docs/A… → **Write DR27 (alias DR-SKY) in §1b, §4.4, J-V5.40 (as decided), BCR-V5-12 and §13 item 9; drop the 'number left to the integrator' sentences.** — *closed by:* conflict ruling V05-XCONF-1
  * V05-EDGE-1 [edges_observed; major] A locked island (or locked state path) whose institution the dossier removes: (1b) re-reasons the island (rewrites reason and institution by conversion), while 'A locked island, or a locked state, areaHa or altitudeCm path, is he… → **Define the case (e.g. the institution leaves at once as truth; a lock on the island holds reason and claim empty with the fate 'held without its institution'; re-reasoning waits for the unlock) and add a T-V5-14 clause.** — *closed by:* edge catalogue (EI-V05-EDGE-1)
  * V05-EDGE-2 [edges_observed; major] A landfall whose footprint covers another island's ground landing plot or access foot is not defined: the covered set includes every L3 plot (so the landing house is demolished and the use vacated) but nothing states what happens… → **State the rule (e.g. the covered foot's access is re-landed by V5 §3.10 (4) in the fallIsland batch, else closed with F-SKY-ACCESS's ladder and the fate listed) and test it in T-V5-14.** — *closed by:* edge catalogue (EI-V05-EDGE-2)
  * V05-EDGE-3 [edges_observed; major] No cap limits hand-placed accesses per island (placeSkyAccess checks kind, magic and run only; accessCount.max binds generated accesses), yet §2.3b and §6 bound skyAccessObstacles at '≤ 9 entries per document' and price the solve… → **Either cap hand-placed accesses (e.g. accessCount.max per island, a bend beyond it) or restate the obstacle list's bound and budget in terms of the actual count.** — *closed by:* edge catalogue (EI-V05-EDGE-3)
  * V05-EDGE-4 [edges_observed; major] The sky.clearance step's lock case — a locked island or altitudeCm path keeps elevationCm, the floor may fail, the conflict 'clearance held by your lock' is listed and the island is exempt from the clearance invariant — has no te… → **Add a T-V5-31 clause: a locked island under a new caster lists the conflict, keeps elevationCm, and passes the invariant suite by its exemption.** — *closed by:* edge catalogue (EI-V05-EDGE-4)
  * V05-WGAP-1 [wiring_gaps; major] The offset-occlusion un-displacement of sky hit tests and tool points ('listed for volume 9's hit testing') has no end in V09: grep of V09 finds no un-displacement, offsetPerMetre or lifted-island hit rule (V09 carries the shade … → **V09's hit-testing section states the un-displacement (world point less elevation × offsetPerMetre) for sky hits and tool points, citing V05 §4.2; or the base §8.4/§9 owns it.** — *closed by:* wiring routing (V05-WGAP-1)
  * V05-WGAP-2 [wiring_gaps; major] The bend lines '<island> keeps room for its <institution>; shrunk to <area> ha' and '… the rim stops here' (J-VI.4) have no message key in V09 and no clerk bend row in V10 (grep: 0 hits in V09, V10, V11); §13 item 28 remains open. → **Add both lines to V09's bend.* message rows and V10's bend category (J-VI.4), citing V05 §4.2.** — *closed by:* wiring routing (accounted in wiring.md)
  * V05-WGAP-3 [wiring_gaps; minor] Declared values and fields without a named reader: IslandInstitution.near admits 'richest' but V5 §3.7 (3)'s purpose term defines only plaza and precinct for institutions (richest is the prosperity island's rule); IslandShadeStri… → **Name each reader (or drop 'richest' from the enumeration and cells/evaluated if unread), per principle (7).** — *closed by:* wiring routing (V05-WGAP-3)
  * V05-MISSING-1 [missing_parts; major] g item 111 (applied by every unit it names) names V05's part — 'an island's own water, unchanged' — but V05 carries no text on item 111 (grep: no oasis, water pull or item 111): nothing states that the oasis option, the arid wate… → **Add to V05 (at V5 §3.8 (4) and §3.11) the item-111 part: the water pull and oasis rules read the ground arena only; an island's prosperity takes no water term beyond its own dist.water; islands are unchanged by item 111 (with a no-op test clause).**
  * V05-MISSING-2 [missing_parts; minor] docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md decides V05 Q1 ('the underground before the sky': yes, J122) and J122 requires each question to be marked answered with its decision; V05 §11 still reads as an open question with a rec… → **Mark V5 §11 Q1 answered: 'underground first, then M6-sky (J122)'; §8's milestone line cites the combined order (§16).**
  * V05-TERM-1 [terminology; minor] The volume's own pointer convention ('another volume's section is written V0n §n') is broken 60 times by single-digit prefixes (V1, V2, V4, V6) and V01's internal label form 'V1-3.10.3'; and the volume names itself 'V5 §n' while … → **Normalise every cross-volume pointer to 'V0n §n' (V01's own 'V1-x' labels to 'V01 §x') and the self-pointer to the set's form.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V05-TERM-2 [terminology; minor] One word names two concepts: 'hand-over' / SkyHandover is the derived view V01's unit runner reads (V5 §2.3, 'the hand-over to volume 1's unit runner'), while 'hand-over' / IslandInstitution.handover is the passing of an S3 reser… → **Rename one (e.g. the unit-run view 'SkyUnitInput' / 'the island's unit inputs'), keep 'handover' for the reservation passing, one spelling.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V05-DEFER-1 [deferral_wording; minor] 'a generation stage after SKY if the integrator places one there' leaves open whether any generation stage lays raised parts after SKY (item 110 (b)'s slot is V01 BCR-39: S4 and S6's end, all before SKY); the caller list is condi… → **State the callers as ruled: the epoch's raised-way pass and T4's raised dry run (no generation stage after SKY lays raised parts, per the slot); or name the stage.**
  * V05-DEFER-2 [deferral_wording; minor] 'This volume relies on the slot volume 1's BCR-39 recommends … Whatever stage the integrator finally picks, the design holds' treats the raised-way generation slot as an unmade choice; the slot is a ruled design item (V01 BCR-39 … → **Cite the slot as ruled (its canonical home) and drop 'whatever stage the integrator finally picks'.**
  * V05-DEFER-3 [deferral_wording; minor] 'What remains is deliberately left to others or to measurement, per the owner's "if we need to fix anything [we] just do it down the line"' is deferral wording against the no-defer rule; item 1's calibrations are milestone exits … → **Delete the intro sentence; state the ⟨P0⟩ calibrations as §8's P0 exits only.**
  * V05-NARR-1 [narration; minor] Nine PENDING FABLE REVIEW banner lines and a 78-line PROGRESS ledger narrate the volume's revision history (rounds R, R2, RC1-RC6, seam ids); principle (8) keeps one marker line per volume and principle (5) moves narration to the… → **Keep one marker line; delete the PROGRESS ledger (validation records keep it).**
  * V05-NARR-2 [narration; minor] Parenthesis narrates the superseded design ('The earlier disc-sized side, 2.6 × the radius … was too small … 568 m against a 618-874 m CITY spindle, scratchpad/volumes/critique-v5/receipts.out') — history, not design; also cites … → **Delete the parenthesis; the validation records keep it.**
  * V05-NARR-3 [narration; minor] Decision rows carry revision narration ('revised with C5-21, C5-25', 'narrowed with C5-32', 'the row the 23:14 note asked for', 'the reconciliation's seam ST-04 deleted the first text's release', '*Reconciliation round 3's contin… → **Strip revision provenance from the decision rows (the validation records keep it); keep 'chose X over Y because Z'.**
  * V05-NARR-4 [narration; minor] §12 beyond its first two paragraphs is lane history: 'The revision (lane volumes/revise-V5 …)', 'The second revision …', 'Reconciliation round 1 … round 6' CONFIRMED paragraphs name lanes, md5s, landing times and seam ids; the cu… → **Keep one CONFIRMED paragraph (base citations checked) and one PLAUSIBLE list; move the rest to the validation records.**
  * V05-NARR-5 [narration; minor] The integration note and six reconciliation-round tables restate what changed, where, with scratchpad receipts; every change is already in the body. IN-V05-1..5 carry rulings (bends, one suppression mechanism, DR27, sheer as a cl… → **Fold IN-V05-1..5's rulings into the body sections they govern (DR27 into §4.4 etc.) and delete the notes and round tables (validation records keep them).**
  * V05-NARR-6 [narration; minor] Critique and seam ids ('seam SLR3-02', 'C5-47', '(SL-01; J-V5.70)') are sprinkled through normative text as provenance of how each sentence arrived; principle (5) removes narration (the J rows keep the reasoned decision). → **Strip critique/seam ids from normative text; keep J ids.**
  * V05-BREF-1.r01 [broken_references; -] §3.1 has no items (3)-(4); the bends it means are V5 §3.2 (3)-(4) → **correct the pointer V5 §3.1 (3)–(4) at Integration note IN-V05-1: §3.1 has no items (3)-(4); the bends it means are V5 §3.2 (3)-(4)**
  * V05-BREF-2.r02 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/critique-v5/receipts.out at V05 (2 occurrences): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r03 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5/V05-pre-reconcile.md at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r04 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5/p/*.txt at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r05 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5r2/V05-pre-r2.md at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r06 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5r2/rep1.py at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r07 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5r3/V05-pre-r3.md at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r08 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5r3/rep1.py at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r09 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5r3b/V05-pre-r3b.md at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r10 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5r3b/rep.py at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r11 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5r4/V05-pre-r4.md at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r12 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5r4/rep0.py at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r13 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5r5/V05-pre-r5.md at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r14 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5r5/V06-pre.md at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r15 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5r5/rep1.py at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r16 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5r6/V05-pre-r6.md at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r17 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5r6/V06-pre-r6b.md at V05 (2 occurrences): session scratch file outside the project; not a design reference**
  * V05-BREF-2.r18 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV5r6/rep_v05.py at V05 (1 occurrence): session scratch file outside the project; not a design reference**
  * V05-BREF-1 [broken_reference_findings; minor] IN-V05-1 lists 'V5 §3.1 (3)–(4)' among the places edited to bends; §3.1 has no items (3)-(4) — the fourth-island and count bends are V5 §3.2 (3)-(4). → **Read 'V5 §3.2 (3)–(4)'.**
  * V05-BREF-2 [broken_reference_findings; minor] The text cites files that do not exist under the project: scratchpad/volumes/critique-v5/receipts.out, scratchpad/volumes/rcV5*/… (rep*.py, V05-pre-*.md, V06-pre-*.md) — session scratch, outside the standalone set. → **Remove the scratch-file citations (they are lane receipts, not design references).**
  * V05:IN-V05-1 [integration-note; minor] * **IN-V05-1 (J-VI.4; item 101 R2).** Every refusal of this volume except the dossier-owned one (J-V5.19: a bound dossier whose `site.magic` resolves `none`) is a **bend**: V5 §3.1 (3)–(4), §3.22 (3) (d), §4.1's table rows T3 and… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V05:IN-V05-2 [integration-note; minor] * **IN-V05-2 (J-VI.14).** An island's removed slot and a deleted generated access's ordinal (`removedSlots`, `removedAccesses`) are this volume's form of the one suppression mechanism the base carries for generated content (BCR-V… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V05:IN-V05-3 [integration-note; minor] * **IN-V05-3 (J-VI.13).** DR-SKY is numbered **DR27** by the coherence pass (file f). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V05:IN-V05-4 [integration-note; minor] * **IN-V05-4 (J-VI.3).** The island rim's barrier kind `sheer` is one of the six closure-arc kinds every volume uses. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V05:IN-V05-5 [integration-note; minor] * **IN-V05-5 (J-VI.17).** §13's cross-lane items are dispositioned in `_integrate.md` §2.3: item 10 (volume 6's `sky.clearance`, `reclearIsland`, `skyAccessObstacles`) is written into volume 6 (IN-V06-3); item 13's register listi… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**

### V06

* **Size:** 106357 words; the goal band after: 63814–79768 words; narration ranges alone 12767 words; 14 restatements to references; 21 BCR blocks to pointers.
* **STATE:** 455 facts (canon.json → units.V06.state); 8 index rows.
* **HISTORY OUT:** V06-0497.
* **REFERENCE (14):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | V06-0099 | V11 V11 §3.18 | V11-0429 (near) |
  | V06-0100 | V09 V09 §9 | V09-0883 (near) |
  | V06-0110 | model §2.7 | — (section) |
  | V06-0111 | pipeline §4.11 | PIPELINE-0476 (near) |
  | V06-0112 | pipeline §4.11 | — (section) |
  | V06-0113 | pipeline §4.11 | — (section) |
  | V06-0114 | model §2.4 | MODEL-0188 (near) |
  | V06-0115 | model §2.7 | — (section) |
  | V06-0129 | V03 V03 §3.7.2 | V03-0234 (near) |
  | V06-0150 | V04 V04 §3.5.4 | V04-0131 (fact) |
  | V06-0279 | V11 V11 §3.24.2 | V11-0472 (near) |
  | V06-0307 | V10 V10 §3.9 | V10-0316 (near) |
  | V06-0345 | V12 V12 §3.11 | V12-0227 (fact) |
  | V06-0346 | V12 V12 §2.1 | V12-0067 (fact) |

* **Its §10 requests → one-line pointers to the applied f items (28):** BCR-V6-1 → item 317; BCR-V6-2 → item 321; BCR-V6-3 → item 254; BCR-V6-4 → item 429; BCR-V6-5 → item 209; BCR-V6-6 → item 206; BCR-V6-7 → item 264; BCR-V6-8 → item 342; BCR-V6-9 → item 343; BCR-V6-10 → item 443; BCR-V6-11 → item 458; BCR-V6-12 → item 388; BCR-V6-13 → item 275; BCR-V6-14 → item 339; BCR-V6-15 → item 409; BCR-V6-16 → item 550; BCR-V6-17 → item 335; BCR-V6-18 → item 336; BCR-V6-19 → item 293; BCR-V6-20 → item 265; BCR-V6-21 → item 266; BCR-V6-22 → item 478; BCR-V6-23 → item 479; BCR-V6-24 → item 260; BCR-V6-25 → item 290; BCR-V6-26 → item 291; BCR-V6-27 → item 573; BCR-V6-28 → item 574.
* **BCR blocks → pointers (21):** BCR-V6-1 → item 317; BCR-V6-2 → item 321; BCR-V6-3 → item 254; BCR-V6-5 → item 209; BCR-V6-6 → item 206; BCR-V6-7 → item 264; BCR-V6-8 → item 342; BCR-V6-9 → item 343; BCR-V6-10 → item 443; BCR-V6-11 → item 458; BCR-V6-12 → item 388; BCR-V6-13 → item 275; BCR-V6-15 → item 409; BCR-V6-17 → item 335; BCR-V6-19 → item 293; BCR-V6-21 → item 266; BCR-V6-23 → item 479; BCR-V6-20 → item 265; BCR-V6-26 → item 291; BCR-V6-12 → item 388; BCR-V6-28 → item 574.
* **Terms to replace:** G-lot (lot, lot-driven, lot-derived, BuildingInput.lot → plot (field BuildingInput.plot); 1 hits, first lines [3518]); G-cite (V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 … → Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y; 1027 hits, first lines [14, 95, 265, 268, 271, 274]); G-standalone (standalone hood(s), lone neighbourhood document, standalone neighbourhood → standalone neighbourhood document; 6 hits, first lines [2912, 3149, 3335, 3611, 3615, 4159]); G-unitinput (SkyHandover, hand-over (the unit-run view) → SkyUnitInput (the island's unit inputs); `handover` keeps only the reservation passing (IslandInstitution.handover); 1 hits, first lines [2581]); G-hollow (retired way → hollow way (the ops keep their names); 19 hits, first lines [78, 1290, 1299, 1624, 1632, 1634]); G-strike (decline pool, decline lottery, the lottery → strike pool (defined once in V06 §3.5.2); 16 hits, first lines [329, 1252, 1258, 1488, 1668, 2082]); G-dwell (D, D_b, D_v, D_o for dwellings → N (N_b, N_v = N − N_o); D(x) is item 102's daylight share everywhere; 1 hits, first lines [1233]); G-DR (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8 → DR26–DR35 (ID-DR); 16 hits, first lines [389, 412, 463, 500, 511, 671]); G-newrandom (scoped re-roll, Try again (in prose), Rebuild … as generated → New random (§7.1); 'Try again' is only its catalogue label; 'reroll' only for rerollLayer; 1 hits, first lines [3370]); G-forkat (Change from here → Open a copy from here (a forkAt); 3 hits, first lines [3099, 4200, 4331]).
* **Conflicts it resolves (9):** V06-ICONF-1, V06-ICONF-2, V06-ICONF-3, V06-ICONF-4, V06-XCONF-1, V06-XCONF-2, V06-AGREE-1, CANON-C02, CANON-C03.
* **File f items that concern it (cite as base text):** 202, 206, 209, 226, 244, 245, 246, 252, 254, 260, 263, 264, 265, 266, 268, 270, 274, 275, 290, 291, 293, 317, 318, 319, 321, 322, 335, 336, 339, 342, 343, 347, 370, 388, 409, 429, 443, 458, 478, 479, 550, 568, 573, 574, 575, 581.
* **File g parts it writes or applies:**
  * item 111: failing springs and oases over epochs (the pull weakens, the quarters around may decline)
  * item 113: the replay engine at generation: coarse epochs, the event-to-epoch mapping, the generation budget, lazy detail, the replay record; J-V6.4 and §1.3's bullet retired (V06-XCONF-1)
* **Wiring gaps it closes:** W-DOS-02, W-DOS-09, W-DOS-10d, V06-WGAP-1a, V06-WGAP-1b, V06-WGAP-2.
* **Elegance rulings it applies:** E-01, E-02, E-24, E-39.
* **Id rulings it applies:** ID-BCR, ID-WX, ID-DR.
* **Owner questions to mark answered:** Q1 — J122: (a) right after M4.
* **Cohesion checks:** see *Cohesion checks* (every volume).
* **Its own Fix list (§13) and hand-off rows — every item fixed in the text (or marked for the adjudicator with its reason); §13 keeps no open item:** V06-0498, V06-0499.
* **Hand-offs to close here (19):** V02:X8, V07:FL-3, V08:X3, V08:X11, V08:X21, V08:X24, V09:XV-V9-23, V09:XV-V9-28, V10:CVR-V10-5, V10:CVR-V10-11, V11:X-V11-11, V11:X-V11-15, V11:X-V11-16, V12:X-V12-4, V12:X-V12-10, V12:X-V12-11, V12:X-V12-15, V12:X-V12-17, V12:X-V12-19 (agreement.md lists each).
* **Edges (edges.md):** 48 UNDEFINED, 64 UNTESTED; 42 UNDEFINED combinations it owns.
* **Open findings routed here (51):**
  * VOL-V05-V06-RESTATEMENTS-013 [restatements; -] V06-RESTATE-1 → **state it once at V05 §6 (resize / rim reshape rows); every other place cites it**
  * V06-RESTATE-1 [restatement_findings; minor] V06 quotes V05 §6's 'a resize, a rim reshape' row verbatim ('as those rows read on 2026-09-29 after volume 5's round-6 lane') and re-derives its figures; the row's canonical home is V05 §6, so the quotation is a restatement that … → **Cite V05 §6's rows by name with their bounds as inputs to the century sum; drop the verbatim quotation and the round history.**
  * V06-ICONF-1 [internal_conflicts; minor] Item 101 R2 / J-VI.4 make every refusal except a dossier fact or a lock a bend. V06's no-stretch repairWall on a ring with nothing to lift is 'refused ("this wall is in use")' — neither a dossier fact nor a lock (advance's refusa… → **State repairWall's no-neglect case as a no-op report (nothing changes, the line shown) or a J-VI.4 bend.** — *closed by:* conflict ruling V06-ICONF-1
  * V06-ICONF-2 [internal_conflicts; major] J-V6.92 records the choice as 'the water-system record a chance factor at CITY and METROPOLIS', while the body rules the opposite: 'the dossier's water-system record makes the need count as met and never scales the chance (V11's … → **Reword J-V6.92 to the ruled form: the record makes the need count as met, raises the aqueduct cap and total by capPerSizeMember per SIZE member, binds the terminal, never scales the chance.** — *closed by:* conflict ruling V06-ICONF-2
  * V06-ICONF-3 [internal_conflicts; minor] BCR-V6-9's EpochInputs.advance field list is {group, index, of, trajectory?}, while V6 §2.3's provenance and §2.12's lifecycle row carry stoppedAt? (on a stopped group's last epoch, the count actually folded) and T-V6-23 tests 'S… → **Add stoppedAt?: number to BCR-V6-9's advance field (and to the f item applying it).** — *closed by:* conflict ruling V06-ICONF-3
  * V06-ICONF-4 [internal_conflicts; minor] IN-V06-6 (J-VI.12) rules that the disabled-tool offer uses V09's label 'Open a copy from here', 'superseding any sentence that reads otherwise', but V6 §5.1 still reads 'every disabled tool offers the way forward: "Change from he… → **Write V09's label ('Open a copy from here') in V6 §5.1 and drop the note.** — *closed by:* conflict ruling V06-ICONF-4
  * V06-XCONF-1 [cross_part_conflicts; major] V06 rules pre-creation history out of scope ('At creation no epoch runs; the dossier's past reaches the map through HistoryHint … J-V6.4'), while the owner's g item 113 (a) orders history-first generation: 'the evolution engine r… → **Retire J-V6.4 and §1.3's bullet; V06 adds item 113's part at build depth (see the F-MISSING finding).** — *closed by:* conflict ruling V06-XCONF-1
  * V06-XCONF-2 [cross_part_conflicts; minor] The dossier trace names the derivation rows by working aliases and leaves numbers open: 'DR-V6.1 (BCR-V6-12; the coherence pass numbers it)' and 'DR-V8.1 (V08)'; file f item 383 (J-VI.13) fixes DR28 = V06's DR-V6.1 = V08's DR-V8.… → **Write DR28 (alias DR-V6.1 = DR-V8.6) and DR29 (DR-V8.1) wherever V06 names them.** — *closed by:* conflict ruling V06-XCONF-2
  * V06-AGREE-1 [cross_part_conflicts; minor] V06 states the delete dry-run lines as 'The city will not rebuild this aqueduct; undo brings it back', 'The town will not rebuild this terrace wall', 'No house will be built on this spot of the bridge'; V09's one message key info… → **V06 cites V09's info.remove.holds key (with its {kind} slot) instead of stating its own lines; if a deck-plot wording is needed, V09 adds it as a variant.** — *closed by:* conflict ruling V06-AGREE-1
  * V06-ELEG-1 [elegance_candidates; minor] The set carries two record forms of the one suppression of removed generated content: V06's LifecycleEvent.detail.suppress on the delete's event (raised ways, harbour chains, quay walls, retaining walls, deck plots) and V05's liv… → **Canon ruling: either one suppression record with a slot-hold extension, or a stated reason the island form stays separate; equivalence list per principle (9).** — *closed by:* elegance ruling (E-list)
  * V06-EDGE-1 [edges_observed; major] Degenerate advance inputs have no defined outcome: a spanYears below half a week rounds spanYears × 52 to 0, so W_n = W0 and f_i = (W_i − W0) ÷ (W_n − W0) is 0 ÷ 0; cadenceWeeks ≤ 0 (the field is a free number) makes n = ⌈spanYea… → **Define each (e.g. span rounded up to one week; cadence floored at 1 week, a bend with its line; points sorted by week with duplicates taking the last; rate floored so the population stays ≥ 0 before the clamp) and add T-V6-23 clauses.** — *closed by:* edge catalogue (EI-V06-EDGE-1)
  * V06-EDGE-2 [edges_observed; major] An advance group undoes 'by restoring the checkpoint taken before the group's first epoch … in an unshared document'; the outcome is undefined (and untested) when the document was saved and reloaded after the group (checkpoints a… → **State the rule after a reload (e.g. undo by the per-epoch record of the latest epoch only, or by re-folding the prefix, with its cost) and in a shared document (e.g. a new compensating event, never truncation), and add T-V6-23 clauses.** — *closed by:* edge catalogue (EI-V06-EDGE-2)
  * V06-WGAP-1 [wiring_gaps; major] The bend line 'a neighbourhood alone has no history yet — open it in its town to advance time' (item 101 R2) has no message key in V09 and no clerk row in V10 (grep: 0 hits for 'no history yet', 'lone neighbourhood' or 'hood docu… → **Add the line to V09's bend.* rows and V10's bend category, citing V6 §4.1; mark X30 met.** — *closed by:* wiring routing (accounted in wiring.md)
  * V06-WGAP-2 [wiring_gaps; minor] Of 49 hand-offs, 15 are marked met, closed, answered, landed or applied; the other ~34 (X1-X9, X11-X17, X19, X21-X23, X25, X27-X34, X36, X43) carry no closure mark, so the table reads as open items (the zero bar: no fix list keep… → **The seam checkers verify each X row at its destination; the Assemble seat deletes closed rows and keeps none open.** — *closed by:* wiring routing (V06-WGAP-2)
  * V06-MISSING-1 [missing_parts; minor] docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md decides V06 Q1 ('the evolution engine right after M4': (a) yes; J122) and records the combined order (after M4, four streams side by side: M5, V-M, M6-E, the plan rung's P0-P1); V06 §8… → **Mark V6 §11 Q1 answered ('(a) right after M4', J122); §8 states M6-E's slot in the combined order (§16, INDEX.md).**
  * V06-MISSING-2 [missing_parts; major] g item 111 (applied by every unit it names) names V06's part — 'failing springs and oases over epochs' ('Over epochs a spring or oasis that fails weakens its pull and the quarters around it may decline') — but V06 carries no text… → **Add to V06 at build depth: the water pull's source as an epoch input (a spring or oasis failing by siltReach/drought rows), its weight falling with the source's yield, the prosperity water term and growth pull re-read each epoch, decline of quarters around a failed source through the ordinary ladde…**
  * V06-MISSING-3 [missing_parts; major] g item 113 (applied by every unit it names; J124) names V06's part — 'the replay engine at generation, coarse epochs, the event-to-epoch mapping' — history-first generation (the peak by high-water or the effective symbolic peak, … → **Write item 113's V06 part at build depth: the generation-time replay path (inputs from V08's history, coarse-epoch cadence as a table value, the event-to-epoch mapping rows with V11, the budget, determinism keys, the report and clerk story, lifecycle rows, tests and the no-op pin with replay off).**
  * V06-TERM-1 [terminology; minor] V06 names itself 'V6 §n' (the base and V05's base requests write 'V06 §n'), points to other volumes with single-digit prefixes ('V4 §3.10', 'V5 §3.16', 'V9 §4.20.3', 'V2 §3.16') beside the 'V0n §n' form it also uses, and cites it… → **Normalise to the set's one pointer form ('V06 §n' for this volume, 'V0n §n' for others, bare § only for the base) and prefix §2.2's table references.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V06-TERM-2 [terminology; minor] One concept, several names: a way retireWay/effaceWay set abandoned or decayed is 'a retired way' in V06's siting text and 'V07's hollow way' elsewhere; the per-district decline draw is 'the strike pool', 'the decline pool', 'the… → **One term each (e.g. 'hollow way' as V07 names it; 'strike pool' defined once in V6 §3.5.2) with the others replaced.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V06-DEFER-1 [deferral_wording; minor] 'The gate lifts when volume 6 builds hood epochs (§13's fix list)' leaves an unbuilt capability parked on a fix list with no milestone or ruling; a no-defer violation unless hood epochs are a roadmap-staged subject with a named m… → **Either state the hood-document gate as the ruled behaviour (no epochs on a lone hood document) with no promise, or stage hood epochs as a roadmap item with its milestone in §16/INDEX.md.**
  * V06-NARR-1 [narration; minor] Ten PENDING/REVISED/RECONCILED banner blocks, eight reconciliation and revision ledgers (K1…S5) and a 30-line 'Reading record' narrate the volume's lane history; principle (8) keeps one marker line, principle (5) moves narration … → **Keep one marker line; delete the ledgers, PROGRESS and reading record.**
  * V06-NARR-2 [narration; minor] Decision rows carry revision narration ('**revised**', '*Amended (reconcile-V06-r3's continuation, SCC-R2C-11):*', 'as reconciliation round 3 amends it', 'a recorded variation of C6-41 (1)', 'round 5: 25 / 85 / 185 s, from round … → **State each decision in its final form ('chose X over Y because Z'); move revision history to the validation records.**
  * V06-NARR-3 [narration; minor] Q1 narrates the pricing history ('it was 17-23.5 before … the first text's 17.5 low total was a sum error … 22.25-31 before … 24.25-33.75 before … 25-35.25 before its second round'); BCR-V6-22 narrates its parenthesis's round his… → **State the current price and bound only; the history belongs to the validation records.**
  * V06-NARR-4 [narration; minor] Lane history — which round read what, md5s, landing times, scratchpad receipts, doc_checks counts, per-issue change tables and 'this note governs' supersession chains (e.g. round 3's TT-05 row still says 'with its towers' and gat… → **Keep §12's two current paragraphs (CONFIRMED base citations; PLAUSIBLE until E0/E7) and §13's open hand-offs only; fold IN-V06-1..7's rulings into the body; delete the round notes (validation records keep them).**
  * V06-NARR-5 [narration; minor] Critique and seam ids ('(ST-13)', 'SCC-38, -55, -57', 'TU-05', 'C6-41 (1)') are sprinkled through normative text as provenance of how each sentence arrived; principle (5) removes narration (the J rows keep the reasoned decision). → **Strip critique/seam ids from normative text; keep J ids.**
  * V06-BREF-2.r19 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV6/V06-pre-reconcile.md at V06 (1 occurrence): session scratch file outside the project; not a design reference**
  * V06-BREF-2.r20 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV6r2/V06-pre-reconcile-r2.md at V06 (2 occurrences): session scratch file outside the project; not a design reference**
  * V06-BREF-2.r21 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV6r3/V06-pre-reconcile-r3.md at V06 (2 occurrences): session scratch file outside the project; not a design reference**
  * V06-BREF-2.r22 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV6r3c/V06-pre-r3c.md at V06 (1 occurrence): session scratch file outside the project; not a design reference**
  * V06-BREF-2.r23 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV6r4/V06-pre-reconcile-r4.md at V06 (2 occurrences): session scratch file outside the project; not a design reference**
  * V06-BREF-2.r24 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV6r4c/V06-pre-r4c.md at V06 (1 occurrence): session scratch file outside the project; not a design reference**
  * V06-BREF-2.r25 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV6r5/V06-pre-r5.md at V06 (2 occurrences): session scratch file outside the project; not a design reference**
  * V06-BREF-2.r26 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV6r6/V06-pre-r6.md at V06 (2 occurrences): session scratch file outside the project; not a design reference**
  * V06-BREF-2.r27 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV7r5/V06-pre.md at V06 (1 occurrence): session scratch file outside the project; not a design reference**
  * V06-BREF-2.r28 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rcV7r6/V06-pre-r6.md at V06 (1 occurrence): session scratch file outside the project; not a design reference**
  * V06-BREF-2.r29 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/revise-v6b/V06-pre-revision-110.md at V06 (1 occurrence): session scratch file outside the project; not a design reference**
  * V06-BREF-2.r30 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rv6/V06-pre-revision.md at V06 (1 occurrence): session scratch file outside the project; not a design reference**
  * V06-BREF-2.r31 [broken_references; -] session scratch file outside the project; not a design reference → **correct the pointer scratchpad/volumes/rv6/bcrcheck.out at V06 (1 occurrence): session scratch file outside the project; not a design reference**
  * V06-BREF-1.r32 [broken_references; -] derivation row without an id (dossier trace needs a named DR row) → **correct the pointer the coherence pass's row for item 105 (i) at V06 §1b dossier trace, line 505: derivation row without an id (dossier trace needs a named DR row)**
  * V06-BREF-1.r33 [broken_references; -] derivation row without an id (dossier trace needs a named DR row) → **correct the pointer the coherence pass's row for item 109 (k) at V06 §1b dossier trace, line 507: derivation row without an id (dossier trace needs a named DR row)**
  * V06-BREF-1.r34 [broken_references; -] derivation row without an id (dossier trace needs a named DR row) → **correct the pointer the coherence pass's row for item 109 (b) at V06 §1b dossier trace, line 508: derivation row without an id (dossier trace needs a named DR row)**
  * V06-BREF-1.r35 [broken_references; -] derivation row without an id (dossier trace needs a named DR row) → **correct the pointer the coherence pass's row for item 110 (b) at V06 §1b dossier trace, lines 512, 513: derivation row without an id (dossier trace needs a named DR row)**
  * V06-BREF-1 [broken_reference_findings; minor] Four dossier-trace rows cite derivation rows that have no id ('the coherence pass's row for item X'); the dossier-trace principle (item 20 (h)) needs each derived fact traced to a named derivation row. → **Name the §7.7 row ids the coherence pass assigns for items 105 (i), 108, 109 (b), 109 (k) and 110 (b), or the rows where those items' mappings live.**
  * V06-BREF-2 [broken_reference_findings; minor] The text cites session scratch files that do not exist under the project (pre-revision copies, receipts); lane receipts are not design references and break the standalone set. → **Remove the scratch-file citations.**
  * V06:IN-V06-1 [integration-note; minor] * **IN-V06-1 (J-VI.17 H34).** §3's always-crypt target reads volume 11's `crypt: 'always'` column (edited in place; it read a boolean). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V06:IN-V06-2 [integration-note; minor] * **IN-V06-2 (J-VI.5; volume 2's X23).** At an epoch: `rebaseStack` runs on every terrain change that reaches a stepped building (its ground wings' samples, a deck's surface, a crypt lift), before the casters are rasterised; a st… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V06:IN-V06-3 [integration-note; minor] * **IN-V06-3 (J-VI.17 H20; volume 5's §13 item 10).** The participant `sky.clearance` is registered at `afterGrowth`, order 50, and may return `reclearIsland` (BCR-V5-28); it receives `EpochScope.raised` and `.levelled`; the rais… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V06:IN-V06-4 [integration-note; minor] * **IN-V06-4 (J-VI.17 H19; volume 3).** Tiers added or removed over epochs re-match stored plans by wing-relative storey (BCR-V3-29); in an epoch that levels a terrace, raises a retaining wall or adds a raised way, an unstored pl… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V06:IN-V06-5 [integration-note; minor] * **IN-V06-5 (J-VI.17 H21; X-V12-11).** T-V6-65's "off" reads volume 11's switch table: "every `deck.offer` 0, `terrace.enabled` false" (for "the `deck` budget 0, the terrace thresholds off"). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V06:IN-V06-6 [integration-note; minor] * **IN-V06-6 (J-VI.12).** §4.1's disabled-tool offer "Change from here: make a copy at year N" uses volume 9's label **"Open a copy from here"** (a `forkAt`). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V06:IN-V06-7 [integration-note; minor] * **IN-V06-7 (J-VI.2, J-VI.14, J-VI.13).** The raised-way record's `reason: RaisedReasonKey` is this volume's (the single source); readers show its derived word. Islands and accesses keep volume 5's record form (`SkyIsland.remove… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**

### V07

* **Size:** 104422 words; the goal band after: 62653–78316 words; narration ranges alone 14533 words; 10 restatements to references; 7 BCR blocks to pointers.
* **STATE:** 309 facts (canon.json → units.V07.state).
* **REFERENCE (10):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | V07-0008 | scope §17.1 | — (section) |
  | V07-0011 | scope §1.1 | SCOPE-0651 (fact) |
  | V07-0012 | model §2.7 | — (section) |
  | V07-0096 | owner (the editor finds the section) | — (section) |
  | V07-0100 | kernel §3.1 | — (section) |
  | V07-0101 | model §2.9 | — (section) |
  | V07-0120 | scope §17.1 | — (section) |
  | V07-0123 | model §2.7 | MODEL-0200 (near) |
  | V07-0168 | model §2.3 | MODEL-0454 (near) |
  | V07-0273 | determinism §7.1 | DETERMINISM-0244 (near) |

* **Its §10 requests → one-line pointers to the applied f items (42):** BCR-V7-1 → item 201; BCR-V7-2 → item 287; BCR-V7-3 → item 267; BCR-V7-4 → item 214; BCR-V7-5 → item 215; BCR-V7-6 → item 255; BCR-V7-7 → item 314; BCR-V7-8 → item 315; BCR-V7-9 → item 418; BCR-V7-10 → item 505; BCR-V7-11 → item 202; BCR-V7-11 → item 326; BCR-V7-12 → item 276; BCR-V7-13 → item 377; BCR-V7-14 → item 378; BCR-V7-15 → item 344; BCR-V7-16 → item 527; BCR-V7-17 → item 202; BCR-V7-17 → item 528; BCR-V7-18 → item 202; BCR-V7-18 → item 317; BCR-V7-19 → item 357; BCR-V7-20 → item 312; BCR-V7-21 → item 430; BCR-V7-22 → item 209; BCR-V7-22 → item 431; BCR-V7-23 → item 495; BCR-V7-24 → item 310; BCR-V7-25 → item 292; BCR-V7-26 → item 322; BCR-V7-27 → item 565; BCR-V7-28 → item 316; BCR-V7-29 → item 283; BCR-V7-30 → item 279; BCR-V7-31 → item 424; BCR-V7-32 → item 268; BCR-V7-33 → item 290; BCR-V7-34 → item 506; BCR-V7-35 → item 290; BCR-V7-36 → item 576; BCR-V7-37 → item 577; BCR-V7-38 → item 579.
* **BCR blocks → pointers (7):** BCR-V7-1 → item 201; BCR-V7-1 → item 201; BCR-V6-1 → item 317; BCR-V7-19 → item 357; BCR-V7-25 → item 292; BCR-V6-26 → item 291; BCR-V7-36 → item 576.
* **Terms to replace:** G-firstmap (first paint → first map; 9 hits, first lines [1315, 2866, 2939, 3186, 3256, 3457]); G-cite (V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 … → Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y; 144 hits, first lines [307, 314, 339, 348, 349, 358]); G-dwell (D, D_b, D_v, D_o for dwellings → N (N_b, N_v = N − N_o); D(x) is item 102's daylight share everywhere; 30 hits, first lines [428, 1430, 1436, 1437, 1438, 1481]); G-DR (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8 → DR26–DR35 (ID-DR); 2 hits, first lines [448, 4003]); G-digest (nearbyResources[], site.terrainType → site.deposits; site.terrain; 1 hits, first lines [4375]); G-portpath (PortRungPath, registerRungPath, its own port path → ProductDecl in StrategyRegistry.products (file f item 202); 1 hits, first lines [3968]); G-floorvault (floor vaults (wet ground) → no crypt; ledger slabs in the chancel floor (V03 §3.7.4); 2 hits, first lines [295, 454]).
* **Conflicts it resolves (13):** DIC-06, MC-11, V02-ICONF-1, V07-ICONF-1, V07-ICONF-2, V07-ICONF-3, V07-ICONF-4, V07-ICONF-5, V07-XCONF-1, V07-XCONF-2, CANON-C01, CANON-C03, CANON-C04.
* **File f items that concern it (cite as base text):** 201, 202, 209, 214, 215, 244, 245, 255, 267, 268, 276, 279, 283, 287, 290, 292, 310, 312, 314, 315, 316, 317, 322, 326, 344, 357, 377, 378, 413, 418, 424, 430, 431, 436, 495, 505, 506, 516, 527, 528, 565, 568, 576, 577, 579.
* **File g parts it writes or applies:**
  * item 111: the village crowding map's water pull and oasis villages
  * item 113: a village over a former city (the remnants at village rungs) and refounding at village rungs
* **Wiring gaps it closes:** W-IF-02, W-FLD-08, V07-WGAP-1, V07-WGAP-2.
* **Elegance rulings it applies:** E-01, E-24, E-30, E-31, E-38.
* **Id rulings it applies:** ID-BCR, ID-TOOL, ID-WX, ID-DR, ID-DUPDEF.
* **Owner questions to mark answered:** Q1 — J122: (a) right after M4, parallel with M5; the tracker spike V-M0 right after M0.
* **Cohesion checks:** see *Cohesion checks* (every volume).
* **Disagreements (agreement.md):** `J-V7.82` with V02 (V02-ICONF-1); `TableId` with V11 (MC-11); `TableId` with model (MC-11).
* **Its own Fix list (§13) and hand-off rows — every item fixed in the text (or marked for the adjudicator with its reason); §13 keeps no open item:** V07-0014, V07-0015, V07-0016, V07-0017, V07-0018.
* **Hand-offs to close here (26):** V02:X13, V02:X26, V06:X4, V06:X22, V06:X27, V06:X32, V06:X34, V06:X36, V06:X43, V08:X7, V08:X14, V08:X22, V08:X23, V09:XV-V9-9, V10:CVR-V10-14, V11:X-V11-2, V11:X-V11-8, V11:X-V11-14, V11:X-V11-15, V11:X-V11-17, V12:X-V12-2, V12:X-V12-11, V12:X-V12-14, V12:X-V12-16, V12:X-V12-15, V12:X-V12-17 (agreement.md lists each).
* **Edges (edges.md):** 38 UNDEFINED, 44 UNTESTED; 0 UNDEFINED combinations it owns.
* **Open findings routed here (54):**
  * VOL-V07-V08-RESTATEMENTS-001 [restatements; -] the whole ProductDecl interface and its member semantics → **state it once at base registry (@plat/layout StrategyRegistry.products) via file f item 202 (BCR-V7-11); every other place cites it**
  * VOL-V07-V08-RESTATEMENTS-002 [restatements; -] LadderRouter.route: village for [1, 1 500) once registered, the base clamp otherwise → **state it once at base §1.1 LadderRouter (D-33) via file f item 202; every other place cites it**
  * VOL-V07-V08-RESTATEMENTS-003 [restatements; -] the church-family member list (cathedral, great_temple, church, chapel, monastery, generic-worship, generic-monastic, v.parish_church, v.chapel) in epoch.rows.persistence → **state it once at V11 §3.5.1 (the church-family tag); every other place cites it**
  * VOL-V07-V08-RESTATEMENTS-004 [restatements; -] the villageForm column, its type and compile rule → **state it once at base §10.2 BuildingClassRow via file f item 432 (BCR-V7-21); every other place cites it**
  * VOL-V07-V08-RESTATEMENTS-005 [restatements; -] the street layer rate 0.08 in the desertion rule → **state it once at V06 §3.5.2 (street candidate rate); every other place cites it**
  * VOL-V07-V08-RESTATEMENTS-006 [restatements; -] the declareEnd and walk event forms with every field → **state it once at base §7.1 EditEvent via file f (BCR-V7-19); every other place cites it**
  * VOL-V07-V08-RESTATEMENTS-007 [restatements; -] the full text of every BCR-V7 request in V07 §10 (items V07-0325 .. V07-0331) → **state it once at file f items 201-579 (BCR-V7-1 .. BCR-V7-38 consolidated; see bcr_to_file_f); every other place cites it**
  * V07-RESTATE-1 [restatement_findings; minor] ProductDecl is a base registry record (@plat/layout, registered by the base as 'base' and by V07 as 'village'; BCR-V7-11), shared by more than one product, yet its full interface and member semantics are written in V07; by princi… → **Canon: ProductDecl's interface lives in the base (via BCR-V7-11 at §4.12); V07 cites it and states only the 'village' entry's values.**
  * V07-RESTATE-2 [restatement_findings; minor] The persistence row enumerates V11 §3.5.1's church-family members by name (cathedral, great_temple, church, chapel, monastery, generic-worship, generic-monastic, v.parish_church, v.chapel) instead of keying by the tag; a list tha… → **Key the row by the church-family tag (V11 §3.5.1) if ProductEpochRows admits tag keys; otherwise cite V11 §3.5.1 as the list's home and T-check agreement.**
  * V07-RESTATE-3 [restatement_findings; major] Every BCR-V7-n is consolidated into an item of the f file (BCR-V7-1 -> item 201; -11, -17, -18 -> item 202; -22 -> item 209; -21 -> item 432; -38 -> item 579 etc.), which the pass applies to the base; after application V07 §10 re… → **Canon: V07 §10 becomes a pointer table (BCR id -> f item -> base section), the mechanism text living only in the base once applied.**
  * V07-RESTATE-4 [restatement_findings; minor] V07 restates V06's street-candidate rate (V6 §3.5.2: street 'rate' 0.08) as a number; a recalibration in V06 would leave V07's '0.08' stale (principle (1)). → **Cite V6 §3.5.2's street rate without the number.**
  * V07-DUP-1 [internal_duplications; minor] The records placement's contract (place/remove calls, before/after the base's placement, REPLACEMENT cases (c)/(d), rebind never offered TX-06, absorb path, keys by event.seq) is written out three to four times inside V07 (W70's … → **One home (§3.12 or §2.1's paragraph) citing V6 §2.1 for the type; W70 and the ProductDecl comment reference it.**
  * V07-DUP-2 [internal_duplications; minor] The field-system factor rows (climate, relief, culture, era) are written out in full in §2.2a's defaults table and again in §3.9 (3); the manor/village decoration rows (fishponds 0.5 within 300 m, warren 0.2, boundary stones, way… → **Keep the values in §2.2a (the rule cells) and the placement text in §3.9/§3.10; §2.4 and §3.9 (3) cite.**
  * V07-ICONF-1 [internal_conflicts; major] The law 1 + round(log2(P / 40)) clamped 1-4 gives 4 from P ≈ 227 (log2(P/40) >= 2.5), not 'from 320' as the table row says (320 is where log2 reaches exactly 3); the value at 228-319 people differs between the two statements (4 b… → **Fix the gloss to '4 from about 227' (or change the law if 320 was meant, e.g. floor instead of round) — one statement, one value.** — *closed by:* conflict ruling V07-ICONF-1
  * V07-ICONF-2 [internal_conflicts; minor] §3.6 (5) glosses the centrepiece pond as 'a small decoration pond inside the green, the village pond', while §2.4 and §3.2 (8)(d) define 'the village pond' as the L0 pond VS1 carves at the lowest hollow within 150 m of the heart … → **Drop 'the village pond' from §3.6 (5) (the centrepiece pond is the uncarved part of §2.4).** — *closed by:* conflict ruling V07-ICONF-2
  * V07-ICONF-3 [internal_conflicts; minor] The cap 1 + floor(households / 25) reaches 6 at 125 households, i.e. about 563 people at the 4.5 mean household (§3.2 (3) H = round(P / 4.5)), not 'from 625' (139 households); the worked gloss disagrees with its own law for 563-6… → **Correct the gloss to 'from about 563' (or restate the law if 625 was meant).** — *closed by:* conflict ruling V07-ICONF-3
  * V07-ICONF-4 [internal_conflicts; minor] (9v) sites an epoch's new nucleus 'at least 0.8·R_s from the existing ones', while the polyfocal rule whose cells §2.2a says (9v) reads ('polyfocal ... // §3.2 (4), §3.12 (9v)') spaces nuclei at max(polyfocal.spacingMinM = 250 m,… → **State (9v) as 'spaced by the polyfocal rule (§3.2 (4))' or record why epochs omit the floor.** — *closed by:* conflict ruling V07-ICONF-4
  * V07-ICONF-5 [internal_conflicts; minor] §13's note says V08's SR5-01 and V11's SR5-03 companions 'are §1's dependency (13), each pending with its fallback', and §12 says 'each with its fallback there', while §1 (13) (as fixed by the finalization, SR6-04 (a)) says both … → **Delete the stale sentences (with the narration they sit in); §1's cross-volume list states only current facts.** — *closed by:* conflict ruling V07-ICONF-5
  * V07-XCONF-1 [cross_part_conflicts; major] J122 decides V07 Q1 as '(a) yes, and its tracker spike (V-M0) right after M0'; V07 §11 still lists Q1 as an open owner question with only a recommendation, §8 still says 'the order is the owner's (Q1)', and §8 lets V-M0 and V-M1 … → **Mark Q1 'decided (a), J122'; write J122's slot into §8 (V-M0 right after M0; V-M1 onward after M4, parallel with M5) and the combined order into §16 and INDEX.md; state what V-M0 runs on before M2b (its headless spike inputs) or record the canon's ruling on the prerequisite.** — *closed by:* conflict ruling V07-XCONF-1
  * V07-XCONF-2 [cross_part_conflicts; major] V07 requires 'a span over a hinterland face — field, meadow, common, pasture or wood — stays open at every rung' and registers V04's arch-vault source at every village rung; V04's span rule makes a span open only where its strip … → **Canon rules one reading at the span rule's home (V04 BCR-45 / f item 244): add the hinterland-face condition to step (2) (with its test) or withdraw V07's requirement; delete the fallback and IN-V07-2's stale reason.** — *closed by:* conflict ruling V07-XCONF-2
  * V07-ELEG-1 [elegance_candidates; minor] The cross-table reference cell {ref: {table, row, cell}} with compile check and editTable inverse is defined here for village.json only; a value-held-by-reference between tables is a general table mechanism (§7.6 editable tables)… → **Canon: if §7.6 or V11 already has a reference-cell form, V07 cites it; if not, lift this one mechanism into §7.6 (one shape for every table) with its compile check and undo row.** — *closed by:* elegance ruling (E-list)
  * V07-ELEG-2 [elegance_candidates; minor] territory.haPerHead (2.3) is a stored cell whose value is the sum of the FarmTable village rows (arable 1.2 + meadow 0.15 + pasture 0.6 + coppice 0.25 + timber 0.075 = 2.275), and §3.9 (1) says the farm rows 'restate' it; two hom… → **Derive A_T's per-head area from the FarmTable village rows (keep a haPerHead override cell only if needed, with its lifecycle row), or make haPerHead a reference cell (§2.2a) to the sum.** — *closed by:* elegance ruling (E-list)
  * V07-ELEG-3 [elegance_candidates; minor] IN-V07-4 'supersedes any sentence of this volume that reads otherwise', but the body it amends was not folded: §3.4 steps 1 and 5 name the table only in words ('the defensibility table (V11's rows of item 106 (a))') and never its… → **Fold IN-V07-3, -4 and -5 into §3.1 (1), §3.4 and V07 §4.1/§5.1 (naming walls.barriers, WallBarrierRow.arcKind and LayerSpec.showCircuit), then delete the notes.** — *closed by:* elegance ruling (E-list)
  * V07-WGAP-1 [wiring_gaps; major] §2.2a states 'no rule constant of §3 stands in prose alone' and T-V7-44 (C, V-M1) scans §1 and §3 for any numeric rule constant that is not a village.json cell, a class row or a cited cell (reference literals keyed to D5.n and ou… → **Add the cells (palisade.denseDialFrom, formRules.organicDialFrom, formRules.districtDensity, palisade.pullM, palisade section widths, perimeter closeM) or cite existing ones; (9v) reads the polyfocal rule.** — *closed by:* wiring routing (V07-WGAP-1)
  * V07-WGAP-2 [wiring_gaps; minor] Three village.json cells are declared, valued and given provenance but no step reads them: density.bandWeight (1.0) is absent from §3.3's density formula (q(x) enters unweighted although §3.3 says 'every term a table cell of dens… → **Either write each cell into the step that reads it (q weighted by bandWeight; the reader of slack and emptyDensity named in §3.5) or delete the three cells from the interface, the defaults row and the VG column.** — *closed by:* wiring routing (V07-WGAP-2)
  * V07-TERM-1 [terminology; minor] The volume's pointer convention makes bare '§2.1-§2.7', '§3.m' and '§1-§13' mean V07's own sections while every other bare '§n.m' means the base, and V07 §4.x/§5.x are written 'V07 §n'; the same string '§2.4' therefore means V07 … → **Canon: one citation form across the set (base '§x.y', volume 'V07 §x.y' everywhere including self-references).** — *closed by:* glossary (retired synonyms) / ID rulings
  * V07-TERM-2 [terminology; minor] The symbol D names two concepts in the same subsection: the dwelling count ('D_b', 'D_v = D − D_o', 'S2's dwelling count D', W22-W23, §3.10's piers) and the sunlit share ('D(x)', 'D̄', W42 'the sunlit share D'); formulas such as … → **Rename one (e.g. sunlit share L(x) or 'lit', or dwellings N_d) set-wide; file g item 102's shade = 1 − lit.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V07-TERM-3 [terminology; minor] Wiring-row ids are numbered per volume from W1 with no volume prefix, and V07 cites V06's rows bare ('W3', 'W10', 'W75') while V07 has its own W3 and W10; the same id names two different rows (principle (4): ids unique across the… → **Canon: prefix wiring ids per volume (W-V7-n, W-V6-n) or always write 'V6 W75'.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V07-TERM-4 [terminology; minor] The bare id 'T<n>' names two different things in V07: the twelve editing tools T1-T12 of §4.1 (W21 'T9 and T11', §3.9 'rerollLayer('forest') (T10)') and the enumeration tables T1-T16 of research/sf/mapping.md (§3.11 'T14', 'T16')… → **Cite the mapping tables by the row-set names V08 §2.6 gives them (e.g. V08's 'conditions' row set for T16, 'government' for T14) or prefix them (mapping T16); keep bare T1-T12 for the tools.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V07-DEFER-1 [deferral_wording; minor] Dependencies (1) and (6) still read as open requests with conditional fallbacks ('V04 §2.2's union lacks it; fallback: the complex is stagnant ... blockedBy left without it'; 'without V6 §3.19.2 a carried raised way stands unchan… → **Delete the fallbacks and cite V04 §2.2 / V04 §3.5.1 (6) and V6 §3.19.2 as the homes.**
  * V07-DEFER-2 [deferral_wording; minor] 'item 110's retaining_wall, way.stair, ... aqueduct.channel (or the base's names once the coherence pass fixes them)': the role names are left conditional on a later choice (principle (6) deferral wording; principle (2) one term … → **Canon: fix one name per item-110 role in the base (§8.2) and have V07 cite it; drop the parenthesis.**
  * V07-DEFER-3 [deferral_wording; major] §13 keeps two open items 'deliberately left ... documented, not a bug to re-find': FL-1 (the per-constant trace rows D5.1-D5.17 not yet written in research/findings/code-impact.md §(d); the volume cites sub-keys that do not exist… → **FL-4: replace every critique/seam id used as a reference by the section it landed in (V06 §3.19, V04 §3.5.x, V11 §x); FL-1: either write the D5.n rows (research lane) or cite row D5 alone; close both.**
  * V07-DEFER-4 [deferral_wording; major] 'The other minors (SR6-04 (b)-(c), SR6-08, TX-04) are on the finalization's fix list (docs/volumes/INDEX.md §7)': seam findings touching V07 left open in another file's fix list; principle (10) requires every hand-off closed at i… → **The canon routes SR6-04 (b)-(c), SR6-08 and TX-04 to their homes and closes them (FIX or INVALID).**
  * V07-NARR-1 [narration; minor] Twenty-two stacked banner/revision lines (eleven 'PENDING FABLE REVIEW' lines, one per lane, plus 'REVISED'/'RECONCILED' notes naming critique ids); principle (8) allows one marker line per volume, the close's; principle (5) remo… → **Replace by the close's single marker line; drop the REVISED/RECONCILED notes (the validation records keep them).**
  * V07-NARR-2 [narration; minor] PROGRESS ledger plus eight kill-safe lane ledgers (REVISION, SECOND REVISION, RECONCILIATION, ROUND-2..6, two CONTINUATION ledgers; about 105 lines) narrate how the text evolved. → **Remove; the lane-events log and critique files keep them.**
  * V07-NARR-3 [narration; minor] Reading record (sources consulted, retrovalidation mention) is narration of the design's production, not design; the provenance rule it ends with (ref:VG 1.6.9 form, trace key D5/P17 of research/findings/code-impact.md, §17.1 (6)… → **Keep one sentence citing §17.1 (6) for the provenance form; drop the reading list.**
  * V07-NARR-4 [narration; minor] About 50 lines narrate which reconciliation round's companion edits landed in which volume, by which lane and at what time ('landed by reconcile-V08-r6 (14:12)', 'Their fallbacks are withdrawn (reconciliation round 3...)'); princ… → **Replace by a short list of the cross-volume facts V07 relies on, each cited at its home (V11 §x, V08 §3.5.1, V6 §2.1), without landing history.**
  * V07-NARR-5 [narration; minor] Row W40 is a withdrawn placeholder ('withdrawn by reconciliation round 3 (SR2-15; J-V7.115)') kept in the wiring table; its one normative sentence (village rows carry no split switch; item 105 (h)'s threshold applies; V11 §3.7.4 … → **Delete the row (history lives in the validation records); if the 'no split switch' fact is needed, one clause citing V11 §3.7.4 in §2.4.**
  * V07-NARR-6 [narration; minor] 'This replaces the 23:23 note's "no vault stage … the spans stay open".' narrates the design's history (principle (5)). → **Delete the sentence.**
  * V07-NARR-7 [narration; minor] Decision rows carry superseded values and their amendment history instead of the final choice: J-V7.20 still states 'capped at 1, 3 and 6', J-V7.42 the old law '0.4 ms per km2', J-V7.45 'about 140 m at 700 people' and 'thorp radi… → **Rewrite each row to its final choice (J-V7.30 retired in favour of J-V7.115, or reduced to the declared-split and never-merged clauses); the rationale file or validation records keep the history.**
  * V07-NARR-8 [narration; minor] The §10 preamble narrates which revision or reconciliation round added or amended each request, with scratchpad receipt paths ('scratchpad/volumes/rcV7r4/quotes.out'), and several BCR headers carry '(amended by the second revisio… → **Drop the preamble's history and receipts; keep one sentence on what §10 is.**
  * V07-NARR-9 [narration; minor] About 340 lines narrate the volume's revision history (issue-by-issue change tables, receipt paths, md5s, lane times, doc_checks counts, shared-file edits in V06); principle (5): the validation records (critique/seam-*.md, lane-e… → **Remove the appendix after folding any still-normative sentence (IN-V07-3/-4/-5) into the body.**
  * V07-NARR-10 [narration; minor] §12 CONFIRMED/PLAUSIBLE is written as per-lane reading records ('For reconciliation round 3 (read in lane reconcile-V07-r3; nothing executed beyond grep, md5...)', receipts, md5s, landing times), about 190 lines of narration; the… → **Reduce §12 to one CONFIRMED list (sources read) and one PLAUSIBLE list (values and readings, each with the milestone that measures it).**
  * V07-BREF-1 [broken_references; minor] 'that many v.smithy members, keyed #k, spaced 200 m (above)': no table above gives v.smithy a same-kind spacing (its profile deltas are 'clientele travellers' only; K spread 200 is v.bakehouse's), so the 200 m spacing the row rel… → **Give v.smithy its 'K spread 200' in the profile table (the spacing's home) or correct the row to the spacing that exists.**
  * TX-04 [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-time-r6.md TX-04 → **V07 prices `village.density`'s cost at a base-product epoch (a superseded village plan's raster) in its §6, with V06 §6.2's row citing it.**
  * SR6-04 (b)-(c) [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-settlements-r6.md SR6-04 (b)-(c) → **V07 §12's and §13's round-6 sentences leave with the narration (V07-ICONF-5).**
  * SR6-08 [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-settlements-r6.md SR6-08 → **Ruled: V11's compiler (step 5a) is the one producer of the `v.` rows' `commonness` (the compiler produces every compiled display cell; file f rule R-c); V07 §2.4 cites it and names no script. V11 states the v.-row case in step 5a (SR6-09 (a)).**
  * V07:IN-V07-1 [integration-note; minor] * **IN-V07-1 (J-VI.1, clean-room).** The request field is renamed `arableFactor` (six lines; its former name coincided with a reference field and is not repeated here — reworded by the continuation, J-VI.23), and §3.8's VG slot r… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V07:IN-V07-2 [integration-note; minor] * **IN-V07-2 (J-VI.16).** §13's FL-2 is **closed**: volume 4's second round landed `blockedBy 'rung'`, `parish_church` among the counted churches, the maintenance mode, the ruin centre, the well pins and the `DigRule` rows (V04 §… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V07:IN-V07-3 [integration-note; minor] * **IN-V07-3 (J-VI.17 H30; volume 8's X7).** A village birth carrying `Toll bridge` reads the `kinds` cell's `implies: 'bridge'` (volume 11's `toll_bridge` row) in the village site rule: the settlement's through route crosses its… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V07:IN-V07-4 [integration-note; minor] * **IN-V07-4 (J-VI.17 H31, H32; X-V11-2, XV-V9-9).** The palisade's barrier arcs read volume 11's `walls.barriers` rows (V11 §3.16.1) keyed by the closure-arc kinds of J-VI.3; its "show circuit" control reads BCR-V9-25's `LayerSp… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V07:IN-V07-5 [integration-note; minor] * **IN-V07-5 (J-VI.4).** No village tool refuses a declaration that contradicts no dossier fact and no lock (item 101 R2): a raised stroke at a village rung is drawn as declared (the rung gate binds only generation, BCR-V7-33). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V07:IN-V07-6 [integration-note; minor] * **IN-V07-6 (J-VI.23, clean-room).** IN-V07-1 no longer names the retired request field (its former name coincided with a reference field). No meaning changed. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V07:IN-V07-7 [integration-note; minor] * **IN-V07-7 (J-VI.25).** The dossier trace of §1b read "`nearbyResources[]` → DR19 → W20", a field no digest carries; it now reads "deposits → `site.deposits` (V08 §2.6's digest field) → DR19 → W20", as volume 8 traces it. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**

### V08

* **Size:** 84356 words; the goal band after: 50614–63267 words; narration ranges alone 12989 words; 12 restatements to references; 6 BCR blocks to pointers.
* **STATE:** 146 facts (canon.json → units.V08.state).
* **REFERENCE (12):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | V08-0009 | determinism §7.7 | DETERMINISM-0241 (fact) |
  | V08-0029 | rendering §11.3 | — (section) |
  | V08-0030 | scope §14 | SCOPE-0625 (near) |
  | V08-0033 | determinism §7.7 | DETERMINISM-0538 (fact) |
  | V08-0038 | scope §14 | SCOPE-0607 (fact) |
  | V08-0041 | scope §14 | SCOPE-0610 (fact) |
  | V08-0042 | model §2.7 | MODEL-0472 (fact) |
  | V08-0043 | pipeline §10.2 | PIPELINE-0601 (fact) |
  | V08-0072 | scope §14 | SCOPE-0610 (fact) |
  | V08-0073 | model §2.7 | — (section) |
  | V08-0074 | determinism §7.7 | — (section) |
  | V08-0087 | base? (the editor finds the section) | — (section) |

* **Its §10 requests → one-line pointers to the applied f items (32):** BCR-V8-1 → item 472; BCR-V8-2 → item 459; BCR-V8-3 → item 507; BCR-V8-4 → item 508; BCR-V8-5 → item 509; BCR-V8-6 → item 358; BCR-V8-7 → item 389; BCR-V8-8 → item 390; BCR-V8-9 → item 202; BCR-V8-10 → item 510; BCR-V8-11 → item 391; BCR-V8-12 → item 392; BCR-V8-13 → item 511; BCR-V8-14 → item 256; BCR-V8-15 → item 410; BCR-V8-16 → item 480; BCR-V8-17 → item 486; BCR-V8-18 → item 529; BCR-V8-19 → item 359; BCR-V8-20 → item 393; BCR-V8-21 → item 394; BCR-V8-22 → item 395; BCR-V8-23 → item 512; BCR-V8-24 → item 396; BCR-V8-25 → item 397; BCR-V8-26 → item 257; BCR-V8-27 → item 513; BCR-V8-28 → item 244; BCR-V8-29 → item 425; BCR-V8-30 → item 398; BCR-V8-31 → item 260; BCR-V8-32 → item 399.
* **BCR blocks → pointers (6):** BCR-V10-22 → item 572; BCR-V8-4 → item 508; BCR-V8-10 → item 510; BCR-V8-15 → item 410; BCR-V8-21 → item 394; BCR-V11-26 → item 425.
* **Terms to replace:** G-lot (lot, lot-driven, lot-derived, BuildingInput.lot → plot (field BuildingInput.plot); 2 hits, first lines [3130, 3132]); G-firstmap (first paint → first map; 2 hits, first lines [157, 1314]); G-cite (V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 … → Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y; 233 hits, first lines [281, 290, 311, 323, 328, 329]); G-DR (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8 → DR26–DR35 (ID-DR); 119 hits, first lines [18, 202, 206, 210, 269, 274]); G-fallbackclass (fallbackClass → item 104 (a)'s resolution (V11 §3.13); 8 hits, first lines [1998, 3158, 3159, 3486, 3514, 3532]); G-portpath (PortRungPath, registerRungPath, its own port path → ProductDecl in StrategyRegistry.products (file f item 202); 5 hits, first lines [3003, 3512, 3647]).
* **Conflicts it resolves (12):** SCOPE-C07, V08-XCONF-1, V08-XCONF-2, V08-XCONF-3, V08-XCONF-4, V08-XCONF-5, V08-XCONF-6, V08-XCONF-7, V08-XCONF-8, V08-XCONF-9, CANON-C03, CANON-C04.
* **File f items that concern it (cite as base text):** 202, 244, 256, 257, 260, 322, 358, 359, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 410, 425, 453, 459, 464, 472, 473, 480, 486, 507, 508, 509, 510, 511, 512, 513, 516, 529, 568, 572, 573, 583.
* **File g parts it writes or applies:**
  * item 111: the dossier's desert with or without `oasis_water`, and deserts with rivers, lakes or coasts (the port's mapping; E-31's failure condition reads it)
  * item 113: reading SettlementForge's history: AGE_BY_TIER, the founding, the 29 event types with years ago and severity, tierHistory, populationHistory, calamityHistory, the lifecycle (terminal death, resettlement), opt-in ancient ruins, peakTier and its documented gap; the effective peak's evidence order
* **Wiring gaps it closes:** W-DOS-01a, W-DOS-01b, W-DOS-02, W-DOS-07, W-DOS-08, W-DOS-09, W-HOOK-02.
* **Elegance rulings it applies:** E-17, E-24, E-31.
* **Id rulings it applies:** ID-BCR, ID-WX, ID-DR, ID-DUPDEF.
* **Owner questions to mark answered:** Q1 — follows SettlementForge (J121); Q2 — follows SettlementForge (J121); Q3 — J122: yes, from M-SF (opaque bytes, V08-XCONF-5); until then maps export on their own; Q4 — J122: yes; Q5 — J122: pictures and player views now; a live shared map after M-SF.
* **Cohesion checks:** see *Cohesion checks* (every volume).
* **Disagreements (agreement.md):** `SettlementForge` with V09 (SCOPE-C07, V08-XCONF-6); `SettlementForge` with V10 (SCOPE-C07); `SettlementForge` with rendering (V08-XCONF-5); `SettlementForge` with scope (SCOPE-C07).
* **Hand-offs to close here (20):** V02:X9, V06:X5, V06:X23, V06:X29, V06:X44, V06:X47, V09:XV-V9-17, V09:XV-V9-20, V09:XV-V9-21, V09:XV-V9-24, V09:XV-V9-26, V09:XV-V9-29, V10:CVR-V10-3, V10:CVR-V10-14, V11:X-V11-1, V11:X-V11-6, V11:X-V11-15, V11:X-V11-17, V12:X-V12-5, V12:X-V12-16 (agreement.md lists each).
* **Edges (edges.md):** 41 UNDEFINED, 20 UNTESTED; 62 UNDEFINED combinations it owns.
* **Open findings routed here (36):**
  * VOL-V07-V08-RESTATEMENTS-008 [restatements; -] the nine new bridge message types and their fields → **state it once at base §11.3 Vocabulary via file f (BCR-V8-1); every other place cites it**
  * VOL-V07-V08-RESTATEMENTS-009 [restatements; -] the extended doc.load, doc.save and status messages → **state it once at base §11.3 / §14 via file f (BCR-V8-1, -2); every other place cites it**
  * VOL-V07-V08-RESTATEMENTS-010 [restatements; -] the binding additions (adapter, quarantined, carried keys, retention) → **state it once at base §7.7 item 12 DossierBinding via file f (BCR-V8-8); every other place cites it**
  * VOL-V07-V08-RESTATEMENTS-011 [restatements; -] E_OTHER_SETTLEMENT and the 27 new PortNote kinds → **state it once at base §14 @plat/port via file f (BCR-V8-4); every other place cites it**
  * VOL-V07-V08-RESTATEMENTS-012 [restatements; -] the digest and DossierInstitution additions → **state it once at base §14 DossierDigest via file f (BCR-V8-5); every other place cites it**
  * VOL-V07-V08-RESTATEMENTS-013 [restatements; -] the full text of every BCR-V8 request in V08 §10 (items V08-0157 .. V08-0162) → **state it once at file f items (BCR-V8-1 .. BCR-V8-32 consolidated; BCR-V8-9 and -28 into items 202 and 244); every other place cites it**
  * V08-RESTATE-1 [restatement_findings; major] Every BCR-V8-n is consolidated into an f item (BCR-V8-9 and -11/-17/-18 of V07 into item 202; BCR-V8-28 into item 244 etc.) that the pass applies to the base; V08 §10 then restates the base's text in a second home (full message l… → **Canon: V08 §10 becomes a pointer table (BCR id -> f item -> base section).**
  * V08-XCONF-1 [cross_part_conflicts; minor] The clerk configuration is written as a recommendation, while J121/J122 decide it: V10 Q2 'SettlementForge's, driving our tool API (J121)'. The design text still presents a settled owner decision as a recommendation. → **Read 'none under C (SettlementForge's own assistant; follows SettlementForge, J121)'.** — *closed by:* conflict ruling V08-XCONF-1
  * V08-XCONF-2 [cross_part_conflicts; major] Owner ruling J121 (recorded in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: V08 Q1 'the module's web origin — follows SettlementForge (J121)'; V08 Q2 'plans, save limits, backups — follows SettlementForge (J121)') requires the d… → **Recast as inputs: MapHostConfig carries SF's origin, backup depth and quota (from SF's existing product decisions); the contract keeps 'backups[0..n)' read from that input; mark Q1 and Q2 'follows SettlementForge (J121)'.** — *closed by:* conflict ruling V08-XCONF-2
  * V08-XCONF-3 [cross_part_conflicts; minor] J122's combined build order places the village product (V-M, after M4) before the live SettlementForge connection (M-SF, after M-CAL), so by the time a live SF drives a map the village product is registered; the plain-words promi… → **Reword: small settlements are drawn by the village product (V07), registered before M-SF; the held state applies only to a build without it.** — *closed by:* conflict ruling V08-XCONF-3
  * V08-XCONF-4 [cross_part_conflicts; minor] J122 decides V08 Q5: 'pictures and player views now; a live shared map as a later item after M-SF'; the volume still cites Q5 as an open owner question instead of the decision (principle (7)'s J122 clause: mark each answered with… → **Cite 'decided under J122: pictures and player views now; a live shared map after M-SF' in §1, §3.14 (6) and §11.** — *closed by:* conflict ruling V08-XCONF-4
  * V08-XCONF-5 [cross_part_conflicts; major] J122 decides V08 Q3: 'scene files inside SettlementForge's export bundle — yes, from M-SF; until then maps export on their own'. V08 still treats Q3 as open and forbids it, and §5.4's structural rule ('no STRUCTURED format reache… → **Canon: add the M-SF route for SF's export bundle (which formats, through which host call, under which key rules), state why door 1 stays closed (bundle packaging, not simulator input), and mark Q3 decided under J122.** — *closed by:* conflict ruling V08-XCONF-5
  * V08-XCONF-6 [cross_part_conflicts; minor] J121 (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: 'other interface languages — follows SettlementForge (J121)') requires the module's interface language to follow SettlementForge's decision as an input; V08 fixes English as the… → **The frame's locale is the host's (an input on doc.load or MapHostConfig from SF's language decision); English only as the catalogue's source language.** — *closed by:* conflict ruling V08-XCONF-6
  * V08-XCONF-7 [cross_part_conflicts; minor] J122 decides V08 Q4: 'the live SettlementForge connection after M-CAL — yes' (the port's creation half at M1 on frozen dossiers); §8.1 and §11 still present Q4 as open. → **Mark Q4 decided under J122 (M-SF after M-CAL) and write the combined order of J122 into §16 and INDEX.md's plan.** — *closed by:* conflict ruling V08-XCONF-7
  * V08-XCONF-8 [cross_part_conflicts; major] Every V08 owner question is answered in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: Q1 and Q2 'follow SettlementForge (J121)', Q3 'yes, from M-SF; until then maps export on their own' (J122), Q4 'after M-CAL: yes' (J122), Q5 'p… → **Replace §11 by a table of the five decisions (J121/J122) and carry each into its section (§3.7 backups, §5.4 export bundle, §8.1 order, §3.14 (6) party copy).** — *closed by:* conflict ruling V08-XCONF-8
  * V08-XCONF-9 [cross_part_conflicts; minor] One derivation is written in two homes with different inputs: V11 §3.19.2 says 'V08 derives era from site.culture and the tier' (every culture c14, region western), while V08 §2.6's era row, which owns the reading, maps only the … → **State the derivation once at V08 §2.6 (culture -> era) and have V11 §3.19.2 cite it without naming the tier, or add the tier's part to V08's row.** — *closed by:* conflict ruling V08-XCONF-9
  * V08-ELEG-1 [elegance_candidates; minor] The bridge-implying record's watercourse rule is written twice with different shapes: V08 makes the brook cross 'the through route of the longest approach inside the frame' and fails to toll_bridge_dry on desert without oasis_wat… → **One home for the bridge-implying rule (DR1's row in §7.7 or V08 §2.6b) with the village reading as its rung row; state each difference as a rung-specific cell or unify.** — *closed by:* elegance ruling (E-list)
  * V08-TERM-1 [terminology; minor] V08's wiring rows carry no ids (V07 numbers W1-W73, V06 W1-W75), so other volumes and the canon cannot cite a V08 row, and the table is split by history dividers ('added by the revision', 'added for item 110', 'added by reconcili… → **Number the rows under the canon's wiring-id form and drop the history dividers (order by subject).** — *closed by:* glossary (retired synonyms) / ID rulings
  * V08-TERM-2 [terminology; minor] IN-V08-1 (J-VI.13) already numbers V08's derivation rows (DR-V8.1 -> DR29, DR-V8.2 -> DR30, DR-V8.3 -> DR31, DR-V8.4 -> DR32, DR-V8.5 -> DR33, DR-V8.6 -> DR28 with V06's DR-V6.1, DR-V8.7 -> DR34, DR-V8.8 -> DR35) and keeps 'the w… → **Use DR28-DR35 everywhere in the set (V07 W42 included), drop the DR-V8.n aliases and the pending wording, and let §7.7 carry the rows.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V08-DEFER-1 [deferral_wording; minor] Requests left conditional on what this pass does (whether Intent.latitudeDeg is already added by item 102's text; whether the item-110 fold removed a phrase; the DR numbers) — unresolved choices the pass must settle (principle (6… → **Canon records the outcome: Intent.latitudeDeg's one home (item 102's or BCR-V8-11's), §16's sentence after the item-110 fold, and the DR numbers of DR-V8.1-DR-V8.8 (and V01, V05, V06's proposed rows).**
  * V08-DEFER-2 [deferral_wording; major] Five open fix-list items: F1 the line's full condition registry not read (raider source), F2 SF's assistant unsurveyed, F3 the expiresAtTicks reading, F4 the kind-family gain, F5 the party set's budgets. The owner's zero bar and … → **Close the list: each item's outcome and bar at its home (§2.6 threats row, §4.4 (1), §3.11, §3.5 (6), §6), then delete (a).**
  * V08-DEFER-3 [deferral_wording; major] Two seam findings touching V08 are left open on the finalization's fix list in INDEX.md §7; the zero bar and principle (10) require each closed (FIX or INVALID) at its home. → **The canon routes SR6-05 (b) (V08 §12's sentence) and seam-surfaces-r6 SR6-04 to their homes and closes them.**
  * V08-NARR-1 [narration; minor] Eight stacked 'PENDING FABLE REVIEW' banner lines (one per lane) and a revision note narrating the critique's findings and their disposition; principle (8) allows one marker line (the close's); principle (5) removes narration. → **Replace by the close's single marker line; drop the revision note.**
  * V08-NARR-2 [narration; minor] PROGRESS ledger with the REVISION sub-ledger (R1-R9) and ten RECONCILIATION round entries (about 57 lines) narrating how the text evolved. → **Remove; the lane-events log and critique files keep them.**
  * V08-NARR-3 [narration; minor] The ladder re-check's disagreement list and 'handed to revise-V11 (V08 §13, X1)' narrate a hand-off V11 has since applied (V11 §3.12 lines 2685, 2709 carry hospital_network over almshouse and foundling_home, dungeon_delving_suppl… → **Reduce (f) to one sentence: V11 §3.12's rows agree with the pinned ladder file (the check is release row R2's); drop the fix list.**
  * V08-NARR-4 [narration; minor] The total row narrates estimate history ('the revision adds about 2.75-3.5 pw over the first estimate (12.75-17.5) ... reconciliation round 2 adds 0.25 pw at SF6 ... reconciliation round 1's continuation adds 0.25 pw at SF3's top… → **State the total (15.75-21.5 pw) and what V11 prices; drop the history.**
  * V08-NARR-5 [narration; minor] Decision rows carry revision history ('REVISED (C8-01): the first version's viewer half ... is withdrawn', 'over the first version's claim that nothing geometric reaches the host, because that claim was false', 'REVISED (SR2-24 (… → **Rewrite each row to its final choice; the critique files keep the history.**
  * V08-NARR-6 [narration; minor] §12 is written as per-lane reading records ('Added by reconciliation round 3's continuation (CONFIRMED by reading the current text on 2026-09-29, from 10:31)', md5s, landing times, 'X22 CLOSED', 'PLAUSIBLE: that V07's next lane t… → **Reduce to one CONFIRMED list of sources and one PLAUSIBLE list of values and readings with the bar or milestone that settles each.**
  * V08-NARR-7 [narration; minor] The hand-off table narrates every reconciliation round's additions and closures (X2, X5, X11, X12, X14-X25 carry 'CLOSED ... Was: ...' histories), and the unmarked rows X1, X3, X4, X6, X7, X8, X9, X10, X13 have all landed at thei… → **Delete (b); the validation records keep the history.**
  * V08-NARR-8 [narration; minor] About 375 lines narrate the volume's revision history (issue tables, found-in-passing lists, counts of ids, lane times, doc-check tallies) and 'For the coherence pass' notes whose content has since landed in file f (item 390 now … → **Remove the appendix; the critique and seam files keep the history.**
  * SR6-05 (b) [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-settlements-r6.md SR6-05 (b) → **V08 §12's round-6 PLAUSIBLE sentence leaves with the narration.**
  * SR6-04 (surfaces) [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-surfaces-r6.md SR6-04 (surfaces) → **The frame words of V08 §4.2's controls and dialogs, §5.1's strip and the notice keyed as MsgRows.**
  * V08:IN-V08-1 [integration-note; minor] * **IN-V08-1 (J-VI.13).** The coherence pass numbers this volume's rows: DR-V8.1 → **DR29**, DR-V8.2 → **DR30**, DR-V8.3 → **DR31**, DR-V8.4 → **DR32**, DR-V8.5 → **DR33**, DR-V8.6 → **DR28** (one row with volume 6's DR-V6.1), DR… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V08:IN-V08-2 [integration-note; minor] * **IN-V08-2 (J-VI.14, J-VI.15; X8, X10).** X8's slot mechanism is the one suppression mechanism of J-VI.14 (BCR-V6-24, widened to islands and accesses); X10's `waterUse` joins the raised-way record and the report notes `aqueduct… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V08:IN-V08-3 [integration-note; minor] * **IN-V08-3 (J-VI.9).** A dossier-bound `conduit_house` (`aqueduct_or_water_system` → V11 §3.11) is the aqueduct's terminal where an aqueduct is generated; no conduit house is created that the dossier or roster does not hold. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V08:IN-V08-4 [integration-note; minor] * **IN-V08-4 (J-VI.20).** BCR-V8-29's `customKinds` row type carries no `fallbackClass` (BCR-V11-26): a carried custom institution's class is volume 11's item 104 (a) resolution; the read-time overlay of this volume stays (file f… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**

### V09

* **Size:** 111610 words; the goal band after: 66966–83708 words; narration ranges alone 14114 words; 62 restatements to references; 36 BCR blocks to pointers.
* **STATE:** 918 facts (canon.json → units.V09.state); 25 index rows.
* **HISTORY OUT:** V09-1071, V09-1072.
* **REFERENCE (62):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | V09-0128 | V11 V11 §1b | V11-0070 (fact) |
  | V09-0130 | V11 V11 §2.4 | V11-0138 (near) |
  | V09-0131 | V10 V10 §1.1 | V10-0008 (fact) |
  | V09-0136 | model §2.9 | — (section) |
  | V09-0145 | V10 V10 §1b.1 | V10-0054 (fact) |
  | V09-0150 | V10 V10 §2.2 | V10-0141 (fact) |
  | V09-0192 | scope §14 | — (section) |
  | V09-0195 | V02 V02 §8.3 | V02-0315 (near) |
  | V09-0204 | determinism §7.4 | DETERMINISM-0546 (near) |
  | V09-0206 | V06 V06 §4.4 | V06-0304 (fact) |
  | V09-0207 | V06 V06 §9 | V06-0446 (near) |
  | V09-0210 | determinism §6.4 | — (section) |
  | V09-0301 | V08 V08 §9 | V08-0153 (fact) |
  | V09-0501 | V10 V10 §1b.1 | V10-0055 (near) |
  | V09-0502 | V10 V10 §7.1 | V10-0576 (fact) |
  | V09-0503 | V10 V10 §1b.1 | V10-0055 (fact) |
  | V09-0504 | V10 V10 §9 | V10-0715 (fact) |
  | V09-0505 | V10 V10 §1b.1 | V10-0055 (near) |
  | V09-0506 | V10 V10 §1b.1 | V10-0055 (fact) |
  | V09-0507 | V10 V10 §7.1 | V10-0588 (fact) |
  | V09-0508 | V10 V10 §1b.1 | V10-0071 (fact) |
  | V09-0509 | V10 V10 §7.1 | V10-0576 (fact) |
  | V09-0510 | V10 V10 §1b.1 | V10-0071 (near) |
  | V09-0511 | V10 V10 §1b.1 | V10-0085 (fact) |
  | V09-0516 | V10 V10 §7.1 | V10-0576 (near) |
  | V09-0548 | V08 V08 §4.6 | V08-0118 (fact) |
  | V09-0553 | V10 V10 §2.6 | V10-0150 (fact) |
  | V09-0554 | V10 V10 §3.11 | V10-0379 (fact) |
  | V09-0559 | V10 V10 §2.2 | V10-0141 (fact) |
  | V09-0564 | determinism §7.6 | DETERMINISM-0446 (near) |
  | V09-0569 | V04 (the editor finds the section) | — (section) |
  | V09-0570 | V04 V04 §9 | V04-0272 (near) |
  | V09-0592 | V04 V04 §4.3 | V04-0170 (near) |
  | V09-0594 | model §2.9 | MODEL-0447 (near) |
  | V09-0595 | rendering §9.5 | — (section) |
  | V09-0596 | base? (the editor finds the section) | — (section) |
  | V09-0597 | base? (the editor finds the section) | — (section) |
  | V09-0598 | pipeline §4.2 | — (section) |
  | V09-0599 | rendering §8 | — (section) |
  | V09-0600 | model §2.9 | — (section) |
  | V09-0601 | base? (the editor finds the section) | — (section) |
  | V09-0602 | base? (the editor finds the section) | — (section) |
  | V09-0603 | base? (the editor finds the section) | — (section) |
  | V09-0604 | rendering §11.3 | RENDERING-0489 (fact) |
  | V09-0605 | base? (the editor finds the section) | — (section) |
  | V09-0606 | base? (the editor finds the section) | — (section) |
  | V09-0607 | pipeline §4.5 | — (section) |
  | V09-0608 | rendering §9.5 | RENDERING-0418 (near) |
  | V09-0609 | base? (the editor finds the section) | — (section) |
  | V09-0610 | kernel §3.15 | — (section) |
  | V09-0637 | V05 V05 §4.2 | V05-0361 (fact) |
  | V09-0640 | V06 V06 §1b | V06-0053 (fact) |
  | V09-0652 | V02 V02 §9 | V02-0384 (near) |
  | V09-0657 | rendering §11.2 | RENDERING-0463 (fact) |
  | V09-0658 | rendering §8.2 | — (section) |
  | V09-0659 | V05 V05 §3.22 | V05-0333 (fact) |
  | V09-0660 | rendering §8 | RENDERING-0152 (near) |
  | V09-0687 | determinism §5 | DETERMINISM-0588 (near) |
  | V09-0689 | V06 V06 §5.1 | V06-0310 (near) |
  | V09-0871 | scope §16 | — (section) |
  | V09-1075 | V02 V02 §8.3 | V02-0315 (near) |
  | V09-1076 | V12 V12 §IN | V12-0403 (fact) |

* **Its §10 requests → one-line pointers to the applied f items (36):** BCR-V9-1 → item 514; BCR-V9-2 → item 458; BCR-V9-2 → item 515; BCR-V9-3 → item 277; BCR-V9-5 → item 460; BCR-V9-7 → item 411; BCR-V9-8 → item 516; BCR-V9-9 → item 517; BCR-V9-10 → item 461; BCR-V9-11 → item 462; BCR-V9-12 → item 463; BCR-V9-13 → item 360; BCR-V9-14 → item 453; BCR-V9-15 → item 454; BCR-V9-16 → item 348; BCR-V9-17 → item 494; BCR-V9-18 → item 530; BCR-V9-19 → item 269; BCR-V9-20 → item 278; BCR-V9-21 → item 361; BCR-V9-22 → item 372; BCR-V9-23 → item 464; BCR-V9-24 → item 490; BCR-V9-25 → item 413; BCR-V9-26 → item 362; BCR-V9-27 → item 465; BCR-V9-28 → item 466; BCR-V9-29 → item 363; BCR-V9-30 → item 246; BCR-V9-31 → item 447; BCR-V9-32 → item 455; BCR-V9-33 → item 244; BCR-V9-33 → item 364; BCR-V9-34 → item 467; BCR-V9-35 → item 570; BCR-V9-36 → item 583.
* **BCR blocks → pointers (36):** BCR-V8-3 → item 507; BCR-V6-11 → item 458; BCR-V8-15 → item 410; BCR-V11-10 → item 380; BCR-V10-1 → item 468; BCR-V10-1 → item 468; BCR-V9-7 → item 411; BCR-V9-8 → item 516; BCR-V9-9 → item 517; BCR-V10-6 → item 470; BCR-V9-11 → item 462; BCR-V10-1 → item 468; BCR-V9-13 → item 360; BCR-V8-1 → item 472; BCR-V9-15 → item 454; BCR-V10-12 → item 348; BCR-V9-17 → item 494; BCR-V9-18 → item 530; BCR-V9-19 → item 269; BCR-V9-20 → item 278; BCR-V9-21 → item 361; BCR-V9-22 → item 372; BCR-V10-22 → item 572; BCR-V9-24 → item 490; BCR-V9-25 → item 413; BCR-V10-17 → item 366; BCR-V10-6 → item 470; BCR-V9-28 → item 466; BCR-V9-29 → item 363; BCR-V9-30 → item 246; BCR-V9-31 → item 447; BCR-V6-24 → item 260; BCR-V9-33 → item 364; BCR-V9-34 → item 467; BCR-V3-16 → item 353; BCR-V10-22 → item 572.
* **Terms to replace:** G-firstmap (first paint → first map; 2 hits, first lines [240, 3295]); G-cite (V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 … → Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y; 1197 hits, first lines [29, 64, 65, 66, 67, 68]); G-DR (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8 → DR26–DR35 (ID-DR); 8 hits, first lines [267, 404, 405, 2687, 2805, 2806]); G-M6U (M6 (for the underground) → M6-U ("M6" is volume 2's stage 3); 1 hits, first lines [3387]); G-newrandom (scoped re-roll, Try again (in prose), Rebuild … as generated → New random (§7.1); 'Try again' is only its catalogue label; 'reroll' only for rerollLayer; 3 hits, first lines [193, 948, 3501]); G-suppress (kept removed, the removal holds, Removals that hold (in design prose) → suppression (file f item 260); 6 hits, first lines [380, 1319, 1320, 1861, 3416, 4614]); G-rederive (Rebuild from {stage} → Re-derive (§7.1); 3 hits, first lines [1734, 1870, 4896]); G-bend (refuse.raised.*, refuse.aqueduct.*, refuse.retaining.*, refuse.stack.* → bend (bend.* keys); refuse.* only for a dossier fact or a lock; 6 hits, first lines [4587, 4588, 4589]); G-unexcavated (LayerSpec.showUnexcavated → the view key `showUnexcavated`; 1 hits, first lines [3986]); G-clerkhandle (ClerkHarness → ClerkHandle; 2 hits, first lines [4238]); G-offline (error.clerkOffline → refuse.clerk.offline; 1 hits, first lines [1763]); G-floorvault (floor vaults (wet ground) → no crypt; ledger slabs in the chancel floor (V03 §3.7.4); 1 hits, first lines [2435]).
* **Conflicts it resolves (28):** DIC-06, DIC-07, DXC-04, SCOPE-C07, SCOPE-C15, V01-XCONF-2, V06-AGREE-1, V08-XCONF-6, V09-ICONF-1, V09-ICONF-2, V09-ICONF-3, V09-ICONF-4, V09-ICONF-5, V09-XAGREE-1, V09-XAGREE-2, V09-XCONF-1, V09-XAGREE-3, V10-XAGREE-3, V10-XAGREE-4, V09-J121-1, V09-J121-2, V09-J121-3, V09-J121-4, V09-J122-1, V09-J121-5, CANON-C02, CANON-C03, CANON-C04.
* **File f items that concern it (cite as base text):** 244, 245, 246, 260, 269, 270, 277, 278, 348, 360, 361, 362, 363, 364, 366, 368, 380, 390, 399, 402, 410, 411, 413, 447, 453, 454, 455, 458, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 472, 473, 490, 494, 507, 514, 515, 516, 517, 530, 568, 570, 571, 572, 582, 583.
* **File g parts it writes or applies:**
  * item 111: the tool: T2 `ground`'s spring flag and the oasis in the ground tools, its message rows and binding row
  * item 112: the view settings (the checked-variant selector) and the trial's running (recruitment through SettlementForge's community, the sessions, the report)
  * item 113: the history option in the editor (the blueprint history) and the LOST void's panel line (V09-WGAP-1)
* **Wiring gaps it closes:** W-IF-04, W-EDIT-01, W-FLD-11, V05-WGAP-1, V05-WGAP-2a, V06-WGAP-1a, V09-WGAP-1, V09-WGAP-2.
* **Elegance rulings it applies:** E-04, E-07, E-16, E-17, E-24, E-32, E-33.
* **Id rulings it applies:** ID-BCR, ID-TOOL, ID-LAYER, ID-WX, ID-DUPDEF.
* **Owner questions to mark answered:** Q1 — follows SettlementForge's staging (J121); Q2 — J122: five SettlementForge users per round from its community; thanks by credit and early access, no payments; Q3 — follows SettlementForge (J121).
* **Cohesion checks:** see *Cohesion checks* (every volume).
* **Disagreements (agreement.md):** `BCR-V9-31` with V01 (V01-XCONF-2); `SettlementForge` with V08 (SCOPE-C07, V08-XCONF-6); `EditEvent` with V10 (DXC-04); `SettlementForge` with V10 (SCOPE-C07); `T-V9-15` with V10 (V09-XAGREE-3); `BCR-V10-20` with V10 (DXC-04); `EditEvent` with determinism (DXC-04, V09-ICONF-2); `SettlementForge` with scope (SCOPE-C07, SCOPE-C15, V09-J122-1).
* **Its own Fix list (§13) and hand-off rows — every item fixed in the text (or marked for the adjudicator with its reason); §13 keeps no open item:** V09-1036, V09-1037, V09-1038, V09-1039, V09-1040, V09-1041, V09-1042, V09-1043, V09-1044, V09-1045, V09-1046, V09-1047, V09-1048, V09-1049, V09-1050, V09-1051, V09-1052, V09-1053, V09-1054, V09-1055, V09-1056, V09-1057, V09-1058, V09-1059, V09-1060, V09-1061, V09-1062, V09-1063, V09-1064, V09-1065, V09-1066, V09-1073.
* **Hand-offs to close here (26):** V06:X6, V06:X21, V06:X30, V06:X39, V06:X44, V08:X12, V08:X15, V08:X16, V08:X17, V08:X18, V08:X20, V10:CVR-V10-4, V10:CVR-V10-7, V10:CVR-V10-15, V10:CVR-V10-16, V10:CVR-V10-17, V10:CVR-V10-18, V10:CVR-V10-19, V10:CVR-V10-20, V11:X-V11-13, V11:X-V11-14, V11:X-V11-17, V12:X-V12-6, V12:X-V12-8, V12:X-V12-10, V12:X-V12-18 (agreement.md lists each).
* **Edges (edges.md):** 94 UNDEFINED, 67 UNTESTED; 25 UNDEFINED combinations it owns.
* **Open findings routed here (95):**
  * VOL-V09-V10-RESTATEMENTS-001 [restatements; -] New decoration as one group of rerollLayer style.jitter then style.crowns at salt + 1, spelled out in the §1b hooks cell → **state it once at V09 §4.5 T12 (J-V9.115); also V10 §4.1 T12 row (V10-0490); every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-002 [restatements; -] the three load outcomes (upgrade offer, frozen view, open its recipe) restated in the §1b hooks cell → **state it once at base §2.9 Load steps 2-3; base §6.4 retention; every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-003 [restatements; -] ClerkSlot / ClerkMount / ClerkHandle members restated in the §1b hooks cell → **state it once at V10 §2.6 members; V08 §3.1 bridge messages; every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-004 [restatements; -] AppPrefs.history defaults 256 desktop, 96 low-end tier, frames 8 (V06 in turn cites V09: circular) → **state it once at V06 §2.2 (history store); every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-005 [restatements; -] the same history-store defaults a second time in Settings, History → **state it once at V06 §2.2; every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-006 [restatements; -] first-map law about 124-145 ms at the default TOWN → **state it once at base §1.2; §12.5 TOWN row; every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-007 [restatements; -] all six within 1 s at TOWN; the model law about 2.3 s at METROPOLIS top → **state it once at base §7.8; §12.5; every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-008 [restatements; -] the first-map law 124-145 ms again in the §6.1 T1 budget row → **state it once at base §12.5; every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-009 [restatements; -] quoted panel lines in V9 §4.17 and §4.20.6, with a precedence rule for when they drift → **state it once at V10 §3.9a (info.under.*, info.catacomb.*, info.crypt.* rows); every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-010 [restatements; -] dashed kerbs at 40 % alpha, no fill, no light, only its system label → **state it once at V04 §5.2 unexcavated style; every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-011 [restatements; -] DigRule.maxM 20 m → **state it once at V04 DigRule / V11 table (rule R-c); every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-012 [restatements; -] terrace.stepMinCm 60 cm, terrace.slopeMin 0.15 → **state it once at V11 terrace table (R-c); every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-013 [restatements; -] terrace.retainingReachM 15 m (also V09-0623 flatDepthM 12 m, V09-0624 coverShare 0.8): two homes → **state it once at V11 terrace table (XV-V9-13 met there); every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-014 [restatements; -] aqueduct.sourceReachKm 10 km, aqueduct.gradient [0.0003, 0.003] → **state it once at V11 aqueduct table (R-c); every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-015 [restatements; -] the step sampling every 2 m, plus or minus 3 m, and the effects cap 50 (V09-0629) homed in the application volume → **state it once at base dry run (§7.1 item-110 text, BCR-V9-27 PreviewResult) or V11; every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-016 [restatements; -] terrace brush radius 25 m: V09 cites V10 for the default while V10 calibrates it against V09 (circular) → **state it once at V10 §2.10 content.encoders (V10-0186); every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-017 [restatements; -] the family-multiplier ladder Ignore 0, Less 0.5, Normal 1, More 2, Much more 3 stated twice in V09 → **state it once at V09 §2.6 (V09-0130); every other place cites it**
  * V09-RESTATE-1 [restatement_findings; minor] Several §1b cells restate mechanisms owned elsewhere instead of citing them: row 'New decoration' spells out 'one group of rerollLayer { concern: 'style.jitter' } then rerollLayer { concern: 'style.crowns' }, each at the concern'… → **Cells name producer/consumer by section only; the mechanism's text lives once (V9 §3.7 for New decoration, §2.9 for load).**
  * V09-RESTATE-2 [restatement_findings; minor] AppPrefs.history restates V06's per-device history-store defaults ('default 256 desktop, 96 on the low-end tier'; frames default 8) that V06 states at its line 685; V06 line 3274 in turn cites 'V09's settings' — a circular two-ho… → **One home: V06 §2.2 owns the defaults (it defines the store); V09's field comment cites it without the numbers (or the reverse, ruled once).**
  * V09-RESTATE-3 [restatement_findings; minor] Base budget values are restated with their numbers instead of cited: the first-map law '≈ 124-145 ms at the default TOWN' (§1.2 line 355 and §12.5's TOWN row own it), 'all six within 1 s at TOWN' (§7.8 owns it), 'the model law re… → **Cite §12.5 / §7.8 without the numbers ('within §12.5's first-map law'), or state the numbers only at the base home.**
  * V09-RESTATE-4 [restatement_findings; minor] 'The quoted panel lines of V9 §4.17 and §4.20.6 … where a quotation there and the owning volume's text differ, the owning volume's text is the one shipped' — the volume restates other volumes' sentences (V10 §3.9a's info.under.*/… → **Replace the quotations in §4.17/§4.20.6 by the row keys (cite V10 §3.9a), and drop the precedence sentence.**
  * V09-RESTATE-5 [restatement_findings; minor] V04's values and styles are restated with their numbers: the unexcavated style 'dashed kerbs at 40 % alpha, no fill, no light, only its system's label' (V4 §5.2 owns it, V04 line 2552) and 'DigRule.maxM (20 m)' (a table value hel… → **Cite V4 §5.2's unexcavated style and DigRule.maxM by name only; the value lives in V11's table.**
  * V09-RESTATE-6 [restatement_findings; minor] Rule R-c of file f (volume 11 owns values) is not followed: the table restates V11 cells with their numbers (terrace.stepMinCm 60 cm, terrace.slopeMin 0.15, aqueduct.sourceReachKm 10 km, aqueduct.gradient [0.0003, 0.003]) and giv… → **Cite V11's cells by name without numbers; move dry-run constants (sampling, effects cap) to their engine home (the base's item-110 section / BCR-V9-27's PreviewResult text) or V11's table; keep in V09 only shell constants (closing radius, preview-on-release km if the shell reads it, tierStep snap).**
  * V09-DUP-1 [internal_duplications; minor] The five-step family-multiplier ladder 'Ignore 0 · Less 0.5 · Normal 1 · More 2 · Much more 3' is stated twice inside V09 (and glossed a third time in V10 §2.12 line 975); one home suffices. → **Keep the ladder at V9 §2.6; §4.7 and V10 cite it.**
  * V09-ICONF-1 [internal_conflicts; minor] The heading reads 'The four classes of state' while the table lists five classes (canonical, document view state, machine preferences, local store, session-transient). → **Retitle 'The five classes of state' (or merge machine preferences and local store if the canon rules them one class; they differ in stores and writers, so keep five).** — *closed by:* conflict ruling V09-ICONF-1
  * V09-ICONF-2 [internal_conflicts; minor] The rule says every EditEvent kind is 'reached from exactly one home tool', but the table homes the same kind at several tools: split and merge at T5 (districts, line 1470) and T9 (ways line 1466, plots line 1484); delete at T10 … → **State the unit precisely — one home tool per (event kind, target class or path) — and key the table and T-V9-12 on that pair.** — *closed by:* conflict ruling V09-ICONF-2
  * V09-ICONF-3 [internal_conflicts; major] §4.20.5 (4) opens 'Withdrawn by J-VI.4 … these are bends, not refusals' and then says the stack keys 'with bend.raised.island, bend.aqueduct.island, bend.raised.onIsland, bend.aqueduct.uphill and bend.retaining.rim … form V9 §4.9… → **Delete the withdrawn paragraph's leftover sentence and 'kept for the record' text; state once (at §4.9) that these ten keys are bends, and have T-V9-13 list them as bends.** — *closed by:* conflict ruling V09-ICONF-3
  * V09-ICONF-4 [internal_conflicts; minor] §4.15 says the link view 'draws each goods family with its own dash pattern (five patterns) besides its colour', while §5.4 draws links 'coloured by the good's family … dashed where the satisfaction is below 1' and impaired chain… → **Give each cue one channel: e.g. goods family = colour + dash pattern (five), satisfaction < 1 = reduced opacity or a hollow arrowhead, impaired chain = half width with gaps; state it once in §5.4 and cite from §4.15 (this also serves item 112 (a)'s second cue).** — *closed by:* conflict ruling V09-ICONF-4
  * V09-ICONF-5 [internal_conflicts; minor] J-V9.40 still reads 'chose to expand a dwelling declaration on a sealed void into a closure that digs a way down …, else opens the nearest public opening, and to refuse only when neither exists', while §4.17.4 step (4) and J-V9.1… → **Amend J-V9.40's text to the four-step ladder (or mark it 'amended by J-V9.102') so the decision and §4.17.4 agree.** — *closed by:* conflict ruling V09-ICONF-5
  * V09-XAGREE-1 [cross_part_conflicts; major] V09 and V11 disagree on the shape of the two document-only tables: (1) V09 writes a kind key 'cls:<class>' (a roster class no dossier record binds); V11 lists three key forms only (uid:, cat:, use:); (2) V09 writes split:false an… → **Rule the tables' shape once at V11 §4.2 (the owner of the tables): add cls: and avoid, and state which cells each key form admits; V09 §2.6 cites it and maps each screen to a cell V11 declares; mark XV-V9-1/2 closed.** — *closed by:* conflict ruling V09-XAGREE-1
  * V09-XAGREE-2 [cross_part_conflicts; major] V09's crypt bend clamps another church's crypt enlarged past the cathedral's 'just short of it' ('this one stops just short of it', bend.crypt.largest) and says 'V03 computes (e) (XV-V9-5)'; V03 caps every non-principal crypt at … → **Rule at V03 §3.7.4 (the crypt's owner): an enlarging edit bends to the rankShare cap (words 'stops at {share} of the cathedral's'), the cathedral's crypt removal keeps its smallest lawful size; V09 §4.17.5 (e) and bend.crypt.largest cite and word it; close XV-V9-5.** — *closed by:* conflict ruling V09-XAGREE-2
  * V09-XCONF-1 [cross_part_conflicts; major] BCR-V9-3's new §2.9 text defines workingLayer as 'the layer the tools act on — ground, a sky island's PlatKey, or an underground depth band', while V9 §2.4 types WorkingLayer as {layer 'ground'} / {layer 'sky'; key} / {layer 'und… → **Correct BCR-V9-3's text (and file f item 277's application) to 'ground, a sky island's PlatKey, or the underground (its band the view key depthBand)'.** — *closed by:* conflict ruling V09-XCONF-1
  * V09-XAGREE-3 [cross_part_conflicts; major] V02 names its stacked-massing and deck bends bend.tiers.stepped, .none, .axial, .internal, .count, .step, bend.stack.groundWing, .roof, .base, bend.deck.single, bend.deck.basement, bend.building.remove, bend.wing.grow, bend.famil… → **Take V2 §1b's bend ids as the one set (V02 owns the dry run): write one §4.9 row per V02 id with its words and buttons, retire V09's unmatched keys (or V02 adopts them by a ruling), and re-point T-V9-59 and §4.20.5.** — *closed by:* conflict ruling V09-XAGREE-3
  * V09-J121-1 [standing_rule_conflicts; major] The plain-words text says the assistant 'asks for your own key to the AI service before anything leaves your computer' and 'stops at the monthly limit you set'; OWNER RULING J121 and the delegated decisions (V10 Q1: the user's ow… → **Reword to read SettlementForge's AI setup as an input (J121); the standalone key entry survives only as the standalone case if the canon so rules; cite J121/J122.** — *closed by:* conflict ruling V09-J121-1
  * V09-J121-2 [standing_rule_conflicts; minor] J121 makes hosting, web origin and accounts follow SettlementForge's product decisions, and J122 decided 'two people editing one map at once: not now; revisit with the live party map after M-SF'; the out-of-scope line states 'non… → **Mark as 'follows SettlementForge (J121)' for hosting/accounts and cite J122 for simultaneous editing.** — *closed by:* conflict ruling V09-J121-2
  * V09-J121-3 [standing_rule_conflicts; minor] Interface languages were ruled 'follows SettlementForge (J121)' in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md ('other interface languages'); the volume states the locale policy (English ships; locale files) as its own without r… → **Mark: which locales ship follows SettlementForge (J121); keep the locale-file mechanism as the carrier.** — *closed by:* conflict ruling V09-J121-3
  * V09-J121-4 [standing_rule_conflicts; major] J121/J122 decided V10 Q1 ('the user's own API key or a relay: follows SettlementForge's AI setup') and V10 Q2 ('SettlementForge's assistant, driving our tool API'); the volume's shell does not say which clerkMode and configuratio… → **State that in the SettlementForge module the AI setup and assistant follow SettlementForge (J121/J122: clerkMode from SettlementForge's configuration; SettlementForge's assistant proposes through the host proposal path); the own-key card is the standalone case only.** — *closed by:* conflict ruling V09-J121-4
  * V09-J122-1 [standing_rule_conflicts; minor] J122 decided V09 Q2 in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: 'five SettlementForge users per round, recruited from its existing community; thanks by credit and early access, no payments'. The protocol still routes recruit… → **Write the decision into §7.3 (2) (source: SettlementForge's community; five per round within §13.4's five-to-eight; thanks by credit and early access, no payments; J122) and mark §11 Q2 answered.** — *closed by:* conflict ruling V09-J122-1
  * V09-J121-5 [standing_rule_conflicts; major] J121/J122 answered all three: Q1 (preview host) — 'follows SettlementForge's staging (J121)'; Q2 (participants and thanks) — 'five SettlementForge users per round, recruited from its existing community; thanks by credit and early… → **Mark Q1 and Q3 'follows SettlementForge (J121)' and Q2 'decided (J122): …'; drop the stale defaults; have §7.3 and the AP2 build step read SettlementForge's staging host and community as inputs.** — *closed by:* conflict ruling V09-J121-5
  * V09-EDGE-1 [undefined_edges; major] J-VI.4 (f) (docs/volumes/_integrate.md) bends a raised course that would cut a sky access's column or rope line, where skyAccessObstacles offers no re-route, to end at the last ground vertex before it ('this would cut {island}'s … → **Add bend.raised.skyAccess ('This would cut {island}'s hoist; it ends here.', Show me why) to §4.9, the case to §4.20.2 (6), and a T-V9-52 clause on a fixture with a hoist across the stroke.** — *closed by:* edge catalogue (EI-V09-EDGE-1)
  * V09-WGAP-1 [wiring_gaps; minor] Item 113 (e) adds a LOST state for a void whose every open link closed ('remembered as once known, drawn faded like an unexcavated void, until it is refound'), homed in V04; V09's panels, the Show hidden caves and ruins toggle, t… → **Name V09's consumer of the LOST state (legend line, panel line 'Once known; its way in closed in {year}', tier rule) when V04 writes item 113 (e); canon routes the part.** — *closed by:* wiring routing (V09-WGAP-1)
  * V09-WGAP-2 [wiring_gaps; major] The notes 'supersede any sentence of this volume that reads otherwise' but their content is absent from the body (each appears once, in the note): T9's tier shape chip, skirt and solid chips, shrine-inset handle, tier-0 centre an… → **Fold each note into its body home at build depth (toolkit rows, HandleSet kinds, binding rows, panel lines, BCR-V9-31 (a)) and resolve the two contradictions by the note (J-VI.17 is the integrator's ruling); then drop the notes.** — *closed by:* wiring routing (V09-WGAP-2)
  * V09-MISSING-1 [missing_parts; major] Item 111 names V09 for 'the tool' (and V10 for the explanations): T2 ground gains the oasis — 'the user adds or removes one with T2 ground (the lake's point-and-level form with a spring flag)' — and the arid water pull shows in t… → **Write V09's part at build depth: T2 Lake mode's spring flag (ToolParamRow, mapper drawWater {kind 'lake', from {points, levelCm}, spring: true}), binding row, history template ('Made an oasis at {place}'), badge line, why-card driver row for the water term, first-use hint, T-V9 bar; cite item 111 (…**
  * V09-MISSING-2 [missing_parts; major] Item 112 names V09 for 'the view settings, the trial's running': (a) every style and thematic view that encodes meaning in colour gets a second cue and a checked variant for the three common colour deficiencies, selectable in the… → **Add the view setting (a Dress/Settings chip: 'Colour vision: usual · red-weak · green-weak · blue-weak', a view key), the second cue per V09 thematic view, and a §7 protocol section for the pre-release GM trial (recruitment from SettlementForge's community, sessions, record to V12, release-gate bar…**
  * V09-MISSING-3 [missing_parts; major] Item 113 names V09 for 'the history option in the editor': a blueprint history option ('once a city, now a village') for standalone towns, the replay recorded for the clerk's story, and item 113 (e)'s LOST voids. V09's T1 Kind of… → **Write V09's part: T1 sheet chip 'History: none · once larger ({tier})' → adjust of the S0 history option, its whole-town ghost wording, the report panel's 'What its past left' lines, the effective-peak 'symbolic' chip on facts, and a T-V9 bar (history-first town edits and replays byte-identically);…**
  * V09-TERM-1 [terminology; minor] Volume citation forms are mixed inside one volume: 'V9 §x' for itself, 'V1-4.2' / 'V1-3.8' for V01, 'V2 §4.1', 'V03 §4.5', 'V4 §3.5', 'V04 §1b', 'V05 §4.2', 'V6 §5.1', 'V06 §2.2', 'V07 §4.2', 'V08 §5.1', 'V10 §2.13', 'V11 §4.2'; … → **Canon: one citation form for volume sections across the set (Vnn §x.y); rewrite every V9/V1-/V2/V4/V6 form.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V09-TERM-2 [terminology; minor] The underground bars carry milestone 'M6' ('M6 (with V04's U3b)', 'M6'); file f rule R-d (J-VI.22) rules that 'M6' is volume 2's stage 3 (M6a-M6c) and the underground layer's milestone is M6-U (V04 BCR-13). T-V9-65 already writes… → **Replace 'M6' by 'M6-U' in T-V9-33 … T-V9-38 (and any §8 row that places them).** — *closed by:* glossary (retired synonyms) / ID rulings
  * V09-TERM-3 [terminology; minor] The combined build plan (docs/volumes/INDEX.md lines 96, 118, 151; J122's recorded order '… then M6-sky') names the sky layer's milestone M6-sky; V09 names it only by V05's phase id P4, so the AP7 row does not resolve against §16… → **Name AP7's milestone 'M6-sky (with V05's P4)'.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V09-TERM-4 [terminology; minor] Several concepts carry more than one name inside the volume (principle (2)): the scoped regenerate is 'Try again' (the button), 'New random' (the base's action, mode newRandom), 're-roll' / 'scoped re-roll' and 'Rebuild … as gene… → **Canon glossary: one concept name each (e.g. 'scoped re-roll' = §7.1 New random; 'suppressing removal'; 'Re-derive'), UI words kept only as catalogue rows.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V09-DEFER-1 [deferral_wording; minor] 'The pre-decided fallback, if the coherence pass declines it: the fort stands on the bridgehead plot …' is a conditional left open for this pass; file f item 246 consolidates BCR-V9-30 (the deck plot's landmark slot, incl. the br… → **Drop the fallback sentence; cite file f item 246 / the base's deck-plot home for the mid-span slot.**
  * V09-DEFER-2 [deferral_wording; minor] Open items carried past the volumes pass for V09: seam-surfaces-r6 SR6-02 (effect lines on the clerk's card), SR6-03 (the indefinite-article argument form), SR6-06 (T-V9-15/T-V9-27's scope and SR6-01's drawer companion — the draw… → **Fix each in the body: §4.11 draws the actions from bends[].actions and lines[].actions and TurnView.refused; the effect lines on the proposal card; the article form; T-V9-15/T-V9-27's scope; name the confirming test in each provenance note (§4.20's constants table).**
  * V09-NARR-1 [narration; minor] Thirteen stacked 'PENDING FABLE REVIEW' banner lines (one per lane: V9-application, revise-V9 twice, reconcile-V09-r1..r6 and their continuations); principle (8) allows one marker line per volume, the close's. → **Replace by the close's single marker line.**
  * V09-NARR-2 [narration; minor] Two revision notes ('Revised in place against critique V09.md ... Decisions J-V9.33 on, requests BCR-V9-20 on ...', 'second round ... J-V9.58 on, BCR-V9-26 on, XV-V9-10 on, T-V9-51 on') and three PROGRESS / revision ledgers (abou… → **Remove; keep only the conventions paragraph without the pass history.**
  * V09-NARR-3 [narration; minor] Seam and critique ids are woven into normative sentences throughout the volume (SS-06, SS-16, SR-08, SR2-23, SR3-02, SR4-05 (b), SR5-07 (c), XV-V9-29, V9C-53 …) as the provenance of a clause ('its historyLines from host.state … (… → **Strip review-round ids from normative text; keep J-, D-, BCR- and T- ids that are design ids.**
  * V09-NARR-4 [narration; minor] The key column carries the rename history ('formerly …'), narration of how the text evolved (principle (5)). → **Drop '(formerly …)'.**
  * V09-NARR-5 [narration; minor] Critique finding ids (V9C-53 … V9C-81, V1C-85, C4-110-1, C4-110-6, C6-40 (2), V3C-73 (3), V3C-76 (3), C10-50 (4), C10-53, CVR-V10-7) are used as design references and in headings ('#### 4.20.1 … (item 110 (a); V9C-53)'); 'J-V9.76… → **Replace each critique id used as a reference by the owning section (V04 §x for the span rule and arch vaults, V06 §2.13 for the cap, V03 §x for plan effects); drop critique ids from headings.**
  * V09-NARR-6 [narration; minor] The decision rows narrate their history: withdrawn rows keep their full 'Former text' (J-V9.67, J-V9.76), 'withdrawn by the revision (V9C-03)' (J-V9.2, J-V9.25), amendment chains ('amended by J-V9.34', 'amended by J-V9.67 (withdr… → **Keep each id (unique, stable) with its current decision only: withdrawn rows reduced to 'Withdrawn (see J-VI.4).', amendment chains folded into the current text, critique/seam ids and J-V9.117's status note moved out.**
  * V09-NARR-7 [narration; minor] After its two core paragraphs, §12 narrates each review round ('The revision (revise-V9)', 'The second round', 'Reconciliation round 1' … 'round 6', each continuation) with what was read, md5s, landed times and which PLAUSIBLE cl… → **Fold the still-PLAUSIBLE constants and budgets into the core PLAUSIBLE paragraph; drop the per-round narration (the validation records keep it).**
  * V09-NARR-8 [narration; minor] The fix list narrates each round's disposition ('none is ruled invalid and none is deferred, so the list still holds no item'), and the appended sections are change logs of the review rounds (tables of seam ids and 'what changed'… → **Remove after folding the notes' normative residue into the body (see the wiring finding on the integration notes); §13 becomes empty or one sentence.**
  * V09-BREF-1 [broken_references; minor] Bare request ids 'BCR-34' and 'BCR-14' (and '(V04's BCR-34)' in one row) are unqualified; V04 numbers its requests BCR-n, and file f records 'V04 BCR-34 — carried in V04 BCR-14's DR17 cell; a pointer, no text of its own' (not an … → **Cite the derivation rows by their §7.7 ids and V04 BCR-14 (file f item) — drop the pointer 'BCR-34'.**
  * V09-BREF-2 [broken_references; minor] 'V1C-09's opening place' cites a critique finding id (critique-V01's V1C-09) as the home of a design fact; the opening place is defined in V01 §3.5.12 / its Openings paragraph (V01 line 1573). A critique id is a validation record… → **Cite V01 §3.5.12 (the catacomb's opening place) instead of V1C-09.**
  * V09-BREF-3 [broken_references; major] The volume's convention says 'a section sign (§) points into the base', but lists continue a volume citation with bare signs ('V08 §5.1, §4.4, §3.1', 'V03 §4.5, §4.1', 'V9 §4.11, §3.12, §5.10, §5.12'). A census of the body finds … → **Write the volume prefix on every section number (one form, e.g. 'V09 §x'), or state the list rule once in the canon and have the reference checker apply it; fix the 154 references.**
  * V09-HANDOFF-1 [handoffs_to_canon; minor] Four hand-offs remain unclosed at their destinations: XV-V9-3 — V04 line 475 still lists showUnexcavated under setLayer at T12 (rows 400 and 979 have it as the view key); XV-V9-16 (a) — V05 lines 409, 779, 2152 still read 'T9's d… → **Close each at its destination (V04 row 475; V05 §1b/§2.1/§4.2 rows; V5 §3.22 (4) geometry; V11 row 87) or rule the disagreement; then mark them Met in V9 §10.2.**
  * V09-HANDOFF-2 [handoffs_to_canon; minor] These requests are met at their destinations (V04 line 3794 under/wayIn; V07 line 4206 showCircuit; V11 lines 688-689 retainingReachM, flatDepthM; V04 line 404 archVault; V03 line 403 basement/crypt/ring) but V9 §10.2 still state… → **Mark them Met with their destination sections (and drop the 'Was:' narration that the Met rows carry).**
  * VOL-V09-V10-EQUIVALENCES-001 [equivalences; -] V10-ELEG-2 — *closed by:* glossary (retired synonyms) / ID rulings
  * VOL-V09-V10-EQUIVALENCES-002 [equivalences; -] V10-ELEG-1 — *closed by:* glossary (retired synonyms) / ID rulings
  * VOL-V09-V10-EQUIVALENCES-003 [equivalences; -] V09-TERM-4 — *closed by:* glossary (retired synonyms) / ID rulings
  * VOL-V09-V10-EQUIVALENCES-004 [equivalences; -] V09-TERM-4 — *closed by:* glossary (retired synonyms) / ID rulings
  * VOL-V09-V10-EQUIVALENCES-005 [equivalences; -] V09-TERM-4 — *closed by:* glossary (retired synonyms) / ID rulings
  * VOL-V09-V10-EQUIVALENCES-006 [equivalences; -] V09-DUP-1 — *closed by:* glossary (retired synonyms) / ID rulings
  * VOL-V09-V10-EQUIVALENCES-007 [equivalences; -] V10-XAGREE-3 — *closed by:* glossary (retired synonyms) / ID rulings
  * VOL-V09-V10-EQUIVALENCES-008 [equivalences; -] V10-XAGREE-2 — *closed by:* glossary (retired synonyms) / ID rulings
  * VOL-V09-V10-EQUIVALENCES-009 [equivalences; -] V09-XAGREE-3 — *closed by:* glossary (retired synonyms) / ID rulings
  * VOL-V09-V10-EQUIVALENCES-010 [equivalences; -] V09-TERM-2, V09-TERM-3 — *closed by:* glossary (retired synonyms) / ID rulings
  * VOL-V09-V10-EQUIVALENCES-011 [equivalences; -] ruled, not a defect — *closed by:* glossary (retired synonyms) / ID rulings
  * SR6-02 [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-surfaces-r6.md SR6-02 → **The clerk card's effect lines draw Show only (J-SS6.4); V09 §4.11 states it.**
  * SR6-03 [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-surfaces-r6.md SR6-03 → **V09 §2.9's argument forms gain the one English indefinite form {a <slot>} (J-SS6.3); V08's templates carry no article (SR6-07 closed).**
  * SR6-06 [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-surfaces-r6.md SR6-06 → **T-V9-15's and T-V9-27's scope and SR6-01's drawer companion as the seam states them.**
  * SCC-115 [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-content-calibration-r6.md SCC-115 → **The three provenance notes name their confirming test (V12 §3.11's rule for calibrate-later application constants).**
  * V09:IN-V09-1 [integration-note; minor] * **IN-V09-1 (J-VI.1, clean-room).** The handle kind is renamed `'towerResize'` (one line); its former name coincided with a reference export field and is not repeated here (reworded by the continuation, J-VI.23). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-2 [integration-note; minor] * **IN-V09-2 (J-VI.4; item 101 R2).** The "added refusal class" is withdrawn: J-V9.67 is marked withdrawn, §4.9's sentence and §4.20.5 (4) were edited in place, T-V9-13's list reads the `bend.*` keys. The rows `refuse.raised.isla… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-3 [integration-note; minor] * **IN-V09-3 (J-VI.2, J-VI.3).** The raised-way reason words are `drop`, `link`, `water` (and `declared`); the preview's closure-arc barrier kinds are `shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte` (edited in place). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-4 [integration-note; minor] * **IN-V09-4 (J-VI.5; volume 2's X21).** T9's tier controls also carry, from volume 2's second revision: the **shape** chip (V02's tier-0 shapes), the **skirt** and **solid** chips (a tier's skirt and its solid form), a **shrine-… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-5 [integration-note; minor] * **IN-V09-5 (J-VI.17 H5; volume 2's X10).** The style panel offers the `FM` building look; the tool rows for `setComposition room`, the secondary porch and `moveTower { shape }` exist on T9 `shape`; the advanced panel carries th… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-6 [integration-note; minor] * **IN-V09-6 (J-VI.17 H23; volume 4).** T9 `shape` shows a raised way's span `use` (open or vault, a held `setAttr`) and a ruin monument's count (`setAttr` on `monument/count`). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-7 [integration-note; minor] * **IN-V09-7 (J-VI.17 H24; X-V12-6, X-V12-8).** The tables editor's cell inspector reads `dist/evidence.json` — the status in plain words ("the owner's rule" for a stamped cell) and the evidence lines; the preset dialog lists the… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-8 [integration-note; minor] * **IN-V09-8 (J-VI.8; applied in place by reconciliation round 2, SR-15).** `deck.landmarkMinSpanM` names volume 11's cell `deck.landmarks/bridgeMid/minSpanM` (40 m); it is not a constant of this volume. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-9 [integration-note; minor] * **IN-V09-9 (J-VI.17).** `ClerkHandle.send`'s entries are volume 10's five (`help` added in place). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-10 [integration-note; minor] * **IN-V09-10 (J-VI.14).** The delete row's "kept removed" line for a raised way, an island, an access, a harbour chain or a quay wall reads the one suppression mechanism (file f). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-11 [integration-note; minor] * **IN-V09-11 (J-VI.18).** BCR-V9-31 (a)'s GeoJSON names follow file f item 447's one text for both variants: each support a Polygon of kind `raisedSupport` (with `key` and `state`), a retaining wall of kind `retaining` (edited i… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-12 [integration-note; minor] * **IN-V09-12 (J-VI.22).** AP6 and XV-V9-8 name volume 4's milestone **M6-U** (edited in place); "M6c" stays volume 2's. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-13 [integration-note; minor] * **IN-V09-13 (J-VI.23, clean-room).** IN-V09-1 no longer names the retired handle kind (its former name coincided with a reference export field). No meaning changed. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-14 [integration-note; minor] * **IN-V09-14 (J-VI.27).** The **Deck height** and **Arch spacing** steppers (§4.20) edit file f item 244's held fields `clearanceCm` and `spanSpacingCm`; item 244's support step and the course solver read them, so an edit re-lay… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-15 [integration-note; minor] * **IN-V09-15 (J-VI.4 applied in the text).** BCR-V9-26 (b)'s last sentence read that a raised stroke ending on an island's rim or lying on its key "is refused with volume 5's refusal and its offer"; it now reads that it is bent … → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V09:IN-V09-16 [integration-note; minor] * **IN-V09-16 (J-VI.30, item 101 R2).** The message rows `refuse.noSite`, `refuse.overBudget` and `refuse.vacateFirst` are now `bend.place.noSite`, `bend.place.overBudget` and `bend.vacate`: a user's placement that no plot here f… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**

### V10

* **Size:** 84658 words; the goal band after: 50795–63494 words; narration ranges alone 13054 words; 31 restatements to references; 23 BCR blocks to pointers.
* **STATE:** 644 facts (canon.json → units.V10.state); 57 index rows.
* **HISTORY OUT:** V10-0779, V10-0780.
* **REFERENCE (31):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | V10-0121 | determinism §7.1 | — (section) |
  | V10-0140 | scope §14 | — (section) |
  | V10-0144 | V09 V09 §4.8 | V09-0300 (fact) |
  | V10-0163 | V09 V09 §9 | V09-0954 (fact) |
  | V10-0169 | V11 V11 §9 | V11-0600 (fact) |
  | V10-0200 | rendering §11.2 | — (section) |
  | V10-0201 | rendering §11.2 | RENDERING-0370 (near) |
  | V10-0202 | rendering §11.2 | RENDERING-0016 (near) |
  | V10-0203 | rendering §11.2 | — (section) |
  | V10-0204 | rendering §11.2 | — (section) |
  | V10-0205 | model §2.13 | MODEL-0476 (near) |
  | V10-0214 | V01 (the editor finds the section) | — (section) |
  | V10-0300 | V09 V09 §2.9 | V09-0142 (fact) |
  | V10-0339 | pipeline §4.7 | PIPELINE-0556 (near) |
  | V10-0340 | pipeline §4.5 | — (section) |
  | V10-0341 | V04 V04 §2.6 | V04-0077 (fact) |
  | V10-0342 | V04 V04 §2.2 | V04-0062 (fact) |
  | V10-0343 | V04 V04 §9 | V04-0286 (fact) |
  | V10-0344 | V04 V04 §3.5.7 | V04-0140 (near) |
  | V10-0345 | V04 V04 §1b.1 | V04-0031 (near) |
  | V10-0346 | V04 (the editor finds the section) | — (section) |
  | V10-0347 | V04 V04 §9 | V04-0316 (near) |
  | V10-0348 | V04 V04 §2.2 | V04-0063 (fact) |
  | V10-0349 | V04 V04 §3.5.1 | V04-0125 (fact) |
  | V10-0350 | V04 (the editor finds the section) | — (section) |
  | V10-0351 | V03 V03 §9 | V03-0393 (fact) |
  | V10-0352 | V03 V03 §9 | V03-0427 (near) |
  | V10-0353 | V03 V03 §9 | V03-0368 (near) |
  | V10-0354 | V03 V03 §3.7.2 | V03-0234 (near) |
  | V10-0355 | V03 V03 §9 | V03-0364 (near) |
  | V10-0410 | V08 V08 §5.4 | V08-0126 (fact) |

* **Its §10 requests → one-line pointers to the applied f items (23):** BCR-V10-1 → item 468; BCR-V10-2 → item 311; BCR-V10-3 → item 270; BCR-V10-4 → item 297; BCR-V10-5 → item 469; BCR-V10-6 → item 470; BCR-V10-7 → item 473; BCR-V10-8 → item 518; BCR-V10-9 → item 538; BCR-V10-10 → item 531; BCR-V10-11 → item 487; BCR-V10-12 → item 348; BCR-V10-13 → item 471; BCR-V10-14 → item 519; BCR-V10-15 → item 271; BCR-V10-16 → item 365; BCR-V10-17 → item 366; BCR-V10-18 → item 367; BCR-V10-19 → item 481; BCR-V10-20 → item 368; BCR-V10-21 → item 290; BCR-V10-22 → item 572; BCR-V10-23 → item 571.
* **BCR blocks → pointers (23):** BCR-V10-1 → item 468; BCR-V10-2 → item 311; BCR-V10-3 → item 270; BCR-V10-4 → item 297; BCR-V10-5 → item 469; BCR-V10-6 → item 470; BCR-V10-7 → item 473; BCR-V10-8 → item 518; BCR-V10-9 → item 538; BCR-V10-1 → item 468; BCR-V10-11 → item 487; BCR-V10-12 → item 348; BCR-V10-1 → item 468; BCR-V10-14 → item 519; BCR-V10-15 → item 271; BCR-V10-16 → item 365; BCR-V10-17 → item 366; BCR-V10-18 → item 367; BCR-V10-19 → item 481; BCR-V10-20 → item 368; BCR-V10-21 → item 290; BCR-V10-22 → item 572; BCR-V10-23 → item 571.
* **Terms to replace:** G-cite (V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 … → Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y; 288 hits, first lines [239, 277, 302, 327, 347, 358]); G-DR (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8 → DR26–DR35 (ID-DR); 2 hits, first lines [442, 443]); G-newrandom (scoped re-roll, Try again (in prose), Rebuild … as generated → New random (§7.1); 'Try again' is only its catalogue label; 'reroll' only for rerollLayer; 4 hits, first lines [253, 2486, 2566, 3915]); G-suppress (kept removed, the removal holds, Removals that hold (in design prose) → suppression (file f item 260); 1 hits, first lines [3348]); G-clerkhandle (ClerkHarness → ClerkHandle; 14 hits, first lines [237, 238, 328, 380, 389, 392]).
* **Conflicts it resolves (18):** DIC-06, DIC-07, DXC-04, MC-11, SCOPE-C07, SCOPE-C16, V09-XAGREE-1, V09-XAGREE-3, V10-XAGREE-1, V10-XAGREE-2, V10-XAGREE-3, V10-XAGREE-4, V10-J121-1, V10-J121-2, V10-J121-3, CANON-C02, CANON-C03, CANON-C04.
* **File f items that concern it (cite as base text):** 238, 246, 260, 270, 271, 290, 297, 311, 339, 348, 362, 365, 366, 367, 368, 460, 461, 463, 464, 465, 466, 468, 469, 470, 471, 473, 481, 487, 516, 518, 519, 531, 538, 568, 570, 571, 572, 582, 583.
* **File g parts it writes or applies:**
  * item 111: the explanations: why rows for the water pull and the oasis ('why is this quarter here / rich')
  * item 113: the story told ('the walls were built when this was a city of twelve thousand'; 'its exact size is not recorded' for a symbolic peak)
* **Wiring gaps it closes:** W-IF-01, W-IF-02, W-IF-03, W-IF-05, W-PKG-01, W-EDIT-01, W-FLD-12, V05-WGAP-2b, V06-WGAP-1b, V10-WGAP-1.
* **Elegance rulings it applies:** E-04, E-07, E-17, E-24, E-28, E-32, E-33.
* **Id rulings it applies:** ID-BCR, ID-TOOL, ID-LAYER, ID-WX, ID-DUPDEF.
* **Owner questions to mark answered:** Q1 — follows SettlementForge's AI setup (J121); Q2 — J122/J121: SettlementForge's, driving our tool API; Q3 — follows SettlementForge (J121); a cheaper tier is evaluated before any switch; Q4 — J122: yes; Q5 — J122: a budget cap of about US$790–1 190 through M3c, spent in stages (smallest tier first, the full suite at M3c's exit), each spend shown to the owner first.
* **Cohesion checks:** see *Cohesion checks* (every volume).
* **Disagreements (agreement.md):** `WhyPull` with V01 (V10-XAGREE-2); `SettlementForge` with V08 (SCOPE-C07); `EditEvent` with V09 (DXC-04); `SettlementForge` with V09 (SCOPE-C07); `T-V9-15` with V09 (V09-XAGREE-3); `BCR-V10-20` with V09 (DXC-04); `EditEvent` with determinism (DXC-04); `SettlementForge` with scope (SCOPE-C07).
* **Its own Fix list (§13) and hand-off rows — every item fixed in the text (or marked for the adjudicator with its reason); §13 keeps no open item:** V10-0748, V10-0749, V10-0750, V10-0751, V10-0752, V10-0753, V10-0754, V10-0755, V10-0756, V10-0757, V10-0758, V10-0759, V10-0760, V10-0761, V10-0762, V10-0763, V10-0764, V10-0765, V10-0766, V10-0767, V10-0781.
* **Hand-offs to close here (21):** V06:X7, V06:X17, V06:X30, V06:X48, V08:X11, V09:XV-V9-6, V09:XV-V9-7, V09:XV-V9-8, V09:XV-V9-10, V09:XV-V9-11, V09:XV-V9-12, V09:XV-V9-18, V09:XV-V9-19, V09:XV-V9-22, V09:XV-V9-30, V11:X-V11-3, V11:X-V11-14, V12:X-V12-7, V12:X-V12-8, V12:X-V12-18, V12:X-V12-16 (agreement.md lists each).
* **Edges (edges.md):** 51 UNDEFINED, 14 UNTESTED; 8 UNDEFINED combinations it owns.
* **Open findings routed here (39):**
  * VOL-V09-V10-RESTATEMENTS-018 [restatements; -] the same ladder glossed a third time in V10 §2.12 ShapeInput.siting.weights → **state it once at V09 §2.6; every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-019 [restatements; -] New decoration group restated in the V10 §4.1 T12 encoder row → **state it once at V09 §4.5 T12; every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-020 [restatements; -] thorp 40, hamlet 200, village 700 typical populations in the default lexicon → **state it once at V07 §2.1 rung table; every other place cites it**
  * VOL-V09-V10-RESTATEMENTS-021 [restatements; -] the catacomb rank cap 0.9 in the clerk catacomb row → **state it once at V04 CatacombRule rankCap / V11 table (R-c); every other place cites it**
  * V10-RESTATE-1 [restatement_findings; minor] The rows restate V07's typical populations with their numbers ('40 (V07 §2.1's THORP typical)', '200 (V07's HAMLET typical)', '700 (V07's VILLAGE typical)'); a change to V07's rung table would leave the lexicon stale. → **Cite V07 §2.1's typical value by rung (a row value 'the rung's typical population'), no number.**
  * V10-RESTATE-2 [restatement_findings; minor] The rank cap's value (0.9) is restated in the clerk's row; the value is V04's CatacombRule rankCap (V04 line 844/858), which rule R-c places in V11's table. → **Name the cap (rankCap) without the number.**
  * V10-XAGREE-1 [cross_part_conflicts; major] V10's link op 'avoid' is written as conditional on V11 carrying the cell, and V11 §4.2 does not carry it (cells {bindTo?, cut?}; see the V09/V11 table-shape finding). The clerk's encoder and the canvas's 'Cut this link' (V09 §4.7… → **Once V11 §4.2 rules the linkEdits cells (avoid added), drop the condition in V10 §2.12 and cite V11 §4.2.** — *closed by:* conflict ruling V10-XAGREE-1
  * V10-XAGREE-2 [cross_part_conflicts; major] WhyPull.family is typed WhyFamily (V11's eight plus nine score terms), but V01's providers emit WhyPulls of families SUNLIGHT, EMITS, SENSITIVE; V10 keeps a translation note ('they read as sun, nuisance and nuisance') and asks V0… → **V01 names its pushes by V11's family ids (sun, nuisance) as CVR-V10-6 asks; V10 drops the shim note; mark CVR-V10-6 met.** — *closed by:* conflict ruling V10-XAGREE-2
  * V10-XAGREE-3 [cross_part_conflicts; minor] The same size words map to different populations on the two surfaces: the clerk's lexicon fixes 'small town' 2 500, 'town' 5 000, 'large town' 8 000, 'small city' 12 000, 'city' 20 000, 'large city' 28 000, 'metropolis' 50 000, w… → **One rule for the size words (the chips' quantile rule read from the rung table) serving the chips and the lexicon; the lexicon rows name the quantile, not a number.** — *closed by:* conflict ruling V10-XAGREE-3
  * V10-XAGREE-4 [cross_part_conflicts; major] Three texts disagree on a church on wet ground: V10's crypt section words it 'no crypt: ledger slabs in the chancel floor'; V09 §4.17.5 says 'V03's wet-ground fold reads "floor vaults (wet ground)"' as a crypt form on the church'… → **Rule at V03 §3.7.4 (the crypt's owner): wet ground gives a raised-choir crypt for an always class and no crypt with ledger slabs otherwise; V10 §3.9a words both; V09 §4.17.5 cites the rows (dropping 'floor vaults').** — *closed by:* conflict ruling V10-XAGREE-4
  * V10-J121-1 [standing_rule_conflicts; major] The plain words fix the provider and key path ('runs on Claude, Anthropic's model … you paste your own Anthropic API key … or the program that embeds the map … provides the connection, or uses its own assistant instead'); J121/J1… → **Reword: in the SettlementForge module the assistant, its AI setup and model tier are SettlementForge's (J121/J122) and drive the map's tool API through the host seam; the built-in clerk with a user's key is the standalone case; cite J121/J122.** — *closed by:* conflict ruling V10-J121-1
  * V10-J121-2 [standing_rule_conflicts; major] J121 answered the relay question (V10 Q1: follows SettlementForge's AI setup) and J122 chose SettlementForge's assistant driving our tool API (V10 Q2) for the SettlementForge module, i.e. configuration C there; the volume still l… → **State SettlementForge's configuration as the one its AI setup decides (J121; J122: C, SettlementForge's assistant through the host seam), keep A and B for the standalone product and generic hosts, and word the notice with the provider read from the deployment's setup; mark Q1 answered.** — *closed by:* conflict ruling V10-J121-2
  * V10-J121-3 [standing_rule_conflicts; major] J121/J122 answered all five (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md): Q1 key or relay — follows SettlementForge's AI setup (J121); Q2 — SettlementForge's assistant, driving our tool API (J121); Q3 model tier — follows Settl… → **Mark each answered with its ruling (J121 / J122) and write the decided staging of the evaluation spend into §7.3's schedule; drop the recommendation text.** — *closed by:* conflict ruling V10-J121-3
  * V10-ELEG-1 [elegance_candidates; minor] Two catalogue sentences exist for the clerk being unreachable: refuse.clerk.offline 'The assistant is offline; every tool still works.' (the turn's refusal, V10 §3.16, used by V9 §3.14's clerk row) and error.clerkOffline 'The ass… → **Rule one row (refuse.clerk.offline) for both, or state the distinct code that error.clerkOffline renders and its producer; if none, retire it (equivalence: same condition, same user outcome).** — *closed by:* elegance ruling (E-list)
  * V10-ELEG-2 [elegance_candidates; minor] 'type ClerkHarness = ClerkHandle' is an alias with no member of its own (J-V10.57 superseded, XV-V9-18): one interface carries two names across the pair (ClerkHandle 25 times in V09 and 22 in V10; ClerkHarness 13 times in V10, on… → **Use ClerkHandle everywhere and drop the alias (the implementation is 'createClerk(mount)', which already names the construction).** — *closed by:* elegance ruling (E-list)
  * V10-EDGE-1 [undefined_edges; major] V10 says that when a creation proposal replaces the untouched empty-state town 'the old handle closes — nothing is lost, the old town being its seed and still in the recent documents (R15)', and V09 §4.11 says 'the old one stays … → **Rule the edge once: either the replaced empty-state town is written to Recent (a recipe-only record: seed and recipe, no snapshot) or it is dropped as V09 §3.2 drops it on Surprise me; make V09 §3.2, §4.11 and V10 §4.2 (3) say the same, with a bar.** — *closed by:* edge catalogue (EI-V10-EDGE-1)
  * V10-WGAP-1 [wiring_gaps; minor] Three encoder constants live outside clerk.content, the table that holds every other encoder constant: the islet's default sizeM2 2 000 m² ('our own, calibrate-later'), the fill scope ring's 32-gon, and the green's 24-gon written… → **Add islet sizeM2 and the scope ring's sides to clerk.content.encoders (with provenance), and have the green read encoders.ringSides.** — *closed by:* wiring routing (V10-WGAP-1)
  * V10-MISSING-1 [missing_parts; major] Item 111 names V10 for 'the explanations': the oasis (a spring-fed pond with its grove and irrigated gardens, from a dossier's oasis_water or the arid row's chance, or T2's spring flag), the arid WATER PULL on growth and the pros… → **Write V10's part at build depth: the lexicon rows (oasis, desert, arid), the ground encoder's spring flag on op 'lake', the prosperity provider's water term words and the sun term's arid reading, an oasis fact with its DR row when dossier-bound, an eval case and a T-V10 bar; cite item 111 (a)-(c).**
  * V10-MISSING-2 [missing_parts; major] Item 113 names V10 for 'the story told': the history-first replay 'is recorded so the clerk can tell the story ("the walls were built when this was a city of twelve thousand")'; an effective peak is marked symbolic and the clerk … → **Write V10's part: a history section (or V06's move section extended) reading the replay record, the symbolic-peak row and its words, the lost-void and former-settlement-ruin rows in the underground section, prompt rule 6's number rule applied to peak figures, eval cases and T-V10 bars; cite item 11…**
  * V10-TERM-1 [terminology; minor] The volume's own convention (header: 'V0n §x another volume's') is not kept: V09 is cited as both 'V09 §' and 'V9 §', V06 as 'V06 §' and 'V6 §', V05 as 'V05 §' and 'V5 §', V04 as 'V04 §' and 'V4 §'; principle (1) wants one form a… → **Canon's one citation form (Vnn §x.y) everywhere.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V10-DEFER-1 [deferral_wording; minor] Two design dependencies are carried as 'until it lands' conditionals; V11 already enumerates stepped_temple / terraced_palace / tiered_tower (9 hits), so CVR-V10-12's clause is stale, and CVR-V10-13 is open with a fallback. The z… → **Mark CVR-V10-12 met with V11's section; close or rule CVR-V10-13 (see the V01/V09/V10 ravine-quarter finding) and drop the conditional.**
  * V10-DEFER-2 [deferral_wording; minor] An open finding is carried on a fix list past the volumes pass: SR6-05 — 'the subject rule's wording against V9 §2.9, restated lists, two alternative keys, a status' (INDEX §7 calls it immaterial). The zero bar (FIX or INVALID) a… → **Fix SR6-05 in the body (the subject rule cites V9 §2.9's Where a button is not drawn; the restated lists replaced by citations; the two alternative keys reconciled; the status line corrected) and drop the fix-list line.**
  * V10-NARR-1 [narration; minor] Eight stacked 'PENDING FABLE REVIEW' banners, two revision notes (critique counts, 'Decisions J-V10.38 on, tests T-V10-29 on …', 'Item-110 fold … step R5b') and nine PROGRESS / REVISION / RECONCILIATION ledgers (about 110 lines) … → **Replace by the close's single marker line; drop the ledgers and revision notes.**
  * V10-NARR-2 [narration; minor] Seam and critique ids are woven into normative sentences and table cells (SS-10, SR-07, SR2-08, SR2-14, SR4-03, SR5-06 (a), C10-65, C8-02, TR-25 …) as the provenance of a clause; principle (5) moves them to the validation records. → **Strip review-round ids from normative text; keep design ids (J-, D-, BCR-, CVR-, T-).**
  * V10-NARR-3 [narration; minor] Decision rows narrate their history: J-V10.34 and J-V10.57 are kept with their full superseded text; J-V10.28 records '(88 until reconciliation round 5 added the what-if case, SR4-03)'; J-V10.101's classes are 'superseded by J-V1… → **Keep ids stable; reduce superseded rows to 'Superseded by J-V10.n'; fold amendments into the current text; move critique and seam ids to the validation records.**
  * V10-NARR-4 [narration; minor] Most of §12 narrates the review rounds ('Reconciliation round 1 … round 6', second briefs, 'V09's second round …') with md5s, landing times, reference counts and doc_checks deltas per round — how the text evolved (principle (5));… → **Keep one CONFIRMED paragraph of standing evidence and the PLAUSIBLE list; drop the per-round narration.**
  * V10-NARR-5 [narration; minor] The fix list narrates each round's disposition, and the appended sections are change logs of the review rounds (seam ids, 'what changed', 'Found in passing', md5s, landing times) — principle (5) narration. The integration notes' … → **Fold any residue into the body; remove the round logs; §13 becomes one sentence.**
  * V10-BREF-1 [broken_references; minor] There is no clerk.json: V10 §2.10 declares two tables, clerk.ops and clerk.content, in files clerk/ops.json and clerk/content.json (J-V11.82). → **Read 'every constant a clerk.ops or clerk.content cell'.**
  * V10-BREF-2 [broken_references; major] Same class as V09: V10's convention says 'Section references without a prefix (§7.1, §11.2) are the base's', yet 71 list continuations after a volume citation name an existing base section, so they resolve to the wrong target und… → **Prefix every section number with its volume, or apply one canon list rule; fix the 116 references.**
  * V10-HANDOFF-1 [handoffs_to_canon; minor] CVR-V10-13 is open (V01 names no terraced-ward kind; grep 0 hits), so V10's transcript rests on a fallback 'until V01 names it', while V09's canvas script for the same quarter uses V01's stepped fabric. The two authoring paths of… → **Rule the ravine quarter's declaration once (V01's stepped fabric on the residential kind, if that is V01's design) and have both V09 §7.2 and V10 §3.15 cite it; close CVR-V10-13.**
  * V10-HANDOFF-2 [handoffs_to_canon; minor] CVR-V10-6 (V01 names its pushes by V11's families) is open (V01 line 2693 still says SUNLIGHT, EMITS, SENSITIVE); CVR-V10-13 (V01's terraced-ward kind) is open; CVR-V10-14's V05 and V07 parts are 'open' by the table's own words a… → **Close CVR-V10-6 and -13 at V01 (or rule them), verify and mark CVR-V10-14's V05 and V07 parts.**
  * V10-HANDOFF-3 [handoffs_to_canon; minor] These requests appear met at their destinations (V04's catacombOutcome in IN-V04-8, V04's arch vault and terminal cistern rows, V03's section provider and room-cause keys, V06's locate and detail.why, V02's deck/landmarks path, V… → **Verify each at its home and mark Met with its section (and move V04's catacombOutcome from an integration note into V04's body, a V04-lane point).**
  * SR6-05 (surfaces) [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-surfaces-r6.md SR6-05 (surfaces) → **V10's subject-rule wording cites V09 §2.9; the restated lists become pointers; the two alternative keys reuse V09's button.openCopy and button.undo (J-SS6.7); the status line leaves.**
  * V10:IN-V10-1 [integration-note; minor] * **IN-V10-1 (J-VI.4).** Item 110's named refusals are bends (§3's paragraph edited in place): each the item's `bent` line, no refusal category (corrected by reconciliation round 1, SS-17: V10 §3.16), their alternatives as `propo… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V10:IN-V10-2 [integration-note; minor] * **IN-V10-2 (J-VI.2).** The report's `raised[].reason` reads `'drop'¦'link'¦'water'` (edited in place), the derived word of the record's `RaisedReasonKey`; absent for a declared way (`source: 'declared'`). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V10:IN-V10-3 [integration-note; minor] * **IN-V10-3 (J-VI.5; volume 2's X22).** The `tiers` input admits `stairs: 'none'` (edited in place); the clerk reads the facts `massing/bend/<id>`, `stack.grade` and the derived aspect (V2 §4.6), and words each bend of V2 §1b. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V10:IN-V10-4 [integration-note; minor] * **IN-V10-4 (J-VI.17).** CVR-V10-1, -2, -8 and -9 are met by volume 4's IN-V04-8, volume 3's IN-V03-1 and volume 2's → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V10:IN-V02-3 [integration-note; minor] IN-V02-3; CVR-V10-12's `query rule` reads volume 11's rows with their `says`. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V10:IN-V10-5 [integration-note; minor] * **IN-V10-5 (J-VI.26).** The T2 `terrace` encoder's stroke now carries `falloff: 'cosine'` and `amount: 1`, as volume 9's T2 mapper sets them (V9 §4.20.1 (4)): §7.1's `FieldStroke` requires both, so the encoded event validates a… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**

### V11

* **Size:** 106185 words; the goal band after: 63711–79639 words; narration ranges alone 12624 words; 70 restatements to references; 12 BCR blocks to pointers.
* **STATE:** 554 facts (canon.json → units.V11.state); 3 index rows.
* **REFERENCE (70):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | V11-0009 | determinism §7.6 | — (section) |
  | V11-0010 | pipeline §10.2 | PIPELINE-0563 (fact) |
  | V11-0011 | pipeline §4.2 | PIPELINE-0086 (near) |
  | V11-0012 | pipeline §4.7 | — (section) |
  | V11-0013 | pipeline §4.7 | — (section) |
  | V11-0014 | pipeline §4.5 | — (section) |
  | V11-0015 | pipeline §4.9 | — (section) |
  | V11-0016 | pipeline §4.11 | — (section) |
  | V11-0017 | model §2.6 | MODEL-0321 (fact) |
  | V11-0018 | pipeline §10.4 | — (section) |
  | V11-0019 | determinism §7.1 | DETERMINISM-0298 (near) |
  | V11-0020 | V08 V08 §9 | V08-0146 (fact) |
  | V11-0021 | scope §17.1 | — (section) |
  | V11-0022 | scope §14 | — (section) |
  | V11-0023 | scope §13.2 | — (section) |
  | V11-0024 | model §2.6 | — (section) |
  | V11-0025 | pipeline II.7 | — (section) |
  | V11-0026 | V10 V10 §1b.2 | V10-0105 (fact) |
  | V11-0027 | model §2.2 | — (section) |
  | V11-0108 | model §2.1 | — (section) |
  | V11-0111 | determinism §7.1 | DETERMINISM-0421 (near) |
  | V11-0122 | scope §17.1 | SCOPE-0571 (near) |
  | V11-0123 | determinism §7.6 | DETERMINISM-0506 (near) |
  | V11-0135 | V07 V07 §2.4 | V07-0141 (fact) |
  | V11-0155 | V04 V04 §1b.1 | V04-0020 (fact) |
  | V11-0180 | V04 V04 §9 | V04-0242 (near) |
  | V11-0184 | V01 V01 §2.7 | V01-0194 (near) |
  | V11-0185 | V01 V01 §2.7 | V01-0188 (near) |
  | V11-0186 | V09 V09 §2.3 | V09-0120 (near) |
  | V11-0204 | scope §1.1 | SCOPE-0360 (fact) |
  | V11-0205 | pipeline §4.2 | — (section) |
  | V11-0206 | pipeline §4.3 | — (section) |
  | V11-0207 | pipeline §4.7 | — (section) |
  | V11-0209 | pipeline §4.5 | PIPELINE-0199 (near) |
  | V11-0210 | pipeline §4.2 | — (section) |
  | V11-0211 | determinism §5.1 | — (section) |
  | V11-0218 | pipeline §10.2 | PIPELINE-0563 (fact) |
  | V11-0219 | pipeline §10.2 | PIPELINE-0563 (fact) |
  | V11-0221 | pipeline §10.2 | PIPELINE-0290 (near) |
  | V11-0223 | V03 V03 §1b | V03-0062 (fact) |
  | V11-0224 | V02 (the editor finds the section) | — (section) |
  | V11-0226 | pipeline §4.9 | PIPELINE-0426 (near) |
  | V11-0228 | pipeline §4.11 | PIPELINE-0519 (near) |
  | V11-0229 | pipeline §4.11 | PIPELINE-0503 (near) |
  | V11-0232 | pipeline §4.7 | PIPELINE-0321 (near) |
  | V11-0233 | V05 V05 §1b | V05-0077 (near) |
  | V11-0234 | pipeline II.7.1 | PIPELINE-0751 (near) |
  | V11-0235 | V04 V04 §2.3 | V04-0071 (near) |
  | V11-0237 | kernel §3.23.1 | — (section) |
  | V11-0238 | V06 V06 §1b | V06-0034 (near) |
  | V11-0239 | V07 V07 §1b W28 | V07-0046 (fact) |
  | V11-0240 | V01 V01 §2.2 | V01-0149 (near) |
  | V11-0241 | V08 V08 §2.6 | V08-0055 (fact) |
  | V11-0245 | pipeline §4.5 | PIPELINE-0142 (near) |
  | V11-0250 | kernel §3.15 | — (section) |
  | V11-0253 | V08 V08 §2.4 | V08-0040 (fact) |
  | V11-0260 | V09 V09 §2.3 | V09-0119 (fact) |
  | V11-0261 | V09 V09 §7.1 | V09-0789 (near) |
  | V11-0262 | V10 V10 §2.10 | V10-0168 (fact) |
  | V11-0263 | V01 V01 §2.2 | V01-0151 (near) |
  | V11-0264 | model §2.2 | — (section) |
  | V11-0283 | scope §17.1 | SCOPE-0415 (near) |
  | V11-0332 | V07 V07 §2.4 | V07-0147 (fact) |
  | V11-0338 | V05 V05 §3.10 | V05-0237 (fact) |
  | V11-0432 | V08 (the editor finds the section) | — (section) |
  | V11-0435 | pipeline §10.4 | — (section) |
  | V11-0450 | V04 V04 §1b.1 | V04-0020 (fact) |
  | V11-0453 | V04 V04 §3.5.0a | V04-0110 (near) |
  | V11-0486 | determinism §7.1 | DETERMINISM-0574 (near) |
  | V11-0490 | V09 (the editor finds the section) | — (section) |

* **Its §10 requests → one-line pointers to the applied f items (32):** BCR-V11-1 → item 432; BCR-V11-2 → item 433; BCR-V11-3 → item 434; BCR-V11-4 → item 510; BCR-V11-4 → item 520; BCR-V11-5 → item 258; BCR-V11-6 → item 379; BCR-V11-7 → item 400; BCR-V11-8 → item 435; BCR-V11-10 → item 380; BCR-V11-11 → item 532; BCR-V11-11 → item 568; BCR-V11-12 → item 446; BCR-V11-13 → item 436; BCR-V11-14 → item 566; BCR-V11-15 → item 553; BCR-V11-16 → item 437; BCR-V11-17 → item 438; BCR-V11-18 → item 288; BCR-V11-19 → item 439; BCR-V11-20 → item 440; BCR-V11-21 → item 534; BCR-V11-22 → item 477; BCR-V11-23 → item 456; BCR-V11-24 → item 441; BCR-V11-25 → item 442; BCR-V11-26 → item 425; BCR-V11-27 → item 259; BCR-V11-28 → item 289; BCR-V11-29 → item 401; BCR-V11-30 → item 412; BCR-V11-31 → item 581.
* **BCR blocks → pointers (12):** BCR-V11-1 → item 432; BCR-V10-2 → item 311; BCR-V11-4 → item 520; BCR-V11-7 → item 400; BCR-V11-10 → item 380; BCR-V11-13 → item 436; BCR-V11-16 → item 437; BCR-V11-18 → item 288; BCR-V11-21 → item 534; BCR-V11-24 → item 441; BCR-V11-27 → item 259; BCR-V11-31 → item 581.
* **Terms to replace:** G-lot (lot, lot-driven, lot-derived, BuildingInput.lot → plot (field BuildingInput.plot); 2 hits, first lines [283, 1320]); G-cite (V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 … → Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y; 256 hits, first lines [240, 247, 270, 278, 291, 308]); G-unitinput (SkyHandover, hand-over (the unit-run view) → SkyUnitInput (the island's unit inputs); `handover` keeps only the reservation passing (IslandInstitution.handover); 1 hits, first lines [4377]); G-strike (decline pool, decline lottery, the lottery → strike pool (defined once in V06 §3.5.2); 4 hits, first lines [907, 908, 3340, 3341]); G-DR (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8 → DR26–DR35 (ID-DR); 19 hits, first lines [263, 264, 286, 310, 709, 1566]); G-panelgroup (panel M4-110 → the M4 panel's M4-110 group; 2 hits, first lines [3722, 4383]); G-fallbackclass (fallbackClass → item 104 (a)'s resolution (V11 §3.13); 3 hits, first lines [4608, 4678, 5062]); G-digest (nearbyResources[], site.terrainType → site.deposits; site.terrain; 1 hits, first lines [5213]).
* **Conflicts it resolves (20):** DXC-05, MC-11, CF-PIPE-10, RIC-01, V08-XCONF-9, V09-XAGREE-1, V11-ICONF-1, V11-ICONF-2, V11-ICONF-3, V11-ICONF-4, V11-ICONF-5, V11-ICONF-6, V11-ICONF-7, V11-XCONF-1, V11-XCONF-2, V12-XCONF-2, V11-XCONF-3, V11-XCONF-4, CANON-C03, CANON-C04.
* **File f items that concern it (cite as base text):** 213, 226, 229, 238, 244, 246, 258, 259, 288, 289, 291, 297, 301, 311, 376, 377, 379, 380, 381, 400, 401, 412, 425, 426, 427, 430, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 446, 456, 477, 501, 510, 516, 520, 532, 534, 553, 560, 564, 566, 568, 576, 584.
* **File g parts it writes or applies:**
  * item 111: the oasis chance, grove and garden rows, the water-pull weights and the sunlight cell per climate row
  * item 113: event-to-epoch rows and burial thresholds (the table values of item 113)
* **Wiring gaps it closes:** DWG-03, KWG-06, V11-WGAP-1, W-SET-01.
* **Elegance rulings it applies:** E-05, E-20, E-24, E-30, E-34, E-37, E-38.
* **Id rulings it applies:** ID-BCR, ID-WX, ID-DR, ID-DUPDEF.
* **Owner questions to mark answered:** Q-V11-1 — J122: keep, concealed by default in player views, shown as SettlementForge's own settings show them.
* **Cohesion checks:** see *Cohesion checks* (every volume).
* **Disagreements (agreement.md):** `TableId` with V07 (MC-11); `T-V6-62` with V12 (V11-XCONF-1); `T-V11-18` with V12 (V12-XCONF-4); `TableId` with model (MC-11).
* **Its own Fix list (§13) and hand-off rows — every item fixed in the text (or marked for the adjudicator with its reason); §13 keeps no open item:** V11-0635, V11-0636, V11-0637, V11-0638, V11-0639, V11-0640, V11-0641, V11-0644.
* **Hand-offs to close here (40):** V02:X2, V02:X3, V02:X5, V02:X9, V02:X13, V02:X26, V02:X32, V06:X1, V06:X8, V06:X20, V06:X31, V06:X35, V06:X43, V06:X45, V07:FL-2, V07:FL-3, V08:X1, V08:X2, V08:X4, V08:X5, V08:X6, V08:X9, V08:X14, V08:X19, V08:X22, V08:X25, V09:XV-V9-1, V09:XV-V9-2, V09:XV-V9-13, V09:XV-V9-31, V10:CVR-V10-6, V10:CVR-V10-12, V10:CVR-V10-16, V12:X-V12-1, V12:X-V12-3, V12:X-V12-9, V12:X-V12-11, V12:X-V12-15, V12:X-V12-18, V12:X-V12-16 (agreement.md lists each).
* **Edges (edges.md):** 52 UNDEFINED, 12 UNTESTED; 21 UNDEFINED combinations it owns.
* **Open findings routed here (80):**
  * VOL-V11-V12-RESTATEMENTS-001 [restatements; -] the unit list m, m2, ha, cm, cdeg, share, weight, people, yr, wk, m3, lvl with its additions → **state it once at base §2.1 (units); every other place cites it**
  * VOL-V11-V12-RESTATEMENTS-002 [restatements; -] clamp-to-bound on an out-of-range edit with the one-line message; also V11-0280, V11-0486 → **state it once at base §7.1 (item 101 R2), §5.2 F-EDIT; every other place cites it**
  * VOL-V11-V12-RESTATEMENTS-003 [restatements; -] the compiled cell shape {value, unit, provenance {source, date, note, evidence?}} → **state it once at base §7.6 (cells); every other place cites it**
  * VOL-V11-V12-RESTATEMENTS-004 [restatements; -] preset resolution: own entry, else 0 or off for an extension cell, else the default → **state it once at base §7.6 (resolution order); every other place cites it**
  * VOL-V11-V12-RESTATEMENTS-005 [restatements; -] the bend cells 15 m, 12 m, 0.8 given as V09's constants in the lifecycle migrate cell → **state it once at V11 §3.24.1 rows (from V09 §4.20.1 (3)); every other place cites it**
  * VOL-V11-V12-RESTATEMENTS-006 [restatements; -] the list-hit rule (five or more words of one reference list on a line or column fails unless an allow row is reviewed) → **state it once at base §17.1 (5); every other place cites it**
  * VOL-V11-V12-RESTATEMENTS-007 [restatements; -] v.parish_church crypt cells (cellar chance 0.1, cryptM2 20/25/35/45) and v.chapel never, while saying cited not restated → **state it once at V07 §2.4 (J-V7.64); every other place cites it**
  * VOL-V11-V12-RESTATEMENTS-008 [restatements; -] undergroundAccess.prob defaults (0.15-0.30 lodging and works families, 0.02 housing, 0 barracks, courthouse, temple) → **state it once at V11 §3.5.1 (restated in base §10.2 prose); every other place cites it**
  * VOL-V11-V12-RESTATEMENTS-009 [restatements; -] the underground content rows' values, carried in V04 until its next revision (X-V11-4) → **state it once at V11 §3.23 (restated in V04's defaults table); every other place cites it**
  * VOL-V11-V12-RESTATEMENTS-010 [restatements; -] the bend cells' calibration milestone, stated as M3a (V12: panel M4-110 at M4) → **state it once at V12 §3.11 register line 21; every other place cites it**
  * V11-RESTATE-1 [restatement_findings; minor] The unit list restates the base's units (§2.1) with additions (share, weight, people, yr, wk, m3, lvl, cdeg); it cites the base but re-lists; the new units (lvl, weight as score unit) need one home. → **Cite §2.1 for the base units; state only V11's added units (weight, lvl) here, or move the full enumeration into §2.1 by BCR.** — *closed by:* elegance ruling (E-list)
  * V11-RESTATE-2 [restatement_findings; minor] The clamp-on-edit rule (item 101 R2, F-EDIT) and the compiled cell shape {value, unit, provenance {source, date, note, evidence?}, ...} are base facts (§7.1/§7.6, §5.2) restated in V11's type comments. → **Cite §7.6 (cell shape) and §7.1 / item 101 R2 (clamp) instead of restating.**
  * V11-RESTATE-3 [restatement_findings; minor] The migration defaults of the three bend cells are given as '15 m, 12 m, 0.8 (V09's constants)', restating V09's values; §3.24.1 writes the rows' values (check they agree) - two statements of one fact. → **Cite §3.24.1's TOWN row values (the one home) rather than restating numbers attributed to V09.**
  * V11-RESTATE-4 [restatement_findings; minor] The clean-room list-hit rule ('five or more words of one reference list on one line or in one column fails the PR unless an allow row ... is reviewed') restates base §17.1 (5)'s scan definition (ARCHITECTURE lines ~15016-15066). → **Cite §17.1 (5) for the scan and its hit rule; keep only the content-specific points (P-id on ref rows, SF words not a reference list).**
  * V11-RESTATE-5 [restatement_findings; minor] Says V07's village crypt cells are 'cited, not restated' but restates them (v.parish_church basement, 0.1, cryptM2 20/25/35/45; v.chapel never) - values agree with V07 line 1055 today, but a second statement of V07-owned values. → **Replace the values by a pointer to V07 §2.4 / §3.x's crypt cells.**
  * V11-RESTATE-6 [restatement_findings; minor] V04's defaults table restates V11 §3.23's values (two homes for one fact) and the text leaves the fix 'until its next revision' - a hand-off (X-V11-4) not yet closed at its destination and deferral-shaped wording. → **Close X-V11-4 in this pass: V04's defaults table cites V11 §3.23 for these cells (verify at V04's inventory), and drop the 'until' clause here.**
  * V11-RESTATE-7 [restatement_findings; minor] The base's §10.2 prose states the undergroundAccess.prob defaults (higher for breweries, bathhouses, warehouses, inns, 0.15-0.30 by band; houses 0.02 raised by the age term; 0 for barracks, courthouse, temple) and V11 §3.5.1 writ… → **Base §10.2 cites V11 §3.5.1's rows (the table is V11's), dropping its numbers.**
  * V11-DUP-1 [internal_duplications; minor] The T-V11-5 rule (a compiled profile fails only when it emits and is sensitive to one nuisance both at level 2 or more) is stated in §3.3.2 and again in §3.5.2, whose bullet claims to state it once. → **Keep one statement (§3.3.2) and reference it from §3.5.2.**
  * V11-DUP-2 [internal_duplications; minor] The singular->neutral / district-defining->cluster competition override is stated three times in V11. → **State it once (§2.3) and cite it from step 5a and §3.5.2.**
  * V11-DUP-3 [internal_duplications; minor] The clamp-and-one-line-note / F-EDIT refusal rule appears three times in V11 (and is a base rule, item 101 R2, §7.1 dry run). → **One statement (§4.1, citing §7.1 and item 101 R2); the other two reference it.**
  * V11-ICONF-1 [internal_conflicts; minor] Readers lists contain conditional clauses left open: row 62 'should T-V11-1 (b) record those reads under S8, the row lists S8 in that change'; row 80 'should T-V11-1 (b)'s recorded reads tag an epoch stage's S5b as EVO_GROWTH, th… → **Decide the StageId under which an epoch stage's S5b and the seed pass's reads are recorded (per V06 §3.2 / §4.1 registration), and write the determinate readers list.** — *closed by:* conflict ruling V11-ICONF-1
  * V11-ICONF-2 [internal_conflicts; minor] 'lumber camp logs 0.9, bark 0.1' and later 'lumber camp logs' (no shares) are both in the produces list: a duplicated entry that reads as two different produces sets for one class. → **Delete the second 'lumber camp logs' entry.** — *closed by:* conflict ruling V11-ICONF-2
  * V11-ICONF-3 [internal_conflicts; minor] §3.13.3 says the compiler emits generic-<f> 'for every profile family f', while §3.2.1 step 5 and §3.5.14 say one per NON-ALIAS family (aliases civic, defence resolve to their target's generic class; 45 generic classes). → **Word §3.13.3 as 'for every non-alias profile family'.** — *closed by:* conflict ruling V11-ICONF-3
  * V11-ICONF-4 [internal_conflicts; minor] 'resolveSiting (~230 classes ...)' while §3.5.14 counts 181 authored + 45 generic + 2 sky = 228 plus V07's village classes, which step 6 compiles and T-V11-3/-4/-5 run over; the budget's class count omits the v. rows the derivati… → **State the count as read from REGISTRY (as the compile row does) or include V07's v. rows.** — *closed by:* conflict ruling V11-ICONF-4
  * V11-ICONF-5 [internal_conflicts; minor] J-V11.8 says '≈ 179 authored town and city classes', while §3.5.14 counts 181 (fort and lighthouse added) and BCR-V11-11 says '≈ 180'; J-V11.94 says 'a town roster holds ≈ 180 classes'. → **Make J-V11.8 read 181 (or '≈ 180' consistently) and cite §3.5.14's count.** — *closed by:* conflict ruling V11-ICONF-5
  * V11-ICONF-6 [internal_conflicts; minor] §12 states '86 registry catalogue rows (1-85 and 58a)', 'the class count (179 authored)' and wiring 'W1 - W66' as CONFIRMED by script, while the live text has 92 rows, 181 classes and W1-W78. → **Remove with the narration or correct to the live counts.** — *closed by:* conflict ruling V11-ICONF-6
  * V11-ICONF-7 [internal_conflicts; minor] 'the tower's record binds the guild's hall' is ambiguous (tower becomes the hall, or a new hall takes the tower's key); V08 §3.5.1 (c)'s first case and V06's convert read it as re-designation in place. Open on the INDEX fix list. → **Cell reads 'the wizard's tower becomes the guild's hall (re-designated in place; V08 §3.5.1 (c)'s first case)'.** — *closed by:* conflict ruling V11-ICONF-7
  * V11-XCONF-1 [cross_volume_conflicts; minor] V11 §3.24.1 says stateSnapCm's register entry is 'V12's retaining line until V12 gives it the line X-V11-17 (f) proposes', but V12 §3.11 excludes stateSnapCm from the retaining line ('every other calibratable column but settings.… → **V11 §3.24.1 cites V12 §3.11 (default line at M3a, V06 §8's line from V6-E2); drop 'until'.** — *closed by:* conflict ruling V11-XCONF-1
  * V11-XCONF-2 [cross_volume_conflicts; minor] Row 87 types every messages/<locale>.json as MsgRow, while V09 §2.9 Locales (J-V9.121) types non-English files as {key; text} only (buttons, tone, codes read from en.json); open on the INDEX fix list (V09 XV-V9-31). → **Row 87's row type 'MsgRow for en.json; {key; text} for every other locale file'; loader refuses a locale file carrying buttons, tone or codes; T-V11-1 follows.** — *closed by:* conflict ruling V11-XCONF-2
  * V11-XCONF-3 [cross_volume_conflicts; minor] V11 dates the three bend cells' calibration 'at M3a' while V12's register line (the single home of calibration method and due) calibrates retainingReachM, flatDepthM, coverShare by the M4-110 panel at M4; read literally the two v… → **V11 says 'written at M3a; calibrated by V12 §3.11's terrace line' (cite, do not restate the due).** — *closed by:* conflict ruling V11-XCONF-3
  * V11-XCONF-4 [cross_volume_conflicts; minor] V11 has the register lint in CI from C0 (M0), before V12's W2 builds the command and before V12's tier starts. → **Cite V12: 'register --check joins CI at M1 (V12 T-V12-20)'; C0's exit drops the clause.** — *closed by:* conflict ruling V11-XCONF-4
  * V11-ELEG-1 [elegance_candidates; minor] The readers of each table are stated three times (W row consumers, §2.10 lifecycle 'read' cell, §3.1 registry readers), and the three already drift (W19 vs row 50, finding wgap V11 1). The item-110 lifecycle rows (terrace, retain… → **Make §3.1's readers the single source; generate §1b and §2.10's read cells from it (or cite the row number), and state the item-110 lifecycle once as a pattern with per-table exceptions. Shrinks V11 without losing nuance.** — *closed by:* elegance ruling (E-list)
  * V11-EDGE-1 [edges_observed; major] A crossing is a ramp (step over run <= rampMaxGrade, or a switchback within minTerraceDepthM), else a stair when the class has one; a cart class takes a ramp 'up to 1.5 x rampMaxGrade' (W_STEEP_RAMP), 'never a stair and never a g… → **Define the outcome beyond 1.5 x (e.g. the levelling lowers the step at that crossing, or the ramp lengthens along the wall) and test it in T-V11-32.** — *closed by:* edge catalogue (EI-V11-EDGE-1)
  * V11-EDGE-2 [edges_observed; minor] Satisfaction clamp(2 - n / target, 0, 1) and the households radius sqrt(per x a_res / pi) are undefined for target = 0 or per = 0 (and a_res = 0 in a district with no residential plots); no range for per/target is stated in the s… → **State ranges (target > 0, per > 0) in the ColumnSpec and the a_res = 0 case (unit empty -> satisfaction 1 or term skipped).** — *closed by:* edge catalogue (EI-V11-EDGE-2)
  * V11-WGAP-1 [wiring_gaps; minor] W19 lists 'V07 pump date' among EraRow's consumers and V07's VS8 reads the era row's pump date (V07 ~line 2138-2146), but registry row 50's readers list (S3, S5, S7, S11, S12a, S12b, S4, S6, EVO_RAISED, U-SYS) omits V07's village… → **Add V07's reading stage (VS8) to row 50's readers; derive W19's consumer list from row 50 instead of restating it.** — *closed by:* wiring routing (V11-WGAP-1)
  * V11-MISSING-1 [missing_parts; major] J122 (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md) decided Q-V11-1: 'keep, concealed by default in player views, shown as SettlementForge's own settings show them'. V11 still carries it as an open question with a recommendation,… → **Mark Q-V11-1 answered (J122) and make the four sensitive kinds concealed by default in player views (concealment rows for slave_market and slave_market_district; the knowledge setting following SettlementForge's own settings), at V11 §3.11/§3.14 with the owner rule as authority.**
  * V11-MISSING-2 [missing_parts; major] g item 111 (from item 111 onward, applied by every unit it names) names V11: 'the oasis chance, grove and garden rows, the water-pull weights and the sunlight cell per climate row'. V11 has none of them: no oasis chance or grove/… → **F-MISSING: write V11's part of item 111 at build depth (rows, constants, the per-climate sun cell with its temperate value = 0.02, the no-op pin, register entries, lifecycle rows, tests).**
  * V11-MISSING-3 [missing_parts; major] g item 113 names V11: 'event-to-epoch rows, burial thresholds' (history-first generation: the event-to-epoch mapping's content rows, the replay's coarse-epoch default 'decades', the burial threshold 'a century by default, shorten… → **F-MISSING: write V11's part of item 113 (the event-to-epoch table rows, the burial-threshold table with its modifiers, the symbolic-peak sizing cell, their registry rows, readers, lifecycle and tests).**
  * V11-MISSING-4 [missing_parts; minor] Normative content lives only in the integration notes ('each note supersedes any sentence of this volume that reads otherwise'): IN-V11-1's ownerRule stamping is absent from §3.2.1 (compile steps) and its calibration minima (chan… → **Fold each note into its home section (§3.2.1 step 4/7, §3.24.2, §3.20.1 and registry row 68 gaining naming.vaults) and delete the notes.**
  * V11-MISSING-5 [missing_parts; minor] Open on the INDEX fix list: the v. rows' commonness is produced by a V07 script while V11's lifecycle row says the compile recomputes it; step 5a and §3.5.1 compute it only for town-and-city rows (J-SR6.6 chose the compiler as th… → **§3.5.1 adds 'for a v. row, V07 §2.4's rule (roster share at VILLAGE's default target, rounded 0.01, never below 0.01)'; step 5a compiles it; T-V11-4 reads 'on a town-and-city or v. row compiled, never stated'.**
  * V11-MISSING-6 [missing_parts; minor] V12 §2.10 says 'V11's compiler stamps ownerRule from the owner-rule rows (X-V12-9)' and writes status into dist/evidence.json ({status, lines} per cell, 'owner' for a stamped cell); V11 §3.2.1 step 7 writes dist/evidence.json as … → **V11 §3.2.1 gains the ownerRule stamp (step 4 or 5a) and step 7's evidence.json shape {cell: {status, lines}} reading the register; cite V12 §2.10.**
  * V11-TERM-1 [terminology; minor] Volume citations use two forms: 'V06 §3.9.9', 'V04 §2.3' beside 'V6 §3.16', 'V5 §3.21', 'V9 §2.6', 'V4 §2.3a', 'V2 §5.4', 'V1-3.15' (V01's internal form); principle (1) prescribes 'V04 §3.2'. → **Canon: one citation form 'V0n §x.y' across the set; rewrite the short forms.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V11-DEFER-1 [deferral_wording; minor] Revision note says 'V11 §13 lists what is deliberately left for later' - deferral wording against principle (6) and the no-defer rule; check §13 content. → **Remove with the revision note; §13 must hold no open item.**
  * V11-DEFER-2 [deferral_wording; minor] The cell provenance shorthand 'calibrate-later' (and 'calibrate-later at M1 with its fallback' for detourFactor, §3.5.1) reads as deferral wording against principle (6); the values are set and each is a provisional number with a … → **Replace 'calibrate-later' by the register form ('provisional; V12 §3.11 register entry') throughout V11.**
  * V11-DEFER-3 [deferral_wording; minor] The decision records that the 280 kind rows were written from 'the V08 lane's export in the session scratchpad' - a source outside /Users/cstokes/Desktop/Maps (STANDALONE rule, principle (6)); the build source is the committed ma… → **Cite research/sf and the committed catalogue manifest as the source; drop the scratchpad reference.**
  * V11-DEFER-4 [deferral_wording; major] The fix list keeps three open items under the heading 'What is deliberately left for later' (F-V11-1 ladder lessers, F-V11-2 vocabularies, F-V11-3 other volumes restating V11 rows) - the bar allows no open fix-list item and princ… → **Close each: restate F-V11-1 and F-V11-2 as decisions (J rows), fix F-V11-3 at V04 and V06 (they cite V11 §3.18/§3.23/§3.24.2), and empty the fix list.**
  * V11-NARR-1 [narration; minor] Ten stacked 'PENDING FABLE REVIEW' banner lines (one per lane: V11-content, revise-V11, reconcile-V11-r1..r6 and two continuations); principle (8) allows one marker line per volume, the close's. → **Replace by the close's single marker line.**
  * V11-NARR-2 [narration; minor] Revision note (lines 14-19, naming a scratchpad pre-revision copy) and seven PROGRESS / REVISION / RECONCILIATION ledgers (about 90 lines) narrate how the text evolved (principle (5)); the validation records (critique/V11.md, sea… → **Remove; the volume opens at its title and the close's marker line.**
  * V11-NARR-3 [narration; minor] Wiring rows carry pass narration ('reconciliation round 1, SS-01', 'reconciliation round 4, SCC-75', 'round 2's continuation, SCC-R1C-1', 'round 6, SR5-03', 'the class count corrected') - principle (5); the validation records kee… → **Strip the parenthesised pass references; keep the section citations.**
  * V11-NARR-4 [narration; minor] Normative text carries pass narration in parentheses: 'reconciliation round 3's continuation, SCC-R2C-9', 'SR3-07', 'SCC-77, SCC-R3C-15', 'reconciliation round 6, seam-settlements-r5 SR5-03', 'V11C-22', 'V11C-07', 'V11C-44 (3)' -… → **Strip seam/critique issue ids and round references from normative text throughout V11; keep J-V11.n pointers.**
  * V11-NARR-5 [narration; minor] Critique ids and round narration in headings and normative text ('V4C-63', 'owner ~23:30 ... V11C-33 – V11C-45', 'reconciliation round 6, SCC-104'); principle (5). → **Keep the owner-rule citation (item 110) and drop critique ids and round references.**
  * V11-NARR-6 [narration; minor] Lifecycle rows and catalogue status cells carry narration ('the terrace's three bend cells (reconciliation round 1)', 'the pre-round-1 reading', 'reconciliation round 2, SCC-34', 'written here (RV-pc-5)'); principle (5). → **Remove the round/issue references from the lifecycle table and the status cells.**
  * V11-NARR-7 [narration; minor] Catalogue cells and the count paragraph carry pass narration ('listed here before', 'reconciliation round 4's continuation, SCC-R3C-7, V01's note (33)', 'outside this round's brief', 'SR3-07', 'SCC-77', 'seam-surfaces-r5 SR5-04',… → **Remove the pass references; keep sections and J-ids.**
  * V11-NARR-8 [narration; minor] '(V9 §4.16 (3) as seam-settlements-r6 SR6-03 scopes it; SR6-09 (b), applied by the finalization)' - pass narration inside a normative rule. → **Cite V09 §4.16 (3) only.**
  * V11-NARR-9 [narration; minor] 'item 110's fort and lighthouse among them, which the count of 179 predated; reconciliation round 6' - narration inside the count. → **State the count (181 = 167 table rows + 2 cluster structures + 12 clandestine) without its history.**
  * V11-NARR-10 [narration; minor] 'yarn is deleted - spinning was household work' is a disposition of an earlier text, not a rule; principle (5). → **Drop the sentence (the weaver's supply of wool already records the choice) or state the rule positively ('no yarn good; spinning is household work').**
  * V11-NARR-11 [narration; minor] '(SR1-02, SR1-07)', 'SS-36', 'V11C-14', 'reconciliation round 6, SR5-11's class', 'SR4-01', 'reconciliation round 5, SR4-02', 'V7C-07', 'the former columns are dropped, V11C-13, V11C-28', 'SCC-06' - pass narration in normative te… → **Strip issue ids and 'former columns dropped' disposition.**
  * V11-NARR-12 [narration; minor] '(SR1-19)', '(reconciliation round 6, SR5-11 (a))', 'SS-03', 'SS-09' in table cells; principle (5). → **Strip.**
  * V11-NARR-13 [narration; minor] 'SR3-01', 'reconciliation round 4, SR3-03', '(SS-05)', '(SS-03)', '(SS-02)', '(SR1-02) (SR1-21)' - pass narration. → **Strip.**
  * V11-NARR-14 [narration; minor] 'SCC-25', 'SCC-51', 'SCC-09', 'reconciliation round 3, SCC-67', 'IN-V11-2, XV-V9-13', 'SCC-19', 'V12's 23:27 note (4)', 'reconciliation round 3's continuation, SCC-R2C-10' - narration in normative text. → **Strip.**
  * V11-NARR-15 [narration; minor] 'V09's BCR-V9-30 slot; the constant moves here' - disposition narration; also check V09 no longer states minSpanM 40 (single source). → **State minSpanM here; confirm V09 cites it.**
  * V11-NARR-16 [narration; minor] Test and budget rows carry pass narration ('92 at this revision (90 before reconciliation round 4's continuation, SCC-R3C-4; 86 before round 2's continuation, SCC-R1C-3)', 'SR1-08', 'SCC-R2C-2', 'SCC-104', 'reconciliation round 6… → **Strip from every test, budget and plan row.**
  * V11-NARR-17 [narration; minor] Decision rows carry their pass history ('Reconciliation round 2.', '(SCC-44; SCC-06's shape)', 'revised by reconciliation round 1 (SS-13 ...)', 'Amended (round 4's continuation, SCC-R3C-15; J-V11.91)', 'a lane-events note of 07:2… → **Strip round headers and seam ids; fold J-V11.77's amendment into one current statement.**
  * V11-NARR-18 [narration; major] About 590 lines (roughly a ninth of the volume) narrate how the text evolved: per-round CONFIRMED/PLAUSIBLE paragraphs, disposition tables by seam id, backup md5s and scratchpad paths, doc_checks counts, lane-event times. Princip… → **Replace §12 by a short CONFIRMED/PLAUSIBLE statement of the current design (the PLAUSIBLE list above), and delete the reconciliation and finalization sections (their dispositions are in docs/volumes/critique/*).**
  * V11-BREF-1 [broken_references; minor] 'garden' is not a LandUse.kind (§2.7 lists arable, strip_field, meadow, pasture, commons, orchard, vineyard, coppice, wildwood, quarry, claypit, mine, lumber, fishery, saltpan, marsh, reserve; V11 §3.17.2 writes one row per kind … → **Drop 'garden' from herbs' site (meadow only), or name the Greenery 'garden' as a provider by a stated rule.**
  * V11-BREF-2 [broken_references; minor] V11 cites its own sections with a bare § 197 times whose target exists only in V11, not in the base (80 in the body incl. the ledger lines 46-49, 117 in the §10b-§13 tables; e.g. line 46 '§3.11', '§3.12'), beside 'V11 §' elsewher… → **Qualify every own-section ref as 'V11 §n' (script: rewrite bare § whose target is absent from the base) and state the convention once in the header.**
  * V11-BREF-3 [broken_references; minor] Bare 'BCR-n' ids are defined twice (V01 and V04 both number their base change requests BCR-1...), so a bare 'BCR-45' in V11 (e.g. §3.24.2, §12 'the seat landing BCR-45') is ambiguous; V11 writes 'V04 BCR-45' in some places and ba… → **Cite volume-qualified ids ('BCR-V4-45' / 'V04 BCR-45') everywhere; one id form per concept.**
  * V11-HANDOFF-1 [handoffs_to_canon; minor] Hand-offs left open at their destinations with deferral wording; principle (10) requires every hand-off closed at its destination in this pass; the no-defer rule forbids 'next revision/round'. → **Close each hand-off at V08, V09, V07, V04, V12 and f (verify at their inventories) and replace the deferral wording with the closed state.**
  * SR6-09 (a), (c), (d) [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-settlements-r6.md SR6-09 (a), (c), (d) → **(a) step 5a's v.-row case (with SR6-08); (c) the mis-attributed seam id corrected; (d) the mages_guild cell (V11-ICONF-7).**
  * SR6-08 (surfaces) [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-surfaces-r6.md SR6-08 (surfaces) → **Registry row 87's row type (V11-XCONF-2).**
  * V11:IN-V11-1 [integration-note; minor] * **IN-V11-1 (J-VI.10; X-V12-9).** The compiler stamps `ownerRule` (BCR-V12-5) on every cell of an owner-rule row — the `raisedWays` rung gate (`ownerRule: '110 (b)'`), the catacomb TOWN gate, the cemetery-only catacomb sources, … → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V11:IN-V11-2 [integration-note; minor] * **IN-V11-2 (J-VI.11; XV-V9-13, V02 X6 and X27).** The `terrace` table gains `retainingReachM` 15 m, `flatDepthM` 12 m and `coverShare` 0.8 (own, calibrate-later; read by volume 9 §4.20.1 (3)'s bend of a retaining stroke on flat… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V11:IN-V11-3 [integration-note; minor] * **IN-V11-3 (J-VI.17 H26; volume 4).** The `vaults` naming slice names an arch-vault run under a raised way "the ⟨way⟩ Arches" (the grammar's guard on the chamber kind `archVault`). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V11:IN-V11-4 [integration-note; minor] * **IN-V11-4 (J-VI.6).** `growthCapShare` 0.01 per year, compounded, is this volume's value; volume 4 now cites it. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V11:IN-V11-5 [integration-note; minor] * **IN-V11-5 (J-VI.9).** §3.24.7 (1)'s criteria row `pc/aqueduct/<way lineage>` is written only on a `conduit_house` the roster or the dossier holds; otherwise the terminal is a fountain pin. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V11:IN-V11-6 [integration-note; minor] * **IN-V11-6 (J-VI.3, J-VI.8; as reconciled in round 1, SS-15, SCC-01).** `walls.barriers` rows are keyed by this volume's eight defensibility classes, each carrying the `arcKind` of J-VI.3's six closure-arc kinds it reports (V11… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V11:IN-V11-7 [integration-note; minor] * **IN-V11-7 (J-VI.20).** BCR-V11-26's retirement of `fallbackClass` wins over BCR-V8-29's row type (file f item 425). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V11:IN-V11-8 [integration-note; minor] * **IN-V11-8 (J-VI.25).** W21's dossier column read `site.terrainType`, a field no digest carries; it now reads "`site.terrain`, `site.culture` → biome (the digest's `site` row, V08 §2.6)". → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V11:IN-V11-9 [integration-note; minor] * **IN-V11-9 (J-VI.27).** `raisedWays.structure`'s `pierSpacingM`, `pierWidthShare` and `pierMinCm` are read by file f item 244's support step (the piers' pitch and footprint), and `clearanceCm` by that item's clearance rule; `ma… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V11:IN-V11-10 [integration-note; minor] * **IN-V11-10 (J-VI.24).** BCR-V11-31 is carried as file f item 581, with item 377. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**

### V12

* **Size:** 76414 words; the goal band after: 45848–57310 words; narration ranges alone 8203 words; 2 restatements to references; 10 BCR blocks to pointers.
* **STATE:** 384 facts (canon.json → units.V12.state).
* **REFERENCE (2):** replace each by a pointer to its home:

  | inventory id | home | home fact (match) |
  |---|---|---|
  | V12-0007 | scope §13.5 | SCOPE-0620 (fact) |
  | V12-0008 | scope §17.1 | SCOPE-0837 (fact) |

* **Its §10 requests → one-line pointers to the applied f items (22):** BCR-V12-1 → item 496; BCR-V12-2 → item 497; BCR-V12-3 → item 503; BCR-V12-4 → item 504; BCR-V12-5 → item 381; BCR-V12-6 → item 500; BCR-V12-7 → item 491; BCR-V12-8 → item 535; BCR-V12-9 → item 533; BCR-V12-10 → item 521; BCR-V12-11 → item 569; BCR-V12-12 → item 501; BCR-V12-13 → item 488; BCR-V12-14 → item 502; BCR-V12-15 → item 447; BCR-V12-16 → item 489; BCR-V12-17 → item 447; BCR-V12-18 → item 536; BCR-V12-19 → item 492; BCR-V12-20 → item 493; BCR-V12-21 → item 537; BCR-V12-22 → item 382.
* **BCR blocks → pointers (10):** BCR-V12-1 → item 496; BCR-V12-2 → item 497; BCR-V12-4 → item 504; BCR-V12-5 → item 381; BCR-V12-7 → item 491; BCR-V12-10 → item 521; BCR-V12-12 → item 501; BCR-V12-13 → item 488; BCR-V12-15 → item 447; BCR-V12-18 → item 536.
* **Terms to replace:** G-lot (lot, lot-driven, lot-derived, BuildingInput.lot → plot (field BuildingInput.plot); 9 hits, first lines [346, 1038, 1147, 1148, 1164, 1205]); G-cite (V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 … → Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y; 101 hits, first lines [64, 293, 417, 633, 839, 840]); G-DR (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8 → DR26–DR35 (ID-DR); 14 hits, first lines [309, 325, 326, 327, 328, 330]); G-M6U (M6 (for the underground) → M6-U ("M6" is volume 2's stage 3); 3 hits, first lines [282, 2534, 2593]); G-JT (J-T → JT; 6 hits, first lines [201, 280, 293, 2182, 2874, 2878]).
* **Conflicts it resolves (10):** SCOPE-C14, V12-ICONF-1, V12-ICONF-2, V12-XCONF-1, V12-XCONF-2, V12-XCONF-3, V12-XCONF-4, V12-XCONF-5, CANON-C03, CANON-C04.
* **File f items that concern it (cite as base text):** 229, 291, 376, 377, 381, 382, 447, 456, 488, 489, 491, 492, 493, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 521, 522, 529, 533, 535, 536, 537, 568, 569, 575, 584.
* **File g parts it writes or applies:**
  * item 111: the bars: register lines and the NoOpPin registration for item 111's cells
  * item 112: the trial's record (its findings enter the calibration record and the fix list) and the style check's register line
  * item 113: the bars and the replay's budget (register lines, the NoOpPin)
* **Wiring gaps it closes:** W-IF-04, W-IF-05.
* **Elegance rulings it applies:** E-20, E-24, E-35, E-37, E-38.
* **Id rulings it applies:** ID-BCR, ID-JT, ID-WX.
* **Owner questions to mark answered:** Q-V12-1 — J122: no; Q-V12-2 — J122: only at M1 (look check), M2b, M4 and M5, batched, about an hour each (V12-XCONF-1); Q-V12-3 — J122: only where the owner's sitting passes them.
* **Cohesion checks:** see *Cohesion checks* (every volume).
* **Disagreements (agreement.md):** `T-V6-62` with V11 (V11-XCONF-1); `T-V11-18` with V11 (V12-XCONF-4).
* **Its own Fix list (§13) and hand-off rows — every item fixed in the text (or marked for the adjudicator with its reason); §13 keeps no open item:** V12-0394, V12-0395, V12-0396, V12-0397, V12-0398, V12-0399, V12-0402.
* **Hand-offs to close here (11):** V02:X33, V06:X9, V06:X19, V06:X31, V06:X38, V06:X49, V11:X-V12-1, V11:X-V11-12, V11:X-V11-14, V11:X-V11-16, V11:X-V11-17 (agreement.md lists each).
* **Edges (edges.md):** 40 UNDEFINED, 11 UNTESTED; 17 UNDEFINED combinations it owns.
* **Open findings routed here (34):**
  * VOL-V11-V12-RESTATEMENTS-011 [restatements; -] the item-110 off values listed again in NoOpPin.overlay's comment → **state it once at V11 §3.24.0 (switch table); every other place cites it**
  * VOL-V11-V12-RESTATEMENTS-012 [restatements; -] the raised-way calibration minima 0.02 (chance) and 1 (cap), also in J-V12.42, T-V12-39 and line 1879 → **state it once at V11 row 80 (IN-V11-1); every other place cites it**
  * V12-RESTATE-1 [restatement_findings; minor] V12 §3.7.8 (1) says V11 §3.24.0's switch table is 'the one statement of each off form' (round 2 removed the list there, SCC-35), yet §2.13's overlay comment still lists every off value (raisedWays chance 0, terrace.enabled false,… → **Cut the list from the comment; cite V11 §3.24.0's five row sets.**
  * V12-RESTATE-2 [restatement_findings; minor] The raised-way calibration minima (CITY and METROPOLIS chance 0.02, cap 1) are stated as values in both volumes (V11 only in an integration note; V12 in a rule, a decision and a test); the cells and their ColumnSpec belong to V11… → **Home the minima in V11 §3.24.2's raisedWays table (ColumnSpec stamp); V12 §3.7.2 (5) cites 'the owner-stamped minimum of the column'.**
  * V12-ICONF-1 [internal_conflicts; minor] The raised-way bump's records name 'the B-DOSSIER-lite towns carrying the water-system record (its factor on the aqueduct's chance, DR-V8.7)', but V11 withdrew the dossier factor (SS-13; V11 §3.24.7 (3) (b): 'the chance takes no … → **Reword: '... carrying the water-system record (its met need, cap step and cistern terminal, V11 §3.24.7 (3))'.** — *closed by:* conflict ruling V12-ICONF-1
  * V12-ICONF-2 [internal_conflicts; minor] States that V06's design has the dossier's water-system record as 'a factor on the aqueduct's chance' - withdrawn by V11 (SS-13; V11 §3.24.7 (3)(b)), and contradicted by V12's own §1b dossier table and J-V12.55 ('the chance facto… → **Reword to the met-need reading, or remove with the §13 narration.** — *closed by:* conflict ruling V12-ICONF-2
  * V12-XCONF-1 [cross_volume_conflicts; major] J122 (OWNER-DECISIONS-DELEGATED, V12 Q-V12-2) decided the owner's sittings happen 'only at the gating milestones (M1 look check, M2b, M4, M5), batched, about an hour each; a missed sitting leaves the milestone provisional - not r… → **Apply J122 at V12's sitting schedule (§0, §3.9, §8): sittings only at M1, M2b, M4, M5, batched; the other panels folded into those sittings or run as unrated; mark Q-V12-2 answered (J122).** — *closed by:* conflict ruling V12-XCONF-1
  * V12-XCONF-2 [cross_volume_conflicts; major] V12 §2.10 says 'the table content hash that pins an output version (§6.4) excludes provenance.evidence, so rewording or adding evidence never moves an output version'; V11 §2.2 puts evidence inside every compiled cell's provenanc… → **Rule once at the base's home (§6.4 / §7.6): the pinning hash covers value, unit, calibratable, extension, presets and excludes provenance (or evidence alone); V11 step 7 computes it that way and V12 §2.10 cites it.** — *closed by:* conflict ruling V12-XCONF-2
  * V12-XCONF-3 [cross_volume_conflicts; minor] V12's default metric `stages` name 'S5' and ranges 'S3 - S5', 'S12 - S12a' where base §4.1 registers the growth stage as four StageIds S5a-S5d (V11 expands a registry 'S5' as a group) and has no 'S12' (only S12a, S12b, S12c); V12… → **State metric stages as registered StageIds (S5a-S5d, S12a-S12c) or adopt V11's group-expansion rule for 'S5' by citation, and drop 'S12'.** — *closed by:* conflict ruling V12-XCONF-3
  * V12-XCONF-4 [cross_volume_conflicts; minor] V12 says it takes each unit 'as V11 §2.3 defines it at a plot' but defines district as 'the town's districts of >= 30 households (a smaller district is no unit)'; V11 §2.3's district unit is 'the plot's district' with no househol… → **Decide one definition: either V11 §2.3 adds the >= 30 households rule for the district unit (and S10b scores it so), or V12 §3.6 measures all districts and keeps the >= 30 filter only for the unit: 'district' forcing of 105 (k).** — *closed by:* conflict ruling V12-XCONF-4
  * V12-XCONF-5 [cross_volume_conflicts; minor] BCR-V12-4's base text reads 'whose decision rule is the owner's (volume 12 Q-V12-3)', still framing Q-V12-3 as open, while J122 decided it ('only where the owner's sitting passes them - as recommended'). The base text would carry… → **Cite J122's decision (the per-frame sitting rule of V12 §3.10.6) instead of 'Q-V12-3'.** — *closed by:* conflict ruling V12-XCONF-5
  * V12-ELEG-1 [elegance_candidates; minor] Producer and consumer of each record (CalibrationEntry, FramesFile, KnownCityFixture, NoOpPin, ...) are stated in both §1b and §2.11 (e.g. CalibrationEntry's writer and readers at §2.11 and at §1b); two lists to keep in step. → **Keep one table (§2.11 lifecycle with a consumers column) and let §1b cite it.** — *closed by:* elegance ruling (E-list)
  * V12-MISSING-1 [missing_parts; minor] J122 decided Q-V12-3 ('historical layers as defaults: only where the owner's sitting passes them - as recommended'); V12 still labels the rule 'default until ruled' and does not mark the question answered with J122 (principle (7)… → **Mark Q-V12-3 answered (J122) and drop 'default until ruled'.**
  * V12-MISSING-2 [missing_parts; major] J122 (OWNER-DECISIONS-DELEGATED-2026-09-29) decided the product order: after M4 four streams side by side (M5, V-M, M6-E, the plan rung's P0-P1), then M6 and M6-U after M5, then M6-sky, then M-CAL, then M-SF; M3c beside M3b; V-M0… → **Rewrite the order rule with J122's combined order (and keep 'two stages at unordered rows' only for rows J122 leaves parallel: M5, V-M, M6-E, P0-P1).**
  * V12-MISSING-3 [missing_parts; major] J122 decided all three: Q-V12-1 'no'; Q-V12-2 'only at the gating milestones (M1 look check, M2b, M4, M5), batched, about an hour each; a missed sitting leaves the milestone provisional - not rated'; Q-V12-3 'only where the owner… → **Mark each answered (J122) with its decision; drop the 'until the owner answers' preamble; carry Q-V12-2's decision into §0, §3.9.1, §6's sitting rows, §8.3 risk 6 and BCR-V12-6 (b)'s sitting list.**
  * V12-MISSING-4 [missing_parts; major] g item 111 names V12: 'V12 (the bars)' - 111 (d): on arid seeds the share of households within walking distance of water exceeds the non-arid baseline; oases only on arid sites unless drawn or dossier-supplied; arid sites still d… → **F-MISSING: register 111 (d)'s bars on V12's harness (StatBarSpec/NullModelSpec rows with levels and counts, the no-op pin on NoOpPin, the register lines for 111's new cells, budgets, T-V12 bars).**
  * V12-MISSING-5 [missing_parts; major] g item 112 names V12: 'V12 (the trial's record)' - 112 (b): a game-master trial (ten to twenty SettlementForge game masters, at least two sessions of play each, before public release) whose findings enter the calibration record a… → **F-MISSING: add the trial record (a record type beside ReconciliationRecord or a panel-like record, its lifecycle row, its place in the release gate, the bar 'report exists before release').**
  * V12-MISSING-6 [missing_parts; major] g item 113 names V12: 'V12 (the bars and the replay's budget)' - 113 (g): 'city to village' fixture shows walls and street lines beyond the present fabric and an oversized church with the dossier's present facts matching exactly;… → **F-MISSING: register 113's bars (fixture bars, byte-stability, the LOST/refound property as an exactMonotone-like step script, the no-op pin) and a §6 budget row for the history replay.**
  * V12-MISSING-7 [missing_parts; minor] 'A bar that counted refusals of item 110 or of the sky layer counts bends (each with its line)' - normative content living only in the note (which 'supersedes any sentence of this volume that reads otherwise'); no bar in §3.6b or… → **Fold into §3.6b (the indicator rule) and delete the note.**
  * V12-TERM-1 [terminology; minor] M4-110 is typed as a PanelGroup inside the M4 PanelSpec (panel id 'M4'), but prose in both volumes calls it a panel; PanelSpec's id list has no 'M4-110'. One concept, two names (panel vs group). → **Write 'the M4 panel's M4-110 group' (or 'panel M4, group M4-110') wherever a line names it.** — *closed by:* glossary (retired synonyms) / ID rulings
  * V12-TERM-2 [terminology; minor] Three unit vocabularies for one concept: V12's metric Unit ('m','m2','ha','deg','share','count','perHa','perKm','ratio','bits','ms','s','luma','rb','chroma','z','none'), V11's column unit ('m','m2','ha','cm','cdeg','share','weigh… → **One unit vocabulary in the base (§2.1) that V11 and V12 both cite, each narrowing it by a subset where needed.** — *closed by:* elegance ruling (E-list)
  * V12-NARR-1 [narration; minor] Eight stacked 'PENDING FABLE REVIEW' banners and six REVISION/RECONCILIATION/PROGRESS ledgers (~95 lines) narrate the text's evolution; principle (8) allows one marker line and principle (5) removes narration. → **Replace by the close's single marker line; delete the ledgers.**
  * V12-NARR-2 [narration; minor] Wiring rows and type comments carry pass narration ('reconciliation round 2's continuation, SCC-R1C-2; round 4's continuation, SCC-R3C-1', 'round 5, SCC-90; round 6, SCC-98, SCC-103', 'SCC-102', 'SCC-105', 'V11's round 1, SCC-08'… → **Strip from all V12 normative text; keep J-V12.n pointers.**
  * V12-NARR-3 [narration; minor] Type comments carry pass narration (principle (5)). → **Strip.**
  * V12-NARR-4 [narration; major] About 440 lines narrate the text's evolution (per-round CONFIRMED paragraphs with other volumes' md5s, disposition paragraphs by seam id, lane times); principle (5) removes them (the validation records keep them). They carry stal… → **Replace §12 by the current CONFIRMED/PLAUSIBLE list and §13 by an empty fix list; fold IN-V12-3 (count bends, not refusals) into §3.6b; delete the rest.**
  * V12-NARR-5 [narration; minor] Decision rows carry pass narration and superseded versions (J-V12.55 still leads with 'source values generated, declared and carried' before its amendment to two values; J-V12.21, J-V12.71, J-V12.72, J-V12.74, J-V12.77, J-V12.78 … → **State each decision in its current form; strip round headers and seam ids.**
  * V12-BREF-1 [broken_references; minor] V12's own convention (V12-0001) says '§ points into the base, V12 § into this volume', yet 30 bare § refs (15 body, 15 tail) name sections that exist only in V12 (base has no §2.13, §2.10, §3.10.1) or another volume's continuatio… → **Prefix them 'V12 §' (or the owning volume) - mechanical script.**
  * V12-BREF-2 [broken_references; minor] Same collision in V12: bare BCR-n ids resolve to both V01's and V04's numbering. → **Volume-qualify each.**
  * V12-HANDOFF-1 [handoffs_to_canon; minor] Hand-offs left open with deferral wording: 'the next round of each may cite the ids', 'each volume's next round may write the ids in its lines', 'V4 §8's row may take that order and cite V12's line at its next round', 'SCC-113, l… → **Close each at V01, V03, V04, V05, V06, V07, V02 (write the volume-qualified ids and the staged order in their lines; V04's BCR-45/J-V4.118 name raisedWays.structure.span.*) and restate X-V12-17..19 as closed.**
  * SCC-109's X-V12-18 clause [seam-r6-open (INDEX §7 fix list); minor] docs/volumes/critique/seam-content-calibration-r6.md SCC-109's X-V12-18 clause → **X-V12-18 states that V04's rows take V12's span-rule order (SCC-113 closes V04's side).**
  * V12:IN-V12-1 [integration-note; minor] * **IN-V12-1 (J-VI.17 H29; volume 5's §13 item 13).** The register lists `accessSiting.deckGapM` and `lineClearM` as volume 5's `IslandRule` cells (own, calibrate-later), never as volume 11 rows. → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V12:IN-V12-2 [integration-note; minor] * **IN-V12-2 (J-VI.10).** X-V12-9 is met by volume 11's IN-V11-1 (the `ownerRule` stamps and the raised-way calibration minima) and V11 §3.24.0's FM line (`presets.FM` resolving the stepped and deck families off; V11's round 1, S… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V12:IN-V12-3 [integration-note; minor] * **IN-V12-3 (J-VI.4).** A bar that counted refusals of item 110 or of the sky layer counts bends (each with its line). → **fold the note into the body at its home, then drop the note (S9, ID-WX)**
  * V12:IN-V12-4 [integration-note; minor] * **IN-V12-4 (J-VI.18, J-VI.3).** BCR-V12-15 and BCR-V12-17 are applied with BCR-V9-31 as file f item 447's one text; BCR-V12-15's closure barrier kinds are J-VI.3's six (edited in place); the metric variant also carries the span… → **fold the note into the body at its home, then drop the note (S9, ID-WX)**

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):** the normalisation of the 12 inventories (11 408 items, 940 findings) and every count in *Numbers* (scripts in work/canon/); the id census over the base, the rationale, INDEX, f, g, _integrate and the twelve volumes; the retired-synonym hit counts; the f parse (386 items, 200–585, none missing) and its routing by section; the wiring defects (90, wiring.json) each routed; the round-6 seam findings left open (INDEX §7) each routed; every conflict finding (164) ruled, and the four the canon adds.
**PLAUSIBLE (reasoned or scanned, not executed against a build):** the fact links of references (142 exact, 297 near, the rest to a home section — the editor confirms); the agreement verdicts 'agree' (no conflict found by the inventories, the seam rounds r0–r6 or the canon's value comparison — absence of evidence, which the seam checkers test); the edge catalogue's DEFINED/UNDEFINED/UNTESTED (a sentence scan of each mechanism's own text) and the combinations' evidence (one sentence naming both features) — both work lists that the edge checkers confirm; the elegance rulings' equivalence lists (built from the inventories' and the text's statements; each verifier checks them against the archive); the canon decisions J-C1–J-C4 (vetoable).

## Dated ruling 2026-09-30 — File g items 114–116 routed (orchestrator under J122; J127)

The owner's rules 114 (walls decay into gaps and patchwork and recover), 115 (a ceiling on building grandeur by settlement tier)
and 116 (a zoom-out limit) reached the program on 2026-09-30, after the canon and during the Rewrite phase. They are routed like
items 111–113: EVERY unit named writes its part at build depth as new design; a verifier raises F-MISSING where a part is absent;
the repair round writes a landed unit's part. Precedence: owner rules first (principle (3)).

### g item 114 — every unit named writes its part
* **model:** §2.7 `Enceinte.condition` — the values `standing` · `worn` · `patched` · `breached` · `dismantled` on item 575's knot profile; each run's material (robust or a patch row) and the epoch of its last change
* **determinism:** §7.1 and §7.4 (`repairWall` takes a material; lifecycle rows for `worn` and `patched`); §7.7 (a derivation row: defence readiness and wealth → the generation-time condition at table shares)
* **rendering:** §8.2 (state rows: `breached` as a break with rubble at every band, `patched` in its material's line style at every band, `worn` at district and finer; the legend; item 112's greyscale rule); §11 (exports carry condition and material; a battle-map export treats a patch as a wall, a breach as an opening)
* **scope:** §13.2 (the bars of item 114 (g)); the judgment index row
* **V06:** §3.7 (need and means as sustained drivers; the transitions of item 114 (c); patch then rebuild; the fabric cap)
* **V07:** the palisade's patch rows and its decay under the same rules
* **V08:** the dossier's `readiness` label and wealth as the drivers' inputs
* **V11:** patch materials by wall kind and culture; the rates and windows
* **V09:** the repair tool's material; the legend panel; **V10:** the story told per run; **V12:** register lines and bars

### g item 115 — every unit named writes its part
* **pipeline:** §4.2 S10b (the rung ceiling on the class mix; the "all manors" rule scoped to TOWN and above); §10.2 (the ceiling table's shape)
* **scope:** §13.2 (the bars of item 115 (f)); the judgment index row
* **V02:** the composition rows' ceiling by rung in the resolution chain (no `H`, `U`, court, tower or turret on a dwelling at THORP and HAMLET; at VILLAGE only the manor)
* **V07:** the village class mix, the manor's singleton rule (a lord or a dossier record), the wealth shift along capped rows
* **V08:** what "specified" reads from the dossier; **V11:** the ceiling table by rung; **V06:** epochs across a rung change
* **V09, V10:** a hand edit beyond the ceiling honoured (item 101 R2) and explained; **V12:** bars

### g item 116 — every unit named writes its part
* **rendering:** §8.8 (the per-map zoom-out limit on the pyramid: the stop where `bounds` fits the viewport's short side plus one stop); §9.5 (framing); §12.5 (budget); T-ER-08 restated (every rung draws every stop from its limit inward)
* **scope:** §13.2 (the bars of item 116 (e)); the judgment index row
* **V07:** §5.2's township view is the limit's view less its margin; **V09:** the view controls stop at the limit; **V12:** bars

## Dated ruling 2026-09-30 (later) — File g item 117 routed (orchestrator under J122; J128)

The owner's rule 117 (seasons) is routed like items 111–116: EVERY unit named writes its part at build depth as new design; a
verifier raises F-MISSING where a part is absent; a landed unit writes its part in the repair round. It is a LOOK only: no unit may
make a season change the model or its hash.

### g item 117 — every unit named writes its part
* **model:** §2.9 view state (the year position, week 0–51; the "follow SettlementForge" flag)
* **determinism:** §7.7 (a derivation row: the dossier's calendar week and season → the default view season; the climate's source order: SettlementForge's climate digest, else terrain type with height, else the user's)
* **pipeline:** §4.2 S0 and §10.2 (the biome climate row's season columns: winter severity; leaf, growing, harvest, ice and snow weeks)
* **rendering:** §8.2 (season rows: `ice` role and open leads, fields, gardens, orchards, hedges and trees through the year, snow by climate, boats hauled up; AUTUMN'S PLETHORA OF FALL COVERS, item 117 (f2): a keyed per-tree crown colour from a species palette, fallen-leaf cover on ground, streets, greens, roofs and still water deepening through the leaf-fall weeks, red creepers, rust bracken; the view sun's default height by week, item 102's model daylight untouched); §11 (exports draw and name the season; battle-map ice rule); §12.5 (the re-skin budget)
* **scope:** §13.2 (the bars of item 117 (i)); the judgment index row
* **V07:** the village's fields, strips, commons, green and pond through the year
* **V08:** reading SettlementForge's calendar and the climate digest
* **V11:** season tables by climate and by field, garden and water kind
* **V05:** the sky islands' seasonal look; **V09:** the season control and follow switch; **V10:** the explanations; **V12:** bars

## Dated ruling 2026-09-30 (later) — File g item 118 routed (orchestrator under J122; J129)

The owner's rule 118 (festival decorations) is routed like items 111–117: EVERY unit named writes its part at build depth as new
design; a verifier raises F-MISSING where a part is absent; a landed unit writes its part in the repair round. It is a LOOK only:
no unit may make a festival change the model or its hash. It supersedes the port's ignore-list entry for `traditions` (owner rule
first, principle (3)).

### g item 118 — every unit named writes its part
* **model:** §2.9 view state (festival display: follow / off / preview a festival id)
* **determinism:** §7.7 (`traditions` off the ignore-list: its window and staging consumed through a derivation row; the ignore-list entry amended; the week from item 117's year position)
* **pipeline:** §10.2 (the decoration table by tier and kind; the staging keyword table and the fallbacks by festival kind)
* **rendering:** §8.2 (the decoration rows by tier and band; keyed placement; culture and season motifs; never over a keep-out or a gate's passage); §11 (exports draw and name the festival; battle-map image only); §12.5 (lazy per-tile budget)
* **scope:** §13.2 (the bars of item 118 (h)); the judgment index row
* **V07:** the village and smaller rungs' decorations (garland, bonfire, maypole, the green, the church lane)
* **V08:** reading `traditions` and the custom-content traditions bucket at the baseline; window and staging mapping
* **V11:** the decoration, staging-keyword and culture-motif tables
* **V05:** the sky islands' pennants; **V09:** the festival list and switch; **V10:** the explanations; **V12:** bars

## Dated ruling 2026-09-30 (later) — File g item 119 routed (orchestrator under J122; J130)

The owner's rule 119 (as fast as possible; ten seconds of total time is the comfort level — REVISED the same evening) is routed like
items 111–118. §12's present laws stay the TARGETS; D-18's misses stay declared as target misses inside the comfort level. Interaction budgets are untouched: no unit may relax a frame, pan, zoom, drag, preview, hover, inspect or undo budget under it.

### g item 119 — every unit named writes its part
* **rendering:** §12 (§12.3 and §12.5's laws kept as the TARGETS — as fast as possible; the ten-second total-time COMFORT LEVEL for one-time waits, past which a wait fails; a step slower than its target only for a recorded measured gain; the progress rule past one second; D-18 re-declared as target misses inside the comfort level; §12.10's register rows)
* **scope:** §1 (the performance statement), §13.2 (bars), D-18's entry and the judgment index row
* **pipeline:** §4.1 (where stages may spend the quality budget, each use a table cell with its measured gain)
* **V06:** advance time and the history replay within the ceiling; **V07:** §6's village budgets; **V09:** the progress view
* **V01, V02, V03, V04, V05:** their budget sections read the ceiling for one-time waits and keep their interactive budgets
* **V12:** the bars and how each is measured
