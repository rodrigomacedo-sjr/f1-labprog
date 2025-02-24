import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CorridasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Corridas</Text>
      {/* adicionar lista de corridas depois */}
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
