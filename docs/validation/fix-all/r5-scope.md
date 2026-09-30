# Fix-all round 5 — SCOPE area (§1, §13, §14, §15, §16, §17, Delegated decisions, Judgment calls, Deferrals, one-page summary)
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-scope-r5 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-scope-r5` · 2026-09-26 · seat: fix architect, SCOPE area, round 5 (Fable role; opus stand-in) ·
clean-room: every mechanism below is described in this seat's own words and numbers; no reference code, grammar,
palette, word list or content table is quoted.

Status: COMPLETE (2026-09-26) — 5 items, 5 FIX, 0 INVALID, 0 STAGED-BY-OWNER, nothing deferred; 14 replacement blocks
(§13.6, §14, §16, §17.1, D-20, D-29, the judgment-call preamble, six restated or amended rows and five new ones);
3 cross-area requests (pipeline 1, rendering 1, integrator 1) and 1 alignment note (determinism); `doc_checks.py` S1
extended and three bench files committed by this lane (§3.4).

## 0. How to read this file (plain words), reading record, method and measurements

**In plain words.** The round-4 checker left five small problems in the parts of the design that say what is built, in
what order, how it is tested and how it stays legally clean. **All five are fixed; none is declared wrong and none is
postponed.**

* **A table row that lost its reasoning (VS4-1).** One judgment-call row contained a bare `|` inside a piece of code,
  which a Markdown table reads as a column break, so everything after it vanished when the file was displayed. The
  character is now escaped, and the scripted document check — which every seat that edits the design must run — now
  counts the columns of every row, so this kind of break can no longer land unnoticed. (Executed: the new check flags
  exactly that one row in the current design and nothing in the corrected one.)
* **"Keep the saved town" now reports a refusal the same way everything else does (VS4-2).** Asking to keep a saved
  town at a history point the program does not hold now returns the ordinary "conflict" answer with a named error,
  instead of an undefined throw or a silent no-op.
* **The first milestone builds the file format it measures (VS4-3).** Milestone M1 already tested the size of saved
  files, but its build list did not include writing or reading them — that only appeared in M2a. M1 now builds the
  saved-file format for freshly generated towns (and checks that save → open → save gives identical bytes); M2a adds
  the edit history and the checking of edited towns on top of it.
* **The side-by-side panels against FTG and Neighbourhood are fully specified (VS4-4).** A PLAT town paired with a
  recorded FTG town is now generated at that FTG town's *actual* recorded population; the list of FTG recordings reaches
  the product through a committed numbers-only file (the product may not read the recordings folder); and the "square"
  template compared with Neighbourhood uses Neighbourhood's own form of square (an open space left by unbuilt plots),
  which also becomes that template's default.
* **The effort estimate now prices what the other areas added (VS4-6).** Rounds 4 and 5 added six genuinely new
  components in other parts of the design (for example the resumable drawing and label-placement queue and the shipped
  tree-stamp file). Itemised, they come to about 14–22 working days, so the estimate rises honestly from **150–200 to
  153–204 expert person-weeks**; smaller refinements are named with the line that already pays for them. A standing
  rule now makes every later pass price its own additions the same way.

**Reading record.** Read in full: `docs/validation/fix-all/r4-verify-scope.md` (all; the source of the five items);
the integrated `docs/ARCHITECTURE.md` (10 723 lines, md5 `2661eb6826ea537ddcd524941c003e14`) for every section a block
below replaces — §13.6, §14, §16, §17.1 — and the Delegated decisions, the Judgment calls (preamble, J-15, every J-S
and J-I row, J-R42 – J-R49), the staged list and Appendix A; for the items' cross-references §2.9 (steps 3–5, *Size
budget*, *Formats*, *Canonical form*), §7.1's `rebase` event and §7.4's rebase row, §11.2 (`PlatApi`, `ApplyResult`,
"Confirming fates"), §1.1's bands, §12.8's M2a sentence, §13.3's *preview* paragraph, §0.10 and II.2;
`docs/validation/bench/doc_checks.py` (all) and the verifier's part-C code in `fixall_verify_scope_r4_checks.py`; the
four other round-5 drafts, all of which landed while this lane worked — `r5-pipeline.md` (its §3.4 requests and §4
rows), `r5-kernel.md` (its X-S1 and X-S2), `r5-determinism.md` (§0–§1, its §3 requests and its §7.1 `rebase`
comment) and `r5-rendering.md` (§0 and §3); for the evidence of VS4-4, the FTG capture folders' listing,
`research/findings/ftg-docs-params.md` and `ftg-payload-visual.md` on FTG's size targets and how its generator reaches
its population (numbers only), and `docs/IMPROVEMENTS.md` S4's restraint sentence on NG's square. Not read line by
line: the rest of the 1.34 MB document (PART I §2–§12 bodies and PART II beyond II.2), which the other areas'
verifiers cover, and `docs/ARCHITECTURE-VALIDATION.md` (its §R4 scope rows are summarised in `r4-verify-scope.md`
§1–§2); every pointer this file adds was resolved by `doc_checks.py` S2 on the patched text, and every anchor of another
area's request quoted in §1 and §3 was found by a whitespace-normalised search. Nothing outside the project; no
reference source; no reference content copied.

**Method.** Every block in §2 was produced by one script, committed as `docs/validation/bench/fixall_scope_r5_patch.py`,
that applies each change to the integrated text as an exact, count-checked replacement (46 replacements, each asserted
to match exactly once) and then re-wraps the one wholly new paragraph of §16 and the preamble's added sentence at 120
columns (the preamble's earlier lines come out byte-identical); every sentence not named in §1 is therefore
byte-identical to the current text. Run on the round-4 text it reproduces the patched copy exactly (md5
`e7e916da94aec1c795abf30b3e385260`, 10 783 lines, re-run and compared). The blocks were cut from that copy by heading.

**Measurements (CONFIRMED — executed in this lane).**
1. `docs/validation/bench/doc_checks.py` with the new S1 clause, on the current text: **S1 1 hit — J-I15, "3 cells
   against 2"** (exit 1); the pre-round-5 script on the same text: S1 0 — the defect VS4-1 names. (The rendering lane,
   running the extended script during this round, reports the same single hit, its SC-9.)
2. The same script on the patched copy over the changed sections (`--sections "13.6,14,16,17.1,Delegated
   decisions,Judgment calls"`; 2 052 JSON files, 597 840 corpus 3-grams, 307 lists): C1 5, C2 0, C3 79, C4 2, S1 0,
   S2 2 — **0 unreviewed, exit 0**. Three hits the first draft raised (two C3 runs of ordinary phrasing and numbers, one
   C4 line of generic words) were reworded away; nothing was added to the allow file.
3. `docs/validation/bench/fixall_scope_r5_checks.py` → `fixall_scope_r5_checks.out` (committed): part A, the cell-count
   rule over the whole document — 1 row before (J-I15), 0 after; part B, §16's arithmetic — before: milestone rows
   150–200 = lines 136–182 + 14–18 = total 150–200, cuts to 119–154 / 133–172, 75–100 weeks; after: milestone rows
   **153–204** (M1 35–46, M2a 9–12, M3a 16–20, the rest unchanged) = lines **139–186** + 14–18 = total **153–204**,
   cuts to **122–158 / 136–176**, total ÷ 2 = 76.5–102 weeks (stated 77–102), D-20 and the plain words agreeing.
4. The other round-5 drafts' judgment-call rows (kernel, determinism, pipeline, rendering) each have two cells — the
   extended S1 passes them; and every anchor their requests to this area quote occurs exactly once in the current text
   and, for the requests not folded here, exactly once in the patched copy too (so the integrator can still apply them).

## 1. Disposition table

| item | sev | disposition | sections changed (blocks in §2) | the mechanism, in one line |
|---|---|---|---|---|
| VS4-1 | minor | **FIX** | J-I15 (pipe escaped); §17.1 (2) (iv) and its *Calibration*; `docs/validation/bench/doc_checks.py` S1 (applied by this lane, §3.4); J-S39 | J-I15 writes `0 \| 1`; S1 gains a second clause — every table row has its header's number of cells, counting only unescaped pipes, fences recognised when indented — which flags exactly J-I15 in the round-4 text and nothing in the patched text |
| VS4-2 | minor | **FIX** | §14 `EditEngine.rebase` (and `apply`'s comment, determinism SR5-3 folded); J-S38 restated; §7.1's `rebase` comment is carried by determinism's round-5 block (§3.2) | `rebase(…): ApplyResult`; a bad `at` returns `{ status: 'conflict', actions: [{ kind: 'invalid', message: 'E_REBASE_AT: at must be the log head or h₀' }] }`, appends nothing and rebases nothing, on every host alike |
| VS4-3 | minor | **FIX** | §16 M1 content and exit, M2a content; J-S37 restated, J-I14 amended, new J-S40; rendering request (§12.8's sentence, §3.3) | M1 builds the `.plat` writer and reader for generated towns — manifest, content-addressed chunks, gzip, an empty log; a saved town opened by checking its recomputed root, a differing root regenerated from the recipe; M2a's reader opens an M1 document (no records digest) by the same regeneration — and exits on the generated-town round trip; M2a builds "the log and the one replay fold over M1's document format" and load verification over M1's reader |
| VS4-4 | minor | **FIX** | §13.6 (2), (3), (9) (`FtgCapture`; `D5Pair` FTG `population`, `populationSource`); §16 M-1; §17.1 (4); §14 testkit line; D-29; new J-S41, J-S42; pipeline request (II.2's `square` default, §3.1) | (a) PLAT's side of an FTG pair is generated at the capture's recorded population (its decoded payload's resident count; the size's nominal target, marked, if none; clamped into the rung's band); (b) the research-side panel script commits `plat/goldens/d5/⟨milestone⟩/ftg-captures.json` (id, rung, water, population) before `plat d5 seeds`, which reads only it and `ng-counts.json`; (c) NG's `square` pairs use `SquareFabric`'s `void` mode, which II.2 makes the row's default |
| VS4-6 | minor | **FIX** | §16 (plain words, staffing, effort table, the round sentences, new VS4-6 paragraph, cuts); D-20; J-15 and J-S6 amended; new J-S43 | the other areas' round-4 and round-5 build work sorted into six **new components** (≈ 14–22 working days, itemised with section, milestone and item ids) that widen the fix-all line by 3–4 pw, and **refinements**, each named with the line that already prices it; total 150–200 → **153–204 pw**, the milestone rows moving with the components (M1 35–46, M3a 16–20) and summing to the total; a standing rule makes every later pass price its build work here |

**Tally:** 5 items — **5 FIX**, 0 INVALID, 0 STAGED-BY-OWNER, nothing deferred.

**Requests from other areas folded into this file's blocks** (the integrator marks them applied through these blocks
and does not apply them again — several of their anchors survive in the blocks because the fold appends after them):
determinism r5 **SR5-2** (§16 M2a and M3a rows; M2a's records-digest clause merged with VS4-3's rewording of the same
sentence) and **SR5-3** (§14 `EditEngine.apply`); pipeline r5 **X-S5** (§16 M3a exit); rendering r5 **SC-4** (§14
`LabelPlacer`, `PlacementJob`) and **SC-5** (§16 M1, M2b and M3a exits); rendering **SC-9** is VS4-1 itself. The
round-5 preamble sentences of kernel **X-S2**, determinism **SR5-4**, pipeline **X-S7** and rendering **SC-8** are merged
into the preamble block. **Applied by the integrator as written, not folded** (sections this lane does not replace; each
checked here for coherence with the blocks): pipeline **X-S1 – X-S4** (§13.2, §13.5) and **X-S6** (§13.2 and the staged
list's stage-3 row); kernel **X-S1** (§13.1); determinism **SR5-1** (§13.2); rendering **SC-1** (§13.3), **SC-2**
(§13.2), **SC-3** (§13.8), **SC-6** (the one-page summary) and **SC-7** (§15.1 B19); and the judgment-call rows those
four areas give (J-K, J-DET, J-P and J-R rows).

## 2. Replacement blocks

Each block is the complete new text of its subsection (or, for the two tables at the end of the document, of the named
row or paragraph), cut from the patched copy described in §0. Banners follow the marking rule: each replaced section's
banner now names `fixall/draft-scope-r5` first. The folded requests carry their source ids in the text (VD4-1 – VD4-9
from determinism SR5-2 / SR5-3; NP4-6 from pipeline X-S5; NR4-1 – NR4-3 and NR4-5 from rendering SC-4 / SC-5).

=== REPLACE §13.6 The owner's side-by-side protocol (D-5) ===

### 13.6 The owner's side-by-side protocol (D-5)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r5); earlier revision fixall/integrate-r4, drafted by fixall/draft-scope-r4; earlier revision fixall/integrate-r3, fixall/draft-scope-r3

"Mastered" means the owner's eye on side-by-sides against MFCG and FTG at town, city and metropolis, plus the measured
parity numbers (D-5). This protocol makes the eye a recorded, repeatable judgement that cannot be steered by choosing
flattering seeds, and it never lets a milestone claim the eye's verdict without the eye.

1. **When.** At M1 (diagnostic: the base is not yet complete, so the result is recorded and does not gate; the panel
   covers all three rungs, because METROPOLIS generates from M1, §16), at M2b (gates
   "the base at parity"), at M4 (gates "mastered") and at M5 against NG (gates stage 2, and replaces S2's blind preference
   test with n ≥ 20 raters, which the program has no pool for; IMP-11).
2. **Seeds fixed before rendering.** Every pair's seeds come from a formula and are committed before any render; no
   seed is replaced after it is rendered, and every list is reproducible from its formula. **`H32(s)`** is defined
   exactly (VS2-6): the first 32-bit output word (h1) of MurmurHash3's x86 128-bit variant — the published public-domain
   algorithm §6.2's H128 already implements — run over the UTF-8 bytes of `s` with seed 0. Its implementation passes the
   algorithm's published verification value (SMHasher's procedure gives 0xB3ECE62A). The result is a u32, so it is a
   `Seed` (§2.9), written in records as its decimal string. The product CLI (`plat d5 seeds ⟨milestone⟩`) writes the
   milestone's pair list — one `D5Pair` per pair, (9) — to `plat/goldens/d5/⟨milestone⟩/seeds.json`, committed before
   any render. Besides the formulas below it reads only the two numbers-only files the research-side panel script
   commits beside it — `ftg-captures.json` (M1, M2b, M4) and `ng-counts.json` (M5) — and never `captures/` (§17.1 (3),
   (4); VS4-4). ⟨milestone⟩ is the id its `MilestoneRecord` carries (`M1`, `M2b`, `M4`, `M5`), ⟨rung⟩ the `Rung`
   (`TOWN`, `CITY`, `METROPOLIS`), ⟨water⟩ the `WaterSetting` (§13.3), ⟨i⟩ and ⟨k⟩ decimal integers.
   * **Against MFCG** (M1, M2b, M4). Five pairs per rung and per water setting (`none`; `coast+river`), ten per rung.
     PLAT's seed is `H32("d5/⟨milestone⟩/⟨rung⟩/⟨water⟩/⟨i⟩")`, i = 0 … 4; the text fixes two check vectors:
     `H32("d5/M1/TOWN/none/0")` = 1221236157 and `H32("d5/M1/TOWN/coast+river/4")` = 3998735106
     (`docs/validation/bench/fixall_scope_r3_h32.out`). MFCG's seed comes from the same formula with the prefix
     `d5-mfcg/`, reduced as 1 + (H32 mod 2 147 483 646) into 1 … 2³¹ − 2, the state range of MFCG's Park–Miller stream
     (`research/findings/profile-mfcg.md`), by the research-side panel script, which applies exactly this formula
     (check vector: `d5-mfcg/M1/TOWN/none/0` → 1965791931); MFCG draws `none` with its plain options and `coast+river`
     with its river and coast on.
   * **Against FTG** (M1, M2b, M4; TOWN and CITY, METROPOLIS per D-31; VS3-6). FTG cannot be seeded — its server draws
     its own seed — so a milestone has **one pair per FTG capture** at the rung's matched size (BIG_TOWN for TOWN,
     BIG_CITY for CITY), each capture used once, in capture order: three pairs per rung. M-1 takes each size's three
     captures with FTG's water options nearest to `none` (one capture) and to `coast+river` (two), and records each
     capture's id — its folder name under `captures/ftg/` — its `WaterSetting` and its **recorded population**, the
     number of residents its decoded payload holds, in the capture README (§16). At each of these milestones the
     research-side panel script writes `plat/goldens/d5/⟨milestone⟩/ftg-captures.json` — one `FtgCapture` per capture,
     in capture order, ids and numbers only, (9) — and commits it like `baselines.json` (§17.1 (4)) before
     `plat d5 seeds` runs (VS4-4). The pair's PLAT side is generated at the capture's recorded population and its
     `WaterSetting`, both read from that file, with seed `H32("d5-ftg/⟨milestone⟩/⟨rung⟩/⟨capture id⟩")`, so every
     milestone pairs the same captures, at the same populations, with PLAT seeds of its own. *Measurement (M-1):* each
     capture's resident count, taken from its decoded payload. **Pre-decided fallback:** a capture whose payload yields
     no resident count takes its size's nominal target (BIG_TOWN 5 600, BIG_CITY 24 500), marked
     `populationSource: 'nominal'` and reported with the panel; a population outside the rung's band (§1.1) is clamped
     into the band and the clamp reported — FTG's two targets lie far from either edge. The capture file and the seed
     list are committed before any PLAT render.
   * **Against NG** (M5; VS3-6). NG can be seeded — its MINSTD stream (`docs/CONFIDENCE.md` NG A2) — so the panel has
     five pairs per NG template, for all four templates PLAT registers as fabrics — `area`, `street`, `square` and
     `ring` (II.2) — twenty pairs. NG's seed is `H32("d5-ng/M5/⟨template⟩/⟨i⟩")`, i = 0 … 4, reduced as
     1 + (H32 mod 2 147 483 646) into MINSTD's state range 1 … 2³¹ − 2 (check vectors: `d5-ng/M5/area/0` → 1819777585,
     `d5-ng/M5/ring/4` → 951122398; `docs/validation/bench/fixall_scope_r4_h32.out`), generated at NG's `medium` size —
     the size of NG's vertex captures and of §13.5's NG baselines — by the research-side panel script, which also counts
     each hood's buildings; the counts reach the product as numbers only, in `plat/goldens/d5/M5/ng-counts.json`,
     committed like `baselines.json` (§17.1 (4)). PLAT's side of pair (template, i) is one district of a PLAT town,
     opened with the same template at neighbourhood LOD (`setAttr(district.fabric, template)`, II.4) in the template's
     default form — for `square`, `SquareFabric`'s `void` mode, NG's own square (II.2; VS4-4) — found by a committed
     search: town k (k = 0, 1, …, 31) is generated with seed `H32("d5/M5/⟨template⟩/⟨i⟩/⟨k⟩")` (check vector:
     `H32("d5/M5/area/0/0")` = 3881605733), water `none` and population ⌊min(50 000 × 1.25^⌊k / 4⌋, 120 000)⌋ — four towns
     at each METROPOLIS size from the target up (50 000, 62 500, 78 125, 97 656) and the rest at the cap, because a
     district's mean building count grows with the town's size under §4.5's count law; in each town the district whose city-LOD building count is nearest the NG hood's (ties to the smaller
     address id) is opened with the template, and the first whose opened building count lies within ± 20 % of the NG
     hood's is the pair's. k, the district's address and both counts are committed with the seeds. *Measurement (M5):*
     the search's k and each pair's count ratio are reported with the panel. **Pre-decided fallback:** a pair with no
     district within ± 20 % after k = 31 takes, of the 32 opened districts, the one nearest in count, and is marked
     `sizeMismatch` in the record; the ratio is printed on the sealed key and reported beside the verdict, and the pair
     is rated like any other.
