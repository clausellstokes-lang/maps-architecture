# verify-kernel-r2 — lane amendments-c/verify-kernel-r2 (verifier of the KERNEL part, §3, after repair round 2)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-kernel-r2).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> ITEM 39: planned §3.5 NG row (unchanged in r2) | done — PRESENT (carried, text byte-identical)
> ITEM 45: planned §3.4 regularFit, §3.1 row (unchanged in r2) | done — PRESENT (carried)
> ITEM 53: planned §3.1 rows (unchanged in r2) | done — PRESENT (carried)
> ITEM 65: planned §3.4, §3.7, §3.10 (unchanged in r2) + §3.2 (9)'s underground clause (REPLACEd) | done — PRESENT
> R1 ISSUES VKC1-01..06 re-checked | done — all 6 resolved (§3)
> CHECKS single-source, stale, cross-part, deferral, broken-reference, new-problem on §3.2 and §3.3 | done — 0 new issues (§4)
> QUEUE ROW + LANDED | done

Lane `amendments-c/verify-kernel-r2`, 2026-09-28. Status: COMPLETE. Verified on the design installed by assemble-r2,
`docs/ARCHITECTURE.md` sha256 `3daa0b0731b8c76f…` (17 215 lines; §3 at lines 2452–3679), and rationale
`bfa20419ca4dd6e5…`. The before-text is `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r2-2026-09-28.md`
(`024c57da…`). This lane edited no design file.

## 1 Outcome

All four items routed to the kernel stay PRESENT, and all six r1 issues are resolved: the two kernel ones in §3, the
other four at their owners' homes (model §2.2, pipeline §4.11 twice, scope §13.2). Round 2 raised **no new issue** in the
kernel part.

A word diff of §3 against the pre-repair-r2 archive shows exactly the two edits the repair report claims, and nothing
else. There are 5 changed runs in 1 228 lines: the §3.2 (9) pointer sentence (VKC1-01), and the §3.3 users list and
region parenthesis (VKC1-03).

The repair seat claimed that its §3.3 change is coherent with the clear-region rules 1–3. I re-checked that claim against
§2.2 rules 1 and 7 rather than accepting it, and it holds. Every structural edge role (`way`, `wall`, `wall_gate`,
`shore`, `bank`, `border`, `margin`, `reserved`, `setback`, `deck`, and underground `tunnel`, `gallery` and
`chamber_wall`) lies at L1 or coarser. "A track on a field boundary" is an L1 way's edge that also carries the L3
`field_bound` role. So after batch (a) clears the region, the growth's L1 batch (c) meets no finer geometry, and batch (b)'s
new ring lies outside the old arena.

The remaining checks:
* `doc_checks --sections "3"` exits 0: C1 5/0, C2 0/0, C3 96/0, C4 0/0, S1 0/0, S2 0/0. These are the same counts as r1.
* References: 2 broken, the baseline's two external citations.
* §3 cites 46 J ids, and every one has an index row and a Part A entry.
* J-A index and Part A: 454 = 454, the same set.

## 2 Per item

| item | ruling routed here | verdict | where, quoted |
|---|---|---|---|
| 39 | §3.5 NG row | **PRESENT** (text unchanged since r0) | §3.5, as quoted in verify-kernel-r1 §2 ("its first rung re-plans in a turned frame a bounded number of times, and no rung restarts anything above the face"). The word diff shows no change in §3.5. |
| 45 | §3.4 `regularFit`, §3.1 row (J-A45.31) | **PRESENT** (unchanged) | §3.4 `regularFit(ring: Ring): KernelResult<RegularFit>`; §3.1 "best-fit regular polygon … **build** `regularFit`". |
| 53 | §3.1 Poisson, marching-squares and path-search rows | **PRESENT** (unchanged) | §3.1 rows as quoted in verify-kernel-r1 §2 ("… not reproduced; J-A53.31"). |
| 65 | §3.4 / §3.10 one arena part per system, links as cross-arena records; §3.7 `corridorUnion` over galleries | **PRESENT** | §3.4, §3.7 and §3.10 are unchanged since r1 (quoted there). Round 2 makes the growth's underground clause exact. §3.2 (9) (l. 2600–2602): "Every underground part — its outer ring the frame with its margin (the sewer's, II.7.2; each further part's, §2.2 rule 1) — grows by (a) and (b) on its own key". §2.2 rule 1 (l. 611–614): "bounded by the part's outer ring — the ground's frame plus its context margin, as the sewer's is (II.7.2), so every part grows with the frame by §3.2 (9) (J-A65.22)". |

**Round 2's text elsewhere that touches item 65, checked against §3.4 (all agree):**
* II.7.6's connection stage "writes link records and access points and no geometry but their link_end and access_point
  vertices, one part per transaction".
* §7.4's underground-tools row: "a link between its two parts' vertices, one part per batch (§3.4)".
* II.7.6's generation-time buried old town is "fresh records of the `buried` part", laid on its own part and read from
  the ground by query. T65-8 asserts "the ground arena's digest is the same in the 0.6 and 0.4 runs", which is §3.10's
  arena isolation.
