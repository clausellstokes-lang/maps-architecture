# Verify — consistency pass, round 2: the KERNEL part (§3 geometry kernel) after repair round 2

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-kernel-r2`, 2026-09-26. Status: COMPLETE. Re-verifies `## §3 Geometry kernel` of
`docs/ARCHITECTURE.md` (l. 1525–2503, sha256 `d9d509fa…`, the assemble-r2 output) against the archive
(`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`), `inventory-kernel.json` (386 items + 13 conflicts),
`canon.json`, `rewrite-kernel.md`'s mapping table, the six `repair-r2-*.md` files, `assemble-r2.md` and my round-1
report (`verify-kernel-r1.md`, cited as r1). Method: the round-1 document was rebuilt (`assemble-r0.py`, then
`assemble-r1.py`: sha256 `ddd48f07…`, assemble-r2's "before") and diffed against the current one, so every change round 2
made anywhere in the document was read (16 hunks). Every inventory id whose home, restatement or pointer lies in a
subsection round 2 replaced — §3.3 in this part; §0.2, §1.2, §2.6, §4.2, §4.4, §4.8, §5.1, §5.2, §7.3, §8.10, §12.6,
§12.7, §12.8 and §13.2 elsewhere — was re-checked; the rest carry their r1 verdict. Scratch work: `scratchpad/vk2/` of
this session.

## 1. Outcome

§3 is sound after repair round 2. All 386 inventory ids are OK. **The one r1 issue, VK-R1-1, is fixed**, and **no new
issue** appeared: this round raises nothing against any part. Round 2 changed §3 in exactly one line — " (K4)" deleted in
§3.3 (l. 1695) — and §3.3 now equals the kernel repair block byte for byte. The other 14 blocks, all in other parts,
were read against every kernel fact they restate or point at. Every pointer from §3 into them still lands. The hunks that
restate or point into §3 agree with it: §5.2's F-SKELETON row (→ §3.8), §5.1's tier-4 line (§3.8's downgrades by
name) and §12.7's stage-3 hook (→ §3.7); §2.6 rule 4 no longer credits §3.7 with a µs figure it does not state. Two
kernel canon points are now also reflected on the other parts' side: §5.2 names every §3.8 skeleton reader with its
downgrade (KERNEL-C05), and no pointer credits §3.7 with S11's µs bars, whose home is §12.4 (KERNEL-318 →
RENDERING-524). The open items VK5-1, VK5-2 and VK5-3 stay fixed, and the 19 canon conflicts touching §3 stay
resolved. No deferral wording, round narration, fix-round tag, review marker, broken pointer or cross-part conflict is
in or against §3.

168 ids were re-checked — the union of 79 homed in §3.3, 64 whose archive statement or restatement lay in §3.3, 10
rationale rows whose index row names §3.3, and 46 with a pointer, restatement or home in another replaced subsection.
The other 218 carry their r1 verdict (§9).

**CONFIRMED vs PLAUSIBLE.** CONFIRMED by execution: the rebuilt r1 document and a fresh assemble-r2 run on it
(`cmp`-identical to the current file), the diff (16 hunks, every one read), block-for-block identity of §3.3, the tag
scan, the reference resolver (0 internal breaks), `doc_checks` on §3 (exit 0), the J-id check, the review-marker count
and the presence of every cited fact (grep and reading). PLAUSIBLE: the judgment that the 15 hunks outside §3 shift no
kernel meaning. It rests on one full reading of each hunk, with no second reader.

## 2. Issues (each with its owning part)

None. No issue is raised against the kernel part or, from the kernel's side, against any other part.

## 3. Issues the repairs claimed to fix

| issue | owner | fixed by | verdict | evidence (current line numbers) |
|---|---|---|---|---|
| VK-R1-1 (the "(K4)" tag in §3.3) | kernel | repair-kernel-r2 | **FIXED** | l. 1695 now reads "* **A batch's faces are the faces it names or creates**. A same-level split …". `grep K4` over the whole document finds only the three J-K4 lines (l. 1540, 2265, 9377), which are judgment ids and stay. The §3.3 subsection (l. 1646–1938) equals the repair block (292 lines, script: IDENTICAL) and differs from r1 in that line alone. |

Other round-2 fixes that touch §3's facts, each checked in the text from the kernel side:

* **V-MODEL-R1-02 (model, §2.6 l. 963).** "(≤ 25 µs, §12.4's S11 row; PLAUSIBLE)" lands on §12.4's pooled row (l. 7229):
  "its geometry share ≤ 3 µs (the kernel's M0 bar, §3.7) … compound ≤ 40 µs (25 + 15)". §3.7 states no µs figure; its
  M0 (ii) measures "S11's geometry share against its §12.4 row" (l. 2328). The old "§3.7" was stale. FIXED, agreeing
  with KERNEL-318 and KERNEL-319.
