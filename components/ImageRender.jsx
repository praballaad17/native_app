import { View, Text, StyleSheet, Image, Alert } from "react-native";
import React, { forwardRef, useImperativeHandle } from "react";

const ImageRender = ({ file, error, setFile, setError }) => {
  return (
    <View className="w-full">
      {/* Conditionally render the image or error message */}
      {file ? (
        // Display the selected image
        <View className="mt-2">
          <Image
            resizeMode="contain"
            className="w-full h-[65vh]"
            source={{ uri: file }}
          />
        </View>
      ) : (
        // Display an error message if there's
        // an error or no image selected
        <View className="w-full">
          <View style={styles.container}>
            <View
              resizeMode="contain"
              className="w-full h-[65vh] border-[black] mt-5"
              style={styles.squareBox}
            />
          </View>
          <Text>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center", // Centers the square in the middle of the screen
    alignItems: "center", // Centers the square horizontally
  },
  squareBox: {
    borderWidth: 2, // Thickness of the border
    borderColor: "black", // Color of the border
    backgroundColor: "white", // Background color (can be set to 'transparent' for a transparent square)
  },
});

export default ImageRender;
