# Rewrite — design volume V08 (the SettlementForge stage)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V08; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V08`, cloud continuation 2026-10-03; started fresh — no earlier V08 rewrite files on disk)
- P1 inputs gathered (canon unit V08, inventory V08-0001..0165, f items, g 111/113, wiring, edges, hand-offs, base parts): done
- P2 head, §0, §1: done
- P3 §1b (rows numbered W1–W63): done
- P4 §2.1–§2.5 (the adapter's field table, the history block, `MapHostConfig`'s J121 inputs): done
- P5 §2.6, §2.6a, §2.6b (E-31's rung table), §2.6c (g item 113): done
- P6 §2.7, §2.8: done
- P7 §3.1–§3.5.1: done
- P8 §3.6–§3.14 (quota ladder B21, J122 rulings): done
- P9 §3.15 edges and combinations: done
- P10 §4–§6 (SR6-04's keys, the bundle call, the host's language): done
- P11 §7–§8 (T-V8-48 – T-V8-51): done
- P12 §9–§13, integration notes: done
- P13 assemble, verify ids, references, terms, sizes: done
- P14 report, result file, LANDED: done

Source: `docs/volumes/V08-settlementforge.md` (3 864 lines). Output:
`docs/validation/coherence/new/volumes/V08-settlementforge.md` (3 167 lines). Same title line; one marker line; the
section structure kept (§0–§13 and *Integration notes*), with two subsections added (V08 §2.6c for item 113, V08 §3.15
for the edges and combinations). Working parts: `docs/validation/coherence/work/rewrite-V08/parts/00-head.md` …
`18-s10-13.md`; the mechanical pass `work/rewrite-V08/convert.py` → `work/rewrite-V08/convert/`.

## 1 Sizes and the shrink goal

| measure | before | after | change |
|---|---|---|---|
| words (the canon's count, whitespace tokens) | 84 356 | 71 572 | −15.2 % |
| words (`wc -w`) | 82 775 | 70 240 | −15.1 % |
| bytes | 545 534 (532.7 KB) | 456 527 (445.8 KB) | −16.3 % |

By section (the canon's count): head 1 105 → 280; §0 1 027 → 1 180; §1 1 555 → 1 489; §1b 4 012 → 3 275; §2 16 554 →
19 260; §3 15 050 → 17 441; §4 4 907 → 4 937; §5 2 966 → 3 385; §6 1 267 → 1 335; §7 5 644 → 6 764; §8 1 810 → 1 825;
§9 7 990 → 8 586; §10 4 520 → 619; §11 544 → 179; §12 3 061 → 733; §13 3 198 → 163; integration notes 213 → 121; the
reconciliation rounds 1–6 with continuations and the finalization 8 933 → 0.

Removed, by source (approximate):
* **Narration** ≈ 15 300 — the stacked banners, the revision note and the PROGRESS ledgers (≈ 825); the reconciliation
  and finalization appendix (8 933); §12's per-lane reading records (≈ 2 330, now one CONFIRMED list and one PLAUSIBLE
  table); §13's round history, F1–F5 and X1–X25 (≈ 3 035; the list closed); seam and critique ids, "REVISED" histories
  and the wiring table's history dividers in the body (≈ 1 200).
* **Restatement** ≈ 5 400 — §10's 32 request texts (4 520 → a 619-word pointer table to the applied items); the §1b
  dossier trace paragraphs (replaced by §2.4's field table, which is also the lint's input); §2.6a's DR30–DR32 table
  (cited at §7.7); the DR29 latitude row (cited); §4.4 (2)'s copy of §5.4 (3)'s kinds list; §5.3's retired-map narration.

Added ≈ 8 100 (mandated, new design at build depth): the adapter's field table and the closed digest (W-DOS-01a/b,
≈ 1 700); g item 113's history read, V08 §2.6c, with the history block's types and the peak's evidence (≈ 1 500); g
item 111's dry-country rows (≈ 250); V08 §3.15's edges and combinations (≈ 2 400; 41 undefined and 20 untested edges, 62
routed combinations); T-V8-48 – T-V8-51 and the extended clauses (≈ 1 150); the J122 bundle call (≈ 450); the J121
inputs, the quota ladder and B21 (≈ 400); the host's language (≈ 150); SR6-04's keys (≈ 350); J-V8.116 – J-V8.124
(≈ 900).

**Why the unit shrinks less than the band (25–40 %).** The band's floor (63 267 words) would need ≈ 8 300 more words
cut after ≈ 20 700 of narration and restatement were removed; the pass's own required additions (≈ 8 100 words of new
design at build depth: the field table, g items 111 and 113, the edges and combinations, four new bars, the J122 bundle
call) offset that. What remains is the stage's build-depth content — the bridge's types, the host client, the binding,
the adapter and its field table, 22 row sets, the derivation inputs of items 102–113, 21 failure rows, the party
picture set, 63 wiring rows, 51 bars and 124 reasoned decisions — and no rule, case, value, bar, record field, lifecycle
row, test or decision was thinned to meet the goal. The unit shrinks by less than half, so no nuance audit is required
by the half rule.

