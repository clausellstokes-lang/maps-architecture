# Review of the M0-a-09 S18 / S19 spec draft — lens: the design of the store and the semantics of the derived kerb

Review seat, 2026-11-10, on the design head dba306ef. Findings are appended as established (DESIGN-n).
Files read are cited per finding. No existing file edited; no suite run.

## DESIGN-1 (blocker) — the content key is blind to vertex-only spines, to spine ends' junction flags and to a spine's route beyond the face's own ring; pin (c) enshrines a wrong serve; nothing checks a KEPT entry

**The draft.** S18 LINE 1 required_change: the key is "the read's vertexContacts flag; its L1 route rings … with every
straight-through vertex dropped by straightRun's rule (so the lattice-rounded T-vertex a lane end puts on a neighbour's
spine edge, with no knot, leaves the neighbour's key unchanged …); per route edge its spine keys; per spine its
half-widths sampled at the kept route vertices and its declared ends". Pin (c): "the neighbour across a crossed spine,
read before a cut whose lane ends on that spine at a new T-vertex, is served its entry after the cut"; mutant "the key
without the straight-through drop → (c) red". "An entry is served for F only where F's content key now equals its key
and the generation is the arena's."

**The code.** Today's read depends on more than that:
- `readFace` (kerb.ts:335-427) collects, besides the edge spines, `through` — every chain on a route edge LEAVING a route
  vertex of F that is not F's own (:397-423, J318); `censusRead` keeps those that `reaches` the base kerb (:1735) and
  lays their parts (:1740-1746). A lane a neighbour's cut ends on F's boundary — at a new T-vertex or at an EXISTING
  vertex — is exactly such a chain. §3.7 (ARCHITECTURE.md:5338-5341) makes it a bounding spine of F: "every spine
  through a boundary vertex whose buffer reaches into their kerb".
- A T-junction end is flat on the line THROUGH THE END VERTEX SQUARE TO THE LANE'S LAST SEGMENT (kerb.ts:595-597,
  :697-699), not on the crossed spine's band edge. A lane meeting the crossed line at angle θ therefore reaches
  hw_lane·|cos θ| past the centreline on one side. It enters the far face's kerb wherever that exceeds the crossed
  spine's half-width on that side — always where the crossed chain declares no width (a seam, a setback line, a
  district boundary: kerb.ts:290-301's own Q60 class).
- A lane ending at an EXISTING junction vertex (S8's continuation, bentCutFabric.ts:812 / :1093; ladder.ts:777-783
  admits it only where the crossed spine's class is LOWER OR EQUAL to the cut's — i.e. the arriving lane is at least
  as wide) keeps its declared round cap: `junctionEnd` (kerb.ts:303-324) returns false as soon as another chain of the
  lane's own role ENDS at the vertex (`else if (key.startsWith(role)) return false`). The cap (radius hw_lane ≥ hw of
  the spine it lands on) reaches into the faces on the far side — faces whose rings do not change at all.
- The same line flips OTHER spines' ends: a spine that ended flat at v (another chain passing) gains its declared cap
  the moment a same-role lane ends at v. No ring, spine key or half-width of the affected faces changes.
- `readSpine` reads the spine's WHOLE own-level route (kerb.ts:258) and `spineParts` lays every segment within reach of
  F's BOX (:556-565), F's edge or not: the join at F's corner depends on the direction and half-width of the spine's
  next vertex beyond the corner; the key samples half-widths "at the kept route vertices" of F only.

