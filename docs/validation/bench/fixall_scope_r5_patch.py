# PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-scope-r5 (2026-09-26); queued in docs/FABLE-REVIEW-QUEUE.md.
# usage: python3 docs/validation/bench/fixall_scope_r5_patch.py <integrated round-4 ARCHITECTURE.md, md5 2661eb68…> <out.md> — rebuilds the patched copy the r5-scope blocks were cut from
# fixall/draft-scope-r5: builds the round-5 scope blocks by count-checked replacements on the integrated text
import sys, re
base = sys.argv[1]; out = sys.argv[2]
s = open(base, encoding='utf-8').read()
n_applied = 0
def rep(old, new, count=1):
    global s, n_applied
    c = s.count(old)
    if c != count:
        raise SystemExit(f'expected {count} got {c}: {old[:120]!r}')
    s = s.replace(old, new); n_applied += 1

# ---------------- §13.6 (VS4-4)
rep("""### 13.6 The owner's side-by-side protocol (D-5)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r4); drafted by fixall/draft-scope-r4; earlier revision fixall/integrate-r3, fixall/draft-scope-r3""",
"""### 13.6 The owner's side-by-side protocol (D-5)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r5); earlier revision fixall/integrate-r4, drafted by fixall/draft-scope-r4; earlier revision fixall/integrate-r3, fixall/draft-scope-r3""")
rep("""milestone's pair list — one `D5Pair` per pair, (9) — to `plat/goldens/d5/⟨milestone⟩/seeds.json`, committed before
   any render. ⟨milestone⟩""",
"""milestone's pair list — one `D5Pair` per pair, (9) — to `plat/goldens/d5/⟨milestone⟩/seeds.json`, committed before
   any render. Besides the formulas below it reads only the two numbers-only files the research-side panel script
   commits beside it — `ftg-captures.json` (M1, M2b, M4) and `ng-counts.json` (M5) — and never `captures/` (§17.1 (3),
   (4); VS4-4). ⟨milestone⟩""")
rep("""     captures with FTG's water options nearest to `none` (one capture) and to `coast+river` (two), and records each
     capture's id — its folder name under `captures/ftg/` — and its `WaterSetting` in the capture README (§16). The
     pair's PLAT side is generated at FTG's population and the capture's `WaterSetting` with seed
     `H32("d5-ftg/⟨milestone⟩/⟨rung⟩/⟨capture id⟩")`, so every milestone pairs the same captures with PLAT seeds of its
     own. The capture list is committed with the seeds, before any PLAT render.""",
"""     captures with FTG's water options nearest to `none` (one capture) and to `coast+river` (two), and records each
     capture's id — its folder name under `captures/ftg/` — its `WaterSetting` and its **recorded population**, the
     number of residents its decoded payload holds, in the capture README (§16). At each of these milestones the
     research-side panel script writes `plat/goldens/d5/⟨milestone⟩/ftg-captures.json` — one `FtgCapture` per capture,
     in capture order, ids and numbers only, (9) — and commits it like `baselines.json` (§17.1 (4)) before
     `plat d5 seeds` runs (VS4-4). The pair's PLAT side is generated at the capture's recorded population and its
     `WaterSetting`, both read from that file, with seed `H32("d5-ftg/⟨milestone⟩/⟨rung⟩/⟨capture id⟩")`, so every
     milestone pairs the same captures, at the same populations, with PLAT seeds of its own. *Measurement (M-1):* each
     capture's resident count, taken from its decoded payload. **Pre-decided fallback:** a capture whose payload yields
     no resident count takes its size's nominal target (BIG_TOWN 5 600, BIG_CITY 24 500), marked
     `populationSource: 'nominal'` and reported with the panel; a population outside the rung's band (§1.1) is clamped
     into the band and the clamp reported — FTG's two targets lie far from either edge. The capture file and the seed
     list are committed before any PLAT render.""")
