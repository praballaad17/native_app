import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // For the icon

const GetVarifiedNotification = () => {
  const handleVerify = () => {
    // Redirect to KYC Verification Screen
    // navigation.navigate('KycVerification');
  };

  return (
    <View style={styles.container}>
      <View style={styles.notificationContainer}>
        <MaterialIcons
          name="verified-user"
          size={40}
          color="#4CAF50"
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.notificationText}>Complete Your KYC</Text>
          <Text style={styles.subText}>
            Get verified to enjoy full access to our services.
          </Text>
        </View>
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.buttonText}>Get Verified</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
    elevation: 3, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3, // iOS shadow
    width: "100%",
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#888",
  },
  verifyButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default GetVarifiedNotification;
