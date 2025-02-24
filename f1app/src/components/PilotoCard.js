import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PilotoCard({ piloto, onPress }) {
  const navigation = useNavigation();

  const {
    givenName,
    familyName,
    permanentNumber,
    headshot_url,
    team_colour,
    team_name,
    country_code,
    code,
  } = piloto;

  const photoUrl = headshot_url
    ? headshot_url
    : `https://via.placeholder.com/100?text=${code}`;

  const handlePress = () => {
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
        <Image source={{ uri: photoUrl }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>
            {givenName} {familyName}
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
