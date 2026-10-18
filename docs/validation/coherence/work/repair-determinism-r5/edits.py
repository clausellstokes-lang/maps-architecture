"""edits.py — the count-asserted edits of lane coherence/repair-determinism-r5 (read by gen.py).

Each entry: (heading prefix, marker A, marker B, [(old, new, count)], wrap, issue ids[, (first indent, rest indent)]).
A prose span's `old` strings are matched on the span joined into one line (single spaces); a code or table line's on
the line itself. Every id the edit closes is listed; a MERGED id is closed by its target's edit. Binding:
adjudication-r5.md (R5-01, R5-02, R5-03, R5-04; Part H · determinism), with R3-01 – R3-03 and R4-01 standing.
"""
H53, H54, H63, H65 = '### 5.3 ', '### 5.4 ', '### 6.3 ', '### 6.5 '
H71, H73, H74, H77 = '### 7.1 ', '### 7.3 ', '### 7.4 ', '### 7.7 '

RW = "§2.7's support step"

# ---- §7.1's outcome table: R5-02's D1 rows (VDC4-04's FIX; END of VEW-r4-01; VDC4-03's FIX, amended: one row, two
# keys, each outcome naming the key its line takes — HAND-OFF to V09 for `bend.raised.around`'s words on a channel).
OLD_HELD = ("| a hand `convert` `breach` or `dismantle` of an enceinte stretch meeting the stretch held under a raised "
            "way's crossing station while its deck stands (§2.7's support step (3)) | bent | the op on its stretch less "
            "the held stretch, named in one line; an op wholly on the held stretch changes nothing, with its line | "
            "`bend.wall.held` |")
NEW_HELD = ("| a hand `convert` `breach` or `dismantle` of an enceinte stretch, or a `delete` of the enceinte or of its "
            "raised gate or wall opening there, meeting the stretch held under a raised way's crossing station while its "
            "deck stands (§2.7's support step (3)) | bent | the op on its stretch less the held stretch, named in one "
            "line; an op wholly on the held stretch changes nothing, with its line; a `delete` of the enceinte takes the "
            "rest as a `dismantle` of every other run, the record kept with the held stretch standing as a free-standing "
            "gate tower or arch carrying the deck (as `wallToWay` and `absorbWall` leave it, V06 §3.7.6 (5)) | "
            "`bend.wall.held` |")
OLD_CROSS = ("| a hand `drawWall`, a moved trace vertex or a re-anchored stretch across a standing raised way (§2.7's "
             "support step (6) (b)) | bent | the trace through the raised way's station on the deck at its level nearest "
             "where it would cross; its setback, glacis, berm and channel stopped at the under-deck strip's edges where a "
             "support, ramp, stair or foot stands in them or the span is `vault`; the raised way unchanged but that "
             "station's support; named in one line | `bend.wall.raisedCrossing` |")
NEW_CROSS = ("| a hand `drawWall`, a moved trace vertex or a re-anchored stretch across a standing raised way (§2.7's "
             "support step (6) (d)) | bent | the stretch on its course beneath the deck, built against each support, "
             "ramp, stair, foot or `vault` span in its band and topped at a span's soffit, no gate or tower in the "
             "under-deck strip (moved along the way or the trace clear of it), its setback, glacis and berm stopped at "
             "the under-deck strip's edges and its channel passing beneath only where it meets none of these; the raised "
             "way unchanged; named in one line | `bend.wall.raisedCrossing` |")
OLD_UNDER = ("| a ground `drawWay`, a moved way or a carve meeting a standing raised way's supports, ramps, stairs, feet or "
             "a `vault` span's strip, or crossing its under-deck strip elsewhere than under an `open` span (§4.3; §2.7's "
             "support step (6) (b)) | bent | the way or channel moved to cross under the nearest `open` span that holds "
             "it, named in one line | `bend.raised.underSpan` |")
NEW_UNDER = ("| a ground `drawWay`, a moved way or a hand carve meeting a standing raised way's supports, ramps, stairs, "
             "feet or a `vault` span's strip, or crossing its under-deck strip where §4.3's crossing rule does not admit "
             "it (§2.7's support step (6) (a)–(b)) | bent | the way or channel moved along the deck to cross under the "
             "nearest span that admits it (`bend.raised.underSpan`); where none does (`bend.raised.around`), a way takes "
             "another course by §4.3's router as a route does — round the raised way — else the nearest routable pair "
             "(§4.3 *Two-point roads*; item 101 R2), and a carve's channel stops at the under-deck strip's edges, ending "
             "against the ground as against a berm; named in one line | `bend.raised.underSpan`, `bend.raised.around` |")

