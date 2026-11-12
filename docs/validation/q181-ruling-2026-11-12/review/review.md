# Q181: adversarial review of the ruling seat's draft (rule 3 (b)'s run test), 2026-11-12

Seat: the adversarial review seat for the managing session. Read: the draft folder
`docs/validation/q181-ruling-2026-11-12/` whole; §2.2 rule 3 and §3.4 / §3.6 of `docs/ARCHITECTURE.md`;
`tx/relevel.ts` (`rewriteRows`, `onRun`, `onStretch`, `dissolvable`, `dissolve`, `restoreSplit`), `tx/writers.ts`,
`tx/chains.ts`, `warp/warp.ts` (`sameRun`, `unflaggedBy`, `commitStep`), `insert/stretch.ts` (`promote`,
`ownShapeVertex`); the RQ2 spec (`rulings-final.md`, `spec-a06-s10.json`, `spec-a05-s15.json`); `docs/HANDOFF.md`'s
landing record; the session's reach log `/home/user/maps-scratch/q181/reach-partial.tsv` and
`site/src/water/faces.ts`.

Mirror: `/home/user/maps-scratch/q181/tree` (the patched kernel). I added two scratch mutants beside the ruling seat's,
both env-gated by `Q181_MUT`. `old` re-implements the head's identical-rows test. Check: `p1-forms` under it is
byte-identical to the ruling seat's `p1-forms.base.log` (`p1-forms.oldmut.log`). `every` takes pairs of one level at
EVERY level instead of the lowest only. The tree's whole state is in `tree-state.diff`. I did not touch `base`. Every
probe ran alone under `nice`.

Labels: CONFIRMED means I executed it, or read the code path. PLAUSIBLE means reasoned.

## Findings