rep("""     opened with the same template at neighbourhood LOD (`setAttr(district.fabric, template)`, II.4), found by a
     committed search:""",
"""     opened with the same template at neighbourhood LOD (`setAttr(district.fabric, template)`, II.4) in the template's
     default form — for `square`, `SquareFabric`'s `void` mode, NG's own square (II.2; VS4-4) — found by a committed
     search:""")
rep("""MFCG's at the matched size (sizes 40 / 80 / 130; §12.2's rate); against FTG, PLAT is generated at FTG's population
   (BIG_TOWN ≈ 5 600, BIG_CITY 24 500; METROPOLIS per D-31) and the capture's water setting, (2). Against NG, each side""",
"""MFCG's at the matched size (sizes 40 / 80 / 130; §12.2's rate); against FTG, PLAT is generated at the capture's
   recorded population — near BIG_TOWN's 5 600 and BIG_CITY's 24 500 targets (METROPOLIS per D-31) — and its water
   setting, both from `ftg-captures.json` (2). Against NG, each side""")
rep("""     | { reference: 'FTG'; rung: Extract<Rung, 'TOWN'|'CITY'>; capture: string /* its folder name under captures/ftg/ */; water: WaterSetting; platSeed: string; suburbFrame: boolean /* the rung's first capture, (3) */ }""",
"""     | { reference: 'FTG'; rung: Extract<Rung, 'TOWN'|'CITY'>; capture: string /* its folder name under captures/ftg/ */; water: WaterSetting;
         population: number /* PLAT's requested population: its FtgCapture's, from ftg-captures.json (2), (3) */; populationSource: 'recorded'|'nominal';
         platSeed: string; suburbFrame: boolean /* the rung's first capture, (3) */ }""")
rep("""   interface D5Record {                    // plat/goldens/d5/<milestone>/record.json""",
"""   type FtgCapture = { capture: string; rung: Extract<Rung, 'TOWN'|'CITY'>; water: WaterSetting;   // plat/goldens/d5/<milestone>/ftg-captures.json: FtgCapture[], capture order (2)
     population: number /* the residents its decoded payload holds, or the size's nominal target */; populationSource: 'recorded'|'nominal' };   // research-side, numbers and ids only (VS4-4)
   interface D5Record {                    // plat/goldens/d5/<milestone>/record.json""")

# ---------------- §14 (VS4-2; determinism SR5-3 folded; VS4-4's testkit reads)
rep("""## §14 Package and module layout, key interfaces, dependency rules, extension points

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r4); drafted by fixall/draft-scope-r4; earlier revision fixall/integrate-r3, fixall/draft-scope-r3""",
"""## §14 Package and module layout, key interfaces, dependency rules, extension points

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r5); earlier revision fixall/integrate-r4, drafted by fixall/draft-scope-r4; earlier revision fixall/integrate-r3, fixall/draft-scope-r3""")
rep("""the clean-room scanner (§17), the D-5 seed list by `H32` and
               the export command (`plat d5 seeds`, PNGs for §13.6)""",
"""the clean-room scanner (§17), the D-5 seed list by `H32` and
               the export command (`plat d5 seeds`, PNGs for §13.6), which read only the committed `ftg-captures.json` and `ng-counts.json` (§13.6 (2))""")
