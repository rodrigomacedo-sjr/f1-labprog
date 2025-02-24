// src/screens/PilotosScreen.js
import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import DriverCard from "../components/DriverCard";

export default function PilotosScreen() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        const openF1Drivers = await responseOpenF1.json(); // Retorno: array de objetos

        // Junta os dados usando Drivers.code (Ergast) e name_acronym (OpenF1)
        const mergedDrivers = ergastDrivers.map((driver) => {
          const driverCode = driver.code ? driver.code.toUpperCase() : "";
          // Procura na OpenF1 um piloto cujo name_acronym corresponda
          const additionalData = openF1Drivers.find(
            (item) =>
              item.name_acronym &&
              item.name_acronym.toUpperCase() === driverCode,
          );

          // Prioriza os dados da OpenF1
          return {
            driverId: driver.driverId,

            // broadcast_name (OpenF1) > givenName/familyName (ergast)
            broadcast_name: additionalData?.broadcast_name || null,

            first_name: additionalData?.first_name || driver.givenName,
            last_name: additionalData?.last_name || driver.familyName,

            // driver_number (OpenF1) > permanentNumber (ergast)
            permanentNumber:
              additionalData?.driver_number || driver.permanentNumber,

            headshot_url: additionalData?.headshot_url || null,

            team_name: additionalData?.team_name || "Equipe não disponível",
            team_colour: additionalData?.team_colour || null,
            country_code: additionalData?.country_code || null,
            code: driver.code,
          };
        });

        setDrivers(mergedDrivers);
      } catch (error) {
        console.error("Erro ao buscar dados dos pilotos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriversData();
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
