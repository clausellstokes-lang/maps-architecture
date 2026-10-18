# Amendments c + d + e — seat E1 (determinism: dossier) — report

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/amend-determinism-dossier; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per item: planned sections | done blocks)
> ITEM 20 (h): planned §7.7 REPLACE — items 9–11 (tiers, derivation table, coherence), item 1 ((iv)), item 7 (ruling 2), item 2 (ruling 3) | done §7.7 REPLACE block written
> ITEM 74: planned §7.7 item 12 (the binding: key law, class rule, receipts; `DossierBinding`, `CarriedFacts`) | done §7.7 REPLACE block written
> ITEM 75: planned §7.7 item 1 (the diff) and item 13 (`DossierChange`, the receipt table, F20 = Q4) | done §7.7 REPLACE block written
> ITEM 77: planned §7.7 layer 2 (`CircumstanceSlice.trade`, `TradePartner`, the fill rule, north first) | done §7.7 REPLACE block written
> ITEM 78: planned §7.7 layer 2 (`EconomyShares`, the fill, the neutral default) | done §7.7 REPLACE block written
> ITEM 80: planned §7.7 `Assignment.state`; item 14 (the status rows, collective records) | done §7.7 REPLACE block written
> ITEM 81: planned §7.7 item 15 (the refusal, the tier word, F8) | done §7.7 REPLACE block written
> ITEM 82: planned §7.7 `Assignment` target and claims; item 16 (claims, phrase rows, Q5, Q6) | done §7.7 REPLACE block written
> ITEM 86: planned §7.7 item 1 (the ignore-list) | done §7.7 REPLACE block written
> ITEM 87: planned §7.7 item 5 (a host's undo converges) | done §7.7 REPLACE block written
> REFERENCING 73, 76, 79, 83, 85, 88: planned §7.7 item 8 (73 (d), 88), items 1/2/3/6 (76), layer 2 (79), item 11 (83), One path (85 seed pointer) | done in the §7.7 REPLACE block
> FOLDS (§C.9.3): 63, 65, 67, 71, 72, 101 phrases in §7.7 | done in the §7.7 REPLACE block
> J-ROWS / RATIONALE-A: planned after the §7.7 block | done (24 rows each; J-ROWS block and RATIONALE-A block written)
> CONTINUATION (2026-09-28, second opus seat): verified the three blocks against the route, file d and the other seats' landed blocks; four alignment fixes applied (see §4) | done
> QUEUE ROW: planned at the end | done

## 1. Outcome

One block file, `docs/validation/amendments-c/blocks-determinism-dossier.md`, carries three blocks: the one REPLACE of
§7.7 (the heading grepped verbatim; the design's sha256 `1c23190f…` unchanged since the seat started), a J-ROWS block of
24 index rows and a RATIONALE-A block of 24 Part A entries in Part A's `| id | call |` format. Every home item (20 (h),
74, 75, 77, 78, 80, 81, 82, 86, 87) is stated once, in §7.7; every referencing item (73, 76, 79, 83, 85, 88) and the
§C.9.3 folds of 63, 65, 67, 71, 72 and 101 are pointers or one-line rules inside the same block. No other subsection of
the determinism part is written by this seat: route §C.9.3 gives §5.1–§5.4, §6.1–§6.5, §7.1–§7.6 and §7.8 to seat E2,
which folds E1's phrases, and every fold was found present in E2's landed file (§5). Held parts: **none** — items 73–88
hold nothing (route §C.9.4) and 20 (h) is an owner rule. A simulated assembly of this file alone onto a copy of the
design, with `doc_checks.py --sections "7.7,Judgment calls"`, is recorded in §6.

## 2. Per item — where it landed, the mechanism, the rulings

| item | where (§7.7) | J rows |
|---|---|---|
| 20 (h) | items 9, 10 (DR1–DR25), 11; item 1 "the map never asks"; item 2 (population a count); item 7 (display stays the user's) | J-A20.76 – J-A20.79 |
| 74 | item 12 (`DossierBinding`, `CarriedFacts`, the key law table, class apart from identity, re-binding) | J-A74.71 – .73 |
| 75 | item 1 (the diff); item 13 (`DossierChange`, `ReceiptRow`, rows F1–F5, F8, F14, F15, F18, F20, F22) | J-A75.71, .72 |
| 77 | layer 2 *Trade* (`TradePartner`, the fill, north first); DR3, DR4 | J-A77.71, .72 |
| 78 | layer 2 *Economy* (`EconomyShares` keyed by §10.2's sectors) | J-A78.71, .72 |
| 80 | `Assignment.state`, `memberState`; item 14 (`StatusRow`, the fate-first table, collective records); DR25 | J-A80.71, .72 |
| 81 | item 15 (the sub-1 500 refusal, the tier word); DR23 | J-A81.71, .72 |
| 82 | `Assignment` `'feature'` granularity, `claim`, `criteria`; item 16 (claims, phrase rows, the 0.5 claim floor, landmarks) | J-A82.71 – .73 |
| 86 | item 1 "What the port never reads" | J-A86.71, .72 |
| 87 | item 5 "A host's undo"; row F22 | J-A87.71 |
| 73, 76, 79, 83, 85, 88 (ref.) | item 8 (staging, door 1 closed, the staged list); items 1, 3, 6 and layer 2 (weeks, rungs, cadence, tolerance); `PowerStanding`; items 10, 11, 13 (fixtures, bars, totality); One path (the seed) | J-A76.71 (refines J-A20.74) |

**20 (h) — the dossier is the one fixed truth.** Every fact the map holds is either a dossier fact (supplied by the
dossier, carried under its binding key, changed only by a dossier event) or a map fact (everything the map builds). A
map fact the dossier does not give is derived by a data row of the derivation table (DR1–DR25): each row names its
inputs in read order, the section whose rule derives it, the seeded concern where chance enters and the coherence bar
it holds; a missing input falls to the next and then to the rule's default, never to a request. The coherence rules bind
the derivation; a user edit that would change a dossier fact is refused `dossier-owned`, while a label's display text
and each viewer's knowledge stay the user's. Rulings: the two tiers with households as map facts filling a counted
population (ruling 3); the refusal superseding the override clauses of J-A30.71 / J-A30.72 (ruling 2); the table as an
index with a §13.2 totality test (rulings 4–6); the optional-only rule (iv). Ruling 1 (the marker's form) is seat M's.

**74 — identity without dossier ids.** The map binds its own addresses to keys built by one key law (settlement id;
institution catalogue key, else local uid, else name slug, `#k` for a collective record's members; power, notable,
condition, resource, quarter, government keys). The binding rows and carried facts live in `Document.dossier`, outside
the model digest, rebuilt from the log at load and checked. Class is read apart from identity; re-binding happens only on
a receipt, else a rename is a removal plus an addition, reported. Rulings: outside the digest (J-P10, with a reason that
fits `Identity.dossier` already being model data); key law stated at §7.7 and applied by §14's adapter; `#k` and the
tie-break as written.

**75 — why a change happened.** The port diffs each incoming whole dossier against the carried facts, writes one
`DossierChange` per changed element (id, source, week, cause, element, operation, fate, reason, receipts) and emits its
events. A receipt table, fate-first, reads SettlementForge's scattered stamps; the design states the ten rows the
verification corrected plus F22, the rest are data rows under the totality test; an undatable change applies finished,
reported. Q4 at F20: a ruined and resettled site is one map regrowing on its old plan.

**77, 78 (and 79 referenced) — the typed circumstances.** `CircumstanceSlice` is declared once in §7.7 with its
timeline in weeks: trade partners (dossier neighbours and link partners, else one per through route), weights (hostile
zero, rivals kept), modes by the water share of toll and duty income, bearings from the realm block or a partner-keyed
draw on `gate.pick`, north turned first when true bearings arrive; economy shares over §10.2's sectors (rents drop out;
standalone an even mix); power standings (M rules 79). The same fill runs with or without a dossier.

**80 — a listed ruin stays a ruin.** `Assignment.state` (active, ruined, removed) is written only by dossier events
through the fate-first status rows; a ruin is present on the map and kept by every epoch; a reopen returns to the former
building; a collective record's state reaches the severity band's share of its members, drawn on `siting`.

**81 — below 1 500 people is refused.** The port refuses such a dossier naming the village product (Q3); the rung follows
the population at creation and each epoch; the dossier's tier word titles the map.

**82 — quarters are naming claims.** A quarter is a `neighbourhood` assignment with a `claim`: a kind bias and its
location phrase as soft rows; the best-matching emergent district carries the name; below the 0.5 claim floor the name
waits, reported; "Eastern district (traditional)" is a low-weight placeholder (Q5); SettlementForge's district names are
never matched (Q6). Landmark strings the roster already demands become named-feature claims.

**86, 87.** The port never reads a host's own map layers, derived reads, generation log, sliders, social groups or prose
(beyond a clerk's description seed), and reports each dropped key. A host's undo is a forward change that converges
through the solver's own order and `formerUses`, reported `state_matches_absorbed`; no rewind exists (§7.4 untouched).

## 3. Items already satisfied or not applicable to this part

* 79's rulings (standings not entities, the arcane kind, `secret` a flag) are seat M's; §7.7 carries only `PowerStanding`
  and the standalone default (0.6 / 0.4, calibratable).
* 83, 84, 85's homes are scope's (§13.2, §14); §7.7 points to the fixtures, the bars and the seed derivation only.
* 88's records and rows are declared by M (§2.7) and T (§10.2); §7.7 item 8 lists them.
* 101 (the authoring toolkit) is E2's home in this part; §7.7 carries its two §C.9.3 phrases (a skeleton file's
  declarations join the creation prefix; the `citadel-and-port` form) and item 9's "declared" tier sentence.
* §7.4 is deliberately not edited for 87 (route: "§7.4 NOT edited"; a dossier event stays no undo target).

## 4. Continuation fixes (this seat, after verifying the first seat's block)

1. **Class-mix shift (item 71, seat T).** The first draft added an expansion row `classMix.wealthShift = lerp(−0.5,
   +0.5)`; T's §4.7 makes `wealthShift` a per-class column multiplied by `(wealthLevel − 0.5)` and reads `wealthLevel`
   directly (J-A71.42; T's note (e): "no new expansion row needed"). The row is replaced by a pointer, so no name means
   two things.
2. **DR21's chance.** It said "none"; E2's §6.1 registers `works` for a Works' duration (T's item 67). Now `works`, so
   §13.2's totality test (every chance names a registered concern) passes.
3. **DR9 and DR10 pointers** (T's note (f)): DR9 gains the distribution rule (§4.5 (3)); DR10 gains `alloc.district`
   (dispersal's controlled random share, E2's §6.1).
4. **J-A76.71 versus T's J-A76.43.** Both record the lapse threshold; J-A76.43 fixes the one number (± 5 %) for the
   cadence and the lapse, J-A76.71 records §7.7's refinement of J-A20.74. J-A76.71's row, its Part A entry and §7.7
   item 3 now cite J-A76.43 for the number. **J-A75.71** now says "ten corrected rows and F22" (file d names ten; F22 is
   item 87's undo row), and §7.7 item 13 says the same.

## 5. Cross-part notes (the other editors run in parallel; the verifiers check both sides)

1. **E2 (same part), verified present in its landed file:** §7.1 `EditBase.dossierChange`, `DossierRef.element` = the
   binding key and `version` = the product line, the `dossier-owned` refusal (the institutions row, `state`, claimed
   names); §5.2 F-EDIT's reason; §5.3 the coherence row, the "present as its ruin" row and the binding-rebuild row; §5.4
   `change: { changeId, reason }` and the port's refusal as no report; §6.1 the partner bearing on `gate.pick` by the
   partner's key and the collective members on `siting`; §6.2 the dossier seed case (85) and `dossier` outside the
   digest; §6.3 re-binding never re-keys; §6.5 T73-8 and the adapter-boundary scan; §7.5 the block rebuilt at first
   load. Nothing further is needed from E2. E2's section numbers (item 13, items 7 and 11, item 12, layer 2) are kept.
2. **T (pipeline):** its §4.11 (week, dating rungs, cadence, tolerance J-A76.43, the listed-ruin exemption, the reopen
   path), §4.7 APPEND (a returning dossier element ranks its former building first; `wealthShift` a class column) and
   §4.3 (`TradeFlow`, J-A77.41) match §7.7. Risk: §7.7 DR5 and DR9 point to T's APPEND on §4.5, which route §C.9.2 says
   the one-pass assembler order erases; the manager's two-pass order (REPLACE first, then APPEND and INSERT) keeps them.
3. **M (model, not yet run):** §2.9 holds the `Document.dossier` slot `{ binding: DossierBinding; carried:
   CarriedFacts }` and `Recipe.circumstances: CircumstanceTimeline` by pointer to §7.7 (declared there once, J-A77.71;
   not in the digest, J-A74.71, which supersedes the c-route's in-digest `DossierBinding` registry record);
   `Document.derived.tradeFlow`; §2.8 the tier marker (per-field, with the `declared` value for 101) read by §7.7 item
   9; `Identity.dossier` carries the binding key; §2.7 `Pin.kind` `notice`, `Faction.kind` military and arcane,
   `Institution.powers?`, the five staged records of 88 schema-complete and empty.
4. **R (rendering, not yet run):** §11.4 points to §7.7 item 1 for the never-read list and the optional-only rule, door 1
   closed (J86); §9.5 titles a dossier-bound map with the dossier's tier word (J-A81.72); §11.1 the anchor's
   `bearingDeg` is what "north first" turns; §9.2 / §11.1 / §11.2 show the tier marker; a waiting quarter claim is shown
   as unnamed, reported.
5. **S2 (scope, not yet run):** §14 the port: `DossierDigest` fields named by DR1–DR25, `HostContext` (optional), the
   adapter applying §7.7's key law and `slug`, its notes `ignored_key`, `duplicate_key`, `unmapped_kind`,
   `rename_without_receipt`, `unreceipted_change`, `state_matches_absorbed`, the refusal `E_RUNG_UNAVAILABLE`, the
   one-way seed (85); the tables `tables/dossier/{derivation, receipts, status, quarters, landmarks, wealth, site}`
   (provenance `own`, the SettlementForge line in each header); §13.2 the totality test (every registry map-fact family
   covered by a DR row; every chance a registered concern or none), T73-6 read as "every quarter name on exactly one
   district, or reported waiting" (J-A82.73), T75-1 – T75-5; §1.1 the clamp only without a dossier (J-A81.71).
6. **S1:** §16 prices (route §C.9.3); nothing else from this seat.
7. **Kernel finding 9 (frame growth at an epoch, item 81 (b)):** §7.7 states only that the rung follows the population
   and points DR23 to §3.2 (9)'s frame rule; how a frame grows is T's §4.11 and K's §3.2, not this seat's.

## 6. Checks

* Reference gate (c): no MFCG, FTG, NG, VG, Fantasy Manor or Dwellings name, no code path or line number in the blocks
  (grep, 0 hits). SettlementForge field names appear, as route §C.9.6 (1) allows.
* Every J id the blocks cite resolves (the design's index, or this file's rows); none of the 24 new ids exists in the
  design, the rationale or another block file.
* Simulated assembly (this file's REPLACE and J-ROWS applied alone to a copy of the design, sha256 `1c23190f…`) and
  `doc_checks.py --sections "7.7,Judgment calls" --allow docs/validation/doc-checks-allow.tsv`: first run C1 5 / 0
  unreviewed, C2 0, C3 77 / 3 unreviewed, C4 0, S1 0, S2 0. One hit was mechanical and is fixed: the digit run "0 1 0 8
  and", which the continuation's own edit had made after `lerp(0.1, 0.8)`, now ends in a semicolon as the design's text
  did. Second run: C3 76 / 2 unreviewed, the rest 0 unreviewed, exit 1 on these two only.
* **The two remaining hits are false positives, left for the assembler's allow row** (the allow file is the assembler's):
  both are "the rest of the map" inside the owner's verbatim words at the head of "The derivation rule and the port's
  contract" (item 20 (h), 2026-09-27), which a quotation must not reword. Recommended row:
  `C3<TAB>the rest of the map<TAB>the owner's own words quoted verbatim in §7.7 (item 20 (h), 2026-09-27); an ordinary
  five-word English phrase whose three 3-grams each occur in the corpus, not reference text`.