rep("""interface EditEngine { apply(doc: Document, e: EditEvent): ApplyResult /* Ok | Conflict(actions) | Confirm(token, fates) — an event carrying fates commits only when a fresh dry run computes the same fates (§11.2) */;""",
"""interface EditEngine { apply(doc: Document, e: EditEvent): ApplyResult /* Ok | Conflict(actions) | Confirm(token, fates, renames) — an event carrying fates and renames commits only when a fresh dry run computes the same fates and renames (§11.2; VD4-4) */;""")
rep("""  replay(base: Base, log: EditEvent[], opts?: { toSeq?: number; mode: 'interactive'|'replay' }): Model; migrate(doc: Document, to: string): { doc: Document; diff: Diff }; rebase(doc: Document, reason: RebaseReason, at?: number /* default: the log head; h₀ — the decoded snapshot's
    model.seq — when the saved town is kept after edits made during load verification (§2.9 step 4, §7.1): the only two states the engine holds
    materialised, so any other value is rejected with E_REBASE_AT and nothing is rebased (VD3-7) */): Document }""",
"""  replay(base: Base, log: EditEvent[], opts?: { toSeq?: number; mode: 'interactive'|'replay' }): Model; migrate(doc: Document, to: string): { doc: Document; diff: Diff };
  rebase(doc: Document, reason: RebaseReason, at?: number /* default: the log head; h₀ — the decoded snapshot's model.seq — when the saved town is kept after
    edits made during load verification (§2.9 step 4, §7.1): the only two states the engine holds materialised (VD3-7) */): ApplyResult /* as apply, undo and
    redo report: 'ok' when the rebase event is appended at the head; any other `at` returns { status: 'conflict', actions: [{ kind: 'invalid', message:
    'E_REBASE_AT: at must be the log head or h₀' }] }, appends nothing and rebases nothing, on every host alike (§7.1, §11.2; VS4-2) */ }""")

# ---------------- §16 (VS4-3, VS4-6, VS4-4's M-1 record; determinism SR5-2 and pipeline X-S5 folded)
rep("""## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r4); drafted by fixall/draft-scope-r4; earlier revision fixall/integrate-r3, fixall/draft-scope-r3""",
"""## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r5); earlier revision fixall/integrate-r4, drafted by fixall/draft-scope-r4; earlier revision fixall/integrate-r3, fixall/draft-scope-r3""")
rep("Effort is stated honestly as a range with its basis: about 150–200 expert person-weeks.",
    "Effort is stated honestly as a range with its basis: about 153–204 expert person-weeks.")
rep("for two implementers plus a verifier seat — about 75–100 calendar weeks",
    "for two implementers plus a verifier seat — about 77–102 calendar weeks")
rep("""each capture's id (its folder name) and `WaterSetting` recorded in its README for §13.6 (2)'s pairs (VS3-6)""",
    """each capture's id (its folder name), `WaterSetting` and recorded population — the residents its decoded payload holds — recorded in its README for §13.6 (2)'s pairs (VS3-6, VS4-4)""")
rep("""FTG's six captures decoded; the digest checker's report""",
    """FTG's six captures decoded, each with its resident count or §13.6 (2)'s nominal fallback, marked; the digest checker's report""")
rep("""SVG / PNG export; permalinks marked *preview* (§13.3);""",
    """SVG / PNG export; **the `.plat` writer and reader for generated towns** (§2.9, §3.9; VS4-3) — the manifest, the content-addressed chunks with §3.9's geometry layout, gzip compression and an empty log, since a generated town has no events — which the document-size test and the *preview* documents need and M2a's log builds on: a saved town opens by decoding its snapshot and comparing its recomputed root with `model.digest` (M0's full recomputation), a differing root loading as a corrupt cache by regeneration from the recipe (§2.9 step 3 and step 5); the records digest joins the snapshot at M2a, whose reader opens an M1 document, which lacks it, by the same regeneration; permalinks marked *preview* (§13.3);""")
rep("""the document-size test (≤ 320 B per building at CITY);""",
    """the document-size test (≤ 320 B per building at CITY) and the generated-town round trip — save → load → save byte-identical over the canonical form on B-CITY-lite's towns (§2.9; VS4-3);""")
rep("""the font-feature test (§9.2); the SVG and PNG export budgets (§12.7) | 33–43 pw |""",
    """the font-feature test (§9.2); the SVG and PNG export budgets (§12.7) | 35–46 pw |""")
rep("""| the document and log with the one replay fold; locks and pins;""",
    """| the log and the one replay fold over M1's document format; locks and pins;""")
