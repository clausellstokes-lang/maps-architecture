# Verify — coherence pass, round 2: the scope part of the base

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-scope-r2t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-scope-r2t`, 2026-10-01, cloud checkout)
- P0 resume check (no LANDED line, no output): fresh start — done
- P1 inputs read (the brief whole with its ROUND-2 and ORCHESTRATION NOTES; verify-scope-r1t and its result; adjudication-r2's
  TOC, Part H · scope and R2-05 – R2-41 whole; repair-r2-scope's preamble, hand-offs and checks; assemble-r2's sha table;
  canon's dated routings of items 120–126 and 126 (a2); file g items 120–126 with 122 (h)–(i) whole) — done
- P2 the round-1 findings VCS-08, VCS-10, VCS-18, G120-scope – G124-scope, VCS-r1-01 – VCS-r1-03 re-checked on the live text — done
- P3 every scope section and INDEX.md diffed against the pre-round text (HEAD `682e8e99`, base sha256 `137ecc0e…`, INDEX
  `9efc19e3…`); every changed unit read as a word diff, the new design (items 120–126's bars, rows, placements, §1.1,
  §14) read whole against the items, the rulings, V12's pins and statistics and the volume tests that take each clause — done
- P4 §16 re-summed; the twelve volumes' §8 totals read live; index ↔ Part A; T-ids; references; retired terms; deferral;
  `doc_checks.py`; nuance audit of the round's removals — done
- P5 this report, the result file, LANDED — done

## Outcome

**6 issues: 0 blocker, 1 major, 5 minor — owners scope 4, V08 1, V02 1.** Every round-1 finding of this unit is
**FIXED**: §16's prices, D-20, J-A568.01 and INDEX §1 now carry the volumes' round-2 §8 totals (R2-06 (b)) and re-sum
exactly; every whole-volume test range reads in R2-06 (a)'s form; the take-over column and the groups' runs lists name
every volume test that takes a clause (R2-08); items 120–124's scope parts exist at build depth with R2-35's ids; the
owner-item lists are brought to item 126 (R2-07); the summary's item-114/115 clauses and T115-2 read as required
(T115-2 with R2-14's gloss). The live base, rationale and INDEX equal assemble-r2's recorded outputs (sha256
`4ed292e9…`, `dd2bfafa…`, `1774db18…`). **No nuance lost**: the round removed only what item 125 retires (the realm
block, `HostContext.week`, `.realm`, `.customLibrary`, `realm_block_used`, the Staged section's realm supply), restated
upper test ids (R2-06 (a)) and figures superseded by round 2's; each removal traced. New problems: one CONFLICT against
the owner's item 125 (e) in V08's adapter selection (VCS-r2-02, the hand-off V08 and scope left for this round), a price
stated two ways for Find (VCS-r2-01), §1.1/T126-1 against §13.4's touch fallback (VCS-r2-03), the disaster look's M5 part
unplaced in §16 (VCS-r2-04), T-V2-24 not naming the bar §13.2 says it takes (VCS-r2-05), and Appendix A silent on the
SettlementForge inputs the owner marks in development (VCS-r2-06).

## Round-1 findings, re-checked on the live text

| id | verdict | evidence (live base `4ed292e9…`, INDEX `1774db18…`) |
|---|---|---|
| VCS-08 | FIXED (per R2-06 (b)) | §16 re-summed by script: milestone rows 230.75–315.25 = the first total; base lines 203.25–278.5; staged 187.85–264.1; whole 418.6–579.35; calendar 115–158 (first total ÷ 2); cuts 213.75–287.25 (the same 17–28 below the first total as before). Every staged row and effort line equals its volume's live §8 total: V02 23–33.5 less 2–2.75 = 21–30.75; V03 19–26 less PE 0.75–1 = 18.25–25; V04 28.5–39.5; V05 18–24.75; V06 31–44; V07 30.5–43; V08 18.5–25.25; V10 M3c 11.25–15; V12 M-CAL 4.75–8; V09 staged 3.25–5 + AP11 1–1.25 = 4.25–6.25; V11 C4b 1.1–1.6 + C8 0.75–1 = 1.85–2.6; V01 M5 27.5–36.75. Every line delta traced (O12 +2.25–3.75 = items 121, 122, 124; reference app +2–2.75 = V09 −0.25/−0.5 and AP11 +2.25/+3.25; rig +0.5/+0.75 = W7; content +0.25/+0.5). D-20 and J-A568.01 (index and Part A) carry the same figures |
| VCS-10 | FIXED (per R2-06 (a), R2-08) | no "T-Vn-1 – T-Vn-m" whole-volume range left in §13 or §16 (script); the groups name T-V2-58, T-V5-34, T-V5-35, T-V1-29, T-V2-22, T-V2-24, T-V3-37, T-V4-32, T-V5-18, T-V7-67; the take-over column carries each with its bar. One volume end disagrees: VCS-r2-05 |
| VCS-18 | FIXED (per R2-06 (b)) | INDEX §1's twelve price cells equal the volumes' live §8 totals (V10 "15.25–20.75 with the command-line clerk" = +0.5 at C5; V08's own side 1.5–2.5 = V08 §8) |
| G120-scope | FIXED (new design) | §13.2 *Find* T120-1 – T120-6 = R2-35's rows and item 120 (k) clause by clause; §13.8 rows from M5 (R2-32); §16's M5 row; §0.2's row; J-A120.01 + Part A. One figure disagrees with §16: VCS-r2-01 |
| G121-scope | FIXED (new design) | T121-1 – T121-8 = R2-35 = item 121 (h); §13.8 at M4 (R2-36); §16's M4 row and O12 line; J-A121.01 |
| G122-scope | FIXED (new design) | T122-1 – T122-7 = R2-35 = item 122 (g), (h)–(i)'s four bars V12's (T-V12-55); §13.8 at M3b and M-SF; §16 M3b and O12; J-A122.01. The disaster look's M5 part unplaced: VCS-r2-04 |
| G123-scope | FIXED (new design) | T123-1 – T123-7 = R2-35 = item 123 (f); §13.8 at volume 3's P4 (V03 §8 P4/P5), the decay level with M6-E; J-A123.01 |
| G124-scope | FIXED (new design; MOOT in part, R2-41) | T124-1 – T124-9 = R2-35 = item 124 (i) less its phone clause; §13.8 at M3b; §16 M3b and O12; J-A124.01 |
| VCS-r1-01 | FIXED (per R2-07) | §0.2's heading "file g's items", prose "102 onward" and "113–126", rows 120–126; Appendix A's subset lists brought to 122 and 126; §13.2's convention "of the owner items" and group head "File g's items"; INDEX's intro "file g's items, the owner's rules"; the summary's sentence on items 120–124 with items 125 and 126 |
| VCS-r1-02 | FIXED | the summary's item-114 and item-115 clauses read exactly as required |
| VCS-r1-03 | FIXED (per R2-14) | T115-2 is the required text with R2-14's gloss verbatim; T115-3's retired "hall or similar record" reads "a grand building the dossier specifies (V08 §3.16 (3))" |

## The repaired subsections, read for new problems

Every scope section a round-2 block replaced — the one-page summary, §0.2, §1.1, §13.1, §13.2, §13.4, §13.8, §14, §16,
Delegated decisions (D-20), the judgment index (9 new rows, 6 restated), Staged, Appendix A — and INDEX.md whole were
compared with the pre-round text unit by unit (366 changed lines), and the new text read whole. The other units' rounds
touched no scope section (the diff of §15 and §17 is empty).

* **Correct, checked against the homes:** the other round-2 fixes of the part — VAL-R1-01's §14 order comment, VAP-r1-09's
  rows, VAP-r1-15's staged row and INDEX cell (VAP-r1-15's text exactly), VDC1-16 = VEL0-06 (J-A113.61 index and Part A),
  VDC1-17 (T20-2, T20-6 citing §7.4 *Replay semantics*), VEL0-01 / R2-18 (d) (T20-14 – T20-16; §13.8 M3a and M4; Part A
  J-DET-11, J-A20.71; R25), VDC1-18 / R2-27 (d) (T114-9, the head naming §5.3), R2-27 (a)'s T114-10, VM-R0S-14 (§13.1's
  stretch-state bar with its negative control), VM-R0S-17, VM-R1T-10 with R2-26 (c)'s two fixtures (the wall-strip case
  as the station on the band), VRC1T-09 ("the T-ER rows of §8.11, §9.7 and §11.6"), VV12-r1-09 (§14's `@plat/hood`
  services = V01 §8.3 exactly, `campLand` first at M3b = V01 §8.1), VV56-r1-09, VV78-12, VV1112-r1-01 (C2's g share and
  C4a in M2b, C4b and C8 staged = V11 §8's split), G125-scope and G126-scope (T125-1 – T125-3, T126-1 – T126-3 = R2-35;
  §14's `HostContext` per R2-40 (2); §1.1 per R2-41; §13.4; §16's reference-app line).
* **Every pin and statistic the new bars name exists in V12** (`item120.find` … `item126.resize` with kinds view /
  input / entityScope as V12 §2.13 registers them; `find.*`, `resolution.*`, `crisis.*`, `damage.*`, `weather.*`,
  `port.fallbacks`, `time.findSuggest`, `time.findGlow`, `layout.touch`); each cited base anchor exists (§8.4 (i)'s
  photosensitivity limit, §6.5 (9)'s *plan damage* and weather clauses, DR41 – DR44, §4.11 *The clock*, V08 §2.4's
  fallback column, V09 §4.12's tool list).
* **Both ends of every take-over (R2-08):** every volume test the new text cites exists once, with the subject named, and
  each names the base bar §13.2 says it takes — except T-V2-24 (VCS-r2-05). Their milestone cells agree with §13.8's rows
  (T-V9-83/T-V12-52 M5; T-V9-84/T-V12-53 M4; T-V9-85/T-V12-54 M3b and M-SF; T-V9-87/T-V12-57 M3b; T-V12-56 and T-V3-39
  at P4; T-V8-59/61/62 inside M-SF; T-V12-59 M2a).
* **Phone clauses (R2-41):** none written; the six mentions of "phone" or "narrow" in the part state the absence.
* **New problems:** VCS-r2-01, VCS-r2-03, VCS-r2-04, VCS-r2-06 (scope); the two hand-offs repair-r2-scope left for this
  round — V08's judgment 2 (`line`) is VCS-r2-02; V01's `campLand` at M3b is sound (V01 §8.1 states it); rendering's
  round-2 judgments without index rows were weighed and not raised: the canon routes one index row per owner item to
  scope (J133 – J140), as items 114–119 were done.

## File g items 120–126 — scope's routed parts

| item | routed to scope | live |
|---|---|---|
| 120 Find | §13.2 bars of (k); index row | PRESENT (T120-1 – T120-6; J-A120.01); M5 |
| 121 resolution adjuster | §13.2 bars of (h); index row | PRESENT (T121-1 – T121-8; J-A121.01); M4 |
| 122 crisis looks, (h)–(i) | §13.2 bars of (g); index row | PRESENT (T122-1 – T122-7; J-A122.01); M3b, M-SF; VCS-r2-04 |
| 123 ruined plans | §13.2 bars of (f); index row | PRESENT (T123-1 – T123-7; J-A123.01); P4/P5, M6-E |
| 124 light weather | §13.2 bars of (i); index row | PRESENT (T124-1 – T124-9; J-A124.01); M3b |
| 125 the dossier the only input | §13.2 bars of (e); index row; §14 (R2-40 (2)) | PRESENT (T125-1 – T125-3; J-A125.01; `HostContext`); M-SF; V08's end conflicts: VCS-r2-02 |
| 126 tablets and desktops (a2) | §1; §13 and §13.4; §16; index row | PRESENT (§1.1; T126-1 – T126-3; §13.4; §16; J-A126.01); M2a; VCS-r2-03 |

## Other checks

| check | result |
|---|---|
| index ↔ Part A | 797 rows each, the same id set, 0 duplicates; every J-A id the base and the volumes cite resolves |
| base bar ids | 341 `(Tn-m)` bars, each defined once in §13 (T101-6's repeat a citation, pre-existing); 0 cited id undefined in the base or any volume; no id beyond R2-35's maxima cited anywhere |
| references | assemble-r2's `refs.py` re-run on the live set: 0 BROKEN (54 113 references); the base's 14 ambiguous-form, 3 in scope (l. 300, 19636, 19638), each pre-existing and read as intended |
| retired terms (canon's 35 patterns) on the 366 changed lines | 4 hits, all false positives: "hand-over" (item 122's aftermath, not V05's unit-run view; 3) and "M6" in M6-U's *runs beside* cell (volume 2's milestone) |
| deferral wording on the changed lines | 0 ("later" is sequencing or "the later of") |
| `doc_checks.py --sections "ARCHITECTURE,The whole design,0,1,13,14,15,16,17,Delegated decisions,Judgment calls,Staged,Appendix A"` | exit 0: C1 5/0, C2 1/0, C3 428/0, C4 1/0, S1 0/0, S2 208/0. **WARNING printed: reference corpus INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs, research/external missing) — NOT authoritative; provisional.** INDEX.md (information run): 17 unreviewed C3 hits, the same 17 as the pre-round INDEX |
| sizes (wc words) | the scope sections 98 551 → 104 074 (+5.6 %: items 120–126's new design and the round's edge bars); INDEX.md 3 944 → 3 966 (+0.6 %) |

## Issues

| id | severity | kind | owner | claim | required change |
|---|---|---|---|---|---|
| VCS-r2-01 | minor | CONFLICT | scope | J-A120.01's index row (base l. 22398) says Find's base parts are built at M5 "its base parts widening the O12 line by 0.5–1 pw", and its Part A entry (rationale l. 836) "widen the O12 line by an itemised 0.5–1 pw (PLAUSIBLE) under §16's rule". §16 prices them by absorption — the O12 line's "item 112's second cues and checked variants and item 120's Find roles and marks absorbed (its overlay provider and panel are volume 9's, AP11)", the components paragraph's "the base parts of items 120, 123 and 125 are absorbed — item 120's key, roles, listing and exports by the O11 and O12 lines" — and J-A568.05 reads "items 121, 122 and 124 widening the O12 line by 2.25–3.75 pw, items 120, 123 and 125 absorbed"; O12's 10.75–16.75 = 8.5–13 + 2.25–3.75 holds no 0.5–1 for item 120. One price, two statements. | J-A120.01's index row ends "— built at M5 with volume 1's area and gap services, its base parts priced by absorption into the O11 and O12 lines (its overlay provider and panel volume 9's AP11; J-A568.05)". Its Part A entry's last clause reads "its base parts (§2.9's key, §8.2's marks, §9.5's tool, §11.1's export, §11.2's listing, §12.5's budget) are priced by absorption into the O11 and O12 lines whose mechanisms they extend, its overlay provider and panel being volume 9's AP11 (J-A568.05) (§13.2, §13.8, §16)." §16 and its totals unchanged. |
| VCS-r2-02 | major | CONFLICT | V08 | Item 125 (e) (owner): "the same dossier with and without a host context yields the identical document and hash"; R2-40 (2) keeps `line` as one of the fields "none able to change a document a dossier makes"; §14's `HostContext` ("none changes a document a dossier makes (T125-2)") and T125-2 ("with and without a host context, and under each `HostContext` field (`audience`, `displayNames`, `line`), yields the identical document and hash"). V08 §2.4's *Selection* (l. 685–694) tries `HostContext.line` first and states "only where two registered lines accept one dossier … does `line` decide which line's reading builds it"; B19 (l. 2023) and T-V8-11 ("Two registered adapters both accepting: `HostContext.line` picks when given; with none, … a new settlement is created on the newest line") give a different document with and without a host context in that case, and T-V8-61 (b) tests T125-2 only with `line` the pinned line. V08 recorded this as its judgment 2 for the adjudicator and scope's repair left it as a hand-off; a volume's rule contradicting the owner's bar (precedence: owner > base > volume). | V08 §2.4's *Selection*: the dossier's own shape and stamps select the adapter in every case — (1) the document's bound line when its adapter accepts, (2) the single registered adapter that accepts, (3) at a creation with several accepting, the newest registered line, recorded and noted `line_defaulted` — and `HostContext.line` is checked, never chosen from: a named line no adapter supports, or one the dossier's stamps contradict, refuses with `E_LINE_UNSUPPORTED`; a named line that is registered and accepts but differs from the selection leaves the selection standing, the report naming both lines. The sentence "only where two registered lines accept one dossier … does `line` decide which line's reading builds it" reads "with several registered lines accepting one dossier the dossier's own selection still decides, so one dossier makes the same document and hash with and without a host context (item 125 (e); T125-2)". B19's case reads "two registered adapters accept a new settlement's dossier, a line named or not" (outcome unchanged). T-V8-11's two-adapter clause reads "Two registered adapters both accepting: the same document and hash with `HostContext.line` naming either line and with none — a bound document on its line, a new settlement on the newest, noted `line_defaulted`"; T-V8-61 (b) adds that two-adapter fixture. A J-V8 row records the choice; §14 and T125-2 unchanged (R2-40 (2)'s "it picks the adapter" then reads as the check above — the adjudicator to confirm). |
| VCS-r2-03 | minor | CONFLICT | scope | §1.1's new *Where the map is seen* (l. 317) says "Tablets keep every tool, under touch and pen (V09 §4.12)" and T126-1 bars "at the medium class every tool of V09 §4.12's list completes its canvas script under touch" (item 126 (e): "every tool works under touch"), while §13.4's pre-decided touch fallback in the same unit (l. 18389–18391) still reads "if they fail where the pointer users pass, touch is kept for the intent, ground-and-bones and programme layers … and the fabric and finish layers become pointer-only" — after which T126-1 fails by design and §1.1 is false. V09 §4.12 words the same fallback as a default ("`AppPrefs.touch.editFabric` defaults to false for coarse pointers, hiding the L3 FABRIC and L4 FINISH layers' geometry edits"), switchable, and T-V9-22 runs T126-1 without naming the setting: the meeting of item 126's bar and the touch fallback is undefined. | §13.4's fallback clause reads "… and the fabric and finish layers' geometry edits are off by default on a coarse pointer (`AppPrefs.touch.editFabric`, V09 §4.12), switchable back on and never removed (item 126 (e)), stated in the guide"; §1.1's sentence reads "Tablets keep every tool, under touch and pen (V09 §4.12); §13.4's touch fallback changes only a default"; T126-1 reads "… completes its canvas script under touch, with `AppPrefs.touch.editFabric` on". V09 writes T-V9-22's end in the same words (R2-05). |
| VCS-r2-04 | minor | WIRING | scope | R2-36 places item 122's base parts at M3b and "the disaster look's districts with V01's W10 at M5; V02's ruined exterior with V02's building-band step; V03's look damage with V03's item-123 step", under its rule "a look or view whose subject is not yet built draws nothing of that part". §16's M3b row (l. 19728) places "item 122's crisis looks" whole at M3b, and neither it nor the M5 row names the `disaster` look's districts (§10.2's `neighbourhoods` place reads V01's `disasterDistricts`, built in V01's W10 at M5, V01 §8.1) or states R2-36's rule; §13.8 (l. 18834) runs T122-2, T122-3, T122-5 and T122-6 "nightly on the crisis fixtures — the previews from M3b", so a `disaster` preview's district share (T122-5's scale) is due at M3b with no producer until M5. The volumes already place it at M5 (T-V3-40, T-V7-69, T-V10-52). Between M3b and M5 a standing disaster condition has no stated drawing in the base. | §16's M3b item-122 clause adds "— the `disaster` look's districts (§10.2's `neighbourhoods`) with volume 1's `disasterSource` and `disasterDistricts` at M5 (W10), its ruined exterior with M6 (V02 §8.6) and its plan damage with volume 3's P4; until each lands that part draws nothing (R2-36)"; the M5 row's content adds "item 122's disaster districts — volume 1's `disasterSource` and `disasterDistricts` (W10)"; §13.8's T122-2, T122-3, T122-5, T122-6 row's milestone cell reads "M3b (the `disaster` look's district clauses from M5)". |
| VCS-r2-05 | minor | CONFLICT | V02 | §13.2's item-119 runs list ("volume 2 the stage-3 waits (T-V2-22, T-V2-24)") and the stage-3 take-over row ("T119-2's stage-3 clauses (T-V2-22, T-V2-24)"), written this round per VAP-r1-09, name T-V2-24 as taking T119-2. T-V2-24 (V02 §7, l. 3536) times every export format within ten seconds at every rung's top and the cap — item 119's comfort level — but names no base bar, while R2-08 makes the volume test the home of which base-bar clauses it runs (its head, or the clause re-running one, naming each). T-V2-22 names T119-2 in its wait clause; T-V2-24 does not. | V02 §7's T-V2-24: its export-wait clause reads "… completes within ten seconds from the click to the file written (T119-2's stage-3 export clause; V12 §3.15.9's wait timer, five seeds each; R12-31) …"; nothing else changes. |
| VCS-r2-06 | minor | COHESION | scope | Appendix A's graded exceptions (l. 22463–22465) state "The SettlementForge facts of items 73–88, 102–113, 117, 118 and 122 (the calendar, `traditions`, the stressors and conditions) are CONFIRMED …" but say nothing of the SettlementForge inputs the owner's items mark unconfirmed: item 122 (h)'s forces, coalitions and travelling groups with their sizes ("IN DEVELOPMENT in SettlementForge … to be confirmed by the final local check (item 125 (d))"), read by DR44, T122-5 and V08's T-V8-60, and the current-week stamp item 125 (d) lists; nor of item 125 (d)'s final local check that confirms the port's fields. The record's "every mechanism … is PLAUSIBLE … until the milestone §16 names for it executes it" covers mechanisms, not whether a SettlementForge field exists. | Appendix A adds after the SettlementForge sentence: "The SettlementForge fields the owner's items mark in development — item 122 (h)'s forces, coalitions and travelling groups with their sizes, and a current-week stamp — are PLAUSIBLE until item 125 (d)'s final local check of SettlementForge's checkout confirms each, field by field, item 125 (b)'s fallback in force meanwhile." |

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed in this lane):** the live base, rationale and INDEX equal assemble-r2's recorded outputs (sha256);
the pre-round text extracted from `682e8e99` (base `137ecc0e…`, INDEX `9efc19e3…`, rationale `630da959…`); word diffs of
every changed unit of every scope section and INDEX; the round-1 verdicts above, each on the live text; §16's sums and line
deltas by script against the twelve volumes' live §8 totals; index ↔ Part A by script; the T-id census; the cited
volume tests' rows, heads and milestone cells by script; V12's pin rows and statistics by grep; the reference resolver
(0 BROKEN); the retired-term and deferral scans of the changed lines; `doc_checks.py` (exit 0, provisional: corpus
incomplete).
**PLAUSIBLE (reasoned):** that VCS-r2-02's selection rule keeps a bound map on its line without a hold (V08 §3.8's
`fromLines` migration being the move between lines); the adjudicator may instead re-read R2-40 (2).
