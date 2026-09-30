# verify-rendering-r2 — lane amendments-b/verify-rendering-r2 (VERIFY the RENDERING part, §8, §9, §11, §12, after repair round 2)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-rendering-r2).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
BASE: docs/ARCHITECTURE.md sha256 831efd42… (assemble-r2 installed; unchanged during this lane); rationale f2c2a1ca…
READ: assemble-r2, repair-rendering-r2 report, my verify-rendering-r1, VK1-11 (verify-kernel-r1), the part diff r1→r2 (13 hunks), the 8 replaced subsections whole (§8.3, §8.5, §8.9, §9.4, §11.1, §11.2, §11.3, §12.2), §8.4, §8.6, §12.7, §2.6 BaseWing / Wing / Heights, §3.2 (1)/(9), §3.4 seed clip, §6.4 permalinks, §13.2 T30-5, the three restated / new J rows and Part A entries, the other seats' r2 cross-part notes — done
ITEMS (8, 11, 12, 14, 15, 16, 17, 19, 20, 21, 22, 26, 28, 29, 30, 31): done (§2)
RE-CHECK VR1-01..VR1-08, VK1-11: done (§3)
CHECKS (single-source, stale, cross-part, deferral, broken-reference, new-problem): done (§4)
ISSUES: VR2-01 … VR2-06 written (§5)
RECEIPTS: scratchpad vr2/ part-before.md, part-after.md, part.diff, probes1.txt, refs-out.json, dc-part.txt — done
STATUS: COMPLETE

Document verified: `docs/ARCHITECTURE.md` as installed by amendments-b/assemble-r2 (sha256 `831efd429092adf3…`, 12 942
lines). Before-text: `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r2-2026-09-27.md` (sha256 `365e19f2…`, the
document my r1 report verified). Earlier reports: `verify-rendering-r0.md`, `verify-rendering-r1.md`.

## 1 Outcome

Repair round 2 fixed every issue routed to rendering. The seven r1 issues it owned (VR1-01 … VR1-06, VR1-08) and the
kernel's VK1-11 are FIXED, each by the exact substitution the report claims; the scope seat fixed VR1-07 in T30-5. The
part diff against the r2 archive has 13 hunks, all inside the 8 replaced subsections and each one a claimed fix. Every
routed item stays PRESENT (26 N/A as recorded).

