# edits_a — the one-page summary, §0.2 and §1.1 (scope r2)
B = '/home/user/maps-architecture/docs/ARCHITECTURE.md'
SUM = '## The whole design in one page (plain words)'
S02 = ("### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`), 8–31 (`AMENDMENTS-2026-09-25b`), "
       "32–88 and 101 (`AMENDMENTS-2026-09-27c`, `-d`, `-e`), 102–119 (file g) and the base change requests 200–585 (file f)")
S11 = '### 1.1 What is built, in what order; the two size ladders'


def register(E):
    # ---- the one-page summary ----
    # VCS-r1-02 (a): item 114's clause as T114-1 – T114-3 state it
    E.add(B, SUM,
          "and a wall long poor and safe shows worn,\npatched and breached runs that recover when the need and the means return (item 114);",
          "and a wall long safe weathers through\nworn runs to breaches, a poor one under threat patches its gaps in cheaper material and a rich one rebuilds in stone,\n"
          "recovering when the need and the means return (item 114);", 1, 'VCS-r1-02 (a)')
    # VCS-r1-02 (b): item 115's ceiling as §4.7 S10b (3) states it
    E.add(B, SUM,
          "(§2.6); below a town no dwelling takes a court, a tower or a second manor unless the dossier or the user asks (item 115).",
          "(§2.6); below a town a dwelling stays a single range, an L or a T, with no court, tower or turret, a thorp or hamlet\n"
          "has no manor and a village at most one, with a lord — unless the dossier or the user asks (item 115).", 1, 'VCS-r1-02 (b)')
    # VCS-r1-01: the summary names items 120–124, and (Part H) items 125 and 126
    E.add(B, SUM,
          "map (items 117, 118), and it never zooms out past its own land (item 116).\n",
          "map (items 117, 118), and it never zooms out past its own land (item 116). Find makes what a user picks glow across\n"
          "every zoom and layer until it is closed; the view's resolution adjusts itself (Auto, up to 4K) or is set by hand; a\n"
          "SettlementForge crisis is drawn while it lasts and its aftermath arrives through time; a ruined building's plans are\n"
          "its own plans, damaged; and light weather comes and goes by season and region, switchable — each a look or a view,\n"
          "never a change of the map (items 120–124). The map is seen on tablets and desktops only; a phone is offered no map\n"
          "view (item 126).\n", 1, 'VCS-r1-01 summary')
    E.add(B, SUM,
          "SettlementForge's dossier is the map's only fixed truth: the map never edits\nit, whatever it does not say the map works out by its own rules,",
          "SettlementForge's dossier is the map's only fixed truth and its only data input: the\n"
          "map never edits it and reads nothing else of SettlementForge, whatever it does not say the map works out by its own\n"
          "rules (item 125),", 1, 'VCS-r1-01 summary, item 125')

    # ---- §0.2 ----
    E.add(B, S02, S02,
          "### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`), 8–31 (`AMENDMENTS-2026-09-25b`), "
          "32–88 and 101 (`AMENDMENTS-2026-09-27c`, `-d`, `-e`), file g's items and the base change requests 200–585 (file f)",
          1, 'VCS-r1-01 / R2-07 heading')
    E.add(B, S02,
          "73–88 `-27d`, 101 `-27e`, 102–119 `docs/AMENDMENTS-2026-09-28g.md` (file g) and 200–585",
          "73–88 `-27d`, 101 `-27e`, 102 onward `docs/AMENDMENTS-2026-09-28g.md` (file g) and 200–585", 1, 'R2-07 prose')
    E.add(B, S02,
          "labelled as an inference, and the gate's one rejection (item 49's deletion) is honoured. Items 63–72, 101, 102–111 and\n113–119 are the owner's rules,",
          "labelled as an inference, and the gate's one rejection (item 49's deletion) is honoured. Items 63–72, 101, 102–111 and\n113–126 are the owner's rules,",
          1, 'VCS-r1-01 prose (subset list, R2-07)')
    E.add(B, S02,
          "| 119 as fast as possible; the ten-second comfort level | §12 (the targets, the comfort level, the measured-gain and progress rules; D-18), §1.1 (the performance statement); T119-1 – T119-5; volumes 9 and 12 | §12 |\n",
          "| 119 as fast as possible; the ten-second comfort level | §12 (the targets, the comfort level, the measured-gain and progress rules; D-18), §1.1 (the performance statement); T119-1 – T119-5; volumes 9 and 12 | §12 |\n"
          "| 120 Find, a view only | §2.9 (the per-viewer key `find`: its chips and Show gaps, outside the document, its hash and the log), §8.2 (the veil, halo, outline, pin, count-bubble, ghost-pin and gap marks; each chip's colour and second cue), §9.5 (the tool and the legend's chips), §11.1 (picture exports draw it), §11.2 (the gazetteer's class counts and match listing under knowledge admission), §12.5 (the overlay's budget); T120-1 – T120-6; built at M5; volumes 1, 3, 4, 5, 7, 8, 9, 10, 11 and 12 | §2.9 |\n"
          "| 121 the resolution adjuster | §8.8 (the Resolution ladder with its two steps below 1, the 4K live-view ceiling, the ultra tier, the live Auto loop and its settle rule), §8.4 (g) (what Auto gives up, in order; labels, chrome and overlays at the device's pixel ratio), §12.1 (calibration picks ultra), §12.5 (the frame budgets the loop holds), §12.8 (memory per tier); T121-1 – T121-8; built at M4; volumes 9 and 12 | §8.8 |\n"
          "| 122 crisis looks, a look only | §2.7 (`ConditionOverlay` read for the look; the aftermath only by the epoch path), §2.9 (the per-viewer key `crises`; the crisis framing), §7.7 (DR44), §10.2 (`RosterTables.crisis`: the look rows, the closed map, the settings and item 122 (h)'s rates), §8.2 (the look rows), §8.8 (the ring's massed marks), §11 (exports), §12.5; T122-1 – T122-7; built at M3b, the dossier's reading at M-SF; volumes 1, 2, 3, 6, 7, 8, 9, 10, 11 and 12 | §10.2 |\n"
          "| 123 a ruined building's plans damaged, never redrawn | §2.6 step 7 (the damage layer over the same plan), §6.3 (`plan.damage`: one keyed threshold per plan element, no new id), §8.6 (the damaged plan's drawing), §11.1 (battle maps' line of sight); T123-1 – T123-7; built with volume 3's P4 and P5, the decay level with M6-E; volumes 2, 3, 4, 6, 9, 10, 11 and 12 | §2.6 |\n"
          "| 124 light weather, a view layer | §2.9 (the switch as device state, the spell session-transient, `weather` the cover), §6.1 (the session-seeded `view.weather` stream), §8.2 (the effects' marks; no snow where winter does not freeze), §8.4 (the shower's dimming, fog's scattering, night halos), §8.8 (the effects layer, never in the tile key), §11 (exports leave it out), §12.5 (≈ 1 ms a frame); T124-1 – T124-9; built at M3b; volumes 9, 11 and 12 | §8.2 |\n"
          "| 125 the dossier the only data input | §11.3 and §11.4 (the doors take no data input beside the dossier; the view commands kept as commands), §14 (`HostContext` without `week`, `realm` or `customLibrary`), §7.7 (DR1, DR3, DR19, DR29 and DR42 re-sourced to the dossier or the generator's fallback), §4.11 and §2.9 (the week's one source); T125-1 – T125-3, from M-SF; volumes 8, 9 and 12 | §11.4 |\n"
          "| 126 the map on tablets and desktops only | §1.1 (the supported devices; no phone view), §13.2 and §13.4 (bars; sessions on tablets and desktops), §16 (the narrow class never built); T126-1 – T126-3; built at M2a; volumes 4, 8, 9 and 12 | §1.1 |\n",
          1, 'VCS-r1-01 rows 120–126')

    # ---- §1.1: the supported devices (G126-scope) ----
    E.add(B, S11,
          "§16 orders them (J122's combined order) and prices each; `docs/volumes/INDEX.md` maps the hooks each volume plugs into.\n",
          "§16 orders them (J122's combined order) and prices each; `docs/volumes/INDEX.md` maps the hooks each volume plugs into.\n"
          "\n"
          "**Where the map is seen** (item 126 (a2); J140). The map is seen on tablets and desktops only: SettlementForge presents\n"
          "no map entry on a phone, and the product designs nothing for one — no phone layout, screen, notice, catalogue row,\n"
          "default or test. The application's layout classes are wide and medium (V09 §4.12); the narrow class is retired and\n"
          "never built. A tablet or desktop window smaller than the medium class (600 × 480 CSS px) keeps the medium layout at\n"
          "that minimum and the page scrolls, the document, the view and the selection unchanged across the resize — nothing\n"
          "is lost or re-generated. Tablets keep every tool, under touch and pen (V09 §4.12). It lands at M2a with the medium\n"
          "layout (§16); its bars are T126-1 – T126-3 (§13.2).\n", 1, 'G126-scope §1.1')
