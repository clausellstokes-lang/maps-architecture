# m0-coverage / verdict — can M0, as it stands, support all three levels of the map building process?

**Lane:** m0-coverage/verdict (fable; J395). The one Fable seat of this run (the owner's J390 and J394 words:
Opus reads and verifies; one Fable seat gives the verdict). Started 2026-10-18 09:46Z; written as the checks went.

**The owner's question (2026-10-18 ~09:20Z, verbatim, not re-judged):** "so verify for more or validate me. M0, as it
stands can. support all levels of the map building process form local settlement to world to encounter map in
building?" — read as: can M0, as it stands, support all levels of the map building process, from the local settlement
to the world to the encounter map, in building?

## 0. Inputs, method, what was not done

**Read whole by this seat** (09:46Z–09:51Z): the three verifier tables `verify-settlement.md` (324 lines),
`verify-world.md` (257), `verify-encounter.md` (320) and the five reader records `read-m0.md` (206), `read-base.md`
(393), `read-v13.md` (384), `read-v14.md` (368), `read-kernel.md` (618), all under
`docs/validation/m0-coverage-2026-10-18/`.

**Primary texts and code this seat re-opened for the spot-checks** (every cite below marked READ is this seat's own
reading at that line; INFERRED is this seat's arithmetic or judgement across cites):
`plat/packages/kernel/src/num/{snap,frame}.ts` (whole), `types/ids.ts` (whole), `io/decode.ts:240-290`,
`io/types.ts:15-35`, `arena/plat.ts:140-155, :240-262`, `tx/tx.ts:65-100, :585-640`, `facade/types.ts:25-40, :55-115`,
`facade/notBuilt.ts:50-75`, `invariants/rows.ts:1-40`, `adapters/delaunator.ts:39-90`, `geom/path.ts:1-45, :145-210`,
`geom/heap.ts:1-40`, `noise/index.ts:20-30`, `rng/mixer.ts:110-155`, `registry/index.ts:10-40`,
`digest/levelDigest.ts:760-780`, `arena/roles.json` (grep), `registry/{stages,concerns}.json` (grep);
`plat/packages/kernel/test/gate/{layers,no-elevation,parts}.test.ts` (heads and case titles),
`test/medial/delaunay.test.ts:80-90, :117-121`, `test/noise/fbm.test.ts` (titles);
`plat/packages/site/src/terrain/range.ts` (whole), `hydro/flood.ts:40-82`, `hydro/field.ts:1-50`, `hydro/params.ts:38-46`;
`plat/packages/layout/src/pipeline/runner.ts:15-30, :218-226`, `layout/src/fields/edt.ts` (grep);
`plat/packages/model/src/identity/lineage.ts:1-12`; `plat/bench/src/{fusion,timing-phase,worklimits,fusion-ng}/index.ts`
(whole); `plat/docs/build/summaries/{M0-k-04,M0-e-06,M0-d-06,M0-d-09}.json` (fields by script);
`plat/docs/build/landed/` (listing); `plat/docs/build/M0.md:120-152, :185-200, :215-251, :834-877`;
`plat/docs/build/M0-world-sites-gate.md` (whole); `plat/docs/build/checks/M0-world-sites-gate.md:83-88, :166-172`;
`plat/docs/build/checks/profile-city-stages.md:10-26`; `docs/M0-FIX-QUEUE.md` rows Q18, Q19, Q48, Q49, Q65, Q69–Q72, L21;
`docs/KNOWN-ISSUES.md:19-31`; `docs/PROGRESS.md:415, :449-450`; `docs/AMENDMENTS-2026-10-16j.md:117-120, :206-229`;
`docs/ARCHITECTURE.md:309-310, :4300-4309, :4365-4374, :4961-5012, :6895-6902, :7800-7806, :7930-7937, :12053, :15491,
:21700-21720`; `docs/volumes/V13-world.md:195-202, :604-613, :995-1008, :1727-1750, :2196-2201, :2729-2740`;
`docs/volumes/V14-sites.md:179-183, :1160-1172, :1434-1441, :1900-1935, :1972-1999, :2074-2090, :2745-2770, :2875-2896,
:3025-3026`. The greps of task (3) are kept at
`/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/m0-coverage/verdict/primitive-greps.txt`.

**Not done.** No test was run: the container's Node is v22.22.0 and no Node 24 is on PATH or in the lane scratchpad.
No git command was run; the `wip/child-*` branches of the mid-flight hardening rounds were not inspected. Where a
cell below says "via read-x" the fact is that reader's, kept because this seat's spot-check of the same point agreed
with it or because the point was not re-opened.

**The status words** are the task's: SUPPORTED-NOW (spec'd, built, tested) · SPEC-NOT-YET-BUILT (in M0's scope, not
landed or mid-flight) · AFTER-M-1-BY-DESIGN (deferred on purpose by a named text) · CARRIED-TO-M1 (a gate row the
checker carried) · MISSING (needed, no spec, not built, not deferred) · FORECLOSED (something M0 fixed makes the need
impossible or costly).

---

## 1. Spot-checks against the primary texts and code

Every MISSING row (one, E-31) and every FORECLOSED row (none) was checked; the SUPPORTED-NOW sample is weighted
toward the rows whose "supported" would be the dangerous error. Verdict words: **HOLDS** (the verifier's status and
cites stand), **HOLDS, cite corrected**, **CORRECTED** (the status changes; the reason given).

### 1.1 The LOCAL SETTLEMENT level (verify-settlement.md; 21 rows checked)

