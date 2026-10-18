# Amendments c — PIPELINE seat walls-districts-hinterland (items 45, 46, 47, 57): report

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/amend-pipeline-walls-districts-hinterland; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per item, updated after every block)
> ITEM 45: planned REPLACE §4.8, J-ROWS, RATIONALE-A | done REPLACE §4.8, J-ROWS, RATIONALE-A
> ITEM 46: planned REPLACE §4.2, REPLACE §4.4, J-ROWS, RATIONALE-A | done REPLACE §4.2, REPLACE §4.4, J-ROWS, RATIONALE-A
> ITEM 47: planned REPLACE §4.5 (+ REPLACE II.1 identifier), J-ROWS, RATIONALE-A | done REPLACE §4.5, REPLACE II.1, J-ROWS, RATIONALE-A
> ITEM 57: planned REPLACE §4.9, J-ROWS, RATIONALE-A | done REPLACE §4.9, J-ROWS, RATIONALE-A
> RESUME (bundled pass c + d + e, 2026-09-28 ~01:05): planned re-verify blocks on the live doc and the bundled route, fold Fable's retrovalidation substitutions RV-4 and RV-5 into §4.5, build names on rewritten sentences, apply-check, doc checks, reword every new C3 hit | done all (26 rewording substitutions in the block file; §7)
> REPORT: planned per-item sections, cross-part notes, held parts, queue row, LANDED | done per-item sections, cross-part notes, held parts, verification, doc checks, queue row (A-amendments-c/amend-pipeline-walls-districts-hinterland), LANDED

Seat run 2026-09-28 (Opus 5.5 standing in for Fable). Blocks first written at 00:16 on `docs/ARCHITECTURE.md` sha256
`1c23190f…` (13 026 lines, 145 headings), rationale `0be40dfd…`; **resumed at ~01:05 under the bundled pass c + d + e**
on the same, unchanged files (re-hashed: design `1c23190f040c…`, rationale `0be40dfd41ff…`; amendment files c
`dbfc3763…`, d `8d0dfe1a…`, e `4660b5ab…`, the hashes the bundled route read). The bundled route (§C.9.1) keeps this
seat's key and item list unchanged, and §C.9.3 routes no d or e text (items 73–88, 101) to any subsection this seat owns
(§4.2, §4.4, §4.5, §4.8, §4.9, II.1), so the bundle adds no work here beyond the folds already due; the CONTINUE rule
applied (block file complete, no LANDED line).

## 1. What landed, per item

Block file: `docs/validation/amendments-c/blocks-pipeline-walls-districts-hinterland.md` — six REPLACE blocks (§4.8,
§4.2, §4.4, §4.5, II.1, §4.9), one J-ROWS block (10 rows), one RATIONALE-A block (10 entries), closed by END.

### Item 45 — the castle repair: thinness first, then toward the best-fit regular polygon (§4.8)

**Where:** §4.8 "Compactness (F-CASTLE)" (REPLACE); J-A45.41, J-A45.42.
**Mechanism (plain words).** When S3 sites a castle claim that is too thin or irregular, it is repaired in place in two
steps, in the order the reading of MFCG 12710731's code shows (P10). First a *bloat*: while the claim's nearest edge
vertex lies within `castle.minInnerM` (40 m, a castle-table row) of its centre, every free vertex moves outward by 5 % of
its distance from the centre, step by step, never past the area band's top. Then *equalise*: up to 20 passes, each moving
every free vertex 20 % of the way to where it would sit on the claim's best-fit regular polygon (`regularFit`, the
kernel's one read-only service, §3.4 — same vertex count, centred on the centroid, radius and phase from the ring's first
Fourier component). The claim is repaired at compactness 0.75, unrepaired when a pass gains under 0.001 or the passes run
out. An `on_enceinte` claim's two weld vertices and, once the gate exists, the gate side's two ends never move; at
generation the claim is repaired first and the gate then fixed on the repaired polygon. A repaired claim is re-checked
against S3 (8)'s hard filter.
**Rulings.** ADOPT the regular-polygon target ("equal angles" is ill-defined — a thin rectangle has equal angles);
CALIBRATE the order (J-A45.41). KEEP OURS for the bloat's scope (the claim's own vertices inside its reservation, where
MFCG 12710731 pushes committed mesh) and for the stall exit (the F-CASTLE ladder's next rung, never a whole-city restart;
J-A45.42). D-17, D-9, J-P26, J-P36 unchanged.

