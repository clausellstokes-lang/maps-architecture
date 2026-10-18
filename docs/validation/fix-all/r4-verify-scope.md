# Fix-all round 4 — VERIFY, scope area (§1, §13–§17, decisions, judgment calls, staged list, one-page summary)
> PENDING FABLE REVIEW — Opus-produced (fixall/verify-scope-r4), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.

Status: COMPLETE (2026-09-26).

## 0. In plain words

This seat re-checked the parts of the design that say what is built and in what order, how it is tested, how it stays
legally clean and which decisions were taken, after the fourth fix-all round was merged into `docs/ARCHITECTURE.md`.
**All nine items assigned to this area are now fixed by a concrete mechanism in the text, and so are the two the area
found itself (S4-1, S4-2).** The editing interface can now keep a saved town at the right point in its history; the
summary no longer calls shadows and 3-D "later"; the copy-check script is binding on every seat that edits the design,
and the next amendment pass's instructions name it; memory under load checking is measured at the milestone that builds
load checking; the speed promise gives both the typical-run and the every-run limits; the list of published algorithms
is complete; the copy check reads the raw capture files and catches a pasted list in any order (re-tested here: 80 of 80
pasted lists caught); the calibration number reproduces (47 runs, re-computed here with independent code); and the
owner's side-by-side panels against FTG and Neighbourhood now have fixed pairing rules and seeds (all six check values
re-computed here with an independent hash).

The earlier fixes in this area all still hold. The check found **six new small problems, none serious and none a
deferral**: (1) one judgment-call row (J-I15) contains a bare `|` inside code, so the table drops the rest of that row
when rendered — the reasoning disappears — and the table check cannot see this kind of break; (2) the new "keep the
saved town" option says a wrong history point is "rejected with E_REBASE_AT", but that error exists nowhere else and the
function's return type has no way to say "rejected"; (3) the first milestone runs a document-size test but its build list
never builds the saved-file format — only the editing milestone lists "the document"; (4) the side-by-side panels still
leave three inputs open: whether a PLAT town paired with an FTG capture uses the capture's actual population, how the
list of FTG captures reaches the product (which may not read the capture folder), and which of its two modes the
`square` template uses against Neighbourhood; (5) one test line in §5.2 still spells a water setting "river + coast"
instead of the one spelling `coast+river`; (6) the effort estimate's note prices this area's round-4 additions but is
silent on the other areas' (naming records, wing carrying, resumable rasters and more). Five problems other checkers
found in this area's sections are confirmed (§3).

## 1. Verdict table (9 assigned items, plus S4-1 and S4-2)

Method: each item's claim, failure scenario and required change were taken from its source (`r3-verify-scope.md` §3 for
VS3-1–VS3-6 and VS2-8's residue, `r3-verify-determinism.md` for VD3-7, `r3-verify-pipeline.md` for NP3-9), its round-4
landing from `docs/ARCHITECTURE-VALIDATION.md` §R4.1 and `r4-scope.md` §1–§3, and then judged against the integrated
`docs/ARCHITECTURE.md` (10 723 lines, md5 `2661eb6826ea537ddcd524941c003e14`). ACCEPTED means the quoted text is a
concrete mechanism that defeats the item's failure scenario. "l." = line of `docs/ARCHITECTURE.md`. VS4-*n* = a new
finding in §3.

