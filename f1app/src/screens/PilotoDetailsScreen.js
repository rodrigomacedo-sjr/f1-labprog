import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "../contexts/FavoritesContext";

// Converte uma data do formato "YYYY-MM-DD" para "DD/MM/YYYY"
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

// Tela de detalhes do piloto, exibindo informações e permitindo favoritar
export default function PilotoDetailsScreen({ route }) {

  // Extrai o objeto piloto dos parâmetros da rota
  const { piloto } = route.params;

  // Obtém os favoritos e funções para gerenciar favoritos do contexto
  const { favorites, addFavoritePiloto, removeFavoritePiloto } =
    useContext(FavoritesContext);

  // Verifica se o piloto já está favoritado
  const isFavorite = favorites.pilotos.some(
    (p) => p.driverId === piloto.driverId,
  );

  // Alterna o status de favorito do piloto
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoritePiloto(piloto.driverId);
    } else {
      addFavoritePiloto(piloto);
    }
  };

  // Define a URL da foto do piloto ou utiliza um placeholder se não houver imagem
  const photoUrl = piloto.headshot_url
    ? piloto.headshot_url
    : `https://placehold.co/150`;

  // Define a cor da borda da imagem usando a cor da equipe ou preto se não estiver disponível
  const borderColor = piloto.team_colour ? `#${piloto.team_colour}` : "#000";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.detailsCard}>
        {/* Botão para favoritar/destacar o piloto */}
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

        {/* Exibe a foto do piloto com borda colorida */}
        <Image
          source={{ uri: photoUrl }}
          style={[styles.image, { borderColor }]}
        />

        {/* Exibe nome e outras informações do piloto */}
        <Text style={styles.name}>
          {piloto.givenName} {piloto.familyName}
        </Text>
        <Text style={styles.infoText}>
          Número: #{piloto.permanentNumber || "N/A"}
        </Text>
        <Text style={styles.infoText}>
          Equipe: {piloto.team_name || "Equipe não disponível"}
        </Text>
        {piloto.country_code && (
          <Text style={styles.infoText}>País: {piloto.country_code}</Text>
        )}
        <Text style={styles.infoText}>Nacionalidade: {piloto.nationality}</Text>
        <Text style={styles.infoText}>
          Data de Nascimento: {formatDate(piloto.dateOfBirth)}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  content: {
    paddingVertical: 20,
    alignItems: "center",
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    width: "90%",
    elevation: 5,
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
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 4,
  },
});
