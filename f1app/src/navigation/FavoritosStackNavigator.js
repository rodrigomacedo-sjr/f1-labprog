import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavoritosScreen from "../screens/FavoritosScreen";
import PilotoDetailsScreen from "../screens/PilotoDetailsScreen";
import EquipeDetailsScreen from "../screens/EquipeDetailsScreen";
import CorridaDetailsScreen from "../screens/CorridaDetailsScreen";

const Stack = createStackNavigator();

export default function FavoritosStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={{ headerTitle: "Favoritos" }}
      />
      <Stack.Screen
        name="PilotoDetails"
        component={PilotoDetailsScreen}
        options={{ headerTitle: "Detalhes do Piloto" }}
      />
      <Stack.Screen
        name="EquipeDetails"
        component={EquipeDetailsScreen}
        options={{ headerTitle: "Detalhes da Equipe" }}
      />
      <Stack.Screen
        name="CorridaDetails"
        component={CorridaDetailsScreen}
        options={{ headerTitle: "Detalhes da Corrida" }}
      />
    </Stack.Navigator>
  );
}
