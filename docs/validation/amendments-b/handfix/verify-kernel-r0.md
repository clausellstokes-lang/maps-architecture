# handfix-b/verify-kernel-r0 — the KERNEL part's hand fixes, verified

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-kernel-r0).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM inputs: planned closing-report §2 (all 31) and §3, handfix/apply.md, apply-log.json, handfix.py rows, archive pre-handfix-b | done
ITEM scope: planned the kernel's fixes (owner kernel; any change editing §3) and the fixes whose new text cites §3 | done (#28 own; #15, #21, #31 cite §3.4)
ITEM before/after: planned diff archive vs live, §3 byte compare, word diff of the J-A28.33 row | done (§3 identical; row = archive + the one replacement)
ITEM read: planned §3.4 whole, §3.7 J-K19, §3.10 rows, §2.6 stage-3 contract, plan rung steps 1-7, interior ladder, J-A28.26/33/34 index + Part A, §13.1, II.6, F-PLAN | done
ITEM checks: planned single source, references, deferral probe, item 20, doc checks (three copies) | done
ITEM issues: planned exact required changes, old strings counted once | done (3 minor: 2 model, 1 scope)
ITEM close-out: planned queue row, LANDED line | done

Lane `handfix-b/verify-kernel-r0`, 2026-09-27 (opus). Judged: `docs/ARCHITECTURE.md` sha256 `5d752c9b…` and
`docs/ARCHITECTURE-RATIONALE.md` sha256 `61477508…` (the hashes handfix-b/apply wrote), against the read-only archive
`docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md` (`1a861c72…`). This seat edited no design text.

## Outcome

* **The kernel's one fix, #28 VK3-02, is PRESENT exactly as required**, at J-A28.33's index row (doc l. 12813), and
  nothing else in that row changed. CONFIRMED by a character diff: the archive row with the one replacement equals the
  live row.
* **§3, the kernel part, is byte-identical to the archive** (`cmp` of the `## §3` … `## §4` span; 1 121 lines). No
  required change edits §3, and none was applied there.
* **The kernel's own checks all pass.** The fix keeps a single source. Its references resolve. No text defers anything.
  It creates no conflict with item 20.
* **Three new minor issues sit in text that cites §3; none is in the kernel's own text.**
  * VKH-01 (model): #15's tower-first clip order has no single answer in two cases, and in both the kernel refuses a
    round room.
  * VKH-02 (model): step 4's restatement of the clip order is now stale.
  * VKH-03 (scope): #31's refusal clause fails a correct kernel on attracted cases, against §3.7's J-K19.
  * Each comes with an exact required change below. None needs the owner.

## The fixes judged

| # | id | owner | edits | verdict | evidence |
|---|---|---|---|---|---|
| 28 | VK3-02 | kernel | J-A28.33 index row | **PRESENT** | "with the rings §2.6's re-cut rule passes as `fixed` rings (the stair bay, the chimney stacks, the passage room, the composer's rooms and the kept rooms)"; old string "with the kept rooms and the fixed anchors as `fixed` rings" 0 times in the live doc (1 in the archive); the rest of the row unchanged (character diff) |
| 15 | VK3-01 | model | §2.6 stage-3 contract, J-A28.26 | present (the model verifier rules on its application); **kernel side: VKH-01, VKH-02** | "A composed tower — a round wing to the plan rung — stands in the clip order before every wing its ring overlaps without lying wholly inside it …" (doc l. 1266) |
| 21 | VP3-05 | pipeline | II.6 | present; **kernel side: sound** | "moved to it by `retypeEdges`' `rekey` (§3.4)": §3.4's `rekey` moves a ref's `(role, from)` rows to `to`, for a `StretchRef` its ends being the cut vertices, and a cut end that is not yet a vertex is placed first by `splitThrough` (J-K31), so the block's `('frontage', id)` kerb chain can be split there |
| 31 | VS3-06 (= VK3-03) | scope | §13.1 | present; **kernel side: VKH-03** | "and a refusal — detail `overlap` — exactly where that result has a hole" (doc l. 10081) |

No other fix's new text cites §3. This was checked by extracting the 74 rows' new texts from `handfix.py` and grepping
them for §3, `tileRings`, `transientArena`, `retypeEdges`, `area2`, `E_DEGENERATE` and `readBack`.

## Checks on #28

