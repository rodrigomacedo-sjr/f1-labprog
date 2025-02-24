import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import CorridaCard from "../components/CorridaCard";

export default function CorridasScreen() {
  const [corridas, setCorridas] = useState([]);
  const [loading, setLoading] = useState(true);

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
        data={corridas}
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
    paddingVertical: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginVertical: 10,
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
