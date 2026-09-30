# Verify — consistency pass, round 3: the RENDERING part (§8, §9, §11, §12) after repair round 3

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-rendering-r3`, 2026-09-26. Status: COMPLETE. Re-verifies `## §8 Rendering and the style system`
(l. 5457–6350), `## §9 Labels and map furniture` (l. 6351–6617), `## §11 Export and interop` (l. 6790–7048) and
`## §12 Performance budgets` (l. 7049–7519) of `docs/ARCHITECTURE.md` (sha256 `7a4e19db…c762`, the assemble-r3 output)
against the archive (`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`), `inventory-rendering.json` (599 items
+ 8 conflict records), `canon.json` (`by_inventory_id`, `facts`, `conflicts`, home rule R8), the mapping table and
*Homes chosen* list of `rewrite-rendering.md`, the four `repair-r3-*.md` files and their landing notes, `validate.md`
(V-FIN-01 … V-FIN-07), `assemble-r3.md`, `docs/validation/fix-all/still-open-r5.json` (NR5-1 … NR5-3) and my round-2
report `verify-rendering-r2.md` (cited as **r2**). `verify-determinism-r3.md` was read for its issue VDR3-1, which lies
in this part. Line numbers are the current document's unless marked "archive".

**Method.** The four document states were rebuilt in this lane's scratch directory (`assemble-r0.py` → `-r1` → `-r2` →
`-r3`): sha256 `ee314f23…`, `ddd48f07…`, `d9d509fa…` (assemble-r3's "before") and `7a4e19db…`, the last `cmp`-identical to
the landed file. The r2 → r3 diff (7 hunks, 36 lines out, 36 in) was read in full with a word diff of every hunk.
**Re-checked** (87 ids and 6 conflict records): every id homed in §9.5 or §12.6 (this part's two replaced subsections);
every id whose pointer target, canon home or restatement place lies in a subsection another repair replaced (§4.2, §5.2,
§6.1, §13.2, §16); every id whose current text points into §9.5 or §12.6 or into another replaced subsection; every id
tied to a round-2 issue, a V-FIN issue or an open item. Every pointer between this part and a replaced subsection was
also listed and checked in both directions (§6). **Carried** (512 ids, 2 conflict records): home and targets outside
every replaced subsection, so r2's verdict stands (r2 §9). Scratch work: `scratchpad/vr3/` of this session.

## 1. Outcome

The rendering part is sound after repair round 3; two pre-existing single-source slips surfaced on re-reading the
replaced §12.6 and §9.5.

* **Every round-3 fix that touches this part is FIXED.** V-FIN-01 (§12.6's replay clause has its verb) and V-FIN-06
  (§9.5's compass cites only §6.1's town root key) are the rendering repair's. V-FIN-04, V-FIN-03 and V-FIN-05 close my
  r2 findings VR-R2-1 (the stamp-tile key's derivation is again stated, at §6.1), VR-R2-3 (F-CONTOUR's bracket names
  §8.2) and r2's O1 (§16's M2b exit now gates §12.7's `lit` export). V-FIN-02 touches no fact of this part. V-FIN-07's
  ripple (§12.4's S1 row → §4.2 S1 (1) → §2.3's resolution) lands.
* **The part changed in exactly 2 hunks** (l. 6562; l. 7330–7331; 3 lines, −15 bytes), each the claimed substitution.
* **NR5-1, NR5-2 and NR5-3 stay FIXED**, and NR5-1's executed check now gates a milestone. The conflicts touching the
  part stay resolved as ruled.
* **All 599 ids and 8 conflict records are accounted for (§9):** 596 ids OK, 3 carry a new issue (RENDERING-554 →
  VR-R3-1; RENDERING-387 and RENDERING-442 → VR-R3-2); the 8 conflict records are OK.

**Two new issues, both minor (0 blocker, 0 major), both owned by rendering.** Neither was caused by a repair: both pairs
are archive-identical, and my r0–r2 carried the ids as OK.

* **VR-R3-1** (conflict) = `verify-determinism-r3.md` VDR3-1, confirmed here but not found independently — §12.6's
  verification law restates §6.3's succession-matching budget as "≤ 2 µs per re-derived entity", dropping §6.3's
  "point-anchored" and "≤ 20 µs per overlap-anchored one". One fix, VDR3-1's.
* **VR-R3-2** (conflict, single source) — §9.5's grid bullet restates the VTT grid default "1.5 m / 5 ft" with no
  pointer, although the rewrite recorded §11.1's `.dd2vtt` profile as its one home. Values agree; nothing is lost.

No review marker, deferral wording, round narration or fix-round tag is in the part; every `§` reference resolves (the
part's only unresolved pointer is RFC 7946 §3.1.6, external). `doc_checks.py` on the four sections exits 1 only because
of 27 C3 hits raised by corpus growth after assemble-r3's last run; they are identical on the r2 and r3 documents and
are not document defects (§7, O1). The part is 198 811 bytes, 81.1 % of the archived 245 128.

**CONFIRMED vs PLAUSIBLE.** CONFIRMED by execution: the rebuilt states (sha256, `cmp`), the line and word diffs, the
resolver, `doc_checks` with a one-load r2 / r3 comparison and a file attribution of every new hit, the J-id, marker,
deferral and tag scans, the pointer lists, and each issue's quoted evidence (grep and reading, at the current lines and
the archive). PLAUSIBLE (reading and judgment): the ruling in §8 O2 that the descriptive overlaps between §8.2 / §8.3 /
§8.9 and §9.5 are not defects, and VR-R3-1's note that no stated figure has to move.

## 2. Issues (each with its owning part)

| id | sev | kind | owner | claim (evidence) | required change |
|---|---|---|---|---|---|
| VR-R3-1 | minor | conflict | rendering | **§12.6 restates §6.3's matching budget with a qualifier and a value missing** (= `verify-determinism-r3.md` VDR3-1; confirmed here, not found independently; one fix). §6.3 is the budget's home (DETERMINISM-251; canon rule R8 names "§6.3 matching" among the budgets that stay at their subject section, §12 pointing to it): "*Budget:* ≤ 2 µs per re-derived point-anchored entity and ≤ 20 µs per overlap-anchored one, median, included in the scope costs of §12.6" (l. 4432–4434). §12.6's law V defines c(e) with "plus succession matching (≤ 2 µs per re-derived entity, §6.3)" (l. 7337–7338, RENDERING-554), which gives the overlap-anchored kinds — ways without matched end junctions, enceintes, water bodies, greenery, land use (l. 4431) — ≤ 2 µs against the home's ≤ 20 µs. It is the only restatement of the budget in the document. The pair is archive-identical (archive l. 5604 and l. 9037). My r2 numbers-beside-pointers scan passed it because "2 µs" does occur at §6.3. No stated figure has to move: V ≈ 1.4 s and the ≈ 11 s case were computed with 2 µs per re-derived entity by `fixall_rendering_r2_budgets.py`, and the reference mix stays PLAUSIBLE until B-EDIT times it at M2a, whose pre-decided fallback re-declares c(e) at its measured p95 (l. 7347–7349). | §12.6, the law's c(e): change "plus succession matching (≤ 2 µs per re-derived entity, §6.3)" to "plus succession matching (§6.3's budget)" (VDR3-1's text). Nothing else changes; §6.3 keeps the budget with its measurement and fallback. |
| VR-R3-2 | minor | conflict | rendering | **The VTT grid default is stated twice, with no pointer between the two.** Its home is §11.1's `.dd2vtt` profile: "One scene image is ≤ 8 192 px on a side at the declared grid (default 1 square = 5 ft = 1.5 m at 100 px, so ≈ 123 m)" (l. 6879, RENDERING-442). The rewrite recorded that home under *Homes chosen* 5: "VTT grid default, 0 px per cell, model widths → §11.1 (from §8.7)". The canon lists "§9.5 grid (VTT 1.5 m/5 ft)" among RENDERING-442's restatement places. §8.7's copy became a pointer ("on a declared grid with exact pixels per cell (§11.1)", l. 6032), but §9.5's grid bullet still reads "cell size in metres or feet (default: a round ground distance ≈ one tenth of the view's short side on a 1-2-5 sequence; for VTT 1.5 m / 5 ft)" (l. 6573–6574, RENDERING-387). The values agree (5 ft = 1.5 m), so nothing is lost. The same fact, stated in full at two places with no pointer, is the pattern `validate.md` raised as V-FIN-07 (principle 1). The pair is archive-identical (archive l. 8150 and the `.dd2vtt` row); r0–r2 carried both ids as OK. Found on re-reading §9.5, which round 3 replaced. | §9.5, the grid bullet: change "…on a 1-2-5 sequence; for VTT 1.5 m / 5 ft)" to "…on a 1-2-5 sequence; for VTT, the export's declared grid, §11.1)". Nothing else changes: "skip water … off for VTT grids" is §9.5's own, and §11.1 keeps the default. |

## 3. The issues round 3 claimed to fix, and every round-2 issue about this part

The rendering repair's landing note claims V-FIN-06 and V-FIN-01; the determinism repair V-FIN-03 and V-FIN-04; the
scope repair V-FIN-02 and V-FIN-05; the pipeline repair V-FIN-07. assemble-r3 applied all 7 blocks. Every claim is
fixed; the table gives each one's effect on this part.

| issue | owner, fixed by | verdict | where the fix stands (evidence) |
|---|---|---|---|
| V-FIN-01 (= VR-R2-2 = V-MODEL-R2-01) | rendering, repair-r3-rendering | **FIXED** | §12.6 l. 7329–7331: "A replay (§7.3 item 2's replay mode) folds the log on the model through the session's code path, and the view stages run once at the end (§7.3 item 2) — S13a's scoped delta at each event that re-derives names costs ≤ 3 ms per such event." This is validate.md's exact text; the word diff shows "and" and "run" inserted and nothing else. §7.3 item 2 (l. 4866–4870) lists the four replay kinds and "Only the view stages wait: S14 and S13b run once at the end" — the archive's §12.6 meaning (archive l. 9027–9030). |
| V-FIN-06 | rendering, repair-r3-rendering | **FIXED** | §9.5 l. 6561–6563: "its stream is keyed from the town root's entity key (§6.1, §14 `TOWN_ROOT`) with the concern `style.compass` and that concern's salt". "the seed key alone" now has 0 hits in the document. §6.1 (l. 4120–4123) is the one definition: "the seed key mixed with the fixed town lineage (ground arena, no parent, creation epoch 0, index 0), so they depend on the recipe alone and never on `docId`". §14's `TOWN_ROOT` comment (l. 8292) points to §6.1. The emblem (l. 6588) is keyed by the same rule, and J-S27's index row (l. 9596) agrees. The consequence the archive gave — "a link or a copy of the document draws the same compass" — is kept (l. 6563–6564). |
| V-FIN-04 (= VR-R2-1) | determinism, repair-r3-determinism | **FIXED** | §6.1 l. 4177–4180: "keyed by a constant entity key — the four 32-bit-lane finalisers (as for the seed key) over the words (stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index — 0–3 for the class's four tiles, 4 for their shared border band) —, with `STAGE_VIEW` and reroll, attempt, epoch and salt 0". This is my r2 required change word for word. "(as for the seed key)" lands on "four 32-bit-lane finalisers with distinct salts" (l. 4117–4118), which is what the archive's "§6.1's four-lane finaliser over the words (…)" (archive l. 7744–7746) named. §8.10's pointer (l. 6260–6262) is unchanged and now lands on a stated derivation, and §8.10's "constant key words" (l. 6282, 6289) have their antecedent at the home. |
| V-FIN-03 (= VR-R2-3 = VDR2-1) | determinism, repair-r3-determinism | **FIXED** | §5.2 l. 4009: "F-CONTOUR† a contour crosses a shore [§4.2 S1, §8.2]". The first rung, the coast construction, is at §4.2 S1 (2) (l. 2675–2679), which points on to "§8.2's relief tier (F-CONTOUR, §5.2)". The second, the clip, is computed at §8.2 (l. 5719–5722, RENDERING-084), which points back "(F-CONTOUR, §5.2; the coast construction is §4.2 S1 (2))". The rest of the row is unchanged (word diff). |
| V-FIN-05 (= V-SCOPE-R2-01; r2 O1) | scope, repair-r3-scope | **FIXED** | §16 M2b exit (l. 8645): "…the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7); the `lit` export beside a moving `path` sun (§12.7); the METROPOLIS SVG budget (§12.7); …". The criterion lands on §12.7's *Export beside the view* run, "from M2b, where `lit` ships, a `lit` export of a CITY while a `path` sun advances one step per frame" (l. 7410–7414). NR5-1's only executed check therefore gates M2b. |
| V-FIN-02 (= P2-1 = V-SCOPE-R2-02) | scope, repair-r3-scope | **FIXED**; no fact of this part | §13.2 l. 7687–7688: "walled share inside its rung band, §4.2 S2". The bullet's re-wrap (l. 7687–7711) changes no other word. None of this part's 19 pointers into §13.2 lands in l. 7687–7711 (§6). |
| V-FIN-07 | pipeline, repair-r3-pipeline | **FIXED**; ripple checked | §4.2 S1 (1) l. 2658: "the stored raster (at §2.3's resolution per rung)". §12.4's S1 row (l. 7218, RENDERING-516) points to "§4.2 S1 (1), (3)". Through it, the archive row's "stored 8 m raster" reaches §2.3 l. 656 ("TOWN 5 m, CITY 8 m, METROPOLIS 10 m") in two hops. The value is stated once, and this part restates no per-rung resolution. |
| VR-R2-1, VR-R2-2, VR-R2-3 (r2) | — | **FIXED** | as V-FIN-04, V-FIN-01 and V-FIN-03 above |

## 4. Open items routed to this part (NR5-1, NR5-2, NR5-3)

| item | verdict | evidence |
|---|---|---|
| NR5-1 | **FIXED** | No r3 hunk lies in its places; its run now gates M2b (V-FIN-05). `TileRasterOpts.lightStep` beside `sun?` (l. 6162). The raster-export request carries the look and view state (l. 6148). §8.4 passes the drawn step "as `TileRasterOpts.lightStep` (§8.9)" (l. 5944). The run's pass criterion — the `lit` export byte-identical to "the export made with the sun stopped at the request's time" — is intact (l. 7412–7414). |
| NR5-2 | **FIXED** | Unchanged: `interface LabelRows { labels: LabelTable; strings: StringTable; geom: GeomTable }` (l. 6436), taken by `begin` and `place` (l. 6439–6440). |
| NR5-3 | **FIXED** | Unchanged: "6–9 % smaller than None's on the relief and textured looks (J-R53)" (l. 7409). |

## 5. Conflicts touching the part (canon), re-checked where round 3 touched their places

* **RENDERING-C01 / C02 / C03** — as NR5-2, NR5-1 and NR5-3 (§4). C02's M2b gate is now explicit.
* **RENDERING-C05** (the title) — §9.5 was replaced, but its title bullet is unchanged (l. 6577–6578). §9.1's "placed
  by §9.5's furniture rule (layer-order slot 24, §8.2)" (l. 6384–6385) lands.
* **RENDERING-C08** (the warp-preview band) — §12.6 was replaced, but "≥ 30 fps for a brush radius ≤ 150 m at the
  district band (§8.8)" (l. 7350) is unchanged, and so is §8.8's "frame rate: §12.6" (l. 6101).
* **RENDERING-C06, CANON-C06** — §5.2 was replaced for F-CONTOUR's bracket only. F-LABEL (l. 4019) still points to
  §9.4. GAP-2 is routed by validate.md §5 to the next design pass (J32), so it is not a deferral in this pass's text.
* **CANON-C05** — §12.4's header, "Each stage's mechanism is its stage section's (§4)", is unchanged. The S1 row's
  mechanism pointer still lands after V-FIN-07 (§3).
* **DETERMINISM-C-10** (the six rerollable concerns) — §6.1 l. 4144–4150 is unchanged. `style.compass` and
  `naming.emblem` are "read by the compass furniture program and the emblem generator, §9.5", which matches §9.5's two
  reroll events.
* **V-FIN-06** — the validator's conflict (§9.5 against §6.1) is resolved as ruled (§3).
* **RENDERING-C04, C07, CANON-C01, C03, C04, SCOPE-C01, SCOPE-C10, KERNEL-C13** — carried; their places were not
  replaced.

## 6. What round 3 changed, in this part and in the text it points to (receipts)

**Reproduction.** In `scratchpad/vr3/`: `r0.md` … `r3.md` with their sha256 in `shas.txt`, `r2-r3.diff` and
`r2-r3.wdiff` (the word diff). All seven hunks are one substitution each, exactly assemble-r3 §1's list. Two lie in this
part:

| hunk (lines) | place | change | bytes | fixes |
|---|---|---|---:|---|
| 6562 | §9.5 compass | "(§6.1, §14 `TOWN_ROOT` — the seed key alone)" → "(§6.1, §14 `TOWN_ROOT`)" | −23 | V-FIN-06 |
| 7330–7331 | §12.6 *Replay and load verification* | "…code path, the view stages once at the end (§7.3 item 2) — …" → "…code path, and the view stages run once at the end (§7.3 item 2) — …"; the sentence re-flowed over its two lines | +8 | V-FIN-01 |

The part went from 198 826 to 198 811 bytes and from 1 891 to 1 891 lines by this lane's count. The part's headings,
numbered items, anchors, J-ids (61) and D-ids are unchanged, and no number of the old lines is lost.

**The other parts' hunks, read for their effect on this part.**

| place (repair) | change | effect on this part |
|---|---|---|
| §4.2 S1 (1) l. 2658 (pipeline) | the per-rung resolution → "(at §2.3's resolution per rung)" | §12.4's S1 row lands; the 8 m CITY raster reached via §2.3 (RENDERING-516) |
| §5.2 l. 4009 (determinism) | F-CONTOUR "[§4.2 S1]" → "[§4.2 S1, §8.2]" | a new pointer into §8.2's relief tier, which states the clip (RENDERING-084; VR-R2-3 fixed) |
| §6.1 l. 4177–4181 (determinism) | the stamp-tile key's derivation stated | §8.10's pointer lands on it (RENDERING-286; VR-R2-1 fixed) |
| §13.2 l. 7687–7711 (scope) | "walled share inside its rung band, §4.2 S2"; bullet re-wrapped | none: no pointer from this part lands in the range, and the range holds none into it |
| §16 l. 8645 (scope) | M2b exit gains "the `lit` export beside a moving `path` sun (§12.7)" | a new pointer into §12.7 (RENDERING-575; r2 O1 closed) |

**Pointers, both directions** (`ptrs.txt`, `pother.txt`, `p16.txt`):

* **From the part into the other replaced subsections: 25** — §6.1 ×10, §13.2 ×7, §4.2 ×4, §16 ×3, §5.2 ×1.
  * Each was read at its target.
  * Two cite text that round 3 changed, and both now land fully: §8.10's "components of §6.1's registry entry" (l. 6261)
    and §8.2's "(F-CONTOUR, §5.2; the coast construction is §4.2 S1 (2))" (l. 5722).
  * §12.4's "§4.2 S1 (1), (3)" (l. 7218) lands through §2.3 (V-FIN-07).
* **From anywhere in the document into §9.5 and §12.6: 47** — 28 and 19.
  * None cites l. 6562's removed words or l. 7330–7331, except the compass-and-emblem mentions in §6.1 (l. 4121, 4148)
    and J-S27's index row (l. 9596). All three agree with the new §9.5 wording.
* **From the other replaced subsections into this part: 110** — §4.2 ×7, §5.2 ×7, §6.1 ×11, §13.2 ×19, §16 ×66.
  * Two are new, §5.2 → §8.2 and §16 → §12.7. Both were read, and both land on the statement they name.
  * The other 108 have unchanged words at both ends (word diff) and targets outside the two changed lines of this part.
    The ids they cite therefore keep their r2 verdicts. Among them are the M2b row's fourteen other pointers into this
    part, M2a's §12.6 / §12.8 pointers and M3a's warp pointers (l. 8644–8646).

## 7. Mechanical checks (executed)

* **References.** `assemble-r0-refs.py` on the current document gives 134 headings, 35 D-ids and 276 J-index rows, with
  2 unresolved pointers, both external: l. 2036 (`os-geometry.md` §2.1.4) and l. 6826 (RFC 7946 §3.1.6, in this part).
  This is the same result as in r0–r2 (`refs-r3.json`).
* **Document checks.** The command was `python3 docs/validation/bench/doc_checks.py --sections "8,9,11,12"` with the allow
  file, run 21:37–21:39 on a corpus of 9 626 JSON files, 835 966 C3 3-grams and 478 C4 lists. Results: C1 5 / 0, C2 0 / 0,
  **C3 113 / 27**, C4 1 / 0, S1 0 / 0, S2 0 / 0 (hits / unreviewed), exit 1. The 27 unreviewed C3 runs are corpus growth,
  not text. Three checks show this:
  * A one-load comparison (`c3multi.py`) raises identical hit multisets on the r2 and the r3 document (113 / 27 each).
  * Every one of the 27 runs needs a 3-gram found only in files written after assemble-r3's final run (20:24):
    `research/findings/dwellings-synthesis.md` (21:14) and `research/findings/_critic-dwellings.md` (20:58).
  * 24 of the 27 occur contiguously in neither file, so they are stitched from common 3-grams. The other three are an
    ordinary phrase, our own emblem clause and our own unit pair: "equals the union of the", "s entity key with the" and
    "5 ft 1 5 m".
  * None is a list, table row, grammar or palette. See O1.
* **J- and D-ids.** The part holds 61 distinct J-ids: 56 J-R plus J-DET-42, J-I2, J-I9, J-P28 and J-S19. Each has an
  index row and a Part A row. D-7, D-8, D-18 and D-31 resolve. `docs/ARCHITECTURE-RATIONALE.md` is unchanged since 16:23,
  and round 3 touched no index row.
* **Markers, deferral, narration, tags.**
  * Markers: 0 "PENDING FABLE REVIEW" lines in the part; the document keeps its one banner (l. 3).
  * Deferral words: "later" ×4 (l. 5794, 6484, 6608, 7221), "pending" ×5 (l. 5934, 6068, 6195, 6930, 6982) and
    "undecided" ×1 (l. 6452). All are technical uses, on the same lines as in r2.
  * No TBD, TODO, "deferred", "open question", "future", "not yet", "for now" or "postpone".
  * Round narration: 0. Fix-round tags: 0. "VS27" (l. 5840) is the coverage id's short form, as before.
* **One statement each** (scripted counts):
  * "the seed key alone": 0 in the document (1 in the non-normative rationale's J-S27).
  * "four 32-bit-lane finalisers": 2 — the seed key (l. 4118) and the stamp-tile key "as for the seed key" (l. 4177).
  * "S14 and S13b run once at the end": 1 (§7.3 item 2). "the view stages run once at the end": 1 (§12.6).
  * The `lit`-export criterion: 1 (§16 M2b), pointing to §12.7's run.
  * "≈ 35–38 ms": 1 (§12.6).
  * The VTT grid default: 2 (§11.1, §9.5) → VR-R3-2.
  * "≤ 2 µs per re-derived": 2 (§6.3, point-anchored; §12.6) → VR-R3-1.
* **Size.** The part is 198 811 bytes, 81.1 % of the archived 245 128 (r2 by the same count: 198 826).

## 8. Observations (not raised; each a ruling)

* **O1 — the live corpus fails the part's `doc_checks` run with 27 false positives (§7).**
  * No text caused them, and they are not document defects.
  * This verify seat does not write `docs/validation/doc-checks-allow.tsv`. The closing seat's `doc_checks` run must
    review the hits of its own run, or run after the dwellings lanes land, as assemble-r3 §6 already warned.
  * The 27 runs and their attributions are in `scratchpad/vr3/dc-part.out`, `c3attrib.json` and `c3contig.txt`.
* **O2 — descriptive overlaps between §8.2 / §8.3 / §8.9 and §9.5 are ruled not defects.** Three pairs:
  * The `ink` preset row names "scale bar with old-style figures, 8-ray compass" (l. 5819).
  * §8.3's "from which the legend is generated (O12 d)" (l. 5853) sits beside §9.5's "symbol key generated from the
    registry (O12 d)".
  * §8.9's "shows the unsnapped point until the answer arrives" (l. 6220) sits beside §9.5's (l. 6594).

  Each names an element where it is used: a preset's contents, a legend's parts, and a ruler clause beside its pointer
  to §8.9's snap query (validate.md §3 (ii)). The canon maps each pair both ways. None restates a default value against
  a recorded single-source decision, which is what makes VR-R3-2 an issue. Vetoable: for strict single sourcing, the
  preset row's "8-ray compass" could read "compass (§9.5)".
* **O3 — §13.2's cost-model list names only "the pan-and-zoom run during an A2 300-dpi export (§12.7)"** (l. 7670).
  The `lit` export beside a moving sun is the same §12.7 run from M2b, and §16's M2b exit now gates it. The list is a
  pointer list, not a schedule, so no change is needed.
* **O4 — l. 6562 was not re-flowed after the deletion.** The line is short; this is cosmetic.
* **O5 — §5.2's † sentence says "the section", while F-CONTOUR now names two.** The plural reading is natural, and
  validate.md prescribed the wording. No change.
* **O6 — how VR-R3-1 and VR-R3-2 escaped r0–r2.**
  * My numbers-beside-pointers scan tested only that a restated number occurs in its target, not that its qualifier and
    every value do.
  * No round diffed the within-part *Homes chosen* list of `rewrite-rendering.md` against the text.
  * A future verify round should do both: compare restated values word by word, as r2 O4 said, and check that each
    *Homes chosen* item is stated once.
* **Carried from r2 (unchanged by round 3):**
  * O2: §12.4's S11 row "(25 + 15)".
  * O3: §4.2 S1 (2)'s property sentence (l. 2678–2679).
  * S10 (0)'s ≈ 5.3 ms, and the ≈ 2.3 ms stated at both §3.3 and §12.4.
  * An uncached export crown set is held from the export's start.
  * The audit-id (tag) convention awaits the validator's or Fable's ruling.
  * Derived numbers sit beside pointers.
  * §7.4's rebases restate §2.9 step 4.
  * GAP-2, now routed by validate.md §5 with a recommended ranking.
  * The `title` entity's missing `LabelTable` row; §8.2's and §8.10's glosses; §15.2's O12 row.

## 9. Checked list — every inventory id

Columns: the r2 verdict (r2 §9) and the r3 scope. The scopes are:
* **text changed** — the id's text lies on a line round 3 changed; re-read against the archive and r2.
* **home §x replaced** — its text lies in §9.5 or §12.6 on unchanged lines (the diff proves them byte-identical to r2);
  re-read.
* **J-pointer in §x (replaced)** — a rationale pointer inside a replaced subsection; the pointer is present.
* **target §x replaced** — a pointer target, canon home or restatement place lies in a replaced subsection; re-read at the
  target. "(this part)" marks §9.5 and §12.6. "(current-text pointer)" marks a pointer that the current text holds but
  the inventory record does not name.
* **re-checked (…)** — tied to a round-3 fix or an open item.
* **carried** — r2's verdict stands.

Then the r3 verdict and a note. Line numbers are the current document's.

| id | kind | r2 verdict | r3 scope | r3 verdict | note |
|---|---|---|---|---|---|
| RENDERING-001 | summary | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-002 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-003 | type | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-004 | type | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-005 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-006 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-007 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-008 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-009 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-010 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-011 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-012 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-013 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-014 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-015 | interface | OK | target §6.1 replaced | OK | §6.1's only r3 change is the `render.stampTiles` entry's key derivation (l. 4177–4181); the rerollable concerns' salts (l. 4144–4157) unchanged; §8.1 l. 5511 lands |
| RENDERING-016 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-017 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-018 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-019 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-020 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-021 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-022 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-023 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-024 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-025 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-026 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-027 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-028 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-029 | mechanism | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-030 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-031 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-032 | rule | OK | target §6.1 replaced (current-text pointer) | OK | §6.1's only r3 change is the `render.stampTiles` entry's key derivation (l. 4177–4181); §8.1 item 5's "the concern's salt (§6.1)" (l. 5555) lands on the salt component (l. 4144), unchanged |
| RENDERING-033 | defined-term | OK | target §6.1 replaced | OK | §6.1's only r3 change is the `render.stampTiles` entry's key derivation (l. 4177–4181); "the entity key (§6.1)" (l. 5554) lands on l. 4119–4120; §6.1's decoration bullet (l. 4191–4193) points back to §8.1 item 5; unchanged |
| RENDERING-034 | defined-term | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-035 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-036 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-037 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-038 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-039 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-040 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-041 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-042 | decision | OK | J-row / F.5 (target §6.1 replaced) | OK | J-R19 index row unchanged; §6.1's only r3 change is the `render.stampTiles` entry's key derivation (l. 4177–4181); the birthday bound (l. 4186) unchanged |
| RENDERING-043 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-044 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-045 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-046 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-047 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-048 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-049 | defined-term | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-050 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-051 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-052 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-053 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-054 | evidence | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-055 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-056 | rule | OK | target §6.1 replaced | OK | §6.1's only r3 change is the `render.stampTiles` entry's key derivation (l. 4177–4181); `style.random`'s registry entry (l. 4175–4176: creation index = the `setStyle` event's `seq`, attempt 0–2) outside the hunk, unchanged |
| RENDERING-057 | algorithm-step | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-058 | history | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-059 | evidence | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-060 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-061 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-062 | number | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-063 | evidence | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-064 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-065 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-066 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-067 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-068 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-069 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-070 | evidence | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-071 | number | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-072 | number | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-073 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-074 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-075 | defined-term | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-076 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-077 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-078 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-079 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-080 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-081 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-082 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-083 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-084 | rule | OK — VR-R1-4 FIXED | re-checked (V-FIN-03) | OK — VR-R2-3 (V-FIN-03) FIXED | F-CONTOUR† now "[§4.2 S1, §8.2]" (l. 4009): the coast construction at §4.2 S1 (2) (l. 2675–2679, which points on to §8.2) and the clip at §8.2's relief tier (l. 5719–5722, this id), which points back "(F-CONTOUR, §5.2; the coast construction is §4.2 S1 (2))"; the row's ladder and test unchanged |
| RENDERING-085 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-086 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-087 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-088 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-089 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-090 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-091 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-092 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-093 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-094 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-095 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-096 | number | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-097 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-098 | rule | OK | target §9.5 replaced (this part) | OK | "screen-space furniture drawn by the main thread over the composed tiles (§9.5)" (l. 5797) lands; §9.5's only r3 change is l. 6562 (the compass key's appositive) |
| RENDERING-099 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-100 | algorithm-step | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-101 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-102 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-103 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-104 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-105 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-106 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-107 | acceptance-bar | OK | target §16 replaced | OK | §16's only r3 change is the M2b insertion (l. 8645); M2b's "B-ZOOM role continuity across every band switch of `ink` and `lit`" and the M3b and M5 rows unchanged |
| RENDERING-108 | number | OK | target §9.5 replaced (this part) | OK | the ink preset row (l. 5819) names "scale bar with old-style figures, 8-ray compass" = §9.5 l. 6559, 6561 — ruled not a defect (§8, O2); §9.5's only r3 change is l. 6562 (the compass key's appositive) |
| RENDERING-109 | number | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-110 | number | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-111 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-112 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-113 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-114 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-115 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-116 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-117 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-118 | rule | OK | target §16 replaced | OK | §16's only r3 change is the M2b insertion (l. 8645); "`lit` on Canvas2D at all four bands with our procedural texture set (≈ 1 pw)" unchanged |
| RENDERING-119 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-120 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-121 | rule | OK | target §9.5 replaced (this part) | OK | "screen-space furniture (§9.5)" (l. 5852) lands; §9.5's only r3 change is l. 6562 (the compass key's appositive) |
| RENDERING-122 | rule | OK | target §9.5 replaced (this part) | OK | l. 5853 unchanged; §9.5's legend "symbol key generated from the registry (O12 d)" agrees (§8, O2); §9.5's only r3 change is l. 6562 (the compass key's appositive) |
| RENDERING-123 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-124 | defined-term | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-125 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-126 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-127 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-128 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-129 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-130 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-131 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-132 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-133 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-134 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-135 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-136 | test | OK | target §13.2 replaced | OK | §13.2's only r3 change is the `wealthLevel` sweep's qualifier (l. 7687–7688; the bullet re-wrapped to l. 7711, one substitution by word diff); the stage contract tests (l. 7675–7682: the census and view-data contracts are §8.3's) unchanged |
| RENDERING-137 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-138 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-139 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-140 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-141 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-142 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-143 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-144 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-145 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-146 | test | OK | target §13.2 replaced | OK | §13.2's only r3 change is the `wealthLevel` sweep's qualifier (l. 7687–7688; the bullet re-wrapped to l. 7711, one substitution by word diff); "The stamp-tile asset's hash and rebuild tests … are §8.3's; the shipped stamp tiles pass §8.3's seam check (§8.10)" (l. 7681–7682) unchanged |
| RENDERING-147 | test | OK — VR-R0-12 FIXED | carried | OK — VR-R0-12 FIXED | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-148 | test | OK | target §5.2 replaced | OK | §5.2's only r3 change is F-CONTOUR's bracket (l. 4009); F-SKELETON (l. 4018) unchanged — its plain roof is §8.3's census row |
| RENDERING-149 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-150 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-151 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-152 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-153 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-154 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-155 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-156 | rule | OK | target §4.2 replaced | OK | §4.2's only r3 change is S1 (1)'s resolution pointer (l. 2658); S1 (2)'s floating-island outline (l. 2679–2684) unchanged; §8.4 l. 5904 lands |
| RENDERING-157 | defined-term | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-158 | defined-term | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-159 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-160 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-161 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-162 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-163 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-164 | number | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-165 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-166 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-167 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-168 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-169 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-170 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-171 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-172 | mechanism | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-173 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-174 | defined-term | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-175 | acceptance-bar | OK | target §16 replaced (M2b) | OK | §16's only r3 change is the M2b insertion (l. 8645); "the moving-sun step budget (§8.4); the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7)" unchanged, the new criterion follows it; §12.7's crown-library bullet (l. 7370–7377) unchanged |
| RENDERING-176 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-177 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-178 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-179 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-180 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-181 | defined-term | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-182 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-183 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-184 | algorithm-step | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-185 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-186 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-187 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-188 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-189 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-190 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-191 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-192 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-193 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-194 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-195 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-196 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-197 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-198 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-199 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-200 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-201 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-202 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-203 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-204 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-205 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-206 | acceptance-bar | OK | home §9.5 replaced | OK | §9.5's only r3 change is l. 6562 (the compass key's appositive); the scale bar (l. 6559–6560: a 100 m bar accurate to 0.5 % at every zoom, O6 c) unchanged; §8.7 l. 6033 "The scale bar's accuracy is §9.5's" lands |
| RENDERING-207 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-208 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-209 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-210 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-211 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-212 | mechanism | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-213 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-214 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-215 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-216 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-217 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-218 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-219 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-220 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-221 | evidence | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-222 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-223 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-224 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-225 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-226 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-227 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-228 | mechanism | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-229 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-230 | rule | OK | target §12.6 replaced (this part) | OK | §8.8's "frame rate: §12.6" (l. 6101) lands on the warp bullet (l. 7350); §12.6's only r3 change is the replay sentence (l. 7330–7331) |
| RENDERING-231 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-232 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-233 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-234 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-235 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-236 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-237 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-238 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-239 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-240 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-241 | rule | OK | target §9.5 replaced (this part) | OK | "(§9.5; placement scores and ruler snaps asked of the tile worker)" (l. 6134) lands; §9.5's only r3 change is l. 6562 (the compass key's appositive) |
| RENDERING-242 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-243 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-244 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-245 | interface | OK | target §9.5 replaced (this part) | OK | "≤ 16 candidate boxes: the compass's eight, the title's and the legend's four corners" (l. 6146) = §9.5's candidates; §9.5's only r3 change is l. 6562 (the compass key's appositive) |
| RENDERING-246 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-247 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-248 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-249 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-250 | type | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-251 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-252 | interface | OK — VR-R0-1 FIXED | carried | OK — VR-R0-1 FIXED | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-253 | algorithm-step | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-254 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-255 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-256 | number | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-257 | mechanism | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-258 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-259 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-260 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-261 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-262 | mechanism | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-263 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-264 | rule | OK | target §9.5 replaced (this part) | OK | "Compass, title and legend placement (§9.5)" (l. 6214) lands; §9.5's only r3 change is l. 6562 (the compass key's appositive) |
| RENDERING-265 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-266 | rule | OK | target §9.5 replaced (this part) | OK | l. 6219–6221 unchanged; §9.5's measure tool (l. 6593–6594) repeats "the unsnapped point shown until the answer arrives" beside its pointer to §8.9's snap query (validate.md §3 (ii)); §9.5's only r3 change is l. 6562 (the compass key's appositive) |
| RENDERING-267 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-268 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-269 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-270 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-271 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-272 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-273 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-274 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-275 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-276 | rule | OK — VR-R0-11 FIXED | carried | OK — VR-R0-11 FIXED | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-277 | rule | OK | target §6.1 replaced | OK | §6.1's only r3 change is the `render.stampTiles` entry's key derivation (l. 4177–4181); `render.instances` (l. 4147, 4175) unchanged |
| RENDERING-278 | number | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-279 | defined-term | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-280 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-281 | invariant | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-282 | evidence | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-283 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-284 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-285 | rule | OK | target §6.1 replaced | OK | §6.1's only r3 change is the `render.stampTiles` entry's key derivation (l. 4177–4181); the entry keeps "read by `@plat/kernel`'s `poisson` builder when `plat/tools/stamptiles/` builds the shipped asset, and in a worker only by the fallback rebuild of a tile whose hash differs" (l. 4180–4181, re-wrapped, same words); §8.10 l. 6258–6260 unchanged |
| RENDERING-286 | rule | VR-R2-1 (VR-R1-3 (a) FIXED) | home §6.1 replaced (text changed) | OK — VR-R2-1 (V-FIN-04) FIXED | l. 4177–4180: "keyed by a constant entity key — the four 32-bit-lane finalisers (as for the seed key) over the words (stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index — 0–3 …, 4 …) —, with `STAGE_VIEW` and reroll, attempt, epoch and salt 0"; "(as for the seed key)" lands on l. 4117–4118 ("four 32-bit-lane finalisers with distinct salts"); = archive l. 7744–7747's "§6.1's four-lane finaliser over the words (…)"; §8.10 (l. 6260–6262) points to "components of §6.1's registry entry", and its "constant key words" (l. 6282, 6289) now have their antecedent at the home |
| RENDERING-287 | algorithm-step | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-288 | algorithm-step | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-289 | algorithm-step | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-290 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-291 | number | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-292 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-293 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-294 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-295 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-296 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-297 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-298 | history | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-299 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-300 | algorithm-step | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-301 | algorithm-step | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-302 | invariant | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-303 | defined-term | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-304 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-305 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-306 | algorithm-step | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-307 | algorithm-step | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-308 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-309 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-310 | rule | OK | target §6.1 replaced | OK | §6.1's only r3 change is the `render.stampTiles` entry's key derivation (l. 4177–4181); "§6.1's structured components" (l. 6322) land on l. 4132–4163, unchanged; `style.crowns` rerollable (l. 4147) |
| RENDERING-311 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-312 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-313 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-314 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-315 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-316 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-317 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-318 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-319 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-320 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-321 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-322 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-323 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-324 | summary | OK | target §9.5 replaced (this part) | OK | the §9 intro's furniture sentence (l. 6358–6359) unchanged; §9.5's only r3 change is l. 6562 (the compass key's appositive) |
| RENDERING-325 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-326 | interface | OK | target §9.5 replaced (current-text pointer) | OK | "the title is placed by §9.5's furniture rule (layer-order slot 24, §8.2)" (l. 6384–6385) lands on l. 6577–6578; §9.5's only r3 change is l. 6562 (the compass key's appositive) |
| RENDERING-327 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-328 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-329 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-330 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-331 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-332 | rule | OK | target §6.1 replaced | OK | §6.1's only r3 change is the `render.stampTiles` entry's key derivation (l. 4177–4181); the decoration bullet (l. 4194–4196: positional overrides carried with the ground, §7.4) unchanged |
| RENDERING-333 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-334 | test | OK | target §13.2 replaced | OK | §13.2's only r3 change is the `wealthLevel` sweep's qualifier (l. 7687–7688; the bullet re-wrapped to l. 7711, one substitution by word diff); the per-stop placement digests as S13b's contract test (l. 7679–7681) unchanged |
| RENDERING-335 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-336 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-337 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-338 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-339 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-340 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-341 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-342 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-343 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-344 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-345 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-346 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-347 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-348 | algorithm-step | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-349 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-350 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-351 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-352 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-353 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-354 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-355 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-356 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-357 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-358 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-359 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-360 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-361 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-362 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-363 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-364 | algorithm-step | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-365 | acceptance-bar | OK — VR-R0-13 FIXED | carried | OK — VR-R0-13 FIXED | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-366 | rule | OK | target §5.2 replaced | OK | §5.2's only r3 change is F-CONTOUR's bracket (l. 4009); F-SKELETON's "label spines (§9.3) … a sampled medial axis" (l. 4018) unchanged |
| RENDERING-367 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-368 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-369 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-370 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-371 | algorithm-step | OK | target §5.2 replaced | OK | §5.2's only r3 change is F-CONTOUR's bracket (l. 4009); F-LABEL† "[§9.4]" (l. 4019) unchanged; rung (7)'s "(§9.5)" (l. 6529) lands on the legend bullet, unchanged |
| RENDERING-372 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-373 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-374 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-375 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-376 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-377 | evidence | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-378 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-379 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-380 | acceptance-bar | OK | target §5.2 replaced | OK | §5.2's only r3 change is F-CONTOUR's bracket (l. 4009); F-LABEL's test cell (l. 4019) unchanged |
| RENDERING-381 | acceptance-bar | OK | target §9.5 replaced (this part) | OK | "the default framing percentile (§9.5)" (l. 6554) lands on l. 6596–6598 (the 95th percentile); §9.5's only r3 change is l. 6562 (the compass key's appositive) |
| RENDERING-382 | history | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-383 | acceptance-bar | OK | home §9.5 replaced | OK | §9.5's only r3 change is l. 6562 (the compass key's appositive); the scale bar bullet (l. 6559–6560) unchanged (diff) |
| RENDERING-384 | rule | OK | text changed | OK — V-FIN-06 FIXED | l. 6561–6563: "keyed from the town root's entity key (§6.1, §14 `TOWN_ROOT`) with the concern `style.compass` and that concern's salt"; " — the seed key alone" deleted (0 hits in the document); §6.1 l. 4120–4123 defines the key ("the seed key mixed with the fixed town lineage …, so they depend on the recipe alone and never on `docId`"); §14 l. 8292 points to §6.1; the emblem (l. 6588) uses the same key; J-S27's rationale row keeps "depends on the seed key alone"; 8 rays, the logged `rerollLayer('style.compass')` and "a link or a copy of the document draws the same compass" kept — a canon-home reconciliation (validate.md V-FIN-06), not a CHANGED |
| RENDERING-385 | algorithm-step | OK | home §9.5 replaced | OK | §9.5's only r3 change is l. 6562 (the compass key's appositive); auto-placement (l. 6564–6569: 8 candidates, inset 24 px, weights 3 / 3 / 1 / 1 / 0.2 / 0, + 0.5 × the centre term, ties NE … W) unchanged; §8.9's "≤ 16 candidate boxes: the compass's eight …" (l. 6146) agrees |
| RENDERING-386 | rule | OK | home §9.5 replaced | OK | §9.5's only r3 change is l. 6562 (the compass key's appositive); dragging, the wheel, the `compass` view key and the `rotation` view key (l. 6569–6572) unchanged |
| RENDERING-387 | rule | OK | home §9.5 replaced | VR-R3-2 | l. 6573–6576 unchanged since r0; its "for VTT 1.5 m / 5 ft" (l. 6574) states the VTT grid default that the rewrite single-sourced at §11.1 (l. 6879, RENDERING-442; `rewrite-rendering.md` *Homes chosen* 5), with no pointer → VR-R3-2; the rest (kinds, the 1-2-5 default, colour role, < 12 px, skip water) is this id's own |
| RENDERING-388 | rule | OK | home §9.5 replaced | OK | §9.5's only r3 change is l. 6562 (the compass key's appositive); the title bullet (l. 6577–6578) unchanged; §9.1 l. 6384–6385 and PART II l. 9041 point to it |
| RENDERING-389 | rule | OK | home §9.5 replaced | OK | §9.5's only r3 change is l. 6562 (the compass key's appositive); the legend bullet (l. 6579–6583) unchanged; its "symbol key generated from the registry (O12 d)" beside §8.3 l. 5853 ruled not a defect (§8, O2) |
| RENDERING-390 | interface | OK | home §9.5 replaced | OK | §9.5's only r3 change is l. 6562 (the compass key's appositive); the emblem slot and the sanitising rule (l. 6584–6585) unchanged |
| RENDERING-391 | rule | OK | home §9.5 replaced | OK | §9.5's only r3 change is l. 6562 (the compass key's appositive); l. 6585–6589 unchanged — keyed from the town root's entity key with `naming.emblem`, now worded as the compass is (V-FIN-06); §6.1 l. 4147–4148 lists `naming.emblem` as rerollable, read by the emblem generator (§9.5) |
| RENDERING-392 | decision | OK | J-pointer in §9.5 (replaced) | OK | (J-R13) present (l. 6589); the J-R13 index row (l. 9526) and its Part A row unchanged (the rationale file unchanged since 16:23) |
| RENDERING-393 | rule | OK | home §9.5 replaced | OK | §9.5's only r3 change is l. 6562 (the compass key's appositive); l. 6590 unchanged |
| RENDERING-394 | rule | OK | home §9.5 replaced | OK | §9.5's only r3 change is l. 6562 (the compass key's appositive); the measure tool (l. 6591–6595: 8 px snap, §8.9's snap query, one frame) unchanged; §14 l. 8317 "(the measure tool, §9.5)" lands |
| RENDERING-395 | rule | OK | home §9.5 replaced | OK | §9.5's only r3 change is l. 6562 (the compass key's appositive); framing (l. 6596–6600: 95th percentile × 1.08) unchanged; §9.4 l. 6554's fallback (95 % → 85 %) lands |
| RENDERING-396 | rule | OK | target §6.1 replaced | OK | §6.1's only r3 change is the `render.stampTiles` entry's key derivation (l. 4177–4181); the entity key (l. 4119–4120) and the naming salts (l. 4153–4157) unchanged |
| RENDERING-397 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-398 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-399 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-400 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-401 | summary | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-402 | rule | OK | target §13.2 replaced | OK | §13.2's only r3 change is the `wealthLevel` sweep's qualifier (l. 7687–7688; the bullet re-wrapped to l. 7711, one substitution by word diff); "export → import → export is byte-identical over the canonical form (O9 a, O11 c)" (l. 7673–7674) unchanged; §11.1 l. 6803 lands |
| RENDERING-403 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-404 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-405 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-406 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-407 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-408 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-409 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-410 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-411 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-412 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-413 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-414 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-415 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-416 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-417 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-418 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-419 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-420 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-421 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-422 | algorithm-step | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-423 | number | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-424 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-425 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-426 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-427 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-428 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-429 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-430 | mechanism | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-431 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-432 | mechanism | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-433 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-434 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-435 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-436 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-437 | evidence | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-438 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-439 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-440 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-441 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-442 | rule | OK | target §9.5 replaced (this part) | VR-R3-2 | home §11.1 (l. 6878–6882: "default 1 square = 5 ft = 1.5 m at 100 px, so ≈ 123 m"; ≤ 8 192 px; ≥ 50 px per square; 0 px per cell) unchanged; §9.5's grid bullet restates the default "1.5 m / 5 ft" with no pointer (l. 6574) → VR-R3-2 |
| RENDERING-443 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-444 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-445 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-446 | type | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-447 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-448 | type | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-449 | type | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-450 | type | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-451 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-452 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-453 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-454 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-455 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-456 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-457 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-458 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-459 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-460 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-461 | defined-term | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-462 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-463 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-464 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-465 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-466 | rule | OK | target §9.5 replaced (this part) | OK | the view-state list (§2.9 l. 1517, MODEL-428) and §9.5's "view state (§11.3)" (l. 6570) unchanged; §9.5's only r3 change is l. 6562 (the compass key's appositive) |
| RENDERING-467 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-468 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-469 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-470 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-471 | rule | OK — VR-R0-6 FIXED | carried | OK — VR-R0-6 FIXED | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-472 | rule | OK — VR-R0-5 FIXED | carried | OK — VR-R0-5 FIXED | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-473 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-474 | rule | OK | target §5.2 replaced | OK | §5.2's only r3 change is F-CONTOUR's bracket (l. 4009); F-EDIT (l. 4022) unchanged |
| RENDERING-475 | rule | OK | target §16 replaced | OK | §16's only r3 change is the M2b insertion (l. 8645); the Staged note (l. 8701) unchanged; §11.4 l. 7037 points to the Staged section |
| RENDERING-476 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-477 | interface | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-478 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-479 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-480 | summary | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-481 | defined-term | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-482 | evidence | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-483 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-484 | defined-term | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-485 | defined-term | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-486 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-487 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-488 | rule | OK | target §13.2 replaced | OK | §13.2's only r3 change is the `wealthLevel` sweep's qualifier (l. 7687–7688; the bullet re-wrapped to l. 7711, one substitution by word diff); the cost-model tests (l. 7659–7671) unchanged |
| RENDERING-489 | budget | OK | target §13.2 replaced | OK | §13.2's only r3 change is the `wealthLevel` sweep's qualifier (l. 7687–7688; the bullet re-wrapped to l. 7711, one substitution by word diff); the cost-model tests (l. 7659–7671) unchanged |
| RENDERING-490 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-491 | rule | OK | target §16 replaced | OK | §16's only r3 change is the M2b insertion (l. 8645); §12.1's rule (l. 7094–7095) holds — §12.7's M2b `lit` run is now also in §16's M2b exit |
| RENDERING-492 | rule | OK | target §5.2 replaced | OK | §5.2's only r3 change is F-CONTOUR's bracket (l. 4009); F-BUDGET-TIME (l. 4021) unchanged, reporting only |
| RENDERING-493 | number | OK — VR-R1-5 FIXED | carried | OK — VR-R1-5 FIXED | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-494 | number | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-495 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-496 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-497 | evidence | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-498 | history | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-499 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-500 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-501 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-502 | budget | OK | target §13.2 replaced | OK | §13.2's only r3 change is the `wealthLevel` sweep's qualifier (l. 7687–7688; the bullet re-wrapped to l. 7711, one substitution by word diff); "§12.3's per-rung cost laws are fitted on the same runs" (l. 7664) unchanged |
| RENDERING-503 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-504 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-505 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-506 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-507 | acceptance-bar | OK | target §13.2 replaced | OK | §13.2's only r3 change is the `wealthLevel` sweep's qualifier (l. 7687–7688; the bullet re-wrapped to l. 7711, one substitution by word diff); nine sizes, five seeds each (l. 7659–7662) unchanged |
| RENDERING-508 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-509 | test | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-510 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-511 | evidence | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-512 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-513 | test | OK | target §13.2 replaced | OK | §13.2's only r3 change is the `wealthLevel` sweep's qualifier (l. 7687–7688; the bullet re-wrapped to l. 7711, one substitution by word diff); "the model max clause judged on re-timed outliers (§12.3)" (l. 7670) unchanged |
| RENDERING-514 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-515 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-516 | budget | OK | target §4.2 replaced (V-FIN-07) | OK | §12.4's S1 row (l. 7218) points to "§4.2 S1 (1), (3)"; S1 (1) now gives the stored raster "at §2.3's resolution per rung" (l. 2658) and §2.3 l. 656 states CITY 8 m — the archive row's "8 m raster" is stated once and reached in two hops; the 32 m fBm grid, the refinement plus one fine octave, the 2.5 m queries (l. 2657–2659), the 25 m hydrology grid (l. 2687) and the row's work figures unchanged |
| RENDERING-517 | budget | OK | target §4.2 replaced | OK | §4.2's only r3 change is S1 (1)'s resolution pointer (l. 2658); S2–S3 unchanged; the row (l. 7219) lands |
| RENDERING-518 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-519 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-520 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-521 | budget | OK — VR-R0-3 FIXED | carried | OK — VR-R0-3 FIXED | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-522 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-523 | budget | OK — VR-R0-2 FIXED | carried | OK — VR-R0-2 FIXED | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-524 | budget | OK — VR-R0-3 FIXED | carried | OK — VR-R0-3 FIXED | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-525 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-526 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-527 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-528 | rule | OK | target §6.1 replaced | OK | §6.1's only r3 change is the `render.stampTiles` entry's key derivation (l. 4177–4181); "≤ 0.1 µs per stream key" (l. 4129) unchanged; §12.4 l. 7238 lands |
| RENDERING-529 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-530 | history | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-531 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-532 | history | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-533 | acceptance-bar | OK | target §16 replaced | OK | §16's only r3 change is the M2b insertion (l. 8645); M0 (e)'s site-and-fields spike ("§12.4's mechanisms", "§12.4's coarsening", l. 8642) unchanged |
| RENDERING-534 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-535 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-536 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-537 | rule | OK — VR-R1-5 FIXED | carried | OK — VR-R1-5 FIXED | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-538 | decision | OK | target §16 replaced | OK | §16's only r3 change is the M2b insertion (l. 8645); M4's exit (l. 8648; SCOPE-467's restatement place) unchanged |
| RENDERING-539 | acceptance-bar | OK | target §13.2 replaced | OK | §13.2's only r3 change is the `wealthLevel` sweep's qualifier (l. 7687–7688; the bullet re-wrapped to l. 7711, one substitution by word diff); "the first map by size (§12.5)" (l. 7669) unchanged |
| RENDERING-540 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-541 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-542 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-543 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-544 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-545 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-546 | budget | OK | target §12.6 replaced (this part) | OK | §12.5 l. 7312 is the re-raster home; §12.6's "§12.5's re-raster rate" (l. 7319) unchanged; §12.6's only r3 change is the replay sentence (l. 7330–7331) |
| RENDERING-547 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-548 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-549 | budget | OK | home §12.6 replaced | OK | §12.6's only r3 change is the replay sentence (l. 7330–7331); scoped regeneration (l. 7318–7320) unchanged; "§12.5's re-raster rate" lands on l. 7312; PART II l. 9074 and 9087 point here |
| RENDERING-550 | budget | OK | home §12.6 replaced | OK | §12.6's only r3 change is the replay sentence (l. 7330–7331); l. 7321 unchanged; §3's "inside §12.6's plot-edit budget" (l. 1937) lands |
| RENDERING-551 | budget | OK | home §12.6 replaced | OK | §12.6's only r3 change is the replay sentence (l. 7330–7331); l. 7322–7326 unchanged; "§13.2's B-EDIT coarse-edit sequences" lands on l. 7712–7716, outside the §13.2 hunk |
| RENDERING-552 | acceptance-bar | OK | home §12.6 replaced | OK | §12.6's only r3 change is the replay sentence (l. 7330–7331); l. 7327–7328 unchanged; §13.2 l. 7669 ("flatness across rungs (§12.6)") and §16 M2b's "fixed-scope edit cost flat within ± 20 % from TOWN to METROPOLIS" (unchanged words) agree |
| RENDERING-553 | rule | OK — VR-R1-3 (b) FIXED; see VR-R2-2 | text changed | OK — V-FIN-01 (VR-R2-2) FIXED | l. 7329–7331: "… through the session's code path, and the view stages run once at the end (§7.3 item 2) — S13a's scoped delta at each event that re-derives names costs ≤ 3 ms per such event" (validate.md's exact text; word diff: "and" and "run" inserted, nothing else); §7.3 item 2 (l. 4866–4870) lists the four replay kinds and "Only the view stages wait: S14 and S13b run once at the end" = archive l. 9027–9030 |
| RENDERING-554 | budget | OK | text changed (wrap only) | VR-R3-1 (= VDR3-1) | l. 7331's lead-in re-wrapped with the replay sentence (same words); the law V (l. 7333) and its terms (l. 7335–7341) unchanged since r2 and archive-identical (archive l. 9033–9040); c(e)'s "succession matching (≤ 2 µs per re-derived entity, §6.3)" (l. 7337–7338) omits §6.3's "point-anchored" and "≤ 20 µs per overlap-anchored one" (l. 4432–4434) → VR-R3-1 |
| RENDERING-555 | budget | OK | home §12.6 replaced | OK | §12.6's only r3 change is the replay sentence (l. 7330–7331); the reference mix (l. 7341–7344) unchanged = `fixall_rendering_r2_budgets.out` (1 395 ms; 11 125 ms) |
| RENDERING-556 | history | OK | F.5 (history) | OK | verbatim in F.5; the rationale file unchanged since 16:23 (r3 touched no index row) |
| RENDERING-557 | rule | OK | home §12.6 replaced | OK | §12.6's only r3 change is the replay sentence (l. 7330–7331); the verification sentence (l. 7344–7347) unchanged; §2.9 step 3 (l. 1385–1389) and §16 M2a (l. 8644) point to §12.6's edit cost, unchanged |
| RENDERING-558 | acceptance-bar | OK | home §12.6 replaced | OK | §12.6's only r3 change is the replay sentence (l. 7330–7331); l. 7347–7349 unchanged; §16 M2a's "the verification reference mix within §12.6's V + 10 %" (l. 8644) unchanged |
| RENDERING-559 | decision | OK | J-pointer in §12.6 (replaced) | OK | (J-R36) present (l. 7349); the J-R36 index row (l. 9549) and its Part A row unchanged |
| RENDERING-560 | budget | OK | home §12.6 replaced | OK | §12.6's only r3 change is the replay sentence (l. 7330–7331); the warp bullet (l. 7350–7353) unchanged; §2.6 rule 4 (l. 963–967) and §8.8's "frame rate: §12.6" (l. 6101) point here |
| RENDERING-561 | acceptance-bar | OK | home §12.6 replaced | OK | §12.6's only r3 change is the replay sentence (l. 7330–7331); l. 7353–7356 unchanged; §16 M3a's "Apply within §12.6's budget … or §12.6's pre-decided fallback" (l. 8646) unchanged |
| RENDERING-562 | rule | OK | home §12.6 replaced | OK | §12.6's only r3 change is the replay sentence (l. 7330–7331); "Proxy thumbnails: §7.8's budget." (l. 7357) unchanged |
| RENDERING-563 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-564 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-565 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-566 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-567 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-568 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-569 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-570 | evidence | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-571 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-572 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-573 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-574 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-575 | acceptance-bar | OK — VR-R1-1 FIXED | re-checked (V-FIN-05) | OK — VR-R1-1 FIXED | §12.7 l. 7410–7414 unchanged since r2; §16's M2b exit now lists "the `lit` export beside a moving `path` sun (§12.7)" (l. 8645), so the run gates M2b (r2 O1 closed); M1's exit keeps "the pan-and-zoom run during an A2 export (§8.9, §12.7)" (l. 8643); §13.2's cost-model list (l. 7670) unchanged |
| RENDERING-576 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-577 | budget | OK — VR-R1-6 FIXED | carried | OK — VR-R1-6 FIXED | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-578 | budget | OK | target §13.2 replaced | OK | §13.2's only r3 change is the `wealthLevel` sweep's qualifier (l. 7687–7688; the bullet re-wrapped to l. 7711, one substitution by word diff); "the simulation module's occupancy test at M4b (§12.7)" (l. 7671) unchanged |
| RENDERING-579 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-580 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-581 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-582 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-583 | history | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-584 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-585 | rule | OK | target §12.6 replaced (this part) | OK | §12.8's verification-memory paragraph cites §2.9 step 3; §12.6's verification sentence (l. 7344–7347) unchanged; §12.6's only r3 change is the replay sentence (l. 7330–7331) |
| RENDERING-586 | acceptance-bar | OK — VR-R0-4 FIXED | target §12.6, §16 replaced | OK | §16's only r3 change is the M2b insertion (l. 8645); M2a (l. 8644) unchanged; the reference 300-edit CITY document = §12.6's reference mix (l. 7341–7343), unchanged |
| RENDERING-587 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-588 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-589 | rule | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-590 | budget | OK — VR-R0-9 FIXED | carried | OK — VR-R0-9 FIXED | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-591 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-592 | budget | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-593 | rule | OK — VR-R1-2 FIXED | carried | OK — VR-R1-2 FIXED | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-594 | acceptance-bar | OK | target §13.2, §16 replaced | OK | §13.2's only r3 change is the `wealthLevel` sweep's qualifier (l. 7687–7688; the bullet re-wrapped to l. 7711, one substitution by word diff); "the memory test per rung (§12.8)" (l. 7669) unchanged; §16's only r3 change is the M2b insertion (l. 8645); M1, M2a and M2b's memory criteria unchanged |
| RENDERING-595 | acceptance-bar | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-596 | evidence | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-597 | evidence | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-598 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-599 | decision | OK | carried | OK | home and targets outside every r3-replaced subsection; r2 verdict stands (r2 §9) |
| RENDERING-C01 | conflict | OK | re-checked (NR5-2) | OK | NR5-2 still FIXED (§4): `LabelRows` l. 6436, `begin` / `place` l. 6439–6440; no r3 hunk in §9.2, §8.1 or §14 |
| RENDERING-C02 | conflict | OK | re-checked (NR5-1; V-FIN-05) | OK | NR5-1 still FIXED (§4); its §12.7 run now gates M2b (§16 l. 8645) |
| RENDERING-C03 | conflict | OK | re-checked (NR5-3) | OK | NR5-3 still FIXED: "6–9 % smaller than None's" (l. 7409); §12.7 not replaced in r3 |
| RENDERING-C04 | conflict | OK | carried | OK | §12.1 and §8.8 not replaced; r2 verdict stands (r2 §9) |
| RENDERING-C05 | conflict | OK | home §9.5 replaced | OK | §9.1 l. 6384–6385 and §9.5's title bullet (l. 6577–6578) unchanged |
| RENDERING-C06 | conflict | OK | target §5.2 replaced | OK | F-LABEL (l. 4019) unchanged, pointing to §9.4; GAP-2 is routed by validate.md §5 to the next design pass (J32) — no deferral wording in the text |
| RENDERING-C07 | conflict | OK | carried | OK | §12.5 and §12.2 not replaced; r2 verdict stands (r2 §9) |
| RENDERING-C08 | conflict | OK | home §12.6 replaced | OK | the warp bullet "≥ 30 fps for a brush radius ≤ 150 m at the district band (§8.8)" (l. 7350) unchanged; §8.8's "frame rate: §12.6" (l. 6101) unchanged |
