# M0-a-09 S18, revision 3: the library round (the spec seat's memo)

Written on 2026-11-10 on the design head 34ebf402. The kernel's files there are as they were on b81502bd, and M0-a-06
S9 has not landed. The revision applies:
- the refutation `refute-s18-r2.md` (19 findings);
- the session's twelve rulings of the fix pass (J744 (2)).

Files:
- **The entry:** `spec-a09-s18-r3.json`. It is ONE entry (`M0-a-09`, from 18, round S18) with 12 lines, every line
  under about 4.1 k characters.
- **The reading:** appended to `working-notes-r2.md` under "r3".
- **Revision 2** (`spec-a09-s18-r2.json` and `.md`) is left as it was; its LINES 7 and 11–14 are the starting text of
  the wiring round (§2).

**What S18 now is.** X(F) = region(F) − ⋃ B(s) as a pure function in `arr/kerbExact.ts`, with:
- its key;
- the definition oracle;
- the construction relation, judged through the test's own `insertChain` wrapper;
- literal-ring pins;
- `derived.test.ts`;
- the incremental identity.

Nothing calls the function. The round's only edit of an existing source is the `export` keyword on four kerb.ts
functions.

**What moved out.** The shadow, the CITY probe and the cost are the wiring round's. Neither later round is numbered.

## 1. The lines

| # | title | gating bar | mutants |
|---|---|---|---|
| 1 | **The exact kerb `kerbExact.ts`.** Its evaluation order (readFace → X_E → reaching set → faithful parts per spine → ring rule → key → X from the key). X = f(key). The normal form; ownRings iff the key's part list is empty. `export` on reaches :449, ownRings :661, unspiked :736, coveredBy :1684, and nothing else | pinned by lines 2, 3, 4, 8, 9 | XM1, XM2 |
| 2 | **X writes nothing.** The degenerate outputs. The dangling-chain ring exemption (ringCrosses with bridgesOf). The reach lemma within 1 cm, byte-equal only where non-reaching parts stand more than 2 cm off | write-nothing counts 0; lemma within 1 cm; the degenerate literals | XM3–XM8 |
| 3 | **One arrangement, one rounding.** Half away from zero by BigInt multiply-compare, with no division and no eslint-disable. Non-simplicity resolved order-free | order property byte-identical; vertex membership; simpleRing; exact-half pins of both signs | XR1–XR4 |
| 4 | **`kerbKey`.** The flag; the rings under THE RING RULE on the dropped polygon (u, v₁…v_k, w); per spine, its key and its parts. "⇒" only | (k1) property; the square and oblique T named | KM5, KM6, KM8 |
| 5 | **(k2), (k3).** One pin per input, including the zero-width chain and the narrow band. Representation-free; L2 outside the key | each pin | KM1–KM4, KM7 |
| 6 | **`definition.ts`.** Truth from the test's insertion records; draws filtered and counted; landings more than attractCm from vertices; the margin's full sum (3.41 cm, taken as 4 cm); the blind spots stated | 0 misses, 0 vertex or simplicity failures | OM1–OM3 + planted-X self-pins |
| 7 | **The construction relation by `derived.test.ts`'s own wrappers** (insertChain records; the opSave count; kerbCensus().faithful). The comparand is X_U for a first-served read, X_F for a faithful-served one. NEAR_CM = 2 · HOT_PIXEL_CM + √2⁄2 = 2.13 cm, derived. MOVED within DRY_MOVE_CM over whole outlines; BEYOND arbitrated | no-move reads within NEAR_CM (FAILING); the planted 5 cm control red | FM1–FM5 |
| 8 | **Literal rings.** Part vertices quoted from bufferParts; intersections by hand. Fixtures: (1) the half-coordinate, X only; (2) the oblique T; (3) the flag flip; (4) the ring way; (5) the hole and slit; (6) the empty kerb; (7) the part-less face; (8) the dangling chain; (9) contact with and without reach; (10) the narrow band | `toEqual` | XR2, XM1, XM3–XM7 |
| 9 | **`derived.test.ts`.** The corpus has a zero-width chord in four, and landings away from vertices. Per cut it reads the children, the landing-vertex faces and one untouched face. numRuns = RUNS ÷ 100 (at least 10). The floors scale (kept ≥ ½; ≥ 3 cuts and ≥ 12 faces per kept network); the time is quoted at 1 000 and 10 000 | oracle, relation, (k1), X refusals 0 | lines 1–7's |
| 10 | **The incremental identity** with exactRegion's real signature (the sibling subtracted as a part set) | none (REPORTED) | — |
| 11 | **NO-SHIFT for a library round:** (1) record + a kerb.ts diff of four `export ` lines only; (2) the prod bundle's code part identical (paths tokenised) and free of the new names; (3) bands outcomes and census identical at the base's printed seed, Q152's six red exactly; (4) the gates, with RELATED over kerbExact.ts only. No profile, fusion or CITY run | each item | — |
| 12 | **notes row 156's NB5 / NB7 pins**, added to hardening-s17.test.ts | the two pins | NB5, NB7 |

