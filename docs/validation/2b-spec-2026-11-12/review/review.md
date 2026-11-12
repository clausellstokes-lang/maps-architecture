# Round 2B (amendment z, item 986: what is served as a face's kerb) — adversarial review of the draft, the provisional rulings and spec-2b.json

Review seat, 2026-11-12. Read-only on the repository. Sources: `draft.md`, `rulings-provisional.md`, `spec-2b.json`; the
design head b8425a3c; the S20 branch `origin/wip/child-a09s20` (now at 1b93e9d2, a WIP autosave; `kerb.ts` and
`kerbExact.ts` are unchanged from the 9e5022ff the draft read — only the test-side `observer.ts`, `relation.ts`,
`definition.ts` moved, for J785). I did not run a build or any test suite. The probes are mine, run with `tsx`, one at a
time, under `nice`:

- `probe-tokens.mjs` / `probe-tokens.log`: the lint's own `scanText` (tools/lint/kernel-boundary.mjs) on S20's `kerb.ts` and
  `kerbExact.ts`, and on two simulated wirings (W2's fold; W5).
- `probe-island.mts` / `probe-island.log`: the branch's `exactRegion` on a two-band face, with and without one collinear
  vertex that carries no geometry.
- `probe-tip.mts` / `probe-tip.log`: a scratch kernel mirror (`kmirror/`: the design head's `packages/kernel/src` with the
  branch's `kerb.ts` and `kerbExact.ts`; `readKerb` given a probe-only provider hook) in which `corridorUnion` (S9's commit)
  runs at L2 once under the construction and once with **P's served read as spec line 1 specifies it** (readFace → the key
  content → X → the spine map with the reaching keys → `splitsOn` over X). Six faces: acute wedges at 6.5°, 9.7°, 16°, 30°;
  a face with a vertex-only contact; a face with a dangling lane that leaves a 30 cm kerb strip.

Every claim is labelled **CONFIRMED** (I executed it or read the code path myself) or **PLAUSIBLE** (reasoned, not run).

---

## Findings

