# verify-scope-r2 — lane amendments-c/verify-scope-r2 (the SCOPE part after repair round 2 / assemble-r2)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-scope-r2).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 inputs read (verify-scope-r1, repair-scope-r2 report, assemble-r2, the five sibling repair-r2 reports' cross-part notes, verify-{model,kernel,pipeline,determinism}-r2 issues; verify-rendering-r2 still in progress, 1 209 bytes, no issue yet): done
> STEP 1 diff of the part's sections, archive pre-repair-r2 -> live: done (scratch vs2c/hunks.txt, part.wdiff: 31 hunks in the part, every one read)
> STEP 2 repaired subsections read whole (summary, §0.2, §13.2, §13.4's light-pass bullet, §13.8, §16, Delegated D-25, the index rows changed and added, J-A65.02 / J-A66.01 Part A): done
> STEP 3 per-issue verdicts VS1-01..09 (+ VKC1-06, VPR1-17, VRC1-07, pipeline r2 note 2): done (all FIXED)
> STEP 4 per-item verdicts (re-checked where repaired; others keep r1's): done (all PRESENT)
> STEP 5 checks (single-source, stale, cross-part incl. sibling notes, deferral, refs, new-problem), doc_checks: done (exit 0)
> STEP 6 issues table, queue row, LANDED: done (7 issues, all minor; queue row B-amendments-c/verify-scope-r2)

Design under review: docs/ARCHITECTURE.md sha256 3daa0b0731b8c76f… (17 215 lines); rationale bfa20419ca4dd6e5… (2 314 lines) — assemble-r2's installed files, unchanged by this seat. Before: docs/archive/ARCHITECTURE-pre-amendments-c-repair-r2-2026-09-28.md (024c57da…). Scratch: scratchpad c0d81c15…/scratchpad/vs2c/.

## Outcome

Repair round 2 fixed **all nine VS1 issues** of `verify-scope-r1.md` — the six scope rows at their places in the part and the three other-owner rows (VS1-01 determinism, VS1-02 pipeline, VS1-03 rendering) at their homes — together with the restated VKC1-06, VPR1-17 and VRC1-07 and pipeline r2's cross-part note 2 (a)–(d). Every item routed to the part stays **PRESENT**; no held part entered; the title block and the one review banner are unchanged.

This round files **7 issues, all minor**: scope 5, pipeline 1, and one scope row that restates a determinism-filed row by the J-A digit rule. Two restate sibling r2 findings that belong to scope (VD2-04, VPR2-08); two are new residues of round 2's own bars (T88-1 misses a staged reader; the O1 line does not name what it absorbs); one is a completeness gap in §0.2's ruling ranges that round 1 opened and this reading of the repaired §0.2 caught. None needs an owner ruling.

Document checks on the part exit 0 (C1 5/0, C2 0/0, C3 322/0, C4 4/0, S1 0/0, S2 0/0 — r1's counts). References: 2 broken, the baseline's two external citations; index 733 rows = Part A 733 entries, one id set, no duplicate, every row three cells; every J id the design cites resolves; T-ids 202 defined = 202 cited, 0 undefined.

## Re-check of the round-1 issues (live text, design 3daa0b07…)

| r1 id (= sibling) | owner | verdict | the live text (line) |
|---|---|---|---|
| VS1-01 (= VD1-01) | determinism | FIXED | §7.7 item 15 l. 9407–9410 "A dossier whose population lies above the 120 000 cap is refused the same way — `E_RUNG_UNAVAILABLE` naming the cap, nothing absorbed — and both refusals hold at creation and at every absorb"; §5.4 l. 7029 "one whose population lies outside the ladder, below the 1 500-person floor or above the 120 000 cap … (§7.7 item 15, item 81; J-A81.01)" |
| VS1-02 (= VD1-14 = VPR1-06) | pipeline | FIXED | §4.11 l. 6415 "A dossier outside the ladder — below 1 500, or above the 120 000 cap — is refused by the port (§7.7 item 15, item 81; §1.1; J-A81.01) and never reaches an epoch" |
| VS1-03 (= VRC1-09) | rendering | FIXED | §11.4 l. 12244 "and one above the 120 000 cap the same way, naming the cap (§1.1; J-A81.01)" |
| VS1-04 (⊃ VPR1-17) | scope | FIXED | T65-7 l. 13416–13422; T77-1's S3 (7) clause l. 13544–13546; T70-6 l. 13463–13465; T72-9 l. 13479–13486; T88-1 l. 13557–13562; §13.8 l. 14086–14087, 14092; §16 M1 content and exit, M2b exit, M3a exit; §0.2 row 65; J-A65.02 index l. 17155 and Part A l. 779. Residues: VS2-03 (T88-1's reader list), VS2-07 (the O1 line) |
| VS1-05 (= VKC1-06) | scope | FIXED | T81-1 l. 13549–13553 "every raster keeping its `cellCm` with every old cell in its place and every stored height unchanged, the `hydro` fields equal to a fresh computation over the grown grid and every river's traced course inside the old arena unchanged — or … §3.2 (9)'s pre-decided re-grid" = §3.2 (9) (verify-kernel-r2 concurs) |
| VS1-06 | scope | FIXED | T30-5 l. 13308–13310 "and at `public` a `why` on another building whose relation rows, supply edges or alternative sites include the withheld place gives that place by its address and kind only, `withheld: true` (§11.2's oracle rules (1)–(4))" = §11.2 l. 12059–12066 |
| VS1-07 (1), (2) | scope | FIXED | M3a content "the closure rule (§7.3 item 9) with its first base instance, a concealed front's missing concealed door (item 63);"; M4 content "`addUndergroundAccess` with its closure generators (the basement's requested-mode ladder of §2.6 the first)"; J-A66.01 Part A l. 768 "(the basement's requested-mode ladder of §2.6 among them, the access edit its only caller)"; T66-5 l. 13434–13438 "sets a placed use's `concealment` to `front`, its `front` another use of that building (§4.7's *Concealed institutions* (1); `Use.front`)" = §2.7 l. 1818, and its close "(§4.7's *Concealed institutions* (4) (b))" |
| VS1-08 | scope | FIXED | D-25 l. 16344–16346 "(item 66; §7.3 item 9 (d); J-A66.71, J-A66.01: its underground pieces run once the underground layer's stages exist, its dry run until then refusing with F-EDIT naming the staged layer, its bars on the layer's hook fixture from M4)" |
| VS1-09 | scope | FIXED | summary l. 39 and l. 105–106 "the recipe of Neighbourhood 1.2.2 restated in metres" (gate (b)) |
| VRC1-07 | scope | FIXED | T30-5 l. 13310–13312 "a viewer's `preview` of any event returns `status: 'refused'`, `reason: 'role'`, with no fates, renames, counts or shape, and an `editor`'s `preview` … returns its dry run" = §11.2 l. 12032, 12070 |
| pipeline r2 note 2 (a)–(d) | scope | FIXED | (a) T65-7's `site.terrain` clause (DR1, §7.7 l. 9287); (b) T65-8 l. 13422–13428 = II.7.6 *A buried old town* l. 16036 (320 cm = 200 + 200 × 0.6); (c) T72-9 "so none is left unplaced for its band" = §4.5 (5) l. 4822–4827; (d) T88-2 l. 13562–13565 = §4.5 (6) l. 4838–4840 |
| rendering r2 hand-off 5 | scope | FIXED | §13.4 l. 13717 "— the traversal unchanged —" = §8.4 l. 10398 |

The repair seat's extensions (its report §3) are sound: T65-7's relief-toggle clause matches §4.2 S0 l. 3865 and §6.1 l. 7173–7176 (geology uniform first, relief pick second, each drawn whether set or not); T65-8's "undercity forbidden" keeps the ground digest free of ceiling caps (T65-3); §0.2 row 65's new clause matches §4.2 and J-A65.02; T88-2's "no district's dial" holds because the impairment lowers the institution term, never `A_p`, which the quarter dial reads (§4.5 (6)).

## Per-item verdicts (items routed to this part)

* **Home items: all PRESENT** — 32, 41, 48, 49, 56, 62, 73, 83, 84, 85 keep r0's and r1's verdicts and quotations; round 2 left their mechanisms untouched (the word diff has no hunk in them).
* **Referencing items: all PRESENT.**
  * Re-checked where round 2 wrote: 33 (the summary's build named), 63 (T30-5, T66-5), 65 (T65-7, T65-8, §0.2 row 65, M1, J-A65.02 — residue VS2-01's record kinds and VS2-02's registry comment), 66 (M3a / M4, D-25, T66-5, J-A66.01), 68 (§13.4's traversal; the new bar of VS2-01), 70 (T70-6), 72 (T72-9), 77 (T77-1), 81 (T81-1; the cap refusal at every home — VS2-05 the row's section column), 88 (T88-1, T88-2 — residue VS2-03, VS2-04), 101 (T30-5's preview refusal).
  * Every other referencing item keeps r1's PRESENT.

## Cross-part notes and sibling findings addressed to this part

| from | note | reflected? |
|---|---|---|
| pipeline r2 report §4 note 2 (a)–(d) | four bars | yes (above) |
| rendering r2 hand-off 5; its note "Scope, §13.2" | §13.4 wording; T30-5's refusal | yes |
| kernel r2, model r2, determinism r2 reports | none addressed to scope | — |
| verify-pipeline-r2 **VPR2-08** (owner scope) | §14 `StrategyRegistry.underground` comment omits the scar-made buried system | confirmed (l. 14268 vs II.7.6 l. 15992, 16107) — restated as **VS2-02** |
| verify-determinism-r2 **VD2-04** (owner scope) | no bar proves J-A68.73's warp carries | confirmed (§13 has no warp bar naming a light, an access point or a Works; l. 13084–13085) — restated as **VS2-01** |
| verify-determinism-r2 **VD2-05** (filed under determinism) | J-A81.01's section column and Part A omit §7.7 | confirmed (index l. 17145, rationale l. 769); J-A81.01 is scope r1's ruling (digit 0), so restated as **VS2-05** — apply once |
| verify-model-r2 V-MC2-01 (model) | J-A88.21's index row (in this part) says "an S0 input" | confirmed, not re-filed — the fix is model's, with §2.9 l. 2183 and the Part A entry |
| verify-determinism-r2 VD2-01, VD2-03 (determinism) | J-A68.73's index row (in this part); "§7.7 item 2" pointers in §14 and the index | concurred, not re-filed; VS2-01's bar follows VD2-01's door-light wording |
| verify-kernel-r2 | VKC1-06 resolved in T81-1 | concurs with VS1-05 above |

## Held parts (gate (a)) — so nothing is lost

Still held and absent from the design and the rationale (phrase scan of both files): item 52's claim that the references' session-reached maps visibly differ (one Part A mention, J-A52.61, recording that it is held); item 35's supporting position check (160 / 162 faces: 0); item 60's support for NG 1.2.2's hand-off of plans up to 16 cells wide (0); item 68 (g)'s "MFCG draws no cast shadows" ("draws no cast shadow" occurs only as our `MFCG` preset's behaviour — l. 361, 10082, J-A68.86; the summary l. 114 speaks of "the setting that imitates MFCG"); item 68's VG 1.6.9 lighting layers and Dwellings' shading support. Released parts stand labelled as earlier rounds applied them (37, 58 (f), 59's timing, 50). Item 49's rejected deletion stays honoured (§1.4, F4). Round 2 wrote no held part in this part.

## Checks

**Single source.** Each new bar is stated once in §13.2 and scheduled by reference (§13.8, §16). The geology flag and the relief toggle are stated at §4.2 S0 / S1 (10); §0.2, §16 and J-A65.02 point to them. The cap refusal is now stated at §7.7 item 15 and §1.1 (the floor refusal's existing pattern, J-A81.71), and cited by §4.11, §5.4, §11.4, §14 and D-33. No second statement of a round-2 mechanism in the part.

**Stale.** The task's list (lots as buildings, binary wealth, size fixed by tier, one central market, the map editing the dossier, a proprietary licence default, unchanging terrain and water) — none stands. Round 2's other-part changes (relief as an S0 toggle, `HistoryHint` read at S2, the scar-made buried town) leave one stale sentence in the part, §14's registry comment (VS2-02), and J-A88.21's "S0 input" (V-MC2-01, model's).

**Deferral wording.** The 1 754 words round 2 added to the part hold no TBD, TODO, later, pending, for now, not yet, placeholder, defer or open.

**References.** Resolver (`docs/validation/amendments-b/refs.py`): 141 headings, 35 D ids, 730 J ids, 2 broken = the baseline's external `os-geometry.md` §2.1.4 and RFC 7946 §3.1.6. Index 733 = Part A 733 (same set); J-A ids 454, all two-digit decimals; the digit rule holds for round 2's new rows (J-A65.02 scope 0; J-A65.22 model 2; J-A88.73 determinism 7; J-A68.90, J-A63.82, J-A68.91, J-A68.92, J-A85.83, J-A101.86, J-A67.83 rendering 8). T-ids 202 / 202 / 0; the six new ones (T65-7, T65-8, T70-6, T72-9, T88-1, T88-2) each defined once.

**Gates (b), (c).** Round 2's added text names one build (NG 1.2.2, the summary) and no reference identifier; C1 is the same 5 reviewed hits; `shack`, `tent`, `lean_to_shelter` are the design's own class ids (§2.6 l. 1131, §10.2).

**§16 arithmetic (re-summed).** Milestone rows 185.5–248.5 = lines 171.5–230.5 + stage 2's 14–18; round 2 changed no price (the ladder moved inside item 66's 0.5 pw; the geology flag absorbed — VS2-07 asks the O1 line to say so).

**Title and banner.** Lines 1–19 byte-identical to the pre-amendments-c archive; one review banner, no per-section marker.

**Document checks.** `python3 docs/validation/bench/doc_checks.py --sections "The whole design,0,1,13,14,15,16,17,Delegated decisions,Judgment calls,Staged,Appendix A" --allow docs/validation/doc-checks-allow.tsv` (2026-09-28; corpus 9 626 JSON files, 916 788 3-grams, 478 lists): C1 5/0, C2 0/0, C3 322/0, C4 4/0, S1 0/0, S2 0/0 — **exit 0** (`vs2c/dc.out`).

## Issues

| id | sev | kind | owner | item | where | the problem | exact required change |
|---|---|---|---|---|---|---|---|
| VS2-01 (= VD2-04) | minor | missing | scope | 68, 64, 67 | §13.2 *B-EDIT and the locality oracle* (l. 13084–13085) | J-A68.73 (§7.4) gives the warp's mean-value carry three more record kinds — a light's point for every host (the door light excepted), an access point's opening, a Works' kept rings — and no bar in §13 proves any of them; the warp fixtures cover a fountain, a user-moved tree and a pinned pin only (rule 2: the test that proves the mechanism) | After "and one halved by a pinned pin (§7.4)" insert "; a warp and a `moveVertex` over a lit street with an inn — every street light, the inn's door light, a hand-placed light on a pin and a junction light on a tunnel carried in their host faces by §7.4's rule, the door light on its door's footprint edge and never re-seated, a light pushed inside its `sizeCm` clearance re-seated, one whose inset empties re-placed when generated and orphaned and reported when hand-placed; an access point's opening carried in its ground host; a building under a demolition Works whose kept rings take their mean-value images unre-seated; undo restoring every former point byte for byte and a replay reproducing them (§7.4; J-A68.73)" (verify-determinism-r2's text; apply after VD2-01, whose door-light wording it follows); it runs with B-EDIT (§13.8's tiers) from M3b, where the placed lights land (the warp kernels are M3a's), its tunnel junction light and its access point on the underground hook fixture and its Works clause on the Works hook fixture from M4 (§16) — M3b's exit: replace "and its exports' lights | 18–23.5 pw |" with "and its exports' lights; the lit-street warp fixture (§13.2's B-EDIT; J-A68.73) but its tunnel-light, access-point and Works clauses | 18–23.5 pw |"; M4's exit: replace "and item 81's frame growth (T81-1) | 16.5–23.5 pw |" with "and item 81's frame growth (T81-1), and the lit-street warp fixture's tunnel-light, access-point and Works clauses | 16.5–23.5 pw |" |
| VS2-02 (= VPR2-08) | minor | stale | scope | 65, 88 | §14 `StrategyRegistry.underground` comment (l. 14268) | "registered after the network stage by declared I/O — the systems (catacomb, cavern, quarry, vaults)" omits the generation-time buried system II.7.6 now registers after vaults (l. 15992, 16107) | Replace "the systems (catacomb, cavern, quarry, vaults), II.7.3's" with "the systems (catacomb, cavern, quarry, vaults and, at generation, a history scar's buried town), II.7.3's" |
| VS2-03 | minor | partial | scope | 88 | §13.2 T88-1 (l. 13558–13560) | T88-1 names each staged reader it proves inert, but omits II.7.6's catacomb age, which reads the staged `HistoryHint.ageYears` when the port fills it (II.7.6 l. 16000; §2.7 l. 1868 lists it as the hint's second reader); round 1's VS1-04 text ("II.7.6") covered it, the named list does not | Replace "the import share at §4.9 and the buried old town at II.7.6) change nothing" with "the import share at §4.9, and the catacomb age and the buried old town at II.7.6) change nothing" (after VS2-04, so the list equals J-A88.42's) |
| VS2-04 | minor | partial | pipeline | 88 | J-A88.42 index row (l. 17140) and Part A (rationale l. 764) | the ruling that states "the staged inputs' readers … at their homes" names `HistoryHint`'s readers as the stage count and the fire or flood scar's buried old town only; the homes state a third — II.7.6's catacomb age reads `ageYears` (l. 16000), as §2.7's comment says (l. 1868) — and the index's stage-count formula drops §4.2 S2's `max(1, …)` (l. 4054) | Index: replace "`HistoryHint` the stage count (min(K, ⌈age ÷ yearsPerStage⌉)) and a fire or flood scar the buried old town only;" with "`HistoryHint` the stage count (min(K, max(1, ⌈age ÷ yearsPerStage⌉))), its age the catacomb rule's age, and a fire or flood scar the buried old town only;"; Part A: replace "`HistoryHint` setting the stage count to min(K, ⌈ageYears ÷ yearsPerStage⌉), the later walled stages folding into the last kept one, its fire and flood scars" with "`HistoryHint` setting the stage count to min(K, max(1, ⌈ageYears ÷ yearsPerStage⌉)), the later walled stages folding into the last kept one, its `ageYears` replacing the age II.7.6's catacomb rule reads, its fire and flood scars"; restate the row under its id (swap) |
| VS2-05 (= VD2-05) | minor | stale | scope | 81 | J-A81.01 index row (l. 17145) and Part A (rationale l. 769) | round 2 made §7.7 item 15 a home of the cap refusal (determinism r2, VS1-01), and §4.11, §5.4, DR23 and §11.4 cite it; J-A81.01's section column ("§1.1, §14") and Part A list omit §7.7, while its sibling J-A81.71 lists it. J-A81.01 is scope r1's ruling (digit 0), so this row claims VD2-05 for scope's seat — apply once | Index: "| §1.1, §14 |" of J-A81.01's row → "| §7.7, §1.1, §14 |"; Part A: "(§1.1, §14, D-33; item 81; repair r1, VSC-21)" → "(§7.7 item 15, §1.1, §14, D-33; item 81; repair r1, VSC-21; repair r2, VD1-01)"; restate the row under its id |
| VS2-06 | minor | partial | scope | 64, 65, 67, 70, 72 | §0.2 rows 64, 65, 67, 70, 72 (l. 237–245) | each row names its home's rulings as a range, and five rulings fall outside the ranges and are cited nowhere in §0.2: J-A64.44 (II.7.3's fallback cellar stair), J-A65.40 (undercity names), J-A67.40 (the island slots' per-year redraw), J-A70.49 (informal tenure at generation — T70-6 cites it) and J-A72.50, J-A72.51 (S10a's re-homing — T72-9 cites it — and the kind-less identity row); all but J-A67.40 came with round 1's pipeline repair, after scope's r1 rows | Row 64: "(J-A64.41 – J-A64.43)" → "(J-A64.41 – J-A64.44)"; row 65: "(J-A65.41 – J-A65.48)" → "(J-A65.40 – J-A65.48)"; row 67: after "the T67 bars (§13.2);" insert " the island slots' per-year redraw at an epoch (II.6; J-A67.40);"; row 70: "(J-A70.41 – J-A70.48)" → "(J-A70.41 – J-A70.49)"; row 72: "(J-A72.40 – J-A72.49)" → "(J-A72.40 – J-A72.51)" |
| VS2-07 | minor | partial | scope | 65 | §16 effort table, the O1 line (its basis cell) | round 2 builds the geology flag's S0 draw and S1 resolution and the relief toggle's S0 pick at M1 "absorbed by the O1 line" (M1 content; J-A65.02), but the O1 line's basis does not name them, while the pricing rule says a pass "names each new mechanism with the line that absorbs it" and every other absorbed c–e mechanism is named in its line (O12: items 54, 55; O17–O19: items 42–47, 57) | Replace "| 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes |" with "| 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes; amendments c–e: the geology flag's S0 draw and S1 resolution and the relief toggle's S0 pick (item 65; J-A65.02) absorbed |" |

**Confirmed from other verifiers, not re-filed:** V-MC2-01 (model; J-A88.21's row in this part), VD2-01 (determinism; J-A68.73's row in this part), VD2-03 (determinism; "§7.7 item 2" pointers in §14 and the index).

## Order for the repair round

1. VD2-01 (determinism) before VS2-01, whose bar follows its door-light wording; VS2-01 with its M3b and M4 exit clauses in one §13.2 / §16 pass.
2. VS2-04 (pipeline's J-A88.42) with VS2-03 (T88-1), so the bar's list equals the ruling's.
3. VS2-05 once, by scope's seat (J-A81.01's owner); determinism's seat drops VD2-05.
4. VS2-02, VS2-06 and VS2-07 are independent.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed or read in place): every quotation and line number above; the word diff of the part against the pre-repair-r2 archive (31 hunks, every one read); the r1 re-check; the index / Part A / J-id / T-id scans and the digit rule; the resolver's two baseline breaks; the held-part, deferral and identifier scans; the §16 re-sums; the title and banner diff; the document-check counts; the absence of any warp bar for J-A68.73's record kinds (grep of §13); the catacomb age as a third `HistoryHint` reader (l. 1868, 16000); the §0.2 ranges' missing ids (script over the index); the anchors of every required change, each occurring exactly once.

**PLAUSIBLE** (reasoning): the milestones proposed for VS2-01's clauses; that VS2-05 belongs to scope's seat by the digit rule; every proposed wording. Each is this seat's vetoable proposal for the repair round.
