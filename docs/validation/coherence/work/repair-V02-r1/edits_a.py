"""Issues VAF-R0S-01, -13, -17, -27; VAP-03; VEW-15, VEW-20; VV12-08, -09, -14, -15; VV56-29 (and same-defect sites)."""
import os
S = os.path.dirname(os.path.abspath(__file__))
ORIG = open(os.path.join(S, 'V02.orig.md'), encoding='utf-8').read()

LAT = ("§7.7's `Intent.latitudeDeg` (DR29 on a dossier map; absent 50) — the latitude item 102's model sampler reads "
       "(§4.5), never the style's `SunSpec.latitudeDeg`")


def add(E):
    # ---- VV12-02 (6): the citations paragraph's range of file g (item 120 filed 2026-10-01, J133, so file g now ends at 120)
    E('VV12-02 (6) citations', "(owner items 1–101, file g 102–113, file f 200–585;",
      "(owner items 1–101, file g 102–120, file f 200–585;")
    # ---- VAF-R0S-01: the model-side latitude (§1b, §1c, M5)
    E('VAF-R0S-01 §1b', "| §8.4 `Sun.latitudeDeg` (item 102's sampler, DR29); the constants row; the presets |",
      "| " + LAT + "; the constants row; the presets |")
    E('VAF-R0S-01 §1c', "| §4.5 (1) significance; §8.4 `Sun.latitudeDeg` | σ; the settlement's latitude |",
      "| §4.5 (1) significance; " + LAT + " | σ; the settlement's latitude |")
    E('VAF-R0S-01 M5', "where the settlement's latitude (§8.4 `Sun.latitudeDeg`, the value item 102's sampler reads) is positive",
      "where the settlement's latitude — §7.7's `Intent.latitudeDeg` (DR29 on a dossier map; absent 50), the latitude item\n"
      "  102's model sampler reads (§4.5), never the style's `SunSpec.latitudeDeg` — is positive")

    # ---- VAF-R0S-13: the deck stand-ins removed; no deck plot exists without a `deck` row
    E('VAF-R0S-13 §1b budget',
      "| V11's table `deck` by deck kind × band (V02 X16); the constants `deck.fallbackM2`, `deck.fallbackFloors` only while V11's `deck` table is not registered (V02 §3.16 (2)) |",
      "| V11's table `deck` by deck kind × band (V02 X16), registered from C0 (V11 §2.1's empty-table rule): no deck plot exists without its row (V02 §3.16 (3)) |")
    E('VAF-R0S-13 §1b constants', "`riserMaxCm`, `deck.fallbackM2`, `deck.fallbackFloors`, `ovalSides`", "`riserMaxCm`, `ovalSides`")
    E('VAF-R0S-13 §1b consumers', "`stairTreads`, the exports, M10 and M11 on decks, stair 0's approach strip (`landingM`)",
      "`stairTreads`, the exports, stair 0's approach strip (`landingM`)")
    E('VAF-R0S-13 §3.10.9 row',
      "| `deck.fallbackM2`, `deck.fallbackFloors` | [20, 60] m², 2 | V02 §3.16 (2): read only while V11's `deck` table is not registered (V02 X16) |\n",
      "")
    E('VAF-R0S-13 §3.10.10 line',
      "| the `@deck` rows and the stand-ins `deck.fallbackM2`, `deck.fallbackFloors` | `measure` at M3a-V2 (T-V2-47: ≥ 95 % inside the deck band), then `panel` at M4 (M4-110, V12 §3.11's `deck` line) | `deck.buildings`, `bar.T-V2-47` | the panel rule; the two stand-ins close `fixed: superseded by V11's deck row` when that row lands (V12 §3.11) |",
      "| the `@deck` rows | `measure` at M3a-V2 (T-V2-47: ≥ 95 % inside the deck band), then `panel` at M4 (M4-110, V12 §3.11's `deck` line) | `deck.buildings`, `bar.T-V2-47` | the panel rule |")
    E('VAF-R0S-13 §3.16 (3)',
      "**The stand-ins (X-V11-7):** the constants `deck.fallbackM2` and\n"
      "   `deck.fallbackFloors` (V02 §3.10.9) are read in place of the band and `maxFloors` only while V11's `deck` table is not\n"
      "   registered (a build-order stand-in); a document whose pinned `deck` table resolves off never reads them, and a deck plot\n"
      "   exists only where V11's `deck.offer` drew yes, so a deck plot with no `deck` row cannot arise at run time.",
      "**No deck plot without a `deck` row:** V11's `deck`\n"
      "   table is registered from C0 (V11 §2.1's empty-table rule) and a deck plot exists only where its `deck.offer` drew yes\n"
      "   (§4.7 *Deck plots*), so M10 and M11 read a `deck` row on every deck plot and V02 keeps no stand-in.")
    E('VAF-R0S-13 §4.6 (7) why', "`maxFloors`, and whether the stand-in constants were read, V02 §3.16 (2)), each with",
      "`maxFloors`), each with")
    E('VAF-R0S-13 §8.4 R10',
      "| **R10** V11's `deck` row late | medium / low | the stand-in constants (V02 §3.16 (2)) |",
      "| **R10** V11's `deck` rows late | medium / low | nothing breaks: an empty `deck` table offers no deck plot (V11 §2.1's empty-table rule), so stage 3 meets no deck building without its row; T-V2-47 and M3a-V2's exit wait for C3b's rows (V11 §8) |")
    E('VAF-R0S-13 X16 stand-in column',
      "| the constants `deck.fallbackM2` and `deck.fallbackFloors` (V02 §3.16 (2)); without `deckOk`, every class the base places on a deck plot composes by its `@deck` row |",
      "| without `deckOk`, every class the base places on a deck plot composes by its `@deck` row |")
    E('VAF-R0S-13 received X-V11-7',
      "| V11 X-V11-7 | X16's constants read only while V11's `deck` table is not registered | V02 §3.16 (2) |\n", "")

    # ---- VAF-R0S-17: the specialisations keyed by culture × class (X17, and the same wording at X26, §3.18 (b), J-V2.63, §0)
    E('VAF-R0S-17 X17',
      "the specialisations `stepped_temple` (temple and great temple, by the region and era rows), `terraced_palace` (palace) and `tiered_tower` (tower), each naming its composition key in `DesignationTemplateRow.composition` (item 426, written by item 259's replacement), with their chance and cap rows (≤ 0.1 % of buildings), keyed by culture and class for DR15;",
      "the specialisations of V11 §3.24.3 (culture × class rows: `stepped_temple`, `terraced_palace`, `tiered_tower`), each naming its composition key in `DesignationTemplateRow.composition` (item 426, written by item 259's replacement), with their chance and cap rows (≤ 0.1 % of buildings), the culture read through DR15;")
    E('VAF-R0S-17 X26', "a village class takes tiers only through V11's region and era specialisations applied to the `v.` class",
      "a village class takes tiers only through V11 §3.24.3's culture × class specialisations applied to the `v.` class")
    E('VAF-R0S-17 §3.18 (b)', "no stepped building unless V11's region and era specialisation applies to the `v.` class",
      "no stepped building unless V11 §3.24.3's culture × class specialisation applies to the `v.` class")
    E('VAF-R0S-17 J-V2.63', "(V11's region and era specialisations, a declared class, the `family` op)",
      "(V11 §3.24.3's culture × class specialisations, a declared class, the `family` op)")
    E('VAF-R0S-17 §0',
      "shapes appear only where the region and era call for them (a stepped temple in a culture that builds them), never in an",
      "shapes appear only where the settlement's culture builds them, never in an")

    # ---- VAF-R0S-27: levelledGroundCm is §4.7's, stepProfile §2.7's (J-V2.72, J-V2.98; same defect at §1b and §12)
    E('VAF-R0S-27 J-V2.72 a', "Every datum sample is `levelledGroundCm` (V05's item 309; item 370)",
      "Every datum sample is §4.7's `levelledGroundCm` (item 309; item 370)")
    E('VAF-R0S-27 J-V2.72 b', "the terrace V01's `stepProfile` reads on each side of the wall.",
      "the terrace §2.7's `stepProfile` reads on each side of the wall.")
    E('VAF-R0S-27 J-V2.98 a', "through V05's `levelledGroundCm`** (item 370, item 231)",
      "through §4.7's `levelledGroundCm`** (item 370, item 231)")
    E('VAF-R0S-27 J-V2.98 b', "the step V01's `stepProfile` draws from the same datums",
      "the step §2.7's `stepProfile` derives from the same datums")
    E('VAF-R0S-27 §1b', "`levelledGroundCm(doc, key, p)` — V05's levelled-ground reader (item 309)",
      "`levelledGroundCm(doc, key, p)` — §4.7's levelled-ground reader (item 309)")
    E('VAF-R0S-27 §12', "`stairChain`. V05's `levelledGroundCm(doc, key: PlatKey,",
      "`stairChain`. §4.7's `levelledGroundCm(doc, key: PlatKey,")

    # ---- VAP-03: the base bars T-V2-44 and T-V2-47 take
    E('VAP-03 T-V2-44', "* **T-V2-44 tiers nest and cast one shadow each** (item 110 (f)) —",
      "* **T-V2-44 tiers nest and cast one shadow each** (item 110 (f); takes T110-4) —")
    E('VAP-03 T-V2-47', "* **T-V2-47 deck buildings** — every deck-plot building",
      "* **T-V2-47 deck buildings** (takes T110-5's deck-building clause; the deck-plot clauses stay T-V1-53's and\n"
      "  T-V6-63's) — every deck-plot building")

    # ---- VEW-15: no deck plot on a gate's moat deck (§3.16 (1), §3.18 (f), T-V2-47 and its fixture)
    E('VEW-15 §3.16 (1)',
      "**No deck plot on a\n"
      "   ford, a drawbridge or an unbuilt deck**: a `Bridge` of kind `ford` or `draw`, or one whose `deckCm` is not yet set\n"
      "   (§2.7: optional until S7 builds the bridge), offers none (item 246).",
      "**No deck plot on a\n"
      "   ford, a drawbridge, a gate's moat deck or an unbuilt deck**: a `Bridge` of kind `ford` or `draw`, or one whose\n"
      "   `deckCm` is not yet set (§2.7: optional until S7 builds the bridge), offers none (item 246), and no moat deck at a gate\n"
      "   offers any (a gate's approach stays clear, §4.7 *Deck plots*).")
    E('VEW-15 T-V2-47', "**the ford and the drawbridge carry no deck plot;",
      "**the ford, the drawbridge and the gate's moat bridge carry no deck plot (§4.7 *Deck plots*);")
    E('VEW-15 §7.7 fixtures', "a **ford** and a\n**drawbridge** (no deck plot);",
      "a **ford**, a\n**drawbridge** and a fixed **moat bridge at a gate** (no deck plot);")

    # ---- VEW-20 (rung column), VEW-15 (bridge row), VV12-09 (the oasis's spring pool): §3.18 (f) rebuilt row by row
    lines = ORIG.split('\n')
    i0 = lines.index('| combination | outcome | test |')
    assert lines[i0 + 1] == '|---|---|---|'
    rows = []
    j = i0 + 2
    while j < len(lines) and lines[j].startswith('| '):
        rows.append(lines[j]); j += 1
    assert len(rows) == 17, len(rows)
    R = {
        'a cliff and a composed building': '—',
        'steep ground and a composed building': '—',
        'steep ground and tiers': 'repair locally (the stair steepened, `stairSteep` reported)',
        'steep ground and a crypt': '—',
        'a river, a coast, a moat or an oasis and a crypt': '—',
        'a coast or an oasis and a composed building': '—',
        'a harbour and a composed building': '—',
        'a bridge (over a river or a moat) and a composed building': '—',
        'a moat, a square or the map frame and a composed building, tiers or a crypt': '—',
        'a raised way and a composed building, tiers or a crypt': 'leave out and report (a cleared building, its basement and crypt); substitute (the bound use at its new building); repair locally (`vaultClamp`)',
        'a stage-2 neighbourhood (V01) and a composed building': '—',
        'a terraced ward (V01) and a composed building or a crypt': '—',
        'a lock and a composed building': '— (a refusal, the lock named; item 101 R2)',
        'a crypt and undo': '—',
        'a settlement growing over a sealed void': '—',
        'a dossier removing what an edit pinned': 'leave out and report (the orphaned edits listed)',
        'an epoch undone after a save': '—',
    }
    new_rows = []
    for r in rows:
        cells = r.split(' | ')
        first = cells[0][2:]
        assert first in R, first
        test = cells[-1]
        mid = ' | '.join(cells[1:-1])
        if first == 'a bridge (over a river or a moat) and a composed building':
            first = 'a bridge over a river, or over a moat away from a gate, and a composed building'
            assert mid == ("a deck plot's building by V02 §3.16 (deck datum, `maxFloors`, no basement); a ford or a "
                           "drawbridge carries no deck plot"), mid
            mid = ("a deck plot's building by V02 §3.16 (deck datum, `maxFloors`, no basement); a ford, a drawbridge or "
                   "a gate's moat deck carries no deck plot (§4.7 *Deck plots*)")
        if first == 'a moat, a square or the map frame and a composed building, tiers or a crypt':
            first = "a moat, a square, an oasis's spring pool or the map frame and a composed building, tiers or a crypt"
            old_mid = ("none crosses the plot, so `H` excludes them, and a basement or crypt lies under its building inside "
                       "the plot; a porch stays inside the plot, clear of ways (T-V2-12); the base's margin band keeps plots "
                       "off the frame")
            assert mid == old_mid, mid
            mid = ("none crosses the plot, so `H` excludes them, and a basement or crypt lies under its building inside "
                   "the plot; an oasis's spring pool is water outside the plot (item 111), so `H` excludes it and a stack "
                   "stands inside `H`, tier 0 on `deriveBase`'s datum over its own samples (V02 §3.15.2); a porch stays "
                   "inside the plot, clear of ways (T-V2-12); the base's margin band keeps plots off the frame")
            assert test == 'T-V2-1, T-V2-12, T-V2-36 |', test
            test = 'T-V2-1, T-V2-12, T-V2-36, T-V2-57 |'
        new_rows.append('| ' + first + ' | ' + mid + ' | ' + R[cells[0][2:]] + ' | ' + test)
    # one more combination row: a rung change at an epoch (item 115 (e)), placed before the epoch-undo row
    new_rows.insert(len(new_rows) - 1,
        "| a rung change at an epoch and a standing composed building (item 115 (e)) | the crossing reshapes no standing "
        "building, up or down: its re-derivations read the ceiling of the rung its `MassingRef.row` records; a building new "
        "or rebuilt from that epoch reads the new rung's ceiling (V02 §3.2 step 2; V06 §3.8.5) | — | T-V2-58 |")
    old_block = '\n'.join(lines[i0:i0 + 2] + rows)
    new_block = '\n'.join(['| combination | outcome | rung | test |', '|---|---|---|---|'] + new_rows)
    E('VEW-20 VEW-15 VV12-09 §3.18 (f)', old_block, new_block)
    E('VEW-20 §3.18 (f) intro',
      "**(f) Combinations** — where another unit's feature meets a V02 mechanism at its limits:",
      "**(f) Combinations** — where another unit's feature meets a V02 mechanism at its limits; the rung column names the\n"
      "§5 rung of a failure outcome, and — marks a rule with no failure:")

    # ---- VV12-09: T-V2-57's oasis clause gains a stepped building beside the pool
    E('VV12-09 T-V2-57', "an oasis town's\n  `water`-axis class laid on the spring pool's side;",
      "an oasis town's\n  `water`-axis class laid on the spring pool's side, and a stepped building beside the pool standing inside `H`, tier 0\n"
      "  on `deriveBase`'s datum;")

    # ---- VV12-08: the shed case of valleyReach recorded as J-V2.109 (the row itself is in edits_c)
    E('VV12-08 §3.7', "for a `shed` `Y` the integer mode reads\nthe shed's full run, as the roof plane does (the two expressions disagreed there; T-V2-54).",
      "for a `shed` `Y` both modes read\nthe shed's whole run, as the roof plane does (J-V2.109; T-V2-54).")

    # ---- VV12-14: ID-WX — no bare foreign row ids; Integration notes cite the J-VI decisions only
    E('VV12-14 §4.6 (7)', "carries two read-only paths for V10's providers and V09's panels (CVR-V10-8): `massing/stack`,",
      "carries two read-only paths for V10's providers and V09's panels: `massing/stack`,")
    old_in = ORIG[ORIG.index('## Integration notes\n'):]
    assert old_in.count('IN-V02-') == 5
    new_in = ("## Integration notes\n\n"
              "The volumes-integration decisions (`docs/volumes/_integrate.md`) this volume carries, each stated at its home and cited\n"
              "there: J-VI.7 (the island's crypt vault under the building's lowest massing tier, X20); J-VI.17 (the solid stack's\n"
              "`external` access and its door at `basementDoor(b)`, item 371 and V02 §3.15.3; the walk-out at a retaining wall, item\n"
              "242 and V02 §3.17 (a); every `setMassing` dry run and `setComposition room` listing the plan items it would orphan,\n"
              "V02 §4.2 step 2 and V02 §4.3; the registry paths, V02 §4.6 (7)); J-VI.4 and J-VI.5 (the no-refusal rule every volume\n"
              "follows, V02 §4.6; the tier contract V04, V06, V09 and V10 adopt, V02 §3.15); and file f's item 246 (X28's deck-plot\n"
              "fields).\n")
    E('VV12-14 Integration notes', old_in, new_in)

    # ---- VV12-15: V03's P0, P1 and P3 on the base's buildings after M4
    E('VV12-15 §8.1',
      "**The plan rung comes first on the base's buildings (J122: V03's Q1 yes).** V03's P0–P1 run on base wings right after M4\n"
      "and take the composer's rooms and dormer rows when M6b lands (V03 §8; the plan rung's milestone M6-P, item 567);",
      "**The plan rung comes first on the base's buildings.** V03's P0, P1 and P3 run on the base's buildings after M4 (V03 §8;\n"
      "J-V3.132; J122) and take the composer's rooms and dormer rows when M6b lands (the plan rung's milestone M6-P, item 567);")
    E('VV12-15 J-V2.32',
      "the plan rung (V03) runs its P0–P1 on base wings right after M4 (J122: V03's Q1 yes) and takes the composer's rooms and dormer rows when M6b lands (V03 §8), so",
      "V03's P0, P1 and P3 run on the base's buildings after M4 (V03 §8; J-V3.132; J122), the plan rung taking the composer's rooms and dormer rows when M6b lands, so")

    # ---- VV56-29: removed V06 X ids cited by the V06 rule each closes; the same defect for V08's removed X6 and V03's step W4
    E('VV56-29 V06 X3', "| V06 X3 | V03's rank re-runs", "| V06 §3.18.3 (1)–(2) | V03's rank re-runs")
    E('VV56-29 V06 X24', "| V06 X24 | deck-plot buildings at an epoch through S11's capped mutator |",
      "| V06 §3.8.4, V06 §3.19.5 (2) | deck-plot buildings at an epoch through S11's capped mutator |")
    E('VV56-29 V08 X6', "| V08 X6 | the stepped specialisation rows", "| V08 §2.6b (4) | the stepped specialisation rows")
    E('VV56-29 V03 W4', "under that eave (V03 W4)", "under that eave (V03 §3.6 W4)")
