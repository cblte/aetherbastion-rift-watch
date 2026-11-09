Hier ist der Inhalt strukturiert, übersichtlich und formatiert als technischer Wiki-Guide aufbereitet:

---

# Hero Town: Combat Mechanics & Damage Pipeline

Battles run automatically: heroes attack and trigger block skills while enemies do the same. Every hit—from basic attacks to 3-chain skills and damage-over-time (DoT) ticks—runs through a single, fixed damage pipeline directly extracted from the game's code.

---

## 1. Damage Resolution Pipeline

Every hit resolves sequentially through eight distinct steps, each feeding into the next:

1. **Base Damage:**
$$\text{Base} = \text{ATK} \times \text{Skill Percentage}$$


*(Skill % scales with chain level, e.g., 78% / 120% / 160%)*
2. **Critical Hit:**
If triggered, multiply by $(1 + \text{Crit Power})$.
3. **Variance:**
Apply a random variation of $\pm 5\%$ (minimum spread of 1).
4. **DEF / RES Mitigation:**
Mitigate by target's effective DEF (Physical) or RES (Magic). *True damage skips this step.*
5. **Evasion Check:**
Target rolls to dodge. On success, the entire hit is negated (**MISS** / 0 damage).
6. **Damage Reduction:**
Reduce remaining damage by flat Damage Reduction (capped at 50%).
7. **Shield Absorption:**
Active shields soak damage first. Excess damage carries over.
8. **HP Deduction:**
Remaining damage is subtracted from current HP.

> **Multiplicative Stacking:** DEF/RES, Damage Reduction, and Evasion operate on separate layers—they never cancel each other out, but multiply the effective value of one another.

---

## 2. Defensive Mechanics & Mitigation

| Defensive Layer | Reliability | Hard Cap | Key Characteristic |
| --- | --- | --- | --- |
| **DEF / RES** | Consistent | None (Diminishing) | Mitigates Physical (DEF) or Magic (RES). Vulnerable to Penetration. |
| **Damage Reduction** | Consistent | 50% | Flat % cut to all incoming hits; cannot carry defense alone. |
| **Evasion** | High-variance | None (100% = Immune) | All-or-nothing roll (MISS). Negates Physical, Magic, True, and DoTs. |

### DEF & RES Formula

$$\text{Damage Multiplier} = \frac{100}{100 + \text{Effective DEF}}$$

$$\text{Effective DEF} = \text{Target DEF} - \text{Attacker Penetration}$$

* 100 Effective DEF halves incoming damage (50% reduction).
* Mitigates along an uncapped curve with diminishing returns (damage never hits zero purely from defense).

| Effective DEF / RES | Damage Taken | Damage Reduction |
| --- | --- | --- |
| **0** | 100.0% | 0.0% |
| **25** | 80.0% | 20.0% |
| **50** | 66.7% | 33.3% |
| **100** | 50.0% | 50.0% |
| **150** | 40.0% | 60.0% |
| **200** | 33.3% | 66.7% |
| **300** | 25.0% | 75.0% |
| **500** | 16.7% | 83.3% |
| **1000** | 9.1% | 90.9% |

### Penetration & Over-Penetration

Penetration directly subtracts from the defender's DEF/RES. If Penetration exceeds the defender's defense, the surplus grants an amplification bonus:

$$\text{Bonus Multiplier} = 1 + \left(0.5 \times \frac{\text{Over}}{\text{Over} + 100}\right)$$

* $\text{Over} = \text{Penetration} - \text{Target DEF}$
* **Bonus Cap:** Maximum **$\times 1.5$** multiplier, regardless of surplus amount.

---

## 3. Offense, Crits & Attack Speed

### Critical Hits & Overflow

$$\text{Crit Damage} = \text{Damage} \times (1 + \text{Crit Power})$$

