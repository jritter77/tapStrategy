import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BattleContext } from "../../views/Battle";
import FieldReducer from "../../tools/FieldReducer";

export const FieldContext = React.createContext();

const Field = () => {
  const [field, setField] = React.useReducer(FieldReducer, {
    tileGrid: [],
    unitGrid: [],
  });

  const { battle, setBattle } = React.useContext(BattleContext);

  // Initialize unitGrid
  React.useEffect(() => {
    setField({ type: "init unit grid", battle });
  }, []);

  // update tileGrid when unitGrid changes
  React.useEffect(() => {
    setField({ type: "update tile grid" });
  }, [field.unitGrid]);

  return (
    <FieldContext.Provider value={{ field, setField }}>
      <View>{field.tileGrid}</View>
    </FieldContext.Provider>
  );
};

export default Field;

const styles = StyleSheet.create({});
