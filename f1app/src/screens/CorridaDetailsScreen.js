import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "../contexts/FavoritesContext";

// Função para formatar data de "YYYY-MM-DD" para "DD/MM/YYYY"
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export default function CorridaDetailsScreen({ route }) {
  const { corrida } = route.params;
  const {
    season,
    round,
    raceName,
    url,
    date,
    time,
    Circuit,
    FirstPractice,
    SecondPractice,
    ThirdPractice,
    Qualifying,
  } = corrida;

  const { favorites, addFavoriteCorrida, removeFavoriteCorrida } =
    useContext(FavoritesContext);

  // Verifica se a corrida já está favoritada (usando season e round como identificador)
  const isFavorite = favorites.corridas.some(
    (c) => c.round === corrida.round && c.season === corrida.season,
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteCorrida(corrida.round);
    } else {
      addFavoriteCorrida(corrida);
    }
  };

  const openWikipedia = () => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const formattedDate = formatDate(date);
  const formattedTime = time ? time.substring(0, 5) : "N/A";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{raceName}</Text>
      </View>
      <View style={styles.detailsCard}>
        {/* Botão de Favoritar posicionado no canto superior direito do card */}
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
        <InfoRow label="Temporada:" value={season} />
        <InfoRow label="Rodada:" value={round} />
        <InfoRow label="Data:" value={formattedDate} />
        <InfoRow label="Hora:" value={formattedTime} />
        {Circuit && (
          <>
            <InfoRow label="Circuito:" value={Circuit.circuitName} />
            {Circuit.Location && (
              <InfoRow
                label="Localização:"
                value={`${Circuit.Location.locality}, ${Circuit.Location.country}`}
              />
            )}
          </>
        )}
        {FirstPractice && (
          <InfoRow
            label="1º Treino:"
            value={`${formatDate(FirstPractice.date)} - ${FirstPractice.time ? FirstPractice.time.substring(0, 5) : "N/A"
              }`}
          />
        )}
        {SecondPractice && (
          <InfoRow
            label="2º Treino:"
            value={`${formatDate(SecondPractice.date)} - ${SecondPractice.time ? SecondPractice.time.substring(0, 5) : "N/A"
              }`}
          />
        )}
        {ThirdPractice && (
          <InfoRow
            label="3º Treino:"
            value={`${formatDate(ThirdPractice.date)} - ${ThirdPractice.time ? ThirdPractice.time.substring(0, 5) : "N/A"
              }`}
          />
        )}
        {Qualifying && (
          <InfoRow
            label="Qualificação:"
            value={`${formatDate(Qualifying.date)} - ${Qualifying.time ? Qualifying.time.substring(0, 5) : "N/A"
              }`}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={openWikipedia}>
          <Text style={styles.buttonText}>Ver na Wikipedia</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  header: {
    backgroundColor: "#56b4e9",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: "relative",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    width: 120,
    color: "#333",
  },
  infoValue: {
    fontSize: 16,
    color: "#555",
    flex: 1,
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