| id | sev | finding | evidence | what I would change |
|---|---|---|---|---|
| R-1 | BLOCKER | **Line 3 and line 4 cannot both pass on a correct build.** Line 3 makes `constructionRead` behave exactly as the base's `readKerb`, "its census included" (it writes `CENSUS`). Line 4's observer runs `constructionRead` inside the served read's `done`, after the served read set `CENSUS`, so `kerbCensus(p)` after a served read becomes the construction's; line 4 pin (i) asserts `kerbCensus(p)` equal off and on. Also `done`'s new argument list has no overlay, and `constructionRead(o, …)` needs one. | CONFIRMED by code: `kerb.ts` (branch) `const CENSUS = new WeakMap` :1909, set in `readKerb` :2210, no setter exported; spec line 3 required_change "(its census, refusedAt, faithful and warnings included)", pin (i) "kerbCensus(p) after it"; line 4 required_change "(p, face, f, vertexContacts, the key content, X, sp, last)" and pin (i) "kerbCensus(p) … EQUAL". | Give `constructionRead` an internal flag (`census: false`) used by the observer, or have the observer read `kerbCensus` before and compare it, and pass the overlay (or the open transaction) to `done`. State which in the line. |
| R-2 | BLOCKER | **Line 2 pin (ii) fails on a correct build.** `derived.test.ts` calls the SERVED `readKerb` and `kerbCensus(..).faithful` and prints its DERIVED lines from them (served first / faithful / moved, the relation of the served region against X_U / X_F). Under P those figures move, so "figure for figure equal base → tree" is red unless derived.test.ts is re-pointed to `constructionRead`, which no line says. | CONFIRMED: `derived.test.ts` (branch) :89 imports `readKerb, kerbCensus`; :402, :409, :1128, :1135, :1997, :2000; the DERIVED line :925. | Either re-point derived.test.ts's construction reads to `constructionRead` in line 2 (then the pin holds) or take the pin on the fold alone (W2 applied, line 1 not yet), and say so. |
| R-3 | MAJOR | **`offRead` is vacuous under P, so ruling 3 / ruling (i) pre-rules a fix that can never trigger and can change nothing.** `offRead` re-reads a face after the L2 op and names an end only if its run vertex `a.far` is off the re-read kerb or the re-read refuses. Under P the re-read is X again (X reads level ≤ 1 content; S9's L2 split vertices are level 2), and `a.far` was chosen by `runVertex` because it lies on that same outline within 1 cm. The draft's F0-6 ("an attracted placement can now stand off X … may turn lawful closings into pinned-first retries") misreads it: the attracted point is the tip, not `far`. A rise in pinned-first under P would come from `closeEnds`' own retry paths, which fix (b) does not touch. The spec contradicts itself: line 6 (iii) says B-CLOSE's "read after the L2 op equals the read before" holds by construction — that is exactly the condition under which `offRead` cannot fire. | CONFIRMED by code: `bandUnion.ts` `runVertex` :344-361 (`onBoundary(outline, e)`), `offRead` :595-608, `closeEnds` :405-462 (retry at :425, :446); `kerb.ts` `readFace` :364 (`L[O[walk[i]]] <= 1`), :413 (`T.level > 1` skipped); `insert/splitThrough.ts` :4-6, :320 (a split of a coarser edge is a Steiner vertex at the batch level). | Retire `offRead` in 2B (option (c)) with a pin in its place: in an L2 batch, every face's re-read equals its first read (key and X), so B-CLOSE is a property, not a check. Re-point line 6's REPORTED counts to `closeEnds`' outcomes (chord / along / pinned / folded / retry, with their cause), which is where a P-specific rise would show. |
| R-4 | MAJOR | **Line 6 pin (ii) asks for a fixture that cannot exist as written** ("the commit attracts the run vertex of an along closing off X by more than 1 cm"): the run vertex is an existing boundary vertex that `runVertex` selected for lying on X. Its mutant ("offRead reading constructionRead") may be killable, but the pin is not about anything P changes. | CONFIRMED by code (as R-3). | Replace with a fixture whose open piece's END the door places off its contact by 1–26 cm (probe E's frame contact moved 12 cm is one), pinning the closing kind and the committed distance ≤ the bound. |
| R-5 | MAJOR | **Ruling 2's premise "the commit is within N-43's bound of the definition ALWAYS" is unproven, and so is F0-5's "the share falls".** N-43 bounds the move of a laid point; `s8s9` measures the Hausdorff distance between regions, which a fold of a part thinner than attractCm (a spur dropped by `dropSpurs`) is not bounded by. My probes found no fold: acute wedges at 6.5°–30° were committed EXACTLY under P (and under the construction); a face with a vertex-only contact and a face with a dangling lane were committed within 12 cm of X, where the construction's commit equals its read (0.00 cm). So both directions are open: the hard bar may well hold, and the exact share falls wherever X has a vertex within attractCm of other content (probe E: X's (2879, 3988) folded onto the frame at (2879, 4000)). Neither number exists for CITY. | CONFIRMED (probe-tip.log, cases A–F); `bandUnion.ts` `dropSpurs` comment :725-738; `measure.ts` `s8s9` :548-652 (Hausdorff of boundaries, `compareBoundaries`). PLAUSIBLE: that CITY's 583 "Q110 (c) / Q117 tip" BEYOND reads [S20: T2] include folds that S9 would now make on X. | Before binding: the session's prototype (rulings' step (b)) runs `s8s9` at fusion 3 / integrated 4 and the 1–2 test-size seeds with X served and reports `beyond`, the exact share, `within1cm` and every block beyond 1 cm with its cause (a moved contact, a merged vertex, a fold). Rule ruling 5 on those figures, not before. |
| R-6 | MAJOR | **Withdrawing the exact-0 floor (ruling 5) is a contract change, not a reading, and the two documents disagree on its form.** The owner-held ruling J618 (b) is "the S8 ≡ S9 contract stands as KI-13 already states it (exact where unattracted, within the bound where attracted, the ratchet 0.91, the target 0.95)"; ARCHITECTURE.md says the blocks are "one face" (§3.7, :5362), "Hausdorff 0" (§4.6, :7303) and §13.2's stage contract test "S8's working block equals S9's committed block (Hausdorff 0; §3.7)" (:19088). The draft names only §4.6. `spec-2b.json` ruling (l) keeps the floor REPORTED and re-set after the landing inside one M0-a-09 round; `rulings-provisional.md` 5 withdraws it as a LEG on M0-c-06. Meanwhile `hausdorff.test.ts:200` asserts the measured share ≥ 0.95 on a real derivation and is not in the declared red set. | CONFIRMED: AMENDMENTS-2026-10-28z.md :118 (item 991 (b)), :37 (986 (d)), :39 (986 (e) (3)); ARCHITECTURE.md :5358-5362, :7301-7303, :19088; `bench/test/fusion/hausdorff.test.ts` :191, :200-201; `measure.ts` :74-81. | Write it as its own amendment item that supersedes J618 (b)'s ratchet and edits all three sentences (text in section C); tell the owner it is a change. Keep a per-face law that survives P — "exact where S9's own insertions for that face report no move" — as REPORTED until measured, then FAILING. Reconcile (l) with ruling 5 and declare hausdorff.test.ts's handling. |
| R-7 | MAJOR | **The oracle and X share their inputs; the classes of a wrong X that neither line 11 (a) nor (b) sees are nameable.** The arena form's truth takes every half-width and end from the served read's own record (`widthsFromRead(r.f)`: `f.spines ∪ f.through`), so (1) a wrong half-width or ends from `readSpine`, and (2) a chain whose width `readFace` dropped (null), are shared by X, the construction and the oracle. (3) A vertex-only band that X omits and that covers no grid sample (step median 76 cm, p90 166 cm at CITY [S20, F0-9]) is invisible to `judgeCapped` — the sample test excludes it from `all`, and X has no vertex in it — and to J785's arbitration when the construction omits it too (the arbitration only reads where the two differ). (4) Errors thinner than 8 cm or within the 4 cm margin. (5) J318's spine set itself (incident chains only): a non-incident wide band overlapping F is subtracted by none of them. | CONFIRMED by code: `observer.ts` (branch) `widthsFromRead` :151-163, used at :431; `definition.ts` `spinesOf` :267-296, `judge` :341-381, `truthAtOf` :824-838 (its comment records a 194 cm-step miss at fusion 1); `relation.ts` `arbitrateLocal` :387-399 (UNDECIDED / 'off the difference' where both agree). | Line 11 (a): take the oracle's half-widths and ends from the run's own width table (the bench's `widthMap(d)`), never from the read; and judge a sample of CITY keys at the uncapped 20 cm grid (e.g. every face under 2 000 m², or a fixed 300 keys a seed) so that (3) has a population. |
| R-8 | MAJOR | **X serves geometry the construction never served: kerb islands and edges thinner or shorter than the arena's resolution — definition-true, unbuildable, uncounted.** The probe shows `exactRegion` keeping a 40 m × ≤ 1 cm island between two bands; probe E shows X rings with edges of 8–13 cm (minEdge is 25 cm) that S9's commit merges. S8's needle floor (`needleTips`) scans every ring of the child's kerb, islands included, for a tip within its near distance, so a rounding island beside a new lane can refuse a lawful cut as 'needle'. No line counts any of it. | CONFIRMED: probe-island.log (island 0,1000 4000,1000 4000,1001, 2 000 cm²); probe-tip.log case E ((3148, 1416)–(3148, 1407), (3121, 1341)–(3115, 1335)); `num/lattice.ts` minEdgeCm 25; `layout/src/infill/ladder.ts` `needleTips` :660-698 (every ring with area); `bentCutFabric.ts` :934-941. PLAUSIBLE: how often islands occur at CITY. | Line 11 REPORTED: per seed, X's components thinner than attractCm (count, area, length), X edges below minEdge, and the 'needle' refusals whose tip lies on such a component. If they are not rare, rule (now, not in a fix round) whether S8 reads X with sub-attractCm components dropped. |
| R-9 | MAJOR | **The GEO-9 departure is larger than "a second engine ships".** GEO-9's rationale is that every booleans/buffer/band output "is produced by the same insertion rules as every other chain, so it obeys the same attraction, placement, minEdge and clearance". X obeys none of them (R-8). The architecture text that 2B writes must say what the served kerb guarantees and what it does not. | CONFIRMED: ARCHITECTURE.md :5321-5336; R-8's probes. | The P paragraph states: kerb(F) is an exact lattice polygon set, not an arrangement output; it may hold edges shorter than minEdge and parts thinner than attractCm; S9's commit brings it to the arena's invariants. |
| R-10 | MAJOR | **Line 11 (g)'s "insertChain, opSave and mark fall by the reads' share and by nothing else" cannot be judged.** Under P every S8 decision may move, so the cuts' own insertions, ladder attempts and take-outs differ base → tree; "the remainder equal to the cuts' own" has no base to equal. | CONFIRMED by reading the spec against ruling (c) (the declared shift). | Keep the 0-call half FAILING (dryRun, dryInsert, dryRegion, censusRead, constructionRead 0 in S8's window); make the rest REPORTED, or judge it only in line 10's provider run, where nothing shifts. |
| R-11 | MAJOR | **Other items' kerb-derived literals are re-recorded by session seams with no two-sided check.** Line 9's oracle check applies to M0-a-09's folder only. The fabric's areas and seed fixtures (`splitSeeds.test.ts`, `city-split-seeds.json`, `seedless-part.json`), `signature.ts`'s figures and `drift-fixtures.json` are kerb-derived and would be re-recorded to whatever the tree prints (BARS-14, applied to other owners). If the measured list is long, the landing commit makes the session the unchecked author of many items' pins. | CONFIRMED: spec session clause rule (1); draft (4) table. | Every re-recorded kerb-derived literal outside the folder carries line 9's two-sided check in the declared-shift record; if the measured list exceeds a stated size (e.g. 10 files or 3 owners), the per-owner re-pin legs of ruling 12 are taken, not seams. |
| R-12 | MINOR | Line 3's bundle pin lists `readOn` among the names that must be absent; `bandUnion.ts` has its own production `readOn` (:584). A correct build fails it (or a renamed `readOn2` matches). | CONFIRMED: `bandUnion.ts` :584. | Name kerb.ts's functions by a probe that resolves them to their file (S20's bundle.ts method), or list `censusRead`, `dryInsert`, `dryRegion`, `restagedRead`, `constructionRead` only. |
| R-13 | MINOR | Line 10's mutant ("readFace's cache disabled in readKerb") cannot be killed by the control: the provider short-circuits before the served path, and a disabled widths cache changes no result. The control proves "nothing but the read changed", never that X's code is unchanged — that is line 2's diff. | CONFIRMED by the spec's own provider text ("ONE statement before the served read"). | Use a mutant in shared code (`splitsOn`, `junctionsOf`, `readFace`, `bandUnion.ts`), e.g. a junction's reach changed by 1 cm. |
| R-14 | MINOR | Line 5's plant needs "a known crossing-left case"; by the module's own law (and S19's F1 fix) none exists, so a repeat budget of 0 reaches no `check`. Other `check`s stay throws on the served path: `exactTraceKept`'s two "does not close" checks and `exactCrossingRounded`'s lattice range check. | CONFIRMED: `kerbExact.ts` :442, :469, :473, :164, :564-571. | Plant through a test-only parameter that withholds one rounded crossing from the hot pixels; list every `check` reachable from the served X and type or justify each. |
| R-15 | MINOR | Build order: line 1's served read needs the X code inside kerb.ts, which line 2 moves. | CONFIRMED (spec line 1 "the S18 / S19 code, moved by line 2"). | Put the fold first. |
| R-16 | MINOR | Line 7 pin (ii) "their 11 + 7 reads clean": row 181's 11 + 7 are two properties (the oracle on X; the construction relation) over 15 frame-side AND 3 retracing networks; after `endsOf` takes the code's rule the oracle and kerb.ts share it, so only the literal is independent. | CONFIRMED: notes row 181 (branch :2272-2281). | Say which property, drop the 3 retracing networks, and require the literal ring be hand-computed in the test. |
| R-17 | MINOR | Line 9's two-sided check judges grid points at 20 cm; a difference thinner than 8 cm has no judged sample and would re-pin as "X right". Closing.test.ts's "after ≡ before" becomes a tautology under P (R-3). | CONFIRMED: `definition.ts` module comment :31-34. | A re-pin whose difference has no judged sample is UNJUDGED and listed; note the B-CLOSE law's vacuity. |
| R-18 | MINOR | A split whose kerb point the commit's insertion moved is silently not drawn (`onOutline` gate). Under P the kerb points are X's vertices, not the door's, so this may happen more; nothing counts it. | CONFIRMED code path: `bandUnion.ts` :703-705. PLAUSIBLE: frequency. | Count undrawn splits per run (line 11 REPORTED). |
| R-19 | MINOR | F0-10 is largely answerable from the code. The census reach on X_E can only make X subtract MORE than X_U where the definition supports it (`reaches` is a conservative superset test; a band reaching X_E meets F; one that does not changes no region), and the probe shows how a 176 cm Hausdorff arises with no error above 1 cm: a sub-cm island present in one region and not the other (one no-geometry vertex: island 40 m → 21 m, Hausdorff 300.4 cm, the large components identical). The "10 737 of 11 209" count is any difference, mostly sub-cm rounding from unreduced parts. | CONFIRMED: `kerb.ts` `reaches` :456-481, `censusRead` :1742; `kerbExact.ts` :687-688; probe-island.log. | Replace "dissect the 10 largest" by a classification of every X ≠ X_U read beyond 2 cm: spine set differs (`r.reaching` vs `content.reaching`), island in one only, rounding; then dissect only the residue. |
| R-20 | MINOR | `reaches` tests `< r²` with r the declared half-width while the parts' snapped vertices stand up to 0.71 cm beyond it; `coveredBy` (the ring rule's test) assumes convex parts, and snapped arc polygons can be slightly reflex. Both are sub-centimetre. | CONFIRMED: `kerb.ts` :466-475, :1686-1722; `buffer.ts` `part` :78-91. | None for 2B; note in the module comment. |
| R-21 | MINOR | The wiring: W2's fold alone leaves kerb.ts at ident 20 / string 8 (the draft's estimate is right). The new `readKerb` + `constructionRead` + provider must hold the `KerbRead`/`kerb` tokens to the four the old `readKerb` had (one shared assembler, the construction typed through it). W5 moves 7 idents into kerbExact.ts (2 → 9) and needs a new `./kerbExact.js` specifier in `bandUnion.ts` and in `arr/index.ts` (or a re-export cycle in kerb.ts): three raises and an API-freeze file. | CONFIRMED: probe-tokens.log; `arr/index.ts` :9; `bandUnion.ts` :80. | Keep W2; reject W5; keep W1 as the fallback if the fold's diff is refused (one raise, a benign cycle). |

