# repair-r3-determinism — lane coherence/repair-determinism-r3 (unit determinism: base §5, §6, §7)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-determinism-r3; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first "=== " line is
# ignored. Base: docs/ARCHITECTURE.md sha256 4ed292e94f2442e5… (assemble-r2's output, the live file). Each REPLACE body
# is the live subsection with count-asserted substitutions (generator docs/validation/coherence/work/repair-determinism-r3/
# gen.py with edits.py; only the touched paragraphs are re-wrapped, every other line verbatim). 5 REPLACE blocks (§6.1,
# §6.3, §6.5, §7.1, §7.7), 0 RULING REQUEST blocks. Binding: adjudication-r3.md (R3-01 – R3-03, R3-09, R3-11 – R3-13,
# R3-21 – R3-23, R3-25; Part H · determinism).
#
# PROGRESS
# - P1 brief read whole; adjudication-r3 TOC, R3-01 – R3-03, R3-09 – R3-13, R3-17 – R3-27 and Part H · determinism read
#   whole (and Part H · V08's END lines, which meet DR44): done
# - P2 issue sources (verify-determinism-r2t, -vol-V03-V04-r2t, -vol-V11-V12-r2t, -agree-host-r2t's VAH-r2-01 as the
#   brief quotes it), V11 §3.25.10 – §3.25.11, V08 §3.16 (7), V04 §5.6 (1)–(2), V03 §2.2, §2.7 *At the frame* and
#   `RaisedFoot`, II.7.6 step 3, T66-2, §8.2's hard rules, §9.2's admission function; live §6.1, §6.3, §6.5, §7.1, §7.7
#   read whole: done
# - P3 11 asserted edits over 5 subsections (edits.py): done
# - P4 checks on scratch copies (below); result file; LANDED: done
#
# DISPOSITIONS — 16 routed issues: 11 FIXED, 5 MERGED (closed by their targets' fixes, no block of their own), 0 INVALID,
# 0 ruling requests
# - VDC2-01 (major; R3-23 (a)): §6.1 *The weather stream* — the gap a unit exponential E = −ln(1 − u) through
#   `dmath.log`, spent at the live rate R(t) over view time (none while R = 0); a kind live while its band holds §2.9's
#   `yearWeek` and, under `light: 'time'`, its `hours` hold the view's hour, its rate `perHour` × V11's site factor (the
#   sites read from the model at the view's head); the kind drawn when the spell starts, the length in its `lengthS`; a
#   running spell changed only through §8.2's hard rules; the pure-function inputs widened to the climate row, year
#   position, sites and view hour in force at each moment; §6.5 (9)'s test adds the scripted year-position change (a week
#   with no live kind into a live week and back) and a view hour crossing a kind's `hours` (T124-9).
# - VDC2-02: §6.1's `view.weather` row keys the spell's marks (§8.2's positions, lengths and sways) on the spell's entity
#   key folded with the frame's world-aligned cell; *The weather stream* names them (both ends).
# - VDC2-03: §6.5 (3)'s lint scope takes the weather timeline function with every function it calls; CI's closure roots
#   name it (judgment (1)).
# - VDC2-04 (graded major; FIX amended per R3-23 (b)): Start a shower now starts the commonest LIVE kind at that moment
#   (V11 §3.25.11's rule); "at a moment with no live kind (R = 0)" a press starts none and V09 disables the button with
#   its reason (§7.8: never a silent no-op) — the required change's "in a week with no live kind" not written (R3-23 (b));
#   §6.5 (9)'s test fixes that press.
# - VDC2-06: §6.3 — [lo, hi] the element kind's range (V11 §3.25.10's `damage.elements` row); the walls material acts only
#   through the decay level's rate (V06's `decayLevel`, V11's `damage.materials`).
# - VV34-r2-16 (graded major; closes VAL-R2-03, MERGED): §6.3's key forms add the choir flight and the `cellarVault` (their
#   room's address) and the `cryptVault` cell (its room's address and its grid node, V04 §5.6 (2), whose V04 end names the
#   node, VV34-r2-03), with the one vault of a crypt holding no cell centre (judgment (5)).
# - VDC2-11 (R3-22 (a)): §7.7 item 1 — the latitude and the site's words the dossier's where it carries them (culture,
#   DR29; terrain type, access and deposits, DR1, DR19, DR42), else the generator's defaults; the partners' and the
#   deposits' bearings the generator's draws or the user's settings, never an input (VDC2-11's text).
# - VDC2-16 (closes VKr2-04 and VPC-R2-18, both MERGED): E-07's `addUndergroundAccess` row — the connector that finds no
#   route (II.7.6 step 3: `E_NO_PATH`, its two causes in II.7.6's words), the refusal naming the blocking building or the
#   water table, the basement not laid; keys `bend.under.basement`, `refuse.under.basement`, `refuse.under.route` (V09
#   writes their rows, VDC2-17). VPC-R2-18's key `refuse.access.route` not written (Part H's note).
# - VKr2-06 (R3-25 (a); closes VM-R2T-05, MERGED): §7.1's `drawWay` comment reads "its two ends its feet (§2.7's
#   `RaisedWayRecord.feet`)"; VM-R2T-05's comment text not written (R3-25 (a): the citation form), its case written at
#   the edit's prose home (judgment (2)).
# - VPC-R2-02 (R3-11, R3-09 (d); closes VDC2-09, MERGED): DR44 reads the `map` row of the source word V08 §3.16 (7) (b)
#   gives the overlay, `regional_migration_pressure` the refugee camp, the other regional_* pressures `none`.
# - VAH-r2-01 (R3-13): DR44 states a condition's tier — `public` where its map row gives a look, `secret` where it is
#   `none`, a key form listing the overlay's address admitting it whatever its tier (J-V8.128); V08 §3.16 (7) (e) cites it
#   (V08's END line).
#
# END LINES written this round (R3-01; Part H · determinism)
# - END of VAH-r2-02 (V08; R3-12): DR44's source clause — "a stressor's overlay draws no look while a condition's overlay
#   whose map row gives the same look kind stands (V08 §3.16 (7) (b))".
# - END of VPC-R2-03 (V08; R3-09 (d)): DR44 names "the `map` row of the source word V08 §3.16 (7) (b) gives the overlay (a
#   stressor's type, a simulator crisis event, the `calamity` word of a linked condition, else its archetype)".
# - END of VAT-r2-04 (rendering; R3-21): §7.7 item 1 — "the host's commands (§11.3: a week and a selection by `view.set`,
#   the layers shown by a logged `setLayer` sent by `doc.apply`, as a user's toggle)", the rest as it stood.
#
# JUDGMENT CALLS (vetoable)
# (1) VDC2-03: §6.5 (3)'s sentence naming CI's import-closure roots lists the CPU reference light pass beside the new
#     timeline function — both are in the lint's scope, and a scope member the closure does not start from is never
#     linted (the same root cause; the light pass was in scope since item 68 but not among the roots).
# (2) VKr2-06 / VM-R2T-05: §7.1's *Raised ways, aqueducts and retaining walls* said an end "elsewhere moves along the
#     course to the nearest [ground vertex]", silent on a stroke drawn beyond the frame; it now cites §2.7 *At the frame*
#     ("a course drawn beyond the frame bends to the arena's outer ring, its foot at the ring point"), so the edit's prose
#     and the record agree; the feet's form stays §2.7's alone.
# (3) VDC2-02: the registry clause sits after "never from the seed key" (the required change put it one clause earlier),
#     so "never from the seed key" stays with the spell's key it qualifies; content as required.
# (4) VDC2-01: "at that moment" for the kind's pick reads the rates that spent the gap's last part, so a rate change at
#     the very instant the integral reaches E (an hour boundary, a scrub) has one outcome.
# (5) VV34-r2-16: V04 §5.6 (2) keys a crypt whose ring holds no cell centre by its room's id alone (one `cryptVault`); the
#     key list names that form too, so §6.3's list is exhaustive (VAL-R2-03's reading).
# (6) DR44's rule cell is set as sentences — the chain (overlay → map row → look row → scale, placement, drawing); then
#     the map rows (their totality, R3-11's regional clause, the unmapped word, R3-12's pairing); then knowledge; then the
#     aftermath — so R3-09 (d)'s parenthesis and R3-11's clause read whole, unnested. "As a band-less reader" (V08 §3.16
#     (7) (e)'s words, which V08's END line drops when (e) becomes a citation) is carried into DR44, so nothing is lost.
# (7) VDC2-04 / VDC2-01: §6.5 (9)'s weather-timeline test also fixes a press at a moment with no live kind and a view
#     hour crossing a kind's `hours` under `light: 'time'` — principle (11): the edges §6.1 now defines are tested.
# (8) VDC2-16: the action cell's "the basement not laid" is attached to the refusal by a comma (a bent basement is
#     laid); the cause cell gives `E_NO_PATH`'s two causes in II.7.6 step 3's own words ("enclosed within
#     `foundationClearM` by …").
#
# HAND-OFFS (R3-01 (3): ends no line names; for round 4's verifiers)
# - V09 §4.21.14 (3) (l. 3650–3651) reads the spells "over V11's weather columns for the climate row and the view's week";
#   §6.1 and R3-23 (c) read them at §2.9's `yearWeek` with the sites and, under `light: 'time'`, the view hour. V09
#   §4.21.14 (4)'s closing "so the timeline replays from its seed, its clock and the presses (T124-9)" omits the climate
#   row, year position, sites and view hour in force, which §6.1's pure-function list now names; V09 may cite §6.1. (V09's
#   own VV910-r2-01 rewrites (4)'s dust-haze clause this round.)
#
# CHECKS (on scratch copies; live files untouched)
# - apply-blocks.py (the assembler's applier, unchanged) on a copy of the live base and rationale: 5 blocks found, 5
#   applied, 0 skipped; audit 5 × OK (present once); headings 153 → 153; fences balanced, 140 → 140 fence lines; title
#   block unchanged; rationale byte-identical; document 22 470 → 22 494 lines.
# - whole-document diff = 11 hunks, one per edit (l. 9352, 9382–9395, 9786–9803, 9914–9917, 10007–10009, 10073, 10220,
#   10380, 11687–11688, 11706–11707, 11896 of the live file); no other line moves.
# - doc_checks.py --sections 6.1,6.3,6.5,7.1,7.7 before and after: identical (C1 5/0, C2 1/0, C3 111/0, C4 0/0, S1 0/0;
#   exit 0) but S2 208 → 211, all three new hits the volume pointers the new text cites (V04 §5.6, V08 §3.16), reviewed by
#   the allow file (0 unreviewed). The tool warns the reference corpus is INCOMPLETE in this checkout (captures,
#   research/patreon, research/devlogs, research/ftg-docs, research/external absent): its clean-room result is NOT
#   authoritative — provisional until re-run on the machine that holds the corpus.
# - no review id (R2-nn, R3-nn, a verifier id) in any block's design text (R3-02).
#
# SIZE (principle (9)): §6.1, §6.3, §6.5, §7.1, §7.7 38 803 → 39 476 words (+673, +1.7 %): §6.1 +303, §6.3 +49, §6.5
#  +105, §7.1 +63, §7.7 +153. Removed: the bearing clause item 125 retires (restatement of no rule, replaced by DR29's,
#  DR1's, DR19's and DR42's sources). No word removed from content. The growth is the defined edges and wiring the issues
#  require (the live-rate timeline and its test, the marks' keys, the lint scope, E-07's no-route refusal, the element-id
#  forms, DR44's source word, regional clause, pairing and tier); a repair round adds no shrink of its own, the band
#  being the rewrite's (no unit shrinks here; the irreducible content is the owner's items 122–125 at build depth).
