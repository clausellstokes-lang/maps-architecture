# Harmonizing edits to item 116 against items 114 and 115. Each old string must occur exactly once.
import sys
src, dst = sys.argv[1], sys.argv[2]
t = open(src, encoding='utf-8').read()
R = []
def r(label, old, new):
    R.append((label, old, new))

r('116 (d): the prelude order with 114',
  "§4.11's epoch prelude (V06 §3.2 row 1) re-derives it after the epoch's slice, deposit states and `TradeFlow` apply\n     and before any build;",
  "§4.11's epoch prelude (V06 §3.2 row 1) re-derives it after the epoch's slice, deposit states and `TradeFlow` apply\n     and after item 114 (e)'s prosperity ceiling position, before S2's delta demand and any build (§4.11's one prelude\n     order, item 114 (e));")

r('116 (f): the means under the prosperity ceiling, said once',
  "**With item 114:** in the highest allowed\n     band c (its share f, item 114 (b)) the band's upper cut reads 1 and its row is `[lo_c, lo_c + f × (hi_c − lo_c)]` — the\n     one exception to item 114 (c) (3) for this read, continuous in the economy at every knot; the **top means** is that\n     row's upper end, read from `FieldBands.ceiling` (10, the `rich` row's, with no prosperity ceiling). So the town's wealth\n     reaches the means only through the bands the field and the prosperity ceiling leave — one mechanism, item 114's; this\n     item adds no wealth term.",
  "**With item 114 (its one statement for this read):** in the\n     highest allowed band c (its share f, item 114 (b)) the band's upper cut reads 1 and its row is `[lo_c, lo_c + f × (hi_c −\n     lo_c)]` — item 114 (c) (4)'s continuous read for an interval row: its upper end is `R*_c`'s, `lerp(hi_{c−1}, hi_c, f)`,\n     since each band's `lo` is the band below's `hi` (V11's compile checks the rows contiguous), and its lower end stays the\n     band's own, so the row is continuous in the economy at every knot; a band an author holds above c (item 114 (c) (7))\n     reads its own row. The **top means** is that row's upper end, from the prosperity ceiling's position — `ceilingAt` for\n     the picks that run before S6 writes the record (S3, S4, S5a, S5b; item 114 (b) (2)), `FieldBands.ceiling` after it, the\n     prelude's position at an epoch (10, the `rich` row's, with no prosperity ceiling). The rows are keyed by the band set's\n     ids; a band a pack's set adds without a row takes the interval interpolated between its neighbours' rows at its rank,\n     named by V11's compile. So the town's wealth reaches the means only through the bands the field and the prosperity\n     ceiling leave — one mechanism, item 114's; this item adds no wealth term. **The very rich are the rich band:** a town\n     capped below `rich` — economy below 50 on item 114's default table, with no rich band at all at 33⅓ and below — has\n     lost the purse that pays for a traded material, so its houses and institutions take traded stone only where the capped\n     top means pays its landed price within the blend: at the defaults a town capped at `prosperous` or lower builds no house\n     or institution of river- or road-borne stone at any rung, and of sea-borne stone only from a partner within about 17 km\n     at TOWN, 29 km at CITY and 42 km at METROPOLIS, and at TOWN river-borne stone reaches the very rich from economy 45\n     (receipt `work/g114-116/tmp/cap-stone.txt`); its works keep their factors on the lowered top means.")

r('116 (f): item 115 sentence, material supply',
  "**Item 115:** its gate adds nothing to the\n     means; an island's plots read their own bands through this rule and its fabric draws on the settlement's supply ((i)).",
  "**Item 115:** its gate adds nothing to the\n     means; an island's plots read their own bands through this rule and its fabric draws on the settlement's material\n     supply ((i)) — never II.6's island supply law, which sizes the islands.")

r('116 (i) islands: material supply',
  "* **Islands** (V05). An island's buildings read the settlement's supply with their own plots' means;",
  "* **Islands** (V05). An island's buildings read the settlement's material supply with their own plots' means;")

