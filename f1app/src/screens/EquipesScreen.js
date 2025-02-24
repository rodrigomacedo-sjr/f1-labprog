import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import EquipeCard from "../components/EquipeCard";

export default function EquipesScreen() {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={equipes}
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
  list: {
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