## 2 Decisions taken by this editor (each for the adjudicator to confirm)

1. **The bridge, binding and digest types stay at V08 §2.2–§2.5** (VOL-V07-V08-RESTATEMENTS-008 – 012). The canon asks
   for one statement "at base §11.3 / §14 / §7.7 item 12 via file f". The landed base made V08 the single home and cites
   it: rendering §11.3 "the types are V08 §2.2's"; determinism §7.7 `CarriedFacts` "V08 §2.3's union"; scope §14 "the
   digest gains V08 §2.5's fields (typed there; file f item 509)", `AdapterRegistry` "V08 §2.4's", J-A509.01 "typed once
   in V08 §2.5 and §2.8". V08 therefore keeps one copy of each type and cites §11.3, §7.7 item 12 and §14 for vocabulary,
   roles, the record and the union; lifting the types into the base would leave the base's citations dangling. The
   single-source aim is met either way. *Marked for the adjudicator.*
2. **Two new `PortNote` kinds**, `frozen_fact_changed` (class `report`) and `history_defaulted` (class `standing`), are
   needed by W-DOS-08's frozen site and history rows and by g item 113's reading; their words are V08 §4.6's rows.
   Scope §14's `PortNote` union must gain them (cross-part note).
3. **The bundle reply** carries `export.ready { bytes, name }` — one reply per format, the bytes and name of the file the
   frame's export menu saves (a split scene set included) — and `E_HOST_FORMAT` exempts a `bundle` request for
   `dd2vtt` or `foundry` from M-SF (XCONF-5's ruling at build depth). Rendering §11.3 must carry the exemption and the
   `name` (cross-part note).
4. **The quota ladder** (V08 §3.7, B21; J-V8.118): when SettlementForge's storage limit refuses a write, the client
   compacts, drops the oldest backups, stores the party set's fallback form, then writes nothing and loses nothing
   (edits kept in the draft mirror; an absorb retried at the next offer; `doc.rejected { reason: 'quota' }` and
   `host.status.quota`). The limit and the depth are SettlementForge's inputs (J121); dropping backups under the limit is
   the map's only response to a full store. *Marked for the adjudicator:* confirm that it does not re-decide
   SettlementForge's backup rule (an alternative is to refuse the write with no ladder).
5. **The estimates of V08 §8 are unchanged** (15.75–21.5 pw, as §16 states): the bundle call, the history read, the
   quota ladder and the language are placed inside SF4–SF6's ranges (PLAUSIBLE like every estimate).
6. **`host.undo.partyTier`** is not minted: the party-tier undo is worded by V09 §4.9's shared `button.undo` "Undo" (one
   row per wording, the rule of SR6-05 (d)); SR6-04's other key forms are used as named.

## 3 Conflicts resolved (12)

