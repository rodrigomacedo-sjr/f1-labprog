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
import EquipeCard from "../components/EquipeCard";

export default function EquipesScreen() {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchEquipesData = async () => {
      try {
        const response = await fetch(
          "http://ergast.com/api/f1/2024/constructors.json",
        );
        const json = await response.json();
        const ergastTeams = json.MRData.ConstructorTable.Constructors;
        setEquipes(ergastTeams);
      } catch (error) {
        console.error("Erro ao buscar dados das equipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipesData();
  }, []);

  // Filtra as equipes com base no texto digitado (case insensitive)
  const filteredEquipes = equipes.filter((equipe) => {
    const searchLower = searchText.toLowerCase();
    const name = equipe.name ? equipe.name.toLowerCase() : "";
    const nationality = equipe.nationality
      ? equipe.nationality.toLowerCase()
      : "";
    return name.includes(searchLower) || nationality.includes(searchLower);
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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar equipes..."
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
      <FlatList
        data={filteredEquipes}
        keyExtractor={(item) => item.constructorId}
        renderItem={({ item }) => <EquipeCard equipe={item} />}
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
