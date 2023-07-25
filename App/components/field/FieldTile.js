import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { FieldContext } from "./Field";
import FieldUnit from "./FieldUnit";
import Unit from "../../objects/Unit";
import { BattleContext } from "../../views/Battle";
import { getDistance } from "../../tools/tools";

const FieldTile = ({ row, col }) => {
  const [unit, setUnit] = React.useState(null);
  const [highlight, setHighlight] = React.useState("lightgrey");

  const { battle, setBattle } = React.useContext(BattleContext);
  const { field, setField } = React.useContext(FieldContext);

  // update unit when unit grid changes
  React.useEffect(() => {
    updateUnit(field, row, col, setUnit);
  }, [field.unitGrid]);

  // get tile current highlight color
  React.useEffect(() => {
    setHighlight(getHighlight(battle, field, row, col));
  }, [battle.activeUnit, field.unitGrid]);

  return (
    <TouchableWithoutFeedback
      onPress={() => handleClick(battle, row, col, setField)}
    >
      <View style={{ ...styles.tile, backgroundColor: highlight }}>{unit}</View>
    </TouchableWithoutFeedback>
  );
};

export default FieldTile;

const styles = StyleSheet.create({
  tile: {
    width: 32,
    height: 32,
    backgroundColor: "lightgrey",
    borderWidth: 1,
  },
});

const handleClick = (battle, row, col, setField) => {
  if (battle.activeUnitControlType === "manual") {
    setField({ type: "move unit", battle, row, col });
  }
};

const updateUnit = (field, row, col, setUnit) => {
  if (field.unitGrid && field.unitGrid[row][col]) {
    setUnit(<FieldUnit unit={field.unitGrid[row][col]} row={row} col={col} />);
  } else {
    setUnit(null);
  }
};

const getHighlight = (battle, field, row, col) => {
  let highlight = "lightgrey";
  if (battle.activeUnit) {
    if (
      !battle.activeUnit.hasMoved &&
      getDistance(battle.activeUnit.row, battle.activeUnit.col, row, col) <=
        battle.activeUnit.mobility
    ) {
      if (Unit.checkSpaceFree(field.unitGrid, row, col)) {
        highlight = "pink";
      }
    }

    if (
      getDistance(battle.activeUnit.row, battle.activeUnit.col, row, col) <=
      battle.activeUnit.range
    ) {
      if (
        !Unit.checkSpaceFree(field.unitGrid, row, col) &&
        !battle.activeUnit.hasActed &&
        field.unitGrid[row][col].team !== battle.activeUnit.team
      ) {
        highlight = "red";
      } else if (battle.activeUnit === field.unitGrid[row][col]) {
        highlight = "cyan";
      }
    }
  }

  return highlight;
};
