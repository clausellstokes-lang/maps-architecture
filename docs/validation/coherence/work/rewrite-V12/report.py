#!/usr/bin/env python3
"""rewrite-V12: writes docs/validation/coherence/rewrite-V12.md from the assembled volume, mapping.md and the edge list."""
import os, re, hashlib
ROOT = '/home/user/maps-architecture'
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = open(ROOT + '/docs/volumes/V12-calibration.md').read()
NEW = open(ROOT + '/docs/validation/coherence/new/volumes/V12-calibration.md').read()
MAP = open(HERE + '/mapping.md').read()
sw, nw = len(SRC.split()), len(NEW.split())
sb, nb = len(SRC.encode()), len(NEW.encode())
sl, nl = SRC.count('\n'), NEW.count('\n')
md5n = hashlib.md5(NEW.encode()).hexdigest()

def secs(t):
    out = {}
    for p in re.split(r'\n(?=## )', t):
        m = re.match(r'## (\S+)', p); k = m.group(1) if m else 'head'
        out[k] = out.get(k, 0) + len(p.split())
    return out
a, b = secs(SRC), secs(NEW)
names = {'head': 'the head (title, banners, ledgers / marker line, How to read)', '0': '§0 In plain words', '1': '§1 Scope and the base hooks',
         '1b': '§1b Wiring table', '2': '§2 Data model', '3': '§3 The harness pipeline (incl. new §3.15, §3.16)', '4': '§4 Editing',
         '5': '§5 Rendering, labels, exports', '6': '§6 Performance budgets', '7': '§7 Tests and acceptance bars', '8': '§8 Build plan',
         '9': '§9 Decisions', '10': '§10 Base change requests (pointer table and hand-offs)', '11': '§11 Owner questions',
         '12': '§12 CONFIRMED versus PLAUSIBLE', '13': '§13 Fix list', 'Integration': 'Integration notes', 'Finalization': 'the finalization ledger'}
size_rows = '\n'.join(f'| {names.get(k, k)} | {a.get(k, 0):,} | {b.get(k, 0):,} | {b.get(k, 0) - a.get(k, 0):+,} |'
                      for k in dict.fromkeys(list(a) + list(b)))

EDGEROW = {}
for eid, row in [('531-E5', 1), ('588-E5', 2), ('624-E5', 3), ('684-E5', 4), ('733-E5', 5), ('793-E5', 6), ('849-E5', 7), ('880-E5', 8),
                 ('924-E5', 9), ('957-E5', 10), ('974-E1', 11), ('974-E5', 11), ('974-E7', 11), ('996-E4', 12), ('1060-E2', 13), ('1060-E5', 13),
                 ('1293-E4', 14), ('1399-E4', 15), ('1568-E4', 16), ('1709-E1', 17), ('1709-E2', 17), ('1709-E8', 17), ('1722-E4', 18),
                 ('1798-E4', 19), ('1949-E4', 20), ('2221-E5', 21), ('2221-E8', 21), ('2252-E1', 22), ('2252-E6', 22), ('2265-E4', 23),
                 ('2265-E8', 23), ('2350-E1', 24), ('2350-E6', 24), ('2371-E1', 25), ('2371-E5', 25), ('2371-E8', 25), ('2386-E1', 26),
                 ('2386-E2', 26), ('2395-E1', 27), ('2395-E5', 27), ('2408-E1', 28), ('2408-E5', 28), ('2408-E6', 28), ('2408-E7', 28),
                 ('2421-E1', 29), ('2421-E2', 29), ('2421-E4', 29), ('2421-E5', 29), ('2421-E8', 29), ('2454-E1', 30), ('2454-E2', 30)]:
    EDGEROW[eid] = row
edges_txt = open('/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/v12/edges-v12.md').read()
erows = []
for m in re.finditer(r'^\* (M-V12-(\d+)-(E\d)-\w+) — (UNDEFINED|UNTESTED) — (V12 §[\w.]+)', edges_txt, re.M):
    key = f'{m.group(2)}-{m.group(3)}'
    erows.append(f'| {m.group(1)} | {m.group(4)} | {m.group(5)} (source) | V12 §3.16.1 row {EDGEROW[key]} |')
