# Q133: why eight integrated CITY derivations abort in S6 with E_INVARIANT

The Q133 diagnosis seat, 2026-10-30. Read-only: nothing was written under `plat/` or `docs/` (`git status` stays clean), and the
only git write was the detached worktree `/home/user/maps-scratch/q133-4abd334a`. Every script and output is in this folder.

> Landed by the managing seat (J636, 2026-10-30) from the Q133 diagnosis seat's scratch folder. The driver and probes are in `probes/`, the probe outputs in `out/`; the per-seed JSON outputs (the runs' summaries and S6's captured inputs) were not copied — §8's commands regenerate them on the trees named. Where §8 and §9 say `$Q` or the scratch path, read this folder.

## 0. Bottom line

* **All eight still abort on the head.** `plat/` is byte-identical at 96c17417, 78da3d0 and 9038043; the branch moved to
  9038043 during this seat, through docs-only commits. Each seed gives S6:E_INVARIANT with the **same message as on 4abd334a**.
  On 4abd334a the driver reproduces the 1 000-seed run byte for byte: `rootS5` and the final `root` equal the chunk records
  for all eight seeds and for control seed 74.
* **Every refusal comes from M0-e-04's `settlementPerimeter`, before S6's batch opens.** Nothing is committed: the S6 stage
  root equals the S5 root. Only the perimeter's overlay fallback (`perimeter.ts:78–88`) refuses, and the code enters that
  fallback only when both fast rings fail. There are three sub-classes:
  * **A, the union refused (5 seeds: 73, 243, 310, 751, 999).** The message is `settlementPerimeter: the union: insert: no
    route … keeps clearance (§3.10) within the fidelity bound (N-43); class W|S (notBuilt #2, M4) …`. This is the kernel
    router's refusal (KI-1), raised at `insertChain.ts:1059` and relayed through `booleans` → `buildOverlay`. It is **Q64's
    class**: same text family, same site. It now appears at S6's own 50 m offset on the grown stage-3 outlines.
  * **B1, the sum check falsely refuses a correct ring (1 seed: 195).** The refusal is S6's own check, `perimeter.ts:87`
    (`isSumRing` :291). It is M0-e-04 note 10's class in the near-collinear form that Q21's exact `mergeCollinear` does not
    reach.
  * **B2, the overlay ring carries a spike past the tolerance (2 seeds: 253, 476).** The refusal is S6's own check,
    `perimeter.ts:87` (`isSumRing` :286, the lower bound). The overlay ring has an acute spike of 9° and 13° whose tip lies
    106.8 cm and 106.2 cm inside the 50 m offset, against a tolerance of 104 cm. The check is right to refuse that ring.
* **Input kind (N-58).** The seed is LAWFUL: the CITY fixture is the harness's own. S6's input, S5's last boundary, is OUR
  OWN INTERMEDIATE and is lawful geometry (simple, counter-clockwise, least edge 2.99 m, sharpest angle 71.2°). The
  refused operand is S6's own full convolution, also OUR OWN INTERMEDIATE. The verdict is **(a) MAKE-IT-SUCCEED for all
  eight**.
* **Why integrated and not fusion.** The fusion run has **no S6 at all**: `runRegistry` drops S6 and S8 and registers
  `fusionS8Stage` over S5's walled faces. S1–S5 are identical between the two runs (their `rootS5` values are equal in the
  chunks), so the only difference that exposes the abort is that the integrated run computes S6's perimeter.
* **S6 can commit once it has a perimeter.** I gave S6's own batch (`s6Batch` through `kernel.tx`) the ring of the existing
  reference form `settlementPerimeterByBuffer`. The batch commits on all eight seeds, with 32–39 districts and about 258–260
  ha of land.
* **Owner (recommendation): M0-e-04 as the primary owner of Q133.** All eight refusals are raised in or relayed by
  `settlementPerimeter`, three are its own check, and an S6-side change can close all eight. The five A seeds also join
  **Q64 / census R-06 / KI-1** as evidence for **M0-a-05's** router round, since the refusal replays on bare `insertChain`
  calls.

## 1. What was run

