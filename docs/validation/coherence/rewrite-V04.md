# Rewrite — design volume V04 (the underground)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V04; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V04`, 2026-09-29; cloud continuation 2026-10-02/03)
- P1 inputs gathered (canon unit V04: 275 STATE, 40 REFERENCE, 24 BCR blocks (46 requests), 12 conflicts, 59 f items, g 113, 6 wiring gaps, 4 elegance, 4 id rulings, 5 terms, 4 cohesion checks, 59 open findings, 31 hand-offs, 4 disagreements, 52 U + 62 T edges, 62 combinations; inventory 360 ids): done (scratch regenerated in the cloud continuation)
- P2 head, §0, §1: done (parts/00-head-s0-s1.md)
- P3 §1b: done (parts/01-s1b.md)
- P4 §2: done (parts/02-s2.md; two test citations corrected in the continuation)
- P5 §3.1–§3.4: done (parts/03-s3-1-4.md)
- P6 §3.5: done (parts/04-s3-5a.md, parts/05-s3-5b.md)
- P7 §3.6–§3.13 (edges §3.13): done (parts/06-s3-6-9.md, parts/07-s3-10-13.md)
- P8 §4–§6: done (parts/08-s4.md, parts/09-s5-6.md)
- P9 §7–§8: done (parts/10-s7.md, parts/11-s8.md)
- P10 §9–§13, integration notes: done (parts/12-s9.md, parts/13-s10-13.md)
- P11 assemble, verify ids, references, terms, sizes: done
- P12 report, result file, LANDED: done

Source: `docs/volumes/V04-underground.md` (4 168 lines). Output: `docs/validation/coherence/new/volumes/V04-underground.md`
(3 380 lines). Working parts: `docs/validation/coherence/work/rewrite-V04/parts/` (14 files, concatenated in order).

## 1 Sizes

| | words (whitespace split, the canon's count) | bytes |
|---|---|---|
| before | 83 966 | 530 576 |
| after | 74 333 | 459 837 |
| change | −9 633 (−11.5 %) | −13.3 % |

**Below the band (25–40 %), and why.** The gross cut is ≈ 17.2 k words (20.5 % of the source); ≈ 7.6 k words of required
new design were added at build depth, which the shrink goal yields to: the edge catalogue (V04 §3.13, 2 978 words, and
≈ 900 words of edge outcomes stated inline at their homes — principle (11)), g item 113's V04 parts (V04 §3.5.5 (b), §3.5.7
(g), `ExcavationRecord` and its lifecycle rows, ≈ 1 550 words), the clerk's providers (W-IF-01, ≈ 290), four new bars
(T-V4-76 – T-V4-79, ≈ 750), five new decisions (J-V4.122 – J-V4.126, 635) and the live hand-off table (V04 §13, 456). The
remaining text is irreducible build-depth content: the step algorithms of §3 (N0–N12, P1–P7, F0–F6, C0–C6, L1–L7, U-SYS's
systems), the rule tables and constants of §2.3, the wiring tables of §1b, the lifecycle table of §2.6, the 79 bars and the
126 reasoned decisions — none of it restated elsewhere in the set, none thinned.

**Share of the words removed, by source** (gross ≈ 17.2 k): NARRATION ≈ 10.4 k (60 %) — the 11 stacked banners and
revision paragraphs of the head, the ten reconciliation, integration and finalization records, the round histories of
§12 and §13, the critique and seam tags (C4-…, SL-…, ST-…, TR-…, TT-…, SLR…, SCC-…) and round labels in the body;
RESTATEMENT ≈ 6.4 k (37 %) — the 24 BCR blocks of §10 to one-line pointers (−6 324), and the body's restatements of base
and V11 facts cut to citations (§4.1's tail rules, II.7.3's capacity law, §4.2 S2's plot share, §4.11's rate, §8.4's
ambient, item 244's constants, V11 §3.23's values); DUPLICATED MECHANISMS ≈ 0.3 k (2 %) — the five fixed-key draw sites
reduced to their key parts, chance, moments and persistence (E-03), the superseded pricing rows (E-24); VERBOSE PROSE
≈ 0.1 k (1 %). No rule, case, value, bar, record field, lifecycle row, test, owner rule or reasoned decision was dropped.

## 2 What was applied

**Conflicts resolved (12).** MC-11 — `Outfall` cited at its base home §2.3 (V04 §2.1, §1b.1). V04-ICONF-1 — §2.6 drops
its own `AccessPoint.state` row and cites §7.4's row as item 555 amends it. V04-ICONF-2 — one pricing decision, J-V4.114
(28.25–39.25 pw; V4-U5 3–4.25 pw); J-V4.71, J-V4.94, J-V4.104 *superseded by J-V4.114*, their stale figures cut.
V04-ICONF-3 — V04 §5.5 governs: VTT portals only in a wall line, every vertical access a shaft light and a `plat` object;
T-V4-28 reworded; §10's BCR-V4-16 row points to item 452 under that rule. V04-ICONF-4 — BCR-V4-18's church-name clause
not carried; V04 §5.4 governs. V04-ICONF-5 — V04 §3.5.0a (5a) states the heights source (V11's `stepped-shrine` row), the
ST0 retry and skip, ST6's attempts, a `TierFailure` truncating to the tiers that lay (counted in `lay.truncated`) and
`standing` as the decay's reading only; IN-V04-2 dropped. V04-XCONF-1 — `showUnexcavated` out of `setLayer`'s targets
(V04 §1b.3). V04-XCONF-2 — V04 §5.1 cites §14's keymap precedence (storey with a plan open, else the band). V04-XCONF-3 —
T-V4-50 gains the elaboration-independence clause, closing V03's T-V3-23 (g) hand-off. V07-XCONF-2 — the span rule's
`country` reason (item 244; J-C4) read in V04 §3.5.4 (d), T-V4-62 gains the clause. CANON-C03 — §11's two questions
marked answered (J122). CANON-C04 — INDEX §7's V04 items (SLR6-02, SLR6-03, SCC-113) fixed.

**File f items cited as base text (59).** 205, 207, 208, 212, 229, 238, 239, 243, 244, 245, 247, 248, 249, 250, 252, 278,
281, 291, 306, 309, 319, 325, 330, 338, 355, 372, 386, 403, 404, 407, 413, 414, 423, 445, 452, 475, 484, 485, 505, 526,
548, 549, 551, 552, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 568, 573, 574 — every BCR citation in the
body rewritten to its item; §10 is a 46-row pointer table (BCR-V4-n → item). Items 207, 229, 245, 252, 291, 309, 565,
568 and 573 concern V04 as readers (cited where read); none is restated.

**g item 113 — V04's part, written at build depth (F-MISSING closed).** (c) the buried former settlement: V04 §3.5.5 (b)
(`BuriedFormer.lay`, its gate at TOWN, depth rule `riseCm`, elements, older-than-the-town rule, access, failure), its keys
(V04 §2.5), lifecycle row (V04 §2.6), wiring (V04 §1b.1, §1b.2, §1b.4, §1b.5 with DR36, DR38, DR39), drawing and label
(V04 §5.2, §5.4), export (`formerEpoch`), budget (V04 §6), bar T-V4-76, decision J-V4.123, parameters `former*` (V04 §2.3).
(e) lost access: the access-state set `Excavation` with `lost` and the stored memory `ExcavationRecord` (V04 §2.2, §2.6),
the reading's "open" defined as passability (V04 §3.5.7 (g); J-V4.122), the vacate-and-return rules (V04 §3.5.7 (g),
§3.10, §4.3), the drawing for the keys that knew it (V04 §5.1, §5.2), migration (V04 §4.6), bars T-V4-77, T-V4-59.
(d) sewers reopen: J-V4.29 and V04 §3.10, in the replay as live.

