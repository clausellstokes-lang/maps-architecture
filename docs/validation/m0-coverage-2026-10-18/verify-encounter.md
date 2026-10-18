# m0-coverage / verify-encounter — the SITE and ENCOUNTER CROP level (V14) need by need against M0

Lane: m0-coverage/verify-encounter (opus; J394, Fable-validated). A verifier seat: it builds the need-by-need table for
the third level of the owner's question — the world SITE and the ENCOUNTER CROP of V14 (G1–G8, E1–E4, R1–R4 2.5D) —
against M0's scope (`plat/docs/build/M0.md`), its §4b deferrals, the close gate (`plat/docs/build/M0-world-sites-gate.md`
and its check record) and the kernel as built (`plat/packages/kernel/API.md`, `plat/packages/kernel/src`). The verdict
is the Fable seat's (J390, J394); this record states statuses and their evidence, not the answer to the owner.
Started 2026-10-18 09:30Z; written as I went.

**The owner's question (verbatim, 2026-10-18 ~09:20Z):** "so verify for more or validate me. M0, as it stands can.
support all levels of the map building process form local settlement to world to encounter map in building?"

## Inputs read

| file | lines | md5 | how read |
|---|---|---|---|
| docs/validation/m0-coverage-2026-10-18/read-m0.md | 205 | — | whole |
| docs/validation/m0-coverage-2026-10-18/read-base.md | 392 | cd51f6f9 (its LANDED line) | whole |
| docs/validation/m0-coverage-2026-10-18/read-v13.md | 383 | — | whole |
| docs/validation/m0-coverage-2026-10-18/read-v14.md | 367 | — | whole |
| docs/validation/m0-coverage-2026-10-18/read-kernel.md | 617 | 5fed47d8 (its LANDED line) | whole |
| plat/docs/build/M0-world-sites-gate.md | 45 | b6c5be2a… | whole |
| plat/docs/build/checks/M0-world-sites-gate.md | 476 | 1e29aadc… | whole |
| docs/AMENDMENTS-2026-10-16j.md | 282 | 5e0f4ad9… | items 132–136 (:43–146), 140–141 and the BCR table (:206–282) whole |
| plat/docs/build/M0.md | 1287 | aedbbcee… | §1 (a) (:120–152), §4b (:830–880), §5 items 5–12 (:890–900) re-read for this lane (read-m0 read it whole) |
| docs/volumes/V14-sites.md | 3213 | 70d8aa1b… | §2.6–§2.7 (:1096–1127), §3.9 (e) (:1903–1934), §3.10–§3.13 (:1956–2126), §5.4 head and `verticalEnds` (:2571–2577, :2614–2621), §5.5 (:2623–2651), §5.7 (:2706–2724), §6 (:2734–2803), §8 (:2873–2946), §10.1 (:3019–3048) — each whole; grep of §2.5's parameters (:1038–1058) |
| docs/ARCHITECTURE.md | 24462 | 1f871a01… | §2.1 *Layers* and *Arena parts* (:554–574), §3.2 (1) (:4365–4374), §3.4 *Transient arenas* (:4961–5020), §16's milestone rows and staged table (:21660–21720) — re-read for this lane |
| plat/packages/kernel/src: types/ids.ts (whole), facade/types.ts (greps), facade/notBuilt.ts (:50–75), facade/kernel.ts (greps), tx/types.ts (:168–201, greps), tx/tx.ts (:83–89), arr/kerb.ts (:1–64), num/frame.ts (:15–40), invariants/rows.ts (:30–34), io/decode.ts (:250, :273–274), io/types.ts (:21–30), registry/index.ts (greps), rng/mixer.ts (greps), arena/plat.ts (:149, :242–260), registry/concerns.json (rows by script) | — | — | as named |
| plat/packages/kernel/API.md | 1059 | 468a2d1e… | :54, :418–432, :700–720 re-read |
| plat/packages/site/src/terrain/strategy.ts | — | — | :25–65 |
| plat/packages/model/src/identity/lineage.ts | — | — | :1–12, :34–35 |
| plat/docs/build/summaries/M0-d-06.json, M0-d-09.json; plat/docs/build/landed/ (listing) | — | — | fields by script |
| docs/PROGRESS.md J390 (:449), J391 (:450) | — | — | the rows re-read |
| workflows/lane-prompts/session-fix-cloud/specs.json rounds[63], [67], [77], [79], [80] | — | — | the `session` heads |

Marks: **READ** = seen in the text or code at the cite; **INFERRED** = my reading across cites, stated as such.
Statuses (the lane's own): SUPPORTED-NOW (spec'd, built, tested) · SPEC-NOT-YET-BUILT (in M0's scope, not landed or
mid-flight — the item or round named) · AFTER-M-1-BY-DESIGN (deferred on purpose: §4b, a gate row recorded as M1's,
or the base / V14 build plan assigning it to a named post-M0 milestone — the deferring text cited) · CARRIED-TO-M1 (a
gate row carried) · MISSING (needed, in no spec, not built, not deferred) · FORECLOSED (something M0 built or fixed
makes the need impossible or costly; shown with the exact limit and the exact need).

## The level's shape in one paragraph (each clause cited)

V14 adds four kernel-level things and leans on everything else the kernel already has: a fourth `Layer` value `site`
whose parts are numbered from 1 (BCR-V14-3, V14-sites.md:3025; READ), a transient arena owned by a view, not a
document (BCR-V14-4, :3026; READ), a `site` concern and stage ids (BCR-V14-14, :3036; READ) and the `passage` edge role
(BCR-V14-24, :3046; READ); the kernel otherwise "stays planar and stores no elevation (K13); every record on it carries
one" (:2573; READ), and every Z, datum, projection and vertical-link need is a model or view record (BCR-V14-5, -6, -7,
:3027–:3029; READ). The level's milestones are all after M0: M-ENC after M1, M-SITE-A after M6-U's U3b, M-SITE-F after
M-W1, M-25D after M4 (ARCHITECTURE.md:21716–21719 READ; V14-sites.md:2875–2886 READ).

## The need-by-need table

Group A — the gate's kernel rows (K1–K13; item 140 of AMENDMENTS-2026-10-16j.md:206–229, K13 at :249–250) as this
level needs them.

