# verify-pipeline-r2 — lane amendments-b/verify-pipeline-r2 (re-verify the PIPELINE part after repair round 2)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-pipeline-r2).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 skeleton: done (2026-09-27)
> STEP 1 inputs read (assemble-r2, verify-pipeline-r1, repair-pipeline-r2 report, other-part r1 issues routed to pipeline): done
> STEP 2 part diff (pre-repair-r2 archive vs live) and repaired subsections read whole: done (28 hunks; §4.1, §4.7, §4.9, §4.11, II.6, II.7.3, II.7.4 read whole)
> STEP 3 per-issue re-check of the r2 pipeline repairs + r1 issues owned elsewhere: done (findings drafted in scratchpad vp2/)
> STEP 4 per-item verdicts re-judged: done (§2–§4 written)
> STEP 5 checks: done (§5 written)
> STEP 6 issue list: done (13 issues, all minor: pipeline 4, determinism 3, model 1, scope 5)
> STEP 7 Fable queue row + LANDED line: done (row B-amendments-b/verify-pipeline-r2 appended; LANDED line written)

Lane `amendments-b/verify-pipeline-r2`, 2026-09-27. Part verified: PIPELINE (`## §4 `, `## §10 `, `# PART II`, `## II.`,
`# PART III`) of `docs/ARCHITECTURE.md` at sha256 `831efd429092adf3849b6eec3cd8703816c790ae53404a96b4cb3c23166be584`
(assemble-r2's installed hash).

## 0 Outcome

The repair holds. All 18 issues routed to the pipeline in round 2 (VP1-01, -02, -04, -05, -06, -07, -09, -10, -12, -13,
-14, -15, -16, V-MAB1-02, V-MAB1-04, VD1-03, VD1-14, VD1-15) are fixed in the live text, each quoted in §2, and the five
issues of my r1 report owned by other parts (VP1-03, -08, -11, -17, -18) are fixed too (§3). Every item routed here is now
PRESENT (§4). The retired texts are gone (33 probes, §5), the resolver finds no broken reference in the part, and no
deferral wording entered.

**13 issues remain, all minor (0 blocker, 0 major):** 4 pipeline, 3 determinism, 1 model, 5 scope (§6). They are residues
of the round's new mechanism, not regressions. The generation fill (J-A28.46) leaves two count statements loose: S10b's
"at most" beside S11's clamp into [1, capacity], and three static-baseline sentences that ignore the overflow pass
(VP2-01 in §4.7 and §10.2, VP2-08 in §2.6, VP2-09 in T19-4). Two §5.2 rows trail it: F-PLAN still says "S10b's fill"
(VP2-06), and F-SITING's detection has no post-S11 overflow clause (VP2-07). The tunnel stretch split (J-A11.43) leaves
three records that name the tunnel un-re-pointed — the blocks' `Frontage` records, `AccessPoint.under.tunnel` and
`Tunnel.chambers` — and lets a plot's frontage straddle two records against U1 (VP2-04). §6.3 does not state the split's
identity form (VP2-05). §4.11 does not re-band the model's new `Plot.fieldBand`, which §2.5 says it does (VP2-02), and
§4.11 (6) under-states the crowding hook's quantity (VP2-03). Scope owes four bars and one row: T19-4 (VP2-09, above), the `portRef` contract
test §4.2 cites (VP2-10), T31-10 against the no-build `amalgamate` (VP2-11), a stretch-split clause in T11-1 (VP2-12),
and "crowding share" in the Staged row (VP2-13). Every issue has an exact required change. None needs an owner ruling.

The model seat's new observation — a shell change that lowers the capacity below the households — is closed. §4.7's
last sentence makes every change by S11's operator re-home the excess inside its event, and §7.4 routes the hand shell
edits through S11: `drawFootprint`, `moveFootprint` and `fill` "S11 re-fits", and `setAttr` on heights is "an input
override at the stage that computes the attribute (… heights and roof: S11)".

## 1 Inputs read

* The route objects of the items in the task, and the owner's words of items 8–31 (`docs/AMENDMENTS-2026-09-25b.md`).
  I re-read items 11, 12, 26, 28 and 31, whose mechanism the repair changed.
* The whole of `assemble-r2.md`, its §8 open notes included. The whole of `repair-pipeline-r2-report.md`, its §4
  cross-part residuals included. The whole of my `verify-pipeline-r1.md`. The five other-part r1 issues the pipeline
  repair answered, quoted from `verify-model-r1.md` (V-MAB1-02, -04) and `verify-determinism-r1.md` (VD1-03, -14, -15).
  The cross-part notes addressed to the pipeline in `repair-model-r2-report.md` ("Cross-part follow-ups" and "New
  observation"), `repair-determinism-r2-report.md`, `repair-scope-r2-report.md`, `repair-kernel-r2-report.md` and
  `repair-rendering-r2-report.md`.
* The part diff against `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r2-2026-09-27.md` (sha256 `365e19f2…`),
  made by a per-subsection script (scratchpad `vp2/secdiff.py`, output `vp2/part-diff.txt`, 164 lines, read whole). It
  has 28 hunks, all inside the 12 replaced subsections. §4.3, §4.4, §4.8, §4.10, §4.12, §10.1, §10.3, §10.4, II.2–II.5,
  II.7.1, II.7.2 and PART III are byte-identical to the archive.
* Read whole in the live document: §4.1, §4.7, §4.9, §4.11 (l. 4919–5444), II.6, II.7.3 and II.7.4. The hunks of §4.2,
  §4.5, §4.6, §10.2 and II.1 were read with their paragraphs.
* Read for the cross-part checks: §2.5 `Frontage`, `Plot.builtBand` and `Plot.fieldBand` (l. 855, 865–866); §2.6's
  capacity bullet and static-baseline sentence (l. 1438–1475); §2.7 `Tunnel` (l. 1582–1586); §3.4's `retypeEdges`
  `rekey` (l. 2491–2498); §5.2's F-SITING and F-PLAN rows (l. 5584, 5586); §5.3's epoch row; the JOIN and SPLIT bullet of
  §6.3 (l. 6133–6147); §7.1's households sentence and edit-target rows (l. 6495–6536); the setAttr, footprint, convert,
  `builtBand` and underground-tool rows of §7.4 (l. 6916–6929); §7.6's table list; §7.7's precedence (l. 7283–7291);
  §10.3; §13.2's contract tests, T11-1, T12-1, T19-4, T24-1, T26-2 and T31-9 – T31-12; the Staged sewers row. Also the
  index rows and Part A entries of J-A11.43, J-A12.47, J-A20.42, J-A20.71, J-A24.43, J-A26.44, J-A28.46, J-A31.40,
  J-A31.44 and J-A31.48.

## 2 The repair, issue by issue (the 18 issues the pipeline seat answered)

FIXED means the required change, or an equivalent the verifier accepts, is in the live text. The quote is the live
wording. "+ VP2-n" names a residue this round raises.

| issue | verdict | where; the live wording |
|---|---|---|
| VP1-01 | FIXED | §4.11 rung 2 l. 4987–4989: "the front plot, the child that keeps the frontage anchor, keeping its address and `builtBand`, every child's lineage continued by §6.3's SPLIT rule (the parent's key with its child index)". J-A31.40 index l. 12880 and Part A agree, and §6.3 l. 6141–6142 agrees: "every child takes the continued lineage". |
| VP1-02 | FIXED | §4.11 l. 5067–5069: "wealth change over epochs lowers it only through rung 3 (a completed upward refurbishment raises it, and rung 2's rear plots take their stock's band)". J-A31.44's Part A carries the round-2 note. |
| VP1-04 | FIXED + VP2-11 | §4.11 l. 5057–5059: "(an `amalgamate` that builds nothing — a thinned rear row or a cleared plot returned to its neighbour — keeps the `builtBand` and `builtProsperity` of the member whose frontage anchor the joined plot keeps, §6.3's JOIN)". This matches §6.3 l. 6133–6134: "takes its address by the anchor rule from the member whose frontage anchor it keeps". |
| VP1-05, VD1-03 | FIXED | §4.11 rung 1 l. 4968–4971: "(§2.6: wear and patched roofs, rendering classes of §8.2, never a shape change, item 19); the roof is lost only by the decline ladder's `decay`, after the building's last household has left (`vacate`; the derelict state of §2.8's ladder)". §5.3's epoch row matches a decline conversion. |
| VD1-14 | FIXED | Rung 1 growing rich, l. 4974–4975: "infill cleared once its households are re-homed and the garden reclaimed (`thin … infill`; infill whose households cannot be re-homed within the epoch's churn cap waits, as a court does in rung 2)". `LadderOp.thin` l. 5120: "after its uses relocate and its households are re-homed (item 17's relocation, or a `relet` up …) and its buildings vacated; a back court likewise". |
| VD1-15 | FIXED | §4.11 l. 5076–5078: "only a re-derivation takes fresh lineage (§6.3's succession rule; …)". J-A31.48 index l. 12809 and Part A agree, and so does §6.3 l. 6146–6147. |
| VP1-06 | FIXED | §4.1 l. 3290: "S10b (outside classes and, under §4.9's `fill` farm mode, the farm households)". §4.7 l. 4466–4468: "(under `perimeter` and `rivers` the farm households are town households, placed by their districts' S10b)". §4.9 l. 4829–4830: "and, under the `fill` mode, the farm households". The `farmsteads` preset is gone from l. 4759–4761. The `fill` bullet l. 4799–4800 reads "each farmstead lot a count-driven outside plot, its driveway included". J-A26.44 is restated. |
| VP1-07 | FIXED | §4.9 `rivers` l. 4807–4809: "where the band holds less land than the arable demand, the remaining fields are laid as `perimeter` lays them, on the land beyond the band, and the band's shortfall is reported (never a failure)". J-A26.44's Part A carries the note. |
| VP1-09 | FIXED + VP2-10 | §4.2 S3 (12) l. 3697–3700: "a stored cell of `market.siting` (§7.6) computed by running S0–S2 alone … a scripted pass sets it at M1 and re-runs whenever a shipped roster row changes, the new value shipped as a table-version bump with its declared shift (§13.3), and a contract test recomputes the median … (§13.2)". J-A24.43 is restated. §13.2 does not state that test (VP2-10). |
| VP1-10 | FIXED | §4.7 S10b l. 4487–4488: "the plots in order of the number of hard rows they fail, then score descending, then plot id — each with the rows it fails; J-A20.42". `PlacementResult.unplaced.closest` l. 4507 carries the order. J-A20.42 is new. |
| VP1-12 | FIXED + VP2-04, VP2-05 | II.6 l. 11859–11868: "act on one tunnel record … A conversion given a `stretch` first splits the tunnel at the stretch's two ends … by `retypeEdges`' `rekey` … Each run the condition table names, and the tunnel run of II.7.3's frontage and lifecycle rules, is one `Tunnel` record". `DeclineOp` l. 5385: "a `stretch` splits the record first". J-A11.43 is new. |
| VP1-13 | FIXED + VP2-03 | II.7.3 (c) l. 12035–12037: "a share `crowdingShare` (II.7.4) of the poorest band's households in the epoch's residual demand — what §4.11's regrowth-first steps (0)–(5) leave — goes underground before the boundary widens (§4.11 (6); J-A12.47)". `UndergroundRule.crowdingShare` is declared at l. 12145, and II.7.4's base list names it at l. 12158. |
| VP1-14 | FIXED | §4.5 l. 4041–4042: "granularity and the designation templates (§4.7; the site-plan table folded into them, J-A19.41)". |
| VP1-15 | FIXED | §4.7 S11 l. 4522–4523: "Geometry columns read the plot's manifested band (§4.11's plot-level read)". |
| VP1-16 | FIXED | II.1 l. 11574: "key: PlatKey /* the ground, the sky island's arena, or the underground arena (layer 'underground') */". |
| V-MAB1-02 | FIXED | §4.6 l. 4269: "(`BaseWing.spans`, §2.6, which a composition inherits: …". §2.6 declares `BaseWing.spans` at l. 959. |
| V-MAB1-04 | FIXED + VP2-01, VP2-06 – VP2-09 | §4.7 l. 4642–4658: "S10b places a residential plot's households — per residential slot … at most the row's `households.built` … S11, which creates each building and its wings, writes `Building.households` … clamped into [1, capacity] … A household the clamp leaves … moves by §10.3's relocation … after the district's last S11 block batch … re-placed … by S10b's solver … a household no building of the district has room for is an unplaced item of F-SITING (§5.2)". §10.2 l. 8945–8947 and J-A28.46 (new) agree. §2.6 l. 965 and 1470–1472 and J-A28.23 read "the generation fill (S10b's placement, S11's …)". §10.3's relocation keeps "its people … their keys, the household address surviving". |

## 3 The r1 issues of this part's report owned by other parts

| issue (owner) | verdict | the live wording |
|---|---|---|
| VP1-03 (determinism) | FIXED | §7.4 `builtBand` row l. 6929: the create cell is "the writers §4.11's floor paragraph lists (J-A31.44)". The regenerate cell reads "an epoch writes it only through §4.11's writers — a rung-3 event, rung 2's back court for the new rear plots it creates …, a completed upward refurbishment (which raises it) — so a standing plot's `builtBand` is lowered only by a rung-3 event". |
| VP1-08 (scope) | FIXED | T26-2 l. 10276–10281: "under `perimeter` and `rivers` no farmstead plot exists and every farm household is allocated to a town district; on an arid river fixture … the mode is `rivers` and every field lies within `riverBandM` of a bank but those of the band's reported shortfall …; on an arid fixture without a river the mode reads as `perimeter`". |
| VP1-11 (determinism) | FIXED | §7.7 l. 7289–7291: "its first closest option — the fewest hard rows failed, then the best score, in §4.7 S10b's order — with the rows it fails reported". F-SITING l. 5584 carries the same words. |
| VP1-17 (determinism) | FIXED | §7.6 names "the basement-gate row `RosterTables.basementGate` (§10.2)". "site plans" is gone from its table list. |
| VP1-18 (kernel; VK1-14) | FIXED | "site-plan table" occurs twice in the document: J-A19.41, which records the fold, and §4.5 l. 4041's "the site-plan table folded into them". Neither is in §3.7. |

The r0 and r1 findings outside the repaired subsections keep their earlier verdicts (`verify-pipeline-r0.md` §2–§3,
`verify-pipeline-r1.md` §2–§5).

## 4 Per-item verdicts

Re-judged where the round-2 repair changed the item's text. The other items keep r1's verdict and quote.

| item | r1 | r2 | the quote that carries it now; open issues |
|---|---|---|---|
| 8 decline and regrowth | PRESENT | PRESENT | §4.11 regrowth-first (0)–(6) unchanged. Rung 1's roof is lost only by "the decline ladder's `decay`, after the building's last household has left". |
| 10 islands by prosperity | PRESENT | PRESENT | II.6 (1)–(8) are unchanged. |
| 11 the underground fades | PRESENT | PRESENT | II.6: "the conversions `silt`, `caveIn` and `seal` act on one tunnel record … A conversion given a `stretch` first splits the tunnel …"; the condition table is unchanged. Open: VP2-04 (the split's re-pointing and U1), VP2-05, VP2-12. |
| 12 underground neighbourhoods | PRESENT | PRESENT | II.7.3 (c): "a share `crowdingShare` (II.7.4) of the poorest band's households in the epoch's residual demand"; II.1's `key` comment names the underground arena. Open: VP2-03, VP2-13. |
| 13, 14, 15 | PRESENT | PRESENT | unchanged (II.6 (2), II.7.1, II.6 (4)) |
| 16 assignments by rule | PRESENT | PRESENT | S10b's closest options: "the plots in order of the number of hard rows they fail, then score descending, then plot id" |
| 17 uses move | PRESENT | PRESENT | unchanged. Infill and courts are cleared only after "item 17's relocation, or a `relet` up". |
| 18 buildings mutate | PRESENT | PRESENT | unchanged |
| 19 designations scale with prosperity | PRESENT | PRESENT | §4.5: "granularity and the designation templates (§4.7; the site-plan table folded into them, J-A19.41)"; S11 reads "§4.11's plot-level read" |
| 24 several markets | PRESENT | PRESENT | §4.2 S3 (12): `portRef` "a stored cell of `market.siting` (§7.6) computed by running S0–S2 alone". Open: VP2-10. |
| 25 terrain and water change slowly | PRESENT | PRESENT | unchanged |
| 26 hinterland decided with the town | PARTIAL | PRESENT | §4.9: `fill` "each farmstead lot a count-driven outside plot"; `perimeter` and `rivers` place the farm households in town (§4.1, §4.7, §4.9); the `rivers` shortfall "continues as `perimeter`, reported"; T26-2 tests all of it |
| 27 prosperity maps onto the references | PRESENT | PRESENT | unchanged |
| 30 hidden plots | PRESENT | PRESENT | §4.6's passage bullet cites `BaseWing.spans` |
| 31 prosperity change, ladder, floor | PARTIAL | PRESENT | §4.11: rung 2's front plot "keeping its address and `builtBand`, every child's lineage continued by §6.3's SPLIT rule"; "lowers it only through rung 3"; the no-build `amalgamate` clause; "only a re-derivation takes fresh lineage". Open: VP2-02 (with 28 (f)), VP2-11. |
| ref 20 the dossier is the authority | PRESENT | PRESENT | S10b's `dossier` exception at "its first closest option" in the now-stated order; §7.7 and F-SITING point to it |
| ref 22, 23 | PRESENT | PRESENT | unchanged |
| ref 28 plans by click; (f) | PRESENT | PRESENT | §4.7 "Households per building (item 28 (f); J-A28.46)": S10b places per slot, S11 writes clamped to "§2.6's one capacity function … evaluated on the wings it has just made", overflow re-placed or reported. Open: VP2-01, VP2-02, VP2-06 – VP2-09. |
| ref 29 entrances and basements | PRESENT | PRESENT | §7.6 now lists `RosterTables.basementGate` |

## 5 Checks

**Retired texts** (CONFIRMED by a script over the live document, scratchpad `vp2/probes.txt`; the count after the colon
is the count in the part). The round-2 texts: "moves it only through rung 3" 0; "only New random" 0 (0 in the whole
document); "the roof lost through" 0; "S5d's ground shortfall" 0; "a table share of S5d" 0; "fills a residential
building at generation" 0; "farmsteads** with driveways" 0; "the ground, or the sky island's arena" 0; "keeping its
address, lineage" 0; "best-scoring plots that fail the fewest" 0; "which S2 alone computes" 0; "table-calibration script"
0; "granularity, site plans" 0; "act on a tunnel or on one of" 0; "outside classes and farm households" 0; "Wing.spans`,
§2.6:" 0. The r1 texts are still 0: "creates 1–3", "maxIslands", "toggle creates", "by mutating the cached", "the market
square's", "lower-class district" and "('access', id)". Outside the part, "S10b's fill" is 1, in §5.2 F-PLAN (VP2-06).

**SINGLE-SOURCE (kind duplicate).** No new duplicate in the part. Each new mechanism is stated once, with pointers from
the other places:
* the generation fill in §4.7, with pointers from §10.2, §2.6 and J-A28.23;
* the closest-options order in S10b, with pointers from §7.7 and F-SITING;
* the tunnel split in II.6, with a pointer from `DeclineOp`;
* the crowding quantity in II.7.3 (c) with `UndergroundRule.crowdingShare`, pointed to from §4.11 (6), whose paraphrase
  is inexact (VP2-03);
* the no-build `amalgamate` in §4.11's writer list, pointed to from J-A31.44.

One boundary case: II.6 states the address and lineage rule for a split tunnel's parts, while the identity home, §6.3,
states the SPLIT rule for plots only. The pipeline seat flagged this. VP2-05 puts the linear form in §6.3, and VP2-04
makes II.6 a pointer.

**STALE.** No sentence of the part keeps lots as buildings, binary wealth, size fixed by tier, one central market, the map
editing the dossier, a licence default or immutable terrain and water. The r0 greps were re-run over the 28 hunks. Stale
after this round:
* §10.2's claim that "every building houses its row's `built` count" once the overflow pass moves households (VP2-01),
  and the same claim in §2.6 (VP2-08) and T19-4 (VP2-09);
* T31-10's "after a rung-3 event `builtBand` is the band of the new stock" beside the no-build `amalgamate` (VP2-11);
* the Staged row's `UndergroundRule` list, which lacks the crowding share (VP2-13).

**CROSS-PART.** Every pointer the repaired text adds resolves to a home that states what it assumes. The homes checked:
* §6.3's JOIN (the anchor member) and SPLIT (every child's lineage) and its succession rule;
* §2.6's `BaseWing.spans` and its capacity bullet;
* §3.4's `retypeEdges` `rekey`;
* §7.4's convert row ("a tunnel's invert … through `retypeEdges`' `rekey`");
* §7.6's `market.siting`;
* §13.3's declared shift;
* §10.3's relocation ("its people keep their keys, the household address surviving");
* §2.8's derelict state.

The exceptions:
* §13.2 holds no `portRef` contract test (VP2-10).
* §5.2's F-SITING row does not detect the post-S11 overflow that §4.7 sends to it (VP2-07).
* §2.5 says `fieldBand` is "re-banded after S6 at every epoch (§4.11)", but §4.11 names no such step (VP2-02).

The notes addressed to the pipeline:
* The model seat's §4.6 and §4.7 follow-ups, the rung-1 roof and determinism's VD1-03 / VD1-14 / VP1-10 are reflected.
  The model seat's "§4.11: the epoch re-bands `Plot.fieldBand` after S6" is not (VP2-02).
* `assemble-r2.md` §8 lists eight open notes. Three are the pipeline's own asks of other parts, and all three are still
  open: (1) F-PLAN's "S10b's fill" (VP2-06); (2) the `portRef` test and T19-4 (VP2-10, VP2-09); (3) §2.6's static
  baseline (VP2-08). Note 8, the model seat's new observation, is closed (§0). Notes 4–7 concern other parts only.

**DEFERRAL-WORDING.** None. The one "later" among the added lines is temporal ("S11's operator later builds or
changes"). "0.12 (PLAUSIBLE) until the M1 receipt" is a measured default with its receipt. "Calibratable with the staged
engine" is the roadmap's staging, not a deferral. No "TBD", "open", "not yet decided" or unresolved choice was added.

**BROKEN-REFERENCE.** `refs.py` on the live document finds 139 heading keys, 35 D ids, 469 J ids and 2 broken
references. Both are the pre-existing external citations (`os-geometry.md` §2.1.4 at l. 2679, RFC 7946 §3.1.6 at
l. 9123), and neither is in the part. The one semantic break the resolver cannot see is §4.2's "a contract test …
(§13.2)" (VP2-10).

**NEW-PROBLEM.** The round's new mechanism meets existing rules in four places:
* The split tunnel's parts and U1's "exactly one … tunnel run": a frontage across a split end now fronts two records
  (VP2-04).
* The same split and the records that name the tunnel: `Frontage.way`, `AccessPoint.under.tunnel` and
  `Tunnel.chambers` are left pointing at the old record (VP2-04).
* S10b's "at most the row's `households.built`" and S11's "clamped into [1, capacity]" on a list of households: a slot
  S10b leaves empty has no household to clamp up to 1 (VP2-01).
* J-A28.46's Part A rejects "dropping the household", yet its fallback is an F-SITING item, and F-SITING's last rung
  reduces the manifest (VP2-01, VP2-07).

## 6 Issues (owner part, severity, exact required change)

All 13 are minor. Line numbers are the live document's (sha256 `831efd42…`). A quoted string that wraps in the file is
quoted as one line, and every quoted old string occurs exactly once in its file, whitespace normalised (checked by
script).

| owner | blocker | major | minor | total |
|---|---|---|---|---|
| pipeline | 0 | 0 | 4 | 4 |
| determinism | 0 | 0 | 3 | 3 |
| model | 0 | 0 | 1 | 1 |
| scope | 0 | 0 | 5 | 5 |
| **all** | 0 | 0 | 13 | 13 |

### VP2-01 — pipeline · minor · new-problem · items 28 (f), 23 (§4.7 households paragraph, §10.2, J-A28.46 Part A)

**Claim.** The generation fill leaves three count statements loose.

1. **§4.7 l. 4642–4647.** S10b places "per residential slot … at most the row's `households.built`", and S11 then writes
   `Building.households` "from its slot's households in address order, clamped into [1, capacity]". A slot S10b left
   empty has no household to clamp up to 1, and nothing says S10b places at least one.
2. **§10.2 l. 8946–8947.** It says "with no epoch every building houses its row's `built` count, clamped to its capacity
   with the overflow re-placed (§4.7)". A building that receives an overflow household houses more than its row's count
   (within capacity), so the sentence states the count the overflow pass changes.
3. **J-A28.46's Part A.** It chose the design "over … dropping the household", yet the design's own fallback is an
   F-SITING item, and F-SITING's last rung reduces the manifest.

**Required change.**
1. **§4.7.** Replace "per residential slot of the plot's designation template row at most the row's `households.built`,
   by band ± drift" with "per residential slot of the plot's designation template row at least one household and at
   most the row's `households.built`, by band ± drift (residential capacity the demand cannot fill with one household
   per slot is surplus capacity, which the reconcile below types as a yard or vacant plot, never an empty residential
   slot)".
2. **§10.2.** Replace "with no epoch every building houses its row's `built` count, clamped to its capacity with the
   overflow re-placed (§4.7), so the static baseline is unchanged (item 23)" with "with no epoch every residential
   building houses its row's `built` count clamped into [1, capacity], plus any household §4.7's overflow pass
   re-places into it (never beyond its capacity), so the static baseline is unchanged (item 23)".
3. **J-A28.46's Part A.** Replace "or dropping the household (the population is the dossier's, and F-PLAN never omits a
   unit)" with "or dropping the household before any re-placement (the population is the dossier's, and F-PLAN never
   omits a unit; F-SITING's last rung alone takes off the manifest a household no building of its district can hold,
   reported)".

### VP2-02 — pipeline · minor · conflict · items 28 (f), 31 (§4.11 the epoch's order (a); the model seat's follow-up)

**Claim.** The model's round-2 repair added `Plot.fieldBand` (§2.5 l. 866). It is "re-banded after S6 at every epoch
(§4.11)", and it is the occupants' band that rung 1, the interior ladder and `ClassRules.pick` read. §4.11 names no such
step: step (a) reads "S6 re-evaluates the drivers and the bands and marks the due blocks", and "fieldBand" occurs 0
times in §4.11. The model seat's cross-part follow-up asked for it ("§4.11: the epoch re-bands `Plot.fieldBand` after
S6"). No seat applied it.

**Required change.** In §4.11's epoch order, replace "S6 re-evaluates the drivers and the bands and marks the due blocks"
with "S6 re-evaluates the drivers and the bands, re-bands every standing plot's `fieldBand` (§2.5: the occupants' band,
its hysteresis read against its own column; J-A28.29) and marks the due blocks".

