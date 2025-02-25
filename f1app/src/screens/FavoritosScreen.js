// src/screens/FavoritosScreen.js
import React, { useContext, useState } from "react";
import {
  View,
  SectionList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Text,
} from "react-native";
import PilotoCard from "../components/PilotoCard";
import EquipeCard from "../components/EquipeCard";
import CorridaCard from "../components/CorridaCard";
import { FavoritesContext } from "../contexts/FavoritesContext";

export default function FavoritosScreen() {
  const { favorites, loading } = useContext(FavoritesContext);
  const [searchText, setSearchText] = useState("");

  // Filtrar favoritos para Pilotos
  const filteredPilotos = favorites.pilotos.filter((piloto) => {
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

  // Filtrar favoritos para Equipes
  const filteredEquipes = favorites.equipes.filter((equipe) => {
    const searchLower = searchText.toLowerCase();
    const name = equipe.name ? equipe.name.toLowerCase() : "";
    const nationality = equipe.nationality
      ? equipe.nationality.toLowerCase()
      : "";
    return name.includes(searchLower) || nationality.includes(searchLower);
  });

  // Filtrar favoritos para Corridas
  const filteredCorridas = favorites.corridas.filter((corrida) => {
    const searchLower = searchText.toLowerCase();
    const raceName = corrida.raceName ? corrida.raceName.toLowerCase() : "";
    const circuitName = corrida.Circuit?.circuitName
      ? corrida.Circuit.circuitName.toLowerCase()
      : "";
    return raceName.includes(searchLower) || circuitName.includes(searchLower);
  });

  // Construir seções (apenas se houver itens)
  const sections = [];
  if (filteredPilotos.length > 0) {
    sections.push({
      title: "Pilotos Favoritos",
      data: filteredPilotos,
      type: "piloto",
    });
  }
  if (filteredEquipes.length > 0) {
    sections.push({
      title: "Equipes Favoritas",
      data: filteredEquipes,
      type: "equipe",
    });
  }
  if (filteredCorridas.length > 0) {
    sections.push({
      title: "Corridas Favoritas",
      data: filteredCorridas,
      type: "corrida",
    });
  }

  // Se estiver carregando os dados (pode ser definido no contexto ou localmente)
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar favoritos..."
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

      {sections.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>Nenhum favorito encontrado.</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) =>
            item.driverId || item.constructorId || `${item.round}-${index}`
          }
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item, section }) => {
            if (section.type === "piloto") {
              return <PilotoCard piloto={item} />;
            } else if (section.type === "equipe") {
              return <EquipeCard equipe={item} />;
            } else if (section.type === "corrida") {
              return <CorridaCard corrida={item} />;
            }
            return null;
          }}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
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
  searchInput: { flex: 1, height: 40 },
  clearButton: { padding: 5 },
  clearText: { fontSize: 18, color: "#999" },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  list: { paddingBottom: 20 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 18,
    color: "#555",
  },
});
