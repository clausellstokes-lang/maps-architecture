# Coherence verify — base part §3 geometry kernel, round 4 (coherence/verify-kernel-r4t)

> Opus seat standing in for the verifier; round 4 after coherence/assemble-r4. PENDING FABLE REVIEW.

PROGRESS (lane `coherence/verify-kernel-r4t`, 2026-10-01, cloud checkout)
- P0 brief read whole (round-4 notes, owner rules 114–126, orchestration notes); resume state: no output, no LANDED line — fresh start: done
- P1 orientation: live base sha256 `5f34cceb…` (assemble-r4's output), pre-round base `593c657d…` (HEAD `96bdae2`); §3 diff r3 → r4: done (1 hunk, the kernel's)
- P2 the 4 round-3 findings VKr3-01 – VKr3-04 re-checked against the live text and adjudication-r4's dispositions, second ends included: done
- P3 §3.2 (the kernel's REPLACE block) read whole; repair-r4-kernel's observations weighed; seams under §3's pointers in other units' round-4 text: done
- P4 g items (canon routings through item 126; adjudication-r4 Part I) for kernel parts; phone clauses: done
- P5 references, ids, retired terms, deferral wording, doc checks: done
- P6 issues, result JSON, LANDED: done

## Outcome

**All 4 round-3 findings are fixed in the live text**, each as adjudication-r4 Part H disposed it (all four plain FIX):

- VKr3-01 (pipeline): §4.11's raised re-derivation and its batch summary, and J-A81.41, all three parts verbatim;
- VKr3-02 (kernel): §3.2 (9)'s growth condition, with three wording points that keep the rule (below);
- VKr3-03 (scope): §13.1's fixture, verbatim;
- VKr3-04 (model): §2.7 `RaisedFoot`'s comment verbatim, and its writer list conformed in the same block.

None is partly fixed, fixed wrongly or skipped. Part H lists no END line for any of them and none for the kernel. The
kernel's round-4 text is exactly the one hunk repair-r4-kernel.md declares, and no other unit's block touches §3.

No dated ruling of canon.md through "2026-10-01 (adjudication round 4)", and no g item through 126 (the file's last),
names a kernel part, so there is no F-MISSING. R4-09 binds the kernel only through §3.2 (9) as "a frame growth's
extension of its deck", which the live text carries unchanged. §3 holds no phone clause (item 126 (a2)) and still reads
no dossier field (item 125; §3.11).

**2 new issues — 0 blocker, 2 major, 0 minor** (owners: kernel 1, scope 1). Both concern one case of §3.2 (9) that
repair-r4-kernel.md observed in passing (its observation 1) and handed to this verifier; it is confirmed here with
numbers:

- **VKr4-01 (major, kernel).** A growth at a change of frame law can grow the frame and keep the arena: a TOWN made at
  9 000 people, handed down to the village product, falling below 400 and re-crossing it. Then only (a) and (c) run,
  but `Plat.frame`'s replacement is stated only inside (b), and the new `Frame.marginShare` breaks "the arena spans the
  frame plus `marginShare`" by 123 m a side. A builder who follows the text leaves a stale frame under a grown border,
  and the next hand-off up then never grows the arena.
- **VKr4-02 (major, scope).** No fixture runs that case.

The case predates round 4 (it entered with the frame laws of f item 279 and the product fold of item 322); this round's
change neither opens nor widens it in any measurable way. It is raised now because round 4's block replaced §3.2 whole,
and the kernel seat put it before this verifier.

## Sizes

| measure | archive §3 | round 3 (`593c657d…`) | live (`5f34cceb…`) |
|---|---|---|---|
| words (`wc -w` on the section as extracted, heading included) | 23 323 | 24 946 | 25 018 (+72; +7.3 % on the archive) |
| lines | 1 228 | 1 308 | 1 312 |

The +72 words are VKr3-02's sentence. repair-r4-kernel.md counts +73 by its own extraction. Nothing was removed, so no
nuance audit was required. The part stays above the shrink band for the reason round 0 gave; this round's growth is a
defined outcome for an undefined edge, which principle (11) requires. That is not a defect.

## Method

1. **§3 diff.** §3 was extracted from the pre-round base (`git show 96bdae2:docs/ARCHITECTURE.md`, sha256
   `593c657d…`, the base every repair-r4 file was written against) and from the live base (sha256 `5f34cceb…`,
   assemble-r4's recorded output). The diff is one hunk (l. 3630–3637): §3.2 (9)'s sentence defining the new frame and
   arena. This is exactly repair-r4-kernel.md's one REPLACE block. The rest of §3.2 is verbatim.
2. **§3.2 read whole** (l. 3558–3686). The new sentence was checked against the mechanisms it calls:
   - §3.6 step 2 *Vertex attraction* and step 3 *Segment and stretch attraction* (l. 4292–4309), which the titled
     citation resolves to;
   - `attractCm` = `minEdge` + 1 cm (§3.2 (2));
   - (b)'s foot batch, which moves a foot to the new ring's nearest point;
   - §4.11's through-road continuation;
   - the cap clamp.

   **The three wording points of the VKr3-02 fix.** The required change was applied "as written" except for three
   points, and each keeps the rule:
   - "any side" is written "one of its sides". This is the same existence test, with no "every side" reading left open.
   - "§3.6 steps 2–3" is written "§3.6's vertex and stretch attraction". These are the same two steps, by title.
   - The added closing clause, "no through-road's continuation … or raised foot's move … spans `attractCm` or less",
     follows from the rule:
     - every side that moves now moves more than `attractCm`;
     - the continuation's length is at least that move;
     - a foot's distance to the new ring's nearest point is the smallest side move.

   **The kernel seat's reasoning (ISSUES (i)–(v)).** Each point holds:
   - Under one law, a kept frame keeps the arena, and a grown frame grows every arena side by (1 + 2·`marginShare`)
     times its move.
   - Rounding is monotone, because the law's area only rises at an upward crossing.
   - A frame within `attractCm` of the cap's frame stays.

   **The fixture.** At 10 005 → 10 007 people, aspect 1, the side moves are 17.7 cm (frame) and ≈ 28 cm (arena). The
   kept frame keeps the arena, so nothing runs.

   §3.11's caps and rungs rows and §3.3's clear-region list cite §3.2 (9) without restating the condition.
3. **Round-3 findings.** Each was re-checked at the lines its required change named, against Part H's disposition
   (table below).
4. **Seams.**
   - **Bare references.** Every r3 → r4 added line of the base, the rationale and the volumes (1 279) was scanned for
     bare `§3.x` references. Of the 29 found, 4 are wrapped `Vnn` references (V08 l. 3224, V09 l. 3650, V10 l. 2054,
     and one V06 range), and 1 is T-ER-19's pre-existing "§3.1 … §3.6 rule 3", unchanged since round 3 and resolving
     to §3.6's `splitFace` contact rule 3. The rest are correct base pointers:
     - §2.7's `RaisedFoot` writer list and comment, and R4-09's (6) (b): §3.2 (9), §3.4, §3.10;
     - §3.2's own §3.6;
     - §4.11: §3.2 (9), §3.4, §3.7;
     - §13.1: §3.9, §3.2 (9);
     - V04's five frame-growth deck-extension rows, V06 l. 2737 and V11 l. 208: §3.2 (9) and §3.4.
   - **Kernel tokens.** A second scan looked for kernel ops, types and `E_`/`W_` codes:
     - None of the 7 codes on the added lines is §3.1's: 6 are port or export codes, plus model's `W_RAISED_CROSSING`.
     - Kernel tokens occur only on §3.2's, §4.11's and §13.1's lines.
   - **Frame-growth restatements.** These were searched set-wide ("no larger", "never shrink", the batch summaries):
     - §4.11 (l. 8475, 8488), J-A81.31 (index row and Part A), J-A81.41 and V06 l. 1437 and 3318 agree with the live
       rule.
     - None restates the keep condition.
5. **g items.** canon.md's dated rulings through "2026-10-01 (adjudication round 4)" (its R4-09 entry: home §2.7's
   support step (6)) and adjudication-r4's Part I name no kernel part. docs/AMENDMENTS-2026-09-28g.md ends at item 126.
6. **Edges.** repair-r4-kernel.md's two observations were weighed:
   - Observation 2 (edges.json /edges[2677], EI-KERNEL-EDGESOBSERVED-007) is answered by §3.2 (9)'s "where neither
     grows, nothing runs". edges.json is a validation record, not design text, so nothing is raised.
   - Observation 1 was walked through with §1.1's ladder (TOWN 4 km² at 5 000; the VILLAGE row's territory law, V07
     §3.2 (1): 2.275 ha a head, `usableShare` 0.8, `minKm2` 4.0, `marginShare` 0.1) and V07 §2.1's hand-off band
     (down below 1 425 to the rung VILLAGE, up at 1 575). It is VKr4-01.
   - The case's readers of `Plat.frame` were found: §8.8's zoom-out limit bounds (V07's W79, T-V7-64), §7.4's frame row,
     and the next growth's "current frame".
   - The existing tests were searched: §13.1's fold fixture, T-V7-14 and T-V7-64. None runs that case (VKr4-02).
7. **Scans.**
   - Retired terms: canon's 35 glossary patterns give 0 hits in live §3.
   - Deferral: none. §3's 12 "later" all mean an order of batches or ops, and none is on a new line.
   - Phone, mobile or small-screen clauses: none.
   - Review ids and "etc." / "as appropriate" / "similar rules apply" on the new lines: none.
   - Ids: the kernel added none.
8. **Doc checks** (`python3 docs/validation/bench/doc_checks.py --doc docs/ARCHITECTURE.md --sections 3 --allow
   docs/validation/doc-checks-allow.tsv`): exit 0. Hits / unreviewed: C1 5/0, C2 1/0, C3 95/0, C4 0/0, S1 0/0,
   S2 272/0. S2 counts the whole document, which grew from 251. The rest is identical to round 3. The script warns
   "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs,
   research/external) - clean-room results are NOT authoritative". The result is therefore **PROVISIONAL** until it is
   re-run on the machine that holds the corpus. assemble-r4's resolver reports 0 broken references set-wide (55 885
   checked); both new §3 pointers (§3.6, §4.11) were read at their targets.

