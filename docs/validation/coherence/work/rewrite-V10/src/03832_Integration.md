## Integration notes — continuation (volumes/_integrate, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate (continuation); covered by the whole-design retrovalidation (J84).

* **IN-V10-5 (J-VI.26).** The T2 `terrace` encoder's stroke now carries `falloff: 'cosine'` and `amount: 1`, as
  volume 9's T2 mapper sets them (V9 §4.20.1 (4)): §7.1's `FieldStroke` requires both, so the encoded event validates
  against its schema; `water: input.water ?? 'locked'`, as its `raise` row writes it and volume 9's T2 mapper sets it
  from T2's water mode (reconciliation round 1, SS-36).

