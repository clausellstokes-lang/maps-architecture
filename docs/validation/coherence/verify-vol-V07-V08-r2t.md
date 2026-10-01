# Verify round 2 — V07 (the village) and V08 (SettlementForge) after repair round 2

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V07-V08-r2t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V07-V08-r2t`, 2026-10-01, cloud checkout)
- P0 brief read whole; resume check (no output, no LANDED line: fresh start); inputs located — adjudication-r2 (R2-01 – R2-42, Part H · V07, V08, V11, scope), repair-r2-V07/-V08 reports, assemble-r2, the canon's routings of items 120–126 and its adjudication-r2 entry, file g items 122, 122 (h)–(i), 125, 126; live V07 `8a4302dc…` and V08 `f92c2a85…` equal assemble-r2's after-hashes; pre-round text from HEAD 682e8e99 (V07 `02f8dbb4…`, V08 `b96e79d8…`, assemble-r2's before-hashes): done
- P1 the ten round-1 findings re-checked against the live text and the rulings: done
- P2 every round-2 hunk of V07 (21 blocks, 51 hunks) and V08 (38 blocks, 160 hunks) read in its whole subsection by word diff, the routed fixes checked against their rulings and the receiving ends of Part H: done
- P3 owner items 120 and 122 at V07; 120, 122, 122 (h)–(i), 125 and 126 at V08 — wiring, lifecycle, edges, tests and agreement with model §2.7/§2.9, determinism DR42/DR44, pipeline §10.2 *Crisis looks*, rendering §8.2, V01 §3.16, V02, V06 §3.22, V09 §4.21.12/§5.8, V11 §3.25.9, V12 §2.13/§3.15.12: done
- P4 ids, references, terms, deferral and narration, phone clauses (R2-41), title-block ranges (R2-07), scope's price lines (R2-06 (b)), take-over rows (R2-08), pin registrations (R2-09), sizes, doc_checks (provisional): done
- P5 report, result file, LANDED: done

Method. The pre-round text is the committed HEAD `682e8e99` (each file's sha256 equal to assemble-r2's "before"); the live text
equals assemble-r2's "after". Each volume was diffed word by word (`git diff --no-index --word-diff`) and every hunk read in
its whole subsection; the new subsections (V07 §5.6, V08 §3.16 (7)–(10)) were read whole from the live file. Other seats'
round-2 verifier results that had landed (pipeline, determinism, rendering, model, kernel, scope) were read for overlap; where
one of mine is the same defect, the issue says so (ONE FIX), and its required change is written here in full.

## 1. Round-1 findings re-checked

| id | owner | verdict | evidence (live text) |
|---|---|---|---|
| VV78-04 | V11 | FIXED (R2-14) | V11 W83 (l. 241) "'specified' is V08 §3.16 (3)'s reading"; §3.25.4's *"Specified"* bullet (l. 4307) "is V08 §3.16 (3)'s reading"; the VILLAGE ceiling row "a lord (a `seigneurial` government) or specified". |
| VV78-12 | scope | FIXED (R2-06 (b)) | V07 §8 sums to 30.5–43 (V-M0 1.25–1.75, V-M1 9–11.25, V-M2 7.5–10.75, V-M2u 1–1.5, V-M3 9.75–14.75, V-M4 2–3); §16 l. 19742 ("items 111, 113–120 and 122 at the village rungs \| 30.5–43 pw"), l. 19785 and INDEX l. 30 carry it; V08's 18.5–25.25 (SF0–SF7 + VH re-summed) at §16 l. 19750, l. 19786 and INDEX l. 31; the staged total 187.85–264.1 and the second total 418.6–579.35 re-sum exactly. |
| VV78-21 | V07 | CLOSED — INVALID (R2-03) | not re-raised; V07 §2.1 declares `ProductDecl` as the amended canon line states. |
| VV78-r1-01 | V07 | FIXED (R2-14) | J-V7.136 "'specified' read as V08 §3.16 (3) reads it, or the author's placement"; W78's producer "a dossier's specification (V08 §3.16 (3))" and its dossier column R2-14's gloss word for word; the dossier trace (l. 322–324) the same gloss; T-V7-63's fixtures add a HAMLET `castle` or `tower_house` record. No other narrower gloss left (V07 §3.8 l. 1813, §3.11 DR11 l. 2208 and the §3.17 row cite V08 §3.16 (3)). |
| VV78-r1-02 | V07 | FIXED | V07 §8 (l. 3709) "§16's village line and INDEX §1 carry it". |
| VV78-r1-03 | V07 | FIXED (R2-12) | W46 (l. 254) and V07 §3.16 (3) (iii) (l. 2870) read `UnderOpeningRow`; no bare `OpeningRow` left. |
| G122-V07 | V07 | FIXED — written at build depth | V07 §5.6 (1)–(8), W84, §2.6's derived row, §3.17's edge row and four combination rows, §4.5's crisis line, §5.1/§5.2/§5.4/§5.5 ends, T-V7-69, T-V7-60 (h), V-M3's content and price (+0.25–0.5), risk (14), J-V7.146, §12. Its seams with other units are not all closed at their far ends: VV78-r2-05 (pipeline), VV78-r2-06 (V01), VV78-r2-07 (V06), VV78-r2-08 (V09). |
| G122-V08 | V08 | FIXED — written at build depth, one wiring gap | V08 §2.4's census `crisis` lists, §2.5's crisis fields, §3.16 (7), W96–W97, the §2.7 rows, §3.17's rows, T-V8-59, J-V8.128, SF4. The calamity → `disaster` row is never reached: VV78-r2-09. |
| G122h-V08 | V08 | FIXED | V08 §3.16 (8) (a)–(d), three IN DEVELOPMENT field-table rows with fallbacks, `forces` in §2.3/§2.5, §3.17's forces row, T-V8-60, J-V8.129, item 125 (d)'s brief lists them. |
| G125-V08 | V08 | PERSISTS in two parts | Done: the fallback column on every read row, `field_fallback` (§2.4, §4.6), `presentWeek` and the one week sentence (§3.16 (4) = R2-40 (1)), `week`/`realm`/`customLibrary` retired at every site (offer, `refresh`, `MountSpec`, `offer`, W40, W42 retired, W64, W72, §2.5, §2.6 `climates`, §2.6b, §2.7, §2.8, §3.5, §3.6, §3.11, §3.13 (8), §3.15), §3.16 (9)'s final-check brief, T-V8-61, J-V8.130/.131, the amended marks, BCR-V8-24 withdrawn. Not done: (1) §2.4's *Selection* lets `HostContext.line` decide the document where two lines accept — against item 125 (e) and R2-40 (2); (2) six read rows keep "none" for an empty or unreadable value, which §3.5 step 3 refuses — against item 125 (b) and R2-40 (3). |

Ids outside these keep their earlier verdicts.

## 2. Round-2 blocks in scope, re-read whole

**V07** (21 blocks: 20 leaf REPLACEs and the APPEND of §5.6). Every routed fix matches its ruling:
VAH-r1-16 (R2-10: §4.5 "§11.2's `WhyAnswer`"); VAH-r1-20 (R2-11: W77, W80, W81, the trace, §3.4 (8), §3.11, T-V7-62,
J-V7.135 cite DR41/DR42/DR43; 0 "calendar row" or "traditions row" left); VAL-R1-03 = VPC-R1-06 = VV78-r1-03 (R2-12);
VAL-R1-09 (R2-26 (d): §3.5a (5) cites §4.6 S8's strip and `raisedWays.structure.stripMarginM`, `stripClearM` gone from §2.2a and
§2.2, J-V7.83's village rule kept); VAL-R1-10 (R2-34: §5.5 (3) verbatim); VAP-r1-01 (R2-08/R2-09: T-V7-58 – T-V7-68 heads name
their bars, every pin states its registration, T-V7-63's `item115.off` clause); VAT1-04 (R2-19: §3.12's two sentences and the
three §2.6 cells cite §7.4 *Replay semantics*); VV78-r1-01/-02 as above. Receiving ends: R2-28 (a) (§3.16 (1) reads
`Terrain.mining`, §4.2 S1 (10)); R2-32 (T-V7-68 at the later of V-M3 and M5; risk (13)); R2-09 (T-V7-68's `item120.find`).

R2-29 (b) cut V07 §5.1's season and festival paragraphs to citations of §8.2. I checked every removed fact against §8.2's
*Seasons* rows, the place table and *Festival decorations*. All are there — field phases (`field.*`), orchard blossom,
meadow high and mown, evergreens, snow, the ice order by `lagWk`, open leads at the mill race, the leat's take-off and springs,
an oasis never freezing, crack lines, boats hauled up, the view sun, crown colours with `earlyGreenShare`, the leaf cover on
crofts, closes, toft yards, the churchyard and roofs gathering at palisade, hedge and yard-wall lines, bracken and stubble, the
staging places at a village rung, keyed placement off carriageways and passages, motifs and bands — with two exceptions.
Creepers on the churchyard wall, a free-standing wall, fall outside §8.2's creeper rule (buildings only), and a church staging
now resolves to the church's plot, not "the churchyard gate". Neither is raised. Each was V07 restating §8.2 with different
content; R2-29 (b) resolves that by the base's precedence (principle (3)), naming what V07 keeps. The two cases are in neither
VAL-R1-11's nor VAL-R1-12's ruled text. Item 117 (f2)'s "creepers on walls turn red" is met by §8.2's building creepers. The
repair's own equivalence note records both.

V07 §5.6 agrees with DR44, §2.7/§2.9 (`crises`, `week` in [`sinceWeek`, `untilWeek`), *The crisis framing*), §8.2
(`live.crises`, slots 15b/19b, the `extension` marker for the parity presets, the crisis roles), V01's `DisasterUnit` shape
and V01 §3.16 (5)'s count, V06 §3.22 (3)'s `crisisLookYields`, V09 §4.21.12 (4)/(7) (`info.crisis.ruinedFor`, the `crises`
section) and V11 §3.25.9's village cells. The seams not closed at the far end — V07's own HAND-OFFS — are VV78-r2-05 to
VV78-r2-08. The barricade-on-carriageway conflict V07 also handed off is raised by verify-rendering-r2t (VRC2T-02, VRC2T-03).
V07 §5.6 (7)'s stakes "at its way crossings" and the blockade "on the entries' ways" agree with the owner's barricaded roads and
need nothing once §10.2 (d) names the exception. V12 §3.15.12 names T-V7-69 by description ("its village test taking T122-5 and
T122-6"), which resolves.

Item 125's retirements in V08 reach three V07 texts this round's blocks touched or left standing: the VS1 latitude rule
(VV78-r2-01), the realm-block river course (VV78-r2-02, the same defect as determinism's VDC2-15) and the campaign calendar's
week (VV78-r2-03). §5.5's Find key "saved only in view pins — never in the document" contradicts §2.9 (VV78-r2-04, the same
defect as model's VM-R2T-11, plus its §3.17 row).

**V08** (38 REPLACEs). Every routed fix matches its ruling: VAH-r1-02 (R2-18 (c): §4.3's first sentences and §3.3's absorb
bullet); VAH-r1-09 (R2-10: §3.6 (4) "§11.2's `WhyAnswer.profile`"; J-V8.101 kept as a record, as R2-10 rules); VAP-r1-02
(R2-08/R2-09: T-V8-50 – T-V8-55 heads; T-V8-53's `item115.ceiling` registration; R1 and §1 name every taken bar); G126-V08
(R2-41: §3.16 (10), §3.1 step 1, W100, T-V8-62 with its 599 × 479 clause, J-V8.132, SF6; only the routed statements of
absence remain); VM-R1T-07 (R2-13/R2-23: §3.15 (2) cites §2.7's `HistoryHint`, whose declaration carries every field mapped).
Receiving ends: R2-31 (a) (§3.6 (3)'s catch-up and §6's row cite V06 §6.8 (6)); R2-33 (c) (§3.16 (4) and (6) (g) word for
word); R2-32 (T-V8-58 "at the later of M-SF and M5"); R2-35 (T-V8-58's head names T120-2's dossier clause). The migration of
older documents' `port-values.latitudeDeg`, `site.climate` and slices is defined (§2.7's rows). §14 and the base's index carry
`HostContext` without `week`, `realm` or `customLibrary`, `field_fallback` in `PortNote`, and `RealmBlock` retired (J-A125.01).

V08 problems: the `line` selection and the required rows' fallbacks (G125-V08); the unreached `calamity` row (VV78-r2-09, the
same defect as pipeline's VPC-R2-03); the census list names V11 checks (VV78-r2-10); and eight adjudication-ruling ids cited in
design text (VV78-r2-11). The base and ten volumes cite none; V09 cites 56, the class model's VM-R2T-09 raised there.

## 3. Owner items 120–126 in scope

| item | unit | part | verdict |
|---|---|---|---|
| 120 | V07 | §5.5, W83, T-V7-68 at the later of V-M3 and M5, its `item120.find` registration, risk (13) | present; VV78-r2-04 |
| 120 | V08 | §3.16 (6), W95, T-V8-58 at the later of M-SF and M5, SF6 | present; agrees with §2.9's `FindChip` dossier chip (V08 §3.16 (6) (e)) and R2-33 |
| 122 | V07 | §5.6, W84 | present; seams VV78-r2-05 – VV78-r2-08 |
| 122 | V08 | §2.4 census, §3.16 (7), W96–W97, T-V8-59 | present; VV78-r2-09, VV78-r2-10 |
| 122 (h)–(i) | V08 | §3.16 (8), the three IN DEVELOPMENT rows, T-V8-60 | present; agrees with §10.2 (c)/(f), DR44 and V09 l. 377 |
| 125 | V08 | §2.4's fallback column, §3.16 (4), (9), W98–W99, T-V8-61 | present; G125-V08 persists in two parts |
| 126 | V08 | §3.16 (10), W100, T-V8-62 | present; no phone layout, screen, notice, catalogue row or default written |
| 121, 123, 124 | V07, V08 | not routed here | — |

Each part names its producer and readers, its lifecycle (V07 §2.6's derived row; V08 §2.7's rows), its edges (V07 §3.17's row
and combinations; V08 §3.17's crisis, forces, one-input and frame rows) and its test. None makes a look reach the model, the
document or its hash.

## 4. Ids, references, terms, deferral, phone clauses, ranges, prices, sizes, document checks

- **Ids.** V07: T-V7-1 – T-V7-69 (69, no duplicate), J-V7.1 – J-V7.146 (146), W1 – W84 less W40 (83; W40 was already absent
  before this round and nothing cites it). V08: T-V8-1 – T-V8-62 (62), J-V8.1 – J-V8.132 (132), W1 – W100 less the retired W42
  (99). No collision.
- **References.** Every new citation in the blocks resolves: V01 §2.3, V01 §3.16 (1)–(5), V01 §5.4 (6), V06 §3.22 (2)–(3),
  V09 §4.21.12 (4)/(7), V09 §4.21.10 (3), §2.9 *The crisis framing*, §8.2 slots 15b and 19b, the `extension` marker, §4.2 S1 (10),
  T114-9, T120-1/-2/-4, T122-4/-5/-6, T125-1 – T125-3, T126-2/-3 (assemble-r2: 0 broken in the set).
- **Take-over and pins.** §13.2's V07 and V08 take-over rows (base l. 18226, l. 18227) list exactly the bars the tests' heads
  take; V12 §2.13's pin rows list T-V7-33, -38, -58, -59, -62, -63, -65, -66, -68 and T-V8-50, -53 with the pins V07 and V08 name.
- **Terms and deferral.** No retired term is left in the blocks (`OpeningRow`, `stripClearM`, "calendar row", "traditions row",
  `realm_block_used`, `RealmBlock`, `customLibrary` as an input), and no deferral wording. Narration: VV78-r2-11.
- **Phone clauses (R2-41).** V07: none. V08: only item 126 (a2)'s routed statements of absence and T126-3's absence scan.
- **Title blocks (R2-07).** V07 l. 10 and V08 l. 10 read "items below 200 the owner's"; V08 l. 15 "`DR1`–`DR44`". Subset lists
  are explicit: V07 §1, §12 and §16 name "items 111, 113–120 and 122".
- **Scope's prices (ROUND-2 NOTE (6)).** They agree with both volumes as they stand (VV78-12 above).
- **Sizes** (whitespace-split words). V07 94 314 → 97 882 (+3.8 %; archive 102 339, so −4.4 % against it). V08 78 319 → 84 871
  (+8.4 %; archive 82 775, so +2.5 %). The growth is owner items 120, 122, 125 and 126 at build depth. Neither volume shrank by
  more than half, so no nuance audit is triggered.
- **doc_checks** (`docs/validation/bench/doc_checks.py --heads docs/ARCHITECTURE.md --allow docs/validation/doc-checks-allow.tsv`).
  WARNING printed: the reference corpus is INCOMPLETE in this checkout, so these results are NOT authoritative (provisional).
  V07: C1 0, C2 0, C3 363 / 318 unreviewed, C4 1 / 0, S1 0, S2 401 / 0. V08: C1 0, C2 0, C3 181 / 155, C4 2 / 0, S1 0, S2 258 / 2.
  The same run on the pre-round copies gives V07 C3 349 / 318 and V08 C3 164 / 158, S2 209 / 2. The round adds no unreviewed
  hit to either volume (a set difference of the unreviewed lists is empty).

## 5. Issues

Twelve open: 0 blocker, 5 major, 7 minor. By owner: V07 4, V08 3, pipeline 1, V01 1, V06 1, V09 1, V11 1. The exact
required changes are in `docs/validation/coherence/results/coherence_verify-vol-V07-V08-r2t.json`; each claim in short:

| id | sev | kind | owner | claim |
|---|---|---|---|---|
| G125-V08 | major | CONFLICT | V08 | persists: (1) `HostContext.line` decides the document where two lines accept (§2.4 *Selection*, B19, T-V8-11), against item 125 (e), R2-40 (2), V08's own J-V8.130 and §3.17's one-input row (ONE FIX with VCS-r2-02); (2) `population`, `_seed`, `institutions`, `id` and the version stamps keep "none" for an empty or unreadable value, which §3.5 step 3 refuses, against item 125 (b) and R2-40 (3) |
| VV78-r2-09 | major | WIRING | V08 | the disaster look has no dossier source: `event` is set only for the three census events, no stressor or archetype row maps to `disaster`, so V11's `event` · `calamity` row is never read (ONE FIX with VPC-R2-03) |
| VV78-r2-05 | major | CONFLICT | pipeline | §10.2 *Crisis looks* does not carry V07 §5.6's village readings: (c) no count for a share of a place's units; (d) the places at THORP, HAMLET and VILLAGE (the main approach road by `TradeFlow`, `affectedQuarter` the one district) uncited; (f) a siege line at every rung with walled arcs, against item 122 (c) and V07 §5.6 (1) / T-V7-69 (a) |
| VV78-r2-06 | major | CONFLICT | V01 | V01 §3.16 does not wire V07's units: (1) names neither `villageDisasterUnits` nor a unit's land (`villageUnitPlots`), which V02, V03 and §8.2 need; (3) maps a target to its plot's district, no unit at a village rung, so a calamity's named target is unmatched there (V07 §5.6 (3) matches it to the unit holding its plot); `campLand` states no village reading |
| VV78-r2-01 | minor | CONFLICT | V07 | VS1's row restates V08 §2.5's latitude rule with `CircumstanceSlice.port.latitudeDeg`, which V08 retired this round; J-V7.110's "the epoch's slice" |
| VV78-r2-02 | minor | WIRING | V07 | V07 §3.2 (2)'s `river: 'descent'` is taken "when a dossier's realm block gives a river course" — no input since item 125 (a) (ONE FIX with VDC2-15; no blueprint or user setting selects it, so the sentence goes) |
| VV78-r2-03 | minor | CONFLICT | V07 | the dossier trace, W80's dossier column and T-V7-65 read the week as "the campaign calendar's" — the retired `HostContext.week`; DR42 and R2-40 (1) make it the dossier's latest stamped tick |
| VV78-r2-04 | minor | CONFLICT | V07 | V07 §5.5 and its §3.17 Find row: the `find` key "saved only in view pins — never in the document"; §2.9 saves it with the other view keys in `Document.view`, outside every digest (ONE FIX with VM-R2T-11) |
| VV78-r2-07 | minor | CONFLICT | V06 | V06 §3.22 (2) (d)'s village answer "the through road's entry" is ambiguous with two `through` entries and does not cite V07 §5.6 (2)'s main approach road, which V07 states is `frontierFor`'s answer |
| VV78-r2-08 | minor | COHESION | V09 | `info.crisis.ruinedFor` is put on a famine-bare field's why card twice at the village rungs: by V09 §4.21.12 (4)/§5.8's facts row and by V07 §4.5's `VillageField` answer ("the one row its why card shows") |
| VV78-r2-10 | minor | CONFLICT | V11 | T-V11-46 (a) and V11 §3.25.9's *Totality* check `sf.stressors@<line>` and `sf.conditionArchetypes@<line>`, names V08 §2.4's census never declares (`crisis.stressors`, `.archetypes`, `.events`), and leave the `events` list unchecked though V08 §3.16 (7) (a) says every census word has its row |
| VV78-r2-11 | minor | NEW-PROBLEM | V08 | eight adjudication-ruling ids in design text (l. 619, 2178, 2412, 2551, 3278, 3297, 3489, 3491) — narration, principle (5) |