## Round-3 findings — status on the live text

| id | owner | disposition (adjudication-r4 Part H) | status | where (live `docs/ARCHITECTURE.md` unless named) |
|---|---|---|---|---|
| VKr3-01 | pipeline | FIX | FIXED | §4.11 *The rung at an epoch*, l. 8475: "an L0 batch replacing the `margin` chain (on part 0 two, a raised way's ring-end foot moved between them, §3.2 (9)), an"; l. 8485–8487: "…`corridorUnion` (§3.7), which draws nothing; on each raised part of the ground layer §3.2 (9) grows, its raised way's re-derivation (§3.4) for that part's cleared faces, which also extends a deck ending on the old ring to the new ring and re-places both ends of that foot (§2.7 `RaisedFoot`))"; rationale J-A81.41 (l. 639): "an L0 batch that replaces the margin chain (on part 0 two where a raised way's foot lies at a deck end on the old ring)". All three verbatim; T110-2's clause (l. 18395–18397) can now pass. Consistent with R4-09 (b), which admits "a frame growth's extension of its deck, §3.2 (9)" among the ops that change a standing raised way (l. 2597) |
| VKr3-02 | kernel | FIX | FIXED | §3.2 (9), l. 3630–3637: "kept at the current frame where that is no larger or would move one of its sides out by at most `attractCm` ((2); measured on the lattice); the new arena is the new frame plus the current law's margin, kept at the current arena where that is no larger or would move one of its sides out by at most `attractCm` — so no new chain is laid within attraction of the chain it replaces, which §3.6's vertex and stretch attraction would merge into it before the strip removes its rows, and no through-road's continuation (§4.11) or raised foot's move (below) spans `attractCm` or less." Three wording points, each the same rule (Method 2) |
| VKr3-03 | scope | FIX (one fix with VKr3-02) | FIXED | §13.1's kernel set, l. 17592–17594: "and one whose law would move a side out by at most `attractCm` — a CITY frame kept through a decline below 10 000 people, re-crossing two people above its peak (frame and arena kept, nothing runs, no chain stripped; §3.2 (9)) —" verbatim; agrees with the kernel's rule (17.7 cm ≤ 26 cm) |
| VKr3-04 | model | FIX | FIXED | §2.7 `RaisedFoot` comment, l. 2315–2317: "A frame growth (§3.2 (9)) first moves the foot's ground end onto the new ring (its foot batch, between part 0's two L0 batches), then extends the deck to the new ring as §4.11 continues a through-road, the raised way's re-derivation re-placing both ends…" verbatim; the writer list (l. 2309) also gains "a ring-end foot's ground end moved first by a frame growth's foot batch (§3.2 (9); below)" — consistent with §3.2 (9) l. 3658–3668 |