### VP2-03 — pipeline · minor · conflict · item 12 (§4.11 regrowth-first (6) against II.7.3 (c))

**Claim.** II.7.3 (c), the home, sends "a share `crowdingShare` (II.7.4) of the poorest band's households in the epoch's
residual demand" underground, and J-A12.47 restricts the hook to that band. §4.11 (6) l. 5352–5353 still says the hook
"first takes its table share of the residual". A reader of §4.11 applies the share to the whole residual, every band
included.

**Required change.** In §4.11, replace "where `Features.sewers` is on, the underground crowding hook first takes its table
share of the residual (II.7.3 (c), §4.5 S7b (6))" with "where `Features.sewers` is on, the underground crowding hook
first sends `crowdingShare` of the residual's poorest-band households underground (II.7.3 (c), II.7.4, §4.5 S7b (6))".

### VP2-04 — pipeline · minor · new-problem · items 11, 12 (II.6 the stretch split; J-A11.43)

**Claim.** The split (VP1-12's repair) keeps each tunnel record to one condition reading. It leaves two gaps.

1. **The records that name the tunnel are not re-pointed.** The split hands on "its invert knots, the outfall at its
   end, the plots and buildings whose connections meet it" (l. 11865–11866). It does not hand on:
   * `Tunnel.chambers` (§2.7 l. 1585);
   * the access points whose kerb vertex lies on the handed stretch, whose `AccessPoint.under.tunnel` (II.7.4
     l. 12144) keeps naming the old record;
   * the `Frontage` records of the underground blocks along the stretch, whose `way` (§2.5 l. 855) II.7.3 (1) reads as
     the frontage's tunnel.
   So a cave-in of the stretch leaves those plots reading the old record's `open`.
2. **A plot can front two records.** The stretch's ends are arbitrary centreline vertices. A plot whose frontage runs
   across an end would front two records, against U1's "exactly one navigable, open tunnel run" (II.7.3 l. 12015–12016),
   which II.6 now defines as one record, and against the lifecycle rule "every plot whose frontage rows lie on it".

Also, II.6 states the parts' address and lineage rule itself, while §6 owns identity (canon R5; VP2-05).

**Required change.**
1. **II.6.** Replace "A conversion given a `stretch` first splits the tunnel at the stretch's two ends" with "A
   conversion given a `stretch` first widens it at each end to the nearest centreline vertex opposite which no
   underground plot's frontage continues — a boundary between two plots' frontages, a junction or the tunnel's end —
   so that no plot fronts two records (U1, II.7.3), then splits the tunnel at the stretch's two ends".
2. **II.6.** Replace "the part holding the centreline's first vertex keeps the tunnel's address, the new records take
   addresses minted from the event, and every part continues the tunnel's lineage with its part index (§6.3's SPLIT
   rule, the first vertex standing for a plot's frontage anchor)" with "each part keyed by §6.3's SPLIT rule for a
   tunnel record". Apply this together with VP2-05.
3. **II.6.** Replace "(its invert knots, the outfall at its end, the plots and buildings whose connections meet it)" with
   "(its invert knots, the outfall at its end, the plots and buildings whose connections meet it, its chambers
   (`Tunnel.chambers`) and the access points whose kerb vertex lies on it (`AccessPoint.under.tunnel`, II.7.4)), the
   `Frontage` records of the underground blocks along it (§2.5) split at the same ends and each re-pointed to the part it
   fronts".