| conflict | ruling applied | where |
|---|---|---|
| SCOPE-C07 | SettlementForge's assistant drives the tool API (configuration C, J121/V10 Q2); the built-in clerk ships at M3c and runs only where the deployment enables it; provider, tier and key path are SettlementForge's inputs | V08 §1 item 10, §3.1 step 2, §4.4 (6) |
| V08-XCONF-1 | "none under C (SettlementForge's own assistant; follows SettlementForge, J121, J122)" | V08 §3.1 step 2, §4.4 (6) |
| V08-XCONF-2 | `MapHostConfig` carries the origin, `backupDepth` and `quotaBytes` as J121 inputs; `MapRecord.backups` is `backups[0..n)`; the mirror follows the given origin; §6's storage row by depth; risk 5 recast; J-V8.5 amended by J-V8.118 | V08 §0, §2.1, §2.2, §3.7, §6, §8.4, §9 |
| V08-XCONF-3 | the village product (V07) is registered before M-SF; the held-below-1 500 state only on a build without it; B7's copy without "coming later" | V08 §0, §3.9 B7, §3.10 |
| V08-XCONF-4 | Q5 decided under J122: pictures and player views now; a live shared map after M-SF | V08 §0, §1, §3.14 (6), §11; J-V8.57, J-V8.58 |
| V08-XCONF-5 | Q3 at build depth: `exportScenes`, opaque blobs, the key honoured, door 1 closed; T-V8-48; J-V8.116 | V08 §2.2, §5.4 (2), §6, §7.1, §9 |
| V08-XCONF-6 | the frame's language is the host's (`MapHostConfig.locale`, the boot fragment's `lang`, `en.json` fallback); English the catalogue's source language; J-V8.119 | V08 §2.2, §3.1, §5.5, §9 |
| V08-XCONF-7 | Q4 decided under J122: M-SF after M-CAL (§16's row cited) | V08 §8.1, §11; J-V8.39 |
| V08-XCONF-8 | §11 is the table of the five decisions, each carried into its section | V08 §11 |
| V08-XCONF-9 | the era derivation's home is V08 §2.6's `era` row (culture → era, no tier) | V08 §2.6 `era`; V11 cites it |
| CANON-C03 | §11 is a decisions table | V08 §11 |
| CANON-C04 | no open fix-list item; INDEX §7's V08 items (SR6-05 (b), SR6-04) fixed here | V08 §4.2, §5.1, §12, §13 |

## 4 Open findings closed (36)

* **VOL-V07-V08-RESTATEMENTS-008 – 012** — one home each at V08 §2.2–§2.5 as the landed base cites (decision 1 above);
  the vocabulary, roles, record and unions cited at §11.3, §7.7 item 12 and §14. **-013, V08-RESTATE-1** — V08 §10 is a
  pointer table, BCR-V8-n → item → base home, and a line naming the other volumes' requests read by item.
* **V08-XCONF-1 – 9** — §3 above.
* **V08-ELEG-1** — E-31, §5 below.
* **V08-TERM-1** — the wiring rows numbered W1–W63, ordered by subject, history dividers dropped (ID-WX).
  **V08-TERM-2** — DR28–DR35 everywhere, the aliases and the "numbered by the coherence pass" wording dropped (ID-DR).
* **V08-DEFER-1** — `Intent.latitudeDeg`'s home is item 391 (BCR-V8-11, item 102's sun reading it); the DR numbers are
  settled (DR28–DR35); BCR-V8-18's §16 sentence is §16's M-SF row, cited. **-2** — F1–F5 closed at their homes: F1 at
  V08 §2.6 `threats` (the registry read as SF4's first act, T-V8-43's totality clause), F2 at V08 §4.4 (1) and risk 6
  (the relay works wherever the loop runs), F3 at V08 §3.11 and T-V8-18, F4 at V08 §3.5 (6) and T-V8-34, F5 at V08 §6
  and T-V8-41/-30; (a) deleted. **-3** — SR6-05 (b) and SR6-04 closed (below).
* **V08-NARR-1 – 8** — one marker line; no PROGRESS or revision ledger; §3.5.1 (f) one paragraph; §8.2's total row
  without history; §9's rows carry their final choices (E-24's marks where amended); §12 one CONFIRMED list and one
  PLAUSIBLE table with each claim's settling bar or milestone; §13's hand-off table deleted (every row landed: V11 §3.12's
  ladder rows, V06's `CalamityRef.deaths`, V11's burial, culture, `implies` and `deckOk` cells, V07 §3.1's village column,
  file f items 244 and 260, V04's ruin readers); the reconciliation and finalization appendix removed.
* **SR6-05 (b)** — the §12 sentence on V06's and V07's next lanes is gone: both landed the readings (V06's X47 and V07's
  item 4 closed), and §12 lists no stale PLAUSIBLE.
* **SR6-04 (surfaces)** — (a) V08 §4.2's table carries a key per word (`host.control.<action>`, `host.dialog.<action>`,
  `host.dialog.cancel`, `host.undo.<action>`); V08 §5.1's frame-strips table gives `host.playersView` "Showing what the
  players see" with `buttons: [button.showEverything app(viewAsOff)]`, `host.status.retry` "Retry",
  `host.mirror.dropped` (its words written once, the §3.7 notice citing the row) and `host.locked`; (b) X12 no longer
  exists (§13 has no hand-off table) and T-V8-14's walker checks every quoted word of V08 §4.2 and §5.1 for its key;
  (c) met by the "any {class}" wording of `unmapped_kind` and `custom_resolved` (no article before a slot).
* **V08:IN-V08-1 – 4** — folded into the body at their homes (DR28–DR35 throughout; the removal as the one suppression
  of item 260 at V08 §4.3, J-VI.14; `waterUse` and the two report entries at V08 §2.6b (1) (b), (e), (3); the conduit
  house as terminal at V08 §2.6b (1) (c); the custom kinds without a class cell at V08 §3.11); the *Integration notes*
  section is one paragraph naming the J-VI decisions and their homes; the IN ids stay in the validation records only.

Wiring gaps closed: **W-DOS-01a** (§7.7 item 1's never-read list is the field table's `ignored` rows' reason column;
V08 §2.4), **W-DOS-01b** (the adapter's field table, ≈ 70 rows, `keyList` and T-V8-20's ignore clause generated from it;
J-V8.120), **W-DOS-02** (the `wealth` carried fact and diff row → the next epoch's `EpochInputs.wealthLevel`; W26),
**W-DOS-07** (`notables[].importance` not filled; J-V8.122), **W-DOS-08** (the `site` and `history` frozen rows with the
`frozen_fact_changed` note; W27; J-V8.121), **W-DOS-09** (closed by the base's DR36–DR39 rows; V08 §2.6c cites them),
**W-HOOK-02** (V08 fills `ConditionOverlay`, `DepositSite`, `PowerRelation`, `HistoryHint` and the dossier-backed
`Person`; W32, W33; V08 §3.11).

g items: **111** at build depth — V08 §2.6's `site` and `deposits` rows (a desert with or without `oasis_water`, with a
river, lake or coast; DR40), §2.6b (3)'s failure union, T-V8-40. **113** at build depth — V08 §2.6c (the line's
history, the reading rules, the `HistoryHint` fill with the peak's evidence in DR36's order, the history over time),
the history block's types (V08 §2.5), the `historyAge` and `lifecycle` rows (V08 §2.6), W33, T-V8-49, J-V8.117.

