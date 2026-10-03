from lib import *
t = extract(1678, 1933)
R = [
("(at a village rung V07\n     §2.4's row for its step type and member class, J-V7.105; 108 (b); SCC-33, SCC-64, TT-06);",
 "(at a village rung V07\n     §2.4's row for its step type and member class, J-V7.105; 108 (b));"),
("class's column; SCC-31; item 110 (d)), so a dossier-backed use", "class's column; item 110 (d)), so a dossier-backed use"),
("A candidate whose access runs over a retired hollow way is scored as any\n   other; the winning placement reopens that way first, in the same batch, with every retired way on its path to the\n   ways in use (V06 §3.8.2's placement rule; TU-05); a candidate whose path needs a locked or pinned retired way is none.",
 "A candidate whose access runs over a hollow way is scored as any\n   other; the winning placement reopens that way first, in the same batch, with every hollow way on its path to the\n   ways in use (V06 §3.8.2's placement rule); a candidate whose path needs a locked or pinned hollow way is none."),
("then its class's column; SCC-31), a candidate on a retired hollow way scored as any other and its winning opening\nreopening the way first, in the same batch (V06 §3.8.2's placement rule; TU-05) — with the coverage",
 "then its class's column), a candidate on a hollow way scored as any other and its winning opening\nreopening the way first, in the same batch (V06 §3.8.2's placement rule) — with the coverage"),
("**Claim-sized classes at a village rung** (TU-04's V06 companion, from\nV07 §3.12 *Markets, halls and the fair over epochs* (c); J-V6.119):",
 "**Claim-sized classes at a village rung** (V07 §3.12 *Markets, halls and the fair over epochs* (c); J-V6.119):"),
("a\nrecord through the product's `records` placement in the `dossier` step (V07 §3.12 (c); TV-02) — takes",
 "a\nrecord through the product's `records` placement in the `dossier` step (V07 §3.12 (c)) — takes"),
("for a roster member (a candidate whose joins the cap's remainder cannot hold is none — base §4.11 *Churn*: candidates\nbeyond a cap wait);",
 "for a roster member (a candidate whose joins the cap's remainder cannot hold is none — §4.11 *Churn*: candidates\nbeyond a cap wait);"),
("reported over budget, never\nrefused (§7.7 item 5; seam-time-r5 TW-05, J-V6.123; V07 §3.12 (b), (c) cite it) —",
 "reported over budget, never\nrefused (§7.7 item 5; J-V6.123; V07 §3.12 (b), (c) cite it) —"),
("a record by `village.records` in the `dossier` step\n(TV-02) — never here.", "a record by `village.records` in the `dossier` step — never here."),
("states no `useRules` of its own (V11 writes none by default; a class row may; SCC-45) takes this table's row",
 "states no `useRules` of its own (V11 writes none by default; a class row may) takes this table's row"),
("district term, split sites — is the base's (applied by the coherence pass from file g) with V11's rows (`siting.web`,\nV11 §3.7.4; the goods table, V11 §3.7.1).",
 "district term, split sites — is the base's (§4.7 S10a/S10b, §4.5 S7b (1)) with V11's rows (`siting.web`,\nV11 §3.7.4; the goods table, V11 §3.7.1)."),
("at most `siting.web.relaxPasses` (V11 §3.7.4's cell; SCC-69) passes;", "at most `siting.web.relaxPasses` (V11 §3.7.4's cell) passes;"),
("placement rule included: a move onto a plot on a retired way reopens it first, TU-05);", "placement rule included: a move onto a plot on a hollow way reopens it first);"),
("(V11 §2.3; V11 §3.7.4's `siting.web.splitThreshold` only the\n   default a class without its own takes, V11 §3.5.2; SCC-23, SCC-69), the phase opens the shop on the best-scored candidate plot (3.9.6's set, a retired way on its path reopened first by\n   V06 §3.8.2's placement rule; TU-05) as a `branchOf` use",
 "(V11 §2.3; V11 §3.7.4's `siting.web.splitThreshold` only the\n   default a class without its own takes, V11 §3.5.2), the phase opens the shop on the best-scored candidate plot (3.9.6's set, a hollow way on its path reopened first by\n   V06 §3.8.2's placement rule) as a `branchOf` use"),
("**A split with no threshold** (SCC-70; J-V6.113):", "**A split with no threshold** (J-V6.113):"),
("(V08 §2.6's\n   `chainStatus` word row maps SettlementForge's words onto the keys; SCC-32) from the next `uses` phase",
 "(V08 §2.6's\n   `chainStatus` word row maps SettlementForge's words onto the keys) from the next `uses` phase"),
("With the web's off form applied (V11 §3.7.4's named cell set, equal to the parity presets; V11's round 2, SCC-34) an",
 "With the web's off form applied (V11 §3.7.4's named cell set, equal to the parity presets) an"),
("walls go through the fortification's dossier path (V06 §3.7.6 (4)) — by V08 §3.5.1 (c)'s three cases, never by template family (seam SR6-02; J-V6.125).",
 "walls go through the fortification's dossier path (V06 §3.7.6 (4)) — by V08 §3.5.1 (c)'s three cases, never by template family (J-V6.125)."),
]
t = apply(t, R)
t = strip_narr_ids(t)
save('09-s3d.md', t)
print(words(t))