| id | sev | finding | evidence | what I would change |
|---|---|---|---|---|
| R1 | BLOCKER (for option F as written) | Option F's first reason is false in this programme's practice. The legs of a merged round DO land one at a time. Leg 2 (LINE 8 with M1 – M4, no W) can therefore be the landed head while leg 3 is unbuilt, interrupted, or relaunched. Also, leg 2's own closing check runs a tree where the amended step is live and no `shape` row is ever written. There the guard class G dissolves chains' own points, and LINE 7's edited (a) would accept every such dissolution as "LINE 8's". | CONFIRMED (read). HANDOFF.md: "J737 f-01 — a merged round's first leg"; DJ "leg 1 LANDED (2992248a, J766); legs 2 and 3 HANDED BACK"; the takeover rule: "the legs before it are landed or, if unlanded but PASSED, landed first"; J457: d-05b "LANDED … ahead of the hand-back". The draft's own G (`p1-forms.tree.log` G false) and its fuzz 13 "lacks" without the row. | Take option S. If the session keeps F, F needs: a co-landing clause (legs 2 and 3 land together, gates after both: the DI precedent "land a-15 and a-16 TOGETHER"); LINE 8's shift judged by leg 3 against the head, not by leg 2; and a pin owner for G without the row on leg 2's tree, stated as an expected interim red. |
| R2 | MAJOR | "Must land with the `shape` row" is necessary but NOT sufficient. Take a chain's own collinear point at a CROSSING of another chain. W writes nothing there, because no other entity is on the chain's two edges. Put a rider on one side and remove the crossed chain: the amended step keeps the flag. Remove the rider: the amended kernel dissolves the chain's own point. The head keeps it. With RQ2 emulated the result is the same. The draft's §1.3 ("exactly RQ2's class, and RQ2's row … guard it") does not hold for crossings. | CONFIRMED: `r1-attacks.*.log` S4b, NEW+RQ2 DIFF ("v: gone"), OLD EQ. The other orders S4a (A removed whole) and S4c (rider first) dissolve on BOTH rules, so the class predates this rule. The fuzzer cannot build it: its crossing chains are two-point segments. | Name the crossing subclass in the ruling as a known residual of RQ2's class (a queue row: either W writes on an own point landed on another's run whatever the other entity's sides, or a notes row in N-13's class). The amendment adds one more order of a defect that already exists. That is the same trade as weak point 1. Say so explicitly, and do not claim RQ2 covers it. |
| R3 | MAJOR | §3.6 (b′) in code (`warp.ts sameRun`) recognises "a run it split" only by IDENTICAL level rows. The amended (b) recognises it by a row in common, so the two now disagree. Example: the amended rule keeps a T-junction's flag beside a rider. A warp then moves the spine's vertex beside it: (b′) neither clears nor lists the flag. Removing the rider then dissolves the junction and straightens the warped spine, which §3.6 promises never happens. The head keeps it in this order. | CONFIRMED: S2 T-first dy=1 (NEW and NEW+RQ2: report.unflagged=[], then "j DISSOLVED"; OLD "j KEPT"). The rider-first order dissolves on both rules (the gap predates this rule). dy=30 is harmless (on-run fails). | `warp.ts` is M0-a-13's, outside leg 2's and S11's write scope. The ruling must route a row: (b′)'s `sameRun` reads the same run notion as rule 3 (b), a row of that level in common. Ideally it lands in the same round as the rule, or the row is a declared seam. The LINE's "nothing else moves" is not true of the contract. |
| R4 | MAJOR | The measured reach is NOT Q181's removal forms. It is N-19's class: an ADD-ONLY retype (the water stage's bank retype, `faces.ts:284`) touches a split vertex whose pairs differed before. Two shapes recur: a shore's foot on the arena frame (`margin`) and one water body's shore leaving another's. The head runs (b) on that batch and clears the flag although nothing was removed. §2.2 names only `removeEdges`, `clearFiner` and `retypeEdges`' `remove` as the batches that end with (a) – (c). The new decision is RIGHT there (see D (1)). But the declared shift becomes "flag bytes of every derivation with water at the frame", not "where a removal leaves a run with a row in common". | CONFIRMED: `reach-partial.tsv`, 909 events classified. All are old=false new=true. 760+ have the common row `margin` beside `shore`. The rest are shore/shore (body 1's shore with body n's). `faces.ts` (4) `retypeEdges(o, st, [{ role: 'bank' }], [])`. | Option S, with a declared shift of flag bits measured by a FLAG-MASKED comparison (D (2)). The ruling text should say that the amendment also stops an add-only retype from clearing a flag, and that this is most of its reach. |
| R5 | MINOR | Dropping the BEFORE comparison has one untested effect beyond N-19. A rekey that JOINS two chains of one entity at a split vertex now dissolves the join vertex in the rekey batch itself, because both sides become identical and share the run. The head keeps the vertex (unflagged). Whether a join vertex is a shape point of the joined chain is not ruled anywhere. No pin covers it, and the fuzzer cannot build it (it always rekeys to a fresh entity). | CONFIRMED: S3a (NEW: "C rekeyed whole to K: ok \| v: gone"; it equals K inserted as one straight chain, not K inserted through v; OLD keeps v). | One sentence in the ruling: a rekey join is a run renamed, and its vertex dissolves. Add a pin, or a notes row in N-13's class. |
| R6 | MINOR | Nothing pins the "lowest incident level" selection. Mutant EVERY (pairs of one level at every level) passes all of the following: Q1 – Q6; `removals.test.ts` (its only red is N-19, as the amendment's own); `restore.test.ts` 23/23, the quay control included; and every Q181 form. It also FIXES K3. So the draft's reason for keeping the selection ("it is what keeps the quay") is not borne out: the quay is a mixed pair, which EVERY also excludes. F5 stays open under both. | CONFIRMED: `p4-pins.every.log`, `removals.mutants.log`, `restore.every.log`, `p3-kin.every.log` (K3 true), `p1-forms.every.log` (F1 – F4 true, F5/F6/G false). Q7 – Q9 under EVERY: PLAUSIBLE green (no pin holds two same-level pairs of different levels). | Either state LOWEST-OFF as an unkilled mutant on purpose, or take EVERY into S11 after its own probe on K3's kin. I lean to EVERY in S11. |
| R7 | MAJOR (side finding E) | The StretchRef throw is a defect of M0 reachable by a lawful caller. §3.4 promises that "an end finer than the chain is first promoted". `removeEdgesIn` and `retypeEdgesIn` (rekey) plan `linesOfRuns` on the remaining part BEFORE `promoteEnds`. The `check` fires when that part has no route vertex at the chain's level besides its end. | CONFIRMED: S5a (removal) and S5c (rekey) THROW on both rules. S5b (the same chain with an L1 point between its start and the cut) commits and promotes. Code path: `writers.ts` `newLines` / `newFromLines`, then `promoteEnds`; `chains.ts linesOfRuns`. | A queue row for M0-a-06, inside its own files. Either promote first or plan with the finer end counted as a route vertex. It fits S11 naturally. |
| R8 | MINOR | Weak point 1 (an own LEAVE point within the hot pixel) is not reachable the way the draft describes. A bend small enough to be on-run becomes a shared stretch (v is then interior, and W writes). A true leave is off-run, so its flag clears on both rules. Geometric bound: with neighbours at least `minEdge` = 25 cm away, on-run needs a bend of at most about 2·asin(0.71/25) ≈ 3.3°. Below `minFaceAngle` (5°), insertion shares the stretch. | CONFIRMED on the sweep S1 d = 20 … 150, one step and two (OLD = NEW everywhere; d=20 is the G class, guarded by the row: S1 NEW+RQ2). PLAUSIBLE in general. | Replace weak point 1 with R2's crossing subclass, which is the real one. |
| R9 | MINOR | The fuzzer's power is overstated. It cannot generate: levels other than L1/L2; pins; vertex role rows (except the proxy); moves (R3); add-only retypes (R4, the dominant production class); `retype remove`; `clearFiner`; several roles of one entity; same-entity chains (R5); crossings at an own point (R2). Its fresh form takes each kernel's BEST order separately, which favours whichever kernel a given order suits. | CONFIRMED (read `fuzz.mts`). | Say so in the ruling. S11's closing check should run leg 3's `coincident-interior` generator with both RQ2 oracles plus a fresh-form check. Those exist only once leg 3 has landed, which is another reason for S. |
| R10 | MINOR | LINE 1's pins (e) and (f) do not assert the defect. They are silent ("its flag is left as rule 3 (b) leaves it and no assertion … is made"). So the claim that under option S they "assert a defect for its lifetime" (draft §4, the session's message) is not right. S costs the RQ2 round nothing in its pins. | CONFIRMED (read `spec-a06-s10.json` LINE 1). | none |
| R11 | MINOR | The Q181 queue row itself prescribes "M0-a-06's round AFTER the RQ2 round". The earlier review's F8 and J776 routed it there, so F re-opens a settled routing. | CONFIRMED (`M0-FIX-QUEUE.md` Q181; `rulings-final.md` 'What goes to the queue'). | none (supports S) |

## A. The rule

A (1) Where can a common row be something other than the run the vertex split?

- `isOn` is geometric: v must lie within the hot pixel of a segment joining its neighbours, or joining vertices of the
  dissolvable stretch. So any row common to an on-run pair belongs to a chain that passes straight through v (CONFIRMED,
  `onRun` / `onStretch`).
- A chain that turns at v is excluded unless its bend is under about 3.3°, and insertion makes such a bend a shared
  stretch (R8).
- The existing pin `removals.test.ts` 'a chain's own corner that landed on another way's edge' keeps ISON-OFF dead under
  the amendment (PLAUSIBLE: read, not run).
- A kept flag acts only through `dissolve` / `restoreSplit`, which still require degree 2, identical rows, no vertex row
  and no pin (CONFIRMED). So harm needs a vertex that a survivor owns while its two sides become identical. That narrows
  it to:
  - a survivor's own straight-through point: RQ2's class. The along subclass is guarded by W. The crossing subclass is
    not (R2).
  - two chains of one entity meeting at v: S3, weak point 7 of the draft, and R5.
- Chain ENDS are safe while their chain lives, because an end is on one side only. Riders shared by two different chains
  keep the flag exactly where the fresh form in the run-first order has it.
- Degree 3 and 4 after the batch: a dissolution waits for degree 2.
- Step (a) level changes: the after-test reads the levels step (a) left. I found no wrong case.

A (2) The dropped BEFORE comparison.

- Within one call, a row can arrive only by `add` or `rekey`, and only on the ref chain's own edges.
- "Nothing in common before, common after" therefore needs a rekey JOIN at v (S3a). An add on both sides of a pair
  whose shared ref row is also removed by the same call behaves the same way.
- The only differing outcome I could build is R5.
- The large practical effect of dropping it is R4: add-only batches no longer clear flags. That is right.

A (3) Every reader of VERTEX_SPLIT (CONFIRMED by grep: kernel `src` only; no site or layout reader):

- `dissolvable` / `dissolve` / `restoreSplit` / `onStretch`: they assume nothing about the old clearing.
- Promotion `promote` (stretch.ts): keeps the flag by design. A kept flag on a promoted coarse END cannot dissolve while
  the coarse chain lives.
- `promoteEnds` and (c)'s END clear: these still clear, after or outside (b) (CONFIRMED).
- `ownShapeVertex`, `splitThrough`: these set or clear flags at insertion only.
- warp `commitStep` (b): clears moved vertices, unaffected.
- warp `unflaggedBy` (b′): ASSUMES the old run notion (R3).
- The encoder, contentPrint and the digests carry the byte (R4's reach).

A (4) Weak point 1, built: R8 / S1.

- With d = 20 (C's end attracted onto A), v becomes C's interior point with A on both sides, which is G.
  - Without the row, both rules dissolve it in one step.
  - In two steps, only NEW dissolves it (the draft's G).
  - With W emulated, both keep v.
- With d ≥ 27, v is a true leave. Its flag clears at A's removal, one step or two, on both rules. The arena equals C
  alone.

## B. The composition with the RQ2 round

M1 – M4 with the amended (b): reading R3 against the pins (a) – (m), I found no disagreement (CONFIRMED by reading).

- A kept flag makes M2 fire less and M4 hold rows longer. M3 still settles a degree-2 vertex.
- W2 does depend on W's condition "v carries VERTEX_SPLIT" (`spec-a05-s15` LINE 1, exactly R2's), so the draft's
  reading is right.
- The interplay of R3 with pin (l): a vertex with a row and a rider on one side is not unflagged by (b′). The row still
  blocks dissolution and M3 settles it later, so there is no harm. PLAUSIBLE.

The guard ordering does not hold:

- "In the same round" is not enough, because legs land one at a time (R1).
- Leg 2's closing check sees G without the row as a declared-looking shift. Its pin Q8 plants the row, so no leg-2 pin
  shows the unguarded state.
- Under F the leg-2 pins would have to say: "Q8 without the plant → v dissolved: EXPECTED until leg 3; leg 3 re-runs it
  with W and asserts equal to C alone."
- The guard is also incomplete (R2).

## C. The proof's power

- The fuzzer's limits are R9.
- "The vertex set never further from fresh" is a fair measure of the end state. It says nothing about the flag's later
  readers (R3), and best-of-orders is lenient.
- The 173 flag-only cases: I read seeds 11000033, …046, …091 and …101. In each, NEW's kept flag sits on a vertex that is
  the END of a surviving chain on one side, with another chain straight through (CONFIRMED in the log).
- Such a flag cannot dissolve the end while that chain lives. When the chain goes, dissolving is right. The exception is
  a same-entity continuation (R5 and S3), which the fuzzer cannot make.

## D. How it lands: S

1. **The reach: is the new decision right at a shore's foot on the frame?** Yes, PLAUSIBLE with the code path CONFIRMED.
   - The shore ring is inserted after the frame. Where it leaves the frame it splits the frame's edge, so v is flagged.
   - The bank retype is add-only. It touches v's shore edge, and the head's (b) finds no pair identical before the
     batch, so it clears the flag. Nothing broke the frame's run.
   - With the flag cleared, a later removal or move of that water body (F-REDERIVE, an edit) leaves the foot on the
     frame for ever, so the frame is not restored. With the flag kept, the shore's removal leaves frame | frame and
     dissolves the foot, restoring the frame. That is the fresh form.
   - While the shore lives, v has degree 3 and cannot dissolve.
   - I found no reader that assumes such a foot is unflagged. VERTEX_SPLIT is read only in the kernel; there are no
     vertex rows in the log; a pin would block dissolution anyway; and frame vertices are not warped.
   - The shore/shore events are the same shape: one body's leave point on another's run. The leave is at 5° or more, so
     the off-run pair cannot dissolve a needed point (R8).
2. **The leaning to S: I agree.** The reasons:
   - R1: F's no-interim-state premise is false.
   - The reach (R4) would turn LINE 7 (c) from a net into a listing.
   - The queue row already routes Q181 after RQ2 (R11).
   - S11 can use leg 3's generator and oracles (R9).
   - The pins lose nothing (R10).

   What the RQ2 round does lose without the rule:
   - In the interim, W writes nothing where a two-step removal cleared the flag (the W2 class). M0 keeps no arena
     across versions (R17), so nothing persists.
   - S11's shift is not purely flag bits once W exists. W reads the flag, so kept flags can make W write `shape` rows at
     later commits, and leg 3's R9 oracle may meet new degree-2 class vertices. S11 must measure rows as well as bits.

   **The cheap proof S11 can give:** run the CITY seeds, the roots and S7's golden probe, base → tree, twice:
   - once raw, where the roots move and are named;
   - once with the print's vertex flag bit 4 masked, `unflagged` dropped from the records, and `shape` rows listed.

   The masked prints must be identical, except for each dissolution or `shape` row, each named with its seed, batch and
   vertex. That costs one extra pass of runs the round already makes.

   Ruling text for S11: a declared shift of flag bytes and the roots of every derivation with water at the frame.
3. **LINE 8's pins as a build seat would read them:**
   - OLD is killed by Q1 – Q4, Q6 and Q7.
   - ROW-OFF is killed by Q5 and BEFORE by Q4 (CONFIRMED, `p4-pins.log`).
   - ONE-LEVEL-OFF on Q9: killable at that batch's own flag (PLAUSIBLE).
   - Wrong builds that pass every pin:
     - EVERY (R6, CONFIRMED on Q1 – Q6);
     - a build that reads the common row at ANY level while still requiring one level (no pin has two same-level edges
       sharing only a finer row; PLAUSIBLE);
     - a build that leaves warp's `sameRun` unchanged, which is outside the line (R3).
   - The edit to LINE 7 is not honest about scale, and its closing check cannot judge "no other output moves" without
     the masked comparison above.
   - The fold disturbs no ruling of R1 – R17. It does disturb the routing J776 settled (R11).
4. **If the reach had been zero,** F would have been cheap, though still subject to R1. It is not zero, so S.

## E. Side findings

- The throw: R7, a defect of M0 reachable by a lawful caller.
- K3: EVERY closes it with nothing measured red (R6). "Lowest only" is a narrowness, not a guard.
- F5: no one-level reading closes it, because it needs the mixed pair. It stays a notes row.

## What I could not check

- Q7 – Q9 were not run under any mutant.
- No CITY derivation or root was run, and the masked comparison is proposed, not built.
- No real W or commit hook: the RQ2 emulation is the ruling seat's proxy.
- `removals.test.ts` and `restore.test.ts` were run only in project kernel, one file at a time. No other folder ran
  under EVERY.
- I did not trace whether any M0 pipeline later removes or moves a water body inside one arena. That would turn R4's
  bit flips into dissolutions.
- R2's crossing subclass in real pipelines (a street grid whose polylines list their crossings) is unmeasured.
- R3 was not run through a smoothing step, only a constant drag.