* **Driver.** `derive-one.mts` calls the harness's own `derive('integrated', seed)` from `bench/src/fusion/runs.ts:332`.
  This is the entry the old `driver/chunk.mts` reached through `tasksOf`, `runTasks` and `runTask`. It prints what the
  SeedRecord drops:
  * the full bug rows;
  * the runner's `model.refusals` with the **detail** (`runner.ts:371–373`; the bug row keeps the code only,
    `report.ts:345–346`, and the record keeps `${stage}:${cls}`, `measure.ts:723`);
  * the S6 report entry, the stage stamps and every stage root, compared with the chunk record;
  * S6's input, written to `*.s6in.json`: S5's last boundary, the frame, the stage outlines, the walls and the ways' ids and
    classes. It is a pure read taken through a planted wrapper before S6 runs; the stage runs unchanged.
* **Trees.** The head checkout `/home/user/maps-architecture/plat` (outputs tagged `head-96c17417`) and the detached
  worktree `/home/user/maps-scratch/q133-4abd334a/plat` at 4abd334a (outputs tagged `orig-4abd334a`).
* **Timings.** Each failing seed's `derive` takes 12.5–17.8 s wall-clock, run one or two at a time (S8 idles after the
  abort). Its S6 stamp of 2.2–5.8 s is all
  perimeter time. A clean control takes 173–191 s, of which S8 is 161–177 s.

## 2. The eight seeds

Every seed was run as an integrated derivation. Each row has the same bug row: `{cls: 'E_INVARIANT', entity:
'town:10bqcwtcw044g', key: 'S6@town:10bqcwtcw044g', stage: 'S6'}`. The detail below is `model.refusals.get('S6').detail`,
verbatim, and is identical on the head and on 4abd334a. `rootS5` and `root` equal the chunk record on 4abd334a for all
eight seeds.