## A. Is X the value of §3.7's definition on every lawful face?

**Yes, to the lattice, under J318's spine set — with two qualifications that matter more than the draft's worries.**

(1) *The census reach on X_E and the ring rule.* `exactKeyContentOfRead` computes X_E = `exactRegion(f.rings, edge parts)`,
keeps every `through` spine with `reaches(s, X_E)`, and subtracts the edge and reaching parts from the ring-ruled rings
(CONFIRMED, `kerbExact.ts` :676-706). `reaches` is a superset test: a segment within its larger end half-width (×1.5 at a
square end) of a ring edge, or meeting one (`kerb.ts` :456-481). So a band that truly enters X_E is always kept (up to the
0.71 cm by which a snapped part vertex may stand beyond the half-width: R-20), and a band kept by the superset that does not
enter X_E changes no region. The definition's set is "every incident spine whose buffer meets F", and a band that meets F
only inside the edge bands changes nothing; so the X_E reading equals the definition's (CONFIRMED by reading). The ring
rule drops a run of route vertices only where the polygon (u, v…, w) lies in one part (`coveredBy`, exact for convex parts),
so region(F) and the ruled region differ only inside a subtracted part (CONFIRMED by reading). I could not construct a face
where either gives a region the definition does not, beyond the sub-centimetre cases of R-20. The faces where X departs
from what a reader expects are not errors of the definition but of its resolution: islands and parts thinner than
attractCm, edges shorter than minEdge (R-8), which the definition contains and the arena cannot hold.

