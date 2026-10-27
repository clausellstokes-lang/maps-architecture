# M0-e-03: minor notes for the hardening milestone M4 (check/M0-e-03, 2026-10-06)

Under J180 and N-45 none of these notes fails the item; the only blocker is B-1 in `checks/M0-e-03.md`. Each note is a
KI row for the hardening pass. The probes and mutants live in `~/maps-scratch/waves/check-M0-e-03/` (mirror only).

1. **KI — a few bank outfalls sit up to 22 cm off the body's shore chain in the arena.**
   * Probe: 6 of 7 374 bank outfalls over 103 runs lie more than 2 cm from the shore edges that
     `resolve(('shore', water))` returns; the worst is 22.0 cm. §2.3 places `at` "on the receiving body's shore chain".
   * **Why:** `outfalls` projects onto the polygon rings handed to the batch, not onto the committed shore. The
     insertion's attraction and the inserted deck vertices can move the committed chain by up to `attractCm`.
   * **Effect:** it fails safely. `cell` is re-found from `at`, the error is below one hydro cell (25 m), and no
     reference names the point.
   * **Hardening:** project onto the committed shore chain, or snap `at` onto it; test the distance on the bar's seeds.
2. **KI — the stage's detect-and-refuse guards have no fault-injection test (mutants M15, M19 and M36 survive).**
   * The stage-end refusal (`stage.ts`: `failed.length > 0`), the decks in its refs, and `waterFaces`' "claimed face
     with no edge of its shore" refusal can all be removed without a red. On honest input they never fire, and the
     references are checked independently (`stage.test.ts` 4, `checkCI` in the bar).
   * **Hardening test:** hand the stage a WaterSet holding a bridge whose `deck_end` resolves to nothing (or a dead
     entity), and expect E_INVARIANT; build a reach whose seed lies in a face its rings do not bound, and expect
     E_INVARIANT.
3. **KI — no test pins the L0 partitions' rebuild at stage end (mutant M16 survives).**
   * §3.3 rebuilds the index partitions at a stage's end, and `runS1` calls `rebuildAtStageEnd`. Removing the call
     leaves `checkCI` green, because a dirty grid is still a fresh index.
   * **Hardening test:** after `runS1`, assert that the ground arena's dynamic grids at L0 are empty (the rebuilt
     count is positive).
4. **KI — a polygon part with no seed is dropped without a report.**
   * `partsWithSeeds` drops a part that holds no course point at least 100 cm inside it. The body is reported only when
     every part goes. An instrumented probe counted 0 such parts in 103 runs, so the case is contrived today, but a
     lost part would be water missing from L0 with no line in `report.dropped`.
   * **Hardening:** report a dropped part (body id, area) in `report.fallbacks` or `dropped`, or seed the part from
     an interior point instead of the course.
5. **KI — the span ≤ 3 widths filter has no test (mutant M22 survives).** With it removed the decks stay bank-to-bank
   and perpendicular, and the narrowest-first ranking still prefers short spans. **Hardening test:** a bend where the
   perpendicular ray runs along the reach for more than three widths, and assert no site there.
6. **KI — bridge ids after the input's bridges have no test (mutant M33 survives).** S1 runs first at generation, so
   the input's `bridges` is empty. The case matters for S1's water operator (M3a) and until §6.3's mint replaces the
   `bridge:<n>` ids (M0-d-05a). **Hardening test:** run with one input bridge and expect `bridge:1` first.
7. **KI — a tributary refused on both polygon paths is left out of L0 (3 of the bar's 100 seeds: 46, 62, 92).**
   * The stage reports it (`dropped`, reason `refused`), as C-0229 (2) declares, and the bar bounds it (≤ 3). It fails
     safely, but the tributary's carved bed stays in the terrain with no water face over it.
   * **Hardening:** fix the grazing-angle mouth (cut the mouth along the river's shore at a minimum angle, or extend
     the tributary's course to meet the shore at a steeper angle), then tighten the bar's bound to 0.
8. **KI — a stage refusal after the ring's commit leaves the ring committed.**
   * `runS1` commits the outer ring in its own batch before the water. If the water then fails on both paths for the
     first body, or the stage-end check fails, the stage returns an error while the arena holds the ring (and, for the
     stage-end case, the water too).
   * **Effect:** it fails safely, since the stage refuses. Whether the runner rolls the stage's batches back is
     M0-x-04's and M0-e-06's concern.
   * **Hardening:** state that rollback rule in M0-x-04's registration, or have `runS1` report the versions it
     committed with the refusal.
9. **Informational for the timing waves (never gated here) — S1's L0 batch on a full CITY frame takes seconds against
   §12.4's 25 ms S1 row.**
   * The author's figures (C-0229 (2)): about 0.1 s per 100 ha seed, and 2–50 s for a full CITY frame on the slow path.
     My NEAR run took 116 s for the 103 bar runs. **PLAUSIBLE** (a timing on this machine is informative only).
   * **For waves T and T2:** M0-e-06's S1 + S4 + S6 ≤ 50 ms bar will meet this cost; the kernel-buffer fallback is the
     slow path to look at first.

## Closing check (`check/M0-e-03-close-r1`, 2026-10-06)

10. **KI — a site's `deck` can differ from the committed deck by centimetres (reported by the fix round in C-0233; M4).**
    * Observation: C-0233 records bar seed 64 `bridge:7`, whose committed end 1 lies 25 cm from its site's `deck[1]`: the
      insertion moved it. `stage.test.ts` asserts the two equal on its seed 2 only. This seat's oracle probe measured the
      committed decks (948 over 103 runs) and found the worst 2.0° off the averaged flow's normal, so the ± 10° promise
      holds on the committed geometry. **CONFIRMED** for the angle; the 25 cm figure is the author's (**PLAUSIBLE** here).
    * Effect: it fails safely. The references resolve to the committed vertices; only the `CrossingSite` record can lag.
    * **Hardening:** after the commit, re-read each site's `deck` from its resolved `deck_end` vertices, or bound the gap
      by `attractCm` in a test over the bar's seeds. It belongs with note 1 (the same insertion attraction).
11. **Informational — two of this seat's flow mutants are caught only by the full CITY frames.** F03 (the flow from the
    adjacent-vertex chord) and F04 (averaged over half a width) pass the four fast files and the 100 bar seeds at 100 ha.
    The three full CITY frames kill them ("seed 4 bridge:27 11.9°"; "seed 10 bridge:20 15.6°"). The bar holds, but its
    margin rests on three frames. **Hardening (M4):** a hand-built course in `crossings.test.ts` whose adjacent-vertex
    chord and half-width chord both lie over 10° off the one-width chord, such as a bend with a short kink at the vertex.

## Closing check of session fix round S1 (`check/M0-e-03-close-s1`, 2026-10-11; N-56 (1), Q20 class A)

None of these fails the item (J180, N-45: each fails safe or is a hardening test). The probes and mutants ran in this
seat's scratch mirrors `waves/check-M0-e-03/m1` (the tree's code) and `m2` (a switch for the pre-round variant), never in
`plat/`.

12. **KI — nothing pins the 2 cm band of `provedRings`' fixed rule (mutant K04 survives).**
    * Observation: K04 changes `ringsDist2(covered, q) <= 4` to `<= 0`, so only vertices exactly on an earlier ring
      stay fixed. It passes NEAR 51/51. In an instrumented mirror, the 103 exit-bar runs reach the band with 2 vertices,
      both on bar seed 78 (100 ha): the tributary's two junction vertices with the river, lattice-rounded crossings under
      2 cm off the river's ring. Under K04 the clean drops them, and the tributary's kernel ring is refused `not clear
      (meets an earlier body)`. Seed 78 then keeps 2 bodies instead of 3, so the refused tributaries rise from 1 to 2,
      still inside the bar's `≤ 3`. **CONFIRMED** (probe `zz-chk-bar.test.ts`, base against K04).
    * Effect: it fails safe. The tributary is detected and refused, and the report lists it.
    * **Suggested handling:** pin bar seed 78's tributary as kept, or add a hand-built ring with a vertex 1 cm off an
      earlier ring that stays put. Also tighten `exit-bar.test.ts`'s refused bound from 3 to the 1 this round measured.
      **M4.**
13. **KI — nothing pins the "the fast ring: <cause>" part of the river's refusal (mutant K13 survives).**
    * Observation: K13 replaces `fastWhy` in `stage.ts`'s refusal detail with the literal `inserted, refused at commit`.
      It passes NEAR 51/51, because `slow-rings.test.ts` matches `\(the fast ring: [^)]+\)`, which accepts any text.
      Mutants K12 and K16 are killed, so the code, the one rung spent and the kernel ring's cause are all pinned.
    * Effect: only the message changes. Nothing persisted depends on it.
    * **Suggested handling:** assert that the loop river's detail names its fast ring's actual cause. **M4.**
