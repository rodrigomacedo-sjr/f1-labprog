import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CorridasScreen from "../screens/CorridasScreen";
import CorridaDetailsScreen from "../screens/CorridaDetailsScreen";

const Stack = createStackNavigator();

export default function CorridaStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CorridasList"
        component={CorridasScreen}
        options={{ headerTitle: "Corridas" }}
      />
      <Stack.Screen
        name="CorridaDetails"
        component={CorridaDetailsScreen}
        options={{ headerTitle: "Detalhes da Corrida" }}
      />
    </Stack.Navigator>
  );
}
