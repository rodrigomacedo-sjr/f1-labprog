import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EquipesScreen from "../screens/EquipesScreen";
import EquipeDetailsScreen from "../screens/EquipeDetailsScreen";
import PilotoDetailsScreen from "../screens/PilotoDetailsScreen";

// Cria o stack navigator para as telas de equipes
const Stack = createStackNavigator();

export default function EquipeStackNavigator() {
  return (
    <Stack.Navigator>

      {/* Tela com a lista de equipes */}
      <Stack.Screen
        name="EquipesList"
        component={EquipesScreen}
        options={{ headerTitle: "Equipes" }}
      />

      {/* Tela com os detalhes de uma equipe */}
      <Stack.Screen
        name="EquipeDetails"
        component={EquipeDetailsScreen}
        options={{ title: "Detalhes da Equipe" }}
      />

      {/* Tela com os detalhes de um piloto, quando acessada a partir da equipe */}
      <Stack.Screen
        name="PilotoDetails"
        component={PilotoDetailsScreen}
        options={{ title: "Detalhes do Piloto" }}
      />
    </Stack.Navigator>
  );
}
