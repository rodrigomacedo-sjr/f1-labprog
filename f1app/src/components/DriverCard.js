import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function DriverCard({ driver }) {
  // Extrar informações do objeto driver
  const { givenName, familyName, code, nationality, permanentNumber } = driver;

  // API ergast não dá a foto, utilizar openf1 depois para complementar
  // Utilizando API de placeholder por enquanto
  const photoUrl = `https://via.placeholder.com/100?text=${code}`;

  return (
    <View style={styles.card}>
      <Image source={{ uri: photoUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {givenName} {familyName}
        </Text>
        <Text style={styles.detail}>
          Número: {permanentNumber ? permanentNumber : "N/A"}
        </Text>
        <Text style={styles.detail}>País: {nationality}</Text>
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

    // Efeito de sombreamento
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
  detail: {
    fontSize: 14,
    color: "#555",
  },
});
