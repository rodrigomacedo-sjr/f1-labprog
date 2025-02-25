import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import PilotoCard from "../components/PilotoCard";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { Ionicons } from "@expo/vector-icons";

export default function EquipeDetailsScreen({ route, navigation }) {
  const { equipe } = route.params;
  const [pilotos, setPilotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, addFavoriteEquipe, removeFavoriteEquipe } =
    useContext(FavoritesContext);

  // Verifica se a equipe já está favoritada
  const isFavorite = favorites.equipes.some(
    (item) => item.constructorId === equipe.constructorId,
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteEquipe(equipe.constructorId);
    } else {
      addFavoriteEquipe(equipe);
    }
  };

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

  // Header do FlatList com o card da equipe
  const ListHeader = () => (
    <>
      <View style={styles.teamCard}>
        {/* Barra lateral colorida */}
        <View
          style={[
            styles.colorBar,
            {
              backgroundColor: equipe.team_colour
                ? `#${equipe.team_colour}`
                : "#000",
            },
          ]}
        />
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{equipe.name}</Text>
          <Text style={styles.teamNationality}>
            Nacionalidade: {equipe.nationality}
          </Text>
          <TouchableOpacity style={styles.wikiButton} onPress={openWikipedia}>
            <Text style={styles.wikiButtonText}>Ver na Wikipedia</Text>
          </TouchableOpacity>
        </View>
        {/* Botão de Favoritar */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={28}
            color={isFavorite ? "#e91e63" : "#555"}
          />
        </TouchableOpacity>
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
    position: "relative",
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
  wikiButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  wikiButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  list: {
    paddingBottom: 20,
  },
});
