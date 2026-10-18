# fix-t-rest — the owner's answer to V14 Q5 carried into the volumes (file v) and 947 (c)'s label (sites-roads/fix-t-rest)

Lane: sites-roads/fix-t-rest (opus; J394, Fable-critiqued), 2026-10-18 16:24–16:30 UTC.
Source of the findings: `confirm-t-rest.md` (md5 7e229eca) §5 — P1 (content, J398) and P2 (record label, minor).
No git command run; the host repository untouched; `docs/PROGRESS.md` not edited.
Scripts and outputs: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/fix-t-rest/`
(`frags.py` the nine fragments; `apply.py` → `apply.json`; `tfix.py`; `gen.py` + `head.md` + `tail.md` → file v;
`roundtrip.py`; `bcheck.py`; the `*.before.md` copies).

## P1 — fixed: file v, item 954 (`docs/AMENDMENTS-2026-10-18v.md`)

A new amendment file in file r item 926's form (title; "Numbered from **954** (file u ended at 953)"; the **APPLIED**
status line; the application target by target; sources; how to read; the item with the owner's answer and its meaning;
the fragments with target, line, md5, current text once, new text in full, reason; *Adjustments and additions*;
*Not items*; *For the session*; a blank line before every item header and before each `---`). Nine fragments, applied
by script (`python3 -I apply.py`), each old text asserted exactly once at its turn, each new text exactly once after,
no old text left outside its own new text:

| frag | target | line before file v | what |
|---|---|---|---|
| 954 (a) | V14 | 91 | revision note "Owner's word v" after file u's (added for coherence, as files m–u did) |
| 954 (b) | V14 | 3123 | J-V14.57: "put to the owner as V14 §11 Q5 (vetoable)" → "…, answered yes on 2026-10-18 (J398)" (the check's text) |
| 954 (c) | V14 | 3196 | Q5 answer cell gains "**Answered by the owner, 2026-10-18 (J398): yes.**" (the check's text) |
| 954 (d) | INDEX | 14 | the state line names file v (added for coherence, as 926 (i), 949 (h)) |
| 954 (e) | INDEX | 186 | the check's replacement (1), verbatim |
| 954 (f) | INDEX | 229 | the check's replacement (2), verbatim |
| 954 (g) | SUMMARY | 17–18 | the check's replacement (3), verbatim |
| 954 (h) | SUMMARY | 208–210 | the check's replacement (4), verbatim |
| 954 (i) | SUMMARY | 222–223 | the check's replacement (5), verbatim |

No adjustment to any fragment text: every old text matched as the check wrote it.

## P2 — fixed: `docs/AMENDMENTS-2026-10-18t.md:1304`

`**947 (c).** The index — the revision notes under the title (replacement).` (once) →
`**947 (c).** The index — the preamble (*What this file is*: the amendment files' state) (replacement).` (once after;
old 0 after). `diff` shows that one line only. Recorded in file v under *Adjustments and additions* as a record
correction outside the item.

## md5s (before → after)

| file | before | after | lines |
|---|---|---|---|
| `docs/volumes/V14-sites.md` | `19b4f1c1a898ace55d10b5b366613cab` | `f5dd37a7e9b739da7f29095d47a17a87` | 3 336 → 3 340 |
| `docs/volumes/INDEX.md` | `55ad33a169855ff270874384d33914eb` | `10a72c97f86a88533292971629c56539` | 260 → 260 |
| `docs/volumes/SUMMARY.md` | `ace778811c60989f4a52f2237d1bd4ab` | `1c0ada295f24b9e22909ce86eaec2cd8` | 227 → 228 |
| `docs/AMENDMENTS-2026-10-18t.md` | `2d6a63086bb1a4277473a735bfcb6049` | `a5b2a1ab8b39c6c5bff94916b6e6fe6c` | 1 633 → 1 633 |
| `docs/AMENDMENTS-2026-10-18v.md` | (new) | `d2c39f0fa2c1085b6b54c5874146cd97` | 170 |
| `docs/ARCHITECTURE-FULL.md` | `dbef77819c737d5c3d0bf6cd5cd1a732` | `bd69e9a6335960450b29b93919909455` | 81 354 → 81 358 newlines |

## Confirm (by script, after the bundle)

- `python3 tools/bundle_architecture.py` → "wrote docs/ARCHITECTURE-FULL.md: 81359 lines from 16 source(s)", exit 0;
  `--check` → "UP TO DATE", exit 0. `diff` before/after: the INDEX and V14 header rows and the six V14/INDEX
  fragments, nothing else (SUMMARY is not a bundle source).
- The six new texts bound for V14 and INDEX each exactly once in the bundle (`bcheck.py`: 6/6).
- `roundtrip.py`: file v's nine items parsed back from its own quotes (⏎ read as a line break, `>` as an empty line)
  equal the applied fragments 9/9; reversing them from the current V14, INDEX and SUMMARY gives the before copies
  byte-equal 3/3.
- Greps after: no INDEX or SUMMARY line puts V14 Q5 as "vetoable" or "until you say otherwise"; SUMMARY:20's "until you
  say otherwise" is the others' (the deferred seven).

## Left for the session (recorded in file v's *For the session*)

1. The ledger row — the task said "append the ledger row", but the standing rule is that lanes never edit
   `docs/PROGRESS.md`; the row for file v's application (beside J399) is the session's.
2. `README.md:16`'s owner's-words row names files r and t; file v may want its clause there — README is not this lane's.

Status: LANDED.