* II.7.6's closure sentence now reads "one event whose batches commit together". This is §7.3 item 9's wording (home),
  which cites §3.3's transactions and §3.4's parts.

## 3 The r1 issues (verify-kernel-r1 §4) — all resolved

| r1 id | owner | now |
|---|---|---|
| VKC1-01 | kernel | §3.2 (9): "Every underground part — its outer ring the frame with its margin (the sewer's, II.7.2; each further part's, §2.2 rule 1) — grows by (a) and (b) on its own key". The broken "(II.7.3)" pointer is gone, and the conditional is now a statement. The seat's departure ("each further part's" for my "every other part's") is sound: it is §2.2 rule 1's own paragraph name, and it avoids a C3 hit. Both pointers land on text that states the ring. II.7.2, l. 15578–15579: "bounded by the arena's outer ring (the ground's frame plus its context margin, §3.2 (9))". §2.2 rule 1: see §2. |
| VKC1-02 | model | §2.2 rule 1, the further parts (quoted in §2). J-A65.22 has an index row (l. 17147) and a Part A entry (rationale l. 771), each stating the choice, the alternative and the reason. |
| VKC1-03 | kernel | §3.3: the users list now ends "S1's water operator re-carving a reach (§7.3 (b)), an epoch's frame growth (§3.2 (9))". The region reads "(§4.11 for the carve and the outer moat; §7.3 (b) 2–4 for the re-carved reach; for the frame growth, the whole L1 faces §3.2 (9) names instead)". Both are my text verbatim. Coherence with rules 1–3 is re-checked in §1 and §4. |
| VKC1-04 | pipeline | §4.11 *The rung at an epoch*: "each raster growing by whole cells as §3.2 (9) states, every stored height unchanged and the flow fields recomputed over the grown grid." |
| VKC1-05 | pipeline | §4.11: "…; on each underground part §3.2 (9) grows, that part's stages for its cleared faces — part 0's network stage its bands by `corridorUnion` (II.7.2) and II.7.3's stage its plots, each other system's stage its own part's bands (II.7.6) and II.7.5's stage the undercity's plots there)". This is my text, extended by the undercity's re-deriver. |
| VKC1-06 | scope | §13.2 T81-1: "… every raster keeping its `cellCm` with every old cell in its place and every stored height unchanged, the `hydro` fields equal to a fresh computation over the grown grid and every river's traced course inside the old arena unchanged — or, where M4's memory measurement took §3.2 (9)'s pre-decided re-grid, each raster at the new rung's `cellCm`, every standing entity keeping its stored `baseCm` and the report naming the re-grid (§3.2 (9); J-A81.31)". Every clause matches §3.2 (9), l. 2603–2616. |

## 4 The checks — no new issue

* **SINGLE-SOURCE.**
  * The frame growth is still stated once, at §3.2 (9). §2.2's `frame`, §2.3 (the raster sentence, `HydroGrid.cellCm`),
    §4.11, T81-1, J-A81.31 and J-A81.41 point to it.
  * §4.11 keeps its one-line gloss of the three batches, which r1 accepted. It restates no rule.
  * The frame-wide ring of every underground part is stated once, in §2.2 rule 1. §3.2 (9) and J-A65.22 point to it.
  * The clear-region protocol is stated once, in §3.3, which now lists the growth among its users. The growth's own
    region is defined in §3.2 (9), and §3.3 points there ("the whole L1 faces §3.2 (9) names") rather than restating it.
* **STALE.** There is no stale statement in §3. The two new sentences state none of the old rules. Grep: no "whose outer
  ring", "ring is the frame" or "(II.7.3) grows" remains in the design.
* **CROSS-PART.**
  * The notes addressed to the kernel this round are the model seat's two. The first (VKC1-01 matches §2.2 rule 1 as
    repaired) is confirmed. The second ("J-A65.22 may be cited beside it") is optional and was not taken. That is not an
    issue, because §3.2 (9) points to §2.2 rule 1, which carries J-A65.22.
  * The pipeline's §4.11 text limits §3.2 (9)'s cap clamp to growth without a dossier. That is consistent with §3.2 (9)'s
    "taken at most at the cap, as §1.1 clamps a request".
  * Every other clear-region user in the design is either one of the listed users or goes through one:
    * §4.11's carve steps (l. 6268–6294);
    * §7.3's carve, water and staged-layer rows (l. 8255–8268);
    * J-A10.42's island fall, which runs "through the carve path's clear region".
* **DEFERRAL-WORDING.** None in §3. "later" occurs only in its temporal sense (grep: 12 hits, all of that kind), and
  there is no "TBD", "TODO" or "open question".