rep("""per-document sessions (§7.4); the load's recomputation of the decoded state's own digest before its first edit, then edits applied at once during load verification with both mismatch choices (§2.9 steps 3–4);""",
    """per-document sessions (§7.4); load verification over M1's reader — the load's recomputation of the decoded state's own digest and of its records digest (VD4-6) before its first edit, then edits applied at once during load verification with both mismatch choices (§2.9 steps 3–4);""")
rep("""reported and loaded by replay, never verified (§2.9 step 3; VD3-1);""",
    """reported and loaded by replay, never verified (§2.9 step 3; VD3-1); the records-mismatch fixture and the §6.2 (iii) keep-and-save gating fixture (VD4-6, VD4-2);""")
rep("""the naming-input re-draws on table, pack and upgrade edits (§6.3 case (4));""",
    """the naming-input re-draws on table, pack and upgrade edits (§6.3 case (4)) with their renames stored in the events and carried by `confirm` (VD4-4), the dormant naming record of a protected name (VD4-3) and field slices (VD4-5); the version-pinned checks of a rebased base across an upgrade and of a frozen view (VD4-1); packs held by a saved redo stack and packs a new version stops shipping (VD4-7, VD4-9);""")
rep("""a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them; GeoJSON loads in QGIS with districts | 15–19 pw |""",
    """a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them; a `keptSnapshot`-rebased town's link is refused (VD4-8); a kept-and-rebased CITY document upgraded across a field-driver change opens editable and replays to the session's digest, and a frozen o(N−3) fixture shows no mismatch message (VD4-1); a document using a pack the new version stops shipping reopens after `from` leaves the window (VD4-9); GeoJSON loads in QGIS with districts; the GeoJSON with trees byte-identical on the five engines (§13.3; NR4-3); the warp cost measurement — a 150 m brush over a CITY core on B-CITY-lite seeds, Apply within §12.6's budget with §2.6's wing carry and check counted, or §12.6's pre-decided fallback (one check after the final step, F-REDERIVE for a failure) applied before exit (NP4-6) | 16–20 pw |""")
rep("""| mechanisms the fix-all pass added that the lines above do not price (booleans and bands on the arrangement, the derivation pool and its merge, the eager allocation and reservations, per-frontage regions and wings, the label placement engine) | 5–7 | the kernel, pipeline and rendering drafts of 2026-09-25 |""",
    """| mechanisms the fix-all pass added that the lines above do not price (booleans and bands on the arrangement, the derivation pool and its merge, the eager allocation and reservations, per-frontage regions and wings, the label placement engine; and the six new components of rounds 4–5 itemised below the table) | 8–11 | rounds 1–3 (the kernel, pipeline and rendering drafts of 2026-09-25): 5–7; rounds 4–5 (2026-09-26): 3–4, ≈ 14–22 working days itemised below (VS4-6) |""")
