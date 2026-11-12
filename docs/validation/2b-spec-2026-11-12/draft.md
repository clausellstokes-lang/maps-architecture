# Round 2B of amendment z — what is served as a face's kerb (M0-a-09; a draft for the session)

Status: DRAFT by a spec seat, 2026-11-12. Nothing here is ruled. It binds only on S20's CLOSED tables (J785 (4)).
Every statement that rests on an S20 figure is marked **[S20: Tn]** (or [S20: row nnn] for a notes row outside the
figures table). Those figures are the builder's, unconfirmed by S20's closing check, and T2 is being rebuilt under
J785. Every dependence on a question the session has not ruled is marked **[OPEN n]**, which points at section (7).

Sources read: docs/AMENDMENTS-2026-10-28z.md whole; PROGRESS rows J742, J744, J752, J757, J759, J765, J769, J776, J785;
docs/validation/a09-s18-review-2026-11-10/lens-design.md (DESIGN-1 to -12), lens-bars.md (BARS-12 to -16),
lens-scope.md (SCOPE-7 to -10); docs/validation/a09-s19-spec-2026-11-10/refute-s20.md (OQ-1 to OQ-4) and
working-notes.md; the bound S20 entry in specs.json; on `origin/wip/child-a09s20` (9e5022ff) the notes rows 159 – 215
with the figures table and the interface section, `arr/kerb.ts`, `arr/kerbExact.ts`, `test/arr/bands/{observer,
relation,definition}.ts` and the evidence file `M0-a-09-s20-evidence/fusion-3-city.txt`; ARCHITECTURE §3.3, §3.7,
§4.6, §4.7 (S9) and the edge table; every caller of `arr/kerb.ts` on the design head (b8425a3c); queue rows Q92, Q102,
Q107 – Q111, Q117, Q119, Q152, Q178; `tools/lint/kernel-boundary.mjs` and its allowlist. No build and no test was run.
Token counts were taken with the lint's own `scanText` on S20's `kerb.ts` (a read-only script).

---

## (0) Findings that bear on the shape of the round

**F0-1. Four of the context's figures are read from the wrong column; the corrections change the memo question.**

(a) **"4.35 reads a cut" is not S8's figure.** T5's 4.343 is every observed read — S8's and the harness's S9 batches'
— over `faces.cuts` (5 242 reads over 1 207 lanes at fusion 3) [S20: T1, T5]. S8's own reads are the production count
run's `readKerb` calls: 2 764 over 1 220 cuts (`splitFace` + `connectHole`) = **2.27 a cut** [S20: row 209], the same
figure R7 and item 986 quote (2.26 – 2.28).

(b) **Almost none of S8's own reads repeat a key.** Fusion 3 has 2 651 distinct keys over all 5 242 reads [S20: T1].
The harness reads only faces S8 has finished (`measure.ts` `s8s9`: one `kerb()` per block seed in an L1 batch, then
`corridorUnion` per district, whose `bandCore` reads every face again on each pinned-first retry and in `offRead`), so
its ≈ 2 478 reads are almost all repeats of keys S8 already read. S8's own 2 764 reads therefore hold at most about
2 651 distinct keys: **S8 repeats a key on roughly 113 reads of 2 764 (about 4 %)**. This is my inference from the two
counts, not a measured figure; the round must count repeats by caller (line 11). It means the "5 567 repeats" of T5 are
mostly the harness's, and that a memo by the key saves almost nothing inside S8.

(c) **T2 does not compare the construction with X.** `observer.ts` (the branch, `read()` around its relation block)
compares the construction's served region with X_U / X_F — `exactRegion` over `kerbParts` of **the construction's own
spines**, with unreduced parts unless the read was served faithful — not with X. So "EQUAL 33, NEAR 2 489" is the
construction against X_U [S20: T2]. And **176.5 cm is not a construction-versus-X distance**: it is the maximum of the
"straight-through" column, X against X_U (10 737 of 11 209 reads differ, max 176.50 cm) [S20: T2]. T2's own BEYOND class
(the construction farther than `DRY_MOVE_CM` = 2·√2·26 + 2 ≈ 75.5 cm from X_U) holds **2 152 reads**; MOVED (within
that bound) 6 535. J785's rebuilt T2 compares the served region with X directly; the draft below reads only that
rebuilt table for the relation.

(d) **The three production X figures cannot all be right.** `exactRegion` is called twice a read (5 528 calls for 2 764
reads) at 1.335 ms a call — 2.67 ms a read — inside `exactRegionOfRead`, whose inclusive mean is 2.071 ms [S20: T6 (2),
row 209]. A nested callee cannot cost more than its caller. The source-mode figures are consistent (X 2.90 ms, the key
alone 1.61 ms, so the final `exactRegion` ≈ 1.3 ms) [S20: T6 (1)]. Only the ratio construction : X ≈ 12 : 1 is robust.
"The key costs 1.74 of X's 2.07 ms" should be read as "the key is between about 55 % (source) and 84 % (prod sampling)
of X".

**F0-2. P's per-read cost is understated: `readFace` and `splitsOn` are not in X's 2.07 ms.** The shadow times
`exactRegionOfRead(f, vc)` on the face record the served read had already built (`setExactShadow`, kerbExact.ts on the
branch: `t2` after `done` is entered, `t3` after X). A served read under P is `readFace` + X + `splitsOn` (the splits
and the ring-crossing guard), and neither `readFace` nor `splitsOn` has ever been timed apart. `readFace` walks F's L1
walk and, for every spine, its **whole own-level route** (`readSpine` → `routeLines`, `knotLines`), so a long way is
read whole at every read. S20's "11.46 ms a cut" [S20: T6 (2)] also charges a hit of the memo 0 and uses 2.173 keys a
cut, which by F0-1 (b) is the wrong population for S8. My estimate without a memo, on S20's own basis: 53.38 × 0.147 +
2.27 × 1.662 ≈ **11.6 ms a cut, plus 2.27 × (readFace + splitsOn)**, unmeasured. It is still about a fifth of today's
53.38 ms. The round must measure the three parts of the served read apart (line 12).

**F0-3. No caller outside the kernel's own tests reads anything X cannot give.** I read every importer of
`arr/kerb.ts`'s exports on the design head:

