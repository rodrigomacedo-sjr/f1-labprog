import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Função auxiliar para converter data de "YYYY-MM-DD" para "DD/MM/YYYY"
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-"); // Separa a string em ano, mês e dia
  return `${day}/${month}/${year}`; // Retorna a data formatada
};

export default function CorridaCard({ corrida, onPress }) {
  // Hook para acessar a navegação entre telas
  const navigation = useNavigation();

  // Função executada ao pressionar o card
  const handlePress = () => {
    if (onPress) {
      // Executa a função onPress, se fornecida como prop
      onPress();
    } else {
      // Caso contrário, navega para a tela de detalhes da corrida, passando os dados da corrida
      navigation.navigate("CorridaDetails", { corrida });
    }
  };

  // Formatação dos dados de data e hora
  const formattedDate = formatDate(corrida.date);
  const formattedTime = corrida.time ? corrida.time.substring(0, 5) : "";

  return (
    // TouchableOpacity torna o card clicável
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        {/* Nome da corrida */}
        <Text style={styles.raceName}>{corrida.raceName}</Text>

        {/* Nome do circuito */}
        <Text style={styles.circuitName}>{corrida.Circuit.circuitName}</Text>

        {/* Localização: cidade e país */}
        <Text style={styles.location}>
          {corrida.Circuit.Location.locality},{" "}
          {corrida.Circuit.Location.country}
        </Text>

        {/* Container para exibição da data e hora */}
        <View style={styles.dateContainer}>
          <Text style={styles.date}>Data: {formattedDate}</Text>

          {/* Exibe a hora apenas se estiver disponível */}
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
    elevation: 4, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
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