3. **Matched pairs.** Each MFCG and FTG pair shows PLAT and one reference at the same rung, the same ground scale
   (metres per pixel) and the same frame. Against MFCG, PLAT's population is set so that its building count matches
   MFCG's at the matched size (sizes 40 / 80 / 130; §12.2's rate); against FTG, PLAT is generated at the capture's
   recorded population — near BIG_TOWN's 5 600 and BIG_CITY's 24 500 targets (METROPOLIS per D-31) — and its water
   setting, both from `ftg-captures.json` (2). Against NG, each side
   fills the same frame with its hood or district: NG's view rescales its hood to the frame (`docs/CONFIDENCE.md` NG C8),
   so the two sides' size is matched by the building count of (2), not by metres per pixel. PLAT draws `ink` against
   MFCG's default style, `lit` against FTG's default from M2b (`ink` at M1) and `hatched` against NG's (M5). Against
   FTG, the pair of each rung's first capture shows the extramural suburb at FTG's overview framing, both sides framed
   alike (VIS-3); the other two pairs use the matched frame.
4. **Blind order.** Generator-identifying furniture is removed from both sides (titles, legends, compasses, interface
   chrome) and the blind pairs are rendered without labels; labels are judged in a separate, non-blind pass. Left or right
   is a seeded coin per pair and the pair order is shuffled; the key is sealed — only its hash is committed — and opened
   after the answers.
5. **The rubric** — three questions per pair, each answered *left*, *right* or *same*, with an optional one-line note:
   (1) *Legibility:* which lets you read the town — its streets, walls and quarters — more easily at this size?
   (2) *Realism:* which looks more like a real medieval town? (3) *Charm:* which would you rather use for a game or a
   story?
6. **Pass rule.** For each reference and each question, PLAT is judged better or the same on at least two thirds
   (⌈2n / 3⌉ of n) of that reference's pairs, counted per group — against MFCG over the milestone's MFCG pairs (20 of
   30 when all three rungs are rated), against FTG per rung (2 of 3 per rung and question; VS3-6), against NG over its
   twenty pairs (14 of 20) — and in no rung (MFCG) or template (NG) is PLAT judged worse on every pair of that rung or
   template. A gating milestone whose rated run fails a question does not exit until a re-run passes or the owner
   accepts the failure in the record; the failing question and the owner's notes enter `known-defects.json`.
7. **The rater, and one rule for an unrated panel (NF-S2).** The owner is the declared rater; no seat rates on the
   owner's behalf. If the owner has not rated within seven days of the panel being ready, the build continues on the
   milestone's measured numbers and the milestone's D-5 status is recorded **provisional — not rated** in its `D5Record`
   and its `MilestoneRecord` (§13.3). A provisional status never claims what the panel gates: M2b's "the base at parity",
   M4's "mastered" and M5's stage-2 gate are claimed only by a rated pass or by an owner acceptance recorded in the
   `D5Record`. The same panel — the same seeds, re-rendered under the current output version — is offered again at every
   later milestone and, after M5, with every release, until it is rated; a later rated pass turns the status into
   *passed* with its date, and a later rated failure follows (6). The release notes state every provisional status
   (§14 `@plat/docs`). §16 states the same rule at each gating exit.
8. **The threshold panel and the `house` pick.** At the same sitting the owner sees the strips of §13.7 (renders of one
   seed at a threshold's number and one step either side) and picks one or answers *same*; the pick becomes the threshold
   with provenance "owner-eye ⟨milestone⟩". From M4 on, the sitting also shows the three candidate `house` sheets drafted
   at M3b (D-1) on the milestone's seeds. **Pre-decided outcome if no `house` pick is recorded by M4's exit:** candidate 1
   — the first sheet in the M3b draft order — ships as `house`, selectable and never the default; `ink` stays the
   default; the pick is offered again at every later sitting, and a later pick replaces `house`'s sheet as a
   style-version change (pixels only; no model digest moves).
9. **Record and clean room (NF-S1).** The panel is assembled research-side (`research/d5/`) from PNG exports that the
   product's CLI writes and from the reference images in `captures/`; the product repository never reads the captures
   (§17). The machine-readable record lives in the product, committed by the seat that ran the sitting, like
   `baselines.json` (§17.1 (4)) — numbers, hashes and answers only, no reference image or reference data:

   ```ts
   type D5Status = 'diagnostic' /* M1 */ | 'passed' | 'failed' | 'accepted' /* a failure or an unrated panel accepted by the owner in writing */ | 'provisional-not-rated';
   type D5Pair =                           // one per pair, in seeds.json and the record, in the order (2) lists them (VS3-6)
     | { reference: 'MFCG'; rung: Rung; water: Extract<WaterSetting, 'none'|'coast+river'>; i: number; platSeed: string; refSeed: string /* 1 … 2³¹ − 2 */ }
     | { reference: 'FTG'; rung: Extract<Rung, 'TOWN'|'CITY'>; capture: string /* its folder name under captures/ftg/ */; water: WaterSetting;
         population: number /* PLAT's requested population: its FtgCapture's, from ftg-captures.json (2), (3) */; populationSource: 'recorded'|'nominal';
         platSeed: string; suburbFrame: boolean /* the rung's first capture, (3) */ }
     | { reference: 'NG'; template: 'area'|'street'|'square'|'ring'; i: number; refSeed: string /* 1 … 2³¹ − 2 */; k: number /* the town of (2)'s search */;
         platSeed: string; population: number; district: string /* address id */; buildings: { ref: number; plat: number }; sizeMismatch: boolean };
   type FtgCapture = { capture: string; rung: Extract<Rung, 'TOWN'|'CITY'>; water: WaterSetting;   // plat/goldens/d5/<milestone>/ftg-captures.json: FtgCapture[], capture order (2)
     population: number /* the residents its decoded payload holds, or the size's nominal target */; populationSource: 'recorded'|'nominal' };   // research-side, numbers and ids only (VS4-4)
   interface D5Record {                    // plat/goldens/d5/<milestone>/record.json
     milestone: string; status: D5Status; date: string; offeredAgainAt: string[] /* later milestones and releases */;
     pairs: D5Pair[] /* every seed a Seed as its decimal string */;
     platImages: Hash128[] /* PNG hashes of PLAT's side, in pair order */; key: { commitment: Hash128; revealed?: string };
     answers: { pair: number /* index into pairs */; question: 'legibility'|'realism'|'charm'; answer: 'left'|'right'|'same'; note?: string }[];
     verdicts: { reference: 'MFCG'|'FTG'|'NG'; question: 'legibility'|'realism'|'charm'; group: 'all' | Rung /* FTG: per rung, (6) */;
       betterOrSame: number; pairs: number; needed: number /* ⌈2n / 3⌉ */; worseOnEveryPairInARungOrTemplate: boolean; pass: boolean }[];
     thresholdPicks: { letter: string; picked: number | 'same' }[]; houseSheet?: string; acceptance?: { by: 'owner'; text: string; date: string } }
   ```

   The research-side `docs/validation/d5/⟨milestone⟩.md` — the human-readable record with the reference images' hashes —
   is generated from this file (§13.3); no CI job reads it.

=== REPLACE §14 Package and module layout, key interfaces, dependency rules, extension points ===

## §14 Package and module layout, key interfaces, dependency rules, extension points

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r5); earlier revision fixall/integrate-r4, drafted by fixall/draft-scope-r4; earlier revision fixall/integrate-r3, fixall/draft-scope-r3

*In plain words.* The code is split into small packages with one-way dependencies: the geometry kernel knows nothing
about towns; the town model knows nothing about drawing; the drawing code knows nothing about how the town was made;
the app sits on top of a headless library. New looks, new layout templates, new export formats, new building
generators and new rule tables plug into named registries without touching the pipeline. All of it lives in one
repository, `plat/`, that never reads the research material (§17).

