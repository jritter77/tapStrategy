import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavigationButton from "../components/UI/NavigationButton";
import TeamSelect from "./TeamSelect";
import MainMenu from "./MainMenu";
import Unit from "../objects/Unit";

const CampaignMenu = () => {
  return (
    <View>
      <Text>CampaignMenu</Text>
      <NavigationButton
        text={"Level 1"}
        view={
          <TeamSelect
            enemyTeam={[
              new Unit("Warrior", "enemy"),
              new Unit("Mage", "enemy"),
            ]}
          />
        }
      />
      <NavigationButton text={"Back"} view={<MainMenu />} />
    </View>
  );
};

export default CampaignMenu;

const styles = StyleSheet.create({});