* Base default Crit Power is **+50%** (resulting in a $\times 1.5$ multiplier).
* **Crit Chance Overflow:** Crit Chance can exceed 100%. Every complete 100% guarantees a crit and unlocks a higher crit tier (max level 3). Remaining percentage dictates the chance to hit the next tier.

### Attack Speed (ATK SPD)

In the game engine, faster attack animations are tracked as negative numbers (base hero speed is 2.5; lower = faster):

$$\text{Animation Speed Multiplier} = 1 + \frac{-\text{ATK SPD}}{2.5} \quad (\text{only active when } \text{ATK SPD} < 0)$$

* **Cap:** Maximum **$2.0\times$** speed at **$-2.5$** ATK SPD.
* Pushing past $-2.5$ incurs an overcap penalty (half value; hard floor at $-2.5$).
* Base attack timing depends on individual hero animations (e.g., Soltar: 1.0s in Phase 1, 1.75s in Phase 3). Exact attacks per second require testing due to potential animation lockout windows.

---

## 4. Special Rules & Damage Types

* **Physical Damage:** Mitigated by DEF.
* **Magic Damage:** Mitigated by RES.
* **True Damage:** Ignores DEF and RES entirely. Can still be dodged via Evasion, reduced by Damage Reduction, and absorbed by Shields.
* **Shields:** Soak damage prior to HP. Depleting shields can trigger on-break passives. Excess damage spills directly into HP.
* **Revival:** Heroes reaching 0 HP are downed on the spot. They revive over time by regenerating **4% Max HP per second**.
* **PVP Scaling:** Arena battles apply an additional bracket-based damage reduction penalty across all hits.

---

## 5. Calculation Walkthrough

**Scenario:** 1,000 incoming Physical damage vs. an enemy with 150 DEF, 20% Damage Reduction, 0 Penetration, and no shield.

```
Step 1: DEF Mitigation
        Effective DEF = 150
        Multiplier    = 100 / (100 + 150) = 0.40
        Damage        = 1,000 × 0.40 = 400

Step 2: Evasion Check
        Roll succeeded (Hit lands)

Step 3: Damage Reduction (20%)
        Damage        = 400 × (1 - 0.20) = 320

Result: 320 damage subtracted from HP.

```

*(If this were **True Damage**, it would skip DEF mitigation and deal $1,000 \times 0.80 = \mathbf{800}$ damage).*

---

## 6. Stat Reference Table

| Stat | In-Game Effect | Primary Source |
| --- | --- | --- |
| **ATK** | Base damage for auto-attacks and skills (skills scale as % of ATK). | Base stat / Level |
| **HP** | Maximum health. Unit revives at 4%/s upon hitting 0 HP. | Base stat / Level |
| **DEF** | Reduces incoming Physical damage via diminishing curve. | Base stat / Level |
| **RES** | Reduces incoming Magic damage via diminishing curve. | Base stat / Level |
| **Penetrate DEF / RES** | Subtracts from target DEF/RES; surplus grants up to $\times 1.5$ bonus damage. | Base stat / Level |
| **Crit Chance** | Probability to critically strike. Excess above 100% stacks crit levels (cap: 3). | Base stat / Level |
| **Crit Power** | Bonus damage multiplier on crits: $\text{Base} \times (1 + \text{Crit Power})$. | Base stat / Level |
| **Evasion** | % chance to take 0 damage (**MISS**). Uncapped (100% = total immunity). | Traits, Weapons, Forge |
| **Damage Reduction** | Flat % reduction against all damage. Hard capped at 50%. | Traits, Weapons, Forge |
| **Lifesteal (Vamp)** | Restores HP equal to a % of damage dealt. | Traits, Weapons, Forge |
| **Heal Received** | Amplifies incoming healing from all sources. | Gear / Passives |
| **Attack Speed** | Increases animation speed (activates below 0, capped at $2\times$ at $-2.5$). | Gear / Passives |
| **Knockback Resist** | Resistance chance and distance reduction against knockbacks. | Gear / Passives |