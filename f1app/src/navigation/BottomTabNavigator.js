import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PilotosStackNavigator from "../navigation/PilotosStackNavigator";
import EquipeStackNavigator from "../navigation/EquipeStackNavigator";
import CorridaStackNavigator from "./CorridaStackNavigator";
import FavoritosStackNavigator from "./FavoritosStackNavigator";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
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
        tabBarActiveTintColor: "#e91e63",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Pilotos" component={PilotosStackNavigator} />
      <Tab.Screen name="Equipes" component={EquipeStackNavigator} />
      <Tab.Screen name="Corridas" component={CorridaStackNavigator} />
      <Tab.Screen name="Favoritos" component={FavoritosStackNavigator} />
    </Tab.Navigator>
  );
}