| id | sev | round-4 claim | verdict | quoted evidence | required change |
|---|---|---|---|---|---|
| VD3-7 | minor | FIXED (§14 `EditEngine.rebase`, J-S38; §2.9 step 4 via DR-2) | **ACCEPTED** | §14 (l. 9454–9456): "`rebase(doc: Document, reason: RebaseReason, at?: number /* default: the log head; h₀ — the decoded snapshot's model.seq — when the saved town is kept after edits made during load verification (§2.9 step 4, §7.1): the only two states the engine holds materialised, so any other value is rejected with E_REBASE_AT and nothing is rebased (VD3-7) */): Document`"; §2.9 step 4 (l. 1760–1761): "a `rebase` event with `at = h₀` (reason `keptSnapshot`) is appended at the head (`EditEngine.rebase(doc, 'keptSnapshot', h₀)`, §14)"; J-S38. The scenario (an implementation built to §14 can only rebase at the head) is defeated: the signature carries `at`, exactly as VD3-7 required. The rejection path is untyped — VS4-2 | — (the residue is VS4-2) |
| NP3-9 | minor | FIXED (the one-page summary) | **ACCEPTED** | Summary (l. 56–58): "every building carries its floors and roof heights even though the map is drawn from above, so the optional shadow pass and the 3-D export read real heights" — NP3-9's required wording verbatim. Grep over the whole document: 0 hits for "can be added later." (the one remaining "can be added later", l. 488, is §2's plain words on sewers and floating islands, an owner-staged subject) | — |
| VS2-8 | minor | FIXED (§17.1 (2), J-S32, `doc_checks.py` header; one line in `workflows/04-amendments.js`, `05-fable-review.js`, `06-fix-all.js`) | **ACCEPTED** | §17.1 (2) (l. 9864–9868): "so until then **every seat that writes this document — a fix-all integration seat, an amendment pass's apply and repair lanes, any finishing or repair seat — runs, before its change lands,** the scripted document checks … from the project root: `python3 docs/validation/bench/doc_checks.py --sections "⟨every section heading key the change touched⟩"`"; l. 9895–9898: "the change does not land until it exits zero, and the seat records its counts in its output file (a fix-all pass in its integration log, an amendment pass in `docs/validation/amendments-applied.md` and `amendments-repair.md`)"; J-S32 (l. 10639) the same. **Checked in the workflows:** the `DOCUMENT CHECKS …` line is in the shared `GROUND` of `04-amendments.js` (l. 33, read by `amendments/apply` l. 39 and `amendments/repair` l. 57), `05-fable-review.js` (l. 27) and `06-fix-all.js` (l. 52); the two output files §17.1 (2) names are the ones those lanes are told to write (`04-amendments.js` l. 41 and l. 59). Round 3's residue — the rule bound "the integration seat" only — is gone | — |
| VS3-1 | minor | FIXED (§16 M1 / M2a / M2b; J-S37, J-I14; §12.8 R-1, §12.1 R-2) | **ACCEPTED** | §16 M1 exit (l. 9778): "memory within §12.8's lines at TOWN and CITY on generated towns at pool sizes 0 and 3 (the load-verification case is M2a's; VS3-1)"; M2a exit (l. 9779): "memory at CITY while that document is load-verified, with a district regeneration and a Re-derive from S3 applied during it, within §12.8's line at pool sizes 0 and 3 — or §12.8's fallbacks applied (§12.8; VS3-1, VD3-5)"; §12.8 (l. 8535–8541): "M2a's memory measurement below — the milestone that builds the document, the log and load verification (§16) — includes the load verification of the reference 300-edit CITY document …" and "until M1 (generated towns at TOWN and CITY), M2a (that load-verification case at CITY) and M2b (METROPOLIS) measure them"; §12.8 *Measurement and fallback* (l. 8576–8578) "and at M2a on the reference 300-edit CITY document under load verification (§16) … if CITY exceeds its line at M1 or M2a"; §12.1 (l. 8167) "memory M1 and M2b, and the load-verification case at M2a"; §13.2 (l. 8759–8762); J-I14 (l. 10659) "in M2a's memory measurement". A Re-derive from S3 is an `adjust` with `fromStage` (§7.1, l. 5461), and M2a builds Adjust — so every input of the M2a case exists at M2a. Grep: 0 hits for "M1's memory measurement below includes" | — |
| VS3-2 | minor | FIXED (summary, §1.1, §15.1 H2; §12 plain words, §12.9 via R-3) | **ACCEPTED** | Summary (l. 67–70): "meets the improvement plan's speed bars for a typical run in towns up to about 4 500 people, cities up to about 17 700 and metropolises up to about 59 000, and for every single run up to about 3 400, 13 600 and 46 000; larger ones take up to about 0.2, 0.5 and 1.9 seconds in a typical run and up to a quarter longer in the slowest"; §1.1 (l. 321–325): "hold for p95 up to ≈ 1 333 / 5 200 / 17 300 buildings (≈ 4 500 / 17 700 / 58 800 people) and, for the max (every single run), up to ≈ 1 000 / 4 000 / 13 460 buildings (≈ 3 400 / 13 600 / 45 800 people) … the slowest allowed run 1.25 × that (≈ 246 ms, ≈ 601 ms, ≈ 2.4 s)"; H2 (l. 9634) "model p95 within O3 (d)'s bars up to ≈ 4 500 / 17 700 / 58 800 people and the max up to ≈ 3 400 / 13 600 / 45 800"; §12 plain words (l. 8119–8122) and §12.9 (l. 8607–8608) carry both knees; D-18 (l. 10378) and §15.2 O3 (d) (l. 9719) agree. **Recomputed:** max knees 1.25 × (20 + 0.060 B) ≤ 100 → B ≤ 1 000; 1.25 × (40 + 0.050 B) ≤ 300 → 4 000; 1.25 × (100 + 0.052 B) ≤ 1 000 → 13 461; × 3.4 = 3 400 / 13 600 / 45 770 people; band tops (§12.3: 2 940 / 8 820 / 35 000 buildings) p95 196 / 481 / 1 920 ms, × 1.25 = 245 / 601 / 2 400 ms — every figure matches | — |
| VS3-3 | minor | FIXED (§17.1 (8)) | **ACCEPTED** | §17.1 (8) (l. 9963–9976): "With the round-4 text (VS3-3): D8 steepest-descent flow directions and flow accumulation (O'Callaghan and Mark 1984; §2.3, §4.2 S1); the exact Euclidean distance transform in linear time (Felzenszwalb and Huttenlocher 2012; §4.5, §12.4); the three-pass box-filter approximation of a Gaussian (Wells 1986; …); the Merkle hash tree (Merkle 1987; §6.2, D-28); context-free grammar expansion in the style of Tracery (Compton, Kybartas and Mateas 2015) and character n-gram Markov chains (Shannon 1948) … — ideas only …; … the pair-correlation function of a point pattern (Stoyan and Stoyan 1994; §4.9, §13.2, §13.5)" — all seven VS3-3 named, each with a source and its section, plus seven more (ridged multifractal and domain warping, power diagrams, Kahn's sort, SHA-256, Shannon entropy, Jaccard, Hausdorff). **Own scan** of ≈ 230 further method names (`r4vs/methods_scan.txt`, session scratchpad): every remaining hit is an adopted library's algorithm, a file format or encoding (deflate, zig-zag varint), a rejected alternative (SplitMix64) or ordinary wording | — |
| VS3-4 | minor | FIXED (§17.1 (2) (ii), (iii), (vi); `doc_checks.py` C2–C4; allow file; J-S35) | **ACCEPTED** | (ii) (l. 9874–9876) now includes "`captures/**/*.json` (VS3-4)"; (iii) (l. 9877–9882): "and (VS3-4) of the string keys and values of every JSON file under `research/` and `captures/` — FTG's content database and every capture body included — taken in document order with purely numeric tokens dropped"; (vi) (l. 9886–9891): "*lists, in any order* … a hit is a line of the changed sections holding five or more distinct whole words of four or more letters that are members of one such list". **Executed:** `doc_checks.py` over this area's 19 changed section keys reads 2 052 JSON files and 597 840 corpus 3-grams, 307 lists (≈ 42 s): C1 5, C2 0, C3 131, C4 3, S1 0, S2 2 — 0 unreviewed, exit 0. **Independent paste test** (`docs/validation/bench/fixall_verify_scope_r4_checks.py` part B; the test document written to a temporary directory outside the project and deleted, counts only): 40 alphabetised five-member lines from each of the two lists of FTG's content database that C4 indexes (building types, 105 members; professions, 135) — **80 / 80 caught by C4**, 0 by C3 — the scenario (a pasted building-type or profession list passing while the rule reads as satisfied) is defeated | — |
| S4-1 | minor | FIXED (§17.1 (5), J-S36) | **ACCEPTED** | §17.1 (5) (l. 9930–9937): "— for every list the findings and captures record (a dict's keys, an array of strings, one field's values across records) — the set of salted digests of its members' words of four or more letters (S4-1), so a list copied in another order is still found … and flags as a list hit any line, or any column of a table, that holds five or more distinct words of one list's set; a hit fails the build unless an allow entry with a written reason is reviewed and added". The M-1 scanner now carries (vi)'s mechanism on salted digests; (2) says so ("whose list sets do (vi)'s work on salted digests") | — |
| VS3-5 | minor | FIXED (§17.1 (2) *Calibration*, J-S32) | **ACCEPTED** | §17.1 (2) (l. 9899–9905): "On §13–§17 as they stood after round 2 (lines 6657–7826 of the pre-round-3 text, md5 `ca2e2066…`, committed as `docs/validation/bench/fixall_scope_r4_calib_pre_r3_s13_s17.txt`), 1 196 of 26 236 token 3-grams are shared with the findings and they form **47 runs of five or more tokens (45 distinct; §13 24, §14 4, §15 11, §16 6, §17 2)** … no run threshold from 1 to 7 gives the 27 an earlier draft stated". **Recomputed with this seat's own code** (`fixall_verify_scope_r4_checks.py` part A) on the committed slice, its fixture-banner line dropped as the banner itself says: 26 236 / 1 196 / **47 runs (45 distinct)** — exact | — |
| S4-2 | minor | FIXED (§16 M2a; §2.9 size budget via DR-3) | **ACCEPTED** | §16 M2a exit (l. 9779): "the rebased-document size test — a CITY document rebased by keeping the saved town, after 20 edits, ≤ 1.25 × the unrebased document, or §2.9's block-group fallback applied (§2.9 size budget; VD2-9, S4-2)"; §2.9 (l. 1837–1838): "a document-size test per rung in B-CITY-lite at M1, and at M2a one on a CITY document rebased by keeping the saved town, after 20 edits (≤ 1.25 × the unrebased document; §16)". M2a builds both mismatch choices, so the kept-snapshot rebase exists there. (The M1 half — the unrebased size test — is VS4-3) | — |
| VS3-6 | minor | FIXED (§13.6 (2), (3), (6), (9); §16 M-1, M5; J-S33, J-S34) | **ACCEPTED** | (2) FTG (l. 9128–9135): "a milestone has **one pair per FTG capture** at the rung's matched size (BIG_TOWN for TOWN, BIG_CITY for CITY), each capture used once, in capture order: three pairs per rung. M-1 takes each size's three captures with FTG's water options nearest to `none` (one capture) and to `coast+river` (two) … The pair's PLAT side is generated at FTG's population and the capture's `WaterSetting` with seed `H32("d5-ftg/⟨milestone⟩/⟨rung⟩/⟨capture id⟩")`"; (2) NG (l. 9136–9154): five pairs for each of `area`, `street`, `square`, `ring`, "NG's seed is `H32("d5-ng/M5/⟨template⟩/⟨i⟩")` … reduced as 1 + (H32 mod 2 147 483 646)", the committed 32-town search and the `sizeMismatch` fallback; (6) (l. 9172–9175): "against FTG per rung (2 of 3 per rung and question; VS3-6), against NG over its twenty pairs (14 of 20)"; (9) `D5Pair` (l. 9201–9205); §16 M-1 (l. 9776) records each capture's id and `WaterSetting`. **Executed independently** (`docs/validation/bench/fixall_verify_scope_r4_h32_vectors.py` → `.out`, this seat's own MurmurHash3 from round 3, not the draft's): SMHasher 0xB3ECE62A reproduced; all six §13.6 (2) check vectors match (`d5/M1/TOWN/none/0` 1221236157, `d5/M1/TOWN/coast+river/4` 3998735106, `d5-mfcg/M1/TOWN/none/0` → 1965791931, `d5-ng/M5/area/0` → 1819777585, `d5-ng/M5/ring/4` → 951122398, `d5/M5/area/0/0` 3881605733); the search's populations are 50 000 / 62 500 / 78 125 / 97 656 × 4 and 120 000 × 16, as stated. II.2 confirms four registered templates (`area` the base's default). Both scenario halves — FTG pairs with no count or reuse rule, NG with no seed formula — are defeated; three smaller unstated inputs remain — VS4-4 | — (the residue is VS4-4) |

**Counts:** 11 items — **11 ACCEPTED**, **0 UNRESOLVED**; none claimed INVALID or STAGED-BY-OWNER.

## 2. Earlier FIXED items whose sections changed this round

Round 4 changed, in this area, the title, the one-page summary, §0.9 (its closing rule line only), §0.10 (new), §1.1,
§13.1, §13.2, §13.3, §13.4, §13.6, §13.7, §13.8, §14, §15.1, §16, §17.1, the delegated decisions (D-11, D-18), the judgment
calls (preamble, 28 area rows, J-S32 restated, J-I14–J-I17) and the staged list — found by a section-by-section word diff
against the integration seat's pre-round-4 copy (md5 `a8c2de844218f98444f1479ffb2b292a`; `r4vs/secdiff.py` and
`r4vs/scopediff.py` in the session scratchpad; every one of the 325 changed spans read). Every item this area accepted
in rounds 1–3 whose landing lies in those sections was re-checked: 37 items by 59 landing phrases, all present
(`r4vs/landings.py`), and each changed span read for a regression. **None regressed.**

| id | still holds | where it now lives (round-4 text) |
|---|---|---|
| GEO-12 | yes | §13.1 (2) constructive degeneracies, extended by kernel X-S1 and pipeline X-S1 / X-S3 fixtures; §13.8 PR "plus the whole constructive-degeneracy set"; fallback "the constructive set is never cut" |
| LC-19, NF-S1, N-24, VS2-5 | yes | §13.3 "**From M1 (LC-19).**", the records in `plat/goldens/`, `WaterSetting`, the placement digests; round 4 changed only the stamp-tile view-shift sentence (rendering NR3-7) and the `tiles?` comment |
| SCL-18, SCL-19, SCL-21 | yes | §13.8 tiers, "never to raise the cap", D-34; §13.2 once per sequence, the nine-size sweep and slope caps, the split record — round 4 added the timing phase (NR3-4), which strengthens SCL-19's measurements |
| FTG-16, MN-2 | yes | §16 M-1 FTG captures (now with the VS3-6 water choice); §13.5 matched sizes; §13.6 (3) matched pairs; D-31 unchanged (METROPOLIS against MFCG 130, FTG's picture an unscored card — consistent with `D5Pair`'s FTG rung type `TOWN`/`CITY`) |
| IMP-1, FTG-22, NR-10, VS2-1 | yes | §17.1 (1)–(9); (2) now binds every writer and adds (vi); (8) extended; (9) unchanged. **Executed:** C1 finds none of the 36 identifiers outside the five reviewed file-name hits; own column-count check over every table finds exactly one broken row, J-I15 (VS4-1) — S1's rule (VS2-1) holds and does not see it |
| IMP-2 | yes (see VS4-6) | §16 effort table unchanged; recomputed: lines 136–182 + stage 2 14–18 = 150–200; milestone rows 2+9+33+9+33+15+16+11+8+14 = 150 and 3+12+43+12+42+19+21+16+14+18 = 200 |
| IMP-3, VS2-2, NF-S6 | yes | §16 order; D-35 unchanged; §1.1 "All three rungs generate from M1"; M2a "METROPOLIS joins at M2b"; J-S7, J-S28 |
| IMP-7, VS2-9 | yes | §13.2 campaign (n = 800), §13.8 nightly row, §15.2 O9 (c), J-S4, J-S30 — unchanged this round |
| IMP-11, NF-S2 | yes | §13.6 (1) M5 against NG with the owner as rater; (7) the unrated rule; §16's one rule and each gating exit's clause (M5's now names "twenty pairs over the four templates") |
| IMP-12, IMP-13, NF-S5, NR-9 | yes | §16 M-1 and M1 exit (dispersions, the reordered-stages fusion re-run, every ⟨M-1⟩ number, the label-composition measurement) |
| IMP-16 | yes | §13.2 B-EDIT "the thirteen MFCG asks of §7.4 as scripted scenarios (IMP-16)" |
| COV-MFCG-L08, COV-FTG-A24, A25, B10, C03, C11 | yes | §14 app text unchanged; D-32 |
| COV-VG-VN-010 | yes | §13.5 `referenceBuild` required (unchanged); `ShiftRecord.cause.kind` keeps `'baselineShift'` |
| COV-VG-VN-088, AM-4 | yes | §1.1 bands, `LadderRouter`, the rung profile — only *Budgets inside a rung* changed (VS3-2) |
| COV-FTG-OBS1, NF-P11, NF-S12, VS2-3 | yes | §15.1: only B19 (stamp tiles, NR3-7) and H2 (VS3-2) changed; row counts MFCG 40, FTG 46 + 9, NG 31 unchanged |
| AM-7 | yes | D-1–D-7 unchanged |
| NF-D12, N-22, VS2-4 | yes | §14 `ConcernId`, `StreamOpts`, `TOWN_ROOT`, `labels ← render`, the lint over S13b's renderer inputs — round 4 changed only the kernel package line (stamp-tile build), the render line (resumable raster queue), the stage-registration paragraph, `TileBackend` / `RasterJob` (NR3-2), `rebase` (VD3-7), the `Exporter` comment and the testkit comment (`D5Pair`) |
| N-23 | yes | §16 M2b, M3b, M5 bands; §13.4 role continuity |
| VS2-6 | yes | §13.6 (2) `H32` definition and the MFCG check vectors, re-executed this round (§1, VS3-6) |
| VS2-7 | yes | the judgment-call preamble names the round-4 integration log's §4 conflict table; **scripted:** 244 J-rows, 0 duplicates, every family contiguous (J- 18, J-DET- 43, J-I 17, J-K 33, J-P 46, J-R 49, J-S 38), every cited J-id and every J-range member defined; 35 D-rows, every cited D-id defined |

Scope mirrors of round-3 rendering findings, now landed: NR3-1 (§16 M1's pool rule, l. 9778: "the pool primary at each
size where §12.3's rule keeps it"), NR3-2 (§14 `TileBackend.begin` → `RasterJob`), NR3-4 (§13.2 "re-timed three times in
§12.1's timing phase"; §13.8 timing phase), NR3-5 (J-R17 "≈ 58–75") — the rendering verifier judges them.

Scripted consistency checks over the integrated text (executed): every `§n` / `§n.m` / `II.n` pointer resolves (the
external `proposal-product.md` §16.2 excepted, as before); every sub-item cited from the scope sections exists (§2.9
steps 3–4 and *Size budget*, §6.3 case (4), §4.2 S3 (4) and (7), §4.2 S1 (5), §3.3 pool step 1, §7.3 (7)(v), II.2's four
templates, II.4's `setAttr(district.fabric, template)`); all 31 `docs/validation/bench/` files the document cites exist.

## 3. New findings

Six new problems in or at the edge of the scope sections, all minor; none is a deferral. VS4-1, VS4-2 and VS4-4 were
introduced by round 4 (integration C-1's new row; VD3-7's fix; VS3-6's fix); VS4-3 and VS4-6 are exposed by round 4's
own J-S37 principle and effort sentence; VS4-5 predates round 4 (round 3's grep for VS2-5 missed it). Each required
change is a text change with its choice made.

| id | sev | owner | finding (with evidence) | required change |
|---|---|---|---|---|
| VS4-1 | minor | scope (judgment calls, J-I15; `docs/validation/bench/doc_checks.py` S1) | **J-I15 renders truncated: a bare pipe character inside a code span splits its row.** J-I15 (l. 10660) writes "a water gate's two bank vertices `('gate_end', gate, 0 \| 1)` under a fresh `Gate` …" (escaped here; the row itself has the bare pipe). In a GitHub-flavoured Markdown table an unescaped pipe splits the cell even inside backticks, and cells beyond the header's count are dropped, so the rendered row ends at "`('gate_end', gate, 0" — the whole "over … because …" reasoning of the call disappears for a reader of the rendered file. The document's only other in-table pipes are escaped (`\|∇P\|` in §13.7 and §15.2, l. 9244 and 9724). **Executed** (`fixall_verify_scope_r4_checks.py` part C): of every table row outside fenced code, exactly one has a cell count different from its header's — J-I15 (3 against 2). `doc_checks.py` S1 checks only a row's first and last character, so it passes | Write `0 \| 1` in J-I15. Extend S1 (§17.1 (2) (iv) and the script) with a second clause: "and every row has its header's number of cells, counting only unescaped pipes" — part C's rule, which today flags exactly this row |
| VS4-2 | minor | scope (§14 `EditEngine.rebase`); companion determinism (§7.1's rebase row) | **The `at` rejection has no typed form.** §14 (l. 9454–9456) says an `at` other than the head or h₀ "is rejected with E_REBASE_AT and nothing is rebased", but `E_REBASE_AT` occurs nowhere else in the document (not in `KernelError`, l. 1911–1929, nor in `ApplyResult`, l. 7963–7967), and `rebase(…): Document` returns a document, so "rejected" can only be a thrown exception or a silently unchanged document — while `apply`, `undo` and `redo` return `ApplyResult` and the document's rule is typed results. Two faithful implementations can differ (one throws, one returns the input), and a host bridge that forwards a hand-built `rebase` (§2.9 step 4's "possible only in a hand-built log") has no status to relay | Declare `rebase(…): ApplyResult`, a bad `at` returning `{ status: 'conflict', actions: [{ kind: 'invalid', message: 'E_REBASE_AT: at must be the log head or h₀' }] }` with nothing appended; name `E_REBASE_AT` in §7.1's rebase row |
| VS4-3 | minor | scope (§16 M1 and M2a content) | **M1 measures a document it never builds.** M1's exit runs "the document-size test (≤ 320 B per building at CITY)" (l. 9778), §2.9 times "a document-size test per rung in B-CITY-lite at M1" (l. 1837), §3.9 "measures the result at M1" (l. 3001), §13.3 marks every "document made by the app" *preview* from M1, and J-S37 (l. 10644) keeps "M1 … its memory and size tests of generated towns" on the rule "a milestone can measure only what it or an earlier one builds". But M1's content column builds no `.plat` writer — "the document and log" first appear in M2a's content (l. 9779) — so by J-S37's own rule the M1 test has no subject, the same class as VS3-1 and S4-2 | Add to M1's content: "the `.plat` writer and reader for generated towns — manifest, content-addressed chunks and compression, no log (§2.9, §3.9) — which the document-size test and *preview* documents need"; M2a's "the document and log" becomes "the log, the one replay fold and load verification over M1's format" |
| VS4-4 | minor | scope (§13.6 (2), (3), (9); §16 M-1); companion pipeline (II.2's `SquareFabric` default) | **Three inputs of the new panels are still unstated** (VS3-6 residues). (a) "PLAT is generated at FTG's population (BIG_TOWN ≈ 5 600, BIG_CITY 24 500 …)" (l. 9157–9158) does not say whether that is the preset's nominal figure or the capture's own recorded population (the "≈" says captures differ), and `D5Pair`'s FTG form (l. 9203) has no `population`, so the pair is not reproducible from the record. (b) The product CLI writes `seeds.json` with `H32` over each capture id and its `WaterSetting` (l. 9116–9117, 9133–9135), but the product may not read `captures/` (§17.1 (3)), and — unlike NG's `plat/goldens/d5/M5/ng-counts.json` (l. 9142) — no research-side file hands the FTG capture list to the product. (c) NG's `square` pairs open a PLAT district "with the same template" (l. 9143–9144), but `SquareFabric` has two modes, `carved` and `void` (II.2), and neither §13.6 nor II.2 says which the pair (or the template by default) uses; NG's own square is the void form (II.2 cites it) | (a)+(b): "the research-side panel script writes `plat/goldens/d5/⟨milestone⟩/ftg-captures.json` — per capture its id, rung, `WaterSetting` and recorded population, numbers and ids only — committed like `baselines.json` (§17.1 (4)) before `plat d5 seeds` runs; PLAT's side is generated at the capture's recorded population"; `D5Pair` FTG gains `population: number`. (c): "NG's `square` pairs use `SquareFabric` with `mode: 'void'`, NG's own form (II.2)", and II.2 names the template row's default mode |
| VS4-5 | minor | determinism (§5.2 F-RIVER test column) | **One water setting is still spelled outside the one spelling.** §5.2 F-RIVER's test (l. 4782): "1 000 seeds × {river, river + coast} × rung" — VS2-5 made `WaterSetting` "the one spelling of a water setting: B-CITY, the golden store, every record" (§13.3, l. 8908) and B-CITY's configurations are `WaterSetting`s. Pre-existing (the pre-round-4 text holds the same line; round 3's grep for VS2-5 missed it) | "1 000 seeds × {`river`, `coast+river`} × rung" |
| VS4-6 | minor | scope (§16 effort paragraph; D-20) | **The effort basis is silent on the other areas' round-4 build work.** §16 (l. 9811–9815): "nor do round 4's — the D-5 panel's FTG and NG pairing rules (§13.6), the list check of §17.1 (2) and (5), and the load-verification memory test at M2a instead of M1 (PLAUSIBLE)" — only this area's additions. Round 4 also added mechanisms that are build work: per-name naming records and confirmed renames (VD3-2), the load's digest recomputation and corrupt-cache path (VD3-1), `carryWings` (NP3-1), crossing sites as `Bridge` state and their handling in the water operator (NP3-4, C-4), the forced harbour pick (NP3-7), demotion and `StretchRef` (VK3-3, VK3-9), resumable raster jobs and the four-class tile queue (NR3-2, NR3-6), the shipped stamp-tile asset and its build tool (NR3-7), the pin pass (NR3-3). A reader of D-20's 150–200 pw cannot tell whether they are priced | One sentence after the round-4 clause naming these mechanisms and the line that absorbs each — the O9 line (naming record, digest path, demotion, `StretchRef`), the O12 line (raster jobs, queue, stamps, pins), the O17 line (`carryWings`), the O1 and parity-floor lines (sites, harbour pick) — each "(PLAUSIBLE)"; or, if the seat judges them unabsorbed, widen "mechanisms the fix-all pass added" by the stated amount and keep the milestone rows and D-20 equal to the new total |

**Scope-owned parts of other round-4 verifiers' findings, confirmed here in this area's text and not renumbered:**
VD4-1 (`r4-verify-determinism.md`; companion scope §13.2, §16 — its B-EDIT M3a tests of an upgraded kept-snapshot
document and an o(N−3) frozen view must be added to §13.2's fixtures and M3a's exit); VD4-4 (companion scope §14 —
`ApplyResult`'s `Confirm(token, fates)`, l. 9451, carries no renames); NP4-5 (`r4-verify-pipeline.md`; companion scope
§13.2 — l. 8802 still reads "roads leaving = N, plus the harbour gate at `N = 0`", which the detour guard's harbour gate
makes wrong for N > 0); NR4-1 (`r4-verify-rendering.md`; §13.7 O19 (d)'s fallback reason, l. 9247, "the scaled tiles'
minimum distance is the entity's own spacing", fails across variant seams); VK4-1 (`r4-verify-kernel.md`; §13.1,
l. 8698–8699, "a deck left over land at L1 until F-REDERIVE" is false for a deck S1 sited, whose `deck_end` rows are L0).

## 4. Deferral-language scan of the scope sections

Scanned: the title and summary, §0, §1, §13–§17, PART III, the delegated decisions, the judgment calls, the staged list
and Appendix A (2 330 lines) for *TBD, TBA, to be decided / determined, later, defer…, postpone…, future, not yet, at M0,
placeholder, pending, eventually, when needed, if needed, revisit, left for, out of scope, open, until* (`r4vs/defscan.py`)
— 151 hits, 28 of them on lines new or changed in round 4. Every one of the 28 is: the banner or revision note ("the
owner's no-defer rule", "pending-review banner", "none deferred"); ordinary sequence ("each later ring of wall", "the later
pin reported hidden", "a later loader", "re-applying the later events"); an ordinary use of *open* (§0.10's title "the
items still open", "an open enceinte's glacis line", "open-to-editable", "open ≤ NG's 10–96 ms", "an open trace's end
anchors"); a milestone-bound rule with its gate ("does not exit until a re-run passes", "the change does not land until
it exits zero", "offered with every release until it is rated", "raised until its lower end meets the threshold"); a
failure-class mechanism ("a deck left over land at L1 until F-REDERIVE" — itself VK4-1, a correctness point, not a
deferral); a rejected alternative inside a judgment call ("over queueing edits until verification ends", "over emitting
no site until a route needs one", "over leaving pools behind a later measured need"); or an owner-staged subject with
its hooks ("the evolution engine (much later)", "sites later growth, epochs and drawn bridges use"). **No deferral
wording remains in this area.** NP3-9, round 3's one exception, is gone. The staged list names exactly the seven roadmap
subjects, each with concrete hooks; round 4 added hooks to three rows and staged nothing new.

**A note outside this pass (not a finding), carried from rounds 2 and 3.** The owner ruled that this module is GPL-3
(`docs/AMENDMENTS-2026-09-25b.md` item 21); §17.3, D-22, J-S10 and §17.1 (1) still state the proprietary default. That
file is the amendment pass's input (`docs/HANDOFF.md` 6c, `workflows/04-amendments.js`), whose lanes now run the
document checks (VS2-8).

## 5. Receipts and method notes

* **Read in full:** every scope section of the integrated `docs/ARCHITECTURE.md` line by line — the title and summary
  (l. 1–101), §0 (l. 102–262), §1 (l. 263–478), §13 (l. 8618–9317), §14 (l. 9318–9510), §15 (l. 9511–9750), §16
  (l. 9751–9835), §17 (l. 9836–10051), PART III, the delegated decisions, the judgment calls' preamble and J-S / J-I rows,
  the staged list and Appendix A (l. 10305–10723); for the items' cross-references §2.9 steps 3–5 and *Size budget*,
  §3.1's error type, §7.1's `EditEvent` and rebase row, §11.2's `ApplyResult`, §12's plain words, §12.1, §12.3's knee
  paragraph, §12.8, §12.9, II.2; the sources `r3-verify-scope.md` (all), the VD3-7 and NP3-9 rows of
  `r3-verify-determinism.md` and `r3-verify-pipeline.md`, `r4-scope.md` §0–§1 and §3–§5, `r4-integration-log.md` (all),
  `ARCHITECTURE-VALIDATION.md` §R4 (intro and the scope rows), `doc_checks.py` (all), the prompts of
  `workflows/04-amendments.js`; the other four round-4 verifications' new-finding tables (to avoid double counting). The
  rest of the 1.34 MB document (PART I §2–§12 bodies, PART II) was read where a cross-reference led, as in rounds 2 and 3;
  its areas' verifiers cover it. The full-document scripted checks below ran over every line. Nothing outside the
  project; no reference source; no reference content copied (every measurement prints counts; the paste test's document
  lives in a deleted temporary directory).
* **Executed (CONFIRMED):**
  1. Section diff against the pre-round-4 copy (`r4vs/secdiff.py`, `r4vs/scopediff.py`): 72 changed or new sections, 19
     of them this area's; all 325 changed spans of this area read.
  2. `python3 docs/validation/bench/doc_checks.py --sections "ARCHITECTURE,The whole design in one page,0.9,0.10,1.1,13.1,
     13.2,13.3,13.4,13.6,13.7,13.8,14,15.1,16,17.1,Delegated decisions,Judgment calls,Staged by the owner"` (42 s): C1 5,
     C2 0, C3 131, C4 3, S1 0, S2 2 — 0 unreviewed, exit 0.
  3. `docs/validation/bench/fixall_verify_scope_r4_h32_vectors.py` → `.out`: the round-3 independent MurmurHash3
     reproduces SMHasher's 0xB3ECE62A and all six §13.6 (2) check vectors; the NG search's population schedule.
  4. `docs/validation/bench/fixall_verify_scope_r4_checks.py` → `.out`: part A the VS3-5 calibration (26 236 / 1 196 /
     47 runs, 45 distinct); part B the C4 paste test (80 / 80); part C the table cell-count check (1 row, J-I15).
  5. Scripts over the text (`r4vs/ids.py`, `r4vs/landings.py`, `r4vs/defscan.py`): J- and D-id integrity, pointer
     resolution, table columns, 59 landing phrases of 37 earlier items, residual phrasings, the deferral scan, bench-file
     existence; the workflow grep for the document-check line.
  6. Arithmetic recomputed: the VS3-2 knees and band-top times; the §16 milestone and line sums.
* **PLAUSIBLE (reasoning only):** that GFM drops J-I15's excess cell as described (the GitHub-flavoured Markdown table
  rule; not rendered here); VS4-4 (c)'s choice of `void` as NG's form (from II.2's own citation); VS4-6's allocation of
  the other areas' mechanisms to existing effort lines (an estimate about an estimate).
* **Output shifts, stated.** None: this seat changed no design text, golden, digest or model output; it added two
  receipt scripts with their outputs under `docs/validation/bench/` (`fixall_verify_scope_r4_h32_vectors.*`,
  `fixall_verify_scope_r4_checks.*`).
