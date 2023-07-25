import Unit from "../objects/Unit";

export function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function getAdjacentMovableSpaces(unitGrid, unit) {
  const spaces = [];

  for (let r = 0; r < unitGrid.length; r++) {
    for (let c = 0; c < unitGrid[0].length; c++) {
      if (
        getDistance(unit.row, unit.col, r, c) <= unit.mobility &&
        Unit.checkSpaceFree(unitGrid, r, c)
      ) {
        spaces.push({ row: r, col: c });
      }
    }
  }

  return spaces;
}

export function getNearestPlayerUnit(battle, unit) {
  let minDist = Infinity;
  let closestUnit = null;
  for (let playerUnit of battle.playerTeam) {
    const dist = getDistance(
      playerUnit.row,
      playerUnit.col,
      unit.row,
      unit.col
    );
    if (dist < minDist) {
      minDist = dist;
      closestUnit = playerUnit;
    }
  }

  return closestUnit;
}

export function getNearestMovableSpaceToTarget(battle, unitGrid, unit) {
  const movableSpaces = getAdjacentMovableSpaces(unitGrid, unit);
  const nearestTarget = getNearestPlayerUnit(battle, unit);

  let minDist = Infinity;
  let nearestSpace = null;

  for (let space of movableSpaces) {
    const dist = getDistance(
      space.row,
      space.col,
      nearestTarget.row,
      nearestTarget.col
    );
    if (dist < minDist) {
      minDist = dist;
      nearestSpace = space;
    }
  }

  return nearestSpace;
}

export function getPlayerUnitsInAttackRange(battle, unit) {
  const targets = [];

  for (let target of battle.playerTeam) {
    const dist = getDistance(target.row, target.col, unit.row, unit.col);

    if (dist <= unit.range) {
      targets.push(target);
    }
  }

  return targets;
}

export function getLowestHealthTarget(battle, unit) {
  const targets = getPlayerUnitsInAttackRange(battle, unit);

  let minHealth = Infinity;
  let lowestHealthTarget = null;

  for (let target of targets) {
    if (target.health < minHealth) {
      minHealth = target.health;
      lowestHealthTarget = target;
    }
  }

  return lowestHealthTarget;
}
