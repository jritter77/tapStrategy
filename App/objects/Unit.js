import { getDistance } from "../tools/tools";
import UnitClasses from "./UnitClasses";

export default class Unit {
  constructor(className, team) {
    this.className = className;
    this.team = team;

    this.health = UnitClasses[className].health;
    this.power = UnitClasses[className].power;
    this.mobility = UnitClasses[className].mobility;
    this.speed = UnitClasses[className].speed;
    this.range = UnitClasses[className].range;

    this.passive = UnitClasses[className].passive;
    this.active = UnitClasses[className].active;
  }

  getHighlight(battle) {
    if (this.team === "player") {
      return "orange";
    } else if (this.team === "enemy") {
      return "violet";
    }
  }

  static moveUnit(unitGrid, activeUnit, row, col) {
    if (
      getDistance(activeUnit.row, activeUnit.col, row, col) <=
        activeUnit.mobility &&
      Unit.checkSpaceFree(unitGrid, row, col)
    ) {
      const newGrid = [...unitGrid];
      newGrid[row][col] = activeUnit;
      newGrid[activeUnit.row][activeUnit.col] = null;
      activeUnit.row = row;
      activeUnit.col = col;
      activeUnit.hasMoved = true;
      return newGrid;
    }
  }

  static attackUnit(unitGrid, activeUnit, target) {
    const newGrid = [...unitGrid];
    newGrid[target.row][target.col].health -=
      newGrid[activeUnit.row][activeUnit.col].power;
    newGrid[activeUnit.row][activeUnit.col].hasActed = true;

    if (newGrid[target.row][target.col].health <= 0) {
      newGrid[target.row][target.col] = null;
    }

    return newGrid;
  }

  static tickAll(playerTeam, enemyTeam) {
    for (let unit of playerTeam) {
      if (unit.ap != undefined && unit.health > 0) {
        unit.ap += unit.speed;
      } else {
        unit.ap = 0;
      }
    }

    for (let unit of enemyTeam) {
      if (unit.ap != undefined && unit.health > 0) {
        unit.ap += unit.speed;
      } else {
        unit.ap = 0;
      }
    }

    return { playerTeam, enemyTeam };
  }

  static getReadyUnits(playerTeam, enemyTeam) {
    const ready = [];

    for (let unit of playerTeam) {
      if (unit.ap >= 100 && unit.health > 0) {
        ready.push(unit);
      }
    }

    for (let unit of enemyTeam) {
      if (unit.ap >= 100 && unit.health > 0) {
        ready.push(unit);
      }
    }

    return ready;
  }

  static resetActiveUnit(activeUnit, playerTeam, enemyTeam) {
    if (activeUnit.team === "player") {
      for (let unit of playerTeam) {
        if (unit === activeUnit) {
          unit.ap = 0;
          unit.hasMoved = false;
          unit.hasActed = false;
        }
      }
    } else {
      for (let unit of enemyTeam) {
        if (unit === activeUnit) {
          unit.ap = 0;
          unit.hasMoved = false;
          unit.hasActed = false;
        }
      }
    }

    return { playerTeam, enemyTeam };
  }

  static checkSpaceFree(unitGrid, row, col) {
    return unitGrid[row][col] === null;
  }
}