r('116 (l): the dossier-map partner refusal in item 11',
  "On a dossier map a map-side partner is refused `dossier-owned`, its alternatives the material edit and the\n     dossier.",
  "On a dossier map a map-side partner is refused `dossier-owned` (§7.7 item 11, beside items 114's and 115's\n     refusals), its alternatives the material edit and the dossier.")

r('116 (o): item 114 row',
  "| item 114's prosperity ceiling | no means above the top means (continuous in the economy): plots, institutions and works | — | T116-22 |",
  "| item 114's prosperity ceiling | no plot or institution means above the top means × `rungMeans` but a held band's (item 114 (c) (7)), no work's above the top means × its factors, continuous in the economy; a town capped at `prosperous` or lower builds no house of river- or road-borne stone | — | T116-22 |")

r('116 (o): islands row',
  "| islands (item 115) | the settlement's supply; island rock no source; a landfall credits stone | — | T116-23 |",
  "| islands (item 115) | the settlement's material supply; island rock no source; a landfall credits stone | — | T116-23 |")

r('116 (p): Trade control registry id and group',
  "**Registry** (§7.8): the Trade control (consuming\n     stage S1, locality *re-derive from S1 (11)*, discrete, anchor §7.7, the advanced panel);",
  "**Registry** (§7.8): the Trade control, id\n     `circumstances.trade` (consuming stage S1, locality *re-derive from S1 (11)*, discrete, anchor §7.7, the advanced panel's\n     \"Site\" group, V09 §4.14's grouping by consuming stage, beside the Economy; the Magic sits in \"Programme\");")

r('116 (q) T116-22: held band, capped town',
  "T116-22 **item 114**: no plot's means above the top means × `rungMeans`, no institution's above\n     its ceiling band's, no work's above the top means × its factors; the means continuous in the economy; the traded share\n     non-increasing as the prosperity ceiling lowers;",
  "T116-22 **item 114**: no plot's means above the top means × `rungMeans` but a held band's (item 114\n     (c) (7)), no institution's above its ceiling band's, no work's above the top means × its factors; the means continuous\n     in the economy, across the knots at 16⅔ and 33⅓; the S3 to S5b picks reading `ceilingAt` equal to the record S6 writes;\n     the traded share non-increasing as the prosperity ceiling lowers; at economy 33⅓ and below, a TOWN with a river or road\n     partner that has stone builds 0 houses and institutions of traded stone;")

r('116 (q) T116-23: material supply',
  "T116-23 **islands**: island materials ⊆ the settlement's supply;",
  "T116-23 **islands**: island materials ⊆ the settlement's material supply;")

r('116 (q) schedule: T116-22 from M2b',
  "T116-4 – T116-7, T116-10, T116-16 – T116-22 nightly from M1 on V12's\n     bar-map rows;",
  "T116-4 – T116-7, T116-10, T116-16 – T116-21 nightly from M1 on V12's\n     bar-map rows, T116-22 nightly from M2b, which lands item 114's prosperity ceiling;")

r('116 (q) T116-32: means rows compile',
  "V11's compile proves every `MaterialDef`\n     complete — cost, flammability, flood, Works key, salvage and dwell row, texture tile and a colour role in every family —\n     and every consumer resolving a material over every supply case, the earth-only case included.",
  "V11's compile proves every `MaterialDef`\n     complete — cost, flammability, flood, Works key, salvage and dwell row, texture tile and a colour role in every family —,\n     the means rows contiguous over the band set in force (a row-less band named), and every consumer resolving a material\n     over every supply case, the earth-only case included.")

r('116 (r) header: landed units incl. kernel',
  "**(r) THE UNITS — applied IN the coherence pass's Rewrite phase, bundled with items 114 and 115 (owner, ~01:12: \"bundle\n     all this with g114-115\"): the landed units — the base model, pipeline, determinism and rendering parts, V03 and V04 — in\n     a short late rewrite seat each, every other unit in its Rewrite; the owner's refinement binds every part. Each shared\n     decision has one canonical home (STATES); every other unit cites it (REFERENCES).**",
  "**(r) THE UNITS — applied IN the coherence pass's Rewrite phase, bundled with items 114 and 115 (owner, ~01:12: \"bundle\n     all this with g114-115\"): the landed units — the base model, kernel, pipeline, determinism and rendering parts, V03 and\n     V04 — in a short late rewrite seat each where they have a part (the kernel has none), every other unit in its Rewrite;\n     the owner's refinement binds every part. Each shared decision has one canonical home (STATES); every other unit cites\n     it (REFERENCES); the three items' one routing is docs/validation/coherence/work/g114-116/routing.json with the canon's\n     ruling of 2026-09-30.**")

