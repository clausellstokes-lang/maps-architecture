# Coherence verify — base part §3 geometry kernel (coherence/verify-kernel-r0s)

> Opus seat standing in for the verifier; round 0 full sweep after coherence/assemble-r0. PENDING FABLE REVIEW.

PROGRESS (lane `coherence/verify-kernel-r0s`, 2026-09-30)
- P0 brief read whole; resume state: no output, no LANDED line — fresh start: done
- P1 orientation: live §3 = docs/ARCHITECTURE.md l. 3058–4351, byte-identical to the rewrite's `new/base/kernel/01-geometry-kernel.md` (md5 99cb2e2e…; the assembler changed nothing in §3): done
- P2 whole-text reading: archive→live word diff per subsection (604 hunks, every hunk read) and the live §3 read whole: done
- P3 every inventory id (403) against the live text and the declared homes; canon routings (15 conflicts, f 202/245/279/510/560/575, g 110 and g 111–119, 9 wiring gaps, E-12–E-15, 38 edges, 77 open findings, G-lot): done
- P4 the other units' cross-part notes to the kernel, and a set-wide agreement sweep of the kernel's codes, types and new §3.11 number: done
- P5 references, J/D ids, receipts, retired terms, deferral wording, narration, doc checks: done
- P6 issues, result JSON, LANDED: done

## Outcome

**25 issues — 0 blocker, 7 major, 18 minor.** Owners: pipeline 6, model 4, kernel 4, determinism 3, rendering 2, V06 2, scope 2, V03 1, V09 1.

The kernel's own text is sound: every one of the 403 inventory ids is present at its home or at the home its pointer names, with four exceptions where the named home does not state the fact (VK0-01, VK0-02, VK0-03 pointers; VK0-23 a receipt whose meaning shifted); every conflict ruling (DXC-01/02/06, KIC-01–08, KXC-01–04) and every elegance ruling (E-12 kept apart; E-13, E-14, E-15 with their equivalence lists ticked item by item) is applied as ruled; f items 279, 245 and 575 are applied as written (202, 510 and 560 carry no kernel part); g item 110 (b)'s kernel part is in (§3.4, §3.2 (9), §3.6 held set (3), §3.7, §3.10); g items 111–119 name no kernel part (canon.json `g_routing` and the four dated rulings of 2026-09-30), so no F-MISSING; no retired term, no deferral wording, no narration; every §, II., Vnn §, J- and D- reference resolves and every bench receipt exists; J-K37 (the `W_STEINER` removal, KWG-01) is unique and recorded in both the index and Part A. The kernel's four issues are pointer and wording defects.

The weight is at the seams: the rewrite closed its half of W-FLD-01, KWG-04, KWG-07, the §3.10 stored-references edge and g item 110 (b)'s raised parts, and sent the other halves as cross-part notes (its notes 3–6, 10, 11, 15, 17, 18, 20, 26) that the model, pipeline, determinism and rendering rewrites — run in parallel — did not apply. The result is one-ended hooks the kernel now depends on: raised ground parts ≥ 1 absent from `PlatKey`/§2.1/§2.2 rules 1–2 (VK0-05), raised-way feet with no record field or vertex role (VK0-06), `E_INVARIANT` routed to an F-REDERIVE row that does not take it (VK0-08), an undeclared `Invariant` type (VK0-09), an untested `expect`/`onFail` mechanism (VK0-24), and stretch-state knots with no defined ordinals for §3.10's ordinal-order row (VK0-25). §4.3 contradicts the owner's rule on where a raised way's piers stand (VK0-04). The set-wide sweep found `E_NON_SIMPLE`, a code §3.1 never defined, entered by the coherence rewrite in four units (VK0-14–VK0-17), and three citations the new base §3.11 now captures (VK0-21, VK0-22).

## Sizes

| measure | archive §3 | live §3 |
|---|---|---|
| words (`wc -w` on the section as extracted, heading included) | 23 323 | 24 607 (+5.5 %) |
| lines | 1 228 | 1 294 |

