# Fix-all round 5 — verification of the KERNEL area (§2 storage parts, §3 geometry kernel)
> PENDING FABLE REVIEW — Opus-produced (fixall/verify-kernel-r5), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/verify-kernel-r5` · 2026-09-26 · seat: verifier, KERNEL area, after integration round 5.
Status: COMPLETE — 6 round-5 items judged: **6 ACCEPTED, 0 UNRESOLVED**. Earlier FIXED items in the 8 changed kernel
sections re-checked: none regressed. **3 new findings, all minor** (VK5-1 – VK5-3), all owned by the kernel area. No
deferral language in the kernel sections.

## Part 0 — In plain words

The round-5 fixes to the shape-mathematics part of the design all hold. The six small slips found last round are
repaired in the text, and every companion change another area had to make landed where it should: bridges over land,
the rule about how far a hidden point may drift, putting a plot corner back when a street is removed, water gates under
the warp brush, the search index's cross-out lists, and three inexact sentences. I re-ran the kernel's new measurement
(identical output) and built a small model of the search index's new bookkeeping: across 2 000 random edit sequences
with rebuilds at random moments it never gave a wrong answer, and one list per index part (the option rejected) did.

Three new small problems. (1) When the user redraws a district boundary or merges two districts, blocks that are not
rebuilt change district without changing shape; the index bookkeeping does not cross them out in their old district's
part, so after the new district's part is rebuilt a search finds them twice — the same "answer depends on when a rebuild
happened" fault fixed last round, reached by another door (the model shows it in every sequence that regroups). (2) The
rule that releases a "keep this point fixed" mark when its last label leaves counts a width marker as a label, so a
former bridge end or junction that also marks a width change stays fixed; and one call's `pinned` option is never said
to set or not set the mark. (3) One figure the text calls "checked" (100 000 of 100 000 restorations) is true by
construction in the script that produced it — the claim stands, but it is not a measurement.

## Part 1 — Reading record and method

**Read in full:** `docs/ARCHITECTURE.md` §2's plain words, §2.1, §2.2 (l. 552–1018), §2.9 (l. 1795–2121) and all of §3
(l. 2123–3352); `docs/validation/fix-all/r4-verify-kernel.md` rows VK4-1 – VK4-6 and its re-check table;
`r5-kernel.md` Parts 0, 1, 3, 4; `r5-integration-log.md` §1–§4; `ARCHITECTURE-VALIDATION.md` §R5 intro and §R5.1 rows.
**Read at every landing site the six items name:** §2.6 stored-composition rule (l. 1428–1450), §2.7 `Gate.banks` and
`Bridge` (l. 1560–1571), §4.4 water-gate sentence and outer moats (l. 4020–4040), §5.2 F-REDERIVE (l. 5140), §5.3
kernel row (l. 5160), §7.3's S6 row and (b) 4, 6, 9 (l. 6121, 6243–6280), §7.4's ask table (l. 6512–6516), §12.8
memory paragraph (l. 9153–9160), §13.1 kernel fixtures and *Properties* (l. 9330–9370), II.1 (3) (l. 10850–10860),
judgment rows J-K1 – J-K35 (l. 11165–11199). The rest of §4–§17 and PARTS II–III by heading and by grep for every term
the fixes touch (`Steiner bound`, `Steiner invariant`, `pinned`, `pinVertices`, `gate_end`, `deck_end`, `tombstone`,
`indexHome`, `home column`, `partition`, `re-own`, `VK4-`). The whole file (1.46 MB, ≈ 365 k tokens) exceeds one
verifier's budget under the owner's efficiency standard; every pointer of the six items and every sentence of the
kernel sections was read.
**Word-level diff:** the pre-integration file (`r5i/ARCHITECTURE.pre-r5.md` in the session scratchpad, md5
`2661eb6826ea537ddcd524941c003e14`, the file every round-5 draft was built from) against the integrated file, for §2.2,
§2.9, §3.1, §3.3, §3.4, §3.6, §3.9 and §3.10 (53 / 72 / 13 / 42 / 6 / 17 / 7 / 7 changed spans); every kernel span read.
**Executed:** (A) `python3 docs/validation/bench/fixall_kernel_r5_checks.py` re-run (15.7 s): byte-identical to the
committed `.out`. (B) New: `docs/validation/bench/fixall_verify_kernel_r5_index.py` → `.out` — a model of §3.3's index
maintenance (static partitions per level and district, one tombstone set per partition, a home column, a grid per
level; random creations, deletions with slot reuse across districts, promotions and demotions, in-place changes and
partition rebuilds at random moments; after every step each level's query answer against the truth), 2 000 sequences of
400 steps per rule:

| rule | district regroups in the sequence | sequences with a wrong answer |
|---|---|---|
| round-5 text (tombstone what is deleted, re-levelled or changed) | no | **0 of 2 000** |
| round-5 text | yes | **2 000 of 2 000** (VK5-1) |
| round-5 text + a partition change treated as a change | yes | **0 of 2 000** |
| one tombstone set per level (J-K34's rejected option) | no | 1 793 of 2 000 |

## Part 2 — Verdicts on the round-5 items (VK4-1 – VK4-6)

| id | verdict | quoted evidence (`docs/ARCHITECTURE.md`) | required change |
|---|---|---|---|
| VK4-1 | **ACCEPTED** | §2.2 rule 3 (c) (l. 718–725): "as a deck's bank vertex left over land by moved water does at once when its `deck_end` rows are L1, because a preparation batch placed them (a carve's, an outer moat's or a water edit's, §3.3 rule 2), while one whose rows are L0, because an L0 batch placed them (S1's crossing sites, S3's carved channels, S4's or an edit's added deck on standing water, an edit's new site — a deck F-ROUTE's rung sites inside a water operator or a carve has L1 rows …; VD4-10), keeps L0, with no L0 edge at it, until F-REDERIVE removes the deck's `deck` and `deck_end` rows (§7.3 (b) 9) and only then takes its way's level (VK4-1)". Rule 3 (b) (l. 711–715): "a vertex from which the batch strips its last vertex role row loses its kernel `pinned` flag … so the bank vertices of a deck that F-REDERIVE removes become plain vertices of their way". §7.3 (b) 4 (l. 6243–6250) and (b) 9 (l. 6276–6278): "`removeEdges` on `ChainRef('deck', bridge)` and on its two `VertexRef('deck_end', bridge, i)`, after which demotion takes its bank vertices to the way's level and clears their kernel pins"; §5.2 F-REDERIVE the same; §13.1 (l. 9334–9335): "a deck left over land at the way's level after F-REDERIVE (before it, at the level of its `deck_end` rows, with no L0 edge at it), its bank vertices unpinned". `CommitRecord.unflagged` lists the cleared pin (l. 2295), so undo restores it. The writer list now matches §4.4's outer moat (L1 batch, l. 4033–4038) and §2.7's `Bridge` text; the L0-vertex-without-L0-edge state lasts only inside the water edit, (4) to (9), and passes §3.10's level-consistency row (its L0 rows justify L0). Traced: an S1 site's bank vertex loses its `split` flag when the shore run it split is removed (rule 3 (b)), a prepared one when promoted (§3.6 (c)), so neither dissolves after (9) — the span stays "an ordinary segment of its way", as F-REDERIVE says. | — (pin trigger counts knot rows: VK5-2) |
| VK4-2 | **ACCEPTED** | §3.1 planar-subdivision row (l. 2140): "every vertex placed, re-seated or slid onto a coarser edge lies within the hot pixel of that edge's route when it is placed — the placement bound; a later same-level change of the route moves no finer vertex and may leave one farther off (≈ 1.25 cm after one change, ≈ 1.5 cm after several, measured), which no invariant or stage reads and the index boxes cover (§2.2 rule 3, §3.3; VK4-2)"; §5.3 kernel row (l. 5160): "the placement bound; level consistency; index freshness"; J-K18 in §3.6 (l. 3030–3031) "it would leave the shore and move out of the placement bound, §3.10; VK4-2" and in the table (l. 11182); J-K32 (l. 11196) "(up to ≈ 1.25 cm after one change and ≈ 1.5 cm after several, measured)". Grep: "Steiner bound", "Steiner invariant" and "never leaves the hot pixel" occur nowhere else (the one hit, l. 1010, is J-K32 quoting the rejected option). Drift figures re-run byte-identical (Part 1 A). | — |
| VK4-3 | **ACCEPTED** | §3.6 split-flag bullet (l. 2986–2992): "It also clears the flag of every flagged vertex it does **not** move that is of the same level as a run it split — a same-level split foot or crossing, or a vertex promoted onto that run — when the nearest vertex of that level or coarser beside it along that run moves in the step (a re-seat or a slide included) … A Steiner vertex of a coarser run keeps its flag, because it is re-seated with that run"; §2.2 rule 3 (b′) (l. 687–690) the same; rule 3 (c) (l. 725–733) drops the distance clause: "The flag is the whole guard (VK4-3): it stands only while neither the vertex nor the vertices beside it on its run have moved since it split the run"; l. 740–741 replaces the warp sentence; J-K26 / J-K28 amended (l. 979–985, 3039–3040, 11190, 11192); fixtures §3.6 (l. 2881–2884) and §13.1 (l. 9342–9345); II.1 (3) (l. 10855–10858). The draft's narrowing of the verifier's wording to vertices of the run's own level is right: a Steiner vertex of a coarser run is always re-seated with that run (l. 2966), and dissolving it restores the coarser edge, which is the segment between its endpoints. Failure scenario defeated: restoration no longer has a distance test to fail; the case the test guarded (a warp bending the run under an unmoved vertex) now clears the flag. | — (the "checked 100 000 of 100 000" figure is true by construction: VK5-3) |
| VK4-4 | **ACCEPTED** | §3.6 held set (l. 2948–2953): "A bridge's `deck_end` vertices and a water gate's `gate_end` vertices are held unless `fromLevel = 0`, because the step that made the crossing fixed it across the water (§2.7) … whatever level its bank vertices have: L0 for a deck and for an edited water gate, L1 Steiner vertices on the shores for one the trace made at generation"; §2.2 rule 7 (l. 889–894); §2.7 `Gate.banks` (l. 1562); §4.4 (l. 4021–4024); J-K35 (l. 3057–3063, 11199); fixtures §3.6 (l. 2884–2885) and §13.1 (l. 9346–9347). Held vertices get a zero field (l. 2945), so under `fromLevel = 1` neither kind slides; the closure rule (2) adds only L0 shore endpoints, which that warp does not move anyway. | — |
| VK4-5 | **ACCEPTED** | §3.3 (l. 2543–2551): "**No item changes in place (VK4-5).** Every item a batch deletes, re-levels or changes — a deleted vertex, edge or face; a promoted or demoted vertex or edge; a route edge whose run a vertex of its level joins or leaves … or a move reshapes; a vertex a move displaces; a face whose ring at its own level a re-walk or a move changes — is **tombstoned** in the static partition its home entry names (`Plat.indexHome`, §2.2) … and its successor, if any, is inserted in the grid of its current level"; Tombstones (l. 2566–2575): "item keys … held in one set per static partition … A partition's rebuild indexes the live items that belong to it … sets their home entries, removes them from the grid and empties its tombstone set"; §2.2 `indexHome` and `tombstones` (l. 571, 590); pool steps 1, 2, 4 (l. 2450–2454, 2485–2488, 2513–2518); §3.10 freshness row (l. 3342); J-K34 (l. 2653–2663, 11198); §5.3, §12.8 (l. 9156), §13.1 fixture and *Properties* (l. 9347–9350, 9368). Executed on a model (Part 1 B): 0 wrong answers in 2 000 random sequences of deletions, slot reuse across districts, promotions, demotions, changes and rebuilds at random moments; the per-level alternative fails in 1 793 — J-K34's reason confirmed. | — (a partition change without deletion, re-levelling or change is not covered: VK5-1) |
| VK4-6 | **ACCEPTED** | (a) §3.3 rule 2 (l. 2369–2371): "with the border's stretch between them — one straight edge, or several where the water takes in a corner of the frame or a vertex an earlier edit left on it (VK4-6 (a)) — left across the water unchanged"; rule 3 (l. 2392): "the border's stretch between its two contact points as the closed frame". (b) §3.4 `splitThrough` (l. 2675): "an `anchor` row given without an ordinal takes that entity's smallest free `anchor` ordinal (from 2 on an enceinte), allocated by the kernel as the op applies (VK4-6 (b)); any other indexed row must carry its ordinal, an assertion otherwise"; §2.2 rule 7 (l. 880–883), `RoleRow` (l. 591), §3.3 rule 2 (l. 2374–2377), J-K29 (l. 996–998, 11193); §13.1 "its ops permuted — identical ordinals". (c) §3.9 (l. 3291–3296): "and, when it changes a level-≤ 1 route edge, also every partition chunk that holds a Steiner split on that edge, because each split names its route edge by the edge's endpoints (VK4-6 (c))"; §2.9 chunks (l. 2067–2075) the same. | — |

## Part 3 — Re-check of earlier FIXED items whose sections changed this round

Every kernel span of the word-level diff was read against the item it touches. None regressed.

| item(s) | where the round-5 change touched it | verdict |
|---|---|---|
| VK3-3 (demotion), J-K28 | rule 3 (c)'s deck example and restoration guard, l. 718–741 | still ACCEPTED: (a) unchanged (quay and wall edges on an old shore return to L1); restoration now by the flag alone (VK4-3) |
| K4-1 (placement bound), J-K32 | rule 3 drift figures (l. 657–659), §3.1 row, J-K32 | still ACCEPTED; the standing bound is now withdrawn everywhere (VK4-2) |
| VK3-2 (contact names, gate ends), J-K29 | rule 7 ordinal allocation and generated-gate sentence, §3.3 rule 2, §3.4 | still ACCEPTED; allocation by the kernel strengthens "no two vertices ever carry one anchor key" |
| VK3-5, VK2-1, J-K25 (frozen base) | pool step 1 "every partition's tombstone set", §3.10 row | still ACCEPTED |
| VK3-6 (copy size) | home column added: arena ≈ 19.5–21 MB, copy ≤ ≈ 15 / ≈ 20 MB, §12.8 ≈ 20 MB | still ACCEPTED; figures agree across §2.2, §3.3, §12.8 |
| VK3-9 (`StretchRef`), J-K31 | §3.4 `splitThrough` comment and the Stretches paragraph's last sentence | still ACCEPTED; rules unchanged |
| VK-14, VK2-4 (canonical keys), J-K6 | the new paragraph sits between the item definition and the key rule; keys unchanged | still ACCEPTED |
| VK-15 (slot reuse) | tombstones re-defined as item keys per partition | still ACCEPTED; its cross-district case now closed too (model, Part 1 B) |
| VK2-3, J-K24, J-I12 (prepared contacts, deck form) | §3.3 rules 2–3 border stretch wording; rule 7 deck text (VD4-10, C-1) | still ACCEPTED; rule 3's writer list, rule 7, §2.7 `Bridge` and §7.3 (b) 4 agree on who places L0 and L1 `deck_end` rows |
| VK2-5, J-K26 (flag on moves) | §3.6 flag bullet extended (b′) | still ACCEPTED; re-seated Steiner vertices keep the flag |
| VK-3, J-K16 (pool overlays) | overlay tombstone sets, home column at merge | still ACCEPTED; a district's result still depends on the frozen base alone |
| SCL-11, NF-D5 (chunks) | §3.9 and §2.9 chunk rewrite sentence (VK4-6 (c)) | still ACCEPTED (chunk membership wording: see VK5-1's last clause) |
| VD3-1 (load recomputation) | §3.9 load paragraph (KR5-1): "run under the model packages of the document's own output version" | consistent with §2.9 steps 2–3 |
| NP3-1 / NP4-2 (carried rings), NP4-6 | rule 5 (X-K1), §3.6 whole-step validation (X-K3), §3.9 (integration) | consistent with §2.6's stored-composition rule (boundary points made footprint vertices; interior points by mean-value coordinates) |
| NR4-1 | §3.1 Poisson row (K1) | consistent with §8.10 |
| GEO-5 (c), VK2-7, J-K27 (held set) | held set extended by `gate_end` | still ACCEPTED |

## Part 4 — New findings

| id | sev | owner | finding | required change |
|---|---|---|---|---|
| VK5-1 | minor | kernel (§3.3 "No item changes in place", Tombstones, pool step 1; §3.10 freshness row; §3.9 / §2.9 chunk membership); companion determinism (§7.3's S6 row, one clause) | **A district regroup moves index items between partitions without tombstoning them.** At L2–L4 a partition holds "the items of its district" (l. 2572), and the tombstone rule covers only an item a batch "deletes, re-levels or changes" (l. 2543–2547). `drawBoundary`, a district merge or split and `outskirtToDistrict` regroup L1 cells while "every block that fronts no changed stretch" keeps its fabric (§7.3's S6 row, l. 6121; §7.4 "S8–S11 where the class band changed", l. 6514–6515), so those blocks' L2–L4 vertices, route edges and faces change district without being deleted, re-levelled or changed, and nothing tombstones them in their old partition. Scenario: `drawBoundary` gives district B two cells of A; S10–S11 re-derive in the cell whose class band changed and B's partitions are rebuilt at that stage end, now indexing the kept cell's plots too; A's partitions still hold them untombstoned, so an L3 query over the kept cell returns every plot twice until A happens to be rebuilt, and `indexHome` names only B, so a later change of one of them leaves A's copy answering. A document saved and reloaded rebuilds every partition, so the same next edit gives different answers in the live session and after a reload or in the verification replay — the timing dependence VK4-5 removed. The pool path shares it: the district-end rebuild reads "the base partition's live items" (l. 2515), and neither partition is dirty at the freeze. J-K34 already names "an item re-owned into another district" as covered (l. 2661), but no operative sentence does. CONFIRMED on a model (Part 1 B: 2 000 of 2 000 sequences with regroups wrong under the round-5 rule, 0 with the change below); PLAUSIBLE for the arena itself. | §3.3's list: add "an item whose partition changes — every L2–L4 vertex, route edge and face under an L1 face a batch re-owns to another district or to or from the hinterland (S6's regroup, §7.3), and a vertex on an L1 edge two partitions share when that edge's partitions change" — tombstoned in its old partition and inserted in the grid like any changed item, so the freeze and both districts' rebuilds pick it up (pool step 1 then finds both partitions dirty). §3.10 freshness row: "deleted, re-levelled, changed or moved to another partition". §3.9 and §2.9: each partition chunk holds "the vertices that belong to it by §3.3's rebuild rule", not "the vertices born in it". §13.1: "a `drawBoundary` that moves a kept block from district A to B, B's partitions rebuilt before A's — every L3 query over the block returns each plot once, before and after A's rebuild". |
| VK5-2 | minor | kernel (§2.2 rule 3 (b) and the `flags` comment; §3.4 `pinVertices` and `insertChain`) | **The pin-release rule counts knot rows, and a second possible writer of the pin is undefined** (introduced with VK4-1's pin clearing). A knot row is a vertex role row (rule 7, l. 863–864), so "a vertex from which the batch strips its last vertex role row loses its kernel `pinned` flag" (l. 711–712) does not fire at a pinned bank vertex, junction or gate end that also carries a `width_knot`, `bank_knot` or `shore_class_knot` — S4 places width knots at class-change junctions (l. 3955–3956), and a generated gate's `gate_end` row may sit on an L0 shore vertex that carries a shore knot (l. 891–892). Such a vertex keeps a pin that guarded a feature which is gone, so smoothing, simplification and cutting keep it for good, against "the bank vertices of a deck that F-REDERIVE removes become plain vertices of their way". Separately, `insertChain`'s `opts.pinned?: number[]` (l. 2672) is never defined: §3.6 step 1 uses it only to exempt a point from decimation (l. 2806), while the `flags` comment says the pin is "set by `pinVertices`" (l. 565). If `opts.pinned` also sets the pin, a vertex pinned without any vertex role row can never be released. PLAUSIBLE (text reading). | Rule 3 (b) and the `flags` comment: "strips its last vertex role row **other than knot rows**" (a knot moves with its chain and needs no pin). §3.4 `insertChain`: "`pinned`: chain indices exempt from decimation (§3.6 step 1); it does not set the kernel `pinned` flag, which only `pinVertices` sets". §13.1: "a deck whose bank vertex also carries a width knot, removed by F-REDERIVE — the vertex unpinned, its knot kept". |
| VK5-3 | minor | kernel (§2.2 "So a plot-line end…" paragraph; the committed script's column (iii)); companion scope (`ARCHITECTURE-VALIDATION.md` §R5.1 row VK4-3's reason, if the owner's record should match) | **A figure called "checked" is true by construction.** §2.2 (l. 737–740): "checked: … and on 100 000 of 100 000 for each of one to four later same-level vertices on that route … `fixall_kernel_r5_checks.out` A". In `fixall_kernel_r5_checks.py` the "route restored" column compares `route[:j] + route[j+1:]` with `[q for q in route if q != V]` — the same list by construction — so it can never report anything but 100 %. The claim itself holds (a vertex's return to a finer level removes it from the coarser route by the definition of a route, and the flag-only guard has no distance test to refuse), and the refusal rate of round 4's test (0.54–0.66 %) is a real measurement; only the label overstates. Scenario: a reader or a Fable reviewer takes the column as an executed confirmation of rule 3 (c)'s preconditions (two incident edges of one level with identical rows, no vertex role, no pin), which it does not exercise. CONFIRMED (script read). | §2.2: replace "and on 100 000 of 100 000 for each of one to four later same-level vertices on that route" by "and, with the flag as the whole guard, by construction for any number of later same-level vertices on that route". The script: either drop column (iii) or make it model rule 3 (c)'s preconditions on edges with role rows; the `.out` re-committed with the change stated. |

## Part 5 — Deferral-language scan of the kernel sections

Scanned §2.2 (l. 552–1018), §2.9 (l. 1795–2121) and §3 (l. 2123–3352) for "TBD", "to be decided", "defer", "postpone",
"later", "at M0", "until M…", "open question", "left open", "revisit", "for now", "future work", "not yet". Every hit is
ordinary sequence ("a later same-level change", "a later `clearFiner`", "not yet a vertex", "later ops read its
result"), a negation ("no licence question is left open"), or a measured quantity with its milestone and a pre-decided
fallback (≈ 12 MB "PLAUSIBLE until M0" and the index's ≈ 7–8.5 MB and copy sizes "PLAUSIBLE until M1", bounded by §3.3's
copy fallback and §12.8's pool-shrinking step; §3.7's and §3.8's "Confirmation at M0 and the pre-decided fallback").
No deferral wording.

## Part 6 — CONFIRMED versus PLAUSIBLE, and what a Fable reviewer should re-check first

**CONFIRMED** (executed or checked against the text): the six items' text at every cited line, including every
cross-area companion (§2.7, §4.4, §5.2, §5.3, §7.3 (b) 4 and 9, §12.8, §13.1, II.1 (3), the judgment rows); the round-5
kernel script re-run byte-identical; VK4-5's tombstone scheme and J-K34's rejection of per-level sets on a model
(0 of 2 000 and 1 793 of 2 000 wrong); VK5-1 on the same model (2 000 of 2 000 wrong with regroups, 0 with the required
change); VK5-3 by reading the script. **PLAUSIBLE** (reasoning on the text): that the arena behaves as the model does
(the model has no boxes and no route-edge splitting, only item keys, levels and partitions); VK5-1's premise that S6
keeps L2–L4 fabric in regrouped cells (read from §7.3's S6 row and §7.4's ask table, not from a stage trace); VK5-2's
consequences (whether any shipped stage pins a knot-carrying vertex is not stated anywhere).

**Re-check first:**
1. **VK5-1** — whether S6's regroup really keeps L2–L4 fabric under a new district (§7.3's S6 row says so), and whether
   tombstoning at the partition change is preferable to rebuilding both districts' partitions at S6's stage end.
2. **VK5-2** — whether excluding knot rows from the pin trigger is right for every pin the stages set, and what
   `insertChain`'s `pinned` option was meant to do.
3. **VK4-3's narrowing** (Part 2) — that no vertex of a finer level than its run can be left unmoved yet off the moved
   run without being re-seated.

## Fable review (2026-09-27) — B-fixall/verify-kernel-r5

Reviewer: Fable 5.1, lane fable-review/main/kernel (docs/fable-review/main/kernel.md). **Verdict: CONFIRMED.** The six
ACCEPTED verdicts stand; the three new findings are real and applied (consistency pass). The index model
(`fixall_verify_kernel_r5_index.py`) re-run byte-identical (0 of 2 000; 2 000 of 2 000 with regroups under the round-5
rule; 0 with the change; 1 793 of 2 000 per-level). VK5-1's premise holds (§7.3's S6 row keeps the blocks that front no
changed stretch), and tombstoning at the partition change is right over a rebuild at S6's end. VK5-2's premise holds
(`width_knot`s at junctions, §4.3–§4.4). No correction.
