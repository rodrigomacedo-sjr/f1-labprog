import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PilotoCard({ piloto, onPress }) {
  // Hook para navegar entre telas
  const navigation = useNavigation();

  // Extrair propriedades do objeto piloto
  const {
    givenName,
    familyName,
    permanentNumber,
    headshot_url,
    team_colour,
    team_name,
    country_code,
  } = piloto;

  // Define a URL da foto. Se não houver foto, usa um placeholder.
  const photoUrl = headshot_url
    ? headshot_url
    : `https://placehold.co/100`;

  // Função chamada ao pressionar o card
  const handlePress = () => {
    // Utiliza função passada via props, se houver.
    if (onPress) {
      onPress();
    } else {
      navigation.navigate("PilotoDetails", { piloto });
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          styles.card,
          {
            borderColor: team_colour ? `#${team_colour}` : "#000",
            borderWidth: 2,
          },
        ]}
      >
        {/* Container esquerdo com a foto e informações do piloto */}
        <View style={styles.leftContainer}>
          <Image source={{ uri: photoUrl }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>
              {givenName} {familyName}
            </Text>
            {country_code && (
              <Text style={styles.country}>País: {country_code}</Text>
            )}
            <Text style={styles.team}>{team_name}</Text>
          </View>
        </View>

        {/* Exibe número do piloto destacado */}
        <View style={styles.numberContainer}>
          <Text
            style={[
              styles.number,
              { color: team_colour ? `#${team_colour}` : "#e91e63" },
            ]}
          >
            #{permanentNumber ? permanentNumber : "N/A"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 16,
    elevation: 3, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    marginLeft: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  country: {
    fontSize: 14,
    color: "#333",
  },
  team: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
  },
  numberContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  number: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