The part grew (the rewrite reports 23 820 → 25 103 by its own count: ≈ 1 245 words removed, ≈ 2 530 mandated words added — §3.11, the E_DEGENERATE detail table, wiring and edge outcomes, g item 110's raised parts). No shrink beyond half, so no whole-section nuance audit was compelled; the elegance rulings' equivalence lists were nevertheless checked item by item against the archive (below). The part stays above the 25–40 % band for the reason the rewrite gives (mechanism, numeric argument, receipts and fallbacks with one home each, plus mandated additions) — not a defect.

## Method

1. **Whole-text diff.** Archive §3 (docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md l. 2452–3679) against live §3, word-level per subsection (intro 1 hunk; 3.1 80; 3.2 98; 3.3 115; 3.4 161; 3.5 35; 3.6 51; 3.7 36; 3.8 11; 3.9 3; 3.10 27; 3.11 new). Every hunk read; every deletion traced to its new statement in §3 or to the home its pointer names.
2. **Every inventory id.** The rewrite's mapping table (403 of 403: 332 home, 16 reference, 55 glossary) checked row by row: the 332 home rows against the diff (no deletion without a surviving statement); the 16 references and ≈ 30 moved facts read at their homes (below); the 55 glossary terms found in the live text. An independent token check (541 numbers, codes, identifiers and § references of the archive section) left 36 tokens absent from live §3, each accounted for (moved to its home, formatting only, `W_STEINER` removed by J-K37, KBR-04's pointer fix) except the ≈ 200 000-record figure (VK0-01).
3. **Canon routings** (canon.json `units.kernel`, canon.md *kernel*, the four dated rulings of 2026-09-30) checked against the live text, and each ruling's other half against its unit's live text.
4. **Edges.** The 38 kernel edges of edges.json (23 UNDEFINED, 15 UNTESTED): each now has its outcome in place and a row of §3.11 with its tier; §13.1's constructive set carries every §3.11 case by pointer plus the further limits (l. 15340–15347). The kernel owns no combination (edges.json `combinations`: 0 with owner kernel).
5. **Cross-part notes to the kernel**: determinism's (E_OUT_OF_RANGE's two uses, F-SKELETON named, grid cells cited — all met), scope's (KIC-02's service list agreeing with §14's `Kernel` — met; §14 l. 17031), the model's (J-RM3: name `Document.nextGroundPart` — not met, VK0-07; the rest met); pipeline, rendering and the twelve volumes address none to the kernel.
6. **Agreement sweep** over the base and V01–V12 for every kernel code, warning, type and the new §3.11 number.
7. **Doc checks** (`docs/validation/bench/doc_checks.py --sections 3`): exit 0; C1 5, C2 1, C3 95, C4 0, S1 0, S2 139 hits, 0 unreviewed. The script warns 'reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) — clean-room results are NOT authoritative': the result is PROVISIONAL until re-run on the machine that holds the corpus.

## Moved facts verified at their homes

| fact (inventory id) | home named | found |
|---|---|---|
| lattice values 25 / 26 / 500 (0061–0063) | §2.2 `LatticeSpec` | yes, l. 559 |
| class floors 2.5 m, 12°, `minCorridor` (0064) | §4.7 class-floor paragraph | values yes (l. 6173–6176); the FTG sheared-quad justification no — VK0-02 |
| rung frame areas 4 / 25 / 64 km² (0079) | §1.1 ladder | yes, l. 321–323 |
| cap 120 000, 153.6 km² (0059) | §12.2 | yes, l. 14714 |
| raster whole-cell growth, `cellCm` kept; TOWN 5 m cell (0090, 0093) | §2.3 | yes, l. 931–935 |
| random floats from integers; nightly cross-platform run (0070) | §6.1, §13.3 (via §6.5) | yes, l. 8739, 16259 |
| the division lint (0078) | §6.5 (3) | yes, l. 9248 |
| step (0): ≈ 9 000 items, ≈ 2.3 ms at CITY (0123) | §12.4 S10 (0) row | yes, l. 14826 |
| copy ≤ ≈ 15 MB, ≈ 1.5 ms; ≈ 20 MB after edits (0125) | §12.4 merge row, §2.2 *Size* | yes, l. 14829, 875–884; the three-copy receipt's placement — VK0-23 |
| arena ≈ 12 MB at CITY | §2.2 *Size* | yes, l. 875 |
| ≈ 200 000 records merged within 8 ms (0132) | §12.4 merge row | 8 ms yes; the record count no — VK0-01 |
| grid cells 25 / 10 / 5 m (0135) | V11 §3.1 row 92 `index.gridCellM` | yes, V11 l. 938 |
| fixed-ring lists, re-cut rule, storey seed extents (0207, 0221) | §2.6 plan rung step 4, *The re-cut, both ways* | yes, l. 1916–1920, 2055–2062, 1676 |
| `ridgeAxis` rect/quad definition (0309) | §2.6 `BaseWing.ridgeAxis` | yes, l. 1259–1261 |
| held point records inside host face at clearance (0275) | §7.4 | yes, l. 10407–10414 |
| rotation re-snaps every vertex (0278) | §7.1 | yes, l. 9513 |
| roof cache key (0302) | §8.1 (5) | yes, l. 11460–11463; `revision` defined l. 11383 |
| antennae omitted from exported rings (0265) | §11.1 | stated, but §11.1 and §3.6 rule 6 cite each other — VK0-03 |
| wood edge thinned by domain-warped density (0013) | §4.9, §8.10 | yes, l. 7081, 12988 |
| passage cut along a side line; the seal bit (0351) | §2.5 `Passage` | yes, l. 1146–1149 |
| bent-cut ladder: turned frames bounded, nothing above F restarted | §4.6 step 8 | yes, l. 5977–5997 |
| CGAL's full grounds | J-A21.31 (Part A) | yes, rationale l. 350 |
| Cdeg the one angle unit (E-15) | §2.1 | yes, l. 493 |
| profiles: ring cyclic, step categorical | §2.2 rule 5 | yes, l. 772–774 |
| E-GEN-1 | §5.1 (9) | yes, l. 8319 |
| §3.11's cases tested | §13.1 | yes, l. 15340–15347 |
| commit-record `work` and counts bounded | §13.2 *Batch cost* | yes, l. 15440 |
| `resolve` PlatKey-only; `view`/`readBack` on transient arenas | §14 `Kernel` | yes, l. 17031 |

## Canon routings

