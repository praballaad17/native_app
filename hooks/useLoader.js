import React, { createContext, useContext, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

// Create Context
const LoaderContext = createContext();

// Loader Provider Component
export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </LoaderContext.Provider>
  );
};

// Custom Hook to Use Loader
export const useLoader = () => useContext(LoaderContext);

// Styles for Loader Overlay
const styles = StyleSheet.create({
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Ensure it's above other components
  },
});
