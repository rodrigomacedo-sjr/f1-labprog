import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
  ScrollView,
} from "react-native";

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

  const openWikipedia = () => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{raceName}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Temporada:</Text>
        <Text style={styles.value}>{season}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Rodada:</Text>
        <Text style={styles.value}>{round}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Data:</Text>
        <Text style={styles.value}>{date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Hora:</Text>
        <Text style={styles.value}>{time ? time.substring(0, 5) : "N/A"}</Text>
      </View>

      {Circuit && (
        <>
          <View style={styles.section}>
            <Text style={styles.label}>Circuito:</Text>
            <Text style={styles.value}>{Circuit.circuitName}</Text>
          </View>

          {Circuit.Location && (
            <View style={styles.section}>
              <Text style={styles.label}>Localização:</Text>
              <Text style={styles.value}>
                {Circuit.Location.locality}, {Circuit.Location.country}
              </Text>
            </View>
          )}
        </>
      )}

      {FirstPractice && (
        <View style={styles.section}>
          <Text style={styles.label}>Primeiro Treino:</Text>
          <Text style={styles.value}>
            {FirstPractice.date} -{" "}
            {FirstPractice.time ? FirstPractice.time.substring(0, 5) : ""}
          </Text>
        </View>
      )}

      {SecondPractice && (
        <View style={styles.section}>
          <Text style={styles.label}>Segundo Treino:</Text>
          <Text style={styles.value}>
            {SecondPractice.date} -{" "}
            {SecondPractice.time ? SecondPractice.time.substring(0, 5) : ""}
          </Text>
        </View>
      )}

      {ThirdPractice && (
        <View style={styles.section}>
          <Text style={styles.label}>Terceiro Treino:</Text>
          <Text style={styles.value}>
            {ThirdPractice.date} -{" "}
            {ThirdPractice.time ? ThirdPractice.time.substring(0, 5) : ""}
          </Text>
        </View>
      )}

      {Qualifying && (
        <View style={styles.section}>
          <Text style={styles.label}>Qualificação:</Text>
          <Text style={styles.value}>
            {Qualifying.date} -{" "}
            {Qualifying.time ? Qualifying.time.substring(0, 5) : ""}
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Ver na Wikipedia" onPress={openWikipedia} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  buttonContainer: {
    marginTop: 20,
  },
});
