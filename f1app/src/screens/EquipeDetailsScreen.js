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

  // ListHeader separado: primeiro o card da equipe e logo abaixo o título "Histórico de Pilotos:"
  const ListHeader = () => (
    <>
      <View style={styles.teamCard}>
        <View style={styles.colorBar} />
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{equipe.name}</Text>
          <Text style={styles.teamNationality}>
            Nacionalidade: {equipe.nationality}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Ver na Wikipedia"
              onPress={openWikipedia}
              color="#007AFF"
            />
          </View>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Histórico de Pilotos:</Text>
    </>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  }

  return (
    <FlatList
      data={pilotos}
      keyExtractor={(item) => item.driverId}
      renderItem={({ item }) => (
        <PilotoCard
          piloto={item}
          onPress={() => navigation.push("PilotoDetails", { piloto: item })}
        />
      )}
      ListHeaderComponent={ListHeader}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  teamCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    margin: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
  },
  colorBar: {
    width: 8,
  },
  teamInfo: {
    flex: 1,
    padding: 16,
  },
  teamName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  teamNationality: {
    fontSize: 18,
    color: "#555",
    marginBottom: 12,
  },
  buttonContainer: {
    alignSelf: "flex-start",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  list: {
    paddingBottom: 20,
  },
});
