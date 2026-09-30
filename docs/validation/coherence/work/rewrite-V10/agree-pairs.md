## pair ['V01', 'V10'] shared=45 disagree=1
- {"subject": "WhyPull", "home": "V11", "how": "most-stated", "a_items": ["V01-0391"], "b_items": ["V10-0204", "V10-0205", "V10-0339", "V10-0724"], "verdict": "disagree", "conflicts": ["V10-XAGREE-2"]}
## pair ['V02', 'V10'] shared=36 disagree=0
## pair ['V03', 'V10'] shared=52 disagree=0
## pair ['V04', 'V10'] shared=66 disagree=0
## pair ['V05', 'V10'] shared=61 disagree=0
## pair ['V06', 'V10'] shared=50 disagree=0
## pair ['V07', 'V10'] shared=71 disagree=0
## pair ['V08', 'V10'] shared=58 disagree=1
- {"subject": "SettlementForge", "home": "V09", "how": "most-stated", "a_items": ["V08-0001", "V08-0007", "V08-0016", "V08-0075", "V08-0077", "V08-0098"], "b_items": ["V10-0003", "V10-0005", "V10-0006", "V10-0041", "V10-0050", "V10-0276"], "verdict": "disagree", "conflicts": ["SCOPE-C07"]}
## pair ['V09', 'V10'] shared=524 disagree=4
- {"subject": "EditEvent", "home": "V09", "how": "most-stated", "a_items": ["V09-0119", "V09-0123", "V09-0137", "V09-0147", "V09-0186", "V09-0223"], "b_items": ["V10-0146", "V10-0443", "V10-0729"], "verdict": "disagree", "conflicts": ["DXC-04"]}
- {"subject": "SettlementForge", "home": "V09", "how": "most-stated", "a_items": ["V09-0003", "V09-0021", "V09-0050", "V09-0116", "V09-0133", "V09-0135"], "b_items": ["V10-0003", "V10-0005", "V10-0006", "V10-0041", "V10-0050", "V10-0276"], "verdict": "disagree", "conflicts": ["SCOPE-C07"]}
- {"subject": "T-V9-15", "home": "V09", "how": "id-prefix", "a_items": ["V09-0140", "V09-0142", "V09-0143", "V09-0144", "V09-0158", "V09-0281"], "b_items": ["V10-0751", "V10-0764", "V10-0766"], "verdict": "disagree", "conflicts": ["V09-XAGREE-3"]}
- {"subject": "BCR-V10-20", "home": "V10", "how": "id-prefix", "a_items": ["V09-0271", "V09-0947", "V09-1045"], "b_items": ["V10-0009", "V10-0121", "V10-0198", "V10-0224", "V10-0485", "V10-0548"], "verdict": "disagree", "conflicts": ["DXC-04"]}
## pair ['V10', 'V11'] shared=66 disagree=0
## pair ['V10', 'V12'] shared=20 disagree=0
## pair ['V10', 'determinism'] shared=30 disagree=1
- {"subject": "EditEvent", "home": "V09", "how": "most-stated", "a_items": ["V10-0146", "V10-0443", "V10-0729"], "b_items": ["DETERMINISM-0310", "DETERMINISM-0475"], "verdict": "disagree", "conflicts": ["DXC-04"]}
## pair ['V10', 'kernel'] shared=24 disagree=0
## pair ['V10', 'model'] shared=29 disagree=0
## pair ['V10', 'pipeline'] shared=24 disagree=0
## pair ['V10', 'rendering'] shared=56 disagree=0
## pair ['V10', 'scope'] shared=133 disagree=1
- {"subject": "SettlementForge", "home": "V09", "how": "most-stated", "a_items": ["V10-0003", "V10-0005", "V10-0006", "V10-0041", "V10-0050", "V10-0276"], "b_items": ["SCOPE-0010", "SCOPE-0041", "SCOPE-0054", "SCOPE-0133", "SCOPE-0141", "SCOPE-0153"], "verdict": "disagree", "conflicts": ["SCOPE-C07"]}
CONTRACT {"subject": "the editing rules", "units": ["determinism", "V09", "V10", "V01", "V02", "V03", "V04", "V05", "V06", "V07"], "home": "§7 (events, the binding table, locality, lifecycle, bends)", "rule": "One binding table (E-04), one dry-run outcome table (E-07; refusals only for a dossier fact or a lock), §7.4's lifecycle row for every edit kind the volumes add."}
CONTRACT {"subject": "the build plan", "units": ["scope", "V01", "V02", "V03", "V04", "V05", "V06", "V07", "V08", "V09", "V10", "V11", "V12"], "home": "§16 and INDEX §3/§4", "rule": "J122's combined order; each volume's §8 slot and price agree with §16 and INDEX; item 568 computes the totals once."}
CONTRACT {"subject": "the test ids and bars", "units": ["scope", "V01", "V02", "V03", "V04", "V05", "V06", "V07", "V08", "V09", "V10", "V11", "V12"], "home": "§13 and each volume §7", "rule": "Test ids unique (ID census); every base hook bar names the volume test that takes it over (W-05, CO-06); every no-op pin a NoOpPin on V12's engine (E-20)."}