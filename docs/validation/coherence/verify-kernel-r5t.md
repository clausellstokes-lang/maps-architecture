# Coherence verify — base part §3 geometry kernel, round 5 (coherence/verify-kernel-r5t)

> Opus seat standing in for the verifier; round 5 after coherence/assemble-r5. PENDING FABLE REVIEW.

PROGRESS (lane `coherence/verify-kernel-r5t`, 2026-10-01, cloud checkout)
- P0 brief read whole (round-5 notes, owner rules 114–126, orchestration notes); resume state: no output, no LANDED line — fresh start: done
- P1 orientation: live base sha256 `2d84eac2…` (assemble-r5's output), pre-round base `5f34cceb…` (HEAD `3310b538`); §3 diff r4 → r5: done (2 hunks, the kernel's)
- P2 the 2 round-4 findings VKr4-01, VKr4-02 re-checked against the live text and adjudication-r5 Part H (FIX, amended; FIX): done
- P3 §3.2 (the kernel's REPLACE block) read whole; the repair's own added clause (`VG`) checked against V07; seams under §3's pointers in other units' round-5 text (R5-02's (7)): done
- P4 g items (canon routings through item 126; adjudication-r5 Part I) for kernel parts; phone clauses: done
- P5 references, ids, retired terms, deferral wording, doc checks: done
- P6 issues, result JSON, LANDED: done

## Outcome

**Both round-4 findings are fixed in the live text**, each as adjudication-r5 Part H disposed it:

- **VKr4-01 (kernel; FIX, amended).** §3.2 (9) (c) carries the ruled sentence with Part H's amendment word for word. The
  `Frame` record carries clause (2) as written.
- **VKr4-02 (scope; FIX, one fix with VKr4-01).** §13.1's kernel set carries the reverse-fold fixture. It runs (a) and (c)
  without (b), which is what Part H requires.

Neither is partly fixed, fixed wrongly or skipped. Part H gives no END line under the kernel, and none for either id.

**0 new issues: 0 blocker, 0 major, 0 minor.**

The kernel's round-5 text is the two hunks repair-r5-kernel.md declares, and no other unit's block touches §3. The repair
also added one clause the ruling did not order: the `VG` preset's share in the `Frame` comment. It agrees with V07 and
closes the same gap in the record's other case (Method 3), so it is not a defect.

No dated ruling of canon.md through "2026-10-01 (adjudication round 5)" names a kernel part, and neither does any g item
through 126, the file's last. So there is no F-MISSING. R5-02, which supersedes R4-09 whole, binds the kernel only through
§3.2 (9) as "a frame growth's extension of its deck", and the live §3.2 (9) agrees with §2.7's new support step (7).
§3 holds no phone clause (item 126 (a2)) and still reads no dossier field (item 125; §3.11).

## Sizes

| measure | archive §3 | round 4 (`5f34cceb…`) | live (`2d84eac2…`) |
|---|---|---|---|
| words (`wc -w` on the section as extracted, l. 3496–4812, heading included) | 23 323 | 25 018 | 25 130 (+112; +7.7 % on the archive) |
| lines | 1 228 | 1 312 | 1 317 |

All of the +112 words are VKr4-01's two edits. repair-r5-kernel.md counts +119 by its own extraction. Nothing was removed,
so no nuance audit was required. The part stays above the shrink band for the reason round 0 gave. This round adds a
defined outcome for an undefined edge, which principle (11) requires, so the growth is not a defect.

## Method

1. **§3 diff.** §3 was extracted from the pre-round base (`git show 3310b538:docs/ARCHITECTURE.md`, sha256 `5f34cceb…`,
   the base every repair-r5 file was written against) and from the live base. The live sha256 `2d84eac2…` equals
   assemble-r5's recorded output. The diff has two hunks:
   - l. 3577, the `Frame` record's `marginShare` comment. The old text is kept whole as the comment's prefix, with two
     clauses appended.
   - l. 3671–3675, five lines appended to §3.2 (9) (c).

   This is exactly repair-r5-kernel.md's one REPLACE block. Every other line of §3.2 is verbatim, and nothing was deleted.
2. **The ruled text against Part H.**
   - **(c) sentence.** Part H's amendment replaces the parenthesis "at a change of frame law only (… regrowing across a
     village band, its territory frame plus `territory.marginShare` within the arena it kept)" with "after a change of
     frame law only (a town handed down to the village product, item 322, its territory frame growing within the arena it
     kept — at a village band's re-crossing or at a later growth inside that arena)". The live l. 3671–3673 reads exactly
     that. The rest of the sentence is as the round-4 required change wrote it: "(b) does not run, and `Plat.frame` takes
     the new frame as this batch commits, its `marginShare` the kept arena's own share of it, (arena width ÷ frame width
     − 1) ÷ 2, so the arena still spans the frame plus `marginShare`."
   - **Clause (2).** "; the kept arena's own share where an epoch's growth kept a wider arena (§3.2 (9))" follows
     "`territory.marginShare` under the `territory` law (V07 §3.2 (1))", as written.
3. **The new text, walked through.**
   - **Trigger.** Per §4.11 *The rung at an epoch*, the frame grows only at an upward crossing. The two downward
     crossings of the case grow nothing:
     - the hand-off down below 1 425 (V07 §2.1);
     - the fall below 400.

     That holds even though the territory law at 1 424 people would give 40.5 km². At the 400 re-crossing the VILLAGE
     row's law (V07 §3.2 (1); `minKm2` 4.0, V07 l. 468) gives 11.375 km², a 3 373 m square. The TOWN frame was 7.2 km²,
     a 2 683 m square. Its arena is 4 293 m, wider than 3 373 × 1.2 = 4 047 m, so the arena is kept. Only (a) and (c)
     run.
   - **Kept share.** The kept share is (4 293 ÷ 3 373 − 1) ÷ 2 ≈ 0.136.
   - **The next growth.** The hand-off up at 1 575 keeps the frame, since the TOWN law gives 1.26 km². It grows the
     arena by (b) to 3 373 × 1.6 = 5 397 m, because the next growth reads the current law's margin, not the record's
     share.
   - **"Only" is complete.** Under one law, a kept frame keeps the arena and a grown frame grows it. At the village →
     town fold the frame is kept, because the arena side's factor of 1.2 is less than 1.6. So the case arises only after a
     hand-down. Part H's "later growth inside that arena" covers its repeats.
   - **No other ring moves.** With the arena kept, no ring moves. That means no foot batch, no raster change, no S1 ring
     and no change to the other parts' rings (§2.2 rule 1).
   - **Undo.** Undo restores the old `Frame` whole ("its undo record restores the old frame").
   - **Aspect.** The width-based share equals the height-based one, because the frame keeps its aspect.

   The `VG` clause, "`vg.marginM` ÷ the view's side under the `VG` parity preset (V07 §3.15)", was checked against V07:
   - l. 467: the frame is VG's 210 / 350 / 560 m square view, plus the ≈ 34 m margin;
   - l. 564: the `vg` rules group, commented V07 §3.15;
   - l. 603: margin 34 m;
   - V07 §3.2 (1): "The `VG` preset replaces it by VG's view".

   The clause restates no value. It makes the record true in a case it previously contradicted. Epochs do run under
   `VG` (V06 l. 504), so the clause has a reader.
4. **Round-4 findings.** Each was re-checked at the lines its required change named, against Part H (table below).
5. **Seams.**
   - **Added lines.** All 859 r4 → r5 added lines of the base, the rationale and the volumes were scanned for pointers
     into §3. Wrapped `Vnn §3.x` references and line-wrap starts were set aside. The remaining base pointers resolve, and
     their claims agree with §3:
     - §2.7 `RaisedFoot`'s comment (l. 2309–2317): §3.2 (9), §3.4;
     - R5-02's (6)–(7) at §2.7: §3.2 (9);
     - §4.11 *The rung at an epoch* (l. 8511, l. 8521–8523): §3.2 (9), §3.4, §2.7's support step (7);
     - §13.1's kernel set (l. 17654–17662): §3.2 (9), §3.6, §3.4, §3.10;
     - T110-2's frame-growth clause (l. 18469): §3.2 (9);
     - V04 (five rows) and V06 (one row): "the frame growth's deck extension, §3.2 (9)";
     - rewrapped pre-existing pointers: §3.1, §3.3's `KernelTx.prepared`, §3.6 rule 3, §3.8's three readers (J-A28.32),
       §3.9.
   - **R5-02 and the kernel.**
     - §3.2 (9)'s "the raised way's re-derivation then extends the deck to the new ring and re-places both ends of that
       foot" is the op §2.7's support step (6) admits ("a frame growth's extension of its deck by (7)").
     - (7) runs the step "from the old deck's last interior station … to the deck's new end on the new ring", which
       agrees with it.
     - §3.4's raised-way paragraph (l. 4149–4154, 4162–4173) states no re-run of the support step and no station rule,
       so nothing in §3 restates what R5-02 removed (the last support run, re-siting, a later trace taking a station).
   - **Readers of the frame.** The set-wide readers of `Plat.frame` and `marginShare` were read:
     - §2.2's `Plat.frame` comment (l. 590);
     - §7.4's frame row;
     - §8.8's `DisplayList.bounds` (l. 14187);
     - V07's W79, l. 3299 and T-V7-64 (the limit moves with the frame, now at (c)'s commit);
     - J-A81.31 and J-A81.41 (rationale unchanged, `a480f02e…`).

     None contradicts the kept-arena case. §4.11's list of the three batches defers to "§3.2 (9)'s single-level batches",
     as it did for the fold's (b)-only case.
