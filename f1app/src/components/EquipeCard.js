import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function EquipeCard({ equipe }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("EquipeDetails", { equipe });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.colorBar} />
      <View style={styles.info}>
        <Text style={styles.name}>{equipe.name}</Text>
        <Text style={styles.nationality}>
          Nacionalidade: {equipe.nationality}
        </Text>
        {equipe.url && <Text style={styles.link}>Ver na Wikipedia</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 6,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  colorBar: {
    width: 10,
    backgroundColor: "#000",
  },
  info: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  nationality: {
    fontSize: 16,
    color: "#555",
  },
  link: {
    fontSize: 14,
    color: "#1e90ff",
    marginTop: 6,
    textDecorationLine: "underline",
  },
});
