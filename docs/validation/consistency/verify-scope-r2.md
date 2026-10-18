# Verify — scope part (title, summary, §0, PART I heading, §1, §13–§17, Delegated decisions, Judgment calls, Staged, Appendix A), consistency pass round 2

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-scope-r2`, 2026-09-26. Status: COMPLETE. Re-verifies the scope part of `docs/ARCHITECTURE.md`
after repair round 2 (`assemble-r2`, 15 blocks). Inputs: the archive `docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`,
`inventory-scope.json` (828 items + 11 conflict records), `canon.json`, `rewrite-scope.md`'s mapping table, the six
`repair-r2-*.md` files, `assemble-r2.md`, `still-open-r5.json`, and this lane's round-1 report `verify-scope-r1.md`
(cited as "r1"; r1 cites `verify-scope-r0.md` as "r0"). Method: the round-1 document was rebuilt (`assemble-r0.py`, then
`assemble-r1.py`: sha256 `ddd48f07…5ebb1`, assemble-r2's "before"); a fresh `assemble-r2.py` run on it is
`cmp`-identical to the current document (sha256 `d9d509fa…7a5d`), so nothing has touched the document since assembly.
The two were diffed (16 hunks, every one read, word diff of the three scope blocks). Re-checked: every id homed in a
replaced scope subsection (§0.2, §1.2, §13.2); every id whose target, restatement or pointer lies in one of the 12 other
replaced subsections (§2.6, §3.3, §4.2, §4.4, §4.8, §5.1, §5.2, §7.3, §8.10, §12.6, §12.7, §12.8) — found from the
inventory, the canon's homes and places, the mapping table, a scan of this part's 255 pointers into those subsections, and
a keyword scan for the subjects each hunk changed; every judgment-index row naming one of them; every scope home that
replaced text now points to; and every issue the repairs claimed to fix. All other ids keep their r1 verdict (§9 quotes
it). Line numbers are the current document's. The other round-2 verifiers' reports (kernel, model, pipeline,
determinism, rendering) were read for issues routed to this part. Scratch files: a private scratchpad subdirectory
(`vs2/`).

## 1. Outcome

**Both r1 issues of this part are FIXED.** V-SCOPE-R1-01 (= V-MODEL-R1-01): §13.2's load-verification fixtures now carry
the archive's three details — "an edited CITY document", a mismatch "forced by a snapshot whose one moved footprint has its
recorded digest recomputed to match", and "the mismatch withdraws the keep". V-SCOPE-R1-02 (= VR-R1-5): §1.2 now reads
"124–145 ms across the target's building range, §1.1; §12.1". O-R1-3's optional §0.2 row 4 wording was applied too. The
three scope blocks landed byte-identical, and the word diff shows each changes only the words its issue names. The four
open items this part owns — **VS5-1, VS5-2, VS5-3 and VD5-7 — stay FIXED** (UNFIXED: none). Every canon conflict whose
place round 2 replaced is still resolved as ruled. No J-id mention moved in any section, no internal reference is broken,
`doc_checks` on the part exits 0 with the same counts as r1, and the replaced blocks hold no deferral wording, fix-round
tag or round narration. The document still has exactly one review banner.

**2 issues, both minor (0 blocker, 0 major), both owned by scope.** Both sit where other lanes' round-2 fixes moved a
fact onto this part:
* **V-SCOPE-R2-01** (new-problem) — §16's M2b exit does not gate the `lit` export beside a moving `path` sun, which §12.7
  now runs from M2b (VR-R1-1's fix). Rendering r1 and r2 and assemble-r2 called this pointer optional. I rule it required,
  because M2b's exit lists every other M2b-scheduled §12 measurement and, without the pointer, the run gates no milestone
  (R10). This ruling is vetoable.
* **V-SCOPE-R2-02** (lost; = `verify-pipeline-r2.md` P2-1, confirmed from this side) — §13.2's `wealthLevel` sweep is now
  the only statement of §4.4's test, and its "inside its rung band" survives only as "in band" (R13).

Verdicts over the 839 records (§9):
* **293 re-checked.** 287 are OK, 2 conflict records are RESOLVED, 2 carry the new issues (SCOPE-460 → V-SCOPE-R2-01,
  SCOPE-184 → V-SCOPE-R2-02), and 2 were re-read and keep r1's verdict (SCOPE-495, SCOPE-507).
* **546 kept from r1.** All are OK, or resolved or invalid as the canon rules.

Part size: 278 770 → 278 950 bytes (+180: §0 +21, §1 +11, §13 +148). This is 66.3 % of the archived part's 420 603.

**CONFIRMED vs PLAUSIBLE.** CONFIRMED (executed): the rebuild and both hashes, the fresh assemble-r2 run (`cmp`), the diff
and word diff, block identity, the per-section J-id count, the reference resolver, `doc_checks`, the scans, the size, the
presence of every fixed wording and open-item phrase exactly once, and each issue's gap (grep). PLAUSIBLE (reading only):
that none of the 255 pointers from this part into the 12 other replaced subsections, and none of the 56 pointers from them
into this part, relies on anything else those hunks changed. Each was read against its hunk, with no second reader. The
two rulings (V-SCOPE-R2-01 required, O-R2-2 not an issue) and the severities are also PLAUSIBLE.

## 2. Issues (each with its owning part)

| id | sev | kind | owner | claim (evidence) | required change |
|---|---|---|---|---|---|
| V-SCOPE-R2-01 | minor | new-problem | scope | SCOPE-460 (§16 M2b exit) against RENDERING-575 (§12.7 *Export beside the view*). Repair-rendering-r2 fixed VR-R1-1 by moving the `lit` export to M2b: "… and from M2b, where `lit` ships, a `lit` export of a CITY while a `path` sun advances one step per frame — pass: … for the `lit` export, the export made with the sun stopped at the request's time; pre-decided fallback: §8.9's `step(4)`" (l. 7410–7414). This run is the only executed check of NR5-1's fix. Before round 2 it sat inside the M1 run that M1's exit lists ("the pan-and-zoom run during an A2 export (§8.9, §12.7)", l. 8643). No exit lists it now. M2b's exit (l. 8645) lists every other M2b-scheduled §12 measurement: "the moving-sun step budget (§8.4); the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7); the METROPOLIS SVG budget (§12.7)", the export-time peak and memory (§12.8), the first-map runs (§12.5), and the pool rule and max clause (§12.3). R10: "§16 places work in milestones and points to the criteria's homes". Rendering r1 (VR-R1-1's optional part), rendering r2 (its O1) and assemble-r2 (§6) left the pointer optional. It is required, because without it the run gates no milestone (vetoable). | §16 M2b exit: after "the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7);" add "the `lit` export beside a moving `path` sun (§12.7);". Nothing else changes. |
| V-SCOPE-R2-02 (= `verify-pipeline-r2.md` P2-1) | minor | lost | scope | PIPELINE-187 → SCOPE-184. The archive's §4.4 S5d (l. 4111–4112) asserted "population ± 5 % and the walled share **inside its rung band**". P1-2's fix reduced §4.4 S5d to "**Test:** §13.2's B-CITY `wealthLevel` sweep" (l. 3124), and F-BUDGET-STAGE points there too (l. 4012). §13.2 (l. 7687–7688) reads "(population ± 5 % on ≥ 95 % of seeds, walled share in band)". This is the archive's own §13.2 wording, and it names no rung. The shares are set per rung (§4.2 S2, l. 2786–2790: ≈ 0.9 at TOWN, ≈ 0.88 at CITY and METROPOLIS). Elsewhere "walled share … band" is MFCG's 0.87–0.92 band (§13.5 l. 7971, §15.2 O8 (e), §16 M1). In a sweep that moves wealth, a bare "in band" can also be read as a wealth band. R13: a qualifier that a restatement carries is added to the home. "inside its rung band" has 0 hits. | P2-1's change: §13.2 *Stage property tests*: "… (population ± 5 % on ≥ 95 % of seeds, walled share in band)" → "… (population ± 5 % on ≥ 95 % of seeds, walled share inside its rung band, §4.2 S2)". Nothing else changes. |

## 3. The issues repair round 2 claimed

| issue | owner | repaired by | now reads (current line) | verdict |
|---|---|---|---|---|
| V-SCOPE-R1-01 (= V-MODEL-R1-01; SCOPE-205) | scope | repair-r2-scope, §13.2 B-EDIT | "an edit within 100 ms of the state becoming editable on an edited CITY document, with a mismatch forced by a snapshot whose one moved footprint has its recorded digest recomputed to match, each choice taken in turn: …" (l. 7734–7737); "… 'trust the saved town' and a save wait for the recomputation, the mismatch withdraws the keep, and the snapshot is never kept" (l. 7741–7742). These are the archive's details (l. 1994–1995, 2026–2028). The rule is still stated once, at §6.2 (iii) ("A mismatch withdraws the keep for good", l. 4314–4315). §2.9 steps 3–4 send the fixtures here (l. 1434–1435, 1462). MODEL-408's (M3a) clause is §11.3's (l. 6991). | FIXED |
| V-SCOPE-R1-02 (= VR-R1-5; SCOPE-077) | scope | repair-r2-scope, §1.2 | "(124–145 ms across the target's building range, §1.1; §12.1)" (l. 196). §1.1's TOWN row gives 1 200–1 500 buildings at the target (l. 171), and §12.5's TOWN law gives 124–145 ms at that range (l. 7270). | FIXED |
| O-R1-3 (SCOPE-045) | scope | repair-r2-scope, §0.2 row 4 | "§12.2 (matched reference sizes and the band ends in buildings)" (l. 107). §12.2 states both (l. 7102–7118), and the row names §1.1's rung table first. | applied |

Other round-2 fixes that restate or point into this part, each checked from the scope side:

* **P1-2** (pipeline, §4.4 S5d → §13.2). The pointer lands on l. 7687–7688, which states {0, 0.5, 1}, ± 5 % and ≥ 95 %.
  The rung qualifier → V-SCOPE-R2-02.
* **VR-R1-1** (rendering, §12.7's `lit` export from M2b). §16 M1's pointers still land on the M1 run (l. 7410–7411). The
  M2b side → V-SCOPE-R2-01.
* **VR-R1-2** (rendering, §12.8's crown set). No statement in this part relied on the dropped "PLAUSIBLE until M2b's
  moving-sun runs measure it". A scan of the part finds no "crown set", "per-set" or "160 sprites". §16 M2b's "the crown
  bake … (§8.4, §12.7)" lands on §12.7's crown-library bullet, which keeps "Measured with M2b's moving-sun runs (§8.4)".
* **VR-R1-3 (a)** (rendering, §8.10's random source → §6.1). J-R42 is still cited at §8.10 (l. 6262). §14's "from a
  constant stream key … §8.10" (l. 8225) agrees, and §13.3's `render.stampTiles` shift records are unchanged.
  VR-R2-1 (the key's derivation) is determinism's; nothing in this part states the derivation.
* **VR-R1-3 (b)** (rendering, §12.6's replay paragraph → §7.3 item 2). These still land: §16 M2a's "§12.6's V + 10 %"
  and "its §12.6 cost + 10 ms", J-R36 (l. 7349), and the campaign's block and district costs. The clause's missing verb
  is V-MODEL-R2-01 = VR-R2-2 (rendering; O-R2-1).
* **VR-R1-6 and V-MODEL-R1-02** (the µs figures now cite §12.4's S11 row). §16 M0's "S11's geometry share ≤ 3 µs per plot
  median", J-K20's "≤ 3 µs per plot" and the Staged stage-3 row all agree with §12.4's S11 row (l. 7229).
* **VDR1-1** (determinism: §7.3 item 7 (ii) adds wing rings). §15.2 O9 (b)'s "(§7.3 item 7 ii)" and §13.2's "§7.3 item 7
  (i)–(iii) and (v)" land on the clause.
* **VDR1-3** (determinism: §5.2 F-SKELETON, §5.1 tier 4). The row's test cell still points to §13.1's ladder coverage,
  which covers each reader's downgrade (l. 7641–7643). §17.4's use cell → O-R2-2.
* **P1-1** (pipeline: §4.2's contour clip → §8.2). These agree: the summary (SCOPE-009), §1.4's site row (l. 231),
  §15.2 O1 (b) "contours cross water 0 times [C]" (l. 8590), §15.1's relief row (l. 8556), and J-P12, which is still cited
  at §4.2 (l. 2675). This part does not cite F-CONTOUR's bracket (VDR2-1 = VR-R2-3, determinism's).
* **P1-3** (pipeline: §4.8's "§5.2") and **VK-R1-1** (kernel: §3.3's "(K4)"). No scope pointer relied on either. The
  castle-compactness statements (l. 239, 8415, 8597, 8800) and the J-K4 lines are intact.

## 4. Open items owned by this part (VD5-7, VS5-1, VS5-2, VS5-3)

UNFIXED: none. No round-2 hunk touches their places. Every phrase below occurs exactly once (grep, whitespace-normalised).

| item | where (current line) | verdict |
|---|---|---|
| VS5-1 | §16 M1 content: "is never root-checked: it opens as §2.9 step 2's frozen view …", "the `frozenImport` rebase arrives with M3a's rebases", "opens an M1 document of the running output version". M1 exit: "a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message" (all l. 8643). §2.9 step 5: "… reader never root-checks a document of another output version: it opens as step 2's frozen view (§16 M1)" (l. 1469). | FIXED |
| VD5-7 | §16 M2a content: "with the keep, §6.4's link rule that the base is the recipe …" and "a rebased town, a kept saved town included, is offered as its `.plat` file". M2a exit: "a `keptSnapshot`-rebased town's link refused, its `.plat` file offered (§6.4)" (both l. 8644). M3a: "the pack and host-content link refusals (§2.9, §6.4)" (l. 8646). | FIXED |
| VS5-2 | §13.6 (2): "for `area`, the district's own `bent-cut` fabric (the base's, II.2)" (l. 8037), "opened as a `refine` close-up" (l. 8038). II.1's `FabricStrategyId` comment (l. 8932). II.2: "The **`area` template is the base's own bent-cut fabric**" (l. 9020). J-S34: "(`area` = the base's `bent-cut`)" (l. 9603). | FIXED |
| VS5-3 | §17.1 (4): "its inputs to the product are three files committed the same way into `plat/goldens/d5/⟨milestone⟩/` … and the sitting's `record.json` … which the milestone record and the release notes read" (l. 8776–8780). | FIXED |

The routed scope edits of other open items still hold. VD5-3, VD5-4 and VD5-5's B-EDIT fixtures sit in the replaced
§13.2 bullet, and each is word-identical to r1 and occurs once. VK5-1 and VK5-2's fixtures are in §13.1, which round 2 did
not replace. NR5-1 and NR5-2 are in §14 (it still points to §8.9), NP5-2 is in J-I18, and NP5-4 is unchanged.

## 5. Canon conflicts whose places round 2 replaced

| conflict | place round 2 replaced | verdict |
|---|---|---|
| SCOPE-C03 campaign bound | §13.2 (the campaign) | RESOLVED. The campaign is unchanged (word diff), "99.5 %" has 0 hits, and §15.2 O9 (c) still points to §13.2. |
| SCOPE-C01 model time vs MFCG | §1.2 ("§12.5's laws") | RESOLVED. §1.2 states no ratio, and §12.9's 1.8× / 2.3× / 5.1× stand (l. 7501). |
| CANON-C03 frames | §0.2 row 4 | RESOLVED. Row 4 points to §1.1's rung table, which holds the frames (l. 169), and to §12.2, which scales the frame within a rung (l. 7115). |
| RENDERING-C02 (NR5-1) | §12.7's run | RESOLVED. §14 still points to §8.9 for `TileRasterOpts`, and NR5-1's run is in §12.7 from M2b (its milestone gate → V-SCOPE-R2-01). |
| KERNEL-C06 / -C12 (J-K6) | §3.3 | RESOLVED. §3.3 lost a tag only, and the J-K6 row is unchanged. |
| DETERMINISM-C-2 (J-DET-20) | §5.1 | RESOLVED. §5.1 (6) and the row are unchanged. |
| CF-PIPE-10 (J-I18) | §5.2, §7.3 | RESOLVED. The F-ROUTE row, §7.3 (b) and the row are unchanged. |
| KERNEL-C05 (kernel's; this part's §17.4 cell) | §5.2 F-SKELETON | §3.8's one list is unchanged; §17.4's use cell → O-R2-2. |
| SCOPE-C02, -C04 to -C11, MODEL-C03, CF-PIPE-02, CF-PIPE-07, CANON-C08 to -C10, RENDERING-C01 | not replaced | r1 verdicts hold (§9). |

RULING-1 (the owner's GPL-3 intent against §17.3 / D-22's proprietary default) remains owner-gated and unchanged.

## 6. Pointers between this part and the subsections round 2 replaced

Outbound: 255 occurrences of a pointer from this part into the 12 other replaced subsections. Each was read against its
hunk, and the list with contexts is in the scratch file.

| target | this part's pointers | what round 2 changed there | verdict |
|---|---:|---|---|
| §2.6 | 31 | rule 4's *Cost* pointer (l. 963) | OK. None relies on it. §16 M0's "≤ 3 µs", J-K20 and the Staged stage-3 row agree with the §12.4 row now cited. |
| §3.3 | 29 | the tag "(K4)" (l. 1695) | OK |
| §4.2 | 49 | S1 (2)'s contour clip → §8.2 (l. 2677–2679) | OK. Every contour statement agrees (§3). |
| §4.4 | 25 | S5d's test → §13.2 (l. 3124) | OK. None relied on the test sentence. The new inbound pointer → V-SCOPE-R2-02. |
| §4.8 | 18 | "§5.2" dropped from the castle acceptance (l. 3590) | OK |
| §5.1 | 10 (one is `IMPROVEMENTS.md`'s §5.1) | the tier-4 diagram line (l. 3988) | OK. The pointers are to §5.1 (5), (6) and principle 7. |
| §5.2 | 2 (§13.1's ladder coverage; J-I18) | the F-SKELETON row (l. 4018) | OK |
| §7.3 | 27 | item 7 (ii) adds wing rings (l. 5052–5053) | OK. O9 (b) and §13.2's oracle clause land. |
| §8.10 | 30 | the random source → §6.1's entry (l. 6261–6262) | OK. J-R42 is still cited at §8.10. |
| §12.6 | 9 | the replay paragraph → §7.3 item 2 (l. 7329–7331) | OK. V + 10 %, the plot-edit cost, the campaign costs and J-R36 all land. |
| §12.7 | 10 | the `lit` export from M2b (l. 7411–7414); the stage-3 hook's pointer (l. 7419–7422) | M1's pointers land. M2b's exit omits the run → V-SCOPE-R2-01. |
| §12.8 | 15 | the crown set's size wording (l. 7482) | OK |

Inbound: 56 pointers from those 12 subsections into this part's homes. They go to §2.6 → §13.2 (5); §3.3 → §13.1, §13.2
and §14 (11); §4.2 → §1.1, §13.2 and §13.3 (5); §4.4 → §13.2, §13.5 and §16 (6); §5.1 → §1.1, §13.2, §13.5, §14, §15.2
and D-9 (6); §5.2 → §13.1, §13.2, §13.3, §13.4, §13.5, §13.8 and §15.2 (10); §7.3 → §13.2 (1); §8.10 → §13.3, §14 and
§17.1 (5) (6); §12.6 → §13.2 (2); §12.7 → §13.2 and D-18 (2); and §12.8 → §16 (2). All land. Three of them sit in lines
round 2 changed:
* §4.4 S5d's new "§13.2's B-CITY `wealthLevel` sweep" lands on l. 7687–7688 (→ V-SCOPE-R2-02).
* F-SKELETON's test cell "§13.1's ladder-coverage fixtures", unchanged in a re-worded row, lands on l. 7641–7643.
* §8.10's "`rng.stream` (§6.1, §14)", unchanged in a re-worded line, lands on §14's `Rng.stream` (R12).

## 7. Mechanical checks (executed)

1. **Rebuild and identity.** r0 = `ee314f23…d175`, r1 = `ddd48f07…5ebb1` (assemble-r2's "before"), and a fresh
   `assemble-r2.py` on r1 = `d9d509fa…7a5d` = `docs/ARCHITECTURE.md` (`cmp` identical).
2. **Diff.** `diff -U0` r1 → current: 16 hunks, 64 lines out and 62 in. Three are in this part: §0.2 l. 107, §1.2
   l. 196–203 and §13.2 l. 7735–7757.
3. **Blocks verbatim.** Each of repair-r2-scope's three blocks equals the current subsection line for line: §0.2 14
   lines, §1.2 12 and §13.2 145.
4. **Word diff of the three blocks.** §0.2: "(bands and matched reference sizes)" → "(matched reference sizes and the band
   ends in buildings)". §1.2: "§12.2's building range;" → "the target's building range, §1.1;". §13.2: "on an edited CITY
   document," and "mismatch … by a snapshot whose one moved footprint has its recorded digest recomputed to match," were
   inserted, and "recomputation" became "recomputation, the mismatch withdraws the keep,". Every other difference is
   re-flow, so every id homed in these blocks and outside those words keeps its r1 text word for word.
5. **J-ids.** 525 J-id mentions before and after, with no per-section change (script). The 30 index rows whose named
   replaced section cites no J-id did the same at r1.
6. **References.** The resolver (`assemble-r0-refs.py`) finds 134 headings, 35 D ids and 276 J ids, and 0 internal
   broken references. The same 2 external ones remain (`os-geometry.md` §2.1.4, l. 2036; RFC 7946 §3.1.6, now l. 6826).
7. **`doc_checks`** over `The whole design,0,1,13,14,15,16,17,Delegated decisions,Judgment calls,Staged,Appendix A`
   exits 0: C1 5 / 0 unreviewed, C2 0 / 0, C3 112 / 0, C4 2 / 0, S1 0 / 0, S2 0 / 0. These are identical to the same run
   on the r1 document.
8. **Scans of the three blocks.** There is no deferral wording; the hits read are "later attribute edits",
   "open-to-editable" and "open entry". There is no fix-round tag: NF-P5 and NF-P6 are invariant names (§5.3 l. 4047,
   §7.3 l. 4840). There is no round narration. The document has exactly one "PENDING FABLE REVIEW" line (l. 3).
9. **Wordings.** The fixed wordings (§1.2, §0.2 row 4 and the three §13.2 details) each occur once. The stale ones have 0
   hits: "§12.2's building range", "bands and matched reference sizes", "with a forced mismatch" and "wait for the
   recomputation and the snapshot". "inside its rung band" has 0 hits (V-SCOPE-R2-02), and §16 names no `lit` export
   (V-SCOPE-R2-01).
10. **Rationale file.** `docs/ARCHITECTURE-RATIONALE.md` was last written at 16:23, before every repair-r2 file. No
    repair-r2 file names it, so its J rows are r1's.
11. **Size.** The part is 278 950 bytes, 66.3 % of 420 603 (the same section split as r1's 278 770).

## 8. Observations (not raised)

* **O-R2-1 §12.6's replay sentence has no verb** ("… the view stages once at the end (§7.3 item 2) — …", l. 7329–7331).
  This is V-MODEL-R2-01 = VR-R2-2 (rendering), confirmed. This part's pointers into that bullet (V + 10 %, J-R36) do not
  depend on the clause, so no scope issue is raised.
* **O-R2-2 §17.4's use cell for the straight skeleton** reads "roofs, label spines (§3.8)" (l. 8881, SCOPE-507). §3.8
  names three uses: `roof`; `spine`, which covers label spines and S1's coast clamp; and `regions` (S10) (l. 2366–2373).
  The cell is the archive's (l. 10750). It is a descriptive "use" column of a licence table, like "site sampling, medial
  axes" for `delaunator`, and it points to §3.8's one list. Unlike §3.1's former "nothing else reads skeleton output"
  (KERNEL-C05), it claims no exclusivity, and round 2 did not change §3.8. Ruled not an issue.
* **O-R2-3 F-CONTOUR's bracket** (VDR2-1 = VR-R2-3, determinism's) and **the stamp-tile key's derivation** (VR-R2-1,
  determinism's) are not cited or restated in this part. §14's "from a constant stream key" and J-R42's gist agree with
  either fix.
* **O-R2-4 §13.2's cost-model sentence** labels §12.7's bullet "the pan-and-zoom run during an A2 300-dpi export
  (§12.7)". The pointer lands on the bullet, which now also holds the M2b `lit` run. The milestone placement belongs to
  §16 (V-SCOPE-R2-01), so this sentence needs no change.
* **O-R2-5 Repairs do not update the mapping table** (r1's O-R1-2 continues). SCOPE-045, -077 and -205 now read as the
  replaced blocks say. §9 records the current places.
* **O-R2-6 Unchanged from r1.** The audit tags in subsection headings await the document-wide convention. RULING-1 is
  owner-gated. This part is at 66.3 %, the top of the 55–65 % target, and the whole document is at 76.7 %
  (assemble-r2).

## 9. Checked list — every inventory id (839 records; none sampled)

The scope column gives why an id was re-checked in round 2:
* "home §x": it is homed in a replaced scope subsection.
* "J-row §x": it is a judgment-index row that names a replaced subsection.
* "points into §x": its target, restatement, canon place, archive pointer or subject lies in a replaced subsection.

"kept" means round 2 touched neither the id's place nor its targets, and the verdict quotes r1 verbatim
(`verify-scope-r1.md` §9). An r1 verdict that itself reads "r0: …" quotes r0. Line numbers inside quoted r1 verdicts are
r1's; the current line is at most 3 lower.

| id | kind | round-2 scope | verdict |
|---|---|---|---|
| SCOPE-001 | defined-term | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-002 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-003 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-004 | history | kept | as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-005 | history | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-006 | marker | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-007 | rule | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-008 | rule | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-009 | restatement | re-checked (points into §4.2) | OK — "coasts never contradict contours": §4.2 still states the invariant ("so a contour never crosses the shore", l. 2678); the clip is §8.2's relief tier (l. 5720–5722) with F-CONTOUR (l. 4009), 0 contours crossing water |
| SCOPE-010 | restatement | re-checked (points into §4.2) | OK — the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-011 | restatement | re-checked (points into §4.2) | OK — the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-012 | restatement | re-checked (points into §4.8) | OK — §4.8's hunk ("§5.2" dropped from the castle acceptance, l. 3590) does not touch the wall strips (l. 3535 ff.) |
| SCOPE-013 | restatement | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-014 | restatement | kept | as r1 — OK — §4.5's r1 change (district containment by `parent`) does not touch it |
| SCOPE-015 | restatement | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-016 | restatement | re-checked (points into §2.6) | OK — the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-017 | restatement | kept | as r1 — OK — §4.9's r1 change (trees-at-render layouts) does not touch it |
| SCOPE-018 | restatement | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-019 | restatement | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-020 | restatement | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-021 | restatement | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-022 | restatement | kept | as r1 — r0: OK — summary keeps "merged into named quarters at city zoom"; the MFCG count is §9.4's |
| SCOPE-023 | restatement | kept | as r1 — OK — §7.1's r1 change (drawn-bridge pointer; completeness-test pointer) does not touch it |
| SCOPE-024 | restatement | re-checked (points into §7.3) | OK — the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-025 | restatement | re-checked (points into §2.6) | OK — the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-026 | restatement | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-027 | restatement | kept | as r1 — OK — §2.9's r1 change (step 4's bridge policy moved to §11.3) does not touch it |
| SCOPE-028 | restatement | kept | as r1 — OK — §2.9's r1 change (step 4's bridge policy moved to §11.3) does not touch it |
| SCOPE-029 | restatement | kept | as r1 — r0: OK — no longer paraphrased in the summary; stated at §6.4 (and §16 M2a for VD5-7) |
| SCOPE-030 | restatement | kept | as r1 — OK — §7.4's r1 change (drawn-bridge row pointer) does not touch it |
| SCOPE-031 | restatement | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-032 | restatement | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-033 | restatement | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-034 | restatement | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-035 | restatement | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-036 | restatement | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-037 | restatement | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-038 | history | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-039 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-040 | history | re-checked (home §0.2; points into §5.1) | OK — not a §0.2 row: its places are Appendix A's reading-record paragraph and the verbatim text in the rationale file's Part B, neither touched by r2 (its "§5.1–5.5" are IMPROVEMENTS.md's sections, not this document's) |
| SCOPE-041 | history | kept | as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-042 | mapping | re-checked (home §0.2) | OK — its row is unchanged (the §0.2 hunk is row 4 only) |
| SCOPE-043 | mapping | re-checked (home §0.2; points into §4.2) | OK — its row is unchanged (the §0.2 hunk is row 4 only); the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-044 | mapping | re-checked (home §0.2; points into §2.6) | OK — its row is unchanged (the §0.2 hunk is row 4 only); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-045 | mapping | re-checked (home §0.2) | OK — O-R1-3 applied: row 4 now reads "§12.2 (matched reference sizes and the band ends in buildings)" (l. 107); §12.2 states both (the MFCG columns, and a band's ends at 3.4 persons per building, l. 7102–7118); the bands themselves are §1.1's rung table (l. 169–173), which the row names first |
| SCOPE-046 | mapping | re-checked (home §0.2) | OK — its row is unchanged (the §0.2 hunk is row 4 only) |
| SCOPE-047 | mapping | re-checked (home §0.2) | OK — its row is unchanged (the §0.2 hunk is row 4 only) |
| SCOPE-048 | mapping | re-checked (home §0.2) | OK — its row is unchanged (the §0.2 hunk is row 4 only) |
| SCOPE-049 | defined-term | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-050 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-051 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-052 | history | kept | as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-053 | rule | re-checked (home §0.2) | OK — its row is unchanged (the §0.2 hunk is row 4 only) |
| SCOPE-054 | history | kept | as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-055 | history | re-checked (points into §3.3, §4.2, §4.8) | OK — history, verbatim in the rationale file, which round 2 did not touch; the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695), §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) and §4.8 ("§5.2" dropped from the castle acceptance, l. 3590) do not touch it |
| SCOPE-056 | history | re-checked (points into §3.3, §7.3) | OK — history, verbatim in the rationale file, which round 2 did not touch; the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-057 | history | re-checked (points into §2.6, §4.2, §7.3, §8.10) | OK — history, verbatim in the rationale file, which round 2 did not touch; the r2 changes in §2.6 (rule 4's cost pointer, l. 963), §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679), §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) and §8.10 (the random source → §6.1's entry, l. 6261–6262) do not touch it |
| SCOPE-058 | history | re-checked (points into §2.6, §3.3, §7.3, §8.10) | OK — history, verbatim in the rationale file, which round 2 did not touch; the r2 changes in §2.6 (rule 4's cost pointer, l. 963), §3.3 (the tag "(K4)" dropped, l. 1695), §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) and §8.10 (the random source → §6.1's entry, l. 6261–6262) do not touch it |
| SCOPE-059 | restatement | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-060 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-061 | rule | re-checked (points into §2.6) | OK — the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-062 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-063 | rule | re-checked (points into §4.2, §5.1) | OK — the r2 changes in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) and §5.1 (the tier-4 diagram line, l. 3988) do not touch it |
| SCOPE-064 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-065 | interface | re-checked (points into §4.2, §4.8, §12.8) | OK — the r2 changes in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679), §4.8 ("§5.2" dropped from the castle acceptance, l. 3590) and §12.8 (the crown set's size wording, l. 7482) do not touch it |
| SCOPE-066 | number | kept | as r1 — OK — §1.1's rung table is now the only statement of band, target, buildings at the target and frame; each value equals the rows §12.2 dropped (l. 7104) |
| SCOPE-067 | number | kept | as r1 — OK — as SCOPE-066 |
| SCOPE-068 | number | kept | as r1 — OK — as SCOPE-066; the cap row stays in §12.2's new table |
| SCOPE-069 | budget | re-checked (points into §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses |
| SCOPE-070 | budget | kept | as r1 — r0: OK — pointer present; target §12.3 states it |
| SCOPE-071 | budget | re-checked (points into §1.2) | OK — its §1.2 place: only §1.2's timing pointer changed, values equal |
| SCOPE-072 | rule | re-checked (points into §4.2) | OK — the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-073 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-074 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-075 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-076 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-077 | rule | re-checked (home §1.2) | OK — **V-SCOPE-R1-02 FIXED**: "(124–145 ms across the target's building range, §1.1; §12.1)" (l. 196) lands on §1.1's TOWN row, 1 200–1 500 buildings at the target (l. 171), and is §12.5's TOWN law at that range ("71 ms / 124–145 ms / 246 ms", l. 7270); CITY / METROPOLIS figures unchanged |
| SCOPE-078 | rule | re-checked (home §1.2) | OK — "(§8.5)" unchanged (the paragraph is re-flowed only); §8.5 not replaced |
| SCOPE-079 | rule | re-checked (home §1.2) | OK — word-identical to r1 (re-flow only); r1 verdict holds |
| SCOPE-080 | rule | re-checked (home §1.2) | OK — word-identical to r1 (re-flow only); r1 verdict holds |
| SCOPE-081 | mechanism | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-082 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-083 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-084 | decision | re-checked (points into §4.2) | OK (kept from r1, re-read) — "coast and contours agree by construction … contours crossing water 0 (O1 b, C)" (l. 231) agrees with §4.2 (l. 2677–2679) → §8.2's clip, which always succeeds (F-CONTOUR, l. 4009) |
| SCOPE-085 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-086 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-087 | decision | re-checked (points into §4.4) | OK — the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-088 | decision | re-checked (points into §5.2) | OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-089 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-090 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-091 | decision | re-checked (points into §2.6) | OK — the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-092 | decision | re-checked (points into §4.8) | OK (kept from r1, re-read) — the castle's compactness gate, repaired in place then re-sited (l. 239), agrees with §4.8, whose r2 change only drops a pointer |
| SCOPE-093 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-094 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-095 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-096 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-097 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-098 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-099 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-100 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-101 | decision | re-checked (points into §5.2) | OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-102 | test | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-103 | mechanism | re-checked (points into §4.4, §8.10) | OK — the r2 changes in §4.4 (S5d's test → §13.2, l. 3124) and §8.10 (the random source → §6.1's entry, l. 6261–6262) do not touch it |
| SCOPE-104 | rule | kept | as r1 — OK — §4.11's r1 change (`build` footprint typed `PolygonCm`) does not touch it |
| SCOPE-105 | rule | kept | as r1 — OK — §4.11's r1 change (`build` footprint typed `PolygonCm`) does not touch it |
| SCOPE-106 | rule | re-checked (points into §5.2) | OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-107 | rule | kept | as r1 — r0: OK — paraphrase or pointer present; target states it |
| SCOPE-108 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-109 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-110 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-111 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-112 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-113 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-114 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-115 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-116 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-117 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-118 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-119 | acceptance-bar | re-checked (points into §5.2) | OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-120 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-121 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-122 | test | re-checked (points into §5.2) | OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-123 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-124 | test | re-checked (points into §3.3, §5.2) | OK — the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695) and §5.2 (the F-SKELETON row, l. 4018) do not touch it |
| SCOPE-125 | test | re-checked (points into §3.3, §7.3) | OK — the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-126 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-127 | test | re-checked (points into §3.3) | OK — the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-128 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-129 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-130 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-131 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-132 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-133 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-134 | test | re-checked (points into §3.3) | OK — the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-135 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-136 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-137 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-138 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-139 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-140 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-141 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-142 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-143 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-144 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-145 | test | kept | as r1 — OK — **V-SCOPE-04 FIXED**: "… and every other role unchanged" (l. 7593) |
| SCOPE-146 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-147 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-148 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-149 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-150 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-151 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-152 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-153 | invariant | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-154 | invariant | re-checked (points into §5.2, §8.10) | OK — the r2 changes in §5.2 (the F-SKELETON row, l. 4018) and §8.10 (the random source → §6.1's entry, l. 6261–6262) do not touch it |
| SCOPE-155 | test | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-156 | invariant | re-checked (points into §3.3) | OK — the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-157 | invariant | re-checked (points into §3.3) | OK — the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-158 | test | kept | as r1 — OK — **V-SCOPE-01 FIXED**: "with a hill-acropolis site" (l. 7640) |
| SCOPE-159 | test | re-checked (points into §5.2) | OK — §5.2 F-SKELETON still points here (l. 4018); its per-reader downgrades (sampled medial axis for `spine` readers, plain roof; `regions` → F-PLOT's rungs) are covered by "every rung of every ladder in §5.2 … each downgrade (medial axis, the plain-roof downgrade, …) is exercised" (l. 7641–7643) |
| SCOPE-160 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-161 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-162 | rule | re-checked (home §13.2; points into §5.1) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-163 | rule | re-checked (home §13.2; points into §8.10) | OK — unchanged; "§8.10's stamped scatter" lands (§8.10's hunk is the random-source clause only) |
| SCOPE-164 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-165 | acceptance-bar | re-checked (home §13.2; points into §5.1) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-166 | acceptance-bar | re-checked (home §13.2; points into §5.1) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-167 | acceptance-bar | re-checked (home §13.2; points into §12.6) | OK — lands on §12.6's *Scope invariance* bullet (l. 7327–7328), outside §12.6's hunk |
| SCOPE-168 | test | re-checked (home §13.2; points into §3.3) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-169 | test | re-checked (home §13.2; points into §3.3, §12.8) | OK — "the memory test per rung (§12.8)" lands on §12.8's *Measurement and fallback* (l. 7489–7497), outside §12.8's hunk |
| SCOPE-170 | acceptance-bar | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-171 | acceptance-bar | re-checked (home §13.2; points into §12.7) | OK — lands on §12.7's simulation-module bullet (l. 7423–7424), outside §12.7's hunks |
| SCOPE-172 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-173 | test | re-checked (home §13.2; points into §12.7) | OK — the pointer lands on §12.7's *Export beside the view* (l. 7410–7414), whose M1 part (pan and zoom, idle-view and edit identity) is unchanged; the `lit` part now runs from M2b (VR-R1-1) — its gate is V-SCOPE-R2-01, not this pointer |
| SCOPE-174 | acceptance-bar | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-175 | rule | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-176 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-177 | test | re-checked (home §13.2; points into §12.6) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-178 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-179 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-180 | test | re-checked (home §13.2; points into §8.10) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-181 | acceptance-bar | re-checked (home §13.2; points into §8.10) | OK — unchanged since r1: "the shipped stamp tiles pass §8.3's seam check (§8.10)" (l. 7682); §8.3 not replaced, §8.10's hunk is the random-source clause only |
| SCOPE-182 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-183 | test | re-checked (home §13.2; points into §4.2, §5.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 changes in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) and §5.2 (the F-SKELETON row, l. 4018) do not touch it |
| SCOPE-184 | test | re-checked (home §13.2; points into §2.6, §4.4, §5.2) | **V-SCOPE-R2-02** (= `verify-pipeline-r2.md` P2-1) — its own words are unchanged since r1, but since P1-2 made §4.4 S5d (l. 3124) and §5.2 F-BUDGET-STAGE (l. 4012) point here, it is the only statement of PIPELINE-187's sweep, and "the walled share inside its rung band" is carried only as "walled share in band" (l. 7688; R13); {0, 0.5, 1}, ± 5 % and ≥ 95 % are present |
| SCOPE-185 | acceptance-bar | re-checked (home §13.2; points into §3.3) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-186 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-187 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-188 | test | re-checked (home §13.2; points into §2.6) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-189 | acceptance-bar | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-190 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-191 | test | re-checked (home §13.2; points into §4.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-192 | test | re-checked (home §13.2; points into §4.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-193 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-194 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-195 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-196 | rule | re-checked (home §13.2; points into §7.3) | OK — unchanged; "§7.3 item 7 (i)–(iii) and (v)" still names the oracle clauses; item 7 (ii)'s r2 change (wing rings) is inside the clause it runs |
| SCOPE-197 | test | re-checked (home §13.2; points into §2.6, §7.3) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 changes in §2.6 (rule 4's cost pointer, l. 963) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-198 | test | re-checked (home §13.2; points into §3.3) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-199 | test | re-checked (home §13.2; points into §5.1, §7.3, §12.6) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 changes in §5.1 (the tier-4 diagram line, l. 3988), §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) and §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) do not touch it |
| SCOPE-200 | test | re-checked (home §13.2; points into §2.6, §7.3) | OK — §7.3 item 7 (vi) is outside §7.3's hunk (item 7 (ii) only) |
| SCOPE-201 | test | re-checked (home §13.2; points into §5.2, §7.3) | OK — §7.3 item 7 (v) is outside §7.3's hunk (item 7 (ii) only) |
| SCOPE-202 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-203 | test | re-checked (home §13.2; points into §2.6) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-204 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-205 | test | re-checked (home §13.2; points into §12.6) | OK — **V-SCOPE-R1-01 FIXED**: (a) "on an edited CITY document", (b) "with a mismatch forced by a snapshot whose one moved footprint has its recorded digest recomputed to match", (c) "wait for the recomputation, the mismatch withdraws the keep, and the snapshot is never kept" (l. 7734–7742) — the archive's details (l. 1994–1995, 2026–2028); MODEL-403 / -408 now fully carried, their (M3a) convergence clause being §11.3's (l. 6991) with §2.9 step 4's pointer (l. 1462–1463); the rule stays stated once, §6.2 (iii) (l. 4314–4315) |
| SCOPE-206 | test | re-checked (home §13.2; points into §12.6) | OK — same bullet, words unchanged (re-flow only): records mismatch, edits re-applied, verified, a later corpus selection renames what an unsaved session renames (l. 7742–7746) |
| SCOPE-207 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-208 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-209 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-210 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-211 | test | re-checked (home §13.2; points into §12.6) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-212 | test | re-checked (home §13.2; points into §7.3) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-213 | algorithm-step | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-214 | budget | re-checked (home §13.2; points into §12.6) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-215 | evidence | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-216 | rule | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-217 | rule | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-218 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-219 | test | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-220 | acceptance-bar | re-checked (home §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff) |
| SCOPE-221 | test | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-222 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-223 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-224 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-225 | type | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-226 | interface | re-checked (points into §8.10) | OK — the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-227 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-228 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-229 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-230 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-231 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-232 | test | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-233 | rule | kept | as r1 — OK — §6.5's r1 change is in (9); (3)'s lint scope is unchanged |
| SCOPE-234 | test | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-235 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-236 | rule | re-checked (points into §8.10) | OK — the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-237 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-238 | rule | kept | as r1 — r0: OK — pointer present; target §6.4 states it |
| SCOPE-239 | rule | re-checked (points into §12.6) | OK — the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-240 | test | re-checked (points into §8.10, §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses; the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-241 | test | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-242 | test | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-243 | test | re-checked (points into §5.2, §12.6) | OK — the r2 changes in §5.2 (the F-SKELETON row, l. 4018) and §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) do not touch it |
| SCOPE-244 | test | kept | as r1 — OK — §8.3's r1 change (a tag) does not touch it |
| SCOPE-245 | acceptance-bar | kept | as r1 — OK — §8.2's r1 change (the relief tier's contour clip; a tag) does not touch it |
| SCOPE-246 | test | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-247 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-248 | test | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-249 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-250 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-251 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-252 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-253 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-254 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-255 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-256 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-257 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-258 | rule | re-checked (points into §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses |
| SCOPE-259 | acceptance-bar | re-checked (points into §4.4) | OK — the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-260 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-261 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-262 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-263 | acceptance-bar | re-checked (points into §4.4) | OK — the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-264 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-265 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-266 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-267 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-268 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-269 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-270 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-271 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-272 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-273 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-274 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-275 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-276 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-277 | acceptance-bar | re-checked (points into §4.4) | OK — the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-278 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-279 | acceptance-bar | re-checked (points into §4.2, §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses; the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-280 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-281 | acceptance-bar | re-checked (points into §8.10) | OK — the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-282 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-283 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-284 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-285 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-286 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-287 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-288 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-289 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-290 | defined-term | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-291 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-292 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-293 | defined-term | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-294 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-295 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-296 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-297 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-298 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-299 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-300 | algorithm-step | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-301 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-302 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-303 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-304 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-305 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-306 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-307 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-308 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-309 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-310 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-311 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-312 | type | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-313 | type | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-314 | type | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-315 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-316 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-317 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-318 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-319 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-320 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-321 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-322 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-323 | acceptance-bar | re-checked (points into §8.10) | OK — the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-324 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-325 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-326 | acceptance-bar | kept | as r1 — OK — VR-R0-13 resolved: "takes its next alternate (§9.2: its next spine, then §9.4's ladder)" (l. 8151), matching §9.2 l. 6428 and §9.3's candidate order; vetoable (O-R1-4) |
| SCOPE-327 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-328 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-329 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-330 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-331 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-332 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-333 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-334 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-335 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-336 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-337 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-338 | budget | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-339 | budget | re-checked (points into §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses |
| SCOPE-340 | budget | re-checked (points into §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses |
| SCOPE-341 | rule | re-checked (points into §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses |
| SCOPE-342 | budget | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-343 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-344 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-345 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-346 | algorithm-step | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-347 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-348 | interface | re-checked (points into §5.2, §8.10) | OK (kept from r1, re-read) — "poisson (the stamped ranked tiles' construction from a constant stream key, … §8.10)" (l. 8225) agrees with §8.10 → §6.1's registry entry |
| SCOPE-349 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-350 | interface | re-checked (points into §5.1) | OK — the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-351 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-352 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-353 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-354 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-355 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-356 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-357 | interface | re-checked (points into §8.10) | OK — the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-358 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-359 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-360 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-361 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-362 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-363 | interface | re-checked (points into §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses |
| SCOPE-364 | restatement | re-checked (points into §2.6, §4.2, §4.8) | OK — the r2 changes in §2.6 (rule 4's cost pointer, l. 963), §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) and §4.8 ("§5.2" dropped from the castle acceptance, l. 3590) do not touch it |
| SCOPE-365 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-366 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-367 | rule | kept | as r1 — OK — §6.5's r1 change is in (9); (3)'s lint scope and vendored scan are unchanged |
| SCOPE-368 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-369 | interface | re-checked (points into §3.3, §5.1) | OK — the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695) and §5.1 (the tier-4 diagram line, l. 3988) do not touch it |
| SCOPE-370 | type | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-371 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-372 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-373 | defined-term | kept | as r1 — OK — §6.1's r1 change (stamp-tile key components) does not touch it |
| SCOPE-374 | type | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-375 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-376 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-377 | interface | re-checked (points into §3.3) | OK — the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-378 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-379 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-380 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-381 | interface | kept | as r1 — r0: OK — pointer present; target §9.2 states it |
| SCOPE-382 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-383 | interface | kept | as r1 — OK — `TileAddress`, `TileRasterOpts`, `TileBackend`, `RasterJob` declared in §8.9 |
| SCOPE-384 | interface | kept | as r1 — OK — r0's "present" corrected: `VectorBackend` was declared nowhere at r0 (VR-R0-1); now §8.9 l. 6172, identical to the archive's §14 line; §14's pointer (l. 8325) resolves |
| SCOPE-385 | interface | re-checked (points into §12.6) | OK — the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-386 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-387 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-388 | interface | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-389 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-390 | rule | re-checked (points into §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses |
| SCOPE-391 | rule | re-checked (points into §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses |
| SCOPE-392 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-393 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-394 | defined-term | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-395 | mapping | re-checked (points into §4.2) | OK — the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-396 | mapping | re-checked (points into §4.2, §4.4, §4.8) | OK (kept from r1, re-read) — B6's "0.75 compactness gate kept as a shape check, repaired in place in MFCG's order, then re-sited" (l. 8415) agrees with §4.8 (r2 dropped only a pointer) |
| SCOPE-397 | mapping | re-checked (points into §2.6, §4.2, §4.4, §4.8, §8.10) | OK — the r2 changes in §2.6 (rule 4's cost pointer, l. 963), §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679), §4.4 (S5d's test → §13.2, l. 3124), §4.8 ("§5.2" dropped from the castle acceptance, l. 3590) and §8.10 (the random source → §6.1's entry, l. 6261–6262) do not touch it |
| SCOPE-398 | mapping | re-checked (points into §1.2, §2.6, §5.2) | OK — its §1.2 place: only §1.2's timing pointer changed, values equal; the r2 changes in §2.6 (rule 4's cost pointer, l. 963) and §5.2 (the F-SKELETON row, l. 4018) do not touch it |
| SCOPE-399 | mapping | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-400 | mapping | re-checked (points into §4.2, §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses; the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-401 | mapping | re-checked (points into §4.2) | OK — the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-402 | mapping | re-checked (points into §2.6, §4.2, §4.4, §4.8) | OK — the r2 changes in §2.6 (rule 4's cost pointer, l. 963), §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679), §4.4 (S5d's test → §13.2, l. 3124) and §4.8 ("§5.2" dropped from the castle acceptance, l. 3590) do not touch it |
| SCOPE-403 | mapping | re-checked (points into §4.2, §4.8) | OK — the r2 changes in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) and §4.8 ("§5.2" dropped from the castle acceptance, l. 3590) do not touch it |
| SCOPE-404 | mapping | re-checked (points into §2.6, §12.8) | OK — the r2 changes in §2.6 (rule 4's cost pointer, l. 963) and §12.8 (the crown set's size wording, l. 7482) do not touch it |
| SCOPE-405 | restatement | re-checked (points into §1.2) | OK — its §1.2 place: only §1.2's timing pointer changed, values equal |
| SCOPE-406 | mapping | re-checked (points into §4.2) | OK — the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-407 | mapping | re-checked (points into §2.6, §8.10) | OK — the r2 changes in §2.6 (rule 4's cost pointer, l. 963) and §8.10 (the random source → §6.1's entry, l. 6261–6262) do not touch it |
| SCOPE-408 | mapping | re-checked (points into §4.2, §4.8) | OK — VG's contour rows map to §8.2's relief tier (l. 8556), now also the home §4.2 points to for the clip |
| SCOPE-409 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-410 | defined-term | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-411 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-412 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-413 | acceptance-bar | re-checked (points into §7.3) | OK — the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-414 | acceptance-bar | re-checked (points into §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses |
| SCOPE-415 | acceptance-bar | kept | as r1 — OK — O3 (a) "B-FUZZ … 0 crash / hang / invalid output" matches §13.1's bar, which §5.2 F-NUM cites with O3 a |
| SCOPE-416 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-417 | acceptance-bar | re-checked (points into §4.2) | OK (kept from r1, re-read) — O1 (b) "contours cross water 0 times [C]" (l. 8590): the clip of §8.2 is constructive (F-CONTOUR "always succeeds", l. 4009); §4.2 now points to it |
| SCOPE-418 | acceptance-bar | re-checked (points into §4.4) | OK — the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-419 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-420 | acceptance-bar | re-checked (points into §12.6) | OK — the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-421 | acceptance-bar | re-checked (points into §2.6, §5.2) | OK — the r2 changes in §2.6 (rule 4's cost pointer, l. 963) and §5.2 (the F-SKELETON row, l. 4018) do not touch it |
| SCOPE-422 | acceptance-bar | re-checked (points into §4.2) | OK — the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-423 | acceptance-bar | re-checked (points into §12.7) | OK — the r2 change in §12.7 (the `lit` export from M2b, l. 7411–7414; the stage-3 hook's pointer, l. 7419–7422) does not touch it |
| SCOPE-424 | acceptance-bar | re-checked (points into §4.2, §4.4, §4.8) | OK — the r2 changes in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679), §4.4 (S5d's test → §13.2, l. 3124) and §4.8 ("§5.2" dropped from the castle acceptance, l. 3590) do not touch it |
| SCOPE-425 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-426 | acceptance-bar | re-checked (home §13.2; points into §7.3) | OK — O9 (b)'s "(§7.3 item 7 ii)" lands on item 7 (ii) "outside the scope, byte-identical" (l. 5048), whose r2 change adds wing rings to its composition-rule check (VDR1-1); (c) → §13.2's campaign, unchanged by r2 |
| SCOPE-427 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-428 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-429 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-430 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-431 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-432 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-433 | acceptance-bar | re-checked (points into §12.6) | OK — the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-434 | acceptance-bar | re-checked (points into §2.6, §4.2) | OK — the r2 changes in §2.6 (rule 4's cost pointer, l. 963) and §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) do not touch it |
| SCOPE-435 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-436 | acceptance-bar | re-checked (points into §4.4, §4.8) | OK — the r2 changes in §4.4 (S5d's test → §13.2, l. 3124) and §4.8 ("§5.2" dropped from the castle acceptance, l. 3590) do not touch it |
| SCOPE-437 | acceptance-bar | re-checked (points into §2.6) | OK — the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-438 | acceptance-bar | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-439 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-440 | budget | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-441 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-442 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-443 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-444 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-445 | rule | re-checked (points into §5.2, §8.10) | OK — the r2 changes in §5.2 (the F-SKELETON row, l. 4018) and §8.10 (the random source → §6.1's entry, l. 6261–6262) do not touch it |
| SCOPE-446 | acceptance-bar | re-checked (points into §3.3, §12.7) | OK — "S11's geometry share ≤ 3 µs per plot median" agrees with §12.4's S11 row (l. 7229), which §2.6 rule 4 (l. 963) and §12.7's stage-3 hook (l. 7419) now cite in place of §3.7 |
| SCOPE-447 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-448 | acceptance-bar | re-checked (points into §4.4) | OK — the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-449 | acceptance-bar | re-checked (points into §8.10) | OK — the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-450 | rule | re-checked (points into §5.1) | OK — "IMPROVEMENTS §5.1" names that file's gate list, not this document's §5.1; the M1 content cell is unchanged by r2 |
| SCOPE-451 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-452 | rule | re-checked (points into §5.2) | OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-453 | acceptance-bar | re-checked (points into §4.4) | OK — the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-454 | acceptance-bar | re-checked (points into §12.7, §12.8, §13.2) | OK — "the SVG and PNG export budgets (§12.7)", the SVG transient-list peak and memory "(§12.8)" land on §12.7's confirmation bullet and §12.8's export-time peak and lines (unchanged by r2) |
| SCOPE-455 | acceptance-bar | re-checked (points into §8.10, §12.7) | OK — "the pan-and-zoom run during an A2 export (§8.9, §12.7)" and "the stamp-tile asset load (§8.10, §12.7)" land on §12.7's M1 run (l. 7410–7411) and stamp-tile load (l. 7415–7417); the M1 run no longer holds the `lit` export (VR-R1-1 fixed) |
| SCOPE-456 | acceptance-bar | re-checked (points into §4.2, §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses; the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-457 | rule | re-checked (points into §7.3, §12.6) | OK — "replay with S13a per event (§7.3)" lands on §7.3 item 2's replay mode (l. 4866–4870), to which §12.6 now points |
| SCOPE-458 | acceptance-bar | re-checked (points into §12.6, §12.8, §13.2) | OK — "the verification reference mix within §12.6's V + 10 %" and "its §12.6 cost + 10 ms" land on §12.6's replay bullet (V, the reference mix, "pass: ≤ V + 10 %", l. 7329–7349) and plot-edit budget (l. 7321); the r2 change there is the pointer to §7.3 item 2's replay mode (its missing verb is V-MODEL-R2-01, rendering's) |
| SCOPE-459 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-460 | acceptance-bar | re-checked (points into §12.7, §12.8) | **V-SCOPE-R2-01** — the exit lists every M2b-scheduled §12 measurement (moving-sun step budget, light passes and crown bake, METROPOLIS SVG budget, export-time peak, memory) but not the `lit` export beside a moving `path` sun that §12.7 now runs from M2b (l. 7411–7414); the rest of the row unchanged and its pointers land (§8.4, §12.3, §12.5, §12.7, §12.8) |
| SCOPE-461 | rule | re-checked (points into §3.3, §7.3) | OK — the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-462 | acceptance-bar | re-checked (points into §3.3, §7.3, §12.6, §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses; the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695), §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) and §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) do not touch it |
| SCOPE-463 | acceptance-bar | re-checked (points into §2.6, §12.6, §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses; the r2 changes in §2.6 (rule 4's cost pointer, l. 963) and §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) do not touch it |
| SCOPE-464 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-465 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-466 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-467 | acceptance-bar | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-468 | rule | re-checked (points into §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses |
| SCOPE-469 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-470 | budget | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-471 | history | kept | as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-472 | budget | re-checked (points into §2.6, §7.3, §8.10) | OK — the r2 changes in §2.6 (rule 4's cost pointer, l. 963), §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) and §8.10 (the random source → §6.1's entry, l. 6261–6262) do not touch it |
| SCOPE-473 | rule | kept | as r1 — OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-474 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-475 | rule | re-checked (points into §5.2) | OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-476 | rule | re-checked (points into §2.6) | OK — the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-477 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-478 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-479 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-480 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-481 | test | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-482 | test | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-483 | test | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-484 | test | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-485 | test | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-486 | test | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-487 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-488 | evidence | kept | as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-489 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-490 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-491 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-492 | mechanism | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-493 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-494 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-495 | rule | re-checked (points into §4.8, §8.10) | as r1 — r0: OK — re-read: the castle's 0.75 compactness gate as a provenance example is unaffected by §4.8's pointer drop |
| SCOPE-496 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-497 | rule | re-checked (points into §5.2, §8.10) | OK — the r2 changes in §5.2 (the F-SKELETON row, l. 4018) and §8.10 (the random source → §6.1's entry, l. 6261–6262) do not touch it |
| SCOPE-498 | rule | re-checked (points into §5.2) | OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-499 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-500 | decision | re-checked (points into §1.2) | OK — its §1.2 place: only §1.2's timing pointer changed, values equal |
| SCOPE-501 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-502 | decision | kept | as r1 — r0: OK (proprietary default kept; RULING-1 is the owner's) |
| SCOPE-503 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-504 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-505 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-506 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-507 | decision | re-checked (points into §4.2, §5.2) | as r1 — r0: OK — re-read for §5.2's F-SKELETON change: the use cell "roofs, label spines (§3.8)" is the archive's (l. 10750) and points to §3.8's one list (O-R2-3, ruled not an issue) |
| SCOPE-508 | rule | re-checked (points into §5.2) | OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-509 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-510 | decision | re-checked (points into §1.2) | OK — its §1.2 place: only §1.2's timing pointer changed, values equal |
| SCOPE-511 | decision | re-checked (points into §4.2) | OK — the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-512 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-513 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-514 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-515 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-516 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-517 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-518 | decision | re-checked (points into §5.1) | OK — the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-519 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-520 | decision | re-checked (points into §8.10) | OK — the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-521 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-522 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-523 | decision | re-checked (points into §5.2) | OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-524 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-525 | decision | re-checked (points into §4.4, §5.2) | OK — the r2 changes in §4.4 (S5d's test → §13.2, l. 3124) and §5.2 (the F-SKELETON row, l. 4018) do not touch it |
| SCOPE-526 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-527 | decision | re-checked (points into §1.2, §13.2) | OK — its §13.2 place lies outside the changed B-EDIT clauses; its §1.2 place: only §1.2's timing pointer changed, values equal |
| SCOPE-528 | decision | re-checked (points into §1.2, §2.6, §4.2) | OK — its §1.2 place: only §1.2's timing pointer changed, values equal; the r2 changes in §2.6 (rule 4's cost pointer, l. 963) and §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) do not touch it |
| SCOPE-529 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-530 | decision | re-checked (points into §12.6) | OK — the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-531 | decision | kept | as r1 — r0: OK (RULING-1 is the owner's) |
| SCOPE-532 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-533 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-534 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-535 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-536 | decision | re-checked (points into §5.1) | OK — the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-537 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-538 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-539 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-540 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-541 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-542 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-543 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-544 | decision | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-545 | rule | re-checked (points into §5.2) | OK — the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-546 | mapping | re-checked (points into §7.3) | OK — the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-547 | mapping | re-checked (points into §2.6, §12.7) | OK (kept from r1, re-read) — "the base outline inside S11's geometry share; a stage-3 `outline()` admitted at ≤ 10 µs with a declared re-budget" agrees with §12.7's stage-3 hook (l. 7418–7422), whose r2 change is the pointer to §12.4's S11 row |
| SCOPE-548 | mapping | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-549 | mapping | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-550 | mapping | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-551 | mapping | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-552 | mapping | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-553 | history | re-checked (points into §0.2) | OK — history, verbatim in the rationale file, which round 2 did not touch; §0.2 changed row 4 only |
| SCOPE-554 | history | re-checked (points into §0.2) | OK — history, verbatim in the rationale file, which round 2 did not touch; §0.2 changed row 4 only |
| SCOPE-555 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-556 | history | kept | as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-557 | history | kept | as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-558 | rule | kept | as r1 — r0: OK — stated at the new location |
| SCOPE-559 | history | kept | as r1 — r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-560 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-561 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-562 | decision | re-checked (J-row §4.4) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-563 | decision | re-checked (J-row §7.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-564 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-565 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-566 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-567 | decision | re-checked (points into §12.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-568 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-569 | decision | re-checked (J-row §8.10) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-570 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-571 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-572 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-573 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-574 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-575 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-576 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-577 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-578 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-579 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-580 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-581 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-582 | decision | re-checked (points into §5.2) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-583 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-584 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-585 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-586 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-587 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-588 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-589 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-590 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-591 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-592 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-593 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-594 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-595 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-596 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-597 | decision | re-checked (points into §12.7) | OK — the index row's "≤ 3 µs per plot" agrees with §12.4's S11 row, which §2.6 and §12.7 now cite (V-MODEL-R1-02, VR-R1-6); row unchanged |
| SCOPE-598 | decision | re-checked (points into §5.2) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-599 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-600 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-601 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-602 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-603 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-604 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-605 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-606 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-607 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-608 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-609 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-610 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-611 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-612 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-613 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-614 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-615 | decision | re-checked (J-row §5.1) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-616 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-617 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-618 | decision | re-checked (points into §12.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-619 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-620 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-621 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-622 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-623 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-624 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-625 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-626 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-627 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-628 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-629 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-630 | decision | re-checked (points into §12.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-631 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-632 | decision | re-checked (J-row §5.1) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-633 | decision | re-checked (J-row §7.3; points into §12.6) | OK — J-DET-21 still cited at §7.3 item 2's replay mode (l. 4870), to which §12.6 now points; index row unchanged |
| SCOPE-634 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-635 | decision | re-checked (J-row §7.3; points into §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-636 | decision | re-checked (J-row §7.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-637 | decision | re-checked (J-row §5.1) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §5.1 (the tier-4 diagram line, l. 3988) does not touch it |
| SCOPE-638 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-639 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-640 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-641 | decision | re-checked (J-row §7.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-642 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-643 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-644 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-645 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-646 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-647 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-648 | decision | kept | as r1 — OK — **V-SCOPE-10 FIXED**: Part A row amended with KERNEL-357's split key (rationale l. 136), F.2 heading without the instruction (l. 1106), index row "…, keyed by their route edge's endpoints" (l. 9447) |
| SCOPE-649 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-650 | decision | re-checked (points into §12.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-651 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-652 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-653 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-654 | decision | re-checked (points into §12.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-655 | decision | re-checked (J-row §12.8; points into §12.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) and §12.8 (the crown set's size wording, l. 7482) do not touch it |
| SCOPE-656 | decision | re-checked (points into §12.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-657 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-658 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-659 | decision | re-checked (J-row §7.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-660 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-661 | decision | re-checked (points into §12.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-662 | decision | re-checked (points into §12.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) does not touch it |
| SCOPE-663 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-664 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-665 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-666 | decision | re-checked (J-row §4.2/§4.4) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) and §4.4 (S5d's test → §13.2, l. 3124) do not touch it |
| SCOPE-667 | decision | re-checked (J-row §4.4) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-668 | decision | re-checked (J-row §4.2) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-669 | decision | re-checked (J-row §4.2) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-670 | decision | re-checked (J-row §4.4) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-671 | decision | re-checked (J-row §4.4) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-672 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-673 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-674 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-675 | decision | re-checked (J-row §4.2) | OK — J-P12 still cited at §4.2's *Contours and coast (GEO-14; J-P12)* (l. 2675), which keeps the vector coast and now points to §8.2 for the clip; index row unchanged |
| SCOPE-676 | decision | re-checked (points into §5.2) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §5.2 (the F-SKELETON row, l. 4018) does not touch it |
| SCOPE-677 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-678 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-679 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-680 | decision | re-checked (J-row §2.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-681 | decision | re-checked (J-row §2.6; points into §12.7) | OK — index row unchanged; the cost contract's figures are now cited to §12.4's S11 row at §2.6 rule 4 (l. 963) and §12.7 (l. 7419–7422), values unchanged |
| SCOPE-682 | decision | re-checked (J-row §2.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-683 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-684 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-685 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-686 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-687 | decision | re-checked (J-row §4.2) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-688 | decision | re-checked (J-row §4.4) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.4 (S5d's test → §13.2, l. 3124) does not touch it |
| SCOPE-689 | decision | re-checked (J-row §4.2) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-690 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-691 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-692 | decision | re-checked (J-row §4.8) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.8 ("§5.2" dropped from the castle acceptance, l. 3590) does not touch it |
| SCOPE-693 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-694 | decision | re-checked (J-row §2.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-695 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-696 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-697 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-698 | decision | re-checked (J-row §4.2) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-699 | decision | re-checked (J-row §4.2/§4.8) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) and §4.8 ("§5.2" dropped from the castle acceptance, l. 3590) do not touch it |
| SCOPE-700 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-701 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-702 | decision | re-checked (J-row §2.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-703 | decision | re-checked (J-row §7.3; points into §4.4) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §4.4 (S5d's test → §13.2, l. 3124) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-704 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-705 | decision | re-checked (J-row §2.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-706 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-707 | decision | re-checked (J-row §4.2; points into §4.4) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) and §4.4 (S5d's test → §13.2, l. 3124) do not touch it |
| SCOPE-708 | decision | re-checked (J-row §4.2) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) does not touch it |
| SCOPE-709 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-710 | decision | re-checked (J-row §2.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-711 | decision | re-checked (J-row §2.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §2.6 (rule 4's cost pointer, l. 963) does not touch it |
| SCOPE-712 | decision | re-checked (J-row §2.6/§12.6) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §2.6 (rule 4's cost pointer, l. 963) and §12.6 (the replay paragraph → §7.3 item 2, l. 7329–7331) do not touch it |
| SCOPE-713 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-714 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-715 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-716 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-717 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-718 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-719 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-720 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-721 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-722 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-723 | decision | re-checked (J-row §8.10) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-724 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-725 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-726 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-727 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-728 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-729 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-730 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-731 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-732 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-733 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-734 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-735 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-736 | decision | re-checked (J-row §8.10) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-737 | decision | re-checked (J-row §8.10) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-738 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-739 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-740 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-741 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-742 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-743 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-744 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-745 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-746 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-747 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-748 | decision | re-checked (J-row §12.6) | OK — J-R36 still cited at §12.6's replay bullet (l. 7349); index row unchanged |
| SCOPE-749 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-750 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-751 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-752 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-753 | decision | re-checked (J-row §12.8) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.8 (the crown set's size wording, l. 7482) does not touch it |
| SCOPE-754 | decision | re-checked (J-row §8.10) | OK — J-R42 still cited at §8.10 (l. 6262), whose random source now points to §6.1's registry entry, which holds the constant key and its components (l. 4176–4181); index row unchanged |
| SCOPE-755 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-756 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-757 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-758 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-759 | decision | re-checked (J-row §12.8) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.8 (the crown set's size wording, l. 7482) does not touch it |
| SCOPE-760 | decision | re-checked (J-row §8.10) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-761 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-762 | decision | re-checked (J-row §8.10) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-763 | decision | re-checked (points into §12.7) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.7 (the `lit` export from M2b, l. 7411–7414; the stage-3 hook's pointer, l. 7419–7422) does not touch it |
| SCOPE-764 | decision | re-checked (J-row §8.10) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-765 | decision | re-checked (J-row §12.7) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §12.7 (the `lit` export from M2b, l. 7411–7414; the stage-3 hook's pointer, l. 7419–7422) does not touch it |
| SCOPE-766 | decision | re-checked (J-row §8.10; points into §12.7, §12.8) | OK — index row unchanged; §8.10 and §12.7's crown bake by light step unchanged; §12.8's hunk only re-words the crown set's size |
| SCOPE-767 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-768 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-769 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-770 | decision | re-checked (home §13.2; J-row §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); index row unchanged, no J-id mention changed in any section (script) |
| SCOPE-771 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-772 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-773 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-774 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-775 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-776 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-777 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-778 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-779 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-780 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-781 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-782 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-783 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-784 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-785 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-786 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-787 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-788 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-789 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-790 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-791 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-792 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-793 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-794 | decision | re-checked (home §13.2; J-row §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); index row unchanged, no J-id mention changed in any section (script) |
| SCOPE-795 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-796 | decision | re-checked (home §13.2; J-row §13.2) | OK — unchanged since r1 (the §13.2 hunk is the B-EDIT load-verification clauses only; word diff); index row unchanged, no J-id mention changed in any section (script) |
| SCOPE-797 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-798 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-799 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-800 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-801 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-802 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-803 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-804 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-805 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-806 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-807 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-808 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-809 | decision | kept | as r1 — OK — **V-SCOPE-12 FIXED**: index row "the unpriced-mechanisms line of §16's effort table …" (l. 9614) |
| SCOPE-810 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-811 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-812 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-813 | decision | re-checked (points into §8.10) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §8.10 (the random source → §6.1's entry, l. 6261–6262) does not touch it |
| SCOPE-814 | decision | re-checked (J-row §4.2/§4.4) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) and §4.4 (S5d's test → §13.2, l. 3124) do not touch it |
| SCOPE-815 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-816 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-817 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-818 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-819 | decision | re-checked (J-row §3.3/§4.4; points into §7.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695), §4.4 (S5d's test → §13.2, l. 3124) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-820 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-821 | decision | re-checked (points into §3.3, §4.2) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695) and §4.2 (S1 (2)'s contour clip → §8.2, l. 2677–2679) do not touch it |
| SCOPE-822 | decision | re-checked (J-row §3.3/§7.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §3.3 (the tag "(K4)" dropped, l. 1695) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-823 | decision | re-checked (J-row §12.8; points into §12.6) | OK — index row unchanged; §12.8's load-verification sentence (the replay's model in place of the frozen copies, l. 7442–7444) is outside §12.8's hunk |
| SCOPE-824 | decision | re-checked (J-row §7.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-825 | decision | re-checked (J-row §3.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §3.3 (the tag "(K4)" dropped, l. 1695) does not touch it |
| SCOPE-826 | decision | re-checked (J-row §7.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 change in §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) does not touch it |
| SCOPE-827 | decision | re-checked (J-row §5.2/§7.3) | OK — index row unchanged, no J-id mention changed in any section (script); the r2 changes in §5.2 (the F-SKELETON row, l. 4018) and §7.3 (item 7 (ii) adds wing rings, l. 5052–5053) do not touch it |
| SCOPE-828 | decision | kept | as r1 — OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-C01 | conflict | kept | as r1 — RESOLVED — unchanged; §12.9's r1 change is a tag; 1.8× / 2.3× / 5.1× at l. 7504, §12.3 l. 7137–7139 |
| SCOPE-C02 | conflict | kept | as r1 — r0: resolved as the canon rules (`verify-scope-r0.md` §4) |
| SCOPE-C03 | conflict | re-checked (points into §13.2) | RESOLVED — §13.2's campaign is unchanged by r2 (word diff); "≥ 99.5 %" 0 hits; §15.2 O9 (c) still points to §13.2 |
| SCOPE-C04 | conflict | kept | as r1 — r0: resolved as the canon rules (`verify-scope-r0.md` §4) |
| SCOPE-C05 | conflict | kept | as r1 — RESOLVED — §3.7 (kernel r1) still states the one case Clipper2 ships; §1.7 l. 289, §16 l. 8698, §17.4 l. 8885, D-14 l. 9238 point to it |
| SCOPE-C06 | conflict | kept | as r1 — RESOLVED — VS5-1's §16 M1 text unchanged (l. 8645); §2.9 step 5 agrees |
| SCOPE-C07 | conflict | re-checked (points into §12.6) | RESOLVED — its places (§16 M2a / M3a, §6.4) are outside every r2 hunk; VD5-7's text present (§4) |
| SCOPE-C08 | conflict | kept | as r1 — r0: resolved as the canon rules (`verify-scope-r0.md` §4) |
| SCOPE-C09 | conflict | kept | as r1 — INVALID per canon — unchanged (§3.2's r1 change is a tag at item 6) |
| SCOPE-C10 | conflict | kept | as r1 — RESOLVED — §16 M3b and "CityJSON is built (§11.1)" unchanged (l. 8649, 8705) |
| SCOPE-C11 | conflict | kept | as r1 — RESOLVED — one list; §16's closing now agrees with it (V-SCOPE-11) |