**Wiring gaps closed (6).** W-DOS-10c — V04 §1b.5's water row cites DR34 and the age, scars and magical history rows DR37
and DR30. W-IF-01 — the underground `WhyProvider`, the `underground` `WhySectionProvider` and `catacombOutcome` in V04
§1b.2 and §4.5 (implementer `@plat/under`; callers V10's why query and oracle, V09's why card and panels), J-V4.125,
T-V4-79. W-HOOK-02 — V04 §2.1 names the staged records this volume builds (§2.7, items 247–250, g item 113). V04-WGAP-2
— T-V4-77's clauses (fade-seal vacate and return; bricked-then-undo byte-identical; reload with the same reading).
V04-WGAP-3 — `W_RUIN_SOURCE_REMOVED` (and `W_BURIED_FORMER_SKIPPED`) in V04 §1b.1's list, item 338's row in §10, a
cross-part note to §5.4. V04-WGAP-4 — `gradeFaces(chamberId)`, a derived reading homed in V04 §3.5.4 (f) with its
producer, lifecycle row (V04 §2.6) and bar (T-V4-62); V03 §3.12 (9) cites it (cross-part note).

**Elegance rulings applied.**
* **E-03 (UNIFY — the fixed-key draw).** The pattern is §6.1's; V04 §3.5.1 (3) and §3.5.7 (a), (c), (d), (e) name only
  their key parts, chance, comparison moments and persistence; V04 §3.12 keeps the exception list. Equivalence: ☑ the
  catacomb source re-compared against CITY's chance when the rung rises (V04 §3.5.1 (3), §3.12); ☑ the overlap shaft's own
  key and chance row (V04 §3.5.7 (a): key (the pair), `overlapShaftChance`); ☑ the crypt join's own/other split
  (V04 §3.5.7 (c): `cryptJoin.own` / `.other`); ☑ the dig: a made access persists, one not made appears when the chance
  later rises (V04 §3.5.7 (d)); ☑ the public opening's candidate order (V04 §3.5.7 (e)); ☑ §3.12's exception list kept
  verbatim as the pattern's exceptions (V04 §3.12 *The fixed-key draws' exceptions*).
* **E-16 (UNIFY — `wash`, `edgeFade`, the role `glow`).** No occurrence of `tint`, `vignette` or the role `lights` in V04;
  nothing to rename. Equivalence: ☑ (vacuous) programs per mark and post operations per tile untouched; ☑ the
  painterly vignette not used here; ☑ the roles' distinct uses not read by V04.
* **E-24 (UNIFY — one mark on a superseded or amended decision).** V04 §9's intro states the form; marks: J-V4.6 *amended
  by J-V4.72*, J-V4.50 *amended by J-V4.126*, J-V4.53 *amended by J-V4.122*, J-V4.55 *amended by J-V4.95*, J-V4.71, J-V4.94,
  J-V4.104 *superseded by J-V4.114*. Equivalence: ☑ no row dropped (126 rows, J-V4.1 – J-V4.126 contiguous); ☑ the
  governing row keeps the reason (J-V4.114 carries every priced mechanism and its reason).
* **E-39 (KEEP APART — closure and decline states).** The access-state set (`unexcavated`, `accessible`, `lost`) is V04
  §2.2's own type, stated apart from the way decline ladder, a wall stretch's condition and a building's lifecycle, with
  the separating nuance (scope, values, transitions, writers) in its comment.

**Id rulings.** ID-BCR — V04's requests are `BCR-V4-n` (§10); every body citation is the applied item. ID-WX — no
volume-local id of another volume cited bare (`V01's W15`, `V02 X29`, `V07 FL-3`); IN-V04-n folded, ids kept only here.
ID-DR — DR26–DR40 only (DR30, DR31, DR32, DR34; DR36–DR39 for history). ID-DUPDEF — one definition per id (79 bars, 126
decisions, verified unique and resolving).

**Terms replaced.** G-firstmap (first paint → first map, 0 left); G-cite (V4 §n, V1-n.n, V6 §n … → Vnn §x.y everywhere,
self-references and continuation lists included; 0 left); G-standalone (hood document, hood line → standalone
neighbourhood document, the standalone line); G-DR (0 aliases); G-unexcavated (the view key `showUnexcavated`, never a
`LayerSpec` field). Also, one term per concept inside the volume: the build steps are `V4-U0` – `V4-U5` and `V4-U3b`
everywhere (V12's form), so `U1–U3` names only the owner's rules (II.7.3).

**Cohesion checks.** §8 agrees with INDEX §4 and scope's §16 row (M6-U after M5, beside it with a second pair; its V4-U3
distinctness and V4-U4 parent waiting on V01's W15; the crypt derivation in V4-U4; item 113's buried former settlement
inside the range; 28.25–39.25 pw); §11 marks both questions answered and the body reads the decisions; §1b names every
piece's producer and consumer; one marker line, no ledgers.

**Open findings closed (59).** VOL-V03-V04-RESTATEMENTS-005 (V04 §3.3 P2 cites §4.2 S2), -006 (P4 and §2.4 cite
II.7.3's capacity law and depth row), -007 (V04 §3.10 cites §4.11's persistence table), -008 (V04 §5.3 cites §8.4's
ambient), -009 (V04 §3.5.7 (c) cites `accessReachM` at II.7.6, (d) the basement floor at §2.6), -010 (V04 §3.5.0 and §6
cite `span.supportFoundationCm` and `span.vaultCap` at item 244), -011 (V04 §3.5.1 (2) cites II.7.6's ossuary law, item
560), -012, -013, V04-RESTATE-1, -3 (V11 §3.23 cited for every V11 cell; V04 §2.3 keeps the schema), -014 and
V04-RESTATE-2 (no base total restated; §16 and item 568 cited); V04-DUP-1 (V04 §3.10's one list, cited from V04 §1b.2,
§3.1, §3.11, §4.3); V04-ICONF-1 – -5, V04-XCONF-1 – -3 (above); V04-ELEG-1 (E-03); V04-EDGE-1 (V04 §3.7 L5's release;
J-V4.126; T-V4-78 (e10)); V04-EDGE-2 (V04 §3.5.7 (g); J-V4.122; T-V4-77 (e)); V04-WGAP-1 (DR37 named), -2 – -5 (above);
V04-MISSING-1 (g item 113 above); V04-MISSING-2 and V04-DEFER-1 (V04 §8, §11: the decided order); V04-TERM-1
(BCR-V4-n; V04 §n); V04-NARR-1 – -7 (one marker line; ledgers, round labels, tags and amendment narration cut;
the budget paragraph folded into *Edits* and *Epochs*; one hand-off table and one CONFIRMED/PLAUSIBLE list); V04-BREF-1
(every self-reference `V04 §`); SLR6-02 (V04 §6's switch-edit line; T-V4-31's clause); SLR6-03 (§12's hedge gone, the
CONFIRMED entry states V01 §3.15's first-reader re-derivation; J-V4.121 cites §7.4's `editTable` / `editPreset` row);
SCC-113 (V04 §8's table head and rows in V12's staged form; the span cells named `raisedWays.structure.span.*`, the base's
`span.*`, in J-V4.93, J-V4.118 and T-V4-62); V04:IN-V04-1 – -14 (folded at their homes: V04 §2.3, §3.5.1 (6), §3.5.0a
(5a), §3.5.4 (d), (e), (f), §3.5.7 (d), §3.5.0a (1), §4.5, §5.2 (7), §1b.1, §1b.3, §2.6, §5.1, §8 — the *Integration
notes* section lists each home).

