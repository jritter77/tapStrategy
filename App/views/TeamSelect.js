import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CampaignMenu from "./CampaignMenu";
import NavigationButton from "../components/UI/NavigationButton";
import Battle from "./Battle";
import Unit from "../objects/Unit";

const TeamSelect = ({ enemyTeam }) => {
  const [playerTeam, setPlayerTeam] = React.useState([]);

  const AddUnitButton = ({ className }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          setPlayerTeam([...playerTeam, new Unit(className, "player")])
        }
        style={styles.addUnit}
      >
        <Text style={styles.addUnitText}>{className}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text>Enemy Team: {enemyTeam.map((unit) => unit.className + ", ")}</Text>
      <Text>TeamSelect</Text>
      <Text>
        Current Team: {playerTeam.map((unit) => unit.className + ", ")}
      </Text>

      <View style={styles.buttonRow}>
        <AddUnitButton className={"Warrior"} />
        <AddUnitButton className={"Mage"} />
      </View>

      <NavigationButton
        text={"Start Battle"}
        view={<Battle playerTeam={playerTeam} enemyTeam={enemyTeam} />}
      />
      <NavigationButton text={"Back"} view={<CampaignMenu />} />
    </View>
  );
};

export default TeamSelect;

const styles = StyleSheet.create({
  addUnit: {
    backgroundColor: "blue",
    padding: 16,
    margin: 16,
  },
  addUnitText: {
    color: "white",
  },
  buttonRow: {
    flexDirection: "row",
  },
});
