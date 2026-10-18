# verify-scope-r1 — lane amendments-c/verify-scope-r1 (the SCOPE part after repair round 1 / assemble-r1)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-scope-r1).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 inputs read (verify-scope-r0, repair-scope-r1 report, assemble-r1, sibling repair/verify r1 notes to scope): done
> STEP 1 diff of the part's sections, archive pre-repair-r1 -> live: done (scratch vs1/changes.txt, 70 hunks, all inside the part)
> STEP 2 repaired subsections read whole (summary, §0.2, §1.1, §1.2, §13.2, §13.3, §13.4, §13.5, §13.8, §14, §15.1, §15.2, §16, Delegated, Judgment calls, Staged, Appendix A): done
> STEP 3 per-issue verdicts VSC-01..26 (+ restated VKC-19/20, VD0-26, V-MC0-09, VRC-23): done (all FIXED)
> STEP 4 per-item verdicts (re-checked where repaired; others keep r0's): done (all PRESENT)
> STEP 5 checks (single-source, stale, cross-part incl. sibling notes, deferral, refs, new-problem), doc_checks: done (exit 0)
> STEP 6 issues table, queue row, LANDED: done (9 issues, all minor; queue row B-amendments-c/verify-scope-r1)

Design under review: docs/ARCHITECTURE.md sha256 024c57dabc6b93c8… (17 050 lines); rationale 33b21ca8cdc15789… (2 304 lines) — assemble-r1's installed files. Before: docs/archive/ARCHITECTURE-pre-amendments-c-repair-r1-2026-09-28.md (7f4c0e25…).

## Findings (appended as each step completes)

### Outcome

All 26 scope issues of `verify-scope-r0.md` are **FIXED** in the live text, and so are the five sibling rows it restated (VKC-19, VKC-20, VD0-26, V-MC0-09 and VRC-23's l. 46 clause). Items 70, 20 (h), 85, 88 and 101 move from PARTIAL to **PRESENT**. Every item homed in the part (32, 41, 48, 49, 56, 62, 73, 83, 84, 85) stays PRESENT. The repair seat's six extensions (T66-5, the access edit's staged-layer refusal at M4, the above-cap refusal at absorb with T81-2, the `factTier` sweep, the moved inline estimates, and the C3 rewordings) are sound, with one loose end (VS1-07).

This round files **9 issues, all minor**: scope 6, determinism 1, pipeline 1, rendering 1. Three of them come from cross-part notes that the owners' repair seats never folded in:
* scope's own r1 notes on the 120 000-cap refusal, for §7.7 item 15, §5.4, §4.11 and §11.4 (VS1-01 – VS1-03; = VD1-01, VD1-14 = VPR1-06 and VRC1-09 from the sibling r1 verifiers, apply once);
* pipeline r1's note 6, which asks §13.2 for five new bars (VS1-04 = VPR1-17, widened with the tiers, the milestones and the geology flag's schedule);
* the kernel verifier's VKC1-06, restated (VS1-05).

Four are new findings in repaired subsections (VS1-06 – VS1-09). V-MC1-09 (rendering) also touches J-A20.82's index row in this part. It is confirmed here and not re-filed.

Document checks on the part exit 0. References: 723 index rows = 723 Part A entries, no duplicates, every row three cells. T-ids: 196 defined and cited, 0 undefined. The title block and the one review banner are unchanged.

The part was read whole where round 1 repaired it: summary l. 20–130, §0.2 l. 144–247, §1.1–§1.2 l. 274–369, §13.2 l. 12891–13436, §13.3–§13.5 l. 13437–13701, §13.8 l. 13902–13943, §14 l. 13989–14397, §15.1–§15.2 l. 14406–14631, §16 l. 14632–14735, D-25 and D-33, the Judgment-calls intro with every changed and added row, *Staged* and Appendix A l. 16992–17050. The word-level diff against `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r1-2026-09-28.md` is in scratch `vs1/changes.txt` (70 hunks, every one inside the part).

### Re-check of the round-0 issues (live text, design 024c57da…)

| r0 id (= sibling) | verdict | the live text (line) |
|---|---|---|
| VSC-01 (major) | FIXED | M3a l. 14659 "the closure rule (§7.3 item 9) with its first base instance — a concealed front's missing concealed door (item 63)"; exit "66's concealed-door instance (T66-5)", 27.5–35.5 pw; M4 l. 14661 "`addUndergroundAccess` with its closure generators and its staged-layer refusal (item 66; §7.3 item 9 (d))", exit "66 (T66-1 – T66-4)", 16.5–23.5 pw; pricing "M3a +4.5 / +7.5 … M4 +3.5 / +4.5 pw"; T66-5 l. 13303–13307; J-A66.01 row + Part A; agrees with §7.3 item 9 (d) l. 8507–8509 (VD0-04). Loose end: VS1-07 |
| VSC-02 | FIXED | §0.2 heading l. 144 names items 1–7, 8–31, 32–88 and 101; old title occurs nowhere |
| VSC-03 | FIXED | index intro l. 16252–16264: "the amendment passes' — amendments b's … and amendments c, d and e's"; the `J-F⟨lane⟩-⟨n⟩` sentence |
| VSC-04 | FIXED | §1.2 l. 356–357 "The first paint is the complete city band (§8.5); its light follows within the settle bound (below)." |
| VSC-05 | FIXED | O18 (j) l. 14604 "[O]" |
| VSC-06 | FIXED | C9 l. 14487; O5 (f) l. 14603 "FTG models no door (item 50)" |
| VSC-07 | FIXED | §14 `@plat/model` l. 14008–14009 (`H128`, `H32`); testkit comment l. 14213; port item 2 l. 14228–14229 "from `@plat/model`" |
| VSC-08 (with VSC-09) | FIXED | T30-5 l. 13189–13195 lists `why` and states §11.2 (1), (3), (4); rendering's §11.2 l. 11952 lists `why` (VSC-09 FIXED). Residue: VS1-06 |
| VSC-10 (= VRC-23) | FIXED | summary l. 39, 46, 53, 78; appended paragraph l. 106, 128–129; J-A32.02 row l. 16930 and Part A l. 709 |
| VSC-11 | FIXED | §13.3 l. 13494 "at view rotation 0 (a digest is per stop, knowledge key and rotation, §9.2; J-A55.81)" |
| VSC-12 | FIXED | T20-13 l. 13356–13361 (§2.8's three conditions as model repaired them, J-A20.24); §13.8 l. 13931; M1 exit; J-A63.01; O10 (i) |
| VSC-13 | FIXED | §14 T2 l. 14313 "a harbour by a sea level, one shore point and a basin size (§7.1's points form)" |
| VSC-14 | FIXED | Appendix A l. 17045–17046 |
| VSC-15 | FIXED | §13.5 lighting row l. 13700 "(P22)", "(P23)"; P22–P24 are rows of `research/findings/code-impact.md` §(d) l. 190–192 (assembler's vetoable append); no source-class name of those rows occurs in the design or rationale (grep) |
| VSC-16 | FIXED | M1 exit "T77-1's slice clause, T81-2's creation clause, T85-1 and T85-2"; M2b "T77-1's weight clauses"; M3a "T85-3, T76-1's cadence clauses"; M4 "T76-1's per-year clause, T68-9"; T77-1 and T76-1 name those clauses (l. 13314–13317, 13401–13404) |
| VSC-17 | FIXED | M3a content "the SettlementForge iframe configuration, per-export display names and the audience table (item 85 (b), (d)–(f)), and item 88's staged records schema-complete and empty (§2.7) (items 74–88)" |
| VSC-18 | FIXED | O17 (g) l. 14605; S5 (e) l. 14629 |
| VSC-19 | FIXED | §14 item 2 l. 14230–14231; digest comment l. 14157 "derived, never the host's seed" ("one-way" remains only as item 85 (a)'s own name for the seed) |
| VSC-20 | FIXED | *Staged* underground row "the informal clusters of the undercity's chambers (item 70, II.7.5)" |
| VSC-21 | FIXED in the part | §1.1 l. 344–348; §14 `PortResult` l. 14141, item 3 l. 14241–14243, item 4 l. 14250–14251; D-33 l. 16235–16238; §0.2 row 20; T81-2; §13.8; M1/M3a; J-A81.01. The owners' homes lag behind: VS1-01 – VS1-03 |
| VSC-22 (= VD0-26) | FIXED | §13.3 l. 13526–13527 "test (item 52) and B-DOSSIER-lite's fixture digests" |
| VSC-23 (= VKC-19) | FIXED | T65-6 l. 13295–13298 = §3.4 l. 3058–3062 ("placing, keeping or stripping each far end by one transaction on each part it touches") |
| VSC-24 (= VKC-20) | FIXED | T81-1 l. 13404–13408 per J-A81.31 (§3.2 (9) l. 2573–2604); the raster clause is VKC1-06 = VS1-05 |
| VSC-25 | FIXED | §0.2 row 69 "**put to the owner:**"; summary l. 116–117 |
| VSC-26 (= V-MC0-09) | FIXED | §13.5 entrance row l. 13654; T29-1 l. 13177–13178; O5 (f); J-A50.01 row + Part A; all = §2.6 rule 1 (l. 1132, 1511) |

### Per-item verdicts (items routed to this part)

* **Home items: all PRESENT.** 32, 41, 48, 49, 56, 62, 73, 83, 84 and 85 keep r0's verdicts and quotations; round 1 left their mechanisms standing. Item 85's (a) now carries the corrected protection sentence (VSC-19); its creation and absorb refusals now state the cap (J-A81.01).
* **Referencing items: all PRESENT.**
  * PARTIAL → PRESENT:
    * 70: *Staged*'s underground row.
    * 20 (h): T20-13.
    * 85 and 88: §16's M3a row.
    * 101: T2's harbour and T30-5's `why`, with VS1-06's residue on §11.2 (2).
  * Stale or conflicting clauses cleared:
    * 50: C9 and O5 (f).
    * 66: its schedule, J-A66.01, with VS1-07 and VS1-08's loose ends.
    * 81: T81-1 now reads J-A81.31; T81-2 and J-A81.01 added, with VS1-01 – VS1-03 for the owners' homes.
  * Re-read and unchanged in verdict: 63, 65, 68, 69, 76 and 77. T30-5 and T63-2 cover the oracle; T65-6 = §3.4; the lighting row carries P22 and P23; §0.2 row 69 puts the palette choice to the owner; T76-1 and T77-1 carry their clauses.
  * Every other referencing item keeps r0's PRESENT.

### Cross-part notes addressed to this part (round-1 repair reports)

| from | note | reflected? |
|---|---|---|
| kernel r1, note 2 (VKC-19) | T65-6 "placed, kept or stripped" per §3.4 | yes (l. 13295–13298) |
| kernel r1, note 3 (VKC-20) | T81-1 per J-A81.31's region | yes (l. 13404–13408); the raster clause is VKC1-06 (verify-kernel-r1), restated as VS1-05 |
| model r1 (V-MC0-09) | T29-1 and the entrance bar = §2.6 rule 1 | yes |
| determinism r1 | "the tier marker" in §13.2 / §14 / §16 → `factTier` | yes (no stored-marker wording left in the part; rendering's five "§2.8's marker" places and J-A20.82's row are V-MC1-09, rendering's) |
| rendering r1, hand-offs 5–7 | §13.4 fallback → §8.4 (g); T30-5's clause; M2b's 53 ms | yes (l. 13562–13563; l. 13193–13195; M2b exit) |
| rendering r1, VRC-15 / scope hand-off (1) | P22–P24 in `code-impact.md` §(d) | yes (assembler's vetoable append, assemble-r1 §1) |
| **pipeline r1, note 6** (landed 10:41, after scope's repair) | bars for (a) the geology flag's resolved share and its `ordinary` cases, (b) `TradeFlow` at S3 (7) equal after S4 and read by the market score, (c) no informal plot outside a shanty-typed district and no cluster class from the class mix, (d) every household's band inside its district's written range after S10a, (e) the staged readers inert with `PortRows` empty | **no** — none of the five is in §13.2, and §16 places no build of the geology flag (VS1-04) |
| scope r1's own notes 1–3 to determinism, pipeline, rendering (VSC-21) | the above-cap refusal at §7.7 item 15, §4.11, §11.4 | **no** — determinism's and rendering's repairs landed before scope's; pipeline's, landing later, did not take it (VS1-01 – VS1-03) |

### Held parts (gate (a)) — so nothing is lost

* **Still held and absent from the part (grep of the whole design):**
  * item 52's claim that the references' session-reached maps visibly differ;
  * item 35's supporting position check (160 / 162 faces);
  * item 60's support for NG 1.2.2's hand-off of plans up to 16 cells wide;
  * item 68 (g)'s absence claim "MFCG draws no cast shadows". "Draws no cast shadow" occurs only as our `MFCG` preset's behaviour (l. 361, 10048, 13700; J-A68.86);
  * item 68's VG 1.6.9 lighting layers and Dwellings' shading gradients.
* **Released parts stand as round 0 applied them, labelled:** item 37's metre reading, item 58 (f)'s hood span, item 59's timing, and item 50's MFCG door inference (Appendix A now lists it, VSC-14).
* **Item 49's rejected deletion stays honoured:** §1.4 keeps the 49 % with F4.
* No round-1 text in the part writes a held part.

### Checks

**Single source.** Each repaired mechanism is stated once:
* The above-cap refusal is stated at §1.1, which owns the ladder. §14's port items 3–4 and `PortResult` carry it as the port's interface, and D-33, §0.2 and J-A81.01 point to it. Its §7.7 home does not yet hold it (VS1-01).
* T66-5, T20-13 and T81-2 are stated once, in §13.2.
* §13.3 no longer restates §6.5 (9).

The summary gives the effort total twice (l. 78 and l. 128–129), both the canonical 185.5–248.5 (R11). It is left as r0's VSC-10 text asked.

**Stale.** The task's list was checked: lots as buildings, binary wealth, size fixed by tier, one central market, the map editing the dossier, the licence default, and unchanging terrain and water. None stands.
* The r0 stale sentences (VSC-02 – VSC-06, VSC-10) are gone.
* D-25's access-edit clause predates round 1's staged-layer refusal and J-A66.01 (VS1-08).

**Cross-part.** See the table above.
* `factTier`, §2.6 rule 1, §3.4's link ends, §3.2 (9)'s region and §11.2's oracle now match the scope bars that cite them, with VS1-05's raster clause and VS1-06's rule (2) as residue.
* §3.2 (9)'s "taken at most at the cap, as §1.1 clamps a request" agrees with J-A81.01, since no dossier above the cap reaches an epoch.

**Deferral wording.** A scan of every word round 1 added to the part found no TBD, later, pending, for now, not yet, placeholder or deferral. It found one "open", in "open level ground" (J-A68.85's row). The *Staged* rows and the pricing paragraph name roadmap staging only.

**References.**
* §-pointers: doc_checks S2 0.
* Index: 723 rows, 723 unique, every row three cells; Part A has 723 entries with the same id set.
* Every J id cited in the design resolves. The rationale cites J-Fcode-1..3 (Fable review ids) and J-M4 / J-M9 (the SettlementForge mapping lane's ids, `research/sf/`). These are external, pre-existing and unchanged, not index ids.
* T-ids: 196 defined and cited, 0 undefined.
* The J-A digit rule holds for all 19 rows round 1 added:
  * 0: J-A66.01, J-A81.01;
  * 2: J-A20.24, J-A63.22, J-A67.22;
  * 3: J-A81.31;
  * 4: J-A77.42, J-A70.49, J-A72.50, J-A72.51, J-A65.49, J-A65.40, J-A68.42, J-A88.42, J-A64.44;
  * 7: J-A67.72, J-A68.73;
  * 8: J-A101.85, J-A72.82.

**Gate (c).** The part's added text holds none of these:
* the identifiers r0 scanned;
* P22–P24's source classes (`Sun`-family, `BuildingLights`, `ShadowLayer`, `HoodView`, `BuildingView`, `ManorView`, `visuals.Shadow`);
* any reading-file name.

**Gate (b).** The new build-bearing sentences name their builds: the entrance and lighting rows, Appendix A and C9. The exception is the summary's "Neighbourhood's own recipe" (VS1-09).

**§16 arithmetic (CONFIRMED by re-summing).**
* Milestone rows: 2–3 + 9–12 + 38.5–50 + 10–13.5 + 42–55.5 + 27.5–35.5 + 18–23.5 + 16.5–23.5 + 8–14 + 14–18 = **185.5–248.5**. This equals the lines' base 171.5–230.5 plus stage 2's 14–18.
* The c–e deltas: +2.5/+3, +1/+1.5, +6/+9.5, +4.5/+7.5, +2/+2.5, +3.5/+4.5 = **19.5–28.5** = J-A63.05 + J-A73.05 + J-A101.05.
* The inline estimates are M3a ≈ 4.5–7.5 and M4 ≈ 3.5–4.5.

**Title and banner.** Lines 1–19 are byte-identical to the pre-amendments-c archive. There is one review banner and no per-section marker.

**Document checks.** `python3 docs/validation/bench/doc_checks.py --sections "The whole design,0,1,13,14,15,16,17,Delegated decisions,Judgment calls,Staged,Appendix A"` ran on 2026-09-28 (corpus 9 626 JSON files, 916 788 3-grams, 478 lists). Results: C1 5 / 0, C2 0 / 0, C3 322 / 0, C4 4 / 0, S1 0 / 0, S2 0 / 0 — **exit 0**. Output is in `vs1/dc.out`.

### Issues

| id | sev | kind | owner | item | where | the problem | exact required change |
|---|---|---|---|---|---|---|---|
| VS1-01 (= VD1-01) | minor | conflict | determinism | 81 | §7.7 item 15 (l. 9387–9393); §5.4 (l. 7028) | §1.1 (l. 344–348), §14 (`PortResult` l. 14141, items 3–4), D-33 and §0.2 row 20 state that a dossier above the 120 000 cap is refused by the port at creation and at every absorb (J-A81.01), and cite §7.7 item 15 for it; §7.7 item 15, the home of the port's population rule, states only the floor, and §5.4's report sentence names only "one below the 1 500-person floor" (scope r1's cross-part note 1 was never applied: determinism's repair landed first) | §7.7 item 15: after "a clamped town would contradict it (J-A81.71)." insert " A dossier whose population lies above the 120 000 cap is refused the same way, `E_RUNG_UNAVAILABLE` naming the cap, at creation and at every absorb, nothing absorbed — §1.1's clamp to the cap serving only a request that carries no dossier (J-A81.01)."; §5.4: replace "one below the 1 500-person floor, `E_RUNG_UNAVAILABLE` (§7.7, item 81)" with "one whose population lies outside the ladder — below the 1 500-person floor or above the 120 000 cap — `E_RUNG_UNAVAILABLE` (§7.7 item 15, item 81; J-A81.01)" |
| VS1-02 (= VD1-14 = VPR1-06) | minor | conflict | pipeline | 81 | §4.11 *The rung at an epoch* (l. 6413–6414) | "A dossier below 1 500 is refused by the port (§7.7, item 81) and never reaches an epoch" omits the cap refusal that §1.1 and §14 item 4 now state for every absorb (J-A81.01); scope r1's cross-part note 2 was not taken by pipeline's later repair | Replace "A dossier below 1 500 is refused by the port (§7.7, item 81) and never reaches an epoch." with "A dossier outside the ladder — below 1 500, or above the 120 000 cap — is refused by the port (§7.7 item 15, item 81; §1.1; J-A81.01) and never reaches an epoch, so §3.2 (9)'s clamp of the frame's target at the cap serves only growth that carries no dossier." (after VS1-01) |
| VS1-03 (= VRC1-09, its §11.4 part) | minor | conflict | rendering | 81 | §11.4 (l. 12139–12140) | the host-input section states the port's refusal below 1 500 only; the cap refusal (J-A81.01) is missing, scope r1's cross-part note 3 unapplied | Replace "while none is registered (§7.7 item 15; item 81) — §1.1's clamp serves only a request that carries no dossier." with "while none is registered (§7.7 item 15; item 81), and one above the 120 000 cap the same way, naming the cap (§1.1; J-A81.01) — §1.1's clamp serves only a request that carries no dossier." (after VS1-01) |
| VS1-04 (= VPR1-17, widened) | minor | missing | scope | 65, 70, 72, 77, 88 | §13.2 (T65, T77-1, T70, T72, the port's group); §13.8; §16 M1 and M2b | pipeline r1's cross-part note 6 (its report §4) asks this part for bars that prove five mechanisms round 1 added — the geology flag (§4.2 S1 l. 3989; J-A65.49), `TradeFlow`'s two-part derivation (§4.3 l. 4343; J-A77.42), informal tenure only in a shanty-typed district (§4.7 S11 (1)–(2); J-A70.49), S7b's provisional band range with S10a's re-homing (§4.5 (5) l. 4813; J-A72.50) and the staged readers inert while empty (J-A88.41, J-A88.42); none is in §13.2, and §16 builds the geology flag's S0 draw and S1 resolution at no milestone, though S0 and S1 are M1's and `Terrain.geology` joins every golden's model digest (a later arrival is a declared shift, §13.3); VPR1-17 gives the five bars, this row adds their tiers, milestones and the flag's schedule | (1) T65-6: replace "(the per-part twin of T12-1's reroll isolation; §3.10's row)." with "(the per-part twin of T12-1's reroll isolation; §3.10's row); (T65-7) with `geology: 'auto'`, over 1 000 seeds per relief class the shares S1 resolves to `soluble` and `volcanic` lie within ± 3 s.e. of the feature table's geology row at that class, each resolution recorded in `autoResolved`, and a sky island's terrain and every run under the parity presets read `ordinary` (§4.2 S1; J-A65.49)."; (2) T77-1: replace ", and a way's trade weight equals the sum of the gate weights routed over it;" with ", a way's trade weight equals the sum of the gate weights routed over it, and the gate weights, the harbour's share and the dominant bearing computed at S3 (7) equal their values after S4, S3 (12)'s principal-market score reading those gate weights (§4.3; J-A77.42);"; (3) T70-5: replace "(T27-2's shanty fixture extended)." with "(T27-2's shanty fixture extended); (T70-6) at generation no plot outside a shanty-typed district is `informal`, and no class-mix draw (§4.7 S10b) yields a cluster structure's class (§4.7 S11's *Informal clusters* (1)–(2); J-A70.49)."; (4) T72-8: replace "and an even mix is neutral." with "and an even mix is neutral; (T72-9) after S10a every household's band lies inside its district's written band range, each household S10a moved from S7b's provisional allocation reported, and the provisional range stored nowhere (§4.5 (5); J-A72.50)."; (5) after T81-2's "nothing absorbed (§1.1; J-A81.01);" insert " (T88-1) with the staged rows and records empty (`PortRows`, §10.2; `Recipe.history`'s `HistoryHint`, §2.9; every `PowerRelation`, §2.7) the staged readers of J-A88.41 and J-A88.42 (§4.2 S2, §4.5, §4.6, §4.9, II.7.3, II.7.5, II.7.6) change nothing: on the golden suite the model digest equals the one a test build gives with each reader replaced by its base value, each reader from the milestone that lands its stage;"; (6) §13.8: replace "T63-4's 1 000 seeds and T64-2's and T65-2's 500-seed sweeps nightly" with "T63-4's 1 000 seeds, T64-2's and T65-2's 500-seed sweeps and T65-7's relief-class sweeps nightly", and after "its absorb clause nightly from M3a." add " T88-1 runs in the PR tier on the golden fixtures from M1."; (7) §16 M1 content: after "the derivation table as an index and its totality bar (item 20 (h), §7.7);" insert " the geology flag's S0 draw and S1 resolution (item 65; §4.2 S1; J-A65.49; its draw's place in `blueprint.features` §6.1's, VPR1-15), so `Terrain.geology` is in the first golden, as `Features.sewers` is (absorbed by the O1 line);"; M1 exit: after "T85-1 and T85-2" add ", T65-7 and T88-1"; M2b exit: after "T77-1's weight clauses" add ", T70-6, T72-9"; record J-A65.02 (index: "the geology flag's S0 draw and S1 resolution built at M1 with S0's auto features, its reader at M4; bar T65-7 \| §16, §13.2"; Part A: chose M1 over M4 with the underground hooks because S0's feature draws and S1's terrain are M1's, so the flag enters the first golden instead of arriving at M4 as a declared shift of every golden (§13.3), `Features.sewers`'s precedent) |
| VS1-05 (= VKC1-06) | minor | partial | scope | 81 | §13.2 T81-1 (l. 13404–13408) | T81-1 proves the grown frame's addresses and faces but not §3.2 (9)'s raster clause (l. 2597–2602: every raster keeps its `cellCm`, every old cell its place and every stored height its value; the `hydro` fields recomputed over the grown grid), which J-A81.31 records | T81-1: after "re-parented where its parent was joined" insert ", every raster keeping its `cellCm` with every old cell in its place and every stored height unchanged, and the `hydro` fields equal to a fresh computation over the grown grid" (verify-kernel-r1's text) |
| VS1-06 | minor | partial | scope | 101, 63 | §13.2 T30-5 (l. 13193–13195) | round 1 aligned T30-5 with §11.2's oracle rules (1), (3) and (4) (l. 11960–11971; J-A101.85) but not rule (2): in any other answer a rule, input or alternative that is a withheld place — a relation row's target, a supply edge's end, an alternative site — is given by its address and kind only; no bar proves that a `why` on a neighbour leaks nothing | Replace "and a `why` on a concealed part answers empty, no answer naming the concealed function (§11.2);" with "and a `why` on a concealed part answers empty, no answer naming the concealed function; and a `why` on another building whose relation rows, supply edges or alternative sites include the withheld place gives that place by its address and kind only, `withheld: true` (§11.2's oracle rules (1)–(4));" |
| VS1-07 | minor | new-problem | scope | 66 | §16 M3a and M4 (l. 14659, 14661); J-A66.01's Part A (rationale l. 768); §13.2 T66-5 (l. 13303–13307) | (1) M3a builds "the basement's requested-mode ladder (§2.6)", but its only caller is `addUndergroundAccess` (§2.6 *A requested basement* l. 1548–1549: "When an edit's closure needs a basement the building lacks — `addUndergroundAccess`"), which J-A66.01 moved to M4 with its bar T66-1, so M3a lands a mechanism nothing calls or tests until M4 (r0's VSC-01 text carried it over); (2) T66-5's "a `setAttr` that makes a placed use a front" inverts §4.7's terms (`concealment: 'front'` is set on the concealed use; the front is the other use, `Use.front`), and its closing "reported" asserts a report §4.7 (4) (b) does not state | (1) M3a content: replace "with its first base instance — a concealed front's missing concealed door (item 63) — and the basement's requested-mode ladder (§2.6);" with "with its first base instance, a concealed front's missing concealed door (item 63);"; M4 content: replace "`addUndergroundAccess` with its closure generators and its staged-layer refusal" with "`addUndergroundAccess` with its closure generators (the basement's requested-mode ladder of §2.6 the first) and its staged-layer refusal"; J-A66.01 Part A: delete ", together with the basement's requested-mode ladder," and after "`addUndergroundAccess` with its closure generators" insert " (the basement's requested-mode ladder of §2.6 among them, the access edit its only caller)" (no price change: the ladder was inside item 66's 0.5 pw that J-A66.01 moved); (2) T66-5: replace "a `setAttr` that makes a placed use a front (§4.7's *Concealed institutions* (1))" with "a `setAttr` that sets a placed use's `concealment` to `front`, its front a use of the same building (§4.7's *Concealed institutions* (1); `Use.front`)", and replace "the concealed programme reached from the front's service side, reported." with "the concealed programme reached from the front's service side (§4.7's *Concealed institutions* (4) (b))." |
| VS1-08 | minor | stale | scope | 66 | Delegated decisions, D-25 (l. 16191–16192) | D-25 lists "the access edit whose closure rule generates the pieces it needs" among the kinds the base builds, "usable by hand", without round 1's staged-layer refusal (§7.3 item 9 (d), VD0-04) or its M4 schedule (J-A66.01) | Replace "and the access edit whose closure rule generates the pieces it needs (item 66; §7.3 item 9; J-A66.71);" with "and the access edit whose closure rule generates the pieces it needs (item 66; §7.3 item 9 (d); J-A66.71, J-A66.01: its underground pieces run once the underground layer's stages exist, its dry run until then refusing with F-EDIT naming the staged layer, its bars on the layer's hook fixture from M4);" |
| VS1-09 | minor | new-problem | scope | 33 | the summary l. 39 and l. 105–106 | gate (b): the summary says the bent cut is "Neighbourhood's own recipe restated in metres" — a sentence of the "the reference does X" form about a code-read mechanism — without the build the amendments file requires ("NG 1.2.2"; the bisector exists in two versions); l. 39 is round 1's text, l. 106 round 0's | In both places replace "Neighbourhood's own recipe restated in metres" with "Neighbourhood 1.2.2's own recipe restated in metres" |

**Confirmed from other verifiers, not re-filed:** V-MC1-09 (rendering): J-A20.82's index row l. 16921 still reads "by §2.8's marker". The fix is that row's and its Part A entry's, together with rendering's five places.

### Order for the repair round

1. VS1-01 (determinism's home) comes first. VS1-02 and VS1-03 follow it.
2. VS1-07 and VS1-08 go in one edit with J-A66.01's Part A entry.
3. VS1-04 with VS1-05 in one §13.2 / §13.8 / §16 pass, with J-A65.02's index row and Part A entry.
4. VS1-06 and VS1-09 are independent.

### CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed or read in place):
* every quotation and line number above;
* the word diff against the pre-repair archive;
* the r0 re-check;
* the index, Part A, J-id and T-id scans;
* the digit rule;
* the held-part, deferral and identifier scans;
* the §16 re-sums;
* the title and banner diff;
* the document-check counts;
* that the cross-part notes of the owners' repair reports were not applied (grep of the live text).

**PLAUSIBLE** (reasoning):
* that building the geology flag at M1 avoids a declared shift at M4 (VS1-04 (7));
* that the requested-mode ladder has no caller at M3a (VS1-07);
* every proposed wording.

Each is this seat's vetoable proposal for the repair round.
