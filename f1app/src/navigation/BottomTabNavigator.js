import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PilotosStackNavigator from "../navigation/PilotosStackNavigator";
import EquipeStackNavigator from "../navigation/EquipeStackNavigator";
import CorridaStackNavigator from "./CorridaStackNavigator";
import FavoritosStackNavigator from "./FavoritosStackNavigator";
import { Ionicons } from "@expo/vector-icons";

// Cria o navegador de abas inferiores
const Tab = createBottomTabNavigator();

// Componente que define as abas da aplicação
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Remove o cabeçalho padrão de cada tela
        headerShown: false,

        // Define os ícones das abas conforme a rota e se está selecionada
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Pilotos") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Equipes") {
            iconName = focused ? "car" : "car-outline";
          } else if (route.name === "Corridas") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Favoritos") {
            iconName = focused ? "heart" : "heart-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        // Configura as cores para abas ativas e inativas
        tabBarActiveTintColor: "#e91e63",
        tabBarInactiveTintColor: "gray",
      })}
    >
      {/* Define cada aba com sua respectiva stack navigator */}
      <Tab.Screen name="Pilotos" component={PilotosStackNavigator} />
      <Tab.Screen name="Equipes" component={EquipeStackNavigator} />
      <Tab.Screen name="Corridas" component={CorridaStackNavigator} />
      <Tab.Screen name="Favoritos" component={FavoritosStackNavigator} />
    </Tab.Navigator>
  );
}