Hand-offs to V08 closed at their homes (20): V02:X9 (V08 §5.2, §2.6 `materials`: V11's material rows, `materialFamily`
reaching the material row only); V06:X5 (V08 §3.6 (3)–(6)); V06:X23 (V08 §2.6b (1) (f): the water and high-ground
records read at every epoch); V06:X29, X44, X47 (confirmed: V08 §3.6, §4.6 item 3, §3.5.1 (c)–(d)); V09:XV-V9-17, -20,
-21, -24, -26, -29 (V08 §3.1 step 7, §3.14 (5), §4.6, §5.1, §5.2, J-V8.106, J-V8.109); V10:CVR-V10-3 (V08 §3.1, §5.4 (3),
T-V8-27), CVR-V10-14 (V08 §4.6 item 3, T-V8-45); V11:X-V11-1 (V08 §2.4's catalogue manifest and `ladderPairs`, §2.6's
shapes, `goodWords`, no class cell), X-V11-6 (§2.6 `keywords`), X-V11-15 (confirmed: not calibratable), X-V11-17 (c) (the
"any {class}" slot); V12:X-V12-5 (V08 §7.1's head: the fixtures' calibration levels), X-V12-16 (V08's row sets not
calibratable, V08 §2.6).

Edges (principle (11)): the canon's 41 UNDEFINED and 20 UNTESTED edges and 62 routed combinations are closed by V08
§3.15 — four rules (geometry, data, lifecycle, rungs), a 29-row per-mechanism table (edge, outcome, failure rung,
test) and three combination rules (a dossier fact only through a derivation row; custom content as its resolved
class; the players' view through §9.2's admission function) — held by T-V8-50 (a)–(j) and T-V8-51 (J-V8.124).

## 5 Elegance rulings applied

**E-17 (one admission function at §9.2).** V08 cites §9.2's admission function at every reader it owns: the chains'
knowledge rule (V08 §5.2), `exportPicture`'s and `exportScenes`' `knowledge` (V08 §5.3, §5.4 (2)), the party set and
gazetteer (V08 §3.14), the party lines (V08 §3.1 step 7 (b)), the players'-view combination rule (V08 §3.15 (iii)),
J-V8.105. Equivalence: ☑ the band each reader admits at is kept — the view's band for the frame, the export's band, the
city band for the band-less chain reader (V08 §5.2) and the party gazetteer; ☑ V09's `admitAs` (J-V9.86) and V10's
filtered dry runs are cited, not restated.

**E-24 (one mark on amended or superseded decisions).** Rows marked *amended by X*: J-V8.5 (J-V8.118), J-V8.26 and
J-V8.70 (J-V8.107), J-V8.36 and J-V8.37 (J-V8.116), J-V8.65 (J-V8.123), J-V8.88 (J-V8.94). Rows that carried in-place
revision histories (J-V8.2, .9, .21, .22, .27, .34, .39, .43, .106, .111 and the seam-tagged rows) now state their final
choice. Equivalence: ☑ no row dropped (J-V8.1 – J-V8.115 all present, J-V8.116 – J-V8.124 added); ☑ the governing row
keeps the reason (each amending row states its own reason, each amended row its original one).

**E-31 (one toll-bridge rule with a rung column).** V08 §2.6b (3) is the one home, a table with base and village
columns (J-V8.123); V07 cites it (J-V7.97). Equivalence: ☑ geometry by rung — base: the brook crosses the through route
of the longest approach inside the frame; village: the course between the two frame arcs the through road's entries
divide, the topology raised to `through`; ☑ coastal dry site by rung — base a brook, village an estuary; ☑ failure →
`toll_bridge_dry` at every rung on any of: a desert with no `oasis_water` and no river the arid row draws (item 111);
relief that cannot carry the brook; a fixed `isolated` or `none` access — the union, each defined at both rung ranges
(T-V8-40 holds the base column clause by clause, T-V7-13 the village column).

## 6 Renumberings

* DR-V8.1 → DR29, DR-V8.2 → DR30, DR-V8.3 → DR31, DR-V8.4 → DR32, DR-V8.5 → DR33, DR-V8.6 → DR28 (with DR-V6.1),
  DR-V8.7 → DR34, DR-V8.8 → DR35 (ID-DR; aliases retired); the history rows cited as DR36–DR39 and the oasis as DR40.