rep("""| **base subtotal (M-1 – M4b)** | **136–182** | |""", """| **base subtotal (M-1 – M4b)** | **139–186** | |""")
rep("""| **total** | **150–200** | equal to the milestone sum above |""", """| **total** | **153–204** | equal to the milestone sum above |""")
rep("""determinism lint over S13b's renderer inputs and the scripted document checks of §17.1 (2) — change no line of the
table either (PLAUSIBLE); nor do round 4's — the D-5 panel's FTG and NG pairing rules (§13.6), the list check of §17.1 (2)
and (5), and the load-verification memory test at M2a instead of M1 (PLAUSIBLE).""",
"""determinism lint over S13b's renderer inputs and the scripted document checks of §17.1 (2) — change no line of the
table either (PLAUSIBLE); nor do round 4's — the D-5 panel's FTG and NG pairing rules (§13.6), the list check of §17.1 (2)
and (5), and the load-verification memory test at M2a instead of M1 — or round 5's in this area — `rebase`'s typed
refusal (§14), the table check's cell count (§17.1 (2) (iv)), the committed FTG capture file (§13.6 (2)) and the
generated-town document format built at M1 instead of M2a (VS4-3), which moves effort between rows, not lines
(PLAUSIBLE).

**The other areas' build work of rounds 4 and 5 (VS4-6).** Six mechanisms are **new components**, priced by the
fix-all line's widening (≈ 14–22 working days, 3–4 pw; PLAUSIBLE): the per-name naming records and the renames an
edit confirms (§2.8, §6.3, §7.1; M1 writes the records, M3a stores the renames; VD3-2, VD4-3 – VD4-5), ≈ 3–4 days;
`carryWings`, the carry of a stored composition and the wing check decided by pairing (§2.6; M1 in generation, M3a
under warps; NP3-1, NP4-2, NP4-3, NP4-6), ≈ 4–6; crossing sites as a `Bridge` in state `site` and their handling in
S1's water operator (§2.7, §7.3 (b); M1 and M3a; NP3-4, J-I17), ≈ 2–3; resumable raster jobs, S13b as a resumable
placement job and the tile worker's four-class queue (§8.9, §9.2; M1; NR3-2, NR3-6, NR4-2), ≈ 3–5; the records digest
(§6.2; M2a; VD4-6), ≈ 1–2; the shipped stamp-tile asset, with its shared seam band, and its build tool
`plat/tools/stamptiles/` (§8.10; M1; NR3-7, NR4-1), ≈ 1–2 days. The rest are
**refinements of a mechanism a line already prices**, absorbed by that line (PLAUSIBLE): the load's digest
recomputation, its corrupt-cache path, the version-pinned root checks and the keep-and-save gating (the O9 line's load
verification; VD3-1, VD4-1, VD4-2); the pack held by a saved redo, the pack copy at an upgrade and the link refusal for
a kept town (the O9 line's retention and migration; VD4-7 – VD4-9); demotion, `StretchRef`, tombstones per partition,
the water-gate hold and the deck strip (the parity floors' kernel share and the fix-all line's arrangement work; VK3-3,
VK3-9, VK4-1, VK4-4, VK4-5); the forced harbour pick and the detour guard (the parity floors' gates and harbour; NP3-7,
NP4-4); the pin pass (the fix-all line's label placement engine; NR3-3); and the integer-centimetre tree positions
with their lint, the PNG row-filter rule and the quantised light steps with their light pass (the O12 renderer and O11
export lines; NR4-3, NR4-4, NR4-5). The milestone rows carry the widening where
the components are built — M1 + 2 / + 3 (with the generated-town format moved in from M2a), M3a + 1 / + 1, M2a
unchanged (the format out, the records digest in) — so they still sum to the total. **A later pass that adds build work
prices it here:** its scope seat names each new mechanism with the line that absorbs it, or widens a line by an
itemised amount and keeps the milestone rows equal to the total.""")
rep("""should-have "full" tiers (4–6 pw) — together a base of ≈ 119–154 pw and a total of ≈ 133–172 pw.""",
    """should-have "full" tiers (4–6 pw) — together a base of ≈ 122–158 pw and a total of ≈ 136–176 pw.""")

# ---------------- rendering r5 SC-4 (§14) and SC-5 (§16), folded
rep("""interface LabelPlacer { place(stop: ZoomStop, labels: LabelEntity[], obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementSet /* §9.2; view data */ }""",
    """interface LabelPlacer { begin(stop: ZoomStop, labels: LabelEntity[], obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementJob; place(stop: ZoomStop, labels: LabelEntity[], obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementSet /* begin(…) then step(Infinity) */ }   // §9.2; view data
interface PlacementJob { step(deadlineMs: number): boolean /* runs units on from where it stopped; returns after the first unit that ends deadlineMs or more after the call began; true when complete */; result(): PlacementSet; cancel(): void; readonly spentMs: number }   // resumable, so the tile worker serves queries and view work between units (§8.9, §9.2; NR4-2)""")
rep("""the stamp-tile asset load (§8.10, §12.7);""",
    """the stamp-tile asset load (§8.10, §12.7); the stamp tiles' seam check (§8.3; NR4-1); the sliced-placement census row, and the export's placement stepped in class 4 during the pan-and-zoom export run (§8.3, §8.9; NR4-2);""")
