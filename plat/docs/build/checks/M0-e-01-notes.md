# M0-e-01 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-e-01 (lane `check/M0-e-01-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, the closing check fails the item only on a blocker. Neither finding below is a
blocker: one is a hardening test for a boundary the code already gets right, and the other records why a fix-round
assertion adds no mutant kill of its own, so that a later checker does not report it again. Each row names its
handling and where it belongs. The verdict and its evidence are in `checks/M0-e-01.md` (the closing round is at the
top).

The first check's notes N-1 – N-5 stay in `checks/M0-e-01.md`. N-1 is still the session's to route to M0-e-03 /
M0-x-02: the ore sampler must continue the heightfield's `terrain.noise` stream, not restart it. The ids below continue
that numbering.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-6 | **The low band's edge is inclusive, but no test holds it.** `groundClasses` classes land as low when `height[c] <= lowest + LOW_BAND_M * 100` ("within `LOW_BAND_M` of the lowest land", C-0165 (4)). Mutant E11 (`<` for `<=`) survives the whole `test/terrain` set ("61 passed (61)"), because no fixture places a resource-cell centre exactly at the band's top. It is not equivalent. A mirror-only probe shows this: a flat TOWN site at 300 cm, a water row at 0 cm and one land row rewritten through `heightWriter` to exactly 300 cm + `LOW_BAND_M`, with that row asserted `GROUND_CODES.low`. The probe passes on the item's code ("1 passed (1)") and fails on E11 ("expected 3 to be 2"). Heights are integer centimetres, so an edge cell is reachable on an honest input (a terrace or a carved shelf), but the item's code gives the right class there. CONFIRMED (executed). The probe's source is `scratchpad/waves/e01close/probe-edge.test.ts`. | Add one edge row to `resources.test.ts`'s lowest-land test (its ridge at 300 cm + `LOW_BAND_M` and asserted low, or a second row beside the 600 cm ridge). | M4 (test hardening), or earlier, at the first change to `groundClasses` (for example, when M1's S1 seat replaces the water-table stand-in) |
| N-7 | **`strategy.test.ts` line 34 adds no kill of its own.** The fix round's assertion that `terrain.controls` is not among the context's requests is implied by line 31's exact `toEqual([{ concern: terrain.noise, entity: TOWN_ROOT }])`. Mutants T1 (`terrain.controls` instead) and T1b (`terrain.controls` as well) both fail at line 31 first. Line 34's own value is the one C-0167 (1) states: it type-checks the concern's registry name, so a rename of the registry row fails `tsc -b`. The kills are CONFIRMED (executed: T1 and T1b, messages in the verdict). The type-check is PLAUSIBLE (by reading, not executed): `CONCERNS` is a frozen object literal, the base config is `strict`, and the root `tsconfig.json` references `packages/site/test`. | None. The line is harmless and does what C-0167 says. This row is recorded so that a later checker does not report it again. | — |
