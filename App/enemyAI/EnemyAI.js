import {
  getLowestHealthTarget,
  getNearestMovableSpaceToTarget,
  getPlayerUnitsInAttackRange,
} from "../tools/tools";

export function moveTowardNearestPlayerUnit(battle, field, unit, setField) {
  const nearestSpaceToTarget = getNearestMovableSpaceToTarget(
    battle,
    field.unitGrid,
    unit
  );

  setField({
    type: "move unit",
    battle,
    row: nearestSpaceToTarget.row,
    col: nearestSpaceToTarget.col,
  });
}

export function attackPlayerUnitWithLowestHealth(battle, unit, setField) {
  const target = getLowestHealthTarget(battle, unit);

  if (target) {
    setField({ type: "attack unit", battle, unit: target });
  }
}
