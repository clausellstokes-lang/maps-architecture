"""edits_c — V06 §1b (R2-12's remaining names), §3.21 (the Accept row), §4.1, §4.3, §5.2 and §6 (tags: the issue or ruling)."""


def apply(sub, after_line):
    # ---- §1b: the access pass's slot, every remaining `AccessPass.run` (W3 and the scope row) -------------------------
    sub('R2-12 §1b AccessPassStrategy.run (W3, scope row)', "`AccessPass.run`", "`AccessPassStrategy.run`", count=6)

    sub('VM-R1T-09 R2-26 (b) §1b W57 both drops',
        "its stations, pier rings and `raised_too_tall` drop (V06 §3.19 (5))",
        "its stations, pier rings and `raised_too_tall` or `raised_too_long` drop (V06 §3.19 (5))")

    # ---- §3.21 (a): an Accept after edits (VV56-r1-04) -----------------------------------------------------------------
    sub('VV56-r1-04 R2-31 (b) §3.21 (a) advancing time',
        "| advancing time (V06 §4.1) | a request with no change; one epoch; a skeleton's `history` block with bad entries; a "
        "standalone neighbourhood document | as V06 §3.3.2; one epoch; the bad entries dropped, reported; the bend line |",
        "| advancing time (V06 §4.1) | a request with no change; one epoch; a skeleton's `history` block with bad entries; a "
        "standalone neighbourhood document; an Accept after edits that raise the estimate | as V06 §3.3.2; one epoch; the bad "
        "entries dropped, reported; the bend line; the epochs folded again at the cadence the estimate chooses on the current "
        "head, the card's line naming it |")

    # ---- §4.1 ------------------------------------------------------------------------------------------------------
    sub('VV56-r1-04 R2-31 (b) §4.1 Accept after edits',
        "so the accept's wait is its commit; otherwise the epochs fold again under\n"
        "  the estimate the preview ran with.",
        "so the accept's wait is its commit; otherwise the epochs fold again at\n"
        "  the cadence V06 §6.8's estimate chooses on the current head (V06 §3.3.2), the card's line naming it where it differs\n"
        "  from the preview's.")
    sub('VAT1-03 R2-19 §4.1 undo',
        "An epoch that carried a dossier event is never an undo target (§7.4), so a dossier-bound\n"
        "  history is undone only by the host (T-V6-23).",
        "No event of the port's session `host:port` — a port epoch, with or without a dossier change, a\n"
        "  dossier event — is an undo, redo or revert target (§7.4 *Replay semantics*), so a dossier-bound history is undone only\n"
        "  by the host (T-V6-23; T-V6-27).")

    # ---- §4.3 ------------------------------------------------------------------------------------------------------
    sub('R2-18 VEL1-04 §4.3 protection and a dossier event',
        "so holding a thing\n"
        "  never shifts which other things the history picks — the town adapts around it. **A removed generated raised way,",
        "so holding a thing\n"
        "  never shifts which other things the history picks — the town adapts around it. A dossier event is the one exception,\n"
        "  by §7.7's precedence: a lock or pin on what it changes is superseded and reported orphaned, and a population fall\n"
        "  reaches a locked or pinned dwelling by a `relet`, never a `vacate` of its last household (V06 §3.5.1 (4)–(5)).\n"
        "  **A removed generated raised way,")
    sub('VAT1-03 R2-19 §4.3 undo across epochs',
        "the conflict then offers \"re-run from before\n"
        "  it\" (V06 §4.4) instead. The replay's epochs are no undo targets (V06 §3.20.7).",
        "the conflict then offers \"re-run from before\n"
        "  it\" (V06 §4.4) instead. No event of the port's session `host:port` — a port epoch, with or without a dossier change,\n"
        "  a dossier event — is an undo, redo or revert target (§7.4 *Replay semantics*), nor are the replay's epochs (V06\n"
        "  §3.20.7).")

    # ---- §5.2 ------------------------------------------------------------------------------------------------------
    sub('VV56-r1-02 R2-40 (1) §5.2 Years',
        "dossier-bound, the host's calendar year when `HostContext` gives one, else the same form. The year numbering is\n"
        "  display only.",
        "dossier-bound, the same form (the map reads no host calendar; item 125 (a)). The year numbering is display only.")

    # ---- §6 head ---------------------------------------------------------------------------------------------------
    sub('VV56-r1-01 R2-31 (a) §6 head',
        "the two waits a user sits through once that this\n"
        "volume makes, an `advance` and a history-first generation, each finish inside §12's ten-second **comfort level** in total,\n"
        "whatever their span, by V06 §6.8's estimate and coarsening (item 119 (a2); J132).",
        "the two waits a user sits through once that this\n"
        "volume makes, an `advance` and a history-first generation, each finish inside §12's ten-second **comfort level** in total,\n"
        "whatever their span, by V06 §6.8's estimate and coarsening (item 119 (a2); J132), and a dossier catch-up's epochs are\n"
        "coarsened by the same estimate inside §12's waits for a dossier change applied and an open from SettlementForge (V06\n"
        "§6.8 (6)).")

    # ---- §6.8 ------------------------------------------------------------------------------------------------------
    sub('VV56-r1-01 §6.8 title',
        "**6.8 The comfort level — `advance` and the history replay in total**",
        "**6.8 The comfort level — `advance`, the history replay and a dossier catch-up in total**")
    sub('VV56-r1-01 §6.8 (1) one function',
        "1. **The estimate** — one function for both, of the epochs it is given and of the document (an `advance`) or the recipe\n"
        "   (the replay) at the request,",
        "1. **The estimate** — one function for all three, of the epochs it is given and of the document (an `advance`, a\n"
        "   catch-up) or the recipe (the replay) at the request,")
    sub('VV56-r1-01 §6.8 (1) I_i',
        "and before it the islands standing at the request: an `advance`'s document's, none in a\n"
        "     replay",
        "and before it the islands standing at the request: an `advance`'s or a catch-up's document's,\n"
        "     none in a replay")
    sub('VV56-r1-01 §6.8 (1) H',
        "`H` is the hand-placed accesses standing at the request (an `advance` only; a replay runs before any edit)",
        "`H` is the hand-placed accesses standing at the request (an `advance` or a catch-up; a replay runs before any edit)")
    sub('VV56-r1-01 §6.8 (3) the catch-up',
        "whose\n"
        "   epochs' `E` is at most `replay.budgetMs[the peak's rung]` and whose count is at most `replay.maxEpochs`.",
        "whose\n"
        "   epochs' `E` is at most `replay.budgetMs[the peak's rung]` and whose count is at most `replay.maxEpochs`; a dossier\n"
        "   catch-up's step the smallest whole number k of crossed year ends whose epochs' `E` is at most `advance.budgetMs` (6).")
    sub('VV56-r1-01 R2-31 (e) §6.8 (5) progress',
        "the replay's (\"Replaying the town's\n"
        "   past: {year}\");",
        "the replay's (\"Replaying the town's\n"
        "   past: {year}\"); a coarsened catch-up's at its cadence (V09's `progress.dossier` row);")
    sub('VV56-r1-01 R2-31 (a) §6.8 (6) the dossier catch-up',
        "A dossier-bound document's epochs are the port's cadence (§4.11 *The clock*) and are never\n"
        "   coarsened — the host's clock owns its time (item 20) — each priced at 6.1–6.2 inside §12's waits for a dossier change\n"
        "   and an open from SettlementForge.",
        "A dossier-bound document's epochs follow the port's cadence (§4.11 *The clock* (4)) while\n"
        "   estimate (1) over a catch-up's epochs fits `advance.budgetMs`; above it the catch-up folds one epoch per k crossed year\n"
        "   ends, k the smallest whole number whose estimate fits — every dossier event still at its own week (§4.11 *The clock*\n"
        "   (2)), a calamity entering the coarse epoch that holds its week, at its week, the population crossings read into the\n"
        "   coarse epochs' targets, the last epoch at the dossier's week, every epoch reading the new digest's slices as every\n"
        "   catch-up epoch does (J-V8.25) — the cadence reported in `EpochReport.advance` and the port's report; one epoch over the\n"
        "   span always fits (6.8 (3)), so no catch-up is refused or shortened (item 101 R2; J-V6.136).")

    # ---- §6.9 (new paragraph, after §6.8): the hand-over's and the decay level's costs ------------------------------
    after_line('G122-V06 G123-V06 §6.9 budgets',
               "   span always fits (6.8 (3)), so no catch-up is refused or shortened (item 101 R2; J-V6.136).",
               "\n"
               "**6.9 The crisis hand-over and the decay level** (V06 §3.22, V06 §3.23; targets, PLAUSIBLE until E0). `frontierFor` —\n"
               "the growth decision on the camp's households (no draw, ≤ 1 ms) and S5a's level set of `T` as it stands, `T` being one\n"
               "field computed at S3 (§4.4 S5a) — ≤ 5 ms at CITY and ≤ 15 ms at METROPOLIS, once per (model digest, households),\n"
               "memoized in memory, so §10.2's placement reads it at no further cost while the model holds. `crisisLookYields` reads\n"
               "a building's Works links, ≤ 1 µs a building. `decayLevel` and `decayPeak` read the lineage's lifecycle events (§2.8)\n"
               "dated by the history index (V06 §2.11) and a restoring Works' fraction, ≤ 2 µs a building, read only for the buildings a\n"
               "drawing shows abandoned, decayed or ruined (a tile's, an exterior's, a plan's one building): ≤ 1 ms per tile at the\n"
               "densest, inside §12.5's drawing budgets. None runs in an epoch, so none touches 6.1–6.8.")