**What the clause carries.**
- J744's split and its re-ruling of S9's hold, for this round only.
- A resume fresh on the head the parent names, with no S9 precondition. BEFORE FIRST EDIT checks M0-work.json's owns
  (blocked if `kerbExact.ts` is absent), takes the six-red baseline and makes the base mirror.
- The write list, never touching `dryrun.test.ts` or `restage.test.ts`.
- **When either lands second:** whichever of S9 and this round lands second, the session runs `derived.test.ts` on the
  merged tree.
- **Sequencing:**
  - M0-a-05 S14 runs after S9, beside or after this round;
  - on a shared box, this round's runs stay outside S9's profile windows;
  - a failed check takes the lanes fix-s19 / close-s19, and the later rounds are keyed at their render.
- The seats: opus/high, opus/high, fable/high, opus/medium.
- The declared reds: Q152's six, J176, Q153.

## 2. The findings, and what changed

| id | sev | what r3 does |
|---|---|---|
| S18R-1 | blocker | **Applied** (LINE 7). A first-served read is compared with X_U (unreduced parts, test side), a faithful-served one with X_F, never with X. X against X_U is REPORTED as the straight-through figure. NEAR_CM = 2.13 cm, derived in the line. A no-move BEYOND fails. The planted control is at 5 cm. |
| S18R-2 | blocker | **Applied** (LINE 6). The truth is ChainInsert.placed from the wrapper or the arena. Draws whose chord route leaves its placed line by more than HOT_PIXEL_CM are discarded and counted. Landings are drawn more than attractCm from vertices; a cut whose children don't hold the placed points is discarded. The floor on kept draws is in LINE 9. |
| S18R-3 | major | **Applied** (LINES 1, 4). The evaluation order is fixed; X = exactRegion(the key's rings, the key's parts); the ring rule is on the dropped polygon. Consequence: KM5 now dies at a (k2) pin, not at (k1), and KM8 is added. |
| S18R-4 | major | **Applied and verified:** the tie goes toward the smaller y, then x (placement.ts:123-137). Fixture (1) asserts X only, and the header states the tie difference. |
| S18R-5 | major | **Applied** (LINE 2): the lemma within 1 cm, byte-equal only where non-reaching parts stand more than 2 cm off. |
| S18R-6 | major | **Applied** (LINE 2 exemption; LINE 1 names the simpleLoops rule; fixture (8) in LINE 8). |
| S18R-7 | major | **Applied** (LINE 9): the per-cut read set; floors as ratios with the kept share; the time quoted at 1 000 and 10 000; numRuns 10 at RELATED's size. |
| S18R-8 | major (wiring) | **Carried** (below). |
| S18R-9 | minor | **Applied** (LINE 3): BigInt half-away by multiply-compare after a ratio() estimate, then snap's range check. A pin for each sign of an exact half; XR4 (Math.round) added. |
| S18R-10 | major (wiring) | **Carried.** |
| S18R-11 | minor | **Applied** (LINE 4 "⇒" with key-only changes counted; LINE 5 a named zero-width pin; LINE 9 draws one chord in four widthless). |
| S18R-12 | minor | **Applied** (LINE 1): "no part" means the key's part list is empty. A Hausdorff-0 difference goes to NEAR. |
| S18R-13 | minor | **Applied** (LINE 6): the full sum (3.41 cm at an arc, 2.84 cm on a strip), the 8 cm thickness floor, the hw ≤ 4 blind spot (covered by fixture (10)). The arena form's spine selection and the profile-reading class are **carried** to the wiring round, since there is no CITY judge in S18. |
| S18R-14 | minor | **Applied** (LINE 8): part vertices from bufferParts, intersections by hand, the half-coordinate fixture from axis-aligned or 45° strips. |
| S18R-15 | minor | **Applied** (LINE 10): I(child₁) := exactRegion(X(parent)'s rings, [child₂'s rings] ∪ the lane's parts). |
| S18R-16 | minor (wiring) | **Used here in LINE 11 (2)**, in its form (bundle.ts's `code`, paths tokenised, sourcemap excluded) for the library's bundle identity. **Carried** for the wiring round's text check of the shadow. |
| S18R-17 | minor (wiring) | **Carried** (no flag in kerb.ts in S18; the insertChain wrapper replaces it). |
| S18R-18 | minor | **Moot:** the session did the owns step (J744 (3): session/m0-work-6, landed:verify ok). The validator is a vitest file, so the refuter's `node --test` form does not run it (J744). |
| S18R-19 | minor (wiring) | **Carried.** |

Nothing was rejected. Two findings were applied in a changed form:
- **S18R-3:** KM5's kill moved to (k2).
- **S18R-13:** the half that concerns the arena form is carried.

**THE WIRING ROUND'S CARRY LIST.** Its starting text is `spec-a09-s18-r2.json`'s LINES 7, 11, 12, 13 and 14.

- **r2 LINE 7, the motion flag.** It is now optional: the wiring round may keep S18's wrapper instead. If a flag is
  built, S18R-17's caveat applies: a faithful-served "unmoved" means within ~0.71 cm, relative to `stepped`'s snapped
  points (kerb.ts:1024).
- **r2 LINE 11, the shadow.** Under S18R-8:
  - the guard is `DEBUG_BUILD && exactShadowOn()`, switched by a by-path `setExactShadow`, with no environment
    variable;
  - no clock in kernel/src: a callback the probe installs, or the probe times a wrapped exactKerb;
  - off/on pins on counts, bits, state, the KerbRead and kerbCensus.

  Under S18R-19, pass the served read's own `f` into the shadow, so the caller's widths are not asked again.
- **r2 LINE 12, the CITY probe.** Under S18R-10:
  - its source committed under docs/validation or quoted verbatim;
  - the oracle buckets segments and caps samples per face;
  - each seed's wall-clock stated;
  - two controls: 5 cm (the relation, NEAR_CM) and 10 cm (the oracle).

  Under S18R-13 (3)–(4): the arena form's own spine-selection rule, and "profile reading" named as a class not judged at
  CITY.
- **r2 LINE 13, NO-SHIFT of a wired tree.** Roots, S8's counts, fusion report.json byte-identical in source mode with
  the shadow off and on, the bundle text check (S18R-16), and RELATED over kerb.ts.
- **r2 LINE 14, the cost.** The prod figure is forced in a mirror; VOID below the floor or when inlined.
- **The module-comment paragraph** naming kerbExact.ts in kerb.ts (moved out of S18 by ruling (2)).
- **The refuter's THE SPLIT (f):** the lane keying and a possible interface change (passing `f`, a clock hook) that
  re-runs derived.test.ts.

**THE 2B CARRY LIST (kept from r2's memo §3, unchanged).**
- DESIGN-5 (the S19 half);
- DESIGN-6, DESIGN-7, DESIGN-8;
- DESIGN-9 and DESIGN-10 (their S19 halves);
- DESIGN-11 (3);
- SCOPE-5, SCOPE-7, and refute-scope's "Missed";
- BARS-2, BARS-10 sub-claim 3, BARS-12, BARS-13, BARS-14, BARS-15;
- SEQ-1 to SEQ-4 and SEQ-6 to SEQ-11, and refute-q152-seq's "Missed";
- designs P and H (J742 R-B).

## 3. Time (estimates on a 4-core box, not measured)

**Rendered briefs:** BUILD 66 102 characters, CHECK 64 322 (r2: 82 119 / 80 339; a-06 S9: 71 681 / 69 909). Both carry
the renderer's WAITING RULE.

**Build: about 11–14 h.**
- **Code, 8–11 h.** The bulk is exactRegion: collinear overlaps, BigInt rounding, order-free resolution, the trace.
  Then kerbKey, `definition.ts`, the wrappers, the corpus and the literals.
- **Runs:**

| run | time |
|---|---|
| the base mirror | ~15 min |
| bands NEAR, base and tree | ~1 065 s, and ≤ +1 800 s on the tree; each in the background |
| `derived.test.ts` at 1 000 and 10 000 | ~10 min + ~30 min |
| RELATED@1000 over kerbExact.ts | ~10–15 min (it selects derived.test.ts) |
| ~28 mutants at a reduced size, 3 at a time | ~1 h |
| two scratch bundle builds | a few minutes |

  The census comes from the NEAR logs, so it costs nothing extra.

**Check: about 3–4 h.** Re-killing the mutants (~1 h), NEAR base and tree (~50 min), RELATED, the kerb.ts diff, and the
bundle builds. No CITY, profile or fusion run.

**The long-wait hand-off:**
- **Check:** the NEAR pair, chained with done-files. HANDOFF/settle exist for check seats only.
- **Build:** the same runs go to the background under the WAITING RULE.

On a box shared with M0-a-06 S9, this round's runs stay outside S9's profile windows, as the clause says.

## 4. What I could not verify

**Nothing was run** but the render. That leaves these open:
- whether exactRegion's one-pass snap rounding is needed, or is enough for simplicity;
- whether the half-away rounding needs more than one correction step;
- the measured time of `derived.test.ts`, and whether the floors (kept ≥ ½; 3 cuts and 12 faces per kept network) are
  met by the draw rules (one zero-width chord in four; landings more than attractCm from vertices);
- whether NEAR_CM (2.13 cm) is ever approached, and how often a read is no-move;
- whether a lattice case exists that kills KM8; LINE 4 allows it to be stated equivalent with a proof.

**Points I did not run, and why I expect them to work.**

| point | expectation |
|---|---|
| derived.test.ts's `vi.mock` of `insert/insertChain.js` reaches faces/split.ts's insertChain | split.ts imports it through `insert/index.js` (:17), which re-exports the mocked module. Not run. |
| The wrapper can read the placed coordinates from its shell argument | `insertChain`'s first argument is the InsertTx shell; its Plat access was not read. |
| A scratch call of bundle.ts's `buildBundle` in each mirror gives code parts that compare once PLAT_ROOT and file URLs are tokenised | That the code part is deterministic (no other build-time variance) is the refuter's reading and mine, not a run. |
| `diff -u` of kerb.ts shows exactly four changed lines | Line 1 forbids any other change. |

**Taken as given:**
- the refuter's ~20–25 ms per construction read (notes :451; not re-read);
- J744's statement that the validator passed 10 / 10 and landed:verify was ok.

M0-a-06 S9 is not landed. The clause no longer depends on it, beyond the session's merged-tree run of `derived.test.ts`.