```
@plat/kernel   lattice, predicates, one arena per layer with the five levels as views (§2.2), role and owner tables, resolution of stored
               references, batched transactions, kernel invariants, arrangement booleans / buffers / bands (§3.7), the straight skeleton and
               its validator (§3.8), obb / hull / lir, delaunay (delaunator), poisson (the stamped ranked tiles' construction from a constant stream key, run at build time by `plat/tools/stamptiles/` and in a worker only as the fallback rebuild, §8.10), curves, index (flatbush / rbush /
               grid), noise, dmath (our fdlibm 5.3 port), rng (xoshiro + 128-bit keys; `rng.stream`, the one structured stream mixer of
               §6.1), concern registry
@plat/model    schema (zod), addresses and lineage (§6.3), layers, entity registry (CI path-coverage test), lifecycle, provenance, document,
               serialisation (.plat, CBOR twin), migrations, the Merkle model digest, the core statistics record, the control registry; the
               label records `LabelEntity` and `QuarterNode` (§9.1) and the shared view vocabulary `LodBand`, `Role`, `ZoomStop`
@plat/tables   rule tables, presets, style sheets, rung profiles (`ladder.json`, §1.1), the work-limit coefficients (`workLimits.json`,
               §5.1 (5)), setting packs (§10.4) and the default keymap as versioned JSON with provenance; loaders; the override layer
@plat/site     S1 terrain, hydrology, coast / lake / island outline routine, rivers by descent, islands, bank classes, water faces
@plat/content  S2 sequential roster, demand, government and religion rows, S7b / S10a allocation, S10b placement, households and people
               derivation, the relation-store schema, the economy and personality schema stubs (D-32), naming engine + grammar
@plat/layout   S3 siting, reservations and gate sites, S4 backbone, S5 growth and regimes, S6 grower / typing / fields / the quarter merge tree, S7
               fortification and water furniture, S7b claims, S8 infill (BentCutFabric), S9 corridors, S12a hinterland siting, the hinterland
               unit, S12b greenery; the StrategyRegistry and the ordering of registered StageDecls
@plat/plots    S10 granularity law, per-frontage regions, joins / splits / alleys, boundary treatments; S11 site plans, packer, heights,
               footprint templates; the BuildingGenerator interface (`outline` / `compose`) + OutlineBuildingGenerator; assignment +
               placement solver
@plat/hood     stage 2: RingFabric / SquareFabric / StreetFabric, the neighbourhood LOD workflow   [built after the base; the interface lives in @plat/layout]
@plat/labels   S13a names (every node of the quarter tree), candidates and spines; S13b view placement over the parameters the renderer
               passes in (`ObstacleSource`, `RoleIndex`, below) — it never imports render; the font-metrics reader; collision; furniture
               incl. the ruler and the emblem generator
@plat/render   S14 columnar display-list builder, paint programs, style sheets, LOD, the tile pyramid and the tile worker (which runs S13b
               by calling `@plat/labels`), backends (Canvas2D, SVG, print tiles; the WebGL2 tile compositor as a fallback), shadow pass,
               decoration stamps over the bundled stamp-tile asset (§8.10), live layers, the tile worker's queue of resumable raster jobs (§8.9)
@plat/edit     edit events, dry-run validation, undo and redo records, scoped regeneration, rebase, the dependency audit, event
               migrations, warp kernels
@plat/export   geojson, svg, png / tiles (streaming), vtt (Foundry-class scene JSON, dd2vtt), gltf / obj, cityjson, csv, permalinks
@plat/sim      optional, M4b: the relation store materialised, postings, occupancy and schedules, calendar, factions, events, economy,
               personality and the stat-block pack (D-32) — over @plat/content ids
@plat/api      the handle-based facade (§11.2), the generation worker host, the derivation pool, the host bridge (§11.3) and DocResolver
               (§11.5), the headless CLI
@plat/app      the reference UI (below)
@plat/docs     the user guide: generated reference pages from the control, entity and table registries plus written pages;
               `known-defects.json`; release notes generated from `plat/goldens/shifts/` and the milestone records (§13.3), the D-5
               statuses (§13.6) and the known defects
@plat/testkit  B-FUZZ generators (random and constructive), invariant runners, cost-model tests, the bench statistics and the `parity` CLI
               (reads `baselines/baselines.json` only), golden tooling with shift, cascade and milestone records and placement digests over
               `plat/goldens/` (§13.3) and the one `WaterSetting` type every record uses, the O9 (c) faithfulness campaign (§13.2), the boolean
               and buffer oracles (Clipper2-WASM in Node, polygon-clipping), the clean-room scanner (§17), the D-5 seed list by `H32` and
               the export command (`plat d5 seeds`, PNGs for §13.6), which read only the committed `ftg-captures.json` and `ng-counts.json` (§13.6 (2))
```

**Stage registrations whose declared I/O the round-2, round-3 and round-4 pipeline changed** (§4.1–§4.12 hold the definitions): S3 declares as
outputs the gate routes, the travel-cost field `T`, the stage-1 trace and gates, the carved water with its decks and the
decoration ponds, the map border (L1, §4.1), the harbour route (solved after its L0 batch), the forced harbour pick
(§4.2 S3 (4)) and the harbour gate of §4.2 S3 (7) where one is placed — a sealed town's, or the detour guard's; S1
declares the arena's outer ring (L0, §4.1) and every crossing site as a `Bridge` in state `site`, which S4 and S5 build
(§2.7, §4.2 S1 (5)); S6 the settlement perimeter and the `Seam` records (II.1), whose `SeamEdge.type` includes `reserve`
with its `reservation` id; S7b passes `claimSubFace` a face list (`within: FaceRef | FaceId[]`, §3.4); the castle
template row carries `townSide: 'dry_ditch' | 'none'` (§4.8); S12a no geometry (sites only); the hinterland unit
registers as a unit of S10 / S10b / S11 / S12b over the hinterland's blocks (§4.9); `SkyStrategy.place` takes S7b's sky
allocations (II.6); `BuildingInput.fixedWings`, `BaseWing.kind`, `BaseWing.corners` and `carryWings` are §2.6's, `SlotPlan` §2.5's;
`SettingPack.rosterPatch` is §10.4's.