rep("""the moving-sun step budget (§8.4);""",
    """the moving-sun step budget (§8.4); the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7; NR4-5);""")

# ---------------- §17.1 (VS4-1; VS4-4's committed D-5 files)
rep("""### 17.1 The clean-room chain (IMP-1; D-29)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r4); drafted by fixall/draft-scope-r4; earlier revision fixall/integrate-r3, fixall/draft-scope-r3""",
"""### 17.1 The clean-room chain (IMP-1; D-29)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r5); earlier revision fixall/integrate-r4, drafted by fixall/draft-scope-r4; earlier revision fixall/integrate-r3, fixall/draft-scope-r3""")
rep("""   (iv) *tables* — outside fenced code every line that starts with `|` ends with `|`, and no other line sits between two
   table lines (VS2-1: a table row split over several lines renders as broken rows);""",
"""   (iv) *tables* — outside fenced code (a fence may be indented, as inside a list item) every line that starts with `|`
   ends with `|`, no other line sits between two table lines (VS2-1: a table row split over several lines renders as
   broken rows), and every row has its header's number of cells, counting only unescaped pipes (VS4-1: GitHub-flavoured
   Markdown splits a cell at every unescaped `|`, inside a code span too, and drops the cells beyond the header's count,
   so a bare pipe in code silently cuts the row short — inside a table write it `\\|`, which the renderer shows as `|`);""")
rep("""finds none of the document's 36 colour values in its sources, the capture JSON included; (iv) found exactly the one
   broken row VS2-1 names.""",
"""finds none of the document's 36 colour values in its sources, the capture JSON included; (iv) found exactly the one
   broken row VS2-1 names, and its cell-count clause, run over the round-4 text, exactly one more — J-I15, whose bare
   pipe inside code hid its reasoning (VS4-1; `fixall_verify_scope_r4_checks.out` part C, `fixall_scope_r5_checks.out`).""")
rep("""4. **Reference numbers only through `baselines.json`.** Research-side scripts (`research/baselines/`) measure the
   captures and write numbers with provenance (§13.5's `Baseline` rows); the file is committed into
   `plat/packages/testkit/baselines/`, and the parity CLI reads only it. The D-5 panel is assembled research-side from
   the product's PNG exports and the capture images (§13.6).""",
"""4. **Reference numbers only through committed numbers-only files.** Research-side scripts (`research/baselines/`)
   measure the captures and write numbers with provenance (§13.5's `Baseline` rows); the file, `baselines.json`, is
   committed into `plat/packages/testkit/baselines/`, and the parity CLI reads only it. The D-5 panel is assembled
   research-side from the product's PNG exports and the capture images (§13.6); its only inputs to the product are two
   numbers-only files committed the same way into `plat/goldens/d5/⟨milestone⟩/` — `ftg-captures.json` (capture ids,
   rungs, water settings, resident counts) and `ng-counts.json` (NG hoods' building counts) — and `plat d5 seeds` reads
   only them (§13.6 (2); VS4-4).""")

# ---------------- Delegated decisions (D-20, D-29)
rep("""| D-20 | **Effort ≈ 150–200 expert person-weeks: the base 136–182 (the content module included) plus stage 2 14–18, re-derived line by line in §16; the cuts that would reduce it to ≈ 133–172 recorded for the owner's veto, not applied** | the earlier 100–130 left out content authoring, the app, the test rig and FTG's non-map scope (IMP-2); the owner asked that nothing be deferred |""",
    """| D-20 | **Effort ≈ 153–204 expert person-weeks: the base 139–186 (the content module included) plus stage 2 14–18, re-derived line by line in §16 — the fix-all pass's own mechanisms priced in their own line, rounds 4–5's six new components at 3–4 pw (VS4-6); the cuts that would reduce it to ≈ 136–176 recorded for the owner's veto, not applied** | the earlier 100–130 left out content authoring, the app, the test rig and FTG's non-map scope (IMP-2); the owner asked that nothing be deferred; the components the fix-all rounds added are itemised and priced, not assumed absorbed |""")