6. **g items and canon.**
   - canon.md's dated rulings through "2026-10-01 (adjudication round 5)" name no kernel part. That ruling's raised-way
     entry homes at §2.7's support step (3), (6) and (7).
   - adjudication-r5's Part I names no kernel part either.
   - docs/AMENDMENTS-2026-09-28g.md ends at item 126.
7. **Edges.**
   - edges.json holds no kernel entry for the new case. Its frame and `VG` entries are V07's and V04's validation records,
     not design text.
   - §3.11's rows cover the case:
     - "save, load, undo, redo, regenerate, migrate": the undo record restores the old frame;
     - "every toggle and preset": `VG` is read through V07's law, never by the kernel;
     - "every rung": "a village frame is a smaller rectangle by its law" sits beside "the range invariant holds at the
       largest frame", so it means smaller than the cap's frame. That is true: at most ≈ 42.6 km² below 1 500 people.
8. **Scans.**
   - Retired terms: canon.json's 35 glossary patterns give 0 hits in live §3, as before.
   - Deferral: the one "later" on the new lines ("a later growth inside that arena", Part H's words) orders two events
     and leaves no choice open.
   - Phone, mobile or small-screen clauses: 0 in §3.
   - Review ids: 0 in §3, and none on the new lines.
   - "etc.", "as appropriate", "similar rules apply": none on the new lines.
   - Ids: the kernel added none.
9. **Doc checks** (`python3 docs/validation/bench/doc_checks.py --doc docs/ARCHITECTURE.md --sections 3 --allow
   docs/validation/doc-checks-allow.tsv`): exit 0.
   - Hits / unreviewed: C1 5/0, C2 1/0, C3 95/0, C4 0/0, S1 0/0, S2 287/0.
   - S2 counts the whole document, which grew from 272 with other units' new pointers. The rest is identical to round 4.
   - The script warns "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs,
     research/ftg-docs, research/external) - clean-room results are NOT authoritative". The result is therefore
     **PROVISIONAL** until it is re-run on the machine that holds the corpus.
   - assemble-r5's resolver reports 0 broken references set-wide (56 169 checked). The new pointers on l. 3577 (§3.2 (9),
     V07 §3.2 (1), V07 §3.15) were read at their targets.

