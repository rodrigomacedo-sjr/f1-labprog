import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Função para formatar a data de "YYYY-MM-DD" para "DD/MM/YYYY"
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

export default function CorridaCard({ corrida, onPress }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate("CorridaDetails", { corrida });
    }
  };

  // Formatação da data e hora
  const formattedDate = formatDate(corrida.date);
  const formattedTime = corrida.time ? corrida.time.substring(0, 5) : "";

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <Text style={styles.raceName}>{corrida.raceName}</Text>
        <Text style={styles.circuitName}>{corrida.Circuit.circuitName}</Text>
        <Text style={styles.location}>
          {corrida.Circuit.Location.locality},{" "}
          {corrida.Circuit.Location.country}
        </Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>Data: {formattedDate}</Text>
          {formattedTime !== "" && (
            <Text style={styles.time}>Hora: {formattedTime}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  raceName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  circuitName: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 14,
    color: "#444",
  },
  time: {
    fontSize: 14,
    color: "#444",
  },
});
