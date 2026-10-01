# Verify — determinism (base §5, §6, §7) after repair round 5

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-determinism-r5t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-determinism-r5t`, 2026-10-01, cloud checkout; scratch `scratchpad/coherence/vd5/`)
- P0 brief read whole; round-4 findings (8), adjudication-r5 (R5-01 – R5-04, R5-07, Part H for scope, model, pipeline, determinism, rendering, V08, V09, V11; Part I), assemble-r5 (§1, §2), repair-r5-determinism preamble read: done
- P1 live base sha256 `2d84eac2…` = assemble-r5's output; §5–§7 split by subsection before (`5f34cceb…`) and after: only determinism's 8 REPLACE blocks change §5–§7 (§5.3, §5.4, §6.3, §6.5, §7.1, §7.3, §7.4, §7.7); 9 subsections byte-identical: done
- P2 round-4 findings re-checked at their sites and second ends: done — all 8 closed
- P3 every round-5 hunk in §5–§7 (13) read with its targets: done — 5 new issues
- P4 hand-offs of the 18 repair-r5 files, references, deferral/phone/review-id scan, doc_checks, size: done
- P5 report, result file, LANDED: done

## 0. Outcome

**13 issues closed or checked, 5 open: 0 blocker, 4 major, 1 minor.** All eight round-4 findings are closed at both
ends, as the rulings word them (section 2). The 13 hunks that repair round 5 wrote into §5–§7 do what their dispositions
and END lines say (section 3). Re-reading them against the texts they now meet turned up five new problems (section 5):

* **VDC5-01 (major, determinism).** §7.1's `bend.raised.underSpan` row tests a hand carve's channel against §4.3's
  crossing rule for ways. The channel rule's home, §2.7's support step (6) (b), and §4.11's carve let a channel pass
  wherever it meets no part of the reservation.
* **VDC5-02 (major, scope).** No bar runs a hand carve across a standing raised way.
* **VDC5-03 (major, determinism).** §5.3's gate-count row now counts a road at any raised gate. An elevated road created
  across a ring at S6's end has a raised gate, but that gate is not one of the N main gates (§4.8 *Gates*). So the
  stage-end check fails on a lawful map, or two builders count it differently.
* **VDC5-04 (major, V06).** V06 §3.7.2 (1) opens every gate of a superseded ring with `gateToJunction`, including a
  raised gate whose tower carries a standing deck. No text defines that outcome.
* **VDC5-05 (minor, V09).** V09's `bend.raised.around` words ("so it goes round") cannot describe the stopped channel
  that §7.1 now gives the same key.

Size: §5–§7 went from 81 064 to 81 429 words (+365, +0.45 %). Every added word is a fix or an END line, and nothing was
cut. `doc_checks.py --sections 5,6,7` exits 0. The result is **provisional**, because the reference corpus is incomplete
in this checkout. No design file was touched.

## 1. Scope and method

* **Live file.** `docs/ARCHITECTURE.md` has sha256 `2d84eac2d8a379d1…`, which is assemble-r5's "after" value. The
  "before" copy is the HEAD blob at `3310b538` (`5f34cceb…`, assemble-r4's output and the base that every repair-r5
  file was written against). Both copies were split at `## §5` – `## §8` and compared subsection by subsection.
