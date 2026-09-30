
## 11 Cross-part notes (for the Assemble seat and the sibling editors)

1. **scope §14 `PortNote`** — the kind union gains `frozen_fact_changed` (class `event`, words at V08 §4.6), written by
   V08 §3.5's `site` and `history` rows (W-DOS-08).
2. **determinism §7.7 item 13** — the port's receipt rows read "F-V8-1 … F-V8-8": F-V8-8 is the `site` and `history`
   singletons (arrival; response `none`; the frozen note), defined at V08 §3.6 (1). The prosperity word's change is F9
   with element `settlement`, op `prosperity` (the op the base's union already holds).
3. **determinism §7.7 DR1** — its failure clause should read as E-31's union: "on a `desert` site with no `oasis_water`
   and no river the arid row draws or the dossier gives, where S1's relief cannot carry the brook, or with a fixed
   `isolated` or `none` access word, no brook, the build report noting `toll_bridge_dry` (V08 §2.6b (3); item 399)"
   (today: "on `desert` without an oasis, or where S1's relief cannot carry it").
4. **model §2.7 `HistoryHint`** — its comment should cite V08 §2.6c for the replay's inputs it carries under item 113
   (`events`, `peakTier`, `peakPopulation`, `tierHistory`, `populationHistory`, `calamityHistory`, `lifecycle`,
   `ancientFallYearsAgo`, `peakEvidence`), declared there.
5. **scope §14 `DossierDigest.history`** — its comment should cite V08 §2.6c's additions (`events[].template`,
   `.ancientRuin`, `peakTier`, `tierHistory`, `populationHistory`, `lifecycle`), as it cites V08 §2.5's.
6. **rendering §11.3** — the sentence "in host mode the module answers an `export.request` for any format other than
   `png`, `svg` and `print` with `E_HOST_FORMAT` (V08 §5.4)" should add "save, from M-SF, the export bundle's `dd2vtt` and
   `foundry` requests with `opts: { bundle: true }` (V08 §5.4 (2))" so §11.3 and §11.4's bundle paragraph agree.
7. **scope §16 and INDEX §3/§4** — M-SF's price is now 17.75–23.5 pw (V08 §8.2: +0.25 SF3 field table, +0.75 SF4 g items
   and diff rows, +0.25 SF5 SettlementForge's inputs, +0.25 SF6 export bundle, +0.5 SF7 edges); VH sits inside M-SF.
8. **V06** — (a) W27 reads V08 §3.5's `wealth` row as a `prosperity` change (F9), not `attr`; (b) V06 §3.20.1 (2): the
   effective peak's tier is the highest tier V08 §2.6c (5)'s evidence list shows, its entries the record's evidence; the
   symbolic size reads the band of V08 §2.6's `tiers` row; (c) a stamped `peakTier` with no high-water population in its
   band (`peakPopulation` absent) needs V06's sizing rule stated (the band at V11's quantile, marked `symbolic`, is the
   consistent reading); (d) the ancient fall arrives as `HistoryHint.ancientFallYearsAgo`, not as an event.
9. **V10** — the host-mode `people` answers and the party gazetteer are ordered by the carried `importance` (V08 §5.4 (3));
   V10's people answer in host mode follows the projection.
10. **V11** — (a) §3.19.2 cites V08 §2.6's `era` row without naming the tier (V08-XCONF-9); (b) row 63's `dossier.tiers`
    gains the `band` column (SettlementForge's population band per tier word; not calibratable); (c) the `history.*`
    event-to-epoch rows key on SettlementForge's `templateType` (V08 §2.6c).
11. **V09** — (a) the `button.*` family gains `button.showEverything` "Show everything" (the strip's button, V08 §5.1;
    SR6-04 (a)); (b) V9 §4.9's `host.*` sentence loads V08's new keys (`host.control.*`, `host.dialog.*`, `host.undo.*`,
    `host.playersView`, `host.status.retry`, `host.status.quota`, `host.mirror.dropped`); (c) the frame reads its locale
    from the `lang` of its `src` (V08 §3.1 step 1), a locale file per V9 §2.9's *Locales*.
12. **V07** — §3.1 (1) cites V08 §2.6b (3)'s rung table (E-31) as it already does; its failure list now includes relief
    that cannot carry the brook at village rungs (the union).
13. **V12** — no register entry: the dossier row sets (the new `band` column included) are not calibratable; T-V8-48 –
    T-V8-55 register no calibration line.

## 12 The mapping table (every inventory id of the volume → where it lives now)

165 ids mapped, 0 unmapped. "(kept)" means the fact stays at its home section, narration and restatement around it cut.

