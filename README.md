# CoW-BattleBrain
## ⚔️ Call of War Battle Planner

### **A Tactical Composition Recommendation Engine (MVP Specification & Roadmap)**

---

<p align="center">
  <img src="https://wiki.callofwar.com/images/thumb/d/d1/Call_of_War_Logo.png/600px-Call_of_War_Logo.png" width="300"/>
</p>

---

#### 🎯 Purpose

The **Call of War Battle Planner** is a lightweight strategic tool that helps players determine the **best unit combinations to attack an enemy stack**, based on:

* Enemy unit composition
* Terrain effects
* Unit roles & behavior (ranged, frontline, fast, etc.)
* Damage matrices
* Expected damage trades

This MVP focuses on **clarity, speed, and simplicity**.
All unit data is stored in a single hard-coded file (`units.js`), with no backend, no accounts, and no persistence.

---

## 🌟 What the MVP Does

The planner allows the player to input:

### ✔️ Enemy Units

A list of unit types and counts.

### ✔️ Terrain

Where the battle occurs (Urban, Plains, Mountains, etc.)

Then it outputs **five recommended attack composition archetypes**:

| Combo Type              | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| **Long-Range Combo**    | Artillery-driven, emphasizes range and minimal retaliation. |
| **High-Speed Combo**    | Motorized/mechanized/tank units focusing on mobility.       |
| **Standoff Combo**      | Uses maximum range advantage, designed to avoid damage.     |
| **Melee / Brawl Combo** | Close-combat frontline tanks/infantry with high HP.         |
| **Optimum Combo**       | The overall most efficient composition vs this enemy.       |

Each recommended stack includes expected outcomes:

* Damage dealt
* Damage received
* Efficiency score
* Tactical notes

The MVP emphasizes **usable tactical insight** rather than perfect simulation.

---

## 🧠 Design Philosophy

###### 1. **Simplicity First**

No server, database, API, or user authentication.
Everything resolves instantly from hard-coded stats.

###### 2. **Strategic Fidelity**

We mirror the *spirit* of Call of War combat:

* Damage per armor class
* Terrain bonuses
* Ranged vs melee behavior
* Speed and maneuver roles

But we avoid unnecessarily complex replication of time-tick combat.

###### 3. **Useful Imperfection**

The purpose is actionable recommendations, not pixel-perfect mechanics.
The system should feel:

> “This makes sense, and this gives me clarity.”

Not:

> “This exactly matches server-side combat logs.”

---

## 🗂️ Architecture Overview

```
┌────────────────────┐
│    User Interface   │
│ (Enemy + Terrain)   │
└──────────┬──────────┘
           │
           ▼
┌────────────────────┐
│  Enemy Stack Parser │
│  + Terrain Resolver │
└──────────┬──────────┘
           │
           ▼
┌────────────────────┐
│ Recommendation Core │
│ • Archetype Filters │
│ • Candidate Builder │
│ • Combat Modeling   │
│ • Efficiency Scoring│
└──────────┬──────────┘
           │
           ▼
┌────────────────────┐
│ Recommended Stacks │
│   (5 Combos)       │
└────────────────────┘
```

Each part is small, deterministic, and modular.

---

## 🧱 1. Unit Database (`units.js`) – Schema Specification

All unit data lives in one file.

Below is the **authoritative schema** that every unit follows.

---

##### 🔶 Unit Metadata (Static Per Unit)

```js
{
  id: "infantry",
  name: "Infantry Type 1932",
  category: "infantry",         // infantry | armor | artillery | air | naval
  role: "frontline",            // frontline | ranged | fast | defensive | anti_armor | anti_air
  armorType: "unarmored",       // defines how enemies deal damage to it
  maxRange: 0,                  // artillery/tanks/aircraft will have > 0
  baseSpeed: 36,
  tags: {
    isRanged: false,
    isFrontline: true,
    isFast: false
  },
```

---

## ### 🔶 Level Data

```js
  levels: {
    1: {
      hp: 15,

      attack: {
        unarmored: 2.7,
        light_armor: 2.1,
        heavy_armor: 0.9,
        air: 0.9,
        ship: 0.5,
        sub: 0.5,
        building: 0.2,
        morale: 0.1
      },

      defense: {
        unarmored: 4.0,
        light_armor: 2.1,
        heavy_armor: 1.3,
        air: 1.3,
        ship: 0.7,
        sub: 0.7,
        building: 0.3,
        morale: 0.1
      },

      terrain: {
        plains: {
          hp: 15,
          attackMod: 0,
          defenseMod: 0,
          speedMod: 0
        },
        hills: { ... },
        mountains: { attackMod: -0.5, defenseMod: +0.2, ... },
        forest: { ... },
        urban: { defenseMod: +0.5, ... },
        sea: { hp: 10 },
        enemy: { attackMod: -0.5 }
      }
    }
  }
}
```

