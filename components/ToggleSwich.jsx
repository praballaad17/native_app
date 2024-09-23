import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Loader from "./Loader";

const ToggleSwitch = () => {
  const [selectedType, setSelectedType] = useState("Patient");
  const [loading, setLoading] = useState(false);

  const switchUserType = (type) => {
    setLoading(true);

    setTimeout(() => {
      setSelectedType(type);
      setLoading(false);
    }, 3000); // 3 seconds delay for demo purposes
  };

  if (loading) {
    return <Loader loadingText="Fetching data..." />;
  }

  return (
    <View style={styles.container}>
      {/* Switchable Buttons */}
      <View style={styles.switchContainer}>
        {/* Patient Button */}
        <TouchableOpacity
          style={[
            styles.switchButton,
            selectedType === "Patient" && styles.activeButton,
          ]}
          onPress={() => switchUserType("Patient")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedType === "Patient" && styles.activeText,
            ]}
          >
            Patient
          </Text>
        </TouchableOpacity>

        {/* Doctor Button */}
        <TouchableOpacity
          style={[
            styles.switchButton,
            selectedType === "Doctor" && styles.activeButton,
          ]}
          onPress={() => switchUserType("Doctor")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedType === "Doctor" && styles.activeText,
            ]}
          >
            Doctor
          </Text>
        </TouchableOpacity>

        {/* Executive Button */}
        <TouchableOpacity
          style={[
            styles.switchButton,
            selectedType === "Executive" && styles.activeButton,
          ]}
          onPress={() => switchUserType("Executive")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedType === "Executive" && styles.activeText,
            ]}
          >
            Executive
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display the selected user type */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>Selected: {selectedType}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    padding: 3,
  },
  switchButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },
  activeButton: {
    backgroundColor: "#4caf50",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  displayContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  displayText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
});

export default ToggleSwitch;
