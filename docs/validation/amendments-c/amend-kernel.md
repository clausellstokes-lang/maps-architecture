# amend-kernel — lane amendments-c/amend-kernel (KERNEL part, §3)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/amend-kernel; queued in docs/FABLE-REVIEW-QUEUE.md.

PROGRESS (kill-safe ledger; one line per item, updated after every block)
ITEM 39: planned §3.5 (REPLACE: the retry row, Fable's corrected wording) | done REPLACE §3.5
ITEM 45: planned §3.1 (REPLACE: `regularFit` row, E_DEGENERATE detail `fit`), §3.4 (REPLACE: the service and "The regular fit" paragraph), J-ROWS J-A45.31, RATIONALE-A J-A45.31 | done REPLACE §3.4, REPLACE §3.1, J-ROWS J-A45.31, RATIONALE-A J-A45.31
ITEM 53: planned §3.1 (REPLACE: Poisson, marching-squares and path-search rows; G-R7 identifiers out), J-ROWS J-A53.31, RATIONALE-A J-A53.31 | done REPLACE §3.1, J-ROWS J-A53.31, RATIONALE-A J-A53.31
ITEM 65: planned §3.4 (REPLACE: "The underground layer's several arenas"), §3.7 (REPLACE: every underground part on the same functions), §3.10 (REPLACE: the arena-isolation row), J-ROWS J-A65.31, J-A65.32, RATIONALE-A J-A65.31, J-A65.32 | done REPLACE §3.4, REPLACE §3.7, REPLACE §3.10, J-ROWS J-A65.31, J-A65.32, RATIONALE-A J-A65.31, J-A65.32
IDENTIFIERS (route §C.5, seat K): §3.1 `Point.new` / `intersectLines` / `createDeflection`; §3.5 `cut()`, `Point.new` / `intersectLines` | done §3.1 (REPLACE), §3.5 (REPLACE)

CONTINUE (2026-09-28, second opus seat, bundled pass c + d + e): blocks file found complete (8 blocks, closed by END); kernel key and items unchanged by the bundle (route §C.9.1); no other seat REPLACEs a §3 heading. Revisions planned: R1 §3.1 Poisson build names | R2 §3.1 marching-squares crossing-penalty wording | R3 §3.5 Fable's corrected item-39 wording | R4 §3.4 regularFit pinned vertices | R5 §3.4 one part per entity, level digests | R6-R7 J-A53.31 / J-A65.31 wording | then apply-test, doc checks, report, queue row, LANDED.
REVISIONS DONE: R1, R2 (and §3.1's contour row resolved to adopt d3-contour / build the distance transform, as §17's licence table has it), R3, R4, R5, R6, R7, the §3.7 chamber paragraph made precise, and three C3 rewordings (Poisson build names, §3.5's build phrase, the pinned vertices) — apply-tested 7/7; doc checks C3 160 / 1 (drift only); report, queue row and LANDED done
STATUS: LANDED (2026-09-28): blocks complete and apply-tested; report written; doc checks in §6; queue row appended.

# 1. Outcome

The kernel seat's four referencing items (39, 45, 53, 65) are in `docs/validation/amendments-c/blocks-kernel.md`: seven
blocks — REPLACE §3.4, §3.1, §3.5, §3.7 and §3.10, one J-ROWS block (J-A45.31, J-A53.31, J-A65.31, J-A65.32) and one
RATIONALE-A block (the same four entries). The kernel homes no item of this pass; the bundle (files d and e, items
73–88 and 101) routes nothing to §3 (route §C.9.1: key and item list unchanged), and no other seat's block file
REPLACEs a §3 heading (grepped `blocks-*.md` 2026-09-28 01:05). Applied alone to copies of the live design
(sha256 `1c23190f…`, 13 026 lines) and rationale (`0be40dfd…`) by `docs/validation/amendments-b/apply-blocks.py`: 7 found,
7 applied, 0 skipped, audit 0 not OK, headings 145 → 145, fences balanced, title block unchanged, index and Part A rows
476 / 476 with no duplicate ids (the output document sha256 `f96abe05…`, 13 086 lines). Every part applied is marked
CONFIRMED in the amendments file or is an owner rule; nothing held is applied.

This seat continued a first opus seat's landed blocks (CONTINUE rule: the files existed, no LANDED line). It re-read
every source the prompt names, checked each block against the live text by word diff, and made seven revisions (the
ledger above, R1–R7, plus the chamber paragraph's precision): Fable's corrected item-39 wording in §3.5, the build names
of the Poisson row as the file specifies them, the §3.1 contour row's unresolved "or our own" resolved to §17's licence
table, the regular fit's pinned vertices matched to seat C's §4.8, and — the one substantive change — item 65's
"an entity with faces in two parts" replaced by "every entity's geometry lies in the one part its `Identity.key`
names; a grouping across systems is a link between records", because `Identity.key` (§2.8) is single-valued and the
first wording would have forced a model change no seat was routed to make.

# 2. Per item — where it landed, the mechanism, the rulings

**Item 39 (step 8's first rung; family bentcut; reference).** §3.5, the creator-failure table's retry row. The row now
reads Fable's corrected text with the build named: "the NG 1.2.2 build's silent rotated-frame retries and its hole-aware
bisector's two logged loops (a balance retry, up to 20 in random frames, then accepted; a restart when no far edge
exists) (NG RA-3; P7)", and its answer cell says the bent cut's declared ladder (§4.6 step 8) runs each rung under an
operation-count work limit, its first rung re-planning in a turned frame a bounded number of times, no rung restarting
anything above the face. In plain words: the kernel's list of the reference generators' known failures now tells the
truth about how NG retries a bad cut, and points to our bounded ladder as the answer. No console message of the reference
enters the text (J-Fcode-1). The turned-frame rung itself is seat A's (§4.6); no kernel ruling, no J row.

**Item 45 (the castle repair's target; family walls-districts; reference).** §3.4 (the service list and a new paragraph
"The regular fit") and §3.1 (a new build row; `E_DEGENERATE` gains detail `fit`). Mechanism: one read-only kernel
service `regularFit(ring) → { n, centre, radiusCm, phaseCdeg, targets[], compactness }` computes a ring's least-squares
regular n-gon — centre the ring's area centroid (exact `area2` terms through `ratio()`), radius and phase from the
ring's first Fourier component about that centre, one target per vertex in ring order, and the ring's compactness
4π·A ÷ P². It reads no arena and writes nothing; a caller moves vertices toward the targets only through `warp` (its
rounding, whole-step validation, halving and held set apply) or, for a castle claim not yet committed at S3, by building
the moved ring; the caller's pinned vertices (§4.8: an `on_enceinte` claim's weld pair and, once the gate is fixed, the
two corners of the side holding the town-side gate) get no displacement. It is start-vertex independent (proved in the text: starting one vertex later turns the
component by one step and every target stays put), deterministic across hosts (trigonometry through `dmath`,
`Math.sqrt` exact), and refuses fewer than 3 vertices, a zero-area ring or a vanishing first component (radius < 1 cm).
Ruling **J-A45.31** (vetoable): the fit is stated once in the kernel, read by §4.8's castle repair and §7.1's
`equalize` brush, over stating it in §4.8 with §7.1 pointing at it — one construction, one fixture, one determinism
argument; the area centroid over the vertices' average, so a side cut into many short edges cannot pull the centre.
The route recommended exactly this (§B item 45, "the kernel editor rules, J-A45.31").

**Item 53 (build-versus-adopt rows; family toolkit; reference).** §3.1: (1) the Poisson row keeps k = 50, all evaluated,
and now draws each candidate in §8.10's candidate annulus (`poisson.annulus`) on a torus, naming the four builds whose
code shows it (MFCG build 12710731, VG build 1.6.9, NG build 1.2.2, Dwellings itch 17195045; P14) and correcting the critic's "warp" to the
tile's wrap-around; the law and its value are the rendering part's (§8.10, canon RENDERING-287). (2) The contour row
drops the `createDeflection` identifier: VG 1.6.9's costliest terrain routine is a field that pushes roads and the
highway entrance away from water, not shore extraction — not reproduced, because S4's lattice keeps roads off water by
its own crossing penalty (§4.3) — and its coastlines are cell-edge staircases smoothed twice and resampled, which our
extraction replaces; the row's "`d3-contour` or our own" is resolved to §17's licence table (adopt `d3-contour` for
marching squares, build the distance transform). (3) The path-search row: the 2017 "A\*" and MFCG 12710731's street
search are both first-in-first-out searches with no heuristic, not reproduced. Ruling **J-A53.31**: keep our exact
contours and binary-heap A\* / Dijkstra (realism tiebreaker); the item's optional "§4.4 may use a distance field" was not
written, because an optional "may" is an unresolved choice under the owner's no-defer rule and S4's crossing penalty
already keeps roads off water.

**Item 65 (the underground as a family of systems; OWNER RULE; family underground; reference).** Three kernel places,
answering the route's ruling 1 (it asked for the kernel's confirmation of J-A12.32's reading):
* §3.4, new paragraph "The underground layer's several arenas": an arena is one planar subdivision in which every
  crossing is a junction, so systems that pass over or under one another without meeting (a catacomb gallery beneath a
  sewer main, an undercity chamber below the tunnels, a quarry's lower working) never share one: each is its own part
  of the `underground` layer, `{ layer: 'underground', part }`, the sewer network part 0, every further system's number
  allocated once at its creation and never renumbered or reused (it is in its entities' keys and addresses), the
  assignment II.7.6's. Depth stays per entity inside a part (J-A12.45 for what may meet). J-A12.32 carries across the
  parts unchanged: a transaction writes one part; a stage reads the ground and every other part only through the
  services by key; a meeting of two systems, or a stair or shaft joining them, is a record naming one vertex in each part
  by its role (II.7.6's link, as `AccessPoint` does for the ground); every entity's geometry lies in the one part its
  `Identity.key` names, and a grouping across systems (an undercity neighbourhood and its outskirts along the sewer
  tunnels) is a link between records. Each part has its own index partitions, snapshot block and level digests; a
  system's derivation writes its own part alone, so re-deriving one system leaves the ground and every other part
  byte-identical.
* §3.7, new paragraph "One cut for every underground part": `corridorUnion` bands each gallery or walkway from the
  half-width its system's row declares (the kerb definition gains "another system's gallery's, the same two terms from
  that system's row (II.7.6)"); a chamber is a closed outline chain at the part's L1 with no half-width (as a shore), so
  its floor is an L1 face that S9–S11 cut like a ground L1 face, a walkway across it a gallery chain like any other;
  no underground-specific operation.
* §3.10, the arena-isolation row: the arenas listed (the ground, each underground part, each sky island); a link between
  two underground parts is an entity id like every cross-arena link; the multi-arena tests gain the underground
  reroll-isolation fixture's per-part twin (§13.2).
Rulings **J-A65.31** (several arenas, one per system, over grade separation inside one arena — a crossing vertex that
joins nothing, or faces allowed to overlap by depth, would have to be excepted in every writer, query and invariant; the
part costs only its partitions, snapshot block and digests; amends J-A12.45's "one underground arena" for systems) and
**J-A65.32** (the same functions for every part; no operation for voids or galleries). **Owner fidelity:** "Those are all
options that exist in the same level" — the systems stay on one `underground` layer, drawn and edited as one (the parts
are storage, not levels; R draws by depth band across parts); "with varying degrees of connections and access between
them (not always)" — a connection is a record, never shared topology, so no two systems are joined unless a link record
says so; "the central piece is a derived sewer system as you have already built out" — the sewer keeps part 0 and
every existing sewer rule unchanged.

**Identifiers (route §C.5, seat K).** `Point.new`, `intersectLines`, `createDeflection` (§3.1) and `cut()` (§3.5) are
gone from the blocks (grep of the block file: 0 hits); the §3.1 skeleton row's GPL-3 clause of §C.6 was already corrected
in the live text (J-A21.31) and stays so.

# 3. Items judged already satisfied or not applicable to the kernel

| items | judgment and why |
|---|---|
| 20 (h), 73–80, 82–88 | not applicable: the dossier's derivation rule and port are data-flow, schema and host rules (§7.7, §2, §14, §11.4); none needs a kernel operation, key or invariant — door 1 stays closed (no geometry export to SettlementForge's simulator), so no kernel export surface either |
| 81 | not applicable as routed ("kernel — none"), with one FINDING (§4 note 9): (b)'s "the frame grown by §3.2 (9)" at an epoch has no kernel mechanism today |
| 101 | not applicable: the authoring vocabulary maps to existing edit events and derivations; its "snapping visible and escapable" is the authoring surface's feature snap, never the kernel's attraction (§4 note 10); its lake bar reads a level set that becomes a shore, S1's as S3's contour is, never §3.1's render-tile contour |
| 32–38, 40–44, 46–52, 54–64, 66–72 | not routed to the kernel and none needs kernel text; checked for a kernel need where geometry is touched — 63/64 (accesses and fronts: records and roles), 66 (the closure's generated passage lives in the part of the system it extends: §4 note 7), 67 (Works states: records), 68 (light: rendering), 70 (clusters: several L4 footprints on one plot, which §2.2's levels already hold) |

**Held parts (the evidence gate), listed so nothing is lost.** None of the kernel's items has a HOLD — PLAUSIBLE part:
39, 45 and 53 are CONFIRMED (Fable's evidence gate, 33–48 and 51–56 CONFIRMED on re-derived evidence) and 65 is an owner
rule. The file's former held parts are all ruled by Fable's evidence gate and are other seats': 37 (RELEASED, labelled;
seat A), 49's deletion (REJECTED — the 49 % stays, cited to F4; seat S1), 58 (f) (RELEASED, labelled; seat D), 59's
timing (RELEASED as a restatement measurement; seat R). The route's remaining cautions (§C.4: 50's MFCG clause, 52's
visible divergence, 60 (support), 35 (support), 68 (g) and 68 (support)) touch no kernel text.

# 4. CROSS-PART NOTES (what another part's editor must add; the verifiers check both sides)

1. **Model (seat M).** (a) §2.2's `PlatKey` comment: "part 0 = the ground, or the underground layer's sewer network;
   underground parts ≥ 1 = one arena per further system (catacombs, caverns, quarries and mine voids, the undercity),
   numbered by II.7.6, each number allocated once and never reused (§3.4); sky parts 1–3 = one arena per sky island".
   (b) §2.1: the address prefix of underground part n ≥ 1 is `under<n>/`, as `sky2/` (part 0 keeps `under/`); the
   underground content paragraph names the family and its parts. (c) §2.2 rule 1: the underground level mapping covers
   galleries and walkways (L1 chains banded at L2, as tunnels) and chambers (a closed L1 outline chain; its floor an L1
   face cut at L2–L4); rule 7 gains the chamber outline's structural role (name it; `chamber_wall` suggested). (d) §2.7:
   a gallery record carries `widthCm` and `wallCm` as `Tunnel` does (the kerb reads `widthCm ÷ 2 + wallCm`); the link
   record (`UndergroundLink`) names one vertex in each part by role — each end `{ part; at: VertexRef }` — never a shared
   vertex; the undercity's cross-system grouping is a link field between records (for example the outskirts' blocks or
   plots carry their undercity neighbourhood's id), never a second key. (e) §2.8: `Identity.key` stays single-valued —
   every entity's geometry lies in one part (§3.4, J-A65.31).
2. **Pipeline II.7 (seat D).** II.7.6 assigns part numbers (allocated once per system at creation, never renumbered or
   reused), declares each system's gallery row (`widthCm`, `wallCm`), the chamber outline role, and the link record's two
   vertex ends; II.7.5 places the undercity in its void's part, keeps its outskirts' plots in part 0 (U1–U3 hold there,
   route ruling 2) and links them to its neighbourhoods; II.7.3's "There is one underground arena (`PlatKey` part 0 …)"
   and "cut inside the underground arena … keyed to the underground arena" read "the sewer network's arena (part 0 of
   the underground layer)" — J-A12.45 is amended for systems by J-A65.31, depth per entity still holding inside a part.
3. **Pipeline §4.8 (seat C).** The bloat test's "its centroid" is `regularFit`'s `centre`, the area centroid
   (J-A45.31: the thinness test measures from the fit's centre) — seat C's landed text "centred on the centroid" agrees;
   add "(the area centroid, §3.4)" once if the verifier asks. The pinned vertices §3.4 now names are C's own list.
4. **Determinism (seat E2).** §7.1's warp table, Equalize row: "each cell under the brush moves its vertices `strength` ×
   20 % toward the targets `regularFit` returns for the cell's ring (§3.4) (MFCG 12710731's tool is its castle
   routine)"; §5.2 F-CASTLE ladder cell as the route gives it; §6.3: an underground part's number is part of an address
   and never reused (§3.4); §6.1: the system draws key per part on the `sewer` pattern (the route's recommendation).
5. **Rendering (seat R).** §8.10 states the annulus law r₀ × (1 + a · float01), `a` = `poisson.annulus` = 0.1 with
   provenance `ref:… (code)`, P14, and Bridson's [r₀, 2 r₀] as the alternative value — §3.1 now points there by that
   name; §8.4 draws every underground part on the one layer by depth band, a crossing of two parts drawn over and under
   (there is no crossing vertex to draw); §11.1 exports per system (part) and depth band.
6. **Scope (seat S2).** (a) §13.1 — an APPEND TO SECTION (no seat REPLACEs §13.1 in this pass) "Fixtures added by
   amendments c (items 45, 53 and 65; the kernel's rows in §3.1, §3.4, §3.7 and §3.10)": *the regular fit* — regular
   n-gons (n = 3 … 12, radius ≥ 5 m) rotated and snapped return every target within 1 cm of its vertex and a compactness
   within 10⁻³ of the regular n-gon's;
   every rotation of a ring's vertex order and its reversal (clockwise input) return identical targets bit for bit; a
   thin rectangle (sides 1 : 3 or thinner) has compactness < 0.75 and its targets on a square; a side split into many short
   edges leaves the centre unchanged; fewer than 3 vertices, a zero-area ring and a vanishing first component return
   `E_DEGENERATE` (detail `fit`); the service's doubles identical under §6.5 (10)'s cross-implementation test.
   *The sampler* — every accepted point lies within [r₀, (1 + a) r₀] of the active point it was drawn from, beside the
   existing "Poisson minimum distance ≥ r". *The underground parts* — two systems crossing in plan without meeting commit
   in two parts with no vertex at the crossing in either, each part passing every hard invariant; a link record resolves
   one vertex in each part; a transaction on one part handed a slot of another asserts in a debug build; `corridorUnion`
   over a gallery chain gives its kerb at `widthCm ÷ 2 + wallCm`; a chamber outline at L1 separates floor and rock and
   S10's frontage cut lands on the floor. (b) §13.2's T65 group: the per-part twin of the underground reroll-isolation
   fixture — re-deriving one underground system leaves the ground and every other part byte-identical (§3.10's row
   cites it). (c) §14 or §15: nothing from the kernel.
7. **Determinism / pipeline for item 66 (seats E2, D).** The closure rule's generated passage is written in the part of
   the system it extends (a passage from a basement to the sewer: part 0; a village's dug passage: part 0 of its own
   underground layer) — one transaction, one part (§3.4).
8. **Scope (seat S1).** §1.3 carries Fable's corrected item-39 text with the build named, the same as §3.5's row;
   §13.5's tree-scatter row "MFCG / NG Bridson k = 50 in a [r, 1.1 r] annulus on a periodic tile" matches §3.1's pointer.
9. **FINDING — item 81 (b), for seats T and E1 and the manager (outside the kernel's routed items; vetoable).** "At each
   epoch … a crossing of one of §1.1's bands changes the rung's row — the frame grown by §3.2 (9)": §3.2 (9) sizes the
   frame once, from the requested population; `Plat.frame` is `readonly` (§2.2) and the arena's outer ring is the
   `margin` chain S1 writes first, with the frame as the `border` chain (§2.2 rule 1). No kernel or pipeline text says
   how a frame grows after the document exists. Recommended: T's §4.11 sentence names a stage step — S1 derives terrain,
   water and hinterland on the band between the old margin and the new one, and the kernel replaces the `margin` and
   `border` chains by one L0 batch (the range bound of §3.2 (1) is already taken at the population cap, so no coordinate
   leaves the lattice) — the frame only grows (a declining population keeps its frame); and the kernel sentence lands in
   §3.2 (9) in the repair round as J-A81.31. Until then the route's "kernel — none" is this seat's disagreement on record.
10. **Item 101 (i), for seats E2, R and S2.** "Snapping is visible and escapable (hold to place freely)" is the authoring
   surface's feature snap (§9.5, §14), resolved into the event's points before the dry run; the kernel's attraction
   (`attractCm` 26 cm, §3.6) applies to every insertion and is never escaped — at the pointer's scale the two cannot be
   confused, and no text should promise a "free" placement below the kernel's attraction radius.
11. **The assembler.** The kernel's five REPLACE blocks hit single-seat subsections, so the one-pass order finding
   (route §C.9.2) does not touch them; the untouched design already carries an unreviewed C3 hit in §3.3 ("of the first
   two vertices of", l. 2473 — our own face-identity text, matched since `research/findings/code-ftg-client.md`, written
   2026-09-27 22:37, used the same ordinary phrase): corpus drift in a subsection no seat writes, which takes a reviewed
   allow row (reason: our own §3.3 text predating the reading; an ordinary geometric phrase; no list, table, grammar or
   palette).

# 5. Judgment calls written (index row + Part A entry each)

| id | the choice | section |
|---|---|---|
| J-A45.31 | one read-only `regularFit` service (area-centroid centre, first-Fourier radius and phase, per-vertex targets, compactness) read by §4.8 and §7.1 | §3.4 |
| J-A53.31 | keep our contour extraction and binary-heap A\* / Dijkstra with the corrected notes; the sampler row points to §8.10's annulus | §3.1 |
| J-A65.31 | several underground arenas, one per system, numbers allocated once; J-A12.32 across the parts; every entity's geometry in one part (amends J-A12.45 for systems) | §3.4, §3.10 |
| J-A65.32 | every underground part cut by the same functions; a chamber an L1 outline chain; no new operation | §3.7 |

# 6. Receipts

* Blocks file: `docs/validation/amendments-c/blocks-kernel.md`, 474 lines (its sha256 is in the LANDED line).
* Apply test: `apply-blocks.py` on copies — "files 1; blocks 7 found, 7 applied, 0 skipped; audit: 7 blocks; not OK: 0;
  headings 145 -> 145; fences balanced True; title block unchanged True; document 13026 -> 13086 lines".
* Doc checks `--sections "3,Judgment calls"`: untouched design — C1 5 / 0 unreviewed, C2 0, C3 163 / 2 unreviewed
  ("of the first two vertices of" in §3.3, corpus drift, note 11; "it 2 6 s stage 3 contract" in §3.4, which the blocks
  reword to "§2.6: the contract of stage 3"), C4 0, S1 0, S2 0. Applied copy: see the last bullet.
* Applied copy (`scratchpad/kseat/doc3.md`, sha256 `f96abe05…`): the first applied copies carried five unreviewed C3 runs,
  four of them this seat's own revisions matching the readings' build-name lists and one phrase ("mfcg 12710731 vg 1 6 9",
  "ng 1 2 2 and", "6 ng 1 2 2 s", "vertices and the two ends"); each was reworded, not allow-listed (the Poisson row's
  builds as "MFCG build 12710731, VG build 1.6.9, NG build 1.2.2, Dwellings itch 17195045", §3.5's "the NG 1.2.2 build's",
  the pinned vertices as "an `on_enceinte` claim's weld pair and, once the gate is fixed, the two corners of the claim's
  side that holds the town-side gate"), each candidate tested first against the cached corpus 3-gram set (916 623
  3-grams, the checker's own construction). Final (`doc_checks.py --doc doc3.md --sections "3,Judgment calls"`): C1 5 hits / 0 unreviewed, C2 0,
  C3 160 / 1 unreviewed, C4 0, S1 0, S2 0 — the one unreviewed hit is the untouched document's §3.3 corpus drift ("of
  the first two vertices of", note 11), in a subsection no seat writes; the blocks add no unreviewed hit and remove one
  (§3.4's "it 2 6 s stage 3 contract"). Exit 1 only for that drift row, which the assembler allow-lists with its reason.