**Dependency rules (enforced by lint):** `kernel ← model ← tables ← {site, content} ← layout ← plots ← labels ← render
← edit ← export ← api ← app`; **labels ← render** (N-22): the tile worker in `render` runs S13b from `labels`, and the
drawn symbol extents and the display-list index that S13b reads reach it only as the parameters `ObstacleSource` and
`RoleIndex` — interfaces `labels` declares and `render` implements — so `labels` never imports `render`, and the types
both use (`LodBand`, `Role`, `ZoomStop`, `LabelEntity`) come from `model`; `docs` reads the registries of `model` and `tables` only; `hood` depends on `layout` /
`plots` only through their interfaces; `sim` depends on `content` and `model` only; `render` never imports `layout`;
nothing depends on `app`; no package imports a backend it does not need; every adopted runtime library is imported in
exactly one adapter file of the one package that uses it; model packages obey §6.5's allowlist lint, which also scans
the vendored dependency sources; **so do `@plat/labels` and the renderer code that feeds S13b (VS2-4)** — every
implementation of `ObstacleSource` and `RoleIndex`, the functions they call, and the S14 builder code that writes the
display-list columns they read (`bbox`, the geometry ranges and `GeomTable`, `layer`, `z`, the symbol extents from the
style sheet's sizes). CI finds that code as the import closure of those implementations and of the column writers, from
the TypeScript program, so a module that joins it is linted without being listed; the rest of `@plat/render` stays
outside the lint (§6.5 (3), §13.3). No import, fixture or script path may resolve outside `plat/` (§17).

```ts
// @plat/layout — stages and strategies (StageDecl, NetworkStrategy and EnceinteStrategy are §4.12's)
interface Stage<I, O> extends StageDecl {
  version: string; lineageUnit: EntityKind /* whose lineage keys its draws, §6.3 */;
  workLimits: WorkLimits /* laws over the batch scope's population-derived counts, §5.1 (5); coefficients in workLimits.json */; budgetMs: Record<Rung, number> /* reporting only */;
  txForm: 'declared'|'callback' /* §3.3: declared op sets in canonical order, or callback sequences in issue order */;
  inputsOf(model: Model, scope: Scope): I; run(input: I, ctx: StageContext): KernelResult<O> }
type ConcernId = number & { readonly __brand: 'ConcernId' };   // u16 from the concern registry (§6.1), generated as typed constants — never a string
interface StreamOpts { reroll: number /* the derivation unit's reroll (§6.1) */; attempt: number /* ladder retry, ≤ the concern's registered cap: 3 for geometric ladders, 8 for naming (§6.1, §9.6) */;
  epoch: number; salt: number /* the concern's current salt from the recipe and the log's rerollLayer events; 0 for geometry concerns */ }
interface StageContext { doc: Document; plats: Record<string /* PlatKey */, Plat>;
  stream(concern: ConcernId, entity: Handle /* its entity key is cached in the arena beside its lineage hash (§6.1); TOWN_ROOT for town-level draws */, opts: StreamOpts): Stream;
  streamOpts(concern: ConcernId, entity: Handle, attempt?: number): StreamOpts /* the defaults: reroll from the entity's derivation unit, epoch from this context, salt from the document */;
  tables: TableView; rung: RungProfile /* §1.1 */; report: ReportSink; scope?: Scope; epoch: number }
// TOWN_ROOT: the handle of the town itself as a derivation unit; its entity key is the seed key mixed with the fixed town lineage (ground arena, no parent,
// creation epoch 0, index 0), so town-level draws — S0's features, terrain noise, the compass and emblem furniture (§9.5) — depend on the recipe alone, never on docId (NF-D12)
type Scope = { kind: 'all' } | { kind: 'entities'; ids: Id[] } | { kind: 'region'; ring: Polygon; key: PlatKey; level: Level } | { kind: 'epoch'; epoch: number };   // no raw face ids at the API
interface StrategyRegistry { terrain: Map<string, TerrainStrategy>; coast: Map<string, CoastStrategy>; river: Map<string, RiverStrategy>; manifest: Map<string, ManifestStrategy>;
  network: Map<string, NetworkStrategy>; enceinte: Map<string, EnceinteStrategy>; fabric: Map<string, FabricStrategy>; plots: Map<string, PlotStrategy>;
  sitePlan: Map<string, SitePlanStrategy>; building: Map<string, BuildingGenerator>; evolution: Map<string, EvolutionStrategy>; sky: Map<string, SkyStrategy>; sewer: Map<string, SewerStrategy> }
interface FabricStrategy  { partition(district: District, seam: SeamContract, ctx: DistrictContext, sc: StageContext, k: Kernel): KernelResult<{ blocks: Block[]; ways: Way[] }> }
interface PlotStrategy    { subdivide(block: Block, ctx: BlockContext, claims: Claim[], sc: StageContext, k: Kernel): KernelResult<{ plots: Plot[]; alleys: Way[]; residue: Residue[] }> }
interface SitePlanStrategy{ plan(plot: Plot, ctx: ContextVector, tables: TableView, rng: Stream, k: Kernel): KernelResult<SitePlan> }
interface GranularityLaw  { bands(ctx: ContextVector, rung: RungProfile): { frontageM: [number, number]; depthM: [number, number]; areaM2: [number, number]; joinMax: number; vacancyRunShare: number } }   // the deep-interior choice is S8's (§4.6)
// @plat/kernel — the façade the stages see, and the one stream mixer every reader uses
interface Kernel { plat(key: PlatKey): Plat; view(key: PlatKey, level: Level): LevelView; resolve(ref: GeomRef, key: PlatKey): Resolved; geom: GeomOps; index: SpatialIndex;
  tx<T>(tx: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<T>   // exactly one form: tx.ops (declared) or fn (callback), §3.3
}   // KernelTx (§3.3) carries `stage` and `rederivesFrom`; the services resolveVertexAt, signature and sampleProfile are §3.4's
interface Rng { stream(entityKey: Hash128, stage: number /* u16 stage id; STAGE_VIEW = 0xffff for paint programs and furniture */, concern: ConcernId, opts: StreamOpts): Stream }
// StageContext.stream is rng.stream with the calling stage's id and the entity's cached key; paint programs and furniture call rng.stream with STAGE_VIEW.
// No string reaches the mixer; the textual form of a key (§6.1) is rendered for reports only, and a lint rejects a stream call whose concern is not a ConcernId.
// @plat/content — a host's own roster or people; registered only after §11.4's double-run check, its outputs recorded in the document
interface ContentProvider { id: string; version: string; roster(pop: number, character: CharacterVector, tables: TableView, rng: Stream): Roster;
  site(roster: Roster, plots: Plot[], ctx: SitingContext, rng: Stream): SitingResult; people(household: Id, rng: Stream): Person[] }
// @plat/plots — the stage-3 hook: BuildingGenerator { outline(…); compose(…, lod) } is §2.6's
// @plat/labels — S13b's inputs from the renderer, declared here and implemented by @plat/render (labels never imports render)
interface ObstacleSource { protectedExtents(stop: ZoomStop, box: Box): { box: Box; entity: Handle; kind: 'gate'|'castle'|'plaza'|'bridge'|'wall' }[] /* drawn symbol extents at the stop, §9.2 */;
  coverage(stop: ZoomStop, box: Box): { labels: number; protected: number; buildings: number; ways: number; water: number } /* mark cover, for furniture placement, §9.5 */ }
interface RoleIndex { roleAt(p: Point, band: LodBand): Role /* the area mark under a point: halos, §9.4 */; snap(p: Point, radiusPx: number, stop: ZoomStop): Point | null /* the measure tool, §9.5 */ }
// both are implemented by @plat/render over a display list: in the tile worker for S13b, furniture placement and the ruler (the main thread reaches coverage and snap
// through §8.9's queries), in the generation worker over an SVG export's transient list, and in the tile worker over a raster export's (§11.1); every implementation is under §6.5's allowlist lint (VS2-4)
interface LabelPlacer { begin(stop: ZoomStop, labels: LabelEntity[], obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementJob; place(stop: ZoomStop, labels: LabelEntity[], obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementSet /* begin(…) then step(Infinity) */ }   // §9.2; view data
interface PlacementJob { step(deadlineMs: number): boolean /* runs units on from where it stopped; returns after the first unit that ends deadlineMs or more after the call began; true when complete */; result(): PlacementSet; cancel(): void; readonly spentMs: number }   // resumable, so the tile worker serves queries and view work between units (§8.9, §9.2; NR4-2)
// @plat/model — LabelEntity, QuarterNode: §9.1 (model records written by S13a); LodBand, Role, ZoomStop: the shared view vocabulary (§8.1, §8.2, §8.8)
// @plat/render — DisplayList, MarkTable, DisplayDelta, DisplayListBuilder: §8.1; StyleSheet, Symbolisation, OrderSlot, LiveLayerProvider: §8.2; LayerSpec: §8.4;
//                backends and threads: §8.9
type TileAddress = { stop: number; i: number; j: number; dpr: number };
interface TileRasterOpts { layers: Layer[]; tileLayer: 'base'|'under'|'shadow'|'over'; shadows: 'off'|'drop'|'prism' /* §8.2's StyleSheet.shadows.projected */; sun?: { azimuthCdeg: number; altitudeCdeg: number }; tier: 'low'|'mid'|'high'; dpr: number }
interface TileBackend   { begin(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: TileRasterOpts): RasterJob }   // fixes the tile's draw sequence; draws nothing (§8.9)
interface RasterJob     { step(deadlineMs: number): boolean /* runs on from where it stopped; returns after the first draw call that ends deadlineMs or more after the call began; true when complete */; finish(): ImageBitmap; cancel(): void; readonly spentMs: number }   // resumable, so the tile worker serves queries and view work between steps (§8.9; NR3-2)
interface VectorBackend { write(list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; band: LodBand; frame: Box }): string }
// @plat/edit
interface EditEngine { apply(doc: Document, e: EditEvent): ApplyResult /* Ok | Conflict(actions) | Confirm(token, fates, renames) — an event carrying fates and renames commits only when a fresh dry run computes the same fates and renames (§11.2; VD4-4) */;
  undo(doc: Document, session: string, of?: number): ApplyResult /* appends an undo event for the session, §7.4; `of` only for the owner role */;
  redo(doc: Document, session: string): ApplyResult /* appends a redo event */;
  replay(base: Base, log: EditEvent[], opts?: { toSeq?: number; mode: 'interactive'|'replay' }): Model; migrate(doc: Document, to: string): { doc: Document; diff: Diff };
  rebase(doc: Document, reason: RebaseReason, at?: number /* default: the log head; h₀ — the decoded snapshot's model.seq — when the saved town is kept after
    edits made during load verification (§2.9 step 4, §7.1): the only two states the engine holds materialised (VD3-7) */): ApplyResult /* as apply, undo and
    redo report: 'ok' when the rebase event is appended at the head; any other `at` returns { status: 'conflict', actions: [{ kind: 'invalid', message:
    'E_REBASE_AT: at must be the log head or h₀' }] }, appends nothing and rebases nothing, on every host alike (§7.1, §11.2; VS4-2) */ }
// @plat/api — PlatApi and DocHandle: §11.2; BridgeTransport and BridgeMessage: §11.3; DocResolver: §11.5
// @plat/export
interface Exporter<Opts> { id: string; write(doc: Document, list: DisplayList | null, opts: Opts): Promise<Uint8Array | string> }
  /* runs in the generation worker (§11.1): list = the transient export list for SVG and for raster formats (a raster format transfers it to the tile worker with its
     raster-export request, §8.9, §11.1); null for model formats (GeoJSON, glTF / OBJ, CityJSON, CSV, the document forms) */
// @plat/testkit — Baseline, ParityReport: §13.5; ShiftRecord, CascadeRecord, MilestoneRecord, WaterSetting: §13.3; D5Record, D5Pair, H32: §13.6; CorpusAdapter, CalibrationRun: §13.9
```

**`@plat/app`, the reference UI.** One click; the basic panel (≤ 12 controls, §7.8) and the advanced panel; the report
panel; the editing tools (draw, move, warp, brushes, the four actions, lock, assign); the tables editor and the style
dialog; the ruler (§9.5); the gazetteer and the "features in view" list; context help; the family-tree view (module).

* **Input scheme (COV-MFCG-L08)** — MFCG's idiom kept and stated, held in `keymap.json` (data, editable, versioned like
  every table). Pointer: *click* selects and opens the context panel; *double-click* zooms to the entity's band (a
  district fills the view — MFCG's district view); *shift+click* is New random on the entity's scope, keeping its kind
  (MFCG's ward reroll); *ctrl / cmd+click* resets the entity to generated (one logged event that applies the inverses of
  the entity's own edits); *alt+click* toggles its lock; right-click or long-press opens the context actions (§7.4);
  dragging a selected vertex is `moveVertex`; wheel or pinch zooms; dragging empty map pans. Keys while the map has focus:
  **A** alleys at the city band, **B** buildings shown / hidden, **D** grid, **N** hairline mode, **L** labels, **T**
  trees, **M** ruler, **W** warp tool (then **1–8** choose the kernel), **G** gazetteer, **F** features in view, **R** New
  random on the selection, **Esc** cancel, **ctrl / cmd+Z** undo, **ctrl / cmd+shift+Z** redo, **+ / −** zoom, **0** fit,
  **?** the keymap overlay. Bindings are active only while the map region has focus; an embedding host can switch global
  bindings off; every bound action is also on a menu or a button.
* **Accessibility (COV-FTG-A24)** — the app's chrome (panels, dialogs, menus, toolbars, the report, the gazetteer, the
  tables editor) meets WCAG 2.2 level AA. Landmarks: header (title and seed), navigation (panels), main (the map region,
  `role="application"` with an accessible name and a live description of the view — rung, band, the district under the
  pointer or the focused entity), complementary (report, gazetteer). Every control's accessible name and description come
  from the control registry (its label and documentation anchor); every icon button has a text label. Every action is
  reachable by keyboard in a focus order that follows the layout, with visible focus and no keyboard trap; the map region
  takes arrow-key panning and **+ / −** zoom. **The non-visual route to the map** is the gazetteer (list and search over
  districts, quarters, streets, buildings, institutions and pinned people through `query`) and the "features in view" list
  (the entities whose marks are visible, grouped by kind, ordered by distance from the view centre, each announcing its
  name, kind and district); selecting in either list selects on the map and the reverse. UI text contrast ≥ 4.5 : 1 and
  UI components ≥ 3 : 1 (the map follows §8.2's contrast matrix); the reduced-motion preference turns off animated zoom;
  the UI scales 100–200 % without loss. Tests: §13.4.
* **Context help and the guide (COV-FTG-A25)** — every control and panel carries a help link to its anchor in
  `@plat/docs` (§7.8's documentation anchor), opened in a side panel. The guide's reference pages are generated from the
  control registry (label, range, unit, output metric, consuming stage, locality class), the entity registry and the table
  schemas (columns, units, provenance); written pages cover getting started, each panel, each edit action, each export and
  the tables editor. Release notes are generated per release from the shift records (§13.3) and `known-defects.json`
  (id, symptom, affected rungs and presets, workaround, since, fixed-in). Tests: §13.2.
* **Family-tree view (COV-FTG-C11; module tier, M4b)** — reads `query(h, { kind: 'relations', person, up: n, down: m })`
  over the relation store (§10.3): generations in rows by birth epoch, partners side by side and children below;
  branches beyond two generations elided into a count that expands on click; re-root on any person; opening a person
  never pins it (§10.3); keyboard-operable as a tree grid.

**Extension points:** every `Map` in `StrategyRegistry` (stage 2 registers the three template fabrics; a village product
registers a tracker `NetworkStrategy`, a palisade `EnceinteStrategy`, a density `StageDecl` and a "houses along ways"
`FabricStrategy`; the owner-staged layers register `SkyStrategy` and `SewerStrategy`; the evolution engine an
`EvolutionStrategy`); `BuildingGenerator` (stage 3); `StageDecl` registration by declared inputs and outputs; the
`PaintProgram`, `StyleSheet` and `LiveLayerProvider` registries; `Exporter`s; rule tables, presets, rung profiles,
setting packs and keymaps (data); `EditEvent` kinds with migrations; `LayerSpec`s; `ContentProvider` (host rosters, after
the double-run check); `BridgeTransport` and `DocResolver`; the `PlacementSolver`; `CorpusAdapter` (§13.9).

=== REPLACE §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2 ===

## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r5); earlier revision fixall/integrate-r4, drafted by fixall/draft-scope-r4; earlier revision fixall/integrate-r3, fixall/draft-scope-r3

*In plain words.* Before building anything we measure what we still need from the recordings and take a few small new
ones (FTG towns at two sizes, MFCG towns at five seeds per size), then build the riskiest pieces first as short spikes
with pass/fail numbers: the geometry kernel, the bent cut, the fused street layout with its speed gate, and the
determinism machinery. The first real milestone (M1) is a town the owner can look at next to MFCG and FTG. Because the
owner ranks editability first, editing comes next (M2a), before the second look and the rest of parity (M2b). Then full
editing and the API (M3a), the exports and the should-have extras (M3b), hardening (M4), the simulation module (M4b) and
stage 2 (M5). Effort is stated honestly as a range with its basis: about 153–204 expert person-weeks. The subjects the
owner's roadmap puts later are listed at the end with their hooks; nothing else is out of scope.

Person-weeks are expert estimates (PLAUSIBLE) for two implementers plus a verifier seat — about 77–102 calendar weeks
at that staffing; staffing per the owner (architecture and rulings on Fable seats; build, verify and measure on Opus
seats). Every milestone ends on executed evidence, never on intention, and every exit writes its `MilestoneRecord`
with the milestone's declared shifts and fails on an undeclared one (§13.3). **One rule for the owner's panel at every
gating exit (NF-S2):** M2b ("the base at parity"), M4 ("mastered") and M5 (the stage-2 gate) claim their D-5 verdict only
by a rated pass of §13.6's protocol or by the owner's acceptance recorded in the `D5Record`; if the owner has not rated
within seven days, the build continues on the measured numbers, the milestone's D-5 status is *provisional — not
rated*, the claim is not made, and the panel is offered again at every later milestone and, after M5, with every release
until it is rated (§13.6 (7)).

| milestone | content | exit criteria (executed, not asserted) | est. |
|---|---|---|---|
| **M-1 — calibration and the clean-room inputs** | `docs/CONFIDENCE.md` §6 **#5** FTG face recovery (block sizes inside rings, dividing-road position vs OBB, plot depth and frontage, FTG's plot share of land) and **#10** NG adjacent-footprint pairing; **#2** the NG size sweep; the NG baselines of `docs/IMPROVEMENTS.md` §7.2 (detour index, 4-way share, cycles per km², plot minimum-width distribution, streetwall gap per 100 m); NG's hollow-block frequency and MFCG's inner-lot removal (IMP-8); **the MFCG sweep at five seeds per matched size** (40 / 80 / 130, plain options, plus a river-and-coast variant) with lot-orientation coherence, wall alignment, walled and ribbon shares, district areas, gates, towers, castle and plaza, and — every ⟨M-1⟩ number of §13.5 (NF-S5) — streetwall continuity on dense frontages, lots per block, T / Y share, intramural dead ends, blocks per ha, inner-lot removal and street-edge recoverability on its plain renders (the metric of §8.5, implemented research-side and cross-checked against the product's implementation on M1's golden renders within 0.01) (MFP-2, MFP-6, MFP-8); **FTG captures at BIG_TOWN and BIG_CITY**, three of each — one with FTG's water options nearest to `none` and two nearest to `coast+river`, each capture's id (its folder name), `WaterSetting` and recorded population — the residents its decoded payload holds — recorded in its README for §13.6 (2)'s pairs (VS3-6, VS4-4) — over six days on the free daily allowance, decoded with the existing tools (FTG-16); outline anisotropy and turning per 100 m after 10 m resampling on every FTG payload (FTG-5, FTG-15, NF-S3); NG block counts per template at `medium` from the vertex captures; the variety dispersions of MFCG and FTG (IMP-12); **`baselines.json`** generated research-side with `referenceBuild` on every row and committed into `plat/`; **the sanitised implementer digest**, written by one seat and checked by another; the hashed content deny-list; `CLEAN-ROOM.md`'s seat ledger (IMP-1) | every §13.5 baseline row present with its provenance — or, for an ⟨M-1⟩ number M-1 could not measure, the row made descriptive and entered in `known-defects.json` by §13.5's ⟨M-1⟩ rule — and every band computed by the band rule; a `docs/calibration/` record per experiment; FTG's six captures decoded, each with its resident count or §13.6 (2)'s nominal fallback, marked; the digest checker's report shows 0 code excerpts, 0 reference word lists, palettes or tables and 0 deny-list hits | 2–3 pw |
| **M0 — kernel, bent cut, fusion, determinism and site spikes** (risk retirement) | (a) `@plat/kernel`: lattice, predicates, one arena per layer with the levels as views, role and owner tables and reference resolution, attraction and contact semantics, batched transactions with stage-end index partitions, booleans / buffers / bands on the arrangement with the CI oracles, OBB / LIR, snap rounding, the straight skeleton with its validator and exact OBB roofs; (b) the **bent-cut transaction** with the hole slit, calibrated on NG's vertex captures; (c) the **fused-layout spike**: S4 routing + S5 growth + S8 infill on a flat synthetic site at CITY face counts; (d) the **determinism spike**: structured stream keys, lineage-hash minting, the Merkle digest, `dmath`, the time-dilation shim, the allowlist lint with its vendored scan; (e) the **site-and-fields spike**: S1 + S4 + S6 with §12.4's mechanisms; (f) the CI tiers timed on the runner (§13.8) | (a) B-FUZZ 0 crashes / hangs / invalid outputs on 10⁶ random inputs per primitive and on the whole constructive set (§13.1); insert + snap + attract + re-walk ≤ 8 µs per proposal, or §3.7's miss rule applied before M1 (the accelerator, or a declared budget amendment); S11's geometry share ≤ 3 µs per plot median; §3.7's bars (i)–(ii) and §3.8's bar, with their pre-decided fallbacks applied before M1 if a bar fails; op-permutation determinism for declared batches and issue-order determinism for callback-form stages (§3.3); (b) start position σ within ± 0.02 of 0.066 (plain faces) and 0.098 (ring faces), corner within 0.10 of mid-course on ≥ 80 %, arrival ≥ 85° on ≥ 95 %, block-area and cut-length KS by the band rule — on curved, round-joined, triangular, C-shaped and holed faces; (c) **the fusion gate**: S4 + S5 + S8 ≤ 100 ms at CITY, block-area and junction-degree distributions inside the NG bands on the same district shapes and the MFCG street-signature rows of §13.5, no turn cliff, 0 whole-map restarts on 1 000 seeds — if it fails, §4.4's fallback applies before M1; (d) digests identical on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off, 100 seeds; every stream key distinct; ≤ 0.1 µs per structured key; digest maintenance ≤ 5 % of stage time and a full recompute ≤ 150 ms at CITY; (e) S1 + S4 + S6 ≤ 50 ms at CITY, or §12.4's coarsening fallback applied and re-measured; (f) each CI tier inside its budget, or §13.8's fallback applied | 9–12 pw |
| **M1 — a viewable MFCG/FTG-class town** (the first product milestone) | S0–S11 with row / detached / hovel site plans and heights (compounds in M2b), at all three rungs — METROPOLIS is a `ladder.json` row on the one pipeline, so the goldens, B-CITY, the determinism tests and the diagnostic panel include it from M1, and M2b measures and tunes it (VS2-2); S3 reservations and gate sites; S5 with each trace before its stage's growth; S7 walls / gates / towers / castle; the eager allocation; S13a names with the quarter merge tree (quarter labels at the city band, district names at the district band); the `ink` preset at the city and district bands on the Canvas2D tile pyramid (its close-up and building bands at M2b); SVG / PNG export; **the `.plat` writer and reader for generated towns** (§2.9, §3.9; VS4-3) — the manifest, the content-addressed chunks with §3.9's geometry layout, gzip compression and an empty log, since a generated town has no events — which the document-size test and the *preview* documents need and M2a's log builds on: a saved town opens by decoding its snapshot and comparing its recomputed root with `model.digest` (M0's full recomputation), a differing root loading as a corrupt cache by regeneration from the recipe (§2.9 step 3 and step 5); the records digest joins the snapshot at M2a, whose reader opens an M1 document, which lacks it, by the same regeneration; permalinks marked *preview* (§13.3); the report panel with delivery tiers; the B-CITY harness in the PR and nightly tiers; **the output-version stamp, the shift, cascade and milestone records in `plat/goldens/`, and the stage-isolated golden tooling with the per-stop placement digests (LC-19, NF-S1, N-24; §13.3)**; `SeamContract` on every district; the derivation pool; the milestone-1 gate list of `docs/IMPROVEMENTS.md` §5.1 (O2, O6, O3, O11 schema + PNG / SVG, O1, O4, O5, O18 with a flat field, O17 basic, O8 basic, O12 ink, O16-core). **Named work items (IMP-2):** the M1 content, authored fresh — roster rows for the M1 classes, households, the naming grammar and word lists, the era table, the `ink` palette (≈ 3–4 pw of the estimate); the app shell — one click, basic panel, report, gazetteer and "features in view", the keymap, the accessibility contract, context-help skeleton (≈ 2–3 pw) | the **D-5 protocol's first run** (diagnostic, §13.6) with its threshold panel; on B-CITY-lite (200 seeds × 4 water settings): 0 tier-6 omissions of requested features and degraded ≤ 5 %, plots with access 100 %, population ± 5 %; **the fusion gate re-run on B-CITY-lite's river, coast and relief configurations with the reordered stages (IMP-13)** — pre-decided fallbacks: on time, §4.4's class-boundary move (growth stops at district-scale secondaries everywhere; lanes infill-only), then the CITY model budget re-declared at the measured p95 as a D-18 amendment for the owner's veto; on statistics, the infill band table gains a slope class (face mean slope < 5 %, 5–15 %, > 15 %) calibrated on NG's faces, and the gate re-runs; model within §12.3 at TOWN and CITY with the pool measurement (the pool primary at each size where §12.3's rule keeps it — its p95 within the pooled law + 10 % at the band's bottom, target and top, below a single worker's on the same generations, digests identical for pool sizes 0–3 on 200 seeds — with that rule's pre-decided outcomes); the label-composition measurement (§8.9); the figure-ground metrics against MFCG's M-1 recoverability, contrast matrix, `ink` symbolisation census, label floors and counts and hairline fidelity (§8.3, §8.5, §9.4); B-ZOOM's role continuity across `ink`'s city → district switch; placement digests identical on Node x86 and in the nightly five-engine run; the walled share and extramural ribbon share in MFCG's band (§13.5); the between-seed dispersion against MFCG's and FTG's (IMP-12); the B-EDIT-lite identity fixtures (≥ 99.9 %); the document-size test (≤ 320 B per building at CITY) and the generated-town round trip — save → load → save byte-identical over the canonical form on B-CITY-lite's towns (§2.9; VS4-3); the control-continuity sweep; the parity report by the band rule; every district carries a complete `SeamContract`; the scripted tasks of §13.4 that M1 supports, keyboard-only included; the first-map, settle and re-raster runs at TOWN and CITY band bottom / default / top (§12.5); the model max clause at TOWN and CITY, judged on confirmed outliers (§12.3); the furniture and snap query round trip (§8.9); the sliced-raster census rows (§8.3); the pan-and-zoom run during an A2 export (§8.9, §12.7); the stamp-tile asset load (§8.10, §12.7); the stamp tiles' seam check (§8.3; NR4-1); the sliced-placement census row, and the export's placement stepped in class 4 during the pan-and-zoom export run (§8.3, §8.9; NR4-2); the pin-pass B-ZOOM fixture (§9.2); the harbour pick's measurement on B-CITY walled coastal seeds — p99 of harbour route ÷ the least-cost path with the wall ignored ≤ 1.5, and if it fails the detour guard becomes the default (§4.2 S3 (4), (7)); the SVG export's transient-list peak (§12.8); memory within §12.8's lines at TOWN and CITY on generated towns at pool sizes 0 and 3 (the load-verification case is M2a's; VS3-1); the font-feature test (§9.2); the SVG and PNG export budgets (§12.7) | 35–46 pw |
| **M2a — the editing core** (D-7: before the second preset) | the log and the one replay fold over M1's document format; locks and pins; scoped faithful regeneration; the named actions (Regenerate keep settings, Adjust with the fate report, New random, Same kind new seed); undo / redo as logged events with per-session stacks, the independence check and unshared truncation (§7.4); per-document sessions (§7.4); load verification over M1's reader — the load's recomputation of the decoded state's own digest and of its records digest (VD4-6) before its first edit, then edits applied at once during load verification with both mismatch choices (§2.9 steps 3–4); replay with S13a per event (§7.3); dry-run validation with conflicts returned as actions; `setAttr`, `delete`, `merge`, `split`, `join`; the app's selection, context panel, lock and the keymap's pointer idioms; B-EDIT at 10³ (PR) and 10⁴ (nightly) with the oracle once per sequence | O9 (a), (b), (d); the oracle's (i)–(iii) green on 10⁴ sequences; a CITY district undo ≤ 30 ms; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to CITY (METROPOLIS joins at M2b, which measures it; NF-S6); "recover from a mistaken regenerate" in one undo; the verification reference mix within §12.6's V + 10 %; open-to-editable within T(B) at TOWN and CITY, and the corrupt-cache fixture — a snapshot with one moved footprint and an unchanged `model.digest` reported and loaded by replay, never verified (§2.9 step 3; VD3-1); the records-mismatch fixture and the §6.2 (iii) keep-and-save gating fixture (VD4-6, VD4-2); on the reference 300-edit CITY document, an edit made 100 ms after the state becomes editable applies within its §12.6 cost + 10 ms with pool size ≥ 1 (§2.9 step 3); memory at CITY while that document is load-verified, with a district regeneration and a Re-derive from S3 applied during it, within §12.8's line at pool sizes 0 and 3 — or §12.8's fallbacks applied (§12.8; VS3-1, VD3-5); the rebased-document size test — a CITY document rebased by keeping the saved town, after 20 edits, ≤ 1.25 × the unrebased document, or §2.9's block-group fallback applied (§2.9 size budget; VD2-9, S4-2) | 9–12 pw |
| **M2b — the base at parity** | the prosperity field with drivers and the brush; the full granularity law with the rung modifiers (§1.1) — joins, splits, alleys, back lanes, the deep-interior shares; S10b placement from the roster; compound site plans with the packer; roofs; S12 hinterland presets, greenery rules, outskirts and the suburb regime; harbour, bridges, canals; O13-core street names; O14-core; the bench statistics; **`lit` on Canvas2D at all four bands** with our procedural texture set (≈ 1 pw); **`ink`'s neighbourhood close-up and building band** with the roofs — ridge hairlines by the roof construction, tapered ticks, prism shadows when shadows are on, cobbles as ink stipple, pins as ink symbols, every named way labelled; wings as ink outlines (§8.2; N-23); the relief tier; METROPOLIS measured and tuned, with the single-thread METROPOLIS measurement (§4.1), the compositor measurement (§8.9) and the projected-shadow budget measurement (§8.4). **Named work item:** the rest of the base content — the remaining roster classes, institutions, government and religion rows, the greenery and hinterland tables, the `lit` palette (≈ 4–6 pw) | every must-have letter run on B-CITY (1 000 seeds) against its §13.5 or §13.7 band — no letter without a number; every §13.7 threshold due at M2b confirmed or its fallback applied, O19 (g) city-zoom greenery for `ink` and `lit` among them; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to METROPOLIS (NF-S6); B-ZOOM role continuity across every band switch of `ink` and `lit` (N-23); O17 / O18 / O19 runs; roster placed 100 %; site plans ≤ 5 µs per plot median; 300 dpi export; ≥ 60 fps at 40 k buildings; METROPOLIS first-map runs at 30 000 / 50 000 / 120 000 people (§12.5); the pool rule, the model max clause and the export-time peak at METROPOLIS (§12.3, §12.8); the query round trip at METROPOLIS (§8.9); open-to-editable within T(B) and memory within §12.8's line at METROPOLIS (§2.9 step 3, §12.8); the moving-sun step budget (§8.4); the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7; NR4-5); the METROPOLIS SVG budget (§12.7); the rung-profile orderings of §1.1; **the D-5 protocol passes** against MFCG (`ink`) and FTG (`lit`) at TOWN and CITY (METROPOLIS per D-31), or the owner's acceptance is recorded — unrated: M2b's status is *provisional — not rated* and "the base at parity" is not claimed (the rule above) | 33–42 pw |
| **M3a — full editing, migration and the API** | warp kernels with whole-step validation; drawn constraints and the "rebuild around my drawings" rebase; assignments and the placement solver; rule-table overrides, the preference layer and the tables editor; migration and upgrade as undoable events with their diff; rebase; **retention of output versions N−1 and N−2** (§6.4); the dependency audit with the locality oracle at full scale; B-EDIT 10⁵ in the milestone tier; the handle-based embedding API (§11.2); the host bridge and `DocResolver` (§11.3, §11.5); S1's water and terrain operators with re-sited crossings and exact re-basing (§7.3), the water operator in §4.11's order with course-knot edits (§7.3 (b)); point-anchored records under a warp (§7.4); the carve edit with §4.11's way rule and the kernel's clear regions (§3.3); the `packs` block and the link refusal rules (§2.9, §6.4); the naming-input re-draws on table, pack and upgrade edits (§6.3 case (4)) with their renames stored in the events and carried by `confirm` (VD4-4), the dormant naming record of a protected name (VD4-3) and field slices (VD4-5); the version-pinned checks of a rebased base across an upgrade and of a frozen view (VD4-1); packs held by a saved redo stack and packs a new version stops shipping (VD4-7, VD4-9); GeoJSON; the app's drawing, warp, brush, assignment and tables-editor tools | O9 (c) faithfulness — Regenerate (keep settings) byte-identical, and §13.2's rank campaign for New random passing in the nightly tier (a failed campaign is re-run once with the next seed; a second failure is a regeneration defect, fixed before exit; IMP-7) — (e) and (f), the thirteen MFCG asks as scripted scenarios; §7.3 (7)(v)'s coarse-edit assertions on B-EDIT's terrain and water sequences; the clear-region fixtures of §3.3 (a canal across a CITY district, a canal across a walled CITY's wall between two towers, an outer moat at S5a, a course-knot move and a river move across a street grid: every face outside the edit's footprint (§4.11) byte-identical except the seam exception at its boundary, attraction onto exactly the prepared vertices and no other contact), or §3.3's pre-decided fallback applied before exit; B-EDIT 0 planarity violations and 0 lost faces over 10⁵ sequences; O2 (c)'s carry-over rates, or §13.7's fallback; goldens replay under N−1 and N−2, each retained version ≤ 150 KB gzipped; the bridge convergence test (a host and three headless clients, 1 000 interleaved random events — undo and redo from every client and one owner undo through a chain among them, and one forced load mismatch settled by an owner's keep of the saved town while two editors edit on the replayed town — one digest, 0 lost accepted events; §11.3, §2.9 step 4); the naming-input fixtures — a selected user corpus and an edited naming row rename exactly the unedited names citing the changed slices, listed for confirmation, in a fresh and in a rebased document (§6.3 case (4), §13.2); a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them; a `keptSnapshot`-rebased town's link is refused (VD4-8); a kept-and-rebased CITY document upgraded across a field-driver change opens editable and replays to the session's digest, and a frozen o(N−3) fixture shows no mismatch message (VD4-1); a document using a pack the new version stops shipping reopens after `from` leaves the window (VD4-9); GeoJSON loads in QGIS with districts; the GeoJSON with trees byte-identical on the five engines (§13.3; NR4-3); the warp cost measurement — a 150 m brush over a CITY core on B-CITY-lite seeds, Apply within §12.6's budget with §2.6's wing carry and check counted, or §12.6's pre-decided fallback (one check after the final step, F-REDERIVE for a failure) applied before exit (NP4-6) | 16–20 pw |
| **M3b — exports, forms and the should-have tiers** | VTT (Foundry-class scene JSON and dd2vtt, one scene per layer); glTF / OBJ; CityJSON; the CBOR twin with its decoder; S0–S4 proxy thumbnails; O10 intent expansion and the forms catalogue with its classifier; O13 full (path labels, addresses, the annotation layer and legend sheet); O14 full (rings, presets, wildness, feasibility); O16 full (drafts, discoverable export, the responsive editor); O12 extras (the low tier); the `@plat/docs` guide and generated release notes; three candidate `house` style sheets (D-1); the ink-family variants `parchment`, `bw-print` and `night` at all four bands (the `night` sheet's occupancy-driven window lights arrive with the module at M4b); random styles with the bounded repair (§8.2) | VTT import with no manual steps; every format validator green; scripted intent tasks 10 / 10; the forms classifier ≥ 90 %; six thumbnails < 1 s at TOWN; every scripted task of §13.4; monotonicity sweeps green at every rung; documentation coverage 100 %; B-ZOOM role continuity across every band switch of the ink-family variants; the random-style shipped-palette fallback ≤ 2 % of 10 000 draws per family (§8.2); the anchored CityJSON file validated with PLAT's extension, or the sidecar fallback taken and reported (§11.1) | 16–21 pw |
| **M4 — hardening and the incremental path** | the performance tiers and the low-end tier measured on the named device (§12.1); the table-provenance audit; **the one incremental path: add a growth stage to an existing town** (surviving entities byte-identical, new entities on epoch components, wall → ring road as `retypeEdges`); output version 1 fixed, ending the *preview* label; release notes naming known defects; **the D-5 protocol's "mastered" run**, with the owner's pick among the three `house` sheets (no pick by the exit: candidate 1 ships as `house`, `ink` stays the default and the pick is offered again, §13.6 (8)) | nightly cross-platform goldens green for two weeks; the epoch test (0 re-rolled survivors); a document with interleaved edits and two epochs replays to the session digest; the conversion test; the 20-epoch heap and document budgets; METROPOLIS first map within §12.5's law at 30 000, 50 000 and 120 000 people (under 1 s up to ≈ 14 200 buildings); "mastered" claimed only when the D-5 protocol passes, rated, at all three rungs (METROPOLIS per D-31) or the owner's acceptance is recorded — unrated: M4 closes with "mastered" *provisional — not rated* and the panel offered again at M4b, M5 and every release (the rule above); every table value replaceable with provenance | 11–16 pw |
| **M4b — the content module `@plat/sim`** (after the relation store's schema, which is in the base from M1) | the relation store materialised (family units, relations, memberships); postings and re-matching; occupancy and schedules as a query; the calendar; factions with roles, goals and reconciliation; religions' meetings; events as templates; the economy and personality content of D-32 with its authored tables; the family-tree view | O7's module letters (every person a work or role 100 %; the same person on every view; `whereIs` deterministic; stored bytes per 10 k population reported); one hour for 50 000 people ≤ 50 ms; a scoped regeneration changes 0 relations outside its scope; the family-tree view keyboard-operable and pins nothing | 8–14 pw |
| **M5 — stage 2: neighbourhood composition** | `@plat/hood`: `RingFabric`, `SquareFabric`, `StreetFabric`; the block-content dispatch table and pins; the `hatched` family at all four bands — city (masses in the lit roof tone, ground = paper, the street stripe, wood fills), district (two-tone roofs by `fakeGablePerWing`), neighbourhood (the render tier: tapered hatch, prism shadows, cobbles, chimneys, wells, lobed depth-sorted trees, hood title) and building (per-wing hatching) (§8.2; N-23); the close-up workflow on any district and on an arbitrary boundary (sky context); the "same kind, new seed" per-district workflow with locks | every district of every B-CITY city opens as an NG-class close-up; portals connected 100 %; shared-edge geometry byte-equal across adjacent neighbourhoods (Hausdorff 0); per-district regeneration ≤ 30 ms and open ≤ NG's 10–96 ms at comparable counts; footprint hash identical to city LOD; every stage-2 letter of §15.2 (S1–S6) run against its number, S4 (d)'s §13.7 band confirmed or its fallback applied; B-ZOOM role continuity across every band switch of `hatched`; the stage-2 gate claimed only when **the D-5 protocol against NG** (S2's preference test with the owner as rater; twenty pairs over the four templates, §13.6 (2)) passes, rated, or the owner's acceptance is recorded — unrated: M5 closes *provisional — not rated* and the panel is offered with every release until it is rated (the rule above) | 14–18 pw |

**Effort, with its basis (IMP-2; D-20).** Re-derived line by line (PLAUSIBLE; each line a range with its basis):

| line | pw | basis |
|---|---|---|
| parity floors after sharing: (MFCG 46 + FTG map subset 52) × 0.65–0.75 | 64–74 | `docs/CONFIDENCE.md` §1; sharing the kernel, the display list and the document removes 25–35 % of the two floors, not 50 % |
| O1 terrain and hydrology beyond the references' water | 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes |
| O9 document and edit system (events with inverses and undo records, dry run, locks, scoped regeneration, the named actions, rebase, migration with diff, retention, the locality oracle, B-EDIT) | 9–13 | neither reference has it |
| O12 renderer beyond the floors (columnar display list, paint programs, tile pyramid and tile worker, label composition, SVG, print bands, `lit` on Canvas2D, the relief tier) | 4–6 | one drawing path; no second backend |
| O11 exports and interop beyond PNG / SVG / GeoJSON (VTT × 2 per layer, glTF / OBJ, CityJSON, CBOR, CSV, the handle API, the host bridge and resolver) | 5–7 | §11 |
| O17 + O18 + O19 (plot model, site plans, packer, heights; the field and the granularity law; greenery rules) | 7–11 | new in both references |
| O10 (intent expansion over ≈ 200 parameters, the forms catalogue, assignments, the placement solver) | 4–6 | forms tuned by eye and the D-5 panel |
| should-have "full" tiers (O13, O14, O16, O12 extras) | 4–6 | §15.2 should rows |
| original content under the clean room (≈ 60–100 roster classes, institutions, households, government and religion rows, naming grammar and corpora, era tables, presets, the symbol set, the procedural textures) | 8–12 | ≈ 40–50 % of CONFIDENCE's 25 pw FTG content line (§3.4's re-pricing), plus presets and symbols |
| `@plat/sim` (relations, postings, schedules, calendar, factions, events, economy and personality) | 8–14 | inside FTG's 125 − 52 = 73 pw non-map scope; the relation schema already in the base |
| the reference app's UI (panels, drawing and snapping tools, four field brushes, the tables editor, the style dialog, the advanced panel over ≈ 200 documented parameters, accessibility, context help, keymap) | 7–10 | no reference line covers it |
| the verification rig (five benches in three CI tiers, stage-isolated goldens with shift and cascade records, the five-engine nightly run, visual regression, the option matrix, control and cost-model sweeps, `baselines.json`, the clean-room scanner, the D-5 tooling) | 7–10 | §13 |
| mechanisms the fix-all pass added that the lines above do not price (booleans and bands on the arrangement, the derivation pool and its merge, the eager allocation and reservations, per-frontage regions and wings, the label placement engine; and the six new components of rounds 4–5 itemised below the table) | 8–11 | rounds 1–3 (the kernel, pipeline and rendering drafts of 2026-09-25): 5–7; rounds 4–5 (2026-09-26): 3–4, ≈ 14–22 working days itemised below (VS4-6) |
| **base subtotal (M-1 – M4b)** | **139–186** | |
| stage 2 (M5) | 14–18 | as before |
| **total** | **153–204** | equal to the milestone sum above |

The round-2 additions — `ink`'s close-up and building band (M2b), `hatched`'s city and district bands (M5), the
ink-family variants (M3b), the records in `plat/goldens/` and the placement digests (M1), the faithfulness campaign
(M3a) — are style sheets over existing paint programs and test tooling already priced in the O12 renderer, the
verification rig and the stage-2 lines, so the ranges stand (PLAUSIBLE). Round 3's additions — METROPOLIS in M1's test
inputs (a `ladder.json` row on the one pipeline), the doubled faithfulness campaign (≈ 6 more CPU-minutes a night), the
determinism lint over S13b's renderer inputs and the scripted document checks of §17.1 (2) — change no line of the
table either (PLAUSIBLE); nor do round 4's — the D-5 panel's FTG and NG pairing rules (§13.6), the list check of §17.1 (2)
and (5), and the load-verification memory test at M2a instead of M1 — or round 5's in this area — `rebase`'s typed
refusal (§14), the table check's cell count (§17.1 (2) (iv)), the committed FTG capture file (§13.6 (2)) and the
generated-town document format built at M1 instead of M2a (VS4-3), which moves effort between rows, not lines
(PLAUSIBLE).

**The other areas' build work of rounds 4 and 5 (VS4-6).** Six mechanisms are **new components**, priced by the fix-all
line's widening (≈ 14–22 working days, 3–4 pw; PLAUSIBLE): the per-name naming records and the renames an edit confirms
(§2.8, §6.3, §7.1; M1 writes the records, M3a stores the renames; VD3-2, VD4-3 – VD4-5), ≈ 3–4 days; `carryWings`, the
carry of a stored composition and the wing check decided by pairing (§2.6; M1 in generation, M3a under warps; NP3-1,
NP4-2, NP4-3, NP4-6), ≈ 4–6; crossing sites as a `Bridge` in state `site` and their handling in S1's water operator
(§2.7, §7.3 (b); M1 and M3a; NP3-4, J-I17), ≈ 2–3; resumable raster jobs, S13b as a resumable placement job and the tile
worker's four-class queue (§8.9, §9.2; M1; NR3-2, NR3-6, NR4-2), ≈ 3–5; the records digest (§6.2; M2a; VD4-6), ≈ 1–2;
the shipped stamp-tile asset, with its shared seam band, and its build tool `plat/tools/stamptiles/` (§8.10; M1; NR3-7,
NR4-1), ≈ 1–2 days. The rest are **refinements of a mechanism a line already prices**, absorbed by that line
(PLAUSIBLE): the load's digest recomputation, its corrupt-cache path, the version-pinned root checks and the
keep-and-save gating (the O9 line's load verification; VD3-1, VD4-1, VD4-2); the pack held by a saved redo, the pack
copy at an upgrade and the link refusal for a kept town (the O9 line's retention and migration; VD4-7 – VD4-9);
demotion, `StretchRef`, tombstones per partition, the water-gate hold and the deck strip (the parity floors' kernel
share and the fix-all line's arrangement work; VK3-3, VK3-9, VK4-1, VK4-4, VK4-5); the forced harbour pick and the
detour guard (the parity floors' gates and harbour; NP3-7, NP4-4); the pin pass (the fix-all line's label placement
engine; NR3-3); and the integer-centimetre tree positions with their lint, the PNG row-filter rule and the quantised
light steps with their light pass (the O12 renderer and O11 export lines; NR4-3, NR4-4, NR4-5). The milestone rows carry
the widening where the components are built — M1 + 2 / + 3 (with the generated-town format moved in from M2a), M3a + 1 /
+ 1, M2a unchanged (the format out, the records digest in) — so they still sum to the total. **A later pass that adds
build work prices it here:** its scope seat names each new mechanism with the line that absorbs it, or widens a line by
an itemised amount and keeps the milestone rows equal to the total.

*Chose* to state the larger, honest total *over* keeping 100–130 by cutting scope *because* the owner asked that nothing
be deferred and that everything be fixed as soon as possible, and the earlier figure left out the content, the app and
the rig that the base contains. The cuts that would shrink it are recorded for the owner's veto, not applied: the
module M4b (8–14 pw); VTT, glTF / OBJ, CityJSON and the CBOR twin (≈ 3–5 pw); all but three forms (≈ 2–3 pw); the
should-have "full" tiers (4–6 pw) — together a base of ≈ 122–158 pw and a total of ≈ 136–176 pw.

The riskiest items, in order: the fusion timing and statistics on real terrain (M0 c, M1); the bent-cut engine on
concave and holed faces (M0 b); the kernel's own booleans and bands (M0 a, with Clipper2-WASM as the pre-decided single
engine, §3.7); the straight skeleton's robustness (M0 a); the content authoring cost (M1, M2b, M4b — CONFIDENCE §3.4's
re-pricing is the warning); the thin CITY budget headroom (§12); the D-5 protocol's dependence on the owner's time
(§13.6's rater rule answers it: an unrated panel never stops the build and never lets a gate be claimed).

**Staged by the owner (hooks concrete; documented, not bugs to re-find):** stage-3 building compositions (§2.6's
`outline` / `compose` split, cost contract and intake measurement); the village product THORP → HAMLET → VILLAGE (PART
III); sewers and floating islands (II.6); the evolution engine beyond the one built growth path (§4.11); calibration
against the historical corpus (§13.9); SettlementForge inputs (§11.4's host-input contract). Nothing else is out of
scope: CityJSON is built (§11.1), the host-input contract is decided (§11.4), sharing needs no hosted service (§11.5),
setting packs have their format (§10.4), there is no WASM kernel (§3.7), and the relief tier is a base program (§8.2).

=== REPLACE §17.1 The clean-room chain (IMP-1; D-29) ===

### 17.1 The clean-room chain (IMP-1; D-29)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r5); earlier revision fixall/integrate-r4, drafted by fixall/draft-scope-r4; earlier revision fixall/integrate-r3, fixall/draft-scope-r3

1. **Who reads what.** *Research seats* (readers, measurers, the digest writer) may read the findings, `captures/`,
   `research/` and — under the standing ruling — `reference/`. *Implementer seats* (anyone writing code, tables, style
   sheets, content, assets or tests in `plat/`) read only `docs/ARCHITECTURE.md`, the implementer digest in
   `plat/docs/digest/`, the `plat/` repository, published algorithm papers and the public documentation of adopted
   libraries; they never open `research/`, `captures/`, `reference/`, the findings, the critics, `docs/confidence/`,
   `docs/improvements/`, `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md` or the red-team files. The citations in this
   document are for traceability; an implementer follows them only into the digest. No code from TownGeneratorOS
   (GPL-3), the FTG Foundry module or any captured bundle is read for implementation, ported or paraphrased.
2. **The implementer digest.** A digest seat writes `plat/docs/digest/` from the research: behaviours, measured numbers
   (each with its `baselines.json` id or finding reference) and the creators' stated ideas — no code excerpts, no
   reference word lists, grammars, palettes, tables or identifiers. A separate checker seat, which reads only the digest,
   runs the content scan below on it and files a report with it; every change to the digest repeats the check. This
   document is held to the same rule (FTG-22). The hashed scan of (5) needs the deny-list that M-1 builds, so until then
   **every seat that writes this document — a fix-all integration seat, an amendment pass's apply and repair lanes, any
   finishing or repair seat — runs, before its change lands,** the scripted document checks of
   `docs/validation/bench/doc_checks.py` (VS2-8, VS2-1), from the project root:
   `python3 docs/validation/bench/doc_checks.py --sections "⟨every section heading key the change touched⟩"` — the
   content checks (iii) and (vi) over the sections the change touched, the others over the whole document:
   (i) *identifiers* — a whole-word, case-sensitive search for the backticked identifiers of
   `research/findings/ftg-payload-visual.md` §7.2 and the one further time-setting message name the round-2 scan
   added — 36 names, which the script reads from the finding or holds research-side, so none is copied into this
   document;
   (ii) *colours* — every six-digit colour value of the document (`#rrggbb` or `0xrrggbb`) looked up, case-insensitive
   and hex-delimited, in `research/` (its text files, JSON included), `captures/**/README*.md`, `captures/**/*.json`
   (VS3-4), `docs/confidence/`, `docs/improvements/`, `docs/CONFIDENCE.md` and `docs/IMPROVEMENTS.md`;
   (iii) *token 3-grams* — the lower-cased word tokens of the changed sections against every 3-gram of
   `research/findings/*.md` and (VS3-4) of the string keys and values of every JSON file under `research/` and
   `captures/` — FTG's content database and every capture body included — taken in document order with purely numeric
   tokens dropped; a hit is a run of three or more consecutive shared 3-grams (five or more tokens in a row that also
   stand together in a finding or a capture) — the size at which a copied list, table row, grammar line or palette
   shows, while a single shared 3-gram ("per 100 m") is ordinary phrasing;
   (iv) *tables* — outside fenced code (a fence may be indented, as inside a list item) every line that starts with `|`
   ends with `|`, no other line sits between two table lines (VS2-1: a table row split over several lines renders as
   broken rows), and every row has its header's number of cells, counting only unescaped pipes (VS4-1: GitHub-flavoured
   Markdown splits a cell at every unescaped `|`, inside a code span too, and drops the cells beyond the header's count,
   so a bare pipe in code silently cuts the row short — inside a table write it `\|`, which the renderer shows as `|`);
   (v) *pointers* — every `§n` and `§n.m` pointer resolves to a heading of this document;
   (vi) *lists, in any order* (VS3-4) — a 3-gram needs the list's order, so a list pasted alphabetised shares none with
   its source: every JSON file under `research/` and `captures/` except the profiler's recordings (call censuses,
   coverage, idle, trace, draw and path records, run reports, metadata, session and index files — code identifiers and
   events, which (i) and (iii) cover) is read for its lists — a dict's keys, an array of strings, one field's string
   values across three or more records — and a hit is a line of the changed sections holding five or more distinct
   whole words of four or more letters that are members of one such list, reported as those words, sorted.
   Each hit is corrected before the change lands or reviewed: a reviewed hit is entered in
   `docs/validation/doc-checks-allow.tsv` with its check, its exact text and a written reason (a capture-citation file
   name, a measured number, a creator's sentence under 15 words quoted for traceability, ordinary phrasing, generic
   vocabulary in our own selection and order, a pointer into another document). The script exits non-zero while any hit
   is unreviewed, the change does not land until it exits zero, and the seat records its counts in its output file (a
   fix-all pass in its integration log, an amendment pass in `docs/validation/amendments-applied.md` and
   `amendments-repair.md`). From M-1 the hashed scan of (5) — whose list sets do (vi)'s work on salted digests — also runs
   over this document and replaces (i)–(iii) and (vi); (iv) and (v) stay. *Calibration (executed).* On §13–§17 as they
   stood after round 2 (lines 6657–7826 of the pre-round-3 text, md5 `ca2e2066…`, committed as
   `docs/validation/bench/fixall_scope_r4_calib_pre_r3_s13_s17.txt`), 1 196 of 26 236 token 3-grams are shared with the
   findings and they form **47 runs of five or more tokens (45 distinct; §13 24, §14 4, §15 11, §16 6, §17 2)** —
   measured numbers, ordinary phrases and one quoted creator sentence — a hand review of minutes; no run threshold from
   1 to 7 gives the 27 an earlier draft stated (VS3-5; `docs/validation/bench/fixall_verify_scope_r3_cleanroom_checks.out`
   part C, `fixall_scope_r4_cleanroom.out` part A). On the round-3 text the same rule gives 53 runs over §13–§17. (ii)
   finds none of the document's 36 colour values in its sources, the capture JSON included; (iv) found exactly the one
   broken row VS2-1 names, and its cell-count clause, run over the round-4 text, exactly one more — J-I15, whose bare
   pipe inside code hid its reasoning (VS4-1; `fixall_verify_scope_r4_checks.out` part C, `fixall_scope_r5_checks.out`). The round-4 extension, run over the whole round-3 text (2 052 JSON files, ≈ 30–45 s): the JSON
   corpus adds 50 distinct run texts to (iii) — ordinary phrasing the creators' posts and comments also hold, six of them
   lengthened forms of runs reviewed before — and (vi) flags 8 lines of generic vocabulary; each was reviewed into the
   allow file's round-4 block, so the extension adds no unreviewed hit to unchanged text. Of 429 lists in FTG's content
   database written as one line of five or ten names, (vi) catches all 429 in either order, while (iii) catches none of
   the alphabetised five-name lines and 210 of those in the database's order (`fixall_scope_r4_cleanroom.out` parts B–D).
   *Chose* scripted proxies with a reviewed allow file *over* a hand-run grep *because* round 2's hand-run proxy checked
   identifiers only and so passed any pasted palette or table while the rule read as satisfied (VS2-8); *chose* to bind
   every seat that writes this document *over* the integration seat alone *because* an amendment pass's lanes write it
   directly (VS2-8; J-S32); *chose* the list check (vi) beside the extended 3-gram check *because* a reordered list
   shares no 3-gram with its source (J-S35).
3. **The repository boundary.** The product is its own repository, `plat/`, at the root of this folder, outside
   `research/`, `captures/` and `reference/`. A PR-tier CI rule fails any import specifier, fixture path, script path or
   build input that resolves outside `plat/` (symbolic links resolved). The product's CI never reads the research trees.
4. **Reference numbers only through committed numbers-only files.** Research-side scripts (`research/baselines/`)
   measure the captures and write numbers with provenance (§13.5's `Baseline` rows); the file, `baselines.json`, is
   committed into `plat/packages/testkit/baselines/`, and the parity CLI reads only it. The D-5 panel is assembled
   research-side from the product's PNG exports and the capture images (§13.6); its only inputs to the product are two
   numbers-only files committed the same way into `plat/goldens/d5/⟨milestone⟩/` — `ftg-captures.json` (capture ids,
   rungs, water settings, resident counts) and `ng-counts.json` (NG hoods' building counts) — and `plat d5 seeds` reads
   only them (§13.6 (2); VS4-4).
5. **The content scan.** Research-side, `research/baselines/make_denylist.py` builds the deny-list from the creative
   data the findings and captures record — the references' naming-grammar rule names and terminal words, Markov and
   corpus sample words, palette colour values, FTG's building-type, profession, item and service identifiers and names,
   FTG's Foundry-module message and field names (FTG-22), and texture and image file hashes. The list holds only salted
   SHA-256 digests: of single normalised tokens (lower-cased, diacritics stripped) that are not in the spell-check word list §9.6 already needs,
   of token 3-grams in list order (so a copied table is caught even when every word in it is ordinary), of exact six-digit
   colour values, of file bytes, and — for every list the findings and captures record (a dict's keys, an array of
   strings, one field's values across records) — the set of salted digests of its members' words of four or more
   letters (S4-1), so a list copied in another order is still found. `@plat/testkit`'s clean-room scanner digests the
   same way every token of `@plat/tables`, assets, source string literals and comments and the digest, in the PR tier,
   and flags as a list hit any line, or any column of a table, that holds five or more distinct words of one list's
   set; a hit fails the build unless an allow entry with a written reason is reviewed and added — an authored roster
   that shares ordinary building or trade names with a reference list is such an entry, and the review decides whether
   the selection was copied. At every milestone the checker seat also runs a
   research-side palette audit: a shipped palette with three or more colours within ΔE2000 2 of one reference palette
   fails and is redesigned. Every file in `plat/assets` names the script that generated it or its third-party licence
   (fonts); a file with neither fails the build.
6. **Honest provenance.** Every table cell's provenance names where its number came from: `own`, `ref:⟨reference⟩
   ⟨behaviour⟩` (a measured or stated behaviour of a reference, admissible as a calibration anchor — for example the
   castle's 0.75 compactness gate (MFCG), 40 m bridge spacing and 39 m tower spacing (FTG), NG's lane-width law, Poisson
   k = 50), `owner`, `owner-eye ⟨milestone⟩`, `architecture ⟨date⟩`, `corpus` or `host`. A number that describes a
   behaviour is a fact; a list, grammar, palette or table is creative content and is never reused.
7. **The record.** `plat/docs/CLEAN-ROOM.md` holds the rule, the seat ledger (which seat read which research file, from
   the lane logs), the digest checker's reports and the deny-list's generation record (date, sources, counts — never the
   tokens).
8. **Sources of algorithms.** Published: Shewchuk predicates; snap rounding (Hobby; Guibas–Marimont; Hershberger);
   arrangement booleans by winding number; Bridson Poisson-disc; Felkel–Obdržálek and Aichholzer straight skeletons;
   Chaikin; Visvalingam–Whyatt; Parish–Müller growth; Lloyd relaxation; marching squares; priority-flood;
   Garbrecht–Martz flat resolution; fBm, with ridged multifractal noise and domain warping (Musgrave, in Ebert et al.,
   *Texturing and Modeling*, 3rd ed. 2003; §3.1). With the round-2 and round-3 text (NR-10): the xoshiro128\*\* generator
   (Blackman–Vigna, public domain; §6.1) with Irwin–Hall sums for its normal draws; MurmurHash3's x86 128-bit hash and
   its 32-bit finaliser (Appleby, public domain; H128 in §6.2, `RH32` in §8.1, `H32` in §13.6), checked against the
   SMHasher verification values; Krüger's transverse Mercator series in Karney's formulation, to fourth order in the
   third flattening (Krüger 1912; Karney 2011; §11.1); the van der Corput radical inverse and Morton (Z-order) bit
   interleaving for §8.10's progressive grid ranks; Ulichney's void-and-cluster ranking (1993; §8.10); the monotone-chain
   hull (Andrew) and rotating calipers (Toussaint) for the OBB (§3.1); centripetal Catmull–Rom splines and pinned-vertex
   Laplacian smoothing (§3.1, §4.2, §9.3); Dijkstra's and A\* shortest paths (§3.1, §4.2, §4.3); Brandes' betweenness
   (§4.3); Kruskal's spanning tree (§9.3); Lambert shading (§8.2's hillshade); CIELAB and the CIEDE2000 colour
   difference (Sharma–Wu–Dalal; §8.2). With the round-4 text (VS3-3): D8 steepest-descent flow directions and flow
   accumulation (O'Callaghan and Mark 1984; §2.3, §4.2 S1); the exact Euclidean distance transform in linear time
   (Felzenszwalb and Huttenlocher 2012; §4.5, §12.4); the three-pass box-filter approximation of a Gaussian (Wells
   1986; §4.5, §12.4); the Merkle hash tree (Merkle 1987; §6.2, D-28); context-free grammar expansion in the style of
   Tracery (Compton, Kybartas and Mateas 2015) and character n-gram Markov chains (Shannon 1948) for §10.4's naming
   engine — ideas only, with our own grammar and corpora; power diagrams (Aurenhammer 1987) with area targets
   (Aurenhammer, Hoffmann and Aronov 1998) for the hinterland lots of §4.9; Kahn's topological sort (1962) with the stage
   id as tie-break for the stage order (§4.1, §4.12); SHA-256 (FIPS 180-4) for (5)'s salted digests. For the tests:
   Pearson's χ² test with Holm's step-down procedure (§13.2), Spearman's rank correlation, Moran's I,
   Kolmogorov–Smirnov distances and SSIM (Wang et al.; §13.4, §13.5); the pair-correlation function of a point pattern
   (Stoyan and Stoyan 1994; §4.9, §13.2, §13.5); Shannon's entropy (1948) for the heading and use-mix entropies (§13.5,
   §13.7); the Jaccard index (intersection over union; §6.3, §7.5); and the Hausdorff distance (§3.7, §13.2, II.5). The
   round-4 list was checked against the text by a scripted scan of 119 method names
   (`docs/validation/bench/fixall_scope_r4_methods.out`). An implementer reads each in its published form; the seat ledger of (7)
   records which. The creators' *stated* ideas: twisted bisection, the casing idiom, skeleton labels, the proposal queue,
   dependency ratios, lazy people, integer centimetres — with constants calibrated on our own measurements.
9. **Protocol names (FTG-22).** The host bridge's vocabulary is our own (§11.3): the concurrency token is `logHead`
   (§2.9), carried as `baseLogHead` and `currentLogHead`; time is the view key `time`, set by `view.set`, and the
   simulation module advances it with its own command `sim.advance { hours }` (§10.3, §11.3). Schema-level ideas — an
   event / command split, an optimistic-concurrency token — are admissible as ideas; the FTG module's message, command and
   field names are not reused, are in the deny-list, and occur nowhere in this document (check (i) of (2)).

=== REPLACE Delegated decisions (the owner deferred all judgment; each is final unless vetoed) — row D-20 only (the rest of the section unchanged; set the section banner to "> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r5); earlier revision fixall/integrate-r4; earlier revision fixall/integrate-r3; drafted by fixall/draft-scope-r3") ===

| D-20 | **Effort ≈ 153–204 expert person-weeks: the base 139–186 (the content module included) plus stage 2 14–18, re-derived line by line in §16 — the fix-all pass's own mechanisms priced in their own line, rounds 4–5's six new components at 3–4 pw (VS4-6); the cuts that would reduce it to ≈ 136–176 recorded for the owner's veto, not applied** | the earlier 100–130 left out content authoring, the app, the test rig and FTG's non-map scope (IMP-2); the owner asked that nothing be deferred; the components the fix-all rounds added are itemised and priced, not assumed absorbed | 100–130 pw; cutting scope to hold it | none (an estimate) |

=== REPLACE Delegated decisions — row D-29 only ===

| D-29 | **The clean-room chain (§17.1): implementers read only this document and a checked implementer digest; the product in its own repository `plat/` with a path rule; reference numbers only through committed numbers-only files (`baselines.json`, and the D-5 panel's `ftg-captures.json` and `ng-counts.json`); a hashed content deny-list scan in CI and a palette audit per milestone; reference-derived constants labelled by origin; a seat ledger in `CLEAN-ROOM.md`** | the owner's clean-room ruling must hold by mechanism, not intention; the findings quote GPL code and reference data, so they cannot be implementer inputs (IMP-1) | findings and captures as implementer inputs; path-only CI rules | low (process) — in place before M0's code |

=== REPLACE Judgment calls ("chose X over Y because Z"; each vetoable) — the preamble paragraph only (set the section banner to "> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r5); earlier revision fixall/integrate-r4, drafted by fixall/draft-scope-r4; earlier revision fixall/integrate-r3, fixall/draft-scope-r3"; this paragraph already merges the round-5 preamble sentences of kernel X-S2, determinism SR5-4, pipeline X-S7 and rendering SC-8 — do not add them again; add the integration seat's own round-5 J-I rows, if any, before "(the record is") ===

J-1 – J-18 are the synthesis seat's (seven amended by the fix-all pass). The rows added on 2026-09-25 keep their area
prefixes — J-K (kernel), J-DET (determinism), J-P (pipeline), J-R (rendering), J-S (scope) — because the blocks that
made them cite them by those ids; the full reasoning of each sits in the section it names. The J-I rows are the
integration seat's: each settles a disagreement between two area drafts (the record is
`docs/validation/fix-all/r1-integration-log.md` §3). Round 2 of the fix-all pass added J-K9 – J-K21, J-DET-16 –
J-DET-28, J-P26 – J-P33, J-R19 – J-R37 and J-S20 – J-S27, and restated J-K2, J-K5, J-K6, J-K8, J-R7, J-R9, J-R17, J-I2,
J-I5, J-P3 and J-S4; its integration seat added J-I9 – J-I11 and amended J-K14 (the record is
`docs/validation/fix-all/r2-integration-log.md` §4, its conflict table). Round 3 added J-K22 – J-K27, J-DET-29 –
J-DET-39, J-P34 – J-P40, J-R38 – J-R43 and J-S28 – J-S32, and restated J-K6, J-K14, J-K17, J-K18, J-DET-14, J-DET-23,
J-R19 and J-S4; its integration seat added J-I12 – J-I14 and amended J-K24, J-I10 and J-I11 (the record is
`docs/validation/fix-all/r3-integration-log.md` §4, its conflict table). Round 4 added J-K28 – J-K33, J-DET-40 –
J-DET-43, J-P41 – J-P46, J-R44 – J-R49 and J-S33 – J-S38, and restated J-K11, J-K16, J-K25, J-K26, J-DET-23, J-DET-35,
J-DET-37 – J-DET-39, J-P34, J-P35, J-R17, J-R38, J-R40, J-R42 and J-S32; J-10, J-P10, J-R18, J-I11, J-I13 and J-I14 were
amended; its integration seat added J-I15 – J-I17 (the record is `docs/validation/fix-all/r4-integration-log.md` §4, its
conflict table). Round 5 added J-K34 – J-K35, J-DET-44 – J-DET-51, J-P47 – J-P49, J-R50 – J-R54 and J-S39 – J-S43, and
restated J-K18, J-K26, J-K28, J-K29, J-K32, J-DET-35, J-P35, J-P42, J-P44, J-P45, J-R42, J-S37 and J-S38; J-15, J-S6 and
J-I14 were amended, and J-I15's pipe inside code was escaped, which had cut the row short (VS4-1) (the record is
`docs/validation/fix-all/r5-integration-log.md` §4, its conflict table).

=== REPLACE Judgment calls — row J-15 ===

| J-15 | Chose to re-cut M1 to the viewable town only and to state 150–200 pw — 153–204 once the fix-all rounds' own components were priced (D-20, J-S43) — over the proposals' 60–90 and the synthesis draft's 100–130, because the per-reference floors bound the base from below and the content, app and rig lines were missing (IMP-2). |

=== REPLACE Judgment calls — row J-S6 ===

| J-S6 | Chose to state the honest 150–200 pw — now 153–204 with the fix-all rounds' components (J-S43) — and record the possible cuts for the owner's veto over cutting scope to keep 100–130, because the owner asked that nothing be deferred (IMP-2; D-20). |

=== REPLACE Judgment calls — row J-S37 ===

| J-S37 | Chose to measure memory under load verification, and the edit made while it runs, at M2a, to test the naming-input re-draws at M3a, and to give §2.9's rebased-document size test the milestone M2a, over the M1 and M2a timings the requests and §2.9 named, because a milestone can measure only what it or an earlier one builds — the log and load verification arrive at M2a, over the document format M1 builds for generated towns (VS4-3); table edits, setting packs and upgrades, the only inputs a naming re-draw follows, at M3a — while M1 keeps its memory and size tests of generated towns (§16; VS3-1, VD3-5, VD3-2, S4-2). |

=== REPLACE Judgment calls — row J-S38 ===

| J-S38 | Chose an optional `at` on `EditEngine.rebase` — the log head by default, `h₀` when the saved town is kept after edits made during load verification, anything else refused — over a second method for keeping the saved town, because the `rebase` event already carries `at` (§7.1), one entry point keeps §7.4's single rebase row and its undo, and the head's state and the decoded snapshot are the only states the engine holds materialised; and chose to return an `ApplyResult` — the refusal a `conflict` with one `invalid` action whose message begins `E_REBASE_AT`, nothing appended — over a thrown error or the document returned unchanged, because `apply`, `undo` and `redo` already report through `ApplyResult`, a host bridge relays a status and not an exception, and two faithful implementations must refuse alike (§14, §7.1; VD3-7, VS4-2). |

=== INSERT AFTER Judgment calls — row J-S38 (new rows J-S39 – J-S43) ===

| J-S39 | Chose to extend the table check with a cell count — every row has its header's number of cells, counting only unescaped pipes — and to escape J-I15's pipe with a backslash, over rewording code spans to avoid pipes or treating a code span as pipe-safe, because GitHub-flavoured Markdown splits a cell at every unescaped pipe character, code spans included, and drops the cells beyond the header's count, so the unescaped count is the renderer's own rule; it flags exactly J-I15 in the round-4 text, which the first-and-last-character rule passed (§17.1 (2) (iv), `doc_checks.py` S1; VS4-1). |
| J-S40 | Chose to build the `.plat` writer and reader for generated towns at M1 — the manifest, content-addressed chunks, gzip and an empty log; a saved town opened by checking its recomputed root, a differing root regenerated from the recipe — over moving the document-size test and the *preview* documents to M2a, because a milestone can measure only what it or an earlier one builds and the format needs nothing from the log, while the size budget is best learnt before editing is built on it; M2a keeps the log, the one fold and load verification over that format, and ≈ 0.5–1 pw moves with it from M2a's row to M1's (§16, §2.9, §3.9; VS4-3). |
| J-S41 | Chose to generate the PLAT side of an FTG pair at the capture's recorded population — the residents its decoded payload holds, carried to the product in a committed research-side `ftg-captures.json` with the capture's id, rung and water setting — over FTG's nominal size targets and over the product reading the capture folders, because the picture being compared holds the recorded population (FTG's targets are approximate), a pair must be reproducible from its record (`D5Pair` now holds the population), and the product may not read `captures/` (§17.1 (3)); a capture that yields no count falls back to its size's target, marked (§13.6 (2), (3), (9); VS4-4). |
| J-S42 | Chose `SquareFabric`'s `void` mode for NG's `square` pairs and as the default of II.2's `square` row over the `carved` plaza, because NG's own square is the void its unbuilt plots leave, the panel must compare like with like, and a panel should rate the default a user gets — so the default and the paired form are one (§13.6 (2), II.2; VS4-4). |
| J-S43 | Chose to widen the fix-all line by 3–4 pw for the six new components rounds 4 and 5 added in the other areas — naming records and confirmed renames, `carryWings` with its composition carry and pairing check, crossing-site state, the resumable raster and placement jobs with their queue, the stamp-tile asset and tool, the records digest (≈ 14–22 working days, itemised) — and to name the line that absorbs each refinement, over declaring all of them absorbed, because an absorption with no stated basis is the unpriced state VS4-6 found and the §16 choice is the honest total; the total becomes 153–204 pw, the milestone rows moving with the components, and every later pass prices its build work the same way (§16, D-20; VS4-6). |

=== REPLACE Judgment calls — row J-I14 (the parenthetical naming M2a only) ===

| J-I14 | Chose to count a load verification's replay model in the place of the pool's frozen arena copies — no copy is frozen while verification runs, because every edit made meanwhile runs its per-district stages in the generation worker by the pool-size-0 path (J-DET-43) — and to include the reference CITY document's load verification, with a district regeneration and a Re-derive from S3 made during it, in M2a's memory measurement (the milestone that builds the log and load verification over M1's document format; §16) under §12.8's existing fallbacks, over moving the replay to the generation worker when memory is short, because the replay needs its own model wherever it runs, so moving it saves no memory (§2.9 step 3, §12.8; round-3 C-3, round-4 VD3-5, VS3-1). |

=== REPLACE Judgment calls — row J-I15 (the code pipe escaped; VS4-1 and rendering SC-9) ===

| J-I15 | Chose the kernel's naming for the points where S1's water operator meets a wall or a boundary — a water gate's two bank vertices `('gate_end', gate, 0 \| 1)` under a fresh `Gate` whose `banks` name them, and transient `anchor` contact names on every other crossed boundary (the entity of the edge's first own-level row, the smallest free ordinal, stripped at promotion) — over the determinism draft's persistent `('anchor', enceinte, k)` rows at the enceinte's next free ordinals and its own entity list (the lower-id district; the hinterland pseudo-district on the perimeter), because §2.2 rule 7 is the kernel's and one naming must serve generation, the carve and the water operator alike: anchors on the enceinte would persist rows no record references and collide with an open trace's end anchors (J-K29), and two entity rules would give a canal and a river move different names at the same boundary (§2.2 rule 7, §7.3 (b) 3, 4, 7 and item 7 (v); round-4 C-1). |
## 3. Cross-area requests (changes in sections other areas own; the integrator applies them)

Every "before" text below was found exactly once in the current `docs/ARCHITECTURE.md` by a whitespace-normalised
search, and none lies in a subsection another area's round-5 draft replaces.

### 3.1 To the pipeline area (II.2)

| # | section | request |
|---|---|---|
| PS5-1 | II.2 Templates as fabric strategies, the `SquareFabric` sentence [VS4-4 (c); J-S42] | After "in both modes a centrepiece pin (monument, statue or fountain; COV-NG-XB23) sits at the square's nexus." add: "The `square` template row's default is `mode: 'void'` — NG's own square, which IMPR S4 keeps — so a district opened with `square` and no mode, and every `square` pair of the D-5 panel against NG (§13.6 (2)), gets the void; `carved` is the row's other value. A district records a non-default mode as `fabricParams.squareMode = 1` (`carved`; 0 or absent is `void`), since `fabricParams` holds numbers (§2.5), set by `setAttr` like any fabric parameter (II.4) (J-S42; VS4-4)." |

### 3.2 To the determinism area (§7.1) — alignment note, no request

Determinism's round-5 §7.1 block already writes the `rebase` event's `at` comment as "any other value is refused with
E_REBASE_AT and nothing is appended (§14; VS4-2)", which is exactly §14's typed refusal (an `ApplyResult` conflict with
one `invalid` action, nothing appended). No further change. Only if that block were not applied: add those words after
"or h₀ when kept after edits made during load verification (§2.9 step 4)" in §7.1's `rebase` comment.

### 3.3 To the rendering area (§12.8)

| # | section | request |
|---|---|---|
| RS5-1 | §12.8 Memory, the M2a sentence [VS4-3] | Replace "the milestone that builds the document, the log and load verification (§16)" with "the milestone that builds the log and load verification over the document format M1 builds (§16; VS4-3)". (Determinism RR5-5 and kernel X-R1 change other sentences of §12.8; the three apply independently.) |

### 3.4 Applied by this lane (tools, not the architecture)

* `docs/validation/bench/doc_checks.py` — S1's second clause (VS4-1): fences recognised when indented, and every table
  row's unescaped-pipe cell count equal to its header's; header comment and banner updated. Executed before and after
  (§0 measurements 1–2). Because §17.1 (2) binds every seat that writes the design, the integration seat's own run of
  the script now fails any row, from any area, that a bare pipe would cut short.
* `docs/validation/bench/fixall_scope_r5_checks.py` and `.out` — the receipts of §0 measurement 3.
* `docs/validation/bench/fixall_scope_r5_patch.py` — rebuilds the patched copy the blocks were cut from (§0 *Method*).

### 3.5 For the integrator (not an area)

1. **Folded requests.** Mark determinism SR5-2 and SR5-3, pipeline X-S5 and rendering SC-4, SC-5 and SC-9 applied
   through this file's §14, §16 and J-I15 blocks; several of their anchors survive in the blocks because the fold appends
   after them, so applying them again would duplicate text. The round-5 preamble sentences of kernel X-S2, determinism
   SR5-4, pipeline X-S7 and rendering SC-8 are merged into this file's preamble block; add only the integration seat's
   own round-5 J-I rows, if any, before "(the record is".
2. **Stated shift for the round record (§0.11 and `docs/ARCHITECTURE-VALIDATION.md` §R5).** The effort estimate moves
   from 150–200 to 153–204 expert person-weeks (D-20; J-S43) — an owner-visible number, so the round record should say
   so in plain words. No golden, digest or model output moves in this area.
3. **One document check over everything.** After every area's blocks are applied, run `doc_checks.py` over all changed
   section keys; the extended S1 checks the whole document's tables whatever `--sections` says.

## 4. Judgment calls for the architecture's table

The full texts are in §2's blocks; each is vetoable.

| id | status | the call, in brief |
|---|---|---|
| J-S38 | restated | `rebase` returns `ApplyResult`; a bad `at` is a `conflict` with an `invalid` action whose message begins `E_REBASE_AT`, nothing appended — over a thrown error or an unchanged document (VS4-2) |
| J-S39 | new | S1 counts cells by unescaped pipes and J-I15's pipe is escaped — over rewording code spans or treating them as pipe-safe, because that count is the renderer's own rule (VS4-1) |
| J-S40 | new | the generated-town `.plat` writer and reader at M1, opened by checking the recomputed root, ≈ 0.5–1 pw moving from M2a's row to M1's — over moving the size test and *preview* documents to M2a (VS4-3) |
| J-S41 | new | FTG pairs at the capture's recorded population, carried by a committed `ftg-captures.json` — over the nominal targets and over the product reading `captures/` (VS4-4 a, b) |
| J-S42 | new | `void` for NG's `square` pairs and as the `square` row's default — over `carved`, because NG's square is the void and a panel should rate the default (VS4-4 c) |
| J-S43 | new | widen the fix-all line by 3–4 pw for six itemised new components and name the line that absorbs each refinement — over declaring all absorbed; total 153–204 pw; a standing rule for later passes (VS4-6) |
| J-S37 | restated | the timing rule now says the log and load verification arrive at M2a over the format M1 builds (VS4-3) |
| J-15, J-S6 | amended | the stated total now reads 150–200 then, 153–204 with the fix-all rounds' components (VS4-6) |
| J-I14 | amended | its parenthetical names M2a as the milestone that builds the log and load verification over M1's format (VS4-3) |
| J-I15 | escaped | `0 \| 1` — the row's reasoning renders again (VS4-1) |

## 5. Deferral scan, CONFIRMED versus PLAUSIBLE, and what a Fable reviewer should re-check first

**Deferral scan.** Every span this round adds (135 spans, ≈ 14 100 characters, from a word diff of the patched copy
against the round-4 text) was scanned for TBD, TBA, "to be decided / determined", later, defer…, postpon…, future, "not
yet", "at M0", placeholder, pending, eventually, "when / if needed", revisit, "left for", "out of scope", open, until,
TODO, undecided and provisional. Hits: "A later pass that adds build work prices it here" and "every later pass prices
its build work the same way" — a standing rule for future passes, not a postponed decision — and "nothing be
deferred", the owner's rule quoted in D-20's unchanged rationale. Each choice that only a measurement can confirm carries
its measurement and pre-decided fallback in the text: a capture's resident count (M-1; fallback: the size's nominal
target, marked, and a clamp into the rung's band); the M1 format's size (M1's existing size test with §2.9's
predictive-coding fallback) and round trip (M1). No subject is staged.

**CONFIRMED (executed in this lane).** The S1 extension flags exactly J-I15 in the round-4 text and nothing in the
patched copy; the pre-round-5 script flags nothing (the defect). `doc_checks.py` on the patched copy over the changed
sections exits 0 with 0 unreviewed hits and no new allow entries. §16's arithmetic before and after (milestone rows =
lines + stage 2 = total; the cut arithmetic; the calendar weeks; D-20 and the plain words agreeing) — `fixall_scope_r5_checks.out`.
The patch script reproduces the patched copy byte for byte. Every anchor of another area's request is present exactly
once in the current text (and, for the unfolded ones, in the patched copy). FTG's two size targets (5 600 and 24 500)
and that its generator runs until its population target is reached are read from the findings (numbers only).
**PLAUSIBLE (reasoning only).** That each mechanism defeats its failure scenario in an implementation; that an FTG
payload's resident count is readable at M-1 (the findings say the payload carries the whole population model; the
fallback covers a failure); every effort figure — the six components' 14–22 working days, the 3–4 pw widening, the
0.5–1 pw moved with the format, the split between new components and refinements, and the per-milestone allocation
(M1 + 2 / + 3, M2a unchanged, M3a + 1 / + 1); that `void` is the better default for the `square` row beyond the panel.

**What a Fable reviewer should re-check first.** (1) J-S43 / VS4-6: whether the line between "new component" (priced by
widening) and "refinement" (absorbed) is drawn honestly — in particular whether S13b's resumable placement job, the
light pass and the version-pinned root checks belong on the other side, and whether 153–204 should instead be read as
an upper-end shift of the old range. (2) J-S40 / VS4-3: whether M1's reader should check the recomputed root at all
(a generated town could simply regenerate) and whether an M1 document opened after M2a by regeneration is the right
migration for a *preview* file. (3) J-S42: making `void` the `square` row's default (a product default, not only a
panel choice) — the pipeline area's II.2 text carries it (PS5-1).
