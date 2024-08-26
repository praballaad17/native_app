import React, { useState } from "react";
import { View, Button, Image, Alert, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

const ImagePickerComponent = () => {
  const [image, setImage] = useState(null);

  const pickImage = async (fromCamera = false) => {
    // Ask for permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access the camera roll is required!");
      return;
    }

    let result;
    if (fromCamera) {
      const cameraPermissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermissionResult.granted === false) {
        Alert.alert("Permission to access the camera is required!");
        return;
      }
      // Launch camera to capture photo
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    } else {
      // Launch gallery to pick an image
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

    setImage(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Pick Image from Gallery"
          onPress={() => pickImage(false)}
        />
        <Button title="Take Photo" onPress={() => pickImage(true)} />
      </View>
      {image && (
        <View>
          <Image
            resizeMode="contain"
            source={{ uri: image }}
            style={styles.image}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
    borderRadius: 10,
    // Use aspect ratio to ensure proper resizing
    aspectRatio: 1,
  },
  ratioButtons: {
    marginTop: 20,
  },
  cropTitle: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default ImagePickerComponent;
