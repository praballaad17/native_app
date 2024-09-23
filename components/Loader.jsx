import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const Loader = ({ loadingText = "Loading..." }) => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#4caf50" style={styles.spinner} />
      <Text style={styles.loadingText}>{loadingText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // White background for a clean look
  },
  spinner: {
    marginBottom: 15,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4caf50", // Green text for healthcare-related theme
  },
});

export default Loader;
