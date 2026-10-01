# edits_a — the reference, rule-wording and shared-name fixes (each tagged with the issue ids or ruling it closes).
# (ids, old, new, count): `old` must occur exactly `count` times in the text as it stands when the edit runs.
EDITS = [
    # VAH-r1-16 (R2-10): the reader's and the oracle's types are §11.2's.
    ('VAH-r1-16', "`asNow` modes (V10's `WhyAnswer`)", "`asNow` modes (§11.2's `WhyAnswer`)", 1),

    # VAH-r1-20 (R2-11): derivation rows cited by number — W77 (DR41), W80 (DR42), W81 (DR43).
    ('VAH-r1-20 R2-11', "| at generation §7.7's readiness-and-wealth row; at an epoch V06 §3.7's walls step",
     "| at generation §7.7's DR41; at an epoch V06 §3.7's walls step", 1),
    ('VAH-r1-20', "the view's year position (§2.9), §7.7's calendar row (the dossier's week),",
     "the view's year position (§2.9), §7.7's DR42 (the dossier's week),", 1),
    ('VAH-r1-20', "festival display (§2.9); §7.7's `traditions` row (window, staging);",
     "festival display (§2.9); §7.7's DR43 (window, staging);", 1),
    # R2-11 at its other citations (V07 §3.4 (8), V07 §3.11, T-V7-62, J-V7.135).
    ('R2-11', "   is §7.7's readiness-and-wealth derivation row (item 114 (d); a dossier village's `readiness` label and wealth, V08), and",
     "   is §7.7's DR41 (item 114 (d); a dossier village's `readiness` label and wealth, V08), and", 1),
    ('R2-11', "The palisade's generation-time condition is §7.7's item-114 row\n",
     "The palisade's generation-time condition is §7.7's DR41\n", 1),
    ('R2-11', "a dossier village's generation-time conditions follow its readiness and wealth by §7.7's row;",
     "a dossier village's generation-time conditions follow its readiness and wealth by §7.7's DR41;", 1),
    ('R2-11', "the generation-time conditions by §7.7's readiness-and-wealth row,",
     "the generation-time conditions by §7.7's DR41,", 1),

    # The dossier trace: DR41–DR43 by number (R2-11), item 115's "specified" in R2-14's one gloss (VV78-r1-01), and
    # item 122's facts (G122-V07: W84).
    ('R2-11 VV78-r1-01 G122-V07',
     "→ V08's history reading and DR36 onward → W76; the `readiness` label and wealth → §7.7's item-114 row → W77; a manor or\n"
     "hall record and a government's `villageSeat` → item 115's \"specified\" → W78; the campaign calendar's week and season → §7.7's\n"
     "item-117 row → W80; `traditions[]` (their windows and staging) → §7.7's item-118 row → W81; the institution names → V08's\n"
     "Find list entries (item 120) → W83.",
     "→ V08's history reading and DR36 onward → W76; the `readiness` label and wealth → §7.7's DR41 → W77; a dossier-bound\n"
     "record of a class in `grandeur.ceiling`'s `settings.grandClasses` (V11 §3.25.4), or a dossier government whose `villageSeat`\n"
     "names the manor house, seigneurial or crown (V11 §3.21.1) → item 115's \"specified\" (V08 §3.16 (3)) → W78; the campaign\n"
     "calendar's week and season → §7.7's DR42 → W80; `traditions[]` (their windows and staging) → §7.7's DR43 → W81; the\n"
     "institution names → V08's Find list entries (item 120) → W83; the conditions, the stressors and the calamities\n"
     "(`activeConditions[]`, the stressors, `calamityHistory[]` with its `targets`) and the forces' and travelling groups'\n"
     "headcounts where the dossier gives them → V08's closed mapping and §7.7's DR44 → W84 (item 122).", 1),

    # VV78-r1-01 (R2-14): W78's producer and dossier columns.
    ('VV78-r1-01 R2-14',
     "DR6's wealth shift; a dossier's manor record or `villageSeat` (\"specified\", V08) |",
     "DR6's wealth shift; a dossier's specification (V08 §3.16 (3)) |", 1),
    ('VV78-r1-01 R2-14',
     "| §4.7 S10b's rung ceiling; §10.2 | DR6 wealth; DR11 seats; a manor or hall record |",
     "| §4.7 S10b's rung ceiling; §10.2 | DR6 wealth; DR11 seats; a dossier-bound record of a class in `grandeur.ceiling`'s "
     "`settings.grandClasses` (V11 §3.25.4), or a dossier government whose `villageSeat` names the manor house, seigneurial or "
     "crown (V11 §3.21.1) (V08 §3.16 (3)) |", 1),
    # VV78-r1-01 (R2-14): J-V7.136.
    ('VV78-r1-01 R2-14',
     "and \"specified\" meaning a dossier manor or hall record, a dossier government's `villageSeat` naming the manor, or the author's placement,",
     "and \"specified\" read as V08 §3.16 (3) reads it, or the author's placement,", 1),

    # VAL-R1-03 = VPC-R1-06 = VV78-r1-03 (R2-12): V04's opening row is `UnderOpeningRow`.
    ('VAL-R1-03 VPC-R1-06 VV78-r1-03', "| V04's `DigRule.classRow`, `OpeningRow` |", "| V04's `DigRule.classRow`, `UnderOpeningRow` |", 1),
    ('VAL-R1-03 VPC-R1-06 VV78-r1-03',
     "V04 §3.5.7 (e)'s candidates and V11 §3.23.7's `OpeningRow` chances (the ruin entrance's 1 where",
     "V04 §3.5.7 (e)'s candidates and V11 §3.23.7's `UnderOpeningRow` chances (V04 §2.3's record; the ruin entrance's 1 where", 1),

    # R2-28 (a) (receiving end of VAL-R1-08): V07 §3.16 (1) reads `Terrain.mining` instead of restating the test.
    ('R2-28 (a)',
     "where the site holds mining —\n"
     "by V11 §3.23.1's ore rule over its `miningCellShare` of the frame, a roster mining class, or a dossier mining deposit (DR19) —\n"
     "and the `fissure` variant",
     "where the site holds mining\n"
     "(`Terrain.mining`, §4.2 S1 (10)) — and the `fissure` variant", 1),

    # VAT1-04 (R2-19): no event of the port's session is an undo target — the two lines VAT1-04 names, verbatim.
    ('VAT1-04 R2-19',
     "a record's never (an epoch that carries a\n"
     "dossier event is no undo target, §7.4; the host restores, item 87):",
     "a record's never (no event of the port's session\n"
     "`host:port` — a port epoch with or without a dossier change, a dossier event — is an undo target, §7.4 *Replay semantics*;\n"
     "the host restores, item 87):", 1),
    ('VAT1-04 R2-19',
     "undone by its undo record where the epoch is an undo target (an epoch that carries a\n"
     "dossier event is none, §7.4).",
     "undone by its undo record where the epoch is an undo target (a port epoch never is, §7.4\n"
     "*Replay semantics*).", 1),
    # R2-19's "every restating sentence cites §7.4 *Replay semantics*": the same narrower form in V07 §2.6 and §3.12.
    ('R2-19',
     "one a record laid or removed, none (a dossier event and an epoch that carries one are no undo targets, §7.4; the host restores, item 87)",
     "one a record laid or removed, none (no event of the port's session `host:port` is an undo target, §7.4 *Replay semantics*; the host restores, item 87)", 1),
    ('R2-19',
     "none: a dossier event and an epoch that carries one are no undo targets (§7.4); the host restores (item 87)",
     "none: no event of the port's session `host:port` is an undo target (§7.4 *Replay semantics*); the host restores (item 87)", 1),
    ('R2-19', "a record's batch none (a dossier event's, §7.4)",
     "a record's batch none (an event of the port's session `host:port`, §7.4 *Replay semantics*)", 1),
    ('R2-19', "their ops are that absorb commit's batches (no undo target, §7.4), keyed",
     "their ops are that absorb commit's batches (no undo target, §7.4 *Replay semantics*), keyed", 1),

    # VAL-R1-09 (R2-26 (d)): the under-deck strip is §4.6's, one margin cell; `stripClearM` dropped.
    ('VAL-R1-09 R2-26 (d)',
     "**(5) VS5, VS6 and S10 — no house under the arches.** The **under-deck strip** — the deck's footprint grown by\n"
     "`raised.stripClearM` (2 m) — holds no toft yard part and no building.",
     "**(5) VS5, VS6 and S10 — no house under the arches.** The **under-deck strip** — §4.6 S8's: the deck's ground projection\n"
     "over its piers and spans, widened each side by `raisedWays.structure.stripMarginM` (V11 §3.24.2) — holds no toft yard part\n"
     "and no building.", 1),
    ('VAL-R1-09 R2-26 (d)',
     "  raised: { supportClearM: M; endSnapM: M; stripClearM: M; turnStepCdeg: Cdeg; turnMaxCdeg: Cdeg };   // V07 §3.5a (item 110 (b))",
     "  raised: { supportClearM: M; endSnapM: M; turnStepCdeg: Cdeg; turnMaxCdeg: Cdeg };   // V07 §3.5a (item 110 (b)); the under-deck strip's margin is §4.6 S8's `raisedWays.structure.stripMarginM` (V11 §3.24.2; no village cell)", 1),
    ('VAL-R1-09 R2-26 (d)',
     "| `raised` | support clearance 1 m; end snap 20 m; strip clearance 2 m; a tracker turns around a support in 15° steps up to 60° |",
     "| `raised` | support clearance 1 m; end snap 20 m; a tracker turns around a support in 15° steps up to 60°; the under-deck strip's margin is V11 §3.24.2's `raisedWays.structure.stripMarginM`, read, never copied |", 1),
    ('VAL-R1-09', "support and strip clearances, the turns, the deck widths,",
     "support clearance, the turns, the deck widths,", 1),

    # VAL-R1-10 (R2-34): an access is no Find target.
    ('VAL-R1-10 R2-34',
     "**Across layers**: on Below, a dwelling or an access in a cavern or ruin\n"
     "(V07 §3.16 (3), (5)) glows on the underground layer and shows as a ghost pin on Ground (V04's part);",
     "**Across layers**: on Below, a dwelling in a cavern or ruin (V07 §3.16 (5))\n"
     "glows on the underground layer and shows as a ghost pin on Ground (V04 §5.1); an access is no Find target (V05 §5.6 (1));", 1),
]
