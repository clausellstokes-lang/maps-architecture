## Reconciliation round 3 (volumes/reconcile-V09-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r3; covered by the whole-design retrovalidation (J84).

Reconciled in place against the seven seam issues `docs/volumes/critique/seam-surfaces-r2.md` assigns to this volume.
Every one is fixed; none is invalid; nothing is added to the fix list (V09 §13).

| issue | severity | what changed |
|---|---|---|
| SR2-01 | major | V09 §2.2: `HostSlots.historyLines` (`list`, `onChange`) and `HostHistoryLine { at, text, targets }`; V09 §4.10: the host's lines as one group "The party" (`history.group.party`) at the head of the All and SettlementForge filters, newest first, **Show** when targeted, no Undo this, never persisted; V09 §5.6 draws it; §1b and §2.12 rows; T-V9-28's allowlist counts the group; J-V9.91; XV-V9-21 |
| SR2-02 | major | V09 §2.2: `HostSlots.newDocuments: 'download' \| 'off'`, required in host mode; V09 §3.9's new host bullet: every action that makes a new document (Open a copy from here, Re-run from here, `refuse.restore.dossier`'s button, the clerk's `fork` and `rerun`, Enter's Same kind, new seed, `ClerkMount.openNewDocument`) writes `export(h, 'plat')` at the role's key to the device and releases it, toast `info.copy.saved` (and `info.copy.rerunEdits` after a re-run), or with `'off'` (and below `secret`) the controls are hidden; no creation mode in host mode; V09 §3.2 (3), V09 §4.10, V09 §4.11 cite it; §1b, §2.12 and AP5 rows; T-V9-28 and T-V9-40 host clauses; J-V9.92; XV-V9-21, XV-V9-22 (c) |
| SR2-11 | minor | V09 §4.5's T6 row and `refuse.roster.dossier`'s button column: with no `sites` candidate free of hard fails, **Put it at {site}** is not shown and the element picker stays, one rule with volume 10's `dossier` alternative; T-V9-13 gains the case |
| SR2-13 | major | V09 §4.11's drawer menu gains **Start a new map from this** (standalone only), putting the next message in creation mode under `clerk.newMap.line`; V09 §2.10's `send` gains `attach.newMap?: true`; §1b, §2.12 and AP8 rows; T-V9-40's clause; J-V9.93; XV-V9-22 (b) |
| SR2-14 | major | V09 §2.10's `ClerkMount.rebuildEvents(seq)`; V09 §4.20.3 (4) states the one function (tombstones read at the effective key, [] when nothing can be built) that the history row and the mount share; V09 §4.10 and V09 §4.11 cite it; item 467 names the mount as a reader; §1b rows; T-V9-53 asserts byte-equal events from row and mount; J-V9.94; XV-V9-22 (a) |
| SR2-15 | minor | V09 §4.20.3 (2), V09 §2.12's removal row and item 362 (e) cite file f item 260's kinds (raised way, harbour-mouth chain, quay wall, retaining wall, deck plot; islands and sky accesses in volume 5's form); V09 §4.20.3 (4) gains a Build-it-again row per kind (a deck plot by `drawFootprint` at its slot, with a pre-decided fallback) and item 467 the fields those rows read; T-V9-53's fixture adds a generated retaining wall and a deck plot; J-V9.95; XV-V9-23 |
| SR2-18 | minor | V09 §4.9's sentence names every `host.*` key volume 8 routes (V08 §13 X12); V09 §5.12's forced fields read `host.locked`; XV-V9-20 marked met; V09 §12 keeps XV-V9-19 open until volume 10 writes SR2-10 and SR2-17 |

**Wording kept to this volume's rules.** The seam's toast "Saved a copy to your computer: {file}. It does not follow
{host}." is shipped as one sentence, "Saved a copy to your computer as {file}; it does not follow {host}.", to meet V09
§4.9's one-sentence rule (J-V9.92). **Other sides.** V08's SR2-03 fills the two slots (XV-V9-21); V10's SR2-17 (c) and (d)
cite `rebuildEvents` and `attach.newMap`, and XV-V9-22 (c) asks it to confine the automatic creation mode to standalone;
V06 is asked to name the re-add forms (XV-V9-23). For file f: item 467 (item 467) now also serves volume 10 through the
mount, and item 362 (item 362) cites item 260's kinds. The build plan's estimates are unchanged (V09 §12).

