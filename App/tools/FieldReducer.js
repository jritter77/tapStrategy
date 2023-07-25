import { View } from "react-native";
import FieldTile from "../components/field/FieldTile";
import Unit from "../objects/Unit";
import { getDistance } from "./tools";

export default function FieldReducer(field, action) {
  // Initialize unit grid
  if (action.type === "init unit grid") {
    const { battle } = action;
    const uGrid = [];

    for (let r = 0; r < 10; r++) {
      const uRow = [];

      for (let c = 0; c < 20; c++) {
        uRow.push(null);
      }

      uGrid.push(uRow);
    }

    for (let i = 0; i < battle.playerTeam.length; i++) {
      uGrid[i + 1][1] = battle.playerTeam[i];
    }

    for (let i = 0; i < battle.enemyTeam.length; i++) {
      uGrid[i + 1][18] = battle.enemyTeam[i];
    }

    return { ...field, unitGrid: uGrid };
  }

  // Update tile grid
  else if (action.type === "update tile grid") {
    const tGrid = [];

    for (let r = 0; r < 10; r++) {
      const tRow = [];

      for (let c = 0; c < 20; c++) {
        tRow.push(<FieldTile key={`${r}-${c}`} row={r} col={c} />);
      }

      tGrid.push(
        <View key={r} style={{ flexDirection: "row" }}>
          {tRow}
        </View>
      );
    }

    return { ...field, tileGrid: tGrid };
  }

  // Move unit
  else if (action.type === "move unit") {
    const { battle, row, col } = action;

    // Check if unit has already moved once this turn
    if (battle.activeUnit.hasMoved) {
      console.log("Unit has moved already this turn!");
      return field;
    }
    // Check if active unit can move to indicated space
    const newUnitGrid = Unit.moveUnit(
      field.unitGrid,
      battle.activeUnit,
      row,
      col
    );

    // Check if space selected resulted in new grid
    if (!newUnitGrid) {
      console.log("Can't move there!");
      return field;
    }

    // Move Active Unit
    return {
      ...field,
      unitGrid: newUnitGrid,
    };

    // Attack Unit
  } else if (action.type === "attack unit") {
    const { battle, unit } = action;

    // Check if unit has already acted once this turn
    if (battle.activeUnit.hasActed) {
      console.log("Unit has already acted this turn!");
      return field;
    }

    // Check if unit is on same team
    if (battle.activeUnit && battle.activeUnit.team !== unit.team) {
      // Check if target is in range
      if (
        getDistance(
          battle.activeUnit.row,
          battle.activeUnit.col,
          unit.row,
          unit.col
        ) <= battle.activeUnit.range
      ) {
        const newGrid = Unit.attackUnit(
          field.unitGrid,
          battle.activeUnit,
          unit
        );
        return { ...field, unitGrid: newGrid };
      }
    }

    return field;

    // Init Unit Position
  } else if (action.type === "use ability") {
    let { unit, target } = action;
  } else if (action.type === "init unit position") {
    const { row, col } = action;

    const newGrid = [...field.unitGrid];
    newGrid[row][col].row = row;
    newGrid[row][col].col = col;

    return { ...field, unitGrid: newGrid };
  }

  // Default
  else {
    return field;
  }
}
