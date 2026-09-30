# Harmonizing edits to item 114 (and nothing of 115 here). Each old string must occur exactly once.
import sys
src, dst = sys.argv[1], sys.argv[2]
t = open(src, encoding='utf-8').read()
i115 = t.index('\n115. **OWNER RULE')
a, b = t[:i115], t[i115:]
R = []
def r(label, old, new):
    R.append((label, old, new))

r('114 header: bundling words with times',
  '— and, of this item and item 115: "bundle these into the rewrite phase". **What',
  '— and, of this item and item 115 (~01:00): "bundle these into the rewrite phase"; and, of items 114–116 (~01:12): "bundle all this with g114-115". **What')

r('114 (b) 2: ceilingAt callers before S6',
  "(2) *The position:* the pure function `ceilingAt(economyPriority, bandSet, liftWealth?)` (§4.5) — the table's rank at",
  "(2) *The position:* the pure function `ceilingAt(economyPriority, bandSet, liftWealth?)` (§4.5; called by S2, the epoch prelude and, for item 116's top means, S3, S4, S5a and S5b — every reader that runs before S6 writes the record) — the table's rank at")

r('114 (c) 4: the interval read points to 116 (f)',
  "no row above `c` is read. At `f` = 1 this is §4.5's end-band rule at `c` and at the top rank today's read; as `f → 0` it\n     tends to the rule at `c − 1`.",
  "no row above `c` is read. At `f` = 1 this is §4.5's end-band rule at `c` and at the top rank today's read; as `f → 0` it\n     tends to the rule at `c − 1`. An interval row — item 116's means `[lo, hi]` — is read by item 116 (f)'s one statement of\n     it, whose upper end is `R*_c`'s.")

r('114 (d): readers of the record gain 116',
  "It is read after S6 by S7b's provisional range, S10a's `bandRange`, every band read of S10b and S11, V01's\n     dispatch, V05's island reads,",
  "It is read after S6 by S7b's provisional range, S10a's `bandRange`, every band read of S10b and S11, item 116's top means\n     (S7, S10, S10a, S11, II.7.2 and §4.11's builds; S3 to S5b read `ceilingAt`, (b) 2), V01's dispatch, V05's island reads,")

r('114 (e): the prelude one order',
  "BCR-V6-9's field, which the pipeline's late seat writes into §4.11's `EpochInputs` — computed in\n     the epoch's prelude before S2's delta demand, which is folded at it.",
  "BCR-V6-9's field, which the pipeline's late seat writes into §4.11's `EpochInputs` — computed in\n     the epoch's prelude before S2's delta demand, which is folded at it. §4.11 states the prelude's one order: the epoch's\n     slice (the magic in force, the partners), deposit states and `TradeFlow`; the lived wealth; this position; item 116's\n     material supply (116 (d)); then S2's delta demand and the epoch's builds, whose materials read this position (116 (f)).")

r('114 (g): priorityMagic read by 115 (the program correction)',
  "`priorityMilitary`, `priorityReligion`,\n     `priorityCriminal` and `priorityMagic` stay never-read (`priorityMagic`: item 115 (a) 1); §7.7 item 1's list reads \"its\n     generation sliders (`config.priority*`) but `priorityEconomy`, read once at creation (item 114)\", and V08's J-V8.45,\n     BCR-V8-25 and T-V8-20's ignore clause follow it.",
  "`priorityMilitary`, `priorityReligion` and\n     `priorityCriminal` stay never-read, and `priorityMagic` is read once at creation by item 115 (a) 1 (the program's\n     correction of 2026-09-30); §7.7 item 1's list reads \"its generation sliders (`config.priority*`) but `priorityEconomy`\n     and `priorityMagic`, each read once at creation (items 114, 115)\", and V08's J-V8.45, BCR-V8-25 and T-V8-20's ignore\n     clause follow it.")

r('114 (h): fate.held.supply glossed as the island supply law',
  "The fate rows are\n     `fate.held.ceiling` and, for V05's existing `held against its supply` (`reason: 'held_against_supply'`),\n     `fate.held.supply`.",
  "The fate rows are\n     `fate.held.ceiling` and, for V05's existing `held against its supply` — the island supply law's, II.6, never item\n     116's material supply — (`reason: 'held_against_supply'`), `fate.held.supply`.")

r('114 (j) T114-1: identity against the town without this item (116 on by default)',
  "standalone TOWN and CITY have the model digest and every stage\n     digest (§6.2, §13.3) of today's town at `wealthLevel` 0.5 — B-CITY, the goldens, the realism golden (T13-1), every NG,\n     FM and VG parity run — and",
  "standalone TOWN and CITY have the model digest and every stage\n     digest (§6.2, §13.3) of the same town at `wealthLevel` 0.5 without this item, every other rule as filed (item 116's\n     materials included) — B-CITY, the goldens, the realism golden (T13-1), every NG, FM and VG parity run — and")

r('114 (j) T114-11: the port reads the two sliders',
  "(T114-11) The port reads\n     `config.priorityEconomy` and no other slider (T-V8-20's ignore clause with the four others, `_config` and\n     `economicState.priorities`);",
  "(T114-11) The port reads\n     `config.priorityEconomy` — and, for item 115, `config.priorityMagic` — and no other slider (T-V8-20's ignore clause with\n     the three others, `_config` and `economicState.priorities`);")

r('114 (k) header: bundle words, the one routing',
  "**(k) THE UNITS — applied IN the coherence pass's Rewrite phase (owner, 2026-09-30: \"bundle these into the rewrite\n     phase\"): the units whose rewrite had landed when this item was filed — the base parts model, kernel, pipeline,\n     determinism and rendering, and the volumes V03 and V04 — in a late rewrite seat where they have a part; every other unit\n     in its main rewrite. One canonical home per shared decision (STATES); every other unit cites it (REFERENCES).**",
  "**(k) THE UNITS — applied IN the coherence pass's Rewrite phase with items 115 and 116 (owner, 2026-09-30 ~01:00:\n     \"bundle these into the rewrite phase\"; ~01:12: \"bundle all this with g114-115\"): the units whose rewrite had landed\n     when this item was filed — the base parts model, kernel, pipeline, determinism and rendering, and the volumes V03 and\n     V04 — in a late rewrite seat where they have a part; every other unit in its main rewrite. One canonical home per shared\n     decision (STATES); every other unit cites it (REFERENCES); the three items' one routing is\n     docs/validation/coherence/work/g114-116/routing.json with the canon's ruling of 2026-09-30.**")

r('114 (k) scope: J-A ids by the index convention',
  "the judgment index's J-A114.41 – J-A114.55;",
  "the judgment index's J-A114.21, J-A114.41 – J-A114.48, J-A114.71 – J-A114.75 and J-A114.81 (the first digit naming the\n     part that states the rule; titles in the canon's ruling of 2026-09-30);")

r('114 (k) V03, V04: no part of this item; late seats carry 116',
  "*V03, V04:* no part (V04's underground and undercity are banded through II.7's `FieldBands` reads, its wealth-level rows\n     are the dossier's explicit value or a test's; V03's rooms follow the occupants' band).",
  "*V03, V04:* no part of this item (V04's underground and undercity are banded through II.7's `FieldBands` reads, its\n     wealth-level rows are the dossier's explicit value or a test's; V03's rooms follow the occupants' band); their late seats\n     carry item 116's parts.")

for label, old, new in R:
    n = a.count(old)
    if n != 1:
        sys.exit(f'FAIL {label}: {n} matches')
    a = a.replace(old, new)
    print('ok', label)
open(dst, 'w', encoding='utf-8').write(a + b)
