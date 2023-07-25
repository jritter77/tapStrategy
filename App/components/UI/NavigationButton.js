import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { GameContext } from "../Game";

const NavigationButton = ({ text, view }) => {
  const { game, setGame } = React.useContext(GameContext);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => setGame({ ...game, currentView: view })}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default NavigationButton;

const styles = StyleSheet.create({
  button: {
    padding: 16,
    margin: 16,
    backgroundColor: "blue",
  },
  text: {
    color: "white",
  },
});
