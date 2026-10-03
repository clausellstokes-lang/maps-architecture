"""edits.py — the count-asserted edits of lane coherence/repair-determinism-r4 (read by gen.py).

Each entry: (heading prefix, marker A, marker B, [(old, new, count)], wrap, issue ids[, (first indent, rest indent)]).
A prose span's `old` strings are matched on the span joined into one line (single spaces); a code or table line's on
the line itself. Every id the edit closes is listed; a MERGED id is closed by its target's edit. Binding:
adjudication-r4.md (R4-01, R4-09, R4-14, R4-15; Part H · determinism), with R3-01 – R3-03 standing.
"""
H51, H61, H63, H65 = '### 5.1 ', '### 6.1 ', '### 6.3 ', '### 6.5 '
H71, H73, H74, H75, H76, H77 = '### 7.1 ', '### 7.3 ', '### 7.4 ', '### 7.5 ', '### 7.6 ', '### 7.7 '

# R4-09's three dry-run rows, before §7.1's catch-all bend row: VDC3-05's `bend.wall.held` as written, R4-09's
# `bend.wall.raisedCrossing` (VDC3-05's second row, amended), R4-09's `bend.raised.underSpan` (END of VEW-r3-01).
ROW_HELD = ("| a hand `convert` `breach` or `dismantle` of an enceinte stretch meeting the stretch held under a raised "
            "way's crossing station while its deck stands (§2.7's support step (3)) | bent | the op on its stretch less "
            "the held stretch, named in one line; an op wholly on the held stretch changes nothing, with its line | "
            "`bend.wall.held` |")
ROW_CROSS = ("| a hand `drawWall`, a moved trace vertex or a re-anchored stretch across a standing raised way (§2.7's "
             "support step (6) (b)) | bent | the trace through the raised way's station on the deck at its level nearest "
             "where it would cross; its setback, glacis, berm and channel stopped at the under-deck strip's edges where a "
             "support, ramp, stair or foot stands in them or the span is `vault`; the raised way unchanged but that "
             "station's support; named in one line | `bend.wall.raisedCrossing` |")
ROW_UNDER = ("| a ground `drawWay`, a moved way or a carve meeting a standing raised way's supports, ramps, stairs, feet or "
             "a `vault` span's strip, or crossing its under-deck strip elsewhere than under an `open` span (§4.3; §2.7's "
             "support step (6) (b)) | bent | the way or channel moved to cross under the nearest `open` span that holds "
             "it, named in one line | `bend.raised.underSpan` |")
CATCH_ALL = "| every other infeasible declaration (item 101 R2) | bent |"