r('116 (r) kernel row',
  "| base **kernel** (§3), late seat | no part: a material is never geometry and no kernel call reads one | — |",
  "| base **kernel** (§3), no seat | no part: a material is never geometry and no kernel call reads one | — |")

r('116 (r) determinism row: item 11 home of the refusal',
  "each structure's `material` under its row's tool, the dossier-map partner refusal);",
  "each structure's `material` under its row's tool, the dossier-map partner refusal, stated at §7.7 item 11);")

r('116 (r) scope row: J-A ids by the convention; T116-22 milestone',
  "the register's J-A116.01, .21 (the default model; J-A19.21 superseded), .41 (which prosperity reads which), .42 (institutions at the top of their range), .43 (the ledger never creates a material; the ruins basis and reach; J-A8.45 amended), .44 (the timber shortfall and scarcity; J-A26.42 amended), .45 (quarries of native stone, structures included; J-A65.45 amended), .46 (the native test over the creation arena and the dossier's facts), .47 (a declared partner is a licence only), .48 (carriage per load), .61 (the streams), .81 (`lit`'s roof by covering; J-A19.81 kept under FTG and switch off)",
  "the register's J-A116.01, .21 (the default model; J-A19.21 superseded), .22 (which prosperity reads which), .23 (institutions at the top of their range), .24 (carriage per load), .41 (the ledger never creates a material; the ruins basis and reach; J-A8.45 amended), .42 (the timber shortfall and scarcity; J-A26.42 amended), .43 (quarries of native stone, structures included; J-A65.45 amended), .44 (the native test over the creation arena and the dossier's facts), .61 (the streams), .71 (a declared partner is a licence only), .81 (`lit`'s roof by covering; J-A19.81 kept under FTG and switch off) — the first digit naming the part that states the rule")

r('116 (r) V02 row: no new bar',
  "T-V2-25 extended and a bar that the heavier part is below |",
  "T-V2-25 extended with T116-10's heavier-part clause (no new id) |")

r('116 (r) V05 row: material supply',
  "| **V05** sky | the landfall credit as family `stone` at the decoration's face centroid; island buildings on the settlement's supply;",
  "| **V05** sky | the landfall credit as family `stone` at the decoration's face centroid; island buildings on the settlement's material supply;")

r('116 (r) V07 row: no new bar',
  "a village bar (native-only at every rung and epoch) at V-M1 |",
  "T116-3 and T116-25's H-NATIVE run at the village rungs from V-M1 (no new id) |")

r('116 (r) V08 row: T-V8-20 extended',
  "§1b's rows; a T-V8 bar that the fill reads only the named fields |",
  "§1b's rows; T-V8-20's ignore clause extended — the fill reads only the three admitted partner fields (T116-13; no new id) |")

r('116 (r) V09 row: Trade control group',
  "the standalone Trade control (name, route, supplies; the advanced panel);",
  "the standalone Trade control (name, route, supplies; the advanced panel's \"Site\" group, id `circumstances.trade`);")

r('116 (r) V10 row: creation vs edit mode',
  "the creation mode (a description naming a material the site lacks proposes `adjust('circumstances.trade', …)` with a declared partner standalone, else reports);",
  "a description naming a material the site lacks — standalone, in creation mode the new document's creation-slice `trade` gains a declared partner (as `magic` goes to the creation slice) and in edit mode `adjust('circumstances.trade', …)` is proposed; on a dossier map, reported;")

for label, old, new in R:
    n = t.count(old)
    if n != 1:
        sys.exit(f'FAIL {label}: {n} matches')
    t = t.replace(old, new)
    print('ok', label)
open(dst, 'w', encoding='utf-8').write(t)
