# verify-pipeline-r3 — lane amendments-c/verify-pipeline-r3 (the PIPELINE part after repair round 3)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-pipeline-r3).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 inputs read (verify-pipeline-r2, validate.md §5, repair-pipeline-r3 report, assemble-r3, the four sibling repair-r3 reports' cross-part notes; part diff pre-r3 → live): done
> STEP 1 re-check of the ten routed rows (VPR2-01 … -06, VS2-04, VAL-01, VAL-03, VAL-04), RP3-01 and the other-owner r2 rows of this part (VPR2-07, VPR2-08, V-MC2-02, VS2-03, VD2-03's pointers in this part): done
> STEP 2 new-problem / single-source / stale / deferral / reference / held-part sweep of the repaired subsections (§4.6, §4.7, §4.11, §10.2, II.7.6; the pointer-only §4.2, §4.3, §4.5, §10.3, II.7.5): done
> STEP 3 cross-part notes addressed to this part (repair-r3 reports, assemble-r3 §9): done
> STEP 4 document checks over the part's keys (information; this seat edits no design file): see §3
> STEP 5 report body: done
> STEP 6 queue row, LANDED line: done

Design read: docs/ARCHITECTURE.md sha256 70ddb6e302ea06c1… (17 305 lines); rationale e138da2377d31b9f… (2 316 lines).
Before: docs/archive/ARCHITECTURE-pre-amendments-c-repair-r3-2026-09-28.md (3daa0b07…). Scratch: scratchpad `vpr3/`
(part extracts `pre-part.txt`, `live-part.txt`, 4 650 lines each; word diff `part.wdiff`, 22 hunks, every one read;
`added.txt`; stale greps; `dc.out`).

## Outcome

Repair round 3 fixed every issue routed to this part. The ten pipeline rows (VPR2-01 … -06, VS2-04, VAL-01, VAL-03,
VAL-04) and the seat's own RP3-01 are fixed at their homes. The four other-owner r2 rows of this part are fixed by their
owners: VPR2-07 = VD2-02 (determinism), VPR2-08 = VS2-02 (scope), V-MC2-02 (model) and VS2-03 (scope). Determinism's
VD2-03 pointer rewrites in this part (15 "§7.7 item 2" → "layer 2") each point at the circumstance slices. The six
"§7.7 item 1/2/3" pointers the part keeps each point into the dossier contract (One way, Existence, Rejection), as
intended. Every routed item stays PRESENT. The part's word diff is exactly the claimed edits and nothing else. Gates
(a)–(c) hold, there is no deferral wording, every new reference resolves, and doc checks over the part's keys exit 0.

**4 issues are open, all minor, none needing an owner ruling.** Each sits in a repaired subsection or its rationale.
* VPR3-01 (pipeline): the cluster row's structure depth is typed as a scalar but given as a range, and the footpath
  web's spacing reads "structure depth" without saying which kind's. This is the same class as RP3-01.
* VPR3-02 (pipeline): J-A63.41's Part A still says concealment is "resolved once", which VPR2-02 made stale.
* VPR3-03 (model): the §2.7 `concealmentSource` comment now repeats the resolution order and its outcome, which §4.7 (1)
  now states (assemble-r3 §9 note 3).
* VPR3-04 (determinism): the closure instance "an undercity entrance that lacks its lifeline" names neither an edit kind
  nor an entity, while its generators take a building (assemble-r3 §9 note 2, extended to II.7.6's text).

Owners: pipeline 2, model 1, determinism 1.

## 1. Items — status after round 3 (r0–r2 verdicts in verify-pipeline-r0/-r1/-r2 §1; only the changes are quoted)

| item | role | r2 | r3 | the repaired mechanism, quoted from the live design | open |
|---|---|---|---|---|---|
| 72 | home | PRESENT | PRESENT | §4.7 S10b l. 5278–5279: "it never reaches into another district — moving demand between districts happens only in S7b's reconcile and in S10a's band-range re-homing (§4.5 (5); J-A72.50)" | — |
| 63, 20 (h) | home, ref | PRESENT | PRESENT | §4.7 (1) l. 5495–5496: "It is resolved when the institution is first placed — and again only when a dossier event withdraws the mode the dossier set (below) — from the first source that gives one"; l. 5500 (the same line): "re-resolves it by this order from the map-side sources, the use re-placed by (2)–(6) as that event's least-disruption mutation (§7.7 items 5, 11 (b)), as an open use where the order yields `none` (§2.7; J-A63.22)" | VPR3-02, VPR3-03 |
| 70 | home | PRESENT | PRESENT | §4.7 3 (i) l. 5637: "of width `pathWidthM` (the cluster row's, §10.2; below an alley's)"; (ii) l. 5641–5644: "the footprint from the kind's band in the cluster row (§10.2) — a lean-to's against a standing wall … — and a clear gap of the cluster row's `fireGapM` at the settlement's rung (§10.2)"; §10.2 l. 11679: "`fireGapM: { rung: string; m: number }[]` /* the clear gap between two structures, by rung, as householdsPerStructure (§4.7's packing) */" | VPR3-01 |
| 81, 65, 66 | ref, home, ref | PRESENT | PRESENT | §4.11 l. 6414: "each other system's stage (catacomb, cavern, quarry, vaults) its own part's bands (II.7.6) … ; on the `buried` and `dug` parts, which no stage re-derives at an epoch — a buried town, laid from a history scar at generation or made by a `raiseGrade`, and the passages access edits dig — their cleared bands re-laid from their kept gallery chains by `corridorUnion` (§3.7), which draws nothing" | VPR3-04 (II.7.6) |
| 65, 88 | home, ref | PRESENT | PRESENT | II.7.6 l. 16082–16083: "gated to TOWN and above (PART III) and by its row's chance per rung — a history scar's buried town by the `buried` row's `scarSeverity` instead, drawing nothing (*A buried old town*, below); the chances are 0, and the scar rule off, in the parity presets"; l. 16124: "its floors laid at `scarBaseCm + scarGainCm × severity` (200 + 200 × severity) cm below the present grade — its old grade, at which *Depth bands* lays a buried town (above)"; `chance` l. 16185: "absent: none (the buried row's generation-time town reads scarSeverity instead, A buried old town)"; `params` l. 16187: "scarSeverity, scarBaseCm, scarGainCm (the buried row's generation-time scar rule)" | — |
| 88 | ref | PRESENT | PRESENT | J-A88.42 index l. 17228: "`HistoryHint` the stage count (min(K, max(1, ⌈age ÷ yearsPerStage⌉))), its age the catacomb rule's age, and a fire or flood scar the buried old town only"; Part A l. 764 matches, and so do §4.2 S2 (l. 4054) and II.7.6 (l. 16088) | — |
| 35, 42 | home | PRESENT | PRESENT | §4.6 step 2 l. 4924: "read are NG 1.2.2's measured outputs of this law, never its inputs (J-A35.41)"; J-A42.41 Part A l. 600: "about 42 % of NG 1.2.2's lot leaves" | — |
| 47 | home | PRESENT | PRESENT | J-P37 Part A l. 191: "the grower's edge test (§4.5) stops at reservation boundaries by design"; "validateEdge": design 0, rationale 1 (Part F's verbatim history, l. 1675, kept as ruled) | — |
| 33, 34, 36–40, 43–46, 57, 58, 61, 64, 67, 68, 71, 76 | home | PRESENT | PRESENT | unchanged by round 3 (r0–r2 quotes stand); §4.2, §4.3, §4.5, §10.3 and II.7.5 changed only by VD2-03's pointer words | — |
| 50, 66, 20, 75, 77–80, 82, 101 | ref | PRESENT | PRESENT | unchanged by round 3 | — |

## 2. The r2 issues the repair claimed, re-checked in the live text (all FIXED)

| r2 id(s) | owner | verdict | live text (line) |
|---|---|---|---|
| VPR2-01 | pipeline | FIXED | §4.7 S10b l. 5278–5279 (quoted in §1); it agrees with §5.2 F-SITING l. 6905 "S10a's band-range re-homing (§4.5 (5))" |
| VPR2-02 | pipeline | FIXED | §4.7 (1) l. 5495–5496, 5500 (quoted in §1). "(2)–(6)" in place of the validator's "(2)–(4)" is correct: (5) places `hidden` and (6) places `underground`, and a re-resolved map-side mode may be either. Residue: VPR3-02 (J-A63.41's "once"), VPR3-03 (§2.7's restatement) |
| VPR2-03 | pipeline | FIXED | §4.11 l. 6414 (quoted in §1). Naming the four stage systems keeps the two clauses from both claiming a buried part. Covering both origins of a buried town agrees with II.7.6's "at generation" stage order (l. 16082) and §14's registry (l. 14356) |
| VPR2-04 | pipeline | FIXED | II.7.6 l. 16082–16083 and `chance` l. 16185 (quoted in §1) |
| VPR2-05 | pipeline | FIXED | II.7.6 l. 16124 (quoted in §1); it agrees with *Depth bands* l. 16074 "a buried town at its old grade" |
| VPR2-06 | pipeline | FIXED | II.7.6 `params` l. 16187 (quoted in §1); the values are stated once, in the bullet (l. 16124: 0.5; 200 + 200 × severity) |
| VS2-04 | pipeline | FIXED | J-A88.42 index l. 17228 and Part A l. 764 (quoted in §1) |
| VAL-01 | pipeline | FIXED | §4.6 l. 4924; J-A42.41 Part A l. 600 (both "NG 1.2.2's"). The index row l. 17064 already named the build |
| VAL-03 (+ path width) | pipeline | FIXED | §4.7 3 (i) and (ii) (quoted in §1); §10.2's bullet l. 11706–11709 keeps every value |
| VAL-04 | pipeline | FIXED | J-P37 Part A l. 191 (quoted in §1) |
| RP3-01 (self-found) | pipeline | FIXED | §10.2 `ClusterRow.fireGapM` by rung (l. 11679); §4.7 (ii) reads it "at the settlement's rung"; the bullet's values (1.0; squalid 0.8 at CITY and METROPOLIS) fit the type. §5.3's "its row's fire gap" (l. 6954) and T70-2 read the same value. The same scalar-for-a-range defect remains on `depthM` in the same row (VPR3-01) |
| VPR2-07 = VD2-02 | determinism | FIXED | §7.7 F4 l. 9376 and the `impaired` row l. 9393: "the impaired institution's own dial term only (§4.5 (6) …)"; "power slice's dial only" has 0 hits |
| VPR2-08 = VS2-02 | scope | FIXED | §14 l. 14356: "vaults and, at generation, a history scar's buried town" |
| V-MC2-02 | model | FIXED | §2.7 l. 1845: "the blocks or districts a `raiseGrade` buried (its `region`, II.7.6) or, at generation, the growth-stage-1 districts a `fire` or `flood` scar buried (II.7.6; J-A88.42)"; it agrees with II.7.6 l. 16124 "(its `sources`, §2.7)" |
| VS2-03 | scope | FIXED | §13.2 T88-1 l. 13646–13648: "and the catacomb age and the buried old town at II.7.6"; this equals J-A88.42's list |
| VD2-03 (this part's pointers) | determinism | FIXED | The 15 rewritten pointers in §4.2, §4.3, §4.5, §4.11, §10.2, §10.3 and II.7.5 all name layer 2's slices (trade, powers, economy, disorder, `PowerStanding`). The six kept contract pointers (l. 4818, 5481, 5553, 6041, 6384, 6393, 6647: item 2 Existence / population, item 3 Rejection and its lapse, item 1 One way and its dating) read correctly against §7.7 l. 9140–9190 |

## 3. The checks (the repaired subsections §4.6, §4.7, §4.11, §10.2, II.7.6; the pointer-only §4.2, §4.3, §4.5, §10.3, II.7.5)

* **Diff scope.** The part's word diff from pre-r3 to live has 22 hunks. Each one is either a claimed edit of
  repair-r3-pipeline.md (the ten rows and RP3-01) or a VD2-03 "item" → "layer" token. No other subsection of the part
  changed. Headings and line counts are unchanged (the part has 4 650 lines both before and after).
* **SINGLE-SOURCE.** The cluster values are stated once, in §10.2's bullet: §4.7 now points to them for the footprints,
  the fire gap and the path width. The scar rows are stated once, in II.7.6's bullet. The concealment re-resolution is
  stated in §4.7 (1), but §2.7's `concealmentSource` comment restates the order and the outcome (VPR3-03, model). The
  pre-existing `tents` arrangement row (l. 5336, "6–15 m²") is FTG's parity row, which predates pass c, and it is left as
  it stands.
* **STALE.** The retired-rule grep (central or one market, immutable, licence, proprietary, binary, fixed by tier or
  rung, never change, the map editing the dossier, lots as buildings) finds the same 10 benign hits before and after.
  Newly stale: J-A63.41's Part A "resolved once per institution" (VPR3-02). "resolved once" has no other hit in the part
  or the rationale; the other hit, §2.9 l. 2349, is about the rebase mismatch and is unrelated.
* **CROSS-PART.** Pipeline r3 note 1 (model, `concealmentSource`) was not folded (VPR3-03). Pipeline r3 note 2
  (determinism, the "fraction along the footprint edge" C3 hit) is resolved: the phrase has 0 hits and the J-A68.73 row
  reads "fraction of the footprint ring's edge". Model r3's note (determinism, §7.3 item 9 (d)) reaches this part's
  II.7.6 closing sentence (VPR3-04). Scope r3 (VS2-03, VS2-06) follows this part's J-A88.42 and J-A70.49 / J-A72.50
  rows, which agree with them. Determinism r3's VD2-03 convention is applied (§2).
* **DEFERRAL-WORDING.** The 37 added runs contain none (no TBD, later, pending, deferred, future or TODO). The one
  "open" is "an open use", a domain term.
* **BROKEN-REFERENCE.** Every pointer the new text adds resolves:
  * sections: §4.5 (5), §7.7 items 5 and 11 (b) (l. 9199, 9316–9320), §2.7, §3.7, §10.2;
  * judgment rows: J-A72.50 and J-A63.22 (each one index row and one Part A entry);
  * named paragraphs: *A buried old town*, *Depth bands*.
  assemble-r3's resolver run gives only the 2 baseline externals.
* **NEW-PROBLEM.** VPR3-01: the web spacing's depth is unbound. It predates round 3, but it sits in the §10.2 row that
  RP3-01 re-typed and in §4.7 3 (i) that VAL-03 edited.
* **Gates.** (a) No held part is in the part. "160 of 162", "160 / 162", "16-cell", "16 cells wide", "door concept",
  "visibly differ" and "draws no cast shadow" have 0 hits. The one "MFCG draws" is the bridge count at l. 274 of the
  extract, unchanged and not a held claim. (b) The two build tags are added, and the new text states no other reference
  behaviour. (c) No reference identifier is added. `validateEdge` is gone from J-P37's live entry.
* **Document checks** (information; this seat edits no design file). `doc_checks.py --sections "4,10,PART II,PART
  III,Judgment calls"` with the allow file, on the installed design 70ddb6e3…:
  * C1 5 / 0, C2 0 / 0, C3 370 / 0, C4 1 / 0, S1 0 / 0, S2 0 / 0;
  * exit 0 (`vpr3/dc.out`; its stderr lists the pre-existing unreadable-capture warnings).
* **Owner fidelity (63, 70, 72, 20 (h)).** Item 63: a dossier-set mode stays the dossier's, and a withdrawal
  re-resolves only the map-side mode, as item 20 (h) requires. Item 70: the owner's "a lot of forts … shacks" packing
  is unchanged, and only the source of its values moved. Item 72 (d‴): the re-homing is now named everywhere a
  cross-district move is described.

## 4. Issues (each with its owning part and the exact required change)

| id | sev | kind | owner | item / where | claim | required change |
|---|---|---|---|---|---|---|
| VPR3-01 | minor | conflict | pipeline | 70 (§10.2 `ClusterRow.kinds`, l. 11677; §4.7 S11 *Informal clusters* 3 (i), l. 5635–5636) | `depthM: number` cannot hold the bullet's shack depth "3–4 m" (l. 11706): the same scalar-for-a-range defect RP3-01 fixed on `fireGapM`. §4.7 3 (i) spaces the footpath web by "one structure depth" and "`2 × structure depth + path width`", but a path mixes kinds (squalid: shacks 0.5, tents 0.4, lean-tos 0.1; depths 3–4, 3 and 2 m), and no text says whose depth spaces the web. | §10.2: replace "`footprintM2: [number, number]; depthM: number }[];`" with "`footprintM2: [number, number]; depthM: [number, number] /* the kind's structure depth, drawn in the range on siteplan; §4.7's footpath web spaces by the row's largest upper end */ }[];`". The bullet's values are unchanged (a tent's 3 m and a lean-to's 2 m read as one-value ranges). §4.7 3 (i): replace "ending one structure depth before the opposite side" with "ending one structure depth — the largest `depthM` upper end among the cluster row's kinds (§10.2), which every later 'structure depth' of this step reads — before the opposite side". |
| VPR3-02 | minor | stale | pipeline | 63 (rationale Part A J-A63.41, l. 609) | "concealment a value … resolved once per institution from the dossier, then an assignment …". Since round 2 (J-A63.22) and round 3's §4.7 (1), a dossier event that withdraws the mode it set re-resolves it from the map-side sources. The entry now contradicts its own section. The index row (l. 17073) has no "once" and stands. | In Part A J-A63.41, replace "resolved once per institution from the dossier, then an assignment" with "resolved per institution when it is first placed — and again, from the map-side sources, only when a dossier event withdraws the mode the dossier set (J-A63.22) — from the dossier, then an assignment". Restate the entry under its id (RATIONALE-A only; swap hand-off). The index row is unchanged. |
| VPR3-03 | minor | duplicate | model | 63 (§2.7 `Use.concealmentSource` comment, l. 1817) | The comment restates §4.7 (1)'s re-resolution: its order "a map assignment's value, else the class table on the institution's `siting` draw, else `none`" and its outcome "(the use then placed as an open use) — as that event's least-disruption mutation (§7.7 items 5, 11 (b))". Round 3 made §4.7 (1), "the one statement of how such an institution is resolved, placed and built", state the same outcome. The two texts agree now, but a change to either leaves the other stale (pipeline r3 report §3; assemble-r3 §9 note 3). | In the comment, replace "one that withdraws the dossier's mode re-resolves the mode by §4.7's Concealed institutions (1) from the map-side sources — a map assignment's value, else the class table on the institution's `siting` draw, else `none` (the use then placed as an open use) — as that event's least-disruption mutation (§7.7 items 5, 11 (b)), writing their source." with "one that withdraws the dossier's mode re-resolves it, and re-places the use, by §4.7's Concealed institutions (1), writing their source." |
| VPR3-04 | minor | partial | determinism | 65, 66 (§7.3 item 9 (d), l. 8510–8513; II.7.6's closing sentence, l. 16180; §2.7 `UndergroundSystem.sources`, l. 1845) | "An undercity entrance that lacks its lifeline" is a closure instance, but no text defines an undercity entrance or the edit that leaves one without a lifeline. II.7.5 has lifelines and condition 4 only. The generators it names (II.7.6's target, connector, access-point and link steps) take a building: its lineage keys their draws, and the connector starts from its basement ring. So the instance has no entity to act on or to key by, and §2.7's `sources` cannot name what explains a `dug` passage it digs (assemble-r3 §9 note 2, which names only §7.3 and `sources`). | §7.3 item 9 (d): replace "an undercity entrance that lacks its lifeline (II.7.5, item 65)" (the text wraps a line) with "an undercity neighbourhood that an edit leaves without a lifeline (II.7.5's condition 4, item 65) — the closure's edit acting on that neighbourhood's `District` on the undercity's part —". II.7.6: replace "an undercity entrance's missing lifeline by the target, connector, access-point and link steps above (II.7.5)" with "an undercity neighbourhood's missing lifeline by the target, connector, access-point and link steps above (II.7.5), run from its nearest chamber in place of a basement and keyed by that district's lineage". §2.7 `sources` (model; with this change): after "the building whose access edit dug a passage (`addUndergroundAccess`, item 66)", add "or the undercity district whose lifeline closure dug one (§7.3 item 9 (d))". |

## 5. Sibling findings touching this part — read, concurred, not re-filed

The four sibling repair-r3 reports and assemble-r3 were read. assemble-r3 §9 note 1 (rendering, rationale-only C3 / C4
hits) and note 4 (scope, §16 M2b / M3b cells) do not touch this part. Notes 2 and 3 are filed above as VPR3-04 and
VPR3-03, because each one's text sits in, or restates, a subsection of this part. No sibling r3 verifier report existed
when this report was written.

## 6. Held parts (gate (a)) — none in this part; listed so nothing is lost

These stay held and absent from the part (the grep in §3 finds 0 hits, the same as the pre-r3 part):
* item 35 (support): the position check on 160 of 162 faces;
* item 60 (support): the 16-cell hand-off;
* item 68 (g): the MFCG cast-shadow absence;
* item 68 (support): VG 1.6.9's shadow and night layers, and Dwellings' shading and occlusion;
* item 52: the references' visibly different session maps;
* item 50 (MFCG clause): only the route's inference sentence.

Released and applied with labelled wording: item 37 (§4.6 step 5), item 58 (f) (II.2) and item 59's timing (another
part). Rejected: item 49's deletion (scope's §1.4). None of the required changes above touches a held part.

## 7. CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read and executed):
* the design and rationale hashes (70ddb6e3…, e138da23…);
* the part extracted from the pre-r3 archive and from the live design, then word-diffed (22 hunks, every one read);
* each repaired paragraph read whole, together with what it cites:
  * §4.7 S10b, *Concealed institutions* (1)–(10) and *Informal clusters* (2)–(5);
  * §4.11 *The rung at an epoch*; §10.2 `ClusterRow` and its bullet; II.7.6 whole;
  * §2.7 l. 1817 and 1845; §5.2 F-PLOT and F-SITING; §5.3 l. 6954; §7.3 item 9 (d); §7.7 contract items 1–5 and 11,
    F4 and the status row;
  * §13.2 T70 and T88-1; §14 l. 14356;
  * J-A88.42, J-A63.41, J-A63.22, J-A42.41 and J-P37 (index and Part A);
* the VD2-03 pointers in this part, checked one by one;
* the stale, deferral and held-part greps;
* the doc checks (exit 0);
* each required change's old text, found exactly once in its file (whitespace-normalised).

**PLAUSIBLE** (reasoning only): that each required change fixes its issue without creating a new conflict. In
particular:
* VPR3-01's choice of the deepest kind's upper end as the web's spacing depth (our own, draw-free);
* VPR3-04's reading of "an undercity entrance" as an undercity neighbourhood left without a lifeline. This is the
  closest defined record, and the repair seat should confirm it against II.7.5's condition 4.