EDITS = [
    # ---- §5.3: a way crosses a trace only at a gate — scoped to ground part 0, a raised deck pointed to its rule
    # (R5-01 (2)'s sweep of R5-02: the row restates the crossing R5-02 changes for a deck over a later stretch).
    (H53, "| a way crosses an enceinte's trace only at a gate (§4.2 S3 (7), §4.8):",
     "| a way crosses an enceinte's trace only at a gate (§4.2 S3 (7), §4.8):", [
        ("| a way crosses an enceinte's trace only at a gate (§4.2 S3 (7), §4.8):",
         "| a way on ground part 0 crosses an enceinte's trace only at a gate (§4.2 S3 (7), §4.8):", 1),
        ("(item 114's openings; V07 §3.12a (4) (d)) | batch-local |",
         "(item 114's openings; V07 §3.12a (4) (d)); a raised way's deck, on its own part, meets a trace by " + RW
         + " (3) and (6) (d) (§4.8 *Gates*) | batch-local |", 1),
    ], False, ['R5-02 sweep']),
    # ---- §5.3's gate row: R5-02's D4 (END of R5-02, the adjudicator's sweep).
    (H53, "| every gate joined to the network and the plaza;", "| every gate joined to the network and the plaza;", [
        ("the roads leaving each walled stage equal its gate count",
         "the roads leaving each walled stage (on ground part 0 or at a raised gate; a deck passing over a stretch laid "
         "after its raised way is no crossing, " + RW + " (6) (d)) equal its gate count", 1),
        ("an outer enceinte's gates ≥ its arterial crossings;",
         "an outer enceinte's gates ≥ its arterial crossings (on ground part 0 or at a raised gate; a deck passing over "
         "a stretch laid after its raised way is no crossing, " + RW + " (6) (d));", 1),
    ], False, ['R5-02 D4']),
    # ---- §5.4's `warnings` comment: VM-R4T-04 in VPC-R4-03's words (R5-02's D5; closes VPC-R4-03, MERGED).
    (H54, "warnings?: Record<string, number> /* a stage's own non-kernel warning codes",
     "warnings?: Record<string, number> /* a stage's own non-kernel warning codes", [
        ("S10b's `W_DOSSIER_EDGE` (§4.7 S10b) and the underground's",
         "S10b's `W_DOSSIER_EDGE` (§4.7 S10b), S5a's and S7's `W_RAISED_CROSSING` (" + RW
         + " (6); §4.4 *Outer moats*; §4.8) and the underground's", 1),
    ], False, ['VM-R4T-04', 'VPC-R4-03']),
    # ---- §6.3 *Plan damage*: both sentences (VDC4-01, FIX per R5-04 — R5-04's citation "(a)–(b)" for the entry week).
    (H63, "* **Plan damage — one threshold per plan element, no new id (g item 123; J136).**",
     "plan's re-cut mints (V03 §3.11) draws by its own new id;", [
        ("the element shows damaged exactly while the level is above 0 and at least t — but for §2.6 step 7's one case "
         "without a threshold",
         "the element shows damaged exactly while the level is above 0 and at least t, compared only from its entry "
         "week into the plan (V03 §5.6 (2) (a)–(b); for an element a restoring event's re-cut mints, the week that "
         "restoration ends, before which it draws as built, V06 §3.23 (3)) — but for §2.6 step 7's one case without a "
         "threshold", 1),
        ("A level of 0 damages nothing else, so a building never decayed draws its plan unchanged (`item123.damage`)",
         "A level of 0 damages nothing else, so a building never decayed and under no disaster look (§2.6 step 7) "
         "draws its plan unchanged (`item123.damage`)", 1),
    ], True, ['VDC4-01']),
    # ---- §6.5 (9)'s *plan damage* test: its level-0 clause restates §6.3's sentence (R5-01 (2)'s sweep of R5-04).
    (H65, "* *plan damage* (g item 123) — for every building of a B-CITY-lite fixture",
     "damaged at every level (§2.6 step 7);", [
        ("and a level of 0 draws the plan byte-identically (`item123.damage`; §6.3 *Plan damage*)",
         "and a level of 0 under no disaster look draws the plan byte-identically (`item123.damage`; §6.3 *Plan "
         "damage*)", 1),
    ], True, ['R5-04 sweep']),
    # ---- §7.1's `dossierFacts` event: `lateCalamities` (END of VAT4-r4-01; R5-03).
    (H71, "| { t: 'dossierFacts'; changes: DossierChange[]", "| { t: 'dossierFacts'; changes: DossierChange[]", [
        ("quarantined: { key: string; reason: string; since: number }[]; notes: PortNote[];",
         "quarantined: { key: string; reason: string; since: number }[]; lateCalamities: string[] /* the whole held "
         "list after this absorb (§4.11 *The clock* (4); V08 §3.6 (4)) */; notes: PortNote[];", 1),
    ], False, ['R5-03 END (VAT4-r4-01)']),
    # ---- §7.1's outcome table: R5-02's D1 (three rows) and the catch-all (END of VDC4-06).
    (H71, "| a hand `convert` `breach` or `dismantle` of an enceinte stretch meeting the stretch held",
     "| a hand `convert` `breach` or `dismantle` of an enceinte stretch meeting the stretch held",
     [(OLD_HELD, NEW_HELD, 1)], False, ['VDC4-04']),
    (H71, "| a hand `drawWall`, a moved trace vertex or a re-anchored stretch across a standing raised way",
     "| a hand `drawWall`, a moved trace vertex or a re-anchored stretch across a standing raised way",
     [(OLD_CROSS, NEW_CROSS, 1)], False, ['R5-02 D1 (END of VEW-r4-01)']),
    (H71, "| a ground `drawWay`, a moved way or a carve meeting a standing raised way's supports",
     "| a ground `drawWay`, a moved way or a carve meeting a standing raised way's supports",
     [(OLD_UNDER, NEW_UNDER, 1)], False, ['VDC4-03']),
    (H71, "| every other infeasible declaration (item 101 R2) | bent |", "| every other infeasible declaration (item 101 R2) | bent |", [
        ("a wall's ridge, reach, waterfront, open ground and aqueduct arch,",
         "a wall's ridge, reach, waterfront and open ground, the arch a wall takes for an aqueduct drawn across it,", 1),
    ], False, ['END of VDC4-06']),
    # ---- §7.3's S7 row: R5-02's D2.
    (H73, "| S7 (`drawWall`, a moved trace vertex, `wallToWay`, `gateToJunction`,",
     "| S7 (`drawWall`, a moved trace vertex, `wallToWay`, `gateToJunction`,", [
        ("on each standing raised way the new run crosses, the run bent through its nearest station on the deck at its "
         "level and its strips stopped under the deck where they cannot pass (§2.7's support step (6) (b)) — that "
         "raised way's crossing station in the effective scope and the fate report (§7.3 item 4), nothing else of it "
         "re-derived",
         "on each standing raised way the new run meets, the run passing beneath its deck and its strips stopped at the "
         "under-deck strip's edges (" + RW + " (6) (d)) — nothing of the raised way re-derived or in the effective "
         "scope", 1),
    ], False, ['R5-02 D2']),
    # ---- §7.4's `dossierFacts` row: the binding's lists, `lateCalamities` among them, and its reader (END of
    # VAT4-r4-01: the binding's lifecycle, as for `quarantined` — written by the fold, no undo target).
    (H74, "| dossierFacts / dossierRecord (V08) | the port only", "| dossierFacts / dossierRecord (V08) | the port only", [
        ("| `Document.dossier` (the ledger's fold); the staged records (§2.7) |",
         "| `Document.dossier` (the ledger's fold — `DossierBinding.quarantined`, `.lateCalamities` and `.notes` among "
         "it, each rebuilt by folding the `dossierFacts` events, §7.7; `lateCalamities` read by the port's next "
         "absorb, §4.11 *The clock* (4)); the staged records (§2.7) |", 1),
    ], False, ['R5-03 END (VAT4-r4-01)']),
    # ---- §7.4's raised-way row, lock cell: R5-02's D3.
    (H74, "| a raised way | `drawWay` with `raised`, T9 `shape`'s span, crossing and measure paths |",
     "| a raised way | `drawWay` with `raised`, T9 `shape`'s span, crossing and measure paths |", [
        ("its deck and piers held (a later trace's crossing station taking the band's stretch, §2.7's support step (6) "
         "(b));",
         "its deck and piers held, as every raised way is from its creation (" + RW + " (6));", 1),
    ], False, ['R5-02 D3']),
    # ---- §7.7's `DossierBinding`: `lateCalamities` (END of VAT4-r4-01; R5-03).
    (H77, "  quarantined: { key: string; reason: string; since: number /* the seq of the dossierFacts event that first",
     "  quarantined: { key: string; reason: string; since: number /* the seq of the dossierFacts event that first", [
        ("carried it */ }[];",
         "carried it */ }[];\n  lateCalamities: string[] /* the binding keys of late calamities held for the first "
         "epoch a later absorb folds (§4.11 *The clock* (4)); set by folding each dossierFacts event's list, as "
         "quarantined is; [] in an older document */;", 1),
    ], False, ['R5-03 END (VAT4-r4-01)']),
    # ---- §7.7 item 1: the host's layer command in R4-02's terms (VRC4T-07).
    (H77, "(T125-2) — and the host's commands (§11.3: a week and a selection by `view.set`, the layers shown by a logged",
     "`setLayer` sent by `doc.apply`, as a user's toggle) are commands, never inputs,", [
        ("the layers shown by a logged `setLayer` sent by `doc.apply`, as a user's toggle)",
         "a layer's visibility by a logged `setLayer` sent by `doc.apply`, as a user's toggle)", 1),
    ], True, ['VRC4T-07']),
    # ---- §7.7 item 6: an element change's week — a late one never before the last epoch's (R5-01 (2)'s sweep of R5-03).
    (H77, "these events and epochs by §4.11's cadence (item 76): an element change folds at its own week as a standalone",
     "`EpochInputs`.", [
        ("an element change folds at its own week as a standalone dossier event, in the host's order;",
         "an element change folds at its own week as a standalone dossier event, in the host's order — a late one, "
         "dated at or before the last epoch's week, never at a week before it (§4.11 *The clock* (4));", 1),
    ], True, ['R5-03 sweep']),
]