assert len(erows) == 51, len(erows)
combos = ['cliff', 'steep', 'river', 'coast', 'harbour', 'moat', 'bridge', 'retaining', 'oasis', 'frame', 'terraced-ward', 'crypt', 'catacomb', 'vault', 'shade', 'landfall', 'history']
cnames = {'steep': 'steep ground', 'retaining': 'retaining wall', 'frame': 'the frame', 'terraced-ward': 'terraced ward', 'shade': 'island shade', 'landfall': 'island landfall'}
crows = [f'| C-{c}-presets | UNDEFINED | V12 §3.16.2 row "{cnames.get(c, c)}"; T-V12-43 |' for c in combos]

R = []
w = R.append
w('# Rewrite — design volume V12 (calibration)\n')
w('> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V12; covered by the whole-design retrovalidation (J84).\n')
w('''PROGRESS (lane `coherence/rewrite-V12`, 2026-09-30, cloud)
- P1 inputs gathered (canon unit V12, conflicts, f/g routing, wiring, elegance, ids, hand-offs, edges, inventory): done
- P2 head, §0, §1, §1b: done
- P3 §2 (records; §2.11 one table; §2.13 the pins; §2.14 the trial): done
- P4 §3 (with §3.15 items 111–119 and §3.16 edges and combinations): done
- P5 §4–§6: done
- P6 §7–§8: done
- P7 §9–§13 and the Integration notes: done
- P8 assemble, verify ids, references, terms, sizes: done
- P9 report (mapping table, elegance, conflicts, renumberings, cross-part notes), result file, LANDED: done
''')
w(f'''Source: `docs/volumes/V12-calibration.md` ({sl:,} lines, md5 0cada4c8472afcff2ab3181cf5a99dc9). Output:
`docs/validation/coherence/new/volumes/V12-calibration.md` ({nl:,} lines, md5 {md5n}), assembled from the 25 parts in
`docs/validation/coherence/work/rewrite-V12/parts/` in name order (`cat parts/*.md`). Scripts: `work/rewrite-V12/mapping.py`
(the mapping table below), `work/rewrite-V12/report.py` (this report). Same title line and section structure (§0, §1, §1b,
§2 – §13, the Integration notes); one marker line under the title; the ledgers, banners and the finalization ledger removed.
''')
w('## 1 Sizes and the shrink goal\n')
w(f'''| | words (whitespace split) | bytes | KB |
|---|---|---|---|
| source | {sw:,} | {sb:,} | {sb/1024:.1f} |
| rewrite | {nw:,} | {nb:,} | {nb/1024:.1f} |
| change | {nw-sw:+,} ({(nw/sw-1)*100:+.1f} %) | {nb-sb:+,} ({(nb/sb-1)*100:+.1f} %) | |

The canon's goal band (45 848 – 57 310 words) is **not reached**: the net change is {(nw/sw-1)*100:+.1f} %. This is irreducible content,
not a defect, for two reasons, each measured below.

1. **What was cut is about 22 % of the source** (≈ 17 000 words, PLAUSIBLE estimate from the per-section counts): narration
   ≈ 9 300 (the eight banners and six ledgers of the head; §12's per-round CONFIRMED paragraphs with other volumes' md5s;
   §13's round dispositions by seam id; round headers, SCC ids and superseded wordings in rows, comments and decisions);
   restatement ≈ 5 500 (§10's 22 request bodies → one pointer table, 4 576 words; §1's §13.5 and §17.1 restatements →
   pointers; the off values of the pins (E-20); the raised-way minima; item 500's `D5Pair` variants; §17.1 (8)'s method
   citations); duplicated mechanisms ≈ 650 (E-35: §1b's producer and consumer lists); verbose prose ≈ 1 500. The canon's
   own counts bound what is reducible: narration ranges 8 203 words, 2 restatements to references and 10 BCR blocks. The
   rest of the source is the harness's types, rules, bar map, register lines, tests and decisions, each stated once.
2. **New design had to be added (≈ 10 200 words)** — the canon routes it here: file g items 111–119 at build depth
   (§3.15, 1 922 words; their metric, register-line, pin, budget and build rows across §2.13, §3.4, §3.11, §6 and §8,
   ≈ 2 500; T-V12-42 – T-V12-51, 875; J-V12.84 – J-V12.96, 864; §2.14, 197), the edge and combination catalogue
   (§3.16, 1 956; 51 edges and 17 combinations), the hand-off closures (the *closed at* column of §10.2 and §10.3, ≈ 1 400)
   and J122's sittings and build order (≈ 400).

Per top-level section (words):

| section | source | rewrite | change |
|---|---|---|---|
{size_rows}
''')
w('''## 2 Inputs and routing

The canon's unit V12 (`canon.md` *### V12*), the conflict rulings it names, the file f items that concern it, the dated
rulings routing file g items 111–119 (J130), the wiring rows W-IF-04 and W-IF-05, the elegance rulings E-20, E-24, E-35,
E-37 and E-38, the id rulings ID-BCR, ID-JT and ID-WX, the agreement matrix rows (T-V6-62, T-V11-18), the 11 hand-offs
to close, the edge catalogue (40 UNDEFINED, 11 UNTESTED) and 17 combinations, and the 34 open findings. Base sections
were read at their text with files f and g applied; the sibling volumes as landed in `new/volumes/` (V11 from
`docs/volumes/`, its rewrite still running). Working notes: `work/rewrite-V12/routing.md`.

## 3 File f and g items (cited as base text, never restated)

**File f items cited** (34): 229, 291, 376, 377, 381, 382, 447, 456, 488, 489, 491, 492, 493, 495, 496, 497, 498, 499, 500,
501, 502, 503, 504, 521, 522, 529, 533, 535, 536, 537, 568, 569, 575, 584 — every one named at the place that reads it
(e.g. 496 at `Baseline`, 500 at the panel engine, 447 at the export reading rule, 568 at §8.1 where the volume states no
total of its own; the source's "base-side total" row is removed by item 568). **BCR-V12-1 – BCR-V12-22** → V12 §10.1's
pointer table, each to its applied item (496, 497, 503, 504, 381, 500, 491, 535, 533, 521, 569, 501, 488, 502, 447, 489,
447, 536, 492, 493, 537, 382); none is superseded; BCR-V12-4's row cites J122's adoption rule (V12-XCONF-5).

**File g items written here** (the NEW OWNER RULES 111–119, by the dated rulings; V12's part is "the bars and how each is
measured"):

| item | where | what V12 writes | test / decision |
|---|---|---|---|
| 111 | V12 §3.15.1; §3.6b bar map; §3.11; §2.13 | `T111d.walk` (`higherWith` on a per-household walk-to-water indicator, deflated per instance), `T111d.water.<kind>` (rate rows per water kind), `T111d.rich` (`most`); metrics `water.kinds`, `water.walkShare`, `water.distByBand`; the register lines of the oasis, grove and garden rows and the arid chances; item 111's `NoOpPin` | T-V12-44; J-V12.90 |
| 112 | V12 §2.14; §3.15.2; §3.11 | the game-master trial's findings entered through V09 §7.6's `TrialRecord` (`plat calibrate register --trial`, `trial` history rows; never a second record type); the style check's register line (T112-1 at M3b) | T-V12-45; J-V12.88 |
| 113 | V12 §3.15.3; §3.6b (`exactScript`); §6; §3.11 | `T113e.lost` (the LOST / refound property as a step script with author steps); the item-113 register line (`measure` at `V6-E9`, then `corpus` E4); the history replay's budget row; T113-7 as a `NoOpPin` | T-V12-46; J-V12.89 |
| 114 | V12 §3.15.4 | `T114g.oldestFirst`, `.sustained`, `.greyscale`, `.generation`; metric `wall.condition`; the register lines of the decay and recovery rows | T-V12-47; J-V12.89, J-V12.91 |
| 115 | V12 §3.15.5; §2.13 | `bldg.grandeur`; the `rungScope` pin `item115.ceiling` | T-V12-48 |
| 116 | V12 §3.15.6 | `view.limitStop` | T-V12-48 |
| 117 | V12 §3.15.7; §2.13 | `T117i.crowns`, `.leafCover`, `.arid`, `.ice`, `.styles`; `season.*` metrics; the `view` pin `item117.season` | T-V12-49 |
| 118 | V12 §3.15.8; §2.13 | `T118h.window`, `.stable`, `.tier`, `.stage`; `festival.*` metrics; the `view` pin `item118.festival` | T-V12-49 |
| 119 | V12 §3.15.9; §6; §8.3 risk 14 | the `wait.*` timings click to complete (p95 ≤ 10 s comfort level at every rung's top and the cap), progress within one second, the measured-gain check over §12.10's register rows, the interaction rows unchanged; §12's laws stay the targets | T-V12-50; J-V12.92 |

Base bar ids exist for items 111–113 (T111-1 – T111-5, T112-1 – T112-2, T113-1 – T113-7, `new/base/scope`); V12 cites
them. Items 114–119 have none in the base yet, so V12 cites their clauses ("item 114 (g)") and gives its own spec ids
(`T114g.*` …, as `T110b.*`).
''')
w('''## 4 Conflicts resolved (10)

| conflict | ruling applied | where |
|---|---|---|
| SCOPE-C14 | no premium FTG capture (J122); METROPOLIS stays compared with MFCG size 130 | V12 §11 (Q-V12-1); V12 §3.4.4 (FTG's metropolis pictures an unscored card) |
| V12-ICONF-1 | the raised bump's records read the water-system record's met need, cap step and cistern terminal (V11 §3.24.7 (3)), never a chance factor | V12 §3.7.6; V12 §1b's dossier table |
| V12-ICONF-2 | the §13 "factor" sentence removed with the narration | V12 §13 (none open) |
| V12-XCONF-1 | J122's sittings: only M1 (the look check), M2b, M4 and M5, batched, about an hour; staged panels join the next gating sitting once built, else *provisional — not rated* | V12 §0; V12 §2.8 (`PanelSpec.sitting`); V12 §3.9.1 (the sitting table, *Batching and re-offers*); V12 §6; V12 §8.1; V12 §8.3 risk 6; V12 §11 (Q-V12-2); J-V12.84; T-V12-51 |
| V12-XCONF-2 | the pinning hash is §7.6's; the whole provenance block (evidence and `ownerRule` among it) lies outside it | V12 §2.10 (cites §7.6) |
| V12-XCONF-3 | metric stages are registered StageIds (S5a – S5d, S12a – S12c); no bare `S5`, no `S12` | V12 §3.4.2 (`stages`); V12 §3.7.4 (the TOWN guard); V12 §3.10.5; V12 §3.12; T-V12-11; T-V12-37 |
| V12-XCONF-4 | `servedShare` measures every district as V11 §2.3 defines the unit; the ≥ 30-households filter only for T-V11-18's 105 (k) reading (`minHouseholds`) | V12 §2.7 (`NullModelSpec`); V12 §3.6; J-V12.86 |
| V12-XCONF-5 | BCR-V12-4 / item 504's adoption rule is J122's per-frame sitting rule, never "Q-V12-3" | V12 §10.1; V12 §3.10.6 |
| CANON-C03 | §11 is the table of decisions (question, answer) | V12 §11 |
| CANON-C04 | §13 holds no open item; the reconciliation history is left to the validation records | V12 §13 |

Agreement-matrix subjects: **T-V6-62** (V11-XCONF-1) — `stateSnapCm`'s register entry lives at V12 §3.11 (its own line,
`measure` at `V6-E2` on `bar.T-V6-62`; J-V12.82), as V06 §8 writes it; **T-V11-18** (V12-XCONF-4) — above.
''')
w('''## 5 Elegance rulings applied, with their equivalence lists

**E-20 — one no-op pin engine** (V12 §2.13's `NoOpPin` with kinds `offForm`, `rungScope`, `view`; V12 §3.7.8; J-V12.87).
- [x] the owner-rules copy's registry path-test list — kept at its home, §13.2's convention (5), which V12 §3.7.8 cites
- [x] the declared-shift clause for goldens — V12 §3.7.8 (3) (the off-state set re-recorded on a declared shift of another cause, its stage list matched)
- [x] each item's off-form cell values (V11 §3.24.0) and its bar id — V12 §2.13's table: one row per pin with its bar and kind; the off form read from V11 §3.24.0 (or V11 §3.7.4, or the cells the bar names), never restated

**E-24 — one mark on amended decisions** (V12 §9's head; 12 rows marked: J-V12.10, .11, .21, .43, .55, .60, .63, .71, .72, .74, .77, .79).
- [x] no row dropped — J-V12.1 – J-V12.83 all present, J-V12.84 – J-V12.96 added (96 rows)
- [x] the governing row keeps the reason — each amending row states its reason; the amended row carries only "*Amended by J-V12.n.*"

**E-35 — one lifecycle table** (V12 §2.11 with producer and consumers columns; V12 §1b keeps the engines, commands, profiles and metric families and cites it; J-V12.85).
- [x] every producer and consumer listed today — each of §1b's 46 rows mapped (MAPPING TABLE, V12-0012 – V12-0057): records to §2.11's rows, engines kept in §1b

**E-37 — one unit vocabulary** (V12 §2.1: `MetricUnit = Extract<Unit /* §2.1 */, …>`).
- [x] deg and cdeg both kept — `deg` in the subset (cdeg is V11's)
- [x] count and people both kept — `count` in the subset (people is V11's)
- [x] each volume's subset exactly its current list — the 17 units of the source's `Unit`, unchanged

**E-38 — `territory.haPerHead` leaves the register** (V12 §3.11's default line).
- [x] the farm rows' values unchanged — no value restated here
- [x] A_T = households × the per-head sum — cited to V07 §3.9 (1)
- [x] V12's register: the farm rows are the calibratable cells; `haPerHead` leaves the register — "the `FarmTable` village rows among them, while `territory.haPerHead`, derived as their sum, takes no entry"
''')
w('''## 6 Id rulings, renumberings, renames and terms

| ruling | old | new |
|---|---|---|
| ID-JT | `J-T` (the tendency letter) | `JT` (§13.7) |
| G-DR | DR-V8.2, DR-V8.3, DR-V8.4, DR-V8.5, DR-V8.7, DR-V8.8 | DR30, DR31, DR32, DR33, DR34, DR35 |
| ID-BCR | V01's bare BCR-n; V04's bare BCR-n | BCR-V1-n; BCR-V4-n (and the applied f item where the text needs the base text) |
| ID-WX | IN-V12-1 – IN-V12-4 in the body | folded at their homes; the Integration notes kept as a map (ruling → where it lives) |
| G-lot (metric ids) | `lots.r4.*`, `lots.wallAlign` | `bldg.r4.*`, `bldg.wallAlign` (J-V12.96) |
| G-cite | V1-3.8.7, V4 §3.5, bare § into this volume, … | `Vnn §x.y` for volumes, `V12 §x.y` for this volume, bare `§x.y` for the base only |
| G-M6U | M6 for the underground | M6-U |
| new ids | — | T-V12-42 – T-V12-51; J-V12.84 – J-V12.96; milestone step `V6-E9` in the due table (V06's history-replay step); spec ids `T111d.*`, `T113e.lost`, `T114g.*`, `T117i.*`, `T118h.*`; metrics `water.kinds`, `water.walkShare`, `water.distByBand`, `wall.condition`, `bldg.grandeur`, `view.limitStop`, `season.*`, `festival.*`, `wait.*`, `time.*` |
| terms | "the M4-110 panel"; `GmTrialRecord` (a first draft) | "the M4 panel's M4-110 group" (V12-TERM-1); V09 §7.6's `TrialRecord` (one record) |

No existing T-V12 or J-V12 id was renumbered; X-V12-1 – X-V12-19 keep their ids.
''')
w('''## 7 Wiring gaps, hand-offs and findings closed

**Wiring.** W-IF-04 — V09 §4.14's cell inspector reads each cell's register entry through `dist/evidence.json` (V12 §2.10;
X-V12-6), as V09 writes it. W-IF-05 — V10 §2.13's `RuleAnswer.register` (`entry`, `status`, `method`, `due`) is filled from
the same shipped file, which now carries `method` and uses `CalibrationEntry['status']`'s vocabulary (V12 §2.10; X-V12-7);
see CROSS-PART NOTE 2.

**Hand-offs to this volume (11), closed in V12 §10.3:** V02 X33 → V12 §2.1 (J-V12.65); V06 X9 → V12 §3.6b's bar map
(109 (k), 109 (j) (5)); V06 X19 → V12 §3.4.2, §3.7.4, §3.7.6, §3.7.8, §3.4.4; V06 X31 → V12 §3.11's `decline` line;
V06 X38 → V12 §2.1, §3.11 (J-V12.66); V06 X49 → V12 §2.8, §3.11 (J-V12.82; `V6-E7`, `V6-E8`, `V6-E9`); V11 X-V12-1 → V12
§2.10; V11 X-V11-12 → V12 §3.11 (*Items 109 and 110 by column*), §2.10; V11 X-V11-14 (c) → V12 §3.7.2 (4), §3.7.7,
`PresetArm`; V11 X-V11-16 (b) → V12 §2.1; V11 X-V11-17 (f) → V12 §3.11 (J-V12.82).

**Hand-offs from this volume (19), each closed at its destination** (V12 §10.2's *closed at* column): X-V12-1 V11 §2.2,
§3.2.1; X-V12-2 V02 §7.5, V07 §8; X-V12-3 V11 §8, §3.23.4; X-V12-4 V03 §8, V04 §7, V05 §7, V06 §12; X-V12-5 V08 §7;
X-V12-6 V09 §4.14; X-V12-7 V10 §2.13; X-V12-8 V09 §7.2, V10 §7; X-V12-9 V11 §3.24.0, §3.24.2, §2.2; X-V12-10 V06 §3.19.1,
V09 §4.20; X-V12-11 V02, V04, V05, V06, V07, V11 §7; X-V12-12 §16, §13.2; X-V12-13 V04 §7; X-V12-14 V07 §7; X-V12-15 V02
§3.10.10, V03 §2.4, V06 §8, V11 §8, §13.2; X-V12-16 V01 §8.1, V03 §2.4 and §8, V04 §8, V05 §8, V07 §8; X-V12-17 (the
command refuses any other id form; V04 §8, V06 §8); X-V12-18 (V04 §8's span row; SCC-109's clause); X-V12-19 V06 §8, V04 §8,
items 244 and 245. The deferral wordings ("the next round may …") are gone (V12-HANDOFF-1).

**The 34 open findings, each fixed in the text:**

| finding | fixed at |
|---|---|
| VOL-V11-V12-RESTATEMENTS-011, V12-RESTATE-1 | V12 §2.13 (`overlay` comment and the table's off-form column cite V11 §3.24.0); V12 §3.7.8 (1) |
| VOL-V11-V12-RESTATEMENTS-012, V12-RESTATE-2 | "the owner-stamped minimum of the column" (V11 §3.24.2 states the values): V12 §2.10, §3.7.2 (5), §3.11, J-V12.42, T-V12-39 |
| V12-ICONF-1, V12-ICONF-2 | see §4 |
| V12-XCONF-1 – V12-XCONF-5 | see §4 |
| V12-ELEG-1 | E-35 (§5) |
| V12-MISSING-1 | V12 §3.10.6 (J122's rule; "default until ruled" removed); V12 §11 |
| V12-MISSING-2 | V12 §3.11's order rule cites §16's starts-after chains (J122's combined order: M5, V-M, M6-E and the plan rung's P0 – P1 parallel after M4; M6 and M6-U after M5; M6-sky; M-CAL; M-SF; M3c after M3a, beside M3b); J-V12.95 |
| V12-MISSING-3 | V12 §11 (every question answered, J122); V12 §0, §3.9.1, §6, §8.3 risk 6; BCR-V12-6's sitting list at item 500 via §10.1 |
| V12-MISSING-4 | item 111 (§3 above) |
| V12-MISSING-5 | item 112 (§3 above) |
| V12-MISSING-6 | item 113 (§3 above) |
| V12-MISSING-7, V12:IN-V12-3 | V12 §3.6b (bends counted, each with its line); the note removed |
| V12-TERM-1 | "the M4 panel's M4-110 group" throughout (V12 §3.9.1, §7, §8.2) |
| V12-TERM-2 | E-37 (§5) |
| V12-NARR-1 – V12-NARR-5 | one marker line; ledgers, banners, round headers, SCC ids and superseded wordings removed; §12 current lists; §13 none open; decisions in current form with E-24 marks |
| V12-BREF-1 | every self-reference `V12 §x`; bare § only for the base (verified: 0 unresolved) |
| V12-BREF-2 | BCR-V1-n and BCR-V4-n |
| V12-HANDOFF-1 | §7 above; X-V12-17 – X-V12-19 closed |
| SCC-109's X-V12-18 clause | X-V12-18 (V04 §8's span row takes the order M4, `V4-U3`, `V4-U5`) |
| V12:IN-V12-1 | V12 §3.11 (the default line: V05's `IslandRule` cells its own, never V11 rows) |
| V12:IN-V12-2 | V12 §10.2 X-V12-9; V12 §3.7.2 (5); V12 §3.4.4 |
| V12:IN-V12-4 | V12 §2.2 (item 447's one text, the six barrier kinds, `span` read by no metric); V12 §10.1 |

**Owner questions:** Q-V12-1, Q-V12-2, Q-V12-3 answered (J122) in V12 §11, each decision read in the body.
''')
w('''## 8 Edges and combinations (principle (11))

Every catalogue edge (40 UNDEFINED, 11 UNTESTED) is a row of V12 §3.16.1 with its outcome's home, its failure rung (§5.1's
ladder) and its test; four rules stated once (degenerate geometry, every rung, every toggle and preset, the lifecycle)
carry what the rows share. The edge suite is T-V12-42 (one fixture per row). The 17 feature × parity-preset combinations
are V12 §3.16.2's table, one rule (a preset is cell values, never a stage) and one row per feature with its rungs, its
reading under the preset and T-V12-43's fixture. The full map is §13 below.

## 9 Judgment calls (vetoable; new decision rows)

J-V12.84 (J122's sittings as `PanelSpec.sitting`), J-V12.85 (E-35), J-V12.86 (V12-XCONF-4), J-V12.87 (E-20), J-V12.88 (the
trial through V09's `TrialRecord`), J-V12.89 (`exactScript` with author steps for items 113 (e) and 114), J-V12.90 (item
111 (d) as `higherWith` with per-instance deflation), J-V12.91 (item 114's greyscale bar on luma against §8.2's threshold),
J-V12.92 (item 119 measured click to complete, p95 ≤ 10 s, five seeds per wait kind), J-V12.93 (`dist/evidence.json`
carries the register fields), J-V12.94 (a parity preset is cell values), J-V12.95 (§16's starts-after chains), J-V12.96
(`bldg.*` metric ids). Each is a reading of a canon ruling or a g item at build depth; none changes another decision.
''')
w('''## 10 CROSS-PART NOTES

1. **scope (§16):** the rig line cites "V12 §8.2; 6–9" with items 102–113's bars absorbed. V12 §8.2 now adds **W7
   (0.75–1.25 pw)** — items 114–119's specs and pins, the `exactScript` author steps, the `rungScope` and `view` pin kinds,
   the wait timer and budget-register check, and the edge suite; items 111–113's registrations stay absorbed. The rig
   line's V12 share should read 6.75–10.25 (W1 – W7), or scope states W7 absorbed. Also: the carried row counts "volume 12's
   register share built at M6-U's U3–U5" (W6, 0.25–0.5) while the rig line's 6–9 already includes W6 — check for a double
   count. V12 states no total of its own (item 568; the source's "base-side total" row removed).
2. **V10 (§2.13, §1b.1):** `RuleAnswer.register`'s comment names "V12 §2.6's `plat/calibration/register.json`, where one
   exists". The register is repository data that never ships (J-V12.93); the shipped copy of each cell's entry is
   `dist/evidence.json` (V12 §2.10), which now carries `entry`, `status` (`CalibrationEntry['status']`), `method` and `due`.
   The Assemble seat (or V10's owner) should make V10's comment and its §1b.1 input name `dist/evidence.json` (V12 §2.10),
   as V09 §4.14 already does; the fields match unchanged (`id` ← `entry`).
3. **scope (§13.2):** base bar ids exist for items 111–113 only. When ids T114-n … T119-n are issued, V12 §3.15's clause
   citations ("item 114 (g)", …) map to them one to one; V12's own spec ids (`T114g.*`, `T117i.*`, `T118h.*`) stay.
4. **rendering (§12.10):** V12 §3.15.9, §6 and T-V12-50 read §12.10's budget-register rows (the steps declared slower than
   their target with their measured gain, and the interaction rows); §12.10 exists in `new/base/rendering` (E-18). The
   landed `docs/ARCHITECTURE.md` has no §12.10 yet, so doc_checks' S2 lists it until the Assemble seat lands the base.
5. **V11 (rewrite running):** V12 cites V11 §3.24.0 (switch table), §3.24.2 (raised-way minima, the `ownerRule: '110 (b)'`
   stamp), §3.24.7 (3) (the water-system record's met need), §3.7.4 (the web off form), §2.2 and §3.2.1 steps 4 and 7 (the
   compiler; the pinning hash per §7.6, V12-XCONF-2), §2.3 (the district unit; T-V11-18's `minHouseholds` 30, V12-XCONF-4),
   §3.18, §3.23.4, §8 and rows 63–66, 79, 80, 82. Keep these numbers or tell the Assemble seat the renumbering.
6. **V06:** V12's due table uses `V6-E9` for item 113's history replay (`measure` there, then `corpus` E4 at M-CAL), beside
   `V6-E7` and `V6-E8`; V06's rewrite names E9 as the history-replay step — agreed.
7. **V09:** the game-master trial has one record, V09 §7.6's `TrialRecord`; V12 enters its findings with
   `plat calibrate register --trial` (V12 §2.14; T-V12-45). Agreed with V09's lifecycle row.
8. **V07:** `territory.haPerHead` takes no register entry (E-38); V12 cites V07 §3.9 (1) for A_T.
''')
w('''## 11 Checks run (provisional where noted)

- **Ids:** T-V12-1 – T-V12-51 and J-V12.1 – J-V12.96 each defined once; every T-V12 and J-V12 reference resolves.
- **References:** every `V12 §x` resolves to a heading or numbered paragraph of the new volume; every `Vnn §x` to that
  volume's headings (new where landed, else the source); every bare `§x` to the base's headings, except §12.10, which is
  the rendering unit's new section (CROSS-PART NOTE 4).
- **Terms and narration:** no `J-T`, `DR-V8.n`, `lots.*` metric, bare `M6` for the underground, bare `S5` or `S12` stage,
  canon conflict id, wiring id, SCC id or round header in the volume's text (E-nn provenance marks kept, as the base does).
- **Mapping:** 403 of 403 inventory ids mapped, 0 unmapped (`mapping.py`).
''')
DC = open('/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/v12/doccheck-final.out').read()
DS = open('/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/v12/doccheck-src.out').read()
def cnt(t):
    return {k: re.search(rf'^{k}: (\d+) hits, (\d+) unreviewed', t, re.M).groups() for k in ('C1', 'C2', 'C3', 'C4', 'S1', 'S2')}