### Item 46 — the gate law's waterfront reduction and three smoothing passes (§4.2 S3 (4); §4.4)

**Where:** §4.2 S3 (4) "The waterfront reduction (J-A46.41)" (REPLACE of §4.2); §4.4's trace chain and S5b's `N_k`
(REPLACE of §4.4); J-A46.41, J-A46.42, J-A46.43.
**Mechanism (plain words).** A town whose gate contour runs along a sea or lake shore for at least
`gate.waterfrontShare` (0.1 of its length; ours, calibratable) gets fewer land gates: the land law's count `N_land`
becomes `N₁ = 2 + ⌊0.75 · (N_land − 2) + ½⌋` (4 / 7 / 10 / 14 where the land law gives 5 / 8 / 12 / 18), never more than
`N_land`. Because gate picks are nested, a smaller count is a prefix of the larger, so no pick changes identity. A
requested N is taken as given; a river takes water gates, not this reduction. The provenance sentence carries the
evidence gate's CORRECTED wording verbatim: MFCG 12710731's coded law counts mesh cells — 2 + ⌊0.75 × inner cells ÷ 12⌋,
recorded 3 / 4 / 5 / 7 gates at sizes 26 / 39 / 51 / 80 — and our rounding of 0.75 on the land law's surplus over two
gates is its metric restatement (P11; J-Fcode-6). Outer walled stages apply the same reduction to their main-road target
`N_k` by the same share condition on their own boundary. The wall trace's pinned Laplacian smoothing is fixed at 3 passes
(`wall.smoothPasses`, P12), the gates, weld vertices and an open chain's shore anchors pinned.
**Rulings.** KEEP OURS for the metric area law and the nested terrain-scored picks; CALIBRATE the reduction and the pass
count. Seat rulings: the condition is read on the pick contour (it exists when picks are made; the stage-1 boundary is
drawn after the gates' routes) and as a share, not a touch (J-A46.41); the reduction extends to outer rings, where
MFCG 12710731 has no behaviour to emulate (J-A46.42, the route's recommendation taken); the named pinned set (J-A46.43).
J-P24 kept and extended; J-P45's harbour gate stays extra to N₁; J-P25 is the condition's premise.

### Item 47 — district growth rates by seed kind (§4.5 Grower)

**Where:** §4.5 "Grower" (REPLACE of §4.5), II.1 (REPLACE, one phrase: the grower's "edge test"); J-A47.41, J-A47.42.
**Mechanism (plain words).** Districts grow in round-robin turns. Each turn a grower skips with probability
`1 − rate(kind)` from the `district.growthRate` table (gate, castle and bridgehead seeds 0.1; riverbank 0.5; every other
kind 1; P13), otherwise it absorbs one admissible neighbouring face drawn uniformly. Admissible means the shared edge
passes the **edge test** (no arterial ≥ primary, no wall, no water, no reservation boundary, unless the seed kind allows)
and the grown patch passes the **patch test** (area within the band, compactness ≥ 0.5, no hole); a hole check splits.
A round gives each unfinished grower one turn in seed-id order; a grower with no admissible neighbour is finished. The
skip and pick draws come from `district.seed`, keyed by the grower's seed lineage and the turn number, so §7.3's S6
operator re-grows a scoped regroup identically. Bridgeheads (both landward ends of every arterial bridge) join the seed
features. Faces no grower could claim seed further districts in face-id order (MFCG 12710731's leftover rule). The band
floor's merge exempts a district grown from a seed whose rate is below 1 (it keeps at least its seed face), since the
slow rates exist to make exactly those small wards. The arterial barriers and the √A count law are ours.
**Rulings.** ADOPT the per-kind rates and turn order (J-A47.41); KEEP OURS for barriers and count law (J-A47.41);
seat rulings: the floor exemption and leftover seeding (J-A47.42). The reference identifiers of the old text (`DistrictBuilder`
/ `Grower`, `validateEdge`, `validatePatch`, `check4holes`) are gone from §4.5 and from II.1, the only other place that
named `validateEdge` (route §C.5; RV-pc-2's substitutions, same words).

### Item 57 — the sector-look preset names its two sources; fields claimed outward (§4.9)

**Where:** §4.9 field-system presets (REPLACE of §4.9); J-A57.41, J-A57.42, J-A57.43.
**Mechanism (plain words).** The sector look is a style preset with two named constructions: VG 1.6.9's (Voronoi seeds on
the main road, the shores and a ring, cells clipped to the land and to the road's sides, bisected at right angles; P17)
and MFCG 12710731's variant (a lobed farm belt split recursively into 0.6–1.3 ha fields by square or skewed cuts with 8 m
paths, a farmstead on one field in five; P18). Either way the preset works inside the farm mode's extent and makes its
cells fields in **outward order** — the cells nearest the settlement's edge first, ties by cell id — stopping at the arable
demand under `demand` and running over all the mode's field land under `fill` (the default, J-A26.42 kept). The MFCG
variant's sub-furlong fields and paths are drawn as render-time segmentation of the furlong faces (J-I6 kept); the number
of farmsteads stays the farm table's.
**Rulings.** CALIBRATE (two named builds) and ADOPT VG 1.6.9's outward claim, measured from the perimeter rather than the
centre because a town's built extent is not a point (J-A57.41); render-time segmentation over model faces at the
variant's size (J-A57.42, the route's J-I6 question answered); farmstead count from the farm table (J-A57.43).

## 2. Other seats' phrases folded into this seat's REPLACEs (route §C.2, §C.6)

* **§4.2:** item 65's S1 clause (the geology flag for II.7's caverns; quarry voids read `SiteResources.stone`); item 68's
  S0 clause (`magic: 'none'|'low'|'high'`, `none` by default under D-3; the era row's public-lighting density); item 71's
  S2 clause (stage land's expected plot area over the class-mix weights at the band centre); item 72's S3 (4) trade
  weights from the circumstances' trade slice and S2's town-level character from the economy slice (ruling 3); item 20
  (h)'s S2 clause (the dossier's population and circumstances; the blueprint's own as the stand-in); item 49's
  correction of the M-1 #5 sentence (RV-7 (1): no FTG plot share exists to measure; the bound from above stated).
* **§4.5:** item 65's S7b (7) (the undercity allocation before (1), capped by the void; the rows and cap II.7's); item 70's
  shanty phrase ("takes the cluster row (§4.7 S11, item 70; FTG's tents row in the parity presets)", also in the band
  table's `squalid` row); item 71's interpolation pointer; item 72's two pointers (Typing: identity read after placement;
  Fields: the three dials' driver terms and the district pressure).
* **§4.9:** item 70's yard-planting row (`cluster` → bare ground, paths, a midden).
* **Review corrections folded (J-Fpipe-1 = RV-pipeline-gen-1; RV-pipeline-gen-4 and -5 folded at resume):** the Grower
  illustration ≈ 14 / ≈ 22 ha; the shanty replacement restricted to districts of the stages past
  `shanty.afterStageShare` (by `growthStage`); the prosperity field's pass wording (pass 1 = driver-only state for typing,
  completed by `characterOffset` after typing; S8 reads pass 1 complete; pass 2 at S10a). RV-7's register items (6) §4.8
  and (7) §4.9 are this seat's items 45 and 57 and are now true; the RV-pc-2 identifier substitutions in §4.2
  (`createMount/Hollow/Ridge`, `deltaRiver`, `buildDomains`), §4.4 (`filterOutskirts`), §4.5, §4.8 (`buildCanals`) and
  II.1 are carried by the REPLACEs.

## 3. Held parts, gates, and items not applicable

* **Held parts (gate (a)):** none of items 45, 46, 47 and 57 carries a HOLD — PLAUSIBLE part; all four are CONFIRMED
  (57's VG half confirmed by the evidence gate's completion). The evidence gate's one correction touching this seat —
  item 46's editor text — is applied as corrected (not the original "reproduces MFCG's coastal counts 4 / 7 / 10 / 14").
  The pass's held and released parts elsewhere are other seats' (route §C.4 as superseded by §C.9.4: 37, 58 (f), 59
  RELEASED labelled; 49's deletion REJECTED; 50's inferred MFCG clause, 52, 60 (support), 35 (support), 68 (g) and 68
  (support) stand as §C.4 wrote them).
* **Gate (b), build naming:** every sentence this seat wrote about a reference names its build (MFCG 12710731, VG 1.6.9,
  the FTG client of the 2026-09-25 capture); five were tightened at resume (the grower's attribution, the canal builder,
  two rationale clauses, the item-49 FTG sentence). Pre-existing capture-based attributions the REPLACEs re-emit
  unchanged (for example "MFCG's outskirts filter", the delta option) were left in their Fable-given wording.
* **Gate (c), no reference identifier:** an intersection of the block file's backticked tokens with the backticked
  identifiers of `research/findings/code-*.md`, `os-*.md` and `profile-*.md` finds only ordinary words and our own record
  names (`Bridge`, `Gate`, `equalize`, `bloat` — design names that pre-date this pass); a grep for the known reference
  identifiers finds none.
* **Not applicable to this seat:** items 73–88 and 101 (no d or e text routed to §4.2, §4.4, §4.5, §4.8, §4.9 or II.1,
  route §C.9.3); item 20 (h) is E1's home and appears here only as the S2 fold.

## 4. Judgments taken at resume (vetoable — say "veto" to flip)

* JUDGMENT: I folded Fable's retrovalidation substitutions RV-pipeline-gen-4 and -5 verbatim into this seat's §4.5
  REPLACE, over leaving them to the retrovalidation's PIPELINE repairer, because a REPLACE written on `1c23190f…` would
  silently revert them if that repairer lands first, and their anchors no longer match after the fold, so a later
  repairer fails harmlessly — the same "apply once" rule RV-1 already states for J-Fpipe-1.
* JUDGMENT: I kept the II.1 REPLACE, which changes one phrase ("the grower's `validateEdge`" → "the grower's edge test"),
  over leaving II.1 alone, because otherwise II.1 would point to a predicate §4.5 no longer names; the cost is that any
  other change to II.1 must be applied after this REPLACE (note 6 below).

## 5. CROSS-PART NOTES (the other editors run in parallel; the verifiers check both sides)

1. **Manager / assembler (route §C.9.2).** This file sorts LAST among the pipeline files (`…-walls-districts-hinterland`),
   so under the one-pass name order seat T's item-72 APPEND on §4.5 (exception 4) is erased by this seat's §4.5 REPLACE.
   Use the two-pass order (every REPLACE first, then every INSERT AFTER / APPEND TO SECTION). The same holds for any
   APPEND another pass puts on §4.2, §4.4, §4.5, §4.8, §4.9 or II.1.
2. **Kernel (K) — item 45.** `regularFit` is in K's §3.4 and §3.1 blocks (J-A45.31); §4.8 reads it as "centred on the
   centroid, radius and phase from the ring's first Fourier component" — consistent. Nothing more needed.
3. **Determinism (E2).** (a) §5.2 F-CASTLE ladder cell: "thinness bloat (5 % steps while the nearest vertex is within
   `castle.minInnerM`) → equalise toward the best-fit regular polygon (≤ 20 passes; stop at ≥ 0.75 or a gain < 0.001) →
   re-site (reported) → keep without a bailey (reported)". (b) §7.1 warp table, Equalize row: "each cell under the brush
   moves its vertices `strength` × 20 % toward the cell's best-fit regular polygon (`regularFit`, §3.4)". (c) §6.1:
   `district.seed` also draws the grower's turn skips and absorbed neighbours, keyed by the grower's seed lineage (its
   feature's; a remainder seed's first face) and the turn number — no new concern; §7.3's S6 row re-grows a scoped
   regroup by those keys. (d) `castle.minInnerM`, `gate.waterfrontShare`, `wall.smoothPasses` and `district.growthRate`
   are ordinary §7.6 table rows (castle, gate, wall and district tables).
4. **Scope (S1).** (a) §1.4 walls row: "thinness bloat, then equalisation toward the best-fit regular polygon"; hinterland
   row: "VG 1.6.9's and MFCG 12710731's sector looks" (remove `Cutter.grid` / `splitField`); districts row (optional):
   "with MFCG 12710731's per-kind growth rates" (remove `validatePatch/validateEdge`). (b) §13.5 towers-and-gates row: the
   waterfront reduction's bar in the evidence gate's corrected terms — our law's 4 / 7 / 10 / 14 where the land law gives
   5 / 8 / 12 / 18, MFCG 12710731's coded law recorded 3 / 4 / 5 / 7 at sizes 26 / 39 / 51 / 80 (never "reproduces MFCG's
   coastal counts 4 / 7 / 10 / 14"). (c) The growth-rate bar (§13.5 MFCG-anchors row or §13.2 S6 statistics): "districts
   seeded at a gate, the castle or a bridgehead have a median area below the town's median district area on ≥ 90 % of
   B-CITY seeds". (d) Delegated decisions D-17 / D-19 (optional): "the gate law with its waterfront reduction".
5. **Scope (S2).** (a) §15.1 MFCG B5 (optional: the waterfront reduction), B6 (castle repair — the cell stays true), B9
   (remove `check4holes`: "a hole split"). (b) Test bars for §13.2's group: item 45 — a thin claim (nearest vertex
   < 40 m from its centroid) is bloated before any equalise pass, a repaired claim reaches compactness ≥ 0.75 with its
   weld vertices and gate-side ends unmoved, an unrepaired claim goes to re-site with a report and never restarts;
   item 57 — under `demand` no field cell lies farther from the perimeter than a non-field cell of the preset's
   admissible land (outward order), under `fill` the field land equals the mode's, and the farmstead count equals the
   farm table's under both sector variants.
6. **Manager — retrovalidation repairs on this seat's subsections.** The Fable retrovalidation files route substitutions
   and blocks here: RV-pipeline-gen-1, -4, -5 are folded in §4.5 (their anchors will not match afterwards — apply once);
   RV-pc-2's §4.2 / §4.4 / §4.5 / §4.8 / II.1 identifier substitutions are carried; RV-pc-1's APPEND to II.1
   (`docs/retrovalidation/blocks-pipeline-content.md`, the standalone and sky runs, J-RVpc-2) is NOT here and must be
   applied AFTER this II.1 REPLACE. RV-pc-2 also names the rationale file's `validateEdge` at Part A l. 191 and 1412 — an
   in-place substitution ("the grower's edge test") for the rationale repairer; a RATIONALE-A block can only append.
7. **Seat T.** (a) J-P1 against item 72 (d′) (RV-pipeline-gen-7's flagged ruling): this seat's §4.5 keeps "no district is
   zoned residential or by class" for the S6 typing and adds the route's Typing pointer ("the district's identity, read
   after placement from its character vector, names and describes it (item 72's paragraphs of this section); the kinds
   stay this typing, which the later stages read") — item 72's ruling 2. T records that ruling as a `J-A72.4n` row and
   words the "plain residential kind by band" as an identity, not an S6 kind. (b) Item 70: the §4.5 shanty sentence now
   restricts the replaced districts by stage (RV-4) and takes the `cluster` row; T's *Informal clusters* paragraph should
   match. (c) Item 72's dials: §4.5's Fields now defines pass 1 as the driver-only state at typing, completed by
   `characterOffset` after typing; T's APPEND should say which pass the power and economy dials' driver terms enter.
8. **Seat D.** §4.5 S7b (7) points to II.7 for the undercity allocation's rows and cap ("the rows and the cap are II.7's");
   D's II.7.5 must state them.

## 6. Verification (receipts in the scratchpad `wdh/`)

* **CONFIRMED — the blocks apply cleanly:** `apply-blocks.py` on scratch copies: 8 blocks found, 8 applied, 0 skipped;
  audit not-OK 0; J rows without Part A 0 and the reverse 0; index and Part A 482 = 482, no duplicate ids; headings 145 → 145;
  fences balanced (108 → 108); title block unchanged; no PENDING line inside the document; document 13 026 → 13 102
  lines.
* **CONFIRMED — the changes are the intended ones:** a word diff of every REPLACE body against its live subsection shows
  only the item texts, the folds of §2 and the identifier removals listed above (II.1: one phrase).
* **CONFIRMED — no double REPLACE:** the other block files present (kernel, bentcut, plots) replace §3.x, §4.6, II.5 and
  §4.7 only.
* **Document checks:** see §7.

## 7. Document checks (three-copy method, one corpus snapshot)

`python3 docs/validation/bench/doc_checks.py --sections "4.2,4.4,4.5,4.8,4.9,II.1,Judgment calls"` on the untouched
design and on a scratch copy with this file's blocks applied (`apply-blocks.py`), and on the whole rationale (untouched
and with this file's RATIONALE-A entries, `--heads` the matching design copy). The first run on the applied copy found 15
new C3 runs, all in this seat's own new wording (for example "vertices and an open chain", "per seed kind growth rates",
"voronoi seeds on the main road", "of the 2026 09 25" — the last one the build-naming phrase itself), plus 11 in the
RATIONALE-A entries (found with a cached copy of the checker's corpus, scratchpad `wdh/c3cache.py`, `c3check.py`). Each
was **reworded, none allow-listed** (26 substitutions, meanings unchanged; FTG's build now reads "FTG's client as captured
on 25 September 2026"). **CONFIRMED, final runs:**

| copy | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed |
|---|---|---|---|---|---|---|---|
| design, untouched (7 sections) | 5 | 0 | 144 | 0 | 0 | 0 | 1 (C3) |
| design, this seat's blocks applied | 5 | 0 | 144 | 0 | 0 | 0 | the same 1 (C3) |
| rationale, untouched (whole) | 0 | 0 | 405 | 6 | 0 | 17 | 282 |
| rationale, this seat's entries appended | 0 | 0 | 405 | 6 | 0 | 17 | 282 (S2 lines shifted by 10, same pointers) |

So the blocks add 0 hits of any kind. **The one unreviewed hit is not this seat's:** C3 "captures mfcg exports sweep 2026
09 25 readme md" in §4.2 S2 — our citation of the capture folder `captures/mfcg/exports-sweep-2026-09-25/README.md`,
which the untouched design already fails because `research/findings/profile-mfcg.md` now cites the same path (corpus
drift: the allow file's existing row covers only "2026 09 25 readme md"). §4.2's REPLACE re-emits the path unchanged. For
the assembler, a reviewed allow row: `C3 | captures mfcg exports sweep 2026 09 25 readme md | a capture file path cited
for traceability in §4.2 S2; research/findings/profile-mfcg.md cites the same path; no list, table, grammar or palette`.
