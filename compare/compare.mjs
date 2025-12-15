import { defaultMaxListeners } from "events";
import { coreUnitIds, units } from "../assets/units.mjs";
import chalk from "chalk";

// console.error(chalk.red("units:"), units);
// console.log(chalk.red("units.infantry:"), units.infantry);
// console.log(chalk.red("units.infantry.militia:"), units.infantry?.militia);
/* console.log(
	chalk.red("units.infantry.militia.levels:"),
	units.infantry.militia.levels
); */
/* console.log(
	chalk.red("units.infantry.militia.levels.terrain:"),
	units.infantry.militia.levels[1].attack.unarmored
); */
/* console.log(
	chalk.red("units.infantry.militia.levels.terrain.plains:"),
	units.infantry?.militia?.levels?.terrain?.plains
); */

// TODO target unit

let input = {
	unitType: "infantry",
	unitId: "militia",
	unitLevel: "1",
	unitCombatState: "defense",
	unitTerrainType: "mountains",
};
// console.log(input);

// TODO Import unit
const path = units[input.unitType][input.unitId];
// console.log("The path console.log", path);

// TODO calculate Total unit hit-point

// let totalHitPoints = null;

function calcTotalHitPoints() {
	const unitHP = path.levels[input.unitLevel].hp;
	const unitLevelPath = path.levels[input.unitLevel];
	const combatState = input.unitCombatState;
	const maxDamage = Math.max(...Object.values(unitLevelPath[combatState]));
	let terrainMod = null;
 
	if (input.unitCombatState === "defense") {
		terrainMod = unitLevelPath.terrain[input.unitTerrainType].defenseMod;
		return console.log(terrainMod);
	} else if (input.unitCombatState === "attack") {
		terrainMod = unitLevelPath.terrain[input.unitTerrainType].attackMod;
		return console.log(terrainMod);
	}
	// for (const modIs of unitLevelPath.terrain[input.unitTerrainType]) {}
	// const terrainMod/

	// const maxAttack = maxDamage +
	// console.log(unitLevelPath.terrain[input.unitTerrainType]);
}

calcTotalHitPoints();
