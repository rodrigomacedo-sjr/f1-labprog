import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PilotosScreen from "../screens/PilotosScreen";
import PilotoDetailsScreen from "../screens/PilotoDetailsScreen";

// Cria o stack navigator para as telas de pilotos
const Stack = createStackNavigator();

export default function PilotosStackNavigator() {
  return (
    <Stack.Navigator>

      {/* Tela com a lista de pilotos */}
      <Stack.Screen
        name="PilotosList"
        component={PilotosScreen}
        options={{ headerTitle: "Pilotos" }}
      />

      {/* Tela com os detalhes de um piloto */}
      <Stack.Screen
        name="PilotoDetails"
        component={PilotoDetailsScreen}
        options={{ headerTitle: "Detalhes do Piloto" }}
      />
    </Stack.Navigator>
  );
}
