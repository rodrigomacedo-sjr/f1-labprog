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
import CorridaCard from "../components/CorridaCard";

// Tela que exibe a lista de corridas
export default function CorridasScreen() {

  // Estados para armazenar as corridas, o status de carregamento e o texto de pesquisa
  const [corridas, setCorridas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  // useEffect para buscar os dados das corridas assim que o componente é montado
  useEffect(() => {
    const fetchCorridas = async () => {
      try {
        const response = await fetch("http://ergast.com/api/f1/current.json");
        const json = await response.json();
        const races = json.MRData.RaceTable.Races;
        setCorridas(races);
      } catch (error) {
        console.error("Erro ao buscar corridas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCorridas();
  }, []);

  // Filtra as corridas com base no texto digitado (case insensitive)
  const filteredCorridas = corridas.filter((corrida) => {
    const searchLower = searchText.toLowerCase();
    const raceName = corrida.raceName.toLowerCase();
    const circuitName = corrida.Circuit?.circuitName?.toLowerCase() || "";
    const locality = corrida.Circuit?.Location?.locality?.toLowerCase() || "";
    const country = corrida.Circuit?.Location?.country?.toLowerCase() || "";
    return (
      raceName.includes(searchLower) ||
      circuitName.includes(searchLower) ||
      locality.includes(searchLower) ||
      country.includes(searchLower)
    );
  });

  // Enquanto os dados não são carregados, exibe um indicador de atividade
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Campo de pesquisa para filtrar as corridas */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar corridas..."
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Botão para limpar o texto da pesquisa */}
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

      {/* Lista de corridas filtradas */}
      <FlatList
        data={filteredCorridas}
        keyExtractor={(item) => item.round}
        renderItem={({ item }) => <CorridaCard corrida={item} />}
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
    paddingBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
