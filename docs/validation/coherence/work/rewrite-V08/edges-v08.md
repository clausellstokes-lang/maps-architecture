### V08

* M-V08-387-E5-data — UNDEFINED — V08 §2.1 *2.1 The map record — what SettlementForge stores beside the dossier* — missing, empty or contradictory data (the dossier included)
* M-V08-444-E5-data — UNDEFINED — V08 §2.2 *2.2 The bridge additions and the host client* — missing, empty or contradictory data (the dossier included); tests seen: T-V8-3, T73-1, T73-7
* M-V08-544-E5-data — UNDEFINED — V08 §2.3 *2.3 The binding in practice — additions to `DossierBinding`, the carr…* — missing, empty or contradictory data (the dossier included); tests seen: T-V8-5
* M-V08-677-E5-data — UNDEFINED — V08 §2.5 *2.5 The digest's additions, the staged-record event and the per-settl…* — missing, empty or contradictory data (the dossier included); tests seen: T88-1
* M-V08-1218-E5-data — UNTESTED — V08 §2.8 *2.8 Custom content — the records, the chains and the optional library…* — missing, empty or contradictory data (the dossier included); defined by: "`research/sf/dossier-outputs.md` §3.5, `research/sf/dossier-model.md` §13, and the line's custom-content manifest read read-only for item 104).** A c…"
* M-V08-1312-E4-degenerate — UNDEFINED — V08 §3.1 *3.1 The embed: the Map tab, the frame, the boot* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V8-1, T-V8-2, T-V8-3
* M-V08-1417-E8-lifecycle — UNDEFINED — V08 §3.2 *3.2 When a dossier is offered, and coalescing* — save, load, undo, redo, regenerate and migrate; tests seen: T-V8-6
* M-V08-1468-E1-none — UNDEFINED — V08 §3.4 *3.4 The refresh queue — campaign scale* — no input / nothing to act on
* M-V08-1468-E2-one — UNTESTED — V08 §3.4 *3.4 The refresh queue — campaign scale* — exactly one item; defined by: "The client creates ONE hidden frame (`embed.html#p=2&mode=refresh`: no tile worker, no view, no thumbnail pass until the end) and processes the queue…"
* M-V08-1468-E3-cap — UNTESTED — V08 §3.4 *3.4 The refresh queue — campaign scale* — the maximum and its caps; defined by: "C8-30) → `doc.load` + tail → `dossier.offer` → commit the result → if the tail now exceeds its compaction threshold, compact (V08 §3.7) → render the …"
* M-V08-1468-E5-data — UNDEFINED — V08 §3.4 *3.4 The refresh queue — campaign scale* — missing, empty or contradictory data (the dossier included)
* M-V08-1468-E6-rungs — UNDEFINED — V08 §3.4 *3.4 The refresh queue — campaign scale* — every rung from THORP to the METROPOLIS cap
* M-V08-1468-E8-lifecycle — UNTESTED — V08 §3.4 *3.4 The refresh queue — campaign scale* — save, load, undo, redo, regenerate and migrate; defined by: "The queue is persisted by `refreshPending`, so the next page resumes it."
* M-V08-1490-E4-degenerate — UNDEFINED — V08 §3.5 *3.5 `digest` and the diff — from a whole dossier to a list of changes* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V8-20, T-V8-22, T-V8-34, T-V8-35
* M-V08-1623-E4-degenerate — UNDEFINED — V08 §3.5.1 *3.5.1 The institution ladders (item 108; C8-07)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V7-35, T-V7-36, T-V7-37
* M-V08-1736-E1-none — UNTESTED — V08 §3.6 *3.6 From changes to events and epochs* — no input / nothing to act on; defined by: "From the last epoch's week `W₀` (its `EpochRecord`, else the creation week) to the absorb's week `W₁` (the latest dated week, else `HostContext.week`…"
* M-V08-1736-E2-one — UNTESTED — V08 §3.6 *3.6 From changes to events and epochs* — exactly one item; defined by: "V06 writes the reader, this volume the inputs).** Each newly carried calamity is one entry `{ week, kind: 'calamity', calamity:"
* M-V08-1736-E4-degenerate — UNDEFINED — V08 §3.6 *3.6 From changes to events and epochs* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V08-1736-E5-data — UNTESTED — V08 §3.6 *3.6 From changes to events and epochs* — missing, empty or contradictory data (the dossier included); defined by: "The kinds this volume adds are dated by rows F-V8-1 – F-V8-7 of `tables/dossier/receipts` (BCR-V8-20): a relation by its powers' pulse week when the …"
* M-V08-1736-E6-rungs — UNTESTED — V08 §3.6 *3.6 From changes to events and epochs* — every rung from THORP to the METROPOLIS cap; defined by: "**Emission, by the receipt row's response.** `assign` → an `assign` of a dossier-backed assignment (§7.7 One path: placed by S10b's `dossier` request…"
* M-V08-1736-E8-lifecycle — UNDEFINED — V08 §3.6 *3.6 From changes to events and epochs* — save, load, undo, redo, regenerate and migrate
* M-V08-1813-E4-degenerate — UNDEFINED — V08 §3.7 *3.7 Persistence inside the host — commit, compaction, thumbnails, bac…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V8-5
* M-V08-1862-E4-degenerate — UNDEFINED — V08 §3.8 *3.8 Versions and migrations on both sides* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V8-10, T-V8-11
* M-V08-1898-E4-degenerate — UNDEFINED — V08 §3.9 *3.9 Failure handling — every failure, its detection, its rung and wha…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V8-14, T-V8-15, T-V8-16
* M-V08-1932-E5-data — UNDEFINED — V08 §3.10 *3.10 The village-tier hand-off* — missing, empty or contradictory data (the dossier included); tests seen: T-V8-19
* M-V08-1932-E8-lifecycle — UNDEFINED — V08 §3.10 *3.10 The village-tier hand-off* — save, load, undo, redo, regenerate and migrate; tests seen: T-V8-19
* M-V08-2021-E8-lifecycle — UNDEFINED — V08 §3.12 *3.12 Determinism* — save, load, undo, redo, regenerate and migrate; tests seen: T-V8-3, T-V8-41, T73-8
* M-V08-2032-E1-none — UNTESTED — V08 §3.13 *3.13 Custom content's arrival — records, keywords, chains, services a…* — no input / nothing to act on; defined by: "**Scene tokens.** `sceneProfileId`, `landmarkLevel` and `materialFamily` are checked against the adapter's copy of the line's enumerations (17, 2 and…"
* M-V08-2032-E2-one — UNTESTED — V08 §3.13 *3.13 Custom content's arrival — records, keywords, chains, services a…* — exactly one item; defined by: "Unicode NFKC, lower-cased, split on every character that is not a letter or a digit, tokens shorter than 3 characters dropped; each token and each ad…"
* M-V08-2032-E4-degenerate — UNDEFINED — V08 §3.13 *3.13 Custom content's arrival — records, keywords, chains, services a…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V08-2032-E5-data — UNTESTED — V08 §3.13 *3.13 Custom content's arrival — records, keywords, chains, services a…* — missing, empty or contradictory data (the dossier included); defined by: "The port carries custom content to the map; what the map does with it — the resolution order's rows, the chain's flow order, its closeness at street …"
* M-V08-2032-E8-lifecycle — UNTESTED — V08 §3.13 *3.13 Custom content's arrival — records, keywords, chains, services a…* — save, load, undo, redo, regenerate and migrate; defined by: "The admitted fields are carried in the document, so replay never needs the host (§11.4's rule for host input)."
* M-V08-2104-E6-rungs — UNDEFINED — V08 §3.14 *3.14 The players' view — the party picture set and the party gazettee…* — every rung from THORP to the METROPOLIS cap; tests seen: T-V8-17, T-V8-47
* M-V08-2104-E8-lifecycle — UNDEFINED — V08 §3.14 *3.14 The players' view — the party picture set and the party gazettee…* — save, load, undo, redo, regenerate and migrate; tests seen: T-V8-17, T-V8-47
* M-V08-2175-E1-none — UNDEFINED — V08 §4.1 *4.1 No new declaration; two host-only events; item 110's generated co…* — no input / nothing to act on
* M-V08-2175-E2-one — UNTESTED — V08 §4.1 *4.1 No new declaration; two host-only events; item 110's generated co…* — exactly one item; defined by: "A DM who wants an aqueduct at a TOWN draws it (T4 `road` with `raised`, or the aqueduct class; item 110 (b)); a drawn one is a declaration, held like…"
* M-V08-2175-E5-data — UNTESTED — V08 §4.1 *4.1 No new declaration; two host-only events; item 110's generated co…* — missing, empty or contradictory data (the dossier included); defined by: "The stage adds no authoring tool: a DM edits a SettlementForge map with item 101's twelve tools exactly as a standalone map (§7.1, §14), under §7.7's…"
* M-V08-2175-E8-lifecycle — UNDEFINED — V08 §4.1 *4.1 No new declaration; two host-only events; item 110's generated co…* — save, load, undo, redo, regenerate and migrate
* M-V08-2197-E6-rungs — UNDEFINED — V08 §4.2 *4.2 The host-side actions in the Map tab* — every rung from THORP to the METROPOLIS cap; tests seen: T-V8-47, T-V9-67
* M-V08-2227-E2-one — UNDEFINED — V08 §4.3 *4.3 Locality, protection and the dossier's reach* — exactly one item; tests seen: T20-8
* M-V08-2246-E1-none — UNTESTED — V08 §4.4 *4.4 The host clerk — SettlementForge's assistant as a client of the t…* — no input / nothing to act on; defined by: "SettlementForge's assistant is a clerk in §11.2's sense: it drives the map through the tool API alone, over the bridge, with nothing added for it (§1…"
* M-V08-2246-E2-one — UNTESTED — V08 §4.4 *4.4 The host clerk — SettlementForge's assistant as a client of the t…* — exactly one item; defined by: "When no map is open, the client opens a headless session (the refresh mode's frame, V08 §3.4) for the call and closes it after; the cost is one load …"
* M-V08-2246-E5-data — UNTESTED — V08 §4.4 *4.4 The host clerk — SettlementForge's assistant as a client of the t…* — missing, empty or contradictory data (the dossier included); defined by: "**Prose.** The map passes no dossier prose to any assistant: this port line carries no description seed (V10 §1b.5;"
* M-V08-2246-E8-lifecycle — UNDEFINED — V08 §4.4 *4.4 The host clerk — SettlementForge's assistant as a client of the t…* — save, load, undo, redo, regenerate and migrate
* M-V08-2295-E1-none — UNDEFINED — V08 §4.5 *4.5 Custom content under editing* — no input / nothing to act on
* M-V08-2295-E2-one — UNDEFINED — V08 §4.5 *4.5 Custom content under editing* — exactly one item
* M-V08-2295-E5-data — UNDEFINED — V08 §4.5 *4.5 Custom content under editing* — missing, empty or contradictory data (the dossier included)
* M-V08-2295-E8-lifecycle — UNDEFINED — V08 §4.5 *4.5 Custom content under editing* — save, load, undo, redo, regenerate and migrate
* M-V08-2306-E4-degenerate — UNDEFINED — V08 §4.6 *4.6 The DM's view of what the dossier did* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V8-14, T-V8-15, T-V8-16
* M-V08-2418-E1-none — UNDEFINED — V08 §5.1 *5.1 The Map tab — what SettlementForge draws and what the frame draws* — no input / nothing to act on; tests seen: T-V9-28
* M-V08-2418-E4-degenerate — UNDEFINED — V08 §5.1 *5.1 The Map tab — what SettlementForge draws and what the frame draws* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V9-28
* M-V08-2461-E4-degenerate — UNDEFINED — V08 §5.2 *5.2 Drawing the dossier's records and custom content* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V8-25, T-V9-68
* M-V08-2461-E6-rungs — UNDEFINED — V08 §5.2 *5.2 Drawing the dossier's records and custom content* — every rung from THORP to the METROPOLIS cap; tests seen: T-V8-25, T-V9-68
* M-V08-2482-E1-none — UNDEFINED — V08 §5.3 *5.3 Pictures for SettlementForge's own surfaces* — no input / nothing to act on
* M-V08-2482-E2-one — UNTESTED — V08 §5.3 *5.3 Pictures for SettlementForge's own surfaces* — exactly one item; defined by: "`knowledge` — an `Admission`, BCR-V10-22's type and BCR-V9-14's union (SR2-06) — lowers the requesting editor's key for that one export and never rai…"
* M-V08-2482-E5-data — UNTESTED — V08 §5.3 *5.3 Pictures for SettlementForge's own surfaces* — missing, empty or contradictory data (the dossier included); defined by: "* **Thumbnails** (V08 §3.7): two per map record, `public` and `secret`, 512 px on the long side, the city band, the document's style, the fixed sun, …"
* M-V08-2482-E8-lifecycle — UNDEFINED — V08 §5.3 *5.3 Pictures for SettlementForge's own surfaces* — save, load, undo, redo, regenerate and migrate
* M-V08-2510-E5-data — UNDEFINED — V08 §5.4 *5.4 What leaves the frame — door 1 closed by ruling, and structurally…* — missing, empty or contradictory data (the dossier included); tests seen: T-V8-27
* M-V08-2555-E1-none — UNDEFINED — V08 §5.5 *5.5 Labels* — no input / nothing to act on
* M-V08-2555-E2-one — UNDEFINED — V08 §5.5 *5.5 Labels* — exactly one item
* M-V08-2555-E5-data — UNTESTED — V08 §5.5 *5.5 Labels* — missing, empty or contradictory data (the dossier included); defined by: "The history panel speaks in SettlementForge's own reason words (`DossierChange.reason`) beside the map's rule, and in the DM's language only as far a…"

