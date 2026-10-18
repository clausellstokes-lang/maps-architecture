# The lens q critic — final report (workflows/43, critic seat)

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — 2 design fragments on V13, 22 dated record brackets and fixes across files m–q and the realm record, 1 research count (lane retrovalidation/amendments; J392)

The completeness critic of amendments q as applied (docs/validation/coherence/lens-q.md), recorded verbatim: nothing material missing. Its bookkeeping notes are answered by J389.

Nothing material is missing. All three gaps from `lens-p-critic.md` are closed in the applied texts, as their fixes or J388 say. No implementer-facing text still lets the canon in only through a premium or DM-confirmed act for a new campaign. Q4 is asked of the owner in every place the owner reads decisions, and no text claims it as delegated.

All six targets match the after-md5s in `docs/validation/coherence/lens-q.md:58-63`, and the bundle `--check` reports UP TO DATE [OBSERVED].

**Gap 1 (the canon entered only through the re-canonize; §11.4 said "DM-confirmed") — closed [OBSERVED]**
- **The base:**
  - §11.4 now names three routes: the birth canon, the additive re-canonize and the DM-confirmed re-canonize. The owner still confirms by V13 §11 Q4 (`docs/ARCHITECTURE.md:17718-17722`).
  - §7.7 now says "receipted canonize: a new campaign's birth canon … or a re-canonize" (`docs/ARCHITECTURE.md:12898`).
- **V13:**
  - the W-PORT row (`docs/volumes/V13-world.md:187`)
  - §3.11.6's consumption law (:2286-2288)
  - §2.6's canon row (:1243)
  - H8, which now sends `canonized` and the calibration "at every canon it adopts" (:3726)
  - J-V13.70 (:3827)
  - BCR-V13-40 in V13 §10 (:4226-4234), whose quotes match the base text word for word
- **The proposal and the brief:** `docs/design/proposal-world-native.md:20` and `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md:100`.
- **Remaining wording:**
  - "Premium" or "DM's re-canonize" now appears only for removals, geometry shifts, lay versions, cost-law changes, retcons, imported rows and existing or rebased campaigns (V13:526, :2312, :2337, :2393, :2424, :3722, :3733). That is the scope J388 rules.
  - Generic "offered to the host's re-canonize" texts include the additive re-canonize (V13:2320-2337) [INFERRED].
  - V14 and the other volumes contain no canonize text [OBSERVED].

**Gap 2 (the additive re-canonize, J388) — closed [OBSERVED]**
- J388 is written (`docs/PROGRESS.md:447`). It records that file p is applied and BCR-V13-38 admitted.
- The following carry the additive re-canonize, never gated by the entitlement:
  - H22 (V13:3740)
  - J-V13.100 (:3857)
  - J-V13.106 (:3863)
  - §11's ruling (:4300-4308)
  - the brief's Part C (brief:110-120)
- "Additive" is now defined:
  - `CanonRequest.additive` and the `WorldCanon` envelope (V13:785-786)
  - the additive canon in §3.11.6 (:2308-2337)
  - the two warning codes (:3619-3620)
  - the test, T-V13-37 (c) (:3563)
- The question the critic raised is answered. A new seat's redrawn neighbours are a per-slot version step, not a premium geometry shift (:2326-2327, J-V13.100).

**Gap 3 (Q4 asked; nowhere delegated) — closed [OBSERVED]**
- **V13 §11 Q4:** door 1 stays closed "until the owner's explicit word". H5 and the birth canon stay dark until it is answered (V13:4279-4289).
- **INDEX:**
  - §6 opens with "answered but one … save V13 Q4, which waits on the owner's own word" (`docs/volumes/INDEX.md:183-190`).
  - The Q1 and Q2 rows now match V13 §11 (:219-220).
  - A Q4 row is added, marked "recommended; awaiting the owner" (:222).
  - The state line now says file k is applied (:14), and the census covers BCR-V13-30 – -40 (:48).
- **SUMMARY:** it counts "thirty-three … eight … one … waits on your own word" (`docs/volumes/SUMMARY.md:15-19`). It gives Q4 its own bullet (:196-199) and keeps it out of the "proceeds on its recommendation" clause (:206-207).
- **The brief:** Q4 is among the owner questions that remain (brief:125). The §9 row says H22 is held by Q4 (:202).
- **HANDOFF:** Q4 is "WAITING ON THE OWNER (not delegable …)" (`docs/HANDOFF.md:19`). Its delegation line lists V13 Q1–Q3 only (:53).
- Both of INDEX's stale state lines from the critic's list are fixed (:14, §7 :238-242) [OBSERVED].

**Not material (bookkeeping or wording; no builder would build anything differently)**
1. `PROGRESS.md` ends at J388. Still unwritten [OBSERVED]:
   - a row recording file q's application and BCR-V13-40's admission;
   - the session's answers to file q's *For the session* (2), removals left premium, and (4), additive re-canonize only on campaigns born canonized;
   - the ledger corrections in (3): J388's parenthesis "(the port rule already re-derives on founding events)", and the phrase "campaign without the entitlement".

   J388's pending ledger still lists BCR-V13-40, which is now admitted (INDEX:48). The texts already carry file q's recommendations, so these are J-rows for the session (`lens-q.md:140-146`).
2. Two V13 texts still say a removal is offered to "the host's re-canonize" without "premium": §4.1's `unbindSeat` comment (V13:2836) and the `Territory` row (:1201). §1b.3 (:526), §3.11.6 (:2320, :2393), H4 (:3722) and T-V13-37 (c) keep removals out of the additive canon [OBSERVED].
3. The port has no stated refusal of an `additive` request on a campaign that was not born canonized (V13:785, :2309). Keeping the additive canon to such campaigns is host policy (H22, "for new campaigns only"), so answering the request does no harm [INFERRED].
4. The proposal's §12 owner questions do not list Q4 (`docs/design/proposal-world-native.md:260-268`). It is a research-side document; V13 §11 is the source of truth for the questions [OBSERVED].
5. The brief lists Q4 next to Q1 and Q2 without saying, as INDEX and SUMMARY do, that Q4 alone has no default and keeps H5 dark (brief:125) [OBSERVED].

I wrote no files.