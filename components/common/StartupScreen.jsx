import React, { useEffect } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import { useNavigation } from "expo-router";
import { images } from "../../constants";

const StartupScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0); // Initial opacity 0

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Navigate to Home after 3 seconds
    // const timeout = setTimeout(() => {
    //   navigation.replace("/home"); // Change "/home" to your actual home route
    // }, 3000);

    // return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Animated.Image
        source={images.logo} // Replace with your actual logo
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      /> */}
      <Image
        source={images.logo}
        className="w-[300px] h-[300px]"
        resizeMode="contain"
        //   style={styles.logo}
      />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
});
