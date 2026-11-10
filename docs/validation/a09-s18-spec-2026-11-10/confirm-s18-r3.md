# Confirm-only pass: M0-a-09 S18 revision 3 (the library round), 2026-11-10

I read the following:
- the whole entry `spec-a09-s18-r3.json` (the session clause and all 12 lines, printed in full);
- the memo `spec-a09-s18-r3.md`;
- J744.

I re-checked these on the code:
- **kerb.ts:** its imports (:138, :141), and the absence of any namespace import or `export *` of kerb.ts anywhere in packages/ or bench/;
- **insert/:** index.ts :31, insertChain.ts :131-134 and :1185, classes.ts InsertTx (:107-108, `plat`), and the warning sites in snapRound.ts :600-650;
- **faces/split.ts** :17 and :139;
- **tooling and records:** tools/vitest/fuzz-seed.global.mjs, tools/scaffold/m0-work.test.mjs (a vitest file), lane-events.log :13003 (session/m0-work-6 landed), and M0-work.json (lists kerbExact.ts).

I ran no suite and no command beyond reads.

## 1. The findings

| id | verdict | the sentence that meets it, or what is missing |
|---|---|---|
| S18R-1 | **PARTLY** | **Met.** L7 says: "a first-served read against X_U := exactRegion(f.rings, kerbParts(f.rings, read.spines, false)) … never against X". NEAR_CM = 2 · HOT_PIXEL_CM + √2⁄2 = 2.13 cm is derived, and there is a 5 cm planted control. The bar can fail.<br>**Missing (two holes, each failing a correct build):**<br>(a) The derivation does not cover a FAITHFUL-served read. Its parts are laid through `stepped` points, each snapped up to 0.71 cm off the part's edge (kerb.ts:1024). laidExactly is relative to those points. So a "no-move" faithful read can stand about 2.84 cm off X_F.<br>(b) The new rule "a no-move BEYOND fails whoever the oracle finds right" fails the round on a CONSTRUCTION defect. This round may not fix it (rule (3), R-C). See N1 and N2. |
| S18R-2 | **MET** | L6 says: "ITS TRUTH IS THE TEST'S OWN INSERTION RECORD … ChainInsert.placed". It adds "DRAWS ARE FILTERED, NEVER MASSAGED: a network is discarded — and COUNTED — where a chord's route … leaves the line … by more than HOT_PIXEL_CM; lane landings are drawn more than attractCm … from every vertex of F's boundary". The kept-share floor is in L9.<br>insertChain never moves existing vertices, so a later lane cannot invalidate a chord's recorded truth beyond the 0.71 cm of a T, which the margin covers. |
| S18R-3 | **PARTLY** | **Met.** L1 says: "(7) X := exactRegion(the key's rings, the key's parts) — X IS A FUNCTION OF THE KEY'S CONTENT". L4 puts the ring rule on "the polygon (u, v₁, …, v_k, w) held by ONE of the key's parts".<br>**Missing:** KM8's kill. See §2 (a). |
| S18R-4 | **MET** | L8 (1) says: "X's literal ONLY (the construction ties the other way, 1 cm off …)". |
| S18R-5 | **PARTLY** | **Met:** L2 asserts the lemma within a bound, byte-equal only beyond 2 cm.<br>**Missing:** "within two-sided Hausdorff 1 cm" is the wrong bound. A non-reaching part can clip X_E by up to √2⁄2 (its snapped vertex), and a new intersection's rounding adds √2⁄2 more. That is about 1.42 cm, so a correct build can fail. Use NEAR_CM. |
| S18R-6 | **MET** | L2 says: "a ring of X equal to one of readFace's own route rings is exempt from simpleRing and judged by ringCrosses(r, bridgesOf(p, f.edges))". L8 (8) is the fixture, and L1 names simpleLoops' rule. |
| S18R-7 | **MET** | L9 says: "THE READ SET PER CUT … the two children, the faces at the lane's two landing vertices … and one face the cut did not touch". The floors scale with numRuns, and the time is quoted at 1 000 and 10 000.<br>My estimate: about 70 reads per network, about 1 400 s at the PR size, inside the +1 800 s bar. |
| S18R-8 | **CARRIED, correctly** | Nothing of it binds S18: there is no shadow, and kerbExact.ts holds no clock. derived.test.ts times X on the test side. |
| S18R-9 | **MET** | L3 says: "a double estimate (through ratio()) corrected by BigInt multiply-compares until (2k − 1)·\|D\| ≤ 2·\|N\| < (2k + 1)·\|D\| … then snap's range check". It adds pins at ±x.5 and XR4. |
| S18R-10 | **CARRIED, correctly** | — |
| S18R-11 | **MET** | L4: "THE PROPERTY IS ONE-WAY". L5: "THE ZERO-WIDTH CHAIN … (kills KM5)". L9 draws one chord in four widthless. |
| S18R-12 | **MET** | L1: "where the key's part list is EMPTY, ownRings(the key's rings) verbatim". |
| S18R-13 | **MET (kernel half); CARRIED (arena half), correctly** | L6 gives the full sum (3.41 / 2.84, taken as 4), the 8 cm floor and the hw ≤ 4 blind spot, which fixture L8 (10) covers. L6 also gives the kernel oracle its own spine-selection rule (the placed routes). There is no CITY judge in S18, so the arena half has nothing to bind here. |
| S18R-14 | **MET** | L8: "PART VERTICES ARE QUOTED from bufferParts … CLIP INTERSECTIONS ARE COMPUTED BY HAND"; the half-coordinate fixture is built from axis-aligned or 45° strips. |
| S18R-15 | **MET** | L10: "I(child₁) := exactRegion(X(parent)'s rings, [child₂'s route rings as one part set] ∪ the lane's parts)". L3 makes it legal: "the parts' windings summed, so a ring set with holes may stand as one part". |
| S18R-16 | **MET (as used in L11 (2)); CARRIED (the shadow's text check), correctly** | — |
| S18R-17 | **CARRIED, correctly** | S18 has no flag. |
| S18R-18 | **MOOT, confirmed** | lane-events.log:13003 shows session/m0-work-6 landed, and M0-work.json lists kerbExact.ts. My `node --test` form was wrong: m0-work.test.mjs imports vitest (:27). |
| S18R-19 | **CARRIED, correctly** | — |

## 2. The two findings applied in a changed form

**(a) S18R-3 and KM8.**

*Holds:*
- (k1) holds by construction once X = exactRegion(the key's content).
- KM5 dying at the named zero-width (k2) pin is sound. Under KM5 the key AND X both drop v, so (k1) cannot see it. Only a pin asserting that X *changes* can. L5 says exactly that.

*Not sound: letting the seat state KM8 "equivalent with a proof".* Whether KM8 (X from f.rings) changes the output depends on the rounding design, and L3 leaves that ambiguous:

> "the hot pixels being X's own vertices, so a ring vertex the key dropped makes none"

Read as **standard snap rounding** (every input vertex and every rounded intersection is a hot pixel), KM8 makes the dropped vertex v an input vertex, hence a hot pixel. A part edge passing within v's half-pixel is then rerouted, so KM8 is killable. In that case L5's narrow band can kill it, but only if its geometry puts the strip edge inside v's pixel. As written (hw 1 cm, crossing off-line), v can sit 0.29–1 cm from the edge, and on an axis-aligned spine the T is exactly on the line, so there is no kill.

Read as **"output vertices only"**, v (inside the part) is never an output vertex, and KM8 is output-equivalent except where v lies ON the holding part's boundary with another edge within half a pixel.

So the equivalence escape can hide a real defect: X depends on f.rings in the cases the corpus never draws, and nothing ever compares X with its key directly.

**The pin that kills KM8 for certain, and guards the invariant either way:**
1. **The DIFFERENTIAL pin.** On every read of L9 and every L8 literal, `exactKerb(...).region` equals byte for byte `exactRegion(` the key content's rings`,` its parts`)`. These are the structured rings and parts the key text is printed from.
2. **A NAMED fixture** whose geometry the test asserts before use: a dropped ring vertex v, held by a part, with another part's edge passing within L∞ 0.5 cm of v.
3. **The hot-pixel rule fixed** (edit 3 below).

KM8 may be listed as equivalent only if the differential pin is green and the named fixture shows equal output under the stated rule.

**(b) S18R-13's arena half carried: right.** S18 has no arena-form judge. The kernel oracle has its own spine selection (L6: "the chains whose placed route carries a route edge of F within HOT_PIXEL_CM").

## 3. The split's conditions

**(i) The kerb.ts edit: sound.**
- All four names are module-private today: reaches :449, ownRings :661, unspiked :736, coveredBy :1684.
- No module imports kerb.ts as a namespace, and nothing does `export *` from it. arr/index.ts :9 names `kerb` and types only.
- No existing kernel export carries any of the four names. replay.ts:280's `coveredBy` is a test-local function, and relevel's is a variable.
- No unused-export lint exists (eslint.config.js and the rules folder hold none).
- With no namespace import, esbuild's scope-hoisted output does not change, so L11 (2)'s bundle identity can prove it.

**(ii) Can L11 fail on a wrong build?**

| wrong build | caught? |
|---|---|
| A body edit in kerb.ts | Yes. L11 (1) diffs four `export ` lines exactly, and the checker runs the diff itself. |
| kerb.ts (or bandUnion / corridorUnion) importing kerbExact.ts | Yes, twice. (1) records the extra line or the owned file as changed, and (2) puts the new names in the code part. |
| A change to an existing source OUTSIDE a-09's owns (e.g. a layout file, or arr/winding.ts) | No. (1) says "the landed record and the notes show". The record covers a-09's owns only, and landed.mjs's note mixes such paths with other rounds' landings since the snapshot. This needs a whole-tree diff (edit 8). |
| Non-deterministic bundles | Covered. The code part (before `//# sourceMappingURL=`) with PLAT_ROOT and the file URLs tokenised is what L11 (2) compares. esbuild is deterministic, and module comments are relative to absWorkingDir. |

**(iii) S9, later rounds and the forbidden files: clean.**
- **S9:** nothing presumes it. The clause says "There is NO precondition on M0-a-06 S9". Its only S9 references are the S9 brief's mirror form and the merged-tree run.
- **Later rounds:** none is numbered ("the wiring round and round 2B are keyed at their render"). The only s19 names are this round's fix lanes.
- **The forbidden files:** dryrun.test.ts and restage.test.ts are only read ("NEVER dryrun.test.ts or restage.test.ts", L12 too). L11 (3) runs them read-only.

**(iv) L7's wrapper: buildable as written.**
- **The mock reaches kerb.ts's dry run.** kerb.ts imports `insertChain` from `'../insert/insertChain.js'` (:141). `vi.mock('../../../src/insert/insertChain.js', …)` is exactly the module dryrun.test.ts already mocks to count the dry run's calls. faces/split.ts imports it through `'../insert/index.js'` (:17), which re-exports `./insertChain.js` (:31), so the wrapper sees split's calls too.
- **The wrapper can read placed coordinates.** insertChain returns `KernelResult<ChainInsert>` with `placed: VertexId[]` (:131-134) and `r.warnings`. The first argument is the InsertTx, whose `plat` (classes.ts:108) gives `plat.vertices.x/y[placed[k]]` while the dry run is still open.
- **The warning set is complete for moves.** Step-3 contacts and stretch joins warn W_ATTRACTED (snapRound.ts:616, :628, :646). Off-input placement warns W_ATTRACTED (insertChain.ts:191, :208). A placement past the nearest point, or a fallback, warns W_PLACED. So "placed at themselves, no refusal, no move warning" is as strict as laidExactly.

**Two gaps in L7 (edits 6 and 7):**
1. The wrapper also sees the network builder's and splitFace's calls. It must keep only the calls whose rows carry the role `invisible` (DRY_ROLE, kerb.ts:788) made inside a read.
2. FM2's "placed-off fixture" may not exist. Every off-input point warns, so FM2 must be allowed to be stated equivalent with that cite.

With these, the relation can stay FAILING; no REPORTED-only fallback is needed.

## 4. New in r3 (would have flagged)

- **N1 (major, L7).** "A no-move BEYOND fails whoever the oracle finds right" turns a CONSTRUCTION defect on an exactly laid read into this round's red. The construction is not this round's to change (rule (3); R-C keeps construction reads for 2B and a-05). The corpus uses B-FUZZ networks, the same family as Q152's construction reds.
  - Fix: FAIL where the oracle finds the comparand wrong, or neither wrong. Where it finds the construction wrong, the case is classed and listed, never failing.
  - The 5 cm control still dies: X_U shifted 5 cm breaks the oracle's vertex test, which makes the comparand wrong.
- **N2 (major, L7).** The NEAR_CM derivation is for first-served reads. A faithful-served read lays `stepped` snapped points (:1024), which reach about 2.84 cm. Either count faithful-served reads as never no-move, or derive NEAR_F = 3 · HOT_PIXEL_CM + √2⁄2.
- **N3 (minor, L7).** The wrapper's attribution (see §3 (iv)).
- **N4 (minor, L7).** FM2 may be equivalent (see §3 (iv)).
- **N5 (major, L3, L4, L5).** The hot-pixel phrase is ambiguous, and KM8's escape follows from it (see §2 (a)).
- **N6 (minor, L11 (1)).** A whole-tree diff is needed (see §3 (ii)).
- **N7 (minor, clause).** The merged-tree run of derived.test.ts must compare figures, not only that the run is green. A construction shift by S9 within the relation's classes would stay green.

## 5. Time

**11–14 h is long but feasible for one resumable build seat.** The risk sits in L3 (the arrangement with overlaps, rounding and an order-free resolution) and in L8's ten hand-computed literals. My corpus estimate for L9 is about 1 400 s at the PR size.

**What 2B's decision needs, keep all of it:**
- L1–L7 and L9: X, the key with (k3), the oracle, the relation figures;
- L10: the incremental identity decides design H;
- L8: the literals are the only deterministic kill of XR2, XM3–XM7 and the blind spot.

**Defer L12** (the NB5 / NB7 pins on the S17 guard) to the wiring round. It is unrelated to 2A and its kills are independent. It is cheap, though (about 30 min), so keeping it is acceptable. No other cut is advisable.

## Ready to bind?

**Yes, with changes.** The sentence-level edits, in priority order:

1. **L7, the FAILING sentence.** Replace "FAILING: on a NO-MOVE read the construction's rings equal the comparand within NEAR_CM — a no-move BEYOND fails whoever the oracle finds right." with:

   > FAILING: a no-move read beyond NEAR_CM fails the round where line 6's oracle finds the comparand wrong or neither wrong; where it finds the construction wrong and the comparand right, the case is the construction's — classed (Q110 (c), Q117's tips, new), listed with its face and rings, carried for 2B and M0-a-05 (J742 R-C) — never this round's red.

2. **L7, after "A served dry run with NO MOVE: …".** Add:

   > A faithful-served read is never no-move: its stepped points stand up to HOT_PIXEL_CM off its parts (kerb.ts:1024), outside NEAR_CM's derivation; it is classed and reported only.

3. **L3.** Replace "the hot pixels being X's own vertices, so a ring vertex the key dropped makes none" with:

   > the hot pixels being every vertex of exactRegion's own input (the rings and parts it is given) and every rounded intersection — so a ring vertex the key dropped, absent from that input, makes none.

4. **L4.** Replace "if the seat shows no lattice case can move X so, KM8 is stated equivalent with that proof" with:

   > killed by line 5's narrow-band pin and by THE DIFFERENTIAL PIN: on every read of line 9 and every line-8 literal, exactKerb's region equals byte for byte exactRegion(the key content's rings, its parts) — the structured content the key's text is printed from.

5. **L5.** Replace "THE NARROW BAND: a T on a spine of half-width 1 cm, its crossing off the lattice line (kills KM8)" with:

   > THE NARROW BAND: a T vertex v the ring rule drops, held by a part whose edge passes within L∞ 0.5 cm of v — that precondition asserted in the test — so v's hot pixel would reroute that edge (kills KM8).

6. **L2.** Replace "lie within two-sided Hausdorff 1 cm" with "lie within two-sided Hausdorff NEAR_CM (line 7)".

7. **L7, the wrapper sentence.** After "records per call", insert:

   > — only the calls whose rows carry the role `invisible` (the dry run's, kerb.ts:788), made between the test's own marks around a read —

8. **L7, MUTANTS.** After "FM2 no-move from the warnings alone (a placed-off fixture red)", add:

   > or stated equivalent where insertChain warns W_ATTRACTED for every point placed off its input (insertChain.ts:191, :208)

9. **L11 (1).** Add:

   > and the checker's `diff -rq` of the base mirror's packages/*/src and bench/src against the tree's (node_modules excluded) lists arr/kerb.ts changed and arr/kerbExact.ts added, and nothing else.

10. **Clause, the merged-tree sentence.** After "runs derived.test.ts on the merged tree", add:

    > at this round's printed PLAT_FUZZ_SEED, its FIGURES TABLE equal to this round's

11. **Optional.** Move L12 to the wiring round.
