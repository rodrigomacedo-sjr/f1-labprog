import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function DriverCard({ driver }) {
  // Extrair dados
  const {
    broadcast_name,
    first_name,
    last_name,
    permanentNumber,
    headshot_url,
    team_colour,
    team_name,
    country_code,
    code,
  } = driver;

  // Tenta usar a foto do piloto, se não der, usa placeholder
  const photoUrl = headshot_url
    ? headshot_url
    : `https://via.placeholder.com/100?text=${code}`;

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: team_colour ? `#${team_colour}` : "#000",
          borderWidth: 2,
        },
      ]}
    >
      <Image source={{ uri: photoUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {first_name} {last_name}
        </Text>
        {country_code && (
          <Text style={styles.country}>País: {country_code}</Text>
        )}
        <Text style={styles.team}>{team_name}</Text>
        <Text style={styles.number}>
          #{permanentNumber ? permanentNumber : "N/A"}
        </Text>
      </View>
    </View>
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

    // Efeito de sombra
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  number: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e91e63",
  },
});