**So.** (a) F read (entry kept), then a neighbour's lane arrives at F's boundary and its band reaches into F: F's key is
unchanged, the entry is served, and it does not subtract the lane — a block overlapping a corridor ("a block never
overlaps a corridor it does not bound", §3.7). Today S9 reads F afresh and subtracts it. (b) The reverse: F read while a
lane stood at its vertex, the lane taken out (`takeOut`, bentCutFabric.ts:782-792): the entry still subtracts a band
that is gone; "the spines it was read against" are held in the entry but never validated. (c) A spine's route or width
changed beyond F's corner (an M2a edit; at M0 a later chain ending on it): unseen. All three are changes of result
against §3.7, not the intended "read once and kept" (which is the attraction of the insertions, ≤ DRY_MOVE_CM).
Pin (c) asserts (a) as REQUIRED behaviour for every T, and no bar of either round looks at a kept entry again: line 5's
oracles judge "every derived kerb ring" of children; S19 LINE 1's debug oracle runs "beside every DERIVED read";
S8 ≡ S9 reads the same entry on both sides.

**Size at M0 (read, not measured).** S8 lets a lane end on a line with no spine beyond it within 85–95° of square
(`kerbEndsSquare`, ladder.ts:752-769; tables/data/cut.json:50 `portalArrivalCdeg` [8500, 9500]): the flat end's corner
then stands up to hw·cos 85° ≈ 0.09·hw (13 cm at hw 150) inside the face across that line — small, but over oracle
(i)'s 1 cm + sagitta. The continuation case (a wider lane capped at an existing junction) and an oblique end on a
narrower spine are larger and unbounded by a table. The far face is typically ALREADY READ: across a district seam it
belongs to a district S8 finished earlier; at a continuation it is a child of the cut that made the junction. The
folder already holds CITY faces of this kind (kernel/test/arr/bands/vertexcontact-faces.json, J318 / C-0380).

**Proposed change (LINE 1).** Replace the key's spine part by what `kerbParts` actually reads: for every spine of
`f.spines` AND every spine of `f.through` that `reaches` the entry's region, in key order — its `straightRun`-reduced
lines restricted to the segments passing `spineParts`' reach filter for F's box: points, half-widths, `closed`, the two
`junction` flags, `ends`. Serve rule: at a state read, `readFace` runs now (it must, for `splitsOn`); (i) an entry spine
that is no longer in `spines ∪ through`, or whose reduced reach-filtered lines or junction flags differ → not served
(construction); (ii) a current `through` spine not among the entry's and `reaches(s, entry.region)` → not served as it
is: the region less that spine's parts by line 3's clip (a "contact derivation", counted as its own origin) or the
construction; else served. Replace pin (c) by two: (c1) a narrower lane square to a wider crossed spine → served
unchanged; (c2) a lane oblique onto a zero-width chain, and a wider lane ending at an existing junction vertex of the
far face (the continuation case) → the served region has no point deeper than 1 cm + SAGITTA_CM in the lane's buffer
(mutant: the key without `through` → (c2) red). Add (h): a face read while a lane stands at its vertex, the lane taken
out → the old entry not served. Add to line 5 and to S19 a check of KEPT entries: after every cut of the corpus, every
standing face with an entry (not only the children) is re-judged by oracle (i) against its CURRENT spines.

## DESIGN-2 (blocker) — S18's shadow can derive nothing in a stage run: nothing fills the store there, so LINE 6's two gating bars are 0 / 0

**The draft.** LINE 1: "In THIS round only the STATE READ (line 4) fills or serves the store; kerb() and readKerb serve
the construction exactly as today." LINE 4: the shadow runs "after every served read with vertexContacts true of a face
whose state read would DERIVE … The shadow writes nothing, reads the store only". LINE 3: a child derives when "its
parent's key has an entry (or itself derives first …)"; "Where the parent's entry is missing … the child reads by
construction". LINE 6 gates on the shadow at CITY: "(i) 0 derivation defects … (ii) the exact share — faces whose
derived region equals the construction's, over the faces derived — ≥ 0.91".

**The code.** In a stage run every read is `kerb()` (bentCutFabric.ts:653, :729, :924; bench/src/fusion/measure.ts:572 on this tree;
bandUnion.ts:585, :602, :629 via `readKerb`), and S18 keeps all of them on the CONSTRUCTION READ. Nothing in S8, in the
harness or in bench calls the by-path STATE READ (no package imports kernel internals — the draft's own LINE 4
evidence). So when S8 cuts F, F's key has no entry; when a child is read, its lineage points at a key with no entry and
no lineage; the parent no longer stands, so it cannot be constructed late. No face "would derive". The CITY probe
records 0 faces: bar (i) holds vacuously and bar (ii) is 0 / 0. The same holds for derived.test.ts wherever it relies on
the shadow rather than on calling the state read itself.

**Proposed change.** LINE 4: in the debug build the shadow FEEDS the store: after a served construction read (ok,
vertexContacts true) of a face whose key has no entry, the read's `region` is kept as that face's entry (origin
construction, its `attracted` flag with it) — the FIRST served read's, as 2B will keep it; a later served read of an
equal key changes nothing. Strike "reads the store only" and LINE 1's "only the STATE READ fills … the store"; keep
"writes nothing into the arena, the batch or kerbCensus". Add a pin: on an S8-like sequence driven ONLY through `kerb()`
(no state read called by the test) the shadow's diagnostic counts ≥ 1 derived child per cut. LINE 6: add a vacuity
guard as a failing bar — faces derived ≥ 0.9 × the children S8 read on each seed (the count the profile's kerbFace /
kerbSeed stamps give), the two numbers printed.

## DESIGN-3 (major) — LINE 2's observer cannot compute LINE 1's key: the key holds half-widths, and the cut has no widths

**The draft.** LINE 2 evidence says it itself: "splitFace takes no widths (the lane's half-width reaches the kernel only
through the reader's SpineWidths, at the read)". Yet its required_change: "`before` computes the parent's content key
(line 1) while F stands; `after` records … for each child its content key after the cut → {the parent's content key,
the cut's rows …, its side}". LINE 1's key holds "per spine its half-widths sampled at the kept route vertices and its
declared ends", and its vertex drop is "by straightRun's rule" — which itself reads half-widths (kerb.ts:517:
`Math.abs(line.hw[a] + t * (line.hw[b] - line.hw[a]) - line.hw[i]) <= HOT_PIXEL_CM`). Even which chains count as
"spine keys" needs the widths (`readFace` drops a chain whose `widths(chain)` is null, kerb.ts:373-379).

**The code.** `splitFace(o, face, cut, opts)` / `connectHole` (faces/split.ts:171, :204) receive rows only. The reader's
widths are a closure made per call (`spineWidthsOf(this.ctx.widths)`, bentCutFabric.ts:653; the harness uses another
map, `spineWidthsOf(widthMap(d))`, measure.ts:556). Nothing at the cut can sample a half-width.

**Why it matters.** The build seat must invent the join between lineage and entries — the one piece of the store the
ruling was meant to fix — and whatever it invents is unreviewed. One trap is already visible: if the geometric key
drops a straight vertex without looking at widths and the entry key samples half-widths only at the kept vertices, two
profiles that differ by a knot at a dropped vertex share a key.

**Proposed change.** State two keys in LINE 1 / LINE 2. (1) THE LINEAGE KEY, width-free, computed by the observer: the
L1 route rings from their canonical starts, a vertex dropped only where it is within HOT_PIXEL_CM of the chord between
its kept neighbours AND both adjacent route edges carry the same set of level-≤ 1, ordinal-0 chains; per edge that
chain set (every chain, buffered or not). (2) THE ENTRY KEY, computed at a read: the lineage key + the vertexContacts
flag + DESIGN-1's spine part, with a half-width sample at every vertex the lineage key dropped where the sample is not
the linear one (so a knot at a straight vertex is in the key). Lineage maps lineage key → {parent's lineage key, the
lane's PLACED chain (its points — the `after` call can read them from the children's shared edges), rows, side}; the
parent's entry is found at the child's read by rebuilding the parent's entry key from its lineage key and the reader's
widths NOW, and the notes say what happens when a width answered differently then (no entry → construction, counted).
Record the placed chain, not only (role, entity): S8 re-mints a taken-out lane's id for the next candidate
(`run.mintOne('way', cellHash, run.counters[cell])`, bentCutFabric.ts:820; the counter advances only on success, :864;
`takeOut` pops `minted` / `live`, :787-789), so `way:<id>` names different chains within one batch and LINE 3's "the
lane read as readSpine reads any spine" reads whatever chain carries the id at the child's read. Pin: a lineage whose
lane no longer lies where it was placed derives nothing (construction, counted).

