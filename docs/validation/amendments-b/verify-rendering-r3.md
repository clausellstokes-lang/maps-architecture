# verify-rendering-r3 — lane amendments-b/verify-rendering-r3 (VERIFY the RENDERING part, §8, §9, §11, §12, after repair round 3)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-rendering-r3).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
BASE: docs/ARCHITECTURE.md sha256 1a861c72… (assemble-r3 installed); rationale 8a24a5a7…; before = docs/archive/ARCHITECTURE-pre-amendments-b-repair-r3-2026-09-27.md (831efd42…)
READ: assemble-r3, repair-rendering-r3 report, my verify-rendering-r2, the §8–§12 diff (8 hunks: 6 in §8.3, §8.4, §8.5, §8.6, §11.1, §12.7 + 2 in §10.2, pipeline's), §8.3–§8.6, §11.1, §12.7 whole, §2.6 Heights/BaseWing/Wing, §3.2 (9), §1.1 RungProfile, T30-5, J-A30.87 index + Part A — done
ITEMS (8, 11, 12, 14, 15, 16, 17, 19, 20, 21, 22, 26, 28, 29, 30, 31): done — 28 and 30 re-read on the repaired text, PRESENT; the rest carried from r2
RE-CHECK VR2-01..VR2-06: all six FIXED (§3)
CHECKS: done — stale/deferral probes 0 (scratchpad vr3/probes-stale.txt), refs.py 2 broken (external), doc_checks 8,9,11,12 exit 0, cross-part probes (vr3/probes-cross.txt)
ISSUES: VR3-01 (model + determinism companion, Passage.headroomCm has no writer), VR3-02 (model, Wing.spans readers) — written (§5)
STATUS: COMPLETE

Document verified: `docs/ARCHITECTURE.md` as installed by amendments-b/assemble-r3 (sha256 `1a861c729f26ba99…`, 13 028
lines; rationale `8a24a5a7…`). Before-text: `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r3-2026-09-27.md`
(sha256 `831efd42…`, the document my r2 report verified). Earlier reports: `verify-rendering-r0.md`, `-r1.md`, `-r2.md`.

## 1 Outcome

Repair round 3 fixed every issue my r2 report raised. The three rendering issues (VR2-01, VR2-02 and VR2-03) are
FIXED by the exact wording required, and the kernel's VR2-04 and the scope seat's VR2-05 and VR2-06 are FIXED in their
homes. Inside §8, §9, §11 and §12 the diff against the r3 archive has 6 hunks, one in each replaced subsection (§8.3,
§8.4, §8.5, §8.6, §11.1 and §12.7). Each hunk is a claimed fix. I accept the repair's four vetoable deviations. The
largest is deviation 4, which pins the span mark's `heightCm` column as the wing's `eaveCm` less the headroom, so the
top of the mark is the eave, as §8.4 and §11.1 require. Items 28 and 30 stay PRESENT on the repaired text, and every
other routed item keeps its r2 verdict.

The round found **2 new issues, both minor and both owned by model**. Neither needs an owner ruling.
* **VR3-01** (model, partial, item 30). The repaired §8.5 (2) sets the span mark's height to `eaveCm` less
  `Passage.headroomCm`, and §8.4 and §11.1 raise the underside by the same field. But no stage or edit ever writes
  `Passage.headroomCm`, and no rule keeps it below a spanning wing's eave. §2.5 declares the field with only a gloss.
  The span mark, its shadow and the 3-D extrusion therefore have an undefined lower edge, and a one-storey spanning wing
  would give a height of zero or less.
* **VR3-02** (model, conflict, item 30). §2.6's `Wing.spans` comment lists §8.5's span mark, the shadow pass and the
  3-D export among the readers "on the base or the composed wing". After round 3 all three read the base wing only
  (§8.5 (2) "one per base wing"; §11.1's rows extrude each wing's `ring`). This touches the same sentence as
  verify-model-r3's V-MAB3-02 (ii), which keeps these three readers on either wing, so the two changes must be made
  together.

## 2 Per item — is the mechanism there, in the terms the route asked?

The earlier verdicts are in `verify-rendering-r0.md` §2, `-r1.md` §2 and `-r2.md` §2. This round re-read items 28 and
30, the items whose rendering text the repair changed. The others keep r2's verdict: their subsections were not
replaced, and no replaced text touches them.

| item | r2 | r3 | where it stands now (quoted, live text) | open issues |
|---|---|---|---|---|
| 30 | PRESENT | **PRESENT** | §8.5 (2) l. 8139–8146 "adds a **span mark** to its block's closing: one per base wing that spans the passage (`BaseWing.spans`, which a composed wing inherits as `Wing.spans`; a stepped front's quads each), that wing's span ring … its `baseCm` column the spanning wing's base plus the passage's `headroomCm` and its `heightCm` column that wing's `eaveCm` less that `headroomCm`, so the mark's top is that wing's eave"; §8.4 l. 8059–8061 "casts its span marks, §8.5 (2) — each a prism from its wing's `baseCm` plus the passage's `headroomCm` to that wing's eave over its span ring"; §8.3 l. 8023 "the span ring of every base wing that spans it (§8.5 (2)) inside its block's mass"; §11.1 l. 9171 "each wing that spans a passage also extruded over its span ring from the passage's `headroomCm` above that wing's base to its eave (a stepped front's quads each)"; l. 9172 "each spanning wing's span-ring prism, from the passage's `headroomCm` above that wing's base to its eave"; J-A30.87 index l. 12971 and Part A l. 503, restated to match | VR3-01, VR3-02 |
| 28 with (f) | PRESENT | **PRESENT** | §8.6 l. 8207–8208 "The tile worker never runs `compose()`, `plan()` or close-up derivation (§8.9)"; §12.7 l. 9861–9863 "the count covers the programme's allocation, the seed clip where the storey's wings overlap (one `tileRings` overlay), opening the storey's transient arena (O(seed vertices)), the cuts and the read-back (§3.4)"; the r2 quotations of §8.5, §9.4, §8.3 and §8.9 are unchanged | — |
| 17, 20, 22 | PRESENT | PRESENT (carried) | r2 §2; §11.2 was not replaced | — |
| 8, 11, 12, 14, 15, 16, 19, 21, 29, 31 | PRESENT | PRESENT (carried) | r1 §2 and r2 §2; these subsections were not replaced this round | — |
| 26 | N/A | N/A (carried) | §12.4 hinterland row unchanged (J-A26.41) | — |

## 3 Re-check of the issues repair round 3 claimed to fix

| issue | owner | verdict | evidence (live line) |
|---|---|---|---|
| VR2-01 | rendering | FIXED | §8.5 (2) l. 8139–8144 uses the required wording, with deviation 4 (see below); §8.4 l. 8059–8061 uses the required wording, plural per deviation 1; the sweep (deviation 2) brings §8.3 l. 8023 and §11.1 l. 9171–9172 into line; J-A30.87 is restated in the index (l. 12971) and Part A (l. 503) and appears once in each. The probes "the passage's span ring", "under the base wing that spans it", "the building's base plus", "the eave over the span ring" and "span ring's prism" each return 0 in the part |
| VR2-02 | rendering | FIXED | l. 8208 matches the required wording. A sweep of every `compose()` mention finds no other list of what the tile worker never runs; §8.9 l. 8322 and l. 8325 already name `plan()` |
| VR2-03 | rendering | FIXED | l. 9862 matches the required wording, and §3.4 l. 2541 and l. 2632 still define `tileRings` and the seed clip |
| VR2-04 | kernel | FIXED | §3.2 (9) l. 2198 "(the side with its square root; item 9; the cap figures: §12.2)", which removes the loop; §12.2 keeps the pointer and the figures |
| VR2-05 | scope | FIXED | §1.1 l. 211 "`// the frame scales with the requested population (§3.2 (9))`" |
| VR2-06 | scope | FIXED | T30-5 l. 10429 "a bridged `export.request` for `.plat` from a client whose key is `public` is answered by `export.refused` carrying `E_KNOWLEDGE_TIER`, and never by `export.ready`". "From a client" replaces my "to a client", which is the more accurate direction |

**The repair's four vetoable deviations are all accepted.**
1. The plural "casts its span marks … each a prism" is needed because a stepped front has several marks.
2. The §8.3 and §11.1 sweep is required by rule (1): the mass, the shadows and the 3-D export must read one covering.
3. The rejected alternative added to J-A30.87's Part A entry is accurate. `Building.heights` is the maximum over the
   wings, per §2.6 l. 967.
4. The `heightCm` convention is consistent with §2.6's `Heights`, where "eave, ridge, tower above baseCm" (l. 946). The
   shadow `drop` also reads a height above the caster's base (§8.4). §8.1's `attrs` comment (l. 7553) names the columns
   without stating the convention. The trailing clause "so the mark's top is that wing's eave" fixes the geometry
   either way, so nothing is raised. The degenerate case where the eave does not exceed the headroom is VR3-01.

## 4 The checks

**SINGLE-SOURCE.** Each fact that round 3 touched has one home, and the other places point to it:
* the span mark (its count, ring, base and top) is stated in §8.5 (2);
* §8.4's caster is "its span marks, §8.5 (2)", with the prism restated only as the caster's extent, the pattern every
  §8.4 caster follows;
* §8.3's census row cites §8.5 (2);
* §11.1's two rows state each file format's mapping, which is their home by the canon (a format row maps model data),
  and cite §8.5 (2) and §2.6;
* the seed clip's cost appears only in §12.7's list, and its mechanism in §3.4;
* the tile worker's exclusions are in §8.9, and §8.6 points to them.

No second statement is left in the part.

**STALE.** Every probe returns 0 in the part, except the six known harmless hits (`vr3/probes-stale.txt`):
* the old rules: lots as buildings, binary wealth (the one "binary" hit is "glTF 2.0 binary"), size by tier, one
  central market, the map writing the dossier, a proprietary licence, and terrain or water that never change (the six
  "never change" hits are rendering invariants);
* this round's retired wording: "the passage's span ring", "under the base wing that spans it", "the building's base
  plus", "casts its span mark,", "the eave over the span ring", "span ring's prism" and "`compose()` or close-up";
* the earlier rounds' retired wording: "until the building is composed", "footprint ring", "frame area scales" and
  "side scales".

**CROSS-PART.**
* *Notes addressed to rendering.* None of the five other repair-r3 reports addresses a note to rendering. The kernel
  report cites §12.2 only for VR2-04. Assemble-r3 §8 lists the rendering targets `plan()` in §8.6, the seed clip in
  §12.7 and §1.1's pointer, and all three are present. Its five open notes are addressed to other parts. The landed
  verify-r3 reports of kernel, pipeline, determinism and model raise no rendering issue. Verify-model-r3 records the
  repair's §8.5 citation as reflected, and its V-MAB3-02 (ii) is VR3-02's companion.
* *Changes elsewhere against the part.* The whole-document diff removes no back-quoted identifier. The r3 changes the
  part reads were probed in `vr3/probes-cross.txt`:
  * capacity re-homing and the fill clamped into [1, capacity] (§2.6, §4.7, §10.2);
  * `Basement.access` and the walk-out;
  * `fieldBand`;
  * the tunnel split (II.6, §6.3);
  * the clip order.

  §12.7's chain bound still holds: "the band set's rows less one … plus the building's capacity less one". The chain
  runs from the as-built count, which is clamped into [1, capacity] (l. 1515), to a count that is never above the
  capacity. A split tunnel is still one CityJSON `Tunnel` per record.
* *Homes the repaired text points to.*
  * `BaseWing.spans` (l. 959: "on each base wing whose ring runs along the passage's edge (a stepped front building's
    quads each) … §8.5's span mark read them before any composition exists") supports the pointer.
  * `Wing.spans` (l. 987) defines the span-ring cut once. Its reader list does not match §8.5: VR3-02.
  * `Heights` (l. 946) supports deviation 4.
  * `Passage.headroomCm` (l. 877) is declared but never written: VR3-01.

**DEFERRAL-WORDING.** None in the part.
* The four "later" hits are ordinary prose: "no later casing", "the later pin", "a later entity" and "every later
  licensing choice".
* "not yet opened" (l. 8200) describes a state, not a deferral.
* "open" in l. 9374 ("keeps … every later licensing choice open") describes the design leaving the host's licence free
  (J-A21.81). It is not an unresolved choice of this design.
* There is no "TBD", "deferred" or "for now".

**BROKEN-REFERENCE.**
* *Syntactic.* `refs.py` on the live document found 139 headings, 35 D ids, 470 J ids and 2 broken references. Both
  are the pre-existing external citations: `os-geometry.md` §2.1.4 (l. 2708) and RFC 7946 §3.1.6 (l. 9200).
* *Semantic.* None is left in the part now that VR2-04 is fixed.

**NEW-PROBLEM.** VR3-01 is exposed by the repair: deviation 4 makes the span mark's height `eaveCm` less
`headroomCm`, so the undefined headroom now sets both the underside and the height of the mark.

**DOCUMENT CHECKS.** `doc_checks.py --sections "8,9,11,12"` exits 0 with C1 5/0, C2 0/0, C3 154/0, C4 1/0, S1 0/0 and
S2 0/0 (hits / unreviewed), the same as r2 (`vr3/dc-part.txt`).

## 5 Issues (both minor; each with its owning part and the exact change)

### VR3-01 — minor · partial · model (companion clause: determinism) · item 30 — `Passage.headroomCm` is read three times and written nowhere

**Claim.** Three places in the part read `Passage.headroomCm`:
* §8.5 (2) l. 8143–8144: "its `baseCm` column the spanning wing's base plus the passage's `headroomCm` and its
  `heightCm` column that wing's `eaveCm` less that `headroomCm`";
* §8.4 l. 8059–8060;
* §11.1 l. 9171–9172.

§2.5 l. 877 declares the field with a gloss only: "`headroomCm: Cm /* the ground storey's cells it takes; the storeys
above keep the frontage continuous (§2.6) */`". No stage and no edit writes it:
* S10 (9) and §4.6 give the passage's width (`passage.widthM`) but no headroom;
* `drawPassage` (l. 6439) takes `widthCm` only;
* §2.6 `BaseWing.spans` names S11 as the writer of `spans`, not of the headroom;
* of the 21 lines holding `headroomCm`, 6 are the passage's (the declaration and five lines of reads) and the other 15
  are the tunnel's.

Nothing keeps the headroom below a spanning wing's eave either. §4.6 l. 4297–4298 says S11 gives the building "a wing
that spans the passage at every storey above the ground", but no rule requires such a wing to have two floors.

As a result the underside of the span mark, the length of its shadow and the underside of the glTF and CityJSON
extrusion are undetermined. With a one-storey spanning wing, the mark's `heightCm` is zero or less. Deviation 4 of the
repair made this visible, because the height now subtracts the field.

**Required change (§2.5, the `Passage` interface, l. 877).** Replace
"`headroomCm: Cm /* the ground storey's cells it takes; the storeys above keep the frontage continuous (§2.6) */`"
with
"`headroomCm: Cm /* the passage's clear height, the ground storey it takes (the storeys above keep the frontage continuous, §2.6): written by S11 whenever it writes the spanning wings' BaseWing.spans (§4.7 S11, §2.6) — and so on every re-fit — as the least ground-storey height (eaveCm ÷ floors, rounded down to the centimetre) over the base wings that span it; S11 gives every spanning wing at least two floors (raising its class row's floors to two where they would be one), so each spanning wing's eave stands above the headroom (§8.5 (2)'s span mark, §8.4, §11.1), and a heights edit that would leave a spanning wing below two floors is refused (F-EDIT, §5.2) */`".

**Companion (determinism, §5.2 F-EDIT row, l. 5645).** After "or a hand `relet` above §2.6's capacity (item 28, item 28
(f), §7.1);" insert "a heights edit that would leave a wing spanning a passage below two floors (§2.5
`Passage.headroomCm`; item 30);". This is required by the single-source pattern: F-EDIT's row lists every refusal and
points to that refusal's home.

The owning seat may choose a different value rule, such as a table row for the headroom by band, provided it names the
writer and keeps every spanning wing's eave above the headroom. Whatever rule it chooses must meet both conditions.

### VR3-02 — minor · conflict · model · item 30 — `Wing.spans` lists the span mark, its shadow and the 3-D export as readers of a composed wing

**Claim.** §2.6 l. 987 (`Wing.spans`) ends "read, on the base or the composed wing, by the capacity (below), the plan
rung, §8.5's span mark, the shadow pass and the 3-D export". After round 3 the three rendering readers read the base
wing only:
* §8.5 (2) emits "one per base wing that spans the passage";
* §8.4's span caster is that mark;
* §11.1's glTF row extrudes "each wing's `ring` (§2.6)", with the roof "by the wing's kind" (`BaseWing.kind`, §8.6), and
  the CityJSON row follows the same wings.

`BaseWing.spans` (l. 959) already says the span mark reads the base wing "before any composition exists". So the model
text gives the renderer a second admissible source for the same mark. A composed wing has its own `Heights` (l. 985),
so that second source could put a stepped front's span at a different eave.

Verify-model-r3's V-MAB3-02 (ii) rewrites the same sentence for the capacity, and still leaves these three readers on
"the base or the composed wing". The two changes must be applied together.

**Required change (§2.6, `Wing.spans`; supersedes the reader half of V-MAB3-02 (ii)).** Replace "read, on the base or
the composed wing, by the capacity (below), the plan rung, §8.5's span mark, the shadow pass and the 3-D export" with
"read on the base wing by the capacity (below), §8.5's span mark (also §8.4's span caster) and the 3-D export (§11.1),
and on the base or the composed wing by the plan rung".

## 6 Rulings in force (no ruling needed from this lane)

* **J-A30.87 (restated in round 3).** A building over a passage gets one span mark per spanning base wing, from that
  wing's base plus the headroom up to that wing's eave. I accept the restatement. Its index row and Part A entry match
  §8.5 (2), and each appears once.
* **Carried from r2 §6:** J-A28.87 (room labels 5–9 px, PLAUSIBLE, vetoable) and J-A30.85 (document formats and
  permalinks only to a `secret` key; the bridge answers a refusal with `export.refused`).
* **Carried from r1 §6:** J-A19.81 and J-A28.42, unchanged.
* **VR3-01's proposed guard.** The refusal of a heights edit that would leave a spanning wing below two floors is a
  small new refusal. If the model seat adopts it, it records it as a judgment call under J-A30.23 or a new J-A30 id.
  Nothing here needs the owner.

## 7 Reading record, CONFIRMED versus PLAUSIBLE, receipts

**Read whole:**
* `assemble-r3.md`, `repair-rendering-r3-report.md` and my `verify-rendering-r2.md`;
* the §8–§12 diff r2 → r3;
* §8.3, §8.4, §8.5, §8.6, §11.1 and §12.7 (the replaced subsections), with §8.1;
* J-A30.87's index row and Part A entry.

**Read in part:**
* §2.6: `Heights`, `BaseWing`, `Building.heights`, `Wing`, the capacity bullet and the re-cut's canonical chain,
  l. 1468–1527;
* §2.5 `Passage`; §3.2 (9); §1.1 `RungProfile`; §3.4 `tileRings`; §4.6's `passage` reach; §4.7 S10 (9) and S11's heights;
* §5.2 F-EDIT; §8.9 l. 8322–8341; §11.2 fates; §13.2 T30-5; §10.2 `BuildingClassRow`;
* the cross-part sections of the five other repair-r3 reports and of verify-kernel-r3, -model-r3, -pipeline-r3 and
  -determinism-r3.

**CONFIRMED** (executed or read on `1a861c72…`):
* every quotation above;
* the part diff: 6 hunks in §8, §11 and §12, plus 2 in §10.2, which are the pipeline's;
* the whole-document identifier diff: 0 removed;
* the stale, deferral and cross-part probes;
* `refs.py`: 2 broken references, both external;
* `doc_checks.py` on §8, §9, §11 and §12: exit 0;
* the absence of any writer of `Passage.headroomCm`, from all 21 lines holding `headroomCm` in the document (6 the
  passage's, 15 the tunnel's) and the `drawPassage` signature.

**PLAUSIBLE** (reasoning only):
* the severity grades;
* that a class row can give a spanning wing one floor, which rests on `BuildingClassRow.floors` being a free range;
* that the 3-D export reads base wings, which rests on "each wing's `ring`" naming a `BaseWing` field;
* the particular headroom rule proposed in VR3-01. Any rule that names a writer and keeps every eave above the
  headroom meets the need.

**Receipts** (session scratchpad `…/scratchpad/vr3/`): `part-before.md`, `part-after.md`, `part-before-full.md`,
`part-after-full.md`, `part.diff`, `whole.diff`, `probes-stale.txt`, `probes-cross.txt`, `refs-out.json`,
`refs-run.txt`, `dc-part.txt` and `dc-part.err`.