rep("""reference numbers only through `baselines.json`; a hashed content deny-list scan""",
    """reference numbers only through committed numbers-only files (`baselines.json`, and the D-5 panel's `ftg-captures.json` and `ng-counts.json`); a hashed content deny-list scan""")

# ---------------- Judgment calls
rep("""| J-15 | Chose to re-cut M1 to the viewable town only and to state 150–200 pw (D-20) over""",
    """| J-15 | Chose to re-cut M1 to the viewable town only and to state 150–200 pw — 153–204 once the fix-all rounds' own components were priced (D-20, J-S43) — over""")
rep("""| J-S6 | Chose to state the honest 150–200 pw and record""",
    """| J-S6 | Chose to state the honest 150–200 pw — now 153–204 with the fix-all rounds' components (J-S43) — and record""")
rep("""because a milestone can measure only what it or an earlier one builds — the document, the log and load verification arrive at M2a;""",
    """because a milestone can measure only what it or an earlier one builds — the log and load verification arrive at M2a, over the document format M1 builds for generated towns (VS4-3);""")
rep("""| J-S38 | Chose an optional `at` on `EditEngine.rebase` — the log head by default, `h₀` when the saved town is kept after edits made during load verification, anything else rejected — over a second method for keeping the saved town, because the `rebase` event already carries `at` (§7.1), one entry point keeps §7.4's single rebase row and its undo, and the head's state and the decoded snapshot are the only states the engine holds materialised (§14; VD3-7). |""",
    """| J-S38 | Chose an optional `at` on `EditEngine.rebase` — the log head by default, `h₀` when the saved town is kept after edits made during load verification, anything else refused — over a second method for keeping the saved town, because the `rebase` event already carries `at` (§7.1), one entry point keeps §7.4's single rebase row and its undo, and the head's state and the decoded snapshot are the only states the engine holds materialised; and chose to return an `ApplyResult` — the refusal a `conflict` with one `invalid` action whose message begins `E_REBASE_AT`, nothing appended — over a thrown error or the document returned unchanged, because `apply`, `undo` and `redo` already report through `ApplyResult`, a host bridge relays a status and not an exception, and two faithful implementations must refuse alike (§14, §7.1; VD3-7, VS4-2). |""")
rep("""in M2a's memory measurement (the milestone that builds the document, the log and load verification; §16)""",
    """in M2a's memory measurement (the milestone that builds the log and load verification over M1's document format; §16)""")
rep("""a water gate's two bank vertices `('gate_end', gate, 0 | 1)` under a fresh `Gate`""",
    """a water gate's two bank vertices `('gate_end', gate, 0 \\| 1)` under a fresh `Gate`""")