## Round-4 findings — status on the live text

| id | owner | disposition (adjudication-r5 Part H) | status | where (live `docs/ARCHITECTURE.md`) |
|---|---|---|---|---|
| VKr4-01 | kernel | FIX, amended | FIXED | §3.2 (9) (c), l. 3671–3675: "Where the frame grows and the arena is kept — after a change of frame law only (a town handed down to the village product, item 322, its territory frame growing within the arena it kept — at a village band's re-crossing or at a later growth inside that arena) — (b) does not run, and `Plat.frame` takes the new frame as this batch commits, its `marginShare` the kept arena's own share of it, (arena width ÷ frame width − 1) ÷ 2, so the arena still spans the frame plus `marginShare`." This is Part H's amended parenthesis verbatim, with the rest as written. The `Frame` comment, l. 3577: "…under the `territory` law (V07 §3.2 (1)); the kept arena's own share where an epoch's growth kept a wider arena (§3.2 (9))" ((2) as written), followed by the repair's `VG` clause, which agrees with V07 (Method 3). Item 116's zoom-out limit (§8.8; V07 W79, T-V7-64) now reads a frame replaced at (c)'s commit |
| VKr4-02 | scope | FIX (one fix with VKr4-01) | FIXED | §13.1's kernel set, l. 17656–17660: "a village → town fold (…; §3.2 (9)), and its reverse — a TOWN made at 9 000 people handed down to the village product, falling below 400 and re-crossing it (the frame grown to the territory law's 3 373 m square, the arena kept at 4 293 m: (a) and (c) only, `Plat.frame` the new frame as (c) commits, its `marginShare` the kept arena's share; the hand-off up at 1 575 then growing the arena by (b) to 5 397 m; §3.2 (9));". This is the required text, with "its reverse" for "the reverse", a wording point that keeps the case. It runs (a) and (c) without (b), as Part H requires, and agrees with the kernel's sentence and its arithmetic (Method 3) |

## Issues

None. No finding of any severity is raised this round.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read):**
- the two base hashes and the §3 diff (2 hunks, the kernel's; nothing deleted);
- both round-4 findings' status at the lines cited, against Part H's disposition and amendment;
- the case's arithmetic from §1.1's ladder, V07 §3.2 (1)'s law and V07 l. 468's `minKm2`, and §4.11's upward-crossing
  trigger;
- the `VG` clause against V07 l. 467, 564 and 603 and V07 §3.2 (1);
- the 859 added lines' §3 pointers;
- R5-02 (6)–(7) against §3.2 (9) and §3.4;
- the set-wide readers of `Plat.frame` and `marginShare`;
- canon's dated rulings through "adjudication round 5", and the g file ending at item 126;
- the retired-term scan (0 of 35), and the phone, deferral and review-id scans;
- the doc checks (exit 0, provisional) and the sizes.

**PLAUSIBLE:**
- That V07's 34 m `VG` margin is per side, as the base comment reads it ("context margin per side"). V07 l. 467 says
  "plus its 48-unit ≈ 34 m margin" around a square view. That is the usual per-side reading, and the base restates no
  value.