| routing | status |
|---|---|
| DXC-01 = KXC-01 (E_OUT_OF_RANGE's two uses) | applied: §3.1 comment, §3.6 chain classes; §5.2 F-NUM keeps the code citing §3.1 (l. 8355) |
| DXC-02 = KXC-04 (F-SKELETON) | applied: §3.8 names F-SKELETON beside W_DOWNGRADE; §5.2 cites 'the four post-conditions' (l. 8375) — its third trigger missing, VK0-10 |
| DXC-06 = KXC-02 (class floors) | applied: §3.2 (2) kind rule only; §4.7 row with the values; §3.10, §5.2, §5.3 cite without values — justification lost, VK0-02 |
| KIC-01 … KIC-08 | all applied as ruled (anchor uniqueness via allocation rule and §13.1 l. 15306; the transient service list once; level = fromLevel; smoothing holds kernel pins; nested kept content; 'simple or retraces only declared antennae'; (1) restricted to arena geometry; 'each L2–L4 partition') |
| KXC-03 (the clear rule) | applied: §3.3 states it citing §7.2; §2.2 rule 6 references §3.3 (l. 831) |
| KXC-05 (§5.4 warnings) | determinism's half applied: `a count per Warning code of §3.1`, `downgrades` = W_DOWNGRADE (l. 8492) |
| f 279 (BCR-V7-30) | applied as written at §3.2 (9), frame growth reads the same law; `Frame.marginShare` agrees with V07's `territory.marginShare` (V07 l. 398, 455) |
| f 245, 575 (knot doors) | applied: §3.4 *The doors*, `splitThrough` landing on a vertex; the model's renumbering half missing — VK0-25 |
| f 202, 510, 560 | no kernel part (routing matched a volume's '§3.x'): confirmed against the items' text |
| g 110 (b) | kernel part applied (§3.4, §3.2 (9), §3.6 (3), §3.7, §3.10); the model's §2.1/§2.2 half missing — VK0-05, VK0-06 |
| g 111–119 | no kernel part named (canon.json g_routing; dated rulings J127–J130): nothing to find missing |
| W-FLD-01 (major) | kernel half applied (§3.3 *Expectations*); `Invariant` undeclared — VK0-09; untested — VK0-24 |
| W-FLD-02 | applied: readers named (§8.1 via §7.3's locality closure, §6.2, §13.2 *Batch cost*) |
| KWG-01 | W_STEINER removed with ruling J-K37 (index l. 20234, Part A l. 818); no use left in the set |
| KWG-02 | applied: §3.6 steps 1–3 emit W_ATTRACTED |
| KWG-04 | kernel half applied (readers bracketed); §5.2 half missing — VK0-10; one bracket wrong — VK0-11 |
| KWG-06 / W-SET-01 | applied: §3.3 cites `index.gridCellM` (V11 §3.1 row 92 holds 25/10/5 m) |
| KWG-07 | kernel half applied; the consumers do not name the ops — VK0-12 |
| KWG-09 / E-15 | applied: no binary angle anywhere in the set |
| E-12 KEEP APART | held: E_LOCKED fails, clearFiner reports and clears, warp holds and succeeds |
| E-13 UNIFY | equivalence ticked: stretch, seed, fixed, overlap, fit, collinear, empty, collapsed each with its op; each contract once at its op (obb line, regular fit, Stretches, transient opening, §3.7); `ratio` detail added |
| E-14 UNIFY | equivalence ticked: max(256, ¼) once (rebuild moment (2)); placement bound once (§3.10 row); moves keep nothing once (§3.6); §3.5 pointers — one row mis-aimed, VK0-19 |
| G-lot | applied ('the plot cut's one bend'); 0 retired terms of the glossary's 35 patterns left in §3 |
| 77 open findings | closed as the rewrite states; KERNEL-RESTATEMENTS-012 and -014 land on homes that do not carry the fact — VK0-01, VK0-03 |
| 38 edges | each defined in place and indexed in §3.11; tested through §13.1; §3.10 E5's receiving ladder missing — VK0-08 |

## Issues

### VK0-01 — minor — LOST — owner: rendering

**Claim.** KERNEL-0132 (§3.3 pool step 4, archive: 'the ≈ 200 000 records S10–S12b create at CITY merge within §12.4's 8 ms merge row') was cut to 'The cost is O(overlay size) (§12.4's merge row)' under RESTATEMENTS-012, but §12.4's merge row (ARCHITECTURE.md l. 14829) states only the copies' sizes and times and '13 ms (8 merge + 5 copies)': the ≈ 200 000-record CITY merge workload is stated nowhere in the set — a reference that points at a section that does not state the fact.

**Required change.** §12.4's merge row, work column: after '(the frozen arena copied once to each pool worker; the overlays and the hinterland unit merged in lineage order)' add 'the ≈ 200 000 records S10–S12b create at CITY, merged in O(overlay size) (§3.3 pool step 4)', so the 8 ms merge budget carries its workload; §3.3 keeps its pointer.

### VK0-02 — minor — LOST — owner: pipeline

**Claim.** KERNEL-0064: the archive's §3.2 (2) justified the plot angle floor — 'minInteriorAnglePlot = 12° (FTG's sheared quads at p95 22.9° corner deviation stay legal — invariants police validity, not regularity)'. The rewrite moved the values to §4.7's class-floor paragraph (cross-part note 10 asked for the clause to move with them), but §4.7 (l. 6173–6176) states '2.5 m and 12°' without it; the general principle survives at §5 item 4 and the 22.9° figure in §13's target table, but the tie between the 12° floor and FTG's sheared quads is lost.

**Required change.** §4.7 *The class floors*: after '`minInteriorAnglePlot` 12°' add '(FTG's sheared quads, worst-corner p95 22.9°, stay legal — invariants police validity, not regularity, §5 principle 4)'.

### VK0-03 — minor — BROKEN-REFERENCE — owner: rendering

**Claim.** §3.6 contact rule 6 says 'A face's exported area boundary omits its antennae (§11.1)' and §11.1's GeoJSON row says 'faces as Polygons with holes, emitted without antennae (§3.6 (6))' (l. 14084; T-ER-19 l. 14648 likewise cites §3.6 (6)): each points at the other as the rule's home, so neither is the canonical statement. The kernel's cross-part note 26 (KERNEL-0265, reference → §11.1) asked §11.1 to cite '(an antenna: §3.6 rule 3)' instead; not applied.

**Required change.** §11.1 GeoJSON row: replace '(§3.6 (6))' with '(an antenna: §3.6 rule 3)'; T-ER-19: replace 'faces written without antennae, §3.6 (6)' with 'faces written without antennae, §11.1'. §3.6 rule 6 keeps its pointer to §11.1.

### VK0-04 — major — CONFLICT — owner: pipeline

**Claim.** §4.3 *Raised ways* (l. 5124–5128) says a raised way's 'deck, supports, feet, spans and an aqueduct's channel live in their own arena part of the ground layer … its supports are footprints on its part'. That contradicts the owner's rule (g item 110 (b): 'Its piers are footprints on the ground part'), §2.7's `RaisedWayRecord.supports.ring` ('its footprint on ground part 0'), §3.4's raised-ways bullet ('its piers are footprints on part 0 … which part-0 stages read through the services') and its two feet ('each a vertex on part 0 and one on the raised part'), and V05 §1 / V04 (piers on ground part 0). Arena isolation (§3.10) and every part-0 reader of the piers depend on which arena holds them.

**Required change.** §4.3 *Raised ways*: replace 'its deck, supports, feet, spans and an aqueduct's channel live in their own arena part of the ground layer' with 'its deck, spans and an aqueduct's channel live in their own arena part of the ground layer', and 'its supports are footprints on its part' with 'its supports are footprints on ground part 0 (§2.7's `supports`) and each of its two feet a vertex on part 0 joined by record to one on its part (§3.4)'.

### VK0-05 — major — WIRING — owner: model

**Claim.** g item 110 (b)'s raised ground parts are absent from the model's arena definitions the kernel cites: §2.2's `PlatKey` comment (l. 543) lists 'part 0 = the ground …; underground parts ≥ 1 …; sky parts ≥ 1 …' and no ground part ≥ 1; §2.1's *Arena parts* bullet (l. 516–522) names the ground, the underground parts and the sky parts and only the counters `nextUndergroundPart` and `nextSkyPart`, though §2.9 declares `nextGroundPart` (l. 2745) and §2.4/§2.7 say a raised way lies 'on a ground arena part ≥ 1 (§2.1)'; §2.2 rule 1's 'other arenas take the same five views' list gives no level mapping (L0–L4) for a raised part; rule 2's list of arenas that never share topology and of cross-arena links omits raised parts and their feet. The kernel's §3.4 ('as the underground's and the sky's parts are (§2.2's `PlatKey`)'), §3.2 (9) (a raised part's outer ring 'the frame with its margin (§2.2 rule 1 …)'), §3.7 (a raised part's bands) and §3.10 (arena isolation) therefore point at text that does not state the fact (the kernel's cross-part notes 3–4 not closed).

**Required change.** §2.2 `PlatKey` comment: add 'ground parts ≥ 1 = one arena per raised way (g item 110 (b); §3.4), numbered by `Document.nextGroundPart`'. §2.1 *Arena parts*: add the raised ground parts to the list and `Document.nextGroundPart` to the counters that never decrease. §2.2 rule 1, *The other arenas*: add a bullet '**A raised ground part** (g item 110 (b)): L0 its outer ring — the ground's frame plus its context margin, growing with it by §3.2 (9) (§2.7 *At the frame*), a chain carrying `margin` on the raised way's record — and the one face inside it; L1 the raised way's centreline (a `way` chain); L2 its corridor band from `corridorUnion` (§3.7); L3–L4 none (a raised deck carries no plot, §2.7)'. §2.2 rule 2: 'The ground, each raised part of the ground layer, each underground part and each sky island are separate arenas …', and add 'a raised way's feet' to the cross-arena links.

### VK0-06 — major — WIRING — owner: model

**Claim.** A raised way's two feet are a one-ended hook. §3.4 says each foot is 'a vertex on part 0 and one on the raised part … Each end names its part (`{ part; at }`), so `resolve` reads it with that part's key'; §3.6's held set (3) holds 'a raised way's part-0 feet'; §3.10's stored-references row checks 'every indexed role … exactly one vertex … per ordinal (… a raised way's two feet each in the part its end names)'; §13.1 tests them. But `RaisedWayRecord` (§2.7, l. 2131–2140) has no feet field and §2.2 rule 7's vertex-role registry (l. 840) has no role for a foot (the underground link has `link_end`; nothing corresponds for raised feet), so no record stores the ends the kernel places, holds and checks (the kernel's cross-part note 5 not closed).

**Required change.** §2.2 rule 7's vertex roles: add *`raised_foot`* (`('raised_foot', raised way id, 0 | 1)`: one vertex in ground part 0 and one in the raised way's part per foot, as `link_end`; g item 110 (b)). §2.7 `RaisedWayRecord`: add `feet: [{ part: number; at: VertexRef }, { part: number; at: VertexRef }]` per foot end (or state that the feet are the `raised_foot` rows, resolved per part), with the lifecycle sentence 're-placed by the raised way's re-derivation, one transaction per part (§3.4)'.

### VK0-07 — minor — BROKEN-REFERENCE — owner: kernel

**Claim.** §3.4's raised-ways bullet says the parts are 'numbered from 1 …, allocated once and never renumbered or reused, as the underground's and the sky's parts are (§2.2's `PlatKey`)' without naming the counter (the model's cross-part note to the kernel, J-RM3: '§3.4 names `Document.nextGroundPart`'), and §3.2 (9)'s parenthesis sends a raised part's frame-with-margin outer ring to '§3.4', which does not state it — the statement is §2.7's *At the frame* (J-A110.22). The same bullet says the piers are 'footprints on part 0 (§2.7's `supports`), which part-0 stages read through the services', but a support's ring is a point attribute of the raised way's record (§2.7, §2.2 rule 5), which no kernel service (§3.4) returns; part-0 stages read it through §4.1's `raised` data key.

**Required change.** §3.4 raised-ways bullet: 'numbered from 1 (part 0 is the ground) by `Document.nextGroundPart` (§2.9), allocated once …'. §3.2 (9): replace '— and each raised part of the ground layer, §3.4)' with '— and each raised part of the ground layer, §2.7 *At the frame*)'. §3.4 raised-ways bullet: 'its piers are footprints on part 0 (§2.7's `supports`), which part-0 stages read from the record through §4.1's `raised` data key'.

### VK0-08 — major — EDGE-UNDEFINED — owner: determinism

**Claim.** §3.10's stored-references row (new text, closing edge M-kernel-3638-E5-data) and §3.11's *missing data* row route a stored reference that no longer resolves after an edit to F-REDERIVE ('a failure returns `E_INVARIANT` naming the reference — … after an edit F-REDERIVE's (§5.2)'), but §5.2's F-REDERIVE row (l. 8381) detects only plots/footprints in new water or corridors, ways meeting new water off a deck, decks over land and crossing sites off a shore: it neither detects `E_INVARIANT` from §3.10's row nor gives it a ladder, so the edge's outcome is undefined at its receiving end (the kernel's cross-part note 20 not closed).

**Required change.** §5.2 F-REDERIVE: detection column add '§3.10's stored-references row failing after the re-derivation (`E_INVARIANT` naming the reference: a live entity's `FaceRef`/`ChainRef`/`EdgeSetRef`/`VertexRef` that finds no geometry, an indexed role without its one vertex per ordinal)'; ladder add 'an entity whose reference no longer resolves is re-derived under its successor address (§6.3) → else tombstoned with a lifecycle event whose cause is the edit, listed in the fate report; a locked or pinned entity's returns to the dry run as F-EDIT'.

### VK0-09 — major — WIRING — owner: determinism

**Claim.** W-FLD-01 (major; `KernelTx.expect`/`onFail`) is closed only on the kernel's side. §3.3 now fills `expect` from 'the issuing stage's StageDecl.invariants of scope batch (§4.12)' and the class floors, and returns `E_BELOW_MIN_WIDTH`/`_AREA`/`_ANGLE` for 'a failed class floor of `expect`' and `E_INVARIANT` for 'any other failed entry' — but the `Invariant` type that both `KernelTx.expect` (l. 3253) and `StageDecl.invariants` (l. 8146, 'each with its scope, §5.3') are typed with is declared nowhere in the set: no name, scope, hard/soft class, class-floor-or-check discriminant or check (the kernel's cross-part note 18 not closed), so the kernel's class-floor/other split and §5.3's per-scope evaluation read a type with no definition.

**Required change.** §5.3, after its opening paragraph: declare `type Invariant = { name: string; scope: 'batch'|'stage'|'save'|'load'|'ci'; class: 'hard'|'soft'; kind: 'classFloor'|'check'; floor?: { faceClass: string } /* kind classFloor: its widths, areas and angles are §4.7's class-floor row */; check?: string /* kind check: the named predicate of this suite's row */ }` — 'the entries of `StageDecl.invariants` (§4.12) and of `KernelTx.expect` (§3.3)'.

### VK0-10 — minor — WIRING — owner: determinism

**Claim.** KWG-04's link ('§5.2 detection columns name the codes') is closed only on the kernel's side: §3.1 now brackets the readers — `E_HOLE_CONTACT` [F-CUT], `E_BELOW_MIN_AREA`/`E_BELOW_MIN_WIDTH` [F-CUT, F-CORRIDOR, F-PLOT], `E_BELOW_MIN_ANGLE` (class floor) — but §5.2 (l. 8347–8394) names none of `E_HOLE_CONTACT`, `E_BELOW_MIN_AREA`, `E_BELOW_MIN_WIDTH`: F-CUT says 'a child fails simple / min area / min width / min angle', F-CORRIDOR 'a face below its class floor', F-PLOT 'frontage or wedge angle below §4.7's class-floor row' (the kernel's cross-part note 17 not closed). Likewise F-SKELETON's detection (l. 8375) names the four post-conditions and the work limit but not the third trigger §3.8 now routes to it — 'an input the numeric contract refuses' (a corner sharper than 5°, a hole touching the outer ring or another hole; cross-part note 15).

**Required change.** §5.2: F-CUT detection 'E_NOT_TWO_CROSSINGS, E_HOLE_CONTACT; a child fails simple / min area / min width / min angle (E_BELOW_MIN_AREA, E_BELOW_MIN_WIDTH, E_BELOW_MIN_ANGLE from the batch's `KernelTx.expect`, §3.3)'; F-CORRIDOR 'a face below its class floor (`E_BELOW_MIN_WIDTH`, `E_BELOW_MIN_AREA`) after `corridorUnion`'; F-PLOT '… below §4.7's class-floor row (`E_BELOW_MIN_WIDTH`, `E_BELOW_MIN_AREA`, `E_BELOW_MIN_ANGLE`)'; F-SKELETON '§3.8's four post-conditions fail, the skeleton's work limit is reached (`E_WORK_LIMIT`), or the input is one §3.8's numeric contract refuses (a corner sharper than 5°, a hole touching the outer ring or another hole)'.

### VK0-11 — minor — NEW-PROBLEM — owner: kernel

**Claim.** §3.1's `KernelError` comment (new text) names `E_NO_PATH`'s readers as '[F-ROUTE, F-RIVER]', but a river's course is traced by steepest descent (§4.2 S1, l. 4651–4654), not by the path search, and §5.2's F-RIVER row detects sinks, carve depth, frame exits and missing crossing sites, never `E_NO_PATH`: the bracket names a reader that never receives the code.

**Required change.** §3.1: `'E_NO_PATH' // with the closest reached point [F-ROUTE]`.

### VK0-12 — minor — WIRING — owner: pipeline

**Claim.** KWG-07's consumer half is open: §3.4 now says `hexLattice` is 'S4's routing lattice, built at §4.2 S3 (3)' whose 'spacingCm ≥ minEdge and 0 ≤ jitterCm < spacingCm ÷ 2 … are asserted — the caller's table cells hold them', and §3.7 names `offsetFace` for S11's per-edge setbacks, but §4.3 *Lattice and costs* (l. 5072–5076) describes 'a jittered hexagonal point set at ≈ 25 m spacing … the jitter bounded so no edge crosses another' without naming `hexLattice` or the cells holding spacing and jitter, and §4.7 S11 never names `offsetFace` (canon link: 'Consumers name the op at their home (§4.3 hexLattice, §4.7 S11 offsetFace)'; the kernel's cross-part note 11).

**Required change.** §4.3 *Lattice and costs*: 'a jittered hexagonal point set built by `hexLattice` (§3.4) at ≈ 25 m spacing, its jitter below half the spacing (so §3.4's asserts hold) …'. §4.7 S11, where the template's setbacks are applied: 'per-edge setbacks by `offsetFace` (§3.4, §3.7)'.

### VK0-13 — minor — CONFLICT — owner: model

**Claim.** The corrupt-cache condition is stated two ways: §3.9 (new text) says 'A chunk that fails to decode, a lattice-point reference that finds no vertex, or a rebuilt arena whose digests differ makes the stored geometry a corrupt cache: the document loads by replay (§2.9 step 5)', while §2.9's *Corrupt cache* bullet (l. 2877–2881), the load's home, lists only 'A model root or a records root that differs, or a chunk whose bytes miss their content hash' — so a decode failure or an unresolved lattice-point reference in a chunk whose hash matches has no route at §2.9.

**Required change.** §2.9 *Corrupt cache*: 'A model root or a records root that differs, a chunk whose bytes miss their content hash, or geometry the kernel's load cannot rebuild — a chunk that fails to decode or a lattice-point reference that finds no vertex (§3.9) — is a **corrupt cache** …'.

### VK0-14 — minor — CONFLICT — owner: pipeline

**Claim.** §4.1 *Transactions* (l. 4456–4458) says a degenerate result 'is refused by the kernel (§3.1's `E_DEGENERATE`, `E_BELOW_MIN_EDGE`, `E_NON_SIMPLE` …)', but §3.1's `KernelError` — the codes' one home — has no `E_NON_SIMPLE` (a ring whose role requires a simple polygon and crosses itself is `E_SELF_INTERSECT`; a face that is not simple fails §3.10's row, `E_INVARIANT`). The code came into the set with the coherence rewrite (absent from the archive; edges.json's general rule used it).

**Required change.** §4.1 *Transactions*: replace '`E_NON_SIMPLE` …' with '`E_SELF_INTERSECT`, `E_INVARIANT` …'.

### VK0-15 — minor — CONFLICT — owner: V03

**Claim.** V03 §3.4 (l. 1226–1227) says 'a seed piece the kernel refuses (zero area, below `minEdge`, non-simple after the clip — §3.1's `E_DEGENERATE`, `E_BELOW_MIN_EDGE`, `E_NON_SIMPLE`)', and V03 l. 1977–1978 'Degenerate geometry is refused by the kernel (§3.1's `E_DEGENERATE`, `E_BELOW_MIN_EDGE`, `E_NON_SIMPLE`)'. §3.1 has no `E_NON_SIMPLE`, `E_BELOW_MIN_EDGE` is raised on optional chains only (§3.1, §3.6), and §3.4 states the transient arena's refusal of a seed ring that breaks `minEdge`, clearance or simplicity as `E_DEGENERATE` detail `seed` (a seed-clip piece left with a hole: detail `overlap`). New text of the coherence rewrite.

**Required change.** V03 l. 1227: '(zero area, below `minEdge`, non-simple after the clip — `E_DEGENERATE` with detail `seed`, or `overlap` for a piece left with a hole, §3.4)'. V03 l. 1978: 'Degenerate geometry is refused by the kernel (§3.1's `E_DEGENERATE` with its §3.4 details on the transient arena, `E_INVARIANT` for a §3.10 row)'.

### VK0-16 — minor — CONFLICT — owner: V06

**Claim.** V06 (l. 3135) cites 'a degenerate result the kernel refuses (`E_DEGENERATE`, `E_BELOW_MIN_EDGE`, `E_NON_SIMPLE` …)'; §3.1's `KernelError` has no `E_NON_SIMPLE` (the non-simple ring code is `E_SELF_INTERSECT`, a non-simple face fails §3.10's row with `E_INVARIANT`). New text of the coherence rewrite.

**Required change.** V06 l. 3135: replace '`E_NON_SIMPLE` …' with '`E_SELF_INTERSECT`, `E_INVARIANT` …'.

### VK0-17 — minor — CONFLICT — owner: V09

**Claim.** V09 (l. 1426–1427) cites the dry run's 'kernel refusal (`E_DEGENERATE`, `E_BELOW_MIN_EDGE`, `E_NON_SIMPLE` …)'; §3.1's `KernelError` has no `E_NON_SIMPLE` (a self-crossing drawn boundary is `E_SELF_INTERSECT`, whose reader §3.1 names as 'an edit's dry run'). New text of the coherence rewrite.

**Required change.** V09 l. 1427: replace '`E_NON_SIMPLE` …' with '`E_SELF_INTERSECT` …'.

### VK0-18 — minor — BROKEN-REFERENCE — owner: pipeline

**Claim.** §4.7 S11's front-line jitter floor (l. 6543) reads '`attractCm` (26 cm, §3.2)': under RESTATEMENTS-006 the value's one home is §2.2's `LatticeSpec` and §3.2 (2) now gives only its meaning, so the pointer names a section that does not state the value; §4.3 (l. 5105) restates the value as 'within 26 cm' where `attractCm` (§2.2) serves.

**Required change.** §4.7 l. 6543: '`attractCm` (§2.2's `LatticeSpec`; its meaning §3.2 (2))'. §4.3 l. 5105: 'folds any residual near-duplicate within `attractCm` (§3.6)'.

### VK0-19 — minor — BROKEN-REFERENCE — owner: kernel

**Claim.** E-14 (KEL-05) turned §3.5 into a table of pointers. The archive's answer to 'the 2017 cut routine's … unbounded recursion' was 'recursion bounded by the class band and a depth cap, every rejection logged (§4.6)'; the live row reads '`E_NOT_TWO_CROSSINGS` and `connectHole` (§3.6); the bent cut's bounded, logged ladder (§4.6, §5.2 F-CUT)' — which bounds the retry ladder (the NG row's answer), not the recursion. The recursion's two bounds still hold at their homes (§4.6 step 1's stop test on the district's block-depth range; the recursion-depth work limit, §5.1 (5), F-WORK) but the traceability row no longer points at either, so the table's answer to 'unbounded recursion' points at the wrong bound (the homes keep both, so no behaviour is lost).

**Required change.** §3.5, that row's answer: '`E_NOT_TWO_CROSSINGS` and `connectHole` (§3.6); the bent cut's recursion bounded by §4.6 step 1's stop test and by its recursion-depth work limit (§5.1 (5), F-WORK), every rejection logged on its ladder (§4.6, §5.2 F-CUT)'.

### VK0-20 — minor — WIRING — owner: scope

**Claim.** §3.3 pool step 3 calls the merge's `E_SCOPE` check 'defence in depth that a test asserts never fires', and §3.1's `KernelError` (new bracket) names that reader as '[the pool test that asserts it never fires, §13.2]'; but §13.2 states no such assertion — its pool runs (l. 15455–15459, 15509–15510) check identical digests and empty grids and tombstone sets only — and §13.1's pool fixture (l. 15322) constructs an overlay writing outside its district to see `E_SCOPE` raised, the opposite case. The code's 'never fires' reader is one-ended.

**Required change.** §13.2, B-EDIT's pool clause (l. 15509–15510, 'each at pool sizes 0 and 3 with identical digests, every freeze finding …'): add 'and no merge failing with `E_SCOPE` (§3.3 pool step 3, §3.10's pool-scope row)'; and the one-click determinism run at pool sizes 0–3 (l. 15455) likewise: 'no merge raising `E_SCOPE`'.

### VK0-21 — minor — BROKEN-REFERENCE — owner: V06

**Claim.** The rewrite added a base §3.11 ('The kernel at its limits'), so a bare `§3.11` now resolves to it under the set's citation rule (bare § = the base). V06's settings table (l. 522) reads '`hazards` | V06 §2.4's rows | the hazard operators (§3.11)' — meaning V06 §3.11 (the hazard operators, V06 §3.11.1–§3.11.2), not the kernel's limits.

**Required change.** V06 l. 522: '(V06 §3.11)'.

### VK0-22 — minor — BROKEN-REFERENCE — owner: pipeline

**Claim.** With the new base §3.11, two base list-continuation citations meant for V07 now read as the kernel's limits: §4.11 (l. 7759) 'routed to the village product when one is registered (V07 §2.1, §3.11)' and §10.2 (l. 13623) '(V07 §3.2 (3), §3.11)' — both mean V07 §3.11.

**Required change.** §4.11 l. 7759: '(V07 §2.1, V07 §3.11)'; §10.2 l. 13623: '(V07 §3.2 (3), V07 §3.11)'.

### VK0-23 — minor — CHANGED — owner: kernel

**Claim.** §3.3 pool step 1 (l. 3433–3437) now reads '… at the one-click freeze ≈ 60 000–90 000 items …, ≈ 2.2–3.3 MB plus ≈ 0.2 MB of home column; at a freeze after edits ≈ 0.5 MB of home column; three copies measured at ≈ 4.6 ms (`fixall_kernel_r4_bench.out` A)'. In the archive the receipt belonged to the one-click copies ('≤ ≈ 15 MB per copy and one memory copy of ≈ 1.5 ms per worker (≈ 4.6 ms for three, measured, r4 A); at a freeze after edits ≈ 20 MB (… ≈ 2 ms each)'); placed after the after-edits clause it now reads as the after-edits copies' time, which §2.2 *Size* (l. 884: '≈ 2 ms at 20 MB') and §12.4's merge row contradict.

**Required change.** §3.3 pool step 1: '… ≈ 2.2–3.3 MB plus ≈ 0.2 MB of home column, three such copies measured at ≈ 4.6 ms (`fixall_kernel_r4_bench.out` A); at a freeze after edits ≈ 0.5 MB of home column. Its size and time per copy are §12.4's merge row …'.

### VK0-24 — major — EDGE-UNTESTED — owner: scope

**Claim.** The mechanism W-FLD-01 added at §3.3 *Expectations* — a failed `KernelTx.expect` class floor returning `E_BELOW_MIN_WIDTH`/`_AREA`/`_ANGLE`, any other failed entry `E_INVARIANT`, and `onFail`'s three outcomes (`reject`: nothing committed, the code to the stage's class; `repair`: `absorbSliver` on each face below its floor, re-checked, rejected if a failure remains; `downgrade`: nothing committed, the code for the ladder's simpler rung) — has no test anywhere in §13 (no fixture names `expect`, `onFail` or a class floor failing inside a batch). Every mechanism that can fail needs its test (principles (7), (11)).

**Required change.** §13.1's constructive set, after the §3.11 clause: 'a batch whose `expect` carries a class floor its result breaks, under each `onFail` — `reject` (version kept, the `E_BELOW_MIN_*` code returned), `repair` (a sliver below its width or area floor absorbed and the batch committed; a face below its angle floor still rejected after the repair), `downgrade` (version kept, the code returned) — and a failed non-floor entry (`E_INVARIANT`)'.

### VK0-25 — major — EDGE-UNDEFINED — owner: model

**Claim.** A stretch-state write (items 245, 575; §2.2 rule 5 *Stretch-state profiles*, *Write*, l. 806–808) places 'a knot at each end' of its `StretchRef`, but nothing states which ordinals the new knots take when the stretch lies between existing knots, nor that the profile is renumbered after the canonical form drops knots; §3.4's doors add a knot only with its ordinal ('any other indexed row carries its ordinal, an assertion otherwise') and §3.10's stored-references row requires 'every `ChainProfile`'s knots lie on its chain in ordinal order'. A mid-chain write therefore has no defined ordinal assignment, and the natural next-free ordinal fails §3.10 at save (`E_INVARIANT`). The kernel's cross-part note 6 asked for the renumbering; not applied (the river's control knots, by contrast, define theirs: `nextControl`, l. 921).

**Required change.** §2.2 rule 5 *Stretch-state profiles*, *Write*: add 'After placing its end knots and applying the canonical form, the writer renumbers the profile's knots from 0 in chain order in the same batch — each knot row whose ordinal changes stripped by `removeEdges` on its `VertexRef` and re-added by `splitThrough` landing on its vertex with the new ordinal (§3.4's doors) — so §3.10's ordinal-order row holds; its undo record restores the former rows (as the profile's undo already does).'

