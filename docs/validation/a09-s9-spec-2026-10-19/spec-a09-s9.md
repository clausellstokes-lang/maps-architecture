# a09-s9-spec / design — the spec entry for M0-a-09's hardening round S9 (Q18 + Q19 + Q84)

Seat `a09-s9-spec/design` (Fable 5.1 / xhigh), 2026-10-19 ~01:55–. Inputs: read-code.md (313 lines) and read-records.md
(155 lines) read whole, the S6 model entry, and this seat's own reads of the tree (every file:line below re-checked on
branch claude/great-galileo-b4mzbq unless tagged [STATED] from a record). No test, build or git was run. The JSON entry is
`spec-a09-s9.json` beside this file; §1 and §2 below are its `session` and `lines` verbatim, §3–§4 are this seat's notes.

## 1 The session text

(written after §3; see spec-a09-s9.json)

## 2 The lines

(see spec-a09-s9.json)

## 3 Design notes — why this construction, and what the evidence says it buys

### 3.1 What exists and what does not [OBSERVED]

* `kerb(tx: InsertTx, face, widths)` (kerb.ts:564) uses `tx` only as `tx.plat` (:565). `readKerb(p, …)` (:532) → `readFace`
  (:193, a pure reader: faceWalk/rowsOn/outgoing only) → `kerbOf` (:492) → `overlayRegion([rings, parts], w0≠0 ∧ w1=0)`
  (:498). `readFace`'s J318 census runs a whole `kerbOf` of the edge spines (:287) whenever a vertex-only spine exists;
  the staged read `lessParts` runs a second `overlayRegion([base, parts])` (:452), accepted under `clearOf` (:542).
* `overlayRegion` (winding.ts:706) = `buildOverlay` (:112) → `windingLabels` → `traceKept`. `buildOverlay` builds a NEW
  arena `createPlat(SCRATCH_KEY, 2·rangeCm)` (:156), a NEW index (:157), a shell `insertTx(plat, 0)` (:158), a 4096 cm
  frame (:162–176), then EVERY distinct segment as its own two-point mandatory `insertChain` (:179–190). Attraction there
  (planAttraction, attractVertex.ts:105–126: the nearest level-≤n vertex within attractCm = 26) sees the operands only.
* S9's commit re-reads every face the same way before any write (bandUnion.ts:564–568) and inserts the pieces with
  `insertChain(t, …)` at L2 on the real arena (:599, :635; pinned ends :586), so its attraction sees L0–L2 content.
* The kernel has no read-only or copy-on-write overlay: M0's overlay is the arena written in place with an O(arena)
  before-image (savepoint.ts:1–10; `takeSavepoint` copies every column, :152–198). The building blocks that exist:
  `openTx(o)` (tx/state.ts:96), `isOpenTx` (:91), `opSave(t)` / `rollback(t, s, refusal)` (faces/common.ts:459/:486 — the
  image plus the journal, chain-journal, log, warnings and index-log lengths; "work charged stays charged", :447),
  `insertTx(plat, level)` (insert/classes.ts:132: a shell with unlimited work, its own warnings and journal),
  `chainJournal(tx)` (stretch.ts:111: per-tx WeakMap; `faces[l].created/changed/removed`), `ChainInsert.placed`
  (insertChain.ts:112), `pointLocate` (index/index.ts:67), `faceWalk`/`rowsOn`/`outgoing`/`isFaceLive` (arena),
  `dropStraight` (winding.ts:607), `simpleLoops` (:687), `canonicalRing`/`compareRings` (:584/:591), `windingNumber`
  (num/exact.ts:107), and a-09's own `interiorPoint` (bandUnion.ts:173) and `insideRings` (:117).
* The work hazard: `charge()` returns false once `work.total > workLimit` (classes.ts:154–158) and `overWork`
  (tx.ts:124) dooms a batch whose total is over its limit; S8's district batch runs under `districtTxLimit` (bentCutFabric.ts
  :1359, :1333). A dry-run that charged the batch's own transaction could doom S8. Hence the shell.

### 3.2 The profile's arithmetic — what the real-arena read can and cannot buy [STATED profile-city-stages.md]

* §0 (3), §4 A1: 2 774 / 2 394 scratch arrangements per CITY S8 (2.0 per cut), ≈ 250–300 segments each, ≈ 19 ms each in
  prod; 72–80 % of S8, 67–69 % of S9. §3.7: the engine costs 85–160 µs PER SEGMENT even at 50–200 segments (a 87-segment
  "kerb in miniature" 13.9 ms) — the insertion, not the arena creation, is the cost; super-linear (A2: `rewalk` walks the
  one big scratch face, `reparent` scans every level-0 item of the box). §3.3: the commit's piece insertion into the real
  arena is ≈ 11 % of S9 against the read's 67 % (≈ 6 k chain insertions against ≈ 353 k segment insertions) — on the real
  arena a chain's segments cost ≈ 30 µs each (the touched face is F, small). A4: one O(arena) op image ≈ 1.4 ms at CITY.
