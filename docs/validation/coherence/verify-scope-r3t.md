# verify-scope-r3t — the SCOPE part after repair round 3 / assemble-r3

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-scope-r3t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-scope-r3t`, 2026-10-01, cloud checkout)
- P0 brief read whole; resume check (no output, no LANDED): fresh start — done
- P1 inputs: verify-scope-r2t + result, adjudication-r3 (R3-01 – R3-03, R3-08, R3-15, R3-20, R3-25, R3-26, Part H · scope and the END lines touching scope; R3-09 – R3-24 read for scope effects), repair-r3-scope, assemble-r3; live = assemble-r3 output (base 593c657d…, rationale e7b59eac…, INDEX 90e2844a…); pre-round-3 copies from HEAD 920d280d — done
- P2 round-2 findings VCS-r2-01 – VCS-r2-06 re-checked against the live text, each END line's second end — done (all six FIXED, every end)
- P3 every round-3 block in scope re-read subsection by subsection (§1.1, §13.2, §13.4, §13.8, §14, §16, Appendix A, the judgment index's restated and new rows, INDEX §1) — done
- P4 cross-checks (index = Part A, T-ids, references, retired terms, deferral, phone clauses, review ids, volume §8 prices, doc_checks, sizes) — done
- P5 report, result file, LANDED — done

**Verdict.** All six round-2 findings are FIXED at every end. The round-3 blocks in scope apply their rulings as written. The
one deviation the repair seat recorded (T114-3's "as the first clause states" in place of the END's "as T114-1 states") is
sound. **8 issues, all minor (0 blocker, 0 major)**, every one of them bookkeeping or wording that changes nothing built or
tested (J141). Owners: scope 3, V08 1, V10 1, V11 1, V12 1, rendering 1. No nuance was lost: the unit grew this round and
nothing was cut. doc_checks exit 0, provisional (the reference corpus is incomplete in this checkout).

## 1. Round-2 findings, re-checked on the live text

| id | Part H | status | evidence (live line numbers) |
|---|---|---|---|
| VCS-r2-01 (scope, minor) | FIX | **FIXED** | J-A120.01's index row (l. 22649) and Part A entry (rationale l. 836) both price item 120's base parts by absorption into the O11 and O12 lines, the overlay provider and panel being volume 9's AP11 (J-A568.05). J-A568.05 (l. 22656) and §16's O12 row (l. 20017) are unchanged, and the two rows now agree. |
| VCS-r2-02 (V08, major) | MERGED into G125-V08, per R3-20 (1) | **FIXED** | V08 §2.4 *Selection* (l. 688–702) is in VCS-r2-02's words: the dossier selects, and `HostContext.line` is checked, never chosen from. The `line_differs` note is of class `report`. Also landed: B19 (l. 2035), T-V8-11's two-adapter clause (l. 3210), T-V8-61 (a)/(b) with an empty `id` and an empty `schemaVersion` (l. 3260), J-V8.133 and J-V8.134 (l. 3526–3527), and J-V8.9's amendment (l. 3402). The base's ends are §14's `HostContext.line` comment (l. 19411) and port item 5 (l. 19523–19525), both in the END line's words, and §11.3 (l. 16580). Item 125 (e) holds: one dossier makes one document and hash with and without a host context. |
| VCS-r2-03 (scope; regraded major) | FIX | **FIXED** | §13.4's fallback (l. 18640–18641), §1.1 (l. 317) and T126-1 (l. 18456) are in the required words. V09's END is written: §4.12 (l. 2549–2551) is "a default only, switchable back on and never removed (item 126 (e))", and T-V9-22 (l. 4306) reads "with `AppPrefs.touch.editFabric` on (T126-1)". |
| VCS-r2-04 (scope, minor) | FIX per R3-15; VV12-r2-07 MERGED | **FIXED** | §16's M3b item-122 clause (l. 19978) places the districts at M5 (W10), the ruined exterior with M6 (V02 §8.6) and the plan damage with volume 3's P4. It says each draws nothing until it lands, citing §10.2 *Crisis looks*: the repair seat's judgment 1, sound, because inside §16 the citation "(§16)" would point at itself. M5 (l. 19981) carries the content once and names the district clauses in its exit list. §13.8 (l. 19084) reads "M3b (the `disaster` look's district clauses from M5)". The rule itself is at §10.2 (l. 15482–15486, "(§16)"), and V02 §8.6 (l. 3878) and V03 §8 (l. 32–35) agree. |
| VCS-r2-05 (V02, minor) | FIX | **FIXED** | T-V2-24 (V02 l. 3601–3606) names "T119-2's stage-3 export clause". |
| VCS-r2-06 (scope, minor) | FIX | **FIXED** | Appendix A (l. 22725–22728) adds the required sentence. It agrees with file g items 122 (h) (l. 1322) and 125 (d). |

## 2. The round-3 blocks in scope

Scope's repair replaced seven base subsections and INDEX §1 by count-asserted substitutions; every untouched line is
verbatim. A word diff against HEAD 920d280d shows 36 changed hunks in the part. Each one was read in its subsection:

* **§1.1** — one sentence (VCS-r2-03). Sound.
* **§13.2** (21 hunks):
  * T110-2 gains VKr2-02's frame-growth clause per R3-25 (b). It cites §3.10's stored-references row (l. 4697) and §3.2 (9)'s two-L0-batch form (l. 3600–3614, = J-A81.31's restated row), both present.
  * T110-2 also gains VEW-r2-01's END clause: the c14 viaduct crossed at a gate by a later ring, and the epoch circuit across a standing aqueduct, citing §2.7's support step (6) (l. 2559–2570), which states that outcome.
  * T114-3 gains VM-R2T-03's END fixture, citing §2.7's support step (3) (l. 2540–2553) and V06 §3.7.7 (2) (l. 1629–1632). The seat wrote "as the first clause states" in place of the END's "as T114-1 states". **Sound:** the fixture's neglected, poor ring is V06 §3.7.7 (2)'s "both low" case, which decays (T114-3's first clause), while T114-1 is the threatened ring that patches. T-V6-73 takes T114-1 – T114-5 whole, so the clause is carried.
  * T116-4 is VEW-r2-02's text. §8.7 (l. 13999–14000) states the limit bounds and the town-and-camps case it cites, and the stop-0 clause stays in T116-1 only.
  * T122-4 is VV78-r2-10's END. V08's T-V8-59 and V11's T-V11-46 (a) check the same three lists.
  * T123-4 is VV56-r2-01's END per R3-08 (a).
  * T126-1 is VCS-r2-03's text.
  * The runs lists of items 111, 112, 113, 114, 115, 119, 122, 123 and 126, and the take-over table's rows, carry VAP-r2-01's texts and R3-26's registrations. Every volume test now cited was checked against its volume. T-V7-58, -59; T-V6-71, -72, -73; T-V4-76, -77; T-V8-50, -51, -59, -62; T-V9-72; T-V3-37, -40; and T-V2-58, -59, -60 run what the base says, and their heads name it. The exceptions are VCS-r3-01 – VCS-r3-06 below.
* **§13.4** — one clause (VCS-r2-03). Sound.
* **§13.8** — three cells:
  * T110 (VKr2-02 and VEW-r2-01's epoch clauses from M4 on the hook fixtures, the circuit with M6-E's E3).
  * T122-2/-3/-5/-6 (VCS-r2-04).
  * T126 (VAP-r2-14's text = T-V9-22's milestone cell = T-V12-59).

  All sound.
* **§14** — three changes:
  * `HostContext.line`'s comment and port item 5 (G125-V08's END per R3-20 (1)).
  * The `Exporter` comment and `displayNames`' citation (the seat's judgment 4, rendering's hand-off VRC2T-12). §11.2's `Format` (l. 16055) and `ExportOpts` (l. 16056, `displayNames` l. 16066) resolve.

  All sound. Port items 2–4 (l. 19496–19519) agree with R3-20 (2): `E_UNKNOWN_SHAPE` and `E_LINE_UNSUPPORTED` apply only when no adapter recognises or accepts, and `E_OTHER_SETTLEMENT` only for a digest of another settlement.
* **§16** — three rows:
  * M3b and M5 (VCS-r2-04).
  * M3c (VV910-r2-07: "C4's item-120 content — the find form and read", = V10 §8's C4 row, l. 18 and l. 25).

  No price moved. Every volume §8 holds the same person-week ranges as at round 2 (scripted comparison of all twelve), so verify-scope-r2t's sums (230.75–315.25 / 187.85–264.1 / 418.6–579.35) stand. The round's §8 text changes (V01 §8.1 `campLand` at village rungs at V-M3; V02 §8.6; V04 U5 "at the later of U5 and V03's P4"; V08 §8.1–§8.3; V09 §8.1; V10 C1; V11 C9) are wording, placements §16 already implies, or citations that replace review ids.
* **Appendix A** — VCS-r2-06. Sound.
* **The judgment index** — J-A120.01 restated (scope), J-A81.31 restated (kernel), J-A68.89 restated (rendering, the index's established "…" short form) and eight new rendering rows (J-A121.02 – J-A121.07, J-A122.02, J-A124.02). The index has 805 rows = Part A's 805, in the same order, with no duplicate. Each new row agrees in meaning with its Part A entry, except one retired term (VCS-r3-07).
* **INDEX §1** — the V10 row (VV910-r2-07). Sound.

The other scope issues of Part H are closed as written: VAP-r2-01 (per R3-26), VAP-r2-14, VEW-r2-02, VKr2-02 (per R3-25 (b))
and VV910-r2-07. So are the five END lines (VV56-r2-01, VEW-r2-01, VM-R2T-03 as above, G125-V08 and VV78-r2-10).

**Rulings routed elsewhere, read for effects on scope.**
* R3-09 – R3-14 (crisis looks): §13.2's T122 bars and §0.2 row 122 state nothing they supersede. R3-14 (3)'s carriageway rule now sits in V12's `crisis.blocked`, but T122-6's text does not name it (VCS-r3-08). T-ER-27 (l. 14581) tests the carriageway and footprint clauses.
* R3-18 ("the creation week" against "the present at creation"): scope's one use, J-A67.47 "the creation week shows a finished town", is true under §4.11 (1)'s definition (l. 8330–8334).
* R3-21: §17.1 (9)'s `view.set` and `time` (l. 20266–20268) agree with §11.3 (l. 16511–16523).
* R3-24: the drawn-week case is tested (T-ER-27; V10's `read_map find` row).
* No scope text states the superseded R2-37 (6) end of the disaster look, R2-38 (3)'s restoration words, or R2-40 (2)'s "`line` picks the adapter" (searched).

## 3. Cross-checks on the whole part

* **Ids.** Base T-ids: 341 defined in §13, all 341 cited in scope defined, none undefined. The one double count is T101-6, whose second hit is a citation, not a second definition. Volume test ids: 148 cited, all defined (T-V2-31 in V02's bold-bullet form). Judgment ids: index = Part A, 805 rows, 0 duplicates.
* **References.** assemble-r3's refs.py reports 0 broken across the set. Every reference new in scope this round was opened and resolves to text stating what is cited: §3.10, §3.2 (9), §2.7 `RaisedFoot` (l. 2301), §2.7 support step (3) and (6), §8.7, §10.2 *Crisis looks*, V02 §8.6, V01 §3.16, V09 §4.12, §11.2's `ExportOpts`/`Format`.
* **Retired terms** (canon's 35 patterns over the part): the hits are the round-2 set (G-lot 27, G-unitinput 3 — "hand-over" there is the crisis look's, not the retired unit-run view —, G-M6U 1, all judged in earlier rounds). One new hit: G-refview in J-A121.02's new index row (VCS-r3-07).
* **Deferral wording:** only the owner's quoted "private for now" (l. 133, 188, J-A21.81), as in every earlier round.
* **Phone clauses (item 126 (a2)):** none asks for a phone view. The summary (l. 94–95), §0.2 row 126, §1.1 (l. 313–314), T126-3 and §16 (l. 20024, "item 126 retires the narrow class") all state its absence.
* **Review ids in design text** (R3-02): none in the part.
* **doc_checks.py** `--sections "0,1,1.1,13,13.2,13.4,13.8,14,15,16,17,Delegated decisions,Judgment calls,Staged,Appendix A"`: **exit 0** — C1 5/0, C2 1/0, C3 439/0, C4 2/0, S1 0/0, S2 251/0 (hits/unreviewed). **WARNING printed: reference corpus INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs, research/external missing) — NOT authoritative; provisional.** INDEX information run: C3 21/17 and S2 83/83, identical to the repair seat's record for the live INDEX. Its S2 pointers resolve against the base, not INDEX's own headings.
* **Sizes (principle (9)).**
  * Scope part: 104 074 → 105 110 words (+1 036, +1.0 %). Scope's own blocks account for +591: §1 +7, §13 +439, §14 +22, §16 +73, Appendix A +50, the J-A120.01 row. Rendering's eight new index rows and kernel's restated J-A81.31 row account for about +445.
  * INDEX: 4 049 → 4 054.
  * Against the archive, the scope part is 98 458 → 105 110 (+6.8 %). What holds it is items 111–126's design, which reached the program after the archive: bars, schedule rows, owner-item rows and decision rows. That is irreducible content, not a defect.
  * Nothing was removed this round, so the more-than-half nuance audit does not apply. No elegance ruling was routed to scope this round.
* **Edges (principle (11)).** The new clauses each bring their edge with a defined outcome and a bar:
  * a raised way's ring-end foot through a frame growth (T110-2, §3.2 (9), J-A81.31);
  * a trace or moat laid across a standing raised way (T110-2, §2.7 (6));
  * the band under a crossing station on a neglected, poor ring (T114-3, §2.7 (3), V06 §3.7.7 (2));
  * an export with no window, and an export at the METROPOLIS cap (T116-4, §8.7);
  * touch with the fabric default off (§13.4, V09 §4.12);
  * the disaster districts before M5 (§10.2, §16).

  No undefined or untested edge found.

## 4. Issues

All MINOR under J141: in each, nothing built or tested changes. R3-03 (a)'s bookkeeping class covers VCS-r3-01 – VCS-r3-06.

**VCS-r3-01** (scope · minor · COHESION). *The take-over table's calibration row leaves out bars V12's tests run.* VAP-r2-01
itemised the row by test, but three tests run more than their entry lists:
* T-V12-46 also holds `item113.history` (T113-7's pin, l. 3151 of V12), but the row gives it "T113-2 and T113-5's registration".
* T-V12-47 also holds `item114.condition` (T114-8's pin) at generation and over epochs (V12 l. 3152), but the row gives it "T114-4 – T114-7".
* T-V12-49 also holds `item117.season` (T117-1), `item118.festival` (T118-1) and the specs `T117i.arid`, `T117i.ice` and `T117i.styles` (T117-4, T117-5, T117-7) (V12 l. 3154), but the row gives it "T117-2 and T118-2 – T118-6".

The same section's runs lists say volume 12 runs "the specs, the pin and the register lines (T-V12-47)" and "the specs and
the pin (T-V12-49)". Table and lists therefore disagree, against R3-26's "carry the same ids".
*Required change:* in §13.2's take-over table, the calibration row's clauses read "T113-2, T113-5's registration and
T113-7's pin (T-V12-46); T114-4 – T114-8 (T-V12-47); … T117-1, T117-2, T117-4, T117-5, T117-7 and T118-1 – T118-6
(T-V12-49)", the rest unchanged. Item 113's runs list reads "… volume 12 their register lines, T113-7's pin and the
replay's budget (T-V12-46)". V12's heads follow (VCS-r3-02).

**VCS-r3-02** (V12 · minor · COHESION). *V12's heads for items 111–114, 117 and 118 name no base bar they take.* R2-08
requires a volume test's head to name each base bar it takes. T-V12-48, -50 and -52 – -59 do. T-V12-44, -45, -46, -47 and
-49 (V12 l. 3149–3154) do not, though scope's table now assigns them bars by id. No round-3 issue carried this end.
*Required change:* the five heads read as follows, each agreeing with scope's table as VCS-r3-01 corrects it:
* T-V12-44: "**Item 111's bars are wired** (takes T111-1 – T111-5: their specs and `item111.water`)."
* T-V12-45: "**The style line and the trial's findings (item 112)** (takes T112-1's style line)."
* T-V12-46: "**Item 113's registrations** (takes T113-2's five-engine digest, T113-5's `T113e.lost` and T113-7's pin `item113.history`)."
* T-V12-47: "**Item 114's specs and bench bars** (takes T114-4 – T114-7 and T114-8's pin `item114.condition`)."
* T-V12-49: "**Items 117 and 118** (takes T117-1 and T118-1's pins, T117-2, T117-4, T117-5 and T117-7, and T118-2 – T118-6)."

**VCS-r3-03** (V08 · minor · COHESION). *T-V8-59's head omits the registration its last clause runs.* The head (V08
l. 3258) reads "takes T122-4's census clause". Its last clause is "the `item122.crises` registration of the frozen dossier
set's crisis conditions …, written by the SF4 seat". Scope's table and item 122's runs list both assign T-V8-59 "T122-1 and
T122-7's `item122.crises` registration" (R3-26; scope's HAND-OFF).
*Required change:* the head reads "item 122 at the port (takes T122-4's census clause and T122-1 and T122-7's
`item122.crises` registration; V08 §3.16 (7))".

**VCS-r3-04** (V10 · minor · COHESION). *T-V10-45's head names no base bar.* The head (V10 l. 3113) reads "item 111's
explanations and forms:", while its last clause is "the `item111.water` registration of the reader and why goldens …,
written by the C1 seat". Scope's table and item 111's runs list assign T-V10-45 "T111-5's `item111.water` registration".
V10's other take-over heads use the "(takes …)" form (T-V10-48, T-V10-51).
*Required change:* the head reads "item 111's explanations and forms (takes T111-5's `item111.water` registration):", and
the last clause reads "— T111-5's `item111.water` registration of …".

**VCS-r3-05** (V11 · minor · COHESION). *T-V11-38 – T-V11-41's heads name no base bar.* Their (b) clauses (V11
l. 5024–5027) register `item111.water`, `item113.history`, `item114.condition`, and `item115.off` with `item115.ceiling`. Scope's
table and runs lists assign them T111-5, T113-7, T114-8 and T115-4 respectively. V11's other take-over heads use
"(takes …)" (T-V11-42, -46, -48).
*Required change:*
* The heads read "item 111's rows (takes T111-5's `item111.water` registration):", "item 113's rows (takes T113-7's `item113.history` registration):", "item 114's rows (takes T114-8's `item114.condition` registration):" and "item 115's rows (takes T115-4's `item115.off` and `item115.ceiling` registrations):".
* Each (b) clause names its bar before "registration": T111-5's, T113-7's, T114-8's, T115-4's.

**VCS-r3-06** (scope · minor · WIRING). *T110-2's epoch circuit clause, new this round, has no named take-over.* §13.8
(l. 19050) runs it "on volume 6's engine with M6-E's E3". Yet the take-over table's evolution row names no T110 bar, the
T110 group has no runs list for it, and T-V6-47 names no base bar. T-V6-47 (V06 l. 4114) runs that case in substance: on
H-AQUA, an aqueduct crossed by a new circuit and a later contraction, one crossing station each, 0 supports in the
strip, the raised way left standing.
*Required change:*
* The evolution row adds "T110-2's epoch circuit clause (T-V6-47)," after "T108-4 over epochs (T-V6-45),".
* The T110 group adds "Volume 6 runs T110-2's epoch circuit clause on its engine (T-V6-47)." after T110-7's registration list.
* V06's end: T-V6-47's text adds "(takes T110-2's epoch circuit clause)".

**VCS-r3-07** (rendering · minor · TERM). *The retired "reference view" in a new index row.* J-A121.02's index row
(l. 22657) reads "so the mid tier's lit reference view (D = 2)". The canon retires "reference view" for "reference
viewport" (G-refview), and the row's own Part A entry (rationale l. 844) says "reference viewport".
*Required change:* the index row reads "… so the mid tier's lit reference viewport (D = 2) is lit at DPR 1 with its text
layer, 103.75 MB". Rendering's own text carries the same retired term at §8.8 l. 14172 and l. 14176, §12's R12-38 row
(l. 17298) and the Part A entries J-A68.85, J-A68.89 (restated this round) and J-A68.90. These lie outside scope, for
rendering's verifier.

**VCS-r3-08** (scope · minor · CONFLICT). *T122-6's text is narrower than its own statistic.* T122-6 (l. 18407–18408) bars
a look on water, in a gate's passage or over a label's keep-out (`crisis.blocked` 0). Its statistic, rewritten this round
(V12 §3.15.12 l. 2706, T-V12-54, VRC2T-04 per R3-14 (3)), is "`crisis.blocked` 0 — water, a gate's passage and a label's
keep-out, and a way's carriageway save a `barricade` across it". §10.2 (d) (l. 15513–15516) states that rule. T-ER-27
tests it, so nothing tested changes, but the bar's one statement and its statistic disagree.
*Required change:* T122-6 reads "(T122-6) nothing stands on water, in a gate's passage or over a label's keep-out, and on a
way's carriageway only a `barricade` across it (§10.2 (d)), and several crises share the outskirts by `priority` under
`densityCap` (§10.2's placement; `crisis.blocked` 0)".
