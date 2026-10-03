from lib import *
t = extract(2944, 3082)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t); t = norm_items(t); t = norm_d5(t)
R = [
("| a declared way: V09's delete of its declaration (the event's inverse); a carried generated way: critique C6-39's suppression — its reason key in the log —",
 "| a declared way: V09's delete of its declaration (the event's inverse); a carried generated way: the raised ways' suppression (§4.3, item 290) — its reason key in the log —"),
("Converting land by hand — a furlong to pasture, a wood cleared — is `convert` with `retypeLand` (item 209, which absorbs item 209), under T2 `ground`'s land-use chip.",
 "Converting land by hand — a furlong to pasture, a wood cleared — is `convert` with `retypeLand` (item 209), under T2 `ground`'s land-use chip."),
("| a raised way's removal (V09's delete; critique C6-39's suppression) |", "| a raised way's removal (V09's delete; the raised ways' suppression, §4.3, item 290) |"),
]
t = apply(t, R, strict=False)
# §4.2: the forms are §7.1's (item 357); this section keeps their village meaning (V07-0273)
i = t.index('### 4.2 The new event forms'); j = t.index('### 4.3 Locality')
s42 = """### 4.2 The new event forms

§7.1's `EditEvent` union carries the village's two forms (item 357), cited, not restated: **`declareEnd`** — an end
declared by a lasso (`boundary`), its `kind`, an optional `name` and an anchor (absent: the most significant entity inside
the lasso); the sugar `quarter` expands to it at a village rung; it creates a declared `VillageEnd` keyed by the event's
address, held — and **`drawWay`'s `walk`** — one tracker from the first point by VS4's step rules (V07 §3.5), its branches
off, the laid spine resolved into `points` at the dry run and stored. `walk` and item 110 (b)'s `raised` flag are
exclusive: a `drawWay` carrying both is bent by its dry run to the points form (the walked spine resolved into `points`,
the walk dropped) with a one-line note — a walker follows the ground and a deck does not (item 101 R2). The land retype is
V06's `EvolveOp` member `retypeLand` (§2.8, item 209), one op for both volumes.

`setAttr` reaches the village's recorded inputs — `VillagePlan.form`, `.roads`, `.nuclei`, `.character.*` (each a
recorded input, V07 §2.3), `VillageRequest.*` (the Adjust events of T1), `Reservation.kind` between `green` and `plaza`,
`Enceinte.kind` among the village kinds, `VillageField.name` and `.kind`, `VillageEnd.name` — each with the base's dry
run, fate report and inverse (§7.1, §7.4).

"""
t = t[:i] + s42 + t[j:]
# §4.5: the village WhyProvider as rows (W-IF-02; CVR-V10-14)
i = t.index("**\"Why is this here\"** answers from the rows that pulled it:")
j = t.index('## 5 Rendering, labels and exports')
s45 = """**The village `WhyProvider`** (`kinds: ['VillagePlan', 'VillageField', 'VillageEnd']`; V10 §3.9's owed row, through the
entity registry's explainer per kind, §2.8, item 270; W76). It answers V10 §3.9's `WhyAnswer` for the three village
kinds; every other "why" on a village is its own kind's provider reading this volume's rows. Its rows (each `says` a key
of V09's catalogue; T-V7-60):

| kind (path) | facts | cause | pulls, closure, sections | `says` |
|---|---|---|---|---|
| `VillagePlan` (`heart`) | the heart's point; `heartSource` | VS1's score (V07 §3.2 (4)), or the `placeAt` that moved it | the score's terms as `WhyPull`s: the crossing, fresh water, the sunny slope × the climate cell, wind, prominence, fertile ground, the frame, the water pull (item 111), the chance | `info.village.heart.<term>` ("the ford +0.6, the sunny slope …") |
| `VillagePlan` (`form`, `roads`) | the form or road topology; `formSource`, `roadsSource` | S0's draw (V07 §3.1 steps 2–3) with the culture multipliers, the request, the dossier's culture or access word, or the `setAttr` | — | `info.village.form.<source>`, `info.village.roads.<source>` |
| `VillagePlan` (`palisade`) | kind, `closure`, the stretch profile | VS3 (V07 §3.4) or `drawWall` | `closure` rows (item 106 (g)) | `info.village.palisade.<barrier>` ("the river is the wall here"; "the scarp is the wall here") |
| `VillagePlan` (`opens`, the market) | kind, size, the market rank and its source | V07 §3.6; a market record, or the market law's crossing | — | `info.village.open.<kind>`, `info.village.market.<record¦law>` |
| `VillagePlan` (the remnants of a former town, item 113) | the peak (its provenance `symbolic` where it is), the replay's epochs | §4.11's history-first generation: the replay record's epochs as `cause` rows (V06's record; V10 tells the story) | — | `info.village.history.peak`, `info.village.history.symbolic` ("its exact size is not recorded") |
| `VillageField` | kind, system, rotation slot, `holder` | S0's field draw with `rules.fields.factor`; V07 §3.9's claim; a `retypeLand` or the epoch that turned it | the suitability terms as pulls: fertility, slope, daylight, distance, flood ground | `info.village.field.<kind>` ("this strip belongs to the third toft on the street") |
| `VillageEnd` | kind, anchor, name, `declared` | VS8's anchors (V07 §3.10), a dossier quarter's claim, or `declareEnd` | — | `info.village.end.<kind>`, `info.village.end.claim`, `info.village.end.declared` |

Item 110's village words (V10's rows of `raised` and `RetainingWall`, read at village rungs; CVR-V10-14's V07 half): a
generated wall from its platform's step ("This wall holds the house platform above the lane — the ground falls 22 %
here"); a carried raised way from its reason and year ("The arches were built in year N, when this was a city, for its
water; they outlived it"); a removal ("You removed the viaduct; the town will not rebuild it"); an absence — V10's
`belowCity` row in its village wording ("villages never build them; you may draw one"); a pier head ("A net store on the
pier head: the landing's"); a scarp ("The terrace of a house that stood here until year N").

**What the other kinds' providers read here.** A house from its slot's density and rim multiplier and its block's quota
(V07 §3.8); a class from its V07 §2.4 profile, the relation and coverage rows the solver summed and the signature pairs
that fired (item 103 (e)); a wood from V07 §3.9's suitability terms, the shade among them (item 102 (f)); a custom
institution from its resolved profile's sources (item 104 (a)); a trade from the links and goods that pulled it (item 105
(j): "the bakehouse stands by the green because its bread is eaten there; its flour comes from the mill at the ford"), or
from the coverage and spacing that pushed it ("the second alehouse serves the mill end; the first is 300 m away"); a
market hall from its claim; the fair field from its record; a pin from the record that forced it or the VS8 row and epoch
that placed it, read from its provenance ("the old shrine is the churchyard cross now"; "a well sunk in year N for the
new cottages by the mill lane"); a ladder record from its members ("Blacksmiths (3-10): three smithies, at the ford, the
green and the north entry"); the underground from V04's records (V10's rows): an unexcavated void ("the ruins under the
green; nobody has dug down yet"), an access from its `cause` ("the smith's cellar broke into the cave"), a dwelling from
its access; a church's crypt or its absence ("most village churches had none; the dead lie in the churchyard"); a burial
face ("the churchyard: where the town's catacombs may begin"); a hollow way from its disuse epoch.

"""
t = t[:i] + s45 + t[j:]
t = t.replace('## 5 Rendering, labels and exports', '').rstrip() + '\n'
save('16-s4.md', t)
print('ok', len(t.split()))
