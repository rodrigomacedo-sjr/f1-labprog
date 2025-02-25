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

// Tela que exibe os itens favoritados (pilotos, equipes e corridas) com opção de busca
export default function FavoritosScreen() {

  // Acessa os favoritos e o status de carregamento do contexto
  const { favorites, loading } = useContext(FavoritesContext);

  // Estado para armazenar o texto de pesquisa
  const [searchText, setSearchText] = useState("");

  // Filtra os pilotos favoritos com base no texto de pesquisa (ignorando maiúsculas e minúsculas)
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

  // Filtra as equipes favoritas com base no nome e nacionalidade
  const filteredEquipes = favorites.equipes.filter((equipe) => {
    const searchLower = searchText.toLowerCase();
    const name = equipe.name ? equipe.name.toLowerCase() : "";
    const nationality = equipe.nationality
      ? equipe.nationality.toLowerCase()
      : "";
    return name.includes(searchLower) || nationality.includes(searchLower);
  });

  // Filtra as corridas favoritas com base no nome da corrida e do circuito
  const filteredCorridas = favorites.corridas.filter((corrida) => {
    const searchLower = searchText.toLowerCase();
    const raceName = corrida.raceName ? corrida.raceName.toLowerCase() : "";
    const circuitName = corrida.Circuit?.circuitName
      ? corrida.Circuit.circuitName.toLowerCase()
      : "";
    return raceName.includes(searchLower) || circuitName.includes(searchLower);
  });

  // Constrói as seções para o SectionList, incluindo apenas as categorias que possuem itens
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

  // Enquanto os dados estiverem sendo carregados, exibe um indicador de atividade
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barra de pesquisa para filtrar os favoritos */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar favoritos..."
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Botão para limpar a pesquisa e fechar o teclado */}
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

      {/* Se nenhum favorito for encontrado, exibe mensagem */}
      {sections.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>Nenhum favorito encontrado.</Text>
        </View>
      ) : (

        // SectionList para renderizar as seções de favoritos
        <SectionList
          sections={sections}

          // Utiliza um identificador único para cada item
          keyExtractor={(item, index) =>
            item.driverId || item.constructorId || `${item.round}-${index}`
          }

          // Renderiza o cabeçalho de cada seção
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}

          // Renderiza cada item de acordo com seu tipo
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
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  list: {
    paddingBottom: 20,
  },
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
