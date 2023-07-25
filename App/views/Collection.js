import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainMenu from "./MainMenu";
import NavigationButton from "../components/UI/NavigationButton";

const Collection = () => {
  return (
    <View>
      <Text>Collection</Text>
      <NavigationButton text={"Back"} view={<MainMenu />} />
    </View>
  );
};

export default Collection;

const styles = StyleSheet.create({});
