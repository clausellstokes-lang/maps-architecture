# Coherence verify — base part §3 geometry kernel, round 6 (coherence/verify-kernel-r6t)

> Opus seat standing in for the verifier; round 6 after coherence/assemble-r6. PENDING FABLE REVIEW.

PROGRESS (lane `coherence/verify-kernel-r6t`, 2026-10-01, cloud checkout)
- P0 brief read whole (round-6 notes, owner rules 114–126, orchestration notes); resume state: no output, no LANDED line — fresh start: done
- P1 orientation: live base sha256 `f39f1c30…` (assemble-r6's output), pre-round base `2d84eac2…` (HEAD blob at `b3f83a0d`); §3 diff r5 → r6: done (0 hunks; §3 moved l. 3496 → 3595, byte-identical)
- P2 round-5 findings re-checked (none raised in r5t); kernel work file and repair file (none exist); adjudication-r6 Part H, END lines and Part P for kernel ends; the kernel's round-5 hand-off at V07: done
- P3 R6-02 crossing family and R6-03 `lateCalamities` against §3 (notes (6) (b) (i)–(iii), (6) (c)): done
- P4 seams: the r5 → r6 added lines of the base, the rationale and the volumes that point into §3 or use its ops and codes: done
- P5 g items and canon's dated rulings since round 5 for kernel parts; phone clauses: done
- P6 references, ids, retired terms, deferral wording, doc checks: done
- P7 issues, result JSON, LANDED: done

## Outcome

**0 issues: 0 blocker, 0 major, 0 minor.**

- **Round 5 left nothing to re-check.** verify-kernel-r5t raised no finding.
- **Round 6 gave the kernel no work and no END line.** There is no `work/round6-work/kernel.json` and no
  `repair-r6-kernel.md`. adjudication-r6's Part H reads: "kernel (base §3) — Rulings: R6-01. No issue and no END line this
  round; the kernel's round-5 hand-off is closed under V07 (R6-01 (6))." assemble-r6 confirms it (l. 39): "Kernel had
  nothing to repair this round, so it has no file."
- **§3 is byte-identical to its round-5 text.** The only difference is that §3 moved down 99 lines because §2.7 grew.
- **The kernel's one open thread is closed.** That thread is the round-5 hand-off about the `VG` arena margin, which no
  test asserted. V07's T-V7-23 now asserts it.
- **R6-02 and R6-03 leave nothing standing in §3.** §3 holds no crossing station, raised gate, wall opening, held stretch
  or held-calamity clause. It cites neither of §2.7's two new tables, and it restates none of their cells.

## Sizes

| measure | archive §3 | round 5 (`2d84eac2…`) | live (`f39f1c30…`) |
|---|---|---|---|
| words (`wc -w` on the section as extracted, heading included) | 23 323 | 25 130 | 25 130 (± 0; +7.7 % on the archive) |
| lines | 1 228 | 1 317 | 1 317 |

Nothing was removed, so no nuance audit was required. The part stays above the shrink band for the reason round 0 gave.

## Method

1. **§3 diff.**
   - **Extraction.** §3 runs from `## §3 ` to `## §4 `. It was extracted from two bases:
     - the pre-round base, `git show b3f83a0d:docs/ARCHITECTURE.md`, sha256 `2d84eac2…`, which every repair-r6 file was
       written against;
     - the live base, sha256 `f39f1c30…`, which equals assemble-r6's recorded output (assemble-r6 §1).
   - **Result.** `diff` exits 0. The section moved from l. 3496 to l. 3595 because model's §2.7 block grew, and no word of
     it changed.
2. **Round-6 dispositions for the kernel.**
   - Part H's kernel heading gives no issue and no END line.
   - Part A's table gives no ruling request from repair-r5-kernel, and one hand-off, closed under V07 by R6-01 (6).
   - Part P (probe-r6's findings on R6-02 and R6-03) amends no kernel text.
   - R6-01 (5)'s supersessions (R5-02 except what R6-02 restates, R3-25 (d), R5-03's hold) name nothing §3 carries:
     - §3 never held R3-25 (d)'s band under a crossing station (grep below);
     - R5-02's only kernel tie was §2.7 (6)'s "a frame growth's extension of its deck by (7)", which R6-02's (M5) keeps.
3. **The kernel's round-5 hand-off, at its second end (V07).**
   - **The END line.** Part H · V07 orders T-V7-23 to add "; the arena's frame VG's view at `rules.vg.frameM` for the
     matched size plus `rules.vg.marginM` on each side (the base's `Frame.marginShare`, §3.2 (1))".
   - **What V07 wrote.** Live V07 l. 3658 carries those words with one change: "§3.2 (9)" for "§3.2 (1)".
   - **Why the change is right.**
     - The live base's §3.2 (1) is *Integer world and range*.
     - The `Frame` record heads §3.2 (l. 3675–3676).
     - The rule T-V7-23 asserts is §3.2 (9) (l. 3735): "the arena spans the frame plus `marginShare` on every side".

     So the written pointer is the one that resolves to the asserted rule, and the END's "(1)" would not. repair-r6-V07.md
     records the change as its note 3 ("base §3.2 (1) is *Integer world and range* … Every other word of the END as
     stated").
   - **The keys exist.** `rules.vg.frameM` and `rules.vg.marginM` are V07's `vg` group (l. 564: `frameM: Record<'small' |
     'medium' | 'large', M>; marginM: M`). The base's `Frame` comment reads `vg.marginM` ÷ the view's side under `VG`
     (V07 §3.15), which agrees.
   - **Verdict.** The hand-off is closed. The citation form keeps the END's meaning and resolves where the END's literal
     number would not, so it is not a defect.
4. **R6-02 (the crossing table and the way-and-channel table) against §3** (round-6 note (6) (b)).
   - **Terms.** Live §3 has 0 hits for "station", "raised gate", "wall opening", "held stretch" and "stretch … held".
   - **The 23 raised-way lines.** Every line of §3 naming a raised way, aqueduct, viaduct or deck was read in context. Each
     is one of:
     - §3.2 (9)'s frame growth: the foot batch between part 0's two L0 batches; the deck end on the raised part's old
       ring; "the raised way's re-derivation then extends the deck to the new ring and re-places both ends of that foot
       (§2.7 `RaisedFoot`, as §4.11 continues a through-road)";
     - §3.3's bridge decks on part 0, which are no raised way;
     - §3.4's raised-way paragraph: own ground part from 1, no junction with the part-0 ways (item 110 (b)'s owner
       words), piers as part-0 footprints read through §4.1's `raised` data key, feet as cross-part records;
     - §3.6's move rule (3): a raised way's part-0 feet stay put under a part-0 warp;
     - §3.7's arena list;
     - §3.10's stored-references and arena-isolation rows.
   - **(i) Cells read.** None of these lines meets a wall, so §3 reads no cell of either table, and (i) has no cell to
     check in this scope.
   - **(ii) Restatements.** No line restates a table, and none keeps any of R6-02's removed pieces.
   - **(iii) Citations.** There is no citation of either table in §3, so (iii) has nothing to resolve.
   - **The one cell family that meets a kernel mechanism, C12 ("extended by a frame growth"), read at its homes.**
     - §2.7 (7) (l. 2713) cites "(§3.2 (9))" for the growth.
     - §2.7 `RaisedFoot` (l. 2315–2318) says the growth "first moves the foot's ground end onto the new ring (its foot
       batch, between part 0's two L0 batches), then extends the deck …, the raised way's re-derivation re-placing both
       ends of that foot on the new rings, one transaction per part (§3.4)". That is §3.2 (9)'s order exactly.
     - Every C12 cell gives one outcome and names a test (W1·C12: T110-2's frame clause, l. 18526–18534; W2–W13·C12:
       T110-2 (4), (6), (8), T114-3, T-V6-73, T-V6-47, T-V6-11, T-V7-48's frame-growth clause, T-V5-14).
     - T110-2's frame clause asserts "after §4.11 both ends of its ring-end foot on the new rings (§2.7 `RaisedFoot`,
       §3.2 (9))", which agrees with §3.2 (9).
     - The new supports sliding off a band and the end span's carried `state` and hold are §2.7 (7)'s, which §3.2 (9)
       leaves to it by its `RaisedFoot` pointer. No kernel op is added or changed: the band is a part-0 corridor laid by
       §3.7's ops as anywhere, and a support is a record footprint, not a partition face.
   - **`W_RAISED_CROSSING`.** The tables report this code. It is a stage's non-kernel warning, listed in §5.4's
     `warnings` (l. 9332: "a stage's own non-kernel warning codes"), and §3.1's `Warning` union rightly omits it.
5. **R6-03 against §3** (note (6) (c)).
   - 0 hits for `lateCalamities`, "late calamity" and "held calamity".
   - §3's only "dossier" sentences are §3.11's row "the kernel reads no dossier field" and §3.1's mention of a subterranean
     dossier institution's connector at II.7.6.
   - So no held-calamity clause stands in §3, and item 125 holds.
6. **Seams** (other units' round-6 text pointing into §3).
   - **The scan.** 929 added lines were scanned (`git diff b3f83a0d` over the base, the rationale and the volumes). Two
     kinds of pointer were set aside: wrapped `Vnn §3.x` references and line-wrap starts after a `Vnn`. That left 16 bare
     base `§3.x` pointers, all read at their targets. Each resolves and agrees with §3:
     - base l. 2318 (`RaisedFoot`: §3.2 (9), §3.4);
     - base l. 2713 (§2.7 (7): §3.2 (9));
     - base l. 8566 (§4.11's raised parts: §3.2 (9), §3.4);
     - base l. 18621 ("volume 12 §3.6b", V12's own section, which exists, V12 l. 86);
     - V04 l. 161 (§3.4's ground parts), l. 328, 867, 2291, 2584 and 3156 (the frame growth's deck extension, §3.2 (9));
     - V06 l. 2738 (§3.2 (9));
     - V07 l. 3658 (§3.2 (9), Method 3);
     - V11 l. 208 (§3.4's ground parts).
   - **Unchanged pointers on changed lines.** Base l. 16038 (§3.9) and l. 16906 (§3.1, §3.6 rule 3) carry pointers that
     stood in the pre-round base word for word. Their lines changed elsewhere, so they keep their earlier verdict.
   - **Kernel ops and codes on the added lines.** §3.1's 18 `E_` codes and 11 `W_` codes and §3's ops (`insertChain`,
     `removeEdges`, `splitThrough`, `retypeEdges`, `clearFiner`, `corridorUnion`, `StretchRef`, `VertexRef`, `KernelTx`,
     `attractCm`, `minEdge`, …) were scanned on the added lines. The only hits:
     - row W7's `retypeEdges` and S9's `corridorUnion` (§3.4, §3.7), used as §3 defines them;
     - §7.1's lock row's existing "a warp carrying a held point-anchored record" (§7.4).

     The kernel phrases on the added lines (base l. 16906's antenna, V01's "taken by the kernel's refusal") stood in the
     pre-round text.
   - **The set-wide resolver.** assemble-r6 reports 56 555 references checked and 0 broken.
7. **g items and canon.**
   - canon.md's dated ruling "2026-10-01 (adjudication round 6)" (l. 5868–5924, read whole) names no kernel part. Its
     raised-way entry homes at §2.7, and its late-calamity entry at §4.11 *The clock*.
   - adjudication-r6's Part I is that ruling.
   - docs/AMENDMENTS-2026-09-28g.md still ends at item 126. It last changed at commit `22cd657` (item 126 (a2)), before
     round 5.
   - So there is no F-MISSING.
   - §3 holds no phone, mobile or small-screen clause (item 126 (a2)).
8. **Edges.**
   - edges.json is unchanged since the pass began (Sep 30; 75 kernel rows).
   - §3 is unchanged, so the kernel's rows keep their earlier verdicts.
   - R6-02 adds no kernel mechanism, so it opens no kernel edge. The meetings it defines are §2.7's, with their tests in
     the table's cells.
9. **Scans.**
   - Retired terms: canon.json's 35 glossary patterns give 0 hits in live §3.
   - Deferral wording: "TBD", "etc.", "as appropriate" and "similar rules apply" give 0 hits. The "open" and "later" hits
     are an open transaction (§3.3, §3.4's `tx`), a later same-level change (§3.6) and "at the open" (§3.10), none a
     choice left open.
   - Review ids on new lines: none (§3 has no new line).
   - Ids: the kernel added none.
10. **Doc checks** (`python3 docs/validation/bench/doc_checks.py --doc docs/ARCHITECTURE.md --sections 3 --allow
    docs/validation/doc-checks-allow.tsv`): exit 0.
    - Hits / unreviewed: C1 5/0, C2 1/0, C3 95/0, C4 0/0, S1 0/0, S2 298/0.
    - S2 counts the whole document, which grew from 287 with other units' new pointers. The rest is identical to round 5.
    - The script warns "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs,
      research/ftg-docs, research/external) - clean-room results are NOT authoritative". The result is therefore
      **PROVISIONAL** until it is re-run on the machine that holds the corpus.

## Round-5 findings — status on the live text

None were raised (verify-kernel-r5t: "None. No finding of any severity is raised this round."). The one open thread
from the kernel's round 5 is its repair's hand-off:

| thread | owner | disposition (adjudication-r6) | status | where (live) |
|---|---|---|---|---|
| repair-r5-kernel's hand-off: the `VG` arena margin, named by the base's `Frame` comment, was asserted by no V07 test | V07 (END) | R6-01 (6); END under Part H · V07 | CLOSED | V07 T-V7-23 (l. 3658): "the arena's frame VG's view at `rules.vg.frameM` for the matched size plus `rules.vg.marginM` on each side (the base's `Frame.marginShare`, §3.2 (9))". This is the END's words, with "§3.2 (9)" for "§3.2 (1)": the rule asserted is §3.2 (9)'s, and §3.2 (1) is *Integer world and range*. The change is recorded as repair-r6-V07 note 3 |

## Issues

None. No finding of any severity is raised this round.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read):**
- the two base hashes and the §3 diff (0 hunks);
- Part H's kernel heading, Part A's kernel row and R6-01 (5)–(6);
- assemble-r6's "no file" line;
- T-V7-23 and repair-r6-V07's note 3, and V07's `vg` group keys;
- every raised-way line of §3, read in context;
- R6-02's two tables and their C12 column, and T110-2's frame clause, against §3.2 (9) and `RaisedFoot`;
- `W_RAISED_CROSSING`'s home in §5.4;
- the 16 bare §3 pointers and the kernel identifiers on the 929 added lines;
- canon's round-6 ruling, read whole, and the g file's last item and commit;
- the retired-term, deferral, phone and `lateCalamities` scans;
- the doc checks (exit 0, provisional) and the sizes.

**PLAUSIBLE:**
- That a support standing in a wall's band needs no kernel operation, because it is a record footprint that part-0 stages
  read through §4.1's `raised` key rather than an arena face (§3.4: "its piers are footprints on part 0 (§2.7's
  `supports`), which part-0 stages read from the record"). This is read from the text, not run.
