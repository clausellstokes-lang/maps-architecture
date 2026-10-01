# verify-model-r5t — lane coherence/verify-model-r5t (base part §2 domain model, after repair round 5 / assemble-r5)

PROGRESS
- P0 brief read whole (incl. ROUND-5 NOTES, ORCHESTRATION NOTES); round-4 findings VM-R4T-01 – 06 read; adjudication-r5
  head, R5-01, R5-02 (whole), R5-09, R5-10, Part H · scope and · model read: done
- P1 repair-r5-model.md and assemble-r5.md (model) read; §2 diff pre/post assemble-r5 (5 hunks): done
- P2 round-4 findings VM-R4T-01 – 06 re-checked against the live text, each END line's second end: done (6/6 closed;
  VM-R4T-03's end opens VM-R5T-01)
- P3 round-5 §2 blocks re-checked whole subsection by subsection for new problems (R5-02's and R5-09's texts word by
  word, the repair's three judgments, every lettered (6) citation in the set, the ends R5-02 names for (6)): done
  (3 new findings)
- P4 checks (doc_checks --sections 2, references, ids, narration, sizes), report, result file, LANDED: done

## 0. Basis

* Live base `docs/ARCHITECTURE.md` sha256 `2d84eac2d8a379d1…` = assemble-r5's recorded output (assemble-r5.md §1). The
  pre-round base is commit `3310b53`'s blob, sha256 `5f34cceb61432ac4…` (assemble-r4's output). Rationale `a480f02e…`
  (untouched). No design file written by this seat.
* Binding: adjudication-r5.md (R5-01; R5-02, which supersedes R4-09 whole; R5-09; Part H · model and the END lines
  under every heading that names a §2 text); the earlier adjudication files where not superseded by name. Round-4
  findings: verify-model-r4t.md / results/coherence_verify-model-r4t.json. The repair: repair-r5-model.md (2 REPLACE
  blocks, §2.7 and §2.9; 7 fixed, 2 merged; 2 END lines; 3 declared differences from R5-02's words).
* §2 diff (scratch `vm5/d2.diff`): 5 hunks — §2.7 `supports[].state` (l. 2292), `RaisedFoot` (l. 2315–2317), the
  support step (3) (l. 2535–2542, 2548–2575) and (6)–(7) (l. 2576–2628); §2.9 *View state*'s `workingLayer` (l.
  3405–3408). No other §2 line moved.

## 1. Round-4 findings re-checked (ROUND-5 NOTES (2))

