# Amendments h — owner rules received on the new account (2026-10-13)

Numbered from **129** (file g ended at 128). Applied directly to the base and the volumes by the session at the owner's word
(J345), as item 128 was; the owner's words are also filed in `docs/OWNER-INSTRUCTIONS-2026-09-25.md`. Legend as in file c:
the owner's words are the authority; the consequences are the program's vetoable interpretation.

---

129. **OWNER RULE — Four more biomes: tundra, jungle, savanna and swamp (owner, 2026-10-13 ~14:50 EDT).** Owner, after the
     session answered that the design's biomes were six climate rows with no tundra, jungle, savanna or swamp: "Can you update
     the architecture to include tundra, jungle, savanna, and swamp?"

     **(a) THE ROWS.** V11 §3.17.1's climate rows gain `tundra`, `jungle`, `savanna` and `swamp` (the table's columns; `own`,
     calibratable; PLAUSIBLE until M-CAL measures them): tundra — `ground.cold`, birch 0.7 / 0.6 and spruce 0.3 / 0.4 (the tree
     line's dwarf birch and its last spruce), `infieldOutfield`, `perimeter`, gable · 0.9, scatter 0.05–0.2, rain 300; jungle —
     `ground.grass`, broadleaf-evergreen 0.6 / 0.5 and palm 0.4 / 0.5, `enclosed`, `rivers`, hip · 1.2, scatter 1.5–3.0, rain
     2 500; savanna — `ground.dry`, thorn 0.6 / 0.6, palm 0.2 / 0.2, ash 0.2 / 0.2 (deciduous in the dry season),
     `infieldOutfield`, `rivers`, hip · 1.1, scatter 0.1–0.4, rain 800; swamp — `ground.grass`, ash 0.4 / 0.4, birch 0.3 / 0.3,
     hazel 0.3 / 0.3 (willow, alder and the carr's scrub drawn by these crowns), `enclosed`, `rivers`, gable · 1.1, scatter
     0.3–0.8, rain 900. The species stay the crown kinds V11 draws, with ONE new kind, `broadleaf-evergreen` (the jungle's canopy
     hardwoods: an evergreen broad crown §8.10's stamps draw like the oak's in the evergreen tint; no `season.leaf` row, as every
     evergreen). The field systems and farm layouts are §4.9's existing ones: a paddy, a shifting garden or a water meadow stays
     the later climate content item 128 (f) names. The ground roles are the existing three: a swamp's low ground is the `marsh`
     land use around the dry ground the settlement stands on, not a new role.
     **(b) WATER** (V11 §3.25.1's cells): tundra as the `cold` row; jungle aridity 0.02, pull 0.05 · 300, term 0.02, sun 1,
     wells 0.1 · 1.0; savanna aridity 0.5, pull 0.4 · 500, term 0.3, sun −0.2, wells 0.6 · 0.8; swamp aridity 0, pull 0.02 · 200,
     term 0, sun 1, wells 0.1 · 1.0, and S1's marsh over the frame's low ground at chance 1 (the `site` row's marsh word) beside
     the feature table's river, lake and coast. The savanna's dry season is a season, not aridity: 0.5 stays below `aridMin`, so
     no oasis by rule (a dossier's `oasis_water` still makes one). The swamp's pull is near 0 — water lies everywhere and the
     raised ground is prized instead, which §4.5's relief term already reads — so no dry-ground term is added.
     **(c) SEASONS** (V11 §3.25.6's cells): tundra winter severe, leaf colour 24–27, leaf fall 26–29, blossom 11–13, growing
     10–23, harvest 19–23, hay 17–20, ice 29–13, snow 29–15; jungle winter none, blossom 8–12, growing 0–51, harvest 20–26 (a
     second crop in 44–50 is a note until the cell admits two bands), no leaf colour, fall, hay, ice or snow; savanna winter none,
     leaf colour 30–34, leaf fall 34–40 (the dry season), blossom 2–6, growing 0–22 (the rains), harvest 20–27, hay 18–22, no ice
     or snow; swamp winter cold, leaf colour 28–35, leaf fall 31–37, blossom 3–7, growing 0–25, harvest 22–30, hay 14–18, ice
     43–50, snow 43–51. Item 124 (c)'s hard rules hold unchanged: the two `none` winters never freeze and draw no snow.
     **(d) WEATHER** (V11 §3.25.11's cells): tundra — rain 13–25 · 1.5, drizzle 13–25 · 1, snow 29–30 · 1, 31–13 · 3, 14–15 · 1,
     mist 13–25 · 1, fog 26–30 · 1 and 31–13 · 1 (frozen), leaves 26–29 · 2, cloud shadows 13–25 · 3; jungle — rain 0–12 · 2,
     13–25 · 5 (the rains, 90–240 s), 26–38 · 2, 39–51 · 1, drizzle 0–51 · 1, mist 0–51 · 1, fog 0–12 · 0.5 and 26–51 · 0.5,
     cloud shadows 0–51 · 3, no leaves, no snow; savanna — rain 0–12 · 2, 13–22 · 4 (the rains, 60–180 s), 23–30 · 0.5, drizzle
     0–22 · 0.5, mist 0–22 · 0.5, leaves 34–40 · 2, cloud shadows 0–22 · 3 and 23–51 · 1, shimmer 26–51 · 2, dust 30–51 · 1.5;
     swamp — rain 0–12 · 3, 13–25 · 1.5, 26–40 · 3, drizzle 0–12 · 2 and 26–40 · 2, snow 43–44 · 1 and 45–51 · 2, mist 0–51 · 2
     (the marsh's), fog 26–42 · 2.5 and 43–51 · 1, leaves 31–37 · 4, cloud shadows 0–12 · 2, 13–25 · 2, 26–40 · 2. The
     `riverside` weather site also applies where a marsh lies in the frame. No new row is arid, so item 124 (c)'s rain caps touch
     none.
     **(e) THE PORT AND THE SITE WORDS.** V08 §2.6's `climates` row maps four terrain words to their rows — `tundra`,
     `jungle`, `savanna`, `swamp`. SettlementForge's `terrainType` carries seven words today (plains, riverside, coastal, hills,
     forest, mountain, desert; `research/sf/mapping.md`) and none of the four: they reach the port through `terrainOverride` or
     a later SettlementForge terrain vocabulary (M-SF; PLAUSIBLE), and standalone through the blueprint's climate pick. §7.7's
     `site.terrain` reading names the four words; DR42's height correction reads `jungle` and `savanna` as warm rows, `swamp` as
     temperate and `tundra` as severe — the coldest, corrected no further.
     **(f) WHAT STAYS.** The default row `temperate-deciduous` and every fallback (V11 §3.26's M-V11-3289-E1 and M-V11-599-E5);
     the land-use rows but the pasture sentence (cattle in maritime, savanna and swamp); the kernel and every stage mechanism —
     content rows only; the underground: V04 reads a `tundra` site as the `cold` row (a permafrost rule is later underground
     content, `docs/BACKLOG.md`), and the tundra's herds draw the default pasture symbol until a herd symbol row exists.
     **(g) WHERE IT TOUCHES.** V11 §3.17.1, §3.17.2 (pasture), §3.25.1, §3.25.6, §3.25.11 (the rows, the intro's defaults, the
     `riverside` site); V08 §2.6 (`climates`) and its `site.terrain` sentence; base §7.7 (`site.terrain`, DR42's ladder);
     §8.10's stamps gain the `broadleaf-evergreen` crown (M2b). Estimate: content rows only — a fraction of a person-week at M1
     for the rows and §4.9's reading of them, the crown stamp inside M2b's stamp work; no kernel change. Staging: the rows with
     M1's content tables (V11), the looks with M2b's view, the port words with M-SF. Nothing in `plat/` changes: no M0 item owns a
     climate row.
