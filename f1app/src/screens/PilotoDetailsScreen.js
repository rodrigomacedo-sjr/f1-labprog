import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

// Função para formatar data de "YYYY-MM-DD" para "DD/MM/YYYY"
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

export default function PilotoDetailsScreen({ route }) {
  const { piloto } = route.params;

  // Se não houver headshot_url, usamos um placeholder sem texto
  const photoUrl = piloto.headshot_url
    ? piloto.headshot_url
    : "https://via.placeholder.com/150";

  // A borda será a cor da equipe, se existir; caso contrário, preta
  const borderColor = piloto.team_colour ? `#${piloto.team_colour}` : "#000";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.detailsCard}>
        <Image
          source={{ uri: photoUrl }}
          style={[styles.image, { borderColor }]}
        />
        <Text style={styles.name}>
          {piloto.givenName} {piloto.familyName}
        </Text>
        <Text style={styles.infoText}>
          Número: #{piloto.permanentNumber || "N/A"}
        </Text>
        <Text style={styles.infoText}>
          Equipe: {piloto.team_name || "Equipe não disponível"}
        </Text>
        {piloto.country_code && (
          <Text style={styles.infoText}>País: {piloto.country_code}</Text>
        )}
        <Text style={styles.infoText}>Nacionalidade: {piloto.nationality}</Text>
        <Text style={styles.infoText}>
          Data de Nascimento: {formatDate(piloto.dateOfBirth)}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  content: {
    paddingVertical: 20,
    alignItems: "center",
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    width: "90%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 4,
  },
});
