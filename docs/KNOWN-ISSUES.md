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
| KI-5 | A non-LIFO removal (or one after an earlier batch dissolved a split) can leave a split vertex as a valid degree-2 vertex instead of dissolving it; remove(insert(x)) of the latest chain is exact | M0-a-06 C-0225 (3), N-17 | fails safe (valid arena); needs the edit log's history (M2a) | M2a / the hardening pass |
| KI-6 | The polygon-clipping oracle (M0-k-03) does not terminate on one offsetFace case (seed 6101, ~draw 2633); a PR run meets it ~1 in 12 runs and the test times out at 1 h. Repro register.json `oracleHang` (no test runs it); seeds -6421/6521 replaced 6101 in the measure | M0-a-08 C-0231 (6) | an oracle's bug, not ours; ours commits in 665 ms | the hardening pass (or a guarded oracle timeout) |
| KI-7 | insetRing's bisection reads an overlay refusal at a trial distance as an empty result (can lower lastCm on a collapsed refusal); 0 met in 1.2e5 cases | M0-a-08 C-0231 | not met in practice | the hardening pass |
| KI-8 | Town vocabulary inside @plat/kernel (kernel-boundary audit 2026-10-07): the concern/stage registries (registry/concerns.json, stages.json, ids.ts) and the role registry (arena/roles.json) hold town names, as §6.1/C-0005/§2.2 rule 7 place them; plus local leaks — tx/types.ts BatchScope 'district'|'block', tx/tx.ts LINEAR_PARTS, insert/splitThrough.ts 'enceinte' address, warp/held.ts gate_end/deck_end/raised_foot, faces/common.ts default 'plot_line', 'district' parameter names (index/spatial.ts, facade, invariants/whole.ts) | J224 | moving registries changes the design and persisted ids mid-M0; the kernel-boundary lint freezes them (an allowlist that can only shrink) | a kernel-extraction step before any separate reuse or sale (registries to @plat/model; local leaks to caller-supplied sets; a runtime API to register roles and concerns — today roles.json is fixed at module load; optionally a runtime refusal counter, since refusal counting is only a test discipline) |
| KI-9 | Kernel benches load town code at run time through the @plat/testkit barrel (it re-exports metrics and parity); a @plat/testkit/kernel subpath export would make them town-free | J224 | a public-API change of testkit; only needed for extraction | the kernel-extraction step |
| KI-10 | On the 900 ha test frame, a river meeting the walled stage can make S5 refuse (seeds 1 and 6 river from the north: E_SELF_INTERSECT; seed 2 from the west: E_DEGENERATE; seed 5 from the north: E_INVARIANT) — fail-safe, reported in the run, never silent | M0-x-04 C-0264 (13); M0-c-04 / M0-c-05 code | refusals are typed and reported; the end-to-end river cases need the hardening pass's whole-town runs | the hardening pass (or earlier if M1's towns hit it often) |
| KI-11 | On M0-x-04's small base fixtures (900 ha frame, 30 ha walled) S6 makes 11 / 16 districts where the count law gives N_d 7, through its leftover rule; M0-e-04's own fixture holds the law (±1) | M0-e-04 fix round (C-0265 notes) | the bar holds on its own fixture; whole-town behaviour needs M1's towns | M0-e-06 / M0-x-04 judgement, else the hardening pass |
| KI-4 | A per-town refusal budget beside the per-case cap (a town makes ~10⁴–10⁵ insertChain calls, so 2 per 10⁴ is a refusal on most maps) | N-46 (6g) | needs real towns to measure | M1's first towns |

## The hardening pass
- **M0 close (owner, 2026-10-07, J237):** before M1 starts, an M0 hardening phase drains every row sourced in M0 (this
  register's M0 rows and every row of `plat/docs/build/checks/M0-*-notes.md`): fixed with an exact precaution, or carried
  forward to a named milestone only when it provably needs that milestone's material, with the reason recorded here.
  Then the whole suite re-runs at PR size. M1 opens only after that.
- **Base:** inside M4 ("hardening and the incremental path", ARCHITECTURE §16), once M1–M3b are built: run the whole chain
  together on generated towns at every rung and preset, collect every refusal, oddity and KI row, and fix each with an
  exact precaution knowing how the chain reacts up and down — or record the owner's acceptance.
- **Later stages:** each later gating milestone (M5, M6 and M-CAL) closes with a hardening pass over its own layer.
- **Release:** M-SF's release checklist requires this register drained — every entry fixed or owner-accepted.
