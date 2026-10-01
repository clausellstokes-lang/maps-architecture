# repair-r4-determinism — lane coherence/repair-determinism-r4 (unit determinism: base §5, §6, §7)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-determinism-r4; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header
# is ignored. Base: docs/ARCHITECTURE.md sha256 593c657d34849302… (assemble-r3's output, the live file). Each REPLACE body
# is the live subsection with count-asserted substitutions (generator docs/validation/coherence/work/repair-determinism-r4/
# gen.py with edits.py: 17 edits, each substitution asserted to occur exactly once; only the touched paragraphs are
# re-wrapped, every other line verbatim). 10 REPLACE blocks (§5.1, §6.1, §6.3, §6.5, §7.1, §7.3, §7.4, §7.5, §7.6, §7.7),
# 0 RULING REQUEST blocks. Binding: adjudication-r4.md (R4-01, R4-09, R4-14, R4-15; Part H · determinism), with R3-01 –
# R3-03 standing.
#
# PROGRESS
# - P0 brief read whole; adjudication-r4 TOC, R4-01, R4-09, R4-14, R4-15 and Part H · determinism read whole; R3-01 –
#   R3-03 (standing) read: done
# - P1 issue sources (verify-determinism-r3t, -agree-host-r3t, -model-r3t, -vol-V11-V12-r3t; round4-work/determinism.json:
#   no also_reported, no orchestrator_note) and live §5.1, §6.1, §6.3, §6.5, §7.1, §7.3, §7.4, §7.5, §7.6, §7.7 read whole;
#   V11 §4.1, V08 §2.4's `id` row, §2.6 step 7, §8.4 (i), §8.2's weather marks, V11 §3.25.11, V09 §4.21.14 and the landed
#   repair-r4 files of model (§2.7 support step (3), (6)), V09 (§4.21.14 (4), row 93), scope (T124-9, §14's
#   `E_OTHER_SETTLEMENT`) and V08 (§3.5's carried fact) checked for agreement: done
# - P2 17 count-asserted edits over 10 subsections: done
# - P3 dry run on copies, checks, word counts, result, LANDED: done
#
# DISPOSITIONS — 11 routed issues: 10 FIXED, 1 MERGED (VM-R3T-09 into VDC3-07, closed by its fix), 0 INVALID,
# 0 ruling requests
# - VAH-r3-07 (minor; FIX): DR44's key-form clause cites its decision only — "a key form listing the overlay's address
#   admits it whatever its tier (J-V8.128)"; V08 §3.16 (7) (e), which cites DR44, is no longer cited back.
# - VDC3-01 (major; FIX): §6.1 *The weather stream* — after "…(§7.8: never a silent no-op)." the required sentence: "A
#   press while a spell is in force ends that spell first: its strength falls from its present value to 0 at its kind's
#   fade rate (§8.4 (i)), and the pressed spell … starts the moment it reaches 0, so one spell is in force at a time and no
#   light term steps faster than §8.4 (i) allows (T124-7); a further press before then changes nothing." — with "— of the
#   commonest live kind at the press —" on the pressed spell, so its kind is the press moment's (as V09 §4.21.14 (4)'s
#   "the commonest kind live at that moment" reads) and not the moment the running spell reaches 0; §6.5 (9)'s *weather
#   timeline* test adds "a press while a spell is in force, the running spell fading out before the pressed one starts
#   (T124-9)". V09's end (§4.21.14 (4), row 93) is V09's END line, landed in repair-r4-V09 in the same words.
# - VDC3-02 (major; FIX per R4-14): §6.3 *Plan damage* — "the element shows damaged exactly while the level is above 0 and
#   at least t — but for §2.6 step 7's one case without a threshold: a roof bay over a room of a roofless wing
#   (`RoofSpec.kind` `none`) of a `decayed` or `ruined` building is damaged whatever its t and level". Sweep (R4-01 (2)):
#   the same sentence's "a level of 0 damages nothing" now reads "A level of 0 damages nothing else", and §6.5 (9)'s *plan
#   damage* test's level-0 clause adds "but for a `decayed` or `ruined` building's roof bays over a roofless wing's rooms,
#   damaged at every level (§2.6 step 7)".
# - VDC3-03 (major; FIX per R4-15 (c)): §7.7 item 12's settlement key cell as the required change words it — the dossier's
#   own id; where it is empty or not of its line's form, at a creation `settlement:map:<mapId>` kept for the document's
#   life (a later readable `id` neither replaces it nor is checked against it), at an absorb the bound document's key (V08
#   §2.4's `id` row; item 125 (b)); "between readable ids, a new id is a new dossier and a new map". §14's
#   `E_OTHER_SETTLEMENT` end is scope's END line (landed in repair-r4-scope).
# - VDC3-04 (minor; FIX): DR44's rule cell and test cell name "stressor type, condition archetype and crisis event", as its
#   `event` rows, V08 §3.16 (7) (a), §10.2 (b) and T122-4 do.
# - VDC3-05 (minor; FIX per R4-09, amended): §7.1's outcome table gains, before the catch-all row, `bend.wall.held` as
#   VDC3-05 words it, and R4-09's `bend.wall.raisedCrossing` row in place of VDC3-05's second row (a hand `drawWall`, a
#   moved trace vertex or a re-anchored stretch across a standing raised way: the trace bent through the station on the
#   deck at its level nearest where it would cross, its strips stopped at the under-deck strip's edges where a support,
#   ramp, stair or foot stands or the span is `vault`, the raised way unchanged but that station's support) — VDC3-05's
#   "its stations re-run in the same commit" not written (R4-09 (b): a standing raised way is held).
# - VDC3-07 (minor; FIX per R4-09, amended; closes VM-R3T-09, MERGED): §7.3 item 3's S7 row, after "re-derive the strip
#   blocks' S10 step (0)": "; on each standing raised way the new run crosses, the run bent through its nearest station on
#   the deck at its level and its strips stopped under the deck where they cannot pass (§2.7's support step (6) (b)) —
#   that raised way's crossing station in the effective scope and the fate report (§7.3 item 4), nothing else of it
#   re-derived". R4-09's "fate sheet" is written as the set's term for §7.3 item 4's list, "fate report" (principle (2): no
#   "fate sheet" exists in the set; the canon's glossary lists "fate report" under the dry run and "fates sheet" as V09's
#   UI). VDC3-07's and VM-R3T-09's re-run of support step (1)–(5) not written (R4-09 (b)).
# - VDC3-08 (minor; FIX): the six review ids out of design text — §5.1 (8) "(DWG-01)", §6.1's attempt component
#   "DIC-02: ", §7.5's `UpgradeDiff` comment "(DWG-02)", §7.6's `TableId` comment "(MC-11)", §7.6's "V12-XCONF-2; ",
#   §7.7's `Assignment.drift` comment "(MC-11)". A census of §5–§7 with assemble-r3's reviewids.py pattern after the edits
#   finds none.
# - VDC3-09 (minor; FIX): §6.1 *The weather stream*'s pure-function list reads "the climate row, year position, sites,
#   `light` mode and view hour in force at each moment"; sweep: the same paragraph's rate sentence, which names the inputs
#   whose change moves the live rate, adds "the `light` mode" (the `hours` count only under `light: 'time'`). T124-9 (scope)
#   and T-V9-87 (V09) carry the same list.
# - VM-R3T-09 (minor): MERGED into VDC3-07 (Part H) — closed by its fix, no block of its own.
# - VV1112-r3-04 (major; FIX): §7.1's `refuse.table.required` row's cause reads "removing a row readers fall back to or
#   need — … the only row covering a value a totality rule requires (a `crisis.looks` row for its look kind and a
#   `damage.elements` row for its element kind among them), a table's named row (V11 §2.1's settings form: `settings`,
#   `structure`, `festival.staging`'s `fallback`), or the last row of a table not `mayEmpty` (V11 §4.1; J-V11.113)", as V11
#   §4.1 refuses. V09's restatement is VV1112-r3-05 (V09's FIX).
#
# END LINES written this round (R4-01 (1); Part H · determinism)
# - END of VEW-r3-01 (pipeline; R4-09): §7.1's outcome table, before the catch-all row, the `bend.raised.underSpan` row in
#   R4-09's words (a ground `drawWay`, a moved way or a carve meeting a standing raised way's supports, ramps, stairs, feet
#   or a `vault` span's strip, or crossing its under-deck strip elsewhere than under an `open` span (§4.3; §2.7's support
#   step (6) (b)) → bent, the way or channel moved to cross under the nearest `open` span that holds it, named in one line).
# - END of VEL3-r3-02 (V08; R4-15 (a)): §7.7 item 10 — "reported with the fallback taken (item 125 (b); T125-1) — at an
#   absorb a field that takes its fallback changes nothing, the carried fact standing (V08 §3.5)".
# - END of VM-R3T-06 (model; R4-09): §7.4's edge-boundary table, a raised way's lock column — "its deck and piers held (a
#   later trace's crossing station taking the band's stretch, §2.7's support step (6) (b))".
#
# SWEEP (R4-01 (2)) — §5–§7 searched for the terms, keys and sections each applied ruling changes: the settlement key and
# `E_OTHER_SETTLEMENT` (R4-15 (c): only item 12's cell; §7.7 item 12's re-binding and F20's "a member birth is a new
# dossier and a new map" are other cases and stand); the item-125 fallback (R4-15 (a): only item 10 states it in §5–§7;
# DR29's and the bearings' fallbacks are creation values); the damage comparison (R4-14: §6.3's level-0 sentence and §6.5
# (9)'s level-0 clause conformed, above); the raised-way crossing (R4-09: §7.1's *Raised ways, aqueducts and retaining
# walls* paragraph is a raised way drawn across a standing wall, which comes down before the trace, untouched by R4-09;
# §7.1's edit-targets row, T4/T9 bindings and §7.4's `drawWay` row name no re-run and stand; §5.3's deck row stands); the
# weather inputs (VDC3-09: the rate sentence, above); DR44's classes (VDC3-04: DR44's input cell already names "a stressor,
# a condition or a simulator event"); the named-row delete (VV1112-r3-04: §7.1's refusal lead "a table edit's … required
# row (V11 §4.1)" covers it and stands).
#
# HAND-OFFS (R3-01 (3), kept by R4-01: ends no line names; for round 5's verifiers)
# - rendering, §8.4 (i): the fades it states are a shower's (at least 5 s) and fog's, mist's, dust haze's and cloud cover's
#   (60 s); `snow`, `leaves` and `shimmer` (V11 §3.25.11's kinds) have none, yet §6.1's press rule ("its kind's fade
#   rate"), §8.4 (i)'s own phase and T-V11-48 (c)'s `lengthS` bound ("twice its kind's fade") read one for every kind.
# - V09, §4.21.14 (1) and (4): while a pressed spell waits for the running one to fade out, a further press changes nothing
#   (§6.1; V09's own END text); the button stays enabled there ("enabled while the effects are on and a weather kind is
#   live"), so §7.8's "never a silent no-op" may want the button disabled with a reason, or the wait shown, until the
#   pressed spell starts.
# - pipeline, §4.3 (and §7.1's `bend.raised.underSpan`): where no `open` span holds a ground way or channel — every span
#   `vault`, or the corridor or channel wider than every open span's clear width — the hand case falls to §7.1's catch-all
#   row (the nearest lawful route, round the raised way's feet); §4.3's crossing rule may state that rung so the two ends
#   read the same.
#
# CHECKS (on copies under the session scratchpad)
# - apply-blocks.py on the live base (sha256 593c657d…): 10 blocks found, 10 applied, 0 skipped, audit 10/10 OK (present
#   once); headings 153 → 153, fences balanced, title block unchanged, rationale untouched. Applied again with the other
#   landed repair-r4 base files (model, pipeline, rendering, scope; the volume files' blocks are the Assemble seat's FILE
#   handling): this file's 10 blocks OK (present once), no collision.
# - doc_checks.py --sections 5.1,6.1,6.3,6.5,7.1,7.3,7.4,7.5,7.6,7.7 on the result: exit 0 — C1 5, C2 1, C3 190, C4 0, S1 0,
#   S2 250 hits, 0 unreviewed (live: the same but S2 251) — WARNING: reference corpus INCOMPLETE (missing captures,
#   research/patreon, research/devlogs, research/ftg-docs, research/external): the clean-room result is NOT authoritative,
#   provisional.
# - every § pointer the new text adds resolves (§2.6 step 7, §2.7's support step (3) and (6) (b) — model's repair-r4 text —,
#   §4.3, §7.3 item 4, §8.4 (i); V08 §2.4, V08 §3.5, V11 §2.1, V11 §4.1); T124-7, T124-9 and T122-4 exist in §13.2.
#
# WORDS (principle (9)'s shrink report): the unit §5–§7 80 524 → 81 061 (+537, +0.7 %); the ten touched subsections
# 63 909 → 64 449. Removed: narration only (the six review ids). Added: content the rulings and owner rules require — the
# three raised-way bends and the S7 locality clause (R4-09), the press during a spell (item 124 (g)), the roofless case at
# the comparison's home (R4-14), the settlement key's fallbacks and the absorb fallback (item 125 (b); R4-15), the named-row
# refusal (V11 §4.1), the crisis-event class (item 122). A repair round adds the missing ends; the unit's shrink was taken
# in the earlier rounds, and nothing here is restatement.