cn, cs = cnt(DC), cnt(DS)
rows = '\n'.join(f'| {k} | {cs[k][0]} ({cs[k][1]} unreviewed) | {cn[k][0]} ({cn[k][1]} unreviewed) |' for k in cn)
w(f'''- **doc_checks.py** (`--doc <file> --heads docs/ARCHITECTURE.md`), **PROVISIONAL**: it warned "reference corpus INCOMPLETE
  (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT
  authoritative; re-run on the machine that holds the corpus before any freeze".

| check | source | rewrite |
|---|---|---|
{rows}

  C3's hits are 3-gram overlaps of ordinary phrases and section-number runs with the corpus index (fewer than the source's);
  S2 reads every `Vnn §x` and `V12 §x` pointer as a base pointer (the checker does not parse the volume prefix), so its
  hits are this volume's own and other volumes' sections plus §12.10 — all resolved by the reference check above.
''')
w('## 12 MAPPING TABLE — every inventory id of the volume → where it now lives\n')
w('Roles are the canon\'s (`canon.json` by_inventory_id): home 384, reference 2, bcr-pointer 10, handoff 6, answer 1 — 403 in all, 0 unmapped.\n')
w(MAP)
w('\n## 13 EDGES MAP — every catalogue edge and combination → its V12 §3.16 row\n')
w('| edge | status in the catalogue | mechanism | where it is now defined and tested |\n|---|---|---|---|')
w('\n'.join(erows))
w('')
w('| combination | status | where it is now defined and tested |\n|---|---|---|')
w('\n'.join(crows))
open(ROOT + '/docs/validation/coherence/rewrite-V12.md', 'w').write('\n'.join(R) + '\n')
print('report words', len('\n'.join(R).split()), 'new words', nw, 'bytes', nb, 'kb', round(nb / 1024, 1))
