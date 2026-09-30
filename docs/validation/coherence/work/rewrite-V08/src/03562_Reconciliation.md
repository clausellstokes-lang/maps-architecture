## Reconciliation round 3 (volumes/reconcile-V08-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r3; covered by the whole-design retrovalidation (J84).

Reconciled in place against the 7 seam issues owned by this volume in `docs/volumes/critique/seam-surfaces-r2.md`
(SR2-03, SR2-04, SR2-06, SR2-07, SR2-09, SR2-16) and `docs/volumes/critique/seam-settlements-r2.md` (SR2-04 — the two
files number independently, so the second is written "SR2-04 (settlements)" below): 2 majors and 5 minors, **all 7
FIXED**, 0 ruled invalid, 0 left on the fix list. Every sentence that read otherwise was edited in place; this note lists
the changes.

| issue | what changed (where) |
|---|---|
| SR2-06 (major) | `export.request`'s `knowledge` is `Admission` — BCR-V10-22's type, which is BCR-V9-14's union — with its reading (lowering only; a tier alone read with the requester key's places; a key form a key in its own right): BCR-V8-1, §2.2's comment, `MapSession.exportPicture`, the §1b row. The party renders pass the resolved party key as the key form `{ tier, places }`, `places` always present (§3.14 (1)). The host's own public and local pictures pass key forms with empty places, never a bare tier (§3.7's thumbnails, §5.3; J-V8.92). T-V8-16 gains the reading. |
| SR2-07 (major) | §3.14 (2) (c): the party gazetteer is `query(h, { kind: 'gazetteer' \| 'people', … }, { admitAs: the party key form })`, band-less (city-band admission, §11.2); the §1b party-set row names `admitAs` and BCR-V10-22; T-V8-17 gains "every `gazetteer` and `people` query of a party render carries that `admitAs`" (and every picture that `knowledge`). |
| SR2-03 | §3.1 step 7 (b) fills `HostSlots.historyLines` from the differences of successive `host.state` values — `host.revealed`, `host.hidden`, `host.partyTier` (a tier change is a party change too) and one replaced `host.picturesDrawn` line; empty at each load, never persisted — and `newDocuments: 'download'` (a copy of a dossier-bound document is detached, V6 §4.4); (c) and the handler's lifetime paragraph follow. §4.6 cites the slot; §5.1's differences list gains the saved-copy point and the party group; §13 X12 lists the four keys; T-V8-47 asserts both slots; §1b and §2.7 rows; J-V8.93. V09's halves (SR2-01, SR2-02) are X16. |
| SR2-04 (minor) | §5.1's `upgrade-available` banner reads "A newer map engine is available — use Update in the map's header", no button (J-V8.35). §4.2's "Keep the saved town" row is V9 §3.14's load-mismatch choice, shown by the shell at load — no header control; after its keep commits the `rebase`, the client sends `doc.snapshot`; "How a click reaches the page" and §4.3 follow; T-V8-47 drops it from the header and asserts the load-mismatch keep's path and the button-less banner. J-V8.88 marked REVISED; J-V8.94. |
| SR2-09 (minor) | §3.14 (5) cites V9 §2.10's `effectiveKey()` and BCR-V9-23 ("what both its key and the party key admit") instead of round 1's wording; §12's round-2 paragraph reads "read in V09 as landed (reconcile-V09-r2, 05:16)"; X15 CLOSED. |
| SR2-16 (minor) | §4.1 and §4.3 read "a raised way, a retaining wall (a generated terrace's walls among them) or a deck plot", §4.3 citing file f item 260's suppression kinds; BCR-V8-31's New text follows. |
| SR2-04 (settlements) (minor) | §2.6's `deposits` row: a record whose class carries a hard `near` → `landuse:<k>` row within 0 (V11 §3.5.10: `salt_works` → `saltpan`, `peat_works` → `marsh`) on a dossier listing no deposit that opens `<k>` gets a derived `DepositSite` under `res:derived:<k>` (family `salt` or `peat`), sited by S12a at DR19's site, noted `derived_landuse`; one per land use; kept `depleted` when no record needs it, never removed; a later deposit opens its own face beside it; a custom record opens none (its class is decided at fold). §3.11, §2.5's key list, §2.4's note kinds and BCR-V8-4, §5.2's label, §2.7 and §1b rows; T-V8-18 gains the salt-works mutation of `town-1`, a totality compile check over the `kinds`-bound hard rows, and a hamlet peat clause at VH (§8.2's VH exit); J-V8.95. |

**Found in passing and fixed (the intake rule).** The party picture set had no message to cross the bridge in:
`PartyPictureSet` was a store input no message carried (T-V8-2 requires one), and neither the resolved party key (ids)
nor `admitAs` (a facade option; the bridge's `query { q }` has none) can be produced by the client, so SR2-06 and SR2-07
could not be met by a client-assembled set. The set now crosses as one request and one reply — the client's
`party.render { party, since? }` and the module's `party.rendered { status: 'rendered', set } | { status: 'unchanged' }`
(§2.2, BCR-V8-1, §3.14 (3), B18, §2.7, §1b; J-V8.91) — with `PartyPictureSet.drawDigest` keeping the first version's rule
that an edit which changes nothing drawn or listed costs no store write; T-V8-41 gains the crossing clauses. The
message count is now nine.

**New rows.** J-V8.91 – J-V8.95; §13 X16 (V09's SR2-01 and SR2-02 halves), closed within the round — V09's round 3
landed at 06:25 with both slots, V9 §3.9's host-mode rule and the group "The party", which this volume now cites (its
XV-V9-21 met; §5.1's saved-copy point names V9 §3.9's actions, a copy, a re-run and a new seed, since host mode has no
creation beside the current one); X12 widened; §12's round-3 paragraph. Counts now: 95 J-V8, 32 BCR-V8 (BCR-V8-9 withdrawn), 47 T-V8, 5 owner questions
(unchanged). Effort unchanged: the party render's crossing replaces the unspecified assembly already priced in SF5, and
the derived land use is one port rule inside SF4's range.

**For the coherence pass.** File f item 472 (BCR-V8-1) — its *Note* already records SR2-06's union; its text also grew by
`party.render` and `party.rendered` (applied by reference). Items 453 and 572 may now read *Needed by* with V08 met
(SR2-19's conditions: V08's `export.request` carries the union; V08's party gazetteer passes `admitAs`). BCR-V8-4 (a note
kind) and BCR-V8-31 (the terrace wording) changed text, applied by reference.

