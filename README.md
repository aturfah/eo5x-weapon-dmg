# Etrian Odyssey V/Nexus Weapon Damage Comparison

Compares the damage two weapons would do against a given enemy (pretty much the main story/postgame bosses).

The values presented are ratios of the `BaseDamage` (i.e., damage done by a basic attack against a neutral enemy with no buffs), as well as the damage ranges accounting for the randomness (for randomness the games multiply by a [0.98, 1.02] factor and then add a number 0-4). 

The damage calculation for the player against a monster is

```
PlayerAttack = (aSTAT + aATK);
MonsterDefense = (dSTAT * 2);
compScore = MonsterDefense / PlayerAttack;
if (compScore > 1)
    BaseDamage = (((1.0 - ((sqrt(sqrt(compScore))) * 0.7)) * (Attack * 3)) - (Defense / 5)) * 0.717)
else:
    BaseDamage = (((0.3 + (((1.0 - (Defense / Attack)) ^ 3) * 1.7)) * (Attack * 3)) - (Defense / 5)) * 0.717

Damage = BaseDamage * SkillPower * Modifiers * Difficulty Factor
```

If we consider the ratio of damage done between two weapons under identical circumstances (same weakness modifiers, same buffs, same skill, etc) then the only factor contributing to the difference is the `BaseDamage` component. So we consider the ratio of this value to indicate how much damage is gained by using the upgraded weapon in this instance.

## Data Sources

- Formulas: [Dr. Fetus EO5 Algorithms](https://pastebin.com/jFnMqDET)
- EOX Enemy Stats: [EON Lets Play on Rhematic](https://rhematic.net/eon_lp/enemies_stitched/)
- EOV Enemy Stats: [EO5 Enemy Data Google Sheet](https://docs.google.com/spreadsheets/d/1ROSGSZQowD1r_-1tt4pTB8OmqOLh7y-_5QeV2J4jBX8/edit?gid=1613369410#gid=1613369410)
