# repair-pipeline-r1 — lane amendments-c/repair-pipeline-r1 (repair round 1, PIPELINE part: §4, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/repair-pipeline-r1; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per block — planned | done). The block file is
> `docs/validation/amendments-c/repair-r1-pipeline.md` (blocks only); this file is the lane's report.
> Base: docs/ARCHITECTURE.md sha256 7f4c0e253438b41b… and docs/ARCHITECTURE-RATIONALE.md sha256 22f01184eac296c1… (both untouched by this seat).
> Generator: scratchpad rpc1/gen.py over rpc1/specs/*.py (each REPLACE body = the live subsection with asserted
> single-occurrence, whitespace-tolerant substitutions, every untouched line verbatim); the block file is re-composed atomically after each spec.
> BLOCK 01 §4.1 (VPR0-28): planned | done: REPLACE block written (1 edit)
> BLOCK 02 §4.2 (VPR0-12/V-MC0-18, VPR0-01, VPR0-15/V-MC0-17 HistoryHint): planned | done: REPLACE block written (8 edits)
> BLOCK 03 §4.3 (VPR0-01): planned | done: REPLACE block written (1 edit)
> BLOCK 04 §4.5 (VPR0-15/V-MC0-17 PowerRelation + dials, VPR0-03, VPR0-16, VPR0-23, VPR0-31, VPR0-33): planned | done: REPLACE block written (8 edits)
> BLOCK 05 §4.6 (VPR0-22): planned | done: REPLACE block written (2 edits)
> BLOCK 06 §4.7 (VPR0-04/V-MC0-06/VRC-21, VPR0-05/V-MC0-08/VD0-06/VRC-22, VPR0-02): planned | done: REPLACE block written (9 edits)
> BLOCK 07 §4.8 (VKC-15): planned | done: REPLACE block written (3 edits)
> BLOCK 08 §4.9 (VPR0-15 hinterland): planned | done: REPLACE block written (1 edit)
> BLOCK 09 §4.11 (VKC-08/VPR0-06, VKC-14, VPR0-10, VPR0-17, VPR0-26/V-MC0-25): planned | done: REPLACE block written (5 edits)
> BLOCK 10 §4.12 (VPR0-18): planned | done: REPLACE block written (1 edit)
> BLOCK 11 §10.2 (VPR0-02, VPR0-22, VPR0-31): planned | done: REPLACE block written (6 edits)
> BLOCK 12 §10.4 (VPR0-19, VPR0-24): planned | done: REPLACE block written (3 edits)
> BLOCK 13 II.1 (VPR0-29): planned | done: REPLACE block written (2 edits)
> BLOCK 14 II.4 (VPR0-20): planned | done: REPLACE block written (1 edit)
> BLOCK 15 II.6 (VPR0-10): planned | done: REPLACE block written (2 edits)
> BLOCK 16 II.7.1 (VPR0-34): planned | done: REPLACE block written (2 edits)
> BLOCK 17 II.7.2 (VPR0-34): planned | done: REPLACE block written (2 edits)
> BLOCK 18 II.7.3 (VPR0-22, VPR0-27, VPR0-32): planned | done: REPLACE block written (3 edits)
> BLOCK 19 II.7.4 (VPR0-27): planned | done: REPLACE block written (1 edit)
> BLOCK 20 II.7.5 (VPR0-22, VKC-16, VPR0-14): planned | done: REPLACE block written (5 edits)
> BLOCK 21 II.7.6 (V-MC0-28/VPR0-09, VKC-10, VKC-11, VPR0-14, VPR0-27, VD0-12, VPR0-15 yearsPerStage): planned | done: REPLACE block written (9 edits)
> BLOCK 22 J-ROWS + RATIONALE-A (new J-A77.42, J-A70.49, J-A72.50, J-A72.51, J-A65.49, J-A65.40, J-A68.42, J-A88.42, J-A64.44; restated J-A88.41, J-A65.48, J-A65.46, J-A65.47 (Part A), J-A81.41, J-A12.45): planned | done: J-ROWS (14 rows: 9 new, 5 restated) + RATIONALE-A (15 entries: 9 new, 6 restated) written; checks run (§6)

## 0 Outcome

All 39 routed pipeline issues (33 distinct once the verifiers' duplicates are merged) are repaired in
`docs/validation/amendments-c/repair-r1-pipeline.md`: 21 REPLACE blocks — §4.1, §4.2, §4.3, §4.5, §4.6, §4.7, §4.8, §4.9,
§4.11, §4.12, §10.2, §10.4, II.1, II.4, II.6, II.7.1, II.7.2, II.7.3, II.7.4, II.7.5, II.7.6, every one pipeline-owned — a
J-ROWS block (14 rows) and a RATIONALE-A block (15 entries). No other seat's block file REPLACEs any of these headings
(checked against repair-r1-model.md and repair-r1-determinism.md, the only other repair files present when this seat
wrote; the kernel seat owns §3 only). Nine vetoable rulings are new (J-A77.42, J-A70.49, J-A72.50, J-A72.51, J-A65.49,
J-A65.40, J-A68.42, J-A88.42, J-A64.44); six existing entries are restated (J-A88.41, J-A65.48, J-A65.46, J-A81.41,
J-A12.45 in the index and Part A; J-A65.47 in Part A only). Nothing needs an owner ruling. No held part is touched or
applied (§4).

## 1 Where each issue landed

| issue(s) | block | the change, in a line |
|---|---|---|
| VPR0-28 | §4.1 | an emitting pin that hosts a light is eager with its light (the night view draws `LightSource` records at the city band) |
| VPR0-12 = V-MC0-18 | §4.2 S0, S1 (1), S1 (10); J-A65.49 | S0 toggle `geology: auto/ordinary/soluble/volcanic`; `auto` resolved at S1 by a geology row per relief class against one S0 uniform on `blueprint.features`; `ordinary` on a sky island and in the parity presets; S1 (1)'s relief classes named by the keys their readers use (plain, not flat) |
| VPR0-01 | §4.2 S3 (4), (7), (12); §4.3; J-A77.42 | `TradeFlow` derived in two parts — gate weights, harbour share and dominant bearing at S3 (7), way weights after S4; S3 (4)'s trade weight is `TradeFlow.gates`; a road partner's bearing is a requested bearing (item 77 (b), DR3); S3 (12) reads `TradeFlow.gates` |
| VPR0-15 = V-MC0-17 (HistoryHint) | §4.2 S2; II.7.6; J-A88.42 | `yearsPerStage` (50) moved to the stage rows, stated once; K′ = min(K, ⌈ageYears ÷ yearsPerStage⌉) with the fold rule; fire and flood scars read only by the buried old town, other scars by no rule (J-A67.47) |
| VPR0-15 = V-MC0-17 (PowerRelation, legitimacy, impairments) | §4.5 Typing, (2), (6); J-A88.42 | a soft `adjacent`/`avoid` typing row between the kinds its powers' identity rows name; an alliance spills 0.25 × strength between the two alignments; legitimacy × the governing power's `A_p`; a non-physical impairment lowers the institution term |
| VPR0-15 (hinterland) | §4.9 farm table; J-A88.42 | arable demand × max(0, 1 − importPct × farmlandScale) when the row is filled |
| VPR0-03 | §4.5 (5), §4.7 S10a (ii); J-A72.50 | S7b allocates by a provisional pass-1 range, never stored; S10a writes the pass-2 range and re-homes out-of-range households before step (iii), reported; F-SITING for a household no district holds (S10b's reconcile never crosses districts, so VPR0-03's S10b wording was not used) |
| VPR0-16 | §4.5 (6) | a sector's applied share is §4.11's fold, derived on replay, never stored |
| VPR0-23 | §4.5 S7b (7) | the undercity takes II.7.5's H households, squalid band first, then poor |
| VPR0-31 | §4.5 (3), §10.2 identities; J-A72.51 | a kind-less defining row scores by its defining class's relation rows; the brothel row's soft harbour 300 m, gate 200 m, inn 100 m rows |
| VPR0-33 | §4.5 S7b (3) | "block band" → the upper block area `e_hi²` (§4.6's stop test) |
| VPR0-22 | §4.6, II.7.3 (2), II.7.5 size law, §10.2 `PortRows.crime` and staged-rows bullet; J-A88.41 restated | three factors stated once at §4.6 (hidden share, access, undercity demand `1 + crime.undercityScale × crime`); II.7.3 and II.7.5 cite it; no reader multiplies by the raw scalar |
| VPR0-04 = V-MC0-06 = VRC-21 | §4.7 `LightRule`, (1); J-A68.42 | `sizeCm` (own defaults torch 5 … orb 30), `colour` (fire #FF9329, magic #A6C8FF, the light pass's colour), `flicker: boolean`; hosts widened with `tunnel`, `gallery`, `chamber`, `accessPoint` and underground doors |
| VPR0-05 = V-MC0-08 = VD0-06 = VRC-22 | §4.7 (4) | one draw only (a door lantern's side); the flicker a row flag and §8.4 (f)'s pure function (J-A68.61); aligned with the model seat's `flicker?: true` |
| VPR0-02 | §4.7 Informal clusters (1), (2); §10.2 class mix; J-A70.49 | informal at generation only where (2) gives the cluster row (shanty-typed districts' squalid and poor plots, `wholeBlock` picks drawn at S10 (7) from kind and band); squalid class-mix row hovel 0.8, row house 0.2; shack's `wealthShift` removed; cluster structure classes never drawn by the mix |
| VKC-15 | §4.8 (1), (2) | the area centroid, `regularFit`'s `centre` (§3.4) |
| VKC-08 = VPR0-06 | §4.11 *The rung at an epoch*; J-A81.41 restated | margin by an L0 batch, border by an L1 batch; through-roads continued; rasters grow by whole cells; faces off the two old chains byte-identical |
| VKC-14 | §4.11 *A cut way's far part* | the rekey moves role, knot and vertex-role rows and no record |
| VPR0-10 | §4.11 `DeclineOp`, II.6; J-A65.48 restated | `element` (tunnel, gallery or chamber) and `flood`; an older event's `tunnel` reads as `element` (§7.5 — cross-part note 2) |
| VPR0-17 | §4.11 islands bullet | "below" → "above" |
| VPR0-26 = V-MC0-25 | §4.11 *Works* (1) | the target is §2.7's `Works.target`; parts through `cause.mutation` |
| VPR0-18 | §4.12 | the four underground registrations in order |
| VPR0-19 | §10.4 `rosterPatch` | every patchable `RosterTables` member; never `portRows` |
| VPR0-24 | §10.4 new bullet; II.7.5 pointer; J-A65.40 | the undercity named from the `undercity` slice reading the parent quarter's name; a later parent rename leaves it |
| VPR0-29 | II.1 | the undercity's `refine` close-up on its void's part; the request's `key` comment names the parts |
| VPR0-20 | II.4 | NG 1.2.2's tree order (item 58 (d)) |
| VPR0-34 | II.7.1, II.7.2 | "the underground arena" → part 0; the layer's other parts II.7.6's |
| VPR0-27 | II.7.3 (4), II.7.4 `knownTo`, II.7.6 step 5 | one statement at II.7.3 (4) (concealed use or secret plot); the other two cite it |
| VPR0-32 | II.7.3 access; J-A64.44 | the fallback cellar stair: a secret plot's building first, else the highest access probability, ties by address |
| VKC-16 | II.7.5 order, seed and locality | the far `link_end` vertices excepted |
| VPR0-14 | II.7.5 `ClearUndercity`, II.7.6 `RaiseGrade` | `kind:` → `op:` |
| VPR0-09 = V-MC0-28 | II.7.6 `RaiseGrade.system?`, buried-town bullet; J-A65.46 restated | the created or extended system recorded; a replay reads its part number there |
| VKC-10 | II.7.6 buried-town bullet; J-A65.46 restated | fresh records of the `buried` part minted from the event; the cleared records keep their ground addresses |
| VKC-11 | II.7.6 one-system paragraph, step 3; J-A65.47 Part A restated | inside a part every crossing is a junction: same-kind complexes join at a common band, a dug connector treats another's dug passage as a foundation, a drawn crossing at another band is refused |
| VKC-13 | J-A12.45 index and Part A restated | "(amended for systems by J-A65.31 …)" appended |
| VD0-12 | II.7.6 closure instances | each instance declares its own generators |

## 2 Rulings (vetoable; full entries in the RATIONALE-A block)

* **New.** J-A77.42 (trade flow in two parts), J-A70.49 (informality at generation; the shack leaves the class mix),
  J-A72.50 (the provisional range at S7b; S10a re-homes — chosen over VPR0-03's S10b wording, which §4.7's
  reconcile forbids), J-A72.51 (a kind-less defining row scores by its class's rows), J-A65.49 (the geology toggle and
  rule), J-A65.40 (the undercity's name is kept when its parent is renamed), J-A68.42 (the light-row columns and the
  underground hosts), J-A88.42 (every staged input's reader at its home; scars other than fire or flood act nowhere,
  J-A67.47), J-A64.44 (the fallback cellar stair's host).
* **Restated** (same id; the assembler swaps each into the older row's place): J-A88.41 (three crime factors), J-A65.48
  (`element` and `flood`), J-A65.46 (fresh records; `RaiseGrade.system`), J-A65.47 (Part A only: the crossing clause),
  J-A81.41 (the growth by the kernel's batches over one clear region, J-A81.31), J-A12.45 (the amendment note).
* **Where I departed from a required text, and why.** VPR0-03: its "S10b's plan–fit–reconcile moves … to the district"
  contradicts §4.7 ("it never reaches into another district"), so S10a — eager and town-wide, the stage that writes the
  range — re-homes instead. VKC-08: the kernel seat's landed-in-parallel §3.2 (9) (J-A81.31) grows the frame by three
  single-level batches over a clear region of whole L1 faces, so VKC-08's "every face whose ring ran along neither old
  chain is byte-identical" would be false for faces nested in a cleared L1 face; §4.11 now points to §3.2 (9) and states
  only the pipeline's part (S4's through-roads, S12a, the owners' re-derivation). VPR0-12: the geology uniform is S0's (on
  `blueprint.features`, as every auto feature) and S1 reads it against the relief-class row, because relief is S1's;
  V-MC0-18's "S1's `terrain.*` concern" was not used. VPR0-15: a young settlement's stage count needs a fold rule
  (stated) and `yearsPerStage` a single home (moved from II.7.6's catacomb row to S2's stage rows); "generation-time
  ruins" were not added — the creation week shows a finished town (J-A67.47), so only fire and flood scars act (II.7.6).
  Several C3 rewordings (document checks) changed wording, never meaning.

## 3 Held parts (gate (a)) — none applied here; listed so nothing is lost

No part of this lane's issues touches a held part. The pass's held parts relevant to this part stay unwritten: item 35
(the position-check support, 160 / 162 faces); item 68 (g) (the MFCG cast-shadow absence clause and VG 1.6.9's /
Dwellings' light and shading support — this lane's `LightRule` columns are item 68 (4)'s placement, not (g)); item 52
(the references' visibly different session maps); item 60's support. Released parts are as the pass applied them (item
37, item 58 (f), item 59's timing); item 49's rejected deletion is not this part's.

## 4 Cross-part notes (for the seats that own the sections; none blocks this file)

1. **Model (§2.7).** `LightSource.host`'s comment could name the new hosts — "… pin, tunnel, gallery, chamber or access
   point" (§4.7's `LightRule.host`). The model seat's `flicker?: true` and colour comment already match §4.7 (4).
2. **Determinism (§7.5).** Add beside the `placeAccess` rule: "an older `convert` event of an underground ladder op
   (`silt`, `caveIn`, `seal`, `reopen`) whose `tunnel` field reads as its `element`" (II.6 cites §7.5 for it; VPR0-10).
   (`ClearUndercity` and `RaiseGrade` now discriminate on `op`, VPR0-14; both are this pass's own, so no older form exists.)
3. **Determinism (§6.1).** No new concern: the geology uniform is one more of S0's `blueprint.features` draws; the
   `wholeBlock` pick stays on `plot.join` (VPR0-30 covers its listing).
4. **Determinism (§7.7 DR19).** §4.9 now reads the hinterland row's `importPct` (the hook VPR0-25 asked DR19 to cite).
5. **Kernel (§3.2 (9), J-A81.31).** §4.11 and J-A81.41 cite the kernel seat's growth statement and J-A81.31; if that
   file does not land, §4.11's pointer dangles.
6. **Scope (§13.2) — bars the new mechanisms want:** (a) the geology flag's resolved share per relief class within
   binomial tolerance of its row, `ordinary` in the parity presets and on sky terrain; (b) `TradeFlow.gates` computed at
   S3 (7) equals its value after S4, and the principal market's siting reads it; (c) at generation no plot outside a
   shanty-typed district is `informal` and the class mix never yields a cluster structure class; (d) after S10a every
   household's band lies within its district's written range, each move reported; (e) with `PortRows` empty the staged
   readers (§4.2 S2, §4.5, §4.6, §4.9, II.7.3, II.7.5) leave the model byte-identical to the base golden.

## 5 Assembler hand-off

1. **Restated rows.** J-ROWS carries 5 restated index rows (J-A88.41, J-A65.48, J-A65.46, J-A81.41, J-A12.45) and
   RATIONALE-A 6 restated entries (the same five and J-A65.47); swap each into the older row's place and delete the
   older (the amendments-b hand-off's step 1). After apply-blocks, J-A65.47 shows under `part_a_without_j_rows` — expected.
2. **No other hand-off.** Every change is inside this file's 21 REPLACE blocks; no heading is retitled; no other seat's
   file REPLACEs any of them (checked against the model, determinism, kernel, rendering and scope repair files).

## 6 Receipts (scratch copies only; the design files were not touched — design 7f4c0e25…, rationale 22f01184… before and after)

* **Apply, this file alone** (`apply-blocks.py`, two-pass): 23 / 23 blocks applied, 0 skipped, audit not-OK 0; headings
  147 → 147; fences balanced (130 → 130); title block unchanged; duplicate ids exactly the five restated index rows and
  six restated Part A entries; after the simulated swap every id once, index = Part A.
* **Apply, all six repair files present at 05:5x** (determinism, kernel, model, pipeline, rendering, scope): 89 / 89
  applied, 0 skipped, audit not-OK 0; no id occurs three times in either table, so every restated row swaps cleanly.
* **Document checks** (`doc_checks.py --sections "4.1,4.2,4.3,4.5,4.6,4.7,4.8,4.9,4.11,4.12,10.2,10.4,II.1,II.4,II.6,
  II.7.1,II.7.2,II.7.3,II.7.4,II.7.5,II.7.6,Judgment calls"` on the simulated, swapped document): exit 0 — C1 5 / 0,
  C2 0 / 0 (the two new colour values occur in no corpus file), C3 317 / 0, C4 1 / 0, S1 0, S2 0 — the same counts as
  the live document (C3 317 / 0). The C3 hits my drafts raised (16 in these sections, 14 in the rationale) were reworded over four check passes; no
  allow row is proposed. **Rationale file, whole:** C3 503 hits / 325 unreviewed and C4 6 / 6 — the unreviewed C3 and C4 sets
  byte-identical to the live rationale's (sorted diff empty); S2 there resolves against the rationale's own headings and
  is not the gate. (Output kept in scratchpad `rpc1/dc-final.txt`, `rpc1/dc-rat-final.txt`.)
* **References:** all 178 J ids the block file cites resolve (the index, or the kernel repair file's J-A81.31); every
  § and II pointer resolves (S2 0).

## 7 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed): every block applies to the live design and rationale, the audit is clean alone and with the five
sibling files, the restated rows swap to one row per id, the document checks match the live counts, and every cited id
and pointer resolves; each issue's old text was found exactly once in its subsection (the generator asserts it).
PLAUSIBLE (reasoning): that each change repairs its issue without a new conflict — in particular the staged readers'
forms (J-A88.42: the alliance spill of 0.25, the fold rule for a young town's stages, the impairment term), the geology
row's probabilities (J-A65.49) and the S10a re-homing (J-A72.50), all our own and calibratable; these are what Fable
should re-check first.