4. **J-A11.43's index row and Part A.** Append "; the stretch widened to plot-frontage boundaries, and the chambers,
   access points and block frontages re-pointed (amended by verify-pipeline-r2)".

### VP2-05 — determinism · minor · partial · item 11 (§6.3 JOIN and SPLIT; the pipeline seat's residual)

**Claim.** §6 owns identity (canon R5). §6.3's SPLIT rule (l. 6133–6147) names the anchor only for a plot: "the child
that keeps the parent's frontage anchor keeps the address". II.6 extends it to a tunnel record, "the first vertex
standing for a plot's frontage anchor" (J-A11.43), so the identity home does not state a rule the pipeline relies on.
The pipeline seat raised this in `repair-pipeline-r2-report.md` §4.

**Required change.** In §6.3's JOIN and SPLIT bullet, after "only an `undo` restores that record exactly (§7.4)." insert
"A **tunnel record** split by a stretch conversion (II.6, J-A11.43) follows the same rule, the centreline's first vertex
standing for the frontage anchor: the part holding it keeps the address, the other parts take addresses minted from the
causing event's `seq` and ordinal, and every part continues the tunnel's lineage with its part index." VP2-04 (2) makes
II.6 a pointer to this sentence.

### VP2-06 — determinism · minor · stale · item 28 (f) (§5.2 F-PLAN tier 6; assemble-r2 §8 note 1)

