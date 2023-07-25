import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { GameContext } from "../components/Game";
import MainMenu from "./MainMenu";
import NavigationButton from "../components/UI/NavigationButton";

const Splash = () => {
  return (
    <View>
      <Text>Splash</Text>
      <NavigationButton text={"Login"} view={<MainMenu />} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
