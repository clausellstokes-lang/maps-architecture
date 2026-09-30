## Reconciliation round 1 (volumes/reconcile-V08-r1, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r1; covered by the whole-design retrovalidation (J84).

Reconciled in place against the 18 seam issues owned by this volume in `docs/volumes/critique/seam-surfaces-r0.md` and `docs/volumes/critique/seam-settlements-r0.md`: 1 blocker, 11 majors and 6 minors, **all 18 FIXED**, 0 ruled invalid, 0 left on the
fix list. Every sentence of the volume that read otherwise was edited in place; this note lists the changes.

| issue | what changed (where) |
|---|---|
| SS-01 (blocker) | The host projection is the MODULE's: applied to every `query.result` and every `preview` reply before it is posted out of the frame (item 473 (c)); the host client carries no projection code (§5.4 (3), now with the kept and dropped fields of the base's kinds as a table; §4.4 (1); §2.2's `query`; §3.14 (2) (c); the §1b row; J-V8.73). T-V8-27 asserts on the bytes the module posts through a transport tap. J-V8.84 records the preview-reply projection. |
| SS-02 | `MapSession.setClerk(config: ClerkConfig)` takes item 473's `clerk.config` body by citation, generated from `@plat/api`'s bridge schema (§2.2). |
| SS-03 | `MapSession.preview(events, o?: { view?, proposal? })` with item 473 (b)'s proposal; `on('clerkProposal' \| 'clerkConfigRefused')` (§2.2, the §1b row); §4.4 (3) cites V10 §3.17's intake instead of describing it. |
| SS-04 | §4.4 (2) and §5.4 (3) list the offered kinds by citing V10 §3.17's table; `measure`, `hit` and `inView` refused `E_HOST_KIND`; T-V8-27's fixture list gains `brief`, `entity`, `sites`, `why` with sections, `frame` without radius, `rule`, `profile` (and the base's `fates` and the preview reply). |
| SS-05 | §4.4 (4): the map passes no dossier prose; the port line carries no description seed (V10 §1b.5; item 519). |
| SS-08 | §3.5.1 (b): V11's range is the kind's lowest-tier range, scaled only above it; at a village rung an unnumbered record takes V07 §2.4's `rules.ladders.ranges` row, else V11's range unscaled; T-V8-44 gains the clause. |
| SS-10 | The `kinds` shape accepts `'@absent:<class>[+<class>]'` routed to S2 (§2.6 `kinds` and `distribution`, §3.5 (5)); §2.6a (3) reads `Access to parish church` → `@absent:church`; new bar T-V8-46 (SF3; item 486's range now T-V8-1 – T-V8-46); §7.3 counts `@absent` records by none. |
| SS-11 | The `keywords` shape gains `class?`, `specialisation?` and `binds?: 'cryptAlways'`; the `archetypes` shape gains SS-09's optional `village` cell (§2.6). |
| SS-12 | §3.5 (5) (f): a custom record's class and profile are decided at fold by item 104 (a)'s resolution with V11 §3.13.1's rungs, never at digest; the `custom_resolved` note is written after the fold and names the deciding rung. Followed through §1b (the facts trace and the wiring row), §2.6 `categories` and `distribution`, §2.6b (1) (g), §2.7, §5.2, item 511 and T-V8-25. |
| SS-20 | §3.10: a crossing is §4.11's rung change as item 322 states it — the product at an epoch is V07 §2.1's fold with `handoff.band`; `LadderRouter` decides the product at creation and, at an absorb, only whether the population lies in a registered range. T-V8-19 gains the 1 480 / 1 520 (0 changes) and 1 400 / 1 600 (every epoch) clause; J-V8.12 cites the band. |
| SS-21 | §3.5 step 3's range is [0, 10⁷]; §3.6 (7) and B7: a population of 0 at an absorb routes to THORP and V07's desertion (a base-product document through the fold, J-V8.85), a creation at 0 is refused `E_RUNG_UNAVAILABLE` naming the floor; T-V8-15 gains the clause. |
| SS-23 | §3.5.1 (c): a GUILD record's hall binds as a member `#k` of a `craft_guilds_*` (family `craft`) or `merchant_guilds_*` (family `trade`) COUNT record of the same dossier, noted `ladder_merged` (J-V8.83); the `distribution` row and §7.3's parity follow; T-V8-44 gains the clause. |
| SS-28 | §3.10 drops `ProductDecl` and `StrategyRegistry.products`: the village product registers its `ProductDecl` (V07 §2.1; item 202), the port consults `LadderRouter`; item 202 WITHDRAWN in favour of file f item 202; the §1 scope item, the §1b row and the VH step follow; T-V8-19 registers a test `ProductDecl`. |
| SS-35 | "≈ 270" → 280 at the pinned line, read from `dossier.catalogue` (§2.6 `kinds`, J-V8.18). |
| SS-37 | §3.11's `fallbackClass` clause deleted; §5.2's building row and item 511 cite the fold wording; item 425's New drops `fallbackClass` (IN-V08-4). |
| SS-38 | §2.6b (1) (c): the aqueduct's generator binds the conduit house to the terminal by V11 §3.24.7 (1)'s criteria row; §13 X5 marked SUPERSEDED. |
| SS-42 | The `distribution` row's QUARTER step gains "(at a village rung, V07 §3.10's end claim)". |
| SS-45 | §2.6a (3): `Burial ground` and `Graveyard` read "REPLACEMENT (`graveyard` over `burial_ground`); both lessers of `parish_burial_grounds` (COUNT)", `Parish burial grounds` reads COUNT over both; (4)'s promotion sentence cites the three burial pairs (SS-26's, V11's to add). |

**Found in passing and fixed (the intake rule; each small and wiring-only).** (1) V11 registry row 77, W46 and T-V11-2
read `ladderPairs` from the catalogue manifest V08's build step writes, which V08 §2.4 said carried "names and tiers
only": the manifest now carries `ladderPairs: { greater, lesser[] }[]` (§2.4, the §1b row). (2) V11 §3.12's
`uncatalogued_step` note had no home in the port's note kinds: added to §2.4's union, item 508 and §3.5.1 (b). (3) The
host `preview` reply carries `shape` and `actions[].at`: projected like a query answer (§5.4 (3); J-V8.84).

**New rows.** J-V8.83 – J-V8.85; T-V8-46; §13 X14 (the companions in V11 and V07 this volume is written as if applied:
SS-26); §12's paragraph on what this round read. Counts now: 85 J-V8, 32 BCR-V8
(item 202 withdrawn), 46 T-V8, 5 owner questions (unchanged).

**For the coherence pass.** File f cites this volume's requests by id with a line pointer ("V08 §10, l. NNNN"); the round
added lines before §10, so those pointers are now approximate — the BCR ids are the authority. item 202 is withdrawn
(file f item 202 already says so); item 508, -13, -17 and -29 changed text (a note kind, the DR24 custom inputs, the bar
range and the retired `fallbackClass`), applied by reference.