**Claim.** F-PLAN's tier 6 (l. 5586) still says "the count the rung must house is bounded upstream by §2.6's capacity,
which S10b's fill and `relet` keep to (§4.7 S10b, §4.11)". After J-A28.46, S10b cannot read the capacity. S11 writes
the clamped count, and the overflow pass keeps to it. The pipeline and model seats both asked for this change.

**Required change.** In §5.2 F-PLAN, replace "the count the rung must house is bounded upstream by §2.6's capacity, which
S10b's fill and `relet` keep to (§4.7 S10b, §4.11)" with "the count the rung must house is bounded upstream by §2.6's
capacity, which the generation fill (§4.7: S10b's placement, S11's clamped write and its overflow pass) and `relet` keep
to (§4.7, §4.11)".

### VP2-07 — determinism · minor · conflict · items 28 (f), 16 (§5.2 F-SITING)

**Claim.** §4.7 (l. 4652–4653) sends "a household no building of the district has room for" to F-SITING as an unplaced
item, after S11. F-SITING's detection cell (l. 5584) names only "the eager allocation … cannot place a class's demand in
its affinity district; a post-build request (§7.7) finds no plot inside the hard rows". Its ladder's first rungs (JOIN
at block granularity, a whole block, the district edge) re-cut plots that S11 has already built on. The case the
pipeline created therefore has no detection, and no stated rung that applies after S11.