* **VR-R1-6 (rendering, §12.7 l. 7418–7419).** "(≤ 3 µs per plot median, §12.4's S11 row; the kernel's M0 bar, §3.7)":
  the figure is §12.4's, the bar's measurement §3.7's M0 (ii), and "the base outline builder's `outline()` is inside
  S11's geometry share" matches §3.7's definition ("the base outline builder's frontage-band intersection or OBB / LIR
  fit"). FIXED; this also closes `verify-model-r1.md` O6.
* **VDR1-3 (determinism, §5.2 F-SKELETON l. 4018; §5.1 tier 4 l. 3988).** The row's where is "S1, S11, S13a", and its
  ladder reads "each reader takes its typed downgrade (§3.8): `spine` readers — label spines (§9.3) and S1's coast
  simplicity clamp (§4.2 S1 (2)): a sampled medial axis; roofs: a **plain roof** …; the `regions` reader (S10) takes
  F-PLOT's ladder". §3.8 (l. 2366–2373) lists exactly `roof`, `spine` (label spines and S1's clamp) and `regions` (S10),
  with the plain roof, the sampled medial axis and "a **reflex pre-cut partition** (§4.7, §5.2 F-PLOT)", and F-PLOT's
  first rung (l. 4015) names that partition. The tier-4 line reads "skeleton → sampled medial axis (spine readers) /
  plain roof (roofs)". FIXED; both agree with KERNEL-C05's one consumer list.
* **VR-R1-3 (a) (rendering, §8.10 l. 6261).** The stamp-tile random source now points to "the `render.stampTiles` key and
  components of §6.1's registry entry (J-R42)". §6.1's entry (l. 4176–4181) holds every removed component (the constant
  key over domain, class index, 400 cm and creation index 0–3 / 4; `STAGE_VIEW`; reroll, attempt, epoch and salt 0).
  KERNEL-038's content — build-time tiles, r₀ = 400 cm, four tiles sharing a band cut from a fifth (creation index 4),
  a shipped hash-checked asset — is all still in §8.10 (l. 6242–6290). No kernel fact was lost.
