# verify-scope-r0 — lane amendments-c/verify-scope-r0 (the SCOPE part after assemble-r0)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-scope-r0).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 inputs read (route scope entries, amendment files c/d/e items, two scope seat reports, cross-part notes, assemble-r0): done
> STEP 1 title block, summary, §0, §1 read whole and judged: done
> STEP 2 §13 read whole and judged: done
> STEP 3 §14, §15 read whole and judged: done
> STEP 4 §16, §17 read whole and judged: done
> STEP 5 Delegated, Judgment calls index, Staged, Appendix A read whole and judged: done
> STEP 6 per-item verdicts (home 32, 41, 48, 49, 56, 62, 73, 83, 84, 85; referencing): done
> STEP 7 checks (single-source, stale, cross-part, deferral, refs, new-problem), doc_checks: done (exit 0)
> STEP 8 issues table, queue row, LANDED: done (26 issues; queue row B-amendments-c/verify-scope-r0 appended once)

Design under review: docs/ARCHITECTURE.md sha256 7f4c0e253438b41beb19… (16 872 lines); rationale 22f01184eac296c1b449… (2 285 lines) — assemble-r0's installed files.

## Findings (appended as each step completes)

### Outcome

All ten items homed in the scope part are **PRESENT** (32, 41, 48, 49, 56, 62, 73, 83, 84, 85), each in the mechanism
form the route asked for; every referencing clause the route gave this part is present except five PARTIAL points
(items 70, 20 (h), 85, 88, 101) and two present items with a defect beside them (50's stale leftovers, 66's schedule). The
part's sections were read whole: lines 1–466 (title block, banner, summary, §0, §1), 12 583–14 781 (§13–§17) and
15 880–16 872 (Delegated decisions, the Judgment-calls index, *Staged*, Appendix A), with the archive
`docs/archive/ARCHITECTURE-pre-amendments-c-2026-09-27.md` for the before. **26 issues** are filed: 1 major (VSC-01, item
66's access edit and its bars scheduled at M3a while the records its generators create land at M4) and 25 minor; owners
scope 25, rendering 1 (VSC-09, paired with VSC-08). Four restate other verifiers' scope-owned issues, confirmed: VSC-22 =
VD0-26, VSC-23 = VKC-19, VSC-24 = VKC-20, VSC-26 = V-MC0-09 (widened); VRC-23 is VSC-10's l. 46 clause. Document checks on the part exit 0. Title block and the one review banner are byte-identical to the archive; the summary was only appended to.

### Per-item verdicts — home items

| item | home | verdict | the mechanism, quoted |
|---|---|---|---|
| 32 | §17.1 (1) (+ §0.2, §0.3, D-29, Appendix A, summary) | PRESENT | §17.1 (1) l. 14585–14592: "Since that date research reader seats have also read the captured bundles of MFCG 12710731, VG 1.6.9 (itch 19365073), NG 1.2.2 (itch 11441280), Fantasy Manor 1.0.0 (build 890), Dwellings (itch 17195045) and the FTG client of the 2026-09-25 capture — to understand their logic, never to reuse it … a mechanism the readings show to differ … reaches it only as our own re-derivation, carrying (6)'s `(code)` provenance"; D-29 l. 16050 "research seats may, since 2026-09-27, also read the captured bundles to understand them, the implementers' inputs unchanged"; §0.2 l. 163 rewritten; Appendix A l. 16842 |
| 41 | §13.5 bent-cut row (+ §16 M0 (b), §13.2) | PRESENT | §13.5 l. 13485 "measured outputs of NG 1.2.2's mechanism (reproduced by §4.6's restated law) … fillet share within ± 0.05 of the share NG shows on identical face shapes (§4.6 step 6's rule predicts 209.9 of NG's 378 recorded corners where 200 were filleted; J-A41.01)"; M0 (b) "σ — a measured output of step 2's position law … the fillet share within ± 0.05 of NG's"; T41-1 the registry test |
| 48 | §13.5 population row (+ §1.4, Appendix A) | PRESENT | l. 13501 "MFCG 12710731: six persons for each lot, the total rounded up at its second significant digit (a multiplier; its "buildings" are its lots; D1 of `code-impact.md` §(d)) — **weakness**"; §1.4 content row; A.3 l. 16847 |
| 49 | §13.5 blocks and plot-area rows (+ §1.4) | PRESENT (evidence gate honoured) | blocks row l. 13483 has no 441 m² clause; plot-area row l. 13490 "NG Moran's I … — **weakness** (FTG sends no lot or plot, so it has no plot evidence; item 49)"; §1.4 districts row l. 400 keeps "49 % of buildings in no ring (`_critic-ftg.md` F4, row 16)", "containment 53 %" gone; blocks→plots FTG cell "run server-side on road-graph faces; no lot or plot is sent to the client" |
| 56 | §15.1 MFCG D1 | PRESENT | l. 14273 "naming (a feature-conditioned deck grammar; the Markov models MFCG 12710731 builds go unused) \| §10.4 own engine and grammar" |
| 62 | §17.1 (6), (8) | PRESENT (see VSC-15 for one row that cites reading files instead of P-ids) | (6) l. 14676–14678 "carries the same form with its build and the suffix `(code)`, followed by its trace key — `ref:NG 1.2.2 per-face stop threshold (code)`, P1 … this document, the digest and `plat/` carry the behaviour with its P-id, never the class, method or file"; (8) l. 14714 |
| 73 | §14 (`@plat/port`) | PRESENT | package line l. 13890–13893; dependency rule l. 13915–13922 "`… ← edit ← export ← port ← api ← app` … `port` depends on `model`, `tables`, `content` and `edit` only and is imported only by `api` and the reference app's host glue"; key-list lint l. 13925–13928; interfaces `DossierPort`, `PortResult`, `PortNote`, `HostContext`, `RealmBlock`, `DossierDigest`, `DossierInstitution`, `PortReport` l. 13965–14018; halves and wiring l. 14053–14058 (J-A73.01–.03); `tables/dossier/*` l. 14097 |
| 83 | §13.2 (+ §13.8, §16) | PRESENT | "B-DOSSIER-lite runs each at-rung birth × 5 seeds … the creation bars (M1): (T73-1) … (T73-10)" and "the absorb bars (M3a) … (T75-1) … (T75-5)" l. 13224–13239; §13.8 J-A83.02; M1 exit "B-DOSSIER-lite green (T73-1 – T73-10)", M3a exit "T75-1 – T75-5" |
| 84 | §13.2 (+ §14 testkit, §17.1 (3), §16) | PRESENT | `DossierFixtureRow` l. 13210–13213 with every manifest column and `neverPublish`; the set l. 13216–13223; §17.1 (3) l. 14640; testkit line l. 13908 |
| 85 | §14 (a), (b), (f) | PRESENT | (a) l. 14059–14062 "`settlement.seed = H32("plat:sf-seed" ‖ the dossier's seed)` … the host's own seed never enters a document, a digest, a link or an export"; (b) l. 14083–14085; (f) the audience table l. 14089–14095; bars T85-1 – T85-3 |

### Per-item verdicts — referencing items (the scope clauses the route gave this part)

| item | scope clauses routed here | verdict | where / what is missing |
|---|---|---|---|
| 33 | §1.4 block fabric; §0.3; D-16; summary | PRESENT | l. 401, l. 255–258, D-16 l. 15970, summary l. 105–107 (the in-place fold is VSC-10) |
| 34 | §0.3; §16 M-1; §13.5 blocks | PRESENT | M-1 l. 14483 "re-fitted under that reading … (item 34; J-A34.01)"; blocks row l. 13483; T34-1 |
| 37 | §16 M0 (b); §0.3; index rows | PRESENT | M0 (b) "the far-side fallback no longer exists … `cut.flattenM` is calibrated there (J-A37.01)"; J-A37.41 names J-P16 superseded |
| 39 | §1.3 | PRESENT | l. 373–374, Fable's corrected wording, no console strings |
| 42 | §1.3 | PRESENT | l. 375–376 |
| 43 | §15.1 MFCG C3 | PRESENT | l. 14272; NG C7 unchanged |
| 44 | §15.1 NG C3 | PRESENT | l. 14365 |
| 45 | §1.4 walls | PRESENT | l. 404 "a thinness bloat, then equalisation toward its fitted regular polygon (P10; item 45)" |
| 46 | §13.5 towers; D-17, D-19; §15.1 B5 | PRESENT | l. 13498 in Fable's corrected terms (3 / 4 / 5 / 7 at 26 / 39 / 51 / 80, P11); D-17 l. 15981; D-19 l. 15996; B5 l. 14254 |
| 47 | §13.2 bar; §1.4 districts; §15.1 B9 | PRESENT | T47-1; l. 400; l. 14258 |
| 50 | §13.5 entrance rows; T29-4; §1.4 buildings; index | PRESENT; two stale leftovers | l. 13488, l. 13518, T29-4, l. 403, J-A50.01 — but §15.1 FTG C9 and §15.2 O5 (f) still read FTG's old "entrance" (VSC-06) |
| 51 | §1.4 determinism, failure; §15.1 VG G2 | PRESENT | l. 407, l. 411, l. 14389 |
| 52 | §13.3 pointer | PRESENT, restated (VSC-22 = VD0-26) | l. 13359–13361 |
| 53 | §13.5 tree scatter; D-11 | PRESENT | l. 13500; D-11 l. 15949 |
| 54 | §15.1 MFCG C2 | PRESENT | l. 14271 |
| 57 | §1.4 hinterland | PRESENT | l. 405 |
| 58 | §13.5 draw style (e); §15.1 NG E2 | PRESENT | l. 13506 (points to §8.3's census row); l. 14374 |
| 59 | *Staged* stage-3 row | PRESENT | l. 16829 "the five layout families … wings that collide with towers and blocks, the main door facing the street, metric scale (item 59)" |
| 60 | §13.5 entrances and basements; §15.1 NG G2 | PRESENT | l. 13518 (D2, D3); l. 14381 (held 16-cell support not written) |
| 61 | §13.5 build stamp | PRESENT | l. 13454–13455 |
| 63 | §13.2 T63; *Staged*; §0.2; §14 | PRESENT | T63-1 – T63-4; *Staged* stage-3 and underground rows; §0.2 row 63; `RosterTables.covers` |
| 64 | §13.2 T64, T12-1; *Staged* | PRESENT | T64-1 – T64-3; T12-1's corrected clause l. 12927–12929; *Staged* underground row |
| 65 | §1.1; §13.2; D-3; *Staged*; §14; §15.2; §16 | PRESENT | `layers.undercity` l. 307, 313–315, 321–325; T65-1 – T65-6; D-3 l. 15910–15913; strategies l. 13946, 14218; hooks row 6; M4 |
| 66 | §13.2 T66; *Staged*; D-25 | PRESENT; one sequencing conflict | T66-1 – T66-4; D-25 l. 16034–16035 — but §16 schedules it before its records (VSC-01) |
| 67 | §13.2; D-25; *Staged*; §14; §15.2; §16 | PRESENT | T67-1 – T67-6; D-25 l. 16033; `works.json`; hooks row 2; M4 |
| 68 | §13.2/.3/.4/.5; §1.2; §1.7; D-1/3/19; §16; §0.2; summary; §14; §15; *Staged* | PRESENT | T68-1 – T68-9; J-A68.01, J-A68.02; §13.5 lighting row; §1.2 l. 354–358; §1.7 l. 458; the owner question at §0.2 row 68 and summary l. 114–116 |
| 69 | §13.4; §13.7; §13.9; §17.1 (6), (5), (2) (ii); D-1; §0.2; summary; §15.1; §16 | PRESENT | §13.4 bar; §13.7 l. 13731; §13.9 (6); §17.1 (6) l. 14678–14681, (5) l. 14666–14668, (2) (ii) covered by its general rule (every six-digit colour of the document is checked); D-1 l. 15892 |
| 70 | §13.2 T70; §15.1 B13, tents; *Staged*; §0.2; summary; §16 | PARTIAL | all present but *Staged*'s underground row names no informal clusters in the undercity's chambers (VSC-20) |
| 71 | §13.2; §13.7; §13.5; §0.2; summary; §16 | PRESENT | T71-1 – T71-4; J-A71.01; §13.5 l. 13527–13528 |
| 72 | §13.2; §1.4; D-10/16/32; §15.1 B9, NG C8; §15.2; §16; §0.2; summary; *Staged* | PRESENT | T72-1 – T72-8; l. 400; J-A72.05; O10 (k), O18 (m); the pressure reading put to the owner (summary l. 121–123) |
| 20 (h) | §13.2 T20-7 – T20-12; §0.2; summary; *Staged*; §14; §15.2 O10 (i); §16 | PARTIAL | all present; no bar proves the tier marker's values (VSC-12, M's note 7 (c)) |
| 74–82, 86, 87 | §14 port lines and tables; §1.1 (81); §15.1 B5 (79); §16; §13.2 T77-1, T81-1 | PRESENT | l. 14059–14103; §1.1 l. 338–344; B5 l. 14303 |
| 85 | §16 M1 (a), (c); M3a (b), (d)–(f) | PARTIAL | M3a names only "bridge correlation" (VSC-17) |
| 88 | *Staged*; §16 schema at M3a | PARTIAL | *Staged* SettlementForge row present; §16 names no milestone for the schema (VSC-17) |
| 101 | §14; §13.2; §13.4; *Staged*; §16; §0.2; summary; §1.4 | PARTIAL | all present; §14's T2 row lacks the harbour's points form (VSC-13); the oracle `why` escapes T30-5's enumeration (VSC-08) |

### Held parts (gate (a)) — so nothing is lost

* **Still held, not written anywhere in the part (grep-checked):** item 52's claim that the references' session-reached maps
  visibly differ (§13.3 states the test only); item 35's supporting position check (160 / 162 faces); item 60's
  support that NG 1.2.2 hands off plans up to 16 cells wide (§15.1 NG G2 states only Dwellings' 11-cell drop); item 68 (g)'s
  absence claim "MFCG draws no cast shadows" (§1.2, §13.5 and D-19 speak only of our `MFCG` preset — J-A68.86); item 68's
  VG 1.6.9 lighting layers and Dwellings' shading gradients (§15.1 VG R1–R17 gives only our own not-precluded reason).
* **Released by Fable's evidence gate and applied labelled:** item 37's metre reading of `cut.flattenM` (home §4.6;
  §0.2 row 37, Appendix A), item 58 (f)'s ≈ 525 m hood span (home II.2; Appendix A), item 59's timing (home §12.7;
  Appendix A). **Rejected by the gate and honoured:** item 49's deletion — §1.4 keeps the 49 % with `_critic-ftg.md` F4.
* **Applied labelled on the gate's completion row, but missing from Appendix A's list:** item 50's clause that MFCG
  12710731's model carries no door record. The route marks it held (it predates the gate's completion); the completion
  row for item 50 says "the editor texts stand as written", and §13.5 l. 13518 writes it as "an inference from that
  reading" — sound, but Appendix A l. 16866–16868 names only the three other released inferences (VSC-14).
* Items 73–88 and 101 hold nothing.

### Checks

**Single source.** Every item's mechanism is stated once at its home; the scope sections carry pointers, bars and prices.
One duplicate: §13.3's *Amendments c in the goldens* restates §6.5 (9)'s session-history test in full (VSC-22 = VD0-26).
The port's types are declared once in §14 and the contract's records once in §7.7 (J-A73.02); the bars are stated once
in §13.2 (J-A41.02, J-A63.01). The derivation-table and vocabulary totality tests are one test (J-A83.01).

**Stale.** Checked for the task's list — lots as buildings, binary wealth, size fixed by tier, one central market, the
map editing the dossier, the licence default, unchanging terrain — none stands in the part (the proprietary licence
default is the owner's own ruling of 2026-09-27, J-A21.01, and stays). Stale sentences this pass left behind: §15.1 FTG C9
"entrance rule kept" and §15.2 O5 (f) "≈ 10 % doorless" (item 50; VSC-06); §15.2 O18 (j) "FTG's 441 m² in every class"
(item 49; VSC-05); the summary's "measured from Neighbourhood's recordings", "the optional shadows", "the finished map"
and "166–220" (VSC-10, canon R11 — the repair round folds them, J-A28.02's precedent); the §0.2 heading (VSC-02); the
Judgment-calls intro (VSC-03).

**Cross-part.** Every cross-part note addressed to S1 or S2 in the eight other seat reports was checked against the live
text. Reflected: A 7–13, B 6–7, C 4–5, D 6–7, E1 5–6, E2 5–6, K 6, 8 and 10 (§7.1 carries the snap rule), M 7 (a) and
8, R S1 1–6 and S2 1–7, T 6. Not reflected: M's note 7 (c) (a bar for `factTier`, VSC-12); R's S2 note 3 and E2's note 7
(3) (placement digests per rotation in §13.3, VSC-11); M's note 7 (b) (`PathShapeRow` by name in *Staged*) is met in
substance ("as rows of path shapes"), not filed. Four scope-owned issues from the kernel, determinism and model verifiers are confirmed and restated: VKC-19 (T65-6),
VKC-20 (T81-1), VD0-26 (§13.3), V-MC0-09 (the entrance bar, widened to O5 (f)); rendering's VRC-23 is VSC-10's l. 46 clause.

**Deferral wording.** A scripted scan of the part for TBD, later, pending, for now, open, not yet and placeholder found only
roadmap staging, owner-gated options quoted from the rulings (J-A73.81's "possible later, only on the owner's word" is
J86 Q2's own wording; rendering's row), the owner's "placeholder" east phrase (Q5) and J-A32.02's "to be folded where they
stand", which names the repair round's R11 duty (VSC-10 folds it and rewords the row).

**References.** Every §-pointer resolves (doc_checks S2 0). Every T-id cited anywhere in the design is defined in §13.2
(193 defined, 0 undefined). Every cited J-id resolves (650 cited, 704 defined, 0 undefined). The index has 704 rows, no
duplicate id, every row three cells; the pass's 222 J-A rows for items 32–101 follow the digit rule (one mixed row,
J-A20.78 "§13.2, §7.7", is E1's joint ruling — sound). All 41 scope J-A rows have a Part A entry of the "chose X over Y
because Z" form (rationale l. 708–748). One code-reading provenance row cites reading files instead of P-ids (VSC-15).

**Gate (c).** A scan of the part for every reference identifier the amendment files and `code-impact.md` §(d) name
(`Offset`, `check4holes`, `BisectorEx`, `indentFronts`, `validatePatch`, `isSmallEnough`, `createGreen`, `Cutter`,
`DeckRuleSelector`, `buildDomains`, `Topology`, `aStar`, `createShape`, `lightPosition`, the console strings, the §(d)
classes …) finds none; "§4.5's Grower" (§0.2 row 47) is the design's own paragraph name.

**Gate (b).** Every new "the reference does X" sentence in the part names its build (MFCG 12710731, VG 1.6.9, NG 1.2.2,
Fantasy Manor build 890, Dwellings itch 17195045, the FTG client of the 2026-09-25 capture); the `MFCG` and `FTG` preset
sentences speak of our presets.

**§16 arithmetic.** Milestone rows 2–3 + 9–12 + 38.5–50 + 10–13.5 + 42–55.5 + 28–36 + 18–23.5 + 16–23 + 8–14 + 14–18 =
185.5–248.5; lines 171.5–230.5 + 14–18 = 185.5–248.5; the pass's line additions 19.5–28.5 = its milestone deltas
(M1 2.5–3, M2a 1–1.5, M2b 6–9.5, M3a 5–8, M3b 2–2.5, M4 3–4) = J-A63.05 (11.5–17) + J-A73.05 (4.5–6) + J-A101.05
(3.5–5.5); cuts 17–28 → 154.5–202.5 / 168.5–220.5. All CONFIRMED by re-summing.

**Document checks** (`python3 docs/validation/bench/doc_checks.py --sections "The whole design,0,1,13,14,15,16,17,Delegated
decisions,Judgment calls,Staged,Appendix A"`, 2026-09-28, corpus 9 626 JSON files / 916 623 3-grams / 478 lists — the
assembler's snapshot): C1 5 / 0, C2 0 / 0, C3 323 / 0, C4 4 / 0, S1 0 / 0, S2 0 / 0 — exit 0.

### Issues

| id | sev | kind | owner | item | where | the problem | exact required change |
|---|---|---|---|---|---|---|---|
| VSC-01 | major | new-problem | scope | 66 | §16 M3a, M4; the pricing paragraph | M3a builds "the closure rule with the access edit and the basement's requested-mode ladder (item 66, §7.3)" and exits on "the owner-rule bars of items … 66" (T66-1 – T66-4), but the access edit's generators create the underground records — a `dug` system, a connector gallery in its depth band, an `AccessPoint`, links (§7.3 item 9 (d)) — whose schema and tools §16 lands at M4 ("the systems' records and parts, their links … (items 64, 65)"; amendments b's `drawTunnel` / `placeAccess` at M4). T66-2 and T66-4 cannot run at M3a; the route stages the underground pieces with the layer (BASE HOOK + STAGED) | M3a content: replace "the closure rule with the access edit and the basement's requested-mode ladder (item 66, §7.3)" with "the closure rule (§7.3 item 9) with its first base instance — a concealed front's missing concealed door (item 63) — and the basement's requested-mode ladder (§2.6)"; M3a exit: replace "63 (the knowledge filter) and 66" with "63 (the knowledge filter) and 66's concealed-door instance"; M4 content: after "the undercity's rung bound and `raiseGrade` (items 64, 65)" insert ", `addUndergroundAccess` with its closure generators (item 66)"; M4 exit: replace "the hook fixtures of items 64, 65 and 67" with "the hook fixtures of items 64, 65, 66 (T66-1 – T66-4) and 67"; move item 66's 0.5 pw of carriage: M3a 28–36 → 27.5–35.5, M4 16–23 → 16.5–23.5, the pricing paragraph's "M3a +5 / +8" → "+4.5 / +7.5" and "M4 +3 / +4" → "+3.5 / +4.5" (total unchanged); record J-A66.01 (index + Part A: the access edit with the underground hooks at M4, over M3a, because its pieces are M4's records). Apply after VD0-04 settles item 66's staging sentence at §7.3 item 9 |
| VSC-02 | minor | stale | scope | 32–101 | §0.2 heading | the heading still names only items 1–7 and 8–31, though §0.2 now lands items 32–88 and 101 | REPLACE the heading line with "### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`), items 8–31 (`AMENDMENTS-2026-09-25b`) and items 32–88 and 101 (`AMENDMENTS-2026-09-27c`, `-d`, `-e`)" (the body unchanged; later block files copy the new heading) |
| VSC-03 | minor | stale | scope | 32–101 | Judgment-calls index, first paragraph | "The rows `J-A⟨item⟩.⟨n⟩` are the amendments-b pass's (items 8–31 …)" — 230 J-A rows of amendments c, d and e now follow; the intro also never names the J-F rows (J-Fpipe-2, J-Fdet-1, J-Fredteam-1) | Replace "are the amendments-b pass's (items 8–31 of the second amendments file; 2026-09-26/27):" with "are the amendment passes' — amendments b's (items 8–31; 2026-09-26/27) and amendments c, d and e's (items 20 (h), 32–88 and 101; 2026-09-27/28):"; after "the J-I rows settle a disagreement between two area drafts" add "; the `J-F⟨lane⟩-⟨n⟩` rows are the Fable review seats' rulings (`docs/fable-review/`), carried with the text they rule on" (an in-place edit of the intro; the rows untouched) |
| VSC-04 | minor | new-problem | scope | 68 | §1.2 l. 353–354 | "The first paint is the finished picture (§8.5)" now sits beside "the first map composed unlit, its light following … within §12.5's settle bound" (J-A68.88): with cast shadows on by default the first paint is not the finished picture | Replace "The first paint is the finished picture (§8.5)." with "The first paint is the complete city band (§8.5); its light follows within the settle bound (below)." |
| VSC-05 | minor | stale | scope | 49 | §15.2 O18 (j) | "(j) within-district plot-area CV ≥ 0.25 (§13.7) [O — FTG's 441 m² in every class]" cites the lawn-patch figure item 49 withdrew (critic R10) | Replace "[O — FTG's 441 m² in every class]" with "[O]" |
| VSC-06 | minor | stale | scope | 50 | §15.1 FTG C9; §15.2 O5 (f) | C9 "§4.7 S11; entrance rule kept; …" and O5 (f) "[O — FTG's hourglasses and ≈ 10 % doorless]" still read FTG's light anchor as its entrance (the 10 % were buildings without a light anchor) | C9: replace "entrance rule kept;" with "the main door by the owner's rule (item 29) — FTG sends no door, its "entrance" being a light anchor (item 50);"; O5 (f): replace "[O — FTG's hourglasses and ≈ 10 % doorless]" with "[O — FTG's hourglasses and duplicate houses; FTG models no door (item 50)]" |
| VSC-07 | minor | new-problem | scope | 85 | §14 kernel/model lines, the testkit comment, port item 2 | the port's first act uses `H32`, which §14 files under `@plat/testkit` ("D5Record, D5Pair, FtgCapture, H32: §13.6"); a production package cannot import the test kit, and `port` depends only on `model`, `tables`, `content`, `edit` | In `@plat/model`'s line, after "the Merkle model digest" add "and the MurmurHash3 functions it and the seeds use (H128, §6.2; `H32`, §13.6)"; in the testkit comment replace "FtgCapture, H32: §13.6" with "FtgCapture: §13.6 (its `H32` is `@plat/model`'s)"; in port item 2 replace "(§13.6's `H32`)" with "(§13.6's `H32`, from `@plat/model`)" |
| VSC-08 | minor | conflict | scope | 101, 63 | §13.2 T30-5 (and T63-2, which reads its enumeration) | T30-5 enumerates `query` kinds "(`gazetteer`, `people`, `whereIs`, `relations`, `hit`, `inView`)"; item 101 added the oracle `query({ kind: 'why' })`, whose rule, inputs and alternatives can name a concealed function's relation rows — no bar covers it | In T30-5 replace "`hit`, `inView`) and hover" with "`hit`, `inView`, `why`) and hover", and after "and its name at `secret`" add "; a `why` on the withheld place, or on anything its concealed use placed, answers at `public` with the address and kind only — no rule, input or alternative naming the concealed function (§11.2)" (pair: VSC-09) |
| VSC-09 | minor | conflict | rendering | 101, 63 | §11.2 *Knowledge* paragraph l. 11830–11831 | the knowledge rule lists "every kind — `gazetteer`, `people`, `whereIs`, `relations`, `hit`, `inView` —" without the oracle `why` the same section adds | Replace "`relations`, `hit`, `inView` —" with "`relations`, `hit`, `inView`, `why` —" and add after the first sentence: "A `why` answer is filtered by the same table: a rule, input or alternative that names a withheld place's name or purpose — a concealed use's function and its relation rows among them — is withheld, the answer marked `withheld: true`." |
| VSC-10 | minor | stale | scope | 33, 68, 16-pw | the summary l. 39, 46, 53, 78; its appended paragraph; J-A32.02's index row (its l. 46 clause = VRC-23) | canon R11 (the summary carries only canonical text; J-A28.02's precedent, J-A32.02's Part A entry) leaves the repair round to fold the superseded phrases in place: "measured from Neighbourhood's recordings" (l. 39), "so the optional shadows" (l. 46; shadows are on by default, J-A68.81), "The first picture is always the finished map" (l. 53; J-A68.88), "about 166–220 expert person-weeks" (l. 78); J-A32.02's row still reads "to be folded where they stand" | l. 39: replace "measured from Neighbourhood's recordings" with "Neighbourhood's own recipe restated in metres, its recordings the test it must pass"; l. 46: replace "so the optional shadows and the 3-D export read real heights" with "so the shadows, on by default (§8.4), and the 3-D export read real heights"; l. 53: replace "The first picture is always the finished map, never a rough preview:" with "The first picture is always the complete map, never a rough preview, its light following within a moment (§8.5):"; l. 78: replace "about 166–220" with "about 185.5–248.5"; in the appended paragraph delete "(which corrects "measured from Neighbourhood's recordings" above)" and ", which replaces the figure given above"; J-A32.02's row: replace "which names the summary's two superseded phrases, to be folded where they stand" with "its superseded phrases folded in place by the repair round (R11)" |
| VSC-11 | minor | conflict | scope | 55 | §13.3 *Placement digests* l. 13325–13328 | R's S2 note 3 and E2's note 7 (3): placement digests are per (stop, knowledge key, view rotation), goldens at rotation 0 (§9.2 l. 11002–11003; J-A55.81); §13.3's definition names no rotation | After "S13b places the band's area and way labels at the `public` knowledge tier with no places (§9.2)" insert "at view rotation 0 (a digest is per stop, knowledge key and rotation, §9.2; J-A55.81)" |
| VSC-12 | minor | missing | scope | 20 (h) | §13.2 owner-rule group; §13.8; §16 M1 exit | item 20 (h) (i)'s tier marker (`factTier`, J-A20.23) has no bar: T20-9 tests refusals, the registry test only that the marker exists; M's note 7 (c) asked for one | After T20-12 add "(T20-13) on the fixtures and a blueprint, `factTier` (§2.8; J-A20.23) reads `dossier` on exactly the registry's dossier paths of each dossier-backed record, `declared` on exactly the entities a declaring event pinned (item 101), `map` elsewhere, and the reader, every export and the tool API show that tier (J-A20.82)"; in §13.8 and J-A63.01 read "T20-7 – T20-13"; M1 exit: after "item 20 (h)'s creation and totality bars on the fixtures" add "with T20-13" |
| VSC-13 | minor | missing | scope | 101 (i) | §14 tool table, T2 row | the T2 `ground` gesture lists terrain strokes, coast and river curves, a river by source and mouth and a lake by point and level, but not the harbour's points form (a sea level, one shore point and a basin size — item 101 (i), §7.1's `drawWater`) | Append to T2's gesture cell "; a harbour by a sea level, one shore point and a basin size (§7.1's points form)" |
| VSC-14 | minor | missing | scope | 50 | Appendix A l. 16866–16868 | the list of reader inferences that entered after Fable's gate omits item 50's "MFCG 12710731's model carries no door record" (§13.5 l. 13518, labelled an inference; applied on the gate's completion row, "the editor texts stand as written") | After "and the restated Fantasy Manor model's timing (§12.7)" insert ", and the absence of a door record in MFCG 12710731's model (§13.5's entrances row; item 50, whose editor texts the gate's completion let stand)" |
| VSC-15 | minor | broken-reference | scope | 68, 62 | §13.5 lighting row l. 13534 | the row cites the reader-tier files directly — "(`code-ftg-client.md`, its sections 2.2 and 2.5.5–2.5.6)", "(`code-neighbourhood.md`, its section 2.11)" — where gate (c) and §17.1 (6) allow a code-read fact only its P-id; the P-ids (P22 FTG light model, P23 NG 1.2.2 prism shadow and night glow) were never appended to `code-impact.md` §(d) (R's manager note 1; §8.4 l. 10231–10234 says "P-id pending") | Research-side first: append P22 and P23 (route §C.3 (3)'s texts) to `research/findings/code-impact.md` §(d); then replace "(`code-ftg-client.md`, its sections 2.2 and 2.5.5–2.5.6)" with "(P22)" and "(`code-neighbourhood.md`, its section 2.11)" with "(P23)" (§8.4's "P-id pending" is rendering's, the same edit) |
| VSC-16 | minor | missing | scope | 76, 77, 85, 68 | §16 exit criteria | bars §13.2 schedules have no exit row: T77-1 (M1–M2b), T85-1 – T85-2 (M1), T85-3 (M3a), T76-1 (the cadence on the port's epochs at M3a, the per-year clause with epochs at M4), T68-9 (Works, M4) — §13.2's rule is that each bar runs "from the milestone §16 names" | M1 exit: after "item 20 (h)'s creation and totality bars on the fixtures" add ", T77-1's slice and bearing clauses, T85-1 and T85-2"; M2b exit: after "T44-1, T57-1" add ", T77-1's weight clauses"; M3a exit: after "T75-1 – T75-5 on the absorb pairs" add ", T85-3, T76-1's cadence clauses on the port's `EpochInputs`"; M4 exit: after "T20-2's tolerance clause" add ", T76-1's per-year clause, T68-9" |
| VSC-17 | minor | missing | scope | 85, 88 | §16 M3a content | the route stages item 85 (b), (d)–(f) and item 88's schema at M3a; M3a names only "bridge correlation (items 74–87)" | Replace "named-feature targets and the `notice` pin, bridge correlation (items 74–87)" with "named-feature targets and the `notice` pin, bridge correlation, the SettlementForge iframe configuration, per-export display names and the audience table (item 85 (b), (d)–(f)), and item 88's staged records schema-complete and empty (§2.7) (items 74–88)" (no price change: 85 inside the port's M3a +2 / +3, 88's schema unpriced by J-A73.05) |
| VSC-18 | minor | new-problem | scope | 68 | §15.2 O17 (g), S5 (e) | "shadow ∝ height r ≥ 0.99" and "shadow length ∝ stored height" were bars for the parallel projection; the default cursor sun is radial at a finite height (shadow tip d·h ÷ (H − h), J-A68.84), where length is not proportional to height | O17 (g): replace "shadow ∝ height r ≥ 0.99 [C]" with "shadow ∝ height r ≥ 0.99 under the fixed sun on isolated casters (§8.4) [C]"; S5 (e): replace "shadow length ∝ stored height, r ≥ 0.99 [C]" with "shadow length ∝ stored height under the fixed sun, r ≥ 0.99 [C]" |
| VSC-19 | minor | new-problem | scope | 85 | §14 port item 2 l. 14060–14062; `DossierDigest.settlement.seed` comment | "nothing reverses the derivation" overclaims: `H32` is a 32-bit non-cryptographic hash, so a host seed from a small enough space is recoverable by enumeration; the protection is that the host seed is never stored (PLAUSIBLE — SettlementForge's seed space is not stated in the survey) | Replace "and nothing reverses the derivation" with "; the protection is that the host's seed is never stored — `H32` is a 32-bit digest, not a cryptographic one-way function, so the host keeps its own seed secret as it already does"; in the digest comment replace "one-way (below)" with "derived, never the host's seed (below)" |
| VSC-20 | minor | missing | scope | 70 | *Staged* underground row | the route asked the underground row to carry item 70's clusters in the undercity's chambers; the row lists the undercity's records but not its informal clusters | After "the `UndergroundSystemStrategy`, `UndercityStrategy` and `UndergroundLinkStrategy` slots (item 65);" insert " the informal clusters of the undercity's chambers (item 70, II.7.5);" |
| VSC-21 | minor | new-problem | scope | 81 | §1.1 *Requests at the ends of the ladder* | item 81's reason — a dossier's population is a dossier fact a clamp would contradict — applies equally at the top, yet "A request above 120 000 is clamped to 120 000 and reported" covers dossiers too (unreachable at birth on the pinned line, whose metropolis band ends at 100 000) | Replace "A request above 120 000 is clamped to 120 000 and reported." with "A request above 120 000 that carries no dossier is clamped to 120 000 and reported; a dossier above it is refused by the port as one below 1 500 is (`E_RUNG_UNAVAILABLE`) — a case the pinned line's metropolis band (≤ 100 000) never produces at birth (§7.7 item 15)." Record J-A81.01 (index + Part A); the same clause in §7.7 item 15 is determinism's |
| VSC-22 | minor | duplicate | scope | 52 | §13.3 *Amendments c in the goldens* (= VD0-26) | restates §6.5 (9)'s test in full ("for 20 golden seeds, a seed's model digest generated first in a fresh process equals its digest after 50 other maps and after every view toggle and zoom stop") | Replace "test (item 52) — for 20 golden seeds, a seed's model digest generated first in a fresh process equals its digest after 50 other maps and after every view toggle and zoom stop — and" with "test (item 52) and" |
| VSC-23 | minor | new-problem | scope | 65 | §13.2 T65-6 (= VKC-19) | "re-deriving one underground system leaves the ground and every other part byte-identical" fails for a system with links (their far `link_end` vertices lie in other parts) | After "every other part byte-identical" insert "but for the far `link_end` vertices of its links, each either unchanged or stripped with its edge restored exactly (§3.4)" — after VKC-03 |
| VSC-24 | minor | conflict | scope | 81 | §13.2 T81-1 (= VKC-20) | "every entity inside the old frame keeping its address and geometry" is false for faces along the replaced margin and border chains | Replace "every entity inside the old frame keeping its address and geometry" with "every entity keeping its address, and every face whose ring ran along neither the old margin nor the old border keeping its geometry (§3.2 (9))" — after VKC-02 |
| VSC-25 | minor | owner-fidelity | scope | 69 | §0.2 row 69; the summary l. 116–117 | the owner said "Adopt the corpus measured color targets"; the design lands `ink` in the band's lower range (plate chroma 20–30, J-A69.82), the program's reading of "constraint" — Fable's A-M2 note 3 says the owner may prefer the median (43); unlike the shadow default, it is not put to the owner | §0.2 row 69: append "; **put to the owner:** the `ink` map's colour lands in the band's lower range (plate chroma 20–30, J-A69.82), the program's reading of "constraint", where the owner may prefer the band's middle (43)"; summary: after "measured on the owner's own map collection (§8.2)" add ", with a little more colour than before but less than the collection's middle — say if the default should take the middle" |
| VSC-26 | minor | conflict | scope | 50, 70 | §13.5 entrance row's bar; §13.2 T29-1; §15.2 O5 (f) (= V-MC0-09, widened to O5 (f)) | the bar "100 % on the access edge" and "facing its street or its court" contradict §2.6's amended rule 1 (l. 1480–1486): the main door stands on the footprint side that faces the frontage access edge wherever the front line receded (item 43), a hidden plot's faces its passage or court, a cluster structure's its footpath (J-A70.44) | §13.5 entrance row, band cell: replace "100 % on the access edge" with "100 % on the footprint side that faces the frontage access edge (§2.6 rule 1: the court or path for a set-back building, the passage or court for a hidden plot, the footpath for a cluster structure)"; T29-1: replace "facing its street or its court" with "facing its street, its court or passage, or — a cluster structure — its footpath (§2.6 rule 1)"; O5 (f): replace "facing its street or court" with "facing its street, court or passage, or its footpath (§2.6 rule 1)"; J-A50.01's index row: replace "with the bar \"100 % on the access edge\"" with "with the bar of §2.6 rule 1's side" |

### Order for the repair round

VSC-01 after VD0-04 (item 66's staging sentence at §7.3 item 9); VSC-26 with J-A50.01's Part A entry; VSC-23 after VKC-03; VSC-24 after VKC-02; VSC-15 after the
research-side append of P22 and P23; VSC-08 with VSC-09; VSC-10 in one edit of the summary with its appended paragraph and
J-A32.02's row; the rest independent.

### CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read in place): every quotation and line number above; the T-id, J-id, index-structure,
digit-rule, identifier and deferral scans; the §16 arithmetic; the title-block and summary diffs against the archive; the
document checks' counts. PLAUSIBLE (reasoning): that VSC-01's generators cannot run before M4's records (the design
states no earlier schema for them), VSC-19's enumeration risk (SettlementForge's seed space is not stated in the survey),
and every proposed wording — each is this seat's vetoable proposal for the repair round.