* **What changed in §5–§7.** Only determinism's 8 REPLACE blocks: §5.3, §5.4, §6.3, §6.5, §7.1, §7.3, §7.4 and §7.7
  (assemble-r5 §2: no other unit's block routes into §5–§7). These subsections are byte-identical: the §5, §6 and §7
  heads, §5.1, §5.2, §6.1, §6.2, §6.4, §7.2, §7.5, §7.6 and §7.8. The line diff has 13 hunks, and they are exactly the
  edits the repair file claims (its 16 substitutions; some share a hunk).
* **Method.** Each hunk was read word by word with every text it cites or restates:
  * §2.7's support step (3), (6) (a)–(d) and (7), as written this round;
  * §4.3 *Lattice and costs*, *Raised ways* and *Two-point roads*; §4.4 *Outer moats*; §4.8 *Gates*; §4.11's carve,
    `wallToWay` and *The clock* (4); §4.2 S3 (7);
  * V03 §5.6 (2); V06 §3.7.2, §3.7.6 (5) and §3.23 (3); V08 §3.6 (3)–(4) and §2.6;
  * V09 §4.9, §4.20.2 (4), §4.21.14, row 93, T-V9-52 and T-V9-87; V11 §3.25.11; T110-2.
* **Sweeps.** The adjudicator's sweep lists (R5-02, R5-03, R5-04) were re-run over §5–§7. The stale R4-09 vocabulary
  was searched for across the whole base ("last support run", "a later trace takes", "through its nearest station",
  "(6) (b) (iii)", "support step (5), (6)"): 0 hits; every "re-site" left is a bridge's. Every `(6) (a)`, `(6) (b)` and
  `(6) (d)` citation now names the right clause.

## 2. Round-4 findings re-checked

| id | owner | disposition (adjudication-r5 Part H) | verdict | where it now stands |
|---|---|---|---|---|
| VDC3-03 | scope | FIX per R5-07 | **FIXED** | §14 l. 19692 (`PortResult`'s `E_OTHER_SETTLEMENT` comment) and l. 19815 (the absorb paragraph) carry the required text whole: "nor against a settlement key minted at the document's creation (`settlement:map:<mapId>`), which a later readable `id` is not checked against (§7.7 item 12; V08 §2.4)". This agrees with §7.7 item 12's key cell (l. 12159) and V08 §2.4's `id` row (l. 636). |
| VDC4-01 | determinism | FIX per R5-04 | **FIXED** | §6.3 *Plan damage* (l. 10000–10012) has both sentences, citing V03 §5.6 (2) (a)–(b) as R5-04 directs (the repair seat's note). The partners agree. V03 §5.6 (2) (a) compares from the entry week, and (b) defines it, including the restoring re-cut's. V06 §3.23 (3) (decayPeak's `since`, "drawn as built") says the same. R5-04's ends landed: V02 §5.7 (2) (l. 3063) and V02's edge row (l. 2521), §8.6's lead (l. 14118), T-ER-28, and V09 §4.21.13 (l. 3703). §6.5 (9)'s test reads "a level of 0 under no disaster look" (the sweep conformance). |
| VDC4-02 | rendering | FIX | **FIXED** | §8.4 (i) (l. 13872–13876) names a fade per kind. Rain, drizzle, snow and leaves fade in 5 s; fog, mist, dust, cloudShadow and shimmer in 60 s. The rate is "1 ÷ that fade a second", and "§6.1's press reads the same fade". V11 §3.25.11's lengthS lower ends are 30, 60, 60, 120, 180, 20, 120, 120 and 120 s, and the climate-row overrides are 60–180 s and arid rain 20–60 s, so each is at least twice its kind's fade. §6.1 (l. 9593–9594) cites §8.4 (i) for the rate. |
| VDC4-03 | determinism | FIX per R5-02, amended | **FIXED** as ruled | §7.1's `bend.raised.underSpan` row (l. 10632) is R5-02's D1 row with the keys placed per outcome (the repair's precision note 1). The wide-road second end is in T110-2 (5) and T-V9-52. *New problem in the ruled text: VDC5-01 (a carve's channel) and VDC5-02 (no bar).* |
| VDC4-04 | determinism | FIX per R5-02 | **FIXED** | §7.1's `bend.wall.held` row (l. 10630) has both cells as D1 words them. §2.7's support step (3) (l. 2560–2565) carries the held-stretch clause (model's END). T110-2 (4) has the hand delete, with the gate tower kept and `bend.wall.held`. T-V9-52 has "a delete of that wall dismantles its other runs and keeps the gate tower carrying the deck". V09 §4.9's `bend.wall.held` source cell agrees. |
| VDC4-05 | pipeline | FIX per R5-02 | **FIXED** | §4.11 `wallToWay` (l. 8218–8221) has the required text, citing "§2.7's support step (3); V06 §3.7.6 (5)" (R5-02's P11). |
| VDC4-06 | V09 | FIX per R5-02, amended | **FIXED** as amended | V09 §4.20.2 (4) (l. 3013–3016): the aqueduct-across-a-wall sentence names `bend.wall.aqueductArch`, and the other side reads "runs on beneath its arches, never a gate — the crossing below (`bend.wall.raisedCrossing`; T110-2)". §4.9's `aqueductArch` source cell (l. 2099) is as required. The determinism end (§7.1's catch-all, l. 10633) reads "a wall's ridge, reach, waterfront and open ground, the arch a wall takes for an aqueduct drawn across it". |
| VDC4-07 | V09 | FIX | **FIXED** | V09 §4.21.14 (1) is enabled only while "a weather kind is live and no pressed spell waits". In (4) the button is disabled with `settings.weather.coming` ("Your shower is on its way.") and is "never a silent no-op". §4.9's `settings.weather.<word>` row carries `coming`. Row 93 and T-V9-87 read "the button disabled with `settings.weather.coming` until the pressed spell starts". §6.1's "a further press before then changes nothing" stands as the model's rule (V09's HAND-OFF). |

The routed rows of this unit were also checked at both ends:
* **VM-R4T-04 / VPC-R4-03 (FIX, merged).** §5.4's `warnings` comment (l. 9289) names "S5a's and S7's
  `W_RAISED_CROSSING`". The code is emitted exactly there (§4.4 *Outer moats* l. 5902; §4.8's lead l. 7612) and is
  stated by §2.7 (6) (b), (d).
* **VRC4T-07 (FIX).** §7.7 item 1 (l. 11911–11913) reads "a layer's visibility by a logged `setLayer` sent by
  `doc.apply`, as a user's toggle", as §11.3 (l. 16743–16744) says.

## 3. The round-5 hunks in §5–§7

| # | site | what it wrote | checked against | verdict |
|---|---|---|---|---|
| 1 | §5.3 row "a way on ground part 0 crosses …" (l. 9244) | "on ground part 0"; "a raised way's deck, on its own part, meets a trace by §2.7's support step (3) and (6) (d)" | §2.7 (3), (6) (d); §4.8 *Gates* | agrees |
| 2 | §5.3 gate row (l. 9257) | D4: both counts "(on ground part 0 or at a raised gate; a deck passing over a stretch laid after its raised way is no crossing …)" | §4.8 *Gates* (l. 7655–7657, 7668–7675); §4.2 S3 (7); §4.3 *Raised ways* | **VDC5-03** — the first count takes an elevated road's raised gate, which is no main gate |
| 3 | §5.4 `warnings` (l. 9289) | `W_RAISED_CROSSING`, S5a and S7 | §4.4, §4.8, §2.7 (6) | agrees |
| 4 | §6.3 *Plan damage* (l. 10007–10012) | the entry week; "under no disaster look" | V03 §5.6 (2), V06 §3.23 (3), §2.6 step 7 | agrees (VDC4-01) |
| 5 | §6.5 (9) *plan damage* | "a level of 0 under no disaster look" | §6.3 | agrees |
| 6 | §7.1 `dossierFacts` event (l. 10357) | `lateCalamities: string[]`, the whole held list | §4.11 *The clock* (4) (l. 8476–8490); V08 §3.6 (4) (l. 1903–1908) | agrees |
| 7 | §7.1 `bend.wall.held` (l. 10630) | the delete clauses | §2.7 (3) (l. 2560–2565); V09 §4.9 (l. 2101) | agrees. *The removals it lists omit a gate's opening: VDC5-04 (its second end here)* |
| 8 | §7.1 `bend.wall.raisedCrossing` (l. 10631) | D1 row | §2.7 (6) (d) (l. 2604–2616); V09 §4.9 (l. 2100) | agrees |
| 9 | §7.1 `bend.raised.underSpan` (l. 10632) | D1 row, keys per outcome | §2.7 (6) (a)–(b); §4.3 (l. 5643–5651); §4.11's carve (l. 8238–8243); V09 §4.9, §4.20.2 (4) | **VDC5-01** (a channel tested by a way's rule), **VDC5-02** (no bar), **VDC5-05** (V09's line) |
| 10 | §7.1 catch-all (l. 10633) | VDC4-06's second end | V09 §4.9 `aqueductArch` | agrees |
| 11 | §7.3 S7 row (l. 10883) | D2 | §2.7 (6) (d) | agrees: nothing of the raised way is in the effective scope; the "fate report" clause has gone with the station-taking |
| 12 | §7.4 `dossierFacts` row (l. 11228); raised-way row (l. 11403) | the binding's folded lists; D3 | §7.7; §2.7 (6) | agree; no undo target and no migration, as for `quarantined` |
| 13 | §7.7 `DossierBinding` (l. 11825); item 1 (l. 11911–11913); item 6 (l. 12016–12018) | `lateCalamities`; VRC4T-07; "a late one … never at a week before it (§4.11 *The clock* (4))" | §4.11 (4); V08 §3.6 (3), (4), §2.6's row (l. 1292); W20 | agree (item 6 defers to §4.11 (4), the home, for `W₀` + 1 and the held calamity) |

The unchanged §7.1 paragraph *Raised ways, aqueducts and retaining walls* (l. 10438–10443) still agrees with R5-02. By
hand, a raised road comes down before a wall and passes its gate, and only an aqueduct is created across a standing wall,
by an arch. The R5-03 sweep sites in §5–§7 stand (item 13's F-V8-6, DR28, `DossierChange.week`). §6.1's `plan.damage`
row names readers, not the comparison, so it needs nothing.

## 4. Hand-offs read

* **repair-r5-determinism's two HAND-OFFS.** V09 has no words for the stopped channel → VDC5-05. No bar runs a hand
  carve → VDC5-02. Both are confirmed against the live text: V09's `bend.raised.around` source cell names "a ground way"
  only. A search of every T- row of the base and the twelve volumes finds no carve meeting a raised way. Round 4's
  T110-2 and T-V9-52 had none either.
* **repair-r5-V09 (to determinism).** Its open point (§7.1 naming the key for the stopped channel) is answered by §7.1
  (`bend.raised.around`). V09 now owes its words (VDC5-05).
* **repair-r5-V08 (to determinism).** The ledger event's held list agrees with §7.7's comment (checked).
* **repair-r5-pipeline 1 and 2 (to model and determinism).**
  * (1) A hand viaduct on a gate's line: §7.1 already brings a hand raised road down before a wall, so in §5–§7 only a
    hand aqueduct is created across a standing wall. Nothing is open here.
  * (2) An S5b radial whose viaduct crosses its stage's new boundary pins no gate. §5.3's ≥ count still holds, and the
    gate law's N_k is the pipeline's question. While reading this I found VDC5-03, a different case: an elevated road's
    raised gate under the equality count.
* **repair-r5-V06, -scope, -model, -kernel, -rendering, -V01, -V02, -V07, -V11, -V12.** Their notes to determinism are
  citations, which resolve, or statements that the determinism texts agree. Nothing is open in §5–§7.

## 5. Issues

### VDC5-01 — a hand carve's channel tested by §4.3's rule for ways (major, CONFLICT, owner determinism)

**The rule's home.** §2.7's support step (6) (b) (l. 2596–2599) is the home of a channel meeting a raised way, and
R5-02 names it: "*a channel* — a moat's or a carve's — passes beneath where its crossing of the under-deck strip meets no
part of the reservation [the supports, ramps, stairs, feet and `vault` spans' strips]; elsewhere it stops at the strip's
edges …, a hand carve's crossing first moved along the deck to the nearest that passes". §4.11's carve (l. 8238–8243)
says the same.

**What §7.1 says instead.** Its `bend.raised.underSpan` row (l. 10632, from R5-02's D1 text) bends "a ground `drawWay`,
a moved way or a hand carve … crossing its under-deck strip where §4.3's crossing rule does not admit it". It then moves
"the way or channel … to cross under the nearest span that admits it". §4.3's crossing rule (l. 5643–5651) is a way's
rule. It requires:
* a clear width of at least "the way's width + `clearWidthM`";
* a soffit meeting §2.7 *The clearance* "for the crossed way";
* a crossing within ± `squareDeg` of square to the deck.

None of these binds a channel under §2.7 (6) (b). V09 §4.20.2 (4) (l. 3023–3025) restates §7.1: "a carve across it
crosses under the nearest span §4.3 admits".

**The case where they part.** Take a canal carved obliquely under a wide `open` span, its crossing touching no support.
* Under §2.7 and §4.11 it passes beneath.
* Under §7.1 no span admits it, because moving the crossing along the deck does not change its angle. The channel is cut
  in two at the strip's edges (`bend.raised.around`).

Two units state two outcomes for one case, so this is MAJOR (R5-01). It is new this round: round 4's row tested a carve
only against an `open` span, which matched the old (6) (b).

**Required change.**
* **§7.1's `bend.raised.underSpan` row, cause cell.**
  * Old: "a ground `drawWay`, a moved way or a hand carve meeting a standing raised way's supports, ramps, stairs, feet
    or a `vault` span's strip, or crossing its under-deck strip where §4.3's crossing rule does not admit it (§2.7's
    support step (6) (a)–(b))"
  * New: "a ground `drawWay` or a moved way meeting a standing raised way's supports, ramps, stairs, feet or a `vault`
    span's strip, or crossing its under-deck strip where §4.3's crossing rule does not admit it (§2.7's support step (6)
    (a)), or a hand carve whose channel's crossing of that strip meets a support, ramp, stair, foot or `vault` span
    (§2.7's support step (6) (b))"
* **The same row, outcome cell.**
  * Old: "the way or channel moved along the deck to cross under the nearest span that admits it
    (`bend.raised.underSpan`)"
  * New: "the way moved along the deck to cross under the nearest span that admits it, the channel to the nearest
    crossing that meets none of these (`bend.raised.underSpan`)"
  * The rest of the cell stands.
* **Second end, V09 §4.20.2 (4).**
  * Old: "and a ground road T4 `road` draws, a way moved or a carve across it crosses under the nearest span §4.3 admits,
    never over a support, ramp, stair, foot or `vault` span (`bend.raised.underSpan`), a road no span admits going round
    it (`bend.raised.around`)."
  * New: "and a ground road T4 `road` draws or a way moved across it crosses under the nearest span §4.3 admits, and a
    carve's channel passes beneath where it meets no support, ramp, stair, foot or `vault` span, else moves along the
    deck to the nearest crossing that meets none — never over one (`bend.raised.underSpan`); a road no span admits goes
    round it, and a channel no crossing passes stops at the under-deck strip's edges (`bend.raised.around`)."
* **Second end, V09 §4.9's `bend.raised.underSpan` source cell.** Its "crossing its under-deck strip where §4.3's
  crossing rule does not admit it: the way or channel moved along the deck to cross under the nearest span that admits
  it" takes §7.1's new cause and outcome words.

### VDC5-02 — no bar runs a hand carve across a standing raised way (major, EDGE-UNTESTED, owner scope)

**What the text defines.** §7.1's `bend.raised.underSpan` row, §2.7's support step (6) (b) and §4.11's carve together
define this case:
* a hand carve's crossing is moved along the deck to the nearest crossing that passes (`bend.raised.underSpan`);
* where none passes, the channel stops at the under-deck strip's edges, "ending against the ground as against a berm"
  (`bend.raised.around`);
* the raised way is held.

**What the bars run.** No bar runs this.
* T110-2 (5) (l. 18501–18504) runs an epoch growth, an epoch route and two hand roads.
* T110-2's (1) and (2) run S5a's outer moat at generation.
* T-V9-52 (l. 4404) runs hand roads.
* A search of every T- row of the base and the twelve volumes finds no carve meeting a raised way. Round 4's text had
  none either.

So a build that bridges the canal across a pier's ring, or leaves the carve out, passes every bar. R5-01 grades an
untested edge with a defined outcome MAJOR. Repair-r5-determinism's HAND-OFFS flagged it.

**Required change.**
* **T110-2 (5).** After "and a hand road wider than every `open` span's clear width drawn across one", add: "; a hand
  carve of a canal across a standing viaduct whose drawn crossing meets a support — moved along the deck to the nearest
  crossing that meets no support, ramp, stair, foot or `vault` span, the channel passing beneath with no support in
  water (`bend.raised.underSpan`) — and one wider than the clear width between every two of its supports, stopped at the
  under-deck strip's edges, both channel ends against the ground as against a berm, every station, key and span
  unchanged (`bend.raised.around`)".
* **Second end, V09 T-V9-52.** After "and one wider than every `open` span goes round it, with `bend.raised.around`",
  add: "; a carve across a viaduct passes beneath clear of its piers, with `bend.raised.underSpan`, and one too wide for
  every gap between its piers stops at the under-deck strip's edges, with `bend.raised.around`".

### VDC5-03 — §5.3's gate count takes an elevated road's raised gate, which is no main gate (major, CONFLICT, owner determinism)

**What §5.3 now says.** This round's D4 text makes §5.3's gate row (l. 9257) read: "the roads leaving each walled stage
(on ground part 0 or at a raised gate; …) equal its gate count (§4.2 S3 (7): its N main gates and any harbour gate
placed)".

**What §4.8 says.** §4.8 *Gates* (l. 7655–7658) counts a raised gate as a main gate only "where **the arterial's** raised
way was created across the standing trace … so roads leaving each walled stage, **so counted**, = its gate count".

**Where they part.** A raised gate also stands where an elevated road is created across a ring.
* §4.8 says so at l. 7668–7673: "at generation … an elevated road or aqueduct at S6's end across any ring; at an epoch V06
  §3.19's founding across a standing curtain".
* §2.7's support step (3) says so too.
* An elevated road carries no arterial. §4.3 (l. 5709–5714) defines it as `link`, joining two high wards, terraces, or a
  citadel and a great temple.

**Effect.** Take a CITY whose elevated road joins a high ward inside a ring to one outside it.
* By §5.3's words, the elevated road is a road leaving at a raised gate, so it is counted.
* Its raised gate is neither one of the N main gates nor a harbour gate.

So the stage-end S7 check fails on a lawful map, or one builder counts the gate and another drops the road. Two units
state two outcomes for one case: MAJOR.

**Required change.** In §5.3's gate row, change the first parenthesis.
* Old: "(on ground part 0 or at a raised gate; a deck passing over a stretch laid after its raised way is no crossing,
  §2.7's support step (6) (d))"
* New: "(its arterials, on ground part 0 or at a raised gate where the arterial's raised way was created across the
  standing trace, §4.8 *Gates*; a raised gate whose raised way carries no arterial — an elevated road's — and a deck
  passing over a stretch laid after its raised way are no crossing of this count, §2.7's support step (3), (6) (d))"

The ≥ count's parenthesis stands.

### VDC5-04 — V06's gate opening reaches a raised gate whose tower carries a standing deck (major, EDGE-UNDEFINED, owner V06)

**What V06 does.** V06 §3.7.2 (1) (l. 1476–1478) runs on every ring with a pathway that is not locked. It opens "each
gate of the ring … at `walls.gateOpenChancePerYear` → `gateToJunction`", sparing none.

**What a raised gate is.** By §4.8 *Gates*, a raised gate is a main gate of the ring: "a gate whose tower carries the
deck, its portal on the raised part only" (l. 7671–7673).

**What holds it, and what is missing.** §2.7's support step (3) (l. 2556–2565) holds the stretch under a crossing
station while the deck stands. R5-02 says no removal of the wall takes it, and lists the removals that pass over it:
* `DeclineOp`'s breach and dismantle;
* V06 §3.7.7 (2)'s decay;
* a hand op's dry run;
* a delete;
* `wallToWay`, `absorbWall` and the hand-off down.

V06 §3.7.6 (5) (l. 1611–1619) spares the stretch from (2)'s dismantling. Neither list names (1)'s gate opening.
`gateToJunction` itself has only its type (§4.11 l. 8197) and `wallToWay`'s "gates become junctions".

**The case.** A CITY's S4 viaduct takes a raised gate in S3's ring, and a later stage supersedes that ring. This is
V06's ordinary pathway. Once its gates open by chance each year, a builder can:
* make a junction on the deck, against item 110 (f)'s zero junctions;
* remove the tower that carries the deck, leaving it unsupported;
* skip the gate.

The outcome is undefined on a normal path: MAJOR. The hand `convert` `gateToJunction` of a raised gate falls only under
§2.7 (3)'s generic "a hand op's dry run bends its stretch round it", and no row names its line. This was found while
re-reading §7.1's `bend.wall.held` row, which lists the removals of the held stretch.

**Required change.**
* **V06 §3.7.2 (1).**
  * Old: "Each gate of the ring, from its drawn"
  * New: "Each gate of the ring — but a raised gate, whose portal on the deck joins no ground way and whose tower carries
    the deck (§2.7's support step (3); V06 §3.7.6 (5)), which is no candidate, the part-0 way's own ground gate beneath
    it, if any, a candidate as any gate — from its drawn"
* **V06 §3.7.6 (5)'s last bullet.** After "V06 §3.7.2 (2)'s dismantling never takes the stretch that holds a raised gate
  whose deck stands", add ", nor (1)'s gate opening the raised gate".
* **Second end, model.** §2.7's support step (3): "and `DeclineOp`'s `breach` and `dismantle` and V06 §3.7.7 (2)'s decay
  pass over it in chain order" → "and `DeclineOp`'s `breach` and `dismantle`, V06 §3.7.7 (2)'s decay and V06 §3.7.2
  (1)'s gate opening (`gateToJunction`, which never takes a raised gate) pass over it in chain order".
* **Second end, determinism.** §7.1's `bend.wall.held` cause: "a hand `convert` `breach` or `dismantle` of an enceinte
  stretch" → "a hand `convert` `breach`, `dismantle` or `gateToJunction` of an enceinte stretch or of its raised gate".
* **Test end, V06.** T-V6-47's H-AQUA clauses, which already hold a raised gate (V06 §7), add: "a superseded ring whose
  raised gate carries a standing viaduct's deck — its gates opened over the pathway, the raised gate kept with its tower
  carrying the deck, no junction on the deck".

### VDC5-05 — `bend.raised.around`'s words cover a way only (minor, CONFLICT, owner V09)

**The mismatch.** This round §7.1 (l. 10632) gives `bend.raised.around` to two outcomes:
* a way that no span admits, routed round;
* a hand carve's channel that no crossing passes, "stop[ped] at the under-deck strip's edges".

V09 §4.9's row (l. 2103) words only the first: "No arch of {way} is wide or high enough for {name}, so it goes round."
Its source cell is "a ground way no span of a standing raised way admits". So the dry run's line tells the user a stopped
canal goes round. V09's own round-5 HAND-OFF waited for §7.1 to name the key, and §7.1 now has.

**Grade.** This is wording only: what is built and tested does not change.

**Required change.** In V09 §4.9's `bend.raised.around` row:
* **Words.** Old: "No arch of {way} is wide or high enough for {name}, so it goes round." New: "No arch of {way} is wide
  or high enough for {name}, so it goes round." for a way, and "{name} cannot pass beneath {way} here, so it stops short
  of it on both sides." for a channel. The line takes its form by what was drawn, as `{name}` already names a way or a
  channel.
* **Source cell.** Add "; and a hand carve's channel that no crossing of the under-deck strip passes, stopped at its
  edges (§7.1's `bend.raised.underSpan` row; §2.7's support step (6) (b))".

## 6. Other checks

* **References.** assemble-r5 checked 56 169 references and found 0 broken. Every citation the 13 hunks add was
  resolved by hand:
  * §2.7's support step (3), (6), (6) (a)–(b), (6) (d);
  * §4.3 *Two-point roads* (l. 5791); §4.4 *Outer moats* (l. 5889); §4.8 and §4.8 *Gates*;
  * §4.11 *The clock* (4); §2.6 step 7; §11.3;
  * V03 §5.6 (2) (a)–(b); V06 §3.7.6 (5) and §3.23 (3); V08 §3.6 (4).
* **Ids.** No id is added or renumbered in §5–§7 this round. The new string keys are `bend.raised.around` (V09 §4.9 has
  its row) and `settings.weather.coming` (V09's own).
* **Deferral, phone and review ids.**
  * The 474 added words, and §5–§7 whole, hold no deferral wording ("TBD", an open choice).
  * There is no phone clause (item 126 (a2)).
  * There is no review id (R5-nn, R4-nn, VDC…) in design text.
* **Nuance and shrink.** This was a repair round: no elegance ruling was routed here and nothing was cut, so the four
  shrink sources are 0. R5-02 superseded R4-09 whole and says plainly what changes: a deck over a later wall goes
  ungated (J122, vetoable). Every bar its equivalence names survives in T110-2: zero junctions, no support in water, the
  clear spans, the raised way unchanged, 0 corridors over a support, `W_RAISED_CROSSING`, nothing waiting.
* **F and g items.** No f item is routed to these hunks. In §5–§7, g items 114, 117, 118, 120–126 and their determinism
  parts are byte-identical to round 4, where they were present. Item 123's plan-damage part (§6.3) was re-checked and is
  extended correctly. Item 124's press (§6.1) now has defined fades through §8.4 (i).
* **doc_checks.py --sections 5,6,7** exits 0: C1 5, C2 1, C3 269, C4 0, S1 0, S2 287, 0 unreviewed. It warned "reference
  corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) —
  clean-room results are NOT authoritative", so the result is **provisional**.
* **Size.** §5–§7 went from 81 064 to 81 429 words (+365, +0.45 %). The 8 touched subsections went from 58 348 to 58 713.
  The unit stays above its archived size because of the file g items' build-depth additions (102–126). That is
  irreducible content, not a defect.

## 7. Result

0 blocker, 4 major (VDC5-01, VDC5-02, VDC5-03, VDC5-04), 1 minor (VDC5-05).
* By owner: determinism 2, scope 1, V06 1, V09 1.
* VDC5-01, VDC5-02 and VDC5-05 are one family: the hand carve that R5-02's D1 row added to §7.1.
* No design file was touched.
* Result: `docs/validation/coherence/results/coherence_verify-determinism-r5t.json`.
