import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Text,
} from "react-native";
import PilotoCard from "../components/PilotoCard";

// Tela que exibe a lista de pilotos
export default function PilotosScreen() {

  // Estados para armazenar os pilotos, o carregamento e o texto de pesquisa
  const [pilotos, setPilotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  // useEffect para buscar os dados dos pilotos ao montar o componente
  useEffect(() => {
    const fetchDriversData = async () => {
      try {

        // Busca dados na Ergast API (2024)
        const responseErgast = await fetch(
          "http://ergast.com/api/f1/2024/drivers.json",
        );
        const jsonErgast = await responseErgast.json();
        const ergastDrivers = jsonErgast.MRData.DriverTable.Drivers;

        // Busca dados adicionais na OpenF1 API
        const responseOpenF1 = await fetch("https://api.openf1.org/v1/drivers");
        const openF1Drivers = await responseOpenF1.json();

        // Une os dados das duas APIs usando o código do piloto
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

  // Filtra os pilotos com base no texto digitado (ignora diferenças de maiúsculas e minúsculas)
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

  // Exibe um indicador de carregamento enquanto os dados são buscados
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar pilotos..."
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchText !== "" && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setSearchText("");
              Keyboard.dismiss();
            }}
          >
            <Text style={styles.clearText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Lista de pilotos filtrados */}
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
  searchContainer: {
    flexDirection: "row",
    margin: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  clearButton: {
    padding: 5,
  },
  clearText: {
    fontSize: 18,
    color: "#999",
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
