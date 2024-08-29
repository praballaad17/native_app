import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

const PatientListWithFilter = ({ patients }) => {
  const [showActive, setShowActive] = useState(true);

  const filteredPatients = patients.filter(
    (patient) => patient.isActive === showActive
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Button
          title="Active Patients"
          onPress={() => setShowActive(true)}
          color={showActive ? "blue" : "gray"}
        />
        <Button
          title="Inactive Patients"
          onPress={() => setShowActive(false)}
          color={!showActive ? "blue" : "gray"}
        />
      </View>

      <FlatList
        data={filteredPatients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.patientCard}>
            <Text style={styles.patientName}>{item.name}</Text>
            <Text>Age: {item.age}</Text>
            <Text>Contact: {item.contact}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  patientCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 5,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PatientListWithFilter;
