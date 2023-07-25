import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import NavigationButton from "../components/UI/NavigationButton";
import CampaignMenu from "./CampaignMenu";
import Collection from "./Collection";
import Splash from "./Splash";

const MainMenu = () => {
  return (
    <View>
      <Text>MainMenu</Text>
      <NavigationButton text={"Campaign"} view={<CampaignMenu />} />
      <NavigationButton text={"Collection"} view={<Collection />} />
      <NavigationButton text={"Logout"} view={<Splash />} />
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({});
