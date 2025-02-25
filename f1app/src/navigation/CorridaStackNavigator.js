import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CorridasScreen from "../screens/CorridasScreen";
import CorridaDetailsScreen from "../screens/CorridaDetailsScreen";

// Cria o stack navigator para as telas de corridas
const Stack = createStackNavigator();

export default function CorridaStackNavigator() {
  return (
    <Stack.Navigator>

      {/* Tela com a lista de corridas */}
      <Stack.Screen
        name="CorridasList"
        component={CorridasScreen}
        options={{ headerTitle: "Corridas" }}
      />

      {/* Tela com os detalhes de uma corrida específica */}
      <Stack.Screen
        name="CorridaDetails"
        component={CorridaDetailsScreen}
        options={{ headerTitle: "Detalhes da Corrida" }}
      />
    </Stack.Navigator>
  );
}
