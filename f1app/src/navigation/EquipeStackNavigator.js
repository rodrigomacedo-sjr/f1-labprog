import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EquipesScreen from "../screens/EquipesScreen";
import EquipeDetailsScreen from "../screens/EquipeDetailsScreen";
import PilotoDetailsScreen from "../screens/PilotoDetailsScreen";

const Stack = createStackNavigator();

export default function EquipeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EquipesList"
        component={EquipesScreen}
        options={{ headerTitle: "Equipes" }}
      />
      <Stack.Screen
        name="EquipeDetails"
        component={EquipeDetailsScreen}
        options={{ title: "Detalhes da Equipe" }}
      />
      <Stack.Screen
        name="PilotoDetails"
        component={PilotoDetailsScreen}
        options={{ title: "Detalhes do Piloto" }}
      />
    </Stack.Navigator>
  );
}
