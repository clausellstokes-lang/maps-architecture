## Reconciliation round 1 (volumes/reconcile-V09-r1, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r1; covered by the whole-design retrovalidation (J84).

Reconciled in place against the nine seam issues `docs/volumes/critique/seam-surfaces-r0.md` assigns to this volume.
Every one is fixed; none is invalid; nothing is added to the fix list (V09 §13).

| issue | severity | what changed |
|---|---|---|
| SS-06 | major | V09 §2.2: in host mode `ShellConfig.clerk` is always set — kind `host` when `clerkMode` is `host` or `off` — and `HostSlots` gains `hostName`; V09 §4.11 gains the card-only drawer (the host's proposal card alone, its AI mark `clerk.host.mark`, Accept, Drop and Why, closing on either); §2.12 lifecycle row; T-V9-64; T-V9-40's host clause; J-V9.80; XV-V9-17 |
| SS-07 | major | V09 §2.10's `ClerkMount` gains `host` (`config`, `onConfig`, `needsToken`, `refused`, `proposals`, `answer`) with the bridge body types `ClerkConfig` and `HostProposal` cited from item 473 under V08's names, filled by the embed's bridge handler (V08 §3.1); the closing paragraph routes the whole `clerk.config` there; §1b and §2.12 rows; J-V9.81; XV-V9-17, XV-V9-18 |
| SS-08 | major | `ClerkHandle` declares `run`, `newTopic`, `defects`, `clearDefects` and `setKey(): Promise<keyState>`; V09 §4.11's drawer menu gains New topic and the key card shows the verdict; V09 §5.12's Assistant section lists the defect records with Save as file and Clear; new catalogue rows `clerk.key.unchecked`, `clerk.defect.<kind>`, `clerk.defects.none`; T-V9-27 extended; AP8 +0.25 pw (1–1.25; total 19.5–29) |
| SS-11 | major | V09 §4.5's T6 drop-on-a-plot mapper cites V10 §4.1's `where.at` / `where.plot` rows: `designation { cls, use }`, the name a `setAttr` on the created use (its address from the preview's `created` list), one group; J-V9.84 |
| SS-13 | major | item 570 on §7.1's toolkit table: T6's row gains a one-line `roster` (composing with item 353 and V01's BCR-12 (c)); V09 §4.3's `roster` row and §4.5's T6 mapper name it; T-V9-12 checks each mode's `emits` against its tool's registry entry; J-V9.83 |
| SS-15 | major | `WhyCardModel` gains `sections` (title `why.section.<kind>`, rows with `text`, `value`, `tier`, `target`, `withheld`), drawn after the facts in registration order, with a §2.7 table row; `under` withdrawn; a raised way's `decidedBy` is its own `raised` row; V09 §4.17's panels and §4.20.6's why lines read the same rows; V09 §5.8 draws the sections; T-V9-65; J-V9.82 |
| SS-16 | major | V09 §2.9 and V09 §4.9 state that the catalogue file carries volume 10's key families (`critique.K1`–`K18`, `refuse.clerk.*`, `clerk.notice`, `info.raised.<outcome>`, `info.under.*`, `info.catacomb.*`, `info.crypt.*`, `kind.<registry kind>`) with their `en` texts written once in V10 §2.10, V10 §3.9, V10 §3.9a, V10 §3.10, V10 §3.16 and V10 §3.20; the two sub-families V10 names without words are this volume's (`info.under.cause.<rule>`, `info.catacomb.blocked.<cause>`); `why.under.deep` / `.sealed` renamed `info.under.deep` / `.sealed`; the three `info.catacomb.*` rows point at V10's texts; T-V9-15 covers every family; J-V9.79 (J-V9.55 revised) |
| SS-22 | minor | V09 §4.11's Apply-then-undo cites V10 §4.4 and drops its list of never-applied cases |
| SS-23 | minor | V09 §4.11's What the assistant sees cites V10 §5.4's view without restating its contents |

**Counterparts done in the same passages** (the V09 halves of issues owned by V10, cheap and in sections this round edited):
SS-09 — V09 §4.11's actions follow V10 §2.6's dispatch table, with `rebuild` → **Put it back** on the card; SS-10 —
`ClerkMount.effectiveKey` and `onEffectiveKey` expose the effective key (the view's key, its tier lowered to View as), under the names V10's CVR-V10-15 asks for; SS-21 — `LinkRow.chain`
cites V10's `WhyLink['chain']`; SS-24 — `ClerkSlot.label` reads "Assistant (AI)". Also CVR-V10-4's remaining row: V09 §6.2
states the standalone page's `connect-src`. The other sides are XV-V9-17 (V08) and XV-V9-18 (V10).

**Aligned after volume 10's reconciliation note (04:01).** Three names now match volume 10's round: `ClerkMount`'s key
members are `effectiveKey` and `onEffectiveKey`; T6's one-line `roster` carries `expansion` and writes
`name: ''` for an empty name field, one text with V10 §4.1's `where.locus` row (item 571); and the family multipliers'
cell is `familyWeights`, volume 11's name for it (V11 §4.2), in V09 §2.6, T-V9-25 and XV-V9-1.

