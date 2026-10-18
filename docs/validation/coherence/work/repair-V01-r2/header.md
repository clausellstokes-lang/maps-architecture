# Repair round 2 — V01 (neighbourhoods, stage 2) — lane coherence/repair-V01-r2

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V01-r2; covered by the whole-design retrovalidation (J84).

# §8 total: 27.5–36.75 pw (was 27.25–36.25) — R2-06 (c); V01 §8.2's W10 gains item 122's disaster units (0.5–1 → 0.75–1.5 pw).
#
# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; one FILE line routes every block to docs/volumes/V01-neighbourhoods.md. Target: V01 sha256 1480993bec654309…
# (assemble-r1's install, live and unchanged at landing); base docs/ARCHITECTURE.md 137ecc0e4fe12c44… (no round-2
# assemble has run). Each block body is the live subsection with count-asserted substitutions (work/repair-V01-r2/gen.py
# over edits_a.py and edits_b.py: 85 substitutions, each applied exactly once); every untouched line is verbatim.
# Blocks: 28 REPLACE — ## 0; ### 1.1, 1.2, 1.3, 1b; ### 2.1, 2.2, 2.3, 2.4, 2.6, 2.7; ### 3.12, 3.14, 3.16; #### 3.17.3;
# ### 3.18; ### 4.5; #### 5.1.4; ### 5.3, 5.4; ## 6; ## 7; ### 8.1, 8.2, 8.3; ## 9; ## 11; ## 12. Ruling requests: 0.
# Binding rulings applied: adjudication-r2's R2-05, R2-06, R2-08, R2-10, R2-13, R2-26, R2-32, R2-34, R2-35, R2-36, R2-37
# (Part H · V01), with R2-09 kept (V01 registers no pin: T-V1-60 re-runs none) and R2-07 (V01's two owner-item lists are
# subsets, kept explicit and brought to item 122).
#
# PROGRESS
# - P0 brief read whole (13 issues; ROUND-2 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); adjudication-r2's TOC, Part H · V01
#   and R2-05, R2-06, R2-08, R2-10, R2-13, R2-26, R2-32, R2-34, R2-35, R2-36, R2-37 read whole: done
# - P1 issue sources, file g item 122 with (h)–(i), the canon's routings (J135, J138) and its adjudication-r2 entry; the base
#   homes cited (live and the landed round-2 model, pipeline and determinism blocks: ConditionOverlay, crises, DR44,
#   RosterTables.crisis and *Crisis looks*, CalamityRef, Terrain.wind, LandUse); V02's, V06's and V09's landed round-2 text;
#   V06 §2.4's calamity table; rendering's in-progress crisis.place tag; every V01 section concerned, whole: done
# - P2 count-asserted edit set over the live V01 (work/repair-V01-r2/edits_a.py 43 edits, edits_b.py 42 edits): done
# - P3 blocks generated, applied on a copy, checks, result saved, LANDED: done
#
# ISSUES → WHERE FIXED (13 routed ids, 12 distinct defects; 12 FIXED in text — 11 defects and 1 new design; 0 INVALID; 0 parked)
#  VAF-R0S-04 (FIX per R2-13). §2.3: `DistrictContext.raised[].kind: RaisedKind /* §2.7 */` and
#        `WayNamingContext.raised?: RaisedKind /* §2.7: a raised way's kind, for naming.way's guard (V01 §3.7.2) */`.
#  VAF-R0S-15 = VPC-R1-11 (ONE FIX, R2-13; VAF-R0S-15's text). §2.2: the `interface SquareQuotaRow { … }` line replaced by
#        "// SquareQuotaRow is §10.2's (the base table `squares.quota`, read by S7b (3) from M2b and by S9b); this volume
#        authors its default rows (V01 §3.5.2; V11 registry row 91)", the two comment lines above kept. §10.2's declaration
#        holds every field and comment V01's line held (band, haPer1000, kind factor) — nothing lost.
#  VAF-R1T-05 (FIX per R2-13). §2.4 opens "…are II.1's (item 539), with their fields' presence rules and the derived mode
#        (J-V1.3); this volume's unit runner, close-ups and SKY-F hand-over fill them (V01 §3.8–V01 §3.11)"; the restated
#        presence, mode and reason sentences deleted — each is II.1's (the request's comments, the mode comment, the result's
#        `districts` and `hoodPins` comments, `SeamReport.landingsReached`), checked line by line. The callers sentence's
#        stale "the three services of V01 §3.16" reads "the services of V01 §3.16 by the callers each names there".
#  VAF-R1T-07 (FIX per R2-32: Find lands at M5). T-V1-59 reads "From M5, Find's milestone (§16's M5 row), on the services and
#        on V09's app harness with V09's Find panel"; §8.2's W11: "T-V1-59 Find's, at M5 (Find's milestone)…"; `findAreas`
#        and `gapUnits` stay in W10 at M5.
#  G122-V01 (NEW DESIGN per R2-37 (4)–(5), R2-36). Item 122's V01 part, a look only:
#        * `disasterSource(doc, overlay, key)` / `disasterDistricts(doc, overlay, key)` (= `.units`) at §3.16 with
#          `DisasterUnit` and `DisasterSource` at §2.3 — whole districts (R2-37 (4); no per-building share); (1) the units:
#          ground part-0 districts the key admits, the hinterland pseudo-district never; at THORP–VILLAGE V07's units (its
#          ends, or an end-less thorp's toft groups) in the same shape, the same rule; (2) the overlay's calamity: the
#          committed `epoch` events' `CalamityRef` whose week lies in the overlay's weeks (latest; ties by severity band, id),
#          its pattern by V06 §2.4's calamity table (fire, flood, else scatter); (3) the targets matched to a district,
#          quarter or `HoodPlace` (R2-37 (4)), a withheld one skipped unreported, an unmatched one reported in the view
#          telemetry, the pattern filling the share; (4) one strike order (matched first, then fire downwind over district
#          adjacency / flood lowest from the water / scatter by keyed uniforms) on render-key draws `RH32('crisis.place', …,
#          H32(condition id))` — a preview's on H32('disaster'); (5) the share from the `disaster` row's `scale` at the rung
#          and severity (or `previewSeverity`), k ≥ 1 while the share > 0, never fewer than the matched units — a prefix,
#          so monotone in severity and the same in every week, view and export.
#        * `campLand(doc)` at §3.16 (R2-37 (5)): the hinterland's `commons` and fallow faces within `camp.reachM` (a new
#          `hood.constants` column, 600 m, §3.14) of the built edge and the open verges of the arterials within that reach;
#          never another kind, a gate's passage or an under-deck strip; keep-outs cut by §10.2 (d)'s placement; empty for a
#          standalone neighbourhood document; lands at M3b with item 122's base parts (§8.1; J-V1.105).
#        * Wiring and records: §0's plain words; §1.1 item 14; §1.2's g-item-122 hook row; §1.3's out-of-scope bullet; §1b's
#          two wiring rows, the dossier row and the dossier-change sentence; §2.7's derived list; §3.12 (no concern);
#          §3.18 (b) village row, (c) Show crises row, (e) two mechanism rows (no unit; one unit; the hinterland pseudo-
#          district; severity 0 and 1; a target naming no place; a withheld target; several crises; the aftermath arriving;
#          a standalone document; no common land — the verges; an island town), (f) three combinations; §5.1.4 (V02 §5.7's
#          damage over the `hatched` hatch); §5.3 (exports); §5.4 (6) (a disaster look's place in Find — the Find listing);
#          §6's crisis line (lazy per visible tile, an interaction, item 119 (d)); T-V1-60; §8.1 M3b, §8.2 W10/W11, §8.3;
#          J-V1.104, J-V1.105; §11's list; §12. Every verifier version is met: agree-fabric (units by targets then pattern;
#          camp land; test), agree-time (a draw-free service over committed state — named `disasterSource` per R2-37, not
#          `crisisUnits`; the camp land read by §10.2; its three edges; a T-V1 test with the hash unchanged), edges-world (the
#          district as unit; the share by severity; the pattern; the targets; camp land; the three edges), vol-V01-V02
#          (1)–(9) as listed above, its per-building "keyed share" overridden by R2-37 (4), its no-op-pin clause met by
#          T-V1-60 (f)'s "no call with no condition and no preview" — the `item122.crises` pin stays V12's (R2-09's list
#          names no V01 registration).
#  VAH-r1-12 (FIX per R2-10). §1.2's hook row split into "| §11.2 | `WhyAnswer` (`drifted`, `members`, `closure`), `WhyPull`
#        with V11's families |" and "| V10 §2.13 | `WhyProvider` |"; §4.5's "(`WhyPull.family`, §11.2)". R2-10's "every
#        citation of a moved type" also applied at §4.5's three field citations: "§11.2's `WhyAnswer.evaluated.drifted`",
#        "§11.2's `WhyAnswer.members`", "§11.2's `WhyAnswer.closure`" (they read "volume 10's").
#  VAP-r1-07 (FIX per R2-08). T-V1-29: "**item 119's one-time waits** (V01 §6; J-V1.103; takes T119-2 and T119-3's stage-2
#        clauses)".
#  VM-R1T-03 (FIX per R2-13). §2.6 reads "`HoodRecipe` (`Recipe.hood`, item 272) is §2.9's; its rules are V01 §3.10.1's",
#        the layers note kept. §2.9's declaration (model, landed round 2) carries every field and comment V01's held —
#        checked field by field. The pointers that named V01 §2.6 as HoodRecipe's home follow it: §1.2's §2.9 row, §1b's
#        `HoodRecipe` and `HoodRecipe.edges.slope` rows; §1b's `HoodKindRow` row now points at its declaration, V01 §2.2.
#  VM-R1T-04 (FIX). §2.1: "`FabricStrategyId` (a registered fabric: `bent-cut`, a `hood.templates` row key or V07's
#        `village-ways`), `BlockKind`, `SquareType`, `SeamRun` and `TypedBoundary` are declared in §2.5".
#  VV12-r1-03 (FIX per R2-34). §3.16's `catchmentOf` reads `walk`, `households`, `parish` (and `district`, `settlement`) as
#        V11 §2.3's `CoverageSpec` defines them, cited; it keeps only `neighbourhood` as `district` (J-V1.35), `underDistance`
#        for the disc's radius underground, a sky island one `walk` unit, and a district with no residential plot holding no
#        unit. Dependents: §5.4 (3)'s parish line and *Evaluation* (one pass per member over the 16 m raster per radius in
#        use; underground by `underDistance`; the island whole), §6's services and Show-gaps lines with their fallbacks,
#        J-V1.102's reason, T-V1-42 (one count of served: `gapUnits`' unserved plots equal V12 §3.6's `servedShare` plot by
#        plot on `walk`, `households`, `parish`, `district`) and T-V1-59 (b); also §2.3's signature comment and parts table
#        (no `catchmentOf('walk')` row reads ways now), §1b's row, §3.18's services row, §12's Find-lines clause.
#  VV12-r1-04 (FIX). §0: "making a standalone neighbourhood document".
#  VV1112-r1-05 (FIX per R2-10). §2.3: `step: LadderStep /* V11 §2.6 */`.
#
# RECEIVING ENDS WRITTEN THIS ROUND (R2-05)
#  * R2-26 (d): §3.14 drops `raised.stripMarginM` (its row keeps `raised.clearWidthM` and `raised.squareDeg`) and lists
#    `raisedWays.structure`'s `stripMarginM` among the cited cells; §3.17.3 (2) reads "`raisedWays.structure.stripMarginM`
#    (V11 §3.24.2) each side, §4.6 S8's one strip"; §12's PLAUSIBLE list drops the old key. No other V01 site named it.
#  * R2-35 / R2-08: T-V1-59's head "takes T120-2 and T120-4's town clauses", clause (a) "(T120-2's town clause)" with each
#    area chip's matches equal to §11.2's gazetteer listing, clause (c) "(T120-4's town clause)".
#  * R2-06 (c): the §8 total in the first lines above; J-V1.26 now cites V01 §8.2's total instead of restating the figure.
#  * R2-32: T-V1-59 at M5 (Find's milestone), W11 as written.
#  * X35 (V02 r2's hand-off to V01): `disasterDistricts` answers a preview (`overlay` null, keyed on H32('disaster')), and
#    the calamity's type V02 §5.7 (4) reads is `disasterSource(…).calamity.type`, its fire flavour `pattern === 'fire'`.
#
# HAND-OFFS for round 3's verifiers (R2-05 (3): cross-unit ends no ruling names; V01's side is written)
#  - V07: its THORP–VILLAGE units for `disasterSource` in V01 §2.3's `DisasterUnit` shape — its `VillageEnd`s, or an
#    end-less thorp's contiguous toft groups — each `id` an entity's whose render key keys the draws; `campLand` acts at the
#    village rungs too (V01 §3.18 (b)).
#  - V02: §5.7 (4)'s "the calamity's type V01's `disasterDistricts` reads for its pattern" is `disasterSource(…).calamity`'s
#    `type` / `.pattern` (V01 §2.3); `ExteriorDamage.look.kind` may read either.
#  - pipeline (§10.2 *Crisis looks* (d)): `affectedQuarter` takes `disasterSource(doc, overlay, key).matched[0]` for a
#    quarantine overlay (V01 §3.16); `neighbourhoods` passes `null` for a preview; `campLand(doc)`'s faces are V01 §3.16's.
#  - rendering: V01's draws use §8.1's render tag `crisis.place` (rendering's round-2 patch adds it); §8.2's `disaster` row
#    "by its pattern" reads `DisasterSource.pattern`; V01 §6's crisis line sits in §12.5's lazy per-tile crisis budget.
#  - V08: V01 associates a disaster overlay with its calamity by week among the committed `epoch` events' `CalamityRef`s
#    (V01 §3.16 (2)), the targets as the use ids V08 §3.6 resolves; V08's item-122 part ("the calamities' targets read for
#    the disaster look") should say the same.
#  - V09: the crisis card's **Show** and Find's `crises` **Go to** for a disaster look frame V01 §5.4 (6)'s shapes.
#  - scope: §16's M5 row and V01's price read V01 §8.2's 27.5–36.75 (R2-06 (b)); §16's M3b item-122 line absorbs V01's
#    `campLand` (≈ 0.25 pw, V01 §8.1); scope's take-over table needs no V01 row for item 122 (T-V1-60 takes no base bar).
#  - V11: `hood.constants` (registry row 62) gains the column `camp.reachM` (number · m, [100, 3 000], not calibratable).
#
# CHECKS (receipts in work/repair-V01-r2/)
#  - Dry run: apply-blocks.py on a copy of the live V01 — 28 found, 28 applied, 0 skipped; audit 0 not OK; headings 123 →
#    123; fences balanced (14 → 12 fence lines: §2.6's code block replaced by its citation); title block unchanged;
#    output == V01.new.md byte for byte (sha256 fb2d14965bdcae74…); the rationale untouched.
#  - refcheck.py over the added lines: 74 section references, 0 unresolved (V01 against V01.new.md; volumes against live
#    text plus their landed round-2 repair files; the base against live plus the landed round-2 base files); every T-V1 and
#    J-V1 id named defined exactly once. Forward citations, written this round by their owners: T120-2 and T120-4 (scope,
#    R2-35), §8.1's `crisis.place` and §12.5's crisis budget (rendering).
#  - doc_checks.py (PROVISIONAL — WARNING: reference corpus INCOMPLETE, missing captures, research/patreon, research/devlogs,
#    research/ftg-docs, research/external; not authoritative): C1 0, C2 0, C4 2 hits 0 unreviewed, S1 0 — as live; C3 391 →
#    401 hits (12 new generic-English collisions, e.g. "just outside the town it is", "the owner asked for a", "units in the
#    same shape", none an identifier, grammar, word list, palette or table); S2 3 → 13 unreviewed — the 10 new are all
#    `V02 §5.7`, a volume pointer S2 checks only against base headings, resolving in V02's landed round-2 §5.7.
#  - Deferral words, retired terms ("standalone neighbourhood" without "document"), phone clauses (item 126), adjudication
#    ids in design text: 0 in the new V01.
#
# WORDS (principle (9)'s shrink report). V01 79 160 → 83 025 words (wc -w; +3 865, +4.9 %). Removed: ≈ 320 words, all
#  RESTATEMENT (§2.4's II.1 rules, §2.6's HoodRecipe, §3.16's way-graph metric now V11 §2.3's, §6's walk and radii terms,
#  J-V1.26's price) — none from NARRATION, DUPLICATED MECHANISMS (the disaster rule is one rule over districts and V07's
#  units) or VERBOSE PROSE beyond those. Added: ≈ 4 190 words — ≈ 240 the issues' required clauses (T-V1-42's one count of
#  served, the T-V1-59 clauses, the §6 lines, J-V1.102's reason) and ≈ 3 950 item 122's new design, which the owner's rule
#  requires at build depth (records, rule, edges, budget, test, decisions). The unit grows: irreducible owner-item content,
#  not a defect (brief: "a unit shrinking by less than the band says what irreducible content holds it").
#
# ASSEMBLE NOTE: none — no text of V01's title block changes.
