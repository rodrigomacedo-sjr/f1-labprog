import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function PilotoDetailsScreen({ route }) {
  const { piloto } = route.params;

  const photoUrl = piloto.headshot_url
    ? piloto.headshot_url
    : `https://via.placeholder.com/150?text=${piloto.code}`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUrl }} style={styles.image} />
      <Text style={styles.name}>
        {piloto.givenName} {piloto.familyName}
      </Text>
      <Text style={styles.number}>
        Número: #{piloto.permanentNumber || "N/A"}
      </Text>
      <Text style={styles.team}>
        Equipe: {piloto.team_name || "Equipe não disponível"}
      </Text>
      {piloto.country_code && (
        <Text style={styles.country}>País: {piloto.country_code}</Text>
      )}
      <Text style={styles.dob}>Data de Nascimento: {piloto.dateOfBirth}</Text>
      <Text style={styles.nationality}>
        Nacionalidade: {piloto.nationality}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  number: {
    fontSize: 18,
    marginBottom: 4,
  },
  team: {
    fontSize: 18,
    marginBottom: 4,
  },
  country: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  dob: {
    fontSize: 16,
    marginBottom: 4,
  },
  nationality: {
    fontSize: 16,
    marginBottom: 4,
  },
});
