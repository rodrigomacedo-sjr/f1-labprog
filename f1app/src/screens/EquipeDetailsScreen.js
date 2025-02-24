import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Linking,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import PilotoCard from "../components/PilotoCard";

export default function EquipeDetailsScreen({ route, navigation }) {
  const { equipe } = route.params;
  const [pilotos, setPilotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamDrivers = async () => {
      try {
        const responseErgast = await fetch(
          `http://ergast.com/api/f1/constructors/${equipe.constructorId}/drivers.json`,
        );
        const jsonErgast = await responseErgast.json();
        const teamDrivers = jsonErgast.MRData.DriverTable.Drivers;

        const enrichedDrivers = await Promise.all(
          teamDrivers.map(async (piloto) => {
            if (piloto.permanentNumber) {
              try {
                const responseOpenF1 = await fetch(
                  `https://api.openf1.org/v1/drivers?driver_number=${piloto.permanentNumber}`,
                );
                const openF1Data = await responseOpenF1.json();
                if (Array.isArray(openF1Data) && openF1Data.length > 0) {
                  return { ...piloto, ...openF1Data[0] };
                }
              } catch (err) {
                console.error(
                  "Erro ao buscar dados adicionais para piloto",
                  piloto.driverId,
                  err,
                );
              }
            }
            return piloto;
          }),
        );
        setPilotos(enrichedDrivers);
      } catch (error) {
        console.error("Erro ao buscar pilotos da equipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDrivers();
  }, [equipe.constructorId]);

  const openWikipedia = () => {
    if (equipe.url) {
      Linking.openURL(equipe.url);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{equipe.name}</Text>
        <Text style={styles.nationality}>
          Nacionalidade: {equipe.nationality}
        </Text>
        <Button title="Ver na Wikipedia" onPress={openWikipedia} />
      </View>

      <Text style={styles.sectionTitle}>Histórico de Pilotos:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#e91e63" />
      ) : (
        <FlatList
          data={pilotos}
          keyExtractor={(item) => item.driverId}
          renderItem={({ item }) => (
            <PilotoCard
              piloto={item}
              onPress={() => navigation.push("PilotoDetails", { piloto: item })}
            />
          )}
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
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  nationality: {
    fontSize: 18,
    color: "#555",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  list: {
    paddingVertical: 10,
  },
});