(2) *X against X_U (F0-10).* Three mechanisms differ: the spine set (X's reach on X_E; X_U's on the construction's attracted
base), reduced against unreduced parts, and the ring rule. Only the spine set can move a boundary by a band's depth, and
only in one direction that matters: a band X keeps and X_U lacks, which the definition supports (the base moved away from
it). The reverse (X_U keeps a band that does not reach X_E) changes no region. The other two mechanisms change hot pixels,
which moves boundaries by ≤ 1.4 cm — but the probe shows they can create or remove a sub-cm island and so move a
boundary-Hausdorff figure by metres (300.4 cm in the probe) with nothing wrong above 1 cm (CONFIRMED, probe-island.log). So
the 176.5 cm figure is consistent with X being right; your guess (a vertex-only spine in one set) is one of the two
mechanisms, and the definition sides with X there. What is missing is a classification, not a dissection of ten (R-19).

(3) *What neither the oracle nor J785's arbitration sees* is R-7's list; the decisive one is that the oracle's widths are
the read's own.

(4) *straightRun, ties, repeats.* `straightRun` and the ring rule move a boundary by at most a hot pixel per dropped vertex
(bounded; CONFIRMED by reading). The half-away tie against the insertion's tie matters only between X and the
construction (1 cm); S9 lays X's lattice vertices as given, so no rounding tie enters the commit (CONFIRMED,
`bandUnion.ts` lays `piece.points`). The snap-rounding repeats: on Hobby's law the first pass leaves no crossing; if it
did and four repeats did not converge, today a `check` throws out of S8 — line 5 types the two planarity checks but not
the trace's or the range check (R-14). A typed refusal is still a refusal of a lawful input (J264), and line 11 (c) rightly
fails on any.