### V09
### V08

* C-cliff-dossier — cliff (pipeline) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-custom — cliff (pipeline) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-cliff-players — cliff (pipeline) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-dossier — steep (pipeline) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-custom — steep (pipeline) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-steep-players — steep (pipeline) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-river-custom — river (pipeline) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-river-players — river (pipeline) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-dossier — coast (pipeline) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-coast-custom — coast (pipeline) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-harbour-dossier — harbour (pipeline) × dossier (V08) at TOWN, CITY, METROPOLIS
* C-harbour-custom — harbour (pipeline) × custom (V08) at TOWN, CITY, METROPOLIS
* C-harbour-players — harbour (pipeline) × players (V08) at TOWN, CITY, METROPOLIS
* C-moat-dossier — moat (pipeline) × dossier (V08) at TOWN, CITY, METROPOLIS
* C-moat-custom — moat (pipeline) × custom (V08) at TOWN, CITY, METROPOLIS
* C-moat-players — moat (pipeline) × players (V08) at TOWN, CITY, METROPOLIS
* C-raised-custom — raised (model) × custom (V08) at TOWN, CITY, METROPOLIS
* C-raised-players — raised (model) × players (V08) at TOWN, CITY, METROPOLIS
* C-retaining-custom — retaining (model) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-retaining-players — retaining (model) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-custom — deckplot (model) × custom (V08) at VILLAGE, TOWN, CITY, METROPOLIS
* C-deckplot-players — deckplot (model) × players (V08) at VILLAGE, TOWN, CITY, METROPOLIS
* C-square-dossier — square (pipeline) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-square-custom — square (pipeline) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-square-players — square (pipeline) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-dossier — oasis (pipeline) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-custom — oasis (pipeline) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-oasis-players — oasis (pipeline) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-dossier — frame (kernel) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-custom — frame (kernel) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-players — frame (kernel) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-hood-dossier — hood (V01) × dossier (V08) at TOWN, CITY, METROPOLIS
* C-hood-custom — hood (V01) × custom (V08) at TOWN, CITY, METROPOLIS
* C-hood-players — hood (V01) × players (V08) at TOWN, CITY, METROPOLIS
* C-terraced-ward-dossier — terraced-ward (V01) × dossier (V08) at TOWN, CITY, METROPOLIS
* C-terraced-ward-custom — terraced-ward (V01) × custom (V08) at TOWN, CITY, METROPOLIS
* C-terraced-ward-players — terraced-ward (V01) × players (V08) at TOWN, CITY, METROPOLIS
* C-tiers-custom — tiers (V02) × custom (V08) at TOWN, CITY, METROPOLIS
* C-crypt-players — crypt (V02) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-plan-dossier — plan (V03) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-plan-custom — plan (V03) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-sewer-custom — sewer (V04) × custom (V08) at TOWN, CITY, METROPOLIS
* C-cavern-custom — cavern (V04) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-ruin-custom — ruin (V04) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-catacomb-custom — catacomb (V04) × custom (V08) at TOWN, CITY, METROPOLIS
* C-access-custom — access (V04) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-vault-dossier — vault (V04) × dossier (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-vault-custom — vault (V04) × custom (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-island-players — island (V05) × players (V08) at CITY, METROPOLIS
* C-shade-dossier — shade (V05) × dossier (V08) at CITY, METROPOLIS
* C-shade-custom — shade (V05) × custom (V08) at CITY, METROPOLIS
* C-shade-players — shade (V05) × players (V08) at CITY, METROPOLIS
* C-skyaccess-dossier — skyaccess (V05) × dossier (V08) at CITY, METROPOLIS
* C-skyaccess-players — skyaccess (V05) × players (V08) at CITY, METROPOLIS
* C-landfall-custom — landfall (V05) × custom (V08) at CITY, METROPOLIS
* C-landfall-players — landfall (V05) × players (V08) at CITY, METROPOLIS
* C-history-players — history (V06) × players (V08) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-dossier-light — dossier (V08) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-custom-edit — custom (V08) × edit (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-custom-undo — custom (V08) × undo (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-custom-saveload — custom (V08) × saveload (determinism) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-custom-light — custom (V08) × light (rendering) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS

### V09
