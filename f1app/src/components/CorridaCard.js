import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CorridaCard({ corrida, onPress }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate("CorridaDetails", { corrida });
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <Text style={styles.raceName}>{corrida.raceName}</Text>
        <Text style={styles.circuitName}>{corrida.Circuit.circuitName}</Text>
        <Text style={styles.location}>
          {corrida.Circuit.Location.locality},{" "}
          {corrida.Circuit.Location.country}
        </Text>
        <Text style={styles.date}>
          Data: {corrida.date}{" "}
          {corrida.time ? `- Hora: ${corrida.time.substring(0, 5)}` : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  raceName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  circuitName: {
    fontSize: 16,
    marginVertical: 4,
    color: "#555",
  },
  location: {
    fontSize: 14,
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
});
