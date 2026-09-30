## pair ['V01', 'V11'] shared=62 disagree=0
## pair ['V02', 'V11'] shared=62 disagree=0
## pair ['V03', 'V11'] shared=48 disagree=0
## pair ['V04', 'V11'] shared=57 disagree=0
## pair ['V05', 'V11'] shared=40 disagree=0
## pair ['V06', 'V11'] shared=67 disagree=0
## pair ['V07', 'V11'] shared=180 disagree=1
- {"subject": "TableId", "home": "V11", "how": "defined", "a_items": ["V07-0100"], "b_items": ["V11-0109", "V11-0110", "V11-0113", "V11-0116", "V11-0169"], "verdict": "disagree", "conflicts": ["MC-11"]}
## pair ['V08', 'V11'] shared=67 disagree=0
## pair ['V09', 'V11'] shared=63 disagree=0
## pair ['V10', 'V11'] shared=66 disagree=0
## pair ['V11', 'V12'] shared=91 disagree=2
- {"subject": "T-V6-62", "home": "V06", "how": "id-prefix", "a_items": ["V11-0469", "V11-0641"], "b_items": ["V12-0011", "V12-0227", "V12-0382", "V12-0399"], "verdict": "disagree", "conflicts": ["V11-XCONF-1"]}
- {"subject": "T-V11-18", "home": "V11", "how": "id-prefix", "a_items": ["V11-0362", "V11-0512"], "b_items": ["V12-0144", "V12-0155", "V12-0360"], "verdict": "disagree", "conflicts": ["V12-XCONF-4"]}
## pair ['V11', 'determinism'] shared=37 disagree=0
## pair ['V11', 'kernel'] shared=5 disagree=0
## pair ['V11', 'model'] shared=30 disagree=1
- {"subject": "TableId", "home": "V11", "how": "defined", "a_items": ["V11-0109", "V11-0110", "V11-0113", "V11-0116", "V11-0169"], "b_items": ["MODEL-0479", "MODEL-0524"], "verdict": "disagree", "conflicts": ["MC-11"]}
## pair ['V11', 'pipeline'] shared=80 disagree=0
## pair ['V11', 'rendering'] shared=4 disagree=0
## pair ['V11', 'scope'] shared=53 disagree=0
CONTRACT {"subject": "the dossier rules", "units": ["determinism", "V08", "V11", "V04", "V06", "V07", "V01", "V05"], "home": "§7.7 (the contract, DR1–DR35 and item 113's rows) and V08 (the port)", "rule": "Dossier facts immutable on the map (items 20, 20 (h), 22); every dossier field consumed or on §7.7 item 1's ignore-list (W-DOS-01a/b); every derived fact traced to a DR row (DR26–DR35 numbered, ID-DR); every change kind reaching its dependents (wiring's change table; W-DOS-02, W-DOS-08)."}
CONTRACT {"subject": "the build plan", "units": ["scope", "V01", "V02", "V03", "V04", "V05", "V06", "V07", "V08", "V09", "V10", "V11", "V12"], "home": "§16 and INDEX §3/§4", "rule": "J122's combined order; each volume's §8 slot and price agree with §16 and INDEX; item 568 computes the totals once."}
CONTRACT {"subject": "the test ids and bars", "units": ["scope", "V01", "V02", "V03", "V04", "V05", "V06", "V07", "V08", "V09", "V10", "V11", "V12"], "home": "§13 and each volume §7", "rule": "Test ids unique (ID census); every base hook bar names the volume test that takes it over (W-05, CO-06); every no-op pin a NoOpPin on V12's engine (E-20)."}