| caller (file:line, head b8425a3c) | what it reads from the read | can P give it |
|---|---|---|
| `layout/src/infill/bentCutFabric.ts:667` `kerbFace` (S8's per-visit read) | `kr.ok`, `kr.value` (the kerb rings); `kr.code` / `kr.detail` on a refusal; NOT the warnings | yes |
| `bentCutFabric.ts:743` `kerbSeed` (the block's seed) | `kr.ok`, `kr.value` | yes |
| `bentCutFabric.ts:938` the needle floor on the children | `kc.ok`, `kc.value` | yes |
| `arr/bandUnion.ts:584` `readOn` → `readKerb` (S9 through `corridorUnion`, and `bandUnion`) | `read.face`, `.rings`, `.edges`, `.spines` (the census's reaching ones included; `size === 0` skips the face), `.kerb`, `.splits`; NOT `.region`, `.warnings` or `.census` | yes: `spines` must be the edge spines plus X's reaching ones (DESIGN-10) |
| `bandUnion.ts:602` `offRead` (B-CLOSE re-read after an L2 run) | `.kerb` of a second read on the post-run arena | yes, but its meaning changes (F0-6) |
| `bench/src/fusion/measure.ts:572` (`s8s9`'s working block) | `kr.ok`, `kr.value` | yes |
| `bench/src/bentcut/signature.ts:397` | `kr.value` | yes |
| `facade/kernel.ts:231` (`k.geom.kerb`, tests and testkit primitives) | the `KernelResult` with its warnings | yes; the warnings become `[]` |
| `test/arr/bands/replay.ts`, `cause.test.ts`, `restage.test.ts`, `dryrun.test.ts`, `hardening-s1x` (tests) | `kerbCensus()` (`refusedAt`, `faithful`, `reaching`), `partGroup`, `KerbRead.census`, the dry run's frames | only the construction gives these; under P they are the construction's own pins (line 9) |
| `kernel/test/tx/savepoint.test.ts:464-485, :1039-1047`, `cost.test.ts:164-191`, `oracle.test.ts:226-232` (M0-a-06) | `kerb()` as the generator of **dry-run frames** (`support.ts:386` classes a frame `dry-run` by `dryInsert` on the stack) | **no**: under P `kerb()` opens no frame, so `clean('dry-run', 2)` (savepoint.test.ts:483) goes red and the size pin's read half measures nothing — a cross-item finding (F0-7) |

The warnings (`W_ATTRACTED`, `W_STRETCH_SHARED`, `W_ACUTE_CORNER`, `W_PLACED`, `W_WEDGE_ROUTED` [S20: T1]) are the dry
run's own insertions' on its `insertTx` shell; they never reached a batch, a stage report or S8's warnings
(`bentCutFabric.ts:626` `warn` is called only with S8's own codes). The splits are `splitsOn`, which "given another
region of the same face (a recorded one), [applies] the same junction rules" (kerb.ts on the branch, `splitsOn`'s
comment) and refused 0 times on X at CITY [S20: T1]. The census's reach is `exactKeyContentOfRead`'s `reaching`
(read on X_E, the exact edge-spine kerb). The restaged and faithful reads have no meaning for X.

**F0-4. P ships a second geometry engine, which §3.7's decision paragraph forbids — a fourth architecture sentence.**
ARCHITECTURE.md:5321-5323 (GEO-9, DEF-2, J-K4): "Booleans, buffers, per-edge insets and bands are built on the kernel's
own arrangement — the machinery of `insertChain` on a scratch overlay — and no second geometry engine ships (the one
exception is the pre-decided fallback below)". `exactRegion` is its own arrangement with Hobby snap rounding and its own
half-away tie (kerbExact.ts's module comment says the insertion's tie differs by 1 cm at an exact half). Under P it is
in the production bundle. J742 names three sentences P keeps; this one P must amend, and H must amend it too (986 (c)'s
"exact lattice clip of a ring by a strip" is the same kind of engine). The rationale of the decision ("on every host it
is the same TypeScript code producing the same integers") is kept: X is integer-exact TypeScript.

**F0-5. Item 986 (e) (3)'s exact-share bar cannot be met by P or by H, and the harness's 0.95 floor may fail under P.**
986 (e) (3) asks "exact share ≥ 0.91 (target 0.95)" between the derived kerb and the construction, on the premise that
3 – 8 % of faces are attracted. At CITY every read is attracted (W_ATTRACTED on 11 209 of 11 209) [S20: T1] and the
construction equals X_U on 33 reads [S20: T2]. That bar must be withdrawn, not carried. Separately, the harness's
S8 ≡ S9 exact-0 floor `S8S9_EXACT_FLOOR = 0.95` (`bench/src/fusion/measure.ts:81`, asserted in
`bench/test/fusion/hausdorff.test.ts:191, :200, :287`; M0-c-06's) was met because the construction's region is already
where the door would put it. Under P, S8's working block is X and S9 commits X through `insertChain`; the share falls
wherever the commit moves X's outline (contacts on width-less edges, features thinner than `attractCm` = 26 cm,
vertices near another vertex). Nobody has measured that share. **[OPEN 5]**

**F0-6. S9's commit of X has never run.** S20 measured X as a read beside a construction commit. Under P,
`bandUnion.ts`'s engine lays X's outline pieces and splits through `insertChain`, closes open ends against F's boundary
(`closeEnds`: at the contact, along X's run, or pinned first), reads faces back by their share inside X, and runs
`offRead`. `offRead` (bandUnion.ts:588-608) exists because an L1 read lays its parts at L2 (`dryLevel`) and so meets an
L2 op's own tip and chord; under P an L1 read is X, a function of level ≤ 1 content, so that hazard is gone — but
`offRead` still asks that the committed run vertex (`pointOf(p, a.far)`, where the insertion placed it) lie on X's
outline within the 1 cm boundary reading, and an attracted placement can now stand off X by up to the bound. It may
turn lawful closings into pinned-first retries and refusals. S9's refusals, the closings, the seeds' faces and the
exact share are all unmeasured under P. **[OPEN 3]**

**F0-7. P moves tests no "single read" exemption protects.** SCOPE-7 (lens-scope.md) found 43 test files outside
M0-a-09's owns that run S8 or S9 or read a kerb, and judged that single-read tests "cannot move under 2B (a first read
constructs)". That was true of H only. Under P every read changes, so single-read tests can move too: M0-a-06's three tx
files above (red, not merely moved), M0-c-02's `layout/test/enceinte/strips.test.ts:297-375` (it compares kerbs read
twice and booleans them against the strips), M0-a-13's `kernel/test/warp/validate.test.ts`, M0-a-16's facade test
(equal reads, probably green). Section (4) lists them.

**F0-8. X has not met the B-FUZZ bands population.** X ran on S18's corpora (100 networks at the PR size), on the
shadow corpus (100 networks, 1 084 reads) [S20: row 203] and on six seeds at CITY and test size [S20: T1]. `bfuzz.test.ts`
(10 000 networks plus 2 000 widened; the census lines `B-FUZZ bands: …` [S20: row 207]) has only ever served the
construction. Under P its every kerb, `corridorUnion` and `bandUnion` call serves X. X's two planarity `check`s in
`exactRegion` throw (a `check` failure, kerbExact.ts on the branch, after the snap-rounding passes) where the construction
returned typed refusals; a throw inside S8 is not a lawful refusal. **[OPEN 4]**

**F0-9. The definition oracle's "5 642 of 5 642 clean" is vertex-exact but area-coarse at CITY.** `judgeCapped`
(definition.ts on the branch) checks every vertex of X (no vertex deeper than 4 cm in a buffer; every vertex within 4 cm
of a boundary) — exact for vertices — but samples the area on a grid of step max(20 cm, √(area ⁄ 4 000)). In
`fusion-3-city.txt`'s step block the step at CITY is **median 76.0 cm, 90th percentile 165.9 cm, maximum 608.5 cm**
(my reading of its 2 651 lines). So an area error narrower than roughly twice the step whose vertices sit on lawful
boundaries is invisible at CITY [S20: T3]. The fine-scale evidence that X is right is S18's 20 cm corpus, the literal
pins, and J785's local arbitration, not T3 alone.

**F0-10. X and X_U differ by up to 176.5 cm and nobody has said why.** Both are "exact" (`exactRegion` over the same
rings), and `straightRun` should move a buffer by at most a hot pixel (0.71 cm) per dropped vertex. A 176 cm difference
cannot come from that. Two differences are real: X's reaching set is read on X_E (exact), X_U uses the construction's
census set (read on its attracted base); and X applies the ring rule. A different vertex-only spine set is exactly the
case the oracle judges leniently (its vertex-only rule keeps a chain "where [its] buffer covers a grid sample of F lying
in no edge spine's buffer", at the 76 cm median step). Until the largest cases are dissected, a wrong census reach in X
cannot be excluded [S20: T2]. This is the first thing the closing check of S20, or 2B's first line, should open.

**F0-11. The construction is not a function of the key, and today serves beyond its own bound.** Under one key, the
construction's region differs from its own first read on 2 095 of 5 567 repeats (max 40.71 cm) [S20: T5], because its
attraction reads arena content the key does not hold. And on 2 152 reads it stands beyond `DRY_MOVE_CM` from X_U, of
which 583 are the known tip classes (Q110 (c) / Q117), 66 new construction cases, and 1 503 undecided by the coarse
oracle [S20: T2]. P's case strengthens with every one of the 1 503 that J785's arbitration finds X-RIGHT.

**F0-12. The kernel-boundary arithmetic decides the wiring.** `kerb.ts` stands at ident `kerb` 20 / string `kerb` 8
(counted with the lint's `scanText`; every one of the 8 strings is a `check` message in `readSpine` / `readFace`). Any
`import … from './kerbExact.js'` adds a `kerb` string to the importing file; `packages/kernel/package.json` declares
`"sideEffects": false`, so a side-effect registration import would be shaken out of the bundle. So P needs either one
raised row (kerb.ts string 8 → 9) or the exact code folded into `kerb.ts`. **[OPEN 1]**

**F0-13. The round number.** J769 reserves `build/M0-a-09-fix-s21` / `check/M0-a-09-close-s21` for a fix round of S20
if its closing check fails; 2B takes "the next number no lane key carries" at its render. The entry is keyed S21 as
asked; if S20 needs a fix round, 2B is re-keyed S22.

---

## (1) P against H

**What each serves.** P serves X(F) = region(F) − ⋃ B(s) computed by the pure function on F's L1 route rings and the
spines the census keeps (read on X_E), every read, whatever the history. H (986 (c)) serves the construction's read for
a face no cut has touched, keeps it as kerb state, and serves each child of a cut the derived region
(kerb(parent) ∩ side) − B(lane), retiring state on merge, removal and other writes.

**What each must keep true.**

- *kerb as a function of the arena.* P: yes, by construction. X reads only level ≤ 1 content (`readFace` walks level
  ≤ 1 rows; `junctionEnd` skips edges of level > 1), so it is even independent of other districts' L2 commits, which the
  construction was not (`dryLevel` lays the parts at L2). H: no. Two equal arenas reached by different histories give
  two kerbs (DESIGN-6); a loaded document has no state and re-reads by construction.
- *S8 ≡ S9 across a save and load.* P: S8 plans on X and S9 commits X, in process or after a load, the same X. H: S9
  commits the derived state in process and the construction after a load; the two differ within the bound on attracted
  faces, which at CITY are all of them [S20: T1].
- *The three sentences J742 names* — §3.3's slot-renumbering bullet (ARCHITECTURE.md:4639-4643), §3.7's "the same
  function on the same inputs" (:5359-5362), the edge table's "a regeneration from the same inputs yields the same
  arena" (:5636), and C-0207 (5). P keeps all three: X's orders are geometry and entity ids (canonical starts,
  `spineKey`, a set-based arrangement), never slots. H narrows all three. **Both** must amend GEO-9 (F0-4).
- *986 (d)'s contract.* "S8 plans on the exact kerb, S9 commits it through the door within N-43's bound": P is that
  ruling verbatim. H is it only for derived children; its roots are the construction.

**What each costs** (prod, fusion 3, CITY; S8's own 2.27 reads a cut; plain basis by S20's scaling 65 123 ÷ 81 167):

| | per read | per cut (S8 only) | source |
|---|---|---|---|
| today: the construction | ≈ 20.1 ms plain (25.04 profiled) | ≈ 45.5 of 53.38 | [S20: T6 (2), row 209] |
| P, no memo | 1.66 ms X + readFace + splitsOn (unmeasured) | ≈ 11.6 + 2.27 × (readFace + splitsOn) | F0-2 |
| P, memo by S18's key | a hit still pays the key (55 – 84 % of X) | saves ≤ about 0.1 ms a cut (≈ 4 % hits, F0-1 (b)) | inference |
| H as 986 (c) (construction roots) | a root ≈ 20 ms; a child ≈ the identity (1.42 ms source) | ≈ 0.47 roots a cut × 20 ms ≈ 9.5 ms on top of the rest: ≈ 19 ms | [S20: T5 re-derive share 2 326 / 11 209; T6 (1)] |
| H with X roots | ≈ P less ≈ 0.6 ms on a child whose identity holds | ≈ P less ≈ 0.5 ms a cut, plus the history machinery | [S20: T4, T6 (1)] |

The identity (1.42 ms source) is not much cheaper than the key it would replace (1.61 ms) [S20: T6 (1)], so H's only
saving is the last `exactRegion` on a child.

**Where each is wrong today, and by how much.**

- P (X): 0 faults on 5 642 of 5 642 keys judged, every face judged, none unjudged [S20: T3] — exact at the vertices
  (4 cm), coarse in area (F0-9); 0 refusals [S20: T1]; 0 split refusals [S20: T1]; the unexplained X ≠ X_U column,
  10 737 reads, max 176.5 cm (F0-10) [S20: T2].
- H: the identity I(F) = X(F) fails on 668 of 3 316 contents with a parent (20 %: CONTACT 519, ROUNDING 578, INHERITED
  55, OTHER 64, END-CHANGED 1, with multiplicity) [S20: T4] — and that was measured with **exact** parents. With the
  construction's roots 986 (c) actually specifies, every child inherits its root's attraction up to `DRY_MOVE_CM`
  (DESIGN-4), on every face at CITY.
- The construction itself, which H serves for its roots: beyond its own bound on 2 152 reads (F0-11) and not a function
  of its key on 2 095 repeats (max 40.71 cm) [S20: T2, T5].

**Which I would rule: P.** The three strongest reasons: (1) P keeps kerb a function of the arena — the contract, the
three sentences and save/load S8 ≡ S9 hold by construction, and nothing about history, rollback, generation or
persistence is left to rule; (2) H's identity fails on a fifth of children even with exact parents, and its roots are
the construction, which stands beyond its own bound on about a fifth of reads at CITY [S20: T2, T4]; (3) P costs about a
twelfth of the construction a read [S20: T6], and H's saving over P is under 1 ms a cut while its roots alone would
double P's cost.

**What would change my ruling.** (a) J785's rebuilt T2 finding any X-WRONG read on a judged face, or a dissection of the
176.5 cm column (F0-10) showing X's census reach wrong — then P is not yet right, and neither is H with X roots; the fix
is in X, not in a history. (b) `readFace` costing several ms a read (F0-2) — then a per-face cache of the face record
is the lever, still not H. (c) S9 refusals or the S8 ≡ S9 hard bar failing when X is committed (F0-6) — a defect of the
commit path to fix in `bandUnion.ts`, which H would meet too on its derived children. None of these favours H.

---

## (2) Under P, the design

**2.1 The served read.** `readKerb(o, face, widths, cache?, vertexContacts = true)` keeps its signature and result type
(API freeze, J263 Q1). It: opens nothing (`openTx(o)` for the arena only); calls `readFace(p, face, widths, cache,
vertexContacts)` as today; computes `exactKeyContentOfRead(f, vertexContacts)` and X = `exactRegionOfKey(content)`;
builds the spine map as the edge spines plus `f.through` filtered to `content.reaching` (the observer's `xSpines`);
calls `splitsOn(p, f.edges, spines, X)`; and returns `KerbRead { face, rings: f.rings, edges: f.edges, spines, kerb:
sp.rings, splits: sp.splits, warnings: [], region: X, census?: { base: ok(content.edgeRegion), reaching } }` — the census
present exactly where `f.through.length > 0`, as the construction set it. `CENSUS.set(p, { face, reaching, refusedAt:
null, faithful: 'none' })` stays, so `kerbCensus()` readers see a well-formed last read. `kerb()` is unchanged
(`readKerb` → `ok(kerb, [])`). The read writes nothing: no frame, no `opSave`, no `insertChain`, no index query beyond
`readFace`'s walks. Refusals: `readFace`'s and `bufferParts`' (`check`s and typed codes, as today), `splitsOn`'s
(`RING_CROSSES`, `splitChain`'s), and X's planarity failures as a typed refusal **[OPEN 4]**.

**2.2 Where each thing a caller read now comes from.** Rings, edges: `readFace` (unchanged). Spines: edge ∪ X's
reaching. Kerb and splits: `splitsOn` on X. Region: X. Census: `content.edgeRegion` and `content.reaching`.
Warnings: none — no production reader (F0-3). `W_ACUTE_CORNER` and `W_STRETCH_SHARED` still arise where they always
mattered, in S9's own insertions through `bandUnion`. `refusedAt`: always null on the served path (X has no
post-condition refusal; J433's refusal replay reads only the construction). `faithful`: 'none'. The restaged read: gone
from the served path.

**2.3 Does the construction still run on the served path? No.** It stays in the tree for ONE round, debug-only, as the
cross-check (recommended, **[OPEN 6]**): the old `readKerb` body becomes a by-path, kernel-internal
`constructionRead(...)` (a noun-free name), byte-identical in behaviour to the base's `readKerb` (a differential pin
against the base mirror), reached by nothing served and absent from the production bundle's code part. It serves three
purposes this round: (i) the CITY probe's relation — the shadow is inverted: `ReadShadow.done` now hands the served X
read, and the test-side observer computes `constructionRead` beside it on the same open transaction (its dry runs are
undone; S20's on/off NO-SHIFT method proves they leave no trace); (ii) BARS-13's control — a debug-only provider hook
(`setReadProvider`, honoured only where `DEBUG_BUILD`, no `anyBuild`) through which the probe serves the construction
instead of X: with it installed the tree's roots, `report.json` and SeedRecords must equal the base mirror's byte for
byte, so the declared shift is shown to be exactly "X instead of the construction"; (iii) the dry-run generator
M0-a-06's tx pins need until the construction is removed (F0-3, F0-7). It is removed by the next M0-a-09 round after the
re-profile of 990 (b), with `dryrun.test.ts` / `restage.test.ts` and the cause replay.

**2.4 A memo by the key: not in 2B** (recommended, **[OPEN 2]**). A hit on S18's key still pays the key (the parts, X_E
and the ring rule): it saves only the final `exactRegion`, about 0.33 – 1.3 ms of a read (F0-1 (d)), and S8 repeats a
key on about 4 % of its reads (F0-1 (b)). That is ≤ 0.1 ms a cut in S8. The harness's S9 reads would gain more, but S9
is not a registered stage at M0. A memo whose key is the face record `f` itself (rings, each spine's lines, widths,
ends and junction flags, the through set) would save nearly all of X on a hit, but its hit rate is lower (a T anywhere
on a long spine changes it) and unmeasured. A memo of any form must be a pure cache scoped per arena (`WeakMap<Plat,
…>`) so that a loaded copy starts empty and returns the same values. The round REPORTS both hit rates by caller (line 11).

**2.5 How S9 commits the kerb.** Unchanged in mechanism: `corridorUnion` → `bandCore` → `writeOutlines` lays X's outline
pieces (`outlinePieces(read)`) and the splits through `insertChain` at L2, closes ends (`closeEnds`), drops the op's
spurs, reads faces back by their share inside X. Attraction moves X's laid outline by at most N-43's bound, exactly as it
moved the construction's commit. **What is planned on and what the arena holds:** S8 plans on X; the arena holds X as
the door laid it, within 2·√2·attractCm (≈ 73.5 cm, `S8S9_BOUND_SQ`). Every later L1 read returns X again (an L2 write
changes no input of X), and every later stage reads the committed L2 faces. **Does 986 (d) settle it? Yes, for the
contract**: "S8 plans on the exact kerb, S9 commits it through the door … the contract §3.7 already states for the
committed block" (986 (d); KI-13's bound). It does not settle three things P must measure: S9's refusals (the lawful
refusal census, a failing bar), `offRead`'s behaviour (F0-6, **[OPEN 3]**), and the exact-0 share (F0-5,
**[OPEN 5]**). §4.6's "Hausdorff 0" (ARCHITECTURE.md:7303) is read, as N-52 (1) already reads it, as within the bound,
exact where the commit moved nothing.

**2.6 What becomes of the code.**

- **The wiring** (recommended, **[OPEN 1]** W2): `kerbExact.ts`'s functions move into `kerb.ts` with their bodies
  byte-identical except one call — `kerbParts(f.rings, new Map([[s.key, s]]), true)` becomes `spineParts(s,
  boxOf(f.rings), true)`, which is what `kerbParts` computes for one spine (kerb.ts `kerbParts`: `boxOf(rings)`, then
  `spineParts` per key) and carries no noun. `kerbExact.ts` is deleted. `kerb.ts` imports no `arr/` sibling it did not import
  before (only `DEBUG_BUILD` from `../invariants/debug.js`, for the provider of 2.3, which carries no noun), so there is
  no cycle; the token counts stay ident 20 / string 8 (estimated with the lint's scanner; the round's lint decides), and the
  two `arr/kerbExact.ts` allowlist rows are removed — a shrink, made by the session's seam in the landing commit
  because `kernel-boundary.allow.json` is M0-d-07's file and a row that matches nothing fails. The alternative W1 —
  `kerb.ts` imports from `./kerbExact.js` — is a smaller diff but adds an ES-module cycle and raises kerb.ts's string
  row 8 → 9, a boundary change.
- **The `anyBuild` carry** (J759 (3) Q2): discharged by deletion — `setExactShadow`, `ExactShadowRead`, `ExactObserver`
  and the `anyBuild` option go (they shadowed X beside the construction; P inverts the shadow). The provider hook of 2.3
  is honoured only where `DEBUG_BUILD`, with no option to force it; a `shadow-prod`-form pin proves it.
- **The shadow hook** (`ReadShadow` / `setReadShadow`): kept, with `done` handing the served X read (face record, X's
  content, splits, census) — the probe's only window. Production keeps the one null check (S20's bundle diff form).
- **The construction** (2.3): one more round, debug-only, then removed.
- **The module comment of `kerb.ts`**: the paragraph "The read is a DRY-RUN ON THE REAL ARENA …" and the rounds S15 –
  S17 paragraphs describe the construction; they are rewritten to say what is served and where the construction now
  stands (comment-only, within the line that changes the read).

---

## (3) The frame-side end rule (Q178 (b))

**The two readings.** `kerb.ts` `junctionEnd` (S20 branch, before `readFace`): an end is a JUNCTION end — flat, no cap —
where another chain's level-1 row (ordinal 0) runs on two of the end vertex's edges of level ≤ 1 and no other chain of
the spine's own role ends there. A way laid along the frame carries such a row on frame edges, so an end on it is flat.
The function's own comment adds "An end on the level-0 content (the frame, a shore) keeps it too: no block lies across
that line" — which the code realises because a bare frame edge carries no level-1 row. `definition.ts` `endsOf` (S20
branch, its `onFrame` test first) keeps the declared end wherever the end vertex lies on the frame ring, whether or not
a way runs along it.

**What S20 met at CITY: none.** 0 faces UNJUDGED as 'frame-side end' at every seed, so no ring to list [S20: T3, row
205]. The class exists in S18's corpus (row 181: 15 networks with a chord along a frame side; 11 + 7 failing reads, all
the oracle's).

**Recommendation: the code's reading.** (1) It is what P serves, and S9's junction machinery (`junctionsOf`, the
splits) treats the same vertex as a junction; a capped end there would be read as a T by S9 and as a free end by the
kerb. (2) The S15 rule's literal trigger — another chain's level-1 line through the end — is met; the frame clause in
the comment speaks of level-0 content, which is the case with no way along the frame, and there the code already keeps
the cap. (3) The oracle's stated reason (no block lies across the frame) is about where the cap lands; a cap on a way
laid along the frame differs from the flat end only beyond the end's square line, which inside F is the oblique wedge
by the frame-side way's band — a street T like any other. **What the ruling changes:** `definition.ts` `endsOf`'s frame
clause reads "on the frame AND no other chain's level-1 line passes the end" (test-side, M0-a-09's owns; M0-a-05 S14
reads `definition.ts` read-only — its landed tests that import `endsOf` must be checked at the binding); a literal pin
on `kerb.ts`'s side: a lane ending obliquely on a way laid along the frame, with the lane's half-width larger than the
frame-side way's, where the two readings differ inside F. No CITY figure moves [S20: T3].

---

## (4) The declared shift and how it lands

Nearly every served region changes (X ≠ the construction on all but 33 reads against X_U [S20: T2]), so every S8 cut
decision may move, and with it every S8 / S9 output and root downstream. The shift is declared under §6.5 (7) with its
records naming S8 and S9 (986 (e) (4)); the gate's statistics clauses are re-judged within their bands, not "unchanged".
**The list below is by grep and must be MEASURED before the binding** (SCOPE-7's own recommendation; J757's method: a
scratch mirror with P switched on, the whole suite run, every red a pin the shift moves). Owners from
`plat/docs/build/M0-work.json`.

**Re-recorded by the round itself (M0-a-09's owns).**

| file | what it pins | under P |
|---|---|---|
| `kernel/test/arr/bands/dryrun.test.ts`, `restage.test.ts`, `cause.test.ts`, `replay.ts`, `hardening-s15/s16/s17.test.ts` | the construction's internals: insertChain / opSave counts, staged and faithful reads, `refusedAt`, the cause replay of KEPT_DEEP / CENSUS_DEEP / UNLAID_DEEP | re-pointed to `constructionRead` (they pin the cross-check) or retired with the construction; served-kerb literals among them re-judged on X |
| Q152's six (closing 'seed 20261011 draw 1109' and the shrunk counterexample; dryrun 'draws 389 and 1109'; hardening-s15 'network 561'; restage 'N1', 'N2') | group A: a-05 S12's declared shifts, re-pins proposed and never applied; group B: red since a-09's S14 – S17 pins met a-05's S9 – S11 engine | each re-judged once, on X (J742 R-C): a served-kerb literal re-pinned to X's ring only after a two-sided check (BARS-14's form: the lost or gained polygon judged by the definition oracle at 20 cm and at its own vertices); closing's "after ≡ before" holds by construction under P (X ignores the L2 op) and is kept as asserted; dryrun's `wholeBand` / band faces re-judged on S9's commit of X; the internals (saves 4, faithful 'taken') stay with `constructionRead` and take group B's cause from M0-a-05 S14's verdict. None survives as a pin of a construction that serves. **[OPEN 8]** |
| `closing.test.ts`, `corridor.test.ts` (:670 reads the move warnings), `deadend.test.ts`, `vertexcontact.test.ts`, `widthstep.test.ts`, `hardening.test.ts`, `kerb.test.ts`, `consolidated.test.ts`, `register.test.ts`, `representation.test.ts`, `band.test.ts` | kerb strings, wedge and band faces, census reach, warnings | re-recorded on X, each moved literal with its before / after and the oracle's verdict in the notes |
| `bfuzz.test.ts` (:226, :261, :305 census lines) | refusals per operation `{"kerb":{"insertChain":4,…},"corridorUnion":{"insertChain":8,…},"bandUnion":{"insertChain":4,…}}` and the widened line [S20: row 207] | the kerb row's insertChain refusals are expected to fall to 0; no class may rise (failing bar) |
| `derived.test.ts`, `observer.ts`, `relation.ts`, `shadow.test.ts`, `shadow-prod.test.ts`, `observer.test.ts` (S20's, if landed) | X beside the construction | re-pointed: the shadow inverted, `setExactShadow` gone |
| `testkit/test/kernel/arr-bands/` (`agreement-corridor`, `guard`, `representation`, `support`) | the committed L2 kerb against M0-k-03's oracles, split by attraction | re-judged on S9's commit of X |

**Other items' pins (owner in brackets).** The round never edits them; each is re-recorded by a session seam in the
landing commit where the move is mechanical (a literal moved by the kerb shift, before / after and reason in the
declared-shift record), or carried as a queue row for its owner where a law, not a literal, moved.

| file | owner | pinned value | handling (recommended) |
|---|---|---|---|
| `kernel/test/tx/savepoint.test.ts:464-485, :1039-1047`; `cost.test.ts:164-191`; `oracle.test.ts:226-232` | M0-a-06 | kerb() as the dry-run frame generator (`clean('dry-run', 2)`; the size pin's read half) | **goes red under P** — a session seam re-points the `kerb(...)` calls to `constructionRead` by path, no assertion changed; a queue row for a-06's dry-run generator once the construction is removed |
| `layout/test/infill/fabric/` (18 files; `splitSeeds.test.ts:195, :276` areas [2 394, 1 554]; `seeds.test.ts:85`; `city-split-seeds.json`, `seedless-part.json` record kerbs) and `testkit/test/layout/infill-fabric/` (6) | M0-b-03 | kerb components, seeds, outcomes | session seam for literals; Q102 / Q109 re-measured by b-03's next round |
| `testkit/test/ladders/rungs-s8.test.ts:140-148` | M0-x-05 | `slide` [30], `W_CUT_SLID` 30 | seam if the move is a literal |
| `bench/test/bentcut/` (entry, fcut, report, signature; `signature.ts:397` reads kerb); `summaries/M0-b-04.json` | M0-b-04 | the F-CUT and signature figures | seam; summary re-recorded by a b-04 run |
| `bench/test/fusion/` (derive, drift + `drift-fixtures.json`, hausdorff `S8S9_EXACT_FLOOR` :191 / :200 / :211 / :287, restart, stagework, measure, report); `bench/src/fusion/measure.ts:81`; `summaries/M0-c-06.json` | M0-c-06 | Q117's named drift cases; the 0.95 floor; the 1 000-seed summary | drift fixtures re-judged (the tip and band-needle classes are expected to vanish with the construction, F0-11); the floor **[OPEN 5]**; the summary by the session's 1 000-seed run after 2B (J742 R-E Q6) |
| `bench/test/fusion-ng/` (phase-a, phase-b, entry) | M0-c-07 | court share, verdicts | seam or c-07's next run; Q119 waits on it |
| `bench/test/determinism/` (stages, pair, runner); `testkit/test/determinism/renumber.test.ts` | M0-d-09 / M0-d-08 | run-to-run root equality (no literal roots found) | expected green; P makes renumbering equality structural |
| `layout/test/districts/integration.test.ts` | M0-e-04 | S8 + corridorUnion outcomes | seam |
| `bench/test/site/compose.test.ts` | M0-e-06 | derive | already red on base at relief-60 seed 2 [S20: row 213 (b)] |
| `layout/test/pipeline/base/run.test.ts` and table | M0-x-04 | stage table | seam |
| `layout/test/enceinte/strips.test.ts:297-375` | M0-c-02 | kerb beside the wall, two reads compared | likely green (X stops at the strip by the same spines); re-judged |
| `kernel/test/warp/validate.test.ts` | M0-a-13 | one kerb read | re-judged |
| `kernel/test/facade/facade.test.ts:175-176` | M0-a-16 | two equal reads | expected green |
| `kernel/test/insert/step3-5/q104.test.ts`, `sliver.test.ts` | M0-a-05 | corridorUnion | re-judged |
| `testkit/test/edge/` (B-EDGE, `src/edge/s8.ts`); `summaries/M0-x-06.json` | M0-x-06 | S8 edge fixtures | seam / x-06 re-run |
| `summaries/M0-k-04.json` (kerb primitive: 10 000 runs, refusals by code); `testkit/test/runner/{judges,primitives}.test.ts` | M0-k-04 | refusal counts | re-recorded by a k-04 run |
| `summaries/M0-f-03b.json` (the work-limit fit reads c-06's S8 batches) | M0-f-03b | S8 CITY batches, work-cut rates | re-fit after the c-06 1 000-seed run |
| roots and timing figures quoted in `plat/docs/build/checks/*.md`, `choices.md`, `profile-tool.md` | — | historical records | not re-recorded (history); the new roots go in the declared-shift record |

The `roots-golden.json` of M0-d-04 does not run S8 (SCOPE-7) and does not move. The J757 merged round (the `shape`
role's registry raise, J776) moves every encoded arena's bytes and so every root once, for a different reason;
2B and it are file-disjoint and must not straddle one gate run: whichever lands second re-records roots on the merged
tree (a session seam), and J757's measured re-pin list is re-measured if 2B lands first. **[OPEN 9]**

---

## (5) The lines, in build order

The round is **one round on M0-a-09** (S21 **[OPEN 11]**), not a merged round: every source change lies in M0-a-09's
owns (`kerb.ts`, `kerbExact.ts` deleted, `bandUnion.ts` only if [OPEN 3] rules a change, the bands folder, the testkit
arr-bands folder); the cross-item edits are mechanical session seams in the landing commit (section (6)), as J752 (c)
and J757 did, each with its ruling. A leg would be justified only if [OPEN 5] moved `measure.ts`'s floor by more than a
constant, which I do not recommend.

Every line's full text is in `spec-2b.json`; here the summary, its pin and its mutants.

1. **THE SERVED READ IS X.** `readKerb` as 2.1. PINS: (i) the served region equals `exactRegionOfKey(
   exactKeyContentOfRead(readFace(...)))` byte for byte on every fixture face and the corpus; (ii) a served read calls
   `insertChain`, `opSave`, `mark`, `undoTo` 0 times (dryrun.test.ts's mock form) and leaves `bits(p)` / `state(p)`,
   the batch's work and warnings untouched; (iii) a face with one reaching vertex-only spine and no edge spine is
   written by `corridorUnion` (DESIGN-10's pin); (iv) the splits equal `splitsOn` on a fresh `readFace` after a T is
   added from the other side. MUTANTS: the region from X_U (unreduced parts); the spine map without the reaching keys;
   `splitsOn` over the edge spines only; a dry run left on the path; the census built from the construction.
2. **THE WIRING AND THE BOUNDARY** (W2, **[OPEN 1]**). PINS: the moved bodies byte-identical (a scripted diff quoted);
   `corepack pnpm lint` exit 0 with the seam's rows; kerb.ts 20 / 8 unchanged; no import cycle (kerb.ts gains no
   import of an `arr/` sibling it did not have). MUTANTS: a noun-bearing helper name (lint red, 21 > 20); the
   `kerbParts` call kept (lint red).
3. **THE CONSTRUCTION, DEBUG-ONLY, AND THE PROVIDER CONTROL** (**[OPEN 6]**). PINS: `constructionRead` ≡ the base
   mirror's `readKerb` on the corpus (KernelResult JSON, warnings included); `setReadProvider` returns false with
   `DEBUG_BUILD` false (`shadow-prod` form) and its provider is honoured only in a debug build; the production bundle's
   code part holds none of `constructionRead`, `dryInsert`, `dryRegion`, `censusRead`, `restagedRead`,
   `setReadProvider`'s body (S20 row 206 (3)'s method). MUTANTS: the provider honoured without `DEBUG_BUILD`;
   `constructionRead` skipping the faithful read; `setExactShadow` / `anyBuild` left in the tree (the bundle pin).
4. **THE SHADOW INVERTED.** `ReadShadow.done` hands the served X read; the test-side observer runs `constructionRead`
   beside it. PINS: on / off SeedRecords byte-identical at the four test-size seeds; one start and one done per read,
   on a refused read and on a throwing widths callback (S20's HM pins re-aimed). MUTANTS: done before the census is set;
   the observer reading a second `readFace` with the caller's widths.
5. **X'S REFUSALS ARE TYPED** (**[OPEN 4]**). `exactRegion`'s two planarity `check`s become `err('E_INVARIANT',
   EXACT_PLANAR)` on the served path (message pinned verbatim). PINS: a planted non-planar input refused typed, never
   thrown; the stage's refusal path reached. MUTANT: the `check` restored.
6. **S9 COMMITS X** — `bandUnion.ts` unchanged unless [OPEN 3] rules otherwise; `offRead` measured. PINS: the testkit
   arr-bands agreement on S9's commit of X; a B-CLOSE fixture whose run vertex the commit attracts (its outcome as
   ruled). MUTANT: `offRead` reading `constructionRead` instead of the served read.
7. **THE FRAME-SIDE END RULE** (section (3), **[OPEN 7]**). PINS: the literal (an oblique lane end on a way laid along
   the frame, hw_lane > hw_way); `endsOf` agreeing with `junctionEnd` on S18's 15 frame-side networks (their 11 + 7
   reads judged, not dropped). MUTANT: `endsOf` with the old `onFrame`-first clause.
8. **NO MEMO; THE HIT RATES REPORTED** (**[OPEN 2]**). A measurement row.
9. **THE BANDS FOLDER RE-JUDGED; Q152's SIX** (**[OPEN 8]**). Each moved pin with before / after and the definition
   oracle's two-sided verdict on the region between them; construction internals re-pointed to `constructionRead`.
   MUTANTS: one re-pin per group taken from X_U instead of X (the two-sided check red).
10. **THE DECLARED SHIFT AND ITS CONTROL.** FAILING: with the provider serving `constructionRead`, the tree's roots,
    `report.json` (fusion 3, integrated 4, one worker) and S8's counts equal the base mirror's byte for byte; with X
    served, the stage roots S1 – S5 equal and S8's moved (driver.ts's stage roots quoted). The measured re-pin list
    (section (4)) bound before the launch. MUTANT: a second change on the served path (e.g. `readFace`'s cache
    disabled) — the control red.
11. **THE CITY BARS** (the runner as S20's, adapted; fusion 3 and integrated 4 at CITY, the four test-size seeds).
    FAILING: (a) the definition oracle on every distinct key — 0 faults, not VOID, every unjudged class listed;
    (b) J785's local arbitration of the construction beside X — 0 X-WRONG reads on judged faces; (c) X's typed
    refusals 0 and exceptions 0; (d) S8's refused districts ≤ base and S9's refused unions (`s9Refused`) ≤ base (0 / 0
    on the 50-seed CITY smoke, Q117; the construction refused 0 reads at both CITY seeds [S20: T1]); (e) the S8 ≡ S9 hard bar `beyond` 0 within `S8S9_BOUND_SQ`;
    every block's seed in its own committed face; (f) the B-FUZZ bands census: no class rises (the kerb row's
    insertChain refusals expected 0); (g) the deterministic cost bar: on S8's count window, `dryRun`, `dryInsert`,
    `dryRegion`, `censusRead`, `readOn` 0 calls and `insertChain` / `opSave` / `mark` reduced by exactly the reads'
    share (base 104 151 / 3 993 / 383 920 at fusion 3 [S20: row 206 (2)]). CONTROLS: `--plant-oracle 10` FAILS;
    `--plant-relation 10` (J785's form) FAILS. REPORTED: the exact-0 share, the drift clause, the pinned-first count,
    the repeat counts by caller (S8's `kerbFace`, `kerbSeed`, the needle floor, `makeBlock`; the harness's `s8s9`,
    `corridorUnion`, `offRead`), both memo keys' hit rates.
12. **THE COST, REPORTED** (J558 (2): a cloud box's timing is informative). S8 plain prod ms a cut before (53.38
    [S20: T6 (2)]) and after; per read, separately: `readFace`, the key, `exactRegion` (both calls), `splitsOn`
    (`--mode cpu` with each name, one run at a time on the idle box); reads a cut by caller; GC share; `orient2d`
    calls (+30.5 M a seed with X [S20: row 209]); the work counters per district (`cut.kernelCalls`,
    `cut.recursionDepth`, `cut.candidates`) and work-limit hits; the 100-cut window slope (BARS-15's form: the read's
    own term per window, the total beside the base's). 986 (e) (1)'s 50 µs and (2)'s 16 ms a cut quoted, never a bar.

The closing check re-kills every mutant, re-runs the runner and both controls, judges the arbitration with its own
probe on the 20 largest differences per CITY seed, dissects the 10 largest X ≠ X_U cases (F0-10), and confirms the
bundle and lint pins itself.

---

## (6) Scope

Files outside M0-a-09's owns that the round needs changed, all by the session, none by a seat:

| file | owner | change | why minimal |
|---|---|---|---|
| `plat/tools/lint/kernel-boundary.allow.json` | M0-d-07 | W2: remove the two `arr/kerbExact.ts` rows (a shrink). W1 instead: raise `arr/kerb.ts` string `kerb` 8 → 9 (a boundary change) | rows only; the list's rule (a row matching nothing fails) forces it in the landing commit (J752 (c)) |
| `plat/docs/build/M0-work.json` | the session (record `session-m0-work`) | W2: the `kerbExact.ts` owns line removed or marked deleted; re-landed as J744 (3) did | one line |
| `kernel/test/tx/savepoint.test.ts`, `cost.test.ts`, `oracle.test.ts` | M0-a-06 | re-point `kerb(...)` to `constructionRead` by path (an import and the calls; no assertion changed) | without it they go red (F0-3) |
| `bench/src/fusion/measure.ts:81`, `bench/test/fusion/hausdorff.test.ts` | M0-c-06 | only if [OPEN 5] rules the floor changed | one constant and its assertions |
| other items' pinned literals of section (4) | as listed | re-recorded by session seams, each in the declared-shift record | measured list only |
| `docs/ARCHITECTURE.md` §3.7 | the session | the P paragraph replacing 986 (c)'s, and GEO-9's exception (F0-4) | text, at the landing; the owner's veto |

The round itself writes only inside M0-a-09's owns. Because the lint row, the owns line and M0-a-06's three test files
are other owners' and the §3.7 text is a design change, the spec needs its own adversarial review (J631 (2) (a)) — the
cross-item part is small and mechanical, and the review should be told so.

---

## (7) Open questions for the session

1. **The wiring.** W1: `kerb.ts` imports `exactRegionOfRead` from `./kerbExact.js` (an ES-module cycle; kerb.ts's string
   row 8 → 9, a boundary change; smallest diff). W2: fold `kerbExact.ts` into `kerb.ts` (no cycle, rows only shrink;
   a large mechanical move; the S18 / S20 tests' imports re-pointed). W3: a side-effect registration — rejected
   (`"sideEffects": false`). **Recommend W2.**
2. **The memo.** None in 2B; S18's key; the face-record key. **Recommend none in 2B**, both hit rates reported by
   caller, the choice made at the re-profile with item 988's fabric work.
3. **`offRead` under P.** (a) Unchanged code, measured: any S9 refusal it causes fails the round; (b) its test read
   against the served X with N-57 (2)'s bound instead of the 1 cm boundary reading; (c) retired, since a later L1 read
   can no longer read the outline differently. **Recommend (a)** for 2B with the pinned-first count reported, and (b)
   pre-ruled as the fix if (a) shows refusals — so a fix round does not wait for a ruling.
4. **X's planarity failure.** A `check` (a throw, a bug) or a typed `E_INVARIANT` refusal on the served path.
   **Recommend the typed refusal**, counted in the census and failing at CITY if non-zero; the `check` stays inside
   the library for its unit pins.
5. **The S8 ≡ S9 exact-0 floor (0.95, M0-c-06's).** (a) Keep it failing; (b) REPORTED in 2B, the hard bound (`beyond`
   0) failing, and the floor re-set by the session on the 1 000-seed run after 2B; (c) withdraw it. **Recommend (b)**;
   986 (e) (3)'s 0.91 / 0.95 between derived and construction is withdrawn (F0-5).
6. **The construction's fate.** Removed now, or kept one round debug-only as `constructionRead` with the provider
   control and the inverted shadow. **Recommend keep one round**, removed by the next M0-a-09 round after the re-profile,
   with a queue row for M0-a-06's dry-run generator.
7. **The frame-side end rule.** The code's reading (flat on a way laid along the frame) or the oracle's (the declared
   cap). **Recommend the code's**, with `endsOf` corrected and the literal pin (section (3)).
8. **Q152's six.** Re-judged in 2B on X (J742 R-C) as section (4) says, with the construction internals re-pointed to
   `constructionRead` and group B's cause taken from M0-a-05 S14's verdict. **Recommend yes**; the six leave the
   declared red set at 2B's landing or the round fails.
9. **Sequencing.** 2B opens after S20 lands (its closing check passed), M0-a-05 S14 lands, and the session's re-run of
   S20's runner on the merged tree (J769) with J785's rebuilt T2. Beside the J757 / J776 merged round (file-disjoint),
   never straddling one gate run; the second to land re-records roots. **Recommend this order**, and the re-pin list
   measured on the head 2B opens on.
10. **The architecture text and the owner.** P departs from 986 (c)'s wording ("derived for the two children at the
    cut", "read once by the construction and kept"; J742 R-B already put the departure to the owner) and needs GEO-9's
    exception (F0-4). **Recommend** the session writes both at the landing, the round's choices row naming them, the
    owner's veto standing.
11. **The round number.** S21 if S20 passes its first check; S22 if S20 needs a fix round (J769). **Recommend keying at
    render**, as render.mjs:36-41 does.
12. **One round or legs.** **Recommend one round on M0-a-09**, cross-item edits as session seams (section (6)).

---

## (8) Weak points an adversarial review should attack

1. **The 176.5 cm X ≠ X_U column (F0-10).** If X's census reach on X_E is wrong on some vertex-only contacts, P serves a
   wrong kerb on exactly the class the CITY oracle judges most leniently. Nobody has dissected a single case.
2. **The oracle's resolution at CITY (F0-9).** "0 faults" at a median 76 cm step is weak evidence for errors under a
   metre. J785's local arbitration helps only where the construction and X differ; where both are wrong the same way
   it sees nothing.
3. **S9's commit of X is unmeasured (F0-6).** `bandUnion.ts`'s closing machinery was tuned on the construction's region
   (its contacts already arena vertices); `offRead` may now fire on lawful attractions. The S8 ≡ S9 hard bar, the
   seeds-in-faces property and the S9 refusal census are the bars that would catch it, and they have no figure yet.
4. **The cost (F0-1 (d), F0-2).** `readFace` and `splitsOn` are untimed; the production X figures are internally
   inconsistent; the 11.46 ms estimate mixes populations. P could land at 15 ms a cut rather than 11.
5. **The memo inference (F0-1 (b)).** That S8 repeats a key on about 4 % of its reads is inferred from two counts, not
   counted. If wrong, [OPEN 2]'s recommendation is weaker.
6. **Robustness outside six seeds (F0-8).** X has never served the 12 000 B-FUZZ bands networks; `exactRegion`'s
   snap-rounding repeats (at most four) and its `check` are the failure modes.
7. **The provider control's power.** It proves the shift is "X instead of the construction" only if `constructionRead`
   is byte-identical to the base's `readKerb`; a seat that edits the construction while moving it defeats the control.
8. **Rubber-stamped re-pins (BARS-14).** Q152's six and the fabric's literals can be re-recorded to whatever the tree
   prints. The two-sided check on the region between old and new pins is the only guard; the review should check it is
   asked for on every moved literal, not only the six.
9. **The H costs are inferred.** H was never built; its costs here come from T4 – T6's counts and times, and its
   identity was measured with exact parents (its best case).
10. **The exact-share collapse (F0-5).** If the share falls far, a correct build fails c-06's test unless [OPEN 5] is
    ruled first; if the session keeps the floor, the round can fail on a law, not a defect.
11. **GEO-9 (F0-4).** A reviewer may hold that shipping `exactRegion` needs the owner's word before the build, not at
    the landing.
12. **Token arithmetic (F0-12).** The 20 / 8 counts after W2 are this seat's estimate with the lint's scanner on S20's
    file; a helper or type name that carries `kerb` (a `KerbRead` in `constructionRead`'s signature, say) raises a row.
    The line tells the seat to restructure such a name or stop.
13. **The S20 figures may move.** J785 re-runs the six ON runs; T1 and T3 – T6 "stand where the re-run reproduces them";
    a moved figure is a finding, and this draft would need re-reading against the closed tables.
