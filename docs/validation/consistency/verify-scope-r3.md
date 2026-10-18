# Verify — scope part (title, summary, §0, PART I heading, §1, §13–§17, Delegated decisions, Judgment calls, Staged, Appendix A), consistency pass round 3

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-scope-r3`, 2026-09-26. Status: COMPLETE. This lane re-verifies the scope part of
`docs/ARCHITECTURE.md` after repair round 3 (`assemble-r3`, 7 REPLACE blocks, 0 INSERT). Inputs:
* the archive `docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`;
* `inventory-scope.json` (828 items and 11 conflict records), `canon.json`, and the mapping table of `rewrite-scope.md`;
* the four `repair-r3-*.md` files, `assemble-r3.md`, `validate.md` (V-FIN-01 … V-FIN-07) and `still-open-r5.json`;
* this lane's round-2 report `verify-scope-r2.md` (cited as "r2"). r2 cites r1, and r1 cites r0.

The other round-3 verifiers' reports (pipeline, determinism and rendering) were read for issues routed to this part.
The kernel and model round-3 reports did not exist while this lane ran.

**Method.**
* The round-2 document rebuilt in round 2 (`vs2/r2.md`, sha256 `d9d509fa…7a5d`, assemble-r3's "before") was run
  through a fresh `assemble-r3.py`. The output is `cmp`-identical to the current document (sha256 `7a4e19db…c762`), so
  nothing has touched the document since assembly.
* The r2 → r3 diff (7 hunks) was read in full, with a word diff of every hunk. Both scope subsections that round 3
  replaced were read in full (§13.2, and all of §16, including every milestone row).
* Re-checked ids:
  * every id homed in a replaced scope subsection (§13.2 and §16);
  * every id whose canon home, canon place, restatement or statement pointer lies in one of the five other replaced
    subsections (§4.2, §5.2, §6.1, §9.5, §12.6);
  * every id whose statement concerns the words a hunk changed (keyword scan: terrain resolution, contours, the
    stamp-tile key, the compass, replay, the walled share, the `lit` export);
  * every judgment-index row that names a replaced subsection;
  * every id tied to a conflict record or open item whose place lies in §16;
  * every issue the repairs claimed to fix.
* This part's pointers into the replaced subsections, and theirs into this part, were extracted by script and read
  against their hunks. All other ids keep their r2 verdict (§9 quotes it).
* No line moved in round 3, so r2's line numbers are current. Every line number here is the current document's unless
  marked "archive". Scratch files are in this session's scratchpad (`vs3/`).

## 1. Outcome

**This report raises no issue: 0 blocker, 0 major and 0 minor.**

* **Both scope fixes are FIXED, word for word as `validate.md` §8 required.**
  * V-FIN-02 (= V-SCOPE-R2-02 = P2-1): §13.2's `wealthLevel` sweep now reads "(population ± 5 % on ≥ 95 % of seeds,
    walled share inside its rung band, §4.2 S2)" (l. 7687–7688). This puts the archive's §4.4 S5d qualifier back at the
    test's home.
  * V-FIN-05 (= V-SCOPE-R2-01): M2b's exit now lists "the `lit` export beside a moving `path` sun (§12.7);" (l. 8645).
    §12.7's M2b run therefore gates a milestone.
* **The other five round-3 fixes are FIXED and agree with every statement and pointer of this part:** V-FIN-01 (§12.6),
  V-FIN-03 (§5.2), V-FIN-04 (§6.1), V-FIN-06 (§9.5) and V-FIN-07 (§4.2).
* **No new problem appeared.**
  * Each of the 7 hunks is exactly one substitution (word diff), and each repair block equals its current subsection
    line for line.
  * The re-wrapped §13.2 bullet keeps its words, its indent and every code span on one line. M2b's row keeps its 4
    cells and its 33–42 pw, and the milestone rows still sum to 153–204 pw.
  * No J-id mention moved (525 before and after, per section) and no internal reference is broken.
  * The replaced blocks hold no deferral wording, fix-round tag or round narration. The document still has one review
    banner.
* **The open items this part owns stay FIXED; UNFIXED: none.** VS5-1 and VD5-7 sit in the replaced §16, outside its
  hunk, and every phrase keeps its r2 count. VS5-2 and VS5-3 are outside every replaced subsection.
* **Every canon conflict whose place round 3 replaced is still resolved as ruled** (§5). RENDERING-C02 is now also
  gated at M2b.

**Verdicts over the 839 records (§9):**
* **276 re-checked.** 267 are OK. 2 are OK with their round-2 issue FIXED: SCOPE-184 (V-FIN-02) and SCOPE-460
  (V-FIN-05). 7 conflict records are RESOLVED.
* **563 kept from r2.** 559 are OK, 3 are resolved as the canon rules, and 1 is INVALID per the canon (SCOPE-C09).

**Part size:** 279 026 bytes, 77 more than r2 (§13 +23, §16 +54). That is still 66.3 % of the archived part's 420 603.

**`doc_checks` on the part exits 1, but nothing in the document caused it.** The only unreviewed hits are 21 C3 runs
that come from new files in the corpus.
* The r2 and r3 documents raise identical hit sets, locations included, on one corpus snapshot. So none of the 21 was
  caused by round 3, and none sits on a changed word.
* Each run needs a 3-gram that occurs only in files written after the allow file's last update (20:24):
  `research/findings/dwellings-synthesis.md` or `_critic-dwellings.md` (O-R3-1).
* A verify seat does not write the allow file. The closing seat's run reviews these hits.

The other round-3 verifiers raised VDR3-1 = VR-R3-1 and VR-R3-2. Both are owned by rendering, and this part restates
neither (O-R3-4).

**CONFIRMED vs PLAUSIBLE.**

CONFIRMED by executed checks:
* the rebuild, both hashes and the `cmp`;
* the diff, the word diffs and block identity;
* the line-width, indent, backtick and cell checks of the changed lines;
* the J-id script and the resolver;
* the official `doc_checks` run, the one-load r2 / r3 comparison and the 3-gram attribution;
* the deferral, tag and marker scans, and the fixed / stale / open-item phrase counts;
* the pointer extraction (97 outbound pointers into the five other replaced subsections, 55 part-internal ones into
  §13.2 and §16, and 35 inbound);
* the size.

PLAUSIBLE (reading only, with no second reader):
* that none of the extracted pointers relies on a changed word beyond the ones §6 names;
* the rulings O-R3-2 and O-R3-3.

## 2. Issues (each with its owning part)

None. After round 3 this part has no LOST, CHANGED, UNFIXED, CONFLICT, BROKEN-REFERENCE, DEFERRAL-WORDING or
NEW-PROBLEM finding. Both round-2 issues of this part are closed (§3).

## 3. The issues repair round 3 claimed

All seven are FIXED. Each "now reads" quote is the exact text `validate.md` §8 required, present once, and the stale
wording has 0 hits (§7 check 9).

| issue | owner, repaired by | now reads (current line) | verdict | effect on this part |
|---|---|---|---|---|
| V-FIN-02 (= V-SCOPE-R2-02 = P2-1) | scope, repair-r3-scope §13.2 | "a B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 % on ≥ 95 % of seeds, walled share inside its rung band, §4.2 S2)" (l. 7687–7688) | **FIXED** | SCOPE-184 carries the archive's §4.4 S5d qualifier "the walled share inside its rung band" again (archive l. 4111–4112, PIPELINE-187 → SCOPE-184). "§4.2 S2" lands on the stage rows per rung (l. 2786–2791). §4.4 S5d (l. 3124) and F-BUDGET-STAGE (l. 4012) keep their "§13.2's B-CITY `wealthLevel` sweep" pointers. "walled share in band)" has 0 hits. The hunk's 25 lines (l. 7687–7711) are that substitution plus a re-wrap with the same words and indent. |
| V-FIN-05 (= V-SCOPE-R2-01) | scope, repair-r3-scope §16 | "… the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7); the `lit` export beside a moving `path` sun (§12.7); the METROPOLIS SVG budget (§12.7); …" (l. 8645) | **FIXED** | The pointer lands on §12.7's run "from M2b, where `lit` ships, a `lit` export of a CITY while a `path` sun advances one step per frame" (l. 7410–7414). NR5-1's only executed check now gates M2b. The row keeps its 4 cells and 33–42 pw. |
| V-FIN-07 | pipeline, repair-r3-pipeline §4.2 | "the stored raster (at §2.3's resolution per rung)" (l. 2658) | FIXED | D-19 already points to §2.3 for the resolution (l. 9267–9268). §2.3 l. 656 now states the values once. This part states no per-rung resolution (grep). |
| V-FIN-03 (= VDR2-1 = VR-R2-3) | determinism, repair-r3-determinism §5.2 | "F-CONTOUR† a contour crosses a shore [§4.2 S1, §8.2]" (l. 4009) | FIXED | Agrees with the summary's "coasts never contradict contours" (SCOPE-009), §1.4's site row (l. 231), §15.1's relief row (l. 8556), §15.2 O1 (b) "contours cross water 0 times [C]" (l. 8590) and J-P12 (cited at l. 2675). |
| V-FIN-04 (= VR-R2-1) | determinism, repair-r3-determinism §6.1 | "keyed by a constant entity key — the four 32-bit-lane finalisers (as for the seed key) over the words (…) —, with `STAGE_VIEW` and reroll, attempt, epoch and salt 0" (l. 4177–4181) | FIXED | Agrees with §14's "poisson (… from a constant stream key …)" (l. 8224–8225) and with J-R42's gist "a constant stream key for the stamp-tile library" (l. 9555). §13.3's seed-independent `render.stampTiles` shift record (l. 7821) and §16's stamp-tile asset line (l. 8678–8679) are unchanged. |
| V-FIN-06 | rendering, repair-r3-rendering §9.5 | "keyed from the town root's entity key (§6.1, §14 `TOWN_ROOT`) with the concern `style.compass`" (l. 6561–6562) | FIXED | Lands on §14's `TOWN_ROOT` (l. 8292) and on §6.1's town root key (l. 4120–4123). J-S27's index row (l. 9596) agrees. This part restates no compass key: §1.2's "scale bar and compass" (l. 201) and §15.1 D3's "compass reroll" (l. 8435) name the furniture only. |
| V-FIN-01 (= V-MODEL-R2-01 = VR-R2-2) | rendering, repair-r3-rendering §12.6 | "…, and the view stages run once at the end (§7.3 item 2) — …" (l. 7330–7331) | FIXED | These pointers still land: §16 M2a's "§12.6's V + 10 %" and "its §12.6 cost + 10 ms" (l. 8644), J-R36 (cited at l. 7349), §13.2's campaign cost (l. 7769–7770) and the *Scope invariance* test (l. 7327–7328). |

Round-2 observations these fixes close: O-R2-1 (§12.6's missing verb, V-FIN-01) and O-R2-3 (F-CONTOUR's bracket and
the stamp-tile key, V-FIN-03 and V-FIN-04).

## 4. Open items owned by this part (VD5-7, VS5-1, VS5-2, VS5-3)

UNFIXED: none. Each phrase below was counted whitespace-normalised; every count equals r2's (§7 check 9).

| item | where (current line) | round 3 | verdict |
|---|---|---|---|
| VS5-1 | §16 M1 content: "a document whose `outputVersion` is not the running one is never root-checked: it opens as §2.9 step 2's frozen view …", "the `frozenImport` rebase arrives with M3a's rebases", and "whose reader opens an M1 document of the running output version". M1 exit: "a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message" (all l. 8643). §2.9 step 5: "reader never root-checks a document of another output version: it opens as step 2's frozen view (§16 M1)" (l. 1469). | in the replaced §16, outside its hunk (word diff) | FIXED |
| VD5-7 | §16 M2a content: "with the keep, §6.4's link rule that the base is the recipe …" and "a rebased town, a kept saved town included, is offered as its `.plat` file". M2a exit: "a `keptSnapshot`-rebased town's link refused, its `.plat` file offered (§6.4)" (all l. 8644). M3a: "the pack and host-content link refusals (§2.9, §6.4)" (l. 8646). | in the replaced §16, outside its hunk | FIXED |
| VS5-2 | §13.6 (2) (l. 8037–8038); II.1's `FabricStrategyId` comment; II.2 "The **`area` template is the base's own bent-cut fabric**"; J-S34 "(`area` = the base's `bent-cut`)" | not in a replaced subsection | FIXED (as r2) |
| VS5-3 | §17.1 (4): the three files committed into `plat/goldens/d5/⟨milestone⟩/` and the sitting's `record.json`, "which the milestone record and the release notes read" (l. 8776–8780) | not in a replaced subsection | FIXED (as r2) |

Other parts' open items routed into this part's text also still hold:
* VD5-3, VD5-4 and VD5-5's B-EDIT fixtures are in §13.2's B-EDIT bullet (l. 7712–7757), outside the re-wrapped bullet.
* VK5-1 and VK5-2 are in §13.1, which was not replaced.
* NR5-1's run now also gates M2b (V-FIN-05). NR5-2 is in §14 (`TileRasterOpts` → §8.9, l. 8323).
* NP5-2 is in J-I18: its index row is unchanged, and F-ROUTE's "where" is byte-identical in the replaced §5.2.
* NP5-4 is unchanged.

## 5. Canon conflicts whose places round 3 replaced

| conflict | place round 3 replaced | verdict |
|---|---|---|
| SCOPE-C03 campaign bound | §13.2 (the campaign) | RESOLVED. The campaign lies outside §13.2's hunk (word diff). "99.5 %" has 0 hits. §15.2 O9 (c) still points to §13.2 (l. 8599). |
| KERNEL-C01 = SCOPE-C05 (Clipper2) | §16 riskiest items | RESOLVED. The riskiest items still read "the kernel's own booleans and bands (M0 a; §3.7's pre-decided fallback)" (l. 8695–8697). §3.7 was not replaced. |
| SCOPE-C06 (VS5-1) | §16 M1 content and exit | RESOLVED; see §4. |
| SCOPE-C07 (VD5-7) | §16 M2a and M3a | RESOLVED; see §4. §6.4 was not replaced. |
| SCOPE-C08 (the four templates) | §16 M5's fabric list | RESOLVED. The list is unchanged (l. 8650), and VS5-2's text holds. |
| SCOPE-C10 (CityJSON) | §16 M3b and the closing paragraph | RESOLVED. "CityJSON; …" (l. 8647) and "CityJSON is built (§11.1)" (l. 8703) are unchanged. |
| SCOPE-C11 (the staged list) | §16's closing paragraph | RESOLVED. It still points to the one list in *Staged by the owner's roadmap* (l. 8701–8704). |
| RENDERING-C02 (NR5-1) | §16 M2b (the new criterion) | RESOLVED, and complete: §12.7's `lit` path-sun export run now gates M2b (V-FIN-05). This part's edit, §14's `TileRasterOpts` pointer to §8.9 (l. 8323), is unchanged. |
| CANON-C08 (key components) | §6.1 | RESOLVED. §1.4's "(key components §6.1)" (l. 242) and D-15 (l. 9240) point to §6.1's key paragraph (l. 4117–4126), outside §6.1's hunk. |
| DETERMINISM-C-10 (rerollable concerns) | §6.1 | RESOLVED. J-DET-22 is still cited at §6.1 (l. 4153). The `render.stampTiles` entry keeps "non-rerollable, attempt cap 0". |
| CF-PIPE-10 (J-I18) | §5.2 F-ROUTE | RESOLVED. F-ROUTE's row is byte-identical in the replaced block, and J-I18's index row (l. 9630) is unchanged. |
| KERNEL-C05 (this part's §17.4 cell) | §5.2 F-SKELETON | F-SKELETON's row is byte-identical. §17.4 is unchanged, and O-R2-2's ruling stands. |

The other conflict records have no place in a round-3 hunk, so their r2 verdicts hold (§9): SCOPE-C01, -C02, -C04 and
-C09 (INVALID per the canon), MODEL-C03, CF-PIPE-02, CF-PIPE-07, CANON-C03, CANON-C09, CANON-C10, RENDERING-C01,
KERNEL-C06, KERNEL-C12 and DETERMINISM-C-2.

RULING-1 (the owner's GPL-3 intent) stays owner-gated. `validate.md` §5 routed it to the next design pass (item 21).

## 6. Pointers between this part and the subsections round 3 replaced

**Outbound.** This part has 97 pointers into the five other replaced subsections. Each was read against its hunk; the
list with its contexts is in `vs3/outbound.txt`.

| target | this part's pointers | what round 3 changed there | verdict |
|---|---:|---|---|
| §4.2 | 51 | S1 (1)'s per-rung resolution → "(at §2.3's resolution per rung)" (l. 2658) | OK. None relies on the resolution. D-19 points to §2.3 (l. 9267–9268). The new §13.2 pointer "§4.2 S2" lands on the stage rows (l. 2786–2791). |
| §6.1 | 21 | the `render.stampTiles` key's function (l. 4177–4181) | OK. The pointers go to §6.1's key components, the concern registry, `reroll` and `attempt` caps, the town root, the successor seed and the no-string rule, all outside the hunk. §14's "constant stream key" agrees. |
| §9.5 | 14 | the compass's "— the seed key alone" deleted (l. 6562) | OK. The pointers go to the furniture set (§15.1 D3's "compass reroll" included), the measure tool and ruler, the emblem, the annotation layer and the title's corner rule. Only J-S27's index row concerns the key, and it agrees: "keyed from the town root's entity key" (l. 9596). |
| §12.6 | 9 | the replay sentence's verb (l. 7330–7331) | OK. The pointers go to the per-edit flatness test, the MFCG asks' re-run cost, the block and district costs, V + 10 %, the plot-edit cost, the warp budget and its fallback, J-P49 and J-R36. None relies on the replay sentence. |
| §5.2 | 2 (§13.1's ladder coverage; J-I18) | F-CONTOUR's bracket (l. 4009) | OK |

This part also has 55 internal pointers from elsewhere in the part into §13.2 (23) and §16 (32). All land on text the
hunks did not change. None names the sweep's band or M2b's exit criteria.

**Inbound.** The five other replaced subsections hold 35 pointers into this part, 34 of them internal:
* 19 section pointers: §4.2 → §1.1, §13.2 ×3 and §13.3; §5.2 → §13.1 ×2, §13.2 ×2, §13.3, §13.4, §13.5, §13.8 and
  §15.2 ×2; §6.1 → §14; §9.5 → §14; §12.6 → §13.2 ×2;
* 15 J-id citations: J-P5, J-P6, J-P12, J-P24, J-P26, J-P35 ×2, J-P36, J-P44, J-P45 and J-I12 in §4.2; J-DET-22 and
  J-DET-53 in §6.1; J-R13 in §9.5; J-R36 in §12.6;
* 1 external pointer (`docs/CONFIDENCE.md` §1, l. 4200).

All land; the resolver finds 0 broken. The sub-label targets were read:
* F-OUTLINE's "§13.2's outline stage property test" (l. 4007) and §4.2 S1 (2)'s property test (l. 2674) → l. 7683;
* F-BUDGET-STAGE's and §4.4's "§13.2's B-CITY `wealthLevel` sweep" (l. 4012, l. 3124) → l. 7687–7688, which now
  carries the rung qualifier;
* "every §13.2 walled coastal fixture" (l. 2849) and "§13.2's walled coastal harbour fixtures" (l. 2933) →
  l. 7700–7705;
* §12.6's "§13.2's B-EDIT coarse-edit sequences" (l. 7322) → the terrain-brush, course-knot and drawn-water sequences
  (l. 7715–7716), and "(a B-EDIT test: … §13.2)" (l. 7328) → the cost-model bullet's flatness test (l. 7669);
* §6.1's "§14 `Rng.stream`" (l. 4124) → `interface Rng` (l. 8307);
* §9.5's "§14 `TOWN_ROOT`" (l. 6562) → l. 8292.

Two of these sit in lines round 3 changed: the sweep pointer, whose target it repaired, and §9.5's `TOWN_ROOT` pointer,
which lost only its appositive.

## 7. Mechanical checks (executed)

1. **Rebuild and identity.** `vs2/r2.md` (round 2's rebuild: `assemble-r0.py` → `-r1` → `-r2`) has sha256
   `d9d509fa…7a5d`, which is assemble-r3's "before" and `validate.md`'s document. A fresh `assemble-r3.py` on it gives
   `7a4e19db…c762`, `cmp`-identical to `docs/ARCHITECTURE.md`. The four repair files' sha256 values equal assemble-r3's
   inputs (`115ea764…`, `db6d44a8…`, `60645dc6…`, `ac02d6fc…`).
2. **Diff.** `diff -U0` r2 → r3 has 7 hunks, 36 lines out and 36 in (l. 2658; 4009; 4177–4181; 6562; 7330–7331;
   7687–7711; 8645). Two hunks are in this part: §13.2 (25/25 lines) and §16 (1/1).
3. **Blocks verbatim.** Each of the seven repair-r3 blocks equals its current subsection line for line: §13.2 145 lines,
   §16 85, §4.2 314, §5.2 27, §6.1 87, §9.5 44 and §12.6 42.
4. **Word diffs.** Each hunk makes one substitution:
   * §13.2: "in band);" → "inside its rung band, §4.2 S2);";
   * §16: "the `lit` export beside a moving `path` sun (§12.7);" inserted;
   * §4.2: "(TOWN 5 m, CITY 8 m, METROPOLIS 10 m)" → "(at §2.3's resolution per rung)";
   * §5.2: "S1]" → "S1, §8.2]";
   * §6.1: "— the four 32-bit-lane finalisers (as for the seed key)", "the words" and "—," inserted;
   * §9.5: "— the seed key alone" deleted;
   * §12.6: "and" and "run" inserted.

   Every other word is identical. In the re-wrapped §13.2 lines (l. 7687–7711) every line keeps its 2-space indent and
   is at most 120 characters, and 0 lines have an odd backtick count in r2 or r3. M2b's row has 5 pipes (4 cells)
   before and after.
5. **J-ids.** There are 525 J-id mentions before and after, with no change in any section (script). 34 index rows name a
   replaced subsection, 35 row–subsection pairs in all. In 14 pairs that subsection cites the J-id and in 21 it does not;
   both counts are the same in r2.
6. **References.** The resolver (`assemble-r0-refs.py`) finds 134 headings, 35 D ids, 276 J ids and 0 internal broken
   references. The same 2 external pointers remain (`os-geometry.md` §2.1.4, l. 2036; RFC 7946 §3.1.6, l. 6826). The
   resolver's output is identical on r2 and r3.
7. **`doc_checks`.** Run over this part's keys (`The whole design,0,1,13,14,15,16,17,Delegated decisions,Judgment
   calls,Staged,Appendix A`):
   * **Official** `doc_checks.py` on the live document, 22:12–22:14, on a corpus of 9 626 JSON files and 835 966 C3
     3-grams: C1 5 / 0, C2 0 / 0, C3 146 / 21 unreviewed, C4 2 / 0, S1 0 / 0, S2 0 / 0. Exit 1.
   * **One-load comparison.** assemble-r3's `dc_multi.py`, which is `doc_checks.py` with a corpus cache, was run on r2
     and r3 against the same snapshot, with this key set and with a set that uses the `ARCHITECTURE` key in place of the
     three front keys. The two documents give identical hit multisets, locations included: C3 146 / 21 and 148 / 21,
     C1 5, C4 2. The official run's 21 unreviewed runs are exactly the one-load run's.
   * **Attribution** (`dc/attrib3.py`). Each of the 21 needs at least one 3-gram found only in files written after the
     allow file's last write (20:24): `research/findings/dwellings-synthesis.md` (landed 21:14) and, for four runs,
     `_critic-dwellings.md` (20:58).
   * r2's run on the same keys (C3 112 / 0) used the corpus of 18:35.
8. **Scans of the part.**
   * **Deferral words:** 58 hits in r2 and 58 in r3, identical multisets. The ones in the replaced blocks are "later
     attribute edits", "open-to-editable" (×3), "open entry", "puts later are listed in *Staged by the owner's
     roadmap*", "the offer to open its recipe" and "open ≤ NG's 10–96 ms". None is a deferral.
   * **Fix-round tags:** 0.
   * **Round-narration pattern:** 2 hits, both §17.1 (2)'s normative seat descriptions (l. 8731, 8765), as in r2.
   * **Review markers:** exactly one "PENDING FABLE REVIEW" line in the document (l. 3).
9. **Wordings** (whitespace-normalised, r2 → r3):
   * For each of V-FIN-01 … V-FIN-07 the fixed wording goes 0 → 1 and the stale wording 1 → 0. "the seed key alone" is
     now 0 in the document.
   * The open items' phrases keep their r2 counts.
   * "99.5 %" has 0 hits.
10. **Rationale file.** `docs/ARCHITECTURE-RATIONALE.md` was last written at 16:23 (sha256 `5f80e197…`), before every
    repair-r3 file. No repair-r3 file names it.
11. **Size.** The part is lines 1–297, 7520–8900 and 9170–9668: 278 949 → 279 026 bytes (+77), 66.3 % of 420 603.

## 8. Observations (not raised)

* **O-R3-1 — 21 unreviewed C3 runs come from corpus growth, not from the document (§7 check 7).**
  * They are ordinary phrases and pointer runs of this part, for example "recorded for the owner s", "memory within 12 8
    s" and "the union of composed wings equals the outline". The last one is our own §13.2 wording, which the new
    synthesis file also uses.
  * They are identical on the r2 and r3 documents, and each depends on a findings file written after the allow file's
    last update.
  * This verify seat does not write `docs/validation/doc-checks-allow.tsv`. The closing seat's `doc_checks` run must
    review the hits of its own run, as assemble-r3 §6, `verify-rendering-r3.md` O1 and `verify-determinism-r3.md` O15
    also say.
  * Receipts: `vs3/dc/official-k33.out`, `multi.json`, `unrev-r3-k33.json`, `attrib3.json`.
* **O-R3-2 — J-S27's Part A row in the rationale file still says the town root's entity key "depends on the seed key
  alone". This is ruled not an issue.**
  * It is the one occurrence of the phrase left anywhere, and it is in the non-normative file.
  * It states a dependency, which is true: §6.1's key is the seed key mixed with a fixed lineage.
  * V-FIN-06 removed an appositive in §9.5 that read as an identity ("keyed from … — the seed key alone").
  * J-S27's index row in the document (l. 9596) reads "keyed from the town root's entity key", and the rationale file
    states that the document wins.
* **O-R3-3 — "inside its rung band" leaves the tolerance to other sections. This is ruled not an issue.**
  * These are the archive's words (archive l. 4112) and `validate.md`'s exact required text.
  * With "§4.2 S2" they resolve to the rung's walled-share rows (≈ 0.9 at TOWN, ≈ 0.88 at CITY and METROPOLIS). Those
    rows are anchored on MFCG's 0.87–0.92, whose tolerance is §13.5's band rule (l. 7935, 7971).
  * This is not a different band: it is the same rows seen per rung.
* **O-R3-4 — the other round-3 issues are rendering's, and this part restates neither.**
  * VDR3-1 = VR-R3-1 concerns §12.6's c(e) against §6.3's matching budget. This part has no "succession matching" budget.
    Its pointers to §12.6's V and costs are unaffected: rendering found that no figure of §12.6 must move.
  * VR-R3-2 concerns §9.5's VTT grid default. This part does not restate "1.5 m / 5 ft". §1.4's "2 m / 5 ft grid"
    (l. 245) is FTG's reference behaviour in the thesis table.
* **O-R3-5 — §13.2's cost-model list still names only "the pan-and-zoom run during an A2 300-dpi export (§12.7)"
  (l. 7669–7670).** O-R2-4 continues. The list is a pointer list, and M2b's exit now gates the `lit` part of that run, so no
  change is needed. `verify-rendering-r3.md` O3 rules the same.
* **O-R3-6 — repairs do not update the mapping table.** O-R2-5 continues. SCOPE-184 and SCOPE-460 now read as the
  replaced blocks say, and §9 records their current places. `verify-pipeline-r3.md` O-R3-2 notes the same for its ids.
* **O-R3-7 — unchanged from r2.**
  * The audit tags in subsection headings await the document-wide convention.
  * RULING-1 is routed to the next design pass (`validate.md` §5).
  * This part is at 66.3 %, the top of the 55–65 % target. The whole document is at 76.7 %, and `validate.md` §7 ruled
    against a further compression pass.
* **O-R3-8 — no kernel or model round-3 report existed while this lane ran (lane events up to 22:08).** No issue of
  theirs is reflected here.

## 9. Checked list — every inventory id (839 records; none sampled)

The scope column gives why an id was re-checked in round 3:
* "home §x": it is homed in a replaced scope subsection (§13.2 or §16).
* "J-row §x": it is a judgment-index row that names a replaced subsection.
* "points into §x": its canon home, canon place, restatement or statement pointer lies in a replaced subsection.
* "subject of the §x hunk": its statement concerns the words that hunk changed (keyword scan).
* "points into §16 (VS5-1 / VD5-7)": it is tied to an open item whose place is in §16.

"kept" means round 3 touched neither the id's place nor its targets. Its verdict quotes r2 verbatim
(`verify-scope-r2.md` §9), and r2's verdict may itself quote r1 or r0. No line moved in round 3, so r2's own line
numbers are current. Line numbers inside quoted r1 or r0 verdicts are those rounds'.

| id | kind | round-3 scope | verdict |
|---|---|---|---|
| SCOPE-001 | defined-term | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-002 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-003 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-004 | history | kept | as r2 — as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-005 | history | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-006 | marker | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-007 | rule | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-008 | rule | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-009 | restatement | re-checked (points into §4.2; subject of the §5.2 hunk) | OK — "coasts never contradict contours": §4.2 S1 (2) states the invariant and points on to §8.2's relief tier (l. 2675–2679); F-CONTOUR's bracket now names both computing sections, "[§4.2 S1, §8.2]" (l. 4009, V-FIN-03); the clip is §8.2's (l. 5719–5722) |
| SCOPE-010 | restatement | re-checked (points into §4.2) | OK — the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-011 | restatement | re-checked (points into §4.2) | OK — the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-012 | restatement | kept | as r2 — OK — §4.8's hunk ("§5.2" dropped from the castle acceptance, l. 3590) does not touch the wall strips (l. 3535 ff.) |
| SCOPE-013 | restatement | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-014 | restatement | kept | as r2 — as r1 — OK — §4.5's r1 change (district containment by `parent`) does not touch it |
| SCOPE-015 | restatement | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-016 | restatement | kept | as r2 — OK — the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-017 | restatement | kept | as r2 — as r1 — OK — §4.9's r1 change (trees-at-render layouts) does not touch it |
| SCOPE-018 | restatement | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-019 | restatement | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-020 | restatement | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-021 | restatement | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-022 | restatement | kept | as r2 — as r1 — r0: OK — summary keeps "merged into named quarters at city zoom"; the MFCG count is §9.4's |
| SCOPE-023 | restatement | kept | as r2 — as r1 — OK — §7.1's r1 change (drawn-bridge pointer; completeness-test pointer) does not touch it |
| SCOPE-024 | restatement | kept | as r2 — OK — the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-025 | restatement | kept | as r2 — OK — the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-026 | restatement | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-027 | restatement | kept | as r2 — as r1 — OK — §2.9's r1 change (step 4's bridge policy moved to §11.3) does not touch it |
| SCOPE-028 | restatement | re-checked (points into §16 (VS5-1)) | OK — the summary's frozen-view paraphrase agrees with §16 M1's unchanged VS5-1 text (l. 8643) and §2.9 step 5 (l. 1469) |
| SCOPE-029 | restatement | re-checked (points into §16 (VD5-7)) | OK — the summary's link paraphrase agrees with §16 M2a's unchanged VD5-7 text (l. 8644) and §6.4's link rule |
| SCOPE-030 | restatement | kept | as r2 — as r1 — OK — §7.4's r1 change (drawn-bridge row pointer) does not touch it |
| SCOPE-031 | restatement | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-032 | restatement | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-033 | restatement | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-034 | restatement | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-035 | restatement | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-036 | restatement | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-037 | restatement | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-038 | history | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-039 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-040 | history | kept | as r2 — OK — not a §0.2 row: its places are Appendix A's reading-record paragraph and the verbatim text in the rationale file's Part B, neither touched by r2 (its "§5.1–5.5" are IMPROVEMENTS.md's sections, not this document's) |
| SCOPE-041 | history | kept | as r2 — as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-042 | mapping | kept | as r2 — OK — its row is unchanged (the §0.2 hunk is row 4 only) |
| SCOPE-043 | mapping | re-checked (points into §4.2) | OK — the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-044 | mapping | kept | as r2 — OK — its row is unchanged (the §0.2 hunk is row 4 only); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-045 | mapping | kept | as r2 — OK — O-R1-3 applied: row 4 now reads "§12.2 (matched reference sizes and the band ends in buildings)" (l. 107); §12.2 states both (the MFCG columns, and a band's ends at 3.4 persons per building, l. 7102–7118); the bands themselves are §1.1's rung table (l. 169–173), which the row names first |
| SCOPE-046 | mapping | kept | as r2 — OK — its row is unchanged (the §0.2 hunk is row 4 only) |
| SCOPE-047 | mapping | kept | as r2 — OK — its row is unchanged (the §0.2 hunk is row 4 only) |
| SCOPE-048 | mapping | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-049 | defined-term | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-050 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-051 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-052 | history | re-checked (points into §16) | OK — history, verbatim in the rationale file, which round 3 did not touch (last written 16:23); its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-053 | rule | kept | as r2 — OK — its row is unchanged (the §0.2 hunk is row 4 only) |
| SCOPE-054 | history | kept | as r2 — as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-055 | history | re-checked (points into §4.2) | OK — history, verbatim in the rationale file, which round 3 did not touch (last written 16:23); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-056 | history | kept | as r2 — OK — history, verbatim in the rationale file, which round 2 did not touch; the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-057 | history | re-checked (points into §4.2) | OK — history, verbatim in the rationale file, which round 3 did not touch (last written 16:23); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-058 | history | re-checked (points into §16) | OK — history, verbatim in the rationale file, which round 3 did not touch (last written 16:23); its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-059 | restatement | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-060 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-061 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-062 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-063 | rule | re-checked (points into §4.2) | OK — the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-064 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-065 | interface | re-checked (points into §4.2; subject of the §13.2 hunk) | OK — `stageRows` "stage count, regimes and walled shares (§4.2 S2)" (l. 160) lands on §4.2 S2's rows per rung (l. 2786–2791), the rows §13.2's repaired sweep now names (V-FIN-02); §4.2's r3 hunk (S1 (1), l. 2658) does not touch it |
| SCOPE-066 | number | kept | as r2 — as r1 — OK — §1.1's rung table is now the only statement of band, target, buildings at the target and frame; each value equals the rows §12.2 dropped (l. 7104) |
| SCOPE-067 | number | kept | as r2 — as r1 — OK — as SCOPE-066 |
| SCOPE-068 | number | kept | as r2 — as r1 — OK — as SCOPE-066; the cap row stays in §12.2's new table |
| SCOPE-069 | budget | re-checked (points into §13.2) | OK — its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier) |
| SCOPE-070 | budget | kept | as r2 — as r1 — r0: OK — pointer present; target §12.3 states it |
| SCOPE-071 | budget | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-072 | rule | re-checked (points into §4.2; subject of the §13.2 hunk) | OK — "The rung stage rows are §4.2 S2's" lands on l. 2786–2791 (unchanged); §13.2's sweep now points to the same rows (V-FIN-02) |
| SCOPE-073 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-074 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-075 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-076 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-077 | rule | kept | as r2 — OK — **V-SCOPE-R1-02 FIXED**: "(124–145 ms across the target's building range, §1.1; §12.1)" (l. 196) lands on §1.1's TOWN row, 1 200–1 500 buildings at the target (l. 171), and is §12.5's TOWN law at that range ("71 ms / 124–145 ms / 246 ms", l. 7270); CITY / METROPOLIS figures unchanged |
| SCOPE-078 | rule | kept | as r2 — OK — "(§8.5)" unchanged (the paragraph is re-flowed only); §8.5 not replaced |
| SCOPE-079 | rule | re-checked (subject of the §9.5 hunk) | OK — "scale bar and compass" (l. 201) names the furniture only; its key is §9.5's, which now cites §6.1 and §14 alone (V-FIN-06); this part restates no key |
| SCOPE-080 | rule | kept | as r2 — OK — word-identical to r1 (re-flow only); r1 verdict holds |
| SCOPE-081 | mechanism | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-082 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-083 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-084 | decision | re-checked (subject of the §5.2 hunk) | OK — "coast and contours agree by construction … contours crossing water 0 (O1 b, C)" (l. 231) agrees with §4.2 S1 (2) → §8.2's clip (l. 5719–5722) and with F-CONTOUR "[§4.2 S1, §8.2]", which always succeeds (l. 4009, V-FIN-03) |
| SCOPE-085 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-086 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-087 | decision | kept | as r2 — OK — the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-088 | decision | kept | as r2 — OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-089 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-090 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-091 | decision | kept | as r2 — OK — the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-092 | decision | re-checked (subject of the §13.2 hunk) | OK — §13.2's new rung qualifier on the `wealthLevel` sweep (V-FIN-02) is a separate assertion and changes nothing it states |
| SCOPE-093 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-094 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-095 | decision | re-checked (points into §6.1) | OK — "(key components §6.1)" (l. 242) lands on §6.1's key paragraph (l. 4117–4126), outside §6.1's hunk (CANON-C08 as ruled) |
| SCOPE-096 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-097 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-098 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-099 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-100 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-101 | decision | kept | as r2 — OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-102 | test | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-103 | mechanism | re-checked (points into §6.1) | OK — the r3 change in §6.1 (the `render.stampTiles` key's finalisers named, l. 4177–4181) does not touch it |
| SCOPE-104 | rule | kept | as r2 — as r1 — OK — §4.11's r1 change (`build` footprint typed `PolygonCm`) does not touch it |
| SCOPE-105 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-106 | rule | kept | as r2 — OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-107 | rule | kept | as r2 — as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-108 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-109 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-110 | decision | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-111 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-112 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-113 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-114 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-115 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-116 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-117 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-118 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-119 | acceptance-bar | re-checked (points into §5.2) | OK — the r3 change in §5.2 (F-CONTOUR's bracket → "[§4.2 S1, §8.2]", l. 4009) does not touch it |
| SCOPE-120 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-121 | rule | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-122 | test | kept | as r2 — OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-123 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-124 | test | kept | as r2 — OK — the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695) and §5.2 (the F-SKELETON row, l. 4018) do not touch it |
| SCOPE-125 | test | kept | as r2 — OK — the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-126 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-127 | test | kept | as r2 — OK — the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-128 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-129 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-130 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-131 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-132 | test | re-checked (subject of the §12.6 hunk) | OK — §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-133 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-134 | test | kept | as r2 — OK — the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-135 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-136 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-137 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-138 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-139 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-140 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-141 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-142 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-143 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-144 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-145 | test | kept | as r2 — as r1 — OK — **V-SCOPE-04 FIXED**: "… and every other role unchanged" (l. 7593) |
| SCOPE-146 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-147 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-148 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-149 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-150 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-151 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-152 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-153 | invariant | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-154 | invariant | kept | as r2 — OK — the r2 changes in §5.2 (the F-SKELETON row, l. 4018) and §8.10 (the random source → §6.1's entry, l. 6261–6262) do not touch it |
| SCOPE-155 | test | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-156 | invariant | kept | as r2 — OK — the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-157 | invariant | kept | as r2 — OK — the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-158 | test | kept | as r2 — as r1 — OK — **V-SCOPE-01 FIXED**: "with a hill-acropolis site" (l. 7640) |
| SCOPE-159 | test | re-checked (points into §5.2) | OK — the r3 change in §5.2 (F-CONTOUR's bracket → "[§4.2 S1, §8.2]", l. 4009) does not touch it |
| SCOPE-160 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-161 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-162 | rule | re-checked (home §13.2) | OK — unchanged since r2: the core record's "the walled share and built extent" (l. 7655) is a recorded statistic, outside §13.2's hunk; the sweep's band is the separate assertion V-FIN-02 repaired |
| SCOPE-163 | rule | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-164 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-165 | acceptance-bar | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-166 | acceptance-bar | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-167 | acceptance-bar | re-checked (home §13.2; points into §12.6) | OK — lands on §12.6's *Scope invariance* bullet (l. 7327–7328), outside §12.6's hunk (l. 7330–7331) |
| SCOPE-168 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-169 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-170 | acceptance-bar | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-171 | acceptance-bar | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-172 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-173 | test | re-checked (home §13.2) | OK — "the pan-and-zoom run during an A2 300-dpi export (§12.7)" (l. 7669–7670) still lands on §12.7's *Export beside the view* (l. 7410–7414); that run's `lit` part is now gated by §16 M2b (V-FIN-05), so this pointer list needs no change (O-R2-4; `verify-rendering-r3.md` O3 rules the same) |
| SCOPE-174 | acceptance-bar | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-175 | rule | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-176 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-177 | test | re-checked (home §13.2; subject of the §12.6 hunk) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-178 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-179 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-180 | test | re-checked (home §13.2; subject of the §6.1 hunk) | OK — unchanged since r2 (outside §13.2's hunk): the hash and rebuild tests are §8.3's (l. 7681); the key they rebuild from is now stated at §6.1 (V-FIN-04), which moves no hash |
| SCOPE-181 | acceptance-bar | re-checked (home §13.2; subject of the §6.1 hunk) | OK — unchanged: "the shipped stamp tiles pass §8.3's seam check (§8.10)" (l. 7681–7682), outside §13.2's hunk; §6.1's r3 change names the key's function only |
| SCOPE-182 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-183 | test | re-checked (home §13.2; points into §4.2, §5.2) | OK — word-identical in the *Stage property tests* bullet (l. 7683–7711), whose l. 7687–7711 were re-wrapped around its one substitution, SCOPE-184's qualifier (word diff); the r3 changes in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) and §5.2 (F-CONTOUR's bracket → "[§4.2 S1, §8.2]", l. 4009) do not touch it |
| SCOPE-184 | test | re-checked (home §13.2; points into §5.2) | OK — **V-FIN-02 (= V-SCOPE-R2-02 = P2-1) FIXED**: "a B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 % on ≥ 95 % of seeds, walled share inside its rung band, §4.2 S2)" (l. 7687–7688), the validator's exact text; the archive's §4.4 S5d qualifier "the walled share inside its rung band" (archive l. 4111–4112, PIPELINE-187) is carried at the test's home again; "§4.2 S2" lands on the stage rows per rung (l. 2786–2791); §4.4 S5d (l. 3124) and F-BUDGET-STAGE (l. 4012) keep their pointers; "walled share in band" 0 hits; every other word of the bullet unchanged (word diff) |
| SCOPE-185 | acceptance-bar | re-checked (home §13.2) | OK — word-identical in the *Stage property tests* bullet (l. 7683–7711), whose l. 7687–7711 were re-wrapped around its one substitution, SCOPE-184's qualifier (word diff) |
| SCOPE-186 | test | re-checked (home §13.2) | OK — word-identical in the *Stage property tests* bullet (l. 7683–7711), whose l. 7687–7711 were re-wrapped around its one substitution, SCOPE-184's qualifier (word diff) |
| SCOPE-187 | test | re-checked (home §13.2) | OK — word-identical in the *Stage property tests* bullet (l. 7683–7711), whose l. 7687–7711 were re-wrapped around its one substitution, SCOPE-184's qualifier (word diff) |
| SCOPE-188 | test | re-checked (home §13.2) | OK — word-identical in the *Stage property tests* bullet (l. 7683–7711), whose l. 7687–7711 were re-wrapped around its one substitution, SCOPE-184's qualifier (word diff) |
| SCOPE-189 | acceptance-bar | re-checked (home §13.2) | OK — word-identical in the *Stage property tests* bullet (l. 7683–7711), whose l. 7687–7711 were re-wrapped around its one substitution, SCOPE-184's qualifier (word diff) |
| SCOPE-190 | test | re-checked (home §13.2) | OK — word-identical in the *Stage property tests* bullet (l. 7683–7711), whose l. 7687–7711 were re-wrapped around its one substitution, SCOPE-184's qualifier (word diff) |
| SCOPE-191 | test | re-checked (home §13.2; points into §4.2) | OK — word-identical in the *Stage property tests* bullet (l. 7683–7711), whose l. 7687–7711 were re-wrapped around its one substitution, SCOPE-184's qualifier (word diff); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-192 | test | re-checked (home §13.2; points into §4.2) | OK — word-identical in the *Stage property tests* bullet (l. 7683–7711), whose l. 7687–7711 were re-wrapped around its one substitution, SCOPE-184's qualifier (word diff); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-193 | test | re-checked (home §13.2) | OK — word-identical in the *Stage property tests* bullet (l. 7683–7711), whose l. 7687–7711 were re-wrapped around its one substitution, SCOPE-184's qualifier (word diff) |
| SCOPE-194 | test | re-checked (home §13.2) | OK — word-identical in the *Stage property tests* bullet (l. 7683–7711), whose l. 7687–7711 were re-wrapped around its one substitution, SCOPE-184's qualifier (word diff) |
| SCOPE-195 | test | re-checked (home §13.2) | OK — word-identical in the *Stage property tests* bullet (l. 7683–7711), whose l. 7687–7711 were re-wrapped around its one substitution, SCOPE-184's qualifier (word diff) |
| SCOPE-196 | rule | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-197 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-198 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-199 | test | re-checked (home §13.2; subject of the §12.6 hunk) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-200 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-201 | test | re-checked (home §13.2; points into §5.2; subject of the §12.6 hunk) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff); the r3 change in §5.2 (F-CONTOUR's bracket → "[§4.2 S1, §8.2]", l. 4009) does not touch it; §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-202 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-203 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-204 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-205 | test | re-checked (home §13.2; subject of the §12.6 hunk) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-206 | test | re-checked (home §13.2; subject of the §12.6 hunk) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-207 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-208 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-209 | test | re-checked (home §13.2; subject of the §12.6 hunk) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-210 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-211 | test | re-checked (home §13.2; points into §12.6) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff); the r3 change in §12.6 (the replay sentence's verb, l. 7330–7331) does not touch it |
| SCOPE-212 | test | re-checked (home §13.2; points into §16) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff); its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-213 | algorithm-step | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-214 | budget | re-checked (home §13.2; points into §12.6) | OK — unchanged: "≈ 12.5 CPU-min at §12.6's block and district costs" (l. 7769–7770) lands on §12.6's per-scope costs, outside §12.6's hunk |
| SCOPE-215 | evidence | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-216 | rule | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-217 | rule | re-checked (home §13.2; points into §16) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff); its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-218 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-219 | test | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-220 | acceptance-bar | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-221 | test | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-222 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-223 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-224 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-225 | type | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-226 | interface | re-checked (subject of the §6.1 hunk) | OK — `ShiftRecord`'s `render.stampTiles` stage and `tiles?` field unchanged (l. 7821); the library stays seed-independent under §6.1's repaired key, whose words hold no seed (V-FIN-04) |
| SCOPE-227 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-228 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-229 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-230 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-231 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-232 | test | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-233 | rule | kept | as r2 — as r1 — OK — §6.5's r1 change is in (9); (3)'s lint scope is unchanged |
| SCOPE-234 | test | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-235 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-236 | rule | re-checked (subject of the §6.1 hunk) | OK — unchanged; §6.1's repair (V-FIN-04) states the existing key's function and moves no stored stamp-tile hash, so no shift record arises |
| SCOPE-237 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-238 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-239 | rule | re-checked (points into §16; subject of the §12.6 hunk) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-240 | test | re-checked (points into §13.2) | OK — its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier) |
| SCOPE-241 | test | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-242 | test | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-243 | test | re-checked (points into §5.2; subject of the §12.6 hunk) | OK — the r3 change in §5.2 (F-CONTOUR's bracket → "[§4.2 S1, §8.2]", l. 4009) does not touch it; §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-244 | test | kept | as r2 — as r1 — OK — §8.3's r1 change (a tag) does not touch it |
| SCOPE-245 | acceptance-bar | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-246 | test | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-247 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-248 | test | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-249 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-250 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-251 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-252 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-253 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-254 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-255 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-256 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-257 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-258 | rule | re-checked (points into §13.2) | OK — its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier) |
| SCOPE-259 | acceptance-bar | kept | as r2 — OK — the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-260 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-261 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-262 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-263 | acceptance-bar | kept | as r2 — OK — the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-264 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-265 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-266 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-267 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-268 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-269 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-270 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-271 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-272 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-273 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-274 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-275 | acceptance-bar | re-checked (subject of the §13.2 hunk) | OK — unchanged: §13.5's walled-share row (MFCG 0.87–0.92 at sizes 40–250) is the parity bar; the sweep's "inside its rung band, §4.2 S2" (V-FIN-02) is a separate assertion and names its own rows |
| SCOPE-276 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-277 | acceptance-bar | kept | as r2 — OK — the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-278 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-279 | acceptance-bar | re-checked (points into §4.2, §13.2) | OK — its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-280 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-281 | acceptance-bar | kept | as r2 — OK — the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-282 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-283 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-284 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-285 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-286 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-287 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-288 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-289 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-290 | defined-term | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-291 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-292 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-293 | defined-term | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-294 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-295 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-296 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-297 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-298 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-299 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-300 | algorithm-step | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-301 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-302 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-303 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-304 | rule | re-checked (subject of the §9.5 hunk) | OK — §9.5's compass now cites §6.1's town root key only (V-FIN-06), which changes nothing it states |
| SCOPE-305 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-306 | acceptance-bar | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-307 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-308 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-309 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-310 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-311 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-312 | type | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-313 | type | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-314 | type | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-315 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-316 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-317 | rule | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-318 | rule | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-319 | rule | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-320 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-321 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-322 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-323 | acceptance-bar | kept | as r2 — OK — the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-324 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-325 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-326 | acceptance-bar | kept | as r2 — as r1 — OK — VR-R0-13 resolved: "takes its next alternate (§9.2: its next spine, then §9.4's ladder)" (l. 8151), matching §9.2 l. 6428 and §9.3's candidate order; vetoable (O-R1-4) |
| SCOPE-327 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-328 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-329 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-330 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-331 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-332 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-333 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-334 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-335 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-336 | acceptance-bar | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-337 | rule | kept | as r2 — as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-338 | budget | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-339 | budget | re-checked (points into §13.2; subject of the §6.1 hunk) | OK — its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier); §6.1's repaired stamp-tile entry (V-FIN-04) states the existing key's function and changes nothing it states |
| SCOPE-340 | budget | re-checked (points into §13.2; subject of the §6.1 hunk) | OK — its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier); §6.1's repaired stamp-tile entry (V-FIN-04) states the existing key's function and changes nothing it states |
| SCOPE-341 | rule | re-checked (points into §13.2) | OK — its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier) |
| SCOPE-342 | budget | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-343 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-344 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-345 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-346 | algorithm-step | re-checked (subject of the §12.6 hunk) | OK — §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-347 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-348 | interface | re-checked (points into §6.1) | OK — "poisson (the stamped ranked tiles' construction from a constant stream key, … §8.10)" (l. 8224–8225) agrees with §6.1's entry, whose key derivation is now stated (V-FIN-04); §8.10 still points there (l. 6261–6262) |
| SCOPE-349 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-350 | interface | kept | as r2 — OK — the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-351 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-352 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-353 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-354 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-355 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-356 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-357 | interface | re-checked (subject of the §6.1 hunk) | OK — §6.1's repaired stamp-tile entry (V-FIN-04) states the existing key's function and changes nothing it states |
| SCOPE-358 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-359 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-360 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-361 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-362 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-363 | interface | re-checked (points into §13.2) | OK — its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier) |
| SCOPE-364 | restatement | re-checked (points into §4.2) | OK — the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-365 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-366 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-367 | rule | kept | as r2 — as r1 — OK — §6.5's r1 change is in (9); (3)'s lint scope and vendored scan are unchanged |
| SCOPE-368 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-369 | interface | kept | as r2 — OK — the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695) and §5.1 (the tier-4 diagram line, l. 3988) do not touch it |
| SCOPE-370 | type | re-checked (points into §6.1) | OK — the r3 change in §6.1 (the `render.stampTiles` key's finalisers named, l. 4177–4181) does not touch it |
| SCOPE-371 | interface | re-checked (points into §6.1) | OK — the r3 change in §6.1 (the `render.stampTiles` key's finalisers named, l. 4177–4181) does not touch it |
| SCOPE-372 | interface | re-checked (subject of the §9.5 hunk) | OK — `stream`'s "TOWN_ROOT for town-level draws (§6.1)" (l. 8292) is the handle §9.5's compass now cites with §6.1 only ("(§6.1, §14 `TOWN_ROOT`)", l. 6562, V-FIN-06) |
| SCOPE-373 | defined-term | re-checked (points into §6.1, §9.5) | OK — §14's `TOWN_ROOT` comment (l. 8292) points to §6.1, whose town root key — "the seed key mixed with the fixed town lineage …, so they depend on the recipe alone and never on `docId`" (l. 4120–4123) — is now the only key §9.5's compass names (l. 6561–6562, V-FIN-06) |
| SCOPE-374 | type | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-375 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-376 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-377 | interface | kept | as r2 — OK — the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-378 | interface | re-checked (points into §6.1) | OK — the r3 change in §6.1 (the `render.stampTiles` key's finalisers named, l. 4177–4181) does not touch it |
| SCOPE-379 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-380 | interface | re-checked (points into §9.5) | OK — the r3 change in §9.5 (the compass's "— the seed key alone" dropped, l. 6562) does not touch it |
| SCOPE-381 | interface | kept | as r2 — as r1 — r0: OK — pointer present; target §9.2 states it |
| SCOPE-382 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-383 | interface | kept | as r2 — as r1 — OK — `TileAddress`, `TileRasterOpts`, `TileBackend`, `RasterJob` declared in §8.9 |
| SCOPE-384 | interface | kept | as r2 — as r1 — OK — r0's "present" corrected: `VectorBackend` was declared nowhere at r0 (VR-R0-1); now §8.9 l. 6172, identical to the archive's §14 line; §14's pointer (l. 8325) resolves |
| SCOPE-385 | interface | re-checked (subject of the §12.6 hunk) | OK — §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-386 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-387 | rule | re-checked (points into §9.5) | OK — the r3 change in §9.5 (the compass's "— the seed key alone" dropped, l. 6562) does not touch it |
| SCOPE-388 | interface | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-389 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-390 | rule | re-checked (points into §13.2) | OK — its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier) |
| SCOPE-391 | rule | re-checked (points into §13.2) | OK — its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier) |
| SCOPE-392 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-393 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-394 | defined-term | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-395 | mapping | re-checked (points into §4.2, §6.1) | OK — the r3 changes in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) and §6.1 (the `render.stampTiles` key's finalisers named, l. 4177–4181) do not touch it |
| SCOPE-396 | mapping | re-checked (points into §4.2) | OK — the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-397 | mapping | re-checked (points into §4.2) | OK — the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-398 | mapping | re-checked (points into §9.5) | OK — the r3 change in §9.5 (the compass's "— the seed key alone" dropped, l. 6562) does not touch it |
| SCOPE-399 | mapping | re-checked (points into §9.5) | OK — the r3 change in §9.5 (the compass's "— the seed key alone" dropped, l. 6562) does not touch it |
| SCOPE-400 | mapping | re-checked (points into §4.2, §13.2) | OK — its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-401 | mapping | re-checked (points into §4.2) | OK — the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-402 | mapping | re-checked (points into §4.2) | OK — the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-403 | mapping | re-checked (points into §4.2) | OK — the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-404 | mapping | re-checked (points into §9.5) | OK — the r3 change in §9.5 (the compass's "— the seed key alone" dropped, l. 6562) does not touch it |
| SCOPE-405 | restatement | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-406 | mapping | re-checked (points into §4.2, §6.1) | OK — the r3 changes in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) and §6.1 (the `render.stampTiles` key's finalisers named, l. 4177–4181) do not touch it |
| SCOPE-407 | mapping | re-checked (points into §9.5) | OK — the r3 change in §9.5 (the compass's "— the seed key alone" dropped, l. 6562) does not touch it |
| SCOPE-408 | mapping | re-checked (points into §4.2, §9.5; subject of the §5.2 hunk) | OK — VG's contour rows map to §8.2's relief tier (l. 8556), one of the two sections F-CONTOUR's bracket now names (l. 4009, V-FIN-03) |
| SCOPE-409 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-410 | defined-term | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-411 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-412 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-413 | acceptance-bar | re-checked (points into §6.1) | OK — the r3 change in §6.1 (the `render.stampTiles` key's finalisers named, l. 4177–4181) does not touch it |
| SCOPE-414 | acceptance-bar | re-checked (points into §9.5, §13.2) | OK — its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier); the r3 change in §9.5 (the compass's "— the seed key alone" dropped, l. 6562) does not touch it |
| SCOPE-415 | acceptance-bar | kept | as r2 — as r1 — OK — O3 (a) "B-FUZZ … 0 crash / hang / invalid output" matches §13.1's bar, which §5.2 F-NUM cites with O3 a |
| SCOPE-416 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-417 | acceptance-bar | re-checked (points into §4.2; subject of the §5.2 hunk) | OK — O1 (b) "contours cross water 0 times [C]" (l. 8590) agrees with F-CONTOUR "[§4.2 S1, §8.2]" (l. 4009, V-FIN-03), a constructive clip that always succeeds; O1's "§4.2 S1" lands on unchanged text (the S1 (1) hunk is the resolution pointer only) |
| SCOPE-418 | acceptance-bar | kept | as r2 — OK — the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-419 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-420 | acceptance-bar | re-checked (subject of the §12.6 hunk) | OK — §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-421 | acceptance-bar | re-checked (points into §5.2) | OK — the r3 change in §5.2 (F-CONTOUR's bracket → "[§4.2 S1, §8.2]", l. 4009) does not touch it |
| SCOPE-422 | acceptance-bar | re-checked (points into §4.2) | OK — the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-423 | acceptance-bar | kept | as r2 — OK — the r2 change in §12.7 (the `lit` export from M2b, l. 7411–7414; the stage-3 hook's pointer, l. 7419–7422) does not touch it |
| SCOPE-424 | acceptance-bar | re-checked (points into §4.2; subject of the §13.2 hunk) | OK — O8 (e) "walled share in MFCG band [P]" (l. 8597) is §13.5's parity band, unchanged, and distinct from the sweep's rung band (V-FIN-02); §4.2's r3 hunk does not touch S2 or S3 |
| SCOPE-425 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-426 | acceptance-bar | re-checked (home §13.2) | OK — unchanged since r2 (§13.2's hunk is l. 7687–7711 of the *Stage property tests* bullet, one substitution; word diff) |
| SCOPE-427 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-428 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-429 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-430 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-431 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-432 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-433 | acceptance-bar | re-checked (subject of the §12.6 hunk) | OK — §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-434 | acceptance-bar | re-checked (points into §4.2, §6.1) | OK — the r3 changes in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) and §6.1 (the `render.stampTiles` key's finalisers named, l. 4177–4181) do not touch it |
| SCOPE-435 | acceptance-bar | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-436 | acceptance-bar | kept | as r2 — OK — the r2 changes in §4.4 (S5d's test → §13.2, l. 3124) and §4.8 ("§5.2" dropped from the castle acceptance, l. 3590) do not touch it |
| SCOPE-437 | acceptance-bar | kept | as r2 — OK — the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-438 | acceptance-bar | re-checked (points into §6.1) | OK — the r3 change in §6.1 (the `render.stampTiles` key's finalisers named, l. 4177–4181) does not touch it |
| SCOPE-439 | rule | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-440 | budget | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-441 | rule | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-442 | rule | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-443 | rule | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-444 | acceptance-bar | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-445 | rule | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-446 | acceptance-bar | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-447 | acceptance-bar | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-448 | acceptance-bar | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-449 | acceptance-bar | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-450 | rule | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-451 | rule | re-checked (home §16) | OK — VS5-1's text unchanged (outside §16's hunk): "a document whose `outputVersion` is not the running one is never root-checked: it opens as §2.9 step 2's frozen view … the `frozenImport` rebase arrives with M3a's rebases" (l. 8643); §2.9 step 5 agrees (l. 1469) |
| SCOPE-452 | rule | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-453 | acceptance-bar | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-454 | acceptance-bar | re-checked (home §16; points into §13.2) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff); its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier) |
| SCOPE-455 | acceptance-bar | re-checked (home §16; subject of the §6.1 hunk) | OK — M1's row is outside §16's hunk: "the pan-and-zoom run during an A2 export (§8.9, §12.7)" and "the stamp-tile asset load (§8.10, §12.7)" (l. 8643) land on §12.7's M1 run (l. 7410–7411) and stamp-tile load (l. 7415–7417) |
| SCOPE-456 | acceptance-bar | re-checked (home §16; points into §4.2, §13.2) | OK — unchanged: M1's exit fixture "a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message" (l. 8643, VS5-1); its §13.2 and §4.2 places are outside both hunks |
| SCOPE-457 | rule | re-checked (home §16; subject of the §12.6 hunk) | OK — unchanged: "replay with S13a per event (§7.3)" (l. 8644) lands on §7.3 item 2's replay mode (l. 4866–4870), which §12.6's repaired sentence also cites ("the view stages run once at the end (§7.3 item 2)", l. 7330–7331); VD5-7's link rule with the keep present (§4) |
| SCOPE-458 | acceptance-bar | re-checked (home §16; points into §12.6, §13.2) | OK — unchanged (M2a's row is outside §16's hunk): "the verification reference mix within §12.6's V + 10 %" and "its §12.6 cost + 10 ms" (l. 8644) land on §12.6's law V with "pass: ≤ V + 10 %" (l. 7329–7349) and its plot-edit budget; §12.6's r3 hunk only restores the replay sentence's verb (V-FIN-01); VD5-7's exit case present (§4) |
| SCOPE-459 | rule | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-460 | acceptance-bar | re-checked (home §16) | OK — **V-FIN-05 (= V-SCOPE-R2-01) FIXED**: M2b's exit now reads "… the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7); the `lit` export beside a moving `path` sun (§12.7); the METROPOLIS SVG budget (§12.7); …" (l. 8645); "(§12.7)" lands on §12.7's run "from M2b, where `lit` ships, a `lit` export of a CITY while a `path` sun advances one step per frame" (l. 7410–7414), so NR5-1's executed check now gates a milestone; the rest of the row is word-identical (word diff), still 4 cells, 33–42 pw |
| SCOPE-461 | rule | re-checked (home §16) | OK — unchanged: M3a's "the pack and host-content link refusals (§2.9, §6.4)" (l. 8646), VD5-7's narrowing |
| SCOPE-462 | acceptance-bar | re-checked (home §16; points into §13.2; subject of the §12.6 hunk) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff); its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-463 | acceptance-bar | re-checked (home §16; points into §12.6, §13.2) | OK — unchanged: "a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them" (l. 8646); the kept-town case is M2a's (VD5-7); its §13.2 and §12.6 places are outside both hunks |
| SCOPE-464 | rule | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-465 | acceptance-bar | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-466 | rule | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-467 | acceptance-bar | re-checked (home §16; subject of the §12.6 hunk) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-468 | rule | re-checked (home §16; points into §13.2) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff); its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier) |
| SCOPE-469 | rule | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-470 | budget | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-471 | history | re-checked (points into §16) | OK — history, verbatim in the rationale file, which round 3 did not touch (last written 16:23); its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-472 | budget | re-checked (home §16; subject of the §6.1 hunk) | OK — unchanged since r2 (outside §16's hunk): "the shipped stamp-tile asset, with its shared seam band, and its build tool `plat/tools/stamptiles/` (§8.10; M1), ≈ 1–2 days" (l. 8678–8679); §6.1's r3 change adds no build work |
| SCOPE-473 | rule | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-474 | decision | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-475 | rule | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-476 | rule | re-checked (home §16) | OK — unchanged since r2 (§16's hunk is one criterion inserted into M2b's exit, l. 8645; word diff) |
| SCOPE-477 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-478 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-479 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-480 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-481 | test | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-482 | test | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-483 | test | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-484 | test | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-485 | test | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-486 | test | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-487 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-488 | evidence | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-489 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-490 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-491 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-492 | mechanism | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-493 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-494 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-495 | rule | kept | as r2 — as r1 — r0: OK — re-read: the castle's 0.75 compactness gate as a provenance example is unaffected by §4.8's pointer drop |
| SCOPE-496 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-497 | rule | re-checked (subject of the §6.1 hunk) | OK — §6.1's repaired stamp-tile entry (V-FIN-04) states the existing key's function and changes nothing it states |
| SCOPE-498 | rule | kept | as r2 — OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-499 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-500 | decision | kept | as r2 — OK — its §1.2 place: only §1.2's timing pointer changed, values equal |
| SCOPE-501 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-502 | decision | kept | as r2 — as r1 — r0: OK (proprietary default kept; RULING-1 is the owner's) |
| SCOPE-503 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-504 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-505 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-506 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-507 | decision | re-checked (subject of the §5.2 hunk) | OK — F-CONTOUR's new bracket (V-FIN-03) changes nothing it states |
| SCOPE-508 | rule | kept | as r2 — OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-509 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-510 | decision | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-511 | decision | re-checked (points into §4.2; subject of the §13.2 hunk) | OK — D-2's "walled shares and stage rows per rung are MFCG-calibrated (§1.1, §4.2 S2)" (l. 9185) lands on unchanged rows (l. 2786–2791), the rows §13.2's repaired sweep names (V-FIN-02) |
| SCOPE-512 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-513 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-514 | decision | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-515 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-516 | decision | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-517 | decision | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-518 | decision | kept | as r2 — OK — the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-519 | decision | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-520 | decision | kept | as r2 — OK — the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-521 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-522 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-523 | decision | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-524 | decision | re-checked (points into §6.1) | OK — D-15's "keyed from §6.1's structured components" (l. 9240) lands on unchanged text; §6.1's hunk is the `render.stampTiles` entry only (CANON-C08 as ruled) |
| SCOPE-525 | decision | kept | as r2 — OK — the r2 changes in §4.4 (S5d's test → §13.2, l. 3124) and §5.2 (the F-SKELETON row, l. 4018) do not touch it |
| SCOPE-526 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-527 | decision | re-checked (points into §13.2) | OK — its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier) |
| SCOPE-528 | decision | re-checked (points into §4.2; subject of the §13.2 hunk) | OK — D-19's "the terrain resolution per rung (§2.3)" (l. 9267–9268) lands on §2.3 (l. 656: TOWN 5 m, CITY 8 m, METROPOLIS 10 m), now the only statement of the values, §4.2 S1 (1) pointing there too (V-FIN-07, l. 2658); "the gate law (§4.2 S3)" and "stage counts and walled shares per rung (§1.1, §4.2 S2)" land on unchanged text |
| SCOPE-529 | decision | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-530 | decision | re-checked (points into §16; subject of the §12.6 hunk) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-531 | decision | kept | as r2 — as r1 — r0: OK (RULING-1 is the owner's) |
| SCOPE-532 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-533 | decision | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-534 | decision | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-535 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-536 | decision | kept | as r2 — OK — the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-537 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-538 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-539 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-540 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-541 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-542 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-543 | decision | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-544 | decision | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-545 | rule | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-546 | mapping | kept | as r2 — OK — the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-547 | mapping | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-548 | mapping | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-549 | mapping | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-550 | mapping | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-551 | mapping | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-552 | mapping | re-checked (points into §16) | OK — its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-553 | history | kept | as r2 — OK — history, verbatim in the rationale file, which round 2 did not touch; §0.2 changed row 4 only |
| SCOPE-554 | history | kept | as r2 — OK — history, verbatim in the rationale file, which round 2 did not touch; §0.2 changed row 4 only |
| SCOPE-555 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-556 | history | kept | as r2 — as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-557 | history | kept | as r2 — as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-558 | rule | kept | as r2 — as r1 — r0: OK — stated at the new location |
| SCOPE-559 | history | kept | as r2 — as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-560 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-561 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-562 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-563 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-564 | decision | re-checked (J-row §6.1) | OK — index row "a 128-bit key hash with 32-bit-lane mixing \| §6.1" (l. 9360) unchanged; the 32-bit-lane finalisers it names are the ones §6.1's repaired stamp-tile entry now cites "(as for the seed key)" (V-FIN-04); no J-id mention changed in any section (script) |
| SCOPE-565 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-566 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-567 | decision | re-checked (subject of the §12.6 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-568 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-569 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-570 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-571 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-572 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-573 | decision | re-checked (J-row §16) | OK — index row unchanged; no J-id mention changed in any section (script); its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-574 | decision | re-checked (J-row §16) | OK — index row unchanged; no J-id mention changed in any section (script); its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-575 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-576 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-577 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-578 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-579 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-580 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-581 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-582 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-583 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-584 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-585 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-586 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-587 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-588 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-589 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-590 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-591 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-592 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-593 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-594 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-595 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-596 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-597 | decision | kept | as r2 — OK — the index row's "≤ 3 µs per plot" agrees with §12.4's S11 row, which §2.6 and §12.7 now cite (V-MODEL-R1-02, VR-R1-6); row unchanged |
| SCOPE-598 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-599 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-600 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-601 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-602 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-603 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-604 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-605 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-606 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-607 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-608 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-609 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-610 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-611 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-612 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-613 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-614 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-615 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-616 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-617 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-618 | decision | re-checked (subject of the §12.6 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-619 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-620 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-621 | decision | re-checked (subject of the §12.6 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-622 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-623 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-624 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-625 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-626 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-627 | decision | re-checked (subject of the §9.5 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §9.5's compass now cites §6.1's town root key only (V-FIN-06), which changes nothing it states |
| SCOPE-628 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-629 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-630 | decision | re-checked (subject of the §12.6 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-631 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-632 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-633 | decision | re-checked (subject of the §12.6 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-634 | decision | re-checked (J-row §6.1) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §6.1 (the `render.stampTiles` key's finalisers named, l. 4177–4181) does not touch it |
| SCOPE-635 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-636 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-637 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-638 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-639 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-640 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-641 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-642 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-643 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-644 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-645 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-646 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-647 | decision | re-checked (subject of the §12.6 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-648 | decision | kept | as r2 — as r1 — OK — **V-SCOPE-10 FIXED**: Part A row amended with KERNEL-357's split key (rationale l. 136), F.2 heading without the instruction (l. 1106), index row "…, keyed by their route edge's endpoints" (l. 9447) |
| SCOPE-649 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-650 | decision | re-checked (subject of the §12.6 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-651 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-652 | decision | re-checked (subject of the §12.6 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-653 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-654 | decision | re-checked (subject of the §12.6 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-655 | decision | re-checked (subject of the §12.6 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-656 | decision | re-checked (subject of the §12.6 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-657 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-658 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-659 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-660 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-661 | decision | re-checked (subject of the §12.6 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-662 | decision | re-checked (subject of the §12.6 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-663 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-664 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-665 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-666 | decision | re-checked (J-row §4.2) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-667 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-668 | decision | re-checked (J-row §4.2; subject of the §13.2 hunk) | OK — J-P5 still cited at §4.2 S2's *Stages and the walled share (MFP-6; J-P5)* (l. 2786), which §13.2's repaired sweep now points to (V-FIN-02); index row unchanged |
| SCOPE-669 | decision | re-checked (J-row §4.2) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-670 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-671 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-672 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-673 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-674 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-675 | decision | re-checked (J-row §4.2; subject of the §5.2 hunk) | OK — J-P12 still cited at §4.2's *Contours and coast (GEO-14; J-P12)* (l. 2675); the clip the row's gist names is §8.2's, which F-CONTOUR's bracket now names beside §4.2 S1 (V-FIN-03); index row unchanged |
| SCOPE-676 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-677 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-678 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-679 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-680 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-681 | decision | kept | as r2 — OK — index row unchanged; the cost contract's figures are now cited to §12.4's S11 row at §2.6 rule 4 (l. 963) and §12.7 (l. 7419–7422), values unchanged |
| SCOPE-682 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-683 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-684 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-685 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-686 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-687 | decision | re-checked (J-row §4.2) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-688 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-689 | decision | re-checked (J-row §4.2) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-690 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-691 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-692 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.8 ("§5.2" dropped from the castle acceptance, l. 3590) does not touch it |
| SCOPE-693 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-694 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-695 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-696 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-697 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-698 | decision | re-checked (J-row §4.2) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-699 | decision | re-checked (J-row §4.2) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-700 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-701 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-702 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-703 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §4.4 (S5d's test → §13.2, l. 3124) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-704 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-705 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-706 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-707 | decision | re-checked (J-row §4.2) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-708 | decision | re-checked (J-row §4.2; subject of the §5.2 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it; F-CONTOUR's new bracket (V-FIN-03) changes nothing it states |
| SCOPE-709 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-710 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-711 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-712 | decision | re-checked (J-row §12.6) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §12.6 (the replay sentence's verb, l. 7330–7331) does not touch it |
| SCOPE-713 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-714 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-715 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-716 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-717 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-718 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-719 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-720 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-721 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-722 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-723 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-724 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-725 | decision | re-checked (J-row §9.5) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §9.5 (the compass's "— the seed key alone" dropped, l. 6562) does not touch it |
| SCOPE-726 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-727 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-728 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-729 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-730 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-731 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-732 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-733 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-734 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-735 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-736 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-737 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-738 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-739 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-740 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-741 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-742 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-743 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-744 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-745 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-746 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-747 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-748 | decision | re-checked (J-row §12.6) | OK — J-R36 still cited at §12.6's replay bullet (l. 7349), whose first sentence now has its verb (V-FIN-01); index row unchanged |
| SCOPE-749 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-750 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-751 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-752 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-753 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.8 (the crown set's size wording, l. 7482) does not touch it |
| SCOPE-754 | decision | re-checked (subject of the §6.1 hunk) | OK — J-R42 still cited at §8.10 (l. 6262); its gist "a constant stream key for the stamp-tile library" (l. 9555) agrees with §6.1's repaired entry — a constant entity key by the four 32-bit-lane finalisers over the words, with `STAGE_VIEW` and reroll, attempt, epoch and salt 0 (l. 4176–4181, V-FIN-04), hence a constant stream key; index row unchanged |
| SCOPE-755 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-756 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-757 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-758 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-759 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.8 (the crown set's size wording, l. 7482) does not touch it |
| SCOPE-760 | decision | re-checked (subject of the §6.1 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §6.1's repaired stamp-tile entry (V-FIN-04) states the existing key's function and changes nothing it states |
| SCOPE-761 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-762 | decision | re-checked (subject of the §6.1 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); §6.1's repaired stamp-tile entry (V-FIN-04) states the existing key's function and changes nothing it states |
| SCOPE-763 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.7 (the `lit` export from M2b, l. 7411–7414; the stage-3 hook's pointer, l. 7419–7422) does not touch it |
| SCOPE-764 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-765 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.7 (the `lit` export from M2b, l. 7411–7414; the stage-3 hook's pointer, l. 7419–7422) does not touch it |
| SCOPE-766 | decision | kept | as r2 — OK — index row unchanged; §8.10 and §12.7's crown bake by light step unchanged; §12.8's hunk only re-words the crown set's size |
| SCOPE-767 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-768 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-769 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-770 | decision | re-checked (J-row §13.2) | OK — index row unchanged; no J-id mention changed in any section (script); its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier) |
| SCOPE-771 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-772 | decision | re-checked (J-row §16) | OK — index row unchanged; no J-id mention changed in any section (script); its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-773 | decision | re-checked (J-row §16) | OK — index row unchanged; no J-id mention changed in any section (script); its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-774 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-775 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-776 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-777 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-778 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-779 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-780 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-781 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-782 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-783 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-784 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-785 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-786 | decision | re-checked (J-row §16) | OK — index row unchanged; no J-id mention changed in any section (script); its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-787 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-788 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-789 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-790 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-791 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-792 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-793 | decision | re-checked (J-row §9.5) | OK — index row "town-level draws keyed from the town root's entity key \| §9.5, §14" (l. 9596) agrees with §9.5's repaired compass (l. 6561–6562, V-FIN-06) and §6.1 (l. 4120–4123); the rationale row's "which depends on the seed key alone" states a dependency, true of §6.1's key (O-R3-2) |
| SCOPE-794 | decision | re-checked (J-row §13.2/§16) | OK — index row unchanged; no J-id mention changed in any section (script); its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier); its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-795 | decision | re-checked (J-row §6.1) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §6.1 (the `render.stampTiles` key's finalisers named, l. 4177–4181) does not touch it |
| SCOPE-796 | decision | re-checked (J-row §13.2) | OK — index row unchanged; no J-id mention changed in any section (script); its §13.2 place is word-identical (§13.2's one substitution is SCOPE-184's qualifier) |
| SCOPE-797 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-798 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-799 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-800 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-801 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-802 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-803 | decision | re-checked (J-row §16) | OK — index row unchanged; no J-id mention changed in any section (script); its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-804 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-805 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-806 | decision | re-checked (J-row §16) | OK — index row unchanged; no J-id mention changed in any section (script); its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-807 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-808 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-809 | decision | re-checked (J-row §16; subject of the §6.1 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); its §16 place is word-identical (§16's one change is M2b's inserted criterion); §6.1's repaired stamp-tile entry (V-FIN-04) states the existing key's function and changes nothing it states |
| SCOPE-810 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-811 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-812 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-813 | decision | re-checked (J-row §6.1) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §6.1 (the `render.stampTiles` key's finalisers named, l. 4177–4181) does not touch it |
| SCOPE-814 | decision | re-checked (J-row §4.2) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-815 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-816 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-817 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-818 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-819 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695), §4.4 (S5d's test → §13.2, l. 3124) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-820 | decision | kept | as r2 — as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-821 | decision | re-checked (points into §4.2) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §4.2 (S1 (1)'s per-rung resolution → a pointer to §2.3, l. 2658) does not touch it |
| SCOPE-822 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-823 | decision | re-checked (J-row §16; subject of the §12.6 hunk) | OK — index row unchanged; no J-id mention changed in any section (script); its §16 place is word-identical (§16's one change is M2b's inserted criterion); §12.6's restored verb (V-FIN-01) changes nothing it states |
| SCOPE-824 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-825 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-826 | decision | kept | as r2 — OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-827 | decision | re-checked (J-row §5.2) | OK — index row unchanged; no J-id mention changed in any section (script); the r3 change in §5.2 (F-CONTOUR's bracket → "[§4.2 S1, §8.2]", l. 4009) does not touch it |
| SCOPE-828 | decision | re-checked (J-row §16) | OK — index row unchanged; no J-id mention changed in any section (script); its §16 place is word-identical (§16's one change is M2b's inserted criterion) |
| SCOPE-C01 | conflict | kept | as r2 — as r1 — RESOLVED — unchanged; §12.9's r1 change is a tag; 1.8× / 2.3× / 5.1× at l. 7504, §12.3 l. 7137–7139 |
| SCOPE-C02 | conflict | kept | as r2 — as r1 — r0: resolved as the canon rules (`verify-scope-r0.md` §4) |
| SCOPE-C03 | conflict | re-checked (points into §13.2) | RESOLVED — §13.2's campaign is outside §13.2's r3 hunk (word diff); "99.5 %" 0 hits; §15.2 O9 (c) still points to §13.2 (l. 8599) |
| SCOPE-C04 | conflict | kept | as r2 — as r1 — r0: resolved as the canon rules (`verify-scope-r0.md` §4) |
| SCOPE-C05 | conflict | re-checked (points into §16) | RESOLVED — §16's riskiest items still read "the kernel's own booleans and bands (M0 a; §3.7's pre-decided fallback)" (l. 8695–8697), outside §16's hunk; §3.7 not replaced |
| SCOPE-C06 | conflict | re-checked (points into §16) | RESOLVED — VS5-1's §16 M1 content and exit are unchanged (l. 8643); §2.9 step 5 agrees (l. 1469) |
| SCOPE-C07 | conflict | re-checked (points into §16; subject of the §12.6 hunk) | RESOLVED — VD5-7's §16 M2a content and exit and M3a's narrowed refusals are unchanged (l. 8644, 8646); §6.4 not replaced |
| SCOPE-C08 | conflict | re-checked (points into §16) | RESOLVED — §16 M5's fabric list (l. 8650) is outside §16's hunk; VS5-2's text holds (§4) |
| SCOPE-C09 | conflict | kept | as r2 — as r1 — INVALID per canon — unchanged (§3.2's r1 change is a tag at item 6) |
| SCOPE-C10 | conflict | re-checked (points into §16) | RESOLVED — §16 M3b's CityJSON and the closing "CityJSON is built (§11.1)" (l. 8647, 8703) are outside §16's hunk |
| SCOPE-C11 | conflict | re-checked (points into §16) | RESOLVED — §16's closing still points to the one list in *Staged by the owner's roadmap* (l. 8701–8704), outside §16's hunk |
