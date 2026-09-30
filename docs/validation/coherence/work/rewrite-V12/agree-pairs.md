## pair ['V01', 'V12'] shared=35 disagree=0
## pair ['V02', 'V12'] shared=32 disagree=0
## pair ['V03', 'V12'] shared=16 disagree=0
## pair ['V04', 'V12'] shared=48 disagree=0
## pair ['V05', 'V12'] shared=26 disagree=0
## pair ['V06', 'V12'] shared=43 disagree=0
## pair ['V07', 'V12'] shared=34 disagree=0
## pair ['V08', 'V12'] shared=26 disagree=0
## pair ['V09', 'V12'] shared=30 disagree=0
## pair ['V10', 'V12'] shared=20 disagree=0
## pair ['V11', 'V12'] shared=91 disagree=2
- {"subject": "T-V6-62", "home": "V06", "how": "id-prefix", "a_items": ["V11-0469", "V11-0641"], "b_items": ["V12-0011", "V12-0227", "V12-0382", "V12-0399"], "verdict": "disagree", "conflicts": ["V11-XCONF-1"]}
- {"subject": "T-V11-18", "home": "V11", "how": "id-prefix", "a_items": ["V11-0362", "V11-0512"], "b_items": ["V12-0144", "V12-0155", "V12-0360"], "verdict": "disagree", "conflicts": ["V12-XCONF-4"]}
## pair ['V12', 'determinism'] shared=12 disagree=0
## pair ['V12', 'kernel'] shared=2 disagree=0
## pair ['V12', 'model'] shared=10 disagree=0
## pair ['V12', 'pipeline'] shared=12 disagree=0
## pair ['V12', 'rendering'] shared=5 disagree=0
## pair ['V12', 'scope'] shared=32 disagree=0
CONTRACT {"subject": "the build plan", "units": ["scope", "V01", "V02", "V03", "V04", "V05", "V06", "V07", "V08", "V09", "V10", "V11", "V12"], "home": "§16 and INDEX §3/§4", "rule": "J122's combined order; each volume's §8 slot and price agree with §16 and INDEX; item 568 computes the totals once."}
CONTRACT {"subject": "the test ids and bars", "units": ["scope", "V01", "V02", "V03", "V04", "V05", "V06", "V07", "V08", "V09", "V10", "V11", "V12"], "home": "§13 and each volume §7", "rule": "Test ids unique (ID census); every base hook bar names the volume test that takes it over (W-05, CO-06); every no-op pin a NoOpPin on V12's engine (E-20)."}