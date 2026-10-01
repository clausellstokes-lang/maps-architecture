# repair-r2-determinism — lane coherence/repair-determinism-r2 (unit determinism: base §5, §6, §7)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-determinism-r2; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-c/apply-blocks.py): text before the first "=== " line is
# ignored. Base: docs/ARCHITECTURE.md sha256 137ecc0e4fe12c44… (assemble-r1's output; no round-2 assemble has run). Each
# REPLACE body is the live subsection with count-asserted substitutions (generator
# docs/validation/coherence/work/repair-determinism-r2/gen.py with edits.py; every untouched line is verbatim).
# 10 REPLACE blocks (§5.2, §5.3, §5.4, §6.1, §6.2, §6.3, §6.5, §7.1, §7.4, §7.7), 0 RULING REQUEST blocks.
#
# PROGRESS (continuation after the 07:09 usage-limit cut, which left no saved work)
# - P1 brief read whole; live base confirmed 137ecc0e (assemble-r1): done
# - P2 adjudication-r2 (TOC, Part H · determinism, R2-01, R2-05, R2-11, R2-18, R2-20, R2-21, R2-24, R2-35 – R2-41 whole);
#   canon dated rulings for g items 121–126 and adjudication round 2; g items 122, 122 (h)–(i), 123, 124, 125 whole: done
# - P3 issue sources (verify-*-r1t), live §5.2–§5.4, §6.1–§6.3, §6.5, §7.1, §7.4, §7.7 read whole; sibling r2 texts
#   read for shared names (model r2 §2.6 step 7, §2.7, §2.9; pipeline r2 §4.11 *The clock*, §10.2 *Crisis looks*;
#   V09's in-flight drafts of its weather, crisis and damage parts): done
# - P4 47 asserted substitutions over 10 subsections (edits.py): done
# - P5 checks on scratch copies; result file; LANDED: done
#
# DISPOSITIONS — 24 routed issues: 23 FIXED, 1 INVALID by ruling (no block), 0 ruling requests
# - VDC0-33: INVALID (R2-01), closed for good — §7.7 item 1 stays path-free, V08 §2.4 the one list. No block.
# - VAH-r1-06 (R2-21 (a)): E-07's head names itself the home of every outcome "of a dry run" and lists the gates outside
#   it — §11.1's export tier, §11.2's `advance` on a dossier-bound document (V06 §2.3), the shell's layer gate (V09 §4.2;
#   no screen gate, item 126 / R2-41), V09 §3.9's restore, V10 §3.16's harness and model refusals — V09 §4.9's lead
#   naming each.
# - VDC1-02 (R2-21 (b)): E-07's lead adds "where the input has no lawful form to bend to" with its four grounds (VDC1-02's
#   text).
# - VDC1-01 + VEL1-03 (R2-21 (c); one fix): the table-edit row loses the stamped-cell clause and
#   `refuse.table.ownerRule`; the required-row delete is one row keyed `refuse.table.required` in VEL1-03's wording,
#   with VDC1-01's "(V11 §4.1; J-V11.113)" and VEL1-03's load clause (a pack's such op refused at load, the row standing,
#   V11 §3.2.3); *The returned kinds* returns its key alone (its "every other row" sentence).
# - VDC1-03 (R2-21 (c)): the row `refuse.epoch.cap`; §6.1's epoch component names the key back (both ends).
# - VDC1-04 (R2-21 (c)): the reservation row keyed `refuse.water.reservation`; *The returned kinds*' `unlock` names the
#   rows whose action is the blocking lock (judgment (2)).
# - VDC1-05 (R2-21 (d)): F-EDIT's action cell separates `ApplyResult.outcome` from the `ConflictAction`s (VDC1-05's text).
# - VDC0-27 = VKr1-01 (one fix, VKr1-01's text): F-RIVER's detection reads "descent stalls in a sink (§4.2 S1 (3));".
# - VDC1-09 = VPC-R1-19 (one fix, VDC1-09's text): F-CUT reads "§4.6 step 8 (d)'s area bound" and "§4.6 step 8's *Bars*
#   on 10⁵ random concave and holed faces (…)"; checked against pipeline r2's §4.6 (rung (d) and the *Bars* sentence
#   unchanged there).
# - VDC1-08: "V04 §3.5–V04 §3.6" (F-VOID) and "V05 §3.2–V05 §3.10" (DR27).
# - VDC1-06 + VM-R1T-11 (its §6.1 half one fix): `raised.reason`'s row cites `RaisedReasonKey` (§2.7); the stage list
#   names `raised.reason` for `EVO_RAISED`'s gate draws; the row adds the span's open-or-vault draw (judgment (1)).
#   VM-R1T-11's §5.3 half: the Works row's `Household.transit` (§2.7).
# - VDC1-07: §5.4's `stages[].warnings` comment names S3's `W_WALLED_BY_BARRIERS` and `W_MOAT_DRY`, S10b's
#   `W_DOSSIER_EDGE` and the underground's.
# - VDC1-10: item 1's narration replaced by VDC1-10's sentence.
# - VDC1-12 (R2-18 (b), (d)): §7.7's precedence takes a fall the unlocked households cannot meet from locked and pinned
#   households in the roster's suffix order, each superseded lock reported orphaned and kept as history; the fixture line
#   cites T20-14 – T20-16 with R2-18 (d)'s three fixtures (T20-15's no-`vacate` clause among them).
# - VAT0-07 (R2-20): §6.1's epoch component — live epochs numbered 1, 2, … after the creation prefix whatever R; a replay
#   epoch records `0x8000_0000 + r` in every epoch number the model records (named); ordering by week (an `EpochRecord`'s
#   week, its `inputs.week` — `EpochRecord` holds no `week` field of its own, §2.9); §6.5's *epoch keys* fixture adds
#   that no lineage key a replay epoch mints equals a live epoch's.
# - VKr1-06 (R2-24): §7.4's frame row — a population `adjust` re-derives from the population control's consuming stage
#   (§7.8), at the latest S1 (VKr1-06's text).
# - G122-determinism (NEW DESIGN, R2-37 (3), R2-11): §7.7's DR44, the crisis looks — inputs (the standing
#   `ConditionOverlay`s by §2.9's `week` in [`sinceWeek`, `untilWeek`), never the year position; a calamity's `targets`;
#   the headcounts of item 122 (h), else `exodus` and arrivals; the rung), the rule (overlay → §10.2's `map` row → look
#   row → scale by severity and tier or by headcount; placement §10.2 (c)–(f); §8.2's rows under §2.9's `crises`;
#   knowledge admission at the viewer's effective key — never drawn, listed, counted or named; the aftermath only by the
#   epoch path), chance `render.instances` (view draws on §8.10's render keys, as DR43's festival), bars T122-1, T122-2,
#   T122-4; item 10's DR-range sentence reads DR41–DR44. Every verifier version satisfied (agree-time's and
#   agree-tools' "year position" clause overridden by R2-37 (1)).
# - G123-determinism (NEW DESIGN, R2-38 (2), R2-35): §6.3 *Plan damage* — one uniform per plan element on
#   `plan.damage`, keyed by (the building's lineage, the element's id), t = lo + u·(hi − lo) by element kind (V11),
#   §6.1's fixed-key draw minus persistence, compared with V06's `decayLevel` (level above 0 and ≥ t; judgment (3)),
#   monotone, never relocated, reversed by restoration, no id minted, cellars and crypts on the building above's key;
#   §6.1's registry row with its readers; §6.5 (9)'s *plan damage* test (T123-3's determinism clause, T123-1, the no-op
#   pin `item123.damage`).
# - G124-determinism (NEW DESIGN, R2-39 (d), R2-35): §6.1 *The weather stream* — `view.weather` on `STAGE_VIEW` from a
#   session seed (never the document's: verify-agree-time's "from the document's seed" overridden by R2-39 (d)), keyed by
#   the spell index (an entity key over (session seed, i) in `render.stampTiles`' constant-key pattern), the spell's
#   draws, Start a shower now as the next spell index, replay from (seed, view time, climate and year position, presses);
#   never a stage, model stream, digest, tile key or export; the `weather` cover draws nothing from it; registry row;
#   §6.5 (9)'s *weather timeline* test (T124-9); §6.2 gains "no session seed" and the tile-and-export scope of its
#   pixel-identity sentence (judgment (9)).
# - G125-determinism (NEW DESIGN, R2-40 (1)–(3)): DR1, DR3, DR19, DR29 and DR42 re-sourced (no realm input; DR42's week
#   the dossier's latest stamped tick, else the season control, midsummer week 19; its climate the terrain column);
#   item 10's input order "the dossier's, then the blueprint's own", each fallback reported (T125-1); item 1: no host
#   data input (`HostContext` keeps `audience`, `displayNames`, `line`, none a data input; T125-2), the view commands
#   commands, `customLibrary` retired with the custom definitions read only from the dossier's `customContentRoster`
#   and `customContentProvenance`, the realm block no input; layer 2's week and bearings (judgment (6)).
#
# RECEIVING ENDS written this round (R2-05 (1))
# - R2-11: DR44 numbered and named in item 10's DR-range sentence.
# - R2-18 (d): §7.7's fixture line cites T20-14 – T20-16. R2-18 (a), VEL1-01's last sentence (the model's hand-off to
#   this unit): §5.3's capacity row carries the lower bound with the one exception — 0 only for a `vacant` building and
#   for a locked or pinned dwelling a dossier population fall emptied (§7.7's precedence) — and its check.
# - R2-35: §6.5 carries T123-3's and T124-9's determinism clauses.
# - R2-40 (2): §7.7 item 1's host inputs as R2-40 (2) words them.
#
# JUDGMENT CALLS (vetoable)
# (1) VDC1-06 (c)'s pointer "§2.7's support step (3)" is written "§2.7's span rule (3)": the open-or-vault draw keyed by
#     (lineage, `a`, `b`) is the span rule's step (3) in the live §2.7 and in model r2; the same row's pier pitch is keyed
#     by (lineage, `pitch`) as §2.7's support step (1) states (the row said "the way's lineage" only).
# (2) VDC1-04: the `unlock` sentence names every row whose action is the blocking lock — the first row, a declaration
#     meeting a lock and a capacity re-homing held by locked or pinned households (both `refuse.locked`) — not the first
#     row alone, which would have dropped the other two rows' unlock; the reservation conflict no longer gets one.
# (3) G123: an element shows damaged while the level is above 0 and ≥ t, so level 0 damages nothing whatever V11's
#     ranges (an element kind whose range starts at 0 could otherwise break at level 0 and fail the no-op pin); t stays in
#     [0, 1) as §2.6 step 7 (model r2) states.
# (4) G123: the element's id is folded into the key as structured components (§6.1's no-string rule) — its element kind
#     and V03 §2.2's plan-part id, a floor area and the roof bay over a room by their room's address (the kind tells them
#     apart); no rung counter enters, so an id a re-rolled or re-cut plan shares keeps its threshold.
# (5) G124: the session seed comes from the platform's random source outside the model packages (§6.5 (3)'s lint holds);
#     a spell's draws in order gap, kind, length; a spell is fixed once started (a year-position or climate change acts
#     from the next spell); Start a shower now takes the next spell index (agrees with V09's draft §4.21.14 (4)); the
#     effects switched off stop no clock.
# (6) G125: item 125 (a) retires every realm input, so DR2's "realm gates" and DR34's "realm cell's river" go with the five
#     rows the canon named (same item, same unit), and §6.1's `gate.pick` and `hinterland.outside` rows follow; layer
#     2's Bearing reads the user's setting, else `gate.pick`; its North-first sentence (J-A77.72's realm fit) loses its
#     only input — true bearings from the realm block — and is replaced by "no input sends a true bearing after
#     creation"; `TradePartner.source` loses `'realm'`, a stored `'realm'` read as `'dossier'` by §7.5's schema chain.
# (7) G125: DR29's later-latitude path (`PortValues.latitudeDeg` "when the realm block arrives after creation") has no
#     producer once the realm block goes; DR29 writes the latitude at creation (a map fact the user may edit) and reports
#     a later `site.culture` change as `frozen_fact_changed`.
# (8) G125: DR42's climate drops `site.climate` (V08 fills it from the realm block's climate word) and reads the terrain
#     column (item 125 (b)); its "later climate word" note reads "a later `site.terrain` word".
# (9) §6.2 is not in the canon's routing of item 124, but its "nothing else reaches the model" list and "two renders …
#     pixel-identical" sentence would otherwise be contradicted by the session-seeded effects layer; two lines added.
# (10) Five wordings changed only to clear doc_checks C3 3-gram hits on our own research notes (no meaning changed).
#
# HAND-OFFS (R2-05 (3): ends no ruling names; for round 3's verifiers)
# - V08: `PortValues.latitudeDeg` (V08 l.506, l.742, l.746, W35, W40, l.1622, l.1657) and `site.climate` (l.696,
#   l.2359) lose their producer with the realm block (judgments (7), (8)); l.171 "DR1–DR43" → "DR1–DR44" (R2-11);
#   l.1198's forced course drops "the realm cell" and "unless the realm block fixes the course's line"; l.2054's "(true
#   bearings, north first)" no longer has a §7.7 end (judgment (6)).
# - rendering: §11.1's geo anchor default ("the port's realm fit sets the anchor's `bearingDeg`") has no input after item
#   125 (a); the default (0°, 0°, 0°) or the user's anchor.
# - scope: §14 item 5's `realm` ("whose true bearings turn the map's north first") and `realm_block_used` (R2-40 (2)
#   names §14); the rationale's J-A77.72 entry, if it records the realm fit.
# - V03: §2.2 may name the floor-area and roof-bay keys §6.3 *Plan damage* uses (their room's address with the kind).
#
# SIZE (principle (9)): §5.2–§5.4, §6.1–§6.3, §6.5, §7.1, §7.4, §7.7 59 919 → 62 0nn words (see CHECKS for the exact
#  count). No word removed from content. Removed: narration (VDC1-10), the retired realm inputs and North-first
#  sentence (owner item 125), restatement none. The growth is new design the owner's items require at build depth
#  (DR44 ≈ 300 words, *Plan damage* ≈ 330, *The weather stream* and its rows ≈ 480, item 125 ≈ 250) and the defined
#  edges and rows this round adds (E-07's three rows and grounds, the precedence's household-lock fall, the epoch
#  numbering ≈ 450). The shrink band is not this round's: the unit's words are owner-item content (the guard).
#
# CHECKS (scratch copies; receipts)
