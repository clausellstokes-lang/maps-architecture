# Coherence verify — the determinism part (§5, §6, §7), round 4 (seat coherence/verify-determinism-r4t)

Written by Opus (verifier seat). Scope: base `## §5 `, `## §6 `, `## §7 ` after repair round 4 (coherence/assemble-r4, base
sha256 `5f34cceb…`). Checked against the pre-round text (assemble-r3's `593c657d…`, the HEAD blob at `96bdae26`), the
archive, the inventory, the canon with its dated rulings, the binding rulings `adjudication-r4.md` (R4-01 – R4-16, Part H)
and `adjudication-r2.md` / `-r3.md` where not superseded, the eighteen `repair-r4-*.md` files and `assemble-r4.md`.
Nothing in the design files was edited.

PROGRESS (lane `coherence/verify-determinism-r4t`, 2026-10-01)
- P1 inputs extracted (pre-round and live base; the blocks routed into §5–§7 identified; word diff): done
- P2 the 11 round-3 findings re-checked against the live text and adjudication-r4 (Part H, R4-nn), END lines' second ends: done
- P3 the 10 replaced subsections' 17 hunks read with their targets; the round's rulings swept through §5–§7; the round's
  other insertions that cite §5–§7: done
- P4 review-id census, terms, deferral, phone, references, size, document checks: done
- P5 issues, result file, LANDED: done

## 1. Inputs

| input | state |
|---|---|
| live base `docs/ARCHITECTURE.md` | sha256 `5f34cceb61432ac4…` = assemble-r4's recorded output |
| pre-round base | `git show 96bdae26:docs/ARCHITECTURE.md`, sha256 `593c657d34849302…` = assemble-r4's "before" |
| round-3 findings | `verify-determinism-r3t.md`, `results/coherence_verify-determinism-r3t.json` (VDC3-01 – VDC3-11) |
| rulings | `adjudication-r4.md` read whole for R4-01 – R4-16, its TOC, Part H · determinism, scope, V09, and every END line naming §5–§7 |
| repair | `repair-r4-determinism.md` header (dispositions, END lines, sweep, HAND-OFFS) and its 10 REPLACE blocks; `round4-work/determinism.json` (the 11 routed issues, three from other seats: VAH-r3-07, VM-R3T-09, VV1112-r3-04) |
| assemble | `assemble-r4.md` §1 (hashes), §2 (blocks applied: determinism 10/10, §5.1, §6.1, §6.3, §6.5, §7.1, §7.3 – §7.7) |
| second ends read live | V09 §4.21.14, row 93, T-V9-87, §4.9's bend rows, §4.20.2 (4); §13.2 T124-9, T110-2, the item-114 group; §14 `E_OTHER_SETTLEMENT` (two sites); V08 §2.4 `id` row, §3.5; V11 §4.1, §3.25.11 and its types; V03 §5.6 (2); V06 §3.23 (3), §3.7.6 (5); §2.6 step 7; §2.7's support step (3) and (6); §4.3; §4.8; §4.11's `wallToWay`; §8.2, §8.4 (i), §8.6 |

## 2. Method

1. Split §5–§7 by subsection in both bases and compared them byte by byte; for each changed subsection a word-level diff
   (scratch `vd4/wdiff.txt`). Only determinism's 10 REPLACE blocks land in §5–§7, as `assemble-r4` records. §5.2, §5.3,
   §5.4, §6.2, §6.4, §7.2 and §7.8 are byte-identical. The 17 hunks are exactly the 17 edits the repair header claims.
2. Re-checked every round-3 finding at its site and at each second end (Part H's disposition, the ruling's text where it is
   "per R4-nn" or "amended", the END line's landing).
3. Read every hunk whole in its subsection, with each target it cites. Swept §5–§7 for the terms and sections each round-4
   ruling changes (R4-01 (2)): the working layer (R4-02); the disaster look's units and hand-over (R4-04); the barrier
   across a way (R4-06); the present at creation (R4-07); a late calamity (R4-08); a standing raised way held (R4-09); Auto
   while settled (R4-10); look-bearing conditions public (R4-11); the roofless case (R4-14); item 125's fallbacks and the
   key (R4-15); the catch-up batch (R4-16).
4. Collected every reference into base §5–§7 that the round added anywhere in the set (`git diff 96bdae26`, 1 275 added
   lines) and resolved each against its target.
5. Ran the review-id census (assemble-r4's `reviewids.py` output, filtered to §5–§7), the canon's 35 retired-term
   patterns (old against new, and over the added text), a deferral and phone scan, a word count, and `doc_checks.py
   --sections 5,6,7`.

## 3. Results

### 3.1 Round-3 findings (11)

| id | sev | Part H | state in the live text |
|---|---|---|---|
| VDC3-01 | major | FIX | **FIXED.** §6.1 *The weather stream* (l. 9561–9564) now defines a press while a spell is in force. The spell fades to 0 at its kind's fade rate, then the pressed spell starts. It is "of the commonest live kind at the press", so its kind is fixed at the press, as V09 reads. A further press changes nothing. §6.5 (9) adds the fixture under T124-9 (l. 10189–10191). Second end (END under V09) landed: V09 §4.21.14 (4), row 93 and T-V9-87 read the same. Two new problems in the rule's inputs are raised below (VDC4-02: the fade rate it reads is undefined for three kinds; VDC4-07: the wait is a silent no-op). |
| VDC3-02 | major | FIX per R4-14 | **FIXED.** §6.3 *Plan damage* (l. 9970–9973) names §2.6 step 7's roofless case as R4-14 rules, and the repair's sweep conformed "nothing else" and §6.5 (9)'s level-0 clause. V09 §4.21.13 (1) states it (l. 3681–3683). The same sentence's "exactly" now misses a second case that R4-03 added this round: VDC4-01. |
| VDC3-03 | major | FIX per R4-15 | **PARTLY FIXED.** §7.7 item 12's key cell (l. 12119) carries R4-15 (c)'s text: a key minted at creation is kept, and "a later readable `id` neither replaces it nor is checked against it". Its second end landed at §14 as ruled, "never for an offer whose `id` fell back (V08 §2.4)", at l. 19600 and l. 19722. That exception covers an offer whose own `id` fell back. It misses the case the finding named: a document whose key was minted at creation, later offered the same dossier with a readable `id`. §14 still refuses that case while §7.7 item 12 and V08 absorb it. **Persists at scope** (below). |
| VDC3-04 | minor | FIX | **FIXED.** DR44's rule and test cells (l. 12086) name "stressor type, condition archetype and crisis event". |
| VDC3-05 | minor | FIX per R4-09, amended | **FIXED.** §7.1's outcome table (l. 10592–10593) carries `bend.wall.held` as VDC3-05 words it and the `bend.wall.raisedCrossing` row word for word as R4-09 writes it. Both sit before the catch-all row, and neither re-runs the raised way. |
| VDC3-06 | minor | FIX per R4-09 | **FIXED.** V09 §4.9 has `bend.wall.raisedCrossing`, `bend.wall.held` and `bend.raised.underSpan` (l. 2092–2094), each ending with `button.showWhy`. §4.20.2 (4) cites them (l. 3007–3015). T-V9-52 tests all three. |
| VDC3-07 | minor | FIX per R4-09, amended | **FIXED.** §7.3's S7 row (l. 10845) carries R4-09's text. The repair wrote "fate report (§7.3 item 4)" for R4-09's "fate sheet". That is justified: the set has no "fate sheet"; the canon's glossary lists "fate report" for the dry run and "fates sheet" for V09's UI, so principle (2) applies. VM-R3T-09 (MERGED) is closed with it. |
| VDC3-08 | minor | FIX | **FIXED.** The six review ids are gone. assemble-r4's census (`reviewids-final.tsv`) finds none in l. 8992–12325, against six in the untouched census. |
| VDC3-09 | minor | FIX | **FIXED.** The pure-function list and the rate sentence of §6.1 name the `light` mode (l. 9550, 9566). |
| VDC3-10 | minor | FIX (scope) | **FIXED.** §13.2's T124-9 (l. 18642–18645) reads as required. Its "among its fixtures" is non-exhaustive, so §6.5 (9)'s new press fixture needs no entry there. |
| VDC3-11 | minor | FIX (V09) | **FIXED.** V09 §4.21.14 (4) names the climate row, year position, sites, light mode and view hour (l. 3739–3740), and so does T-V9-87. |

The three issues routed to determinism from other seats are all **FIXED**:

- **VAH-r3-07**: DR44's key-form clause is "(J-V8.128)" only.
- **VV1112-r3-04**: §7.1's `refuse.table.required` row (l. 10586) lists the named rows and the two totality covers. That agrees with V11 §4.1 (l. 4834–4842) and with V09's row (l. 2006).
- **VM-R3T-09**: MERGED into VDC3-07, so closed with it.

The three END lines the determinism seat wrote for other units have all **landed**:

- **`bend.raised.underSpan`** (VEW-r3-01): at l. 10594, in R4-09's words.
- **§7.7 item 10's absorb clause** (VEL3-r3-02): at l. 12028. Its target, V08 §3.5 (l. 1678, "the carried fact stands"), resolves.
- **§7.4's lock column for a raised way** (VM-R3T-06): at l. 11365.

### 3.2 The round's changes swept through §5–§7

| ruling or term | sites in §5–§7 | verdict |
|---|---|---|
| R4-02 working layer | §7.8's layer controls (l. 12265–12270, 12318–12322) | agree, as R4-02's own sweep found; no switch writes a layer there |
| R4-04 disaster look | §6.3's level-0 sentence | the look's level is a separate input (§2.6 step 7, §8.6), phrased as in §2.6 and §8.6; folded into VDC4-01's change for the "never decayed" clause only |
| R4-06, R4-10, R4-16 | none in §5–§7 | — |
| R4-07, R4-08 | §7.7 l. 11994 (`HistoryHint` "written once by the port's creation"); item 13's F-V8-6 row (calamity: its own tick, `epoch`) | agree. F-V8-6 gives the receipt's dating rung, and the late case is §4.11 *The clock* (4)'s refinement |
| R4-09 held raised way | §7.1 rows (l. 10592–10595), §7.3 S7 row, §7.4 lock column, §7.1 *Raised ways* paragraph, §6.1's `raised.reason` row, §7.4's warp carry (l. 11349) | agree. A warp deforms existing geometry; it lays no later work. **Gaps:** VDC4-03 (no `open` span holds the way), VDC4-04 (a hand delete of a wall under a deck), VDC4-05 (§4.11's `wallToWay` against V06), VDC4-06 (two keys for one bend) |
| R4-11 public looks | DR44's admission clause | agrees (look-bearing `public`, `none` rows `secret`) |
| R4-03 restoring re-cut | §6.3 *Plan damage* | **conflict**: VDC4-01 |
| R4-14 roofless case | §6.3, §6.5 (9) | agree |
| R4-15 key and fallbacks | §7.7 items 10 and 12, l. 12196–12202 (the cap refusal) | agree; §14's end is VDC3-03 |
| item 124 press rule | §6.1, §6.5 (9) | **gaps**: VDC4-02 (fade per kind), VDC4-07 (the wait is silent) |

### 3.3 Other checks

- **References.** Every pointer the 17 hunks add resolves: §2.6 step 7; §2.7's support step (3) and (6) (b) (l. 2595); §4.3; §7.3 item 4 (l. 10990); §8.4 (i); V08 §2.4's `id` row (l. 634); V08 §3.5; V11 §2.1's settings form; V11 §4.1; T124-7, T124-9 and T122-4. I also resolved every reference into base §5–§7 that the round added elsewhere in the set: 57 distinct targets, among them §7.1's `PointsForm.spring`, §7.4 "Sessions", §7.1 *Delete*, §7.4's lock column, the §7.1 outcome rows by cause, and §7.7's DR41–DR44. None is broken.
- **Terms.** None of the canon's 35 retired-term patterns occurs in the added text, and no count changes between the old and new §5–§7.
- **Deferral wording, phone clauses (item 126 (a2)), new ids.** None of any of the three.
- **Narration.** No review id is left (VDC3-08).
- **Size** (principle (9)). §5–§7 went from 80 524 to 81 064 words (+540, +0.7 %; the same count as the repair's). The archive's §5–§7 hold 63 117 words by the same count. The unit did not shrink by more than half, so no nuance audit is due. Words removed this round were narration only (the six review ids); words added carry the rulings' content.
- **`doc_checks.py --sections 5,6,7`** exits 0: C1 5, C2 1, C3 269, C4 0, S1 0, S2 272, 0 unreviewed. It warned "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) — clean-room results are NOT authoritative", so the result is **provisional**.
- **The repair seat's three HAND-OFFS** were each checked in the live text:
  - the fade for `snow`, `leaves` and `shimmer`: confirmed, VDC4-02;
  - the button left enabled while a pressed spell waits: confirmed, VDC4-07;
  - `bend.raised.underSpan` with no `open` span: confirmed, VDC4-03. It does **not** fall to the catch-all, whose cause cell is "every other infeasible declaration".

## 4. Issues

Totals: 8 issues, **0 blocker, 6 major, 2 minor**.

| owner | issues |
|---|---|
| determinism | 3 |
| V09 | 2 |
| scope | 1 |
| rendering | 1 |
| pipeline | 1 |

The ids: VDC3-03 persists; VDC4-01 – VDC4-07 are new.

### VDC3-03 — major — CONFLICT — owner: scope (persists at its second end)

**Claim.** §7.7 item 12's key cell (l. 12119), fixed this round per R4-15 (c), keeps a key minted at creation "for the
document's life (a later readable `id` neither replaces it nor is checked against it)". V08 §2.4's `id` row (l. 634) says
the same.

§14 states `E_OTHER_SETTLEMENT` twice:

- the `PortResult` comment (l. 19600): "an absorb whose digest's settlement key differs from the binding's — never for an
  offer whose `id` fell back (V08 §2.4)";
- the absorb paragraph (l. 19722): "a digest of another settlement `E_OTHER_SETTLEMENT` (never for an offer whose `id`
  fell back, V08 §2.4)".

The exception covers only an offer whose own `id` fell back. Take a map created from an id-less dossier, keyed
`settlement:map:<mapId>`, that later absorbs the same dossier now carrying a readable `id`. The offer's `id` did not fall
back. Its digest's key `settlement:<id>` differs from the binding's, so §14 refuses it, while §7.7 item 12 and V08
absorb it. Two units state two outcomes for one case (R3-03 (b)).

Round 3's second end, which R4-15 (c) took verbatim, named only the offer's fallback, so this end is still open.

**Required change.** At l. 19600, "never for an offer whose `id` fell back (V08 §2.4)" → "never for an offer whose `id`
fell back, nor against a settlement key minted at the document's creation (`settlement:map:<mapId>`), which a later
readable `id` is not checked against (§7.7 item 12; V08 §2.4)".

At l. 19722, "(never for an offer whose `id` fell back, V08 §2.4)" → "(never for an offer whose `id` fell back, nor
against a key minted at the document's creation, which a later readable `id` is not checked against; §7.7 item 12, V08
§2.4)".

### VDC4-01 — major — CONFLICT — owner: determinism

**Claim.** §6.3 *Plan damage* (l. 9969–9973) is the home of the damage comparison. It says each element "shows damaged
exactly while the level is above 0 and at least t", with one exception, the roofless case. R4-03's END lines this round
added a second case:

- V03 §5.6 (2) (a) (V03 l. 2692–2694): "an element is compared with the level only from its entry week ((b); V06 §3.23
  (3))";
- V06 §3.23 (3) (l. 3436–3442): an element a restoring event's re-cut mints enters the damage only at the week that
  restoration ends, and "Before that week it is drawn as built";
- §2.6 step 7 (l. 2099–2101) says the same.

So during a `reoccupy` whose `repair` Works is still running, a minted partition whose t the building's level still
reaches is drawn damaged by §6.3's "exactly" and drawn as built by V03, V06 and §2.6. Two units state two outcomes for
one case. R4-14 graded the parallel case (VDC3-02) major, and R4-03's sweep did not list §6.3.

The same paragraph also concludes "so a building never decayed draws its plan unchanged". §2.6 step 7, §8.6 and V03 §5.6
(2) (a) ("a building never decayed and under no look") draw such a building damaged while a disaster look stands over
it.

**Required change.** In §6.3 *Plan damage*, "the element shows damaged exactly while the level is above 0 and at least t
— but for §2.6 step 7's one case without a threshold" → "the element shows damaged exactly while the level is above 0 and
at least t, compared only from its entry week into the plan (V03 §5.6 (2) (b); for an element a restoring event's re-cut
mints, the week that restoration ends, before which it draws as built, V06 §3.23 (3)) — but for §2.6 step 7's one case
without a threshold".

In the same paragraph, "A level of 0 damages nothing else, so a building never decayed draws its plan unchanged
(`item123.damage`)" → "A level of 0 damages nothing else, so a building never decayed and under no disaster look (§2.6
step 7) draws its plan unchanged (`item123.damage`)".

### VDC4-02 — major — EDGE-UNDEFINED — owner: rendering

**Claim.** This round §6.1 *The weather stream* (l. 9561–9564) makes a press while a spell is in force wait for that
spell's strength to fall "to 0 at its kind's fade rate (§8.4 (i))". Only then does the pressed spell start.

§8.4 (i) (l. 13829–13830), the fades' home, states "at least 5 s for a shower, 60 s for fog, mist, dust haze and cloud
cover, V11's rows never shorter". It states nothing for `snow`, `leaves` or `shimmer` (V11's `WeatherKind`). V11's rows
hold no fade field (`ClimateSettings.weather.kinds` carries only `lengthS` and `hours`). For the kinds it does name, it
gives only a lower bound.

So a press during a snow spell has no defined wait. Snow falls 3 an hour through a temperate winter, so this is an
ordinary path. T124-9's replay of a press during a spell has no defined result either: when the pressed spell starts
depends on the fade. Three other texts read a fade for every kind:

- §8.4 (i)'s own phase ("rising from 0 and back to 0 over its fades");
- V11 §3.25.11's rule that every `lengthS` lower end is "at least twice its kind's fade in §8.4 (i)";
- T-V11-48 (c).

Two builders would give snow different fades and so start the pressed spell at different times.

**Required change.** In §8.4 (i), "its strength s in [0, 1] by its phase (rising from 0 and back to 0 over its fades: at
least 5 s for a shower, 60 s for fog, mist, dust haze and cloud cover, V11's rows never shorter)" → "its strength s in [0,
1] by its phase (rising from 0 and back to 0, each over its kind's fade: 5 s for a shower (`rain`, `drizzle`), `snow` and
`leaves`, 60 s for fog, mist, dust haze, cloud cover and heat shimmer — each kind's `lengthS` lower end in V11 §3.25.11 at
least twice it; §6.1's press reads the same fade)".

Every V11 row and override already meets twice these fades:

- `rain`: 30 s;
- `drizzle`: 60 s;
- `snow`: 60 s;
- `leaves`: 20 s;
- `mist`: 120 s;
- `cloudShadow`: 120 s;
- `shimmer`: 120 s;
- `dust`: 120 s;
- `fog`: 180 s;
- the arid rain override: 20–60 s.

### VDC4-03 — major — EDGE-UNDEFINED — owner: determinism

**Claim.** §7.1's new `bend.raised.underSpan` row (l. 10594) sends a ground `drawWay`, a moved way or a carve "to cross
under the nearest `open` span that holds it". It gives no outcome where no `open` span of the raised way holds it. That
happens when every span is `vault`, or when no `open` span has the clear width (the way's width + `clearWidthM`) or the
soffit that §4.3 (l. 5627–5629) requires. A `primary` street drawn across a timber elevated road whose open spans are
narrower than its corridor is an ordinary hand edit that meets it.

The catch-all row cannot serve, because its cause is "every other infeasible declaration" and this row names the case.
§4.3 gives generation's routes an else rung: "else the route takes another course by F-ROUTE's ladder". The hand case has
none, so one builder refuses, another routes round, a third leaves the crossing. The repair seat flagged this as its third
hand-off.

**Required change.** In §7.1's `bend.raised.underSpan` row, the third cell "the way or channel moved to cross under the
nearest `open` span that holds it, named in one line" → "the way or channel moved to cross under the nearest `open` span
that holds it; where no `open` span of the raised way holds it (every span `vault`, or none of the clear width or soffit
§4.3 requires), a way takes another course by F-ROUTE's ladder as a route re-solve does (§4.3; §5.2) — round the raised
way's feet, else the ladder's last rung (`unserved`, reported) — and a carve's channel stops at the edges of the
under-deck strip, ending against the ground as against a berm (§2.7's support step (6) (a)), reported; named in one
line".

Second end, for the adjudicator: T-V9-52 (or T110-2's clause (5)) adds "a road wider than every `open` span's clear width
drawn across a viaduct: routed round its feet, with `bend.raised.underSpan`".

### VDC4-04 — major — EDGE-UNDEFINED — owner: determinism

**Claim.** §2.7's support step (3) (l. 2552–2556) holds the band's stretch under a crossing station while the deck stands:
"no writer of its condition but a landfall leaves it `breached` or `dismantled`". The station's support *is* that
stretch, and its `supports` entry "reads its stretch's `condition`". This round §7.1 gained `bend.wall.held` (l. 10592).
It covers a hand `convert` `breach` or `dismantle` only.

A `delete` of the enceinte, or of the raised gate or wall opening there, is no condition write. §7.1 *Delete* (l.
10469–10476) and the outcome table give it no rule. V06 §3.7.6 (5) (l. 1605–1612; J-V6.114, J-V6.140) keeps such a
stretch through `wallToWay` and `absorbWall` "as a free-standing arch or gate tower". Read literally, a hand delete of a
town wall that an aqueduct passes by its arch removes the deck's support. It leaves the deck on a station with no ring and
a `supports` entry reading a stretch that no longer exists, an impossible structure. A builder might also refuse the
delete.

The outcome is undefined on an ordinary CITY edit.

**Required change.** In §7.1's `bend.wall.held` row, the cause cell "a hand `convert` `breach` or `dismantle` of an
enceinte stretch meeting the stretch held under a raised way's crossing station while its deck stands (§2.7's support step
(3))" → "a hand `convert` `breach` or `dismantle` of an enceinte stretch, or a `delete` of the enceinte or of its raised
gate or wall opening there, meeting the stretch held under a raised way's crossing station while its deck stands (§2.7's
support step (3))".

The outcome cell, after "an op wholly on the held stretch changes nothing, with its line", adds "; a `delete` takes the
rest and leaves the held stretch standing as a free-standing gate tower or arch carrying the deck, as `wallToWay` and
`absorbWall` leave it (V06 §3.7.6 (5)), the enceinte's record kept while such a stretch stands".

Second end, for the adjudicator: T-V9-52 adds "a wall deleted while a viaduct's deck stands on its raised gate: the gate
tower kept, carrying the deck, with `bend.wall.held`".

### VDC4-05 — major — CONFLICT — owner: pipeline

**Claim.** §4.11's `wallToWay(enceinte)` (l. 8189–8196), the operator's home for epochs and hand converts alike, ends
"towers are removed; gates become junctions with a `square` option".

V06 §3.7.6 (5) (l. 1605–1612; J-V6.114, J-V6.140) says "`absorbWall` and `wallToWay` leave standing every raised way that
crosses the old line; the new ring road takes no junction with it: its opening or raised gate in the old curtain stays as a
free-standing arch or gate tower". §4.8 (l. 7643–7650) makes that raised gate "a gate whose tower carries the deck".

A builder of §4.11's operator removes the tower that carries a standing viaduct's deck and makes its gate a junction. The
evolution builder keeps both. Two units state two outcomes for one case (R3-03 (b)), and §4.11's reading leaves a deck
without its support.

**Required change.** In §4.11 *`wallToWay(enceinte)`*, "towers are removed; gates become junctions with a `square`
option." → "towers are removed; gates become junctions with a `square` option — save the stretch held under a raised way's
crossing station while its deck stands (a raised gate with its tower, the curtain under an aqueduct's arch), which stays as
a free-standing gate tower or arch carrying the deck, the new ring road taking no junction with the raised way (§2.7's
support step (3); V06 §3.7.6 (5))."

### VDC4-06 — minor — CONFLICT — owner: V09

**Claim.** This round §7.1's `bend.wall.raisedCrossing` row (l. 10593) takes "a hand `drawWall` … across a standing
raised way", and an aqueduct is a raised way. §13.2's T110-2 (4) (l. 18414–18418) requires "a hand `drawWall` across a
standing aqueduct … the hand case naming `bend.wall.raisedCrossing`".

V09 §4.20.2 (4) (l. 3005–3007) still gives that case the older key: "From the other side, a wall T3 `wall` draws across a
standing aqueduct shows an arch in its ghost, not a gate (`bend.wall.aqueductArch`)". It then names
`bend.wall.raisedCrossing` for the same crossing two sentences later (l. 3007–3012).

So one case has two keys, and §7.1's catch-all row still lists "a wall's … aqueduct arch". The geometry is the same
either way; the dry run's line differs. That is an id, so the grade is minor.

**Required change.** V09 §4.20.2 (4):

- "An aqueduct passes through an arch in the curtain, never a gate (item 110 (b)), and its ghost draws the arch mark." →
  "An aqueduct drawn across a standing wall passes through an arch in the curtain, never a gate (item 110 (b)), and its
  ghost draws the arch mark (`bend.wall.aqueductArch`).";
- "From the other side, a wall T3 `wall` draws across a standing aqueduct shows an arch in its ghost, not a gate
  (`bend.wall.aqueductArch`)." → "From the other side, a wall T3 `wall` draws across a standing aqueduct shows an arch in
  its ghost, not a gate — the crossing below (`bend.wall.raisedCrossing`; T110-2).".

V09 §4.9's `bend.wall.aqueductArch` row, its source cell "file f item 363" → "file f item 363: an aqueduct drawn across a
standing wall (§7.1's *Raised ways, aqueducts and retaining walls*)".

Second end (determinism): §7.1's catch-all, "a wall's ridge, reach, waterfront, open ground and aqueduct arch" → "a
wall's ridge, reach, waterfront and open ground, the arch a wall takes for an aqueduct drawn across it".

### VDC4-07 — minor — CONFLICT — owner: V09

**Claim.** This round's press rule makes a pressed spell wait while the running one fades out, "a further press before
then changes nothing" (§6.1 l. 9564; V09 §4.21.14 (4)). V09 §4.21.14 (1) keeps **Start a shower now** "enabled while the
effects are on and a weather kind is live". So for up to a minute the button is enabled and a press does nothing visible.

That is the silent no-op §7.8 forbids ("disabled with its reason row — never a silent no-op"). §6.1 and V09 (4) already
apply that rule to the moment with no live kind. Row 93 and T-V9-87 test "nothing changed by the second press". The
repair seat flagged this as its second hand-off.

**Required change.** In V09 §4.21.14 (1), "enabled while the effects are on and a weather kind is live ((4))" → "enabled
while the effects are on, a weather kind is live and no pressed spell waits ((4))".

In (4), "a further press before then changes nothing (§6.1 *The weather stream*)" → "until then the button is disabled
with `settings.weather.coming` ("Your shower is on its way."), never a silent no-op (§7.8), so no further press is made
(§6.1 *The weather stream*)". V09 §4.9 adds the `settings.weather.coming` row.

Row 93's and T-V9-87's "nothing changed by the second press" / "a second press before then changes nothing" → "the button
disabled with `settings.weather.coming` until the pressed spell starts".

§6.1 needs no change: no press is made while the spell waits.

## 5. Result

`docs/validation/coherence/results/coherence_verify-determinism-r4t.json` holds the structured result.

## CONFIRMED versus PLAUSIBLE

These were **confirmed** by reading the live text and by execution:

- the live base's sha256 and the pre-round blob;
- that only determinism's 10 blocks land in §5–§7, with the 17 hunks (word diff);
- every round-3 finding's state at its site and second end;
- every pointer the hunks add, and every reference into §5–§7 added elsewhere this round;
- the review-id census and the retired-term patterns;
- the word count;
- `doc_checks` exit 0.

These rest on reading, with nothing executed:

- the severity grades (J141, R3-03 (b));
- the fade values VDC4-02 proposes (checked against every V11 row's `lengthS`);
- the outcomes VDC4-03 and VDC4-04 propose, built from rungs the set already has (§4.3's F-ROUTE else rung; V06 §3.7.6
  (5)'s free-standing arch or gate tower).