## B. Is P complete for its callers?

**S9 (bandUnion.ts), by the code.** `readOn` → `readKerb` (served X). `writeOutlines`: `read.spines.size === 0` skips a
face, so the spine map must carry the reaching keys (line 1 does; DESIGN-10 answered). `outlinePieces` classes X's edges as
on F's boundary within 1 cm — X's contacts are rounded crossings within 0.71 cm of F's ring, so they class correctly
(CONFIRMED by reading). The places that assume the read is where the door would put it:

- *the contacts* (`closeEnds`): a piece's end at X's contact is placed by the door; a tip within `CHORD_MAX` is closed by a
  chord to the pinned contact, else along the run, else pinned first. This machinery already served the construction's
  contacts (which were also re-placed at commit, the dry run being undone), so P changes the inputs, not the mechanism.
  Probe E shows one consequence: a contact 12 cm from the frame corner merged onto it — within the bound, a non-zero
  distance where the construction's commit equalled its read.
- *the run vertex within 1 cm* (`runVertex`, `offRead`): vacuous under P (R-3). An attracted lay moves the TIP; `far` is
  fixed. Nothing becomes a refusal or a retry through `offRead`.
- *the split's kerb point* (`onOutline`): where the commit moved X's vertex, the split is silently not drawn (R-18): a
  wrong band structure (a missing wedge face), not a wrong block.
