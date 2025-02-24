import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EquipesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipes</Text>
      {/* adicionar lista de equipes depois */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold" },
});
