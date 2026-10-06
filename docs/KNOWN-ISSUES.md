# Known issues — the hardening register (N-45, J202; owner-approved 2026-10-05)

The owner's view (2026-10-05): a fully bug-free program comes once most of it is built and the parts run together, when
precautions can be exact instead of triaged. So during the build, an item fixes only what must be right now — fail-safety,
anything persisted or locked in, contracts between items, its exit bars (N-45 in plat/docs/build/checks/M0-spec-notes.md) —
and every other finding is recorded here, by reference, for the hardening pass. **Deliberately deferred — documented, not
bugs to re-find.**

## Where the entries live
- **Per-item notes:** `plat/docs/build/checks/<id>-notes.md` — every row a checker classified as minor or hardening (J180),
  and from 2026-10-05 every row tagged `KI` (N-45). 23 M0 items have notes files so far.
- **Refusal registers (N-44):** each kernel operation's fixtures of inputs it refuses cleanly (seed, input, refusal code),
  counted against the cap of 1 per 10⁴; first: M0-a-05's insertChain (rounds S3/S4).
- **Deferred designs:** listed below.

## Deferred designs
| id | what | from | why deferred | drained by |
|---|---|---|---|---|
| KI-1 | insertChain refusals below the evidence-set caps (J207/J208 as made exact by N-46 (4)) | N-43, N-44, N-46 | M0 fixes the systematic classes (S5: the thin-strip endpoint fallback, wedge corners, drift); the residual under the caps, with a ratchet, waits for better routing | the hardening pass |
| KI-2 | ARCHITECTURE amendments: §3.6/§3.7 for N-38, N-40, N-43, N-44, N-46 (incl. §3.6 *Chain classes*, §13.1 and C-0177 (14): a mandatory chain may be refused, counted); §16's M4 row for N-45 | J191–J211 | amendments land in one amendments round, not mid-flow | the next amendments round |
| KI-3 | A consumer contract for a refused mandatory chain: what S4 / S9 (walls, kerbs) do when insertChain refuses one | N-46 (6f) | no stage consumes insertChain in M0 | M1's spec |
| KI-4 | A per-town refusal budget beside the per-case cap (a town makes ~10⁴–10⁵ insertChain calls, so 2 per 10⁴ is a refusal on most maps) | N-46 (6g) | needs real towns to measure | M1's first towns |

## The hardening pass
- **Base:** inside M4 ("hardening and the incremental path", ARCHITECTURE §16), once M1–M3b are built: run the whole chain
  together on generated towns at every rung and preset, collect every refusal, oddity and KI row, and fix each with an
  exact precaution knowing how the chain reacts up and down — or record the owner's acceptance.
- **Later stages:** each later gating milestone (M5, M6 and M-CAL) closes with a hardening pass over its own layer.
- **Release:** M-SF's release checklist requires this register drained — every entry fixed or owner-accepted.