| # | need (cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| E-01 | A fourth `Layer` value `site` (levels of a world site), the kernel's `Layer` type appended, K1's append-only test the bar — BCR-V14-3 (V14-sites.md:3025); base ARCHITECTURE.md:556–559 ("the value is appended at M1's API pass and its parts exist only from M-SITE-A") READ | gate K1 (M0-world-sites-gate.md:17); checker: PLAUSIBLE, "Widening the `Layer` union itself is the exported-type change of the milestone that designs the world layer (M1 or later)"; smallest addition "one frozen `LAYERS` list … fixed-in-M0" (checks/M0-world-sites-gate.md:66–69) READ | `export type Layer = 'underground' \| 'ground' \| 'sky'` (kernel/src/types/ids.ts:14) READ; closed in four sites — ids.ts:14, io/format.ts:24–36, rng/layer.ts:8–19, arena/plat.ts:243–246 (checks:42–48 READ; plat.ts:244 READ) — plus the model's `arenaPrefix`/`parseAddress` (checks:58–59 READ); the one-list consolidation is NOT applied (ids.ts:14 still the union; read-kernel H5) READ | gate/layers.test.ts (5 cases): code 3 unassigned on both sides, the layer byte at offset 7 of the routes chunk, a document with no ground arena runs (checks:61–65 READ; ran green under Node 24.12.0 per checks:22 — not re-run here) | **AFTER-M-1-BY-DESIGN** (the checker's and the base's M1 API pass). Not foreclosed: both codes are positions, a fourth layer is code 3 "and no existing code moves" (checks:52–55 READ); the cost is a four-site source edit + the model's two functions (READ), not a format change |
| E-02 | Site parts ≥ 1, one per level, "no part 0", allocated once, never reused; each with its own frame — V14-sites.md:517–520; ARCHITECTURE.md:569–572 READ | gate K2 (gate:18) CONFIRMED; §4b "the underground parts' fixtures (item 65) → M6-U, hook: multi-part `PlatKey` supported by the arena" (M0.md:860) READ | `PlatKey = { layer; part }` (ids.ts:17); `isPlatKey` part 0 … 0x7fffffff (plat.ts:245); `createPlat(key, frame, …)` per arena (plat.ts:259) READ | gate/parts.test.ts "K2" (3 cases: ground/0, ground/7, underground/3 over independent frames; every ref form resolves on its part and empty elsewhere) (checks:83–88 READ) | **SUPPORTED-NOW** for the part mechanism on the three existing layers; on the `site` layer only after E-01 (INFERRED) |
| E-03 | Frame local, centred on (0, 0): the stable grid origin is "the arena's origin (0, 0) (§2.1: the frame's centre …)" (V14-sites.md:2048–2055); an attached site document's frame "is the host's `Frame` … (K3 holds …)" (:1226–1232) READ | gate K3 (gate:19) CONFIRMED by reading (checks:90–98) READ | `frameOf` "centred on (0, 0) with +y north" (num/frame.ts:21); the arena = frame + margin; refused at ≥ 2²³ (frame.ts:36) READ | test/num/frame.test.ts (constants, centring, the 2²³ boundary, :2, :45, :62–80) READ (names; not run) | **SUPPORTED-NOW** |
| E-04 | Every reference form resolves against a separately supplied key — T-V14-22 "resolves every reference form (`FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef`, `StretchRef` inside a batch) per part against a separately supplied key (K4)" (V14-sites.md:2852 via read-v14 F212) | gate K4 (gate:20) CONFIRMED (checks:100–109) READ | types/refs.ts:16–31; `resolve(p, ref, key)` (checks:103–106) READ | gate/parts.test.ts (the K2 cases resolve all five forms) (checks:85–88) READ | **SUPPORTED-NOW** |
| E-05 | The edge role `passage` appended "without digest change (K5)"; `chamber_wall`, `access_point`, `link_end`, `margin` reused on site parts — BCR-V14-24 (V14-sites.md:3046); ARCHITECTURE.md:909 ("read only from M-SITE-A") READ | gate K5 (gate:21) CONFIRMED; recommended `roles.snapshot.json` (checks:111–129) READ | roles.json 56 rows, append-only; `margin` id 9, `chamber_wall` 26, `access_point` 40, `link_end` 41 present, no `passage` (grep of src/arena/roles.json) READ; `LINEAR_PARTS` overridable by `TxEnv.chainParts` (tx/types.ts:192–193) READ | gate/roles.test.ts (4 cases: a role appended keeps every row) (checks:121–129) READ | **SUPPORTED-NOW** (the append mechanism; the row itself lands with M-SITE-A, ARCHITECTURE.md:909) |
| E-06 | The concern `site` and stage ids G1–G8, E1–E4 (BCR-V14-14, V14-sites.md:3036) — and R1–R4 per T-V14-32 (:2862) and ARCHITECTURE.md:10179–10180 ("appended at M1's API pass") READ; G5's ladder keyed on the stream's `attempt` with `EmbedRule.attempts` 3 (V14-sites.md:1058, :1738) READ | gate K6 (gate:22) CONFIRMED (checks:134–148) READ | concerns.json 93 rows, no `site` (script); stages.json 25 rows, no G/E/R (read-kernel B26) READ; attempt is a u8 lane (rng/mixer.ts:14) and each concern row writes its own cap — "default", a number, or null (registry/index.ts:37), "default" = 2 (registry/index.ts:16–21) READ | gate/registries.test.ts (3 cases: a concern and a stage appended keep every id; the new pair's stream distinct) (checks:143–148) READ | **SUPPORTED-NOW** (the mechanism). INFERRED: the `site` row must state a numeric cap ≥ 3 for G5's three re-runs — a row value, not a limit (the u8 lane holds 255) |
| E-07 | G-stages commit kernel batches on site parts, so their ranks enter the u8 face rank beside the base's and V13's frame-side stages — V14-sites.md:1244–1250 READ | gate K7 PLAUSIBLE; "Smallest addition (M1, with the rank table): the rank table versioned" (checks:150–159) READ | `LevelFaces.stage: Uint8Array`, rank checked 0 … 255 (checks:154–156; tx/tx.ts:70–75 per read-kernel B7) READ | no test pins two registries (checks:157) READ | **AFTER-M-1-BY-DESIGN** (K7's addition is M1's). Not foreclosed — INFERRED count: 25 stages now + V13's 18 (W0–W9, W6a/W6b/W7a/W7b/W8a/W8b, WORLD_PLACE, WORLD_CASCADE; read-v13 F233) + V14's 16 (G1–G8, E1–E4, R1–R4) = 59 ≤ 256 |
| E-08 | A site document of two levels round-trips save → load → save digest-equal (T-V14-22, V14-sites.md:2852 via read-v14 F212) | gate K8 CONFIRMED (checks:161–172) READ | io/decode.ts (`decodeArena(chunks, key, opts)`, :250) READ | gate/parts.test.ts "K8" (2 cases on ground/7, underground/3) (checks:166–172) READ | **SUPPORTED-NOW** (per part; the document around it is E-35's) |
| E-09 | A transient arena whose `owner` is `view:<hash64>`, "no kernel type change" — BCR-V14-4 (V14-sites.md:3026), E4 (a) (:2076–2078) READ | gate K9 CONFIRMED "(type-level; nothing built)" (checks:174–181) READ | `TransientKey = { readonly transient: true; readonly owner: Id; readonly n: number }` (facade/types.ts:28), `Id = string` (ids.ts:5) READ | compile-time only (tsc -b exit 0, checks:449–451); no runtime test can exist before M6-P (INFERRED) | **SUPPORTED-NOW** (type-level only — the one thing M0 can hold here) |
| E-10 | Every persisted block names its versions — a site document "names every version" through the shared manifest (V13 §2.7 via read-v13 F88; T-V14-22's round trip) | gate K10 **FAIL, carried-to-M1**; smallest addition "the M1 manifest names `ENGINE_VERSION` …" (checks:183–199) READ | chunk header names `FORMAT_VERSION` and `ROLE_REGISTRY_VERSION` only (checks:185–186) READ | — | **CARRIED-TO-M1** |
| E-11 | No kernel branch on a domain role beyond the defaults (the site kernel adds `passage` with widths through `SpineWidths`, no new branch) — V14-sites.md:1626–1636 READ | gate K11 FAIL (documentation), fixed-in-M0 (checks:201–219) READ | the four extra literals documented: API.md:55 (C-0374) READ | the check's grep (checks:203–209); no standing test (INFERRED) | **SUPPORTED-NOW** (fixed-in-M0 by C-0374; evidence a grep, not a standing test — noted) |
| E-12 | A reason record per generated fact; G-stages' records persisted (V14-sites.md:1112–1127); V13 takes `inputs` "from the kernel's commit journal (K12) for a frame stage that runs a kernel transaction" (read-v13 F61) READ | gate K12 **FAIL, carried-to-M1** — "`CommitRecord.stage`, `.batch` … `reads: GeomRef[]`" (checks:221–236) READ | `CommitRecord` fields without stage/batch/reads (tx/types.ts:99–122 per read-kernel H6) READ | — | **CARRIED-TO-M1** |
| E-13 | The kernel stays planar and stores no elevation; projected coordinates are screen doubles, "the model is never touched (K13)" (V14-sites.md:2573, :2635) READ | gate K13 CONFIRMED (checks:238–253) READ | `LatticePoint = { x, y }`; vertex columns x, y, out, level, flags (checks:240–243) READ | gate/no-elevation.test.ts (3 cases: z-like-name lint, type pins) (checks:248–253) READ | **SUPPORTED-NOW** |

Group B — the gate's model rows (M1–M11; item 140 :222–225, item 141 (c) :249–254). The gate spec: "a model row (M) is
recorded now and is M1's to change" (M0-world-sites-gate.md:7) READ.

| # | need (cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| E-14 | Cross-document ids written whole with the other document's namespace (`<ns>:site2/unit:k`), SiteReach across documents (V14-sites.md:1130–1136 via read-v14 F71; base :10580 per read-base 191) | gate M1 **FAIL by design, carried-to-M1** (checks:259–278) READ | address `[prefix]kind:token`, lineage ten lanes with no document lane (model/src/identity/lineage.ts:8–9, :35) READ | — | **CARRIED-TO-M1** |
| E-15 | The carve delta: V14's `moat` pre-edit "then V13's cascade fills it" (V14-sites.md:1429 via read-v14 F99), V13's `preCarveHeightAt` (read-v13 F177) | gate M2 **FAIL in part, carried-to-M1** (checks:280–296) READ | `carveCourse` returns `carvedCells` as a count (checks:282–286) READ | — | **CARRIED-TO-M1** |
| E-16 | The site's datum "the ground height at the anchor or the frame's charter datum" (V14-sites.md:599–600 via read-v14 F51); base `datumOf(doc)` (ARCHITECTURE.md:962 per read-base 33) | gate M3 PLAUSIBLE, "smallest addition (M1, with S11's first reader)" (checks:298–308) READ | `Terrain.datumCm` declared (model/src/records/site.ts:58), written once, read by no other code (checks:300–305) READ | — | **AFTER-M-1-BY-DESIGN** |
| E-17 | The water table: G2's `levelsBelow` "each level's floor … tested against the water table" (V14-sites.md:1353) READ; G6's governing surface underground (V13 §3.13 via read-v13 F186) | gate M4 PLAUSIBLE, **carried-to-M1** (checks:310–317) READ | stand-in inline `LOW_BAND_M` (checks:312–314) READ | — | **CARRIED-TO-M1** |
| E-18 | A free-standing site's S1 "under the charter ('M5's one input record')" (V14-sites.md:1434–1441 via read-v14 F101) | gate M5 PLAUSIBLE, addition "at M0-x-04's registration" (checks:319–330) READ | three entry points (checks:326–328) READ | — | **AFTER-M-1-BY-DESIGN** |
| E-19 | A free site's `Placement` lives in the world document, "never in any digest" of the site's; moving it leaves "every arena of the site byte-identical" (V14-sites.md:539, :1417–1422 via read-v14 F46, F98) | gate M6 CONFIRMED (kernel) / PLAUSIBLE (model): "a record outside the arena … touches no arena digest by construction" (checks:332–341) READ | level digest = layer code, part, level, lattice content only (levelDigest.ts:772 per checks:334) READ | — (reading) | **AFTER-M-1-BY-DESIGN** (the record kind at M1; the kernel half already holds by K3) |
| E-20 | The `SiteAnchor` record (item 133 (a), AMENDMENTS-j:83–84) — BCR-V14-1 (V14-sites.md:3023) READ | gate M7 PLAUSIBLE, M1's (checks:343–352) READ | no document reference type (checks:345) READ | — | **AFTER-M-1-BY-DESIGN** |
| E-21 | Reason records reserved per generated fact (V14 §2.7, :1112–1127) READ | gate M8 CONFIRMED (model side); "Its kernel half is K12's" (checks:354–361) READ | `DerivationRecord` outside the model digest, inside the records digest (checks:356–359) READ | — | **AFTER-M-1-BY-DESIGN** (the kernel half is E-12, carried) |
| E-22 | `ZDecl` per drawable kind in §2.8's registry, the lint T-V14-16 "a kind without a row fails CI" (V14-sites.md:2573–2577; BCR-V14-5 :3027) READ | gate M9 PLAUSIBLE with the gap list; "Smallest addition: none at M0" (checks:363–385) READ; M0-m-01 defers "the entity registry and its path-completeness test → M1" (M0-work.json:858) READ | 15 M0 record kinds, "The registry itself … is M1's" (model/src/schema/kinds.ts:1–3 per read-kernel C3) READ | — | **AFTER-M-1-BY-DESIGN** |
| E-23 | `verticalEnds(id)` and `VerticalLink`'s two stored ends with elevations (M10) — BCR-V14-6 (V14-sites.md:3028), :2614–2621 READ | gate M10 PLAUSIBLE "(no such record exists)" (checks:387–394) READ | no stair/shaft/ramp/trapdoor/access record (checks:389–392) READ | — | **AFTER-M-1-BY-DESIGN** |
| E-24 | `projection` per-viewer view state outside every digest; `StyleSheet.projection`; 2.5D tile key (M11) — BCR-V14-7 (V14-sites.md:3029); :2625–2627 READ | gate M11 PLAUSIBLE (checks:396–405) READ | no projection state anywhere; no style store at M0 (checks:398–403) READ | — | **AFTER-M-1-BY-DESIGN** |

Group C — multi-level arenas below and above ground; the Z axis and the datum.

| # | need (cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| E-25 | Each site part laid by the five-level ladder "L0 rock and margin, L1 passage and wall chains, L2 bands, L3 unit faces, L4 built things" (V14-sites.md:1258 via read-v14 F92; :1626–1636) | M0 (a): "one arena per layer with the five levels as views" (M0.md:126–127) READ | `Level = 0 \| 1 \| 2 \| 3 \| 4` (ids.ts:11); five `LevelFaces` (read-kernel B2) READ | the arena/level suites (test/arena, test/tx; names per read-kernel G1) READ (names) | **SUPPORTED-NOW**. Not foreclosed: the ladder uses exactly L0–L4 (READ both) |
| E-26 | Levels above ground are V03 storeys of a site building, "never a part" (V14-sites.md:517–520); their plans cut on transient arenas (ARCHITECTURE.md:4961–4963) READ | §4b: transient arenas → M6-P (M0.md:854); M0-m-01 defers "every record of §2.5–§2.7 M0 does not read (Building, …) → M1 and later" (M0-work.json:857) READ | no Building/Storey record (read-kernel C3) READ | — | **AFTER-M-1-BY-DESIGN** |
| E-27 | `Document.nextSitePart` in the canonical form, never decreasing (V14-sites.md:1197 via read-v14 F81; ARCHITECTURE.md:3863) | §4b: "the `.plat` document … → M1" (M0.md:844) READ | no Document (read-kernel C6: `StageEnv.doc` "M1, §4b") READ | — | **AFTER-M-1-BY-DESIGN** (base text conflict noted, O4) |
| E-28 | Arena isolation across parts: a site part's batch writes only its own arena (SC2 "a `site` part never overlaps another part's elements", V14-sites.md:2195 via read-v14 F169) | M0-a-14 defers "arena isolation across parts → M3a / M6-U (the one-arena case asserted now)" (M0-work.json:1746) READ | invariant row `arena-isolation` "(the one-arena case now; across parts M3a / M6-U)" (invariants/rows.ts:31) READ | the one-arena case (M0-a-14) | **AFTER-M-1-BY-DESIGN** (base's row names no site part, read-base 141; O6) |
| E-29 | Cross-part joins: a `VerticalLink`'s two ends are `link_end` vertices on kerb or wall (V14-sites.md:655–660, :1700–1708 via read-v14 F54, F117); links with ends on an `underground` and a `site` part (BCR-V14-11, :3033) READ | base rule 2: "cross-arena links are entity ids, each end naming at most one vertex in its arena" (ARCHITECTURE.md:706–717 per read-base 20) | `link_end` (id 41, indexed vertex), `access_point` (id 40) in roles.json READ; refs resolve per supplied key (E-04) | gate/parts.test.ts (per-part resolution) READ | **SUPPORTED-NOW** (the kernel half; the link records are E-23's) |
| E-30 | Stacked spaces are "separate arenas or levels … never a chamber above a chamber in one arena" (V14-sites.md:2682–2685; item 141 (b), AMENDMENTS-j:246–248) READ | the hard rows "faces simple, no two edges cross; nesting" (ARCHITECTURE.md:5580–5599 per read-base 140) | the planar subdivision and its invariant suite (M0-a-14) | B-FUZZ 0 crashes/invalid (summaries/M0-k-04.json per read-m0 D9) READ | **SUPPORTED-NOW** (planarity is what forces stacking into parts, E-02) |
| E-31 | Adoption: "Every `site` part becomes a `site` part of the settlement document by its `nextSitePart`, addresses re-prefixed and re-namespaced" (V14-sites.md:1917–1919) READ; "every address keeps its token and changes only its part prefix (`site2/unit:k` → `site7/unit:k`)" (:1167–1170 via read-v14 F76) — i.e. one part's arena re-keyed to a new `PlatKey` with every owner and role entity id rewritten | **no text** names the mechanism: §3.4's complete list of writers and services holds no re-key (ARCHITECTURE.md:4797–4852 per read-base 99–100); the gate's K2/K8 test parts under their own keys only (checks:83–88, :166–172) READ; item 134 (d) says the multi-part and namespace rows "protect" adoption (AMENDMENTS-j:117–120) READ | `decodeArena(chunks, key, opts)` refuses "a chunk of another arena" (io/decode.ts:250, :274) READ; `DecodeOptions` = `index?`, `digests?` only (io/types.ts:21–30) READ; `Plat.key` readonly (plat.ts:149) READ; no rekey/rename service in src (grep) READ | none | **MISSING** — not FORECLOSED: the key is one header value checked by equality (decode.ts:274) and owners are interned strings (INFERRED); see Blockers B-1 |
| E-32 | The datum and heights the site's ground reads: Int32 cm above `datumCm`, every raster write through one door; the pre-edit's `amountCm ≤ maxShapeCm` 600 cm (V14-sites.md:1056) inside the 10 km `reliefLimitCm` READ | M0-e-01 builds "the height raster (… Int32 cm above datumCm; reliefLimitCm 10 km) written through the range check" (M0-work.json M0-e-01 per read-m0 C20) READ | site/src/terrain/range.ts:1–6 ("the one door"), `Terrain.datumCm`, `heightCm` (records/site.ts:58–60 per read-kernel C2) READ | site/test/terrain/range.test.ts, site/test/water/one-door.test.ts (C-0251, choices.md:260 per read-m0 E9) READ | **SPEC-NOT-YET-BUILT** (built and tested, but the owning item's round is mid-flight: "P e-01 s1 (wip/child-e01s1, held)", PROGRESS.md:449 — the same rule as E-46 … E-51) |
| E-33 | Levels below the datum as record fields: `SiteLevel.elevationCm`, `Unit.floorCm`/`ceilingCm`, a level's floor at `datumCm − n × (ceilingCm + wallCm)` (V14-sites.md:639–642, :666–668 via read-v14 F53, F55; :1353 READ) | base: staged records "schema-complete and empty until M-SITE-A" (ARCHITECTURE.md:3537 per read-base 250) | none | — | **AFTER-M-1-BY-DESIGN**. Foreclosure checked and not found: these are `Cm` record fields (i32, ±2.1 × 10⁹ cm); the 10 km `reliefLimitCm` binds height-raster writes only (range.ts:1–6 READ) and the kernel reads no elevation (E-13) — INFERRED |
| E-34 | The display list carries `z: i32`, `elevationCm: i32` (ARCHITECTURE.md:554–555 READ) and gains `baseCm`/`topCm` (BCR-V14-5) for the depth key's `zOrder` "the flat `z`" (V14-sites.md:2636–2643) READ | §4b: "`RH32` (§8.1), rendering, labels, exports, edits → M1 – M3a" (M0.md:861) READ | none | — | **AFTER-M-1-BY-DESIGN** |

Group D — the creation-prefix terrain pre-edit.

| # | need (cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| E-35 | A site document whose creation prefix holds the drop (or promotion) event, the charter and the pre-edit, replayed byte-identically on every open (V14-sites.md:1213–1217, :1431–1432 via read-v14 F84, F100) | §4b: the `.plat` document → M1 (M0.md:844); the log is M2a's (ARCHITECTURE.md §16 M2a row, :21688 READ) | no document, no log (read-kernel E4: "a scoped re-derivation is the edit log's (M2a)") READ | — | **AFTER-M-1-BY-DESIGN** |
| E-36 | The pre-edit is "one `setField { field: 'terrain', stroke }`" — `level` a `flattenTo`, `raise`/`cut` a Δ with cosine falloff, `moat` a cut ring, `cliffFace` a cut; "The stroke's `water` is `locked`" (V14-sites.md:1424–1432 via read-v14 F99, F100) — S1's terrain operator with exact re-basing (§7.3 (a), ARCHITECTURE.md:11721–11752 per read-base 221) | §4b: "clear regions, prepared contacts, carves, S1's water operator … → M3a" (M0.md:851); "edits → M1 – M3a" (M0.md:861); base M3a: "S1's water and terrain operators with re-sited crossings and exact re-basing (§7.3)" (ARCHITECTURE.md:21690 READ) | `KernelTx.clearRegion`/`prepared` refused `notBuilt('M3a')` (tx/tx.ts:88–89) READ | — | **AFTER-M-1-BY-DESIGN** |
| E-37 | S1 on frames the base never generates: a 100 m crop frame (V14-sites.md:1980–1997), a free site's `max(envelope radius × 4, 120 m)` frame (:1434–1441 via read-v14 F101), ≤ 240 m in §6 (:2765) READ | M0 (e) builds S1 at CITY on the flat and river fixtures; "S0's expansion — any other rung, population or aspect — is M1's and refused by name" (layout/src/pipeline/base.ts:1–27 per read-kernel E2) READ | `siteFrame` takes `areaHa` (site/src/terrain/strategy.ts:35–46) and `frameOf` any positive area (num/frame.ts:24–40) READ; `baseTerrain` refuses a non-base rung (strategy.ts:57) READ | — | **AFTER-M-1-BY-DESIGN** (M1's S0; M-SITE-F's frame). Not foreclosed: frame size is a parameter (READ); the rung's raster cells at a 100 m frame are a table question (INFERRED) |

Group E — the transient arena for a crop; promotion into a persistent arena.

| # | need (cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| E-38 | `transientArena`, `readBack`, `release` built — "The crop opens one `transientArena` (§3.4) in the generation worker" (V14-sites.md:2076); SE0 "the owner-less transient arena … opened over a crop's rectangle minus twenty rings" at M-ENC's start (:2889) READ | §4b: "transient arenas, `readBack`, `release`, the re-cut (§3.4) → M6-P; hook `TransientKey`, `ArenaKey` declared (C-0041); `tileRings` built" (M0.md:854); §5 item 11 (M0.md:899); base: "the kernel's stub row (`API.md` §8) builds the form at M6-P, its first view owner is M-ENC's" (ARCHITECTURE.md:4965) READ | three `NotBuiltStub<'M6-P'>` (facade/types.ts:109–111; facade/kernel.ts:256–258 "the plan rung is its first reader"); `tx` on a TransientKey throws `notBuilt('M6-P')` (tx/tx.ts:83); STUB_TABLE rows (facade/notBuilt.ts:60–63) READ | test/facade/stubs.test.ts ("every row answers a §4b row …", :102) READ (names) | **AFTER-M-1-BY-DESIGN** — with a sequencing conflict in the design, O2 |
| E-39 | Its lifetime: "lives while the encounter does — released by `encounter.close`, never at a derivation call's end" (V14-sites.md:2086–2087; BCR-V14-4) READ | the base text now carries both lifetimes (ARCHITECTURE.md:4965) READ; build at M6-P (M0.md:854) | nothing reads `owner` (checks:178–179) READ | — | **AFTER-M-1-BY-DESIGN** |
| E-40 | One seed ring (the crop's rectangle) and `fixed` rings for "every footprint, water face and underground element face of the resolved set clipped to the rectangle" in that one arena (V14-sites.md:2078–2081) READ | base §3.4: fixed rings "interiors pairwise disjoint"; a fixed ring that "overlaps another fixed ring" is refused, detail `overlap` (ARCHITECTURE.md:4971, :4985–4986) READ | nothing (stub) | — | **AFTER-M-1-BY-DESIGN** (M6-P). A contract conflict between V14 and the base, not M0's: O1 |
| E-41 | Items enter "through the face partitioners only — … `splitFace` …, a strip item … by `partition` of that face — never by `insertChain`" (V14-sites.md:2081–2085) READ | base §3.4: writers on a transient arena are `splitFace`, `connectHole`, `radialSplit`, `ringBand`, `mergeFaces`, `absorbSliver`, `setOwner` (ARCHITECTURE.md:5007–5008) READ | the partitioners are built for plats (OP_KINDS, tx/types.ts:64–68 per read-kernel B16) | test/faces/* (names) | **AFTER-M-1-BY-DESIGN** (O3: `partition` names no kernel writer) |
| E-42 | Line of sight, the hit stack and the export read items "by one `pointLocate` on the arena" (V14-sites.md:2085–2086) READ | M6-P (M0.md:854) | façade `pointLocate(key: ArenaKey, …)` and `faceNeighbours(key: ArenaKey, …)` (facade/types.ts:102–103) READ; `platOf` throws `notBuilt('M6-P')` for a TransientKey (facade/kernel.ts:99–100) READ | — | **AFTER-M-1-BY-DESIGN** (the signature already takes the key — no change later, C-0041) |
| E-43 | The world crop frame on that arena: V13's transient `charterFor`, S1's terrain and water, "the charter's `roads` as way bands … (`corridorUnion` over the route's polyline …)", S12a's cover, "all as `fixed` faces of the arena" (V14-sites.md:1980–1997) READ | V13 is outside M0 (M0.md:70–72 clean-room "M0: none", per read-m0 A6); "Until V13 lands the world click is refused `refuse.encounter.noWorld`" (V14-sites.md:1996–1997) READ | none; `corridorUnion` is not offered on a transient arena (ARCHITECTURE.md:5009–5011) READ | — | **AFTER-M-1-BY-DESIGN** (M-W1+/M-SITE-F). INFERRED not foreclosed: the bands can be built on a scratch plat or by the read-only `buffer` service and entered as fixed rings (O3) |
| E-44 | Promotion: **Keep this** emits one `promoteEncounter`; the card is `persistent`; "its document materializes on first open as any card's" (V14-sites.md:2108–2123) READ — no geometry crosses from the transient arena (read-v14 F159, INFERRED) | the event: base §7.1 "(M-ENC)" (ARCHITECTURE.md:11168 per read-base 262) READ; the card M7 (E-20) | the persistent writers on a `PlatKey` arena (E-25, E-46…E-50) | — | **AFTER-M-1-BY-DESIGN**. Not foreclosed: no transient → persistent copy is designed; were one needed, `readBack` returns rings as values (ARCHITECTURE.md:4973–4975 READ) |

Group F — the G5 embedding operators and the failure contract (the persistent site's geometry).

| # | need (cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| E-45 | `medialAxis`, `voronoiEdges`, `delaunay`, `hexLattice`, `noiseStream`/`fbm`, `astar`, `obb`, `lir`, `sideRuns`, `sampleBoundary`, `simplify`, Chaikin (V14-sites.md:1599–1656 via read-v14 F105–F112; :240 F6) | M0 (a) (M0.md:125–130); M0-a-12 "the sampled medial axis over `delaunator`" (M0.md:483) READ | medial/axis.ts:310, medial/dual.ts:53, adapters/delaunator.ts:44, geom/hex-lattice.ts:44, noise/index.ts:85, :185, geom/path.ts:235–244, geom/obb.ts:106, geom/lir.ts:268, geom/side-runs.ts:150 (exports grep) READ | test/medial/{axis,dual,delaunay}.test.ts; test/geom/{hex-lattice,path,hull-obb,lir,side-runs,boundary,curves}.test.ts; test/noise/fbm.test.ts; test/warp/simplify.test.ts (names and grep) READ — not run | **SUPPORTED-NOW** |
| E-46 | L1 passage and `chamber_wall` chains entered by `insertChain` (V14-sites.md:1626–1636) READ | M0-a-05 insertion II (M0.md:376) READ | built (insert/) | test/insert/* (names); **round a-05 s9 mid-flight** ("L a-05 s9 build (wip/child-a05s9)", PROGRESS.md:449; its FIX-NOW rows, specs.json rounds[77]) READ | **SPEC-NOT-YET-BUILT** (mid-flight: a-05 s9) |
| E-47 | L2: "one L2 batch `corridorUnion` over the part's L1 faces … with half-widths from the site kernel's `SpineWidths` callback for `passage` chains" (V14-sites.md:1631–1634) READ | M0-a-09 builds the bands "On any arena by key"; defers "the underground parts' and raised parts' use → M6-U, M3a (the same functions by key …)" (M0-work.json:1437) READ | `corridorUnion(o, l1Faces, widths: SpineWidths)` (API.md:707–708); spines are "every (role, entity) chain … for which the caller's width declaration gives a positive half-width" (arr/kerb.ts:10–13); `SpineWidths = (chain: ChainRef) => SpineWidth \| null \| undefined` (kerb.ts:65); `KernelOptions.spineWidths` (API.md:418–427) READ — role-agnostic, so `passage` needs no kernel change | test/arr/bands/corridor.test.ts:476 ("the same function on another arena, by its key: tunnel chains on the underground's part 0, a gallery on part 1") READ; **round a-09 s7 check mid-flight** (PROGRESS.md:449) on the kerb's "silently wrong committed record" class (specs.json rounds[63]) READ | **SPEC-NOT-YET-BUILT** (mid-flight: a-09 s7) |
| E-48 | Clipping every footprint, water face and element face "to the rectangle" (V14-sites.md:2079–2080); round-joined bands by `buffer` (E-43) READ | M0-a-08 arrangement I (booleans, buffer, offsetFace, insetRing) (read-m0 F8) READ | built (arr/) | test/arr/booleans-buffers/* (names); **round a-08 s4 check mid-flight** (PROGRESS.md:449; specs.json rounds[80]) READ | **SPEC-NOT-YET-BUILT** (mid-flight: a-08 s4) |
| E-49 | "skeleton and medial axis are the kernel's own, validated, deterministic" (V14-sites.md:1722–1732 via read-v14 F119) | M0-a-11 the straight skeleton (read-m0 F8) READ | built (skeleton/) | test/skeleton/* (names); **round a-11 s4: build LANDED 11:05Z, its check started 11:06Z and stopped** (PROGRESS.md:449) READ | **SPEC-NOT-YET-BUILT** (mid-flight: a-11 s4 check) |
| E-50 | `setOwner` (L3 unit faces), `splitFace` and the other face writers on persistent site parts (V14-sites.md:1635) READ | M0 (a) (M0.md:125–130) READ | built (faces/, tx/) | test/faces/*, test/tx/* (names) READ | **SUPPORTED-NOW** |
| E-51 | "A kernel refusal (`E_DEGENERATE` on a chamber ring, `E_LEVEL`, `E_STRUCTURAL`) takes the same rungs" — typed results, never a throw (V14-sites.md:1734–1739; F-SITE :2129–2131 via read-v14 F120, F160) | M0 (a) bars NOW: B-FUZZ 0 crashes / hangs / invalid on 10⁶ inputs per primitive (M0.md:131) READ | `KernelResult` with 18 codes (API.md:294–309 per read-kernel A16) READ | summaries/M0-k-04.json: `runsPerPrimitive` 10000, crashes 0, hangs 0, invalid 0, `pass` true (script) READ — the bar asks 10⁶ per primitive (M0.md:131) READ; **round k-04 s1 mid-flight** (PROGRESS.md:449) READ | **SPEC-NOT-YET-BUILT** (mid-flight: k-04 s1; the summary read records 10⁴ runs per primitive against the 10⁶ bar) |

Group G — determinism.

| # | need (cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| E-52 | The same encounter and the same site document byte for byte "on the five engines" (T-V14-1, T-V14-25; V14-sites.md:2831, :2855 via read-v14 F205, F213; :2222–2224) | M0 (d) bar NOW: "digests identical on Node arm64, Node x64 (Rosetta), Chromium, Firefox and WebKit, workers on and off, 100 seeds" (M0.md:219) READ | the cross-host harness (testkit crosshost, read-kernel F4) READ | summaries/M0-d-06.json: `ran` 2, `blocked` 8, `verdict` "incomplete"; M0-d-09.json: `seeds` 2, "incomplete" (script) READ; the Mac-only steps sequenced after pass B (PROGRESS.md:450, J391 (5) per read-m0 F9) READ | **SPEC-NOT-YET-BUILT** (M0-d-06 / M0-d-09 incomplete) |
| E-53 | "every transcendental goes through `dmath` (§6.5)"; integer cm; ties by address (V14-sites.md:2221–2222 via read-v14 F173) | M0 (d): dmath (M0.md:215–225 per read-m0 A13) READ | dmath = fdlibm 5.3 (API.md:262–288 per read-kernel A15) READ | test/dmath/{kat,properties,lint}.test.ts (names) READ | **SUPPORTED-NOW** |
| E-54 | "two sites never share draws": the card is the site document's town root (V14-sites.md:1136–1139 via read-v14 F72) | M0-d-05a lineage (read-m0 C15) READ | `mintTownRoot` (model identity/mint.ts:264–270 per read-kernel C8); entity key = seedKey ⊕ (lineage, layer code, part) (rng/mixer.ts:123–139 per read-kernel L1) READ | the distinctness spike: streams 19 103 distinct, 0 collisions (summaries/M0-d-09.json per read-m0 D7) READ | **SUPPORTED-NOW** for the in-document mechanism (the cross-document half is E-14, carried) |

Group H — the 2.5D renderer (R1–R4).

| # | need (cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| E-55 | Z-completeness: every drawable kind declares `ZDecl`, the registry lint (V14-sites.md:2573–2577) | E-22 | E-22 | — | a cross-reference to E-22 — **not counted** |
| E-56 | The depth key `(layerOrder, bandIndex, depth, zOrder)` with `layerOrder` "the `LayerSpec.zOrder`" and `zOrder` "the flat `z` (§2.1)"; painter's order or a per-tile depth buffer (V14-sites.md:2636–2643) READ | §4b rendering → M1 – M3a (M0.md:861); M-25D after M4 (ARCHITECTURE.md:21719) READ | none | — | **AFTER-M-1-BY-DESIGN** |
| E-57 | 2.5D tiles: content found "by the flat static index over the **un-projected extent** of the tile … no second index exists" (V14-sites.md:2645–2649) READ | M0-a-03 the spatial index (M0.md:460) READ | static packed partitions + dynamic grid (index/spatial.ts:1–14 per read-kernel B21) READ | test/index/{query,pointlocate,rebuild}.test.ts (names) READ | **SUPPORTED-NOW** for the index the tiles read; the tile set **AFTER-M-1-BY-DESIGN** (M-25D) — counted once, as SUPPORTED-NOW, for the kernel half |
| E-58 | Hit testing: "The hit's **address** is the flat view's answer at that model point: `pointLocate` on the layer and part the drawable lies in" (V14-sites.md:2718–2721) READ | M0-a-03 "`pointLocate` (§3.4)" (M0.md:460) READ | `pointLocate(key: ArenaKey, level, p)` (facade/types.ts:102, :142); index/query.ts:260 READ | test/index/pointlocate.test.ts ("agrees with the oracle …", :106, :114) READ (names) | **SUPPORTED-NOW** (the kernel half; `hitTest25` is M-25D's) |
| E-59 | The projection outside every digest, the style family, the 2.5D tile key (BCR-V14-7) | E-24 | E-24 | — | a cross-reference to E-24 — **not counted** |

Group I — V14 §6's budgets (the kernel-rate rows; V14-sites.md:2734–2803 read whole).

| # | need (cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| E-60 | G5 commits: "insertion ≤ 8 µs (§12.4)" (V14-sites.md:2768) READ | M0 (a) TIMING: "insert + snap + attract + re-walk ≤ 8 µs per growth proposal" (M0.md:141) READ | the insertion (E-46) | timing phase not run: no landed record for M0-t-00, M0-t-01, M0-t-02 (landed/ listing; read-m0 D1) READ | **SPEC-NOT-YET-BUILT** (M0-t-01) |
| E-61 | "`corridorUnion` at S9's rate" (V14-sites.md:2768) READ | M0 (a) TIMING: §3.7 (ii) "one district ≤ 3 ms" (M0.md:142–144) READ | E-47 | not timed (as E-60) | **SPEC-NOT-YET-BUILT** (M0-t-01) |
| E-62 | Noise "≈ 27 ns per sample" (V14-sites.md:2765); "S1 on a 100 m frame (≈ 4 ms: §12.4's S1 row at 1/36 of a CITY frame)" (:2749) READ | §12.4's S1 row "≈ 0.3 M noise evaluations at ≈ 27 ns" (ARCHITECTURE.md:17951 READ) inside M0 (e)'s TIMING "S1 + S4 + S6 ≤ 50 ms at CITY" (M0.md:247) READ | the noise module and S1 (E-45, E-32) | summaries/M0-e-06.json `pass: false`; contended per-stage p50 S1 7.3–10.3 s, "every R12-4 row `exceeds: true`" (read-m0 D8) READ; timing phase not run | **SPEC-NOT-YET-BUILT** (M0-t-01; M0-e-06's verdict) |
| E-63 | E1 "≈ 1 µs per index query"; G5 (b) "medial axis ≈ 1 ms per 1 000 ring points; `astar` ≈ 0.3 µs per relaxation"; G5 (h) "≤ 400 ray casts on the static index … ≈ 1 µs per query" (V14-sites.md:2747, :2765, :2769) READ | no M0 bar names these rates (grep of M0.md for medial axis / astar / per query: :129, :376, :460, :480, :483 — names, no rates) READ; "Work sizes are PLAUSIBLE until the spikes of V14 §8 measure them (SE0, V0)" (V14-sites.md:2740) READ | the operators (E-45, E-57) | — | **AFTER-M-1-BY-DESIGN** (V14's SE0 and spike (a), V14-sites.md:2891, :2938) |
| E-64 | E4 "§3.4's open ≈ 2 ms for 20 rings" (V14-sites.md:2752) READ | M6-P (M0.md:854); SE0 exit "the arena's open ≤ 2 ms" (V14-sites.md:2889) READ | stub (E-38) | — | **AFTER-M-1-BY-DESIGN** |
| E-65 | The crop: first frame ≤ 100 ms p95, complete ≤ 300 ms p95 "at CITY and METROPOLIS alike" (V14-sites.md:2753–2754); the world crop frame 20 · 26 ms (:2749) READ | R12-V14-1 "SE0 / SE1 (M-ENC)" (ARCHITECTURE.md:18439 per read-base 241) | — | — | **AFTER-M-1-BY-DESIGN** |
| E-66 | The site's first open (attached ≤ 120 · 300 · 120 ms p95; free ≤ 300 · 500 · 300; a `vast` dungeon ≤ 1.2 s p95) (V14-sites.md:2772–2774) READ | R12-V14-2 (SE3, SE4) (V14-sites.md:2798–2800) READ | — | — | **AFTER-M-1-BY-DESIGN** |
| E-67 | 2.5D: tile build ≤ 1.6 × the flat; GPU frame; settle; hit testing ≤ 0.5 ms per pointer event; memory inside §12.8's per-rung cap (V14-sites.md:2784–2790) READ | R12-V14-3 … -5 (V0–V3, M-25D) (V14-sites.md:2798–2802) READ; rendering §4b (M0.md:861) | — | — | **AFTER-M-1-BY-DESIGN** |

Group J — M0's own close (what every SUPPORTED-NOW row above stands on).

| # | need (cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| E-68 | The kernel this level builds on is M0's closed, recorded kernel: "every bar of §16 M0 (a)–(f) carried with executed evidence" (M0-x-01's exit bar, M0-work.json per read-m0 C31) READ | M0-x-01 the M0 record; M0-c-06 the fusion gate; M0-t-00/01/02 the timing phase (M0.md:368–394 per read-m0 A20) READ | 58 of 72 items have a landed record; none for M0-x-01, M0-c-06, M0-t-00, M0-t-01, M0-t-02 (landed/ listing; read-m0 D1) READ; bench/src/fusion/index.ts empty (read-kernel E8) READ; "the twelve mid-flight rounds stay on their branches" (PROGRESS.md:450, J391 (3)) READ | — | **SPEC-NOT-YET-BUILT** (M0-x-01, M0-c-06, M0-t-*, the twelve rounds of J390) |

### The BCR-V14 requests to the base that are kernel-level, mapped to the rows

| request (V14-sites.md:3019–3048, read whole) | kernel-level? | row |
|---|---|---|
| BCR-V14-3 the fourth `Layer`, `nextSitePart`, the `site` product | yes (the `Layer` type, K1) | E-01, E-02, E-27 |
| BCR-V14-4 the transient arena with no owner document | yes (§3.4, K9) | E-09, E-38 – E-42 |
| BCR-V14-14 the `site` concern and the stage ids | yes (the kernel's registries, K6) | E-06, E-07 |
| BCR-V14-24 the `passage` edge role | yes (roles.json, K5) | E-05, E-47 |
| BCR-V14-11 links across layers | the join vertices are kernel (rule 2); the records are model | E-29, E-23 |
| BCR-V14-5 / -6 / -7 (`ZDecl`, `verticalEnds`, projection) | no — model and view rows M9, M10, M11 resting on K13 | E-22 – E-24, E-13 |
| BCR-V14-1, -2, -8 … -10, -12, -13, -15 … -23, -25 | no (records, tables, edits, exports, API, milestones) | E-20, E-23, E-35 (not otherwise rowed) |
| (none) — the adoption re-key | the kernel's arena identity and block format | E-31 (MISSING) |

## Blockers

### B-1 — MISSING: an arena cannot change its `PlatKey` (adoption, E-31)

- **The need, exactly.** V14 §3.9 (e) (2): "Every `site` part becomes a `site` part of the settlement document by its
  `nextSitePart`, addresses re-prefixed and re-namespaced" (V14-sites.md:1917–1918) READ, keeping every token
  (`site2/unit:k` → `site7/unit:k`, :1167–1170 via read-v14 F76). So one part's arena — its vertices, edges, faces,
  owners and role rows — must come to live under a new key (`{ layer: 'site', part: 2 }` → `{ layer: 'site', part: 7 }`)
  in another document with every owner and role entity id rewritten, and every lock, pin and edit mapped (:1918–1919).
- **What M0 has.** §3.4's "complete list" of writers and services holds no re-key (ARCHITECTURE.md:4797–4852 per
  read-base 99–100); `Plat.key` is readonly (plat.ts:149) READ; `decodeArena(chunks, key, opts)` checks every chunk
  "a chunk of another arena" by `c.layer === key.layer && c.part === key.part` (io/decode.ts:274) READ; `DecodeOptions`
  holds `index?` and `digests?` only (io/types.ts:21–30) READ; no rename/re-key function exists under kernel/src (grep)
  READ. The level digest hashes the layer code and the part (levelDigest.ts:772 per checks:95), so the per-part digest
  moves with the key — expected, the addresses move too (INFERRED).
- **Why it is not FORECLOSED.** The key is one header value checked by equality in one place (decode.ts:274) and the
  owner and role names are interned strings (handles, read-kernel A11), so a key-and-id map at load is additive; no
  limit, type or invariant M0 fixed stands in the way (INFERRED from the cites above). Re-materializing the part under
  the new key instead would change every token, because the lineage key's lanes begin with the layer code and the part
  (model/src/identity/lineage.ts:8) READ — which V14's "keeps its token" rules out (:1167) READ.
- **Why no text covers it.** The gate's K2 and K8 load each part under its own key only (checks:83–88, :166–172) READ,
  while item 134 (d) says "the M0 gate rows on multi-part arenas and namespaced addresses protect" adoption
  (AMENDMENTS-2026-10-16j.md:117–120) READ; no row asks for a re-key.
- **The smallest addition, in M0's own form.** A gate row beside K2/K8 — "**K14** an arena's block loads under a
  caller-named `PlatKey` with an entity-id map, and the loaded arena prints and digests equal to the same content built
  under the new key; no other byte of the block depends on the old key" — verified by a test in
  `packages/kernel/test/gate/`. Today the test would FAIL (decode.ts:274), so the row is carried to M1's API pass with
  its smallest addition: `DecodeOptions.from?: PlatKey` and `DecodeOptions.ids?: (id: Id) => Id` (the equality check at
  decode.ts:274 reading `from` when given; the map applied as owner and role strings are interned) — an option, so no
  golden moves. Its first reader is M-SITE-F (adoption is SE6's, V14-sites.md:2895) READ, so nothing in M0's own build
  waits on it.

### SPEC-NOT-YET-BUILT rows and whether this level can start without them

| row | what is open | can V14's level start without it? |
|---|---|---|
| E-68 | M0's close: no landed record for M0-x-01, M0-c-06, M0-t-00/01/02; the twelve rounds of J390 waiting (PROGRESS.md:449–450) | **No.** Every V14 milestone starts after M1 or later (ARCHITECTURE.md:21716–21719) READ, and M1 starts after M0 closes (INFERRED from §16's order, :21660–21668 READ) |
| E-46, E-47, E-48, E-49, E-51, E-32 | the mid-flight rounds on the owning items: a-05 s9 (insertChain), a-09 s7 check (kerb / corridorUnion), a-08 s4 check (booleans, buffer, insetRing), a-11 s4 check (skeleton), k-04 s1 (B-FUZZ), e-01 s1 held (terrain) (PROGRESS.md:449) READ | **No** for G5's embedding (L1 by `insertChain`, L2 by `corridorUnion`, V14-sites.md:1626–1636) and E4's clipping (:2079–2080); these are the operators the site's geometry is made of. Each round is a hardening round on landed code, so the start waits on their landing, not on new design (INFERRED) |
| E-52 | five-engine identity: M0-d-06 2 of 10 legs ran, M0-d-09 2 of 100 seeds (summaries) READ | **Yes to start, no to exit:** T-V14-1 and T-V14-25 (V14-sites.md:2831, :2855) are exit bars of SE0/SE1 and SE4 (:2889, :2893) READ, and they read M0 (d)'s harness |
| E-60, E-61, E-62 | the timing phase (M0-t-01): insertion ≤ 8 µs, S9's ≤ 3 ms per district, S1 + S4 + S6 ≤ 50 ms (M0.md:141–144, :247) READ; M0-e-06 `pass: false` (read-m0 D8) | **Yes to start:** V14 §6's G5 and crop-frame rows assume these rates (V14-sites.md:2749, :2768) and SE0 re-measures its own rows (:2889) READ; a miss changes V14's budget derivation, not its design (INFERRED) |

No row is FORECLOSED. Every limit checked against this level's needs is far from binding (each INFERRED from the
cited numbers): the 2²³ cm range (ARCHITECTURE.md:4369) against crops of 30–100 m (V14-sites.md:942), site frames
≤ 240 m (:2765) and attached site documents sharing the host's frame (:1226–1232); five levels against a five-rung
ladder (E-25); the u8 stage rank against 59 stages (E-07); the u8 attempt lane against G5's 3 re-runs (E-06); `Id =
string` against `view:<hash64>` (E-09); Int32 record fields against levels below the datum (E-33); `MAX_ROLE_ID` 0x7ffe
(read-kernel B8) against 57 roles (E-05).

## Design observations (not M0's; for the verdict seat — each is a text against a text, recorded, not ruled)

- **O1 — E4's one arena vs §3.4's disjoint fixed rings.** V14 E4 (a) puts "every footprint, water face and underground
  element face of the resolved set clipped to the rectangle" into ONE transient arena as `fixed` rings
  (V14-sites.md:2078–2081) READ, and E1's resolved set includes "the underground elements of the drawn band (and, on the
  ground, the elements whose ceiling lies within `surfaceClearCm` of the ground …)" (:1976–1979) READ; E3's scenes span
  ground, storeys, a depth band and site levels (:2063–2068) READ. Base §3.4 requires fixed rings with "interiors
  pairwise disjoint" (ARCHITECTURE.md:4971) and refuses one that "overlaps another fixed ring" (`overlap`,
  :4985–4986) READ. A cellar under its building, or a sewer under a street's water face, overlaps in plan by nature
  (INFERRED), so the opening would be refused, and F-SITE's E4 row then drops to "the crop without a transient arena
  (items drawn, not hit-tested)" (V14-sites.md:2159 via read-v14 F164). Not M0's: the arena is M6-P's (M0.md:854).
  The shapes that resolve it (one arena per scene, or the fixed rings of one layer per arena) are a V14 / M6-P choice.
- **O2 — the transient arena is needed at M-ENC (after M1) but built at M6-P (after M4).** Base: "the kernel's stub row
  (`API.md` §8) builds the form at M6-P, its first view owner is M-ENC's" (ARCHITECTURE.md:4965) READ; M-ENC "starts
  after M1", M6-P's P0/P1/P3 "after M4" (:21716, :21707) READ; V14's SE0 opens "the owner-less transient arena
  (BCR-V14-4) … over a crop's rectangle minus twenty rings" at M-ENC's start and SE1 builds "E4's arena and derived
  items" (V14-sites.md:2889–2890) READ. The kernel's stubs still say "the plan rung is its first reader" (facade/
  kernel.ts:256–258) READ, and C-0041's deferral reason is the same (choices.md:52 per read-m0 E4). Either M-ENC
  builds the form early or E4 waits for M6-P; no text decides. Not an M0 foreclosure: the types are declared "so no
  signature changes later" (C-0041 per read-m0 E4) and the façade already takes `ArenaKey` (facade/types.ts:102–103) READ.
- **O3 — two operator names in V14 the transient arena does not offer.** E4's strip items enter "by `partition` of that
  face" (V14-sites.md:2083) READ — `partition` is not among the kernel's 17 writers (tx/types.ts:64–68 per read-kernel
  B16) nor §3.4's transient list (ARCHITECTURE.md:5007–5008) READ; E1 (4) lays the world crop's roads "by
  `corridorUnion`" "as `fixed` faces of the arena" (V14-sites.md:1990–1994) READ while `corridorUnion` is "not offered
  on it" (ARCHITECTURE.md:5009–5011) READ. INFERRED: both read as "computed elsewhere, entered as fixed rings" (the
  read-only `buffer`, a scratch plat), which no text states.
- **O4 — the canonical form's counters.** `nextSitePart` is "the canonical form's fourth part counter"
  (ARCHITECTURE.md:3863) READ while the canonical-form list names "the three part counters" (A:4158–4160 per read-base
  67); recorded by read-base gap 1.
- **O5 — R1–R4 as stage ids.** BCR-V14-14 appends "`G1`…`G8` and `E1`…`E4`" (V14-sites.md:3036) READ; T-V14-32
  (:2862 via read-v14 F215) and the base's §6.1 (ARCHITECTURE.md:10179–10180 per read-base 259) add `R1`–`R4`.
- **O6 — site parts unnamed in the base's per-arena rows** (rule 1's five-view meanings, §3.4's several arenas, §3.7's
  same functions, §3.10's arena-isolation row): read-base gap 2, facts 18, 128, 141; the kernel is layer-agnostic in
  each (E-28, E-47), so the gap is wording (INFERRED).
- **O7 — `CommitRecord.key` is typed `PlatKey` where the design says `ArenaKey`** (API.md:964–981 per read-kernel A32;
  tx/types.ts:102 READ); a transient arena's batches (ARCHITECTURE.md:4523–4528 per read-base 90) will need the wider
  type — an exported-type change at M6-P, never persisted (INFERRED).
- **O8 — K1's own "fixed-in-M0" consolidation is not applied**: the checker's smallest addition "one frozen `LAYERS`
  list … read by `io/format.ts`, `rng/layer.ts` and `plat.ts:isPlatKey`" (checks:66–68) READ; `types/ids.ts:14` still
  holds the closed union (READ) and the closing table lists it as a recommendation, not a carry (checks:413).

## Counts

68 rows (E-01 … E-68); E-55 and E-59 are cross-references to E-22 and E-24 and are not counted, so **66 counted**.

| status | rows | count |
|---|---|---|
| SUPPORTED-NOW | E-02, E-03, E-04, E-05, E-06, E-08, E-09, E-11, E-13, E-25, E-29, E-30, E-45, E-50, E-53, E-54, E-57, E-58 | **18** |
| SPEC-NOT-YET-BUILT | E-32, E-46, E-47, E-48, E-49, E-51, E-52, E-60, E-61, E-62, E-68 | **11** |
| AFTER-M-1-BY-DESIGN | E-01, E-07, E-16, E-18, E-19, E-20, E-21, E-22, E-23, E-24, E-26, E-27, E-28, E-33, E-34, E-35, E-36, E-37, E-38, E-39, E-40, E-41, E-42, E-43, E-44, E-56, E-63, E-64, E-65, E-66, E-67 | **31** |
| CARRIED-TO-M1 | E-10 (K10), E-12 (K12), E-14 (M1), E-15 (M2), E-17 (M4) — all five of the gate's carries bear on this level | **5** |
| MISSING | E-31 (an arena re-keyed for adoption) | **1** |
| FORECLOSED | — | **0** |

What the counts say, as facts (the verdict is the Fable seat's): what V14 asks **of the kernel** is either held now
(the part mechanism, the frame origin, planarity, the registries' and roles' append paths, the view-id owner type, the
geometric services, the index and `pointLocate`) or deferred on purpose with its type declared (the transient arena,
M6-P), with one exception that no text covers (B-1). What V14 asks **of the base's records, documents, edits, views and
renderers** is after M0 by design — the gate's M rows "recorded now … M1's to change" (M0-world-sites-gate.md:7) and
§4b's rows. M0 itself is not closed (E-68) and six of the operators this level builds on carry mid-flight hardening
rounds (E-32, E-46 … E-49, E-51).

## Gaps

1. **No test was run.** No Node 24 is on PATH (`/opt/node22/bin/node` and `/usr/local/bin/node` are both v22.22.0) and
   none is at the scratchpad's `m0-coverage/node24` (absent). Every "tested" cell names the test file (and, for the
   gate's tests, the checker's record of 20 passing tests under Node 24.12.0 on 2026-10-17, checks:22); none was
   executed here.
2. **Readers' cites relied on, marked "per read-x".** Where a cell says "per read-base n", "per read-kernel X", "per
   read-v14 F n" or "per read-m0 X", the fact is the reader's READ record; I re-read the passages named in the inputs
   table, not every one of those.
3. **V14 not re-read whole by this seat.** §0, §1, §2.1–§2.5, §2.8–§2.9, §3.1–§3.9, §3.14–§3.15, §4, §5.1–§5.3, §5.6,
   §5.8, §7, §9, §11–§13 were taken from read-v14 (which itself did not read §2.5 whole, §3.2–§3.3, §3.5, §3.7–§3.8, §4,
   §5.1–§5.2; its gap G1). In particular V14 §4.6 (`raiseLower`) and §4.7 (locality) are not characterized here.
4. **Branches not inspected.** The twelve rounds' `wip/child-*` branches were not read (no git); what they change in
   insertChain, the bands, the booleans and the skeleton is unknown here, so E-46 … E-49, E-51 and E-32 rest on
   PROGRESS.md:449 and the round specs' heads only.
5. **The world crop frame (E-43) and O3** are INFERRED as "computable elsewhere and entered as fixed rings"; no S1 or
   S12a code path that targets a transient arena exists to read.
6. **`render.instances`, `plan.damage`, `epoch.transform` and the base concerns G5 (e) uses** (`siting`, `siteplan`,
   `heights`, `pin.light`, `naming`, `plot.*`) exist in concerns.json with first readers M1 … M6-P (script) READ; they
   are not rowed separately because their readers are all post-M0.
7. **Memory.** Base §12.8 states no line for a world-site document or an open encounter's transient arena (read-base
   237); V14 §6 states none either (read whole). Not rowed as MISSING because nothing names it as needed; noted.
