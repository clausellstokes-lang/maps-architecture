## Integration notes — continuation (volumes/_integrate, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate (continuation); covered by the whole-design retrovalidation (J84).

* **IN-V09-13 (J-VI.23, clean-room).** IN-V09-1 no longer names the retired handle kind (its former name coincided
  with a reference export field). No meaning changed.
* **IN-V09-14 (J-VI.27).** The **Deck height** and **Arch spacing** steppers (§4.20) edit file f item 244's held fields
  `clearanceCm` and `spanSpacingCm`; item 244's support step and the course solver read them, so an edit re-lays the
  piers and re-derives the spans in the same commit (BCR-V9-33's bends unchanged).
* **IN-V09-15 (J-VI.4 applied in the text).** BCR-V9-26 (b)'s last sentence read that a raised stroke ending on an
  island's rim or lying on its key "is refused with volume 5's refusal and its offer"; it now reads that it is bent as
  J-VI.4 (d) and (e) state, as file f item 362's note already applies it; and its uphill aqueduct's last resort, which read
  "F-EDIT with the action 'a well at the terminal'", now reads "bent to a well at the terminal (J-VI.4 (h))".
* **IN-V09-16 (J-VI.30, item 101 R2).** The message rows `refuse.noSite`, `refuse.overBudget` and `refuse.vacateFirst`
  are now `bend.place.noSite`, `bend.place.overBudget` and `bend.vacate`: a user's placement that no plot here fits, one
  over its disruption budget, and a join or split that removes an occupied building are bent by the dry run and named in
  one line (file f item 582), since none contradicts a dossier fact or a lock; the clerk (volume 10) renders them as the
  item's `bent` line with its alternatives (V10 §3.16; SS-17, SS-28), no refusal category (reconcile-V09-r1, SS-30). The
  dossier-backed refusals (`refuse.dossierOwned`, `refuse.dossierRemove`, `refuse.roster.dossier`), the
  lock refusals and `refuse.assignment.noSite` — the F-EDIT item 582 keeps for an assignment, or the re-placement a
  `rejectSite` causes, that no plot satisfies inside the hard rows (reconcile-V09-r2's second brief, SR-30) — stay.