## Issues

### VKr4-01 — major — EDGE-UNDEFINED — owner: kernel

**Claim.** §3.2 (9) runs "(b) when the arena grows, (a) and (c) when the frame grows" (l. 3639–3640). It states the
replacement of the frame record only inside (b): "`Plat.frame` takes the new frame as its last batch commits"
(l. 3652). The new arena is "the new frame plus the current law's margin, kept at the current arena where that is no
larger …" (l. 3631–3633), and "a change of frame law" is included (l. 3635–3636). So a growth at a change of frame law
can grow the frame while keeping the arena.

The case is reachable:
1. A TOWN is made at 9 000 people. The base law gives 4 km² × 9 000 ÷ 5 000 = 7.2 km², a 2 683 m square, and an arena
   2 683 × 1.6 = 4 293 m.
2. It falls below 1 425. V07 §2.1's hand-off down gives the village product at the rung VILLAGE, with the frame and
   arena kept.
3. It falls below 400 (HAMLET).
4. It re-crosses 400 upward. The VILLAGE row's territory law (V07 §3.2 (1)) gives max(4.0, 2.275 ha × 400 ÷ 0.8 ÷ 100)
   = 11.375 km², a 3 373 m square. The frame therefore grows 345 m a side. The law's arena, 3 373 × 1.2 = 4 047 m, is
   less than 4 293 m, so the arena is kept.

