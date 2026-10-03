# edits_f — §13.8's bar schedule (R2-18 (d), R2-27, R2-32 (3), R2-36, G120 – G126-scope, G125's T117-6 row,
# VRC1T-09, the B-EDGE row, the volumes-in-the-tiers paragraph) (scope r2)
B = '/home/user/maps-architecture/docs/ARCHITECTURE.md'
S = '### 13.8 CI tiers and compute budgets (SCL-18; D-34)'

NEW_ROWS = (
    "| T20-14 (a dossier event over locks) | PR on B-DOSSIER-lite | M3a |\n"
    "| T20-15, T20-16 (a dossier population fall over locked dwellings and households) | PR on B-DOSSIER-lite | M4 (with the epochs) |\n"
    "| T114-9 | PR on the hook fixtures | M4 (its TOWN-epoch clause; the village clause with volume 7, T-V7-59) |\n"
    "| T114-10 | PR on the CITY castle fixture at generation; its 10 epochs in the milestone tier | M2b (its epochs with M6-E's E3) |\n"
    "| T120-1 (the pin) | PR on the two PR golden seeds (the landing gate); its off-state suite nightly | M5 (Find's milestone) |\n"
    "| T120-2 – T120-5 | nightly on volume 9's app harness over B-CITY-lite's seeds of every rung, the village fixtures and a dossier fixture (V12 §6) | M5 (each volume's clause at the later of its step and M5) |\n"
    "| T120-6 | §12.1's timing phase at the METROPOLIS cap | M5 |\n"
    "| T121-1, T121-4 – T121-7 | PR on volume 9's app harness; T121-6's pin suites nightly | M4 |\n"
    "| T121-2, T121-3, T121-8 | §12.1's timing phase on the reference, the low-end and an ultra-tier device | M4 |\n"
    "| T122-1, T122-7 (the pin) | PR on the two PR golden seeds (the landing gate); its suites nightly, every week at milestones | M3b (the dossier's crisis fixtures with M-SF) |\n"
    "| T122-2, T122-3, T122-5, T122-6 | nightly on the crisis fixtures — the previews from M3b, volume 8's dossier crisis and force fixtures from M-SF (V12 §6) | M3b |\n"
    "| T122-4 | PR (volume 11's compile check over volume 8's census lists) | M-SF (with the map rows) |\n"
    "| T123-1 – T123-7 | PR on B-PLAN's damage fixtures; T123-3's engine clause in the nightly five-engine run | @@V03_STEP@@ — the decay level read from the existence state at V11's default age until M6-E, T123-4's epoch clause with M6-E, T123-5 at the later of that step and volume 2's exterior step (M6) |\n"
    "| T124-1, T124-3 – T124-5, T124-8, T124-9 | PR; the pin's suites nightly | M3b |\n"
    "| T124-2, T124-6, T124-7 | §12.1's timing phase and the visual-regression run | M3b |\n"
    "| T125-1 – T125-3 | PR on B-DOSSIER-lite (T125-1's required-keys dossier at every rung nightly) | M-SF |\n"
    "| T126-1 – T126-3 | PR on volume 9's app harness | M2a (with the medium layout) |\n"
)
V03_STEP = "volume 3's P4, the step that draws a decayed or ruined plan (V03 §8, inside M6-P)"


def register(E):
    a = lambda old, new, tag, n=1: E.add(B, S, old, new, n, tag)
    a("| T117-6 | PR on B-DOSSIER-lite's births with a test-side `HostContext.week` | M3b (the port's reading with M-SF) |",
      "| T117-6 | PR on B-DOSSIER-lite's births whose dossier carries a stamped tick (the week's source, item 125 (b)), and on one with none (the season control's midsummer) | M3b (the port's reading with M-SF) |",
      'G125-scope T117-6 row')
    a("| T119-4, T119-5 | PR (the budget register against the previous release) | M2b |\n",
      "| T119-4, T119-5 | PR (the budget register against the previous release) | M2b |\n" + NEW_ROWS.replace('@@V03_STEP@@', V03_STEP),
      'R2-18 (d), R2-27, R2-32 (3), R2-36, G120 – G126 rows')
    a("| B-EDGE (§4.13's EP-01 – EP-19 and its combination cells) |",
      "| B-EDGE (§4.13's EP rows and its combination cells) |", 'R2-06 (a) B-EDGE row')
    a("| T-ER-01 – T-ER-21 (the rendering, label and export edges: §8.11, §9.7, §11.6) |",
      "| the T-ER rows of §8.11, §9.7 and §11.6 (the rendering, label and export edges) |", 'VRC1T-09 (R2-06 (a))')
    a("the no-op and view pins, the render bars of items 114, 117 and 118, the underground's and the raised-way bars, the",
      "the no-op and view pins, the render bars of items 114, 117, 118 and 120–124, the underground's and the raised-way bars, the",
      'items 120–124 in V12 §6')
