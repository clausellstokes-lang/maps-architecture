# The contracts round (RL13 + RL15): spec draft, 2026-11-13

This folder holds a spec seat's draft of THE CONTRACTS ROUND (J800 (3); queue Q205 = RL13, Q135 = RL15). **Nothing in it is bound.**
- `draft.md` has the findings (with code cites), the two designs, the legs, the open questions and the seat's weak points.
- There are three `spec-<item>-<round>.json` files, one per leg (M0-a-06 S11 → M0-e-03 S6 → M0-c-04 S8). Each is an entry in specs.json's form, written as it would be bound. Every `[SESSION: …]` mark is a place the session fills in at binding.
- The main finding: neither contract touches M0-a-05's files. The refusal that names a body is made by the transaction (tx/, M0-a-06), and a sequence plan that commits nothing is a dry run in tx/ plus the façade. So the draft has no M0-a-05 leg and uses no `S?` round.
- Before binding, the session must rule on draft §4's open questions. The main ones are the round's owner and gate (Q1), the dry-run form of seam (a) (RL15), where RL13's field lives (Q4), and Q5–Q8.
- This spec changes a contract between items, so it takes an adversarial review before it binds (J631 (2) (a)). The review should attack draft §5 first.
- Cites: files and functions are binding. Line numbers were read on 102ff939, with insert/ read on origin/wip/child-a05s14 @ 9354851f, and are not binding.