* **BROKEN-REFERENCE.**
  * The resolver reports headings 141, D ids 35, J ids 730 and 2 broken. The two are the baseline's external
    citations, `os-geometry.md` §2.1.4 and RFC 7946 §3.1.6.
  * §3's 46 J ids all resolve, J-DET-36 and J-Fredteam-1 included. r1's count of 45 used a narrower pattern.
  * Every pointer in the two new sentences resolves: II.7.2, §2.2 rule 1, §3.2 (9) and §7.3 (b).
* **NEW-PROBLEM.** None. I tested the repair's coherence claim one clear-region rule at a time:
  * *Rule 1* keeps structural finer edges. On the ground and underground none is finer than L1 (§2.2 rule 7's role list,
    rule 1's levels), so batch (a)'s `clearFiner` leaves nothing in the region's L1 faces for (b) or (c) to meet.
  * *Rule 2* is satisfied with no prepared vertex. (b)'s new ring lies outside the old arena. (c)'s new rectangle lies
    only in faces (a) cleared, and the ways it crosses are L1 ways, a same-level crossing.
  * *Rule 3* also holds: the growth splits no finer face, and §3.10's prepared-contacts and kept-content rows hold with
    an empty `prepared`.
* **Considered, not filed.**
  * *The "dry run" wording.* §3.3 still says the operator computes its footprint "in its dry run", and a growth is not an
    edit. The region parenthesis's "instead" covers this, and rule 2 already reads "the same edit or stage".
  * *The `HydroGrid.cellCm` comment.* It says "kept through frame growth, §3.2 (9)" without naming the re-grid fallback.
    The §2.3 prose two lines below names it, and verify-model-r2 judged the same text PRESENT.
  * *Clearing an underground part's outer face.* On an underground part, the L1 face beside the old ring can be most of
    the part's rock, so batch (a) may clear much of that part's finer content. This is J-A81.31's chosen region, which
    r1 concurred with. §3.2 (9) and T81-1 state it, and VKC1-05's re-derivers now cover it.

| id | owner | sev | kind | issue | required change |
|---|---|---|---|---|---|
| — | — | — | — | No new issue in the kernel part after repair round 2. | — |

The earlier verdicts stand: verify-kernel-r0's VKC-01..20 and verify-kernel-r1's VKC1-01..06 are all resolved.

## 5 Held parts (gate (a)) — so nothing is lost

No item routed to the kernel has a part marked HOLD — PLAUSIBLE:
* items 39, 45 and 53 are CONFIRMED;
* item 65 is an owner rule.

A grep of §3 finds none of the held phrases ("visibly differ", "160 of 162", "160 / 162", "16-cell", "cast shadow",
"night-light"). The pass's held parts are unchanged and none touches §3:
* **52**: the references' visibly different session-reached maps;
* **35 (support)**: the position check on 160 of 162 faces;
* **60 (support)**: the 16-cell hand-off support;
* **68 (g)**: "MFCG draws no cast shadows";
* **68 (support)**: VG 1.6.9's shadow and night-light layers, and Dwellings' shading and occlusion.

Released parts stand as applied: 37 (labelled), 58 (f) (labelled) and 59's timing. Item 49's deletion stays rejected.

## 6 Receipts

All files are in scratchpad `c0d81c15…/scratchpad/vk2c/`.
* **§3 word diff** against the pre-r2 archive: `s3.wdiff`, 5 changed runs, all in §3.2 (9) and §3.3's clear-regions
  bullet.
* **Whole-design word diff**: `doc.wdiff`, 146 hunks mapped to headings. The diff segments that cite §3 or kernel terms
  are in `s3segs.txt`, and every one was read.
* **Read whole**:
  * §3.2 and §3.3;
  * §2.2 rule 1, from the ground levels through the underground's further parts, and rule 7's structural and partition
    roles;
  * §2.3's raster prose and `HydroGrid`;
  * §4.11 *The rung at an epoch*;
  * II.7.2's levels sentence;
  * II.7.6's round-2 hunks;
  * §7.3 item 9;
  * §7.4's underground-tools row;
  * §13.2's T81-1, T65-7 and T65-8;
  * J-A65.22 and J-A81.31 (index row and Part A).
* **References**: `refs.py docs/ARCHITECTURE.md <scratch>/refs.json`, with its output kept in the scratch folder. The
  design and rationale hashes are unchanged after the run.
* **Document checks**: `python3 docs/validation/bench/doc_checks.py --sections "3" --allow
  docs/validation/doc-checks-allow.tsv` exits 0, with C1 5/0, C2 0/0, C3 96/0, C4 0/0, S1 0/0 and S2 0/0. The corpus
  was 9 626 JSON files and 916 788 3-grams. Output: `dc3.out`.

CONFIRMED versus PLAUSIBLE:
* CONFIRMED by reading the installed design:
  * every quoted text;
  * every PRESENT verdict;
  * every r1 resolution;
  * the structural-role levels behind the rules 1–3 coherence check.
* CONFIRMED by execution: the diffs, the references, the J-id resolution and the document checks.
* PLAUSIBLE: the judgment that the three "considered, not filed" points need no change.