This schema matches **real Call of War stats**, making the planner realistic.

---

## 🧱 2. Inputs

Users provide:

### ✔️ **Enemy Stack**

A dynamic list of:

* Unit type
* Count

Resulting in something like:

```js
[
  { unit: "infantry", level: 1, count: 3 },
  { unit: "light_tank", level: 1, count: 1 }
]
```

### ✔️ **Terrain**

A single selection affects both enemy and your units:

* Plains
* Hills
* Mountains
* Forest
* Urban
* Sea
* Enemy Territory

---

## 🔥 3. Recommendation Engine (The Core)

This is the heart of the MVP.

We run the following sequence:

---

##### 3.1 Enemy Profiling

We derive:

* Total HP
* Armor class distribution
* Expected attack/defense values
* Terrain-adjusted stats

This creates a unified structure for evaluating friendliness effectiveness.

---

##### 3.2 Archetype Rules

These rules determine what units can appear in each combo.

| Archetype       | Rules                                                    |
| --------------- | -------------------------------------------------------- |
| **Long-Range**  | Units where `isRanged = true`; allows minimal frontline. |
| **High-Speed**  | Units where `baseSpeed` exceeds threshold.               |
| **Standoff**    | Prefer high-range units; penalize melee units heavily.   |
| **Melee/Brawl** | Prefer HP-heavy frontline damage dealers.                |
| **Optimum**     | No restrictions; choose highest efficiency.              |

These rules translate directly into unit-selection filters.

---

##### 3.3 Candidate Stack Builder

For each archetype:

1. Select eligible units
2. Build a small set of stack templates (e.g., 4–7 units)
3. Evaluate each stack using the combat model
4. Keep best-performing stack

Small combinatorial searches keep logic fast and predictable.

---

##### 3.4 Combat Estimator

A **simplified but strategically faithful** model:

### Step 1 — Adjust unit stats for terrain

### Step 2 — Aggregate attacker damage vs enemy armor profile

### Step 3 — Apply ranged advantage

### Step 4 — Estimate HP damage to both sides

### Step 5 — Derive outcome

We track:

* Enemy HP lost
* Our HP lost
* Surviving units
* Efficiency = EnemyHPDestroyed / OurHPLost

This is enough to compare candidate stacks meaningfully.

---

## 📈 4. Outputs

Final results display **five recommended compositions**, each including:

### ✔️ Composition List

Units + counts

### ✔️ Expected Output

* Damage dealt
* Damage taken
* Efficiency score

### ✔️ Tactical Commentary

Such as:

* “High-speed composition ideal for fast breakthroughs.”
* “Standoff build minimizes return fire.”
* “Melee combo best for mountainous defense.”

---

## 🗺️ Roadmap (Step-by-Step Implementation Plan)

---

## **Phase 1 — Foundations**

* [ ] Finalize `units.js` schema
* [ ] Enter first 10 core units (Infantry, Mot Inf, Mech Inf, LT, HT, Arty, AA, AT, Fighter, TAC Bomber)
* [ ] Add terrain modifiers for all units

---

## **Phase 2 — Enemy + Terrain Processing**

* [ ] Build enemy stack parser
* [ ] Build terrain application module
* [ ] Create enemy profiling logic

---

## **Phase 3 — Archetype Engine**

* [ ] Write filtering logic for each archetype
* [ ] Write candidate stack builder
* [ ] Define scoring model for:

  * Ranged effectiveness
  * Speed effectiveness
  * Melee durability
  * Efficiency

---

## **Phase 4 — Combat Modeling**

* [ ] Implement simplified damage model
* [ ] Build HP reduction estimation
* [ ] Build efficiency comparison layer

---

## **Phase 5 — UI**

* [ ] Inputs: enemy stack + terrain
* [ ] Button: “Generate Recommendations”
* [ ] Display: five combo blocks
* [ ] Optional: “Show detailed math”

---

## **Phase 6 — Polish**

* [ ] Add tooltips describing units
* [ ] Add icons for unit categories
* [ ] Add collapsible advanced stats

---

## 🌄 North Star Vision

> **To give Call of War players instant, understandable, and reliable tactical insight.**
>
> The planner transforms complicated combat mathematics into clear answers:
>
> **“What should I attack with right now?”**
>
> The MVP prioritizes clarity over precision, strategy over simulation, and usability over completeness.
>
> As the project grows, we can expand into deeper modeling, custom unit availability, multi-stack battles, doctrines, and full combat simulations — but the foundation begins here.

---

## 🏆 At Completion, the MVP Will Deliver:

* Immediate, meaningful recommendations
* Realistic terrain-aware combat projections
* A clean and intuitive interface
* A robust base to expand into full simulation later

This document serves as both the **project specification** and **development roadmap**.