## DESIGN-4 (blocker for LINE 5 / LINE 6 as bars) — the derived kerb is NOT "§3.7 computed exactly" when an ancestor's entry was an attracted construction; the relation has no class for it and both oracles fail on a correct build

**The draft.** LINE 5: "(i) THE DEFINITION … no vertex of it deeper in any of the child's spines' buffers than the
lattice's 1 cm plus SAGITTA_CM …, and every sample of a 20 cm grid … inside the derived kerb exactly when it lies in no
spine's buffer — 0 misses; (ii) THE CONSTRUCTION …: where the construction read moved no part, equal canonical rings
(a difference ≤ 1 cm counted apart …); where it moved one, Hausdorff ≤ DRY_MOVE_CM; a beyond case is a failing line
unless the derived kerb passes (i) there and the construction fails it". LINE 4's classes: "exact / within 1 cm /
attracted within DRY_MOVE_CM / beyond, and 'inherited'", the 'attracted' flag being the CHILD's construction read's.
LINE 4's mutant: "unattracted compared within the bound instead of exactly (the planted 3 cm passes)". LINE 6 (ii)
gates on "faces whose derived region equals the construction's, over the faces derived — ≥ 0.91".

**The code / the design.** The root of every lineage is a kept CONSTRUCTION (986 (c): "read once, by the construction
…, and kept"; S19 LINE 1), and a construction moves a boundary point by up to DRY_MOVE_CM = 2·√2·26 + sagitta ≈ 74 cm
(kerb.ts:679; num/lattice.ts attractCm 26). region(child) = region(parent) ∩ side − buffer(lane) carries that stretch
unchanged into every descendant on whose side it lies. Three consequences:
1. A derived child with an attracted ancestor has kerb vertices up to ≈ 74 cm inside (or outside) a band: oracle (i)
   at "1 cm + SAGITTA_CM, 0 misses" fails on a correct build the first time an attracted root's stretch is inherited
   (a district cell's long boundary makes an attracted root likely, not rare).
2. Where the child's own construction is unattracted but an ancestor's was, derived ≠ construction by up to 74 cm and
   the case has no class: not "equal", not "≤ 1 cm", not "where it moved one". Read with the mutant of LINE 4 it must
   fail. Where BOTH moved, the two readings can stand 2·DRY_MOVE_CM apart — "beyond" — and the escape clause does not
   apply, because the derived kerb does not pass (i) either.
3. Separately, a lane's T-vertex is lattice-rounded off the crossed spine's line (≤ HOT_PIXEL_CM 0.71, index/items.ts:33):
   the parent's entry was read against the route A–B, the child's construction against A–T–B (`readSpine` reads the
   route now, kerb.ts:258). The child's kerb corner beside every T differs by 0 or 1 cm after rounding. On a network
   that is not axis-aligned a large share of derived children are "within 1 cm", not "equal canonical rings" — and
   LINE 6 (ii) gates on equality. (Not measured here; the mechanism is exact, the share is the build's to count.)
No accumulation: a lineage holds one construction (its root, or the last fallback), so the distance to §3.7 stays
≤ DRY_MOVE_CM. It is the EXACT share and the 0-miss bars that cannot hold, not the bound.

**Proposed change.** LINE 1: an entry holds `attracted` (its own construction moved a part) and `rootAttracted` (the
construction at the root of its lineage did; copied down by every derivation). LINE 4 / 5: the classes are judged on
the pair (rootAttracted, the child's construction attracted): (false, false) → equal within the lattice — Hausdorff
≤ 1 cm, exact-0 and within-1 counted apart as the harness's record does (measure.ts `zero` / `within1cm`); exactly one
true → ≤ DRY_MOVE_CM; both true → ≤ 2·DRY_MOVE_CM; beyond that is a failing line. Oracle (i)'s depth and grid
tolerances are 1 cm + SAGITTA_CM for rootAttracted false and DRY_MOVE_CM for true, 0 misses in each. LINE 6 (ii): the
gate is (exact-0 + within 1 cm) ÷ derived ≥ 0.91 over the (false, false) faces; exact-0 alone and the share of derived
faces with rootAttracted true are REPORTED (the second is the size of 2B's shift beyond 986 (e) (4)'s "≈ 3–8 %").
Keep LINE 4's planted-3 cm mutant, on a (false, false) fixture.

## DESIGN-5 (blocker for S19, major for S18) — the restore generation does not retire what a REJECTED or read-only batch left in the store; at M0 the stage itself runs on after a rejected district batch

**The draft.** LINE 1: "the restore generation it was made at (savepoint.ts:215)"; "an undone op (S9's undoTo, a
refused split's rollback, a rejected batch) restores the arena and the restored face's content selects its entry
again"; pin (d): "a rejected batch around a successful cut: the face read afterwards is served the entry it had
before, never a child's". Nothing is said of an entry CREATED inside the rejected batch for a face whose content the
rejection leaves standing.

**The code.** The generation moves only when a put-back crosses a committed version: `if (p.version !== s.version)
RESTORES.set(…)` (tx/savepoint.ts:252; its comment :209-210: "A rejected or thrown batch restores at its own version
and never moves it"). `reject` (tx/tx.ts:136-139) and a batch that wrote nothing (:590-594: "commits nothing and keeps
the version") both put the batch image back at the same version. S8 is one batch per district, `onFail: 'reject'`
(bentCutFabric.ts:1591-1600); a refused district is recorded and the stage goes on to the next one on the same Plat
(infill/stage.ts:125-129); the runner rolls a stage back only if a version moved (pipeline/runner.ts:218). Inside a
district batch the cells are cut depth-first, cell after cell (bentCutFabric.ts:1616-1628): cell 2's root face is first
read after cell 1 was cut — its construction meets cell 1's uncommitted lanes and T-vertices on the way they share.
The fusion harness then commits `corridorUnion` for EVERY district, the refused ones too (measure.ts:589-595, the
district list :552), and S19 LINE 1 serves that read from the store.

**So, at M0, under 2B:** a rejected district batch leaves entries for its cells that were constructed against content
the rejection removed; their keys still match (the T-vertices are gone, and would be dropped anyway); the harness's S9
commits them. "A rejected batch leaves the arena at its version, bit for bit" (savepoint.ts:1-2; §2.2 rule 8) stays
true of the arena and stops being true of what the next commit writes. The same mechanism makes any read-only batch
leak: the harness's own L1 read batch (measure.ts:563-585) and any test's or the façade's `kerb()` create entries that
a later commit serves — a measurement changes what is measured. Equal runs in fresh processes still agree (the leak is
deterministic); what is lost is "nothing a rejected batch did commits" and "a read is a read" in their observable
sense. Where the generation DOES move it is too coarse the other way: one stage rolled back retires every entry of
every earlier stage (runner.ts:214-222) — S8's state gone before M1's S9 stage reads it.

**The amendment's column here.** A logged arena column is in the batch image and the undo log, so a rejected batch's
state writes are put back with everything else, and a stage image restores the state that belonged to that image. This
is the one thing 986 (c)'s "follows a face … in the transaction's undo log" buys that content keys cannot. (It does not
buy persistence: io/encode.ts would still have to be extended.)

**Proposed change.** State the rule and its mechanism in LINE 1: KEPT STATE IS MADE BY A COMMIT. An entry created in a
batch is served inside that batch only; it joins the arena's kept state when that batch commits; a batch that rejects,
throws or commits nothing leaves the store as it found it. The store cannot learn a batch's fate from p.version alone
(reject then another batch's commit looks like its own commit), so it needs one signal from tx/: either a production
by-path observer of commit and of the batch image's put-back beside tx/frames.ts:27-34's test-only slot (`frameObserver.commit`
is already called at tx.ts:629, `beforePutBack` in savepoint.ts:249), or a by-path `committed` flag on the OpenTx. That
is ONE MORE cross-item file (M0-a-06's tx/, which S9 is re-seating — re-read after S9 lands); the memo's "tx/*: NONE"
does not survive. If the session will not widen the scope, the alternative is a ruled and pinned statement that a
rejected batch's reads persist — a contract change of §2.2 rule 8 for the owner. PINS: (i) a batch that cuts cell 1,
reads cell 2 (untouched) and is rejected: cell 2's next read is not served that entry; (ii) a read-only batch creates
no kept entry (the next batch's read of the same face constructs, counted); (iii) a committed batch's entries are
served in the next batch (the S8 → S9 hand-over). S19 LINE 5: name the seeds with a refused district and show S9's
reads there are constructions.

## DESIGN-6 (major; a contract change the session must rule and the owner should see) — under 2B `kerb` stops being a function of (arena, widths): two equal arenas give two kerbs, and a comment in kerb.ts cannot narrow that

**The draft.** Memo Q1: "after a save or load … a face reads by construction. kerb.ts:115-122's 'same kerb after a save
and load' is narrowed in a comment for derived faces." S18's session text: the build seat writes "the one sentence
kerb.ts's module comment (:115-122) narrows"; "this round changes no design text and asks for none".

**The design and the pins it touches.**
- ARCHITECTURE.md:4640-4643 (§3.3): "an arena compacted on save, one grown through a long session and one merged from
  pool overlays give identical results for the same next edit (the slot-renumbering test: §13.1)".
- ARCHITECTURE.md:5360-5362 (§3.7): S9 commits "the same function on the same inputs" (986 (c) rewrites this sentence
  to "from the same state" — accepted — but with the state IN the arena's undo log, "of an open transaction and of the
  committed arena").
- ARCHITECTURE.md:5636: "services … are never stored … a regeneration from the same inputs yields the same arena".
- testkit/test/kernel/arr-bands/representation.test.ts (M0-a-09's OWN file; :1-3 "C-0207 (5): a loaded arena's next
  operation equals the original's; §4.6's S8 ≡ S9 on a loaded arena"): `kerb` on every L1 face then `corridorUnion`,
  on the arena, on `decodeArena(encodeArena(p))` (:69) and on two renumbered copies, the kerb texts and the committed
  prints compared exactly (:78-92, :104-105). Neither the memo nor an entry names this file.

**What can differ, flow by flow (2B).** "Kept" (not "derived") is the term that matters: a kept root is an attracted
construction of its first read; every descendant inherits it (DESIGN-4).
1. A read before vs after an entry exists — S8's kerbFace → kerbSeed → makeBlock, the harness's L1 batch, S9's commit:
   M0, intended by 986, deterministic within one process.
2. Two Plat objects with one arena — `decodeArena` / `compactSlots` / `renumberSlots` copies: M0, in tests today
   (representation.test.ts; it stays green only while its build batches never read a kerb before the compared reads —
   the constructive set holds `corridorUnion` steps, testkit/src/constructive/cases/fixtures.ts:32, :177; S19 must run
   it and say). A copy has no store, so the copy's S9 commits fresh constructions where the original commits kept and
   derived regions: different committed L2 geometry within ≈ 74 cm, a different model root.
3. The pool (M1; façade stub facade/kernel.ts:366: "the derivation pool's overlays and merge are M1's; pool size 0
   runs in the generation worker"): a district cut in a worker's overlay leaves its entries in the worker; the merged
   arena has none; S9's output then depends on the pool size — §3.3's "never of … worker scheduling".
4. M1's S9 as a registered stage (measure.ts:546-547: "the run registers no S9, M1's") and any re-derivation from S9
   alone (`rederivesFrom`): S9 re-run on S8's stored arena reads by construction; the first run read the state.
5. Undo / redo (M2a; :5636 "undo and redo re-run the log's events through the same transactions"): undo S9 across its
   commit moves the generation (savepoint.ts:252) and retires S8's entries too; redo S9 constructs. Redo ≠ the commit
   it redoes.
In 2 – 5 the amendment's column behaves differently ONLY if it is carried: restored by the image / undo log (5: yes, by
construction), merged by the pool (3: M1's merge must copy it), written by the codec (2, 4: io/encode.ts extended —
M0-a-15's file). A content-keyed store has one real advantage there: it is slot-free, so it COULD be serialised or
handed across a merge unchanged — but only if the design says state is carried, which :5636 denies today.

**Proposed change.** (a) Strike "narrowed in a comment" from the memo and from S18's session text; put in its place a
QUESTION FOR THE SESSION'S RULING, shown to the owner with 2B's shift: "kerb(F) on a loaded, compacted or merged arena
is the construction; on the arena S8 ran on it is S8's state; S9's commit differs between them within N-43's bound" —
with the three design sentences above named as the text 986's landing must amend (§3.3 bullet, §3.7, the :5636 row),
and M1's pool and S9-stage briefs named as inheriting it. (b) S19: a REPORTED measurement that sizes it — on fusion
seeds 1–3, after S8: S9 committed on the run's Plat and S9 committed on `decodeArena(encodeArena(p))` of it; blocks
whose committed rings differ, and the largest distance. (c) S19 LINE 3 (2): name representation.test.ts among the pins
to re-judge, with a new case in it (an S8-like cut sequence through the barrel's `splitFace` and `kerb`, then the
copies) whose expected outcome is stated by the ruling in (a) — equal, if the session rules state is carried or absent
on both; a declared, bounded difference otherwise. (d) S18 needs none of this to stay NO-SHIFT, but ruling (e) of its
session text should say it binds S18's shadow only and that 2B's store is ruled on (a) and on S18's figures.

## DESIGN-7 (major) — S19 LINE 1's offRead clause cannot be built as written, and as intended it re-opens B-CLOSE on a loaded arena

**The draft.** S19 LINE 1: "OFFREAD (B-CLOSE) under the state: for a stated face the 'read a later L1 read makes' IS
its entry, so offRead finds nothing to pin; it stays in place for faces read without state (after a load, a moved
generation) — pin both (a stated face's along closing pins nothing; the same face with its entry retired runs offRead
as before)."

**The code.** `bandCore` reads every face up front (`writeOutlines`, bandUnion.ts:627-632, through `readOn` :584-586 =
`readKerb` with corridorUnion's vertexContacts true) and only then, in the same batch, `offRead` reads each face with an
along closing AGAIN (:602). Under LINE 1's own switch the up-front read is a state read — "a face's first read by
construction, KEPT as its entry" — and the op's L2 writes do not change an L1 content key (`readFace` walks level ≤ 1
only, kerb.ts:357, :369). So at :602 EVERY face has an entry, with or without S8's state, after a load or not: there is
no "face read without state" at offRead, and the second pin ("its entry retired runs offRead as before") has no way to
be arranged — the up-front read re-creates the entry first.

**Why it matters.** offRead exists because a LATER L1 read is a fresh construction that meets what the op wrote at L2
(bandUnion.ts:588-594). On the Plat that committed, that later read is now the entry — fine. On a loaded or merged
copy (DESIGN-6) the later read IS a fresh construction again, and nothing pinned the end for it: B-CLOSE's defect
class returns exactly where the state is absent.

**Proposed change.** S19 LINE 1: `offRead` reads by the CONSTRUCTION READ, by path, always (bandUnion.ts:602) — the
read a later reader WITHOUT state would make — and the notes say so. Pins: a face with an along closing whose
construction on the op's arena holds the run vertex off its outline is pinned first on a stated face too (red if
offRead is served the entry); `closing.test.ts`'s B-CLOSE family then needs no re-pointing for this cause. S19 LINE 2
(ii): offRead's constructions are counted apart and are not "construction reads over faces S8 cut or read".

## DESIGN-8 (major) — once S8 and S9 read one state, S19 has NO gate at CITY on whether that state is right

**The draft.** Memo §2: "Once S8 and S9 read one state, S8 ≡ S9 cannot detect a wrong state. The correctness bar is
therefore the oracle relation". That is right on the code: the harness's working block is `kerb()` in an L1 batch
(measure.ts:563-585) and S9's block is `corridorUnion` on the same Plat (:589-590); both are served the same entry, so
`beyond` measures the commit's attraction and whether S9 read the state, nothing else. But the replacement bar is
placed as follows: S18 LINE 6 judges the shadow on the BASE trajectory (cuts planned on constructions); S19 LINE 1:
"the construction read runs beside every DERIVED read served in a source run, S18's relation recorded in its
diagnostic (never thrown; derived.test.ts and the CITY probe judge it)"; S19 LINE 5's failing bars are S8 ≡ S9
`beyond`, the exact-0 share and the statistics. No S19 line reads that diagnostic after the CITY runs, and "the CITY
probe" is S18's. On the SWITCHED tree the cuts differ, so the faces differ; the derived kerbs S8 actually plans on and
S9 actually commits are judged at CITY by nobody. KEPT entries are judged nowhere at all (DESIGN-1).

**Proposed change.** A failing bar in S19 (LINE 5, or a line of its own): S18's CITY probe re-run on the switched tree
in source mode, the diagnostic read by path after each seed — 0 derivation defects by S18 LINE 6 (i)'s judge, the
class table of DESIGN-4, the vacuity guard of DESIGN-2 (derived ≥ 0.9 × the children read) — and every KEPT entry
served to S9 judged by oracle (i) against the face's spines AS S9 READS THEM (0 kerb points deeper than the class
tolerance in any current spine's buffer, vertex contacts included). And one bar that does not depend on line 3's clip
at all: testkit/test/kernel/arr-bands/agreement-corridor.test.ts (M0-a-09's folder; :1-5: the committed L2 kerb against
M0-k-03's two oracles' F − ⋃ buffer, "split by attraction") gains an S8-like corpus through the barrel — `kerb(F)`,
`splitFace` with a way row, `kerb(child)`, `corridorUnion` — so that on the switched tree an independent boolean judges
what derived and kept state commit. Today that file cuts nothing (no `splitFace` in the folder).

## DESIGN-9 (major) — the formula equals §3.7 only under three conditions the draft does not state; four classes would be hidden, and two of LINE 3's mutants cannot be killed on the pins as described

**The algebra.** kerb(F) = F − ⋃_{s ∈ S(F)} B(s) and child = F ∩ side, so (kerb(F) ∩ side) − B(lane) = child −
⋃_{S(F) ∪ {lane}} B(s). §3.7's kerb(child) = child − ⋃_{S(child)} B(s). With an exact parent the two agree (to the
lattice's 1 cm) iff (1) B(s) ∩ child = ∅ for every s ∈ S(F) ∖ S(child) — else the memo's 'inherited' class, the formula
subtracting more; (2) S(child) ⊆ S(F) ∪ {lane} — no spine has become incident since F was read; (3) every B(s) is the
same set at the child's read as at F's read. The draft names (1) only. (2) and (3) fail on this code:
- (2) the derivation is LAZY ("run at a child's first STATE READ"; "a child may be read long after its sibling was
  itself cut", LINE 2): a sibling's or neighbour's lane ending on the child's boundary in between is a vertex-only
  spine of the child (kerb.ts:397-423) that the parent's entry never saw. The formula subtracts less than §3.7.
- (3) a spine's END changes shape with later cuts: `junctionEnd` (kerb.ts:303-324) makes an end flat while another
  chain's line passes its vertex, and capped again as soon as a same-role chain ENDS there (`else if
  (key.startsWith(role)) return false`). The lane's own arrival at an existing vertex can flip a parent spine's end;
  a later lane can flip the first lane's end between its cut and the child's read. And the crossed spine's route gains
  the off-line T-vertex (DESIGN-4, point 3).
- A face cut twice before it is read (LINE 3's "materialised parent-first") subtracts lane 1 "as readSpine reads any
  spine" NOW, with lane 1's ends as they are now, from a region read before lane 2 existed: (3) again, per link.
- Holes: a hole's spines are in S(F); after the cut they are incident to one child only. The other child is class (1)
  wherever such a band crosses the whole lane band — rare, but it is 'inherited' and must be counted there.
- A child the cut leaves touching a parent spine at a vertex only: no difference in the region (the formula subtracts
  B(s) whole, §3.7 subtracts it when it reaches). The difference is in what the served read RETURNS (DESIGN-10).

**What is hidden as drafted.** Oracle (i) reads depth "in any of the child's spines' buffers" — if that is the served
read's own spine map, a contact of class (2) is not in it and passes. Oracle (i)'s grid says a sample is in the kerb
"exactly when it lies in no spine's buffer": an 'inherited' subtraction is then a MISS and LINE 5's "0 misses" fails on
the case LINE 3 says is only counted — the two lines contradict. Class (3) has no counter at all.

**Two mutants.** "a cap at a T end": a round cap of radius hw_lane at a T lies inside the crossed spine's own band
whenever hw_lane ≤ that spine's half-width — the usual S8 case — and changes no kerb. LINE 3's pin text also describes
the end wrongly: "no cap: the band ends square on that spine's band edge"; the code ends it on the line through the END
VERTEX square to the lane's last segment (kerb.ts:595-597, :630, :697-699; support.ts:695-702). "the wrong side kept"
is fine; "truncation in place of the rounding rule" dies only on an exact-equality assertion, which DESIGN-4 shows
cannot be the general relation — give it a fixture of its own.

**Proposed change.** LINE 3: state conditions (1)–(3); the derivation compares, per spine of the parent's entry and of
the child's `readFace` now, the reach-filtered reduced lines and junction flags (DESIGN-1's spine part): equal →
derive; a new reaching contact → subtract it too (contact derivation) or construct; a changed end or route → construct;
each counted in the diagnostic as 'inherited' / 'contact' / 'end-changed' / 'chain ≥ 2'. LINE 5 (i): depth is read
against every spine of `spines ∪ through` of the face NOW; a grid miss explained by the buffer of a parent spine in
S(F) ∖ S(child) is counted 'inherited', never a miss, and listed. LINE 3's pins: the T-end pin on a lane WIDER than the
crossed spine and on a lane ending on a zero-width chain (a seam), square and at 60°; a pin where a second lane ends on
the first lane's end vertex before the child is read (the end flips: the child constructs, counted); a pin where a
neighbour's lane lands on the child's corner before its first read.

## DESIGN-10 (major) — a served read must be rebuilt on the arena NOW; the entry's "spines it was read against" must never reach `splitsOn`, and the served `KerbRead.spines` decides whether S9 writes the face at all

**The draft.** LINE 1: each entry holds "the REGION the read traced …, the spines it was read against". LINE 3: "The
child's kerb rings and splits are then splitsOn(p, child's route edges, child's spines, derived region)". Memo risk 7:
"The 50 µs derived read includes readFace → readSpine over each spine's WHOLE own-level route … Long ways can exceed the
bar; the fix is to keep spines in the entry."

**The code.** `Spine.hwAt` is a `Map<VertexId, number>` (kerb.ts:183, filled :279-281); `junctionsOf` (:2343) reads a junction's
half-widths as `hwAt.get(v) ?? 0` (kerb.ts:2361); `RouteEdge` is `{ a: VertexId, b: VertexId, h: HalfEdgeId }` (:187-194).
A neighbour's T-vertex made after the entry is a new junction of F (`shared && degree ≥ 3` is kept, :2355-2358) whose
vertex an old `hwAt` does not hold: the stale map answers 0, the split's reach becomes `2·0 + attractCm` and the split
is dropped or misplaced, silently. After a take-out the merged face "may stand under a new slot" (C-0243) and so may
its vertices. The memo's own proposed cost fix is therefore unsound.
`bandCore` skips a face whose read has no spine (`if (read.spines.size === 0) continue`, bandUnion.ts:635) and builds
its pieces from `read.spines`; the construction returns the edge spines PLUS the reaching vertex-only ones
(kerb.ts:1738-1739) and a `census`. The draft does not say what a served read returns in `spines`, `census` and
`warnings`; a face with vertex-only spines and no edge spine, served with an empty map, is not written by S9.

**Proposed change.** LINE 1 / LINE 4: an entry holds the region and, per spine, its KEY and the comparison data of
DESIGN-1 — never a `Spine` object, a VertexId or a HalfEdgeId. A served read is `readFace` now + the entry's region +
`splitsOn` on the spines read now; its `spines` map is the edge spines read now plus the entry's reaching keys read
now; `census` as the construction would give it or stated absent with the consumers named. Pins: an entry made, a T
added on a bounding spine from the other side, the served read's splits equal those `splitsOn` gives on a fresh
`readFace` (red on a stored-spines build: the split at the T missing); a face with one reaching vertex-only spine and
no edge spine, served from its entry, is written by `corridorUnion` as its construction read is. 2B LINE 6: if the
50 µs bar fails on `readFace`, the fix is ruled, not improvised.

## DESIGN-11 (minor, four small gaps in LINES 1–2)

1. **The straight-through drop is not stable under several T-vertices on one route edge.** Each T is rounded off the
   sub-edge it lands on, so the second T can stand up to ≈ 1.4 cm off the ORIGINAL chord; `straightRun`'s greedy walk
   (kerb.ts:526-541) then keeps it (HOT_PIXEL_CM = 0.71, index/items.ts:33) and the key changes. The direction is safe
   (a miss, a construction), but pin (c) holds for the first T only, and a street with several side lanes — the usual
   CITY block edge — loses its neighbours' entries and breaks a lineage whose `after` and next `before` straddle the
   second T. LINE 6: REPORT the store's misses by cause (key changed by a T beyond the hot pixel; a changed spine set;
   no lineage), so that S19 LINE 2 (i)'s bound "≤ the L1 faces S8 reads with no entry" is not met by misses.
2. **The observer must return at once unless the face is a level-1 record in a level-1 batch.** `splitFace` /
   `connectHole` serve every partitioner at every level (split.ts:171-175 `opts.faceLevel ?? t.level`); `readFace`
   throws on a face that is not a live L1 face (kerb.ts:342). LINE 2's "never throws into the kernel" covers the
   throw; say the level rule and count the calls skipped, or S10's cuts each pay a caught throw.
3. **The key is compared in full.** LINE 1 says "content key … equals"; say that a hash alone never selects an entry
   (a collision serves another face's kerb silently, and no bar would see it).
4. **S18's prod bundle may not hold the observer at all** (`"sideEffects": false`, and LINE 4's shadow is dead code
   with DEBUG_BUILD false): LINE 7 (5)'s "the observer's cost beside the base's" and LINE 2's "in the prod bundle too"
   then measure nothing. LINE 7 (2): the count run lists the observer's `before` / `after` calls; 0 is a finding.

## DESIGN-12 (major; the recommendation and the one cheap experiment) — S18 should measure the kerb as a PURE function before 2B binds a history-bearing store

**The three stores, on the code.**
(a) The draft's content-keyed store beside the arena: no arena, codec or bits() change; follows a face across slots;
slot-free, so it is the only form that could be carried across a merge or a save unchanged. It cannot see a batch's
fate (DESIGN-5), its key must be widened (DESIGN-1, -3), and every lookup costs a `readFace` + key.
(b) 986 (c)'s logged column: a new Int32 column in `LevelFaces` (arena/plat.ts) indexing a list of entries that must
still live BESIDE the arena (arena/write.ts:1-37: a door entry's old value is an Int32; "no Map or Set becomes
reachable from a Plat"), its door id and growth (arena/write.ts), its place in the batch image (tx/savepoint.ts copies
the face columns by name, :178-185), `bits()` / `state()` of the tests, io/ defaults, hooks in faces/split.ts, merge.ts,
tx/writers.ts `removeEdges` (:262-266, a forward write) and insert/splitThrough.ts — five lenders. Its root entries are
written BY A READ, which dryrun.test.ts:75 (`bits(p) === b0`) and :80 (`state(p)` unchanged; the draft cites :79) forbid: it needs the
read-only contract re-ruled. What it buys is real and only this: reject, rollback, undo and a stage image restore the
state with the arena (DESIGN-5; DESIGN-6 flow 5). It does not persist or merge by itself.
(c) A slot-keyed fast path validated by content pays the same `readFace` as (a) and adds slot-reuse hazards (C-0243);
validated by version it needs a per-face dirty signal inside an open batch, which only tx/ has.
**Recommendation for S18:** (a), with DESIGN-1, -2, -3, -5's changes — because S18 serves nothing from the store, so a
wrong store costs a count, not an output — and ruling (e) worded to bind S18 only.

**The experiment.** 991 (b)'s ruling is "kerb(F) is §3.7's definition computed exactly … the construction's
arena-attracted read being its oracle". A kept root is not that (DESIGN-4); and every hazard of DESIGN-5 and -6 comes
from keeping a value that is not a function of what is on the arena. LINE 3's clip — a region less one spine's buffer
parts — applied in a loop over ALL of a face's spines (`spines ∪ reaching through`, key order, `spineParts`' own parts)
from the face's own rings gives X(F) = F − ⋃ B(s): the definition computed exactly, for roots too, with no lineage, no
parent and no history. It is no new mechanism. S18 LINE 5 and LINE 6 should compute X(F) beside every face they judge
and REPORT, per corpus and per CITY seed: (1) X vs the lineage-derived region — expected ≤ 1 cm on rootAttracted-false
faces; every larger case is one of DESIGN-9's classes, so X is the oracle that COUNTS them, far sharper than a 20 cm
grid; (2) X vs the construction, by DESIGN-4's classes — the exact share a pure function would have; (3) X's cost in
µs, median and p90, at CITY sizes. If (3) is of the order of 1 ms or less (S8's bar is 16 ms a cut at 2.26 reads), 2B
can serve X with a content-keyed MEMO — a store whose loss changes no result: `kerb` on a loaded, merged or rolled-back
arena equals `kerb` on the one S8 grew, the observer and the cross-item scope are not needed for correctness, and
DESIGN-5 / -6 have nothing left to rule. If X is too slow or disagrees, the session rules 2B's store on those figures.
Either way the choice is made on numbers S18 already has the code to produce. (Serving X needs 986 (c)'s sentence "The
state of a face no cut has touched is read once, by the construction above … and kept" re-ruled; measuring it needs
nothing.)

## Answers to the lens's questions (short)

**(1) Key completeness.** Today's read depends on: F's L1 route rings (kerb.ts:349-371); each edge spine's WHOLE
own-level route, sampled half-widths and ends (:257-287), of which every segment within reach of F's box is laid
(:556-565); each spine end's junction flag, read from the arena at the end vertex (:303-324); the vertex-only spines
through F's route vertices that reach (:397-423, :1735); the arena content within attractCm of the parts (the dry-run);
the batch (its level, `dryLevel`). The proposed key holds the rings, the edge spines' keys, their half-widths at F's own
kept vertices, `ends`, the flag. NOT held, and a change of result against §3.7 (unintended): the vertex-only spines
(arriving or leaving), the junction flags, a spine's route and widths beyond F's corners (DESIGN-1). Not held and
intended (986's "read once … and kept"): the attractors and the batch. The straight-through drop keeps the key stable
for ONE harmless T per route edge; it drifts past the hot pixel with several (DESIGN-11.1); it is unsound exactly where
the dropped vertex carries a lane whose band reaches (DESIGN-1), and it cannot be computed where the draft puts it,
because it reads half-widths the cut does not have (DESIGN-3).

**(2) History.** Same content, different kerbs: read before / after an entry (M0, intended); an entry made in a batch
that was rejected or wrote nothing — the generation does not move (savepoint.ts:252), the M0 stage runs on after a
refused district (stage.ts:125-129) and the harness's S9 commits it (DESIGN-5: the stamp is NOT sufficient, and where
it does move it retires too much); two Plats with one arena — decode / compact / renumber copies, in a-09's own
representation.test.ts today; M1's pool and registered S9; M2a's undo → redo of S9 (DESIGN-6). Between two fresh
one-click runs at M0 the committed output is still equal (every leak is deterministic). The narrowing of
kerb.ts:115-122 is a contract change of ARCHITECTURE.md:4640-4643, :5360-5362 and :5636 and of C-0207 (5): the session
must rule it and the owner should see it. The amendment's column differs only in what the undo log gives it for free
(reject, rollback, undo, stage restore — all correct); it is no more persisted or merged than the draft's store unless
io/ and M1's merge carry it.

**(3) Alternatives.** (a) for S18, corrected, because S18 serves nothing from the store; (b) costs five lenders and the
read-only pins (dryrun.test.ts:75, :80) and buys only undo-correctness; (c) buys nothing over (a). The cheapest
experiment: X(F) = F − ⋃ B(s) by LINE 3's clip looped over all spines, reported beside every judged face — agreement
with the derived region, with the construction, and its cost (DESIGN-12). If it is cheap, 2B needs no history-bearing
store at all, and 991 (b)'s "§3.7's definition computed exactly" is met for roots too.

**(4) The formula.** Equal to §3.7 (to 1 cm) for an exact parent iff no parent spine's band reaches the child without
being incident ('inherited'), no spine became incident since the parent's read (lazy derivation: contacts), and no
buffer changed shape (junction flags; the T-vertex on the crossed spine). With a kept, attracted root it is not exact
at all, for every descendant on that stretch (DESIGN-4). What the oracle must check per class: DESIGN-9.

**(5) S8 ≡ S9.** The memo is right that it cannot see a wrong state. The replacement is not strong enough as placed:
S19 gates on no CITY reading of the derived kerbs on the switched trajectory, and nothing ever re-judges a kept entry
(DESIGN-8).

## Not checked

M0-a-06 S9's frames and M0-c-06 S1's harness (not on this tree); nothing was executed — every share and size above is
read from the code, none measured; whether representation.test.ts actually goes red under 2B; the dry-run's interior
(kerb.ts ≈ 700-1700) beyond `dryInsert` and `censusRead`; insert/, arena/plat.ts and io/ beyond the lines cited;
S18 LINES 8–14 and S19 LINES 6–11 (other lenses), read only where LINES 1–5 lean on them.