**Required change.** In §5.2 F-SITING's detection cell, after "a post-build request (§7.7) finds no plot inside the hard
rows" insert "; S11's overflow pass (§4.7, item 28 (f)) finds no residential building of the district with room for a
household". In its ladder cell, after "the report naming each unplaced item's blocking hard rows and its closest
options" insert "; a household S11's overflow pass cannot house takes the last rung alone — the manifest reduced by it,
reported with the capacities that refused it, no re-cut after S11".

### VP2-08 — model · minor · stale · items 28 (f), 23 (§2.6 l. 1442–1443; assemble-r2 §8 note 3)

**Claim.** §2.6's interior-ladder paragraph says "with no epoch every building houses its template row's
`households.built`, clamped into [1, capacity], so the static baseline is unchanged". §4.7's overflow pass (J-A28.46)
moves a household the clamp leaves into another building of the district, which then houses more than its row's count.
The pipeline seat asked for the qualifier.

**Required change.** In §2.6, replace "with no epoch every building houses its template row's `households.built`, clamped
into [1, capacity], so the static baseline is unchanged" with "with no epoch every residential building houses its
template row's `households.built`, clamped into [1, capacity], plus any household §4.7's overflow pass re-places into
it (never beyond its capacity), so the static baseline is unchanged".

### VP2-09 — scope · minor · stale · item 28 (f) (§13.2 T19-4; assemble-r2 §8 note 2)