EDITS = [
    # ---- §5.1 (8): a review id out of design text (VDC3-08).
    (H51, '8. **A bug abort ends in a defined state** (DWG-01).', '8. **A bug abort ends in a defined state** (DWG-01).', [
        ('8. **A bug abort ends in a defined state** (DWG-01).', '8. **A bug abort ends in a defined state.**', 1),
    ], False, ['VDC3-08']),
    # ---- §6.1's attempt component: a review id out of design text (VDC3-08).
    (H61, 'its own cap overrides the default (DIC-02:', 'its own cap overrides the default (DIC-02:', [
        ("(DIC-02: no concern's number of draws changes)", "(no concern's number of draws changes)", 1),
    ], False, ['VDC3-08']),
    # ---- §6.1 *The weather stream*: a press while a spell is in force (VDC3-01); the pure-function list takes the
    # `light` mode (VDC3-09), and so does the rate sentence that names the inputs changing the live rate (its sweep).
    # One span to the bullet's end, so the paragraph re-wraps whole.
    (H61, "`hours` hold the view's hour (§2.9's `time` key). So a time", "the climate columns' (V11) and §8.2's, never a draw's.", [
        ("a change of the year position, the climate row, the sites or the hour changes the rate from that moment",
         "a change of the year position, the climate row, the sites, the `light` mode or the hour changes the rate from "
         "that moment", 1),
        ("(§7.8: never a silent no-op). Switching the effects off",
         "(§7.8: never a silent no-op). A press while a spell is in force ends that spell first: its strength falls from "
         "its present value to 0 at its kind's fade rate (§8.4 (i)), and the pressed spell — of the commonest live kind "
         "at the press — starts the moment it reaches 0, so one spell is in force at a time and no light term steps "
         "faster than §8.4 (i) allows (T124-7); a further press before then changes nothing. Switching the effects off",
         1),
        ("the climate row, year position, sites and view hour in force at each moment",
         "the climate row, year position, sites, `light` mode and view hour in force at each moment", 1),
    ], True, ['VDC3-01', 'VDC3-09']),
    # ---- §6.3 *Plan damage*: §2.6 step 7's one case without a threshold named at the comparison's home (VDC3-02 per
    # R4-14); "a level of 0 damages nothing" conformed to it (R4-01 (2)'s sweep).
    (H63, "`decayLevel`, derived and never stored; §2.6 step 7): the element shows damaged",
     "and so its threshold.", [
        ("the element shows damaged exactly while the level is above 0 and at least t — a level of 0 damages nothing, "
         "so a building never decayed",
         "the element shows damaged exactly while the level is above 0 and at least t — but for §2.6 step 7's one case "
         "without a threshold: a roof bay over a room of a roofless wing (`RoofSpec.kind` `none`) of a `decayed` or "
         "`ruined` building is damaged whatever its t and level. A level of 0 damages nothing else, so a building never "
         "decayed", 1),
    ], True, ['VDC3-02']),
    # ---- §6.5 (9) *plan damage*: the level-0 clause conformed to the roofless case (R4-01 (2)'s sweep of VDC3-02).
    (H65, '(T123-1), and a level of 0 draws the plan byte-identically', '(T123-1), and a level of 0 draws the plan byte-identically', [
        ("a level of 0 draws the plan byte-identically (`item123.damage`; §6.3 *Plan damage*);",
         "a level of 0 draws the plan byte-identically (`item123.damage`; §6.3 *Plan damage*) but for a `decayed` or "
         "`ruined` building's roof bays over a roofless wing's rooms, damaged at every level (§2.6 step 7);", 1),
    ], True, ['VDC3-02']),
    # ---- §6.5 (9) *weather timeline*: a press while a spell is in force (VDC3-01).
    (H65, '* *weather timeline* (g item 124)', 'effects on and off (§6.1 *The weather stream*);', [
        ("and so does a view hour crossing a kind's `hours` under `light: 'time'` (T124-9);",
         "and so does a view hour crossing a kind's `hours` under `light: 'time'`, and a press while a spell is in "
         "force, the running spell fading out before the pressed one starts (T124-9);", 1),
    ], True, ['VDC3-01']),
    # ---- §7.1's outcome table: the named-row delete (VV1112-r3-04).
    (H71, '| an `editTable` row `delete`, or a pack\'s patch, removing a row readers fall back to',
     '| an `editTable` row `delete`, or a pack\'s patch, removing a row readers fall back to', [
        ("removing a row readers fall back to — the schema's `defaultRow`, a `TotalityRule.allowFallback` target, the "
         "only row covering a value a totality rule requires, or the last row of a table not `mayEmpty` (V11 §4.1; "
         "J-V11.113)",
         "removing a row readers fall back to or need — the schema's `defaultRow`, a `TotalityRule.allowFallback` "
         "target, the only row covering a value a totality rule requires (a `crisis.looks` row for its look kind and a "
         "`damage.elements` row for its element kind among them), a table's named row (V11 §2.1's settings form: "
         "`settings`, `structure`, `festival.staging`'s `fallback`), or the last row of a table not `mayEmpty` (V11 "
         "§4.1; J-V11.113)", 1),
    ], False, ['VV1112-r3-04']),
    # ---- §7.1's outcome table: the three raised-way bends before the catch-all row (VDC3-05 per R4-09, amended;
    # END of VEW-r3-01).
    (H71, CATCH_ALL, CATCH_ALL, [
        (CATCH_ALL, '\n'.join([ROW_HELD, ROW_CROSS, ROW_UNDER, CATCH_ALL]), 1),
    ], False, ['VDC3-05', 'END VEW-r3-01']),
    # ---- §7.3 item 3's S7 row: the crossed raised way held, its crossing station in the scope and the fate report
    # (VDC3-07 per R4-09, amended; closes VM-R3T-09, MERGED). R4-09's "fate sheet" is written as the set's term for
    # §7.3 item 4's list, "fate report" (principle (2): no "fate sheet" exists in the set; V09's UI is the "fates sheet").
    (H73, '| S7 (`drawWall`, a moved trace vertex', '| S7 (`drawWall`, a moved trace vertex', [
        ("re-derive the strip blocks' S10 step (0) | the rest of the trace",
         "re-derive the strip blocks' S10 step (0); on each standing raised way the new run crosses, the run bent through "
         "its nearest station on the deck at its level and its strips stopped under the deck where they cannot pass "
         "(§2.7's support step (6) (b)) — that raised way's crossing station in the effective scope and the fate report "
         "(§7.3 item 4), nothing else of it re-derived | the rest of the trace", 1),
    ], False, ['VDC3-07', 'VM-R3T-09']),
    # ---- §7.4's edge-boundary table, a raised way's lock column (END of VM-R3T-06).
    (H74, '| a raised way | `drawWay` with `raised`', '| a raised way | `drawWay` with `raised`', [
        ("its deck and piers held; a raised way over a locked way",
         "its deck and piers held (a later trace's crossing station taking the band's stretch, §2.7's support step (6) "
         "(b)); a raised way over a locked way", 1),
    ], False, ['END VM-R3T-06']),
    # ---- §7.5's `UpgradeDiff` comment: a review id out of design text (VDC3-08).
    (H75, 'interface UpgradeDiff {', 'interface UpgradeDiff {', [
        ("never stored (DWG-02); §14's migrate returns it", "never stored; §14's migrate returns it", 1),
    ], False, ['VDC3-08']),
    # ---- §7.6: two review ids out of design text (VDC3-08).
    (H76, 'type TableId = string;', 'type TableId = string;', [
        ("'era' … (MC-11);", "'era' …;", 1),
    ], False, ['VDC3-08']),
    (H76, 'never moves an output version (V12-XCONF-2;', 'never moves an output version (V12-XCONF-2;', [
        ("(V12-XCONF-2; V11 §3.2.1 step 7 computes it so)", "(V11 §3.2.1 step 7 computes it so)", 1),
    ], False, ['VDC3-08']),
    # ---- §7.7's `Assignment.drift` comment: a review id out of design text (VDC3-08).
    (H77, 'typed in §2.6 (MC-11)', 'typed in §2.6 (MC-11)', [
        ("typed in §2.6 (MC-11) */", "typed in §2.6 */", 1),
    ], False, ['VDC3-08']),
    # ---- §7.7 item 10: a fallback at an absorb changes nothing (END of VEL3-r3-02; R4-15 (a)).
    (H77, "the generator's own choice exactly as on a map made without a dossier, reported with the fallback taken",
     '(b); T125-1); a missing input never refuses', [
        ("reported with the fallback taken (item 125 (b); T125-1); a missing input",
         "reported with the fallback taken (item 125 (b); T125-1) — at an absorb a field that takes its fallback changes "
         "nothing, the carried fact standing (V08 §3.5); a missing input", 1),
    ], True, ['END VEL3-r3-02']),
    # ---- DR44: the totality sentence and its bar name the crisis events (VDC3-04); the key-form clause cites its
    # decision only (VAH-r3-07).
    (H77, '| DR44 |', '| DR44 |', [
        ("every SettlementForge stressor type and condition archetype at the pinned baseline has exactly one",
         "every SettlementForge stressor type, condition archetype and crisis event at the pinned baseline has exactly "
         "one", 1),
        ("a key form listing the overlay's address admits it whatever its tier (V08 §3.16 (7) (e); J-V8.128)",
         "a key form listing the overlay's address admits it whatever its tier (J-V8.128)", 1),
        ("every SettlementForge stressor type and condition archetype at the baseline has its `map` row (T122-4)",
         "every SettlementForge stressor type, condition archetype and crisis event at the baseline has its `map` row "
         "(T122-4)", 1),
    ], False, ['VDC3-04', 'VAH-r3-07']),
    # ---- §7.7 item 12's key law: the settlement key's fallbacks (VDC3-03 per R4-15 (c)).
    (H77, '| the settlement | `settlement:<id>`', '| the settlement | `settlement:<id>`', [
        ("`settlement:<id>` — the dossier's own id, stable across reloads, same-seed regeneration and section rerolls; a "
         "new id is a new dossier and a new map",
         "`settlement:<id>` — the dossier's own id; where the dossier's `id` is empty or not of its line's form, at a "
         "creation `settlement:map:<mapId>`, the creating map's id, kept for the document's life (a later readable `id` "
         "neither replaces it nor is checked against it), and at an absorb the bound document's key (V08 §2.4's `id` "
         "row; item 125 (b)) — stable across reloads, same-seed regeneration and section rerolls; between readable ids, "
         "a new id is a new dossier and a new map", 1),
    ], False, ['VDC3-03']),
]
