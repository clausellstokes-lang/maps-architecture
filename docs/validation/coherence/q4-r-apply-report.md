# Apply report — session/amendments-r-apply (2026-10-18)

File written: `/home/user/maps-architecture/docs/AMENDMENTS-2026-10-18r.md` (item 926, sub-items (a)–(t)).

## Fragments (each current text asserted to occur exactly once before replacement, each new text exactly once after)

| sub-item | file | line before this file | line at its turn (after earlier fragments in the same file) |
|---|---|---|---|
| 926 (a) | `docs/volumes/V13-world.md` | 98–100 | 98 |
| 926 (b) | `docs/volumes/V13-world.md` | 108 | 113 |
| 926 (c) | `docs/volumes/V13-world.md` | 3712 | 3718 |
| 926 (d) | `docs/volumes/V13-world.md` | 3723 | 3730 |
| 926 (e) | `docs/volumes/V13-world.md` | 3740 | 3747 |
| 926 (f) | `docs/volumes/V13-world.md` | 4234 | 4241 |
| 926 (g) | `docs/volumes/V13-world.md` | 4284–4289 | 4292 |
| 926 (h) | `docs/volumes/V13-world.md` | 4308 | 4321 |
| 926 (i) | `docs/volumes/INDEX.md` | 14 | 14 |
| 926 (j) | `docs/volumes/INDEX.md` | 183 | 183 |
| 926 (k) | `docs/volumes/INDEX.md` | 188–190 | 188 |
| 926 (l) | `docs/volumes/INDEX.md` | 222 | 224 |
| 926 (m) | `docs/volumes/SUMMARY.md` | 17–19 | 17 |
| 926 (n) | `docs/volumes/SUMMARY.md` | 196–199 | 198 |
| 926 (o) | `docs/volumes/SUMMARY.md` | 206–207 | 209 |
| 926 (p) | `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | 121–122 | 121 |
| 926 (q) | `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | 125 | 129 |
| 926 (r) | `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | 202 | 206 |
| 926 (s) | `docs/ARCHITECTURE.md` | 17721–17722 | 17721 |
| 926 (t) | `README.md` | 16 | 16 |

Per file: V13 8 (a–h), INDEX 4 (i–l), SUMMARY 3 (m–o), the brief 3 (p–r), the base 1 (s), README 1 (t) — 20 fragments.
Dry run on in-memory copies first (all counts 1), then the real run; post-check: every new text count 1 in its target;
every old text count 0 except (b), whose old text is a prefix inside its new text (count 1, expected).

| file | md5 before | md5 after |
|---|---|---|
| `docs/volumes/V13-world.md` | `9e4e8b9be9069b350d288948a3babb9a` | `c8759307398388249547f71e1912feca` |
| `docs/volumes/INDEX.md` | `8972b3d971147eef36c824d94a392fe1` | `39b0c51960df130cb068744dd2eb3ee6` |
| `docs/volumes/SUMMARY.md` | `c62646021c3f8e632677e2f358c29190` | `9d1422839ab63a3ec3bf6d13e3ea8265` |
| `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | `b1e0e364ad95495866f41e7a5130cda2` | `fc2520709752ef77f397ba7d6a89c169` |
| `docs/ARCHITECTURE.md` | `a440f7a4a99cec0d946266b5cc7076e8` | `b03ba26e4eedfa446d517280cd83e67f` |
| `README.md` | `bc1f950f12a752663b4fc7967649122a` | `2a4b54c89e47cc40bf0a7b3ffd619f07` |

## Greps run (scope: V13, INDEX, SUMMARY, the brief, the base, docs/design/*.md; README added)

- `grep -n "Q4"` — 24 hits before (`q4/grep-q4.txt`): V13 :45, :77, :78, :89 (revision notes, history, left), :399 (§1.4,
  true, left), :3712 (c), :3723 (d), :3740 (e — found by the grep, not in the task's list), :4234 (f), :4279–4289 (g),
  :4308 (h); INDEX :188–190 (k), :205 V08 Q4 and :213 V10 Q4 (other questions), :222 (l), :226 V14 Q4 (the vendor block,
  must not change); the brief :125 (q); the base :13067, :24094 (J80's Q4, other question), :17722 (s). docs/design: none.
- `grep -n "door 1"` — 16 hits (`q4/grep-door1.txt`): V13 :4226 (BCR-V13-40 heading, left), :4279–4285 (g); INDEX :189
  (k), :222 (l); the brief :125 (q); the base :164, :17585, :17716, :17726, :20987, :21193–21194 (door 1 stays closed,
  true, left), :17721 (s).
- Phrase greps (`stay(s) dark`, `awaiting the owner`, `waits on your`, `owner's own word`, `owner confirms`,
  `asks the owner to confirm`, `until Q4`, `born uncanonized`, `still gates`, `lit only after`) — found beyond the
  task's list: SUMMARY :15–19 (m), :196–199 (n), :206–207 (o), and the brief's §9 row :202 "held by V13 §11 Q4" (r).
- After applying, the same phrase greps over the scope (README included) return only the base's :8284 and :14658
  (lighting: "stay dark", unrelated).

## Bundle

`python3 tools/bundle_architecture.py` → "wrote docs/ARCHITECTURE-FULL.md: 81062 lines from 16 source(s)", exit 0;
`python3 tools/bundle_architecture.py --check` → "UP TO DATE", **exit 0** (baseline before the edits: also exit 0).

## Choices and things left

- (a) a V13 revision note for file r, and (b) V13's citation rule naming item 926 as the owner's word (the rule
  otherwise reads every item ≥ 200 as a change item) — beyond the task's list, the volume's own conventions.
- (f) BCR-V13-40's record kept whole, a parenthesis appended ("the owner confirmed it on 2026-10-18: file r item 926").
- (i) INDEX's state line names file r — beyond the list, keeps the index's amendment-state line true.
- (t) the README row is in `/home/user/maps-architecture/README.md`: there is no `docs/README.md` (the task named
  docs/README.md; the row "The owner's rules and words" exists only in the root README). Added files m (items 659–662),
  n–q (780–925) and r; file j's stale "not yet applied" corrected to "applied, cited by number in the base's §0.2".
  Files k and l not added: they are base change requests and a format re-verification, not the owner's words.
- Left: V13 revision notes and integration notes (history); V13 :399 (true); V14 Q4 and the other volumes' Q4s
  (different questions); the base's other door-1 texts (true: door 1 stays closed); the base's §0.2 landing list
  (lists files through l only); README :15 "Changes the volumes need in the core (not yet applied)" (stale, outside
  the owner's-words row); `docs/PROGRESS.md` (not this seat's file: the session should record the answer against
  J388's "Q4 NOT RULED").
- Deviation: the base (`docs/ARCHITECTURE.md`, 3.3 MB, 24 461 lines) was not read whole — it does not fit a seat's
  context; §11.4 was read whole and the base was grepped for every Q4 and door-1 phrasing. Every other edited file was
  read whole (V13 all 4 438 lines, INDEX, SUMMARY, the brief, README).
- No git command was run.