* **The other round-2 fixes touch no kernel statement or pointer target.** These are VDR1-1 (§7.3 item 7 (ii)), P1-1
  (§4.2 S1 (2)'s contour clip), P1-2 (§4.4 S5d's test), P1-3 (§4.8's castle citation), VR-R1-1 (§12.7's `lit` export),
  VR-R1-2 (§12.8's crown set), VR-R1-3 (b) (§12.6's replay), V-SCOPE-R1-01 (§13.2's B-EDIT) and V-SCOPE-R1-02 (§1.2,
  §0.2). Every kernel-cited statement in those subsections lies outside their hunks and is unchanged: §4.2 S1 (2)'s
  `spine`-reader sentence (l. 2667–2670), §4.4's *Outer moats* (l. 3050), §4.8's wall strips (l. 3535 ff.), §7.3 items
  1 and 2 and (b), §12.6's plot-edit budget (l. 7321), §12.8's per-worker copies and pool-shrinking step (l. 7437,
  7494), and §13.2's kernel tests (l. 7667, 7676–7679, 7691, 7697, 7718). §4.2's new contour pointer ("their extraction
  and clip to the land faces are §8.2's relief tier") agrees with §3.1's marching-squares row ("contours are extracted
  per render tile, not in S1, and are never plat edges").

## 4. Open items routed to this part (VK5-1, VK5-2, VK5-3)

| item | verdict | evidence |
|---|---|---|
| VK5-1 | **FIXED** (unchanged) | §3.3 "**an item whose partition changes**" (l. 1895), §3.10's freshness row (l. 2494), §3.9's chunk rule, §13.1's `drawBoundary` A→B fixture (l. 7606); none lies in a round-2 hunk. |
| VK5-2 | **FIXED** (unchanged) | `opts.pinned` "does not set the kernel pinned flag, which only pinVertices sets" (l. 1945), the flags comment (l. 344) and rule 3 (b) "other than knot rows" (l. 469), `CommitRecord.unflagged` (l. 1664), §13.1's width-knot deck fixture (l. 7581). |
| VK5-3 | **FIXED** (unchanged) | §2.2 l. 490–491: "… by construction for any number of later same-level vertices on that route". |

## 5. Canon conflicts touching §3

All 19 stay resolved as the canon rules them (r1 §5). Six have a statement inside a subsection round 2 replaced:

* **KERNEL-C05.** §3.8's single consumer list is unchanged. §5.2's F-SKELETON row now names each consumer's downgrade and
  points to §3.8 for the list (VDR1-3), and §5.1's tier-4 line names the `spine` and roof downgrades; neither holds a
  list that differs.
* **KERNEL-C06, KERNEL-C09, KERNEL-C12.** Their canonical text is in §3.3, unchanged apart from l. 1695.
* **MODEL-C02, KERNEL-C10.** §2.6's *Row footprints* (l. 894), wing rule 3 (l. 936), `BaseWing.kind` and `ridgeAxis`
  are unchanged; round 2 changed §2.6 at l. 963 only.

Canon restatements of kernel homes that lie in replaced subsections are all outside the round-2 hunks: KERNEL-335 in
§2.6 (MODEL-243), KERNEL-263 in §5.2 F-NUM (DETERMINISM-029), KERNEL-377 in §7.3 item 2 (DETERMINISM-400), and
KERNEL-147's archive place in §5.1 (5) (DETERMINISM-288, which no longer restates it). Of the canon's section
restatements, only DETERMINISM-084 (§5.3, not replaced) refers to the kernel.

## 6. Pointers between §3 and the subsections round 2 replaced

| target | §3 pointers into it | what round 2 changed there | verdict |
|---|---|---|---|
| §3.3 (this part) | every pointer to §3.3 (outside §3 alone: 54 bare, plus labelled forms such as "§3.3 pool step 1", "§3.3 rule 2", "§3.3's same-level-split rule") | l. 1695's tag only; no heading or numbering change | OK — every label still lands; the same-level-split rule is l. 1695's bullet |
| §2.6 | 7 (l. 1947, 1969, 2251–2252, 2329, 2390, 2399) | rule 4's *Cost* pointer (l. 963) | OK — first carry, carried wings, rule 4's tiered test, the base outline builder, `ridgeAxis` and `BaseWing.kind` unchanged |
| §4.2 | 1 (l. 2371) | S1 (2)'s contour sentence | OK — the `spine`-reader sentence (l. 2667–2670) unchanged |
| §4.4 | 1 (l. 1700) | S5d's test sentence | OK — *Outer moats* (l. 3050) unchanged |
| §4.8 | 2 (l. 1690, 2290) | "§5.2" dropped from the castle acceptance | OK — wall strips and band parts unchanged |
| §5.1 | 0 (l. 1538's "§5.1" is `docs/validation/redteam-improve.md`'s) | the tier-4 diagram line | OK — agrees with §3.8 |
| §5.2 | 2 (l. 2143 F-NUM, l. 2373 F-PLOT) | the F-SKELETON row | OK — F-NUM and F-PLOT unchanged; F-SKELETON agrees with §3.8 |
| §7.3 | 10 (l. 1652, 1693, 1698, 1701, 1704, 1718, 1724, 1755, 1760, 1897) | item 7 (ii) | OK — items 1 and 2, (b) 2–4, (b) 3, (b) 8 and the S6 regroup unchanged |
| §8.10 | 2 (l. 1544) | the random-source clause | OK — stamp tiles and per-instance placement unchanged |
| §12.6 | 1 (l. 1937) | the replay paragraph | OK — plot-edit budget (l. 7321) unchanged |
| §12.7 | 0 | the `lit` export's milestone; the stage-3 hook's pointer | OK — the new inbound "the kernel's M0 bar, §3.7" lands on M0 (ii) |
| §12.8 | 2 (l. 1824, 1828) | the crown-set sentence | OK — one copy per pool worker (l. 7437) and the pool-shrinking step (l. 7494) unchanged |
| §13.2 | 6 (l. 1691, 1757, 1777, 1870, 1937, 2295) | the B-EDIT load-verification bullet | OK — stage property tests, carve checks, issue-order, pool-size, index-work and Hausdorff-0 tests unchanged |
| §0.2, §1.2 | 0 | pointers to §12.2 and §1.1 | not applicable |

Inbound pointers to §3 in the round-2 hunks: the new F-SKELETON row has 3 to §3.8 (as the old row had), §12.7's hook
has 2 to §3.7 (as before, one now labelled "the kernel's M0 bar"), and §2.6 l. 963 dropped its §3.7. Each remaining one
lands.

## 7. Mechanical checks (executed)

* **Rebuild.** `assemble-r0.py` gave sha256 `ee314f23…` (r0) and `assemble-r1.py` gave `ddd48f07…`, which is
  assemble-r2's "before". A fresh `assemble-r2.py` run on it gave `d9d509faedfb6ac08a8eac887a7c3f81df2dff9ca98a66cd53370d81e7d97a5d`,
  `cmp`-identical to `docs/ARCHITECTURE.md`, so no later edit exists.
* **Diff r1 → current.** 16 hunks, 64 lines out and 62 in, equal to assemble-r2 §1. Every hunk was read. One hunk lies
  in §3 (l. 1695); §3 intro, §3.1, §3.2 and §3.4–§3.10 are byte-identical to r1.
* **Block.** `repair-r2-kernel.md`'s one REPLACE block equals §3.3 (l. 1646–1938), 292 lines, IDENTICAL. No other repair
  file has a block inside §3.
* **Tags.** 0 occurrences in §3 of r0's 52 distinct fix-round tags and 0 of "(K4)" (J-ids excluded); a broad
  VK/VD/VP/VR/VS/VM/NP/NR/NF/NK pattern finds none.
* **References.** `assemble-r0-refs.py docs/ARCHITECTURE.md`: 134 headings, 35 D-ids, 276 J-ids; the only 2 unresolved
  pointers are the known external ones (l. 2036 `os-geometry.md` §2.1.4; l. 6826 RFC 7946 §3.1.6).
* **`doc_checks.py --sections 3`.** Exit 0: C1 5 / 0 unreviewed, C2 0, C3 59 / 0, C4 0, S1 0, S2 0 — as in r1.
* **J-ids.** All 31 J-ids §3 cites (J-11, J-DET-36, J-I9, J-I10, J-I12, J-I13 and 25 J-K…) have an index row and a
  rationale entry. `docs/ARCHITECTURE-RATIONALE.md` is unchanged since r1 (mtime 16:23, sha256 `5f80e197…`).
* **Review marker.** The document holds one "PENDING FABLE REVIEW" line, the banner (l. 3).
* **Deferral and narration.** No "TBD", "TODO", "open item", "deferred", "pending", "round n", "fix-all", "formerly" or
  "previously" in §3. Every "later" means a later batch, op or vertex. "future" occurs once (§8).
* **Size.** §3 is 111 164 bytes (−5), 75.1 % of the archived §3 (147 958 bytes).

## 8. Observations (not raised)

* **§5.2 F-SKELETON names §3.8's readers.** The canon homes the class's ladder in §5.2 (DETERMINISM-060), so naming each
  reader's rung is the ladder's own content; the row points to §3.8 for the list, and the values agree. If §3.8's
  reader list ever changes, the row changes with it.
* **F-SKELETON's where column omits S10** because the row routes the `regions` reader to F-PLOT's ladder. F-PLOT's
  detection column names no skeleton failure, but its first rung names the downgrade. This is determinism's taxonomy;
  §3.8 does not say which class reports a downgrade, so nothing conflicts.
* **l. 1695's period sits outside the bold**, as in the archive, where the tag stood between them; the sibling bullets
  put it inside. Style only; the repair lane recorded it as its vetoable call.
* **Correction to r1 §7.** "future" does occur once in §3: l. 1538, "*pre-decided fallback* if a future version fails the
  checker" (a `robust-predicates` upgrade), present in the archive, r0 and r1. It is a dependency contingency with a
  pre-decided fallback, not deferral wording, so r1's verdicts stand.
* **Carried from r1 (unchanged by round 2):** §3's size, 75.1 % against the 55–65 % target; §3.3's title "indexes
  rebuilt at stage end", true but incomplete; §2.2 rule 3's two "(b)" labels; the within-part `E_SCOPE` "scope"
  reconciliation, still to be listed in the canon for Fable; §4.5's "through `parent` (§2.8)" for face inheritance.

## 9. Checked list — every inventory id

Columns: the r1 verdict (from `verify-kernel-r1.md` §9); the r2 scope ("re-checked" = home, restatement or pointer in a
subsection round 2 replaced, or a rationale row naming §3.3; "carried" = r1's verdict stands, its home and targets
untouched by round 2); the r2 verdict; the note. Line numbers are in the current `docs/ARCHITECTURE.md`.

| id | kind | r1 verdict | r2 scope | r2 verdict | note |
|---|---|---|---|---|---|
| KERNEL-001 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-002 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-003 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-004 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-005 | number | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-006 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-007 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-008 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-009 | mechanism | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-010 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-011 | decision | OK | re-checked | OK | l. 1538's '§5.1' is `docs/validation/redteam-improve.md` §5.1 (external), so round 2's §5.1 diagram change does not reach it; §3.1 row unchanged |
| KERNEL-012 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-013 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-014 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-015 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-016 | defined-term | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-017 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-018 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-019 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-020 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-021 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-022 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-023 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-024 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-025 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-026 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-027 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-028 | mechanism | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-029 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-030 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-031 | rule | OK — VK-R0-11 FIXED | re-checked | OK | §3.8 readers unchanged (l. 2366–2373); §4.2 S1 (2)'s `spine`-reader sentence (l. 2667–2670) lies outside round 2's contour hunk; §5.2 F-SKELETON now lists S1's clamp among the `spine` readers — agrees |
| KERNEL-032 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-033 | rule | OK | re-checked | OK | §5.2 F-SKELETON's ladder now 'each reader takes its typed downgrade (§3.8)': `spine` → sampled medial axis, roofs → plain roof, `regions` → F-PLOT's ladder (whose first rung names the reflex pre-cut partition) — agrees with §3.8 |
| KERNEL-034 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-035 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-036 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-037 | decision | OK | re-checked | OK | §3.1 Poisson row unchanged; §8.10 still states 'Bridson with k = 50 candidates, all evaluated' (l. 6262) |
| KERNEL-038 | mechanism | OK | re-checked | OK | home §8.10: round 2 changed only the random-source clause, now '`render.stampTiles` key and components of §6.1's registry entry (J-R42)' (VR-R1-3 (a)); §6.1 (l. 4176–4181) states the constant key, creation index 0–3 / 4, `STAGE_VIEW` and the zeros; build time, r₀ = 400 cm, four tiles sharing a band cut from a fifth (creation index 4), shipped hash-checked asset all still in §8.10 (l. 6242–6290) |
| KERNEL-039 | mechanism | OK | re-checked | OK | §8.10 *Stamp* unchanged (offset, rotation, s = spacing ÷ 400 cm, l. 6291–6293); §8.1 (2) not replaced |
| KERNEL-040 | budget | OK | re-checked | OK | home §12.7: Trees 'placement ≤ 1 µs per instance' (l. 7364) lies outside round 2's two §12.7 hunks (export beside the view; stage-3 hook) |
| KERNEL-041 | rule | OK | re-checked | OK | §3.1 Poisson row unchanged; its §8.10 pointers land (stamp paragraphs unchanged apart from the key clause) |
| KERNEL-042 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-043 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-044 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-045 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-046 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-047 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-048 | decision | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-049 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-050 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-051 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-052 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-053 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-054 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-055 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-056 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-057 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-058 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-059 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-060 | type | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-061 | type | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-062 | type | OK — VK-R0-12 FIXED | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-063 | history | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-064 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-065 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-066 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-067 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-068 | number | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-069 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-070 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-071 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-072 | number | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-073 | number | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-074 | number | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-075 | evidence | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-076 | number | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-077 | number | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-078 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-079 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-080 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-081 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-082 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-083 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-084 | test | OK — VK-R0-9 FIXED | re-checked | OK | home §13.3 unchanged: 'pool sizes 0 and 3, the contract tests of §13.2 covering 0–3' (l. 7871–7872); §13.2's contract tests 'pool sizes 0–3' (l. 7676) outside the B-EDIT hunk |
| KERNEL-085 | rule | OK (CANON-C02) | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-086 | mechanism | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-087 | evidence | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-088 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-089 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-090 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-091 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-092 | rule | OK (CANON-C03) | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-093 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-094 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-095 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-096 | interface | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-097 | rule | OK | re-checked | OK | §3.3 text unchanged except l. 1695; `rederivesFrom` comment unchanged; its §7.3 target unchanged (round 2 changed §7.3 item 7 (ii) only) |
| KERNEL-098 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-099 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-100 | type | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-101 | interface | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-102 | mechanism | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-103 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-104 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-105 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-106 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-107 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-108 | rule | OK | re-checked | OK | §3.3 text unchanged; §4.8's wall strips and band parts and §13.2's stage property tests unchanged (round 2 dropped only the castle acceptance's '§5.2' and rewrote the B-EDIT bullet) |
| KERNEL-109 | acceptance-bar | OK | re-checked | OK | home §13.2: '0 `E_KEPT` on the one-click path' (l. 7691) outside the B-EDIT hunk (l. 7735–7757) |
| KERNEL-110 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-111 | rule | OK | re-checked | OK | home §7.3 item 2 unchanged (round 2 changed item 7 (ii) only); §3.3's pointer 'never writing the other side: §7.3 item 2' (l. 1693) unchanged |
| KERNEL-112 | rule | OK in substance; VK-R1-1 | re-checked | OK — VK-R1-1 FIXED | **VK-R1-1 FIXED**: ' (K4)' deleted at l. 1695, the rest of the bullet byte-identical; the three J-K4 lines (l. 1540, 2265, 9377) intact |
| KERNEL-113 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-114 | mechanism | OK | re-checked | OK | §3.3 text unchanged; §4.4's *Outer moats* paragraph and §7.3 (b) unchanged (round 2 changed §4.4 S5d's test sentence and §7.3 item 7 (ii) only) |
| KERNEL-115 | rule | OK | re-checked | OK | §3.3 text unchanged; §7.3 (b) 2–4 and §4.11 unchanged |
| KERNEL-116 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-117 | rule | OK | re-checked | OK | §3.3 rule 2 unchanged; §7.3 (b) 3 unchanged |
| KERNEL-118 | rule | OK — VK-R0-5 FIXED | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-119 | rule | OK | re-checked | OK | §3.3 rule 2 unchanged; §7.3 (b) 3 unchanged |
| KERNEL-120 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-121 | rule | OK | re-checked | OK | §3.3 rule 3 unchanged; §7.3 (b) 8 and §4.11 step 4 unchanged |
| KERNEL-122 | rule | OK | re-checked | OK | pointer clause in §3.3 rule 3 unchanged; home §4.11 step 4 (not replaced) and §7.3 (b) 8 (unchanged) |
| KERNEL-123 | test | OK — VK-R0-1 FIXED | re-checked | OK | §13.1's five carve fixtures (not replaced) and §13.2's 'decks on 100 % of way–water crossings, moats and canals included' (l. 7697, outside the B-EDIT hunk) stand; §4.4's *Outer moats* (the fixture's S5a carve) unchanged |
| KERNEL-124 | decision | OK | re-checked | OK | §3.3 fallback unchanged; §13.1–§13.2 carve fixtures and §7.3's fate report unchanged |
| KERNEL-125 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-126 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-127 | test | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-128 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-129 | test | OK | re-checked | OK | §3.3 text unchanged except l. 1695; home §13.2 l. 7677–7679 'a callback-form stage run twice, on a slot-renumbered arena and inside the pool at sizes 0–3 gives identical digests (issue order …)' unchanged |
| KERNEL-130 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-131 | test | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-132 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-133 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-134 | budget | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-135 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-136 | mechanism | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-137 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-138 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-139 | number | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-140 | evidence | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-141 | mechanism | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-142 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-143 | budget | OK — VK-R0-7 FIXED | re-checked | OK | §3.3 pool step 1 unchanged; §12.8's 'one frozen arena copy per pool worker' unchanged (round 2 changed the crown-set sentence only) |
| KERNEL-144 | decision | OK | re-checked | OK | §3.3 fallback unchanged; §12.8's pool-shrinking step ('the pool shrinks by one worker per step') unchanged |
| KERNEL-145 | budget | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-146 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-147 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-148 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-149 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-150 | number | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-151 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-152 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-153 | mechanism | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-154 | budget | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-155 | rule | OK | re-checked | OK | §3.3 text unchanged except l. 1695; pool step 5 unchanged (l. 1868–1870); §13.2's pool-size tests (l. 7676, 7718) and §6.5 (9) unchanged |
| KERNEL-156 | decision | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-157 | number | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-158 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-159 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-160 | evidence | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-161 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-162 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-163 | mechanism | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-164 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-165 | evidence | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-166 | defined-term | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-167 | rule | OK | re-checked | OK | §3.3 text unchanged except l. 1695; tombstone list unchanged (l. 1894–1898, VK5-1's case); its '(S6's regroup, §7.3)' target unchanged |
| KERNEL-168 | number | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-169 | decision | OK | re-checked | OK | J-K34: its Judgment-calls index row (not replaced in round 2) names §3.3, whose heading and text are unchanged apart from l. 1695; rationale file untouched since r1 (mtime 16:23, sha256 5f80e197…) |
| KERNEL-170 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-171 | evidence | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-172 | budget | OK | re-checked | OK | §3.3 text unchanged except l. 1695; §12.6 'A single plot edit: ≤ 5 ms of model work plus ≤ 2 ms of deltas' (l. 7321) unchanged — round 2 rewrote the replay paragraph only; §13.2's cost-model pointer lands |
| KERNEL-173 | test | OK | re-checked | OK | home §13.2 l. 7667–7668 '**Index work** is fitted against commits × level size (§3.3)' unchanged |
| KERNEL-174 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-175 | budget | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-176 | decision | OK | re-checked | OK | J-K6: its Judgment-calls index row (not replaced in round 2) names §3.3, whose heading and text are unchanged apart from l. 1695; rationale file untouched since r1 (mtime 16:23, sha256 5f80e197…) |
| KERNEL-177 | decision | OK | re-checked | OK | J-K14: its Judgment-calls index row (not replaced in round 2) names §3.3, whose heading and text are unchanged apart from l. 1695; rationale file untouched since r1 (mtime 16:23, sha256 5f80e197…) |
| KERNEL-178 | decision | OK | re-checked | OK | J-K24: its Judgment-calls index row (not replaced in round 2) names §3.3, whose heading and text are unchanged apart from l. 1695; rationale file untouched since r1 (mtime 16:23, sha256 5f80e197…) |
| KERNEL-179 | decision | OK | re-checked | OK | J-K15: its Judgment-calls index row (not replaced in round 2) names §3.3, whose heading and text are unchanged apart from l. 1695; rationale file untouched since r1 (mtime 16:23, sha256 5f80e197…) |
| KERNEL-180 | decision | OK | re-checked | OK | J-K16: its Judgment-calls index row (not replaced in round 2) names §3.3, whose heading and text are unchanged apart from l. 1695; rationale file untouched since r1 (mtime 16:23, sha256 5f80e197…) |
| KERNEL-181 | decision | OK | re-checked | OK | J-K25: its Judgment-calls index row (not replaced in round 2) names §3.3, whose heading and text are unchanged apart from l. 1695; rationale file untouched since r1 (mtime 16:23, sha256 5f80e197…) |
| KERNEL-182 | decision | OK | re-checked | OK | J-K33: its Judgment-calls index row (not replaced in round 2) names §3.3, whose heading and text are unchanged apart from l. 1695; rationale file untouched since r1 (mtime 16:23, sha256 5f80e197…) |
| KERNEL-183 | decision | OK | re-checked | OK | J-K34: its Judgment-calls index row (not replaced in round 2) names §3.3, whose heading and text are unchanged apart from l. 1695; rationale file untouched since r1 (mtime 16:23, sha256 5f80e197…) |
| KERNEL-184 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-185 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-186 | interface | OK | re-checked | OK | `ChainInsert.placed` comment unchanged; §2.6's first-carry path (rule 5) unchanged — round 2 changed §2.6 at l. 963 only |
| KERNEL-187 | interface | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-188 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-189 | interface | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-190 | interface | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-191 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-192 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-193 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-194 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-195 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-196 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-197 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-198 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-199 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-200 | interface | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-201 | interface | OK | re-checked | OK | `warp` `recordCheck` comment unchanged; §2.6's carried wings unchanged |
| KERNEL-202 | interface | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-203 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-204 | interface | OK — VK-R0-4 FIXED | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-205 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-206 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-207 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-208 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-209 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-210 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-211 | interface | OK — VK-R0-13 FIXED | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-212 | interface | OK | re-checked | OK | `skeleton` uses unchanged; all three (roof, spine, regions) now accounted for in §5.2 F-SKELETON — agrees |
| KERNEL-213 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-214 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-215 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-216 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-217 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-218 | history | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-219 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-220 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-221 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-222 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-223 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-224 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-225 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-226 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-227 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-228 | test | OK — VK-R0-10 FIXED | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-229 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-230 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-231 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-232 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-233 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-234 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-235 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-236 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-237 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-238 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-239 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-240 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-241 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-242 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-243 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-244 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-245 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-246 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-247 | algorithm-step | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-248 | algorithm-step | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-249 | test | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-250 | number | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-251 | algorithm-step | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-252 | algorithm-step | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-253 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-254 | algorithm-step | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-255 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-256 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-257 | evidence | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-258 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-259 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-260 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-261 | evidence | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-262 | test | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-263 | rule | OK | re-checked | OK | canon restatement DETERMINISM-029 in §5.2 F-NUM (l. 4004) unchanged (round 2 changed only F-SKELETON in §5.2); §3.6's 'The F-NUM ladder of §5.2' lands |
| KERNEL-264 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-265 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-266 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-267 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-268 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-269 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-270 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-271 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-272 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-273 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-274 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-275 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-276 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-277 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-278 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-279 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-280 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-281 | number | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-282 | test | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-283 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-284 | evidence | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-285 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-286 | evidence | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-287 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-288 | rule | OK | re-checked | OK | whole-step validation unchanged (l. 2246–2254); §2.6 rule 4's tiered test (i)–(iii) unchanged, only its *Cost* pointer moved to §12.4's S11 row (V-MODEL-R1-02) |
| KERNEL-289 | number | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-290 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-291 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-292 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-293 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-294 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-295 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-296 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-297 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-298 | decision | OK | re-checked | OK | J-K27: its Judgment-calls index row (not replaced in round 2) names §3.3, whose heading and text are unchanged apart from l. 1695; rationale file untouched since r1 (mtime 16:23, sha256 5f80e197…) |
| KERNEL-299 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-300 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-301 | algorithm-step | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-302 | mechanism | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-303 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-304 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-305 | rule | OK | re-checked | OK | §3.7 unchanged; its '(§4.7 S10 (0), §4.8)' (l. 2290) lands — §4.8's band parts unchanged |
| KERNEL-306 | rule | OK | re-checked | OK | '(tested, §13.2)' (l. 2295) lands on §13.2 l. 7679 (Hausdorff 0), unchanged |
| KERNEL-307 | test | OK | re-checked | OK | home §13.2 l. 7679 'S8's working block equals S9's committed block (Hausdorff 0; §3.7)' unchanged |
| KERNEL-308 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-309 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-310 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-311 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-312 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-313 | acceptance-bar | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-314 | acceptance-bar | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-315 | acceptance-bar | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-316 | rule | OK — VK-R0-3 FIXED | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-317 | acceptance-bar | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-318 | budget | OK — VK-R0-2 FIXED | re-checked | OK | home §12.4's pooled row unchanged ('its geometry share ≤ 3 µs (the kernel's M0 bar, §3.7)'; 'compound ≤ 40 µs (25 + 15)'); §12.7 now '(≤ 3 µs per plot median, §12.4's S11 row; the kernel's M0 bar, §3.7)' (VR-R1-6) and §2.6 rule 4 '(≤ 25 µs, §12.4's S11 row; PLAUSIBLE)' (V-MODEL-R1-02), so no pointer credits §3.7 with a µs figure; S9's 'one district ≤ 3 ms' in §3.7 unchanged |
| KERNEL-319 | defined-term | OK | re-checked | OK | definition unchanged (l. 2328–2332); §12.7's 'the base outline builder's `outline()` is inside S11's geometry share' matches it, and the new 'the kernel's M0 bar, §3.7' lands on M0 (ii) |
| KERNEL-320 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-321 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-322 | budget | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-323 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-324 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-325 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-326 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-327 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-328 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-329 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-330 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-331 | rule | OK | re-checked | OK | §3.8 'reflex pre-cut partition (§4.7, §5.2 F-PLOT)' (l. 2372–2373); F-PLOT (l. 4015) unchanged and names it; F-SKELETON routes the `regions` reader (S10) to F-PLOT's ladder — agrees |
| KERNEL-332 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-333 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-334 | number | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-335 | rule | OK | re-checked | OK | canon restatements MODEL-243 (§2.6 Row footprints, l. 894) and §2.6 wing rule 3 (l. 936) still point to §3.8's test — round 2 changed §2.6 at l. 963 only (MODEL-C02 holds) |
| KERNEL-336 | evidence | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-337 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-338 | test | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-339 | rule | OK | re-checked | OK | §3.8 unchanged; `BaseWing.kind` and `ridgeAxis` (§2.6) unchanged (KERNEL-C10 holds) |
| KERNEL-340 | rule | OK — VK-R0-11 FIXED | re-checked | OK | reader list unchanged (l. 2366–2373); §5.2 F-SKELETON's where 'S1, S11, S13a' and per-reader rungs now match it (VDR1-3); §5.1 tier 4 'sampled medial axis (spine readers) / plain roof (roofs)' agrees; KERNEL-C05 now reflected in §5.2 too |
| KERNEL-341 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-342 | rule | OK | re-checked | OK | downgrade definitions unchanged (l. 2410–2413); §5.2 F-SKELETON's plain-roof and sampled-medial-axis rungs agree |
| KERNEL-343 | test | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-344 | acceptance-bar | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-345 | decision | OK — VK-R0-11 FIXED | re-checked | OK | fallback unchanged (l. 2415–2421); §5.2 names each reader's downgrade as §3.8 does (§5.1's tier-4 line the `spine` and roof ones) |
| KERNEL-346 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-347 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-348 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-349 | interface | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-350 | interface | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-351 | interface | OK — VK-R0-6 FIXED | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-352 | interface | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-353 | rule | OK | re-checked | OK | §3.3 replaced by round 2: byte-identical to r1 except l. 1695's deleted ' (K4)' (VK-R1-1) — meaning unchanged |
| KERNEL-354 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-355 | algorithm-step | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-356 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-357 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-358 | decision | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-359 | algorithm-step | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-360 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-361 | decision | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-362 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-363 | test | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-364 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-365 | number | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-366 | history | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-367 | invariant | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-368 | invariant | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-369 | invariant | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-370 | invariant | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-371 | invariant | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-372 | invariant | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-373 | invariant | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-374 | invariant | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-375 | invariant | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-376 | invariant | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-377 | invariant | OK | re-checked | OK | canon restatement DETERMINISM-400 in §7.3 item 2 unchanged (round 2 changed item 7 (ii) only) |
| KERNEL-378 | invariant | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-379 | invariant | OK — VK-R0-6 FIXED | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-380 | invariant | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-381 | invariant | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-382 | invariant | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-383 | invariant | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-384 | invariant | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
| KERNEL-385 | rule | OK | re-checked | OK | archive statement or restatement lay in §3.3; §3.3's current text (a pointer, or nothing per the canon) is byte-identical to r1 except l. 1695; home unchanged by round 2 |
| KERNEL-386 | rule | OK | carried | OK | carried: r1 verdict (verify-kernel-r1.md §9); home and pointer targets untouched by round 2 |
