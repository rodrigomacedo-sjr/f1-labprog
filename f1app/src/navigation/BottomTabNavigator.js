import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import PilotosScreen from "../screens/PilotosScreen";
import EquipesScreen from "../screens/EquipesScreen";
import CorridasScreen from "../screens/CorridasScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Pilotos"
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
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#e91e63",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            elevation: 5,
            shadowOpacity: 0.1,
            height: 60,
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 5,
          },
        })}
      >
        <Tab.Screen name="Pilotos" component={PilotosScreen} />
        <Tab.Screen name="Equipes" component={EquipesScreen} />
        <Tab.Screen name="Corridas" component={CorridasScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
