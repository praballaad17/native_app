import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Loader from "./Loader";
import useUserType from "../context/UserProvider";
import { USERS } from "../constants";

const UserToggleSwitch = () => {
  const [loading, setLoading] = useState(false);
  const { userType, setUserType } = useUserType();

  const switchUserType = (type) => {
    setLoading(true);

    setTimeout(() => {
      setUserType(type);
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
            userType === USERS.PATIENT && styles.activeButton,
          ]}
          onPress={() => switchUserType(USERS.PATIENT)}
        >
          <Text
            style={[
              styles.buttonText,
              userType === USERS.PATIENT && styles.activeText,
            ]}
          >
            Patient
          </Text>
        </TouchableOpacity>

        {/* Doctor Button */}
        <TouchableOpacity
          style={[
            styles.switchButton,
            userType === USERS.DOCTOR && styles.activeButton,
          ]}
          onPress={() => switchUserType(USERS.DOCTOR)}
        >
          <Text
            style={[
              styles.buttonText,
              userType === USERS.DOCTOR && styles.activeText,
            ]}
          >
            Doctor
          </Text>
        </TouchableOpacity>

        {/* Executive Button */}
        <TouchableOpacity
          style={[
            styles.switchButton,
            userType === USERS.EXECUTIVE && styles.activeButton,
          ]}
          onPress={() => switchUserType(USERS.EXECUTIVE)}
        >
          <Text
            style={[
              styles.buttonText,
              userType === USERS.EXECUTIVE && styles.activeText,
            ]}
          >
            Executive
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display the selected userType type */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>Selected: {userType}</Text>
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

export default UserToggleSwitch;
