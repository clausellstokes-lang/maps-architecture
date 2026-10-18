# edits_h — PRICES LAST (R2-06 (b)): §16, D-20 and INDEX, written after all twelve volume seats of round 2 logged
# LANDED (V01–V12; the last, V03, at 08:41), each volume's §8 total read from its round-2 repair file's first lines
# (prices.py computes and asserts every figure). Also §16's placements (R2-32, R2-36), VAP-r1-15 / R2-17, VAL-R1-13,
# VCS-08, VCS-18, VV78-12, VV1112-r1-01, VCS-10's M5 exit and G126's reference-app line, and INDEX's R2-07 and VV56-r1-09.
B = '/home/user/maps-architecture/docs/ARCHITECTURE.md'
IX = '/home/user/maps-architecture/docs/volumes/INDEX.md'
S16 = '## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2'
DEL = '# Delegated decisions (the owner deferred all judgment; each is final unless vetoed)'
JC = '# Judgment calls ("chose X over Y because Z"; each vetoable)'
IXH = '# Index of the design volumes — the product map, the wiring, the build order'


def register(E):
    a = lambda old, new, tag: E.add(B, S16, old, new, 1, tag)
    a("about 110–150 calendar weeks", "about 115–158 calendar weeks", 'VCS-08 calendar (115–158 = the first total ÷ 2)')
    # M2a: item 126 (R2-36)
    a("count badge and variations (≈ 1–1.5 pw) |",
      "count badge and variations (≈ 1–1.5 pw); item 126's layout — the wide and medium classes only, the medium layout held at its 600 × 480 minimum (§1.1; volume 9's AP2) |", 'R2-36 item 126 at M2a')
    # M2b: V11's C2 g share and C4a (VV1112-r1-01, R2-17), DR41 (R2-11)
    a("and the institution ladders' member counts (item 108), with their rows (volume 11's C2 file-g share, +1.75–2.75 pw);",
      "and the institution ladders' member counts (item 108), with their rows (volume 11's C2 file-g share for items 102, 103, 105 and 107, "
      "+1.0–2.0 pw, and C4a's wall rows for item 106, +0.5 pw; the ladders' rows are C4b's, with M-SF, V11 §8);", 'VV1112-r1-01 M2b')
    a("item 114's generation-time condition — §7.7's condition row from the readiness", "item 114's generation-time condition — §7.7's DR41 from the readiness",
      'R2-11 M2b')
    a("| 46–61.25 pw |", "| 45.75–61 pw |", 'R2-06 (b) M2b')
    # M3b: items 122 and 124 (R2-36), DR42/DR43 (R2-11)
    a("§7.7's season and festival rows,", "§7.7's DR42 and DR43,", 'R2-11 M3b')
    a("item 114's condition and material in every export |",
      "item 114's condition and material in every export; item 122's crisis looks — §2.9's `crises` key and "
      "the crisis framing, §10.2's crisis table and placement over item 118's decoration engine with volume 1's `campLand` "
      "(≈ 0.25 pw, V01 §8.1), §7.7's DR44, §8.2's look rows, §8.8's ring of massed marks and the exports drawing them "
      "(≈ 0.75–1.25 pw), the closed map's rows and the dossier's reading with M-SF; item 124's weather effects — §2.9's switch "
      "and spell, §6.1's session-seeded stream, §8.2's marks, §8.4's dimming, scattering and night halos, §8.8's effects layer "
      "and §12.5's frame budget (≈ 0.75–1.25 pw) |", 'R2-36 items 122, 124 at M3b')
    a("| 19.5–26 pw |", "| 21–28.5 pw |", 'R2-06 (b) M3b')
    # M4: item 121 (R2-36)
    a("the performance tiers and the low-end tier measured on the named device (§12.1);",
      "the performance tiers and the low-end tier measured on the named device (§12.1); item 121's resolution "
      "adjuster — §8.8's Resolution ladder with its two steps below 1, the 4K live-view ceiling, the ultra tier with its "
      "calibration bar (§12.1), the live Auto loop and the composition that keeps labels, chrome and overlays at the device's "
      "pixel ratio, §8.4 (g)'s order and §12.8's memory per tier (≈ 0.75–1.25 pw);", 'R2-36 item 121 at M4')
    a("| 17–24.25 pw |", "| 17.75–25.5 pw |", 'R2-06 (b) M4')
    # carried row (R2-32's "Find (M5)"; AP11, C9, W7)
    a("and AP11's base parts: the zoom-out stop (M1), the oasis toggle (M3a), Colour vision, the cue column, the progress view, the season control and the festival list (M3b) (V09 §8.1);",
      "and AP11's base parts: the zoom-out stop (M1), the oasis toggle (M3a), Colour vision, the cue column, the progress view, the season control, the festival list, Show crises with the crisis preview and the weather switch (M3b), the resolution setting and its chip (M4), Find (M5) and the dossier's crisis numbers (with M-SF) (V09 §8.1);",
      'R2-32 / R2-36 carried AP11')
    a("volume 11's C9, the rows of items 111 and 113–119, each beside its item's base milestone, its item-113 and item-114 epoch rows with M6-E (V11 §8);",
      "volume 11's C9, the rows of items 111, 113–119 and 122–124, each beside its item's base milestone, its item-113 and item-114 epoch rows with M6-E and item 123's with volume 3's P4 (V11 §8);",
      'V11 C9 carried')
    a("its W7 — the specs, pins and bench bars of items 114–119, the wait timer and the edge suite — at M1, M2b, M3b, M6-E and M6-U (V12 §8.2) |",
      "its W7 — the specs, pins and bench bars of items 114–126, the wait timer and the edge suite — at M1, M2a, M2b, M3b, M4, M5, volume 3's P4, M6-E, M6-U and M-SF (V12 §8.2) |", 'V12 W7 carried')
    a("10.75–16.25 pw (7.75–11.5, 1.25–1.75, 0.75–1.25, 0.25–0.5 and 0.75–1.25) |",
      "13.75–20.5 pw (7.5–11, 3.5–5, 1.25–2, 0.25–0.5 and 1.25–2) |", 'R2-06 (b) carried')
    # M5: Find (R2-32), the exit's range (VCS-10 / R2-06 (a))
    a('the "same kind, new seed" per-district workflow with locks |',
      'the "same kind, new seed" per-district workflow with locks; item 120\'s Find — its base parts (§2.9\'s '
      "`find` key, §8.2's marks, §9.5's tool, §11.1's export, §11.2's match listing, §12.5's budget), volume 9's panel and "
      "`live.find`, volume 1's area and gap services `findAreas` and `gapUnits` (W10–W11) |", 'R2-32 M5 Find')
    a("V01 §7's bars at M5 (T-V1-1 – T-V1-58);", "every T-V1 test at M5 (V01 §7) and the bars §13.8's schedule gives M5 (T120-1 – T120-6);",
      'VCS-10 / R2-06 (a) M5 exit')
    a("| 27.25–36.25 pw |\n", "| 27.5–36.75 pw |\n", 'R2-06 (b) M5')
    # the staged rows
    a("| M3b | V10 §8's exits, the clerk session",
      "| M3b | V10 §8's exits (C3's item-120 content landing with M5's exit), the clerk session", 'R2-32 (2) M3c')
    a("| 11–14.75 pw |", "| 11.25–15 pw |", 'R2-06 (b) M3c')
    a("items 111 and 113–118 at the village rungs | 29.75–41.75 pw with V-M0 and V-M2u |",
      "items 111, 113–120 and 122 at the village rungs | 30.5–43 pw with V-M0 and V-M2u |", 'VAL-R1-13 / VV78-12 village (R2-07)')
    a("item 115's ceiling across a rung change at E2;",
      "item 115's ceiling across a rung change, item 122's hand-over and item 123's decay level at E2;", 'R2-36 M6-E')
    a("| 29.5–41.75 pw |", "| 31–44 pw |", 'VCS-08 M6-E')
    a("V03 §8's exits; the owner's twenty-plan review | 17.75–24.25 pw |",
      "V03 §8's exits; item 123's damaged plan at P4 and its exports at P5, with §2.6 step 7's, §6.3's and §8.6's base parts; the owner's twenty-plan review | 18.25–25 pw |",
      'R2-36 M6-P')
    a("V02 §8.3's exits; the stage-3 panel (V02 §7.5; §13.6) | 20.5–29.75 pw with 2.25 pw of spikes |",
      "V02 §8.3's exits, item 123's exterior and item 122's ruined look among them (V02 §8.6); the stage-3 panel (V02 §7.5; §13.6) | 21–30.75 pw with 2.25 pw of spikes |",
      'R2-06 (b) M6')
    a("former settlement of item 113 | 28.25–39.25 pw |",
      "former settlement of item 113; item 123's damage below ground at U5 | 28.5–39.5 pw |", 'R2-06 (b) M6-U')
    a("| V05 §8's exits | 17.25–23.25 pw |", "| V05 §8's exits | 18–24.75 pw |", 'VAL-R1-13 / VCS-08 M6-sky')
    a("| V08 §8's exits and release checklist | 18–24.5 pw (map side) |",
      "| V08 §8's exits and release checklist, item 125's bars and item 122's map rows and crisis reading among them | 18.5–25.25 pw (map side) |",
      'R2-36 M-SF')
    a("AP11's History chip, lost-void line, wall repair material and legend with M6-E, its grandeur line with M6 and the game-master trial before the public release) | their layers | their layers | V09 §7 | 4–6 pw |",
      "AP11's History chip, \"What its past left\", the lost-void line, Back in use, the last-change epoch and the ring's "
      "story with M6-E, its grandeur line with M6, the damage lines with M6-P's P4 and the game-master trial before the "
      "public release) | their layers | their layers | V09 §7 | 4.25–6.25 pw |", 'R2-06 (b) staged screens')
    a("| the content's staged rows (V11: C4 at M-SF, C8 at M6-U) | their milestones | — | V11 §8 | ≈ 1.75–2.5 pw |",
      "| the content's staged rows (V11: C4b at M-SF, C8 at M6-U) | their milestones | — | V11 §8 | ≈ 1.85–2.6 pw |", 'VAP-r1-15 / R2-17 staged row')
    # the effort lines
    a("item 117's season look (1–1.5) and item 118's festival look (0.5–1);",
      "item 117's season look (1–1.5) and item 118's festival look (0.5–1); item 121's resolution adjuster (0.75–1.25), item "
      "122's crisis looks with volume 1's `campLand` (0.75–1.25) and item 124's weather effects (0.75–1.25);", 'R2-36 O12 widenings')
    a("items 54 and 55 and item 112's second cues and checked variants absorbed |",
      "items 54 and 55, item 112's second cues and checked variants and item 120's Find roles and marks absorbed (its overlay provider and panel are volume 9's, AP11) |",
      'item 120 O12 absorbed')
    a("| 8.5–13 |", "| 10.75–16.75 |", 'R2-06 (b) O12')
    a("item 114's condition and material and items 116–118's frame, season and festival in the exports absorbed |",
      "item 114's condition and material, items 116–118's frame, season and festival and items 120, 122 and 124's Find, crisis looks and weather in the exports, §11.2's Find match listing and item 125's narrowed host contract absorbed |",
      'items 120, 122, 124, 125 O11 absorbed')
    a("item 114's condition row and items 117 and 118's season and festival rows absorbed |",
      "item 114's condition row, items 117 and 118's season and festival rows and item 125's re-sourced rows (DR1, DR3, DR19, DR29, DR42) absorbed |",
      'item 125 O10 absorbed')
    a("file g's rows — profiles, families, pairs, goods, coverage, ladders, the 280 kind rows, walls (items 103–108; V11 §8, 2.5–4) — and the rows of items 111 and 113–119 (V11 §8's C9, 0.75–1.25);",
      "file g's rows in the first total — profiles, families, pairs, goods, coverage and balance (items 102, 103, 105 and 107; V11 §8's C2 g share, 1.0–2.0), the wall rows (item 106; C4a, 0.5) and item 110's rows (C3b, 0.75–1.25) — and the rows of items 111, 113–119 and 122–124 (V11 §8's C9, 1.25–2.0), the ladders, the 280 kind rows, item 122's mapping and item 109's rows being on the staged content line (V11 §8's C4b and C8);",
      'VV1112-r1-01 content line')
    a("| 13.75–19.75 |", "| 14–20.25 |", 'R2-06 (b) content')
    a("touch and the three layout classes,", "touch and the two layout classes (wide and medium; item 126 retires the narrow class),", 'G126-scope app line')
    a("the screens of items 111, 112 and 116–119 | 17.5–25.75 |", "the screens of items 111, 112, 116–122 and 124 | 19.5–28.5 |", 'R2-06 (b) app line')
    a("V09 §8.1's base line (16.25–24.0; time's screens, AP5, with M6-E on the staged-screens line) and AP11's base parts (1.25–1.75) |",
      "V09 §8.1's base line (16.0–23.5, narrowed by item 126's 0.25–0.5; time's screens, AP5, with M6-E on the staged-screens line) and AP11's base parts (3.5–5: items 111–119's 1.25–1.75, Find's 1.25–1.75, the resolution setting's 0.25–0.5, the crisis looks' screens 0.5–0.75, the weather switch's 0.25) |",
      'G126 / R2-06 (b) app basis')
    a("its W7 — the specs, pins and bench bars of items 114–119, the wait timer and the edge suite (0.75–1.25); the bars of items 33–62 and items 102–119,",
      "its W7 — the specs, pins and bench bars of items 114–126, the wait timer and the edge suite (1.25–2); the bars of items 33–62 and of file g's items,",
      'V12 W7 rig line (R2-07)')
    a("| 16.25–23.25 |", "| 16.75–24 |", 'R2-06 (b) rig')
    a("| **base subtotal (M-1 – M4b, with the shares the carried row builds at M-SF, M6-E and M6-U)** | **198.25–270.75** | |",
      "| **base subtotal (M-1 – M4b, with the shares the carried row builds at M5, M-SF, M6-E, M6-P and M6-U)** | **203.25–278.5** | |", 'VCS-08 base subtotal')
    a("| stage 2 (M5) | 27.25–36.25 | V01 §8.2 |", "| stage 2 (M5) | 27.5–36.75 | V01 §8.2 |", 'R2-06 (b) stage 2')
    a("| **the base with stage 2 — the first total** | **225.5–307** |", "| **the base with stage 2 — the first total** | **230.75–315.25** |", 'VCS-08 first total')
    a("| stage 3 (volume 2) | 20.5–29.75 | V02 §8.3 (its 22.5–32.5 less the 2–2.75 inside M3a) |",
      "| stage 3 (volume 2) | 21–30.75 | V02 §8.3 (its 23–33.5 less the 2–2.75 inside M3a) |", 'R2-06 (b) V02')
    a("| the plan rung (volume 3) | 17.75–24.25 | V03 §8 (its PE row inside M2b and M3a) |",
      "| the plan rung (volume 3) | 18.25–25 | V03 §8 (its 19–26 less its PE row's 0.75–1 inside M2b and M3a) |", 'R2-06 (b) V03')
    a("| the underground layer (volume 4) | 28.25–39.25 | V04 §8 |", "| the underground layer (volume 4) | 28.5–39.5 | V04 §8 |", 'R2-06 (b) V04')
    a("| the sky layer (volume 5) | 17.25–23.25 | V05 §8 |", "| the sky layer (volume 5) | 18–24.75 | V05 §8 |", 'VAL-R1-13 V05')
    a("| the evolution engine (volume 6) | 29.5–41.75 | V06 §8 |", "| the evolution engine (volume 6) | 31–44 | V06 §8 |", 'VCS-08 V06')
    a("| the village product (volume 7) | 29.75–41.75 | V07 §8 |", "| the village product (volume 7) | 30.5–43 | V07 §8 |", 'VAL-R1-13 / VV78-12 V07')
    a("| the SettlementForge connection (volume 8, map side) | 18–24.5 | V08 §8 |", "| the SettlementForge connection (volume 8, map side) | 18.5–25.25 | V08 §8 |", 'R2-06 (b) V08')
    a("| the built-in clerk (volume 10) | 11–14.75 | V10 §8 |", "| the built-in clerk (volume 10) | 11.25–15 | V10 §8 |", 'R2-06 (b) V10')
    a("| the application's staged screens (volume 9) | 4–6 | V09 §8.1 (AP5 – AP8, AP10 and AP11's staged parts, 0.75–1) |",
      "| the application's staged screens (volume 9) | 4.25–6.25 | V09 §8.1 (AP5 – AP8, AP10 and AP11's staged parts, 1–1.25) |", 'R2-06 (b) V09 staged')
    a("| the content's staged rows (volume 11) | ≈ 1.75–2.5 | V11 §8 |", "| the content's staged rows (volume 11) | ≈ 1.85–2.6 | V11 §8 (C4b and C8) |", 'VV1112-r1-01 staged content')
    a("| **the staged milestones together** | **182.5–255.75** | |", "| **the staged milestones together** | **187.85–264.1** | |", 'VCS-08 staged total')
    a("| **the whole program — the second total** | **408–562.75** |", "| **the whole program — the second total** | **418.6–579.35** |", 'VCS-08 whole program')
    a("Items 117 and 118 widen the O12 line by their\nlooks' itemised 1.5–2.5.",
      "Items 117 and 118 widen the O12 line by their\n"
      "looks' itemised 1.5–2.5, and items 121, 122 and 124 by 2.25–3.75 (the resolution adjuster, the crisis looks and the\n"
      "weather effects, 0.75–1.25 each); the base parts of items 120, 123 and 125 are absorbed — item 120's key, roles,\n"
      "listing and exports by the O11 and O12 lines (its overlay provider and panel are volume 9's AP11), item 123's damage\n"
      "layer by volume 3's P4 and P5, with which it lands (V03 §8), and item 125's re-sourced rows and narrowed host\n"
      "contract by the O10 and O11 lines — and item 126 narrows the reference app's line with volume 9's base line.",
      'R2-36 the rule applied to items 120–126')
    a("— together a first total of ≈ 208.5–279 pw.", "— together a first total of ≈ 213.75–287.25 pw.", 'R2-06 (b) cuts')

    # ---- D-20 ----
    E.add(B, DEL,
          "the base with stage 2 ≈ 225.5–307 expert person-weeks\n(the base 198.25–270.75, the content module included, plus stage 2 27.25–36.25), and the whole program with every staged\n"
          "milestone ≈ 408–562.75, re-derived line by line (J-A16.01, J-A63.05, J-A73.05, J-A101.05, J-A568.01, J-A568.04); the\n"
          "cuts that would reduce the first total to ≈ 208.5–279",
          "the base with stage 2 ≈ 230.75–315.25 expert person-weeks\n(the base 203.25–278.5, the content module included, plus stage 2 27.5–36.75), and the whole program with every staged\n"
          "milestone ≈ 418.6–579.35, re-derived line by line (J-A16.01, J-A63.05, J-A73.05, J-A101.05, J-A568.01, J-A568.04,\n"
          "J-A568.05); the cuts that would reduce the first total to ≈ 213.75–287.25", 1, 'VCS-08 D-20')

    # ---- the judgment index: J-A568.01, J-A568.02 ----
    E.add(B, JC,
          "| J-A568.01 | §16's two totals computed once — 225.5–307 pw for the base with stage 2, 408–562.75 pw for the whole program — stage 3's 22.5–32.5 split 2–2.75 inside M3a and 20.5–29.75 staged,",
          "| J-A568.01 | §16's two totals computed once — 230.75–315.25 pw for the base with stage 2, 418.6–579.35 pw for the whole program — stage 3's 23–33.5 split 2–2.75 inside M3a and 21–30.75 staged,",
          1, 'VCS-08 J-A568.01')
    E.add(B, JC, "the calendar scaled to about 110–150 weeks | §16 |",
          "the calendar scaled to about 110–150 weeks — *amended by J-A568.05* | §16 |", 1, 'J-A568.02 amended')

    # ---- INDEX.md (the whole file: its intro is under the title, R2-07) ----
    x = lambda old, new, tag: E.add(IX, IXH, old, new, 1, tag)
    x("(`docs/AMENDMENTS-2026-09-28g.md`, items 102–119, the owner's rules)", "(`docs/AMENDMENTS-2026-09-28g.md`, file g's items, the owner's rules)", 'R2-07 INDEX intro')
    x("| **M5** | 27.25–36.25 |", "| **M5** (its early pieces inside M1 – M3b, V01 §8.1) | 27.5–36.75 |", 'R2-06 (b) V01')
    x("| 22.5–32.5 (M6 20.5–29.75 with spikes; 2–2.75 at M3a) |", "| 23–33.5 (M6 21–30.75 with spikes; 2–2.75 at M3a) |", 'R2-06 (b) V02')
    x("| 18.5–25.25 (M6-P 17.75–24.25; PE 0.75–1) |", "| 19–26 (M6-P 18.25–25; PE 0.75–1) |", 'R2-06 (b) V03')
    x("| **M6-U** | 28.25–39.25 |", "| **M6-U** | 28.5–39.5 |", 'R2-06 (b) V04')
    x("| **M6-sky** | 17.25–23.25 |", "| **M6-sky** | 18–24.75 |", 'VCS-18 / VAL-R1-13 V05')
    x("| **M6-E** (E0–E9) | 29.5–41.75 |", "| **M6-E** (E0–E9) | 31–44 |", 'VCS-18 V06')
    x("| **V-M0 – V-M4** and **V-M2u** | 29.75–41.75 |", "| **V-M0 – V-M4** and **V-M2u** | 30.5–43 |", 'VCS-18 / VAL-R1-13 / VV78-12 V07')
    x("| 18–24.5 (map side; SettlementForge's own side 1.5–2.5, the owner's program) |",
      "| 18.5–25.25 (map side; SettlementForge's own side 1.5–2.5, the owner's program) |", 'R2-06 (b) V08')
    x("inside the base's milestones (its line 16.25–24.0);", "inside the base's milestones (its line 16.0–23.5);", 'R2-06 (b) V09 line')
    x("(V09 §8.1) | 21.5–31.75 |", "(V09 §8.1) | 23.75–34.75 |", 'R2-06 (b) V09')
    x("C1 inside **M3a**; **M3c** (C0, C2–C5) beside M3b | 14.5–20 (15–20.5 with the command-line clerk) |",
      "C1 inside **M3a**; **M3c** (C0, C2–C5) beside M3b, C3's Find content at M5's exit | 14.75–20.25 (15.25–20.75 with the command-line clerk) |", 'R2-06 (b) / R2-32 V10')
    x("| C0–C3b and C5–C7 inside M0–M4b, C4's wall rows at M2b; C8 at M6-U; C9 beside each owner item's base milestone; C4's dossier rows with the SettlementForge stage (V11 §8) | 13.0–18.25 |",
      "| C0–C3b, C4a (the wall rows) and C5–C7 inside M0–M4b, C4a at M2b; C8 at M6-U; C9 beside each owner item's base milestone; C4b (the dossier rows) with the SettlementForge stage (V11 §8) | 13.6–19.1 |",
      'VAP-r1-15 / R2-17 / VV1112-r1-01 V11')
    x("| 6.75–10.25 base side; M-CAL 4.75–8; each later corpus run 0.25–0.75 |", "| 7.25–11 base side; M-CAL 4.75–8; each later corpus run 0.25–0.75 |", 'R2-06 (b) V12')
    x("| V01 (hand-over), V06", "| V01 (the island's unit inputs), V06", 'VV56-r1-09')
    x("| V04 | Q2 — the underground's cost, 28.25–39.25 pw | accepted (J122) |", "| V04 | Q2 — the underground's cost (V04 §8's total) | accepted (J122) |", 'R2-06 INDEX §6 figure')