| seed | aborts on the head | aborts on 4abd334a | stage, code | the message (verbatim) | sub-class | where it is raised |
|---|---|---|---|---|---|---|
| 73 | yes | yes | S6, E_INVARIANT | `settlementPerimeter: the union: insert: no route from (-8530, 87011) to (-9283, 87375) keeps clearance (§3.10) within the fidelity bound (N-43); class W (notBuilt #2, M4): the design route's farthest vertex (-9157, 87405), 81.8 cm off` | A | `insertChain.ts:1059` (`readings`) ← `winding.ts:189` (input segment s2311 of 3 879 = convolution segment #1635, 836 cm) ← `booleans.ts:42–43` ← `perimeter.ts:80–81` |
| 195 | yes | yes | S6, E_INVARIANT | `settlementPerimeter: the overlay's outer ring is not the boundary's offset (the sum check failed)` | B1 | `perimeter.ts:87`; `isSumRing` `:291` (no single edge near both ends) |
| 243 | yes | yes | S6, E_INVARIANT | `settlementPerimeter: the union: insert: no route from (-84183, 22037) to (-84159, 22313) keeps clearance (§3.10) within the fidelity bound (N-43); class S (notBuilt #2, M4): the design route's farthest vertex (-84071, 22220), 95.4 cm off` | A | `insertChain.ts:1059` ← `winding.ts:189` (s2956 of 4 027 = convolution segment #2269, 252 cm; its start was attracted 25 cm to (-84183, 22037)) ← `booleans.ts:42–43` ← `perimeter.ts:80–81` |
| 253 | yes | yes | S6, E_INVARIANT | `settlementPerimeter: the overlay's outer ring is not the boundary's offset (the sum check failed)` | B2 | `perimeter.ts:87`; `isSumRing` `:286` (lower bound) |
| 310 | yes | yes | S6, E_INVARIANT | `settlementPerimeter: the union: insert: no route from (-27717, 81236) to (-27525, 81095) keeps clearance (§3.10) within the fidelity bound (N-43); class S (notBuilt #2, M4): the design route's farthest vertex (-27712, 81132), 80.9 cm off` | A | `insertChain.ts:1059` ← `winding.ts:189` (s2303 of 3 853 = convolution segment #1634, 238 cm) ← `booleans.ts:42–43` ← `perimeter.ts:80–81` |
| 476 | yes | yes | S6, E_INVARIANT | `settlementPerimeter: the overlay's outer ring is not the boundary's offset (the sum check failed)` | B2 | `perimeter.ts:87`; `isSumRing` `:286` (lower bound) |
| 751 | yes | yes | S6, E_INVARIANT | `settlementPerimeter: the union: insert: no route from (57853, 80850) to (57875, 80875) keeps clearance (§3.10) within the fidelity bound (N-43); class S (notBuilt #2, M4): the design route's farthest vertex (57932, 80820), 79.1 cm off` | A | `insertChain.ts:1059` ← `winding.ts:248→256` (`bridgeGaps`, called at `:191`: all 4 197 input segments insert, and the refused chain is the 33 cm bridge over a run of collapsed sub-`minEdge` convolution segments) ← `booleans.ts:42–43` ← `perimeter.ts:80–81` |
| 999 | yes | yes | S6, E_INVARIANT | `settlementPerimeter: the union: insert: no route from (-80536, 37333) to (-80509, 37588) keeps clearance (§3.10) within the fidelity bound (N-43); class S (notBuilt #2, M4): the design route's farthest vertex (-80450, 37397), 78.8 cm off` | A | `insertChain.ts:1059` ← `winding.ts:189` (s2724 of 4 189 = convolution segment #2020, 256 cm) ← `booleans.ts:42–43` ← `perimeter.ts:80–81` |

### What every row shares

* **The relay path is the same** (paths under `plat/packages/layout/src/`):
  * `settlementPerimeter` (`districts/perimeter.ts:57`) refuses.
  * `runS6` (`districts/stage.ts:466–467`) passes it on with no prefix. A refusal from S6's batch would read `S6: the
    perimeter: …` (`stage.ts:281`), and none does.
  * `s6Stage().run` (`stage.ts:521`) → the base's `stageS6.run` (`pipeline/base.ts:766–767`, `refused`) → the runner
    (`pipeline/runner.ts:371–373`) rolls the stage back and writes the bug row.
* **Nothing was committed.** The S6 stage root equals the S5 root (73 head: `33f9ef08…` for both). The S6 report entry
  cannot show this: S6 runs its batch through `kernel.tx`, not the runner's batch door, so its work counters read 0 on clean
  seeds too. The batch never opened: the message lacks `stage.ts:281`'s prefix and comes from the `settlementPerimeter`
  call before `s6Batch`. S8 finds no `s6` and returns at once.
* **The location the entry carries.** The bug row has no location. For sub-class A, the detail names the refused
  segment's landed ends and the design route's farthest vertex. For B, the detail names nothing; the probes in §4 find the
  failing ring edge.
* **Head against 4abd334a.** On the head, `rootS5` differs from the chunk for every seed. Stage roots diverge from S3 on;
  S1 is equal (checked on 73, 195 and 999). Two `plat/` commits since 4abd334a touch packages:
  * e73f679 (M0-c-02 S5: `enceinte/pull`, `strips`, `trace`, `types`, `water`);
  * ba6a82e (M0-x-04 S1: `pipeline/base.ts`).
  Neither touches `districts/`, `kernel/src/arr` or `kernel/src/insert`. **S6's captured input is identical on both trees
  for all eight seeds**: boundary, frame, stage outlines, walls and the ways' ids and classes. The perimeter is a pure
  function of the boundary, so the refusal is too.
* **The commits between 4abd334a and the head that touch `plat/`** (`git log --oneline 4abd334a..HEAD -- plat/`): 239ea3b
  J628, 86139d0 J627, aa35a98 J622, 526e6e9 J620, 8d5ffdc J618, 84b361c J615, 27585ff, e73f679 (c-02 S5), 1403547,
  0c7855a (e-06 S2), 44694be (f-03b F0), ba6a82e (x-04 S1), fb9b79b (c-07 F0), 8c5fc20 (t-00 F0). Only e73f679 and
  ba6a82e change package sources (above).

## 3. The control seeds

| seed, tree | bugs | S6 | districts | stamps (ms) | roots |
|---|---|---|---|---|---|
| 1, head | `[]` | ok, perimeter of 1 575 points, 259.02 ha | 31 | S5 5 279, S6 1 168, S8 164 732 | (not in the chunks) |
| 2, head | `[]` | ok, 1 569 points, 258.63 ha | 31 | S5 7 533, S6 1 312, S8 176 685 | (not in the chunks) |
| 74, head | `[]` | ok, 1 638 points, 258.33 ha | 34 (34 in the chunk) | S5 6 673, S6 968, S8 161 056 | differ from the chunk (the S3 change above) |
| 74, 4abd334a | `[]` | ok, 1 638 points, 258.33 ha | 34 | S5 7 458, S6 1 172, S8 174 879 | **`rootS5` b51cfa08… and `root` 68d61b4f… = the chunk record (byte for byte)** |

On control seed 1 the fast mitred ring stands at once (87 ms; `simpleCcw` true, `isSumRing` at 5 cm true), so the overlay
is never entered (`probe-control-1.txt`).

## 4. Reading the throw sites

### 4.1 The perimeter's three constructions (`perimeter.ts:57–99`)

1. **The fast rings come first.** Fast ring 1 is the convolution mitred at reflex vertices; fast ring 2 is mitred only
   where the miter lies on both offset segments. Each has its local folds cut by `unloop` (window `UNLOOP_WINDOW` = 64 edges).
   A fast ring stands only if it is `simpleCcw` and passes `isSumRing` at `SUM_TOLERANCE_CM` = 5 cm (`:72–77`).
2. **Otherwise the overlay runs.** `full = convolution(b, d, 'arc')` is the full convolution: at each reflex vertex it runs
   the arc backwards, so it carries every swallowtail fold. Then `u = k.geom.booleans('union', [b], [full], 'nonzero')`
   (`:79–81`).
3. **The overlay's ring is checked.** It must be `simpleCcw` (`:86`) and pass `isSumRing` at `OVERLAY_TOLERANCE_CM` = 4 ×
   `attractCm` = 104 cm (`:87`, `:229`). A ring that fails is refused, never returned.

In all eight seeds both fast rings fail (`probe-head-all.txt`):

* **Fast ring 1** is non-simple (253, 476, 999). Otherwise it fails `isSumRing`'s lower bound at 5 cm: a ring edge
  comes 4 755–4 934 cm from some boundary edge, so it cuts into the sum (73, 195, 243, 310, 751).
* **Fast ring 2** is non-simple on every seed but 751. `unloop`'s greedy windowed cut left these folds: the
  self-crossings are between edges 19–97 apart in the unlooped ring (60 for 73, 97 for 195, 62 for 243, 22 for 253, 61
  for 310, 19 for 476, 23–60 for 999). On 751 it is simple but fails `isSumRing` at 5 cm.

S5's last boundary is a stage-3 outline of about 250 ha with 655–704 vertices. About half of them are reflex: it is a
wiggly grown contour.

### 4.2 Sub-class A: the overlay's `insertChain` refuses (73, 243, 310, 751, 999)

**The origin.** The text comes from `readings()` (`plat/packages/kernel/src/insert/insertChain.ts:958`; the refusal at
`:1059`), called from `routeOne` (`:887`) inside `insertChain` (`:1106`). Its class comes from `refusalClass`
(`:1080–1100`): S is "a crossing on the placement rule's endpoint fallback … a sliver or fan of edges closer than
`minEdge`", and W is "a wedge corner or a corner's exit". The design route's farthest vertex is 78.8–95.4 cm off, against
the fidelity bound of 2√2 · `attractCm` = 73.5 cm.

**The overlay inserts every segment as its own chain.** `buildOverlay` (`plat/packages/kernel/src/arr/winding.ts:112`)
inserts the frame and then every distinct input segment as its own two-point **mandatory** chain (`:181`). It passes any
refusal other than `empty` straight back (`:189`), and so does `bridgeGaps` (`:248`/`:256`). `booleans`
(`arr/booleans.ts:39–43`) returns that refusal as it is. `overlay-probe.mts` replays `buildOverlay`'s loop with the
kernel's own modules and reproduces the refusal at the input segments listed in §2. Every refused segment is in
**operand B, S6's full convolution**. On 751 every segment inserts, and the bridge chain is the one refused.

**The geometry.**

* **The refused segment always runs through the sum's interior.** Its ends lie 41–48 m from the boundary
  (73: 4 228 and 5 000 cm; 243: 4 678 and 4 519; 310: 4 617 and 4 477; 999: 4 652 and 4 510; the 751 bridge: 4 103 and
  4 132).
* **It sits in a dense tangle of the full convolution.** 8–16 other convolution segments cross it or pass within 104 cm
  (4 · `attractCm`) of it: 9 for 73, 14 for 243, 16 for 310, 8 for 751 and 9 for 999. Of these, 2–6 cross it, and the
  nearest that do not cross pass 1–18 cm away (243: 1 cm; 751: 5 cm; 310: 15 cm; 999: 16 cm; 73: 18 cm). These are the
  reverse arcs and crossing offset edges of the folds (`probe-head-all.txt`).
* **The tangle is the outward offset of a concave bay** (`bay-probe.txt`). Each bay is a run of 4–12 consecutive reflex
  vertices, with turns of −2.9° to −28.0° on edges of about 6–15 m and a net turn of 68.5°–127.2° over 42–98 m. Its mean radius of
  curvature is 35–50 m, locally below the 50 m offset, so the offset folds into swallowtails there. The bays are vertices
  #332–#339 (seed 73), #457–#464 (243), #323–#334 (310), #272–#275 (751) and #423–#430 (999).
* **The refused geometry is not on the answer.** The ring the union would return lies elsewhere, at 50 m. The refused
  segment is an interior fold segment that the union only needs in order to label winding numbers.

### 4.3 Sub-class B1: the sum check refuses a correct ring (195)

**The failing edge.** `isSumRing` fails at `:291`: ring edge 257, (67042, -51901)→(68308, -49747), is 24.98 m long, and no
single boundary edge lies within d + tol = 5 104 cm of both its ends. The best single edge, #60, is at 5 000.6 cm and
5 154.2 cm. The edge's ends are nearest edges #59 (5 000.6 cm) and #62 (4 999.5 cm). The ring edge runs beside boundary
edges #60–#62, which turn only −0.049° and −0.018°. They are near-collinear but not exactly collinear, so `mergeCollinear`
(`:116–129`, orient2d = 0 only) leaves them.

**The ring is right by the sum's definition** (`spike-probe.txt`). Measured against the boundary as a whole, 257 samples
per edge, no ring edge leaves the shell [4 896, 5 104]. The ring's least distance is 4 928.4 cm and its greatest is
5 022.4 cm, and along edge 257 it is 4 999.5–5 000.6 cm. The buffer form's ring has the same edge and fails the same
clause.

This is M0-e-04 **note 10**'s class: "the sum check falsely refuses correct overlay rings on boundaries with collinear
vertices … no single edge is near both ends". Q21 / N-56 (2) closed it only for **exactly** collinear vertices, and the
hardening inventory marks note 10 DONE through Q21.

### 4.4 Sub-class B2: the overlay ring has a spike past 4 · `attractCm` (253, 476)

**The failing clause.** `isSumRing` fails its lower bound at `:286` on two ring edges that meet at an acute spike (9° on
253, 13° on 476):

* **253:** ring edges 1249 and 1250, (-88391, 11319)→**(-88421, 11549)**→(-88292, 11110). The tip is 4 893.2 cm from
  boundary edge #424, i.e. **106.8 cm inside** the offset.
* **476:** ring edges 302 and 303, (87472, -27162)→**(87384, -27053)**→(87554, -27188). The tip is 4 893.8 cm from edge
  #66, i.e. **106.2 cm inside**.

The tolerance is 104 cm, so the spikes overshoot it by 2.2–2.8 cm. Each tip is a vertex of the full convolution itself:
conv #2046/#2047 on 253 and #360/#361 on 476. In the exact union that point is interior, and convolution vertices within
3 m reach 4 999.8 cm and 4 996.4 cm. So the overlay's union leaves a thin exterior sliver reaching into the sum where the
exact union has none, and the check refuses a ring that really is outside its tolerance.

**Where the spikes sit.** Both lie at the offset of a concave bay: #421–#428 on 253 (net −111.8° over 90.6 m) and #62–#69
on 476 (net −44.4° over 54.7 m). The overlay reported `W_ACUTE_CORNER` (8 and 12), `W_PLACED`, `W_STRETCH_SHARED` and
`W_ATTRACTED`. The buffer form's ring passes the check on both seeds.

### 4.5 Is the perimeter S6's only obstacle? (`substitute-probe.mts`, `substitute-*.json`)

After the original refusal, a planted wrapper rebuilds S6's input as the base does (`baseS6Input`, `base.ts:629`). It takes
the ring of `settlementPerimeterByBuffer` (`perimeter.ts:300`), which runs no sum check, and runs **S6's own batch**
(`s6Batch`, `stage.ts:249`) through `kernel.tx`. It then hands the runner the original refusal, so the probe's commit is
rolled back with the stage.

| seed | the buffer ring (points, `simpleCcw`, `isSumRing` at 104 cm) | S6's batch |
|---|---|---|
| 73 | 1 679, true, true | **commits**: 35 districts, 258.73 ha, 135 seams |
| 195 | 1 633, true, **false** (the same near-collinear edge) | **commits**: 38 districts, 258.56 ha, 138 seams |
| 243 | 1 699, true, true | **commits**: 32 districts, 259.55 ha, 123 seams |
| 253 | 1 708, true, true | **commits**: 39 districts, 258.60 ha, 140 seams |
| 310 | 1 649, true, true | **commits**: 35 districts, 258.69 ha, 132 seams |
| 476 | 1 574, true, true | **commits**: 36 districts, 258.54 ha, 134 seams |
| 751 | 1 701, true, true | **commits**: 38 districts, 258.79 ha, 138 seams |
| 999 | 1 697, true, true | **commits**: 35 districts, 258.40 ha, 132 seams |

The buffer form costs about 11.6–12.5 s, contended, against 2–5 s for the convolution overlay; S6's batch then takes
about 0.7 s. Two caveats: the base's second half (the fields' pass 1, `W_LAND_UNCLAIMED`) was not exercised, and
`buffer` itself goes through the same overlay machinery (census R-06 lists it).

## 5. The class, against Q64 and the other rows

**Q64** (`docs/M0-FIX-QUEUE.md:78`) is S6's perimeter refusing E_INVARIANT ("the union: insert: no route … keeps
clearance (§3.10) within the fidelity bound (N-43)") at a **180 m** offset on the flat fixture's S3 outlines 3, 8, 9, 10,
11 and 16 of 1–30. In Q64 all 30 commit at 50 m; the input is LAWFUL; the owner is to be named by the census (M0-a-05 /
M0-a-08 router, or M0-e-04); the verdict is MAKE-IT-SUCCEED.

* **Sub-class A (5 seeds) is the same class as Q64.** It has the same message family, the same site
  (`perimeter.ts:80–81` → `booleans` → `buildOverlay` → `insertChain.ts:1059`) and the same cause. What is new:
  * it fires at S6's **production 50 m offset**, on the integrated pipeline's grown stage-3 outlines, in 5 of 1 000
    seeds;
  * Q64's "all 30 commit at 50 m" holds only for S3 outlines;
  * M0-e-04 note 11 had already seen one synthetic "dense slit blob (seed 22) at 50 m" in this class.

  The refusal census places this exact path in **R-06** (`plat/docs/build/checks/refusal-census.md:87`: "insertChain's
  E_INVARIANT … reached through the arr overlays … `settlementPerimeter`'s union"). R-06's input kind is OUR OWN
  INTERMEDIATE, its verdict is **(a)**, its owner is **M0-a-05 (router), with M0-a-09 / M0-a-08 as callers**, and it is
  tied to **KI-1** (`docs/KNOWN-ISSUES.md:19`).
* **Sub-class B (3 seeds) is not Q64.** It has a different message and a different site: S6's own check at
  `perimeter.ts:87`. It has two sub-kinds:
  * **B1 (195)** is M0-e-04 note 10's class (`plat/docs/build/checks/M0-e-04-notes.md:71–91`) in its near-collinear form.
    Q21 (`M0-FIX-QUEUE.md:33`, DONE 0cc9b533) fixed only exactly collinear vertices. No open row covers the remainder.
  * **B2 (253, 476)** is new. No queue row, census row or note covers an overlay ring that is simple but strays past
    `OVERLAY_TOLERANCE_CM`. Related notes are note 15 (the overlay ring was trusted to `booleans`' contract, now checked
    with `simpleCcw`) and the tolerance's own comment (`perimeter.ts:221–229`: the overlay "moved the ring by up to 60 cm
    … four attraction radii bound it").
* **Other S6 rows.**
  * **R-38** (`refusal-census.md:119`) is the union's `insertChain` refusal on a coincident or self-touching boundary,
    which is UNLAWFUL input. That is not our case: all eight boundaries are `simpleCcw`, with the least edge 2.99–4.44 m,
    the sharpest angle at least 71.2° and at most one exactly collinear vertex (`boundary-lawful.txt`).
  * **R-40 and R-41** are the planted zero-area and self-touching cells. They do not apply.
  * **Q122** counts S6 E_INVARIANT on 2 of the site spike's CITY seeds, routed to e-04's next round. The messages are not
    recorded there, so it may be the same family.
  * **Q21** is DONE (above).
* **N-58** (`plat/docs/build/checks/M0-spec-notes.md:69`):
  * the derivation's input, the CITY fixture at the seed, is **LAWFUL**;
  * S6's input, S5's last boundary, is **OUR OWN INTERMEDIATE** and is itself lawful geometry;
  * the refused operand (A) and the refused ring (B) are **OUR OWN INTERMEDIATE**, both built by S6.

  The verdict is **(a) MAKE-IT-SUCCEED** for all eight: "every LAWFUL class, and every OUR OWN INTERMEDIATE class … the fix
  closes them, never refuses them". These are bug-class aborts, and they fail the fusion gate's bugs bar.

## 6. Why integrated but not fusion

`runs.ts:317–329` (`runRegistry`): for `fusion`, the base product's stages are filtered to drop **S6 and S8**, and
`fusionS8Stage` (`runs.ts:210–292`) is registered in their place. Its inputs are `s3.slice` and `s5.growth` only. Its
stand-in districts are S5's walled coarse faces, owned directly, with a ramp in place of S6's pass-1 field. No perimeter is
computed. The integrated run keeps the base's six stages, so `settlementPerimeter` is reached only through the base's
`stageS6` (`base.ts:742–797`) → `s6Stage().run` (`stage.ts:521`) → `runS6` (`stage.ts:464–467`).

S6's would-be input is the same in both runs. The chunks show `rootS5` equal between fusion and integrated for all 16
seeds of the 8 chunks, and the fusion order is S1, S3, S4, S5, S8. The difference that exposes the abort is therefore that
**the integrated run runs S6, and with it the perimeter's overlay fallback**. The fusion run has no S6 to abort.

The 50-seed smoke's zero is unremarkable: at 8 in 1 000 the expected count is 0.4, and P(none in 50) = 0.992⁵⁰ ≈ 0.67.

## 7. The owner

**Recommendation: M0-e-04 (`plat/packages/layout/src/districts/perimeter.ts`) owns Q133. The five A seeds are also added
to Q64 / R-06 as evidence for M0-a-05's router round.**

* **Why M0-e-04.**
  * All eight refusals are raised in or relayed by `settlementPerimeter` (`perimeter.ts:57`), before S6's batch.
  * Three are its own check (`:87` / `isSumRing` `:243–295`).
  * In the other five, the refused chain lies in a fold of S6's own full convolution that is wholly inside the sum: a
    convolution segment, or on 751 a bridge across collapsed ones. That geometry need not reach the overlay at all.
  * With a perimeter ring in hand, S6's batch commits on all eight (§4.5). The perimeter is the only S6 obstacle seen on
    these seeds, so M0-e-04 can close the abort on its own side without waiting for the router. Not yet exercised on these
    seeds: the pass-1 fields and S8.
* **Why M0-a-05 as well.** By census R-06's verdict, a mandatory two-point chain that the router cannot keep within the
  fidelity bound is the router's shortfall (§3.6: a mandatory chain cannot fail for precision). The refusal replays on bare
  `insertChain` calls in `buildOverlay`'s order (`overlay-probe.mts`: frame, then the segments up to the refused one). That
  is a self-contained reproduction for `insertChain.ts:1059` (`readings`, class S/W).

**Fix shapes, read from the code (not fixes).**

1. **For A and B2: keep the full convolution's interior folds out of the overlay.** The refused segments and the B2 spike
   tips all sit in the swallowtails of concave bays (mean radius 35–71 m, locally below the 50 m offset). Options:
   * cut the folds before the union: here the fast rings fail on folds that `unloop`'s greedy, windowed cut leaves (self-
     crossings 19–97 edges apart) or on a ring edge that cuts into the sum (§4.1);
   * or union the convolution in pieces;
   * or, as a fallback when the overlay refuses or its ring fails the check, take `settlementPerimeterByBuffer`. It already
     exists, its ring passes `isSumRing` at 104 cm on 7 of 8, and S6's batch commits on all 8 with it, at about 5× the cost.
2. **For B1: test the upper bound against the boundary as a whole, not against one edge.** Note 10's own suggested
   handling applies: merge near-collinear runs in the check's copy of the boundary, or split the ring edge at most d apart
   and test each piece against its nearest boundary edges. On 195 every ring edge's whole-boundary distance stays within
   [4 928, 5 022] cm, inside the shell.
3. **For A in the kernel (M0-a-05's router round, KI-1).** Make such a mandatory chain through a fan of near-coincident
   crossings commit within the bound.

## 8. Commands (to re-run)

```bash
export PATH=/root/.local/bin:/opt/node24/bin:$PATH        # node --version → v24.12.0
Q=/tmp/claude-0/-home-user-maps-architecture/d499ae8b-5088-523d-96b3-13eb55179f60/scratchpad/q133

# 1. The eight seeds on the head (one alone, then two at a time); writes $Q/out/head-96c17417-integrated-<seed>.json + .s6in.json
cd /home/user/maps-architecture/plat
corepack pnpm exec tsx --conditions=plat-source $Q/derive-one.mts 73 integrated --tag head-96c17417
$Q/run-seeds.sh /home/user/maps-architecture/plat head-96c17417 2 integrated - 195 243 253 310 476 751 999

# 2. The original tree (detached worktree; the install takes about 1 s on the warm store), then the eight seeds there
git -C /home/user/maps-architecture worktree add --detach /home/user/maps-scratch/q133-4abd334a 4abd334a
cd /home/user/maps-scratch/q133-4abd334a/plat && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 corepack pnpm install --frozen-lockfile
$Q/run-seeds.sh /home/user/maps-scratch/q133-4abd334a/plat orig-4abd334a 2 integrated - 73 195 243 253 310 476 751 999

# 3. Controls (full S1–S8, about 3 min each): head 1, 2, 74 two at a time, and 4abd334a 74 beside them; touches $Q/out/controls.done
$Q/run-controls.sh > $Q/out/controls.log 2>&1

# 4. Offline probes on the captured S6 inputs (from the head's plat)
cd /home/user/maps-architecture/plat
S6IN() { for s in "$@"; do echo $Q/out/head-96c17417-integrated-$s.s6in.json; done; }
corepack pnpm exec tsx --conditions=plat-source $Q/perimeter-probe.mts $(S6IN 0073 0195 0243 0253 0310 0476 0751 0999) > $Q/out/probe-head-all.txt
corepack pnpm exec tsx --conditions=plat-source $Q/overlay-probe.mts $(S6IN 0073 0243 0310 0751 0999 0195) > $Q/out/overlay-probe.txt
corepack pnpm exec tsx --conditions=plat-source $Q/spike-probe.mts $(S6IN 0195 0253 0476) > $Q/out/spike-probe.txt
corepack pnpm exec tsx --conditions=plat-source $Q/boundary-lawful.mts $(S6IN 0073 0195 0243 0253 0310 0476 0751 0999) > $Q/out/boundary-lawful.txt
corepack pnpm exec tsx $Q/bay-probe.mts $Q/out/head-96c17417-integrated-0073.s6in.json:-8530,87011 \
  $Q/out/head-96c17417-integrated-0243.s6in.json:-84183,22037 $Q/out/head-96c17417-integrated-0310.s6in.json:-27717,81236 \
  $Q/out/head-96c17417-integrated-0751.s6in.json:57853,80850 $Q/out/head-96c17417-integrated-0999.s6in.json:-80536,37333 \
  $Q/out/head-96c17417-integrated-0253.s6in.json:-88421,11549 $Q/out/head-96c17417-integrated-0476.s6in.json:87384,-27053 > $Q/out/bay-probe.txt
corepack pnpm exec tsx --conditions=plat-source $Q/perimeter-probe.mts $(S6IN 0001) > $Q/out/probe-control-1.txt

# 5. The substitution probe (S6's batch on the buffer-form perimeter; rolled back; the derivation still reports the abort)
printf '%s\n' 73 195 243 253 310 476 751 999 | xargs -P 2 -I{} bash -c \
  "corepack pnpm exec tsx --conditions=plat-source $Q/substitute-probe.mts {} > $Q/out/log-substitute-{}.txt 2>&1"
```

To clean up the worktree when the managing seat is done with it: `git -C /home/user/maps-architecture worktree remove
/home/user/maps-scratch/q133-4abd334a`.

## 9. Files (in `/tmp/claude-0/-home-user-maps-architecture/d499ae8b-5088-523d-96b3-13eb55179f60/scratchpad/q133/`)

* **Driver:** `derive-one.mts`, with the batch helpers `run-seeds.sh` and `run-controls.sh`.
* **Probes:** `perimeter-probe.mts`, `overlay-probe.mts`, `spike-probe.mts`, `bay-probe.mts`, `boundary-lawful.mts` and
  `substitute-probe.mts`.
* **Outputs in `out/`:**
  * `<tree>-integrated-<seed>.json`: the full summary for each run, including the refusal detail, bug rows, S6 report,
    stamps, stage roots and the chunk comparison;
  * `<tree>-integrated-<seed>.s6in.json`: S6's input;
  * `log-*.txt`, `status-*.txt`, `probe-head-all.txt`, `overlay-probe.txt`, `spike-probe.txt`, `bay-probe.txt`,
    `boundary-lawful.txt`, `probe-control-1.txt` and `substitute-<seed>.json`.