* The §1b rows numbered W1–W63 (ID-WX; previously unnumbered).
* New: T-V8-48 – T-V8-51; J-V8.116 – J-V8.124; B21 (the full store); the note kinds `frozen_fact_changed`,
  `history_defaulted`; the keys `host.control.*`, `host.dialog.*`, `host.undo.*`, `host.playersView`,
  `host.status.retry`, `host.status.quota`.
* Removed: F1–F5 and X1–X25 (closed, §4 above); the IN-V08-n ids (kept in the validation records only).
* No T-V8 or J-V8 id renumbered; ids verified unique and contiguous (T-V8-1 – T-V8-51, J-V8.1 – J-V8.124, W1 – W63,
  B1 – B21, R1 – R10).

## 7 Cross-part notes

1. **scope §14** — the `PortNote` union gains `'frozen_fact_changed' | 'history_defaulted'` (V08 §4.6, classes `report`
   and `standing`); `DossierDigest`'s comment for `notables[]` drops `importance` (W-DOS-07) and the digest gains the
   history block and the `wealth`/`site` facts typed in V08 §2.5; `MapHostConfig` (`@plat/bridge-client`) carries
   `backupDepth`, `quotaBytes`, `locale` (J121).
2. **rendering §11.3** — `export.request` gains `bundle?: true`; `E_HOST_FORMAT`'s sentence (line 432 of the landed
   part) exempts a `bundle` request for `dd2vtt` or `foundry` from M-SF; `export.ready` gains `name` on a bundle reply;
   `doc.rejected`'s reasons gain `'quota'` (V08 §3.7, B21).
3. **determinism §7.7** — item 1's never-read list adds `npcs[].importance` (V08 §2.4's field table); DR1's bar is a
   creation bar (the site frozen after creation, `frozen_fact_changed`); `PortValues`' comment adds `threats`; the
   `CarriedFact` union gains `wealth`, `site`, `history` (V08 §2.3).
4. **model §2.7** — `HistoryHint` carries the fields V08 §2.6c (3) fills: `founding`, `events` (numeric severity),
   `tierHistory`, `populationHistory`, `calamities { week, deaths, exodus }`, `lifecycle`, `ancientFall`, and `peak` with
   its typed `evidence` list.
5. **V09** — host-mode Settings shows the host's language and offers no choice (V08 §5.5); the frame keeps edits a
   `'quota'` refusal returns in its draft mirror and re-sends them (V08 §3.7); V9 §4.9's `host.*` sentence loads V08
   §4.2's `host.control.*`, `host.dialog.*`, `host.undo.*` and V08 §5.1's `host.playersView`, `host.status.retry`,
   `host.status.quota`, `host.mirror.dropped`; the party-tier undo is `button.undo`.
6. **V06** — the ancient fall's predecessor sizing under DR38 and a tier-less `resettlement` evidence item (no peak) are
   V06's readings of V08 §2.6c (3); the wealth level reaches `EpochInputs.wealthLevel` at the next epoch (V08 §3.5).
7. **V11** — the era default (V11 §3.19.2) cites V08 §2.6's `era` row without naming the tier (XCONF-9); the
   event-to-epoch rows cover the 29 template words and the `lifecycle` row's three outcomes (T-V8-18's totality).
8. **V07** — V07 §3.1 step 1 cites V08 §2.6b (3)'s village column, already landed (E-31; J-V7.97).
9. **scope §16 / INDEX** — V08 §8's M-SF row agrees with §16 (after M-CAL; SF0–SF3 may start earlier; VH when the village
   lands; 15.75–21.5 pw); the built-in clerk at M3c (SCOPE-C07).
10. **For the adjudicator** — J122's "two people editing one map at once — not now" against the base's two-editor
    convergence (§11.3) and V08's co-DM role: V08 keeps the co-DM (`editor`) and two-editor convergence as the base
    builds them; flagged, not changed.

## 8 Verification

* Sweeps over the new volume: retired terms 0 (`first paint`, `lot`, `fallbackClass`, `PortRungPath`, `DR-V8.n`, bare
  `Vn §`); seam and critique ids 0 (`C8-`, `SS-`, `SRn-`, `SCC-`, `XV-V9`, `CVR-V10`, `X-V11`, `X-V12`, `seam-`), `X`n
  rows 0, "REVISED", "CLOSED", "Was:", "first version", "unsurveyed", "owner question", `IN-V08` 0; one marker line.
* Ids: T-V8-1 – T-V8-51 each defined once and every reference resolving; J-V8.1 – J-V8.124 contiguous; W1 – W63
  contiguous; B1 – B21; R1 – R10; DR1 – DR40 only; every `V08 §x` reference resolves to a heading of the new text.
* The canon's cohesion checks: §8 agrees with §16 and INDEX; §11 marks every question decided and the body reads each
  decision; §1b names each piece's producer and consumer, and no hand-off is open; one marker line, no ledgers.
* doc_checks provisional (the reference corpus is absent and was not fetched).

## 9 Mapping table (inventory V08-0001 – V08-0165 → new location)

