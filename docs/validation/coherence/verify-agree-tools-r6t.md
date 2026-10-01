# Verify agreement across the tools — round 6 (coherence/verify-agree-tools-r6t)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-agree-tools-r6t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-agree-tools-r6t`, 2026-10-01)
- P0 brief read whole; round-5 findings (VAT-r5-01..05) and adjudication-r6 (R6-01, R6-05, R6-06, R6-10, Part H for determinism, rendering, V09, V10 and the END lines) read: done
- P1 live sha256 against assemble-r6's after column: done (equal: base f39f1c30…, V09 046b6610…, V10 1014b64c…, V01 bd9b4ceb…, V04 fefd0cd4…)
- P2 round-5 findings re-checked against live text (with each END line's second end): done (4 fixed, 1 partly fixed)
- P3 round-6 blocks in scope (determinism, rendering, V09, V10) re-read whole subsection by subsection: pending
- P4 hunt for matrix gaps among the round-6 changes; issues written; result saved; LANDED: pending

## Method

Members: determinism (base §5–§7), rendering (base §8, §9, §11, §12), V09, V10 — the tools: edit events, dry runs and
their bend lines, undo, the embedding API (§11.2's facade and readers), the editor screens, the clerk's calls and its
why-answers. Inputs read: the brief whole; `verify-agree-tools-r5t.md` and its result; `adjudication-r6.md` — R6-01,
R6-04, R6-05, R6-06, R6-07, R6-08, R6-09, R6-10, R6-11, Part A, Part H for every unit and every END line (R6-02's
crossing table and way-and-channel table read whole at §2.7 in the live text); `assemble-r6.md` (live sha256);
`agreement.json`'s pairs among the four members (V09↔V10 524 subjects, V09↔determinism 28, V09↔rendering 75,
V10↔determinism 30, V10↔rendering 56, determinism↔rendering 48). The round-6 text was found by `git diff -U0
b3f83a0 HEAD` over the live files (assemble-r6's installed state; HEAD `db26bb9`): in scope, 21 hunks of the base
(§5.3's three rows, §6's `GenerationReport.warnings`, §7.1's `dossierFacts`, the raised-way and wall rows and the
`quarter` sugar, §7.3's S7 row, §7.4's dossier row, §7.7's `DossierBinding` and item 10, §8.2's `StyleSheet.groups`,
*Crisis looks* and `hatched` row, §8.4's toggles and the curtain-wall prisms, §8.9's hit-test slice row, T-ER-27, §9.5's
annotation layer, §11.1's 3-D and CityJSON rows, §11.2's `ExportOpts.pins` and `LooksAnswer.over`, T-ER-19), 14 hunks of
V09 and 14 of V10; each was read whole in its live subsection (the full row, comment or paragraph), with the readers
the change names in the other members, and the ends at model §2.1, pipeline §4.9, V01 and V04. Each round-5 finding was
re-checked at every site of its required change as Part H disposed it (FIX, MERGED), END lines included.

## Round-5 findings re-checked

| id | disposition (Part H) | verdict against the live text |
|---|---|---|
| VAT-r5-01 | FIX (R6-06), closes VV910-r5-04 | **fixed.** V10 §2.12's `read_map` `look` takes `field?: Ref` with its comment (l. 954); §2.13's `over` comment carries the field form, absent where the field names none (l. 1025–1029), the projection comment "with a building or a field, over"; §3.5 passes the field where it names one (l. 1465); §1.2's §11.2 row adds "with a field each famine look's `over`" (l. 189); §3.9b (8) carries *A field under a famine look* with the village clause (l. 2066–2070); row 34's edges and outcomes carry the field forms and both together; T-V10-52 runs V08 §7.1's famine fixture (verified at V08 l. 3248), T-V10-50 (33) the field forms. §11.2's `LooksAnswer.over` (l. 16440) states the no-field outcome V10's row 34 cites (VRC5T-05), and §11.2's `looks` member carries `field?` (l. 16393). The harness's `ruinedFor` added to V10's `LookAnswer` agrees with V09 §4.21.12 (4)'s forms (V10 §3.9a's map `line` → `ruinedFor` … `preview` → `ruinedForPreview`). |
| VAT-r5-02 | FIX (R6-10) with V09's END | **partly fixed.** §11.2's `ExportOpts.pins` now draws each public note as a numbered marker (l. 16323–16329), §9.5's annotation layer names notes (l. 15168), V09's entity table carries the END (l. 4171) and T-ER-19 runs a building's, a way's and a withheld building's note (l. 16906). Open: the marker point of a note on a thing with no point or shape of its own (a use, an institution, a person, a room, a record) — the comment sends "any other thing" to "V10 §3.6 rule 1's `EntityCard.anchor`", whose list (V10 l. 1561–1565) names no such kind; and a pin or note whose point lies outside the picture's frame or on a layer the picture does not draw. Kept as VAT-r5-02 below, with VAT-r6-01 (the anchor rule's home). |
| VAT-r5-03 | FIX (R6-10) with V09's END | **fixed.** §8.2 *The layer* (l. 13228–13234) gives a preview's marks as every crisis mark drawn and frames by V09 §4.21.12 (5)'s rule (its three cases named); V09 §4.21.12 (5) (l. 3672–3678) agrees word for word on the three cases; T-V9-85 (l. 4443) runs the handed-over unit on T-V3-40's fixture, its milestone cell scheduled with T-V9-86's. |
| VAT-r5-04 | FIX, amended (R6-10) with ENDs at model, pipeline, V01, V04, V09 | **fixed.** §8.2's `StyleSheet.groups?` (l. 12601: absent ⇒ true, logged `setStyle`, §7.4's style row, no shadow, surface or hit when off, a picture draws what the style draws); §8.4's toggles (l. 13677–13678); §8.2's `hatched` row (l. 13517); model §2.1 (l. 555–556); pipeline §4.9 (l. 8010); V01 §5.1.3 (l. 3037), the T12 bullet (l. 2774–2775), §3.18 (c)'s row (l. 2624) and T-V1-56 (c); V04 l. 2789 and J-V4.96; V09's T12 `dress` rows (l. 1742, l. 1825) and §4.19's Dress list (l. 4003). A viewer cannot send `setStyle` (§11.3 N-15), as it cannot send `setLayer`: consistent. One leftover word at V01 §5.1.3 is VAT-r6-03 (minor). |
| VAT-r5-05 | MERGED into VAH-r5-03 (R6-05) | **fixed** (closed with VAH-r5-03): V10 §3.9b (8)'s *A house under a disaster look* keyed `info.crisis.ruinedFor` in V09 §4.21.12 (4)'s forms (l. 2063–2067); C10 names the key (l. 2749); T-V10-52 runs the previewed `disaster` with `ruinedForPreview`; repair-r5-V09's hand-off closed. |

## Round-6 blocks in scope re-checked

(to be written)

## Issues

(to be written)
