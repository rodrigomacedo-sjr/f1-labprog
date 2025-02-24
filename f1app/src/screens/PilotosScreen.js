import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import DriverCard from "../components/DriverCard";

export default function PilotosScreen() {
  // Estado para armazenar a lista de pilotos e controlar o loading
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados da API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        // Utilizar a URL da API para buscar os dados dos pilotos em formato JSON
        const response = await fetch("http://ergast.com/api/f1/2024/drivers.json");
        const json = await response.json();

        // Acessar a estrutura do JSON para obter a lista de pilotos
        const driverList = json.MRData.DriverTable.Drivers;
        setDrivers(driverList);
      } catch (error) {
        console.error("Erro ao buscar pilotos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  // Enquanto carrega os dados, exibie um indicador de loading
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
        data={drivers}
        keyExtractor={(item) => item.driverId}
        renderItem={({ item }) => <DriverCard driver={item} />}
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
