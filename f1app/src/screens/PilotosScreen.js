import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import PilotoCard from "../components/PilotoCard";

export default function PilotosScreen() {
  const [pilotos, setPilotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchDriversData = async () => {
      try {
        // Busca dados na Ergast API (2024)
        const responseErgast = await fetch(
          "http://ergast.com/api/f1/2024/drivers.json",
        );
        const jsonErgast = await responseErgast.json();
        const ergastDrivers = jsonErgast.MRData.DriverTable.Drivers;

        // Busca mais dados na OpenF1 API
        const responseOpenF1 = await fetch("https://api.openf1.org/v1/drivers");
        const openF1Drivers = await responseOpenF1.json();

        // Junta os dados usando Drivers.code (Ergast) e name_acronym (OpenF1)
        const mergedDrivers = ergastDrivers.map((piloto) => {
          const pilotoCode = piloto.code ? piloto.code.toUpperCase() : "";
          const additionalData = openF1Drivers.find(
            (item) =>
              item.name_acronym &&
              item.name_acronym.toUpperCase() === pilotoCode,
          );

          return {
            driverId: piloto.driverId,
            givenName: piloto.givenName,
            familyName: piloto.familyName,
            permanentNumber:
              additionalData?.driver_number || piloto.permanentNumber,
            headshot_url: additionalData?.headshot_url || null,
            team_name: additionalData?.team_name || "Equipe não disponível",
            team_colour: additionalData?.team_colour || null,
            country_code: additionalData?.country_code || null,
            code: piloto.code,
            dateOfBirth: piloto.dateOfBirth,
            nationality: piloto.nationality,
            broadcast_name: additionalData?.broadcast_name || "",
          };
        });

        setPilotos(mergedDrivers);
      } catch (error) {
        console.error("Erro ao buscar dados dos pilotos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriversData();
  }, []);

  // Filtra os pilotos com base no texto digitado (case insensitive)
  const filteredPilotos = pilotos.filter((piloto) => {
    const searchLower = searchText.toLowerCase();
    const fullName = `${piloto.givenName} ${piloto.familyName}`.toLowerCase();
    const code = piloto.code ? piloto.code.toLowerCase() : "";
    const broadcastName = piloto.broadcast_name.toLowerCase();
    return (
      fullName.includes(searchLower) ||
      code.includes(searchLower) ||
      broadcastName.includes(searchLower)
    );
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar pilotos..."
        value={searchText}
        onChangeText={setSearchText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FlatList
        data={filteredPilotos}
        keyExtractor={(item) => item.driverId}
        renderItem={({ item }) => <PilotoCard piloto={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  searchInput: {
    height: 40,
    margin: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  list: {
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