- *the read-back by share > 0.5 inside X*: robust to moves within the bound (S14's design); a fold of a thin part simply
  reads band.

Ruling 3 (measure, then fix (b) in the same round): (b) reads `far` against the served X; `far` is on X by selection, so
(b) is a no-op and cannot hide a wrong closing — it cannot see one either. What `offRead` protected (the dry run's
sensitivity to the op's own L2 tip) no longer exists under P. Retiring it, with the re-read-equality pin, is the honest
form (R-3). A wrong along-closing (the chord tip → `far` cutting a corner of X by up to 2·√2·attractCm) is bounded by
`ALONG_SQ` alone, under both designs.

**S8 (bentCutFabric.ts).** `kerbFace` reads the largest component (an island never wins); `kerbSeed` takes the pole; the
needle floor reads every ring (R-8). A 12–73 cm plan-to-commit difference can leave a committed block below a class floor
that S8 judged on X (PLAUSIBLE). At M0 there is no product reader of S9's commit — S9 is not a registered stage; only the
bench harness runs `corridorUnion` (`measure.ts` comment at :544-546) — so no wrong committed block reaches a product at
M0. §3.6's net exists in the kernel's transaction (class floors as `expect` entries, E_BELOW_MIN_*, and the repairer, `tx/tx.ts`
:19, :620), but whether S9 declares floors is M1's; 2B should record that the net is M1's obligation, not assume it.
A seed outside its committed face would need a component narrower than about twice the bound; I found none in the probes.

## C. The plan ≠ commit consequence

Three sentences: **Withdrawing the exact-0 floor is a contract change — it removes the last measured trace of "one face" /
"Hausdorff 0" (§3.7 :5362, §4.6 :7303, §13.2 :19088) and supersedes the owner-held J618 (b) ("exact where unattracted, within
the bound where attracted, the ratchet 0.91, the target 0.95"), so it needs its own amendment item and the owner told it is a
change; the delegation lets the session take it, it does not make it a reading. It is also premature: neither the collapse
F0-5 predicts nor the hard bar has been measured under P, and my probes show both outcomes — acute wedges committed exactly,
a contact near the frame moved 12 cm — so the prototype should measure the share and `beyond` first and keep "exact where
S9's own insertions report no move" as the per-face law. A third design worth weighing is planning on X as the door lays it
(only X's outline laid in an undone dry run — a few insertions, not 37 parts), which restores plan ≡ commit; it costs
perhaps two to three times X and makes kerb depend on L2 content again, so it is the fallback if the measured share is low,
not the default.**

Weighed against the owner's NO WRONG RESULTS: P plans on the definition and commits something within the bound of it; the
lay-planned design plans on what is built. Neither is "wrong" by the contract 986 (d) states; the lay-planned design's
advantage is that S8's floors, needle rule and seed are judged on built geometry, and R-8's islands never reach S8. A
"commit that cannot move X" is not available: the door must enforce minEdge and attraction (§3.10), and X violates both (R-8);
a commit that refuses an attracted lay would refuse lawful input (J264).

What the amendment must say, so that no later reader takes "Hausdorff 0" literally: (1) in §3.7, replace "so the block S8
cut and the block S9 keeps are one face (tested, §13.2)" by "S8 plans on kerb(F) computed exactly; S9 commits it through the
door, so the committed block is the planned block as the door lays it: each vertex within 2·√2·attractCm of the plan, parts
thinner than attractCm and edges shorter than minEdge brought to the arena's resolution (tested, §13.2)"; (2) in §4.6 and
§13.2, replace "Hausdorff 0" by "within 2·√2·attractCm (Hausdorff), exact where the commit's insertions report no move";
(3) state that kerb(F) is not an arrangement output and does not obey minEdge or attraction (R-9); (4) state that J618 (b)'s
ratchet is replaced by the measured figure and the per-face law.

## D. Buildability, line by line

| line | order | a wrong build every pin passes | mutants | bar measurable | note |
|---|---|---|---|---|---|
| 1 | after 2 (R-15) | a served read that recomputes X correctly but returns `census.base` as X instead of X_E (pin (iv) checks only reaching) | killable | yes | the spine-map order is irrelevant (`junctionsOf` reads by key; CONFIRMED) |
| 2 | first | none found for the fold; pin (ii) fails a correct build (R-2) | killable | yes | arithmetic CONFIRMED (R-21) |
| 3 | after 2 | a `constructionRead` that skips `CENSUS.set`: pin (i) catches it, but then line 4 cannot pass (R-1) | the bundle pin's `readOn` (R-12) | yes | |
| 4 | after 3 | an observer that judges X with the oracle but never runs the construction (pins (i)–(iii) do not require the construction to have run) | killable | yes | R-1 |
| 5 | any | a build that types the two planarity checks but leaves the trace checks as throws (R-14) | needs a plant that exists (R-14) | yes | |
| 6 | after 1 | pin (ii) unbuildable as written (R-4); `bandUnion.ts` unchanged passes everything | | yes | R-3 |
| 7 | any | `endsOf` and `junctionEnd` both wrong the same way (now one rule): only the literal guards it | killable | yes | R-16 |
| 8 | — | a measurement row; per-caller attribution needs a stated method (a stack read in the observer) | — | yes | |
| 9 | after 1–3 | a re-pin of a sub-8 cm difference (R-17) | killable | yes | |
| 10 | last | a second cause inside the X-only code (line 2's diff guards it, not the control) | R-13 | yes: source-mode runs, state the mode of both sides | |
| 11 | last | (a) passes a wrong half-width shared by X and the oracle (R-7); (g) unjudgeable (R-10) | controls killable | yes: about an hour per CITY seed ON (the construction beside every read, S20 T7: 2 488 s / 3 206 s), plus the controls and the B-FUZZ bands run (≈ 1 100 s each side) | |
| 12 | — | REPORTED | — | yes, one run at a time | |

Cross-item scope: the allowlist shrink (two rows) and the M0-work.json owns line are minimal and correct under W2
(CONFIRMED, `M0-work.json` M0-a-09 owns). M0-a-06's three tx files: savepoint.test.ts's `clean('dry-run', 2)` does go red
(its frames are classed by `dryInsert` on the stack, `tx/support.ts` :386), cost.test.ts's read half would go vacuous rather
than red, oracle.test.ts loses a generator silently; re-pointing to `constructionRead` is mechanical but re-breaks when the
construction is removed next round — the queue row should say M0-a-06 needs its own dry-run generator. M0-c-06's floor: a
law, not a literal (R-6). "Session seams in the landing commit" is workable for a short list; for a long one it makes the
session the unchecked author of other owners' pins (R-11).

## E. Anything else

- The draft's F0-6 and weak point 3 (offRead may fire on lawful attractions) are wrong on the code (R-3); its weak point 1
  (the census reach on vertex-only contacts) is answered by the code in X's favour (R-19).
- Line 11 (f): S9 now lays X's outlines, a new workload for the door (edges under minEdge, near-coincident vertices; R-8). The
  B-FUZZ bands census may rise in `corridorUnion`'s insertChain class for a reason that is P's, not a defect. Measure it in the
  prototype with `beyond` (R-5).
- The S20 branch has moved (1b93e9d2, J785's rebuild in progress); the spec's cites "re-read on the RESUME head" covers it.

## What I could not check

- Any CITY or B-FUZZ figure under P: the prototype was not run at scale. R-5's "no fold" rests on six hand-built faces in a
  scratch mirror; CITY faces with attractors near thin parts may fold.
- J785's rebuilt T2 and the classification of the 176.5 cm column at CITY (R-19 explains how it can arise, not which
  mechanism it is).
- Whether esbuild keeps or renames `bandUnion.ts`'s `readOn` in the bundle (R-12).
- The cost figures (no profile run).
- The snap-rounding law's proof for the half-open, sign-dependent pixels beyond reading the code and S19's F1.
- Whether M0-a-05 S14 changes the door's behaviour that R-3, R-4 and the probes rely on.