new_rows = """| J-S39 | Chose to extend the table check with a cell count — every row has its header's number of cells, counting only unescaped pipes — and to escape J-I15's pipe with a backslash, over rewording code spans to avoid pipes or treating a code span as pipe-safe, because GitHub-flavoured Markdown splits a cell at every unescaped pipe character, code spans included, and drops the cells beyond the header's count, so the unescaped count is the renderer's own rule; it flags exactly J-I15 in the round-4 text, which the first-and-last-character rule passed (§17.1 (2) (iv), `doc_checks.py` S1; VS4-1). |
| J-S40 | Chose to build the `.plat` writer and reader for generated towns at M1 — the manifest, content-addressed chunks, gzip and an empty log; a saved town opened by checking its recomputed root, a differing root regenerated from the recipe — over moving the document-size test and the *preview* documents to M2a, because a milestone can measure only what it or an earlier one builds and the format needs nothing from the log, while the size budget is best learnt before editing is built on it; M2a keeps the log, the one fold and load verification over that format, and ≈ 0.5–1 pw moves with it from M2a's row to M1's (§16, §2.9, §3.9; VS4-3). |
| J-S41 | Chose to generate the PLAT side of an FTG pair at the capture's recorded population — the residents its decoded payload holds, carried to the product in a committed research-side `ftg-captures.json` with the capture's id, rung and water setting — over FTG's nominal size targets and over the product reading the capture folders, because the picture being compared holds the recorded population (FTG's targets are approximate), a pair must be reproducible from its record (`D5Pair` now holds the population), and the product may not read `captures/` (§17.1 (3)); a capture that yields no count falls back to its size's target, marked (§13.6 (2), (3), (9); VS4-4). |
| J-S42 | Chose `SquareFabric`'s `void` mode for NG's `square` pairs and as the default of II.2's `square` row over the `carved` plaza, because NG's own square is the void its unbuilt plots leave, the panel must compare like with like, and a panel should rate the default a user gets — so the default and the paired form are one (§13.6 (2), II.2; VS4-4). |
| J-S43 | Chose to widen the fix-all line by 3–4 pw for the six new components rounds 4 and 5 added in the other areas — naming records and confirmed renames, `carryWings` with its composition carry and pairing check, crossing-site state, the resumable raster and placement jobs with their queue, the stamp-tile asset and tool, the records digest (≈ 14–22 working days, itemised) — and to name the line that absorbs each refinement, over declaring all of them absorbed, because an absorption with no stated basis is the unpriced state VS4-6 found and the §16 choice is the honest total; the total becomes 153–204 pw, the milestone rows moving with the components, and every later pass prices its build work the same way (§16, D-20; VS4-6). |
"""
rep("""| J-I1 | Chose **one quarter merge tree**""", new_rows + """| J-I1 | Chose **one quarter merge tree**""")
rep("""J-DET-37 – J-DET-39, J-P34, J-P35, J-R17, J-R38, J-R40, J-R42 and J-S32; J-10, J-P10, J-R18, J-I11, J-I13 and J-I14 were
amended; its integration seat added J-I15 – J-I17 (the record is `docs/validation/fix-all/r4-integration-log.md` §4, its
conflict table).""",
"""J-DET-37 – J-DET-39, J-P34, J-P35, J-R17, J-R38, J-R40, J-R42 and J-S32; J-10, J-P10, J-R18, J-I11, J-I13 and J-I14 were
amended; its integration seat added J-I15 – J-I17 (the record is `docs/validation/fix-all/r4-integration-log.md` §4, its
conflict table). Round 5 added J-K34 – J-K35, J-DET-44 – J-DET-51, J-P47 – J-P49, J-R50 – J-R54 and J-S39 – J-S43, and
restated J-K18, J-K26, J-K28, J-K29, J-K32, J-DET-35, J-P35, J-P42, J-P44, J-P45, J-R42, J-S37 and J-S38; J-15, J-S6 and
J-I14 were amended, and
J-I15's pipe inside code was escaped, which had cut the row short (VS4-1) (the record is
`docs/validation/fix-all/r5-integration-log.md` §4, its conflict table).""")

# ---------------- rewrap the two paragraphs whose lines this round lengthened unevenly (words unchanged)
import textwrap
def rewrap(first_words):
    global s
    L = s.split('\n'); i = next(k for k, l in enumerate(L) if l.startswith(first_words)); j = i
    while j < len(L) and L[j].strip() != '': j += 1
    para = ' '.join(x.strip() for x in L[i:j])
    new = textwrap.wrap(para, 120, break_long_words=False, break_on_hyphens=False)
    s = '\n'.join(L[:i] + new + L[j:])
rewrap("**The other areas' build work of rounds 4 and 5")
rewrap("J-1 – J-18 are the synthesis seat's")
open(out, 'w', encoding='utf-8').write(s)
print('replacements applied:', n_applied)
