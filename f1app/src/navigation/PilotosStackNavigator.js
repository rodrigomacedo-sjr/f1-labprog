import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PilotosScreen from "../screens/PilotosScreen";
import PilotoDetailsScreen from "../screens/PilotoDetailsScreen";

const Stack = createStackNavigator();

export default function PilotosStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PilotosList"
        component={PilotosScreen}
        options={{ headerTitle: "Pilotos" }}
      />
      <Stack.Screen
        name="PilotoDetails"
        component={PilotoDetailsScreen}
        options={{ headerTitle: "Detalhes do Piloto" }}
      />
    </Stack.Navigator>
  );
}
