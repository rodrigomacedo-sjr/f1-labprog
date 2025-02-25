import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavoritosScreen from "../screens/FavoritosScreen";
import PilotoDetailsScreen from "../screens/PilotoDetailsScreen";
import EquipeDetailsScreen from "../screens/EquipeDetailsScreen";
import CorridaDetailsScreen from "../screens/CorridaDetailsScreen";

// Cria o stack navigator para as telas de favoritos
const Stack = createStackNavigator();

export default function FavoritosStackNavigator() {
  return (
    <Stack.Navigator>

      {/* Tela principal de favoritos */}
      <Stack.Screen
        name="FavoritosList"
        component={FavoritosScreen}
        options={{ headerTitle: "Favoritos" }}
      />

      {/* Tela de detalhes do piloto favorito */}
      <Stack.Screen
        name="PilotoDetails"
        component={PilotoDetailsScreen}
        options={{ headerTitle: "Detalhes do Piloto" }}
      />

      {/* Tela de detalhes da equipe favorita */}
      <Stack.Screen
        name="EquipeDetails"
        component={EquipeDetailsScreen}
        options={{ headerTitle: "Detalhes da Equipe" }}
      />

      {/* Tela de detalhes da corrida favorita */}
      <Stack.Screen
        name="CorridaDetails"
        component={CorridaDetailsScreen}
        options={{ headerTitle: "Detalhes da Corrida" }}
      />
    </Stack.Navigator>
  );
}