Only (a) and (c) run, and two things are then undefined:
- **When `Plat.frame` takes the new frame.**
- **The new `Frame`'s `marginShare`.** By the record's comment (l. 3562) it is the law's 0.1. That breaks "the arena
  spans the frame plus `marginShare` on every side" (l. 3621) by 123 m a side.

A builder who updates `Plat.frame` in (b)'s step, as the text places it, leaves it at 2 683 m under a 3 373 m `border`.
Two readers then go wrong:
- **The zoom-out limit.** Its bounds (§8.8's `DisplayList.bounds`; V07's W79, T-V7-64) do not move.
- **The next hand-off up.** At 1 575 people the TOWN law gives 1.26 km², so the frame is kept. That builder's arena is
  2 683 × 1.6 = 4 293 m, the current one, so nothing runs. Under the stated design the arena grows to
  3 373 × 1.6 = 5 397 m by (b).

Two builders therefore build different behaviour, on a defined, if rare, epoch path (principle (11)). repair-r4-kernel.md
recorded the case as its observation 1. It predates round 4, which neither opens nor widens it.

**Required change.**
1. §3.2 (9) (c), l. 3655: after "the settlement perimeter or a reservation boundary along the frame (§2.2 rule 1) —
   stays." append " Where the frame grows and the arena is kept — at a change of frame law only (a town handed down to
   the village product, item 322, regrowing across a village band, its territory frame plus `territory.marginShare`
   within the arena it kept) — (b) does not run, and `Plat.frame` takes the new frame as this batch commits, its
   `marginShare` the kept arena's own share of it, (arena width ÷ frame width − 1) ÷ 2, so the arena still spans the
   frame plus `marginShare`."
2. The `Frame` interface's `marginShare` comment, l. 3562: after "`territory.marginShare` under the `territory` law
   (V07 §3.2 (1))" insert "; the kept arena's own share where an epoch's growth kept a wider arena (§3.2 (9))".

### VKr4-02 — major — EDGE-UNTESTED — owner: scope

**Claim.** §13.1's kernel set (l. 17594–17595) grows a frame at a change of law only in "a village → town fold (the
frame kept, the arena by the new law's margin, neither shrinking; §3.2 (9))". That is the case where only (b) runs.

No fixture runs the reverse, where only (a) and (c) run (VKr4-01):
- T-V7-14's 1 400 / 1 600 alternation never regrows inside the village product.
- T-V7-64 grows a village's frame under one law.
- T81-1 and T110-2 grow across a crossing under one law.

Under principle (11), an untested edge is a MAJOR.

**Required change.** §13.1, l. 17594–17595: replace "and a village → town fold (the frame kept, the arena by the new
law's margin, neither shrinking; §3.2 (9));" with "a village → town fold (the frame kept, the arena by the new law's
margin, neither shrinking; §3.2 (9)), and the reverse — a TOWN made at 9 000 people handed down to the village product,
falling below 400 and re-crossing it (the frame grown to the territory law's 3 373 m square, the arena kept at 4 293 m:
(a) and (c) only, `Plat.frame` the new frame as (c) commits, its `marginShare` the kept arena's share; the hand-off up
at 1 575 then growing the arena by (b) to 5 397 m; §3.2 (9));".

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read):**
- the two base hashes and the §3 diff (1 hunk, the kernel's);
- every round-3 finding's status at the lines cited, against Part H;
- the VKr3-02 sentence against §3.6 steps 2–3, §3.2 (2) and the fixture's arithmetic;
- the 29 bare-reference lines and the code and token scans;
- the set-wide frame-growth restatement search;
- canon's dated rulings through "adjudication round 4", and the g file ending at item 126;
- the retired-term scan (0 of 35), and the phone, deferral and review-id scans;
- the doc checks (exit 0, provisional) and the sizes;
- VKr4-01's arithmetic from §1.1's ladder, V07 §3.2 (1)'s law and table, and V07 §2.1's band;
- that (b) holds the only `Plat.frame` sentence (a set-wide search finds it only at l. 3652);
- the readers of the frame named in the claim.

**PLAUSIBLE:**
- That the kept arena's own share is the narrowest `marginShare` for VKr4-01. The kernel may instead keep the law's
  value and state that a reader sizing anything to "the frame plus its margin" (§2.2 rule 1, §2.7 *At the frame*)
  takes ground part 0's outer ring, provided `Plat.frame`'s replacement in that case is stated and VKr4-02 tests it.
- Whether any part is allocated while the arena is kept. At the village rungs V04's systems stay in maintenance mode
  and raised ways are gated to CITY, so the `marginShare` half may have no reader there. The `Plat.frame` half has
  readers.
