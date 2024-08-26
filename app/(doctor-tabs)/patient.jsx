// import { View, Text } from "react-native";
// import React from "react";

// const Patient = () => {
//   return (
//     <View>
//       <Text> Patient</Text>
//     </View>
//   );
// };

// export default Patient;
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

// Sample data for Active and Inactive patients
const activePatients = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Sam Williams" },
];

const inactivePatients = [
  { id: 4, name: "Emily Brown" },
  { id: 5, name: "Michael Davis" },
];

const PatientTabs = () => {
  // State to track which tab is selected
  const [isActiveTab, setIsActiveTab] = useState(true);

  // Function to toggle between Active and Inactive Patients tabs
  const toggleTab = (tab) => {
    setIsActiveTab(tab === "active");
  };

  // Function to render each patient in the list
  const renderPatientItem = ({ item }) => (
    <View style={styles.patientItem}>
      <Text style={styles.patientName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            isActiveTab ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => toggleTab("active")}
        >
          <Text
            style={[
              styles.tabText,
              isActiveTab ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            Active Patients
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            !isActiveTab ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => toggleTab("inactive")}
        >
          <Text
            style={[
              styles.tabText,
              !isActiveTab ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            Inactive Patients
          </Text>
        </TouchableOpacity>
      </View>

      {/* Patient List */}
      <FlatList
        data={isActiveTab ? activePatients : inactivePatients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPatientItem}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  activeTab: {
    backgroundColor: "#FFA500", // Orange for the selected tab
  },
  inactiveTab: {
    backgroundColor: "#f0f0f0", // Light gray for the non-selected tab
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff", // White text for the active tab
  },
  inactiveTabText: {
    color: "#000", // Black text for the inactive tab
  },
  list: {
    paddingHorizontal: 20,
  },
  patientItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  patientName: {
    fontSize: 16,
  },
});

export default PatientTabs;