14. **KI — nothing pins how the stage's `fast` flag counts bodies refused on their polygons (mutant K18 survives).**
    * Observation: K18 restores the pre-round `fallbacks.length < reaches.length`. A body refused on both polygons sits
      in `fallbacks` but has no reach. Take one standing fast ring plus one polygon-refused tributary (bar seed 62 has
      this shape). The old formula then reads "no fast ring", and if the batch were refused it would skip the slow-only
      retry. It would then drop the named body, or refuse the stage if that body is the river.
    * Why it survives: no measured seed has a batch refused in that shape (seed 62 commits), so the outcomes are equal.
    * Effect: it fails safe either way.
    * **Suggested test:** two hand-built bodies, a tributary refused on its polygons and a river fast ring that the batch
      refuses; expect `report.retried` true. **M4.**
15. **Informational, for M0-x-06 round 2 (N-56 (6)) — EP-01/S1/self-touching's planted refusals rise from 28 to 33 per
    1 000.**
    * This seat's 1 000-seed run: with the unplanted river now committing, `firstStanding` no longer moves the 5 class-A
      seeds to state 2.
    * Planted, they refuse safe `E_INVARIANT`. The slow ring is their first and only rung, and the plant fires on it.
    * This is inside `ep01.ts`'s PINNED `S1 self-touching: E_INVARIANT`, with 0 problems and every arena valid.
    * `ep01.ts`'s "~3 %" now measures 3.3 %. `ep01.ts` is not M0-e-03's file; x-06 round 2's re-pin should state the
      new rate.

## Closing check of session fix round S2 (`check/M0-e-03-close-s2`, 2026-10-11; Q31, the row `references-resolve`)

None of these fails the item (J180, N-45: each fails safe, is equivalent, or is a hardening test). The probes and
mutants ran in this seat's scratch mirrors `waves/check-M0-e-03/m1` (the tree's code plus probe files), `m2` (the
pre-round variant) and `m3` (mutants), never in `plat/`.

16. **KI — the row's subject is pinned for the decks and the live set only; nothing pins the margin, the bodies' face
    and shore, or the land faces (mutants K09, K10, K11 survive NEAR).**
    * Observation: K09 drops the terrain's margin from the refs `runS1` hands `checkStageEnd`; K10 drops each land
      component's face; K11 drops each body's face and shore. Each passes NEAR 56/56. `references-row.test.ts` plants a
      dangling deck_end (killing K08) and a dead shore entity (killing K07), so the decks and the live set are pinned;
      the other three classes resolve on every honest run, so no honest test can tell them apart. The tree's code does
      check them: this seat's own breaches on seeds 7 and 12 (all margin rows removed; `land:0`'s faces and
      `water:river:0`'s faces unowned through `setFaceOwner`; a second `(deck_end, bridge:0, 0)` vertex) are each refused
      `E_INVARIANT`, the detail starting `references-resolve: ` and naming the dangling reference, one failed evaluation
      reported, no outfalls written. **CONFIRMED** (probe `zz-e03s2-breach.test.ts`, 10/10). The RELATED files cannot
      kill them either: no test outside `site/test/water/` plants a reference breach at S1 (**PLAUSIBLE**, by grep).
    * Effect: none on an honest input. A mutant of the subject list would let a kernel fault that loses one of those
      references pass S1; today the list is complete.
    * **Suggested test:** in `references-row.test.ts`, the same hook planting the three other classes (the margin rows
      removed; a land component's and the river's faces unowned through `setFaceOwner`), each refused row-first. **M4.**
17. **Equivalent survivors (no test needed).** K05 removes the `row === undefined` guard: `checkStageEnd` always returns
    the `references-resolve` row (kernel `invariants/whole.ts`), so the guard is unreachable today. K15 reports
    `rows.every(hard holds)` in place of the row's own `holds`: the other two stage-end rows are vacuous at M0 and
    always hold, so the value is equal.
18. **Session finding, not M0-e-03's round — the runner's S1 work line reads 0 on every counter though two S1 batches
    commit.**
    * Observation: this seat's runner probe (`run()` over the base registry, 900 ha RIVER and FLAT, seed 1) shows S1's
      line `work` = `insert.points 0, insert.attractQueries 0, insert.placementCandidates 0, insert.crossings 0,
      tx.facesWalked 0` while `onBatch` saw two committed S1 batches. The runner records work only inside its own
      `ctx.batch` door (`layout/src/pipeline/runner.ts`); S1 commits through the kernel façade it is handed (C-0229 (1)),
      so its work never reaches the report. **CONFIRMED** (probe `zz-e03s2-runner.test.ts`).
    * Effect: a report line that reads 0 for work that ran, the Q31 shape for work counters. Nothing persisted
      depends on it that this seat found.
    * **Suggested handling:** the session decides where it belongs (the runner's façade wrapper counting a committed
      record's work, or S1's batches routed through `ctx.batch`), with the structural guard Q32 or the M0 hardening
      pass. **M4 unless the session places it earlier.**

## Consolidation round C1 (R3 of `consolidation/site-plan.md`; lane `build/M0-e-03-consolidate-1`, 2026-10-13) — the builder's map and notes

The round applies `consolidation/site-plan.md` §1.3 W-1 – W-14, §2 C-water-1 – 3 and §3.3 T-water inside the item's
owns (`site/src/water/`, `site/test/water/`), after R1 (M0-e-01 C1) homed `arenaReach`'s readers, `centreX`/`centreY`,
`PI` and `generatedLifecycle` in `site/src/terrain/` and R2 (M0-e-02 C1) homed `segParam`, `pointSegDist2`,
`segSegDist2` and `cellIndexAt` in `site/src/hydro/course.ts`. Every file outside the two water folders is untouched by
this seat. The before-image is the pre-round tree: its 10 `src/water` and 10 `test/water` files have the SHA-256 that
`landed/M0-e-03.json` (lane `build/M0-e-03-fix-s2`) records (20 of 20 equal), copied at the round's start to the lane's
scratchpad. `types.ts` and the fixture `fixtures/q20-slow-rings.json` are byte-identical; `water/index.ts` changes in its
header comment only (its non-comment lines byte-identical) and `src/index.ts` not at all.

**What changed, file by file.** No file was merged, split, renamed or moved: the folders keep 10 source files and 8 test
files plus `support.ts` and the fixture. Every `describe`/`it` title is kept verbatim (`vitest list` over the folder: 46
entries, identical before and after; vitest runs 56 tests before and after).