**Claim.** T19-4 (l. 10255–10256) reads "with no epoch every building houses its template row's `households.built`". It
fails on any seed where §4.7's clamp or overflow pass acts. No bar proves J-A28.46: that no shell houses more than its
capacity, and that every household is housed or reported.

**Required change.** In §13.2, replace "(T19-4) with no epoch every building houses its template row's
`households.built`." with "(T19-4) with no epoch every residential building houses at least one household and at most
its capacity (§2.6's function) — its template row's `households.built` clamped into [1, capacity], except the moves
§4.7's overflow pass reports — and every household S2 demanded is housed or reported unplaced by F-SITING (J-A28.46)."

### VP2-10 — scope · minor · broken-reference · item 24 (§13.2 contract tests; assemble-r2 §8 note 2)

**Claim.** §4.2 S3 (12) (l. 3699–3700) keeps `portRef` honest by "a contract test [that] recomputes the median and fails
on a stored value that differs (§13.2)". §13.2 holds no such test: `portRef` occurs 0 times there, and occurs only in
§4.2 and J-A24.43.

**Required change.** In §13.2's "Stage contract tests" bullet, after "S8's working block equals S9's committed block
(Hausdorff 0; §3.7)." insert "The stored `market.siting` cell `portRef` equals the median port demand fraction
recomputed by running S0–S2 on every B-CITY harbour seed (§4.2 S3 (12); J-A24.43); a differing value fails."

### VP2-11 — scope · minor · conflict · item 31 (§13.2 T31-10)

**Claim.** T31-10 (l. 10364) reads "after a rung-3 event `builtBand` is the band of the new stock". §4.11's writer list
(VP1-04's repair, l. 5057–5059) and J-A31.44 now give an `amalgamate` that builds nothing the `builtBand` of the member
whose frontage anchor the joined plot keeps. That event has no new stock.

**Required change.** In §13.2, replace "(T31-10) after a rung-3 event `builtBand` is the band of the new stock;" with
"(T31-10) after a rung-3 event that builds, `builtBand` is the band of the new stock, and after an `amalgamate` that
builds nothing it is the `builtBand` of the member whose frontage anchor the joined plot keeps (§4.11, J-A31.44);".

### VP2-12 — scope · minor · partial · item 11 (§13.2 T11-1; the proof of J-A11.43)

**Claim.** J-A11.43's stretch split is new mechanism. T11-1 (l. 10223) checks only that "tunnel conversions by hand undo
exactly". No bar proves three things: that a stretch conversion closes only the plots along the stretch, that U1 still
holds, and that the undo restores the one record.

**Required change.** In §13.2, replace "(T11-1) tunnel conversions by hand undo exactly;" with "(T11-1) tunnel conversions
by hand undo exactly; a `caveIn` given a stretch splits the tunnel at the stretch's widened ends (II.6, J-A11.43) — the
first-vertex part keeping the address, every part continuing the lineage, the chambers, access points and block
frontages re-pointed — closes only the plots fronting the stretch, leaves U1 holding on every plot, and its undo
restores the one record;". This clause presumes VP2-04.

### VP2-13 — scope · minor · stale · item 12 (the Staged sewers row)

**Claim.** II.7.4's base list (l. 12158) now names "`UndergroundRule`'s depth scale, vacancy share, crowding share and
arrangement restriction". The Staged sewers row (l. 12916) still lists "depth scale, vacancy share and arrangement
restriction", so the crowding share J-A12.47 made a base field is missing from the roadmap's list of base hooks.

**Required change.** In the Staged sewers row, replace "`UndergroundRule`'s depth scale, vacancy share and arrangement
restriction" with "`UndergroundRule`'s depth scale, vacancy share, crowding share and arrangement restriction".

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read on disk or executed). The document's sha256 was `831efd42…` and the rationale's `f2c2a1ca…` at both
the first and the last read. The following were confirmed:
* the part diff against the pre-repair archive: 28 hunks, all in the 12 replaced subsections, the rest of the part
  byte-identical;
* every quotation and line number in §2–§6;
* the 33 text probes of §5 (`vp2/probes.txt`);
* that each changed judgment id (J-A11.43, J-A12.47, J-A20.42, J-A24.43, J-A26.44, J-A28.46, J-A31.40, J-A31.44,
  J-A31.48) has exactly one index row and one Part A entry;
* the resolver's 2 pre-existing external breaks, none in the part (`vp2/refs.json`);
* that every old string quoted in a required change occurs exactly once in its file, whitespace normalised;
* that "fieldBand" and "portRef" do not occur where the claims say (0 in §4.11, 0 in §13.2);
* the §7.4 rows that route the hand shell edits through S11.

**PLAUSIBLE** (judgment, vetoable):
* the severities: all minor, because each is a wording, pointer or bar repair inside a mechanism that otherwise holds;
* the verdict that every item is PRESENT;
* the directions of the required changes:
  * S10b places at least one household per residential slot, the surplus typed by the reconcile (VP2-01);
  * an overflow household F-SITING cannot place takes only the last rung, a manifest reduction, after S11 (VP2-07);
  * a stretch conversion widens its stretch to plot-frontage boundaries, rather than amending U1 to read one tunnel
    lineage (VP2-04);
  * the tunnel-split identity form belongs in §6.3, with II.6 as a pointer (VP2-05, VP2-04);
* that §4.7's "wherever S11's operator later builds or changes a residential shell", read with §7.4's routing, closes the
  model seat's new observation for hand shell edits.

The owner's words are quoted from `docs/AMENDMENTS-2026-09-25b.md`. No reference code, corpus content or `partitioned/`
file was read or used.