* So: the dry-run removes the arena, index, frame and F's own rings (F's edges already stand), inserts only the parts
  (one closed chain per part, ≈ 40–80 chains), on a small touched face, plus one image per read. Expected per read: a
  small multiple of the commit's own insertion cost — plausibly 3–6× under today's read, never the ≤ 5 % of today's
  read that §5 row 1 wanted for its 4.5× on S8. The per-segment insertion cost (fix 2, a-03/a-05) and the image (fix 5,
  a-06/a-07) are the remainder, outside the owns. §12.4's 12 µs per cut is 10³ away whatever this round does (J395 C2).
* The order-of-magnitude route — keep each lane's band in the arena as S8 cuts and read every kerb by face walks alone —
  needs the level discipline ruled (band outlines at L1 inside an L1 batch, or L2 inside L1) and b-03's loop: a design
  ruling, not a-09's round. Named in §4 for the session.

### 3.3 The decision (vetoable)

kerb(F) is read by a DRY-RUN ON THE REAL ARENA inside the open transaction it is asked on: the parts inserted through
`insertChain` at the transaction's level on a shell `insertTx(t.plat, t.level)` under `opSave(t)`, the faces inside F
labelled from the arena's own edges, the kept rings traced, the shell's warnings kept, then `rollback(t, s, …)`.
Rejected: (A) the memo — NO-SHIFT but blind to the attractors (Q19 untouched) and of unmeasured hit rate; (B) a geometric
read snapped by `planAttraction` — a second implementation of the lattice discipline in kerb.ts; (D) a child's kerb from
its parent's — a different lattice result per path (S8 ≡ S9 lost by construction). (C) is the task's steer and the one
route that makes the read's attractors the commit's by construction at read time.

What the construction gives for Q19, honestly: S9's read now runs in the commit's own L2 transaction, so the commit's
insertion of the read's rings meets the attractors the read met (exact by the insertion's idempotence on its own
output, as today's unattracted cases already are). S8's read runs in the L1 district batch, which cannot see L2 content;
two faces sharing a contact (a band's inner edge crossing their shared spine-less edge) now read it on the same arena
content, so the second commit's attraction to the first's contact is a zero move. The residual of N-52's class (b) is a
commit attracting to L2 content an L1 read could not see — measured and classified, bounded by N-43, never silent.
Q19's "100 % by construction" is therefore reachable only where the read and the commit see the same arena; the bar is
N-52 (5)'s ≥ 0.95 on the item's corpus, never falling.

### 3.4 Hazards the spec names for the builder

1. Labelling from the input rings is WRONG: attraction moves a part's edges by up to √2·attractCm, so a face's interior
   point can lie inside the input ring and outside the arena's region (a silently wrong sliver, N-45 (a)). Label by the
   arena's edges: the cycle of edges carrying each part's row (from `ChainInsert.placed`) or a winding walk across the
   inserted edges; "inside F" by reachability from F's interior point without crossing F's own boundary pairs (and the
   halves `tx.journal.split` made of them), never by a polygon test near a bent split.
2. The rings' form: `faceWalk` returns every vertex; the scratch dropped straight-through vertices and cut self-touching
   cycles (`traceKept`): apply `dropStraight`, `simpleLoops`, `unspiked`, canonical, sorted, or every exact pin moves.
3. Parts beyond the arena's frame refuse on the real arena (the scratch grew its frame round the inputs): clip or drop
   the part beyond `p.frame`; the census is the bar.
4. The staged read (C-0381) in the new engine: operand 0 = the base rings must then be inserted (they are not the
   arena's edges); the one-overlay / staged distinction must survive or be shown unnecessary by the census.
5. `rollback` wants a refusal: on the success path it is called with a placeholder and its return discarded.
6. bandUnion at L3 reads L1 faces holding L2 kerb edges: "inside F" crosses those as it crosses part edges.
7. The dry-run inside `writeOutlines` nests in bandCore's `opSave` (:533): two full images live at once; fine, images are
   independent copies; the inner rollback cuts to the inner lengths.

### 3.5 Ids on disk at 02:10 [OBSERVED]

choices.md's highest row is C-0386 (M0-e-02 fix s1) and CLEAN-ROOM.md's highest L row is L-0580 — the next free ids are
C-0387 and L-0581 today. Both readers' "C-0386 / L-0579" and the task's "C-0384 / L-0575" are stale; the spec says
"the next free ids the seat finds".

## 4 Open questions for the session (before launch)

(written after §1)