| old | new |
|---|---|
| W-1: `geometry.ts:16–19` `reachOf`'s own `⌈w · (½ + m)⌉, ⌈h · (½ + m)⌉` | `return arenaReach(frame)` (`terrain/grid.ts`: the same `0.5 + marginShare` and the same two `Math.ceil` products); name, signature and `Reach` return type kept |
| W-1: `geometry.ts:72–84` `segDist2`'s body | `return pointSegDist2(q, a, b)` (`hydro/course.ts`) |
| W-1: `geometry.ts:87–97` `footOn`'s body | `const t = Math.max(0, segParam(q, a, b)); return { x: a.x + (b.x − a.x) · t, y: a.y + (b.y − a.y) · t }` — `footOn`'s own clamp kept around R2's parameter (see the equivalence below) |
| W-1: `geometry.ts:113–120` `segSeg2`'s body | `return segSegDist2(a, b, c, d)` |
| W-1: `faces.ts:71–73` private `generated(epoch)` | `generatedLifecycle(epoch)` from `../terrain/heightfield.js` (the same literal, the same key order, a fresh object per call); `Lifecycle` no longer imported |
| W-1: `offset.ts:164` the literal `3.141592653589793` in `cap` | `PI` from `../terrain/primitives.js` (the same double) |
| W-1: `outfalls.ts:163–166` private `cellOf` | `cellIndexAt(g, at.x, at.y)` (`hydro/course.ts`: `cellAt`'s clamp, then `j · cols + i`) at both pushes |
| W-1: `outfalls.ts:99, 103, 122` `g.originX + (i + 0.5) · g.cellCm`, `g.originY + (j + 0.5) · g.cellCm` | `centreX(g, i)`, `centreY(g, j)` (`terrain/grid.ts`: the identical expression) |
| W-2: `crossings.ts:32–34`, `polygons.ts:117–119` two private `lp`; `outfalls.ts:65–67` `pointCm`'s literal; `offset.ts:236` `snapRing`'s literal; `polygons.ts:67` `splitEstuary`'s cut point | one `lp(q: XY): LatticePoint` exported at file level from `geometry.ts` (`Math.round` on each coordinate, no negative-zero flush — none added); `crossings.ts`, `polygons.ts` and `offset.ts` import it; `pointCm(q) = lp(q) as PointCm`; `snapRing` and the cut point call it. `fastRings`' two cut-point lines keep their inline rounding (not in the plan's list; the same `Math.round` per coordinate) |
| W-3: `offset.ts:21` private `unitOf`; `polygons.ts:108–114` `unit(a, b)` | `unitOf` exported at file level; `unit(a, b) = unitOf({ x: b.x − a.x, y: b.y − a.y })` — the same subtraction, `Math.sqrt`, `len < 1 → null`, two `quot` in the same order |
| W-4: `stage.ts:60–61` `KERNEL_RING`; `polygons.ts:425`'s literal `; the kernel's ring: ` | one `export const KERNEL_RING = "; the kernel's ring: "` in `polygons.ts` (copied byte for byte from `stage.ts:61`), the fallback written `` `${fast}${KERNEL_RING}${proved}` ``; `stage.ts` imports it from `./polygons.js`; its two `indexOf`/`slice` reads and the pinned detail at `stage.ts:142` unchanged |
| W-5: `polygons.ts:454–459` (`provedRings`) and `:526–531` (`fastRings`) — the proofs' two loops | one private `proveRings(rings, covered): string \| null` (per ring in index order: `isSimple` → `'not simple'`, `clearRing` → `'near-touch'`, `ringsApart` over j > i → `'rings meet'`, `clearOf(…, covered)` → `'meets an earlier body'`; the first failure wins). `fastRings` returns `proveRings(rings, covered) ?? rings` after its edge, hole and sliver tests (that order kept); `provedRings` returns `` `not clear (${cause})` `` after the clean of every ring with the fixed rule (that order kept) |
| W-6: `polygons.ts:447–448` and `:512–513` the two `fixed` predicates | one private `fixedVertices(reach, covered, cuts = [])` with `FIXED_BAND_CM = 2`: `onRing(reach, q) \|\| cuts.some(\|c − q\| ≤ FIXED_BAND_CM on both axes) \|\| (covered.length > 0 && ringsDist2(covered, q) <= FIXED_BAND_CM · FIXED_BAND_CM)`; `provedRings` passes no cuts (`[].some` is false: the old two-term predicate); `ON_CM` in `offset.ts` stays its own constant, its comment naming the kinship |
| W-7: `params.ts:27` `ESTUARY_SPLIT_M = 400` | `ESTUARY_SPLIT_M = ESTUARY_LENGTH_M` imported from `../hydro/params.js` (both 400, both literal type `400`: the emitted `params.d.ts` declaration is unchanged); the comment says the two are one length |
| W-8: `offset.ts:124–130` the module variable `why` and `refusal()`; `offsetRing`/`mouthRing`/`eraseLoops` returning `null` | the three return `{ ring, holes } \| { refused: string }` (`eraseLoops` `{ line, holes } \| { refused }`); `refusal()` and `why` gone; `fastRings` reads `` `${chain.joined ? 'mouth' : 'offset'}: ${raw.refused}` `` (`polygons.ts:505`). `offsets` keeps `null` (`'a repeated point'` is its callers' text) |
| W-9 | not unified (the session's judgment, J301): one comment at `isSimple`'s box test names the idiom and its four other spellings (`meetsAny`, `onRings` padded by `ON_CM`, `clearRing` and `ringsApart` padded by `RING_CLEAR_CM`) |
| W-10: `crossings.ts:54` the closure `clearOf` | `endClear` (private; its comment says how it differs from `offset.ts`'s `clearOf`) |
| W-11: `stage.ts:217` `(ctx as { report?: unknown } \| undefined)?.report as …` | `ctx.report as { invariant?: … } \| null \| undefined` — the same three checks follow |
| W-12 | `stage.ts:125`'s regex kept; the comment above it names the message contract with `@plat/kernel` |
| W-13 | `polygons.ts` `foldWarnings` kept; its comment states the difference from the kernel's barrel `foldWarnings` (that one merges into `own` and keeps the `at` of a code's first warning; this one makes fresh code-and-count records) |
| W-14 / C-water-1 – 2 | `stage.ts` header ("a pass is a counted pass; C-0310", "the one rung spent (C-0307)"), `:35` (C-0310), `:60` gone with the constant, `:68` (C-0229 (2), C-0307, and the fallback's form), `:141` (C-0307), `:170` (C-0310), `:125` the contract; `polygons.ts:15, 421, 437` (C-0307), a header line naming the file-level exports, comments above `KERNEL_RING`, `proveRings`, `FIXED_BAND_CM`, `fixedVertices`; `fastRings`' doc ("else the refusal's cause", not "else null"); `offset.ts`'s header (the `{ refused }` result; every export file-level), `:253`'s sentence corrected to the predicate's (a boolean: the closed form of `hydro/course.ts`'s `segmentsCross`); `params.ts:26–27` the one-length sentence; `geometry.ts`'s header (the delegations), `lp`'s comment; `index.ts` the scaffold sentence replaced by "This index and its folder are M0-e-03's." and the file-level helper line |
| C-water-3 (tests) | `support.ts:85–86` "(C-0233)"; `exit-bar.test.ts:9–10` "(C-0233)"; `one-door.test.ts:5–6` "(`outfalls.ts`'s per-cell body index is a plain array for this reason)"; `references-row.test.ts:1–6` "(…; C-0310)" and "can never mean" (not "never again"); `slow-rings.test.ts:1` "C-0307 (refining C-0229 (2)): …", `:10–12` the fixture's provenance "captured by the ruling N-56's probe on the seeds named in C-0307 (4)", `:279–280` "on the kernel's ring uncleaned each is refused" (not "before this round"); every describe/it title verbatim ("(N-56 (1))", "Q31: …", "Q20 class A …" stay) |
| T-water: `test/water/support.ts` | gains `lp(x, y)` beside `pt`; `GENERATED_AT_0` (the lifecycle literal, a test-side oracle — never `generatedLifecycle` from `src`); `waterBody(id, kind, course, widths, extra?)` (fields in the old builders' order: id, kind, face, shore, course, widthProfile, lifecycle, …extra); `SMALL_ARENA` (`FRAME`, `REACH = reachOf(FRAME)`, `OPTS`); `heldRefs(terrainId, out)` (the stage-end subject in the test's own statement: margin, each body's face and shore, each bridge's two deck ends, each land face — the order of the four old copies); `hardFailures(plat, refs, live)` (`slow-rings.test.ts:75–79` whole); `everyL0EdgeShoreOrRing(plat)` (each L0 edge pair once — rows are kept per pair, `rowsOn`'s `element >> 1` — asserting a shore or the margin, returning each edge's roles) |
| T-water: `faces.test.ts:13–29` | `const { FRAME, REACH, OPTS } = SMALL_ARENA`; `body(…)` a two-line adapter over `waterBody` (`[x, y]` pairs through `pt`); `LIFE` gone |
| T-water: `slow-rings.test.ts:30–47, 75–79, 132–135, 289–291` | `SMALL_ARENA`; `body(…)` adapter (a width or a width per point); `hardFailures` from support; the proved ring's edge loop `everyL0EdgeShoreOrRing(plat)`; the registered runs' refs `heldRefs(o.terrain.id, o)` (the same refs in the same order, the same live set) |
| T-water: `crossings.test.ts:16–30` | `lp` from support; `body(id, course, widths)` → `waterBody(id, 'river', course, widths)` |
| T-water: `outfalls.test.ts:21–32, 73` | `river(halfWidth)`'s body `waterBody('water:river:0', 'river', [(−25 000, 0), (25 000, 0)], 2 · halfWidth)`; the terrain record's lifecycle `GENERATED_AT_0` |
| T-water: `exit-bar.test.ts:33–48, 87–95` | `heldRefs(fx.terrain.id, out)`, `hardFailures(…)` prefixed `seed <n> ` as before; `deckProperty`'s first half `everyL0EdgeShoreOrRing(plat)` with its no-deck check over the returned roles; its second half (one face per body part) kept |
| T-water: `stage.test.ts:156–169`, `references-row.test.ts:91–107` | `heldRefs('terrain:ground', out)`, `heldRefs(fx.terrain.id, r.value)` (the local `heldRefs(fx, out)` gone) |
| T-water, kept apart | `recording`, `plant`, `runOn`, `print`, `rowsAt`, `edges`, `hairpinRing`, `reachOfRing`, `commitRings`, `registeredS1`, `SMALL_RIVER`, `bar` and `deckProperty`'s second half, `straight`, `deckLen`, `offFlowDeg`, `terrainOf`, `narrowDir`, `accOf`, `int32Writes`, `flowNear`, `offNormalDeg`, `riverFixture`, `ground`; `stage.test.ts:142–146`'s own segment distance and `exit-bar.test.ts:64`'s `segSeg2` read stay as they were (plan Q7 (c)); the copies of `TABLES`/`townKey`/`siteContext`/`frameOf` stay (J301 Q3) |

**The equivalences (W-1, W-8).** *`segDist2` = `pointSegDist2`:* the guards differ in spelling — `len2 > 0` with
`ratio(…, 'area')` here before, `len2 >= 1` in `segParam` — and agree on every input: for `len2 ≥ 1` both take the same
`ratio` quotient; for `0 < len2 < 1` the old path reached `ratio`, whose area floor (`RATIO_FLOOR.area` = 1,
`kernel/src/num/ratio.ts:9`) refuses it, read as t = 0, and `segParam` reads t = 0 by its guard; at `len2 = 0` (and a NaN
`len2`) both read t = 0. The clamps differ in one value only: `Math.min(1, Math.max(0, v))` maps v = −0 to +0 where
`segParam`'s `if (t < 0) … if (t > 1) …` leaves −0 (NaN, ±∞ and every other value clamp alike). A −0 quotient arises only
when the dot product is −0 — the projection of q at a's own position, with both products −0 (q = a and b strictly
south-west of a, or a signed-zero coordinate pair); then `a + d · t − q` is a zero of some sign, and the square makes it
+0 either way, so `segDist2` is bit-identical on every input. *`footOn` keeps its own clamp:* there the point itself is
returned, and a + (b − a) · (−0) turns a −0 coordinate of a into +0 where (b − a) · (+0) keeps it; `Math.max(0,
segParam(…))` maps −0 to +0 and leaves every other value as `Math.min(1, Math.max(0, v))` did (`segParam`'s value is
already ≤ 1), so `footOn` is bit-identical too, the zero's sign included — the kept records (`Outfall.at` through
`pointCm`, the arcs of `nearestOnLine`) could carry a −0, so the clamp is kept rather than argued away (mutant A3 below
removes it and the NO-SHIFT probe shows the one differing case). *`segSeg2` = `segSegDist2`:* `cross(b − a, c − a)` is
`o1`, likewise `o2`–`o4`; the same strict-sign proper-crossing test, then the same four point-segment distances in the same
order. *W-8:* every path that set `why` and returned `null` now returns `{ refused: <the same string> }` —
`'a repeated point'` (`offsetRing`, `mouthRing`), `'a pocket inside a pocket'` and `'too many loops'` (`eraseLoops`, the
inner line's refusal returned unchanged by the outer as `inner === null → return null` did with `why` already set),
`'no mouth'`; every path that returned a ring returns the same ring. `offsetRing` and `mouthRing` erase both offset lines
before reading either refusal, as before, and return the right line's refusal first: with the module variable the
right line's write came last and won. Grep of `plat/` (`offsetRing(`, `mouthRing(`, `refusal(`, `eraseLoops(` over
`*.ts`, `*.mts`, `*.mjs` outside `node_modules` and `dist`): before, the only readers were `polygons.ts:502–504`
(`refusal()` once) and `offset.ts` itself (the `refusal(` hits in `tables/test`, `kernel/test` and `testkit/test` are those
packages' own helpers of that name); no test imports `offsetRing`, `mouthRing` or `refusal`. *One unreachable path:* `n < 2`
returned `null` before `why` was reset, so `refusal()` gave the previous call's reason (or ''); it is now `{ refused:
'fewer than two points' }`. No caller reaches it: `chainOf` returns null below two course points and maps every course
point, and `simplifyChain` keeps both ends, so `fastRings` always passes ≥ 2 points; the text is pinned nowhere.

**NO-SHIFT (J260 (3)).** A probe (a vitest file placed only in the lane's mirror, never in the tree) printed 748 lines
before and after: the runtime names of `water/index.ts` (37) and of `src/index.ts` (129); `ESTUARY_SPLIT_M` with its
`typeof`; the four other water constants; 40 000 `segDist2`/`footOn`/`segSeg2` cases on integer, double, degenerate,
sub-floor and ±0 inputs plus the 54 `footOn(a, a, b)` cases with a's coordinates −0, +0, 5 and b in six directions (every
number printed with −0 marked); 2 000 `reachOf` frames; `siteBridge` (ford and bridge site, two epochs); 7 600 offset and
mouth rings (random chains, spirals and meanders with pockets and pockets in pockets, mouths missing their river or
meeting two rings) — each ring or its refusal text; `waterPolygons` on the loop river, the estuary, a tributary, slow-only
and slow-only with the estuary; `provedRings` on seven hand rings (the fixed band at 0, 1, 2 and 3 cm from an earlier
ring); the exit bar's family — the 100 CITY seeds at 100 ha and the full CITY frames 4, 10, 3 — each seed's input water,
committed water, sites, land, report (dropped, fallbacks, retried, versions, stage-end rows, warnings), outfalls and the
arena print of `stage.test.ts` "deterministic …" (every live vertex's coordinates, flags and edge rows); six seeds'
polygons on the kernel's rings only; `stage.test.ts`'s fixture at seeds 5 and 2 with the outfalls recomputed. Before
(the pre-round sources in the mirror) and after (the round's): sha256 `24896745f48b96d3…` both, byte-identical. The
pre-round tests pass on the round's sources (56/56) and the round's tests on the pre-round sources (56/56). The emitted
declarations (`tsc -b`, `dist/types/src`) differ only in comments and in the file-level names of `geometry.d.ts` (`lp`
added), `offset.d.ts` (`unitOf` added, `refusal` gone, the two rings' result type) and `polygons.d.ts` (`KERNEL_RING`
added); `index.d.ts` of the folder and of the package are identical (API frozen, J263 Q1).

**Refusals (J264 (5), J290).** The registered family (the exit bar's 100 CITY seeds at 100 ha plus the CITY frames 4,
10, 3), before → after: refused bodies 1 → 1 (seed 62's tributary, dropped `refused` on both polygon paths; its
fallback `near the edge; the kernel's ring: not clear (meets an earlier body)` unchanged), `retried` 0 → 0, stage refusals 0 → 0; the
fallbacks 15 + 3 → 15 + 3 entries with identical texts. The one refusal is LAWFUL input refused — MAKE-IT-SUCCEED, the
plan's Q8, routed to the session as queue row Q45 (J301 Q8); this round changes nothing of it and the bar's `refused ≤ 3`
stays.

**Mutant-kill map** (by title; nothing moved): round 1 M01 – M06, M08 – M14, M20 – M21, M23 – M32, M34 – M35, M38 – M40,
close-r1 F01 – F08, s1 K01 – K03, K05 – K12, K14 – K17, K19 and s2 K01 – K04, K06 – K08, K12 – K14 keep the titles the
check records name (plan §3.3). This round re-introduced 48 targeted mutants in its mirror (`--bail=1`, the whole
`test/water` folder, W = 1), each against the consolidated tests:

| id | aimed at | mutation | first red title |
|---|---|---|---|
| A1 | W-1 `reachOf` | x + 1 | faces "every water face carries its shore …" (stage) |
| A2 | W-1 `segDist2` | to the point a | exit bar "100 seeds on the CITY rung …" |
| A3 | W-1 `footOn`'s kept clamp | `Math.max(0, …)` removed | **survived** — the NO-SHIFT probe differs on 1 line (the −0 cases): the reason the clamp stays |
| A4 | W-1 `footOn` | `segParam(q, b, a)` | outfalls "a narrow river: each bank's inflow …" |
| A5 | W-1 `segSeg2` | `segSegDist2(a, c, b, d)` | exit bar "100 seeds …" |
| A6 | W-1 `cellIndexAt` | axes swapped | stage "S1 (9): the terrain's outfalls written …" |
| A7 | W-1 `centreX` (the D8 cell's centre) | column i + 1 | outfalls "a narrow river …" |
| A8 | W-1 `centreY` (`bodyOf`) | row j + 1 | **survived** — note N-c1-1 |
| A9 | W-1 `generatedLifecycle` | epoch + 1 | **survived** — note N-c1-2 |
| A10 | W-1 `PI` in `cap` | a quarter turn | **survived** — note N-c1-3 |
| B1 | W-2 `lp` | `Math.floor` | stage "sites: Bridges in state site …" |
| B3 | W-2 the estuary's cut point | x + 1 | faces "the basic estuary: mouth `estuary` splits …" |
| C1 | W-3 `unit` | reversed | faces "a river across the arena …" |
| C2 | W-3 `unitOf` | no null below 1 cm | **survived** — note N-c1-3 |
| D1 | W-4 `KERNEL_RING` | "; the kernel ring: " | slow-rings "waterPolygons: the loop river is dropped `refused` …" |
| D2 | W-4 / s1 K16 | the fallback joined by "; " | slow-rings "waterPolygons: the loop river …" |
| D3 | W-4 the stage's read | `why.slice(at)` | slow-rings "S1: the river so refused is the stage's refusal …" |
| E1 – E4 | W-5 / s1 K05 – K08 / C-0307 M4 – M7 | each proof dropped from `proveRings` | slow-rings "a ring the clean cannot make clear is refused with its cause …" (each) |
| E5 | W-5 `provedRings`' wrap | `not clear <cause>` | the same title |
| E6 | W-5 `fastRings`' proofs | dropped | **survived** — note N-c1-4 |
| E7 | W-5 `fastRings`' proofs | on the outer ring only | **survived** — note N-c1-4 |
| K15 | s1 K15 | `provedRings`' proofs on the outer ring only | slow-rings "a ring the clean cannot make clear …" |
| K14b | s1 K14 | `provedRings`' holes dropped before the clean | slow-rings "a ring the clean cannot make clear …" |
| K14 | (the same idea after the proofs) | holes dropped from the returned rings | **survived** — note N-c1-4 |
| K02, K03, K17 | W-6 / s1 K02, K03, K17 | the fixed rule without the earlier rings / the edge; `cleanRing` without it | slow-rings "the fixed vertices stay: …" (each) |
| K04 | W-6 / s1 K04 | band `<= 4` → `<= 0` | **survived**, as before — note 12 (the probe differs on 9 lines: bar seeds 20 and 78, the tally's refused count) |
| F1 | W-6 the cut points | unfixed | **survived** — note N-c1-5 |
| F2 | W-6 `FIXED_BAND_CM` | 1 | **survived** — note N-c1-5 |
| G1 | W-7 | half the length | stage "sites: Bridges in state site …" |
| H1 | W-8 the precedence | the left line's refusal first | **survived** — note N-c1-6 |
| H2 | W-8 the inner refusal | rewritten `'too many loops'` | **survived** — note N-c1-6 |
| H3 | W-8 the label | `mouth`/`offset` swapped | **survived** — note N-c1-6 |
| H4 | W-8 a text | `'no mouths'` | **survived** — note N-c1-6 |
| I1 | W-11 | the `null` check dropped | one-door "no source of src/water/ writes an Int32Array's cells …" (its type-check: `sink` possibly null) |
| J1 | W-10 `endClear` | ring gap ≥ 0 | crossings "a deck end keeps DECK_CLEARANCE_CM …" |
| S2K01, S2K02, S2K08, S2K12 | s2 K01, K02, K08, K12 | as `checks/M0-e-03-s2.md` | references-row "the honest twin …", "a planted breach (dangling) …" (×3) |
| K10, K12 | s1 K10, K12 | as `checks/M0-e-03-s1.md` | slow-rings "waterPolygons: the loop river …", "S1: the river so refused …" |
| K13 | s1 K13 | the fast ring's cause lost | **survived**, as before — note 13 (the probe identical: no probed river is refused at commit) |
| F06 | close-r1 F06 | the flow rotated 15° | exit bar "100 seeds …" |

32 red; 16 survive. Each survivor but A3 (the new clamp's own nuance) and K04/K13 (notes 12, 13) was replayed on the
pre-round sources with the pre-round tests (the same mutation at the same pre-round line: `bodyOf`'s
`g.originY + (j + 0.5) · g.cellCm + g.cellCm`; `generated(epoch + 1)`; `3.141592653589793 · 0.5`; both `unitOf` and
`unit` without the null; the fast loop removed or cut to the outer ring; the cut box `false`; the band 1 cm at both
predicates; the two `eraseLoops` calls swapped; the inner refusal rewritten; the label swapped; `'no mouths'`; the holes
dropped after the proofs): each survives there too, 56/56 — inherited pin gaps, not this round's.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-1 | **No outfalls test tells a polygon cell from a course cell one row off.** Mutant A8 (`bodyOf`'s centre a row north) survives the folder (56/56) and the pre-round tests on the pre-round sources; the probe sees it (104 lines: every bar seed's outfalls). `outfalls.test.ts` "a wide river …" checks the bank points' columns and counts, not the cells, and the course's own cells mask the shift on the narrow river. | Assert the `cell` of each bank outfall in "a wide river …" (the land cell of row 5 or row 2, by its column), so a row shift of the water cells goes red. A8 must go red. | hardening (M4) |
| N-c1-2 | **No test reads a site Bridge's lifecycle.** Mutant A9 (`generatedLifecycle(epoch + 1)` in `siteBridge`) survives (56/56), and on the pre-round sources; the probe sees it (106 lines). `stage.test.ts` "sites: …" matches `id, state, way, over` only. | Add `lifecycle: GENERATED_AT_0` to that `toMatchObject` (the fixture's epoch is 0). A9 must go red. | hardening (M4) |
| N-c1-3 | **The fast ring's round caps and a sub-centimetre direction are unpinned.** Mutants A10 (a cap's half-turn as a quarter turn) and C2 (`unitOf` returning a unit for a sub-centimetre vector instead of null) survive (56/56), and on the pre-round sources; the probe sees each (A10: 4 lines, bar seed 30 and the random rings; C2: 1 line, the random rings). | A `faces.test.ts` case on a river ending inside the arena: its round cap's vertices at the half-width from the end point over a half-turn; and an `offsetRing` case with a repeated point refused `a repeated point`. A10 and C2 must go red. | hardening (M4) |
| N-c1-4 | **The fast ring's proofs and the kernel ring's holes have no fault-injection test.** E6 (`fastRings`' proofs dropped), E7 (on the outer ring only) and K14 (the kernel ring's holes dropped after its proofs) survive (56/56), on the pre-round sources too, and leave the probe identical: no fast ring of the registered family fails a proof the edge and hole tests let through, and no proved kernel ring keeps a hole there. The guards stand (C-0229 (2), C-0307): note 2's class. | A `fastRings` case on a hand-built chain whose fast ring folds within 60 cm of itself (`near-touch`) and one whose hole meets the outer ring (`rings meet`); a `provedRings` case with a hole kept. E6, E7, K14 must go red. | hardening (M4) |
| N-c1-5 | **The fixed rule's cut points and its band width are unpinned on the fast path.** F1 (the estuary cut's bank points unfixed) survives and leaves the probe identical (the clean keeps those points anyway on every probed estuary); F2 (`FIXED_BAND_CM` 1) survives and the probe sees it on the hand ring 2 cm off an earlier ring only. Both on the pre-round sources too. | A `provedRings` case with a vertex 2 cm off an earlier ring kept (F2), and an estuary whose cut point the clean would drop if unfixed (F1). | hardening (M4) |
| N-c1-6 | **The fast ring's refusal texts are pinned by no test.** H2 (the inner refusal rewritten), H3 (the `mouth`/`offset` label swapped), H4 (`'no mouths'`) survive the folder and the pre-round tests on the pre-round sources; the probe sees each (H2: 3 lines, H3: 2 — the full CITY frames 4 and 10, whose `fallbacks` carry `offset: a pocket inside a pocket` three times; H4: 1). H1 (the left line's refusal named first) leaves the probe identical: no probed chain refuses both lines with different texts. The texts are report text, not persisted, and the bar's `fallbacks` reach them (`checks/M0-e-03-s1.md`'s K13 class). | `slow-rings.test.ts` or `faces.test.ts`: the exit bar's `fallbacks` texts per seed as a tally (the full CITY frames 4 and 10's `offset: a pocket inside a pocket` among them), or an `offsetRing` case on a nested meander refused `a pocket inside a pocket`. | hardening (M4) |

### The closing check's notes (lane `check/M0-e-03-consolidate-close-1`, 2026-10-13; verdict `checks/M0-e-03-c1.md`)

None of these is a blocker. Each surviving mutant below also survives the pre-round tests on the pre-round sources
(56/56; the same mutation at the same pre-round line or lines, in the checker's own before-image mirror), so this round
lost no kill. The checker's own sweep confirms the builder's N-c1-1 – N-c1-6 classes (A3, A7 = the builder's A9, B2,
C2, F3 = the builder's F1, H2 – H4 survive here too, before and after). K04 and K13 survive as before (notes 12, 13).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-7 | **A deck end's clearance is unpinned per end.** Mutant I1 (`crossings.ts` `if (!endClear(a) \|\| !endClear(b))` → `if (!endClear(a))`, the right bank's end never tested) survives the folder (56/56) and, as `if (!clearOf(a))`, the pre-round tests on the pre-round sources; the checker's NO-SHIFT probe sees it (the S1 runs of the exit bar's family differ). `crossings.test.ts` "a deck end keeps DECK_CLEARANCE_CM …" puts the other body and the ring on the north bank only, which is end 0 (the left bank looking downstream) of its east-flowing river. | The same case mirrored: the other body (or the ring) on the south bank, end 1, the north bank clear, and no deck end within DECK_CLEARANCE_CM of it. I1 must go red. | hardening (M4) |
| N-c1-8 | **The order of the ring proofs is unpinned.** Mutant E6 (`proveRings` tests `clearRing` before `isSimple`) and E7 (`fastRings` runs the proofs before its `near the edge` / hole tests) survive (56/56), and on the pre-round sources (both pre-round loops swapped; the proofs inlined before the edge test); the probe sees both (E6: `provedRings` causes on random rings; E7: the exit bar family's fallbacks). The plan's W-5 states the order as a nuance; `slow-rings.test.ts`' four-cause case uses rings that fail one proof each. | A ring that is both not simple and near-touch, refused `not clear (not simple)`; a fast ring that is near the edge and also fails a proof, refused `near the edge`. E6, E7 must go red. | hardening (M4) |
| N-c1-9 | **The fixed band's width is unpinned between √2 and 2 cm.** Mutant F5 (`ringsDist2(…) <= FIXED_BAND_CM * FIXED_BAND_CM` → `<= FIXED_BAND_CM`) survives (56/56), and on the pre-round sources (`<= 4` → `<= 2` at both predicates), and leaves the probe identical: no probed vertex lies between √2 and 2 cm off an earlier ring. With the builder's N-c1-5 (F2, F1) and note 12 (K04). | N-c1-5's `provedRings` case with a vertex 2 cm (not 1) off an earlier ring kept. | hardening (M4) |
| N-c1-10 | **The right offset line's refusal precedence (W-8) is equivalent on every reachable input.** Mutant H1 (`offsetRing` returns the left line's refusal first) survives and leaves the probe identical (12 000 offset and mouth rings). The two lines can only refuse with different texts if one of them exhausts `eraseLoops`' 10 000-erasure guard (`too many loops`; the only other line refusal is `a pocket inside a pocket`, and `a repeated point` is decided before either line), so the order can only show on a line with ≥ 10 000 loops. The code keeps the old last-write order (right after left) regardless. Equivalence reasoned (PLAUSIBLE). | No test needed; if the guard is ever lowered, pin the precedence with a hand chain. | none |
| N-c1-11 | **Three comment sentences claim a little more than the code.** (a) `offset.ts` `ON_CM`: "it pads a box test here, a squared distance there". In fact `onRings` also compares `segDist2` with `ON_CM · ON_CM`, and `fixedVertices` also box-tests the cut points with `FIXED_BAND_CM`, so the two constants do both. The plan's W-6 wording. (b) `geometry.ts` `footOn`: "a −0 parameter (q at a)", and the builder's note "only when … q = a and b strictly south-west of a, or a signed-zero coordinate pair". A −0 parameter also arises on integer inputs with q ≠ a, for example q.x = a.x, b due west of a and q south of a: (+0)·dx + (q.y − a.y)·(+0) = −0. "The zero's sign among them" also fails for a −0 coordinate of a shared by b (−0 + (+0)·t = +0), a signed-zero input that no lattice point carries. The kept clamp maps every −0 parameter to +0, so `footOn` stays bit-identical: probe B.footOn, 60 000 cases, 437 with a −0 coordinate, identical before and after. (c) `water/index.ts`'s file-level helper line omits `geometry.ts` `quot` and `polygons.ts` `SIMPLIFY_CM`, which polygons.ts's own header names. None of the three misstates a behaviour the code has. | Reword at the next comment pass: (a) "kept as its own constant (W-6); a later round may tie them"; (b) "(q at a, or q square to a along an axis b does not move on)"; (c) add the two names. | next comment pass (M4 at the latest) |

## Hardening round S3 (lane `build/M0-e-03-fix-s3`, 2026-10-27; J237 (2), J264 / N-58, J290, J263 Q1 / Q6, N-45; the hardening inventory's FIX-NOW rows of M0-e-03; queue rows L26, L27 (c), (d), Q45; choices C-0432) — the builder's row-by-row outcome

Inside the item's owns only (`site/src/water/`, `site/test/water/`). Sources changed: `stage.ts`, `polygons.ts` (behaviour);
`offset.ts`, `geometry.ts`, `index.ts` (comments only; `index.ts`'s export list byte-identical — API frozen, J263 Q1;
the one new file-level export `PART_DROPPED` in `polygons.ts` sits beside `KERNEL_RING`, outside every index). Tests:
a new `rings.test.ts` (12 tests) and new or tightened cases in every other test file but `one-door.test.ts`; the folder
runs 81 tests (56 before), every earlier `describe`/`it` title kept verbatim. Mirror: `waves/selfcheck-build-M0-e-03-fix-s3`
(isolation proven: no link to the tree, `@plat/kernel` resolving inside the mirror); probes in `waves/e03s3-probes/`.

### Row-by-row outcome

| row | outcome | what changed | the pin (test) | mutant (red on it) |
|---|---|---|---|---|
| :6 note 1 (bank outfalls off the committed shore) | **FIXED** | `stage.ts` `onCommittedShores`: after `outfalls`, each bank outfall's `at` becomes the nearest point of its body's committed shore edges (`resolve(('shore', body))`), rounded to the centimetre, `cell` re-found; frame outfalls kept. §2.3: `at` "on the receiving body's shore chain" | `exit-bar.test.ts` "100 seeds …" and "three full CITY frames …": every bank outfall within √½ cm (the rounding) of a committed shore edge of its body, measured by the test's own `pointSegGap` | N1 (snap removed): 19 bank outfalls off-shore on the bar seeds, red |
| :14 note 2 (detect-and-refuse guards) | **PINNED** | none (the guards stand) | `references-row.test.ts` "notes 2 and 6: an input Bridge whose deck_end vertices resolve to nothing …" (E_INVARIANT, `references-resolve: ` first, `{"role":"deck_end","entity":"bridge:0","ordinal":0} finds no geometry`); `faces.test.ts` "detect and refuse (note 2): a body whose seed lies in a face its own rings do not bound …" (`S1 water: an L0 face of water:river:0 has no edge of its shore`, version unchanged) | M15 (stage-end refusal off), M19 (decks out of the refs), M36 (the shore-edge refusal off): each red |
| :21 note 3 (L0 rebuild at stage end) | **PINNED** | none | `stage.test.ts` "§3.3 (note 3): … the ground arena's L0 dynamic grid holds nothing after S1" | M16 (the rebuild skipped): red |
| :26 note 4 (a seedless part dropped silently) | **FIXED** (make-it-succeed, then report) | `polygons.ts` `partsWithSeeds`: a part with no course point SEED_DEPTH_CM inside is seeded from `interiorSeed` (from each outer segment's midpoint along its inward normal at 101, 202, 404, 808 cm: the first point inside and 100 cm from every ring); a part with no such point (narrower than 2 m throughout) is dropped and reported in `fallbacks` as `a part with no point 100 cm inside, dropped: <area> m²` (`PART_DROPPED`). The stage's `fast` flag counts reaches (below, note 14), so such an entry never reads as a fast-ring refusal. The estuary pair's fall-back resets `fallbacks` with `reaches` | `faces.test.ts` "note 4: a part holding no course point deep inside it is seeded from an interior point; a part with no point 1 m inside is dropped and reported, never silent" (a tributary across two rivers: three parts, the middle seeded ≥ 1 m deep; rivers 1.5 m apart: two parts and the 9 m² entry) | N4a (no interior seed), N4b (no report): each red |
| :32 note 5 (span ≤ 3 widths) | **PINNED** | none | `crossings.test.ts` "note 5: a deck longer than three widths is no crossing — a 300 m stretch where the polygon widens to 80 m on a 20 m width profile has no site". The note's "bend" reading: no bend of square corners gives a perpendicular ray longer than 3 widths over a whole window (the rays meet the inner corner), so the fixture is a basin — a polygon wider than its width profile, the filter's own subject | M22 (the filter off): red |
| :35 note 6 (bridge ids after the input's) | **PINNED** | none | the notes 2 and 6 test above: the committed arena holds no `deck_end` of `bridge:0` and both of `bridge:1`'s | M33 (ids from 0): red (the stage then commits, two bridges named `bridge:0`) |
| :60 note 10 (a site's deck lagging the committed deck) | **FIXED** | `stage.ts` `committedDecks`: after the commit, each site whose two `deck_end` vertices resolve (one each) where its deck's ends do not lie takes them as its deck and their distance, rounded, as its span — and its Bridge that span | `stage.test.ts` "note 10: a deck end the insertion moves is the site's deck …" (the façade moves each deck end 5 cm before inserting it: the sites read the moved ends); `exit-bar.test.ts`: every site's deck equals its resolved ends on all 103 runs, the span within 2 cm (the two ends' rounding and the span's own; an unmoved site keeps the ray span `siteCrossings` measured) | N10 (re-read off): survived the first sweep (no lag left on the family after Q45's shift), red on the added stage pin |
| :68 note 11 (F03/F04 only on CITY frames) | **PINNED** | none | `crossings.test.ts` "note 11: the flow is averaged over one width, not over half a width nor the adjacent vertices — at a kink 10 m long and 10 m high …" (the kink's site at (7 m, 7 m): adjacent chord 45°, half-width 32°, one-width 16°) | F03, F04: red (the sweep's `--bail` stopped first at the CITY frames; the kink case is red on both too, run alone) |
| :310 N-c1-1 (A8) | **PINNED** | none | `outfalls.test.ts` "N-c1-1: the water cells are the polygon's by each cell's own centre …": row-dependent accumulation, so the south bank's picks name the feeding row (odd columns from row 2). The fix shape's "assert `cell`" cannot see A8: `Outfall.cell` is the cell holding `at` (§2.3), which A8 does not move; the test asserts it too, and the columns kill A8 | A8: red |
| :311 N-c1-2 (A9) | **PINNED** | none | `stage.test.ts` "sites: …" matches `lifecycle: GENERATED_AT_0` | A9: red |
| :312 N-c1-3 (A10, C2) | **PINNED** | none | `rings.test.ts` "a round cap is a half-turn …", "a step under a centimetre, or a repeated point, is refused `a repeated point` …" | A10, C2: red |
| :313 N-c1-4 (E6, E7, K14) | **PINNED** | none | `rings.test.ts` "a fold within RING_CLEAR_CM of itself …" (`near-touch`), "a keyhole loop keeps its pocket as a hole …" (an earlier body across the hole's side: `meets an earlier body`), "a hole the clean keeps stays a ring of the result …" | E6, E7, K14: red |
| :314 N-c1-5 (F1, F2; with N-c1-9 F5, note 12 K04) | **PINNED** | none | `rings.test.ts` "the fixed band is 2 cm: a vertex 2 cm off … kept; one 3 cm off is dropped", "the estuary cut's two bank points stay through the clean …" (a 63° estuary: the cut's corner a needle under 30°) | F1, F2, F5, K04: red |
| :315 N-c1-6 (H2 – H4) | **PINNED** | none | `rings.test.ts` "a meander whose pocket holds a pocket: `offset: a pocket inside a pocket` …", "a joined tributary whose offset lines cross no earlier ring: `mouth: no mouth`"; `exit-bar.test.ts` "three full CITY frames …" pins each frame's `fallbacks` texts (4: the river's, 10: the river's and the tributary's `offset: a pocket inside a pocket`, 3: none). H1 stays equivalent (N-c1-10) | H2, H3, H4: red |
| :326 N-c1-7 (I1) | **PINNED** | none | `crossings.test.ts` "N-c1-7: each end keeps the clearance — the other body on the south bank …" | I1: red |
| :327 N-c1-8 (checker's E6, E7) | **PINNED** | none | `rings.test.ts` "a ring both not simple and near-touch is refused `not clear (not simple)` …", "the same U with a bank 30 cm off the arena's edge is refused `near the edge` …" | E6c (clearRing first), E7c (proofs before the edge test): red |
| :330 N-c1-11 (three comment sentences) | **FIXED** (comment-only; the text is the deliverable) | (a) `offset.ts` `ON_CM`: "kept as its own constant (W-6); a later round may tie them. Each pads a box test and bounds a squared distance (here `onRings`; there the cut points' box and `fixedVertices`' distance to the rings)"; (b) `geometry.ts` `footOn`: "reads a −0 parameter (q at a, or q square to a along an axis b does not move on) as +0, so the point … is the one the clamp `Math.min(1, Math.max(0, t))` gave before R3, bit for bit" (the C1 probes' 60 000 cases); (c) `water/index.ts`'s file-level line adds `geometry.ts` `quot`, `polygons.ts` `PART_DROPPED`, `SIMPLIFY_CM` | — | — |
| L26 (queue; the stage's reader of a-05's structured refusal) | **REPORTED** | none: the gate's condition fails — `kernel/src/num/result.ts`'s refusal arm is still `{ ok: false; code; detail; partial? }` after a-05's S9 – S11 (S9 reported L26 as a `KernelResult` change, the session's ruling; S10 and S11 did not add it). The regex `/\(shore, ([^)]+)\)/` at `stage.ts` stays. The field's proposed shape (a-05 notes, S9 PROPOSED (4)): `rows?: readonly { role: string; entity: string }[]` on the refusal arm, set by `tx/tx.ts`'s role-consistency refusal and `invariants/batch.ts`'s, read by `stage.ts` in place of the regex; the message texts unchanged (J263 Q6) | — | — |
| L27 (c) (exit-bar's oracle independence) | **FIXED** | `support.ts` `segGap` / `pointSegGap` (floating point, the test's own); `exit-bar.test.ts` measures the 40 m spacing with `segGap`, no longer with `src`'s `segSeg2` | — | — |
| L27 (d) notes 12, 13, 14, 16 | **PINNED** | note 14's subject changed (below) | 12: the 2 cm band case (K04 red) and the bar's refused bound tightened to 0 (Q45); 13: `slow-rings.test.ts` the loop river's fallback and the stage's refusal name its fast ring's own cause `hole outside`; 14: `slow-rings.test.ts` "note 14: a body refused on both polygons does not stop the slow-only retry …" (a looped tributary refused on both, the river's first insertion refused by a planted façade refusal: retried, the river committed); 16: `references-row.test.ts` "note 16: a planted breach (margin | land | river) …", each refused row-first naming its reference | K04, K13, K18, K09, K10, K11: red |
| Q45 (census; bar seed 62's tributary) | **FIXED — MAKE-IT-SUCCEED** | `polygons.ts` `prolonged`: a chain ending on the arena's edge is prolonged by its width plus a metre, doubled (at most six times) until both offset points of the prolonged end lie outside the arena. The diagnosis differs from note 7's: seed 62's tributary is refused at its INLET, not its mouth — its course enters the south edge 17° off it, the 400 cm prolongation leaves the flat end's left corner 27 cm inside the arena, and the fast ring is refused `near the edge`; its kernel ring then fails `meets an earlier body`. Neither offered alternative (the mouth cut, the course extended to the river) is the fault; the design's text decides for the prolongation: §4.1's S1 row ("a sea or river reaching the arena's edge shares that ring") and the file's own rule (C-0229 (2): "the clip, not a cap, shapes that end") | `exit-bar.test.ts`: refused `toBe(0)` (was `≤ 3`); `rings.test.ts` "a 20 m river entering 5.7° off the west edge: its fast ring stands, and every vertex off the edge keeps the half-width from it" | Q45 (the doublings off): red on the bar (refused 1) and on the hand case |

### The declared shift (J237 (3); C-0432)

Measured by the mirror's family probe (`zz-family.test.ts`: per run the bodies, dropped, retried, fallbacks, sites,
bridges, land, versions, stage-end rows, warnings, outfalls and a hash of the arena's print), before (the pre-round sources)
and after (the round's), the exit bar's 100 seeds at 100 ha and the full CITY frames 4, 10, 3:

* **Q45's prolongation** moves the arena on 42 of 103 runs (seeds 3, 6, 11 – 13, 18, 19, 21, 29 – 31, 33, 36, 37, 44, 46,
  48, 56, 58, 59, 62, 64, 67, 68, 70, 72, 74 – 76, 78 – 81, 83, 84, 86, 87, 90, 92, 96, 98 at 100 ha and frame 3): S1 (3)'s
  inlets commonly enter at a grazing angle (seed 11's river 9° off the south edge: the old end's corner 3.3 m inside the
  arena, a cut across the water with land between it and the edge). Ten bodies' fast rings now stand that were refused
  `near the edge` (seeds 21, 62, 64, 67, 70, 78, 79, 83, 86, 92); the fallbacks fall from 18 to 8; sites 961 → 964.
* **Note 1** moves bank outfalls by at most 1.4 cm on the 61 runs whose arena is unchanged (122 of 4 426; no `cell`
  changes there), and by up to the old 22 cm where the arena moved.
* **Note 10** changes no site on the unchanged runs (no deck lag there); where the arena moved the sites are the
  committed decks.
* The seven SMALL_RIVER class-A seeds of `slow-rings.test.ts` (Q20, N-56 (1)) now stand on the fast ring, unplanted;
  the test keeps its title and its subject (the kernel's proved ring committing through the registered composition) by
  refusing each fast ring's first insertion on the façade (a planted kernel refusal), so the stage's slow-only retry
  takes the proved ring: `fallbacks` `slow only`, `retried` true (both expectations re-pinned there).
* No golden or digest of this item records S1's arena; the RELATED run reports any other item's test that does.

### The refusal census (J264 (4), N-58) and verdicts (J290)

The registered family (the exit bar's 100 seeds at 100 ha plus the CITY frames 4, 10, 3), before → after: refused
bodies **1 → 0** (seed 62's tributary), stage refusals 0 → 0, `retried` 0 → 0. The one refusal was OUR OWN
INTERMEDIATE (the tributary's polygon, built by this stage from S1 (3)'s lawful course) — verdict MAKE-IT-SUCCEED, done
(the census lowers, Q45). No refusal remains in the family.

### The round's mutant table (J169, J183)

37 targeted mutants in the mirror, each `vitest run --maxWorkers=1 --bail=1 packages/site/test/water/` (the whole
folder, B-FUZZ-free), the mutated file restored from the tree and `cmp`-equal after each: **36 red**, one equivalent
survivor. First red titles abbreviated; full in `waves/e03s3-probes/mutants.log`.

| id | aimed at | first red |
|---|---|---|
| N1 | note 1, the snap | exit bar "100 seeds …" (19 off-shore) |
| M15 / M19 / M36 | note 2's guards | references-row "a planted breach (dangling) …" ×2; faces "detect and refuse (note 2) …" |
| M16 | note 3 | stage "§3.3 (note 3) …" |
| N4a / N4b | note 4 | faces "note 4: …" ×2 |
| M22 | note 5 | crossings "note 5: …" |
| M33 | note 6 | references-row "notes 2 and 6: …" |
| N10 | note 10 | stage "note 10: …" (survived the first sweep before that pin was added) |
| F03 / F04 | note 11 | exit bar "three full CITY frames …" (the kink case red on both, run alone) |
| A8 / A9 / A10 / C2 | N-c1-1 – 3 | outfalls "N-c1-1 …"; stage "sites: …"; rings "a round cap …"; rings "a step under a centimetre …" |
| E6 / E7 / K14 | N-c1-4 | rings "a fold …", "a keyhole loop …", "a hole the clean keeps …" |
| F1 / F2 / F5 / K04 | N-c1-5, N-c1-9, note 12 | rings "the estuary cut's …", "the fixed band is 2 cm …" ×3 |
| H2 / H3 / H4 | N-c1-6 | rings "a meander …" ×2, "a joined tributary …" |
| I1 | N-c1-7 | crossings "N-c1-7: …" |
| E6c / E7c | N-c1-8 | rings "a ring both not simple and near-touch …", "the same U …" |
| K13 / K18 | notes 13, 14 | slow-rings "S1: the river so refused …", "note 14: …" |
| K09 / K10 / K11 | note 16 | references-row "note 16: a planted breach (margin / land / river) …" |
| Q45 | Q45 | exit bar "100 seeds …" (refused 1); rings "a 20 m river entering 5.7° …" (run alone) |
| PD | the `fast` flag's `PART_DROPPED` filter | **survives — equivalent**: a `PART_DROPPED` entry arises only from the kernel's rings (a fast ring is one part), so its body always carries a fast-ring refusal entry too and is slow either way |

### Notes (not failing lines)

| id | note | handling |
|---|---|---|
| S3-1 | The fast flag now counts reaches (`reaches.some(r => no fast-ring refusal of r.body)`): beside note 14's case it also no longer counts an `estuary not split` entry (an estuary that is no reach), which under the old count could read "no fast ring" with the river's fast ring standing and skip the slow-only retry. No probed seed has a refused batch in that shape. | stated in C-0432 |
| S3-2 | `stage.test.ts`'s seed-2 span check stays `≤ 1` cm; the exit bar's is 2 cm: an unmoved site keeps `siteCrossings`' ray span, which two lattice roundings can put up to ≈ 1.4 cm off the ends' distance (seeds 4 and 10 of the full frames: 1.3 cm, 1.0 cm). | — |
| S3-3 | Q45's prolongation makes a course that runs nearly along the edge reach up to 64 times its first length outside (clipped away); a course parallel to the edge inside the arena is still capped by the clip's own geometry, a rare-case shape no probed seed shows. | hardening (M4) if ever seen |

### Gates and RELATED (J193; W = 1)

`install --frozen-lockfile` 0; `lint` 0 (eslint 1 185 files, 0 errors, 0 warnings; `lint: probe-red ok`; 9 whole-tree
checks); `build` 0; NEAR `vitest run packages/site/test/water/` 9 files, 81 / 81, exit 0; RELATED@1000 over `stage.ts`,
`polygons.ts`, `offset.ts`, `geometry.ts`, `index.ts` (6 161 s): 233 files, 2 888 passed, **3 failed**, exit 1:

* `testkit/test/edge/repins.test.ts:77` "EP-01/S5a/coincident at seed 1658509524 …" (`absorbed`) — **foreign**: red on
  the pre-round water sources too (replayed in the mirror), M0-a-05 S9's declared shift, as `checks/M0-a-05-s10.md`
  recorded it; not this round's.
* `testkit/test/edge/repins.test.ts:77` "EP-01/S1/self-touching at seed 2651453823 …" (`laddered`, not `refused-safe`)
  and `testkit/test/edge/ep01-s1-s3-s4.test.ts:20` "EP-01/S1/self-touching" — **this round's declared shift** (Q45), in
  M0-x-06's pins: the planted bow-tie fires on the first shore insertion; before, on these seeds the fast ring was refused
  `near the edge`, so the plant hit the kernel's ring and no rung was left; now the fast ring stands, the plant hits it,
  and the stage's slow-only retry commits (laddered). A mirror probe of the fixture's 1 000-seed family
  (`edgeSeeds('EP-01/S1/self-touching', 1000)`): laddered 996, refused-safe 4 (was 33 of 1 000): 3167842014, 2971082141,
  382546462 (in the pin's list) and 2893352673 (new — its retry's kernel ring refused under the plant). Green on the
  pre-round sources (replayed).

### PROPOSED for M0-x-06's round (not edited; another item's files)

1. `packages/testkit/src/edge/ep01.ts` S1 `'self-touching'`: `share: '4 of 1 000'`, `seeds: [3167842014, 2971082141,
   382546462, 2893352673]` (in the family's order), the cause's tail "the other 996 seeds are laddered on S1's retry".
2. `packages/testkit/test/edge/repins.test.ts`'s `REFUSED` row `['EP-01/S1/self-touching', 2651453823, …]`: the seed
   becomes the family's first refused seed of the new list (by `edgeSeeds` order), its words unchanged ("the river's ring
   was refused on the kernel's polygons"); seed 2651453823 can join the laddered pins.

### The closing check's notes (lane `check/M0-e-03-close-s3`, 2026-10-27; verdict `checks/M0-e-03-s3.md`)

None of these is a blocker (N-45; the brief's blocker rule). The probes and mutants ran in this seat's own mirrors
`waves/check-M0-e-03/m1` (the tree's code), `m2` (the pre-round water sources, = the consolidate-1 record 20/20, read
from main's index blobs by Python, no git) and `m3` (mutants), never in `plat/`.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s3c-1 | **The snap's `cell` re-finding is unpinned (mutant R1c survives).** R1c keeps the stale `cell` when `onCommittedShores` moves a bank outfall's `at` (`return { ...o, at }`). It passes `stage.test.ts` and `exit-bar.test.ts`, and it is equivalent on every input met: 0 of 10 439 bank outfalls over 260 runs (the exit bar's 100 seeds, the CITY frames 4/10/3, 157 SMALL_RIVER seeds) change cell under it, because after Q45 the snap moves a point by about a centimetre and never across a 25 m hydro cell edge there. The tree's code holds the rule (0 mismatches of `cell` against the cell holding `at` on the same runs). It is not provably equivalent, since a snap of up to `attractCm` across a grid line is reachable in principle. **CONFIRMED** (probe `zz-chk-s3.test.ts`, field `cellMismatch`). | A hand-built case: a planted façade that moves a shore vertex so that a bank point's foot crosses a hydro cell edge, then assert `cell === cellIndexAt(hydro, at)`. Or assert that rule over the bar seeds beside the distance check (this cannot kill R1c today). | hardening (M4) |
| N-s3c-2 | **Q45's prolongation can create a `near the edge` fast-ring refusal where none was before.** The net effect is fewer: the exit bar's family goes from 15 to 5, SMALL_RIVER (157 seeds, unplanted) from 8 to 1. But SMALL_RIVER seeds 1890815356 and 2893352673 gain one each: their fast rings stood before the round and are now refused, and their kernel rings commit. Diagnosis on 2893352673: the river runs within metres of the north edge and leaves it at 1.6°. The doubling prolongs the chain about 35 m along the edge outside. Douglas–Peucker over the longer chain then keeps a clipped vertex 20 cm inside the edge, 150 m upstream. 1890815356's vertex is 46 cm inside. Unplanted, both commit (lawful census `[]`). Under EP-01/S1/self-touching's plant, 2893352673 moves from laddered to refused-safe (N-s3c-3). This fails safe, and it is the builder's S3-3 shape seen on seeds. **CONFIRMED** (probes `zz-chk-s3`, `zz-diag`). | Prolong only as far as the clip needs (or simplify the course before prolonging), so that the DP chord does not reach back along the edge. Re-measure the near-the-edge count on SMALL_RIVER and the EP-01 family. | hardening (M4) |
| N-s3c-3 | **For the session (routing): RELATED's two item-attributed reds are the declared shift in M0-x-06's pins.** The first is `testkit/test/edge/repins.test.ts` "EP-01/S1/self-touching at seed 2651453823 …": the seed is now laddered. The second is `ep01-s1-s3-s4.test.ts` "EP-01/S1/self-touching": seed 2893352673 is refused but the pin does not name it (N-s3c-2). Both are green on the pre-round water sources (mirror `m2`) and red on the round's (`m1`). This seat replayed the pin's 33 seeds plus the family's first 40: before, all 33 pinned seeds were refused-safe and 2 of the first 40 were refused; after, 3 of the 33 are refused-safe (3167842014, 2971082141, 382546462), the other 30 are laddered, and 1 of the first 40 is refused (2893352673). Every run had `problems` `[]` and a lawful census of `[]`. The builder's 1 000-seed count, 33 → 4, matches. C-0432's declared shift names the root (the class-A seeds' fast rings stand) but not these pins or the new refused seed. The notes' "PROPOSED for M0-x-06's round" does, and its re-pin text is right on this seat's replay. The files are another item's, which rule (1) forbids this round to touch. | The session routes the PROPOSED re-pin (ep01.ts's S1 `self-touching` share and seeds; repins.test.ts's REFUSED seed) to M0-x-06's next round after this item commits. When C-0432 is next touched, state the testkit pins' shift in its declared-shift sentence. | session / M0-x-06 |
| N-s3c-4 | **For the session: the round's author disclosed a read-only `git log` in its ledger row L-0669** ("one read-only `git log` slipped into a shell line early (its output discarded, nothing used)"). The working rules say no git command of any kind. Nothing read lies under a clean-room path, and the row discloses it, so this is no clean-room breach. | The session's ruling, if any. | session |