| id | kind | old section | new location |
|---|---|---|---|
| V08-0001 | rule | header Conventions | head, *How to read this volume* (citation forms; J121 input rule) |
| V08-0002 | summary | 0 | §0 *What this stage does*, *When SettlementForge changes* |
| V08-0003 | summary | 0 | §0 *Your own content*, *What the record says…* |
| V08-0004 | summary | 0 | §0 *Aqueducts, raised roads and toll bridges* |
| V08-0005 | summary | 0 | §0 *Who sees what* (live shared map after M-SF, J122) |
| V08-0006 | summary | 0 | §0 *Where it lives* (origin, backups, language follow SettlementForge, J121; export bundle J122) |
| V08-0007 | scope | 1 | §1 *In scope* 1–7, 9–12 (item 9 the history read, item 113) |
| V08-0008 | scope | 1 | §1 *In scope* 8, 13 (item 111's dry-country reading added) |
| V08-0009 | interface | 1 | §1 *Base hooks consumed* (DR1–DR40) |
| V08-0010 | scope | 1 | §1 *Out of scope* (Q5 decided J122; module is SettlementForge's, J121) |
| V08-0011 | wiring | 1b | §1b W1 |
| V08-0012 | wiring | 1b | §1b W8, W10 |
| V08-0013 | wiring | 1b | §1b W18 |
| V08-0014 | wiring | 1b | §1b W23 |
| V08-0015 | wiring | 1b | §1b W56 |
| V08-0016 | wiring | 1b | §1b W59 |
| V08-0017 | wiring | 1b | §1b W50 |
| V08-0018 | wiring | 1b | §1b W36 |
| V08-0019 | wiring | 1b | §1b W38 |
| V08-0020 | wiring | 1b | §1b W39–W43 |
| V08-0021 | wiring | 1b | §1b W52 |
| V08-0022 | wiring | 1b | §1b W8, W50 |
| V08-0023 | wiring | 1b | §1b W17, W20, W21 |
| V08-0024 | trace | 1b dossier trace | §2.4 the adapter's field table (W15; J-V8.120) — the trace paragraphs replaced by one table |
| V08-0025 | rule | 2.1 | §2.1 (the host is the store, §11.3) |
| V08-0026 | record | 2.1 | §2.1 `MapRecord` (backups[0..n), n = `backupDepth`, J121) |
| V08-0027 | record | 2.1 | §2.1 `SnapshotBlock` |
| V08-0028 | rule | 2.1 | §2.1 status semantics (recomputed at mount) |
| V08-0029 | interface | 2.2 | §2.2 message types (vocabulary, roles cited at §11.3) |
| V08-0030 | interface | 2.2 | §2.2 base messages extended (`export.request` `bundle`) |
| V08-0031 | interface | 2.2 | §2.2 host client and `MapHostConfig` (J121 inputs; J-V8.118, J-V8.119) |
| V08-0032 | interface | 2.2 | §2.2 `MapHost`, `MountSpec`, `MapSession` (`exportScenes`) |
| V08-0033 | record | 2.3 | §2.3 binding additions (cites §7.7 item 12) |
| V08-0034 | record | 2.3 | §2.3 `CarriedFact` (+ `wealth`, `site`, `history`; notable without `importance`) |
| V08-0035 | rule | 2.3 | §2.3 keys of the carried map |
| V08-0036 | lifecycle | 2.3 | §2.3 a binding row's life |
| V08-0037 | record | 2.4 | §2.4 `AdapterManifest` |
| V08-0038 | interface | 2.4 | §2.4 *The port's results* (cites §14) |
| V08-0039 | rule | 2.4 | §2.4 the first line's key sets |
| V08-0040 | rule | 2.4 | §2.4 adapter selection |
| V08-0041 | record | 2.5 | §2.5 digest additions (+ history block; `importance` not filled) |
| V08-0042 | record | 2.5 | §2.5 `dossierRecord` (cites §7.1, item 358) |
| V08-0043 | record | 2.5 | §2.5 `PortValues` (null rules cite §10.2) |
| V08-0044 | rule | 2.6 | §2.6 head (row sets, `calibratable: false`) |
| V08-0045 | table | 2.6 | §2.6 `tiers` |
| V08-0046 | table | 2.6 | §2.6 `deposits` (+ desert and `oasis_water`, DR40; item 111) |
| V08-0047 | rule | 2.6 | §2.6 derived land use |
| V08-0048 | table | 2.6 | §2.6 `landmarks` |
| V08-0049 | table | 2.6 | §2.6 `wealth` (over epochs, W26) |
| V08-0050 | table | 2.6 | §2.6 `powers` |
| V08-0051 | table | 2.6 | §2.6 `impairments` |
| V08-0052 | table | 2.6 | §2.6 `tags` |
| V08-0053 | record | 2.6 | §2.6 `kinds` shape |
| V08-0054 | table | 2.6 | §2.6 `relations` |
| V08-0055 | table | 2.6 | §2.6 `materials` (V11's material rows) |
| V08-0056 | table | 2.6 | §2.6 `qualifiers` |
| V08-0057 | rule | 2.6a | §2.6a head |
| V08-0058 | table | 2.6a | §2.6a (1) ruin evidence rows |
| V08-0059 | table | 2.6a | §2.6a (2) cites §7.7 DR30–DR32 |
| V08-0060 | table | 2.6a | §2.6a (3) burial and crypt trace |
| V08-0061 | rule | 2.6a | §2.6a (4) closures, steps, deaths |
| V08-0062 | rule | 2.6b | §2.6b head |
| V08-0063 | table | 2.6b | §2.6b (1) (DR34) |
| V08-0064 | table | 2.6b | §2.6b (2) (DR35) |
| V08-0065 | rule | 2.6b | §2.6b (3) one rule with a rung column (E-31; J-V8.123) |
| V08-0066 | rule | 2.6b | §2.6b (4) culture's reach; era row home (XCONF-9) |
| V08-0067 | lifecycle | 2.7 | §2.7 lifecycle rows (host-side; + `MapHostConfig` inputs, quota) |
| V08-0068 | lifecycle | 2.7 | §2.7 lifecycle rows (binding and digest; + wealth/site/history facts, history block) |
| V08-0069 | lifecycle | 2.7 | §2.7 lifecycle rows (custom, item 110) |
| V08-0070 | lifecycle | 2.7 | §2.7 lifecycle rows (notes, frame state) |
| V08-0071 | rule | 2.8 | §2.8 head (CONFIRMED on `town-cc-1`) |
| V08-0072 | record | 2.8 | §2.8 `DossierInstitution.custom` |
| V08-0073 | record | 2.8 | §2.8 carried-fact additions |
| V08-0074 | rule | 2.8 | §2.8 keys |
| V08-0075 | mechanism | 3.1 | §3.1 step 1 (no 'first paint'; `lang` fragment) |
| V08-0076 | mechanism | 3.1 | §3.1 step 3 |
| V08-0077 | mechanism | 3.1 | §3.1 step 7 |
| V08-0078 | mechanism | 3.2 | §3.2 |
| V08-0079 | mechanism | 3.3 | §3.3 |
| V08-0080 | mechanism | 3.4 | §3.4 (+ village-rung refresh, empty queue) |
| V08-0081 | mechanism | 3.5 | §3.5 steps 1–4 |
| V08-0082 | mechanism | 3.5 | §3.5 step 5 |
| V08-0083 | mechanism | 3.5 | §3.5 step 6 |
| V08-0084 | table | 3.5 | §3.5 the diff table (+ `wealth`, `site`, `history` rows; J-V8.121) |
| V08-0085 | rule | 3.5 | §3.5 chains' links (DR33 cited) |
| V08-0086 | table | 3.5 | §3.5 latitude (cites §7.7 DR29; item 391) |
| V08-0087 | rule | 3.5.1 | §3.5.1 (a) |
| V08-0088 | rule | 3.5.1 | §3.5.1 (b) |
| V08-0089 | rule | 3.5.1 | §3.5.1 (c) |
| V08-0090 | rule | 3.5.1 | §3.5.1 (c) guild halls |
| V08-0091 | rule | 3.5.1 | §3.5.1 (d) |
| V08-0092 | rule | 3.5.1 | §3.5.1 (f), one paragraph (NARR-3) |
| V08-0093 | mechanism | 3.6 | §3.6 (1)–(3) |
| V08-0094 | mechanism | 3.6 | §3.6 (4) |
| V08-0095 | mechanism | 3.6 | §3.6 (5) |
| V08-0096 | rule | 3.6 (7) | §3.6 (7) |
| V08-0097 | mechanism | 3.7 | §3.7 (backups to `backupDepth`; quota ladder B21) |
| V08-0098 | mechanism | 3.7 | §3.7 thumbnails; draft mirror (`host.mirror.dropped`) |
| V08-0099 | rule | 3.8 | §3.8 |
| V08-0100 | rule | 3.8 | §3.8 |
| V08-0101 | table | 3.9 | §3.9 B1–B9 |
| V08-0102 | table | 3.9 | §3.9 B10–B21 (B7 copy without 'coming later'; B21 new) |
| V08-0103 | rule | 3.10 | §3.10 (village registered before M-SF, J122; XCONF-3) |
| V08-0104 | mechanism | 3.11 | §3.11 conditions and stressors |
| V08-0105 | mechanism | 3.11 | §3.11 power relations, persons, deposits, history (cites §2.6c) |
| V08-0106 | mechanism | 3.11 | §3.11 custom kinds (no class cell; item 425) |
| V08-0107 | rule | 3.12 | §3.12 |
| V08-0108 | mechanism | 3.13 | §3.13 (1)–(5) |
| V08-0109 | mechanism | 3.13 | §3.13 (6)–(10) |
| V08-0110 | mechanism | 3.14 | §3.14 (1)–(2), (4)–(6) (Q5 decided J122) |
| V08-0111 | mechanism | 3.14 | §3.14 (3) |
| V08-0112 | rule | 4.1 | §4.1 |
| V08-0113 | table | 4.2 | §4.2 table (key column, SR6-04) |
| V08-0114 | table | 4.2 | §4.2 table and the load-mismatch paragraph |
| V08-0115 | rule | 4.3 | §4.3 (slot = the one suppression, J-VI.14) |
| V08-0116 | rule | 4.4 | §4.4 (1)–(2) |
| V08-0117 | rule | 4.4 | §4.4 (3)–(6) (C follows SettlementForge; built-in clerk M3c; SCOPE-C07, XCONF-1) |
| V08-0118 | rule | 4.6 | §4.6 head, absorb group, held state, party group |
| V08-0119 | rule | 4.6 | §4.6 *The standing notes* |
| V08-0120 | table | 4.6 | §4.6 notes table (8 + 29 kinds) |
| V08-0121 | table | 5.1 | §5.1 banner table (+ quota, retry) and frame strips table |
| V08-0122 | rule | 5.1 | §5.1 *The frame draws everything else* |
| V08-0123 | table | 5.2 | §5.2 table |
| V08-0124 | table | 5.2 | §5.2 `CustomChainRecord` row (cites §9.2's admission function, E-17) |
| V08-0125 | rule | 5.3 | §5.3 |
| V08-0126 | rule | 5.4 | §5.4 (2) bundle call at build depth (J122; XCONF-5; J-V8.116) |
| V08-0127 | rule | 5.5 | §5.5 (host's language, XCONF-6; J-V8.119) |
| V08-0128 | table | 6 | §6 table |
| V08-0129 | table | 6 | §6 table (storage per `backupDepth`), *Why these numbers* |
| V08-0130 | test | 7.1 | §7.1 head and T-V8-1 – T-V8-8 |
| V08-0131 | test | 7.1 | §7.1 T-V8-9 |
| V08-0132 | test | 7.1 | §7.1 T-V8-14 (B21, §4.2/§5.1 key walker) |
| V08-0133 | test | 7.1 | §7.1 T-V8-17 |
| V08-0134 | test | 7.1 | §7.1 T-V8-20 |
| V08-0135 | test | 7.1 | §7.1 T-V8-27 |
| V08-0136 | test | 7.1 | §7.1 T-V8-33 |
| V08-0137 | test | 7.1 | §7.1 T-V8-41 |
| V08-0138 | test | 7.1 | §7.1 T-V8-46 |
| V08-0139 | test | 7.1 | §7.1 T-V8-47 |
| V08-0140 | test | 7.2 | §7.2 |
| V08-0141 | plan | 8.1 | §8.1 (Q4 decided J122; XCONF-7) |
| V08-0142 | plan | 8.2 | §8.2 (total row without history; NARR-4) |
| V08-0143 | plan | 8.3 | §8.3 |
| V08-0144 | plan | 8.4 | §8.4 (risks 1, 5, 6 recast on J121 inputs) |
| V08-0145 | decision | 9 | §9 J-V8.1 – J-V8.10 |
| V08-0146 | decision | 9 | §9 J-V8.11 – J-V8.20 |
| V08-0147 | decision | 9 | §9 J-V8.21 – J-V8.30 |
| V08-0148 | decision | 9 | §9 J-V8.31 – J-V8.40 |
| V08-0149 | decision | 9 | §9 J-V8.41 – J-V8.50 |
| V08-0150 | decision | 9 | §9 J-V8.51 – J-V8.60 |
| V08-0151 | decision | 9 | §9 J-V8.61 – J-V8.70 |
| V08-0152 | decision | 9 | §9 J-V8.71 – J-V8.80 |
| V08-0153 | decision | 9 | §9 J-V8.81 – J-V8.90 |
| V08-0154 | decision | 9 | §9 J-V8.91 – J-V8.100 |
| V08-0155 | decision | 9 | §9 J-V8.101 – J-V8.110 |
| V08-0156 | decision | 9 | §9 J-V8.111 – J-V8.115 |
| V08-0157 | bcr | 10 | §10 row BCR-V8-1 → item 472 → §11.3 |
| V08-0158 | bcr | 10 | §10 row BCR-V8-4 → item 508 → §14 |
| V08-0159 | bcr | 10 | §10 row BCR-V8-9 → item 202 → §1.1 (withdrawn) |
| V08-0160 | bcr | 10 | §10 row BCR-V8-15 → item 410 → §8.2 |
| V08-0161 | bcr | 10 | §10 row BCR-V8-21 → item 394 → §7.7 |
| V08-0162 | bcr | 10 | §10 row BCR-V8-28 → item 244 → §2.7 |
| V08-0163 | question | 11 | §11 table of five decisions (J121, J122) |
| V08-0164 | rule | 12 | §12 CONFIRMED list and PLAUSIBLE table |
| V08-0165 | note | Integration notes | *Integration notes* paragraph (decisions at their homes; IN ids kept in the records) |
