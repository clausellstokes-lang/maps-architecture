# repair-determinism-r2 — lane amendments-c/repair-determinism-r2 (repair round 2, DETERMINISM part: §5, §6, §7)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/repair-determinism-r2; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per block — planned | done). The block file is
> `docs/validation/amendments-c/repair-r2-determinism.md` (blocks only); this file is the lane's report.
> Base: docs/ARCHITECTURE.md sha256 024c57dabc6b93c8… and docs/ARCHITECTURE-RATIONALE.md sha256 33b21ca8cdc15789…
> (assemble-r1's output, the state the r1 verifiers judged). Generator: scratchpad rdc2/compose.py over rdc2/specs.py.
> ITEM BLOCK 01 §5.2 (VPR1-02): planned | done: REPLACE block written (3 substitutions: where cell, detection cell and ladder's cross-district clause and household rung — re-composed to carry pipeline r2's hand-off (2) for VPR1-01's §4.5 (5): S10a sends only a non-dossier household no capacity holds)
> ITEM BLOCK 02 §5.4 (VD1-01 = VS1-01, §5.4 side): planned | done: REPLACE block written (1 substitution: the refusal names both ends of the ladder, creation and absorb)
> ITEM BLOCK 03 §6.1 (VPR1-15): planned | done: REPLACE block written (1 substitution: a new first reader bullet — geology uniform, then the relief pick, appended on the town root's key, drawn whether auto or set)
> ITEM BLOCK 04 §7.1 (VD1-06 = V-MC1-07; VD1-07): planned | done: REPLACE block written (4 substitutions: setEntrance comment, entrances paragraph, startWorks.change's type, the WithoutBase and WorksChange declarations)
> ITEM BLOCK 05 §7.4 (VD1-04; VD1-05 = V-MC1-04): planned | done: REPLACE block written (3 substitutions: the light host list completed with the pointLocate tie; door light never re-seated; a locked door light goes with its entrance vertex)
> ITEM BLOCK 06 §7.5 (VD1-02): planned | done: REPLACE block written (1 substitution: the older decline op's tunnel field)
> ITEM BLOCK 07 §7.7 (VD1-01 = VS1-01; VD1-03; VPR1-16): planned | done: REPLACE block written (6 substitutions: trade bearings sentence, disorder clause, DR3 rule, DR17 inputs and rule, DR23 bar, item 15's cap refusal)
> ITEM BLOCK 08 J-ROWS / 09 RATIONALE-A (restated J-A68.73; any new ruling): planned | done: J-ROWS block written (J-A68.73 restated, J-A88.73 new); RATIONALE-A block written (the same two)
> ITEM verify on copies (apply-blocks, hand-off swap, refs, doc_checks): planned | done: block file sha256 bb86c4e3a39235f4…; alone 9/9 applied, audit 0 not OK, J-A68.73 swapped (one row per id); design diff 60 lines in §5.2, §5.4, §6.1, §7.1, §7.4, §7.5, §7.7 and 2 index rows; rationale 3; refs 2 baseline broken before and after, J ids 720 → 721; doc_checks '5,6,7,Judgment calls' C1 5/0 C2 0/0 C3 327/0 C4 3/0 S1 0/0 S2 0/0 exit 0 (= baseline); rationale hit set identical; combined with the kernel, model and pipeline r2 files 30/30, no heading replaced twice, doc_checks exit 0; WorksChange type-checked by deno (5 kinds in, epoch/merge/seq/session refused, negative control fails)

## Outcome

All 15 issue rows routed to this lane (10 distinct once the verifiers' duplicates merge) are fixed in
`docs/validation/amendments-c/repair-r2-determinism.md`; none is invalid, none held, none needs an owner ruling. The file
holds 7 REPLACE blocks (§5.2, §5.4, §6.1, §7.1, §7.4, §7.5, §7.7 — whole `###` subsections, each the live text of
design `024c57da…` with count-asserted substitutions, every other line verbatim), one J-ROWS and one RATIONALE-A block.
One ruling is restated under its id (J-A68.73, hand-off (1)); one is new (J-A88.73). Pipeline r2's cross-part hand-off
for §5.2 (its preamble (2), VPR1-01's companion) is folded into this file's §5.2 block (hand-off (3)).

| issue(s) | where | fix (short) |
|---|---|---|
| VPR1-02 | §5.2 F-SITING | S10a's re-homing is a where-cell, a detection point (only a household outside a dossier's population that no capacity holds, per pipeline r2's §4.5 (5)) and the ladder's second cross-district move (J-A72.50); the household rung names S10a beside S11 |
| VD1-01 = VS1-01 | §7.7 item 15; DR23; §5.4 | the cap refusal stated at item 15 (naming the cap, nothing absorbed; both refusals at creation and every absorb); "Above the floor" → "Inside the ladder"; DR23's bar and §5.4 name both ends |
| VPR1-15 | §6.1 readers | `blueprint.features` also draws the geology uniform, then the relief toggle's `auto` pick — on the town root's key, appended after the existing auto features, each drawn whether its toggle is `auto` or set |
| VD1-06 = V-MC1-07 | §7.1 (two places) | "the footprint side §2.6 rule 1 puts it on" |
| VD1-07 | §7.1 | `change?: WorksChange`; `WithoutBase` and `WorksChange` declared after `WarpStroke` (J-A67.72's five kinds, no EditBase fields) |
| VD1-05 = V-MC1-04 | §7.4 *Warp* | every light host has a host face: tunnel junction, access-point foot, castle, decoration, any hand-placed host; several faces → the one `pointLocate` returns |
| VD1-04 | §7.4 *Warp*; J-A68.73 | a door light is never re-seated (keeps its entrance vertex's displaced point); a locked door light goes with its entrance and never halves a step |
| VD1-02 | §7.5 | an older `convert` decline op's `tunnel` reads as `element` (`flood` has no older form) |
| VD1-03 | §7.7 layer 2; DR17; J-A88.73 | `disorder` is the blueprint's setting, never filled from the dossier's crime, which reaches the undercity only by §4.6's crime term |
| VPR1-16 | §7.7 trade; DR3 | only `road` partners' bearings are S3 (4)'s requests; every partner feeds `TradeFlow` |

## Judgment calls made here (vetoable)

1. **J-A88.73 (new)** — keep `disorder` the author's setting and route the dossier's crime through §4.6's one crime term
   (the verifier's choice; the reverse would split J-A88.41's single statement).
2. **J-A68.73 (restated)** — the door-light exception covers the whole re-seat rule, not only the clearance: a displaced
   entrance point rounded to the lattice can fall a hair outside the face, and re-seating it there would still push it
   indoors. Sibling: a locked door light is excepted from the held-record halving, which it could never pass on the edge.
3. **Departures from the verifiers' texts.** (a) VD1-05: a junction light's host is the tunnel's band faces at the junction
   (junction wedge and strips, §3.4's corridor), not "a half-corridor strip"; a castle adds its gatehouse footprint; a
   point decoration's face is the L3 face holding the *light's* point; and the one host face among several is the one
   `pointLocate` returns (§5.3's light row) — so the carry is defined for every light. (b) VPR1-02: detection text is
   pipeline r2's corrected wording (VPR1-01), and the household rung names S10a. (c) VPR1-15: the appended order (geology,
   then relief) and "drawn whether auto or set" are stated so no toggle moves another draw. (d) VD1-01: item 15 says
   both refusals hold at creation and every absorb (§14 items 3–4 already do).

## Held parts (gate (a))

None touched. The held parts of this part — item 68 (g), item 52's visible difference, items 35 and 60 support — stay
unwritten; the changed lines carry none of their phrases (0 hits).

## Cross-part notes

* **Pipeline:** hand-off (2) of `repair-r2-pipeline.md` is folded in; its two old strings are absent by design (my
  preamble (3)). §6.1's relief pick reads that file's S0 relief toggle (VPR1-12).
* **Model:** §7.4's host list matches model r2's `LightSource.host` (V-MC1-03). §2.6 rule 4's "street-facing side" is
  model's V-MC1-06.

## Receipts (scratch `rdc2/`)

Checks ran on copies; the live design, rationale and validation files were not touched (sha256 `024c57da…`, `33b21ca8…`
before and after). Alone: 9/9 blocks applied, audit 0 not OK; after the J-A68.73 swap one row per id. The design diff is
60 lines in the seven subsections and two index rows; the rationale diff is 3 lines. The reference resolver gives 2
broken links before and after (the baseline's external citations), and J ids go from 720 to 721. `doc_checks --sections
"5,6,7,Judgment calls"` gives C1 5/0, C2 0/0, C3 327/0, C4 3/0, S1 0/0, S2 0/0, exit 0, equal to the live baseline. The
rationale's hit set is identical before and after, and no allow row was added. Combined with the kernel, model and
pipeline r2 files: 30/30 blocks, no heading replaced twice, doc_checks exit 0 (C3 329/0). `deno check` accepts the five
`WorksChange` kinds and refuses an `epoch`, a `merge`, a `seq` and a `session`, and a negative control fails as it
should. Files: `compose.py`, `specs.py`, `swap.py`, `ledger.py`, `apply-log.json`, `doc.diff`, `rat.diff`,
`dc-*.txt`, `dcr-*.txt`, `refs-*.json`, `workschange.ts`, `comb/`.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED** by executed script or check on copies: each substitution (count-asserted); the application, swap, diff
extent, references and document checks; the combined application; the `WorksChange` type.

**PLAUSIBLE**, as a reading: that the vetoable calls above are the smallest fixes coherent with §2.6, §2.7, §3.4, §4.5 (5),
§4.6, §4.7 and II.7.5, and that pipeline r2's §4.5 (5) text lands as its file states.