The round found **6 new issues, all minor**. Three are owned by rendering, one by kernel and two by scope:
* **VR2-01** (rendering) — §8.5 (2) draws one span mark per passage at the building's base and eave. But §2.6 now puts
  `spans` on each spanning base wing (a stepped front's quads each, each with its own `Heights`).
* **VR2-02** (rendering) — §8.6 says the tile worker never runs "`compose()` or close-up derivation". It omits `plan()`.
  This is the same slip as VR1-08, found by a sweep of every `compose()` list.
* **VR2-03** (rendering) — the kernel's r2 note asks for §3.4's seed clip (`tileRings`, one overlay per storey where
  wings overlap) in §12.7's `plan()` cost list. The note is not reflected.
* **VR2-04** (kernel) — VK1-11's fix left a pointer loop. §3.2 (9) credits the square-root rule to "§12.2", and §12.2
  now only points back to §3.2 (9).
* **VR2-05** (scope) — §1.1's `RungProfile` comment still restates the scaling rule and cites §12.2 for it. This is
  assemble-r2's open note 7.
* **VR2-06** (scope) — T30-5 tests the API's `E_KNOWLEDGE_TIER` refusal. It does not test the bridge's new
  `export.refused` reply.

No issue needs an owner ruling.

## 2 Per item — is the mechanism there, in the terms the route asked?

r0 and r1 verdicts: `verify-rendering-r0.md` §2 and `verify-rendering-r1.md` §2. This round re-read the items whose
rendering text the repair changed (28, 30, 17 / 20 / 22). The others keep r1's verdict: their subsections were not
replaced, and no replaced text touches them.

| item | r1 | r2 | where it stands now (quoted, live text) | open issues |
|---|---|---|---|---|
| 28 with (f) | PRESENT | **PRESENT** | §8.5 "at the largest cap height in §9.4's room-label range whose glyph boxes fit within the room's ring, and not at all below that range"; §9.4 "room labels cap 5–9 px, each sized within that range by §8.5's plan draw (J-A28.87)"; §8.3 plan-draw row "at a cap height within §9.4's room-label range, a room left unlabelled only where its label does not fit at the range's bottom"; §8.9 (2) "on request, `compose()`, `plan()` and close-up derivation"; §8.5 (2) span ring "under the base wing that spans it (`BaseWing.spans`, which a composed wing inherits as `Wing.spans`)" | VR2-01, VR2-02, VR2-03 |
| 30 | PRESENT | **PRESENT** | §11.1 "The document formats — `.plat`, the compact twin, the JSON schema and a permalink (its recipe and log, or the document a `&doc=` link names, rebuild every name, §6.4) — … `export` offers them only to a key of tier `secret`"; permalinks row "a document format under *Knowledge* (below): offered only to a key of tier `secret`"; §11.2 "`fates` pages and a `confirm` result go only to an editing role and are not filtered: `confirm` needs the lists back unchanged … an editing client holds the document it loaded (`open`, above, or §11.3's `doc.load`), for which the key is no secrecy boundary (§11.1)"; §11.3 "`export.ready { bytes }` or `export.refused { error, message }` (an API error of `export`, §11.1's `E_KNOWLEDGE_TIER` among them)"; T30-5 (scope) "`export` of `.plat` and of a permalink under a `public` key fails with `E_KNOWLEDGE_TIER`" | VR2-01, VR2-06 |
| 17, 20, 22 | PRESENT | **PRESENT** | §11.2 `subscribe` "`report.changed` — the `changes` entries of §5.4's `GenerationReport` appended since the last delivery; items 17–22"; §5.4 l. 5668 declares `changes: ReportEntry[]` and names §11.2 as its consumer | — |
| 8, 11, 12, 14, 15, 16, 19, 21, 29, 31 | PRESENT | PRESENT (carried) | r1 §2; the subsections were not replaced this round | — |
| 26 | N/A | N/A (carried) | §12.4 hinterland row unchanged (J-A26.41) | — |

## 3 Re-check of the issues repair round 2 claimed to fix

| issue | verdict | evidence (live line) |
|---|---|---|
| VR1-01 | FIXED | l. 9278, verbatim as required; §11.2 now points to §5.4 and lists nothing |
| VR1-02 (with model's V-MAB1-01) | FIXED | §8.5 (2) l. 8064–8065; §11.1 3-D row l. 9094 "`BaseWing.spans`, §2.6"; J-A30.87 index l. 12886 "the passage's span ring under the base wing that spans it"; Part A entry "`BaseWing.spans`, which a composition inherits"; `BaseWing.spans` declared at l. 959; "footprint ring" and "until the building is composed" occur 0 times in the part. Precision residue: VR2-01 |
| VR1-03 | FIXED | §11.1 l. 9107–9111 and permalinks row l. 9097; J-A30.85 index "the document formats and permalinks go only to a key of tier `secret`"; Part A lists "a permalink". §6.4's refusal list is unaffected, because the tier refusal is §11.1's `export` rule |
| VR1-04 | FIXED | l. 9250–9252, with one deviation that I accept: the added "(`open`, above, …)" covers an embedded client, which loads through the API |
| VR1-05 | FIXED | l. 9302–9303; J-A30.85 index "a refused bridged export answered by `export.refused`". Missing test: VR2-06 |
| VR1-06 | FIXED | §8.5 l. 8040–8043; §9.4 l. 8676–8677; §8.3 l. 7948; J-A28.87 index l. 12897 and Part A (the 5–9 px derivation, PLAUSIBLE, vetoable). There is one statement of the range (§9.4), one of the fitting rule (§8.5) and one census row (§8.3) |
| VR1-07 (scope) | FIXED | T30-5 l. 10343–10349 covers every query kind, the band-less kinds, the GeoJSON export and the `.plat` and permalink refusal |
| VR1-08 | FIXED | l. 8248. Sibling not caught: VR2-02 |
| VK1-11 | FIXED | l. 9454 "Within a rung the frame scales with the requested population (§3.2 (9))."; the cap figures stay. Pointer loop left: VR2-04, VR2-05 |

## 4 The checks

**SINGLE-SOURCE.** Each new statement has one home:
* the room-label range is in §9.4, and §8.5 and §8.3 point to it;
* the fitting rule is in §8.5;
* the report entries are in §5.4, and §11.2 points to it;
* the permalink's tier is in §11.1's Knowledge paragraph, and the permalinks row points to it;
* the frame scaling is in §3.2 (9), and §12.2 points to it.

No second statement is left in the part. One restatement remains outside it: §1.1's comment (VR2-05).

**STALE.** Every probe returns 0 in the part (`part-after.md`):
* the old rules: lots as buildings, binary wealth (the one "binary" hit is "glTF 2.0 binary"), size by tier, one
  central market, the map writing the dossier, a licence default, and terrain or water that never changes (the six
  "never change" hits are rendering invariants);
* this round's old wording: "until the building is composed", "footprint ring", "label style gives rooms", "holds the
  whole document", "the report's new entries", "frame area scales" and "`compose()` and close-up".

**CROSS-PART.**
* **Changed facts traced to every other citing line.** I ran whole-document probes for "room label", "span ring",
  "span mark", `E_KNOWLEDGE_TIER`, `export.refused`, `report.changed`, "permalink", `compose()`, "derivation pool"
  and §12.2 (`probes1.txt`). Every citing line agrees except four:
  * §8.6 l. 8131 (VR2-02);
  * §3.2 (9) l. 2176 (VR2-04);
  * §1.1 l. 211 (VR2-05);
  * T30-5, which lacks the bridge reply (VR2-06).
* **Notes addressed to rendering.**
  * Model's "order dependency": reflected. `BaseWing.spans` is declared (l. 959) and §8.5 reads it.
  * Kernel's r2 note on §12.7: not reflected (VR2-03).
  * Rendering's own notes: the §1.1 comment (VR2-05, scope) and the permalink clause in VR1-07 (applied).
  * `LabelStyle` is still only glossed at l. 7574. No rendering text reads a field of it any more, so this is not raised.
* **Homes the new text points to.** Each supports the pointer:
  * §2.6 `BaseWing.spans` and `Wing.spans` (its span ring cut defined once, l. 987);
  * §5.4 `changes`;
  * §6.4's permalink forms;
  * §3.2 (9);
  * §9.4's range.

**DEFERRAL-WORDING.** None in the part. The five "later" hits are ordinary prose ("no later casing", "the later pin",
"a later entity", "every later licensing choice", "later boundaries"). There is no "TBD", "open" or "deferred".

**BROKEN-REFERENCE.**
* **Syntactic.** `refs.py` on the live document found 139 headings, 35 D ids, 469 J ids and 2 broken references. Both
  are the pre-existing external citations (`os-geometry.md` §2.1.4, l. 2679; RFC 7946 §3.1.6, l. 9123).
* **Semantic.** One: the §3.2 (9) ↔ §12.2 loop (VR2-04).

**NEW-PROBLEM.**
* VR2-01: the model's per-wing `spans` against §8.5's per-passage mark.
* VR2-02: a missed sibling of VR1-08.

**DOCUMENT CHECKS.** `doc_checks.py --sections "8,9,11,12"`: C1 5/0, C2 0/0, C3 154/0, C4 1/0, S1 0/0, S2 0/0, exit 0.

## 5 Issues (all minor; each with its owning part and the exact change)

### VR2-01 — minor · new-problem · rendering · items 30 × 28 — the span mark is per passage, `spans` is per base wing (§8.5 (2), §8.4)

**Claim.** §2.6 puts `spans` "on each base wing whose ring runs along the passage's edge (a stepped front building's
quads each)" (l. 959) and defines the span ring per wing: "the part of that face under the wing" (l. 987). Each such
quad has its own `Heights` (`baseCm`, `eaveCm`; l. 946, 959).

§8.5 (2) still builds one mark per passage from the building: "the passage's span ring — §2.6's cut of the `Passage`
face under the base wing that spans it …" and "its `baseCm` column the building's base plus the passage's `headroomCm`
and its height the eave". §8.4 prices the caster the same way: "a prism from `baseCm` plus the passage's `headroomCm` to
the eave over the span ring". For a stepped front over a passage, the text leaves three things open: how many marks
there are, which ring each one takes, and whose base and eave.

**Required change.**
* §8.5 (2): replace "the passage's span ring — §2.6's cut of the `Passage` face under the base wing that spans it
  (`BaseWing.spans`, which a composed wing inherits as `Wing.spans`) — so its upper storeys cover the passage at the
  city band" with "one per base wing that spans the passage (`BaseWing.spans`, which a composed wing inherits as
  `Wing.spans`; a stepped front's quads each), that wing's span ring — §2.6's cut of the `Passage` face under it — so
  its upper storeys cover the passage at the city band".
* §8.5 (2): replace "its `baseCm` column the building's base plus the passage's `headroomCm` and its height the eave"
  with "its `baseCm` column the spanning wing's base plus the passage's `headroomCm` and its height that wing's eave".
* §8.4, Shadow casters: replace "a prism from `baseCm` plus the passage's `headroomCm` to the eave over the span ring"
  with "a prism from its wing's `baseCm` plus the passage's `headroomCm` to that wing's eave over its span ring".

### VR2-02 — minor · partial · rendering · item 28 — §8.6 omits `plan()` from what the tile worker never runs

**Claim.** §8.6 l. 8131 says "The tile worker never runs `compose()` or close-up derivation (§8.9)". §8.9 (1)–(2) and
§12.7 hand `plan()` to the derivation pool too, and the tile worker holds no model (§8.9 (3)). This is VR1-08's slip in
the one other `compose()` list. A sweep of every `compose()` mention finds no third.

**Required change (§8.6).** "never runs `compose()` or close-up derivation (§8.9)" → "never runs `compose()`, `plan()`
or close-up derivation (§8.9)".

### VR2-03 — minor · conflict · rendering · item 28 — §12.7's `plan()` cost list omits the seed clip (kernel's r2 note)

**Claim.** Repair-kernel-r2 added the seed clip (§3.4 l. 2610: "A caller whose wings overlap … passes them clipped to
tile by `tileRings` … the faces of one overlay of the storey's rings"). Its report's cross-part note to rendering reads
"'O(seed vertices)' is unchanged. The clip adds one overlay per storey where wings overlap." §12.7 (l. 9785–9786) still
counts only "the programme's allocation, opening the storey's transient arena (O(seed vertices)), the cuts and the
read-back (§3.4)". So the step the note adds is not in the budget's stated coverage.

**Required change (§12.7, Plan rung).** "the count covers the programme's allocation, opening the storey's transient
arena (O(seed vertices)), the cuts and the read-back (§3.4)" → "the count covers the programme's allocation, the seed
clip where the storey's wings overlap (one `tileRings` overlay), opening the storey's transient arena (O(seed
vertices)), the cuts and the read-back (§3.4)".

### VR2-04 — minor · broken-reference · kernel · item 9 — §3.2 (9) and §12.2 point at each other for the scaling rule

**Claim.** §3.2 (9) (l. 2175–2176) reads "A = A_target · population ÷ target (the side with its square root; §12.2,
item 9)". After VK1-11, §12.2 says only "Within a rung the frame scales with the requested population (§3.2 (9))". So
the citation credits §12.2 with a rule it no longer holds, and the two point at each other.

**Required change (§3.2 (9)).** "(the side with its square root; §12.2, item 9)" → "(the side with its square root;
item 9; the cap figures: §12.2)".

### VR2-05 — minor · stale · scope · item 9 — §1.1's `RungProfile` comment restates the scaling rule and cites §12.2 for it

**Claim.** l. 211 reads "`// side scales with √(population ÷ target) (§3.2, §12.2)`". The rule's home is §3.2 (9)
(CANON-C03), and §12.2 now holds only a pointer and the cap figures. This is assemble-r2's open note 7 and the
repair-rendering-r2 report's first cross-part observation. No seat applied it.

**Required change (§1.1, `RungProfile`).** "`// side scales with √(population ÷ target) (§3.2, §12.2)`" → "`// the frame
scales with the requested population (§3.2 (9))`".

### VR2-06 — minor · partial · scope · item 30 (d) — T30-5 does not test the bridge's `export.refused`

**Claim.** Repair round 2 added a bridge reply for a refused export (§11.3: "`export.refused { error, message }` (an API
error of `export`, §11.1's `E_KNOWLEDGE_TIER` among them)"). T30-5 tests the API's refusal only ("`export` of `.plat`
and of a permalink under a `public` key fails with `E_KNOWLEDGE_TIER` and succeeds under `secret`"). §11.3's M3a
bridge test covers convergence only. Rule (2) wants a bar for the new message.

**Required change (§13.2 T30-5).** After "and succeeds under `secret`;" insert "a bridged `export.request` for `.plat`
to a client whose key is `public` is answered by `export.refused` carrying `E_KNOWLEDGE_TIER`, and never by
`export.ready`;".

## 6 Rulings in force (no ruling needed from this lane)

* **J-A28.87** (new): room labels are 5–9 px. This is a calibration with no measurement behind it, recorded as
  PLAUSIBLE and vetoable. I accept it.
* **J-A30.85** (restated): the save file and permalinks are refused to a viewer whose key is not `secret`, and a
  bridged host is told why. My r1 §6 describes this behaviour change in plain words; it is unchanged.
* **Carried:** J-A19.81 (roof tint follows the current band) and J-A28.42 (eager footprints; `plotsOnly` as the owner's
  "plots without buildings") stand as r1 §6 describes.

## 7 Reading record, CONFIRMED versus PLAUSIBLE, receipts

**Read whole:**
* `assemble-r2.md`, `repair-rendering-r2-report.md` and my `verify-rendering-r1.md`;
* the part diff r1 → r2;
* §8.3, §8.5, §8.9, §9.4, §11.1, §11.2 and §11.3, with §12.2, §8.4, §8.6 and §12.7;
* the three J rows and Part A entries (J-A28.87, J-A30.85, J-A30.87) and J-A30.83's.

**Read in part:**
* §2.6: `Heights`, `BaseWing`, `Wing.spans`;
* §3.2 (1) and (9); §3.4's seed clip;
* §6.4 Permalinks; §5.4 `changes`; §8.1 item 2; §9.2 Zoom stops; §13.2 T30-5; §14 l. 10968–10972;
* the cross-part sections of the other five repair-r2 reports;
* the rendering mentions in verify-model-r2, verify-pipeline-r2 and verify-determinism-r2 (none raises a rendering issue).

**CONFIRMED** (executed or read on `831efd42…`):
* every quotation above;
* the 13-hunk diff;
* the stale, deferral and citing-line probes;
* `refs.py`: 2 broken, both external;
* `doc_checks.py` on §8, §9, §11 and §12: exit 0.

**PLAUSIBLE** (reasoning only):
* the severity grades;
* VR2-01's reading that a stepped front's quads may differ in base and eave. This rests on `BaseWing.heights` being
  per wing and on l. 962's "stepped quads on a slope".
* VR2-03: that the clip belongs in the covered list rather than inside "opening the arena".

**Receipts** (session scratchpad `…/scratchpad/vr2/`): `part-before.md`, `part-after.md`, `part.diff`, `probes1.txt`,
`refs-out.json`, `refs-run.txt`, `dc-part.txt`.
