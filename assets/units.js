// units.js
// MVP unit data for Call of War battle planner.
// - Grouped by research tab (infantry, tanks, ordnance).
// - Terrain modifiers are decimals: +0.25 = +25%, -0.5 = -50%.
// - Each level has: hp, attackRange, viewRange, baseSpeed, terrain, attack, defense.

export const armorClasses = {
  unarmored: 'unarmored',
  light: 'lightArmor',
  heavy: 'heavyArmor',
  air: 'air',
  ship: 'ship',
  sub: 'submarine'
};

export const damageTypes = {
  unarmored: 'unarmored',
  lightArmor: 'lightArmor',
  heavyArmor: 'heavyArmor',
  air: 'air',
  ship: 'ship',
  sub: 'submarine',
  buildings: 'buildings',
  morale: 'morale'
};

export const terrains = {
  plains: 'plains',
  hills: 'hills',
  mountains: 'mountains',
  forest: 'forest',
  urban: 'urban',
  sea: 'sea',
  enemy: 'enemy' // enemy territory modifier
};

// Helper to avoid repeating the zero-mods object
const noTerrainMod = { attackMod: 0, defenseMod: 0, speedMod: 0 };

export const units = {
  // ======================================================================
  // INFANTRY TAB
  // ======================================================================
  infantry: {
    // ---------------------------------------------------------------
    // Militia
    // ---------------------------------------------------------------
    militia: {
      id: 'militia',
      name: 'Militia Type 1932',
      category: 'infantry',
      armorClass: armorClasses.unarmored,
      role: 'defensive',
      tags: {
        isFrontline: true,
        isRanged: false,
        isFast: false,
        stealthIn: ['hills', 'forest', 'urban']
      },
      levels: {
        1: {
          hp: 15,
          attackRange: 0,
          viewRange: 42,
          baseSpeed: 24,

          terrain: {
            plains:    { ...noTerrainMod },
            hills:     { attackMod: 0,    defenseMod: 0.25, speedMod: 0 },
            mountains: { attackMod: -0.5, defenseMod: 0.75, speedMod: 0 },
            forest:    { attackMod: 0,    defenseMod: 0.5,  speedMod: 0 },
            urban:     { attackMod: 0,    defenseMod: 0.25, speedMod: 0 },
            sea:       { ...noTerrainMod },
            enemy:     { attackMod: -0.5, defenseMod: 0,    speedMod: 0 }
          },

          attack: {
            unarmored: 1.5,
            lightArmor: 0.9,
            heavyArmor: 0.5,
            air: 0.9,
            ship: 0.5,
            sub: 0.5,
            buildings: 0.4,
            morale: 0.1
          },

          defense: {
            unarmored: 2.3,
            lightArmor: 1.3,
            heavyArmor: 0.8,
            air: 1.3,
            ship: 0.8,
            sub: 0.8,
            buildings: 0.6
          }
        }
      }
    },

    // ---------------------------------------------------------------
    // Standard Infantry
    // ---------------------------------------------------------------
    infantry: {
      id: 'infantry',
      name: 'Infantry Type 1932',
      category: 'infantry',
      armorClass: armorClasses.unarmored,
      role: 'defensive',
      tags: {
        isFrontline: true,
        isRanged: false,
        isFast: false
      },
      levels: {
        1: {
          hp: 15,
          attackRange: 0,
          viewRange: 42,
          baseSpeed: 36,

          terrain: {
            plains:    { ...noTerrainMod },
            hills:     { ...noTerrainMod },
            mountains: { attackMod: -0.5, defenseMod: 0.2, speedMod: 0 },
            forest:    { attackMod: 0,    defenseMod: 0.2, speedMod: 0 },
            urban:     { attackMod: 0,    defenseMod: 0.5, speedMod: 0 },
            sea:       { ...noTerrainMod },
            enemy:     { attackMod: -0.5, defenseMod: 0,  speedMod: 0 }
          },

          attack: {
            unarmored: 3.0,
            lightArmor: 1.5,
            heavyArmor: 1.0,
            air: 1.0,
            ship: 0.5,
            sub: 0.5,
            buildings: 0.2,
            morale: 0.1
          },

          defense: {
            unarmored: 4.5,
            lightArmor: 2.3,
            heavyArmor: 1.5,
            air: 1.5,
            ship: 0.8,
            sub: 0.8,
            buildings: 0.3
          }
        }
      }
    },

    // ---------------------------------------------------------------
    // Motorized Infantry
    // ---------------------------------------------------------------
    motorizedInfantry: {
      id: 'motorizedInfantry',
      name: 'Motorized Infantry',
      category: 'infantry',
      armorClass: armorClasses.unarmored,
      role: 'fastOffense',
      tags: {
        isFrontline: true,
        isRanged: false,
        isFast: true
      },
      levels: {
        1: {
          hp: 15,          // if you confirm a different HP we can tweak
          attackRange: 0,
          viewRange: 70,
          baseSpeed: 68,

          terrain: {
            plains:    { attackMod: 0.25, defenseMod: 0.25, speedMod: 0 },
            hills:     { ...noTerrainMod },
            mountains: { ...noTerrainMod },
            forest:    { ...noTerrainMod },
            urban:     { attackMod: 0.25, defenseMod: 0.25, speedMod: 0 },
            sea:       { ...noTerrainMod },
            enemy:     { ...noTerrainMod }
          },

          attack: {
            unarmored: 6.0,
            lightArmor: 3.0,
            heavyArmor: 2.3,
            air: 0.0,
            ship: 1.5,
            sub: 1.5,
            buildings: 0.4,
            morale: 0.1
          },

          defense: {
            unarmored: 4.0,
            lightArmor: 2.0,
            heavyArmor: 1.5,
            air: 1.5,
            ship: 0.0,
            sub: 0.0,
            buildings: 0.0
          }
        }
      }
    }
  },

  // ======================================================================
  // TANKS TAB
  // ======================================================================
  tanks: {
    // ---------------------------------------------------------------
    // Light Tank
    // ---------------------------------------------------------------
    lightTank: {
      id: 'lightTank',
      name: 'Light Tank',
      category: 'tanks',
      armorClass: armorClasses.light,
      role: 'fastOffense',
      tags: {
        isFrontline: true,
        isRanged: false,
        isFast: true
      },
      levels: {
        1: {
          hp: 20,
          attackRange: 0,
          viewRange: 42,
          baseSpeed: 54,

          terrain: {
            plains:    { attackMod: 0.5,  defenseMod: 0.5,  speedMod: 0 },
            hills:     { ...noTerrainMod },
            mountains: { attackMod: -0.5, defenseMod: -0.5, speedMod: 0 },
            forest:    { attackMod: -0.2, defenseMod: -0.2, speedMod: 0 },
            urban:     { attackMod: -0.5, defenseMod: -0.5, speedMod: 0 },
            sea:       { ...noTerrainMod },
            enemy:     { ...noTerrainMod }
          },

          attack: {
            unarmored: 2.7,
            lightArmor: 4.0,
            heavyArmor: 1.5,
            air: 0.8,
            ship: 0.8,
            sub: 0.8,
            buildings: 0.4,
            morale: 0.1
          },

          defense: {
            unarmored: 1.8,
            lightArmor: 2.7,
            heavyArmor: 1.0,
            air: 0.5,
            ship: 0.5,
            sub: 0.5,
            buildings: 0.3
          }
        }
      }
    }
  },

  // ======================================================================
  // ORDNANCE TAB
  // ======================================================================
  ordnance: {
    // ---------------------------------------------------------------
    // Artillery
    // ---------------------------------------------------------------
    artillery: {
      id: 'artillery',
      name: 'Artillery',
      category: 'ordnance',
      armorClass: armorClasses.unarmored,
      role: 'rangedBombardment',
      tags: {
        isFrontline: false,
        isRanged: true,
        isFast: false
      },
      levels: {
        1: {
          hp: 10,
          attackRange: 50,
          viewRange: 42,
          baseSpeed: 27,

          terrain: {
            plains:    { ...noTerrainMod },
            hills:     { attackMod: 0.5, defenseMod: 0.5, speedMod: 0 },
            mountains: { ...noTerrainMod },
            forest:    { ...noTerrainMod },
            urban:     { ...noTerrainMod },
            sea:       { ...noTerrainMod },
            enemy:     { ...noTerrainMod }
          },

          attack: {
            unarmored: 1.5,
            lightArmor: 2.0,
            heavyArmor: 2.7,
            air: 1.0,
            ship: 2.0,
            sub: 1.0,
            buildings: 2.5,
            morale: 0.7
          },

          defense: {
            unarmored: 0.4,
            lightArmor: 0.5,
            heavyArmor: 0.7,
            air: 0.2,
            ship: 0.5,
            sub: 0.2,
            buildings: 0.6
          }
        }
      }
    }
  }
};

// For convenience in your UI / engine: list of MVP units as [tab, unitKey]
export const coreUnitIds = [
  ['infantry', 'militia'],
  ['infantry', 'infantry'],
  ['infantry', 'motorizedInfantry'],
  ['tanks', 'lightTank'],
  ['ordnance', 'artillery']
];