**Hand-offs closed here (31).** V02 X12 (V04 §3.5.7 (d): the wing key; V02's footprint and basement floor); V06 X1 (V04
§3.5.1 (5), (6)); V06 X2 (V04 §3.5.7 *With a scope*; §3.10's lottery returning households as displaced, cause `void`; the
first sewers epoch); V06 X14 (V04 §3.5.4 (d), §3.10's wall drops, §3.5.5 (a)'s terraces); V06 X25 (V04 §3.5.0 *At an
epoch*, §3.1's maintenance mode, §3.4 F6, the flood's admission in V04 §2.3); V06 X29 (item 573 cited); V06 X33 (V04 §3.10
*Access closures*); V07 FL-2 (`'rung'`, `v.parish_church`, maintenance mode, ruin centre, wells); V07 FL-3 (the `country`
reason); V08 X3 (`CalamityRef.deaths` in V04 §3.5.1 (2), (5)); V08 X13 (the seven ruin-evidence kinds in V04 §3.5.0a (1);
DR31, DR32 in V04 §1b.5); V09 XV-V9-3 (the view key); XV-V9-4 (`under/wayIn`, the catacomb why path, the symbol by
`cause.rule`, item 361's chamber closure and catacomb ladder in V04 §4.1, item 372's dwelling closure); XV-V9-8 (AP6 priced
in V09's line, V04 §8); XV-V9-14 (`Chamber.span`; the hit stack's arch vault, V04 §5.1); XV-V9-27 (met); V10 CVR-V10-1,
CVR-V10-10 (V04 §4.5; T-V4-79); V11 X-V11-4 (V04 §2.3, `order`, `growthCapShare`), X-V11-10 (the span rule's era and
culture multipliers; `CultureRow.monument` V11's), X-V11-14 (`stage: 'U-FADE'`, V04 §3.10; the `U-*` readers, V04 §8),
X-V11-15 (row sets not calibratable; the content row ships them), X-V11-17 (d) (cell names); V12 X-V12-4 (the SOLO panel
spec; the `StatBarSpec`s), X-V12-11 (T-V4-69 on V12 §3.7.8), X-V12-13 (T-V4-54's deep void, T-V4-43/58's parameters,
T-V4-51's step script, T-V4-44 never reading tiers), X-V12-15 (no `BenchBarDef`, J-V4.117), X-V12-16 (the register at
each exit), X-V12-17 (the later corpus runs in V04 §8's due steps), X-V12-18 (staged entries), X-V12-19 (the span cells).

**Edges (52 UNDEFINED, 62 UNTESTED, 62 combinations).** Every one is defined, given its rung and its test: the four
class rules and the per-mechanism and combination tables of V04 §3.13 (bar T-V4-78 with clauses (a), (b), (c), (e1)–(e11),
(f1)–(f9), (g), (h), (i)), and inline at their homes — V04 §3.2 *At the rungs*, §3.3 (transient lifecycle, degenerate
inputs), §3.4 F0, F2, F5 and *At the rungs*, §3.5.0a (1)–(7), §3.5.1 (1), (4), (7), (10), §3.5.2, §3.5.3, §3.5.4 (a)–(f),
§3.6 C0, C2, C3, C5 and *Lifecycle*, §3.6a (1), §3.7 L5, L6 and *At the rungs*, §3.7a, §3.8, §3.9, §3.10, §4.1 *Edges of the
points forms*, §4.2, §4.3 *At the rungs*, §4.5, §4.6, §4.7, §5.1–§5.5. EI-V04-EDGE-1 and -2 as above. The owner's named
combinations that meet V04 (a settlement over a sealed void, a catacomb growing into a sewer, a dossier removing what an
edit pinned, an epoch undone after a save) are rows of V04 §3.13 (f) with their tests.

**Decisions added (vetoable).** J-V4.122 (item 113 (e)'s "open" as passability; `lost` and its memory), J-V4.123 (the
buried former settlement), J-V4.124 (a deck plot over water discharges into it), J-V4.125 (the providers), J-V4.126 (L5's
release when the dossier removes its institution). Two edge definitions decide new outcomes the source left undefined and
are recorded there: a lost cluster stays known as its `knownTo` says (remembered, drawn faded for those keys — g item 113
(e)'s "remembered as once known"), and a locked arch vault refuses the edit that would remove it (§7.1's refusal table).

## 3 Renumberings

| from | to | where |
|---|---|---|
| BCR-1 … BCR-46 (bare, V04's) | BCR-V4-1 … BCR-V4-46 | V04 §10 (ID-BCR; file f's "V04 BCR-n" resolves by the rule) |
| build steps U0, U1, U2, U3, U3b, U4, U5 | V4-U0 … V4-U5, V4-U3b | V04 §3, §6, §7, §8, §9, §11 (V12's ids; the bare U1–U3 kept for the owner's rules only) |
| `raised.vaultShare`, `raised.supportFoundationCm`, `raised.vaultCap` | `span.vaultShare`, `span.supportFoundationCm`, `span.vaultCap` (V11's `raisedWays.structure.span.*`) | V04 §1b.1, §3.5.0, §6, J-V4.93, T-V4-62, T-V4-65 (the base's names, item 244) |
| `Way.flowToward` | `wayFall(way)` | V04 §1b.1, J-V4.12 (the base's reading, item 208) |
| — (new) | T-V4-76 – T-V4-79; J-V4.122 – J-V4.126; V04 §3.13; V04 §3.5.4 (f); V04 §3.5.5 (a), (b) | — |

## 4 Cross-part notes (for the Assemble seat and the units named)

1. **determinism (§5.4; landed):** the `warnings` comment names seven underground codes; V04 §1b.1 lists twelve. Make it
   cite "the underground's codes (V04 §1b.1's list; item 338)" or add `W_RUIN_SOURCE_REMOVED`, `W_RUIN_MONUMENT_SKIPPED`,
   `W_ARCH_VAULT_NO_DOOR`, `W_TERMINAL_CISTERN_SKIPPED`, `W_BURIED_FORMER_SKIPPED` (V04-WGAP-3; g item 113).
2. **determinism (§7.3 item 9 (d); landed):** the dwelling declaration's closure reads "V04's excavation reading
   `unexcavated`"; with g item 113 (e) a `lost` cluster is equally unreachable — read "`unexcavated` or `lost`" (V04 §3.8,
   §4.1, §4.3 already do).
3. **rendering (§8.2's `unexcavated` program, §8.4's `showUnexcavated`; landed):** a lost cluster (g item 113 (e)) draws
   in the same dashed style for every key its `knownTo` admits, whatever `showUnexcavated` says; only an unexcavated one is
   `secret`-only (V04 §5.1, §5.2; J-V4.122).
4. **pipeline (II.6, `new/base/pipeline/09-ii6-staged-layers.md` l. 30; landed):** "the ways with `flowToward` (§2.4)"
   names a retired stored field; read "the ways' `wayFall` reading (§2.4, item 208)".
5. **scope (§14 keymap):** state PageUp and PageDown's one precedence — the storey with a building's plan open (V03
   §4.5), else the depth band with the underground layer active (V04-XCONF-2). §16's M6-U row and INDEX §4 already agree
   with V04 §8 (no change).
6. **V03:** §3.12 (9) cites `gradeFaces(chamberId)` (V04 §3.5.4 (f)) and drops "until volume 4 records its marks"; §13's
   hand-off on T-V3-23 (g) is closed by T-V4-50's elaboration-independence clause (V04-XCONF-3).
7. **V06:** the history replay calls `BuriedFormer.lay(doc, epoch, former)` inside the batch of the epoch whose age first
   passes `history.burialYears`, clears the former records in that batch, and writes the returned id into
   `HistoryRecord.buried`; the households a lost cluster or a collapsed floor vacates come back displaced (cause `void`);
   the four `under.*` participants register `stage: 'U-FADE'`.
8. **V07:** §1 (5) and §3.16 (1) cite the span rule's `country` reason (item 244; J-C4) and drop the fallback; IN-V07-2's
   reason corrected (V07-XCONF-2).
9. **V09:** the lost cluster's panel line ("once known"), shown for the keys its `knownTo` admits (V09-WGAP-1); the hit
   stack reaches an arch vault through its span whatever band is drawn (XV-V9-14, met by `Chamber.span`).
10. **V10:** the providers' rows include the excavation reading's `lost` and "once known", and the buried former
    settlement's story (its former epoch); T-V4-79 is the completeness bar against V10's owed table.
11. **V11:** the `buried` slice gains its former form (Old ⟨settlement⟩); the history rows' burial threshold with its
    factors is the rate V04 §3.5.5 (b)'s rise reads (`burialYears_eff`); registry row 59's `buried` params carry V04's
    `former*` keys (V04 §2.3).
12. **V12:** register T-V4-76 – T-V4-79 (fixtures: §13.2's item-113 fixtures; the provider completeness test); the
    `former*` cells ride the default line.
13. **V08:** the history reading feeding item 113 (DR36–DR39) is what `BuriedFormer.lay`'s caller passes; no V04 change
    needed on V08's side beyond its item-113 part.
14. **model (§2.7):** `HistoryRecord.buried` lists the system `BuriedFormer.lay` returns; the `Excavation` type and
    `ExcavationRecord` are V04's records (V04 §2.2), which §2.7 and II.7.6 cite (g item 113's wiring consequence).

## 5 Verification

* Ids: 79 bars T-V4-1 – T-V4-79, each defined once and every citation resolving; 126 decisions J-V4.1 – J-V4.126,
  contiguous, unique, every citation resolving.
* References: every `V04 §x.y` resolves to a heading or a bold subsection of the new text; continuation lists carry their
  volume prefix (`V01 §3.7.1, V01 §3.15`); bare `§` is the base's only.
* Retired terms and tags in the new text: first paint 0; `V4 §` 0; bare `BCR-n` 0; `DR-V` 0; `LayerSpec.showUnexcavated`
  0; C4-, SL-, SLR, ST-, TR-, TT-, SR, SCC- tags 0; round labels 0; deferral wording 0.
* `docs/validation/bench/doc_checks.py --doc docs/validation/coherence/new/volumes/V04-underground.md --heads
  docs/ARCHITECTURE.md`: C1 0, C2 0, C4 0, S1 0; C3 175 three-gram runs (common English phrases, digit runs of section
  numbers, the marker line), S2 99 pointers unresolved against the current base headings, each another volume's section
  or a base section the coherence pass's new base holds. **Provisional:** the reference corpus is absent in this cloud
  checkout (captures, research/patreon, research/devlogs, research/ftg-docs, research/external), so the clean-room result
  is NOT authoritative; re-run on the machine that holds the corpus before any freeze.

## 6 Mapping table — every inventory id of V04 → where it now lives

| inventory id | kind | was | now | disposition |
|---|---|---|---|---|
| V04-0001 | summary | §0 | V04 §0 | kept |
| V04-0002 | summary | §0 | V04 §0 | kept |
| V04-0003 | summary | §0 | V04 §0 | kept |
| V04-0004 | summary | §0 | V04 §0 | kept |
| V04-0005 | scope | §1.1 | V04 §1.1 | kept |
| V04-0006 | rule | §1.1 | V04 §1.1 | kept |
| V04-0007 | hook | §1.2 | V04 §1.2 | kept (hook row) |
| V04-0008 | hook | §1.2 | V04 §1.2 | kept (hook row) |
| V04-0009 | hook | §1.2 | V04 §1.2 | kept (hook row) |
| V04-0010 | term | §1.2 | V04 §1.2 | kept (term) |
| V04-0011 | rule | §1.2 | V04 §1.2 | kept |
| V04-0012 | term | §1.2 | V04 §1.2 | kept (term) |
| V04-0013 | scope | §1.3 | V04 §1.3 | kept (hook row) |
| V04-0014 | scope | §1.3 | V04 §1.3 | kept (hook row) |
| V04-0015 | rule | §1b | V04 §1b | kept |
| V04-0016 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §2.3 (the restated text cut) |
| V04-0017 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §2.4 (the restated text cut) |
| V04-0018 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §2.7 (the restated text cut) |
| V04-0019 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §2.5 (the restated text cut) |
| V04-0020 | table | §1b.1 | V04 §1b.1 | kept |
| V04-0021 | table | §1b.1 | V04 §1b.1 | REFERENCE: cites §4.7 (the restated text cut) |
| V04-0022 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §4.5 (the restated text cut) |
| V04-0023 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §4.1 (the restated text cut) |
| V04-0024 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §7.8 (the restated text cut) |
| V04-0025 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §8.2 (the restated text cut) |
| V04-0026 | table | §1b.1 | V04 §1b.1 | REFERENCE: cites §7.7 (the restated text cut) |
| V04-0027 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §5.2 (the restated text cut) |
| V04-0028 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §2.7 (the restated text cut) |
| V04-0029 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §2.7 (the restated text cut) |
| V04-0030 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites II.7.4 (the restated text cut) |
| V04-0031 | interface | §1b.1 | V04 §1b.1 | kept |
| V04-0032 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §2.7 (the restated text cut) |
| V04-0033 | record | §1b.1 | V04 §1b.1 | kept |
| V04-0034 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §7.8 (the restated text cut) |
| V04-0035 | interface | §1b.1 | V04 §1b.1 | kept |
| V04-0036 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §4.7 (the restated text cut) |
| V04-0037 | record | §1b.1 | V04 §1b.1 | REFERENCE: cites §2.7 (the restated text cut) |
| V04-0038 | interface | §1b.1 | V04 §1b.1 | kept |
| V04-0039 | record | §1b.1 | V04 §1b.1 | kept |
| V04-0040 | interface | §1b.2 | V04 §1b.2 | kept |
| V04-0041 | interface | §1b.2 | V04 §1b.2 | kept |
| V04-0042 | interface | §1b.2 | V04 §1b.2 | kept |
| V04-0043 | interface | §1b.2 | V04 §1b.2 | kept |
| V04-0044 | interface | §1b.2 | V04 §1b.2 | REFERENCE: cites V01 §3.7.1 (the restated text cut) |
| V04-0045 | interface | §1b.2 | V04 §1b.2 | kept |
| V04-0046 | interface | §1b.2 | V04 §1b.2 | kept |
| V04-0047 | interface | §1b.2 | V04 §1b.2 | kept |
| V04-0048 | rule | §1b.2 | V04 §1b.2 | kept |
| V04-0049 | edit | §1b.3 | V04 §1b.3 | kept |
| V04-0050 | rule | §1b.4 | V04 §1b.4 | kept |
| V04-0051 | rule | §1b.5 | V04 §1b.5 | REFERENCE: cites §7.7 (the restated text cut) |
| V04-0052 | rule | §1b.5 | V04 §1b.5 | REFERENCE: cites §7.7 (the restated text cut) |
| V04-0053 | rule | §2.1 | V04 §2.1 | REFERENCE: cites II.7.4 (the restated text cut) |
| V04-0054 | record | §2.2 | V04 §2.2 | REFERENCE: cites §2.3 (the restated text cut) |
| V04-0055 | record | §2.2 | V04 §2.2 | REFERENCE: cites §2.4 (the restated text cut) |
| V04-0056 | record | §2.2 | V04 §2.2 | REFERENCE: cites §2.7 (the restated text cut) |
| V04-0057 | record | §2.2 | V04 §2.2 | REFERENCE: cites §2.7 (the restated text cut) |
| V04-0058 | record | §2.2 | V04 §2.2 | REFERENCE: cites §2.7 (the restated text cut) |
| V04-0059 | record | §2.2 | V04 §2.2 | REFERENCE: cites §2.7 (the restated text cut) |
| V04-0060 | record | §2.2 | V04 §2.2 | REFERENCE: cites II.7.4 (the restated text cut) |
| V04-0061 | record | §2.2 | V04 §2.2 | REFERENCE: cites §2.7 (the restated text cut) |
| V04-0062 | record | §2.2 | V04 §2.2 | kept |
| V04-0063 | record | §2.2 | V04 §2.2 | kept |
| V04-0064 | rule | §2.3 | V04 §2.3 | kept |
| V04-0065 | table | §2.3 | V04 §2.3 | kept |
| V04-0066 | table | §2.3 | V04 §2.3 | kept |
| V04-0067 | table | §2.3 | V04 §2.3 | kept |
| V04-0068 | table | §2.3 | V04 §2.3 | kept |
| V04-0069 | table | §2.3 | V04 §2.3 | kept |
| V04-0070 | table | §2.3 | V04 §2.3 | kept |
| V04-0071 | table | §2.3 | V04 §2.3 | kept |
| V04-0072 | table | §2.3a | V04 §2.3a | REFERENCE: cites §7.7 (the restated text cut) |
| V04-0073 | table | §2.3a | V04 §2.3a | REFERENCE: cites §7.7 (the restated text cut) |
| V04-0074 | record | §2.4 | V04 §2.4 | kept |
| V04-0075 | table | §2.5 | V04 §2.5 | REFERENCE: cites §6.3 (the restated text cut) |
| V04-0076 | lifecycle | §2.6 | V04 §2.6 | kept |
| V04-0077 | lifecycle | §2.6 | V04 §2.6 | kept |
| V04-0078 | lifecycle | §2.6 | V04 §2.6 | kept |
| V04-0079 | rule | §3.1 | V04 §3.1 | kept |
| V04-0080 | table | §3.1 | V04 §3.1 | kept |
| V04-0081 | rule | §3.1 | V04 §3.1 | kept |
| V04-0082 | rule | §3.1 | V04 §3.1 | kept |
| V04-0083 | rule | §3.1 | V04 §3.1 | kept |
| V04-0084 | rule | §3.2 | V04 §3.2 | kept |
| V04-0085 | rule | §3.2 | V04 §3.2 | kept |
| V04-0086 | rule | §3.2 | V04 §3.2 | kept |
| V04-0087 | mechanism | §3.2 | V04 §3.2 | kept |
| V04-0088 | rule | §3.2 | V04 §3.2 | kept |
| V04-0089 | rule | §3.2 | V04 §3.2 | kept |
| V04-0090 | rule | §3.2 | V04 §3.2 | kept |
| V04-0091 | mechanism | §3.2 | V04 §3.2 | kept |
| V04-0092 | rule | §3.2 | V04 §3.2 | kept |
| V04-0093 | rule | §3.2 | V04 §3.2 | kept |
| V04-0094 | rule | §3.2 | V04 §3.2 | kept |
| V04-0095 | rule | §3.2 | V04 §3.2 | kept |
| V04-0096 | rule | §3.2 | V04 §3.2 | kept |
| V04-0097 | mechanism | §3.3 | V04 §3.3 | kept |
| V04-0098 | mechanism | §3.3 | V04 §3.3 | kept |
| V04-0099 | rule | §3.4 | V04 §3.4 | kept |
| V04-0100 | rule | §3.4 | V04 §3.4 | kept |
| V04-0101 | rule | §3.4 | V04 §3.4 | kept |
| V04-0102 | fallback | §3.4 | V04 §3.4 | kept |
| V04-0103 | table | §3.5.0 | V04 §3.5.0 | kept |
| V04-0104 | rule | §3.5.0 | V04 §3.5.0 | kept |
| V04-0105 | rule | §3.5.0 | V04 §3.5.0 | kept |
| V04-0106 | mechanism | §3.5.0 | V04 §3.5.0 | kept |
| V04-0107 | mechanism | §3.5.0 | V04 §3.5.0 | kept |
| V04-0108 | table | §3.5.0 | V04 §3.5.0 | kept |
| V04-0109 | rule | §3.5.0a | V04 §3.5.0a | kept |
| V04-0110 | rule | §3.5.0a | V04 §3.5.0a | kept |
| V04-0111 | rule | §3.5.0a | V04 §3.5.0a | kept |
| V04-0112 | rule | §3.5.0a | V04 §3.5.0a | kept |
| V04-0113 | rule | §3.5.0a | V04 §3.5.0a | kept |
| V04-0114 | rule | §3.5.0a | V04 §3.5.0a | kept |
| V04-0115 | rule | §3.5.0a | V04 §3.5.0a | kept |
| V04-0116 | rule | §3.5.0a | V04 §3.5.0a | kept |
| V04-0117 | rule | §3.5.1 | V04 §3.5.1 | kept |
| V04-0118 | rule | §3.5.1 | V04 §3.5.1 | kept |
| V04-0119 | rule | §3.5.1 | V04 §3.5.1 | kept |
| V04-0120 | rule | §3.5.1 | V04 §3.5.1 | kept |
| V04-0121 | rule | §3.5.1 | V04 §3.5.1 | kept |
| V04-0122 | rule | §3.5.1 | V04 §3.5.1 | kept |
| V04-0123 | rule | §3.5.1 | V04 §3.5.1 | kept |
| V04-0124 | rule | §3.5.1 | V04 §3.5.1 | kept |
| V04-0125 | rule | §3.5.1 | V04 §3.5.1 | kept |
| V04-0126 | rule | §3.5.2 | V04 §3.5.2 | kept |
| V04-0127 | rule | §3.5.3 | V04 §3.5.3 | kept |
| V04-0128 | rule | §3.5.3 | V04 §3.5.3 | kept |
| V04-0129 | rule | §3.5.3 | V04 §3.5.3 | kept |
| V04-0130 | rule | §3.5.4 | V04 §3.5.4 | kept |
| V04-0131 | mechanism | §3.5.4 | V04 §3.5.4 | kept |
| V04-0132 | rule | §3.5.4 | V04 §3.5.4 | kept |
| V04-0133 | rule | §3.5.5 | V04 §3.5.5 | kept |
| V04-0134 | rule | §3.5.6 | V04 §3.5.6 | kept |
| V04-0135 | rule | §3.5.7 | V04 §3.5.7 | kept |
| V04-0136 | rule | §3.5.7 | V04 §3.5.7 | kept |
| V04-0137 | rule | §3.5.7 | V04 §3.5.7 | kept |
| V04-0138 | rule | §3.5.7 | V04 §3.5.7 | kept |
| V04-0139 | rule | §3.5.7 | V04 §3.5.7 | kept |
| V04-0140 | rule | §3.5.7 | V04 §3.5.7 | kept |
| V04-0141 | mechanism | §3.5.7 | V04 §3.5.7 | kept |
| V04-0142 | rule | §3.5.7 | V04 §3.5.7 | kept |
| V04-0143 | rule | §3.6 | V04 §3.6 | kept |
| V04-0144 | rule | §3.6 | V04 §3.6 | kept |
| V04-0145 | rule | §3.6 | V04 §3.6 | kept |
| V04-0146 | rule | §3.6 | V04 §3.6 | kept |
| V04-0147 | rule | §3.6 | V04 §3.6 | kept |
| V04-0148 | rule | §3.6a | V04 §3.6a | kept |
| V04-0149 | rule | §3.7 | V04 §3.7 | kept |
| V04-0150 | rule | §3.7 | V04 §3.7 | kept |
| V04-0151 | rule | §3.7 | V04 §3.7 | kept |
| V04-0152 | rule | §3.7a | V04 §3.7a | kept |
| V04-0153 | rule | §3.8 | V04 §3.8 | kept |
| V04-0154 | rule | §3.8 | V04 §3.8 | kept |
| V04-0155 | rule | §3.8 | V04 §3.8 | kept |
| V04-0156 | table | §3.9 | V04 §3.9 | kept |
| V04-0157 | rule | §3.9 | V04 §3.9 | kept |
| V04-0158 | rule | §3.10 | V04 §3.10 | kept |
| V04-0159 | rule | §3.10 | V04 §3.10 | kept |
| V04-0160 | rule | §3.10 | V04 §3.10 | kept |
| V04-0161 | rule | §3.10 | V04 §3.10 | kept |
| V04-0162 | rule | §3.10 | V04 §3.10 | kept |
| V04-0163 | rule | §3.10 | V04 §3.10 | kept |
| V04-0164 | rule | §3.10 | V04 §3.10 | kept |
| V04-0165 | table | §3.11 | V04 §3.11 | kept |
| V04-0166 | rule | §3.12 | V04 §3.12 | kept |
| V04-0167 | edit | §4.1 | V04 §4.1 | kept |
| V04-0168 | rule | §4.1 | V04 §4.1 | kept |
| V04-0169 | edit | §4.2 | V04 §4.2 | kept |
| V04-0170 | table | §4.3 | V04 §4.3 | kept |
| V04-0171 | rule | §4.4 | V04 §4.4 | kept |
| V04-0172 | interface | §4.5 | V04 §4.5 | kept |
| V04-0173 | lifecycle | §4.6 | V04 §4.6 | kept |
| V04-0174 | rule | §4.7 | V04 §4.7 | kept |
| V04-0175 | render | §5.1 | V04 §5.1 | REFERENCE: cites §8.4 (the restated text cut) |
| V04-0176 | render | §5.2 | V04 §5.2 | REFERENCE: cites §8.1 (the restated text cut) |
| V04-0177 | render | §5.2 | V04 §5.2 | REFERENCE: cites §8.2 (the restated text cut) |
| V04-0178 | render | §5.3 | V04 §5.3 | REFERENCE: cites §8.4 (the restated text cut) |
| V04-0179 | render | §5.4 | V04 §5.4 | REFERENCE: cites §9 (the restated text cut) |
| V04-0180 | export | §5.5 | V04 §5.5 | REFERENCE: cites §11.1 (the restated text cut) |
| V04-0181 | budget | §6 | V04 §6 | kept |
| V04-0182 | budget | §6 | V04 §6 | kept |
| V04-0183 | test | §7 | V04 §7 | kept |
| V04-0184 | test | §7 | V04 §7 | kept |
| V04-0185 | test | §7 | V04 §7 | kept |
| V04-0186 | test | §7 | V04 §7 | kept |
| V04-0187 | test | §7 | V04 §7 | kept |
| V04-0188 | test | §7 | V04 §7 | kept |
| V04-0189 | test | §7 | V04 §7 | kept |
| V04-0190 | test | §7 | V04 §7 | kept |
| V04-0191 | test | §7 | V04 §7 | kept |
| V04-0192 | test | §7 | V04 §7 | kept |
| V04-0193 | test | §7 | V04 §7 | kept |
| V04-0194 | decision | §8 | V04 §8 | REFERENCE: cites §16 (the restated text cut) |
| V04-0195 | table | §8 | V04 §8 | kept |
| V04-0196 | rule | §8 | V04 §8 | kept |
| V04-0197 | rule | §8 | V04 §8 | kept |
| V04-0198 | decision | §9 | V04 §9, J-V4.1 | kept, final form |
| V04-0199 | decision | §9 | V04 §9, J-V4.2 | kept, final form |
| V04-0200 | decision | §9 | V04 §9, J-V4.3 | kept, final form |
| V04-0201 | decision | §9 | V04 §9, J-V4.4 | kept, final form |
| V04-0202 | decision | §9 | V04 §9, J-V4.5 | kept, final form |
| V04-0203 | decision | §9 | V04 §9, J-V4.6 | kept, final form; *amended by J-V4.72* |
| V04-0204 | decision | §9 | V04 §9, J-V4.7 | kept, final form |
| V04-0205 | decision | §9 | V04 §9, J-V4.8 | kept, final form |
| V04-0206 | decision | §9 | V04 §9, J-V4.9 | kept, final form |
| V04-0207 | decision | §9 | V04 §9, J-V4.10 | kept, final form |
| V04-0208 | decision | §9 | V04 §9, J-V4.11 | kept, final form |
| V04-0209 | decision | §9 | V04 §9, J-V4.12 | kept, final form |
| V04-0210 | decision | §9 | V04 §9, J-V4.13 | kept, final form |
| V04-0211 | decision | §9 | V04 §9, J-V4.14 | kept, final form |
| V04-0212 | decision | §9 | V04 §9, J-V4.15 | kept, final form |
| V04-0213 | decision | §9 | V04 §9, J-V4.16 | kept, final form |
| V04-0214 | decision | §9 | V04 §9, J-V4.17 | kept, final form |
| V04-0215 | decision | §9 | V04 §9, J-V4.18 | kept, final form |
| V04-0216 | decision | §9 | V04 §9, J-V4.19 | kept, final form |
| V04-0217 | decision | §9 | V04 §9, J-V4.20 | kept, final form |
| V04-0218 | decision | §9 | V04 §9, J-V4.21 | kept, final form |
| V04-0219 | decision | §9 | V04 §9, J-V4.22 | kept, final form |
| V04-0220 | decision | §9 | V04 §9, J-V4.23 | kept, final form |
| V04-0221 | decision | §9 | V04 §9, J-V4.24 | kept, final form |
| V04-0222 | decision | §9 | V04 §9, J-V4.25 | kept, final form |
| V04-0223 | decision | §9 | V04 §9, J-V4.26 | kept, final form |
| V04-0224 | decision | §9 | V04 §9, J-V4.27 | kept, final form |
| V04-0225 | decision | §9 | V04 §9, J-V4.28 | kept, final form |
| V04-0226 | decision | §9 | V04 §9, J-V4.29 | kept, final form |
| V04-0227 | decision | §9 | V04 §9, J-V4.30 | kept, final form |
| V04-0228 | decision | §9 | V04 §9, J-V4.31 | kept, final form |
| V04-0229 | decision | §9 | V04 §9, J-V4.32 | kept, final form |
| V04-0230 | decision | §9 | V04 §9, J-V4.33 | kept, final form |
| V04-0231 | decision | §9 | V04 §9, J-V4.34 | kept, final form |
| V04-0232 | decision | §9 | V04 §9, J-V4.35 | kept, final form |
| V04-0233 | decision | §9 | V04 §9, J-V4.36 | kept, final form |
| V04-0234 | decision | §9 | V04 §9, J-V4.37 | kept, final form |
| V04-0235 | decision | §9 | V04 §9, J-V4.38 | kept, final form |
| V04-0236 | decision | §9 | V04 §9, J-V4.39 | kept, final form |
| V04-0237 | decision | §9 | V04 §9, J-V4.40 | kept, final form |
| V04-0238 | decision | §9 | V04 §9, J-V4.41 | kept, final form |
| V04-0239 | decision | §9 | V04 §9, J-V4.42 | kept, final form |
| V04-0240 | decision | §9 | V04 §9, J-V4.43 | kept, final form |
| V04-0241 | decision | §9 | V04 §9, J-V4.44 | kept, final form |
| V04-0242 | decision | §9 | V04 §9, J-V4.45 | kept, final form |
| V04-0243 | decision | §9 | V04 §9, J-V4.46 | kept, final form |
| V04-0244 | decision | §9 | V04 §9, J-V4.47 | kept, final form |
| V04-0245 | decision | §9 | V04 §9, J-V4.48 | kept, final form |
| V04-0246 | decision | §9 | V04 §9, J-V4.49 | kept, final form |
| V04-0247 | decision | §9 | V04 §9, J-V4.50 | kept, final form; *amended by J-V4.126* |
| V04-0248 | decision | §9 | V04 §9, J-V4.51 | kept, final form |
| V04-0249 | decision | §9 | V04 §9, J-V4.52 | kept, final form |
| V04-0250 | decision | §9 | V04 §9, J-V4.53 | kept, final form; *amended by J-V4.122* |
| V04-0251 | decision | §9 | V04 §9, J-V4.54 | kept, final form |
| V04-0252 | decision | §9 | V04 §9, J-V4.55 | kept, final form; *amended by J-V4.95* |
| V04-0253 | decision | §9 | V04 §9, J-V4.56 | kept, final form |
| V04-0254 | decision | §9 | V04 §9, J-V4.57 | kept, final form |
| V04-0255 | decision | §9 | V04 §9, J-V4.58 | kept, final form |
| V04-0256 | decision | §9 | V04 §9, J-V4.59 | kept, final form |
| V04-0257 | decision | §9 | V04 §9, J-V4.60 | kept, final form |
| V04-0258 | decision | §9 | V04 §9, J-V4.61 | kept, final form |
| V04-0259 | decision | §9 | V04 §9, J-V4.62 | kept, final form |
| V04-0260 | decision | §9 | V04 §9, J-V4.63 | kept, final form |
| V04-0261 | decision | §9 | V04 §9, J-V4.64 | kept, final form |
| V04-0262 | decision | §9 | V04 §9, J-V4.65 | kept, final form |
| V04-0263 | decision | §9 | V04 §9, J-V4.66 | kept, final form |
| V04-0264 | decision | §9 | V04 §9, J-V4.67 | kept, final form |
| V04-0265 | decision | §9 | V04 §9, J-V4.68 | kept, final form |
| V04-0266 | decision | §9 | V04 §9, J-V4.69 | kept, final form |
| V04-0267 | decision | §9 | V04 §9, J-V4.70 | kept, final form |
| V04-0268 | decision | §9 | V04 §9, J-V4.71 | kept, final form; *superseded by J-V4.114* |
| V04-0269 | decision | §9 | V04 §9, J-V4.72 | kept, final form |
| V04-0270 | decision | §9 | V04 §9, J-V4.73 | kept, final form |
| V04-0271 | decision | §9 | V04 §9, J-V4.74 | kept, final form |
| V04-0272 | decision | §9 | V04 §9, J-V4.75 | kept, final form |
| V04-0273 | decision | §9 | V04 §9, J-V4.76 | kept, final form |
| V04-0274 | decision | §9 | V04 §9, J-V4.77 | kept, final form |
| V04-0275 | decision | §9 | V04 §9, J-V4.78 | kept, final form |
| V04-0276 | decision | §9 | V04 §9, J-V4.79 | kept, final form |
| V04-0277 | decision | §9 | V04 §9, J-V4.80 | kept, final form |
| V04-0278 | decision | §9 | V04 §9, J-V4.81 | kept, final form |
| V04-0279 | decision | §9 | V04 §9, J-V4.82 | kept, final form |
| V04-0280 | decision | §9 | V04 §9, J-V4.83 | kept, final form |
| V04-0281 | decision | §9 | V04 §9, J-V4.84 | kept, final form |
| V04-0282 | decision | §9 | V04 §9, J-V4.85 | kept, final form |
| V04-0283 | decision | §9 | V04 §9, J-V4.86 | kept, final form |
| V04-0284 | decision | §9 | V04 §9, J-V4.87 | kept, final form |
| V04-0285 | decision | §9 | V04 §9, J-V4.88 | kept, final form |
| V04-0286 | decision | §9 | V04 §9, J-V4.89 | kept, final form |
| V04-0287 | decision | §9 | V04 §9, J-V4.90 | kept, final form |
| V04-0288 | decision | §9 | V04 §9, J-V4.91 | kept, final form |
| V04-0289 | decision | §9 | V04 §9, J-V4.92 | kept, final form |
| V04-0290 | decision | §9 | V04 §9, J-V4.93 | kept, final form |
| V04-0291 | decision | §9 | V04 §9, J-V4.94 | kept, final form; *superseded by J-V4.114* |
| V04-0292 | decision | §9 | V04 §9, J-V4.95 | kept, final form |
| V04-0293 | decision | §9 | V04 §9, J-V4.96 | kept, final form |
| V04-0294 | decision | §9 | V04 §9, J-V4.97 | kept, final form |
| V04-0295 | decision | §9 | V04 §9, J-V4.98 | kept, final form |
| V04-0296 | decision | §9 | V04 §9, J-V4.99 | kept, final form |
| V04-0297 | decision | §9 | V04 §9, J-V4.100 | kept, final form |
| V04-0298 | decision | §9 | V04 §9, J-V4.101 | kept, final form |
| V04-0299 | decision | §9 | V04 §9, J-V4.102 | kept, final form |
| V04-0300 | decision | §9 | V04 §9, J-V4.103 | kept, final form |
| V04-0301 | decision | §9 | V04 §9, J-V4.104 | kept, final form; *superseded by J-V4.114* |
| V04-0302 | decision | §9 | V04 §9, J-V4.105 | kept, final form |
| V04-0303 | decision | §9 | V04 §9, J-V4.106 | kept, final form |
| V04-0304 | decision | §9 | V04 §9, J-V4.107 | kept, final form |
| V04-0305 | decision | §9 | V04 §9, J-V4.108 | kept, final form |
| V04-0306 | decision | §9 | V04 §9, J-V4.109 | kept, final form |
| V04-0307 | decision | §9 | V04 §9, J-V4.110 | kept, final form |
| V04-0308 | decision | §9 | V04 §9, J-V4.111 | kept, final form |
| V04-0309 | decision | §9 | V04 §9, J-V4.112 | kept, final form |
| V04-0310 | decision | §9 | V04 §9, J-V4.113 | kept, final form |
| V04-0311 | decision | §9 | V04 §9, J-V4.114 | kept, final form; the one pricing decision |
| V04-0312 | decision | §9 | V04 §9, J-V4.115 | kept, final form |
| V04-0313 | decision | §9 | V04 §9, J-V4.116 | kept, final form |
| V04-0314 | decision | §9 | V04 §9, J-V4.117 | kept, final form |
| V04-0315 | decision | §9 | V04 §9, J-V4.118 | kept, final form |
| V04-0316 | decision | §9 | V04 §9, J-V4.119 | kept, final form |
| V04-0317 | decision | §9 | V04 §9, J-V4.120 | kept, final form |
| V04-0318 | decision | §9 | V04 §9, J-V4.121 | kept, final form |
| V04-0319 | rule | §10 | V04 §10 | kept |
| V04-0320 | bcr | §10 | V04 §10, row BCR-V4-1 | BCR block → pointer to item 205 |
| V04-0321 | bcr | §10 | V04 §10, row BCR-V4-2 | BCR block → pointer to item 208 |
| V04-0322 | bcr | §10 | V04 §10, row BCR-V4-3 | BCR block → pointer to item 247 |
| V04-0323 | bcr | §10 | V04 §10, row BCR-V4-4 | BCR block → pointer to item 212 |
| V04-0324 | bcr | §10 | V04 §10, row BCR-V4-5 | BCR block → pointer to item 325 |
| V04-0325 | bcr | §10 | V04 §10, row BCR-V4-6 | BCR block → pointer to item 319 |
| V04-0326 | bcr | §10 | V04 §10, row BCR-V4-7 | BCR block → pointer to item 330 |
| V04-0327 | bcr | §10 | V04 §10, row BCR-V4-8 | BCR block → pointer to item 355 |
| V04-0328 | bcr | §10 | V04 §10, row BCR-V4-9 | BCR block → pointer to item 403 |
| V04-0329 | bcr | §10 | V04 §10, row BCR-V4-10 | BCR block → pointer to item 413 |
| V04-0330 | bcr | §10 | V04 §10, row BCR-V4-11 | BCR block → pointer to item 475 |
| V04-0331 | bcr | §10 | V04 §10, row BCR-V4-12 | BCR block → pointer to item 505 |
| V04-0332 | bcr | §10 | V04 §10, row BCR-V4-13 | BCR block → pointer to item 526 |
| V04-0333 | bcr | §10 | V04 §10, row BCR-V4-14 | BCR block → pointer to item 386 |
| V04-0334 | bcr | §10 | V04 §10, row BCR-V4-15 | BCR block → pointer to item 484 |
| V04-0335 | bcr | §10 | V04 §10, row BCR-V4-19 | BCR block → pointer to item 551 |
| V04-0336 | bcr | §10 | V04 §10, row BCR-V4-20 | BCR block → pointer to item 559 |
| V04-0337 | bcr | §10 | V04 §10, row BCR-V4-21 | BCR block → pointer to item 555 |
| V04-0338 | bcr | §10 | V04 §10, row BCR-V4-24 | BCR block → pointer to item 561 |
| V04-0339 | bcr | §10 | V04 §10, row BCR-V4-27 | BCR block → pointer to item 552 |
| V04-0340 | bcr | §10 | V04 §10, row BCR-V4-31 | BCR block → pointer to item 563 |
| V04-0341 | bcr | §10 | V04 §10, row BCR-V4-36 | BCR block → pointer to item 564, merged into 560 |
| V04-0342 | bcr | §10 | V04 §10, row BCR-V4-40 | BCR block → pointer to item 407 |
| V04-0343 | bcr | §10 | V04 §10, row BCR-V4-45 | BCR block → pointer to item 244 and 559 |
| V04-0344 | owner-question | §11 | V04 §11 Q1–Q2 | answered (J122) |
| V04-0345 | rule | §12 | V04 §12 | one CONFIRMED/PLAUSIBLE list, round history cut |
| V04-0346 | handoff | §13 | V04 §13 | no open item; outgoing hand-offs as one table |
| V04-0347 | rule | §IN | V04 §2.3, V04 §3.5.1 (6) | note folded at its home |
| V04-0348 | rule | §IN | V04 §2.3, V04 §3.5.1 (6) | note folded at its home |
| V04-0349 | term | §3.2 | V04 §3.2 | kept (term) |
| V04-0350 | term | §3.5.0 | V04 §3.5.0 | kept (term) |
| V04-0351 | term | §3.1 | V04 §3.1 | kept (term) |
| V04-0352 | term | §3.1 | V04 §3.1 | kept (term) |
| V04-0353 | term | §3.5.7 | V04 §3.5.7 | kept (term) |
| V04-0354 | term | §3.5.1 | V04 §3.5.1 | kept (term) |
| V04-0355 | term | §3.9 | V04 §3.9 | kept (term) |
| V04-0356 | term | §3.5.3 | V04 §3.5.3 | kept (term) |
| V04-0357 | term | §3.5.4 | V04 §3.5.4 | kept (term) |
| V04-0358 | term | §3.5.0a | V04 §3.5.0a | kept (term) |
| V04-0359 | term | §3.6 | V04 §3.6 | kept (term) |
| V04-0360 | term | §3.5.7 | V04 §3.5.7 | kept (term) |