* **No other text changed in the touched row.** The character diff of `| J-A28.33 |` (archive against live) shows only
  the one replacement.
* **Single source.** The parenthetical list names its home ("§2.6's re-cut rule") and agrees item for item with that
  home (§2.6 l. 1504–1505). It also agrees with §3.4's re-cut paragraph (l. 2677–2678), with J-A28.26's index row and
  with J-A28.33's Part A entry ("the stair core's bay, the chimney stacks, the passage room, the composer's rooms and
  the rooms the interior ladder keeps"). None of them diverges. The retired phrasing "fixed anchors" occurs nowhere in
  either file.
* **References.** "§2.6's re-cut rule" is §2.6's bullet *The re-cut, both ways (J-A28.26)*, and the row's section cell
  "§3.4, §3.10" resolves. J-A28.33 is cited at doc l. 1500 (§2.6), l. 2675 (§3.4) and l. 12947 (J-A28.34's row), and
  all three agree with the new row.
* **Deferral wording.** There is none in any of the 74 new texts (probe for TBD, to be decided or determined, open
  question, defer, decide later, later pass or round, TODO, FIXME, left open, for now, future: 0 hits).
* **Item 20.** The row concerns the transient arena's fixed rings. It touches no dossier element or household.
* **Document checks** (`doc_checks.py --sections "3,Judgment calls"`, one corpus snapshot, three copies):

  | copy | result |
  |---|---|
  | untouched (the archive), first run | C1 5 · C2 0 · C3 161 · C4 0 · S1 0 · S2 0, 0 unreviewed, exit 0 |
  | untouched, second run | the same, so the corpus held still |
  | mine and combined | this seat changed nothing, so both are the live file; the same counts, and the hit sets are identical apart from line numbers, exit 0 |

## Issues

### VKH-01 — minor · new-problem · owner model · item 28 (#15 VK3-01)

**Claim.** #15 places a composed tower "before every wing its ring overlaps without lying wholly inside it", and a
tower wholly inside a wing after its container. This gives no order in two cases.

* **Two towers whose rings overlap** at a storey both reach, such as a stair turret engaging a round tower. Each is "a
  round wing to the plan rung", so each must stand before the other.
* **A tower wholly inside wing B that also overlaps wing A, where A comes before B in wing order.** Here overlapping
  wings are allowed (rule 4 (iii)). The tower must come after B and before A, and no stated exception moves B before A.

In both cases, whichever order an implementer picks, one round room can straddle a seed joint. Line 988 gives the
tower one round room per storey. `Composition.rooms` is emitted whole, and the new clause binds only "every other"
room to its piece. §3.4's `transientArena` refuses a fixed ring that crosses a seed side (`overlap`). F-PLAN tier 2
then aborts the rung as "a composer's bug", although no rule forbids the configuration. So #15's conclusion, "every
fixed ring the plan rung passes lies inside one seed piece (§3.4's `transientArena`)", is not guaranteed.

The textual gap is CONFIRMED. Reachability is PLAUSIBLE: it needs stage-3 compositions with engaged towers, or with a
tower at the overlap of two overlapping wings.

**Ruling taken** (vetoable, recorded in (3)): a tower that engages an earlier tower follows it in `Composition.towers`
order, and its round room takes the arc. The alternative was to forbid engaged towers. It was rejected because a stair
turret on a tower is a real form (the realism tiebreaker). Every composer's room, a tower's included, is emitted inside
one seed piece.

**Required change.**

1. **§2.6 stage-3 contract.** Replace:

   > A composed tower — a round wing to the plan rung — stands in the clip order before every wing its ring overlaps without lying wholly inside it (a tower wholly inside a wing follows its container, as above), so its round room is its whole ring at each storey it reaches and the wing's piece takes the arc; every other composer's room (`Composition.rooms`) lies inside its own wing's piece at its storey — the composer emits it inside that wing's extent less the extents before the wing in the clip order —

   with:

   > A composed tower — a round wing to the plan rung — whose ring at a storey lies wholly inside no wing's or other tower's extent stands in the clip order there before every wing its ring overlaps, and after every such tower earlier in `Composition.towers` whose ring it overlaps (a tower wholly inside a wing or a tower follows its container, as above), so the clip order stays one order and its round room is its whole ring at each storey it reaches, less any earlier tower it engages, while the wing's piece takes the arc; every composer's room (`Composition.rooms`), a tower's round room included, lies inside one seed piece at its storey — the composer emits it inside its own wing's or tower's extent less the extents before that wing or tower in the clip order, or inside its container's piece where the clip order leaves it none —

2. **J-A28.26's index row.** Replace:

   > a composed tower before the wings it engages

   with:

   > a composed tower that no extent contains before the wings it engages and after an earlier such tower it engages, every composer's room inside one seed piece

3. **J-A28.26's Part A entry.** Append:

   > A tower that engages an earlier composed tower follows it in `Composition.towers` order, its round room taking that tower's arc, and a tower wholly inside a wing or a tower follows its container, its round room inside the container's piece, over forbidding engaged or contained towers, because a stair turret engaging a tower is a real form (the realism tiebreaker), while one rule for each case keeps the clip order a single order and every fixed ring inside one seed piece (handfix-b verify-kernel-r0 VKH-01).

Each old string occurs once in its file. (1) and (2) are in the document; the Part A append is placed at the end of
the `| J-A28.26 |` entry.

### VKH-02 — minor · stale · owner model · item 28 (#15 VK3-01)

**Claim.** The plan rung's step 4 restates the clip order in full as "wing order, a contained wing after its container
(the stage-3 contract)". Since #15, that home also orders composed towers, so step 4 is a second statement of the fact
that no longer agrees with the home. An implementer reading step 4 alone would clip a tower in wing order. CONFIRMED.

**Required change.** In §2.6 step 4, replace:

> in the clip order — wing order, a contained wing after its container (the stage-3 contract) — by §3.4's seed clip

with:

> in the stage-3 contract's clip order by §3.4's seed clip

The old string occurs once, across one soft line break after "(the".

### VKH-03 — minor · new-problem · owner scope · item 28 (#31 VS3-06 = VK3-03)

**Claim.** #31 makes the §13.1 differential demand, for `tileRings`, "a refusal — detail `overlap` — exactly where
that result has a hole". The same sentence splits the case "by attraction (§3.7)", and §3.7's J-K19 names merging
features closer than `attractCm` as "the designed difference" (l. 2999). §3.4 promises an unmoved overlay only where
the rings keep §2.6's composition contract (l. 2635–2636).

On an attracted case the kernel's topology can therefore differ from the oracle's:

* An earlier ring inside a later one, within `attractCm` of its side, is attracted onto that side. The oracle's result
  has a hole; ours has none and is correctly not refused.
* A near-closed earlier ring can gain a hole that the oracle's result lacks.

The random family deliberately draws near-touching inputs (§3.7), so a correct kernel fails CI. A refused
`KernelResult` also carries no warnings (§3.2, l. 2112), so the harness cannot classify a refused case by the engine's
report. The clause must be gated on the input instead.

The conflict with J-K19 is CONFIRMED on the text. The hole-closing case follows from §3.6's attraction and is
PLAUSIBLE, since it was not executed.

**Required change.** In §13.1, replace:

> (each ring's pieces against the oracle's result for that ring less every earlier ring, and a refusal — detail `overlap` — exactly where that result has a hole)

with:

> (each ring's pieces against the oracle's result for that ring less every earlier ring, and a refusal — detail `overlap` — exactly where that result has a hole on a case whose rings keep §2.6's composition contract, at least `attractCm` apart except at their joints, so the overlay moves no vertex (§3.4); on any other case a refusal only where that result has a hole or two of its boundary parts lie within `attractCm` of each other, which attraction may join (§3.7))

The old string occurs once.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed on disk):

* The live hashes equal apply.md's.
* §3 is byte-identical to the archive.
* #28's row is exactly the required replacement, and the retired phrase is absent.
* Every reference named above resolves.
* The deferral probe finds 0 hits.
* The doc-check counts and hit sets are identical across the three copies, exit 0.
* Every old string quoted in the issues occurs once (whitespace-normalised; VKH-02's crosses one soft break).
* The textual gaps of VKH-01, VKH-02 and VKH-03 are as stated.

**PLAUSIBLE** (judgment):

* How reachable VKH-01's configurations are, and VKH-03's hole-closing case (not executed).
* VKH-01's ruling (tower order over forbidding engaged towers), which is vetoable and recorded in J-A28.26's Part A.
