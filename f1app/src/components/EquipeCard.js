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
      <View style={styles.info}>
        <Text style={styles.name}>{equipe.name}</Text>
        <Text style={styles.nationality}>
          Nacionalidade: {equipe.nationality}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  info: {
    flexDirection: "column",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  nationality: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
  },
});
