---
name: zsh-rev-path-modifier
description: "Hazard met 2026-09-27 in the sf Fable review — in zsh, an unbraced \"$r:src/…\" is mangled by the :s history modifier, so git show / cat-file / rev-parse silently answer for the bare commit instead of <rev>:<path>; always write \"${r}:path\" (or a literal ref) when comparing blobs across refs"
metadata:
  node_type: memory
  type: feedback
  originSessionId: c0d81c15-f08e-4364-97ca-c6b05aa13811
  modified: 2026-09-27T21:15:00.000Z
---

On 2026-09-27 (lane fable-review/main/sf) a loop `for r in 5d699cc68 8ffe9479f master; do git -C SE show $r:src/data/sampleDossier.json | shasum; done`
reported four different hashes and sizes (51 875 / 3 171 / 270 bytes, unparsable JSON) for a file the sf/outputs lane had called
byte-identical on all four versions. The lane was right. zsh reads `$r:s...` as the `:s/…/…/` substitution modifier on `$r`, so the
argument collapsed to the bare commit id and git printed the COMMIT object (its message plus diff), never the blob. `git rev-parse $r:path`
even returned the commit's own full hash, and `cat-file -s` the commit's byte size — plausible-looking numbers, which is why it nearly
became a false CORRECTED verdict.

**Why it matters.** Byte-identity claims across refs are load-bearing in this program (baseline copies, fixtures, "the sample is one blob
everywhere"); a wrong hash comparison can overturn a correct survey claim or hide a real difference.

**How to apply.** Quote and brace the expansion — `"${r}:src/data/x.json"` — or use a literal ref; prefer `git rev-parse "<rev>:<path>"`
(a blob id, 40 hex, not equal to the commit) and `git cat-file -s` on that blob as the cross-ref identity test, and sanity-check that the
resolved object is a blob (`git cat-file -t`). `git ls-tree -r <rev> -- <dir>` plus `git hash-object --no-filters <file>` is the safe
whole-tree method (used for the 2 320-file treecheck).