| row | verifier's status | what this seat checked (cite; READ / INFERRED) | verdict |
|---|---|---|---|
| SN-01 | SUPPORTED-NOW | `snap` refuses `!(Math.abs(sx) < 8_388_608)` on the rounded value (kernel/src/num/snap.ts:14-17 READ); the base's range invariant and the METROPOLIS-at-the-cap bound ≈ 1 402 000 cm (ARCHITECTURE.md:4369-4372 READ) | HOLDS |
| SN-04 | SUPPORTED-NOW | `frameOf` refuses when `ceil(side × (0.5 + marginShare)) ≥ 2²³` (frame.ts:35-37 READ); at margin 0.3 the side bound is 8 388 608 ÷ 0.8 = 10 485 760 cm ≈ 104.9 km (INFERRED, arithmetic) against the cap's 17.53 km | HOLDS |
| SN-06 | SUPPORTED-NOW | `type Level = 0 \| 1 \| 2 \| 3 \| 4` (types/ids.ts:11 READ) | HOLDS |
| SN-16 | SUPPORTED-NOW | `insertChain` on the façade (facade/types.ts:63 READ); B-FUZZ `insertChain` 10 000 runs, 0 crashes, 0 invalid, 1 413 typed refusals (summaries/M0-k-04.json `primitives.insertChain` READ) | HOLDS (its 10⁶ bar is SN-64) |
| SN-46 | SUPPORTED-NOW | the row lists "the distance transform" among the kernel's built pieces: no kernel module holds one (grep of kernel/src: none READ); it is built at plat/packages/layout/src/fields/edt.ts:1-2, :91 (M0-e-05, Felzenszwalb–Huttenlocher) and read by S6's fields pass 1 (fields/pass1.ts:8-9, :325 READ); the base's §3.1 table files it under the kernel's "build" column (ARCHITECTURE.md:4305 READ) | HOLDS, cite corrected: built (M0-e-05) and used, in `@plat/layout`, not the kernel — a placement difference from §3.1's table, not a gap |
| SN-50 | SUPPORTED-NOW | the repair path runs only under `onFail === 'repair'` and any remaining failure then rejects (tx/tx.ts:596-607 READ), so `downgrade` commits nothing — the row's INFERRED reading confirmed | HOLDS |
| SN-52 | SUPPORTED-NOW | `rankOf` checks 0…255 "A u8 stage rank" (tx/tx.ts:70-75 READ); 25 stage rows (registry/stages.json READ) | HOLDS |
| SN-54 | SUPPORTED-NOW | `overWork` → `E_WORK_LIMIT` at commit and after a repair (tx/tx.ts:586, :604 READ) | HOLDS |
| SN-60 | SUPPORTED-NOW | `KERNEL_ROWS`: 21 declarations — the 15 M0 rows plus prepared-contacts (M3a), frozen-base (M1), pool-scope (M1), arena-isolation (M3a), seed-tiling (M6-P), euler (ci) (invariants/rows.ts:13-36 READ) | HOLDS (SN-61's deferred rows confirmed in the same read) |
| SN-76 | SUPPORTED-NOW | the one door: rounded, clamped to ± `limitCm`, NaN → 0, every clamp counted; the limit 1 … 2³¹ − 1 (site/src/terrain/range.ts:52-69, :83-88 READ) | HOLDS |
| SN-88 | AFTER-M-1-BY-DESIGN | the runner's text "the pool and the lazy tiers are M1's, §4b" (layout/src/pipeline/runner.ts:19-21 READ); §4b read whole: no lazy-tier row (M0.md:834-877 READ) | HOLDS; the documentation gap stands |
| SN-30, SN-31, SN-35 | SPEC-NOT-YET-BUILT | Q48 "A committed BLOCK OVERLAPS AN ARTERIAL'S CORRIDOR at a vertex-only contact … S9 commits the child's kerb corner 142 cm inside way:11's band" (docs/M0-FIX-QUEUE.md:62 READ); Q18 "HARDENING (perf; before M0-t-01) … take Q18 FIRST" and Q19 its closing check (:45-46 READ); "E a-09 s7 check (wip/child-a09s6b)" among the rounds stopped 2026-10-14 (docs/PROGRESS.md:449 READ) | HOLDS — an open silently-wrong-output class (N-45 (a)) is the one thing that un-supports built code |
| SN-64 | SPEC-NOT-YET-BUILT | `runsPerPrimitive` 10 000, `pass` true, 24 primitives (summaries/M0-k-04.json READ) against the bar's 10⁶ (M0.md:131 READ); no landed record for M0-f-02b (landed/ listing READ); Q49: B-FUZZ at 10⁶ ≈ 7 h, cannot run whole in one seat (M0-FIX-QUEUE.md:63 READ) | HOLDS |
| SN-67 | SPEC-NOT-YET-BUILT | the profile: S8 3 954–7 820×, S9 1 327–2 531× over §12.4, "C-0098's ladder (≤ 2× per pass) cannot close a 10³–10⁴ gap"; the measurement is a debug build through tsx and a production bundle runs S8/S9 only 1.6–1.8× faster (checks/profile-city-stages.md:14-23 READ); J357 lands it and accepts the reading (docs/PROGRESS.md:415 READ); `bench/src/timing-phase/index.ts` is the empty scaffold (READ) | HOLDS |
| SN-70 | SPEC-NOT-YET-BUILT | `bench/src/fusion/index.ts`: "this index and its folder belong to M0-c-06" and nothing else (READ); no landed record and no summary for M0-c-06 (listings READ) | HOLDS |
| SN-72, SN-82 | SPEC-NOT-YET-BUILT | `pass` false; `seeds` {first 1, count 8}; `verdicts` countLaw, gateWards, corpus "fail", the other ten "pass" (summaries/M0-e-06.json READ); the bars (M0.md:240-243 READ) | HOLDS |
| SN-98 | SPEC-NOT-YET-BUILT | M0-d-06: `ran` 2, `blocked` 8, `differences` 0, `verdict` "incomplete"; M0-d-09: `seeds` 2, "incomplete" (summaries READ) | HOLDS |
| SN-115 | SPEC-NOT-YET-BUILT | no landed record for M0-t-00, M0-t-01, M0-t-02, M0-x-01 (landed/ listing READ) | HOLDS |
| SN-63, SN-100, SN-102 | CARRIED-TO-M1 | the gate spec's rows M4, M1, K10 (plat/docs/build/M0-world-sites-gate.md READ whole); the checker's carry (checks/M0-world-sites-gate.md:30-34 via read-m0 B8) | HOLDS |

**The level's foreclosure table (verify-settlement §3.1)** was re-read against snap.ts, frame.ts, ids.ts, tx.ts:70-75,
plat.ts:243-246 and range.ts:77-88: every limit cited is in the code at the line named; the margins are arithmetic on
those numbers and stand.

### 1.2 The WORLD level (verify-world.md; 15 rows and 3 notes checked)

| row | verifier's status | what this seat checked | verdict |
|---|---|---|---|
| W-01 | SUPPORTED-NOW | `heightWriter(heights, limitCm)` admits any integer limit 1 … 2³¹ − 1 and clamps to ± it (range.ts:83-88, :52-69 READ); the continent's 1 000 000 cm is inside (INFERRED) | HOLDS |
| W-02 | SUPPORTED-NOW | `NONE = 0xffffffff`; `head = new Uint32Array(hi − lo + 1)`, `next = new Uint32Array(n)`, `closed = new Uint8Array(n)` (hydro/flood.ts:43, :63-66 READ); at ± 10 km of relief 2 000 001 buckets = 8 MB; links to 2³² − 2 cells against 9.2 M (INFERRED, arithmetic) | HOLDS (the world-scale time is unmeasured, as the row says) |
| W-04 | SUPPORTED-NOW | the D8 codes are the tie order E, NE, N, NW, W, SW, S, SE (hydro/field.ts:8-12, :19-24 READ); `flatRank`, `flowAccum` are `Uint32Array` (:42, :46 READ) | HOLDS |
| W-05 / N3 | AFTER-M-1-BY-DESIGN | the field imports `ratio` from `@plat/kernel`, the model's `Cm`, `HydroGrid`, `PointCm`, `Terrain`, and `../terrain/range.js`, `../terrain/sampler.js` (field.ts:13-17 READ); the flood writes through `heightWriter` (flood.ts:63 READ) | HOLDS; N3 (the lift needs the range check too) confirmed |
| W-06 | SPEC-NOT-YET-BUILT | "S e-02 s1 (wip/child-e02s1), P e-01 s1 (wip/child-e01s1, held)" among the stopped rounds (PROGRESS.md:449 READ) | HOLDS as a fact; judged in §2 |
| W-12 | SUPPORTED-NOW | `delaunay` refuses an off-lattice coordinate and hands the library coordinates relative to the bounding-box corner (adapters/delaunator.ts:44-46, :75-85 READ); the test refuses `pt(8_388_608, 0)` with E_OUT_OF_RANGE and triangulates a translated input identically (test/medial/delaunay.test.ts:82-87, :119 READ); V13 hands the seats "in integer metres (`originCm ÷ 100`, rounded; the continent rung's far corner at 3.84 × 10⁶ m lies inside §3.2 (1)'s range invariant of 2²³ at every rung)" (V13-world.md:1729-1731 READ); 2 × the continent row = 7 680 000 m < 8 388 608 (INFERRED) | HOLDS |
| W-14 | SUPPORTED-NOW | the heap breaks ties by the smaller item (geom/heap.ts:3-4, :28-33 READ); a distance is replaced only by a strictly smaller one (`nd < dist[u]`, path.ts:170-174 READ); V13's "ties by (f, cell index)" (V13:1738-1740 READ) | HOLDS; N2's two texts (V13:199 "the kernel's path search" vs :1738 "the lifted bucket queue") confirmed as V13's to settle |
| W-19 | SUPPORTED-NOW | `MAX_NOISE_OCTAVES = 16` (noise/index.ts:27 READ); the test refuses octaves outside 1 … 16 (test/noise/fbm.test.ts:121 READ) | HOLDS |
| W-21 | SUPPORTED-NOW | `reroll` and `salt` each refused unless u16; `attempt` ≤ the concern's cap; `epoch` u32 (rng/mixer.ts:146-153 READ) | HOLDS |
| W-23 | SPEC-NOT-YET-BUILT | as SN-98 | HOLDS |
| W-26 | SUPPORTED-NOW | "centred on (0, 0) with +y north" (frame.ts:21 READ) | HOLDS |
| W-28 | SUPPORTED-NOW | the level digest writes `TAG_LEVEL`, the layer code, the part and the level, then the per-level roots — nothing else (digest/levelDigest.ts:772-773 READ) | HOLDS |
| W-48 | SUPPORTED-NOW | the K1 test's header (test/gate/layers.test.ts:1-8 READ); `Layer` the closed three-value union (ids.ts:14 READ) | HOLDS |
| W-52 | SPEC-NOT-YET-BUILT | as SN-72 and SN-115 | HOLDS |
| N1 | note | the import is "refused (`refuse.import.extent`) only when all three are declined or the far corner leaves the int32 lane" (V13:2735-2737 READ); a 9 270 km imported map (V13:1003 READ); the kernel refuses ≥ 8 388 608 in the unit handed in (snap.ts:15 READ) | HOLDS — a V13 text edge (an imported world 8 389–21 475 km wide), fixable on V13's side; not an M0 limit |

**The level's foreclosure table (verify-world "Blockers")** was re-read against the same files: every limit is in the
code at the line named.

### 1.3 The SITE and ENCOUNTER CROP level (verify-encounter.md; 13 rows and 3 observations checked)

| row | verifier's status | what this seat checked | verdict |
|---|---|---|---|
| **E-31** | **MISSING** | the need: "(2) Every `site` part becomes a `site` part of the settlement document by its `nextSitePart`, addresses re-prefixed and re-namespaced, every lock, pin, assignment and edit mapped" (V14-sites.md:1917-1919 READ); "every address keeps its token and changes only its part prefix (`site2/unit:k` → `site7/unit:k` …)" (:1167-1170 READ); "its arenas are **adopted** into the settlement's document keeping every identity and lock" (:181 READ). What exists: `decodeArena` rebuilds only when every chunk's `layer` and `part` equal the requested key — `bad(c.layer === key.layer && c.part === key.part, 'a chunk of another arena')` (kernel/src/io/decode.ts:274 READ); `DecodeOptions` is `index?` and `digests?` (io/types.ts:21-30 READ); `Plat.key` is `readonly` (arena/plat.ts:149 READ); the base's `rekey` is `retypeEdges`' knot re-pairing on a chain, not an arena re-key (ARCHITECTURE.md:4811-4814 READ); §7.5's "address mapping" is an edit-fate column (ARCHITECTURE.md:12053 READ), no arena operation; the gate's K2/K8 load parts under their own keys only (checks/M0-world-sites-gate.md:83-88, :166-172 READ); item 134 (d) says the multi-part and namespace rows "protect" adoption (AMENDMENTS-2026-10-16j.md:117-120 READ) — no row asks for the re-key; the level digest hashes the layer code and the part (levelDigest.ts:772 READ), so the adopted part's digests move with its key, which is expected (the settlement is another document) | **HOLDS.** A need two texts name (V14 §2.8, §3.9 (e); item 134 (d)) with no mechanism in any text: §3.4's complete list, the gate's K rows and the block format hold no re-key, and re-deriving the part under the new key would change every token (lineage lanes start with the layer code and the part, model/src/identity/lineage.ts:8 READ), which V14:1167 rules out. **Not FORECLOSED:** the key is one header value checked by equality in one place, and owners and role entities are interned id strings. The verifier's smallest addition — a gate row **K14** carried to M1's API pass as `DecodeOptions.from?: PlatKey` and `DecodeOptions.ids?: (id) => id` (or the same seen from the encoder: a block re-encoded under the new key with its id strings mapped) — is right-sized; its first reader is M-SITE-F's SE6 (V14:2895 READ), after M-W1, so nothing in M0's own build waits on it |
| E-02 | SUPPORTED-NOW | `isPlatKey`: part an integer 0 … 0x7fffffff on the three layers (plat.ts:243-246 READ); K2's cases on ground/0, ground/7, underground/3 (test/gate/parts.test.ts:55, :77, :84 READ) | HOLDS |
| E-03 | SUPPORTED-NOW | frame.ts:21, :36 READ | HOLDS |
| E-05 | SUPPORTED-NOW | `margin` 9, `chamber_wall` 26, `access_point` 40, `link_end` 41 present; no `passage` row (arena/roles.json:14, :31, :45-46; grep READ) | HOLDS (the row lands with M-SITE-A, as the cell says) |
| E-06 | SUPPORTED-NOW | no concern named exactly `site` (grep -c 0 on registry/concerns.json READ); no G/E/R stage row (stages.json READ); `DEFAULT_ATTEMPT_CAP = 2` "(three attempts; §6.1's attempt component)" (registry/index.ts:16-21 READ) | HOLDS, note corrected: the cell's INFERRED "must state a numeric cap ≥ 3" is not needed — a cap of 2 admits attempts 0, 1, 2 = three attempts, which is V14's `EmbedRule.attempts` 3 |
| E-09 | SUPPORTED-NOW | `TransientKey = { transient: true; owner: Id; n }`, `Id = string` (facade/types.ts:28; ids.ts:5 READ) | HOLDS (type-level, as the cell says) |
| E-13 | SUPPORTED-NOW | the K13 lint test's header: z-like names refused over kernel/src, `LatticePoint` pinned to x and y (test/gate/no-elevation.test.ts:1-7 READ) | HOLDS |
| E-25 | SUPPORTED-NOW | ids.ts:11 READ | HOLDS |
| E-58 | SUPPORTED-NOW | `pointLocate(key: ArenaKey, level, p)` (facade/types.ts:102 READ) | HOLDS |
| E-38 / **O2** | AFTER-M-1-BY-DESIGN | "the kernel's stub row (`API.md` §8) builds the form at M6-P, its first view owner is M-ENC's" (ARCHITECTURE.md:4965 READ); M-ENC "starts after M1" (A:21716 READ); M6-P's P0, P1, P3 "after M4" (A:21707 READ); V14 puts M-ENC after M1 "for everything but the interiors" and opens "the owner-less transient arena … over a crop's rectangle minus twenty rings" at M-ENC's start, with "the arena's open ≤ 2 ms" an SE0 exit (V14:2875-2878, :2889 READ) | HOLDS; **O2 is a real sequencing hole in the plan**: the first milestone of this level needs a kernel form the plan builds two milestones later; no text says who builds it first (§3 (d)) |
| E-40 / **O1** | AFTER-M-1-BY-DESIGN | base §3.4: a fixed ring that "overlaps another fixed ring" is refused, detail `overlap`; fixed rings' "interiors pairwise disjoint" (ARCHITECTURE.md:4971, :4985-4986 READ); V14 E4 (a): one arena whose fixed rings are "every footprint, water face and underground element face of the resolved set clipped to the rectangle" (V14:2078-2081 READ), the resolved set holding "the underground elements of the drawn band (and, on the ground, the elements whose ceiling lies within `surfaceClearCm` of the ground …)" (V14:1976-1979 READ) | HOLDS; **O1 is a real V14-vs-base contract conflict**: a cellar's face under its building's footprint overlaps in plan, so the one-arena opening would be refused as written (§3 (e)) |
| E-46, E-48, E-49, E-32 | SPEC-NOT-YET-BUILT | the same code the settlement verifier rows SN-16 (`insertChain`), SN-36 (booleans, buffer, insetRing), SN-39 (skeleton) and SN-76 (the range check) as SUPPORTED-NOW, and the world verifier rows W-01 (the range check) as SUPPORTED-NOW; the rounds a-05 s9 (KI-1: refusals below the caps, a ratchet), a-08 s4 (KI-7: 0 met in 1.2e5 cases), a-11 s4 (Q63: a typed planarity downgrade) and e-01 s1 (6 notes) are hardening rounds on landed, tested code with fail-safe known issues (docs/KNOWN-ISSUES.md:19, :24; read-kernel I4-I5), under the owner's rule J202 "FAIL SAFE NOW, HARDEN LATER" (PROGRESS.md:261 via read-m0 F4) | **CORRECTED to SUPPORTED-NOW** (with the round noted, as the settlement table does). A mid-flight hardening round does not un-build landed, tested code; what un-builds it is an open silently-wrong-output class — which is why E-47 (`corridorUnion`, Q48) and E-51 (the 10⁶ bar itself) keep SPEC-NOT-YET-BUILT |
| E-47, E-51, E-52, E-60–E-62, E-68 | SPEC-NOT-YET-BUILT | as SN-30, SN-64, SN-98, SN-67 and SN-115 | HOLDS |

**Corrected counts for this level** (66 counted rows): SUPPORTED-NOW **22**, SPEC-NOT-YET-BUILT **7** (E-47, E-51,
E-52, E-60, E-61, E-62, E-68), AFTER-M-1-BY-DESIGN 31, CARRIED-TO-M1 5, MISSING 1, FORECLOSED 0. The settlement
(117 rows: 69 / 14 / 31 / 3 / 0 / 0) and world (56 rows: 24 / 3 / 24 / 5 / 0 / 0) counts stand. Across the three levels,
239 rows: **SUPPORTED-NOW 115 · SPEC-NOT-YET-BUILT 24 · AFTER-M-1-BY-DESIGN 86 · CARRIED-TO-M1 13 · MISSING 1 ·
FORECLOSED 0.**

---

## 2. The blockers, judged

**real** = the blocker stands with its cite; **real, derivative** = it stands but is the same action as another
blocker (no separate step); **overstated** = the status is too strong, with why; **wrong** = it does not stand.

| # | the verifier's blocker | judgement | why (cite) |
|---|---|---|---|
| B-1 | `corridorUnion` / `bandUnion` / `kerb`: Q48 open; round a-09 s6/s7 mid-flight; Q18 and Q19 queued | **real** | a committed block 142 cm inside an arterial's band is a silently wrong output, N-45 (a)'s class (M0-FIX-QUEUE.md:62 READ); the round stopped 2026-10-14 (PROGRESS.md:449 READ); Q18 "before M0-t-01" (:45 READ) |
| B-2 | the per-op and stage budgets: 10³–10⁴× over §12.4; the owner's re-budget-or-redesign decision | **real** | the profile's own §0 says the measurement is a contended debug build AND that a production bundle gains only 1.6–1.8× on S8/S9, "none of that closes the gap" (profile-city-stages.md:21 READ) — so the magnitude survives the container; J357 accepted the reading (PROGRESS.md:415 READ). The decision is the owner's, after Q18 and Q69–Q72 (M0-FIX-QUEUE.md:45, :83-86 READ); M0-t-01 cannot mean anything before it |
| B-3 | the fusion gate M0-c-06 unbuilt | **real** | bench/src/fusion/index.ts empty (READ); M0.md:190-200's NOW bars have no harness to run on (READ) |
| B-4 | the site spike M0-e-06 fails countLaw, gateWards, corpus; 8 of 200 seeds | **real** | summaries/M0-e-06.json READ; the rounds e-04 s3, e-01 s1, e-02 s1, c-03 s3 stopped (PROGRESS.md:449 READ) |
| B-5 | B-FUZZ at 10⁶ and §3.7 (i)'s 10⁶ / ≥ 10⁵-unattracted bar; the nightly tier M0-f-02b | **real** | the bar is M0's own exit bar (M0.md:131-135 READ; §16 M0's exit via read-base 277); 10⁴ is what ran (M0-k-04.json READ); Q49 says the run needs a nightly, not a seat (M0-FIX-QUEUE.md:63 READ) |
| B-6 | the work-limit coefficients M0-f-03b | **real, derivative** | bench/src/worklimits/index.ts empty (READ); it reads M0-c-06's summary (M0-work.json via read-m0), so it is B-3's tail, not a step of its own |
| B-7 | §3.8's corpus bar on the spikes' faces | **real, derivative** | M0.md:133-136 (READ): the c-06 and e-06 re-runs carry it — B-3 and B-4's tail |
| B-8 | cross-host identity 2 of 10 legs; the timing bars; the timing phase and the M0 record | **real** | M0-d-06 / M0-d-09 incomplete (READ); no landed record for M0-t-00/01/02, M0-x-01 (READ); J391 (5) sequences them on the Mac (PROGRESS.md:450 READ) |
| W-06 | the hydro core V13 lifts should be the hardened code (rounds e-01 s1, e-02 s1) | **real, derivative** | the same hardening resume as B-4 (PROGRESS.md:449 READ); the verifier is right that it is a precondition of the world's build at M-W0h (after M4, A:21714 READ), not of its design |
| W-23 | T-V13-1 rests on the five engines agreeing | **real, derivative** | = B-8 |
| W-52 | V13's frame steps must fit inside S1's row; the headroom is unknown until S1 is measured | **real, derivative** | = B-2 and B-8; and V13 pre-decided its own fallback (a D-18 amendment; SP-W5, V13:3499-3502 via read-v13 F213), so it blocks nothing of the world's design |
| E-31 (B-1 of that table) | MISSING: adoption's arena re-key | **real** (a design hole, not an M0 build item) | §1.3; the smallest addition is a gate row K14 carried to M1's API pass; first reader M-SITE-F after M-W1 (A:21718 READ) |
| E-68 | M0's own close | **real** | the sum of B-1 … B-8; every V14 milestone starts after M1 or later (A:21716-21719 READ) |
| E-46 / E-47 / E-48 / E-49 / E-51 / E-32 | the operators the site's geometry is made of, mid-flight | **overstated for E-46, E-48, E-49, E-32; real for E-47 and E-51** | §1.3: built and tested code under fail-safe hardening rounds is SUPPORTED-NOW (J202); the open silently-wrong class (Q48) and the unmet 10⁶ bar are what remain — both already B-1 and B-5 |
| E-52 | five-engine identity of the encounter and the site document | **real, derivative** | = B-8; the verifier's "yes to start, no to exit" is the right reading (SE0/SE1/SE4's exits, V14:2889-2893 READ) |
| E-60, E-61, E-62 | the kernel rates V14 §6 assumes | **real, derivative** | = B-2 and B-8; "yes to start" is right — V14 §6 says its work sizes are PLAUSIBLE until SE0 and V0 measure them (V14:2740 via read-v14 F199) |

Nothing a verifier called a blocker is **wrong**. The distinct actions behind the sixteen are eight: B-1, B-2, B-3,
B-4, B-5, B-8, the K14 row (E-31) and the two plan texts of §3 (d) and (e) below; B-6, B-7, W-06, W-23, W-52, E-52,
E-60–E-62 and E-68 fall out of those.

---

## 3. What the verifiers could not see

### (a) The grep of the volumes for the kernel's primitives by name (task 3)

Counts of case-insensitive hits (file: V13-world.md / V14-sites.md; the raw list is in the scratchpad):
`snap` 0 / 0 (V14's "snapped outward to whole grid cells" is the crop rectangle, "the canonical geometry never snaps",
V14:2046-2047 READ) · `Frame` 415 / 117 · `LatticeSpec` 0 / 0 · `orient2d` 0 / 0 · `arena` 35 / 67 · `Plat` 101 / 67
(almost all `PlatApi`, `PlatKey`) · `RoleTable`, `LevelFaces`, `OwnerTable`, `flatbush` 0 / 0 · `transient` 18 / 65 ·
`bent cut`, `fusion` 0 / 0 · `skeleton` 1 (a fort's layout, V13:4215) / 9 (G5's `skeleton` and medial axis, V14:1619,
:1725) · `delaunay` 6 / 1 (V14's is `voronoiEdges`, :1648) · `D8` 21 / 0 · `priority flood` 16 / 0 · `datum` 57 / 15 ·
`ZDecl` 8 / 30 · `storey` 15 / 170 · `promote` 5 / 30.

Every hit that names a kernel need is already a row: V13's five kernel parts (`delaunay`, `dmath`, `rng`, `index`,
`noise`, V13:611-613 READ — W-12 … W-20), V14's bands, skeleton, medial axis, Voronoi, noise, path search,
`hexLattice`, `obb`, `lir`, `sideRuns` (V14:240 READ — E-45 … E-49), the transient arena (E-38 … E-44), `pointLocate`
(E-58), the `Frame` (W-26, E-03), the datum (W-10, E-16), storeys (E-26: V03's, never a part), promotion (E-44).
Nothing in either volume asks the kernel for `snap`, `LatticeSpec`, `orient2d`, the tables, `flatbush`, the bent cut
or the fusion spike by name: the world runs no arena, and the site level reaches those through the base's own
stages and writers (V14:1626-1636, :1673-1688 via read-v14 F109, F114).

### (b) Needs no reader recorded

1. **S1 at crop scale (a V14 design risk; not M0's).** V14 runs the base's S1 on a **100 m** world crop frame
   (V14:1985-1989 READ; budgeted "S1 on a 100 m frame (≈ 4 ms: §12.4's S1 row at 1/36 of a CITY frame)", V14:2749 READ)
   and on a free site's frame of `max(envelope radius × 4, 120 m)` (V14:1434-1436 READ). The built S1 carries
   town-scale constants: the hydrology cell is 16 / 25 / 32 m by rung (site/src/hydro/field.ts:1-2 READ;
   ARCHITECTURE.md:1013 via read-base 44) — a 100 m frame with its 30 % margin is 160 m across, six hydro cells —,
   `ESTUARY_LENGTH_M = 400` (site/src/hydro/params.ts:43 READ), the 32 m coarse fBm grid and the 4 000 m base
   wavelength (read-kernel D3; choices.md:176 via read-m0 E7). Whether a priority flood, D8, river tracing and a
   carve on six-by-six cells give the "DEM, water surfaces and river reaches" V14 expects is unmeasured and no text
   addresses it; V14's SE0 spike measures the crop frame's time, not its sense (V14:2889 READ). Not an M0 limit — the
   frame side is a parameter (`frameOf` admits any positive area, frame.ts:26-28 READ) — but a PLAUSIBLE V14 row with
   no pre-decided fallback. The smallest fix is V14's: a fallback row ("the crop frame from the charter's edge
   profile and water edges alone, no S1 run") beside WORLD-9's.
2. **Two §3.1 "build" pieces outside the kernel.** The base's build-versus-adopt table lists the distance transform
   and Bridson's Poisson-disc sampler as kernel builds (ARCHITECTURE.md:4301, :4305 READ). The distance transform is
   built at M0-e-05 inside `@plat/layout` (fields/edt.ts READ) — a placement difference only. The Poisson-disc sampler
   is in no package (grep READ); its one reader is §8.10's tree scatter (ARCHITECTURE.md:15491 READ), rendering, which
   §4b sends to M1 (M0.md:861 READ) — covered by that row, named by none. Documentation only.
3. **The lazy tiers** (the settlement verifier's SN-88): confirmed — the runner cites a §4b row that does not exist
   (runner.ts:19-21; M0.md:834-877 READ). Documentation only; the mechanism (eager runs) gives the model the contract
   promises.

### (c) A limit two levels disagree on

None that binds. The differences found, each read in both places: (i) the model matcher's coordinate check admits
|v| ≤ 2²⁴ where `snap` refuses at 2²³ (read-kernel C10; snap.ts:15 READ) — looser, harmless; (ii) V13's frame records
carry an absolute `marginCm` (V13:2197, :2846 READ) where the kernel's `Frame` carries `marginShare` (frame.ts:15
READ) — a unit form, `marginCm = marginShare × side`, not a limit (the world verifier's W-34 note); (iii) the u8 stage
rank: the settlement's 25 rows plus the EVO_*, VS* and tail rows, the world's 18, the site's 16 — 59 and some tens
more against 256, consistent across the three tables (E-07); (iv) V14's `EmbedRule.attempts` 3 against the registry's
default cap 2 = three attempts (registry/index.ts:16-21 READ) — consistent; (v) V13 §1.3 says "the world in metres"
and §2.1 "integer world centimetres" (read-v13 G5) — V13's own, and neither reaches the kernel but as integer metres.

### (d) A deferral whose later milestone is mis-sequenced — the transient arena (O2)

The kernel's transient arena is deferred to **M6-P** (M0.md:854 READ; notBuilt.ts:60-63 READ; the base: "the
kernel's stub row (`API.md` §8) builds the form at M6-P, its first view owner is M-ENC's", ARCHITECTURE.md:4965 READ).
M6-P's P0, P1, P3 start **after M4** (A:21707 READ). The encounter crop's milestone **M-ENC starts after M1** (A:21716
READ) and its first step SE0 opens "the owner-less transient arena … over a crop's rectangle minus twenty rings" with
"the arena's open ≤ 2 ms" as an exit (V14:2889 READ); V14 itself defers only the interiors to M6-P (V14:2876-2877
READ). So the level's first milestone needs a form the plan builds two milestones later, and no text names who builds
it first. Not an M0 foreclosure (the types and the façade signatures are in place, C-0041), and the K9 gate row holds
type-level. **The smallest fix is one sentence in the base's §16 M-ENC row and V14 §8's SE0** — either M-ENC's SE0
builds the kernel's transient-arena form (§3.4; API.md §8's stub row) as its first owner, M6-P's plan rung its second
reader, or M-ENC starts after M6-P's P0. The coherence pass's call under the owner.

### (e) A contract two texts disagree on — E4's one arena (O1)

Base §3.4 refuses a fixed ring that overlaps another fixed ring (A:4985-4986 READ; interiors "pairwise disjoint",
A:4971 READ). V14 E4 (a) opens one transient arena whose fixed rings are every footprint, water face **and underground
element face** of the resolved set (V14:2078-2081 READ), and the resolved set holds the underground elements of the
drawn band (V14:1976-1979 READ). A cellar under its house overlaps the house's footprint in plan by nature, so the
opening as written is refused `overlap`, and F-SITE's E4 row drops to "the crop without a transient arena (items
drawn, not hit-tested)" (V14:2159 via read-v14 F164). Not M0's; V14's and M6-P's. The smallest fix is V14's: one
arena per scene (the ground; each storey; each depth band; each site level — `EncounterCrop.scenes` already lists
them, V14:2063-2068 via read-v14 F149), each with its own fixed rings and its own `pointLocate`.

### (f) What M0's texts say about the three levels — the one frame the three tables share

M0 builds no volume (M0.md:70-72 via read-m0 A6); §4b names no world, site, encounter or 2.5D row (M0.md:834-877
READ); the close gate is where the three later levels meet M0, and its rule — "No row adds a feature. A kernel row
(K) must be resolved before M0 commits, or carried to M1's API pass with its reason; a model row (M) is recorded now
and is M1's to change" (M0-world-sites-gate.md:5-7 READ) — is what makes "AFTER-M-1-BY-DESIGN" the honest status for
the 86 rows so marked. The gate holds with five rows carried (K10, K12, M1, M2, M4), each with its smallest addition
named (checks/M0-world-sites-gate.md:30-34 via read-m0 B8; the five additions at :194-199, :232-236, :272-278,
:294-296, :315-317 via verify-world). The one row the gate did not think to ask is K14 (§1.3).

---

## 4. The answer

### YES-WITH-CONDITIONS

**One line.** M0's shape carries all three levels — nothing it fixed forecloses the local settlement, the world or
the site and encounter crop, every limit clears its need by three times to three orders of magnitude, and the world
and site levels reach the kernel through appends and hooks M0 left on purpose — but M0 *as it stands* is not yet
closed (an open correctness class, three unmet gates, the owner's performance decision, the Mac-only runs), and the
design around it has one un-named mechanism (adoption's arena re-key) and one mis-sequenced deferral (the transient
arena at M6-P against M-ENC after M1).

**The conditions** — each the exact thing M0 or the next milestone must do, with its cite:

1. **Land round M0-a-09 s6/s7, then Q18 with Q19.** Q48, a committed block overlapping an arterial's corridor
   (docs/M0-FIX-QUEUE.md:62), is open on wip/child-a09s6b (docs/PROGRESS.md:449); Q18 "FIRST in the hardening phase",
   Q19 its closing check (M0-FIX-QUEUE.md:45-46). Until then `corridorUnion`, `kerb` and `bandUnion` can commit a
   silently wrong block — the one piece of built kernel code the three levels cannot stand on yet (S9, V14's G5 L2).
2. **The owner's re-budget-or-redesign decision on §12.4**, after Q18 and the no-shift rows Q69–Q71 and the
   production-bundle re-measure Q72 (M0-FIX-QUEUE.md:83-86), recorded as a D-18 re-declaration or a §12.4 amendment
   before M0-t-01 runs (profile-city-stages.md:23; J357, PROGRESS.md:415). V13's frame steps (W-52) and V14's G5 and
   crop rows (E-60 … E-62) rest on those rates.
3. **Build and run the fusion gate M0-c-06** on 1 000 CITY seeds with its NOW bars and the ≤ 100 ms line
   (plat/docs/build/M0.md:190-200; plat/bench/src/fusion/index.ts is the empty scaffold); M0-f-03b after it.
4. **Land rounds e-04 s3, e-01 s1, e-02 s1 and c-03 s3 (PROGRESS.md:449) and re-run M0-e-06 at its 200 seeds** until
   countLaw, gateWards and corpus pass (summaries/M0-e-06.json; M0.md:240-243). The hydro core V13 lifts at M-W0h
   (V13:3906-3915) is this code.
5. **Land M0-f-02b and run its nightly once whole**: B-FUZZ at 10⁶ per primitive with ≥ 10⁵ unattracted cases per
   operation (M0.md:131-135; summaries/M0-k-04.json records 10 000; Q49, M0-FIX-QUEUE.md:63).
6. **The Mac-only steps in J391 (5)'s order** (PROGRESS.md:450): M0-d-06 on all ten legs and M0-d-09 on 100 seeds
   (summaries: 2 of 10, 2 of 100), then M0-t-00 → M0-t-01 (→ M0-t-02), then M0-x-01 — none has a landed record.
   T-V13-1 and T-V14-1/-25 (byte identity on five engines) read this harness.
7. **At M1's API pass, the appends the gate and the base already name**: the five carried rows K10, K12, M1, M2, M4
   with their smallest additions (checks/M0-world-sites-gate.md:194-199, :232-236, :272-278, :294-296, :315-317); the
   `site` `Layer` value (a four-site source edit plus the model's two functions, checks:42-69; ARCHITECTURE.md:556-559),
   the W/G/E/R stage ids and the `site` and `world.*` concerns (A:10179-10180; V13:3973-3988), the `passage` role
   (A:909) — every one an append the K1/K5/K6 tests pin.
8. **One new gate row, K14** — "an arena's block loads under a caller-named `PlatKey` with an entity-id map, printing
   and digesting equal to the same content built under the new key" — carried to M1's API pass as
   `DecodeOptions.from?: PlatKey` and `DecodeOptions.ids?: (id: Id) => Id` (io/decode.ts:274; io/types.ts:21-30), for
   adoption (V14:1917-1918, :1167-1170); first reader M-SITE-F's SE6 (V14:2895).
9. **Two sentences for the coherence pass before M-ENC** (not M0's, but the encounter level cannot start without
   them): who builds the transient arena's form before M-ENC (A:4965 says M6-P after M4; M-ENC is after M1, A:21716;
   SE0 opens it, V14:2889); and E4's one arena with overlapping fixed rings against §3.4's pairwise-disjoint rule
   (V14:2078-2081; A:4985-4986).
10. **A watch, not a gate:** S1 on a 100 m crop frame (V14:1985-1989, :2749) against S1's town-scale constants
    (field.ts:1-2; params.ts:43) — V14's SE0 measures it; a pre-decided fallback row would close it.

### The gaps table

| level | need | status | cite | fix |
|---|---|---|---|---|
| settlement | `corridorUnion` / `kerb` / `bandUnion` commit a correct block (S9; S8's planner) | SPEC-NOT-YET-BUILT | M0-FIX-QUEUE.md:62 (Q48), :45-46 (Q18, Q19); PROGRESS.md:449 (a-09 s7) | land a-09 s6/s7, then Q18 + Q19 (condition 1) |
| settlement | the per-op and stage budgets of §12.4 | SPEC-NOT-YET-BUILT | profile-city-stages.md:14-23; PROGRESS.md:415 (J357); M0.md:141-150 | Q18, Q69–Q72, then the owner's D-18 / §12.4 decision before M0-t-01 (condition 2) |
| settlement | the fusion gate S4 + S5 + S8 on 1 000 seeds, ≤ 100 ms | SPEC-NOT-YET-BUILT | M0.md:190-200; bench/src/fusion/index.ts | build and run M0-c-06; M0-f-03b after (condition 3) |
| settlement | the site spike's count law, gate wards, corpus bar; S1 + S4 + S6 ≤ 50 ms | SPEC-NOT-YET-BUILT | summaries/M0-e-06.json (`pass` false, 8 seeds); M0.md:240-251 | land e-04 s3, e-01 s1, e-02 s1, c-03 s3; re-run at 200 seeds (condition 4) |
| settlement | B-FUZZ at 10⁶ per primitive; §3.7 (i)'s ≥ 10⁵ unattracted cases; the nightly tier | SPEC-NOT-YET-BUILT | M0.md:131-135; summaries/M0-k-04.json (10 000); M0-FIX-QUEUE.md:63 | land M0-f-02b; one whole nightly run (condition 5) |
| settlement | cross-host identity on five engines; the TIMING bars; the M0 record | SPEC-NOT-YET-BUILT | summaries/M0-d-06.json (2 of 10), M0-d-09.json (2 of 100); landed/ (no t-00, t-01, t-02, x-01); PROGRESS.md:450 | the Mac-only steps in J391 (5)'s order (condition 6) |
| settlement | the persisted rank-table and engine versions; the namespace segment; the water-table function | CARRIED-TO-M1 | checks/M0-world-sites-gate.md:183-199 (K10), :259-278 (M1), :310-317 (M4) | the gate's smallest additions at M1's API pass (condition 7) |
| settlement | §4b rows for the lazy tiers, S10a, S15; the distance transform's and the Poisson sampler's homes | documentation | runner.ts:19-21; M0.md:834-877; A:4301, :4305 | four lines in M0.md §4b / the base's §3.1 table |
| world | the reason record's inputs from the commit journal; the carve delta; the version table | CARRIED-TO-M1 | checks:221-236 (K12), :280-296 (M2), :183-199 (K10) | the gate's smallest additions (condition 7) |
| world | the hardened hydro core for the M-W0h lift; byte identity on five engines; S1's headroom for the surface and groundwater steps | SPEC-NOT-YET-BUILT (derivative) | PROGRESS.md:449 (e-01 s1, e-02 s1); summaries/M0-d-06.json; V13:3494-3502 | conditions 4, 6, 2; V13's own fallback (a D-18 amendment, SP-W5) if S1 fills its row |
| world | the import band 8 389–21 475 km against the integer-metre hand-off; which path search W7 uses; the lift's range check; a world entity's arena lane | V13 text (no M0 change) | V13:2735-2737, :1730; :199 vs :1738; field.ts:13-17; V13:1211 | V13's architect: centre the seats or hand 10 m units; name the queue; name `heightWriter` in BCR-V13-1; one sentence on the world root's lane |
| site/encounter | **adoption's arena re-key** (a site part moved to a new `PlatKey` with its ids re-prefixed, tokens kept) | **MISSING** (not foreclosed) | V14:1917-1918, :1167-1170, :181; io/decode.ts:274; io/types.ts:21-30; plat.ts:149; A:4797-4852; AMENDMENTS-j:117-120 | a gate row K14, carried to M1's API pass as `DecodeOptions.from` / `.ids`; first reader M-SITE-F (condition 8) |
| site/encounter | the transient arena before M-ENC (built at M6-P after M4; M-ENC after M1) | plan sequencing (not M0's) | A:4965, :21707, :21716; V14:2876-2878, :2889 | one sentence: SE0 builds the form, or M-ENC after M6-P's P0 (condition 9) |
| site/encounter | E4's one arena with overlapping fixed rings vs §3.4's disjoint rule | contract conflict (not M0's) | V14:2078-2081, :1976-1979; A:4971, :4985-4986 | one arena per scene (condition 9) |
| site/encounter | `partition` and `corridorUnion` on a transient arena (O3) | V14 text | V14:2083, :1990-1994; A:5009-5011 | "computed elsewhere, entered as fixed rings" written down |
| site/encounter | the `site` layer, parts ≥ 1, the G/E/R ids, the `passage` role, the five carried rows | AFTER-M-1-BY-DESIGN / CARRIED-TO-M1 | A:556-559, :909, :10179-10180; checks:42-69 | the appends at M1's API pass (condition 7) |
| site/encounter | S1 on a 100 m crop frame | PLAUSIBLE V14 row, no fallback | V14:1985-1989, :2749, :1434-1436; field.ts:1-2; params.ts:43 | V14's SE0 measures it; a fallback row (condition 10) |

### For the owner, in plain words

M0 is the bedrock: the exact-geometry engine the whole map rests on — the centimetre lattice, the arenas with their
five levels of detail, the tables, the operations that draw and cut, the determinism machinery and the first stages of
a town — and all three levels of map-making can stand on it as designed: the local settlement is what M0 was built
for and nothing it needs is missing from the plan; the world never puts geometry into the engine at all — it uses only
five small pieces of it (triangulation, exact maths, random streams, the index and noise) and every number it hands
over fits with room to spare; and the world sites and encounter crops ask for a fourth layer, a scratch arena for the
crop, and some new names, every one of which M0 deliberately left a hook for and the October 17 gate checked. What
is not true yet is "as it stands": M0 is not finished or proven — one kernel operation (the one that lays the street
blocks) can still commit a quietly wrong block and its fix round stopped mid-flight on October 14; the fusion gate has
no harness, the site spike fails three of its bars, the robustness run is at ten thousand cases where the bar asks a
million, the five-browser identity check ran two of ten legs, and the timing phase and the M0 record have not run;
above all, a profile shows the town stages running a thousand to ten thousand times over budget, and the decision
whether to re-budget or redesign is yours to make before any timing means anything. Most of what the world and sites
need is deferred on purpose to M1 and later, with the hooks in place. There is one real hole in the design, small but
real: when a free-standing site is adopted into a town, its underground levels must move into the town's document
under a new part number keeping every identity, and no text or code says how an arena changes its key — a one-option
addition to the loader, to be added as a gate row and carried to M1. And there is one sequencing slip in the plan: the
encounter crop (right after M1) needs the scratch arena the plan builds two milestones later (M6-P, after M4). What
to do next, in order: let the hardening rounds resume and land a-09 and Q18 first; make the re-budget-or-redesign
decision; build and run the fusion gate and re-run the site spike; run the nightly fuzz; then the Mac-only timing and
cross-host steps and the M0 record; and at M1's API pass add the gate's five carried rows plus the new K14, while the
coherence pass writes the two missing sentences about the transient arena. Nothing in that list changes M0's shape.

---

Landed 2026-10-18 (the LANDED line in docs/lane-events.log).
