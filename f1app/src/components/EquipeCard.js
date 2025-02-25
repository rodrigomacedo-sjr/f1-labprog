import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function EquipeCard({ equipe }) {
  // Hook para acessar a navegação entre telas
  const navigation = useNavigation();

  // Função chamada ao pressionar o card, navegando para a tela de detalhes
  const handlePress = () => {
    navigation.navigate("EquipeDetails", { equipe });
  };

  return (
    // TouchableOpacity torna o card clicável
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {/* Barra de cor à esquerda */}
      <View style={styles.colorBar} />

      {/* Container com as informações da equipe */}
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
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 6,
    marginHorizontal: 16,
    elevation: 3, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
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
});