| id | r4 grade | Part H disposition | verdict | where (live) |
|---|---|---|---|---|
| VM-R4T-01 | major | FIX per R5-02, amended (the verifier's alternative rung) | **FIXED** per R5-02: no last support run remains; (6) holds the raised way from its creation and (6) (a) makes every part-0 way laid after it (a route, S5c's proposal, a stage-2 seed's way, a tracker, S7's quay, intervallum or castle path, a hand way) cross its under-deck strip only by §4.3's crossing rule, its supports, ramps, stairs and feet impassable. Pipeline end P1 written (§4.3 *Lattice and costs*, l. 5643–5654: "impassable to every route and growth proposal on ground part 0 laid after it, at generation as after it", the square bound read); scope end T110-2 (3) written ("a CITY S4 timber viaduct crossed by a `through` S5b road and an S5c street, each crossing under a span clear of its supports"). VPC-R4-01 closed with it | §2.7 l. 2576–2595 |
| VM-R4T-02 | major | FIX per R5-02, amended (scope) | **FIXED**: T110-2 (6) (l. 18504–18506) is the locked Re-derive with R5-02's outcome (stage 2's ring and moat meeting the locked viaduct as in (1), no station moved, added or omitted, no key minted, 0 S5b or S5c corridors over a support ring, ramp, stair or foot). Model END: (6) carries "at a regeneration a locked, pinned or declared raised way stands before every stage the regeneration runs (§7.2)" (l. 2586–2587); §7.2 *Protection* and *Declared means held* back it | §13.2; §2.7 l. 2586 |
| VM-R4T-03 | minor | FIX per R5-02, amended (pipeline) | **FIXED as ruled** — §4.8's lead takes P8 (l. 7610–7616) — but the words "the strips S7 cuts … stop at its under-deck strip's edges" disagree with §2.7 (6) (d): **VM-R5T-01** | §4.8 l. 7610 |
| VM-R4T-04 | minor | FIX (VPC-R4-03's words) | **FIXED**: §5.4's `warnings` comment names "S5a's and S7's `W_RAISED_CROSSING` (§2.7's support step (6); §4.4 *Outer moats*; §4.8)" | §5.4 l. 9289 |
| VM-R4T-05 | minor | FIX per R5-02 | **FIXED**: "nothing laid later re-runs this step on it, moves, adds or omits a station, mints a key, re-rules a span or drops it; only an op that names it changes it" | §2.7 l. 2582–2585 |
| VM-R4T-06 | minor | FIX per R5-02, amended (pipeline) | **FIXED**: §4.3 reads "once the span rule has run (its one eager run, after §4.6's cut)"; *The slot* (P2) "Its stations and spans are placed at that commit and held from then"; no run at an S5a commit remains | §4.3 l. 5645, 5721 |

The other Part H · model rows were checked as text in §2: VEW-r4-01 (support step (6) replaced whole by R5-02's; (3)'s
station ring without the former-ring clause), VEW-r4-02 ((3)'s palisade parenthesis; (6) (d)'s `vault` span clause),
VEW-r4-03 ((3)'s strip and quay readings), VV34-r4-01 ((7) and the `RaisedFoot` comment; VAL-R4-04 merged), VAL-R4-01
(§2.9's `workingLayer` entry, R5-09: agrees with V09 §2.4's `WorkingLayer`, l. 518). The END line under Part H · model
for VDC4-04, VDC4-05 and VAL-R4-03 (the held-stretch clause in (3)) is written verbatim (l. 2560–2564). VV34-r4-01's
second ends: T110-2's frame-growth clause (l. 18469–18470) and T-V4-65's at-epoch clause ("no old pier moved"); V04
§3.5.0 (l. 1342), §3.10 (l. 2285–2286), V06 l. 2743 and V11 l. 3982 cite (7).

## 2. Round-5 blocks in §2 re-checked

* **R5-02's binding texts against the live text.** A word-level comparison of R5-02's "(6) … (7) …" (adjudication-r5
  l. 236–288) with the live (6)–(7) (l. 2576–2628; scratch `vm5/cmp.py`) finds exactly the repair's three declared
  differences: (1) "placed by (1)–(5) at the commit … each span's `use` ruled once by the span rule (below)" for "placed
  by (1)–(5) and the span rule at the commit" — agrees with *The span rule*'s one eager time, P1's "its one eager run,
  after §4.6's cut" and P2; (2) the ladder list names "for a stage-2 seed's way" and "§4.8's lead for S7's" — both homes
  state the rule (V01 §3.17.3 (3); §4.8's lead l. 7612–7613; V07 §3.5a (3)'s "Under a span" for a tracker); (3) "(its
  `ring` by (4))" for a station left without a stretch at a regeneration. Each keeps the ruling's meaning. R5-02's four
  (3) texts, the `RaisedFoot` comment and the `supports` comment are present verbatim (scratch `vm5/cmp3.py`).
* **Every lettered citation of (6) across the set** (46 in the base, the rationale and the volumes; scratch
  `vm5/cites6.txt`) points at the sub-item that now states its rule — (a) a part-0 way, (b) a channel, (c) a face, (d) a
  wall stretch, (7) a frame growth; none of R4-09's wording survives anywhere ("last support run", "once more", "through
  one station", "(6) (b) (iii)", "(b) (iv)", "re-sites", "a trace's crossing station": 0 hits).
* **The ends (6) (d) names** for the soffit-topped run are written: §4.5's casters (l. 6150), §8.4's casters and
  heightfield (l. 13673, 13897), §11.1's glTF and CityJSON rows (l. 15988–15989). `bend.raised.around` has its §7.1 row
  (l. 10632) and V09 §4.9 string (l. 2103); `walls.raisedCrossings` its V06 §2.10 field (l. 756).
* **Agreement:** V06 §3.7.6 (5) (l. 1592–1618), V07 §3.5a (4) (l. 1604–1615), V04 T-V4-63/65, V09 §4.20.2 (4) and
  T110-2 state (6) (d)'s outcome. Three disagreements or gaps found — §3.

## 3. New findings (round 5)

### VM-R5T-01 — major — CONFLICT — owner pipeline

**Claim.** §2.7's support step (6) (d) (l. 2603–2616) makes a wall stretch laid after a raised way keep its course and
"run on beneath the deck": each support, ramp, stair, foot or `vault` span "standing in its band" taken into the line,
"beneath every other span … an ordinary run whose top is no higher than that span's soffit" (read by §4.5, §8.4 and
§11.1), and only "the stretch's setback, glacis and berm stop at the under-deck strip's edges, closed along them" — the
band runs on. §4.8's lead (l. 7610–7612, R5-02's P8, written as VM-R4T-03's fix) says instead "the strips S7 cuts beside
that trace stop at its under-deck strip's edges, their setback, glacis and berm closed along them"; §4.1's S7 row (l.
4952) and §4.13's `wall` cell (l. 9017) "its strips stopped at the under-deck strip"; §7.3's S7 row (l. 10883) "its
strips stopped at the under-deck strip's edges"; V06's W68 (l. 351) and §3.7.1 (l. 1463) "its strips stopped /
stopping there"; V11 §3.24.2's reader (l. 3909) "a later wall's strips and berm stop at its edges". A wall strip is the
band's half plus the setback and glacis or berm (§2.7 `Enceinte.strips`), and the L3 band is built only inside the
strips (§2.2 l. 655; §2.7 `band`); §4.8 *Gates* uses the same words for a gap ("a wall strip ends at the corridor of the
way through each gate, so the band and gatehouse parts S10 builds never meet that corridor"). An S7 builder following
§4.8 cuts no strip beneath the deck, so S10 builds no band there: the wall has an open gap under every raised way it
meets, with no run for §4.5's casters, §8.4's casters and heightfield or §11.1's wall to read — contrary to (6) (d),
T110-2 (4) ("an ordinary run beneath every other span topped at its soffit") and V06 §3.7.6 (5).

**Required change.** §4.8's lead: "the strips S7 cuts beside that trace stop at its under-deck strip's edges, their
setback, glacis and berm closed along them, reported (`W_RAISED_CROSSING`)" → "the strips S7 cuts beside that trace run
on beneath its deck as the band's half alone — their setback, glacis and berm stopped at the under-deck strip's edges
and closed along them, reported (`W_RAISED_CROSSING`) — the band abutting each support, ramp, stair, foot or `vault`
span in it (§2.7's support step (6) (d))"; §4.1's S7 row: "its strips stopped at the under-deck strip" → "its strips'
setback, glacis and berm stopped at the under-deck strip, the band's half running on beneath the deck"; §4.13's
raised-way row, `wall` cell: "its strips stopped at the under-deck strip" → "its setback, glacis and berm stopped at the
under-deck strip". Ends at their homes: determinism — §7.3's S7 row "and its strips stopped at the under-deck strip's
edges" → "and its setback, glacis and berm stopped at the under-deck strip's edges"; V06 — W68's middle cell "its strips
stopped at the under-deck strip's edges" → "its setback, glacis and berm stopped at the under-deck strip's edges", and
§3.7.1's "its strips stopping there" → "its setback, glacis and berm stopping there"; V11 — §3.24.2's "a later wall's
strips and berm stop at its edges" → "a later wall's setback, glacis and berm stop at its edges".

### VM-R5T-02 — major — EDGE-UNDEFINED — owner model

**Claim.** The round-5 `supports` comment (l. 2292) puts a `state` on a crossing station only once no "wall stretch lies
under it", and the new closing paragraph of (6) (l. 2617–2622) gives the one rule for such a station, inside its
regeneration clause: "a station no stretch lies under any more stands as a pier (its `ring` by (4)), its `supports` entry
then carrying its own `state`". Outside a regeneration the stretch under a crossing station is taken whole after its
release (both spans `ruined` or `cleared`, (3)): V06 §3.7.6 (5) (l. 1612–1618) dismantles it "after `wallToWay` as after
`absorbWall`, the fortification loop keeping the record while such a stretch stands"; `wallToWay` (§4.11 l. 8214–8221)
spares it only "while its deck stands", so it becomes ring road; a hand `delete` takes an ordinary run. Nothing states
what the station then is — its `state` and that state's writer, its `ring` — nor what a `repairRaised` beside it does:
(3) and V06 §3.19.2 (5) re-lay "that stretch by `repairWall`", whose op targets a standing enceinte record (V06 §2.8, l.
722). A builder generalising the closing sentence raises a standing pier (no `state`) with a (4) rectangle in the ring
road `wallToWay` laid on the old line — a support in a way's corridor, the result T110-2 bars; another reads the station
as `dismantled` and, by T114-3's regrowth clause (l. 18557–18562: the curtain absorbed, then the aqueduct repaired, "the
stretch re-laid on its line by `repairWall`'s bend"), re-lays the stretch. Reachable on the item-114 history fixtures (a
neglected ring absorbed or converted after its aqueduct toppled).

**Required change.** §2.7's support step (3), after "… it is an ordinary run (§13.2's item-114 group);": "where that run is
then taken whole — the record dropped once nothing of it stands (V06 §3.7.6 (5), after `absorbWall` or `wallToWay`), or
the run removed by `wallToWay` or a hand `delete` — the station reads `dismantled` (a ruined support whose stone is
gone: no `state` of its own, no pier, its `ring` kept as its place), and a `repairRaised` beside it first re-lays the
stretch on its line by `repairWall`'s bend (a `drawWall` on its line, V06 §2.8) as for a `dismantled` stretch (below),
or, where a way now lies on that line, raises a pier on the station by (4), slid clear of the way by (3), its key
kept;". The closing paragraph of (6): "and a station no stretch lies under any more stands as a pier" → "and a station
whose deck stands and on whose line no re-derived stretch lies stands as a pier". The `supports` comment: "never on a
crossing station while a wall stretch lies under it, whose `condition` it reads" → "never on a crossing station while a
wall stretch lies under it, whose `condition` it reads, nor once that stretch is taken whole (it then reads
`dismantled`)". Scope end: T114-3's regrowth clause adds a run whose curtain is converted by `wallToWay` after both spans
fell — the station read `dismantled`, no support in the ring road, the repair's pier clear of it. (The adjudicator may
rule another outcome, provided the station's `state` has one named writer, no support stands in a way's corridor and
T114-3's regrowth clause holds.)

### VM-R5T-03 — major — CONFLICT — owner pipeline

**Claim.** §4.8 *Gates* (l. 7655–7657, R5-02's P9) now counts a raised gate as a main gate ("Main gates are where S4's
and S5b's arterials cross the trace on ground part 0, or at a raised gate where the arterial's raised way was created
across the standing trace"), and the same paragraph claims "a small plaza … in S7's L1 batch at each main gate inside the
wall, taking the inner strip's setback zone around the arterial" (l. 7662–7664) — so an S7 builder claims a ground
plaza under the deck at every raised gate. V01 rules the opposite (§3.17.3 (6), l. 2483–2485: "a viaduct's or elevated
road's raised gate at deck level are wall openings: no gate portal, no `gate` rank or kind factor, no gate plaza, no
wall-side feature and no S9b square reads them"; l. 1423–1425 the same), and V01's gate approach reads "the base's gate
plaza (§4.8); nothing added". The raised gate's portal is on the raised part only (§4.8 l. 7672–7673; V06 §3.7.6 (5)), so
no traffic meets the ground there. Two units state two outcomes for one case (found checking R5-02's P9, an end of the
rule VM-R4T-01 belongs to; no adjudication file rules it).

**Required change.** §4.8 *Gates*: "a small plaza is claimed in S7's L1 batch at each main gate inside the wall" → "a
small plaza is claimed in S7's L1 batch at each main gate on ground part 0 inside the wall (a raised gate takes none:
its arterial passes at deck level, its portal on the raised part only; V01 §3.17.3 (6))".

### Considered and not raised

* A raised gate's `Gate.junction`: the gate's vertex on the trace, as a postern's (whose `way` is null) — definable; the
  deck's zero-junction rule is untouched.
* A hand raised road across a standing wall: §7.1 brings it down before the trace (only an aqueduct crosses by an arch),
  agreeing with §4.8 *Gates*' list "by hand an aqueduct" and §2.7 (3).
* (7)'s span rule on the extension alone under the settlement's `vaultCap`: the extension takes what the cap leaves; no
  older span is re-ruled ((6)).
* A quay laid after a raised way whose soffit fails *The clearance* for it: ends at the strip as at a reservation
  (§4.8's lead; (6) (a)) — defined; T110-2 (3)'s quay fixture runs the passing case.
* The channel's stop at "the strip's edges" now omits R4-09's "and of the ramp or stair": the ramps lie between the feet,
  inside the deck's ground projection and so inside the under-deck strip (§4.6; (1)) — nothing lost.
* V07 §3.5a (4) passes the palisade beneath an `open` span "as an ordinary stretch" without the soffit cap: it cites (6)
  (d), and the cap is derived at read by the base's readers — nothing a V07 builder builds differs.
* R4-09's equivalence (every bar, rung and report it set) survives in R5-02's (6), T110-2 and §7.1's rows; the
  superseded pieces are a ruling's change, not a loss (principle (3) (b)).

## 4. Checks

* `doc_checks.py --sections 2` on the live base: exit 0 — C1 5/0, C2 1/0, C3 397/0 unreviewed, C4 1/0, S1 0/0, S2 287/0
  (every § pointer resolves); on the pre-round base: C3 393/0, S2 272/0. **PROVISIONAL**: the tool warns that the
  reference corpus is INCOMPLETE in this checkout (captures, research/patreon, research/devlogs, research/ftg-docs,
  research/external absent), so the clean-room result is not authoritative until re-run where the corpus is held.
* Homes the new §2 text cites resolve: §4.2 S1 (7), §4.8's lead, §4.3, §4.4, §4.5, §4.6, §7.1 (`bend.wall.held`,
  `bend.wall.raisedCrossing`, `bend.raised.underSpan`, `bend.raised.around`), §7.2, §8.4, §11.1, §13.2 (T110-2, the
  item-114 group); V01 §3.17.3 (3); V04 §3.5.0; V06 §2.10, §3.7.6 (5), §3.19; V07 §3.5a (3)–(4); V09 §2.4, §4.2.
* Ids: no new T-, D- or J- id in §2 (the added lines cite T110-2 only). No review id, ruling id or round narration in the
  added text; every "later" is temporal.
* Size: §2 62 015 → 62 233 words (+218, +0.4 %; §2.7 12 625 → 12 826, §2.9 8 363 → 8 387; whitespace-split count) —
  all ruled new design (R5-02's held rule, (3)'s readings and held stretch, (7); R5-09's entry), R4-09's superseded text
  removed; a repair round adds no shrink of its own.

## 5. Summary

Six round-4 findings: all closed (VM-R4T-01, -02, -05, -06 fixed per R5-02 at both ends; VM-R4T-04 fixed; VM-R4T-03 fixed
as ruled, its new words opening VM-R5T-01). R5-02's and R5-09's model texts are written verbatim save the repair's three
declared, meaning-keeping differences, and every lettered (6) citation in the set resolves. Three new findings — 0
blocker, 3 major: VM-R5T-01 (pipeline; "the strips stop" against (6) (d)'s band running on beneath the deck, with ends at
determinism, V06 and V11), VM-R5T-02 (model; a crossing station whose stretch is taken whole after its release),
VM-R5T-03 (pipeline; a gate plaza at a raised gate against V01).
