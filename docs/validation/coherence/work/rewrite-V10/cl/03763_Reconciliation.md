## Reconciliation round 2 (volumes/reconcile-V10-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r2; covered by the whole-design retrovalidation (J84).

Reconciled in place against `docs/volumes/critique/seam-surfaces-r1.md` (the host clerk seam, the knowledge rule and the
clerk's words) and `docs/volumes/critique/seam-time-r1.md`. Nine issues were this volume's: 9 fixed, 0 invalid,
0 on the fix list. New here: decisions J-V10.87 – J-V10.90 (J-V10.57 superseded). No new test, change request or
cross-volume request: T-V10-6, -20, -40 and -44 gain clauses, and item 473 (c) and item 572 are rewritten. The build
plan's estimates are unchanged: the harness reads the mount's host channel instead of the bridge (less code), the card's
two fields come from state the harness already keeps, and the slot's points form is an encoder branch.

| issue | severity | what changed | where |
|---|---|---|---|
| SR-01 | major | item 473 (c), the text file f item 473 hands the base, projects every `query.result` and every `preview.result`; the reader rows name `brief`, `entity`, `sites`, `why`, `frame` without `near` and `radiusM`, `rule` and `profile`; `measure`, `hit` and `inView` are answered `query.result { error: 'E_HOST_KIND' }`, a new error form of that reply; §3.17's door-1 paragraph and table, §1b.1's row and T-V10-20 follow; CVR-V10-3 marked met | §10.1 item 473 (c), §3.17, §1b.1, T-V10-20, J-V10.87, J-V10.47, CVR-V10-3 |
| SR-07 | major | `createClerk` returns `ClerkHandle`; `ClerkHandle` is a plain alias; the five members are described as V09's with this volume's behaviour; `ClerkMount.host` is the harness's one channel to the bridge — `config`/`onConfig` for the forced settings, the proxy transport with its `fallbacks` and `capUsd`, `needsToken`, `refused('origin')`, `proposals` for the intake and `answer` for `clerk.proposal`; §1b.2 gains the mount's row | §1.1 (10), §1b.1, §1b.2, §2.2, §2.6, §2.11, §2.14, §3.17, §3.18, §3.19, T-V10-20, J-V10.57 (superseded), J-V10.88 |
| SR-11 | major | `ProposalView` gains `accepted { group, seqs }` and `rebuild { seq }` (set on an accepted removal when a later group lands); `actions` gains `rebuild`; a host card's actions are accept, drop and why; each action's call is listed; §5.4's host card reads "without Try again" and the card shows Undo once accepted; §4.3 names the view field and each `delete` of the group | §2.6, §3.17, §4.3, §5.4, §1b.1, §2.14, T-V10-44 |
| SR-17 | minor | the access-point row lists `AccessCause.rule`'s values and cites V09 §4.17.3's lines (`info.under.cause.<rule>`) with no words of its own; the sealed and deep rows name `info.under.sealed` and `info.under.deep`; the stagnant state cites `info.catacomb.blocked.<cause>` | §3.9a |
| SR-18 | minor | the interim sentence of §2.3 deleted; the session key defined as `ClerkMount.effectiveKey()` without restating V09's definition, in §2.3 and §1b.1; §4.1's `siting` row cites `familyWeights` (V11 §4.2; V09 §2.6); CVR-V10-15 and CVR-V10-16 marked met; §12's and §13's interim text replaced. Found in passing and fixed: `admitAs` takes the key form `{ tier, places }` and admits what both keys admit, so SR-06's party key reaches the facade and can never admit more than the caller's key (item 572 rewritten; T-V10-6 gains the party-key case) | §2.3, §1b.1, §1b.2, §3.12 (1), (4), §4.1, §10.1 item 572, §10.2, §12, §13, T-V10-6, J-V10.90 |
| SR-19 | minor | the effects' kind is typed `Effect['kind']` (item 465) with no list of its own | §2.6 |
| SR-20 | minor | `WhyAnswer.history[].change` gains `source?` (`DossierChange.source`, §7.7 item 13) | §2.13 |
| SR-21 | minor | a deck slot that is taken or not offered encodes `placeAt { plot: '', from: { points: [the slot's point] }, designation }` at the deck's seaward end (`head`) or midpoint (`mid`) by V10 §3.6 (4), and the dry run bends it to the nearest free deck plot (`bend.deck.full`) as the canvas does; no refusal | §4.1, T-V10-40, J-V10.89 |
| TR-25 | minor | `MapBrief.raised[].source` is `'generated'` or `'declared'` (file f item 244's derived value), with `carriedSince?` (the week the rung first fell below CITY with the way standing, derived); `info.raised.carried` unchanged; the map block's rule 16 and §1b.1 read it | §2.13, §1b.1, §3.3 rule 16 |

Routed, not fixed here: V09's second round should write its key form of `ViewOpts.viewAs` with item 572's
reading — what both keys admit — rather than replacing the places (lane note, section 12).

