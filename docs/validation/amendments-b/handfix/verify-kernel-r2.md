# Verify KERNEL hand fixes after repair round 2 (handfix-b/verify-kernel-r2)

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-kernel-r2).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
- ITEM read-inputs (closing §2 kernel rows + §3, apply.md, repair-r2-*.md, assemble-r2.md, verify-kernel-r0.md, repair-kernel-r2-report.md) | done 19:47
- ITEM locate-texts (archive before / r2 archive / current, touched subsections whole) | done 19:50 (live 357c02f2… / 9575f26c… = assemble-r2's install; §3 A0 = A1 = A2, live differs by the §3.4 gloss only)
- ITEM verdicts (each fix PRESENT/PARTIAL/MISSING/MISAPPLIED, quoted) | done (#28 PRESENT; VHM1-04 PRESENT verbatim; J-A28.34 Part A widening PRESENT; r0's VKH-01..03 resolved in the live text; hole-gloss check re-run on 8 fresh seeds, 0 failures)
- ITEM side-checks (no other change, single source, refs, deferral, owner rules / item 20) | done (refs 2 pre-existing external; deferral 0; item 20 held; one new problem at the §3.4 boundary: VKH2-01, owner model)
- ITEM doc-checks (three-copy) | done 20:08 (the round adds 0 document hits in keys 3 and Judgment calls; the rationale's +4 C3 all in J-A28.26, none in J-A28.34; VKH2-01's reworded change adds 0 hits, doc §2 and rationale)
- ITEM issues + queue row + LANDED | done 20:09 (1 issue: VKH2-01 minor, owner model; queue row B-handfix-b/verify-kernel-r2 appended, old prefix byte-identical; LANDED line written)

Lane `handfix-b/verify-kernel-r2`, 2026-09-27, opus. Judged: `docs/ARCHITECTURE.md` sha256 `357c02f2…` (13 025 lines) and
`docs/ARCHITECTURE-RATIONALE.md` `9575f26c…` (2 053 lines), the hashes handfix-b/assemble-r2 installed, unchanged through
this lane. Before-texts: `docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md` (A0, `1a861c72…`), the round-1 archive
(A1, `5d752c9b…`) and the round-2 archive (A2, `e9c0b828…`), with their rationale twins (RA0 `8a24a5a7…`, RA2 `dcabf14b…`).
This seat edited no design text. Scratch: `handfix/vk2/` under the session scratchpad.

## Outcome

* **Both kernel fixes are PRESENT exactly as required, once each, and nothing else in the kernel part changed.**
  * Closing #28 (VK3-02), J-A28.33's index row: the required replacement, still in place after both repair rounds.
  * Round 2's VHM1-04, §3.4's holed-piece gloss: verify-model-r1's required text, verbatim. The repair seat also
    restated the same stale gloss in J-A28.34's Part A entry, with the same wording (a widening; sound).
* **§3 is byte-identical in A0, A1 and A2.** Live §3 differs from each only in the 3 → 5 lines of the new gloss (diff).
* **The gloss is exact.** It was re-executed on the raster model (`hole-gloss-check.py`) for 8 fresh seeds of 2 000 cases
  each, with 0 failures. The gloss matches the topological hole in every ring, and no piece has a hole under the clip order.
* **The round-0 kernel issues are resolved in the live text**, checked from the kernel side: VKH-01 (model, the reconciled
  tower order), VKH-02 (model, step 4's pointer) and VKH-03 (scope, §13.1's refusal clause, verbatim).
* **One new minor issue sits at the kernel's boundary**, in model text that cites §3.4: VKH2-01, below. Round 2's VHM1-03
  passes a composer's room less the stair bay or chimney stack placed in it. Step 3 filters that placement only by
  topology. F-PLAN still aborts on a refused composer's room as the composer's bug. So a bay placed within `minEdge` of
  the room's wall now aborts the rung, where the same bay in a plain wing is re-placed. The required change is one
  sentence in §2.6 and one Part A sentence. No ruling of the owner is needed.
* References: 2 broken, the same 2 pre-existing external citations. Deferral wording: 0. Item 20 holds.

## 1 The fixes judged

| fix | owner | where (live) | verdict | evidence |
|---|---|---|---|---|
| closing #28 VK3-02 | kernel | J-A28.33 index row (doc l. 12816) | **PRESENT** | "with the rings §2.6's re-cut rule passes as `fixed` rings (the stair bay, the chimney stacks, the passage room, the composer's rooms and the kept rooms)"; the new text occurs A0 0, A1 1, A2 1, live 1; the old "with the kept rooms and the fixed anchors as `fixed` rings" occurs A0 1, A1 0, A2 0, live 0. A word diff against A0 shows only this replacement; the row is identical in A2 and live |
| round-2 VHM1-04 | kernel | §3.4 seed-clip paragraph (doc l. 2637–2641) | **PRESENT, verbatim** | "A piece left with a hole — earlier rings lying inside a later one without reaching its sides — is refused (`E_DEGENERATE`, detail `overlap`, naming a vertex of the hole), because a seed is one ring. §2.6's clip order puts a contained wing after its container, and a composed tower wholly inside a wing before that container only where an earlier wing the tower overlaps carries its cut to the container's sides, so the refusal marks a caller's bug (F-PLAN, §5.2)." This occurs live 1 (A0–A2 0), with whitespace normalised. The old sentence pair occurs A0–A2 1, live 0 |
| round-2 widening | kernel | J-A28.34 Part A (rat l. 487) | **PRESENT** (widened, sound) | A word diff RA2 → live shows exactly three changes: "an earlier wing wholly inside a later one" → "earlier rings lying inside a later one without reaching its sides"; the tower clause added after "which takes the enclosed rooms"; and the history tail "its holed-piece gloss restated by handfix-b repair-kernel-r2 after verify-model-r1's VHM1-04". Each occurs once. The old phrase occurs RL 0. J-A28.34's index row carries no gloss and is unchanged (A0 = A2 = live) |
| r0 VKH-01 | model (r1) | §2.6 stage-3 contract (l. 1266) | resolved (kernel side) | The reconciled order gives one order in both of VKH-01's cases. Two engaged towers take `Composition.towers` order. A tower inside wing B that engages an earlier wing is taken before all the wings. Every composer's room then lies inside one seed piece, as §3.4's `fixed` contract requires. The raster G2/G3 checks below found no holed piece |
| r0 VKH-02 | model (r1) | §2.6 step 4 (l. 1388) | resolved | "in the clip order, which the stage-3 contract states, by §3.4's seed clip": a pointer, not a restatement. The old text occurs live 0 |
| r0 VKH-03 | scope (r1) | §13.1 (l. 10084) | resolved, verbatim | "… exactly where that result has a hole on a case whose rings keep §2.6's composition contract, … which attraction may join (§3.7))" occurs live 1 |

No closing-report §2 fix edits §3. No other round-2 block touches §3 or a kernel row: in A2 → live, the only §3 hunk is
the gloss, and J-A28.31, J-A28.33 and J-A28.34's index rows are unchanged.

## 2 Checks

* **No other text changed.** In `diff` of §3, A2 → live, the only hunk is l. 557–559 → 557–561 of the section, the
  gloss. The J-A28.33 row changes only by #28's replacement (A0 → live) and is unchanged in round 2. J-A28.34's Part A
  changes by the three deltas above.
* **Placed once, never twice.** The new gloss phrase occurs doc 1 and rationale 1. The tower clause occurs doc 1 and
  rationale 1. The history tail occurs rationale 1.
* **The gloss matches its home.** §2.6 (l. 1266) takes a tower wholly inside a wing directly after its container,
  unless it overlaps a wing taken before that container. In that case it takes the tower before all the wings, "the
  earlier wing, not wholly inside the container, carrying the tower's cut to the container's edge". The gloss's "only
  where an earlier wing the tower overlaps carries its cut to the container's sides" is that condition. It also covers
  a tower taken after its first container A and before a later container R: A is then the earlier wing, and it is not
  wholly inside R, so its part holding the tower reaches R's sides. The F-PLAN row ("its clip order leaves no seed piece
  with a hole: §2.6's stage-3 contract, §3.4's `tileRings`"), §3.1's `E_DEGENERATE` comment, §3.10's seed-tiling row,
  §12.7's plan row, J-A28.26 (index and Part A) and §13.2's T28-4 all agree with it.
* **The gloss, executed.** `hole-gloss-check.py` was run with seeds 3–10, 2 000 cases each, on top of the Fable
  continuation's seeds 1 and 2.
  * The results: 0 failures on G1 (gloss ⇔ topological hole, under random orders and under the clip order), G2 (no hole
    under the clip order) and G3 (every tower taken before a wing that contains it overlaps an earlier wing whose part
    reaches that wing's sides).
  * Per seed: 8 906 – 9 024 rings, 213 – 256 holes under random orders, 70 – 108 free towers inside a wing, 13 – 31 towers
    after their container inside a later wing, and 92 – 124 cases where the old gloss would refuse a hole-free order.
  * Seeds 4, 5, 7 and 9 first crashed in the script's case generator, an empty `randint` range when an L-shape's box is
    near the frame. That is a test-harness defect, not a design one. They were re-run on a scratch copy that redraws
    such a case (1–3 redraws per seed; the project file is untouched).
  * The clip order the script models (its `r1_order`) is the live one: round 2 left §2.6's tower-order sentence
    unchanged (word diff A2 → live).
* **Single source.** The gloss restates, as the reason for the refusal, the property of §2.6's order that matters. It
  names its home and uses §2.6's own words ("carrying the tower's cut"). The repair seat kept the verifier's wording as a
  recorded JUDGMENT. It is a consistent gloss, not a competing rule, so it is not an issue. J-A28.33's parenthesis
  names its home ("§2.6's re-cut rule") and agrees with the re-cut bullet (l. 1500–1506), §3.4's re-cut paragraph and
  J-A28.26.
* **References.** `refs.py` on live finds 139 headings, 35 D ids, 472 J ids and 2 broken references. The 2 are
  `os-geometry.md` §2.1.4 (l. 2709) and RFC 7946 §3.1.6 (l. 9196), both pre-existing external citations; A2 gives the
  same 2. The new texts cite §2.6, §5.2 (F-PLAN), §3.4 and §3.10, and each resolves.
* **Deferral wording.** 0 hits in §3, the J-A28.33 and J-A28.34 index rows and J-A28.34's Part A entry. The probes were
  TBD, to be decided or determined, open question, defer, decide later, later pass or round, TODO, FIXME, left open, for
  now, revisit, in future, future work, not yet decided and pending.
* **Owner rules.** The fixes are glosses and a row summary. They change no behaviour, and no dossier element or roster
  household is touched, so item 20 holds. An abort of the plan rung removes nothing from the model either. VKH2-01
  concerns item 28 (a) ("stairs stacked across storeys (a spiral stair in a tower)"): with that defect, a valid tower
  building's plan could abort.

## 3 Issue

### VKH2-01 — minor · new-problem · owner model · item 28 (a) (round 2's VHM1-03; cites §3.4)

**Claim.** Round 2's VHM1-03 sentence in §2.6's stage-3 contract (l. 1267) has step 3 place a stair core's bay or a
chimney stack inside a composer's room against its wall, "meeting its sides along one run and nowhere else". The plan
rung then passes "the room less it". Step 3 "filters its candidates to those that stay out of every composer's room or
stand in one so", which is a topological test only.

Whether the room less the bay passes §3.4's input tests depends on where step 3 put the bay:

* §3.4 refuses "an input ring that would break `minEdge`, clearance or simplicity … naming the vertex";
* §3.10 defines clearance as every vertex at least `minEdge` from every edge outside its one-ring.

F-PLAN's tier 2 (§5.2) re-places a refused stair bay or stack "onto the side it came near or at least `minEdge` from
it". But it aborts on "any other refused ring — … a composer's room — … so its refusal is a bug". J-A28.73 rests this on
"the composer's rooms are the shell … so their refusal can only be a bug", and §2.6 (l. 1268) says "F-PLAN's abort on a
refused composer's room (§5.2) marks a composer's bug". The round-2 model seat judged that claim to "stay true". It
does not.

*Example.* A hall 800 × 600 cm has its stair bay, 300 × 250, against the back wall, with its near corner 10 cm from the
side wall. The bay meets the hall's sides along one run, so it passes the filter. The hall less the bay has:

* an edge (0,0)–(10,0) of 10 cm, which breaks `minEdge` (25 cm);
* a vertex (10,250) 10 cm from its side x = 0, which breaks clearance.

§3.4 refuses that ring with detail `fixed`, naming (0,0) or (10,0); (0,0) is the hall's own vertex. F-PLAN takes it as
a refused composer's room and aborts the rung. The same bay in a plain wing is the case tier 2 is written for: it is
"re-placed … onto the side it came near or at least `minEdge` from it".

A round tower's spiral bay is the common case. Where the tower's lattice ring has sides shorter than 2 × `minEdge`, a
run that ends inside a side always leaves a sub-edge shorter than `minEdge`: in the bay's ring or in the room's, about
half the time each.

The textual gap is CONFIRMED; reachability is PLAUSIBLE, since it depends on the placement's candidate grid against the
composer's room walls.

**Ruling taken** (vetoable, recorded by (2)):

* **Chosen:** filter the candidates so the room less the bay passes §3.4's input tests, and give a refusal named at a
  vertex the bay adds to the bay. This makes F-PLAN's premise true again.
* **Rejected:** a tier-2 rule re-placing the bay on any refusal of a room that holds one. It would mask a composer's
  real bug as a tier-6 omission once the bay's candidates run out.
* **Rejected:** a kernel change naming the refused ring. The ring really refused is the room, so the kernel change
  would not help.

**Required change.**

(1) §2.6, the stage-3 contract's bay-and-stack sentence (doc; occurs once). Replace:

> step 3 filters its candidates to those that stay out of every composer's room or stand in one so.

with:

> step 3 filters its candidates to those that stay out of every composer's room or stand in one so, the room less the bay or stack keeping `minEdge`, clearance and simplicity as §3.4 tests its inputs; a refusal naming a vertex that the bay or stack gives the room belongs to that bay or stack (F-PLAN tier 2, §5.2), so a refused composer's room stays the composer's bug.

(2) J-A28.26's Part A entry (rationale; occurs once). Replace:

> (handfix-b verify-model-r1 VHM1-03, widened by repair-model-r2 to the stack and the hall's stair). |

with:

> (handfix-b verify-model-r1 VHM1-03, widened by repair-model-r2 to the stack and the hall's stair). Step 3 admits a bay or stack inside a composer's room only at a candidate whose room remainder passes the kernel's tests of an input ring, and a refusal at a vertex it adds is its own, over letting the arena refuse the room, because the room less a bay depends on where the planner put the bay, which F-PLAN's tier 2 re-places, while tier 2 aborts on a refused composer's room as the composer's bug (handfix-b verify-kernel-r2 VKH2-01). |

Both old strings were counted on the live files (doc 1 / rationale 0, and rationale 1 / doc 0) and applied on scratch
copies; the new texts occur once each (`vk2/vkh2-01-change.json`). J-A28.26's index row is unchanged: the index states
the rule ("the room passed less it"), and the Part A entry records the refinement, as closing #18 (iii) and #26 (2) did.

## 4 Document checks

`doc_checks.py`, one corpus snapshot (9 626 JSON files, 911 940 C3 3-grams, 478 C4 lists in every run; header identical
apart from the drifting `colour_files`). "Mine" and "combined" are the live file: this seat changed nothing, and the
round's combination is the installed text.

| run | copy | allow | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed | exit |
|---|---|---|---|---|---|---|---|---|---|---|
| `--sections "3,Judgment calls"` untouched | A2 (`e9c0b828…`) | default | 5 | 0 | 161 | 0 | 0 | 0 | 0 | 0 |
| same, mine = combined | live (`357c02f2…`) | default | 5 | 0 | 161 | 0 | 0 | 0 | 0 | 0 |
| same, untouched | A2 | empty | 5 | 0 | 161 | 0 | 0 | 0 | 166 | 1 |
| same, mine = combined | live | empty | 5 | 0 | 161 | 0 | 0 | 0 | 166 | 1 |
| rationale whole, untouched (`--heads` A2) | RA2 | default | 0 | 0 | 399 | 6 | 0 | 17 | 274 | 1 |
| rationale whole, live (`--heads` live) | RL | default | 0 | 0 | 403 | 6 | 0 | 17 | 278 | 1 |

* **The document.** With the empty allow file the hit sets of A2 and live are identical: 166 each, 0 added, 0 removed,
  compared by (check, text) with line numbers normalised. The round adds no document hit in the kernel's keys.
* **The rationale** lies outside the allow file's regime; its standing unreviewed set predates the pass. It gains 4 C3
  hits and swaps one C4 list. Every added C3 text occurs in J-A28.26's entry (the model's restatement) and none in
  J-A28.34's, so the kernel's restated entry adds 0 hits. This is the set assemble-r2 already reviewed (its §7).
* **VKH2-01's proposed change** was checked on scratch copies against the same snapshot.
  * The first wording added a C3 hit "adds to the room is" and a C4 hit on l. 1267 ("hall ring stair tower wall": the
    word "ring" joined the line's hall, stair, tower and wall). The Part A append added a C3 hit "is placed only where
    the".
  * Reworded as in §3, it adds 0 hits.
    * `--sections "2"`: the live copy, run four times across both batches to bracket the others, and the copy carrying the change
      (`mine-doc2.md`) each give C1 5, C2 0, C3 329, C4 3, S1 0, S2 0. With the default allow file, 0 are unreviewed
      and the exit is 0. With the empty allow file, the hit sets are identical after normalising line numbers.
    * The rationale copy carrying the change (`mine-rat2.md`) has a hit set identical to live's: C3 403, C4 6, S2 17.
  * Every run read 9 626 JSON files, 911 940 C3 3-grams and 478 C4 lists. Only `colour_files` drifted (10 098 → 10 099),
    as it does whenever a lane writes a file.

## 5 Considered, not issues

* **§13.1's two-ring fixture** "on an earlier ring wholly inside a later one (refused, `E_DEGENERATE`, detail `overlap`,
  naming a vertex of the hole)" keeps the old wording. It is one drawn case with a hole ("naming a vertex of the hole"),
  so it stays true under the new gloss. verify-scope-r1 and both repair-kernel-r2 seats reached the same verdict. The
  tower case that makes the old wording wrong is exercised by the B-PLAN fixtures (a T whose second wing holds a round
  tower that also overlaps the first) and by §13.1's differential, which refuses exactly where the oracle's result has
  a hole.
* **§3.4's `fixed` comment** lists "a composer's room (a hall, a tower's round room: §2.6's `Composition.rooms`)", and
  §3.4's re-cut paragraph lists "the composer's rooms". After VHM1-03 the plan rung passes such a room less a bay or
  stack it holds. Both lists name kinds of ring and point to §2.6, whose `Composition.rooms` comment, step 4 and re-cut
  bullet state that form. §3.4's contract ("interiors pairwise disjoint") is exactly what the removal satisfies. There
  is no stale statement.
* **The room less a bay, from the kernel side.** Leaving the metric point of VKH2-01 aside, it is a valid `fixed` input:
  * one ring without a hole (it meets the bay along one run);
  * sharing its sides with the bay, as "a side two rings share is one edge";
  * inside the room's seed piece;
  * a stair turret's bay, where it fills the room, may coincide with its seed piece ("a ring that coincides with its
    seed ring allowed").
* **Which ring a refusal names.** §3.4 inserts "the seed rings and then the `fixed` rings". A ring that would break a
  rule is the one refused, and the plan rung passes the rings, so it knows the order and can tell which of two rings
  sharing a named vertex was refused. The one new shared-vertex case that matters, a bay inside a composer's room, is
  settled by VKH2-01's clause, and no further text is needed.
* **`hole-gloss-check.py`'s generator crash** on seeds 4, 5, 7 and 9 is a defect of the receipts script (an empty
  `randint` range for a box near the frame), not of the design. It does not affect the seeds that ran; a redraw loop
  would fix it. It is noted here for the script's owner and is not filed as a design issue.

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed on disk this lane):

* the live and archive hashes;
* §3 identical in A0, A1 and A2, and live different only in the gloss;
* #28's row and VHM1-04's text present once, verbatim, with the retired texts absent;
* J-A28.34's Part A deltas, and J-A28.31, J-A28.33 and J-A28.34's other rows unchanged;
* the r0 kernel issues' texts in place;
* the gloss on the raster model, 8 seeds × 2 000 cases, 0 failures;
* the references, the deferral probe and the document-check counts and hit sets;
* VKH2-01's anchors each occurring once, applied on scratch copies.

**PLAUSIBLE** (reasoning):

* how often VKH2-01's failure is reached, which depends on the placement's candidate grid against a composer's room's
  walls and on a tower ring's side lengths;
* VKH2-01's ruling (a filter plus an attribution clause) over a tier-2 or kernel alternative;
* the raster model's fidelity to lattice rings. The written argument (repair-kernel-r2 report §1) covers any connected
  ring.

## 7 Receipts (session scratchpad `handfix/vk2/`)

* `sect.py` and `s3-{A0,A1,A2,L}.md` with `d-s3-*.txt`: §3 per version and its diffs.
* `probe.py` with `needles{1,2,3}.json`: the whitespace-normalised counts. The `row-*.txt` files hold the rows.
* `wd-s26-A2-L.txt`: §2.6's word diff in round 2.
* `hgc-seed{3,6,8,10}.out`: the check script as it is. `hgcp-seed{4,5,7,9}.out`: the scratch copy with the redraw
  loop (`hgc/`).
* `refs-{live,A2}.json`: the resolver, whose output goes to scratch only.
* `dc-*.txt`, `h-*.txt`, `hr-{untouched,live}.txt`: the round's document checks. `dc2-*`, `dc3-*`, `h2-*`, `h3-*` and
  `hr-mine*.txt`: the proposed change.
  `vkh2-01-change.json` holds its old and new strings.
