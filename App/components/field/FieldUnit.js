import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { FieldContext } from "./Field";
import { BattleContext } from "../../views/Battle";
import {
  attackPlayerUnitWithLowestHealth,
  moveTowardNearestPlayerUnit,
} from "../../enemyAI/EnemyAI";

const FieldUnit = ({ unit, row, col }) => {
  const { battle, setBattle } = React.useContext(BattleContext);
  const { field, setField } = React.useContext(FieldContext);

  const [highlight, setHighlight] = React.useState("orange");

  const [phase, setPhase] = React.useState(null);

  const handlePress = () => {
    if (battle.activeUnit === unit) {
      console.log("ability");
    }
    if (battle.activeUnitControlType === "manual") {
      setField({ type: "attack unit", battle, unit });
    }
  };

  // Initialize unit row and col
  React.useEffect(() => {
    setField({ type: "init unit position", row, col });
  }, []);

  // Get unit highlight color
  React.useEffect(() => {
    setHighlight(unit.getHighlight(battle));
  }, [battle.activeUnit]);

  React.useEffect(() => {
    if (battle.activeUnitAiPhase === "move") {
      setTimeout(() => {
        moveTowardNearestPlayerUnit(battle, field, unit, setField);
        setBattle({ type: "set active unit ai phase", phase: "attack" });
      }, 1000);
    } else if (battle.activeUnitAiPhase === "attack") {
      setTimeout(() => {
        attackPlayerUnitWithLowestHealth(battle, unit, setField);
        setBattle({ type: "set active unit ai phase", phase: "end" });
      }, 1000);
    } else if (battle.activeUnitAiPhase === "end") {
      setTimeout(() => {
        setBattle({ type: "end current turn" });
        setBattle({ type: "set active unit ai phase", phase: null });
      }, 1000);
    }
  }, [battle.activeUnitAiPhase]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Text style={{ ...styles.unit, backgroundColor: highlight }}>
        {unit.health}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default FieldUnit;

const styles = StyleSheet.create({
  unit: {
    backgroundColor: "orange",
    borderRadius: 30,
    width: "100%",
    height: "100%",
  },
});
