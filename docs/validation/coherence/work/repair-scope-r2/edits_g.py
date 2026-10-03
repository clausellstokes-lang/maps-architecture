# edits_g — the judgment index in place (VEL0-06 = VDC1-16 = VPC-R1-26; R2-30; item 125's amended rows; T114-9 and
# T114-10), §0.2's rows 20, 114, 117, 118 (R2-18, R2-27, R2-11) and §13.8's timing sentence (scope r2)
B = '/home/user/maps-architecture/docs/ARCHITECTURE.md'
JC = '# Judgment calls ("chose X over Y because Z"; each vetoable)'
S02 = ("### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`), 8–31 (`AMENDMENTS-2026-09-25b`), "
       "32–88 and 101 (`AMENDMENTS-2026-09-27c`, `-d`, `-e`), 102–119 (file g) and the base change requests 200–585 (file f)")
S138 = '### 13.8 CI tiers and compute budgets (SCL-18; D-34)'


def register(E):
    j = lambda old, new, tag: E.add(B, JC, old, new, 1, tag)
    j("| J-A113.61 | the history replay keys its coarse epochs with the epoch component `0x8000 + r`, the u16 range's upper half, so no replay draw equals a live epoch's | §6.1 |",
      "| J-A113.61 | the history replay keys its coarse epochs with the epoch component `0x8000_0000 + r`, the u32 range's upper half (live epochs 1 … 2³¹ − 1), so no replay draw equals a live epoch's | §6.1 |",
      'VEL0-06 = VDC1-16 = VPC-R1-26 (R2-20)')
    j("B-ZOOM run from each map's limit | §13.2, §13.4, §16 |",
      "B-ZOOM run from each map's limit — *amended by J-A116.02* | §13.2, §13.4, §16 |", 'R2-30 J-A116.01')
    j("| J-A76.41 | the map's week is SettlementForge's `calendar.elapsedWeeks` (never `elapsedMonths` or `history.age`) | §4.11, §10.3 |",
      "| J-A76.41 | the map's week is SettlementForge's own week with no conversion — a dossier-bound map's present week the dossier's latest stamped tick (item 125), never `elapsedMonths` or `history.age` | §4.11, §10.3 |",
      'R2-40 J-A76.41 (pipeline hand-off)')
    j("| J-A77.06 | `RealmBlock.mPerRealmUnit` dropped: the host client's `realmBlockFrom` turns the realm scale into each partner's `distanceM` | §14 |",
      "| J-A77.06 | `RealmBlock.mPerRealmUnit` dropped: the host client's `realmBlockFrom` turns the realm scale into each partner's `distanceM` — *superseded by J-A125.01* | §14 |",
      'R2-40 J-A77.06')
    j("| J-A77.72 | the trade fill: partners from the dossier's neighbours and link partners, else one per through route | §7.7 |",
      "| J-A77.72 | the trade fill: partners from the dossier's neighbours and link partners, else one per through route — *amended by J-A125.01* | §7.7 |",
      'R2-40 J-A77.72 (determinism hand-off)')
    j("| J-A20.79 | item 20 (h) (iv): the map never asks the host for a fact | §7.7, §11.4, §14 |",
      "| J-A20.79 | item 20 (h) (iv): the map never asks the host for a fact — *amended by J-A125.01* | §7.7, §11.4, §14 |",
      'R2-40 J-A20.79')
    j("| J-A73.02 | the port's types split by subject | §14 |",
      "| J-A73.02 | the port's types split by subject — *amended by J-A125.01* | §14 |", 'R2-40 J-A73.02')
    j("| J-A114.01 | item 114's base bars T114-1 – T114-8 —",
      "| J-A114.01 | item 114's base bars T114-1 – T114-10 —", 'R2-27 J-A114.01')
    j("all carried on the out-of-row row | §16 |",
      "all carried on the out-of-row row — *amended by J-A568.05* | §16 |", 'J-A568.04 amended')

    # ---- §0.2's rows 20, 114, 117, 118 ----
    s = lambda old, new, tag: E.add(B, S02, old, new, 1, tag)
    s("re-application, precedence; T20-1 – T20-6; **(h)**",
      "re-application, precedence (a dossier event supersedes a lock on what it changes); T20-1 – T20-6 and T20-14 – T20-16; **(h)**",
      'R2-18 row 20')
    s("§7.1 and §7.4 (`repairWall`'s material, `wearWall`), §7.7 (the condition row), §8.2 (the state rows, the legend), §11 (exports); T114-1 – T114-8;",
      "§5.3 (the wall-crossing row), §7.1 and §7.4 (`repairWall`'s material, `wearWall`), §7.7 (DR41), §8.2 (the state rows, the legend), §11 (exports); T114-1 – T114-10;",
      'R2-27 / R2-11 row 114')
    s("§7.7 (the season row), §4.2 S0 and §10.2", "§7.7 (DR42), §4.2 S0 and §10.2", 'R2-11 row 117')
    s("§7.7 (`traditions` consumed, the festival row),", "§7.7 (`traditions` consumed, DR43),", 'R2-11 row 118')

    # ---- §13.8: the timing jobs of items 120, 121 and 124 ----
    E.add(B, S138, "with item 119's wait timing (T-V12-50) inside §12.1's timing phase.",
          "with item 119's wait timing (T-V12-50) and the Find, resolution and weather timings of items 120, 121 and\n124 (T-V12-52, T-V12-53, T-V12-57) inside §12.1's timing phase.", 1, 'items 120, 121, 124 timings')
