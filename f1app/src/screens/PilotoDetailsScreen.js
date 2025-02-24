import React, { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";

export default function PilotoDetailsScreen({ route }) {
  const { piloto } = route.params;
  const [pilotoDetalhado, setPilotoDetalhado] = useState(piloto);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdditionalDriverData = async () => {
      if (piloto.permanentNumber) {
        try {
          setLoading(true);
          const response = await fetch(
            `https://api.openf1.org/v1/drivers?driver_number=${piloto.permanentNumber}`,
          );
          const openF1Data = await response.json();
          if (Array.isArray(openF1Data) && openF1Data.length > 0) {
            setPilotoDetalhado((prev) => ({
              ...openF1Data[0],
              ...prev,
              nationality: piloto.nationality,
              dateOfBirth: piloto.dateOfBirth,
            }));
          }
        } catch (error) {
          console.error("Erro ao buscar dados adicionais do piloto:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAdditionalDriverData();
  }, [piloto]);

  const photoUrl = pilotoDetalhado.headshot_url
    ? pilotoDetalhado.headshot_url
    : `https://via.placeholder.com/150?text=${pilotoDetalhado.code}`;

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#e91e63" />}
      <Image source={{ uri: photoUrl }} style={styles.image} />
      <Text style={styles.name}>
        {pilotoDetalhado.first_name} {pilotoDetalhado.last_name}
      </Text>
      <Text style={styles.simple}>
        Número: #{pilotoDetalhado.permanentNumber || "N/A"}
      </Text>
      <Text style={styles.simple}>
        Equipe: {pilotoDetalhado.team_name || "Equipe não disponível"}
      </Text>
      {pilotoDetalhado.name_acronym && (
        <Text style={styles.simple}>
          Abreviação: {pilotoDetalhado.name_acronym}
        </Text>
      )}
      {pilotoDetalhado.nationality && (
        <Text style={styles.simple}>
          Nacionalidade: {pilotoDetalhado.nationality}
        </Text>
      )}
      {pilotoDetalhado.dateOfBirth && (
        <Text style={styles.simple}>
          Data de Nascimento: {pilotoDetalhado.dateOfBirth}
        </Text>
      )}
      {pilotoDetalhado.country_code && (
        <Text style={styles.simple}>País: {pilotoDetalhado.country_code}</Text>
      )}
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
  simple: {
    fontSize: 18,
    marginBottom: 4,
  },
});
