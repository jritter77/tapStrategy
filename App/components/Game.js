import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Splash from "../views/Splash";

export const GameContext = React.createContext();

const Game = () => {
  const [game, setGame] = React.useState({
    currentView: <Splash />,
  });

  return (
    <GameContext.Provider value={{ game, setGame }}>
      <View>{game.currentView}</View>
    </GameContext.Provider>
  );
};

export default Game;

const styles = StyleSheet.create({});
