import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import MainMenu from "./MainMenu";
import NavigationButton from "../components/UI/NavigationButton";
import Field from "../components/field/Field";
import Battlereducer from "../tools/BattleReducer";

export const BattleContext = React.createContext();

const Battle = ({ playerTeam, enemyTeam }) => {
  const [battle, setBattle] = React.useReducer(Battlereducer, {
    playerTeam,
    enemyTeam,
    activeUnit: null,
    activeUnitControlType: "manual",
    activeUnitAiPhase: null,
    ticks: 0,
    readyQueue: [],
  });

  React.useEffect(() => {
    setBattle({ type: "tick" });
  }, [battle.ticks]);

  // Update ready queue and select active unit
  React.useEffect(() => {
    setBattle({ type: "update ready queue" });
  }, [battle.readyQueue]);

  const handleEndTurn = () => {
    setBattle({ type: "end current turn" });
  };

  return (
    <BattleContext.Provider value={{ battle, setBattle }}>
      <View>
        <TouchableOpacity onPress={handleEndTurn}>
          <Text style={styles.endTurn}>End Turn</Text>
        </TouchableOpacity>
        <Field />
        <NavigationButton text={"Main Menu"} view={<MainMenu />} />
      </View>
    </BattleContext.Provider>
  );
};

export default Battle;

const styles = StyleSheet.create({
  endTurn: {
    backgroundColor: "blue",
    color: "white",
    padding: 16,
  },
});
